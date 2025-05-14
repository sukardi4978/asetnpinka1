async function searchAsset() {
  const input = document.getElementById('searchInput').value.trim();
  if (!input) return;

  const kode = input.endsWith("-0") ? input.slice(0, -2) : input;
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRrJnXUyKUTRr9R.../pub?output=csv';

  const res = await fetch(url);
  const text = await res.text();
  const rows = text.split("\n").map(row => row.split(","));

  const hasil = rows.find(r => {
    const kodeAset = r[0]?.trim();
    return kodeAset === input || (kodeAset === kode + "-0" && !input.includes("-"));
  });

  const resultDiv = document.getElementById("result");
  if (!hasil) {
    resultDiv.innerHTML = "<p>Aset tidak ditemukan.</p>";
    return;
  }

  const [kodeAset, deskripsi, kapitalisasi, nilai, , opname, , , lokasi, detail] = hasil;
  const tahun = kapitalisasi ? new Date(kapitalisasi).getFullYear() : "-";
  const nilaiRp = nilai ? parseInt(nilai).toLocaleString("id-ID", { style: "currency", currency: "IDR" }) : "-";

  resultDiv.innerHTML = `
    <p><strong>Kode Aset:</strong> ${kodeAset}</p>
    <p><strong>Deskripsi:</strong> ${deskripsi}</p>
    <p><strong>Kapitalisasi:</strong> ${tahun}</p>
    <p><strong>Nilai Perolehan:</strong> ${nilaiRp}</p>
    <p><strong>Lokasi:</strong> ${lokasi}</p>
    <p><strong>Detail Lokasi:</strong> ${detail}</p>
    <p><strong>Opname Terakhir:</strong> ${opname}</p>
  `;
}