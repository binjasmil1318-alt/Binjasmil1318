// psikotes.js - Simulasi soal, timer, skor, pembahasan

const soal = [
  // 1-5
  { tipe: 'Logika Angka', pertanyaan: 'Berapa angka selanjutnya dari deret: 2, 4, 8, 16, ... ?', pilihan: ['18', '20', '24', '32'], jawaban: 3, pembahasan: 'Pola: dikali 2. 16 x 2 = 32.' },
  { tipe: 'Sinonim', pertanyaan: 'Sinonim dari "tegas" adalah ...', pilihan: ['lembut', 'keras', 'tepat', 'pasti'], jawaban: 1, pembahasan: 'Sinonim "tegas" adalah "keras".' },
  { tipe: 'Deret Angka', pertanyaan: 'Berapa angka selanjutnya dari deret: 5, 10, 20, 40, ... ?', pilihan: ['45', '60', '80', '100'], jawaban: 2, pembahasan: 'Pola: dikali 2. 40 x 2 = 80.' },
  { tipe: 'Antonim', pertanyaan: 'Antonim dari "berani" adalah ...', pilihan: ['takut', 'kuat', 'hebat', 'pintar'], jawaban: 0, pembahasan: 'Antonim "berani" adalah "takut".' },
  { tipe: 'Logika Gambar', pertanyaan: 'Pilih gambar yang berbeda (placeholder)', pilihan: ['A', 'B', 'C', 'D'], jawaban: 2, pembahasan: 'Contoh soal logika gambar.' },
  // 6-10
  { tipe: 'Penalaran', pertanyaan: 'Jika semua A adalah B, dan semua B adalah C, maka ...', pilihan: ['Semua A adalah C', 'Semua C adalah A', 'Tidak ada hubungan', 'A bukan C'], jawaban: 0, pembahasan: 'Logika silogisme.' },
  { tipe: 'Aritmatika', pertanyaan: 'Hasil dari 15 + 27 adalah ...', pilihan: ['32', '42', '52', '40'], jawaban: 1, pembahasan: '15 + 27 = 42.' },
  { tipe: 'Verbal', pertanyaan: 'Kata yang ejaannya benar adalah ...', pilihan: ['apotek', 'apotik', 'apoteq', 'apothik'], jawaban: 0, pembahasan: 'Ejaan yang benar: apotek.' },
  { tipe: 'Spasial', pertanyaan: 'Jika utara di atas, selatan di bawah, barat di kiri, timur di ...', pilihan: ['kanan', 'atas', 'bawah', 'kiri'], jawaban: 0, pembahasan: 'Timur di kanan.' },
  { tipe: 'Logika', pertanyaan: 'Jika hari ini Senin, 3 hari lagi adalah ...', pilihan: ['Kamis', 'Jumat', 'Sabtu', 'Minggu'], jawaban: 0, pembahasan: 'Senin + 3 = Kamis.' },
  // 11-15
  { tipe: 'Sinonim', pertanyaan: 'Sinonim dari "indah" adalah ...', pilihan: ['cantik', 'jelek', 'buruk', 'kotor'], jawaban: 0, pembahasan: 'Sinonim "indah" adalah "cantik".' },
  { tipe: 'Antonim', pertanyaan: 'Antonim dari "besar" adalah ...', pilihan: ['kecil', 'tinggi', 'panjang', 'lebar'], jawaban: 0, pembahasan: 'Antonim "besar" adalah "kecil".' },
  { tipe: 'Deret Huruf', pertanyaan: 'Apa huruf selanjutnya: A, C, E, G, ... ?', pilihan: ['H', 'I', 'J', 'K'], jawaban: 1, pembahasan: 'Pola: lompat 2 huruf. G + 2 = I.' },
  { tipe: 'Aritmatika', pertanyaan: 'Hasil dari 9 x 6 adalah ...', pilihan: ['54', '56', '64', '49'], jawaban: 0, pembahasan: '9 x 6 = 54.' },
  { tipe: 'Penalaran', pertanyaan: 'Semua kucing adalah hewan. Beberapa hewan adalah burung. Maka ...', pilihan: ['Semua kucing adalah burung', 'Beberapa kucing adalah burung', 'Tidak semua hewan adalah kucing', 'Semua burung adalah kucing'], jawaban: 2, pembahasan: 'Tidak semua hewan adalah kucing.' },
  // 16-20
  { tipe: 'Logika Angka', pertanyaan: 'Berapa angka selanjutnya: 3, 6, 12, 24, ... ?', pilihan: ['36', '48', '50', '60'], jawaban: 1, pembahasan: 'Pola: dikali 2. 24 x 2 = 48.' },
  { tipe: 'Sinonim', pertanyaan: 'Sinonim dari "pandai" adalah ...', pilihan: ['bodoh', 'cerdas', 'malas', 'lambat'], jawaban: 1, pembahasan: 'Sinonim "pandai" adalah "cerdas".' },
  { tipe: 'Antonim', pertanyaan: 'Antonim dari "tinggi" adalah ...', pilihan: ['pendek', 'besar', 'kecil', 'luas'], jawaban: 0, pembahasan: 'Antonim "tinggi" adalah "pendek".' },
  { tipe: 'Logika Gambar', pertanyaan: 'Pilih gambar yang sama (placeholder)', pilihan: ['A', 'B', 'C', 'A'], jawaban: 3, pembahasan: 'Gambar A sama.' },
  { tipe: 'Penalaran', pertanyaan: 'Jika 2x = 10, maka x = ...', pilihan: ['2', '5', '10', '20'], jawaban: 1, pembahasan: '2x=10, x=5.' },
  // 21-25
  { tipe: 'Aritmatika', pertanyaan: 'Hasil dari 100 - 45 adalah ...', pilihan: ['45', '55', '65', '75'], jawaban: 1, pembahasan: '100 - 45 = 55.' },
  { tipe: 'Verbal', pertanyaan: 'Kata yang ejaannya salah adalah ...', pilihan: ['kucing', 'anjing', 'burung', 'kambinng'], jawaban: 3, pembahasan: 'Kambing ejaan benar.' },
  { tipe: 'Spasial', pertanyaan: 'Jika barat di kiri, timur di ...', pilihan: ['kanan', 'atas', 'bawah', 'kiri'], jawaban: 0, pembahasan: 'Timur di kanan.' },
  { tipe: 'Logika', pertanyaan: 'Jika hari ini Jumat, 2 hari lagi adalah ...', pilihan: ['Sabtu', 'Minggu', 'Senin', 'Selasa'], jawaban: 1, pembahasan: 'Jumat + 2 = Minggu.' },
  { tipe: 'Sinonim', pertanyaan: 'Sinonim dari "kuat" adalah ...', pilihan: ['lemah', 'kokoh', 'rapuh', 'tipis'], jawaban: 1, pembahasan: 'Sinonim "kuat" adalah "kokoh".' },
  // 26-30
  { tipe: 'Antonim', pertanyaan: 'Antonim dari "panjang" adalah ...', pilihan: ['pendek', 'besar', 'kecil', 'luas'], jawaban: 0, pembahasan: 'Antonim "panjang" adalah "pendek".' },
  { tipe: 'Deret Angka', pertanyaan: 'Berapa angka selanjutnya: 7, 14, 28, 56, ... ?', pilihan: ['70', '84', '112', '120'], jawaban: 2, pembahasan: 'Pola: dikali 2. 56 x 2 = 112.' },
  { tipe: 'Aritmatika', pertanyaan: 'Hasil dari 8 x 7 adalah ...', pilihan: ['54', '56', '64', '49'], jawaban: 1, pembahasan: '8 x 7 = 56.' },
  { tipe: 'Penalaran', pertanyaan: 'Jika semua burung bisa terbang, elang adalah burung, maka ...', pilihan: ['Elang bisa terbang', 'Elang tidak bisa terbang', 'Elang bukan burung', 'Burung tidak bisa terbang'], jawaban: 0, pembahasan: 'Elang bisa terbang.' },
  { tipe: 'Verbal', pertanyaan: 'Kata yang ejaannya benar adalah ...', pilihan: ['sahabat', 'sahabat', 'sahabat', 'sahabat'], jawaban: 0, pembahasan: 'Semua benar.' },
  // 31-35
  { tipe: 'Logika Angka', pertanyaan: 'Berapa angka selanjutnya: 1, 3, 6, 10, 15, ... ?', pilihan: ['18', '20', '21', '22'], jawaban: 2, pembahasan: 'Pola: +2, +3, +4, +5, dst. 15+6=21.' },
  { tipe: 'Sinonim', pertanyaan: 'Sinonim dari "cepat" adalah ...', pilihan: ['lambat', 'kilat', 'pelan', 'lelet'], jawaban: 1, pembahasan: 'Sinonim "cepat" adalah "kilat".' },
  { tipe: 'Antonim', pertanyaan: 'Antonim dari "gelap" adalah ...', pilihan: ['terang', 'hitam', 'putih', 'kelam'], jawaban: 0, pembahasan: 'Antonim "gelap" adalah "terang".' },
  { tipe: 'Logika Gambar', pertanyaan: 'Pilih gambar yang berbeda (placeholder)', pilihan: ['A', 'A', 'B', 'A'], jawaban: 2, pembahasan: 'Gambar B berbeda.' },
  { tipe: 'Penalaran', pertanyaan: 'Jika 3y = 21, maka y = ...', pilihan: ['3', '5', '7', '9'], jawaban: 2, pembahasan: '3y=21, y=7.' },
  // 36-40
  { tipe: 'Aritmatika', pertanyaan: 'Hasil dari 12 + 15 adalah ...', pilihan: ['25', '27', '28', '30'], jawaban: 2, pembahasan: '12 + 15 = 27.' },
  { tipe: 'Verbal', pertanyaan: 'Kata yang ejaannya salah adalah ...', pilihan: ['rumah', 'sekolah', 'teman', 'temen'], jawaban: 3, pembahasan: 'Teman ejaan benar.' },
  { tipe: 'Spasial', pertanyaan: 'Jika selatan di bawah, utara di ...', pilihan: ['atas', 'kanan', 'kiri', 'bawah'], jawaban: 0, pembahasan: 'Utara di atas.' },
  { tipe: 'Logika', pertanyaan: 'Jika hari ini Rabu, 4 hari lagi adalah ...', pilihan: ['Sabtu', 'Minggu', 'Senin', 'Selasa'], jawaban: 1, pembahasan: 'Rabu + 4 = Minggu.' },
  { tipe: 'Sinonim', pertanyaan: 'Sinonim dari "ramai" adalah ...', pilihan: ['sepi', 'bising', 'sunyi', 'hening'], jawaban: 1, pembahasan: 'Sinonim "ramai" adalah "bising".' },
  // 41-45
  { tipe: 'Antonim', pertanyaan: 'Antonim dari "tinggi" adalah ...', pilihan: ['pendek', 'besar', 'kecil', 'luas'], jawaban: 0, pembahasan: 'Antonim "tinggi" adalah "pendek".' },
  { tipe: 'Deret Angka', pertanyaan: 'Berapa angka selanjutnya: 4, 8, 12, 16, ... ?', pilihan: ['18', '20', '22', '24'], jawaban: 3, pembahasan: 'Pola: +4. 16+4=20.' },
  { tipe: 'Aritmatika', pertanyaan: 'Hasil dari 7 x 7 adalah ...', pilihan: ['42', '49', '56', '63'], jawaban: 1, pembahasan: '7 x 7 = 49.' },
  { tipe: 'Penalaran', pertanyaan: 'Jika semua manusia bernafas, Andi adalah manusia, maka ...', pilihan: ['Andi bernafas', 'Andi tidak bernafas', 'Andi bukan manusia', 'Manusia tidak bernafas'], jawaban: 0, pembahasan: 'Andi bernafas.' },
  { tipe: 'Verbal', pertanyaan: 'Kata yang ejaannya benar adalah ...', pilihan: ['buku', 'buku', 'buku', 'buku'], jawaban: 0, pembahasan: 'Semua benar.' },
  // 46-50
  { tipe: 'Logika Angka', pertanyaan: 'Berapa angka selanjutnya: 10, 20, 30, 40, ... ?', pilihan: ['45', '50', '55', '60'], jawaban: 1, pembahasan: 'Pola: +10. 40+10=50.' },
  { tipe: 'Sinonim', pertanyaan: 'Sinonim dari "sabar" adalah ...', pilihan: ['marah', 'tenang', 'emosi', 'panik'], jawaban: 1, pembahasan: 'Sinonim "sabar" adalah "tenang".' },
  { tipe: 'Antonim', pertanyaan: 'Antonim dari "panas" adalah ...', pilihan: ['dingin', 'hangat', 'sejuk', 'adem'], jawaban: 0, pembahasan: 'Antonim "panas" adalah "dingin".' },
  { tipe: 'Logika Gambar', pertanyaan: 'Pilih gambar yang sama (placeholder)', pilihan: ['B', 'B', 'B', 'A'], jawaban: 0, pembahasan: 'Gambar B sama.' },
  { tipe: 'Penalaran', pertanyaan: 'Jika 5z = 25, maka z = ...', pilihan: ['3', '4', '5', '6'], jawaban: 2, pembahasan: '5z=25, z=5.' }
];

let idx = 0, skor = 0, timer = 0, interval = null, jawabanUser = [];

function mulaiPsikotes() {
  idx = 0; skor = 0; timer = 0; jawabanUser = [];
  tampilSoal();
  interval = setInterval(()=>{
    timer++;
    document.getElementById('timer-psikotes').textContent = `Waktu: ${timer}s`;
  }, 1000);
}

function tampilSoal() {
  const s = soal[idx];
  let html = `<b>${s.tipe}</b><br>${s.pertanyaan}<br><div style='margin:12px 0;'>`;
  s.pilihan.forEach((p,i)=>{
    html += `<button class='btn' style='margin:4px 0;' onclick='jawab(${i})'>${p}</button><br>`;
  });
  html += `</div><span id='timer-psikotes'>Waktu: ${timer}s</span>`;
  document.getElementById('psikotesApp').innerHTML = html;
}

function jawab(pil) {
  jawabanUser.push(pil);
  if (pil === soal[idx].jawaban) skor += 20;
  idx++;
  if (idx < soal.length) {
    tampilSoal();
  } else {
    clearInterval(interval);
    selesai();
  }
}

function selesai() {
  // Simpan skor ke localStorage
  let data = JSON.parse(localStorage.getItem('latihanData'));
  if (!data) data = { fisik: {lari:[],pushup:[],situp:[],plank:[]}, psikotes:{skor:[],riwayat:[]}, mental:{tantangan:[],checklist:[]} };
  data.psikotes.skor.push(skor);
  data.psikotes.riwayat.push({tanggal: new Date().toISOString().slice(0,10), skor});
  localStorage.setItem('latihanData', JSON.stringify(data));
  // Ringkasan kategori
  const perKategori = {};
  soal.forEach((s,i)=>{
    const k = s.tipe;
    if (!perKategori[k]) perKategori[k] = {benar:0,total:0};
    perKategori[k].total++;
    if (jawabanUser[i] === s.jawaban) perKategori[k].benar++;
  });
  const maksSkor = soal.length * 20;
  const persen = Math.round((skor / maksSkor) * 100);
  let level = 'Pemula';
  if (persen >= 70) level = 'Bagus';
  else if (persen >= 40) level = 'Cukup';

  // Pembahasan
  let html = `<h3>Skor Akhir: ${skor} (${persen}% - ${level})</h3>`;
  html += `<h4>Ringkasan per Kategori</h4><ul>`;
  Object.keys(perKategori).forEach(k=>{
    const info = perKategori[k];
    html += `<li><b>${k}:</b> ${info.benar} dari ${info.total} soal benar</li>`;
  });
  html += `</ul>`;
  html += `<button class='btn' onclick='downloadRingkasan()' style='margin-right:8px;'>Download Ringkasan</button>`;
  html += `<button class='btn' onclick='mulaiPsikotes()'>Ulangi Psikotes</button>`;
  html += `<h4 style="margin-top:18px;">Pembahasan Soal</h4><ul>`;
  soal.forEach((s,i)=>{
    html += `<li><b>${s.tipe}:</b> ${s.pertanyaan}<br>Jawaban kamu: <b>${s.pilihan[jawabanUser[i]]||'-'}</b><br>Jawaban benar: <b>${s.pilihan[s.jawaban]}</b><br><i>Pembahasan: ${s.pembahasan}</i></li><br>`;
  });
  html += `</ul>`;
  document.getElementById('psikotesApp').innerHTML = html;
}

function downloadRingkasan() {
  let data = JSON.parse(localStorage.getItem('latihanData'));
  if (!data || !data.psikotes || !data.psikotes.skor.length) return;
  const skorTerakhir = data.psikotes.skor.slice(-1)[0];
  const riwayatTerakhir = data.psikotes.riwayat.slice(-1)[0];
  const teks = [
    'Ringkasan Hasil Psikotes - Latihan Mandiri Militer',
    `Tanggal: ${riwayatTerakhir.tanggal}`,
    `Skor: ${skorTerakhir}`,
    '',
    'Catatan: hasil ini bersifat latihan mandiri, bukan penilaian resmi.'
  ].join('\\n');
  const blob = new Blob([teks], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ringkasan-psikotes.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function() {
  mulaiPsikotes();
});
