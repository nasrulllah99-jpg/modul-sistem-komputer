// =========================================================
// AKTIVITAS: tab, Game 1 (sortir), Game 2 (rakit PC), tugas mini
// =========================================================
function switchSimTab(tab) {
  playAudio('click');
  ['sortir', 'rakit', 'proyek'].forEach((t, idx) => {
    document.getElementById(`sim-${t}`).classList.add('hidden');
    document.getElementById(`sim-tab-${idx + 1}`).className = "flex-1 py-2 rounded-xl text-slate-600 transition";
  });
  document.getElementById(`sim-${tab}`).classList.remove('hidden');
  const activeIdx = tab === 'sortir' ? 1 : tab === 'rakit' ? 2 : 3;
  document.getElementById(`sim-tab-${activeIdx}`).className = "flex-1 py-2 rounded-xl bg-white shadow text-purple-600 font-bold transition";
}

// ---------- Game 1: Sortir ----------
let sortIdx = 0;
let sortScore = 0;
let sortLives = 3;

function renderSortItem() {
  const maxScore = sortGameItems.length * 10;
  if (sortIdx >= sortGameItems.length || sortLives <= 0) {
    document.getElementById('sort-game-area').classList.add('hidden');
    document.getElementById('sort-game-result').classList.remove('hidden');
    document.getElementById('sort-end-title').innerText = sortLives > 0 ? "Hebat! Semua Item Tersortir!" : "Kesempatan Habis!";
    document.getElementById('sort-end-desc').innerText = `Skor akhir klasifikasi kamu: ${sortScore} dari ${maxScore} poin.`;
    return;
  }
  const item = sortGameItems[sortIdx];
  document.getElementById('sort-progress-text').innerText = `Item ${sortIdx + 1} dari ${sortGameItems.length}`;
  document.getElementById('sort-item-name').innerText = item.name;
  document.getElementById('sort-item-icon').className = `${item.icon.startsWith('fab') ? item.icon : 'fas ' + item.icon} text-brand-600 text-3xl mb-1.5`;
  document.getElementById('sort-score-badge').innerText = `Skor: ${sortScore}`;
  document.getElementById('sort-lives-badge').innerText = "❤️".repeat(sortLives) || "💔";
}

function checkSortAnswer(chosenCategory) {
  const current = sortGameItems[sortIdx];
  const msgEl = document.getElementById('sort-feedback-msg');
  if (chosenCategory === current.category) {
    playAudio('correct');
    sortScore += 10;
    msgEl.className = "text-[11px] font-bold text-emerald-600 min-h-[18px]";
    msgEl.innerText = `Benar! ${current.name} adalah ${current.category}.`;
    sortIdx++;
    setTimeout(() => {
      msgEl.className = "text-[11px] font-semibold text-slate-500 min-h-[18px]";
      msgEl.innerText = "Termasuk kelompok manakah item di atas?";
      renderSortItem();
    }, 550);
  } else {
    playAudio('wrong');
    sortLives--;
    msgEl.className = "text-[11px] font-bold text-rose-600 min-h-[18px]";
    msgEl.innerText = `Kurang tepat! ${current.name} bukan ${chosenCategory}.`;
    document.getElementById('sort-lives-badge').innerText = "❤️".repeat(sortLives) || "💔";
    if (sortLives <= 0) setTimeout(renderSortItem, 600);
  }
}

function resetSortGame() {
  playAudio('click');
  sortIdx = 0;
  sortScore = 0;
  sortLives = 3;
  document.getElementById('sort-game-result').classList.add('hidden');
  document.getElementById('sort-game-area').classList.remove('hidden');
  renderSortItem();
}

// ---------- Game 2: Rakit komputer ----------
let selectedInv = null;
let builtComponents = { cpu: false, ram: false, ssd: false, io: false };
const componentDescriptions = {
  cpu: "CPU (Central Processing Unit) dipilih! Pasang ke Soket Processor sebagai otak pemroses utama.",
  ram: "RAM dipilih! Pasang ke Slot Memori untuk menyimpan data sementara saat komputer bekerja.",
  ssd: "SSD dipilih! Pasang ke Port Penyimpanan untuk menyimpan sistem operasi & dokumen permanen.",
  io: "Monitor & Keyboard dipilih! Pasang ke Port I/O untuk memasukkan data dan menampilkan informasi."
};

function selectInventory(type) {
  playAudio('click');
  selectedInv = type;
  ['cpu', 'ram', 'ssd', 'io'].forEach(t => {
    const btn = document.getElementById(`inv-${t}`);
    if (t === type) btn.classList.add('border-brand-500', 'bg-blue-50', 'ring-2', 'ring-brand-400');
    else btn.classList.remove('border-brand-500', 'bg-blue-50', 'ring-2', 'ring-brand-400');
  });
  document.getElementById('pc-assembly-info').innerHTML = `<i class="fas fa-hand-pointer text-amber-400 mr-1"></i> ${componentDescriptions[type]}`;
}

function placeComponent(targetSlot) {
  if (!selectedInv) {
    showToast("Pilih komponen dari daftar di bawah terlebih dahulu!", "fa-hand-pointer text-amber-400");
    return;
  }
  if (selectedInv === targetSlot) {
    playAudio('correct');
    builtComponents[targetSlot] = true;
    const slotEl = document.getElementById(`slot-${targetSlot}`);
    const iconEl = document.getElementById(`icon-${targetSlot}`);
    const textEl = document.getElementById(`text-${targetSlot}`);
    slotEl.className = "h-20 rounded-2xl border-2 border-emerald-500 bg-emerald-950/60 flex flex-col items-center justify-center p-2 text-center shadow-md";
    iconEl.className = "fas fa-circle-check text-emerald-400 text-xl mb-1";
    textEl.innerText = `${targetSlot.toUpperCase()} Terpasang!`;
    textEl.className = "text-[10px] font-extrabold text-emerald-300";

    const count = Object.values(builtComponents).filter(Boolean).length;
    document.getElementById('pc-build-score').innerText = `Terpasang: ${count} / 4`;
    if (count === 4) {
      document.getElementById('pc-assembly-info').innerHTML = `<i class="fas fa-circle-check text-emerald-400 mr-1"></i> <strong>Sempurna!</strong> Seluruh komponen komputer berhasil dirakit dan siap dijalankan!`;
      showToast("Selamat! Komputer berhasil dirakit lengkap!", "fa-trophy text-amber-400");
    }
  } else {
    playAudio('wrong');
    showToast("Slot tidak cocok! Perhatikan label soket pada papan.", "fa-triangle-exclamation text-rose-400");
  }
}

function resetPcBuilder() {
  playAudio('click');
  selectedInv = null;
  builtComponents = { cpu: false, ram: false, ssd: false, io: false };
  document.getElementById('pc-build-score').innerText = "Terpasang: 0 / 4";
  document.getElementById('pc-assembly-info').innerHTML = `<i class="fas fa-circle-info text-brand-400 mr-1"></i> Pilih salah satu komponen di bawah untuk mulai merakit.`;
  const defaultSlots = {
    cpu: { icon: "fa-microchip", label: "Soket Processor (CPU)" },
    ram: { icon: "fa-memory", label: "Slot Memori (RAM)" },
    ssd: { icon: "fa-hard-drive", label: "Port Penyimpanan (SSD)" },
    io: { icon: "fa-desktop", label: "Port Monitor & Keyboard" }
  };
  Object.keys(defaultSlots).forEach(k => {
    document.getElementById(`slot-${k}`).className = "h-20 rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800/70 flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:border-brand-400 transition";
    document.getElementById(`icon-${k}`).className = `fas ${defaultSlots[k].icon} text-slate-500 text-lg mb-1`;
    document.getElementById(`text-${k}`).innerText = defaultSlots[k].label;
    document.getElementById(`text-${k}`).className = "text-[10px] font-bold text-slate-400";
    document.getElementById(`inv-${k}`).classList.remove('border-brand-500', 'bg-blue-50', 'ring-2', 'ring-brand-400');
  });
}

// ---------- Tugas mini (disimpan di localStorage) ----------
const ACTIVITY_STORAGE_KEY = 'edukomputer_vii_activity';

function saveStudentActivity() {
  playAudio('correct');
  const data = {
    hw1: document.getElementById('mini-hw-1').value,
    hw2: document.getElementById('mini-hw-2').value,
    hw3: document.getElementById('mini-hw-3').value,
    projName: document.getElementById('proj-comp-name').value,
    projDesc: document.getElementById('proj-comp-desc').value
  };
  try { localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  const statusEl = document.getElementById('activity-save-status');
  statusEl.innerText = "✓ Catatan Aktivitas Mini & Rancangan Proyek tersimpan di perangkat!";
  statusEl.classList.remove('hidden');
  showToast("Catatan aktivitas & proyek berhasil disimpan!", "fa-circle-check text-emerald-400");
}

function loadSavedActivity() {
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      document.getElementById('mini-hw-1').value = data.hw1 || '';
      document.getElementById('mini-hw-2').value = data.hw2 || '';
      document.getElementById('mini-hw-3').value = data.hw3 || '';
      document.getElementById('proj-comp-name').value = data.projName || '';
      document.getElementById('proj-comp-desc').value = data.projDesc || '';
    }
  } catch (e) {}
}
