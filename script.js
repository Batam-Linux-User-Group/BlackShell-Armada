/* =====================================================================
   The Linux Sketchbook — Vanilla JS (tanpa React)
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) =>
  String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const pad = (n) => String(n).padStart(2, "0");

/* ---------- Ikon (lucide, inline SVG) ---------- */
const IC = {
  "volume-2":
    '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  "volume-x":
    '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  terminal:
    '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  "zoom-in":
    '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
  "zoom-out":
    '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>',
  reset:
    '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  figma:
    '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  layers:
    '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  "chev-l": '<path d="m15 18-6-6 6-6"/>',
  "chev-r": '<path d="m9 18 6-6-6-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "arrow-ur": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  "check-c": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  max: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>',
  min: '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/>',
  trash:
    '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  ext: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  palette:
    '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  type: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  move: '<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/>',
  cross:
    '<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>',
  pin: '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
  locate:
    '<line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>',
};
const I = (n, sz = 14, st = "") =>
  `<svg class="ic i${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="${st}">${IC[n]}</svg>`;

/* ---------- Audio (Web Audio API) ---------- */
let audioCtx = null,
  soundOn = true;
function actx() {
  if (!audioCtx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (C) audioCtx = new C();
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function playFlipSound(dir = "next") {
  if (!soundOn) return;
  try {
    const ctx = actx();
    if (!ctx) return;
    const sr = ctx.sampleRate,
      dur = 0.38,
      buf = ctx.createBuffer(1, Math.floor(sr * dur), sr),
      d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < buf.length; i++) {
      const t = i / buf.length,
        env = Math.sin(t * Math.PI) * Math.exp(-t * 2.2),
        w = Math.random() * 2 - 1;
      last = (last + 0.04 * w) / 1.04;
      d[i] = (last * 0.75 + w * 0.25) * env * 0.45;
    }
    const n = ctx.createBufferSource();
    n.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.setValueAtTime(dir === "next" ? 950 : 800, ctx.currentTime);
    f.Q.setValueAtTime(1.2, ctx.currentTime);
    f.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.35, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur);
    n.connect(f);
    f.connect(g);
    g.connect(ctx.destination);
    n.start();
  } catch (e) {
    /* abaikan */
  }
}
function playLensClick() {
  if (!soundOn) return;
  try {
    const ctx = actx();
    if (!ctx) return;
    const o = ctx.createOscillator(),
      g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(1400, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.06);
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.07);
  } catch (e) {
    /* abaikan */
  }
}

/* ---------- State ---------- */
const S = {
  idx: 0,
  lens: true,
  zoom: 1,
  term: false,
  figma: false,
  flipping: false,
  dir: null,
  turn: 0,
  out: null,
  copied: false,
  layer: null,
  q: "",
};
const N = PLATES.length;
const NAV = [
  ["Asal-Usul", 0],
  ["Kernel", 2],
  ["Distro", 3],
  ["Pohon Berkas", 5],
  ["Terminal", 6],
  ["Keamanan", 8],
];

/* ---------- Header ---------- */
function renderHeader() {
  $("#hdr").innerHTML = `<div class="hdr-in">
    <div class="d-flex align-items-center" style="gap:6px;flex-shrink:0"><span class="brand font-serif-instrument">The Linux Sketchbook</span></div>
    <nav class="hnav lg-only font-mono-dm"></nav>
    <div class="tools font-mono-dm">
      <button class="hb" data-act="sound" title="${soundOn ? "Matikan Suara Kertas" : "Nyalakan Suara Kertas"}">${soundOn ? I("volume-2", 14, "color:#516b57") : I("volume-x", 14, "color:#8c7e6c")}</button>
      <button class="hb lensbtn ${S.lens ? "lens-on" : ""}" data-act="lens" title="Aktifkan / Sembunyikan Kacamata Pembesar (Zoom Nyata)">${I("eye", 14, "color:#dcb588")}<span class="md-only">Kacamata Pembesar</span><span class="sm-only" style="font-size:10px;opacity:.8">[${S.lens ? "On" : "Off"}]</span></button>
      <button class="hb term" data-act="term" title="Buka Terminal Interaktif">${I("terminal", 14)}<span class="sm-only">Buka Terminal</span><span class="sm-hide" style="font-size:11px">Terminal</span></button>
    </div></div>`;
}

/* ---------- BookPlate ---------- */
function plateHTML(p, mag) {
  const out = mag ? null : S.out,
    copied = !mag && S.copied,
    layer = mag ? null : S.layer;
  const tOut = Array.isArray(p.terminal.output)
    ? p.terminal.output
    : [p.terminal.output];
  return `<div class="pl ${mag ? "mag" : ""}">
    <div class="ph font-mono-dm"><span>${I("book", 14)}The Linux Sketchbook · Jilid I</span><span>Pages ${pad(p.id)} — ${esc(p.title)}</span></div>
    <div class="pgrid">
      <div class="pleft">
        <div>
          <div class="kick2 font-mono-dm"><b>${esc(p.kicker)}</b><s>·</s><i>${esc(p.botanicalTag)}</i></div>
          <h2 class="ptitle font-serif-instrument">${esc(p.title)}</h2>
          <p class="psum font-reader">${esc(p.summary)}</p>
          <div class="prose font-reader">${p.fullProse.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        </div>
        ${p.quickCommands && p.quickCommands.length && !mag ? `<div class="qc"><div class="qc-h font-mono-dm"><span>Perintah Interaktif</span><span>Klik untuk simulasi</span></div><div class="qc-g">${p.quickCommands.map((q, i) => `<button class="qb" data-act="cmd" data-i="${i}"><b class="font-mono-dm">${I("play", 10)}${esc(q.cmd)}</b><span class="font-mono-dm">${esc(q.desc)}</span></button>`).join("")}</div></div>` : ""}
        <div class="hist font-mono-dm"><span>${esc(p.historicalContext)}</span><span>${esc(p.callout.value)}</span></div>
      </div>
      <div class="pright">
        <div class="orb"><i><b></b></i></div><div class="leafa a"></div><div class="leafa b"></div>
        <div class="tcard">
          <div class="tc-h font-mono-dm"><div>${I("terminal", 12)}<b>TERMINAL</b></div></div>
          <div class="scr font-mono-dm"><div>
            <div class="pr"><span>${esc(p.terminal.prompt)}</span><span>${esc(p.terminal.command)}</span></div>
            <div class="out">${tOut.map((l) => `<div>${esc(l)}</div>`).join("")}${out ? `<div class="ao">&gt; ${esc(out)}</div>` : ""}</div>
          </div>
          <div class="ft"><span>${esc(p.terminal.note || "[ log buku sketsa aktif ]")}</span><span class="cur"></span></div></div>
          ${p.diagramLayers && p.diagramLayers.length ? `<div class="lay"><div class="lay-h font-mono-dm">${I("layers", 10)}<span>Dekomposisi Lapisan</span></div><div class="lay-l">${p.diagramLayers.map((l, i) => `<div class="layer font-mono-dm ${layer === i ? "on" : ""}" data-l="${i}"><b>${esc(l.name)}</b><span>${esc(l.desc)}</span></div>`).join("")}</div></div>` : ""}
        </div>
        <div class="figc font-mono-dm">${esc(p.figCaption)}</div>
      </div>
    </div></div>`;
}

/* ---------- Book (shell statis + bagian dinamis) ---------- */
function buildBook() {
  $("#book-mount").innerHTML = `<div id="stage" class="stage book-3d-stage">
    <div id="tf" class="tf" style="transition:transform .15s ease-out">
      <div id="book" class="book">
        <div class="abs-fill sketchbook-paper" style="opacity:.9"></div>
        <div class="spine"><div class="rivet"></div><div class="thread"></div><div class="rivet"></div><div class="thread"></div><div class="rivet"></div></div>
        <div class="crease"></div>
        <div class="deckle paper-deckle-edge"><i></i></div>
        <div id="ribbon" class="ribbon"><div class="rib-b">${I("bookmark", 12)}</div><div class="rib-t"></div></div>
        <div id="plate" class="plate-base"></div>
        <div id="flip"></div>
        <div id="edgeL"></div><div id="edgeR"></div>
      </div>
    </div>
    <div id="ctrl" class="ctrl font-mono-dm"></div></div>`;
  const stage = $("#stage");
  stage.addEventListener("mousemove", (e) => {
    if (S.flipping) return;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    applyTf(x * 2.2, -y * 2.2);
  });
  stage.addEventListener("mouseleave", () => applyTf(0, 0));
  let tx = null;
  stage.addEventListener(
    "touchstart",
    (e) => {
      tx = e.touches[0].clientX;
    },
    { passive: true },
  );
  stage.addEventListener(
    "touchend",
    (e) => {
      if (tx === null) return;
      const d = e.changedTouches[0].clientX - tx;
      if (Math.abs(d) > 50) flip(d < 0 ? "next" : "prev");
      tx = null;
    },
    { passive: true },
  );
  fillBook();
}
let tilt = { x: 0, y: 0 };
function applyTf(x, y) {
  if (x !== undefined) tilt = { x, y };
  $("#tf").style.transform =
    `scale(${S.zoom}) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`;
}
function fillBook() {
  $("#plate").innerHTML = plateHTML(PLATES[S.idx], false);
  $("#ribbon").title = `Penanda: Plat ${S.idx + 1} dari ${N}`;
  $("#edgeL").innerHTML =
    S.idx > 0
      ? `<div class="edge l" data-act="prev" title="Balik ke Plat ${S.idx} (Klik atau tekan Panah Kiri)"><div class="curl"></div><div class="ear tl"></div><div class="badge-f font-mono-dm">${I("arrow-left", 12)}<span>Plat ${pad(S.idx)}</span></div></div>`
      : "";
  $("#edgeR").innerHTML =
    S.idx < N - 1
      ? `<div class="edge r" data-act="next" title="Buka Plat ${S.idx + 2} (Klik atau tekan Panah Kanan)"><div class="curl"></div><div class="ear tr"></div><div class="ear br"></div><div class="badge-f font-mono-dm"><span>Plat ${pad(S.idx + 2)}</span>${I("arrow-right", 12)}</div></div>`
      : "";
  fillCtrl();
}
function fillCtrl() {
  $("#ctrl").innerHTML =
    `<button class="nb" data-act="prev" ${S.idx === 0 || S.flipping ? "disabled" : ""}>${I("chev-l", 16)}<span class="sm-only">← Pages Sebelumnya</span><span class="sm-hide">← Sebelumnya</span></button>
    <div class="cnt"><span>Pages ${pad(S.idx + 1)} / ${pad(N)}</span><div class="dots">${PLATES.map((p, i) => `<button class="dot ${i === S.idx ? "on" : ""}" data-act="goto" data-i="${i}" title="Lompat ke Plat ${i + 1}: ${esc(p.title)}"></button>`).join("")}</div></div>
    <button class="nb" data-act="next" ${S.idx === N - 1 || S.flipping ? "disabled" : ""}><span class="sm-only">Pages Berikutnya →</span><span class="sm-hide">Berikutnya →</span>${I("chev-r", 16)}</button>`;
}
function setPlate(i) {
  S.idx = i;
  fillBook();
  renderHeader();
  renderGrid();
  updateLens(true);
}
function flip(dir) {
  if (S.flipping) return;
  const n = S.idx;
  if (dir === "next" && n < N - 1) S.turn = n;
  else if (dir === "prev" && n > 0) S.turn = n - 1;
  else return;
  S.flipping = true;
  S.dir = dir;
  playFlipSound(dir);
  $("#tf").style.transition = "transform .4s ease-out";
  const nx = dir === "next";
  $("#flip").innerHTML =
    `<div class="flip-wrap"><div class="leaf ${nx ? "animate-page-flip-next" : "animate-page-flip-prev"}" style="transform-origin:${nx ? "left" : "right"} center">
    <div class="abs-fill sketchbook-paper" style="opacity:.9"></div><div class="leaf-in">${plateHTML(PLATES[S.turn], true)}</div>
    <div class="abs-fill" style="background:linear-gradient(to ${nx ? "right" : "left"},rgba(0,0,0,.35) 0%,rgba(0,0,0,.1) 30%,transparent 65%,rgba(0,0,0,.2) 100%)"></div></div><div class="shade"></div></div>`;
  fillCtrl();
  setTimeout(() => setPlate(dir === "next" ? n + 1 : n - 1), 260);
  setTimeout(() => {
    S.flipping = false;
    S.dir = null;
    $("#flip").innerHTML = "";
    $("#tf").style.transition = "transform .15s ease-out";
    fillCtrl();
  }, 550);
}

/* ---------- Index grid ---------- */
function renderGrid() {
  const q = S.q.toLowerCase();
  const list = PLATES.filter((p) =>
    [p.title, p.summary, p.kicker, p.botanicalTag, p.callout.value].some((t) =>
      t.toLowerCase().includes(q),
    ),
  );
  $("#cards").innerHTML = list
    .map((p) => {
      const i = PLATES.findIndex((x) => x.id === p.id),
        on = i === S.idx;
      return `<button class="card-p ${on ? "on" : ""}" data-act="pick" data-i="${i}">
      ${on ? `<div class="stamp font-mono-dm">${I("check-c", 10)}<span>DIBUKA</span></div>` : ""}
      <div><div class="cp-t font-mono-dm"><b>Pages ${pad(p.id)}</b>${on ? "" : I("arrow-ur", 12)}</div><h4 class="font-serif-instrument">${esc(p.title)}</h4><p class="font-reader">${esc(p.summary)}</p></div>
      <div class="cp-f font-mono-dm"><span>${esc(p.botanicalTag)}</span><span>Buka Pages →</span></div></button>`;
    })
    .join("");
  $("#none").innerHTML = list.length
    ? ""
    : `<div class="none font-reader">Tidak ada pages yang cocok dengan "${esc(S.q)}". Coba kata kunci seperti "kernel", "terminal", "distro", atau "keamanan".</div>`;
}

/* ---------- Event delegation ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-act]");
  if (!t) return;
  const a = t.dataset.act,
    i = +t.dataset.i;
  switch (a) {
    case "goto":
    case "pick":
      setPlate(i);
      if (a === "pick") window.scrollTo({ top: 320, behavior: "smooth" });
      break;
    case "sound":
      soundOn = !soundOn;
      renderHeader();
      break;
    case "lens":
      S.lens = !S.lens;
      renderHeader();
      mountLens();
      break;
    case "lclose":
      S.lens = false;
      renderHeader();
      mountLens();
      break;
    case "figma":
      openFigma();
      break;
    case "fclose":
      closeFigma();
      break;
    case "term":
      openTerm();
      break;
    case "tclose":
      closeTerm();
      break;
    case "tclear":
      T.hist = [];
      fillTermLog();
      break;
    case "tmax":
      T.max = !T.max;
      $("#tm").classList.toggle("max", T.max);
      t.title = T.max ? "Kecilkan" : "Maksimalkan";
      t.innerHTML = I(T.max ? "min" : "max", 14);
      break;
    case "zin":
      setZoom(Math.min(1.25, parseFloat((S.zoom + 0.05).toFixed(2))));
      break;
    case "zout":
      setZoom(Math.max(0.8, parseFloat((S.zoom - 0.05).toFixed(2))));
      break;
    case "zreset":
      setZoom(1);
      break;
    case "prev":
      flip("prev");
      break;
    case "next":
      flip("next");
      break;
    case "cmd":
      S.out = PLATES[S.idx].quickCommands[i].output;
      $("#plate").innerHTML = plateHTML(PLATES[S.idx], false);
      break;
    case "copy": {
      const o = PLATES[S.idx].terminal.output;
      if (navigator.clipboard)
        navigator.clipboard.writeText(Array.isArray(o) ? o.join("\n") : o);
      S.copied = true;
      $("#plate").innerHTML = plateHTML(PLATES[S.idx], false);
      setTimeout(() => {
        S.copied = false;
        $("#plate").innerHTML = plateHTML(PLATES[S.idx], false);
      }, 1800);
      break;
    }
    case "lz-":
      playLensClick();
      L.zf = Math.max(1.5, parseFloat((L.zf - 0.3).toFixed(1)));
      fillLensCtl();
      updateLens();
      break;
    case "lz+":
      playLensClick();
      L.zf = Math.min(3.5, parseFloat((L.zf + 0.3).toFixed(1)));
      fillLensCtl();
      updateLens();
      break;
    case "lcenter":
      centerLens();
      break;
    case "lret":
      L.ret = !L.ret;
      fillLensCtl();
      break;
    case "lfollow":
      L.follow = !L.follow;
      fillLensCtl();
      break;
    case "furl":
      if (navigator.clipboard)
        navigator.clipboard.writeText(window.location.href);
      flash("url");
      break;
    case "ftok":
      if (navigator.clipboard)
        navigator.clipboard.writeText(JSON.stringify(TOKENS, null, 2));
      flash("tok");
      break;
    case "fdl": {
      const u = URL.createObjectURL(
        new Blob([JSON.stringify(TOKENS, null, 2)], {
          type: "application/json",
        }),
      );
      const l = document.createElement("a");
      l.href = u;
      l.download = "linux-sketchbook-figma-tokens.json";
      l.click();
      URL.revokeObjectURL(u);
      break;
    }
  }
});
document.addEventListener("mouseover", (e) => {
  const l = e.target.closest("#plate .layer");
  if (!l) return;
  S.layer = +l.dataset.l;
  $$("#plate .layer").forEach((x, k) =>
    x.classList.toggle("on", k === S.layer),
  );
});
document.addEventListener("mouseout", (e) => {
  if (!e.target.closest("#plate .layer")) return;
  S.layer = null;
  $$("#plate .layer").forEach((x) => x.classList.remove("on"));
});
window.addEventListener("keydown", (e) => {
  if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
    e.preventDefault();
    flip("next");
  } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
    e.preventDefault();
    flip("prev");
  }
});
window.addEventListener("mousemove", (e) => {
  if (!L.follow || !S.lens || isMob() || L.drag) return;
  L.pos = clampXY(e.clientX - diam() / 2, e.clientY - diam() / 2, diam());
  updateLens();
});
window.addEventListener("scroll", () => updateLens(), { passive: true });
["resize", "orientationchange"].forEach((ev) =>
  window.addEventListener(ev, () => {
    if (L.pos) L.pos = clampXY(L.pos.x, L.pos.y, diam());
    updateLens();
  }),
);

/* ---------- Init ---------- */
renderHeader();
buildBook();
renderGrid();
$("#search").addEventListener("input", (e) => {
  S.q = e.target.value;
  renderGrid();
});
mountLens();
