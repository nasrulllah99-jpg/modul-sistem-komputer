// =========================================================
// KUIS & SERTIFIKAT PNG
// =========================================================
let quizCurrentIdx = 0;
let quizScore = 0;
let hasAnsweredCurrent = false;
let studentName = "Siswa SMP Kelas VII";

// Nilai per soal dihitung otomatis supaya total = 100
function pointPerQuestion() {
  return 100 / quizQuestions.length;
}

function startQuiz() {
  playAudio('click');
  const inputName = document.getElementById('student-name-input').value.trim();
  studentName = inputName || "Siswa SMP Kelas VII";
  quizCurrentIdx = 0;
  quizScore = 0;
  hasAnsweredCurrent = false;
  document.getElementById('quiz-intro-card').classList.add('hidden');
  document.getElementById('quiz-result-card').classList.add('hidden');
  document.getElementById('quiz-active-card').classList.remove('hidden');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = quizQuestions[quizCurrentIdx];
  hasAnsweredCurrent = false;
  document.getElementById('quiz-question-counter').innerText = `Soal ${quizCurrentIdx + 1} / ${quizQuestions.length}`;
  document.getElementById('quiz-live-score').innerText = `Skor: ${Math.round(quizScore)}`;
  document.getElementById('quiz-question-text').innerText = q.q;
  document.getElementById('quiz-explanation-box').classList.add('hidden');

  const container = document.getElementById('quiz-options-container');
  container.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = "w-full text-left p-3 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center justify-between";
    btn.onclick = () => selectQuizOption(idx);
    btn.id = `quiz-opt-${idx}`;
    btn.innerHTML = `
      <span><strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}</span>
      <i class="far fa-circle text-slate-300"></i>`;
    container.appendChild(btn);
  });

  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.disabled = true;
  nextBtn.className = "w-full bg-slate-300 text-white font-bold py-3 rounded-2xl text-xs transition flex items-center justify-center gap-2 cursor-not-allowed";
  nextBtn.innerHTML = quizCurrentIdx === quizQuestions.length - 1
    ? `Lihat Hasil Akhir <i class="fas fa-flag-checkered"></i>`
    : `Soal Berikutnya <i class="fas fa-arrow-right"></i>`;
}

function selectQuizOption(chosenIdx) {
  if (hasAnsweredCurrent) return;
  hasAnsweredCurrent = true;
  const q = quizQuestions[quizCurrentIdx];
  const isCorrect = chosenIdx === q.answer;

  if (isCorrect) { playAudio('correct'); quizScore += pointPerQuestion(); }
  else { playAudio('wrong'); }
  document.getElementById('quiz-live-score').innerText = `Skor: ${Math.round(quizScore)}`;

  q.options.forEach((_, i) => {
    const btn = document.getElementById(`quiz-opt-${i}`);
    btn.disabled = true;
    if (i === q.answer) {
      btn.className = "w-full text-left p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50 text-xs font-bold text-emerald-900 flex items-center justify-between";
      btn.querySelector('i').className = "fas fa-circle-check text-emerald-600";
    } else if (i === chosenIdx && !isCorrect) {
      btn.className = "w-full text-left p-3 rounded-2xl border-2 border-rose-500 bg-rose-50 text-xs font-bold text-rose-900 flex items-center justify-between";
      btn.querySelector('i').className = "fas fa-circle-xmark text-rose-600";
    } else {
      btn.className = "w-full text-left p-3 rounded-2xl border border-slate-200 text-xs text-slate-400 opacity-60 flex items-center justify-between";
    }
  });

  const expBox = document.getElementById('quiz-explanation-box');
  const expTitle = document.getElementById('quiz-exp-title');
  document.getElementById('quiz-exp-text').innerText = q.exp;
  expBox.classList.remove('hidden');
  if (isCorrect) {
    expBox.className = "p-3 rounded-2xl text-xs leading-relaxed border bg-emerald-50 border-emerald-200 text-emerald-900";
    expTitle.innerText = "✓ Jawaban Tepat!";
  } else {
    expBox.className = "p-3 rounded-2xl text-xs leading-relaxed border bg-rose-50 border-rose-200 text-rose-900";
    expTitle.innerText = `✗ Kurang Tepat (Jawaban: ${String.fromCharCode(65 + q.answer)})`;
  }

  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.disabled = false;
  nextBtn.className = "w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer";
}

function nextQuestion() {
  if (!hasAnsweredCurrent) return;
  playAudio('click');
  quizCurrentIdx++;
  if (quizCurrentIdx < quizQuestions.length) renderQuizQuestion();
  else finishQuiz();
}

function finishQuiz() {
  quizScore = Math.round(quizScore);
  document.getElementById('quiz-active-card').classList.add('hidden');
  document.getElementById('quiz-result-card').classList.remove('hidden');
  document.getElementById('final-score-text').innerText = quizScore;
  document.getElementById('cert-student-name').innerText = studentName;

  const badge = document.getElementById('final-status-badge');
  const title = document.getElementById('quiz-result-title');
  const desc = document.getElementById('quiz-result-desc');

  // Batas kelulusan 70, sangat baik 90. Ubah di sini bila perlu.
  if (quizScore >= 70) {
    playAudio('correct');
    title.innerText = `Selamat, ${studentName}!`;
    desc.innerText = "Kamu berhasil menguasai materi Pengenalan Dasar Sistem Komputer!";
    badge.className = "inline-block mt-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700";
    badge.innerText = quizScore >= 90 ? "SANGAT BAIK (A)" : "LULUS (B)";
  } else {
    playAudio('wrong');
    title.innerText = `Tetap Semangat, ${studentName}!`;
    desc.innerText = "Pelajari kembali rangkuman materi & coba ulangi latihan soal untuk nilai lebih tinggi.";
    badge.className = "inline-block mt-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700";
    badge.innerText = "PERLU LATIHAN";
  }
  progress.kuis = true;
  updateProgressBar();
}

function resetQuiz() {
  playAudio('click');
  document.getElementById('quiz-result-card').classList.add('hidden');
  document.getElementById('quiz-intro-card').classList.remove('hidden');
}

function downloadCertificatePNG() {
  playAudio('correct');
  const canvas = document.getElementById('certCanvas');
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 800, 560);
  grad.addColorStop(0, '#eff6ff');
  grad.addColorStop(1, '#e0e7ff');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 560);

  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 12;
  ctx.strokeRect(24, 24, 752, 512);
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 3;
  ctx.strokeRect(38, 38, 724, 484);

  ctx.fillStyle = '#1e3a8a';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MODUL AJAR DIGITAL INFORMATIKA (TIK) • KURIKULUM MERDEKA', 400, 95);
  ctx.fillStyle = '#2563eb';
  ctx.font = 'bold 38px sans-serif';
  ctx.fillText('SERTIFIKAT PENGHARGAAN', 400, 155);
  ctx.fillStyle = '#475569';
  ctx.font = '18px sans-serif';
  ctx.fillText('Diberikan dengan bangga kepada:', 400, 205);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 34px sans-serif';
  ctx.fillText(studentName.toUpperCase(), 400, 260);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(200, 280);
  ctx.lineTo(600, 280);
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.font = '18px sans-serif';
  ctx.fillText('Telah menyelesaikan pembelajaran & evaluasi materi:', 400, 325);
  ctx.fillStyle = '#1d4ed8';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('PENGENALAN DASAR SISTEM KOMPUTER (KELAS VII SMP/MTs)', 400, 365);
  ctx.fillStyle = '#059669';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(`Nilai Evaluasi Akhir: ${quizScore} / 100`, 400, 415);

  ctx.fillStyle = '#64748b';
  ctx.font = '14px sans-serif';
  ctx.fillText(`Disusun Oleh: ${META.author} (${META.nim}) • Proyek Mobile Learning Informatika`, 400, 485);

  const link = document.createElement('a');
  link.download = `Sertifikat_Sistem_Komputer_${studentName.replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast("Sertifikat berhasil diunduh ke perangkat!", "fa-download text-emerald-400");
}
