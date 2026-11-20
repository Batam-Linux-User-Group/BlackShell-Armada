/* ---------- Terminal interaktif ---------- */
const T = { max: false, hist: [{ cmd: 'welcome', out: ['Terminal The Linux Sketchbook v1.0.0-sketchbook (x86_64)', 'Ketik "help" untuk melihat perintah yang tersedia atau menjelajahi sistem berkas.', 'Ketik "cat /etc/os-release" atau "uname -a" untuk memeriksa kondisi sistem.'] }] };
function termRun(cmd) {
  const l = cmd.toLowerCase();
  if (l === 'help') return ['Perintah Lapangan yang Tersedia:', '  uname -a          Tampilkan info kernel dan arsitektur', '  ls -la            Daftar berkas direktori beserta izinnya', '  pwd               Cetak direktori kerja saat ini', '  whoami            Cetak kredensial pengguna aktif', '  cat /etc/os-release Tampilkan info rilis distribusi', '  cat announcement.txt Baca surel Linus Torvalds 1991', '  uptime            Tampilkan waktu aktif dan beban rata-rata', '  cowsay [teks]     Panggil Tux si penguin dengan nasihatnya', '  date              Waktu dan tanggal sistem saat ini', '  clear             Bersihkan layar terminal', '  help              Cetak panduan manual ini'];
  if (l === 'uname -a' || l === 'uname -r' || l === 'uname') return ['Linux sketchbook-station 6.8.0-botanical-arch #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'];
  if (l === 'pwd') return ['/home/curator/field-notes'];
  if (l === 'whoami') return ['curator (Botanical & Technical Systems Lab)'];
  if (l.startsWith('ls')) return ['total 36', '-rw-r--r-- 1 curator field   1.2K Aug 25  1991 announcement.txt', 'drwxr-xr-x 2 curator field   4.0K May 12 10:14 kernel_strata/', '-rwxr-xr-x 1 curator field    890 May 12 11:22 catalog.sh*', '-rw-r--r-- 1 curator field    412 May 12 11:30 botanicals.log', 'drwxr-xr-x 4 curator field   4.0K May 12 12:00 /etc/'];
  if (l.includes('announcement.txt')) return ['"Halo semuanya yang memakai minix -', 'Saya sedang membuat sistem operasi (gratis) (sekadar hobi, tidak akan besar', 'dan profesional seperti gnu) untuk PC klon 386(486) AT. Ini sudah dikerjakan', 'sejak April, dan mulai siap..." — Linus Benedict Torvalds (1991)'];
  if (l.includes('os-release')) return ['NAME="The Linux Sketchbook"', 'VERSION="2026.1 (Botanical Edition)"', 'ID=linux-sketchbook', 'HOME_URL="https://kernel.org"', 'DOCUMENTATION_URL="The Linux Sketchbook Volume I"'];
  if (l === 'uptime') return [' 20:50:00 aktif 124 hari,  1 pengguna,  beban rata-rata: 0.08, 0.03, 0.01'];
  if (l === 'date') return [new Date().toUTCString()];
  if (l.startsWith('cowsay')) {
    const m = cmd.replace(/^cowsay\s*/i, '') || 'Linux ada di mana-mana!';
    return ['  ________________________________________', `< ${m} >`, '  ----------------------------------------', '         \\   ^__^', '          \\  (oo)\\_______', '             (__)\\       )\\/\\', '                 ||----w |', '                 ||     ||'];
  }
  return [`bash: ${cmd}: perintah tidak ditemukan. Ketik "help" untuk daftar perintah.`];
}
function openTerm() {
  S.term = true;
  const m = $('#modal-term');
  m.innerHTML = `<div class="ov"><div class="tm font-mono-dm ${T.max ? 'max' : ''}" id="tm">
    <div class="tm-h"><div>${I('terminal', 14)}<span>curator@sketchbook: ~/field-notes</span></div><div>
      <button data-act="tclear" title="Clear terminal">${I('trash', 14)}</button><button data-act="tmax" id="tmax" title="${T.max ? 'Kecilkan' : 'Maksimalkan'}">${I(T.max ? 'min' : 'max', 14)}</button><button class="x" data-act="tclose" title="Tutup terminal">${I('x', 14)}</button></div></div>
    <div class="tm-log" id="tlog"></div>
    <form class="tm-f" id="tform"><span>curator@sketchbook:~$</span><input id="tin" type="text" autocomplete="off" placeholder="Ketik perintah (contoh: help, uname -a, ls, cowsay Halo)..."><button type="submit">Kirim ↵</button></form></div></div>`;
  fillTermLog();
  $('#tform').addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = $('#tin'), cmd = inp.value.trim(); if (!cmd) return;
    if (cmd.toLowerCase() === 'clear') { T.hist = []; inp.value = ''; fillTermLog(); return; }
    T.hist.push({ cmd, out: termRun(cmd) }); inp.value = ''; fillTermLog();
  });
  setTimeout(() => { const i = $('#tin'); if (i) i.focus(); }, 150);
}
function fillTermLog() {
  const log = $('#tlog'); if (!log) return;
  log.innerHTML = T.hist.map((h) => `<div class="row"><div class="cl"><span>curator@sketchbook:~$</span><span>${esc(h.cmd)}</span></div><div class="o">${h.out.map((x) => `<div>${esc(x)}</div>`).join('')}</div></div>`).join('');
  log.scrollTop = log.scrollHeight;
}
function closeTerm() { S.term = false; $('#modal-term').innerHTML = ''; }