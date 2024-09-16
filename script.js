// Simulasi Pencatatan Jurnal Umum Otomatis berdasarkan deskripsi transaksi
const form = document.getElementById('journal-form');
const journalTable = document.getElementById('journal-table').getElementsByTagName('tbody')[0];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value.toLowerCase();
    const amount = parseFloat(document.getElementById('amount').value);

    let debitAccount = '';
    let creditAccount = '';

    // Logika otomatis berdasarkan deskripsi transaksi
    if (description.includes('penjualan')) {
        debitAccount = 'Kas';
        creditAccount = 'Penjualan';
    } else if (description.includes('pembelian')) {
        debitAccount = 'Persediaan';
        creditAccount = 'Kas';
    } else if (description.includes('pembayaran hutang')) {
        debitAccount = 'Hutang Usaha';
        creditAccount = 'Kas';
    } else if (description.includes('penerimaan piutang')) {
        debitAccount = 'Kas';
        creditAccount = 'Piutang Usaha';
    } else {
        alert('Deskripsi transaksi tidak dikenali. Silakan masukkan deskripsi yang valid seperti "penjualan", "pembelian", "pembayaran hutang", atau "penerimaan piutang".');
        return;
    }

    // Menambahkan transaksi ke tabel jurnal umum
    const row = journalTable.insertRow();
    const dateCell = row.insertCell(0);
    const descriptionCell = row.insertCell(1);
    const debitAccountCell = row.insertCell(2);
    const debitAmountCell = row.insertCell(3);
    const creditAccountCell = row.insertCell(4);
    const creditAmountCell = row.insertCell(5);

    dateCell.textContent = date;
    descriptionCell.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    debitAccountCell.textContent = debitAccount;
    debitAmountCell.textContent = "Rp " + amount.toLocaleString();
    creditAccountCell.textContent = creditAccount;
    creditAmountCell.textContent = "Rp " + amount.toLocaleString();

    // Reset form setelah transaksi tercatat
    form.reset();
});

// Fungsi untuk Kuis Interaktif
function checkInteractiveQuiz() {
    let score = 0;
    let result = document.getElementById("quiz-interaktif-result");
    let feedback = "";

    // Mendapatkan jawaban dari setiap pertanyaan
    let q1Debit = document.getElementById("q1-debit").value;
    let q1Kredit = document.getElementById("q1-kredit").value;
    let q2Debit = document.getElementById("q2-debit").value;
    let q2Kredit = document.getElementById("q2-kredit").value;
    let q3Debit = document.getElementById("q3-debit").value;
    let q3Kredit = document.getElementById("q3-kredit").value;
    let q4Debit = document.getElementById("q4-debit").value;
    let q4Kredit = document.getElementById("q4-kredit").value;

    // Validasi: Pastikan semua pertanyaan telah dijawab
    if (!q1Debit || !q1Kredit || !q2Debit || !q2Kredit || !q3Debit || !q3Kredit || !q4Debit || !q4Kredit) {
        result.textContent = "Silakan jawab semua pertanyaan sebelum mengirimkan.";
        result.style.color = "red";
        result.style.fontWeight = "bold";
        return;
    }

    // Evaluasi Pertanyaan 1
    if (q1Debit === "Kas" && q1Kredit === "Pendapatan") {
        score += 1;
        feedback += "Pertanyaan 1: Benar. Ketika ada penjualan tunai, 'Kas' akan bertambah dan harus didebit, sedangkan 'Pendapatan' dikredit.\n";
    } else {
        feedback += "Pertanyaan 1: Salah. Untuk penjualan tunai, 'Kas' harus didebit dan 'Pendapatan' harus dikredit.\n";
    }

    // Evaluasi Pertanyaan 2
    if (q2Debit === "Perlengkapan" && q2Kredit === "Hutang Usaha") {
        score += 1;
        feedback += "Pertanyaan 2: Benar. Pembelian secara kredit berarti 'Perlengkapan' akan bertambah dan 'Hutang Usaha' bertambah, jadi 'Perlengkapan' didebit dan 'Hutang Usaha' dikredit.\n";
    } else {
        feedback += "Pertanyaan 2: Salah. Dalam pembelian kredit, 'Perlengkapan' didebit dan 'Hutang Usaha' dikredit.\n";
    }

    // Evaluasi Pertanyaan 3
    if (q3Debit === "Beban Gaji" && q3Kredit === "Kas") {
        score += 1;
        feedback += "Pertanyaan 3: Benar. Untuk pembayaran gaji, 'Beban Gaji' didebit karena bertambah, dan 'Kas' dikredit karena berkurang.\n";
    } else {
        feedback += "Pertanyaan 3: Salah. Saat membayar gaji, 'Beban Gaji' harus didebit dan 'Kas' harus dikredit.\n";
    }

    // Evaluasi Pertanyaan 4
    if (q4Debit === "Kas" && q4Kredit === "Piutang Usaha") {
        score += 1;
        feedback += "Pertanyaan 4: Benar. Penerimaan piutang mengakibatkan bertambahnya 'Kas', yang harus didebit, dan berkurangnya 'Piutang Usaha', yang harus dikredit.\n";
    } else {
        feedback += "Pertanyaan 4: Salah. Dalam penerimaan piutang, 'Kas' didebit dan 'Piutang Usaha' dikredit.\n";
    }

    // Menampilkan hasil dan evaluasi secara dinamis
    if (score === 4) {
        result.textContent = `Nilai Anda: ${score}/4. Bagus sekali! Anda memahami pencatatan jurnal umum dengan baik.\n\n${feedback}`;
        result.style.color = 'green';
        result.style.fontWeight = "bold";
    } else {
        result.textContent = `Nilai Anda: ${score}/4. Coba lagi untuk memperbaiki pemahaman Anda.\n\n${feedback}`;
        result.style.color = 'red';
        result.style.fontWeight = "bold";
    }
}

