// ===== DONNÉES RAYMOND =====
let packages = [
  { id:1, title:"Cascade El Limón + Las Terrenas (Plage Punta Popi)", dest:"Samaná, RD", desc:"Randonnée dans la jungle jusqu’à la célèbre cascade et visite de la plage la plus populaire de Las Terrenas.", img:"assets/Limon.webp", badge:"Nature", slots:5 },
  { id:2, title:"Observation des Baleines + Cayo Levantado", dest:"Baie de Samaná", desc:"Excursion en bateau pour observer les baleines à bosse et profiter de l’île Bacardí emblématique.", img:"assets/Balena.webp", badge:"Saison", slots:5 },
  { id:3, title:"Cayo Levantado + Parc National Los Haitises", dest:"Samaná, RD", desc:"Détendez-vous à Cayo Levantado et explorez les mangroves, les grottes et la faune unique de Los Haitises.", img:"assets/Cayo.webp", badge:"Île", slots:5 },
  { id:4, title:"Plage Rincón + Caño Frío", dest:"Samaná, RD", desc:"Découvrez l’une des plus belles plages des Caraïbes et profitez de la rivière rafraîchissante de Caño Frío.", img:"assets/Rincon.jpg", badge:"Aventure", slots:5 },
  { id:5, title:"Plage Frontón + Las Galeras + Plage Madama + Plage Rincón", dest:"Samaná, RD", desc:"Circuit complet des plages vierges et cachées de la région de Las Galeras.", img:"assets/Galeras.jpg", badge:"Exploration", slots:5 },
  { id:6, title:"Plage Hermitanos + Plage El Valle", dest:"Samaná, RD", desc:"Explorez des plages secrètes entourées de montagnes et de végétation tropicale.", img:"assets/Ermitano.jpg", badge:"Romantique", slots:5 },
  { id:7, title:"Buggy + Quads (4 roues)", dest:"Samaná, RD", desc:"Aventure extrême à travers les sentiers ruraux et les plages cachées en buggy et en quad.", img:"assets/Buggy.jpg", badge:"Aventure", slots:5 },
  { id:8, title:"Tyrolienne à El Valle", dest:"Samaná, RD", desc:"Volez au-dessus des vallées et des rivières dans une expérience pleine d’adrénaline.", img:"assets/Zipline.webp", badge:"Unique", slots:5 }
];

  let bookings = [];
  let currentRole = 'customer';
  let bookingPackage = null;

  // ===== RENDER PACKAGES =====
  function renderPackages() {
  const grid = document.getElementById('packagesGrid');
  grid.innerHTML = packages.map(p => `
    <div class="pkg-card">
      <div class="pkg-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy"/>
        <div class="pkg-badge ${p.badge==='Hot'?'hot':''}">${p.badge}</div>
      </div>
      <div class="pkg-body">
        <div class="pkg-dest">${p.dest}</div>
        <div class="pkg-title">${p.title}</div>
        <div class="pkg-desc">${p.desc}</div>
        <div class="pkg-meta">
        </div>
        <div class="pkg-footer">
        </div>
      </div>
    </div>
  `).join('');
}

  function renderAdminTable() {
  const tbody = document.getElementById('adminPkgBody');
  const tbody2 = document.getElementById('allPkgBody');
  if (!tbody) return;
  const rows = packages.map(p => `
    <tr>
      <td><img class="tbl-img" src="${p.img}" alt="${p.title}"/></td>
      <td><strong>${p.title}</strong></td>
      <td>${p.dest}</td>
      <td>$${p.priceUSD.toLocaleString()} | RD$${p.priceRD.toLocaleString()}</td>
      <td>${p.duration}d</td>
      <td><span class="badge-active">Active</span></td>
      <td>
        <button class="btn-edit" onclick="showToast('✏️ Edit coming soon!')">Edit</button>
        <button class="btn-del" onclick="deletePackage(${p.id})">Delete</button>
      </td>
    </tr>
  `).join('');
  tbody.innerHTML = rows;
  if (tbody2) tbody2.innerHTML = rows;
  document.getElementById('statPkg').textContent = packages.length;
}

function renderCustPackages() {
  const grid = document.getElementById('custPkgGrid');
  grid.innerHTML = packages.map(p => `
    <div class="cust-pkg-card">
      <div class="cust-pkg-img"><img src="${p.img}" alt="${p.title}" loading="lazy"/></div>
      <div class="cust-pkg-info">
        <div class="cust-pkg-dest">${p.dest}</div>
        <div class="cust-pkg-name">${p.title}</div>
        <div class="cust-pkg-row">
          <div class="cust-pkg-price">$${p.priceUSD.toLocaleString()} | RD$${p.priceRD.toLocaleString()}</div>
        </div>
      </div>
    </div>
  `).join('');
}


  function renderBookings() {
    const tbody = document.getElementById('bookingsBody');
    if (!tbody) return;
    if (bookings.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--gray);padding:30px;">No bookings yet.</td></tr>';
      return;
    }
    tbody.innerHTML = bookings.map(b => `
      <tr>
        <td><strong>${b.name}</strong></td>
        <td>${b.email}</td>
        <td>${b.package}</td>
        <td>${b.date}</td>
        <td>${b.people}</td>
        <td>${b.phone}</td>
      </tr>
    `).join('');
    document.getElementById('statBook').textContent = bookings.length;
  }

  // ===== MODAL FUNCTIONS =====
  function openModal(id) {
    const el = document.getElementById(id);
    el.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (id === 'adminModal') { renderAdminTable(); renderBookings(); }
    if (id === 'customerModal') renderCustPackages();
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
    if (id === 'bookingModal') {
      document.getElementById('bookingFormWrap').style.display = 'block';
      document.getElementById('bookingSuccess').style.display = 'none';
    }
  }
  document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', function(e) { if (e.target === this) closeModal(this.id); });
  });

  // ===== LOGIN =====
  function setRole(btn, role) {
    currentRole = role;
    document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }
  function handleLogin(e) {
    e.preventDefault();
    closeModal('loginModal');
    if (currentRole === 'admin') { showToast('🛡 Logged in as Admin'); setTimeout(() => openModal('adminModal'), 400); }
    else { showToast('👤 Logged in as Customer'); setTimeout(() => openModal('customerModal'), 400); }
  }

  // ===== BOOKING =====
  function openBooking(pkgId) {
    bookingPackage = packages.find(p => p.id === pkgId);
    if (bookingPackage) document.getElementById('bookingPkgName').textContent = `📍 ${bookingPackage.title} — ${bookingPackage.dest}`;
    openModal('bookingModal');
  }
  function submitBooking() {
    const name = document.getElementById('bName').value.trim();
    const email = document.getElementById('bEmail').value.trim();
    const phone = document.getElementById('bPhone').value.trim();
    const date = document.getElementById('bDate').value;
    const people = document.getElementById('bPeople').value;
    if (!name || !email || !phone || !date || !people) { showToast('⚠️ Please fill all required fields'); return; }
    bookings.push({ name, email, phone, date, people, package: bookingPackage ? bookingPackage.title : 'N/A', dest: bookingPackage ? bookingPackage.dest : '' });
    document.getElementById('bookingFormWrap').style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';
    showToast('🎉 Booking confirmed!');
  }

  // ===== ADMIN =====
  function addPackage() {
    const title = document.getElementById('pkgTitle').value.trim();
    const dest = document.getElementById('pkgDest').value.trim();
    const price = parseFloat(document.getElementById('pkgPrice').value);
    const duration = parseInt(document.getElementById('pkgDuration').value);
    const img = document.getElementById('pkgImg').value.trim() || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=70';
    const desc = document.getElementById('pkgDesc').value.trim();
    if (!title || !dest || !price || !duration) { showToast('⚠️ Please fill all required fields'); return; }
    packages.push({ id: Date.now(), title, dest, price, duration, desc: desc || 'A wonderful travel experience.', img, badge:'New', slots:10 });
    renderPackages();
    renderAdminTable();
    showToast('✅ Package added successfully!');
    ['pkgTitle','pkgDest','pkgPrice','pkgDuration','pkgImg','pkgDesc'].forEach(id => document.getElementById(id).value = '');
  }
  function deletePackage(id) {
    packages = packages.filter(p => p.id !== id);
    renderPackages();
    renderAdminTable();
    showToast('🗑 Package removed');
  }
  function showAdminTab(tab, el) {
    ['overview','add','packages','bookings','export'].forEach(t => {
      const el2 = document.getElementById('tab-'+t);
      if (el2) el2.style.display = 'none';
    });
    document.getElementById('tab-'+tab).style.display = 'block';
    document.querySelectorAll('.dash-nav-item').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');
    if (tab === 'bookings') renderBookings();
    if (tab === 'packages') renderAdminTable();
  }

  // ===== EXPORT =====
  function exportXML() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<bookings>\n';
    bookings.forEach((b, i) => {
      xml += `  <booking id="${i+1}">\n`;
      xml += `    <name>${escXML(b.name)}</name>\n`;
      xml += `    <email>${escXML(b.email)}</email>\n`;
      xml += `    <phone>${escXML(b.phone)}</phone>\n`;
      xml += `    <package>${escXML(b.package)}</package>\n`;
      xml += `    <travelDate>${escXML(b.date)}</travelDate>\n`;
      xml += `    <people>${escXML(b.people)}</people>\n`;
      xml += `  </booking>\n`;
    });
    xml += '</bookings>';
    const preview = document.getElementById('exportPreview');
    preview.style.display = 'block';
    preview.textContent = xml;
    downloadFile('bookings.xml', xml, 'application/xml');
    showToast('📥 XML exported!');
  }
  function exportCSV() {
    let csv = 'Name,Email,Phone,Package,TravelDate,People\n';
    bookings.forEach(b => { csv += `"${b.name}","${b.email}","${b.phone}","${b.package}","${b.date}","${b.people}"\n`; });
    downloadFile('bookings.csv', csv, 'text/csv');
    showToast('📊 CSV exported!');
  }
  function printBookings() {
    let html = '<html><head><title>Voyara Bookings</title><style>body{font-family:sans-serif;padding:30px;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:8px;font-size:13px;}th{background:#0B3C5D;color:white;}h2{color:#0B3C5D;}</style></head><body>';
    html += '<h2>Voyara Travel – Booking List</h2><p>Generated: '+new Date().toLocaleDateString()+'</p>';
    html += '<table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Package</th><th>Travel Date</th><th>People</th></tr></thead><tbody>';
    bookings.forEach(b => { html += `<tr><td>${b.name}</td><td>${b.email}</td><td>${b.phone}</td><td>${b.package}</td><td>${b.date}</td><td>${b.people}</td></tr>`; });
    html += '</tbody></table></body></html>';
    const w = window.open('','_blank'); w.document.write(html); w.document.close(); w.print();
  }
  function escXML(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function downloadFile(filename, content, type) {
    const blob = new Blob([content], {type});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }

  // ===== TOAST =====
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ===== NAVBAR SCROLL =====
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ===== MOBILE MENU =====
  function toggleMobile() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }

  // ===== INIT =====
  renderPackages();
  renderAdminTable();

  // Keep language dropdown open when clicking the arrow
document.querySelector(".lang-arrow").addEventListener("click", (e) => {
  e.stopPropagation();
  const dropdown = document.querySelector(".lang-dropdown");

  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// Close dropdown only when clicking outside
document.addEventListener("click", (e) => {
  const switcher = document.querySelector(".lang-switcher");
  const dropdown = document.querySelector(".lang-dropdown");

  if (!switcher.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

document.getElementById('searchDest').addEventListener('keyup', function() {
  const filter = this.value.toLowerCase();
  const rows = document.querySelectorAll('#destList tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  });
});