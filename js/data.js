// =========================================================
// DATA KONTEN MODUL
// Edit file ini untuk mengubah / menambah materi tanpa
// menyentuh logika aplikasi.
// =========================================================

// Identitas penyusun (tampil di beranda, referensi, dan sertifikat)
const META = {
  author: "Nasrullah",
  nim: "2431711002",
  project: "Proyek UTS Mobile Learning"
};

// Tujuan pembelajaran (boleh berisi tag <strong>)
const tujuanItems = [
  "Menjelaskan <strong>pengertian sistem komputer</strong>.",
  "Mengidentifikasi <strong>komponen sistem komputer</strong>.",
  "Membedakan <strong>Hardware, Software, dan Brainware</strong>.",
  "Menjelaskan <strong>fungsi setiap komponen komputer</strong>.",
  "Memberikan <strong>contoh penggunaan sistem komputer</strong> dalam kehidupan sehari-hari."
];

// Contoh kehidupan sehari-hari (tab Komponen)
const dailyExamples = [
  {
    title: "1. ATM Bank",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=75",
    fallback: "https://placehold.co/400x200/2563eb/ffffff?text=ATM+Bank",
    hw: "Mesin ATM, Layar, Keypad", sw: "Sistem Perbankan", bw: "Nasabah, Petugas Bank"
  },
  {
    title: "2. Smartphone",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=75",
    fallback: "https://placehold.co/400x200/4f46e5/ffffff?text=Smartphone",
    hw: "Layar Sentuh, Chipset", sw: "Android / iOS, Aplikasi", bw: "Pengguna Aplikasi"
  },
  {
    title: "3. Kasir Supermarket",
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=400&q=75",
    fallback: "https://placehold.co/400x200/059669/ffffff?text=Kasir+POS",
    hw: "Barcode Scanner, PC POS", sw: "Aplikasi Kasir", bw: "Kasir & Pembeli"
  },
  {
    title: "4. Cetak Dokumen",
    img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=75",
    fallback: "https://placehold.co/400x200/d97706/ffffff?text=Printer",
    hw: "Laptop & Printer", sw: "Driver & Ms. Word", bw: "Siswa / Operator"
  }
];

// 10 perangkat keras (tab Hardware)
// Untuk memakai gambar lokal: taruh file di assets/img/ lalu isi img: "assets/img/monitor.jpg"
const hardwareItems = [
  { no: 1,  name: "MONITOR",        desc: "Menampilkan hasil pemrosesan data berupa teks, gambar, atau video.", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=75" },
  { no: 2,  name: "KEYBOARD",       desc: "Digunakan untuk memasukkan data berupa huruf, angka, dan simbol.", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=75" },
  { no: 3,  name: "MOUSE",          desc: "Digunakan untuk menggerakkan pointer dan memilih perintah di layar.", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=75" },
  { no: 4,  name: "CPU (CASE)",     desc: "Tempat menyimpan komponen penting seperti motherboard, RAM, dan power supply.", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=75" },
  { no: 5,  name: "RAM",            desc: "Menyimpan data sementara yang sedang diproses oleh komputer.", img: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=75" },
  { no: 6,  name: "HARDDISK / SSD", desc: "Menyimpan data secara permanen seperti sistem operasi, aplikasi, dan dokumen.", img: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=400&q=75" },
  { no: 7,  name: "PRINTER",        desc: "Menghasilkan keluaran berupa cetakan di atas kertas.", img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=75" },
  { no: 8,  name: "SPEAKER",        desc: "Menghasilkan keluaran berupa suara atau audio.", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=75" },
  { no: 9,  name: "WEBCAM",         desc: "Menangkap gambar atau video, digunakan untuk komunikasi online.", img: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=400&q=75" },
  { no: 10, name: "FLASHDISK",      desc: "Menyimpan dan memindahkan data dengan mudah.", img: "https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=400&q=75" }
];

// Peran brainware (tab SW & BW)
// bg / text = kelas warna Tailwind untuk kotak ikon
const brainwareItems = [
  { title: "1. Siswa",         desc: "Menggunakan komputer untuk belajar, membuat tugas, dan mencari informasi.", icon: "fa-user-graduate",       bg: "bg-blue-100",    text: "text-brand-600" },
  { title: "2. Guru",          desc: "Menggunakan komputer untuk mengajar, membuat materi, dan menilai hasil belajar.", icon: "fa-chalkboard-user", bg: "bg-emerald-100", text: "text-emerald-600" },
  { title: "3. Programmer",    desc: "Membuat dan mengembangkan software atau aplikasi untuk kebutuhan tertentu.", icon: "fa-laptop-code",    bg: "bg-purple-100",  text: "text-purple-600" },
  { title: "4. Teknisi",       desc: "Merawat hardware dan software agar komputer selalu berfungsi dengan baik.", icon: "fa-screwdriver-wrench", bg: "bg-amber-100", text: "text-amber-600" },
  { title: "5. Administrator", desc: "Mengelola sistem, data, dan jaringan komputer di organisasi atau sekolah.", icon: "fa-network-wired",  bg: "bg-rose-100",    text: "text-rose-600" }
];

// Game 1: klasifikasi (category: "Hardware" | "Software" | "Brainware")
// icon: kelas FontAwesome. Awali "fab " untuk ikon brand (contoh "fab fa-windows").
const sortGameItems = [
  { name: "Monitor",    category: "Hardware",  icon: "fa-desktop" },
  { name: "Windows",    category: "Software",  icon: "fab fa-windows" },
  { name: "Programmer", category: "Brainware", icon: "fa-laptop-code" },
  { name: "RAM",        category: "Hardware",  icon: "fa-memory" },
  { name: "Canva",      category: "Software",  icon: "fa-palette" },
  { name: "Teknisi",    category: "Brainware", icon: "fa-screwdriver-wrench" },
  { name: "Printer",    category: "Hardware",  icon: "fa-print" },
  { name: "Linux",      category: "Software",  icon: "fab fa-linux" },
  { name: "Siswa",      category: "Brainware", icon: "fa-user-graduate" },
  { name: "SSD",        category: "Hardware",  icon: "fa-hard-drive" }
];

// Soal kuis. answer = nomor opsi benar (mulai dari 0).
// Jumlah soal bebas; skor per soal dihitung otomatis (total 100).
const quizQuestions = [
  { q: "1. Di bawah ini yang termasuk perangkat keras komputer, kecuali ....",
    options: ["Monitor", "Mouse", "Windows", "Keyboard"], answer: 2,
    exp: "Windows adalah Sistem Operasi (Software), sedangkan Monitor, Mouse, dan Keyboard adalah perangkat keras (Hardware)." },
  { q: "2. CPU merupakan singkatan dari ....",
    options: ["Central Program Unit", "Computer Personal Unit", "Central Processing Unit", "Computer Program Unit"], answer: 2,
    exp: "CPU adalah singkatan dari Central Processing Unit yang bertugas memproses data dan instruksi." },
  { q: "3. Fungsi RAM dalam komputer adalah ....",
    options: ["Menyimpan data secara permanen", "Memproses data dan instruksi", "Menyimpan data sementara saat komputer bekerja", "Menampilkan hasil pemrosesan"], answer: 2,
    exp: "RAM (Random Access Memory) berfungsi menyimpan data sementara yang sedang diproses saat komputer menyala." },
  { q: "4. Software yang berfungsi untuk mengatur kerja komputer dan menjadi penghubung antara pengguna dengan hardware disebut ....",
    options: ["Aplikasi", "Sistem Operasi", "Brainware", "Utility"], answer: 1,
    exp: "Sistem Operasi (seperti Windows, Linux, Android, macOS) mengatur seluruh kerja komputer dan menghubungkan pengguna dengan hardware." },
  { q: "5. Berikut yang termasuk contoh brainware (pengguna), kecuali ....",
    options: ["Programmer", "Siswa", "Teknisi", "Mouse"], answer: 3,
    exp: "Mouse adalah perangkat keras (Hardware), bukan manusia pengguna komputer (Brainware)." },
  { q: "6. Perangkat yang digunakan untuk mencetak hasil dokumen di atas kertas adalah ....",
    options: ["Monitor", "Printer", "Speaker", "Scanner"], answer: 1,
    exp: "Printer adalah perangkat keluaran (output) yang mencetak hasil pemrosesan ke media kertas." },
  { q: "7. Urutan tahap pemrosesan data yang benar adalah ....",
    options: ["Input - Output - Proses", "Proses - Input - Output", "Input - Proses - Output", "Output - Proses - Input"], answer: 2,
    exp: "Urutan siklus kerja komputer adalah Input (Masukan) -> Proses (Pengolahan) -> Output (Keluaran)." },
  { q: "8. Contoh software aplikasi pengolah kata adalah ....",
    options: ["Microsoft Word", "Windows", "Linux", "Android"], answer: 0,
    exp: "Microsoft Word adalah perangkat lunak aplikasi pengolah kata, sedangkan Windows, Linux, dan Android adalah Sistem Operasi." },
  { q: "9. Data yang diproses komputer dan menghasilkan informasi disebut ....",
    options: ["Brainware", "Hardware", "Informasi", "Data"], answer: 2,
    exp: "Data mentah yang diolah oleh sistem komputer akan menghasilkan Informasi yang bermanfaat bagi pengguna." },
  { q: "10. Perangkat yang berfungsi untuk memberikan keluaran berupa suara adalah ....",
    options: ["Speaker", "Monitor", "Keyboard", "Webcam"], answer: 0,
    exp: "Speaker berfungsi menghasilkan keluaran (output) berupa suara atau audio." }
];

// Pernyataan evaluasi diri
const selfEvalItems = [
  "1. Saya memahami komponen sistem komputer.",
  "2. Saya dapat membedakan hardware, software, dan brainware.",
  "3. Saya dapat menyebutkan fungsi komponen komputer.",
  "4. Saya aktif dalam belajar dan mengikuti kegiatan pembelajaran.",
  "5. Saya siap menerapkan pengetahuan ini dalam kehidupan sehari-hari."
];


// Referensi (boleh berisi HTML sederhana). cls = kelas warna kotak.
const referensiItems = [
  {
    cls: "bg-blue-50 border-blue-100",
    titleCls: "text-brand-800",
    title: "1. Buku Siswa (Referensi Utama):",
    html: 'Wijanto, M. C., dkk. (2023). <em>Informatika untuk SMP/MTs Kelas VII (Edisi Revisi)</em>. Jakarta: Kemendikbudristek. <a href="https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/BS_INFORMATIKA_VII.pdf" target="_blank" class="text-blue-600 underline">Baca Buku</a>.'
  },
  {
    cls: "bg-slate-50 border-slate-200",
    titleCls: "text-slate-800",
    title: "2. Buku Panduan Guru:",
    html: 'Wisnubhadra, I., dkk. (2023). <em>Informatika: Panduan Guru SMP/MTs Kelas VII (Edisi Revisi)</em>. Jakarta: Kemendikbudristek. <a href="https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/BG_INFORMATIKA_VII.pdf" target="_blank" class="text-blue-600 underline">Baca Panduan Guru</a>.'
  },
  {
    cls: "bg-slate-50 border-slate-200",
    titleCls: "text-slate-800",
    title: "3. Referensi Sistem Komputer:",
    html: 'Kemdiktisaintek. (t.t.). <em>Sistem Komputer</em>. SPADA. <a href="https://lmsspada.kemdiktisaintek.go.id/mod/book/tool/print/index.php?id=146351" target="_blank" class="text-blue-600 underline">Buka Referensi</a>.'
  },
  {
    cls: "bg-slate-50 border-slate-200",
    titleCls: "text-slate-800",
    title: "4. Referensi Jurnal Ilmiah:",
    html: 'Jurnal Teknologi Informasi dan Komputer. (2023). <em>Artikel tentang Hardware, Software, dan Brainware</em>. Vol. 9, No. 3, Juni 2023. <a href="https://jurnal.undhirabali.ac.id/index.php/jutik/article/download/2262/pdf" target="_blank" class="text-blue-600 underline">Baca Jurnal</a>.'
  },
  {
    cls: "bg-slate-50 border-slate-200",
    titleCls: "text-slate-800",
    title: "5. Referensi Brainware:",
    html: 'Rosari, N. A. (2023, 13 November). <em>Apa itu brainware? Ketahui pengertian, fungsi, dan jenisnya.</em> detikEdu. <a href="https://www.detik.com/edu/detikpedia/d-7032120/apa-itu-brainware-ketahui-pengertian-fungsi-dan-jenisnya" target="_blank" class="text-blue-600 underline">Baca Artikel</a>.'
  },
  {
    cls: "bg-slate-50 border-slate-200",
    titleCls: "text-slate-800",
    title: "6. Materi Pendukung Perkuliahan:",
    html: 'Witdi Yanto, N. (t.t.). <em>Materi Sistem Komputer: Hardware, Software, dan Brainware</em>. Universitas Jayabaya. <a href="https://materiajar.jayabaya.ac.id/NUR_WITDI_YANTO_ST__M_KOM___20102025180735_Pertemuan_3.pdf" target="_blank" class="text-blue-600 underline">Buka Materi</a>.'
  },
  {
    cls: "bg-slate-50 border-slate-200",
    titleCls: "text-slate-800",
    title: "7. Video Pembelajaran:",
    html: 'eoviel. (2026, 17 Februari). <em>Bagaimana Cara Komputer Bekerja?</em> [Video]. YouTube. <a href="https://www.youtube.com/watch?v=XWiubIsUkMc" target="_blank" class="text-blue-600 underline">Tonton Video</a>.'
  }
];


// Teks narasi suara per layar (kunci = id layar)
const screenNarrations = {
  home: "Selamat datang di Modul Ajar Digital Pengenalan Dasar Sistem Komputer untuk siswa SMP kelas tujuh Kurikulum Merdeka. Teknologi bukan hanya untuk digunakan, tetapi juga untuk dipahami dan dikembangkan.",
  tujuan: "Tujuan pembelajaran modul ini adalah agar siswa mampu menjelaskan pengertian sistem komputer, mengidentifikasi komponennya, membedakan hardware, software, dan brainware, menjelaskan fungsinya, serta memberikan contoh dalam kehidupan sehari-hari.",
  materi: "Sistem komputer adalah sekumpulan komponen yang saling bekerja sama mengolah data menjadi informasi melalui tahapan Input, Proses, dan Output. Tiga komponen utamanya adalah Hardware, Software, dan Brainware.",
  video: "Simak video edukasi bagaimana komputer bekerja untuk memahami hubungan antara perangkat keras, perangkat lunak, dan pengguna.",
  simulasi: "Ayo berlatih melalui game klasifikasi komponen komputer, simulasi merakit komputer, serta mencatat rancangan proyek mini poster digital.",
  kuis: "Uji pengetahuanmu dengan mengerjakan sepuluh soal pilihan ganda sistem komputer untuk mendapatkan sertifikat penyelesaian modul.",
  refleksi: "Baca kembali rangkuman materi dan isi lembar evaluasi diri untuk merefleksikan pemahamanmu tentang sistem komputer."
};

// Judul layar di bar audio
const screenTitles = {
  home: "Beranda Modul",
  tujuan: "Tujuan Pembelajaran",
  materi: "Materi Sistem Komputer",
  video: "Video Pembelajaran",
  simulasi: "Aktivitas & Simulasi",
  kuis: "Latihan 10 Soal",
  refleksi: "Rangkuman & Refleksi"
};

// Daftar layar & layar mana yang menyorot menu bawah
// Tambah layar baru: tambahkan id di sini + <section id="screen-ID"> di index.html
const screenList = ['home', 'tujuan', 'materi', 'video', 'simulasi', 'kuis', 'refleksi'];
const navHighlightMap = {
  home: 'home', tujuan: 'home', materi: 'materi', video: 'materi',
  simulasi: 'simulasi', kuis: 'kuis', refleksi: 'refleksi'
};

// Layar yang dihitung untuk progress bar (kuis & refleksi dihitung saat selesai)
const progressKeys = ['tujuan', 'materi', 'video', 'simulasi', 'kuis', 'refleksi'];
