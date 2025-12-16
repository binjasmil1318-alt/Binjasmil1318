// galeri.js - Simpan & tampilkan foto di LocalStorage

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formFoto');
  const input = document.getElementById('fotoInput');
  const catatanInput = document.getElementById('fotoCatatan');
  const hapusSemuaBtn = document.getElementById('hapusSemuaBtn');
  const grid = document.getElementById('galeriGrid');

  function loadGaleri() {
    let galeri = JSON.parse(localStorage.getItem('galeriFoto')) || [];
    grid.innerHTML = '';
    if (galeri.length === 0) {
      grid.innerHTML = '<p>Belum ada foto.</p>';
      return;
    }
    galeri.forEach((item, i) => {
      const foto = typeof item === 'string' ? item : item.src;
      const catatan = typeof item === 'string' ? '' : (item.catatan || '');
      const tanggal = typeof item === 'string' ? '' : (item.tanggal || '');
      const div = document.createElement('div');
      div.className = 'card';
      div.style.alignItems = 'center';
      let inner = `<img src="${foto}" style="max-width:100%;max-height:180px;border-radius:8px;" alt="Foto ${i+1}"><br>`;
      if (catatan || tanggal) {
        inner += `<p style="font-size:0.9rem;margin:6px 0 10px 0;color:#e6eecf;">${tanggal ? tanggal + ' - ' : ''}${catatan}</p>`;
      }
      inner += `<button class='btn' onclick='hapusFoto(${i})'>Hapus</button>`;
      div.innerHTML = inner;
      grid.appendChild(div);
    });
  }

  form.onsubmit = function(e) {
    e.preventDefault();
    const file = input.files[0];
    if (!file) return;
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      alert('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(evt) {
      let galeri = JSON.parse(localStorage.getItem('galeriFoto')) || [];
      const catatan = (catatanInput && catatanInput.value.trim()) || '';
      galeri.push({
        src: evt.target.result,
        catatan,
        tanggal: new Date().toISOString().slice(0,10)
      });
      localStorage.setItem('galeriFoto', JSON.stringify(galeri));
      loadGaleri();
      form.reset();
      if (window.showToast) window.showToast('Foto berhasil ditambahkan ke galeri.');
    };
    reader.readAsDataURL(file);
  };

  window.hapusFoto = function(idx) {
    let galeri = JSON.parse(localStorage.getItem('galeriFoto')) || [];
    galeri.splice(idx, 1);
    localStorage.setItem('galeriFoto', JSON.stringify(galeri));
    loadGaleri();
    if (window.showToast) window.showToast('Foto dihapus dari galeri.');
  };

  if (hapusSemuaBtn) {
    hapusSemuaBtn.addEventListener('click', function() {
      if (!confirm('Hapus semua foto di galeri dari perangkat ini?')) return;
      localStorage.removeItem('galeriFoto');
      loadGaleri();
      if (window.showToast) window.showToast('Semua foto di galeri telah dihapus.');
    });
  }

  loadGaleri();
});
