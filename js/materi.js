// =========================================================
// MATERI: render dari data, tab materi, animasi canvas alur data
// =========================================================
function renderTujuan() {
  const c = document.getElementById('tujuan-list');
  if (!c) return;
  c.innerHTML = tujuanItems.map((t, i) => `
    <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center space-x-3">
      <span class="w-7 h-7 rounded-xl bg-brand-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0">${String(i + 1).padStart(2, '0')}</span>
      <p class="text-xs text-slate-700 font-medium">${t}</p>
    </div>`).join('');
}

function renderDailyExamples() {
  const c = document.getElementById('daily-examples-container');
  if (!c) return;
  c.innerHTML = dailyExamples.map(d => `
    <div class="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
      <img src="${d.img}" alt="${d.title}" class="w-full h-24 object-cover" onerror="this.src='${d.fallback}'">
      <div class="p-2.5">
        <h5 class="font-bold text-xs text-slate-800">${d.title}</h5>
        <p class="text-[10px] text-slate-600 mt-0.5"><strong>HW:</strong> ${d.hw}<br><strong>SW:</strong> ${d.sw}<br><strong>BW:</strong> ${d.bw}</p>
      </div>
    </div>`).join('');
}

function renderHardwareList() {
  const c = document.getElementById('hardware-list-container');
  if (!c) return;
  c.innerHTML = hardwareItems.map(item => `
    <div class="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 flex items-center gap-3">
      <img src="${item.img}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" onerror="this.src='https://placehold.co/150x150/2563eb/ffffff?text=${item.no}'">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5">
          <span class="bg-brand-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-md">${item.no}</span>
          <h4 class="font-bold text-xs text-slate-800 truncate">${item.name}</h4>
        </div>
        <p class="text-[11px] text-slate-600 mt-1 leading-snug">${item.desc}</p>
      </div>
    </div>`).join('');
}

function renderBrainware() {
  const c = document.getElementById('brainware-container');
  if (!c) return;
  c.innerHTML = brainwareItems.map(b => `
    <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
      <div class="w-8 h-8 rounded-xl ${b.bg} ${b.text} flex items-center justify-center shrink-0 mt-0.5"><i class="fas ${b.icon}"></i></div>
      <div>
        <h4 class="font-bold text-slate-800">${b.title}</h4>
        <p class="text-[11px] text-slate-500">${b.desc}</p>
      </div>
    </div>`).join('');
}

function renderSelfEval() {
  const c = document.getElementById('self-eval-list');
  if (!c) return;
  c.innerHTML = selfEvalItems.map(t => `
    <label class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-indigo-300 transition">
      <span class="text-slate-700 font-medium pr-2">${t}</span>
      <input type="checkbox" class="self-eval-chk accent-indigo-600 w-5 h-5 rounded shrink-0">
    </label>`).join('');
}

function renderReferensi() {
  const c = document.getElementById('ref-list');
  if (!c) return;
  c.innerHTML = referensiItems.map(r => `
    <div class="p-2.5 rounded-xl border ${r.cls}">
      <strong class="${r.titleCls} block">${r.title}</strong>
      ${r.html}
    </div>`).join('');
}

function fillMeta() {
  document.querySelectorAll('[data-meta]').forEach(el => {
    const key = el.getAttribute('data-meta');
    if (META[key]) el.textContent = META[key];
  });
}

// Tab materi
// Tambah tab baru: tambah id di array 'tabs', tombol id="tab-ID-btn", dan div id="materi-ID" di index.html
function switchMateriTab(tabName) {
  playAudio('click');
  const tabs = ['konsep', 'komponen', 'hw', 'swbw'];
  tabs.forEach(t => {
    document.getElementById(`materi-${t}`).classList.add('hidden');
    const btn = document.getElementById(`tab-${t}-btn`);
    if (btn) btn.className = "flex-1 py-2 px-2.5 rounded-xl text-slate-600 whitespace-nowrap transition font-medium";
  });
  document.getElementById(`materi-${tabName}`).classList.remove('hidden');
  const activeBtn = document.getElementById(`tab-${tabName}-btn`);
  if (activeBtn) activeBtn.className = "flex-1 py-2 px-2.5 rounded-xl bg-white shadow text-brand-600 font-bold whitespace-nowrap transition";
  if (tabName === 'konsep') setTimeout(initCanvasAnimation, 100);
}

// ---------- Animasi alur data (canvas) ----------
let canvasCtx = null;
let animParticles = [];
let animSpeed = 3.2;
let animLoopStarted = false;

function initCanvasAnimation() {
  const canvas = document.getElementById('dataFlowCanvas');
  if (!canvas) return;
  canvasCtx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 16;
  canvas.height = 144;
  if (!animLoopStarted) {
    animLoopStarted = true;
    renderCanvasFrame();
  }
}

function setAnimSpeed(spd) {
  playAudio('click');
  animSpeed = spd;
  document.getElementById('spd-slow').className = spd === 1.5
    ? "px-2 py-0.5 rounded-lg bg-brand-600 text-white font-bold"
    : "px-2 py-0.5 rounded-lg bg-slate-200 text-slate-700 font-bold";
  document.getElementById('spd-fast').className = spd === 3.2
    ? "px-2 py-0.5 rounded-lg bg-brand-600 text-white font-bold"
    : "px-2 py-0.5 rounded-lg bg-slate-200 text-slate-700 font-bold";
}

function stepSinglePacket() {
  playAudio('click');
  const txt = document.getElementById('sim-input-text').value.trim() || "DATA";
  animParticles.push({ x: 42, y: 68, label: txt[0], speed: animSpeed });
}

function sendBurstData() {
  playAudio('correct');
  const txt = document.getElementById('sim-input-text').value.trim() || "SISTEM";
  txt.split('').forEach((ch, idx) => {
    setTimeout(() => {
      animParticles.push({ x: 42, y: 68, label: ch, speed: animSpeed });
    }, idx * 220);
  });
}

function renderCanvasFrame() {
  if (canvasCtx && canvasCtx.canvas.width > 0) {
    const w = canvasCtx.canvas.width;
    const h = canvasCtx.canvas.height;
    canvasCtx.clearRect(0, 0, w, h);

    const x1 = 42, x2 = w / 2, x3 = w - 42, yMid = 68;

    canvasCtx.strokeStyle = '#334155';
    canvasCtx.lineWidth = 3;
    canvasCtx.beginPath();
    canvasCtx.moveTo(x1, yMid);
    canvasCtx.lineTo(x3, yMid);
    canvasCtx.stroke();

    // Input
    canvasCtx.fillStyle = '#10b981';
    canvasCtx.beginPath(); canvasCtx.arc(x1, yMid, 16, 0, Math.PI * 2); canvasCtx.fill();
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.font = 'bold 10px sans-serif';
    canvasCtx.textAlign = 'center';
    canvasCtx.fillText('IN', x1, yMid + 3);
    canvasCtx.fillStyle = '#6ee7b7';
    canvasCtx.fillText('1. INPUT', x1, yMid + 34);

    // CPU / RAM
    canvasCtx.fillStyle = '#2563eb';
    canvasCtx.beginPath(); canvasCtx.arc(x2, yMid, 20, 0, Math.PI * 2); canvasCtx.fill();
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.fillText('CPU', x2, yMid + 3);
    canvasCtx.fillStyle = '#93c5fd';
    canvasCtx.fillText('2. PROSES', x2, yMid + 34);

    // Output
    canvasCtx.fillStyle = '#8b5cf6';
    canvasCtx.beginPath(); canvasCtx.arc(x3, yMid, 16, 0, Math.PI * 2); canvasCtx.fill();
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.fillText('OUT', x3, yMid + 3);
    canvasCtx.fillStyle = '#c4b5fd';
    canvasCtx.fillText('3. OUTPUT', x3, yMid + 34);

    // Paket data
    for (let i = animParticles.length - 1; i >= 0; i--) {
      const p = animParticles[i];
      p.x += p.speed;
      const isProcessed = p.x >= x2;
      canvasCtx.fillStyle = isProcessed ? '#a78bfa' : '#34d399';
      canvasCtx.beginPath();
      canvasCtx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      canvasCtx.fill();
      canvasCtx.fillStyle = '#fef08a';
      canvasCtx.font = 'bold 11px sans-serif';
      canvasCtx.fillText(isProcessed ? `[${p.label}]` : p.label, p.x, p.y - 16);
      if (p.x >= x3) animParticles.splice(i, 1);
    }
  }
  requestAnimationFrame(renderCanvasFrame);
}
