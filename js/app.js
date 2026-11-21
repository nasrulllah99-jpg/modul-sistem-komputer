
async function saveStudentActivity() {
    const nama = document.getElementById("student-name").value.trim();

    const hw1 = document.getElementById("mini-hw-1").value.trim();
    const hw2 = document.getElementById("mini-hw-2").value.trim();
    const hw3 = document.getElementById("mini-hw-3").value.trim();

    const komponen = document.getElementById("proj-comp-name").value.trim();
    const deskripsi = document.getElementById("proj-comp-desc").value.trim();

    // Validasi data
    if (!nama || !hw1 || !hw2 || !hw3 || !komponen || !deskripsi) {
        alert("Lengkapi nama, 3 hasil observasi, dan proyek mini terlebih dahulu!");
        return;
    }

    // Periksa library jsPDF
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("Library PDF belum tersedia. Periksa koneksi internet!");
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        const tanggal = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const margin = 15;
        const lebar = 180;
        let y = 20;

        // Fungsi pemeriksaan halaman
        function cekHalaman(tinggi) {
            if (y + tinggi > 270) {
                pdf.addPage();
                y = 20;
            }
        }

        // Fungsi menulis teks otomatis
        function tulisTeks(teks, ukuran = 11, tebal = false) {
            pdf.setFont("helvetica", tebal ? "bold" : "normal");
            pdf.setFontSize(ukuran);

            const baris = pdf.splitTextToSize(teks, lebar);
            const tinggi = baris.length * 7;

            cekHalaman(tinggi);

            pdf.text(baris, margin, y);
            y += tinggi + 5;
        }

        // HEADER
        pdf.setFillColor(5, 150, 105);
        pdf.rect(0, 0, 210, 40, "F");

        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text("HASIL AKTIVITAS SISWA", margin, 18);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text("Pengenalan Dasar Sistem Komputer", margin, 27);
        pdf.text("Informatika SMP/MTs", margin, 34);

        y = 55;

        // IDENTITAS SISWA
        pdf.setTextColor(5, 150, 105);
        tulisTeks("IDENTITAS SISWA", 13, true);

        pdf.setTextColor(40, 40, 40);
        tulisTeks("Nama Lengkap: " + nama);
        tulisTeks("Tanggal: " + tanggal);

        y += 5;

        // OBSERVASI HARDWARE
        cekHalaman(20);

        pdf.setFillColor(236, 253, 245);
        pdf.roundedRect(margin - 3, y - 6, 186, 12, 2, 2, "F");

        pdf.setTextColor(5, 120, 80);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.text("01. HASIL OBSERVASI HARDWARE", margin, y + 2);

        y += 18;

        pdf.setTextColor(40, 40, 40);

        [hw1, hw2, hw3].forEach((item, index) => {
            tulisTeks((index + 1) + ". " + item);
        });

        y += 5;

        // PROYEK MINI
        cekHalaman(20);

        pdf.setFillColor(239, 246, 255);
        pdf.roundedRect(margin - 3, y - 6, 186, 12, 2, 2, "F");

        pdf.setTextColor(30, 64, 175);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.text("02. PROYEK MINI: POSTER DIGITAL", margin, y + 2);

        y += 18;

        pdf.setTextColor(40, 40, 40);

        tulisTeks("Komponen yang Dipilih:", 11, true);
        tulisTeks(komponen);

        tulisTeks("Penjelasan Fungsi dan Cara Kerja:", 11, true);
        tulisTeks(deskripsi);

        // FOOTER SEMUA HALAMAN
        const totalHalaman = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalHalaman; i++) {
            pdf.setPage(i);

            pdf.setDrawColor(200, 200, 200);
            pdf.line(15, 282, 195, 282);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8);
            pdf.setTextColor(120, 120, 120);

            pdf.text("Media Pembelajaran Informatika", 15, 288);

            pdf.text(
                "Halaman " + i + " dari " + totalHalaman,
                195,
                288,
                { align: "right" }
            );
        }

        // UNDUH PDF OTOMATIS
        const namaFile = nama
            .replace(/[^a-zA-Z0-9]/g, "_");

        pdf.save("Hasil_Aktivitas_" + namaFile + ".pdf");

        // STATUS BERHASIL
        const status = document.getElementById("activity-save-status");

        status.classList.remove("hidden");
        status.innerText = "PDF berhasil dibuat dan diunduh!";

    } catch (error) {
        console.error("Kesalahan PDF:", error);

        alert("PDF gagal dibuat. Periksa Console Browser (F12).");
    }
}
