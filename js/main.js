// main.js - Script global (dark mode, nav, dsb)

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Toast sederhana global
window.showToast = function(message) {
  let box = document.getElementById('toastBox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toastBox';
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.classList.add('show');
  setTimeout(() => box.classList.remove('show'), 2500);
};

// Set dark mode & inisialisasi fitur global
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Dark mode button event
  const btn = document.getElementById('darkModeBtn');
  if (btn) btn.onclick = toggleDarkMode;

  // Rotasi kutipan motivasi di beranda (jika elemen ada)
  const quoteTextEl = document.querySelector('.quote-text');
  const quoteAuthorEl = document.querySelector('.quote-author');
  if (quoteTextEl && quoteAuthorEl) {
    const quotes = [
      {
        text: 'Disiplin adalah jembatan antara tujuan dan pencapaian.',
        author: '- Jim Rohn'
      },
      {
        text: 'Latihan yang konsisten mengalahkan bakat yang malas berlatih.',
        author: '- BINJASMIL1318'
      },
      {
        text: 'Sedikit lebih kuat hari ini, jauh lebih siap esok hari.',
        author: '- Latihan Mandiri'
      },
      {
        text: 'Kamu tidak harus hebat untuk mulai, tapi kamu harus mulai untuk menjadi hebat.',
        author: '- Zig Ziglar'
      }
    ];
    let idx = 0;
    function setQuote(i) {
      const q = quotes[i];
      quoteTextEl.textContent = q.text;
      quoteAuthorEl.textContent = q.author;
    }
    setQuote(idx);
    setInterval(() => {
      idx = (idx + 1) % quotes.length;
      setQuote(idx);
    }, 12000); // ganti setiap 12 detik
  }
});
