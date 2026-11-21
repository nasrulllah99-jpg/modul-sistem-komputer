// =========================================================
// UI UMUM: navigasi layar, progress, toast, modal, jam, mode frame
// =========================================================
let currentScreen = 'home';
let isFullFrame = false;
const progress = {};
progressKeys.forEach(k => progress[k] = false);

function showToast(msg, iconClass = "fa-circle-info text-brand-400") {
  const box = document.getElementById('toast-box');
  document.getElementById('toast-icon').className = `fas ${iconClass}`;
  document.getElementById('toast-msg').innerText = msg;
  box.classList.remove('hidden');
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => box.classList.add('hidden'), 2600);
}

function toggleFrameMode() {
  const shell = document.getElementById('app-shell');
  const statusBar = document.getElementById('mobile-status-bar');
  const btnText = document.getElementById('frame-toggle-text');
  const btnIcon = document.getElementById('frame-toggle-icon');
  isFullFrame = !isFullFrame;
  if (isFullFrame) {
    shell.classList.remove('md:max-w-md', 'md:rounded-[40px]', 'md:h-[820px]', 'md:border-[8px]');
    shell.classList.add('md:max-w-2xl', 'md:rounded-3xl', 'md:h-[90vh]', 'md:border-2');
    statusBar.classList.add('md:hidden');
    btnText.innerText = "Mode HP";
    btnIcon.className = "fas fa-mobile-screen";
  } else {
    shell.classList.add('md:max-w-md', 'md:rounded-[40px]', 'md:h-[820px]', 'md:border-[8px]');
    shell.classList.remove('md:max-w-2xl', 'md:rounded-3xl', 'md:h-[90vh]', 'md:border-2');
    statusBar.classList.remove('md:hidden');
    btnText.innerText = "Layar Penuh";
    btnIcon.className = "fas fa-expand";
  }
  setTimeout(initCanvasAnimation, 200);
}

function navigateTo(screenId) {
  playAudio('click');
  stopAudioNarration();

  screenList.forEach(id => {
    const el = document.getElementById(`screen-${id}`);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(`screen-${screenId}`);
  if (target) target.classList.remove('hidden');

  // Sorot menu bawah
  ['home', 'materi', 'simulasi', 'kuis', 'refleksi'].forEach(id => {
    const btn = document.getElementById(`nav-${id}`);
    if (!btn) return;
    btn.className = (id === navHighlightMap[screenId])
      ? "flex flex-col items-center text-brand-600 font-bold text-[10px] transition"
      : "flex flex-col items-center text-slate-400 hover:text-brand-600 font-medium text-[10px] transition";
  });

  if (screenId !== 'home' && screenId in progress) {
    progress[screenId] = true;
    updateProgressBar();
  }
  currentScreen = screenId;
  document.getElementById('app-content').scrollTop = 0;

  document.getElementById('audio-topic-title').innerText = `Narasi Suara: ${screenTitles[screenId] || 'Modul'}`;
  document.getElementById('audio-status-text').innerText = "Ketuk Play untuk mendengarkan narasi";

  if (screenId === 'materi') setTimeout(initCanvasAnimation, 120);
}

function updateProgressBar() {
  const keys = Object.keys(progress);
  const completed = keys.filter(k => progress[k]).length;
  const pct = Math.round((completed / keys.length) * 100);
  document.getElementById('main-progress-bar').style.width = `${pct}%`;
  document.getElementById('header-progress-badge').innerText = `${pct}% Selesai`;
}

function toggleHelpModal() {
  playAudio('click');
  document.getElementById('help-modal').classList.toggle('hidden');
}
function toggleRefModal() {
  playAudio('click');
  document.getElementById('ref-modal').classList.toggle('hidden');
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const el = document.getElementById('clock');
  if (el) el.innerText = `${h}:${m}`;
}

// Refleksi / evaluasi diri
function submitSelfEvaluation() {
  playAudio('correct');
  const checkboxes = document.querySelectorAll('.self-eval-chk');
  let checkedCount = 0;
  checkboxes.forEach(cb => { if (cb.checked) checkedCount++; });
  const total = checkboxes.length;

  const summaryBox = document.getElementById('self-eval-summary');
  const summaryText = document.getElementById('self-eval-summary-text');
  summaryBox.classList.remove('hidden');
  if (checkedCount === total) {
    summaryText.innerText = `Luar biasa! Kamu telah mencentang seluruh (${total}/${total}) indikator refleksi diri dan siap menerapkan ilmu sistem komputer dalam kehidupan sehari-hari.`;
  } else {
    summaryText.innerText = `Kamu mencentang ${checkedCount} dari ${total} indikator refleksi. Kamu bisa membuka kembali bagian materi yang masih ingin diperdalam.`;
  }
  progress.refleksi = true;
  updateProgressBar();
  showToast("Evaluasi diri berhasil disimpan!", "fa-circle-check text-emerald-400");
}
