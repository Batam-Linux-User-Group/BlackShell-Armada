/* ---------- 1. State Kacamata Pembesar ---------- */
const L = {
  pos: null,           
  drag: false,         
  zf: 2.2,             
  ret: false,          
  follow: false,       
  rect: null,          
  off: { x: 0, y: 0 }, 
  key: '',             
  mob: null            
};

/* ---------- 2. Utilitas Ukuran & Batas Area Layar ---------- */

// Mengecek apakah ukuran layar berada pada mode mobile (< 640px)
const isMob = () => window.innerWidth < 640;

// Menentukan diameter lensa (134px pada mobile, 170px pada desktop)
const diam = () => (isMob() ? 134 : 170);

// Membatasi koordinat (x, y) agar lensa tetap berada di dalam batas layar
function clampXY(x, y, d = diam()) {
  const minX = 8;
  const maxX = Math.max(8, window.innerWidth - d - 12);
  const minY = 50;
  const maxY = Math.max(50, window.innerHeight - d - 16);

  return {
    x: Math.min(Math.max(minX, x), maxX),
    y: Math.min(Math.max(minY, y), maxY)
  };
}

// Mengambil ukuran dan posisi terkini dari elemen buku (#book)
function bookRect() {
  const b = $('#book');
  L.rect = b ? b.getBoundingClientRect() : null;
  return L.rect;
}

/* ---------- 3. Pengaturan Posisi Lensa ---------- */

// Menentukan posisi awal lensa saat pertama kali diaktifkan
function initLensPos() {
  const d = diam();

  if (isMob()) {
    L.pos = clampXY(
      (window.innerWidth - d) / 2,
      Math.max(140, window.innerHeight - d - 110),
      d
    );
  } else {
    L.pos = clampXY(
      Math.max(20, window.innerWidth - d - 90),
      Math.max(120, window.innerHeight - d - 120),
      d
    );
  }
}

// Memindahkan lensa tepat ke bagian tengah halaman buku (#book)
function centerLens() {
  const d = diam();
  const r = bookRect();

  if (r) {
    L.pos = clampXY(
      r.left + r.width / 2 - d / 2,
      r.top + r.height / 2 - d / 2,
      d
    );
  } else {
    L.pos = clampXY(
      (window.innerWidth - d) / 2,
      Math.max(80, (window.innerHeight - d) / 2),
      d
    );
  }

  updateLens();
}

/* ---------- 4. Pemasangan DOM & Interaksi Geser (Drag) ---------- */

// Merender komponen kaca pembesar ke dalam #lens-root dan memasang event interaksi
function mountLens() {
  const root = $('#lens-root');
  if (!root) return;

  root.innerHTML = '';

  // Jika kaca pembesar sedang nonaktif (S.lens === false), kosongkan root
  if (!S.lens) return;

  // Atur posisi awal jika belum terdefinisi
  if (!L.pos) initLensPos();

  const m = isMob();
  L.mob = m;
  L.key = '';

  // Buat elemen kontainer utama kaca pembesar
  const el = document.createElement('div');
  el.id = 'lens';
  el.className = 'lens' + (m ? ' m' : '');
  el.style.width = el.style.height = diam() + 'px';

  // Struktur visual: bezel kuningan, kaca optik, pantulan cahaya (glare), vignette, gagang, & kontrol
  el.innerHTML = `
    <div class="bezel">
      <div class="glass">
        <div id="lcont"></div>
        <div class="glare"></div>
        <div class="vig"></div>
        <div id="lret"></div>
        <div class="zbadge font-mono-dm" id="lbadge"></div>
      </div>
    </div>
    <div class="handle">
      <div><i></i><i></i><i></i></div>
    </div>
    <div class="lctl font-mono-dm" id="lctl"></div>
  `;

  root.appendChild(el);

  // Event saat lensa mulai ditekan/digeser (Pointer Down)
  el.addEventListener('pointerdown', (e) => {
    // Jangan mulai drag jika pengguna menekan tombol pada bar kontrol (#lctl)
    if (e.target.closest('#lctl')) return;

    // Matikan mode ikuti kursor otomatis saat lensa digeser manual
    if (L.follow) {
      L.follow = false;
      fillLensCtl();
    }

    L.drag = true;
    el.classList.add('drag');
    playLensClick();

    const r = el.getBoundingClientRect();
    L.off = {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };

    try {
      el.setPointerCapture(e.pointerId);
    } catch (x) {
      /* Abaikan jika pointer capture tidak tersedia */
    }

    bookRect();
  });

  // Event saat lensa digerakkan (Pointer Move)
  el.addEventListener('pointermove', (e) => {
    if (!L.drag) return;
    L.pos = clampXY(e.clientX - L.off.x, e.clientY - L.off.y, diam());
    updateLens();
  });

  // Event saat geseran lensa dilepas (Pointer Up / Cancel)
  const up = (e) => {
    if (!L.drag) return;
    L.drag = false;
    el.classList.remove('drag');

    try {
      el.releasePointerCapture(e.pointerId);
    } catch (x) {
      /* Abaikan */
    }

    updateLens();
  };

  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);

  fillLensCtl();
  updateLens(true);
}

/* ---------- 5. Panel Kontrol & Proyeksi Optik Kaca Pembesar ---------- */

// Merender tombol kontrol di atas kaca pembesar (#lctl), indikator zoom (#lbadge), & crosshair (#lret)
function fillLensCtl() {
  const c = $('#lctl');
  if (!c) return;

  const desktopButtons = isMob()
    ? ''
    : `<button class="${L.ret ? 'on' : ''}" data-act="lret" title="${
        L.ret ? 'Sembunyikan Crosshair' : 'Tampilkan Crosshair'
      }">${I('cross', 12)}</button>` +
      `<button class="${L.follow ? 'on' : ''}" data-act="lfollow" title="${
        L.follow ? 'Kunci Posisi Manual' : 'Ikuti Gerakan Kursor'
      }">${I(L.follow ? 'move' : 'pin', 12)}</button>`;

  c.innerHTML = `
    <button data-act="lz-" title="Kurangi Zoom">${I('zoom-out', 12)}</button>
    <span class="zt">${L.zf.toFixed(1)}×</span>
    <button data-act="lz+" title="Tambah Zoom">${I('zoom-in', 12)}</button>
    <span class="sep"></span>
    <button class="ctr" data-act="lcenter" title="Pusatkan Lensa ke Tengah Buku">${I('locate', 12, 'color:#dcb588')}</button>
    ${desktopButtons}
    <button class="cls" data-act="lclose" title="Tutup Kacamata Pembesar">✕</button>
  `;

  const b = $('#lbadge');
  if (b) b.textContent = `${L.zf.toFixed(1)}× ZOOM`;

  const r = $('#lret');
  if (r) {
    r.innerHTML = L.ret ? '<div class="ret"><i></i><u></u><b></b></div>' : '';
  }
}

// Memperbarui posisi kaca pembesar dan menghitung perbesaran optik bagian halaman buku di bawahnya
function updateLens(force) {
  const el = $('#lens');
  if (!el || !S.lens || !L.pos) return;

  // Pasang ulang lensa jika terjadi perubahan mode layar mobile <-> desktop
  if (L.mob !== isMob()) {
    mountLens();
    return;
  }

  const rect = bookRect();
  const d = diam();
  const rad = d / 2;
  const inset = isMob() ? 6 : 7; // Tebal bingkai dalam kaca (6px mobile, 7px desktop)

  // Perbarui posisi elemen lensa di layar
  el.style.left = L.pos.x + 'px';
  el.style.top = L.pos.y + 'px';

  // Koordinat titik tengah kaca pembesar terhadap layar
  const cx = L.pos.x + rad;
  const cy = L.pos.y + rad;

  // Cek apakah titik tengah lensa berada di atas area buku (#book) dengan toleransi 20px
  const over =
    rect &&
    cx >= rect.left - 20 &&
    cx <= rect.right + 20 &&
    cy >= rect.top - 20 &&
    cy <= rect.bottom + 20;

  const cont = $('#lcont');
  if (!cont) return;

  // Tampilan idle ketika kaca pembesar digeser keluar dari area buku
  if (!over) {
    if (L.key !== 'idle') {
      L.key = 'idle';
      cont.innerHTML =
        '<div class="idle">' +
        I('eye', 20) +
        '<b class="font-mono-dm">Kaca Pembesar</b>' +
        '<small class="font-mono-dm">Geser ke buku untuk zoom</small>' +
        '</div>';
    }
    return;
  }

  // Render klon halaman aktif (plateHTML mode mag = true) ke dalam kaca pembesar
  const key = `${S.idx}|${Math.round(rect.width)}|${Math.round(rect.height)}`;
  if (force || L.key !== key) {
    L.key = key;
    cont.innerHTML = `
      <div class="lc" id="lcin" style="width:${rect.width}px;height:${rect.height}px">
        <div class="lens-page">${plateHTML(PLATES[S.idx], true)}</div>
      </div>
    `;
  }

  // Hitung offset koordinat halaman di dalam kaca dan perbesar sesuai faktor L.zf
  const rx = cx - rect.left;
  const ry = cy - rect.top;
  const inner = $('#lcin');
  if (!inner) return;

  inner.style.left = `${-rx * L.zf + rad - inset}px`;
  inner.style.top = `${-ry * L.zf + rad - inset}px`;
  inner.style.transform = `scale(${L.zf})`;
}