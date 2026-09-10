"""
Normalise and optimise the LIMS brand assets.

Reads full-resolution source art from assets-source/ (which is NOT served) and writes
display-sized WebP into public/. Source files stay in the repo so the icons can be
re-exported at another size later without regenerating them.

Two things this fixes beyond file size:

  1. Filenames. The art was named by hand and two names do not match the slugs in
     lib/services.ts ("pediatrics-" vs "paediatrics-", "ct-scan" vs "ct-scan-x-ray").
     A mismatched name is a silently broken image, so every output file is named from
     the catalogue and the script fails if a service has no art.

  2. Case. "locations-and-Directions.png" resolves on Windows and 404s on Linux, which
     is where this deploys. Everything written here is lowercase.

Run:  python scripts/build_assets.py
"""

import re
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-source"
PUB = ROOT / "public"

# Display size x ~3 so the art stays crisp on a high-density phone screen. Anything
# beyond that is bytes the visitor pays for and cannot see.
ICON_PX = 192
ACTION_PX = 192
QUALITY = 82

# Source art filename -> catalogue slug, for the two that disagree.
SLUG_FIXES = {
    "pediatrics-neonatology": "paediatrics-neonatology",
    "ct-scan": "ct-scan-x-ray",
}

CATEGORY_DIRS = {
    "clinical": "Centres of Excellence",
    "diagnostics": "diagnostics and imaging",
    "support": "Patient Care",
}


def read_catalogue():
    """Pull slug + category straight out of lib/services.ts.

    Parsed rather than hand-listed so this script cannot drift from the catalogue the
    site actually renders from.
    """
    text = (ROOT / "lib" / "services.ts").read_text(encoding="utf-8")
    body = text.split("export const SERVICES", 1)[1]
    body = body.split("export function", 1)[0]
    out = []
    for match in re.finditer(r"slug:\s*'([^']+)'", body):
        tail = body[match.start(): match.start() + 400]
        cat = re.search(r"category:\s*'(clinical|diagnostics|support)'", tail)
        if cat:
            out.append((match.group(1), cat.group(1)))
    return out


def emit(src: Path, dest: Path, box: int, trim: bool = False) -> int:
    im = Image.open(src).convert("RGBA")

    # `trim` crops the transparent margin off the artwork. Used for the brand marks
    # only: the round badge carries ~8% empty border, which at a 42px header size is
    # several wasted pixels and makes the mark look smaller than the text beside it.
    #
    # Deliberately NOT applied to the service icons. They were generated on consistent
    # canvases, so their empty margins are what keeps a wide icon and a tall one reading
    # at the same visual weight in the grid; trimming each to its own content box would
    # make them jump around.
    if trim:
        bbox = im.getchannel("A").getbbox()
        if bbox:
            im = im.crop(bbox)

    im.thumbnail((box, box), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=QUALITY, method=6)
    return dest.stat().st_size


def main():
    if not SRC.exists():
        sys.exit(f"Missing {SRC}. Move public/images there first (see README note).")

    services = read_catalogue()
    if len(services) != 26:
        sys.exit(f"Expected 26 services in lib/services.ts, parsed {len(services)}.")

    before = sum(p.stat().st_size for p in SRC.rglob("*") if p.is_file())
    written = 0
    missing = []

    # ---- service icons, named from the catalogue --------------------------------
    for slug, category in services:
        folder = SRC / CATEGORY_DIRS[category]
        # Try the catalogue slug first, then any source name that maps onto it.
        candidates = [slug] + [k for k, v in SLUG_FIXES.items() if v == slug]
        found = None
        for name in candidates:
            p = folder / f"{name}.png"
            if p.exists():
                found = p
                break
        if not found:
            missing.append(f"{slug}  (looked in {folder.name}/)")
            continue
        written += emit(found, PUB / "services" / f"{slug}.webp", ICON_PX)

    if missing:
        sys.exit("No artwork for these services:\n  " + "\n  ".join(missing))

    # ---- quick-action icons, forced lowercase -----------------------------------
    actions = SRC / "How can we help today"
    for p in sorted(actions.glob("*.png")):
        written += emit(p, PUB / "actions" / f"{p.stem.lower()}.webp", ACTION_PX)

    # ---- brand marks -------------------------------------------------------------
    # The source names are misleading: "mobile-logo" is the FULL lockup including the
    # institute name, and "lims-logo" is the compact mark. Renamed here by what they are.
    brand = [
        ("lims-logo.png", "lims-mark.webp", 420),      # mark + LIMS, white backgrounds
        ("mobile-logo.png", "lims-lockup.webp", 640),  # full lockup with institute name
        ("lims-favicon.png", "lims-badge.webp", 160),  # round badge, reads on teal
        # The emergency siren. Already a finished red disc, so it is used on its own —
        # it must not be nested inside another coloured circle.
        ("beacon.png", "beacon.webp", 160),
    ]
    for src_name, out_name, box in brand:
        p = SRC / src_name
        if not p.exists():
            sys.exit(f"Missing brand asset {p}")
        written += emit(p, PUB / "brand" / out_name, box, trim=True)

    # ---- photography -------------------------------------------------------------
    hero = SRC / "hero-doctor.jpg"
    if hero.exists():
        im = Image.open(hero).convert("RGB")
        im.thumbnail((1600, 1600), Image.LANCZOS)
        (PUB / "brand").mkdir(parents=True, exist_ok=True)
        out = PUB / "hero-doctor.webp"
        im.save(out, "WEBP", quality=80, method=6)
        written += out.stat().st_size

    print(f"source      {before / 1024 / 1024:8.2f} MB")
    print(f"published   {written / 1024 / 1024:8.2f} MB")
    print(f"saved       {(1 - written / before) * 100:8.1f} %")
    print(f"services    {len(services)} icons written to public/services/")


if __name__ == "__main__":
    main()
