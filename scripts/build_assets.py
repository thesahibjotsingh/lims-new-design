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


# Consultant portraits. DoctorCard renders a fixed 4:5 box, so an off-ratio source is
# cropped rather than letterboxed, and the crop is anchored high because a portrait's
# subject is in the top half.
PORTRAIT_W, PORTRAIT_H = 800, 1000

# Below this the source has to be scaled UP to fill the card, which softens it. The
# demo placeholders are under this, so the script upscales and names them rather than
# refusing — but it names them every run, because a soft portrait is the visible symptom
# of a placeholder that nobody has replaced yet.
MIN_PORTRAIT_W, MIN_PORTRAIT_H = 640, 800


# Page banners. 3:1 art with the subject on the right and clear space on the left, so
# PageHeader can set its heading over the empty side.
BANNER_W, BANNER_H = 1800, 600

# Source filename (without .png) -> output name. Two sources are misspelled; renaming
# them here rather than in the page code keeps the same rule as SLUG_FIXES above — the
# output is named for what the site asks for, not for what the art was called.
BANNER_NAMES = {
    "specialities": "specialities",
    "find-a-doctor": "find-a-doctor",
    "diagnostics-and-maging": "diagnostics-and-imaging",
    "health-check-packages": "health-packages",
    "patient-care": "patient-care",
    "health-library": "health-library",
    "about-lmis": "about",
    "contact-us": "contact",
}


def build_banners() -> int:
    """assets-source/Placeholders/<name>.png -> public/banners/<name>.webp

    Quality 75 rather than the 82 used for icons: these are full-width photographs and
    the largest thing on their page, so they set the LCP. At 3:1 and this width the
    difference is invisible and worth roughly a third of the bytes.
    """
    folder = SRC / "Placeholders"
    if not folder.exists():
        return 0

    written = 0
    unknown = []

    for src in sorted(folder.glob("*.png")):
        name = BANNER_NAMES.get(src.stem.lower())
        if name is None:
            unknown.append(src.name)
            continue

        im = Image.open(src).convert("RGB")
        w, h = im.size
        target = BANNER_W / BANNER_H

        if w / h > target:
            # Too wide: crop from the RIGHT edge inward, never centred. The subject of
            # every one of these sits on the right; a centred crop trims it off.
            new_w = round(h * target)
            im = im.crop((w - new_w, 0, w, h))
        else:
            new_h = round(w / target)
            top = (h - new_h) // 2
            im = im.crop((0, top, w, top + new_h))

        im = im.resize((BANNER_W, BANNER_H), Image.LANCZOS)
        out = PUB / "banners" / f"{name}.webp"
        out.parent.mkdir(parents=True, exist_ok=True)
        im.save(out, "WEBP", quality=75, method=6)
        written += out.stat().st_size

    if unknown:
        sys.exit("Unrecognised banner art (add it to BANNER_NAMES): " + "; ".join(unknown))

    return written


def build_portraits() -> int:
    """assets-source/doctors/dr-<id>.png -> public/doctors/<id>.webp

    The `dr-` prefix is dropped so the output name is exactly the doctor `id` in
    lib/doctors.ts. Nothing here writes into lib/doctors.ts: a file appearing in this
    folder is not evidence that the photograph is of that consultant, and wiring it up
    is a decision a person makes, not a build step.
    """
    folder = SRC / "doctors"
    if not folder.exists():
        return 0

    written = 0
    skipped = []

    for src in sorted(folder.glob("*.png")):
        doctor_id = re.sub(r"^dr-", "", src.stem.lower())
        im = Image.open(src).convert("RGB")
        w, h = im.size

        if w < MIN_PORTRAIT_W or h < MIN_PORTRAIT_H:
            skipped.append(f"{src.name}  {w}x{h}  upscaled to {PORTRAIT_W}x{PORTRAIT_H}")

        target = PORTRAIT_W / PORTRAIT_H
        if w / h > target:
            # Too wide: take a centred column.
            new_w = round(h * target)
            left = (w - new_w) // 2
            im = im.crop((left, 0, left + new_w, h))
        else:
            # Too tall: take from the top, leaving a tenth of the excess as head room.
            new_h = round(w / target)
            top = round((h - new_h) * 0.1)
            im = im.crop((0, top, w, top + new_h))

        im = im.resize((PORTRAIT_W, PORTRAIT_H), Image.LANCZOS)
        out = PUB / "doctors" / f"{doctor_id}.webp"
        out.parent.mkdir(parents=True, exist_ok=True)
        im.save(out, "WEBP", quality=QUALITY, method=6)
        written += out.stat().st_size

    if skipped:
        print("portraits upscaled from a source smaller than the card - replace before launch:")
        for line in skipped:
            print(f"  {line}")

    return written


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

    # ---- page banners ------------------------------------------------------------
    written += build_banners()

    # ---- consultant portraits ----------------------------------------------------
    written += build_portraits()

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
