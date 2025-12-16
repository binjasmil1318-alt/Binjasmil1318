// dashboard.js - Progress, jadwal, grafik

document.addEventListener('DOMContentLoaded', function() {
  const formTarget = document.getElementById('formTarget');
  const inputLari = document.getElementById('targetLari');
  const inputPushup = document.getElementById('targetPushup');
  const inputPsikotes = document.getElementById('targetPsikotes');
  const inputDisiplin = document.getElementById('targetDisiplin');

  // Load progress dari localStorage atau dummy
  let data = JSON.parse(localStorage.getItem('latihanData'));
  if (!data) {
    fetch('data/dummy.json')
      .then(r => r.json())
      .then(dummy => {
        data = dummy;
        initDashboard();
      });
  } else {
    initDashboard();
  }

  function initDashboard() {
    const target = loadTarget();
    if (inputLari) inputLari.value = target.lari ?? '';
    if (inputPushup) inputPushup.value = target.pushup ?? '';
    if (inputPsikotes) inputPsikotes.value = target.psikotes ?? '';
    if (inputDisiplin) inputDisiplin.value = target.disiplin ?? '';

    tampilkanProgress(data);
    tampilkanJadwal();
    tampilkanTarget(data, target);
    renderChart(data);
    renderPsikotesChart(data);
    renderProgram7Hari();
  }

  function tampilkanProgress(data) {
    // Fisik
    const fisik = data.fisik;
    const fisikText = `Lari: ${fisik.lari.slice(-1)[0] || 0} km, Push Up: ${fisik.pushup.slice(-1)[0] || 0}x, Sit Up: ${fisik.situp.slice(-1)[0] || 0}x`;
    document.getElementById('fisik-progress').textContent = fisikText;
    // Psikotes
    const psikot = data.psikotes;
    const psikotText = `Skor terakhir: ${psikot.skor.slice(-1)[0] || 0}`;
    document.getElementById('psikotes-progress').textContent = psikotText;
    // Mental
    const mental = data.mental;
    const checklist = mental.checklist.filter(Boolean).length;
    document.getElementById('mental-progress').textContent = `${checklist} tantangan selesai`;
  }

  function tampilkanJadwal() {
    // Dummy jadwal
    const jadwal = [
      'Lari 2 km',
      'Push Up 20x',
      'Psikotes 15 menit',
      'Tantangan fokus 10 menit'
    ];
    const ul = document.getElementById('jadwal-hari-ini');
    ul.innerHTML = '';
    jadwal.forEach(j => {
      const li = document.createElement('li');
      li.textContent = j;
      ul.appendChild(li);
    });
  }

  function tampilkanTarget(data, target) {
    const fisik = data.fisik || { lari: [], pushup: [], situp: [] };
    const psikot = data.psikotes || { skor: [] };
    const mental = data.mental || { checklist: [] };

    const totalLari = (fisik.lari || []).reduce((a,b)=>a+b,0);
    const totalPush = (fisik.pushup || []).reduce((a,b)=>a+b,0);
    const totalSesiPsikotes = (psikot.skor || []).length;
    const totalDisiplin = (mental.checklist || []).filter(Boolean).length;

    const ul = document.getElementById('target-mingguan');
    ul.innerHTML = '';
    const items = [
      { label: 'Lari', nilai: totalLari, target: target.lari || 0, satuan: 'km' },
      { label: 'Push Up', nilai: totalPush, target: target.pushup || 0, satuan: 'x' },
      { label: 'Sesi Psikotes', nilai: totalSesiPsikotes, target: target.psikotes || 0, satuan: 'sesi' },
      { label: 'Hari Disiplin', nilai: totalDisiplin, target: target.disiplin || 0, satuan: 'hari' }
    ];

    items.forEach(item => {
      const li = document.createElement('li');
      const persen = item.target > 0 ? Math.min(100, Math.round((item.nilai / item.target) * 100)) : 0;
      li.textContent = `${item.label}: ${item.nilai} / ${item.target} ${item.satuan} (${persen}%)`;
      ul.appendChild(li);
    });
  }

  function loadTarget() {
    return JSON.parse(localStorage.getItem('latihanTarget')) || {
      lari: 10,
      pushup: 100,
      psikotes: 2,
      disiplin: 5
    };
  }

  function renderChart(data) {
    // Grafik progres fisik (lari, pushup, situp)
    const ctx = document.getElementById('progressChart').getContext('2d');
    // Simple chart pakai Canvas API
    ctx.clearRect(0,0,320,180);
    ctx.strokeStyle = '#bfcf8a';
    ctx.lineWidth = 2;
    // Lari
    ctx.beginPath();
    ctx.moveTo(20, 160 - (data.fisik.lari[0]||0)*40);
    data.fisik.lari.forEach((v,i) => ctx.lineTo(20+90*i, 160-v*40));
    ctx.stroke();
    ctx.fillStyle = '#bfcf8a';
    ctx.fillText('Lari', 20, 170);
    // Pushup
    ctx.beginPath();
    ctx.strokeStyle = '#81c784';
    ctx.moveTo(20, 160 - (data.fisik.pushup[0]||0)*2);
    data.fisik.pushup.forEach((v,i) => ctx.lineTo(20+90*i, 160-v*2));
    ctx.stroke();
    ctx.fillStyle = '#81c784';
    ctx.fillText('Push Up', 80, 170);
    // Situp
    ctx.beginPath();
    ctx.strokeStyle = '#e57373';
    ctx.moveTo(20, 160 - (data.fisik.situp[0]||0)*2);
    data.fisik.situp.forEach((v,i) => ctx.lineTo(20+90*i, 160-v*2));
    ctx.stroke();
    ctx.fillStyle = '#e57373';
    ctx.fillText('Sit Up', 180, 170);
  }

  function renderPsikotesChart(data) {
    const canvas = document.getElementById('psikotesChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const skor = (data.psikotes && data.psikotes.skor) || [];
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (skor.length === 0) {
      ctx.fillStyle = '#bfcf8a';
      ctx.fillText('Belum ada data skor psikotes', 20, canvas.height / 2);
      return;
    }

    const maxSkor = Math.max(...skor, 1);
    ctx.strokeStyle = '#bfcf8a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    skor.forEach((v,i) => {
      const x = 20 + (i * ((canvas.width-40) / Math.max(1, skor.length-1)));
      const y = canvas.height - 20 - (v / maxSkor) * (canvas.height - 40);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = '#bfcf8a';
    ctx.fillText('Skor Psikotes', 20, canvas.height - 6);
  }

  function renderProgram7Hari() {
    const ul = document.getElementById('program-7hari');
    if (!ul) return;
    const program = JSON.parse(localStorage.getItem('program7hari')) || Array(7).fill(false);
    ul.innerHTML = '';
    program.forEach((done, idx) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!done;
      checkbox.id = `p7-${idx}`;
      checkbox.addEventListener('change', () => {
        const updated = JSON.parse(localStorage.getItem('program7hari')) || Array(7).fill(false);
        updated[idx] = checkbox.checked;
        localStorage.setItem('program7hari', JSON.stringify(updated));
      });
      const label = document.createElement('label');
      label.setAttribute('for', checkbox.id);
      label.textContent = `Hari ${idx+1}: Latihan fisik ringan + 1 sesi psikotes + 1 kebiasaan disiplin`;
      li.appendChild(checkbox);
      li.appendChild(label);
      ul.appendChild(li);
    });
  }

  if (formTarget) {
    formTarget.addEventListener('submit', function(e) {
      e.preventDefault();
      const targetBaru = {
        lari: parseFloat(inputLari.value) || 0,
        pushup: parseInt(inputPushup.value) || 0,
        psikotes: parseInt(inputPsikotes.value) || 0,
        disiplin: parseInt(inputDisiplin.value) || 0
      };
      localStorage.setItem('latihanTarget', JSON.stringify(targetBaru));
      tampilkanTarget(data, targetBaru);
      const info = document.getElementById('targetInfo');
      if (info) {
        info.textContent = 'Target mingguan tersimpan di perangkat ini.';
        info.style.opacity = '1';
        setTimeout(() => { info.style.opacity = '0'; }, 2500);
      }
    });
  }
});
