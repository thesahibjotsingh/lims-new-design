// scripts/make-review-sheet.ts
//
// One HTML page for reading and signing off the overviews (lib/search/descriptions): every overview in English, Hindi
// and Punjabi, with Approve / Needs change / Remove on each and a note box, Gemini's flags beside the ones it flagged,
// and Gemini's new drafts marked as new. It is a single file with no network and no server: open it in a browser.
//
//   npx tsx scripts/make-review-sheet.ts        ->  private/description-review/review.html   (git-ignored)
//
// The choices are kept in the browser (localStorage) as they are made. "Copy my decisions" puts the ones that need an
// edit or a removal on the clipboard as plain text to paste back; "Download all" saves everything as JSON. Printing
// the page gives a clean sheet with a tick box on each, for a doctor who would rather read paper.

import fs from 'node:fs'
import path from 'node:path'
import { DESCRIPTIONS, REVIEWED } from '@/lib/search/descriptions/data'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'private', 'description-review', 'review.html')

interface Issue {
  where: string
  problem: string
  suggestion?: string
}
const read = <T,>(file: string, fallback: T): T => {
  const full = path.join(ROOT, 'private', 'gemini', file)
  return fs.existsSync(full) ? (JSON.parse(fs.readFileSync(full, 'utf8')) as T) : fallback
}
const checks = read<Record<string, { verdict: string; issues: Issue[] }>>('check.json', {})
const drafts = read<Record<string, { id: string; kind: string; phrases: string[]; problems: string[]; en: unknown; hi: unknown; pa: unknown }>>('drafts.json', {})

const entries = [
  ...DESCRIPTIONS.map((entry) => ({
    id: entry.id,
    kind: entry.kind,
    isNew: false,
    signedOff: REVIEWED.includes(entry.id),
    phrases: entry.phrases,
    en: entry.en,
    hi: entry.hi,
    pa: entry.pa,
    flags: checks[entry.id]?.issues ?? [],
    checked: Boolean(checks[entry.id]),
    problems: [] as string[],
  })),
  ...Object.values(drafts)
    .filter((draft) => !DESCRIPTIONS.some((entry) => entry.id === draft.id))
    .map((draft) => ({
      id: draft.id,
      kind: draft.kind,
      isNew: true,
      signedOff: false,
      phrases: draft.phrases,
      en: draft.en,
      hi: draft.hi,
      pa: draft.pa,
      flags: [] as Issue[],
      checked: false,
      problems: draft.problems,
    })),
]

const data = JSON.stringify(entries).replace(/</g, '\\u003c')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LIMS search overviews: review sheet</title>
<style>
  :root { --teal:#0F5B66; --ink:#0B1416; --mist:#F2F8F8; --copper:#B5603D; --line:#d6e3e4; --ok:#1c7a4a; --fix:#b45309; --no:#b42318; }
  * { box-sizing: border-box; }
  body { margin:0; font:16px/1.5 system-ui,"Segoe UI","Nirmala UI","Noto Sans Devanagari","Noto Sans Gurmukhi",sans-serif; color:var(--ink); background:#fff; }
  header { position:sticky; top:0; z-index:5; background:var(--teal); color:#fff; padding:12px 16px; }
  header h1 { margin:0 0 4px; font-size:18px; }
  .counts { font-size:13px; opacity:.9; }
  .bar { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; align-items:center; }
  .bar select, .bar input[type=search], .bar button { font:inherit; font-size:14px; padding:6px 10px; border-radius:8px; border:1px solid #ffffff55; background:#ffffff1f; color:#fff; }
  .bar select option { color:#000; }
  .bar input::placeholder { color:#ffffffb0; }
  .bar label { font-size:14px; display:flex; align-items:center; gap:6px; }
  .tabs button.on { background:#fff; color:var(--teal); font-weight:600; }
  main { max-width:1100px; margin:0 auto; padding:16px; }
  .note { background:var(--mist); border-left:4px solid var(--copper); padding:10px 14px; border-radius:8px; font-size:14px; margin-bottom:16px; }
  .card { border:1px solid var(--line); border-radius:14px; margin:0 0 16px; overflow:hidden; break-inside:avoid; }
  .card h2 { margin:0; padding:10px 14px; background:var(--mist); font-size:15px; display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
  .badge { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.06em; padding:2px 8px; border-radius:999px; background:#fff; border:1px solid var(--line); color:var(--teal); }
  .badge.new { background:var(--copper); color:#fff; border-color:var(--copper); }
  .badge.sign { background:var(--ok); color:#fff; border-color:var(--ok); }
  .phrases { padding:6px 14px 0; font-size:12px; color:#52666a; }
  .cols { display:grid; gap:0; grid-template-columns:repeat(var(--n,1),1fr); }
  .col { padding:10px 14px; border-top:1px solid var(--line); }
  .cols .col + .col { border-left:1px solid var(--line); }
  .col h3 { margin:0 0 4px; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--teal); }
  .col p { margin:0 0 6px; }
  .col ul { margin:0; padding-left:20px; }
  .col li { margin:2px 0; }
  .flags { margin:0; padding:10px 14px; background:#fff7e6; border-top:1px solid #f1d9a7; font-size:14px; }
  .flags b { color:var(--fix); }
  .flags .where { font-family:ui-monospace,monospace; font-size:12px; background:#fff; padding:0 5px; border-radius:4px; border:1px solid #f1d9a7; }
  .probs { margin:0; padding:10px 14px; background:#fdecea; border-top:1px solid #f5c2bd; font-size:14px; color:var(--no); }
  .act { display:flex; flex-wrap:wrap; gap:8px; padding:10px 14px; border-top:1px solid var(--line); align-items:flex-start; }
  .act button { font:inherit; font-size:14px; padding:6px 12px; border-radius:999px; border:1px solid var(--line); background:#fff; cursor:pointer; }
  .act button.ok.on { background:var(--ok); color:#fff; border-color:var(--ok); }
  .act button.fix.on { background:var(--fix); color:#fff; border-color:var(--fix); }
  .act button.no.on { background:var(--no); color:#fff; border-color:var(--no); }
  .act textarea { flex:1 1 260px; min-height:38px; font:inherit; font-size:14px; padding:6px 10px; border-radius:8px; border:1px solid var(--line); }
  .tick { display:none; }
  .empty { padding:40px; text-align:center; color:#52666a; }
  @media print {
    header, .act button, .bar { display:none !important; }
    .act textarea { border:none; border-bottom:1px solid #999; border-radius:0; min-height:24px; }
    .tick { display:inline-block; width:14px; height:14px; border:1.5px solid #000; margin-right:6px; }
    .card { page-break-inside:avoid; }
    body { font-size:12px; }
  }
  @media (max-width:760px) { .cols { grid-template-columns:1fr !important; } .cols .col + .col { border-left:none; } }
</style>
</head>
<body>
<header>
  <h1>LIMS search overviews: review sheet</h1>
  <div class="counts" id="counts"></div>
  <div class="bar">
    <span class="tabs" id="tabs"></span>
    <select id="kind"><option value="">All kinds</option><option value="symptom">Complaints</option><option value="condition">Conditions</option><option value="test">Tests</option></select>
    <select id="status"><option value="">Any decision</option><option value="none">Not decided</option><option value="ok">Approved</option><option value="fix">Needs change</option><option value="no">Remove</option></select>
    <label><input type="checkbox" id="onlyNew"> New drafts only</label>
    <label><input type="checkbox" id="onlyFlag"> Gemini flagged only</label>
    <input type="search" id="q" placeholder="Search id or words">
    <button id="copy">Copy my decisions</button>
    <button id="download">Download all</button>
    <button id="reset">Clear</button>
  </div>
</header>
<main>
  <div class="note">Drafts written for the site, not yet signed off by a doctor. Each shows what a patient would read under the Quick guide. Mark every one <b>Approve</b>, <b>Needs change</b> (say what in the note) or <b>Remove</b>. Hindi and Punjabi are drafts of the English: a reader of each should check the words. Nothing here ever names a medicine, a dose or a home remedy; if one does, mark it.</div>
  <div id="list"></div>
</main>
<script id="data" type="application/json">${data}</script>
<script>
(function () {
  var ENTRIES = JSON.parse(document.getElementById('data').textContent);
  var KEY = 'lims-overview-review-v1';
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { state = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  var lang = 'en';
  var LANGS = [['en','English'],['hi','हिन्दी'],['pa','ਪੰਜਾਬੀ'],['all','All three']];
  var NAMES = { en:'English', hi:'हिन्दी', pa:'ਪੰਜਾਬੀ' };
  var HEADINGS = { symptom:'Common reasons', condition:'Key points', test:'Key points' };

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }

  var tabs = document.getElementById('tabs');
  LANGS.forEach(function (l) {
    var b = el('button', '', l[1]); b.type = 'button';
    b.onclick = function () { lang = l[0]; render(); };
    b.dataset.lang = l[0]; tabs.appendChild(b);
  });

  function decision(id) { return (state[id] && state[id].s) || ''; }

  function counts() {
    var n = { ok:0, fix:0, no:0, none:0 };
    ENTRIES.forEach(function (e) { var d = decision(e.id); n[d || 'none'] += 1; });
    document.getElementById('counts').textContent =
      ENTRIES.length + ' overviews: ' + n.ok + ' approved, ' + n.fix + ' need a change, ' + n.no + ' to remove, ' + n.none + ' not decided yet';
  }

  function matches(e) {
    var kind = document.getElementById('kind').value, st = document.getElementById('status').value;
    var q = document.getElementById('q').value.trim().toLowerCase();
    if (kind && e.kind !== kind) return false;
    if (st && (decision(e.id) || 'none') !== st) return false;
    if (document.getElementById('onlyNew').checked && !e.isNew) return false;
    if (document.getElementById('onlyFlag').checked && e.flags.length === 0 && e.problems.length === 0) return false;
    if (q) {
      var hay = (e.id + ' ' + e.phrases.join(' ') + ' ' + e.en.about + ' ' + e.en.points.join(' ')).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  function col(e, code) {
    var c = el('div', 'col');
    c.appendChild(el('h3', '', NAMES[code]));
    var t = e[code];
    c.appendChild(el('p', '', t.about));
    c.appendChild(el('h3', '', HEADINGS[e.kind] || 'Key points'));
    var ul = el('ul'); t.points.forEach(function (p) { ul.appendChild(el('li', '', p)); }); c.appendChild(ul);
    return c;
  }

  function card(e) {
    var c = el('section', 'card');
    var h = el('h2'); h.appendChild(el('span', 'tick'));
    h.appendChild(el('span', '', e.id));
    h.appendChild(el('span', 'badge', e.kind));
    if (e.isNew) h.appendChild(el('span', 'badge new', 'new draft'));
    if (e.signedOff) h.appendChild(el('span', 'badge sign', 'signed off'));
    c.appendChild(h);
    c.appendChild(el('div', 'phrases', 'Searched as: ' + e.phrases.join(' · ')));
    var cols = el('div', 'cols'); var codes = lang === 'all' ? ['en','hi','pa'] : [lang];
    cols.style.setProperty('--n', codes.length);
    codes.forEach(function (code) { cols.appendChild(col(e, code)); });
    c.appendChild(cols);
    if (e.problems.length) {
      var p = el('div', 'probs'); p.appendChild(el('b', '', 'Does not pass the site checks yet: ')); p.appendChild(document.createTextNode(e.problems.join('; '))); c.appendChild(p);
    }
    if (e.flags.length) {
      var f = el('div', 'flags'); f.appendChild(el('b', '', 'Gemini flagged ' + e.flags.length + ':'));
      e.flags.forEach(function (x) {
        var line = el('div'); line.appendChild(el('span', 'where', x.where)); line.appendChild(document.createTextNode(' ' + x.problem + (x.suggestion ? ' Suggestion: ' + x.suggestion : ''))); f.appendChild(line);
      });
      c.appendChild(f);
    } else if (e.checked) {
      var g = el('div', 'phrases', 'Gemini read it and flagged nothing.'); c.appendChild(g);
    }
    var a = el('div', 'act');
    [['ok','Approve'],['fix','Needs change'],['no','Remove']].forEach(function (x) {
      var b = el('button', x[0] + (decision(e.id) === x[0] ? ' on' : ''), x[1]); b.type = 'button';
      b.onclick = function () { var cur = state[e.id] || {}; cur.s = cur.s === x[0] ? '' : x[0]; state[e.id] = cur; save(); render(); };
      a.appendChild(b);
    });
    var ta = el('textarea'); ta.placeholder = 'Note (what should change)'; ta.value = (state[e.id] && state[e.id].n) || '';
    ta.oninput = function () { var cur = state[e.id] || {}; cur.n = ta.value; state[e.id] = cur; save(); };
    a.appendChild(ta);
    c.appendChild(a);
    return c;
  }

  function render() {
    Array.prototype.forEach.call(tabs.children, function (b) { b.className = b.dataset.lang === lang ? 'on' : ''; });
    counts();
    var list = document.getElementById('list'); list.textContent = '';
    var shown = ENTRIES.filter(matches);
    if (!shown.length) { list.appendChild(el('div', 'empty', 'Nothing matches.')); return; }
    shown.forEach(function (e) { list.appendChild(card(e)); });
  }

  ['kind','status','onlyNew','onlyFlag','q'].forEach(function (id) { document.getElementById(id).addEventListener('input', render); document.getElementById(id).addEventListener('change', render); });

  document.getElementById('copy').onclick = function () {
    var lines = [];
    ENTRIES.forEach(function (e) {
      var d = state[e.id]; if (!d || !d.s || d.s === 'ok') return;
      lines.push((d.s === 'no' ? 'REMOVE ' : 'CHANGE ') + e.id + (d.n ? ': ' + d.n : ''));
    });
    var okIds = ENTRIES.filter(function (e) { return decision(e.id) === 'ok'; }).map(function (e) { return e.id; });
    var text = 'Overview review (' + okIds.length + ' approved)\\n' + (lines.length ? lines.join('\\n') : 'No changes or removals.') + '\\nAPPROVED: ' + okIds.join(', ');
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { alert('Copied. Paste it to Claude.'); }, function () { prompt('Copy this:', text); });
  };
  document.getElementById('download').onclick = function () {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'overview-review.json'; a.click();
  };
  document.getElementById('reset').onclick = function () { if (confirm('Clear every decision and note on this page?')) { state = {}; save(); render(); } };

  render();
})();
</script>
</body>
</html>
`

fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, html, 'utf8')
console.log(`Wrote ${path.relative(ROOT, OUT)}: ${entries.length} overviews (${entries.filter((e) => e.isNew).length} new drafts, ${entries.filter((e) => e.flags.length).length} flagged by Gemini).`)
