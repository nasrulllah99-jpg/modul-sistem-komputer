// =========================================================
// AUDIO: efek suara (Web Audio API) & narasi (Web Speech API)
// =========================================================
let isAudioPlaying = false;

function playAudio(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(210, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch (e) {}
}

function stopAudioNarration() {
  isAudioPlaying = false;
  document.getElementById('audio-play-icon').className = "fas fa-play text-[10px] ml-0.5";
  document.getElementById('audio-visualizer').classList.add('opacity-30');
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function toggleAudioNarration() {
  const btnIcon = document.getElementById('audio-play-icon');
  const statusText = document.getElementById('audio-status-text');
  const visualizer = document.getElementById('audio-visualizer');

  if (!isAudioPlaying) {
    isAudioPlaying = true;
    btnIcon.className = "fas fa-stop text-[10px]";
    statusText.innerText = "Membacakan narasi materi...";
    visualizer.classList.remove('opacity-30');
    playAudio('click');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = screenNarrations[currentScreen] || screenNarrations.home;
      const utter = new SpeechSynthesisUtterance(textToRead);
      utter.lang = 'id-ID';
      utter.rate = 0.98;
      utter.onend = () => {
        stopAudioNarration();
        statusText.innerText = "Narasi selesai diputar";
      };
      utter.onerror = () => {
        stopAudioNarration();
        statusText.innerText = "Narasi suara selesai";
      };
      window.speechSynthesis.speak(utter);
    } else {
      showToast("Browser mendukung visual visualizer audio.", "fa-volume-high text-brand-400");
    }
  } else {
    stopAudioNarration();
    statusText.innerText = "Audio dihentikan";
  }
}
