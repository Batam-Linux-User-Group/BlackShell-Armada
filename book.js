
const PLATES = [
  {
    id: 1,
    title: 'Asal-Usul Linux',
    subtitle: 'Sistem operasi yang dikembangkan bersama',
    kicker: 'The Linux Sketchbook 01 / 09 · Awal Mula',
    summary: 'Linux dibuat oleh Linus Torvalds pada tahun 1991. Awalnya merupakan proyek pribadi, lalu berkembang berkat kontribusi programmer dari seluruh dunia.',
    fullProse: [
      'Linux pertama kali dikembangkan oleh Linus Torvalds, mahasiswa asal Finlandia, pada tahun 1991.',
      'Awalnya, Linux dibuat sebagai proyek kecil untuk belajar sistem operasi. Kemudian, banyak programmer ikut membantu mengembangkan dan memperbaikinya.',
      'Linux menjadi sistem operasi open source, artinya kode programnya dapat dipelajari, digunakan, dan dikembangkan oleh siapa saja sesuai lisensinya.'
    ],
    historicalContext: '1991 — Finlandia · Linus Torvalds',
    callout: { label: 'PENGUMUMAN PERTAMA', value: '25 Agustus 1991' },
    terminal: {
      prompt: 'torvalds@helsinki:~$',
      command: 'cat announcement.txt | head -n 4',
      output: [
        'Linux mulai dikembangkan',
        'Awalnya hanya proyek pribadi',
        'Dikembangkan bersama komunitas',
        'Rilis awal: Linux 0.01'
      ],
      note: 'Awal perkembangan sistem operasi Linux'
    },
    figCaption: 'GAMBAR 01 — SEJARAH LINUX',
    illustrationType: 'orbit',
    botanicalTag: 'Pinus sylvestris · Pinus Finlandia',
  },
  {
    id: 2,
    title: 'Apa Itu Linux?',
    subtitle: 'Sistem operasi untuk menjalankan komputer',
    kicker: 'The Linux Sketchbook 02 / 09 · Dasar-Dasar',
    summary: 'Linux adalah sistem operasi berbasis kernel yang mengatur perangkat keras dan menjalankan aplikasi. Linux dikenal gratis, terbuka, dan dapat dikembangkan oleh komunitas.',
    fullProse: [
      'Linux adalah sistem operasi yang menghubungkan perangkat keras dengan aplikasi pada komputer.',
      'Linux memiliki kernel sebagai bagian inti, serta berbagai program pendukung dan aplikasi pengguna.',
      'Linux banyak digunakan pada komputer, server, perangkat mobile, dan superkomputer.'
    ],
    historicalContext: 'Kernel + Program Sistem + Aplikasi',
    callout: { label: 'KOMPONEN UTAMA', value: 'Kernel · Sistem · Aplikasi' },
    terminal: {
      prompt: 'fieldnote@tux-box:~$',
      command: 'uname -s -r -m',
      output: [
        'Linux',
        'Kernel: Bagian inti sistem',
        'Arsitektur: 64-bit'
      ],
      note: 'Informasi sistem operasi Linux'
    },
    figCaption: 'GAMBAR 02 — PENGERTIAN LINUX',
    illustrationType: 'kernel',
    botanicalTag: 'Quercus robur · Ek Inggris',
  },
  {
    id: 3,
    title: 'Kernel Linux',
    subtitle: 'Pengatur utama seluruh aktivitas komputer',
    kicker: 'The Linux Sketchbook 03 / 09 · Bagian Inti',
    summary: 'Kernel merupakan bagian inti Linux yang mengatur prosesor, memori, penyimpanan, proses, dan komunikasi dengan perangkat keras.',
    fullProse: [
      'Kernel adalah bagian utama sistem operasi yang menghubungkan perangkat keras dengan perangkat lunak.',
      'Tugas kernel meliputi mengatur penggunaan CPU, RAM, menjalankan proses, dan mengelola perangkat.',
      'Kernel juga menggunakan driver agar perangkat seperti keyboard, mouse, dan printer dapat berfungsi.'
    ],
    historicalContext: 'Kernel · Driver · CPU · RAM',
    callout: { label: 'FUNGSI KERNEL', value: 'Mengatur Proses · Memori · Perangkat' },
    terminal: {
      prompt: 'root@kernel-core:~#',
      command: 'lsmod | head -n 4',
      output: [
        'Module                  Size  Used by',
        'ext4                 1048576  1',
        'crc16                  16384  1 ext4',
        'mbcache                16384  1 ext4'
      ],
      note: 'Contoh modul yang digunakan kernel'
    },
    figCaption: 'GAMBAR 03 — FUNGSI KERNEL',
    illustrationType: 'architecture',
    botanicalTag: 'Fraxinus excelsior · Ash Eropa',
    diagramLayers: [
      { name: 'Perangkat Keras', desc: 'CPU, RAM, hard disk, dan perangkat lainnya' },
      { name: 'Kernel Linux', desc: 'Mengatur seluruh sumber daya komputer' },
      { name: 'Penghubung Sistem', desc: 'Menghubungkan aplikasi dengan kernel' },
      { name: 'Pustaka Sistem', desc: 'Membantu aplikasi menjalankan fungsi' },
      { name: 'Aplikasi', desc: 'Browser, editor, dan program lainnya' }
    ]
  },
  {
    id: 4,
    title: 'Memilih Distribusi Linux',
    subtitle: 'Berbagai jenis Linux sesuai kebutuhan',
    kicker: 'The Linux Sketchbook 04 / 09 · Distribusi',
    summary: 'Distribusi Linux atau distro adalah versi Linux yang dilengkapi program dan pengaturan tertentu. Setiap distro memiliki fungsi dan keunggulan masing-masing.',
    fullProse: [
      'Linux memiliki banyak distro dengan tampilan dan fungsi yang berbeda.',
      'Ubuntu dan Linux Mint cocok untuk pemula karena mudah digunakan.',
      'Fedora cocok untuk pengembangan, Arch Linux untuk pengguna tingkat lanjut, dan Kali Linux untuk belajar keamanan siber.'
    ],
    historicalContext: 'Debian (1993) · Red Hat (1994) · Arch (2002)',
    callout: { label: 'CONTOH DISTRO', value: 'Ubuntu · Mint · Fedora · Arch · Kali Linux' },
    terminal: {
      prompt: 'curator@distro-lab:~$',
      command: 'cat /etc/issue',
      output: [
        'Debian GNU/Linux 12',
        'Pengelola paket: APT',
        'Arch Linux: Pacman',
        'Fedora: DNF'
      ],
      note: 'Setiap distro memiliki pengelola paket'
    },
    figCaption: 'GAMBAR 04 — JENIS DISTRIBUSI LINUX',
    illustrationType: 'distro',
    botanicalTag: 'Salix babylonica · Dedalu Menangis',
  },
  {
    id: 5,
    title: 'Arsitektur Linux',
    subtitle: 'Susunan sistem dari perangkat keras hingga aplikasi',
    kicker: 'The Linux Sketchbook 05 / 09 · Struktur Sistem',
    summary: 'Linux memiliki beberapa lapisan yang saling bekerja sama, mulai dari perangkat keras, kernel, layanan sistem, hingga aplikasi pengguna.',
    fullProse: [
      'Arsitektur Linux terdiri dari beberapa lapisan dengan fungsi yang berbeda.',
      'Kernel menjadi penghubung antara perangkat keras dan aplikasi yang digunakan pengguna.',
      'Komunikasi aplikasi dengan kernel dilakukan melalui System Call agar akses perangkat keras lebih teratur dan aman.'
    ],
    historicalContext: 'Kernel · Userland · System Call',
    callout: { label: 'SUSUNAN SISTEM', value: 'Aplikasi ⇄ Kernel ⇄ Perangkat Keras' },
    terminal: {
      prompt: 'architect@strata:~$',
      command: 'strace -e trace=openat,write echo "Linux"',
      output: [
        'write(1, "Linux\\n", 6) = 6',
        '+++ exited with 0 +++',
        'Aplikasi berkomunikasi dengan kernel'
      ],
      note: 'Contoh komunikasi melalui System Call'
    },
    figCaption: 'GAMBAR 05 — ARSITEKTUR LINUX',
    illustrationType: 'architecture',
    botanicalTag: 'Ginkgo biloba · Pohon Rambut Gadis',
    diagramLayers: [
      { name: 'Lapisan 5: Aplikasi', desc: 'Firefox, VLC, GIMP, dan aplikasi lainnya' },
      { name: 'Lapisan 4: Layanan Sistem', desc: 'Mengatur layanan yang berjalan di komputer' },
      { name: 'Lapisan 3: Pustaka Sistem', desc: 'Mendukung fungsi aplikasi' },
      { name: 'Lapisan 2: Kernel', desc: 'Mengatur proses, memori, dan perangkat' },
      { name: 'Lapisan 1: Perangkat Keras', desc: 'CPU, RAM, dan penyimpanan' }
    ]
  },
  {
    id: 6,
    title: 'Sistem Berkas Linux',
    subtitle: 'Struktur folder untuk menyimpan data',
    kicker: 'The Linux Sketchbook 06 / 09 · Sistem Berkas',
    summary: 'Linux menggunakan satu direktori utama bernama root (/). Semua file, folder, dan media penyimpanan disusun dalam satu struktur.',
    fullProse: [
      'Semua folder di Linux berawal dari direktori utama yang disebut root (/).',
      'Beberapa folder penting adalah /home untuk file pengguna, /etc untuk konfigurasi, /var untuk log, dan /dev untuk perangkat.',
      'Struktur ini memudahkan pengguna dalam mengatur dan menemukan file sistem maupun file pribadi.'
    ],
    historicalContext: 'Filesystem Hierarchy Standard (FHS)',
    callout: { label: 'FOLDER PENTING', value: '/ · /home · /etc · /var · /dev' },
    terminal: {
      prompt: 'explorer@root-tree:~$',
      command: 'tree -L 1 -d /',
      output: [
        '/ (Root)',
        '├── bin (Program dasar)',
        '├── etc (Konfigurasi)',
        '├── home (File pengguna)',
        '├── var (Data dan log)',
        '└── dev (Perangkat)'
      ],
      note: 'Contoh struktur direktori Linux'
    },
    figCaption: 'GAMBAR 06 — STRUKTUR FOLDER LINUX',
    illustrationType: 'filesystem',
    botanicalTag: 'Acer palmatum · Maple Jepang',
  },
  {
    id: 7,
    title: 'Mengenal Terminal',
    subtitle: 'Mengoperasikan Linux dengan perintah teks',
    kicker: 'The Linux Sketchbook 07 / 09 · Terminal',
    summary: 'Terminal adalah aplikasi untuk memberikan perintah langsung kepada komputer melalui teks. Terminal memudahkan pengguna mengelola file, aplikasi, dan sistem.',
    fullProse: [
      'Terminal digunakan untuk menjalankan perintah tanpa harus membuka banyak menu.',
      'Perintah diketik melalui Shell, yaitu program yang membaca dan menjalankan perintah pengguna. Contohnya Bash dan Zsh.',
      'Terminal dapat menggabungkan beberapa perintah menggunakan tanda pipa (|) untuk menyelesaikan pekerjaan dengan lebih cepat.'
    ],
    historicalContext: 'Bash (1989) · Shell · Terminal',
    callout: { label: 'FUNGSI TERMINAL', value: 'Menjalankan · Mengelola · Memeriksa' },
    terminal: {
      prompt: 'student@terminal-study:~$',
      command: 'cat /var/log/auth.log | grep "Failed" | wc -l',
      output: [
        '42',
        '# Jumlah baris yang berisi kata Failed',
        '# Contoh penggunaan kombinasi perintah'
      ],
      note: 'Menggabungkan perintah menggunakan tanda pipa'
    },
    figCaption: 'GAMBAR 07 — PENGGUNAAN TERMINAL',
    illustrationType: 'terminal',
    botanicalTag: 'Betula pendula · Birch Perak',
  },
  {
    id: 8,
    title: 'Perintah Dasar Linux',
    subtitle: 'Perintah penting untuk penggunaan sehari-hari',
    kicker: 'The Linux Sketchbook 08 / 09 · Perintah Dasar',
    summary: 'Perintah dasar Linux digunakan untuk melihat folder, membuat file, memindahkan data, menghapus file, dan mengatur hak akses.',
    fullProse: [
      'pwd digunakan untuk melihat lokasi folder, ls untuk melihat isi folder, dan cd untuk berpindah folder.',
      'mkdir digunakan untuk membuat folder, cp untuk menyalin file, mv untuk memindahkan file, dan rm untuk menghapus file.',
      'Perintah grep digunakan untuk mencari teks, chmod untuk mengatur izin file, dan man untuk melihat panduan perintah.'
    ],
    historicalContext: 'GNU Coreutils · Perintah Dasar Linux',
    callout: { label: 'PERINTAH PENTING', value: 'pwd · ls · cd · mkdir · cp · mv · grep · chmod · man' },
    terminal: {
      prompt: 'field@botanical-station:~$',
      command: 'ls -lh --color=auto',
      output: [
        'total 24K',
        '-rw-r--r-- 1 field field 3.4K flora.txt',
        'drwxr-xr-x 2 field field 4.0K sketches/',
        '-rwxr-xr-x 1 field field 842 catalog.sh'
      ],
      note: 'Menampilkan daftar file dan folder'
    },
    figCaption: 'GAMBAR 08 — PERINTAH DASAR LINUX',
    illustrationType: 'terminal',
    botanicalTag: 'Hedera helix · Ivy Biasa',
  },
  {
    id: 9,
    title: 'Linux dan Keamanan Siber',
    subtitle: 'Melindungi sistem dari akses yang tidak diinginkan',
    kicker: 'The Linux Sketchbook 09 / 09 · Keamanan',
    summary: 'Linux memiliki berbagai fitur keamanan untuk melindungi sistem, seperti pengaturan izin file, penggunaan sudo, SSH, dan firewall.',
    fullProse: [
      'Keamanan Linux dimulai dengan membatasi akses pengguna sesuai kebutuhan. Perintah sudo digunakan untuk menjalankan tugas yang membutuhkan hak administrator.',
      'Perintah chmod digunakan untuk mengatur izin membaca, mengubah, dan menjalankan file. SSH digunakan untuk mengakses komputer lain secara aman melalui jaringan.',
      'Linux juga menyediakan SELinux, AppArmor, dan firewall untuk membantu melindungi sistem dari aktivitas yang berbahaya.'
    ],
    historicalContext: 'Hak Akses · SSH · Firewall · Perlindungan Sistem',
    callout: { label: 'FITUR KEAMANAN', value: 'sudo · chmod · SSH · SELinux · Firewall' },
    terminal: {
      prompt: 'secops@sentinel:~$',
      command: 'sudo ss -tulpn | grep LISTEN',
      output: [
        'tcp LISTEN 127.0.0.1:22',
        'tcp LISTEN 0.0.0.0:443',
        '[ audit: Periksa layanan jaringan ]'
      ],
      note: 'Memeriksa port yang sedang digunakan'
    },
    figCaption: 'GAMBAR 09 — KEAMANAN LINUX',
    illustrationType: 'security',
    botanicalTag: 'Ilex aquifolium · Holly Eropa',
  }
];