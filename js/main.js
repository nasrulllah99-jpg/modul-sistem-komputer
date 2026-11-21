// =========================================================
// TITIK MASUK: jalankan semua render saat halaman dimuat
// =========================================================
window.onload = function () {
  updateClock();
  setInterval(updateClock, 30000);
  fillMeta();
  renderTujuan();
  renderDailyExamples();
  renderHardwareList();
  renderBrainware();
  renderSelfEval();
  renderReferensi();
  renderSortItem();
  loadSavedActivity();
};
