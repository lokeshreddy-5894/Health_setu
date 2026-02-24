// HealthSetu — Shared Data Store (db.js)
// Uses localStorage to persist data across separate HTML pages

const HS = {

  // ─── HELPERS ───
  _get(key) {
    try { return JSON.parse(localStorage.getItem('hs_' + key)); } catch { return null; }
  },
  _set(key, val) {
    localStorage.setItem('hs_' + key, JSON.stringify(val));
  },
  _seed() {
    if (this._get('seeded')) return;

    this._set('doctors', [
      { id: 'd1', name: 'Dr. Sushant Kumar', email: 'doctor1@hs.com', password: 'doc123', contact: '+91 9876543210', spec: 'General', dept: 'OPD', color: '#2563eb', createdAt: '2025-01-10' },
      { id: 'd2', name: 'Dr. Anuj Sharma', email: 'doctor2@hs.com', password: 'doc123', contact: '+91 8765432109', spec: 'Cardiology', dept: 'Cardiology', color: '#16a34a', createdAt: '2025-01-12' },
      { id: 'd3', name: 'Dr. Priya Verma', email: 'doctor3@hs.com', password: 'doc123', contact: '+91 7654321098', spec: 'Pediatrics', dept: 'Pediatrics', color: '#7c3aed', createdAt: '2025-02-01' },
    ]);

    this._set('patients', [
      { id: 'p1', name: 'Kunal Mehta', email: 'kunal@gmail.com', password: 'patient123', contact: '9876543210', city: 'Pune', address: '12 MG Road', assignedDoctor: 'd1', bp: '120/80', weight: '72', createdAt: '2025-02-05' },
      { id: 'p2', name: 'Sushant Joshilkar', email: 'sushant@gmail.com', password: 'patient123', contact: '9579657458', city: 'Pune', address: 'PCCOE Campus', assignedDoctor: 'd1', bp: '126/82', weight: '78', createdAt: '2025-02-10' },
      { id: 'p3', name: 'Darshan Gupta', email: 'darshan@gmail.com', password: 'patient123', contact: '9988776655', city: 'Mumbai', address: '7 Marine Drive', assignedDoctor: 'd2', bp: '118/76', weight: '69', createdAt: '2025-02-12' },
      { id: 'p4', name: 'Priya Singh', email: 'priya@gmail.com', password: 'patient123', contact: '8275614232', city: 'Nashik', address: '', assignedDoctor: null, bp: '', weight: '', createdAt: '2025-03-01' },
    ]);

    this._set('appointments', [
      { id: 'ap1', patientId: 'p1', doctorId: 'd1', datetime: '2025-04-26T05:30', type: 'General Consultation', symptoms: 'Knee pain since one year. Swelling on front side.', status: 'scheduled', createdAt: '2025-04-20' },
      { id: 'ap2', patientId: 'p2', doctorId: 'd1', datetime: '2025-03-20T05:30', type: 'Follow-up', symptoms: 'Swelling on the knee and difficulty walking.', status: 'completed', createdAt: '2025-03-15' },
      { id: 'ap3', patientId: 'p3', doctorId: 'd2', datetime: null, type: 'General Consultation', symptoms: 'Sharp chest pain at the center, 7/10 intensity.', status: 'pending', createdAt: '2025-03-18' },
      { id: 'ap4', patientId: 'p1', doctorId: 'd1', datetime: null, type: 'Follow-up', symptoms: 'Pain in right leg, front side of knee, 5-10 pain rating.', status: 'pending', createdAt: '2025-03-20' },
    ]);

    this._set('medicines', [
      { id: 'm1', patientId: 'p1', name: 'Paracetamol 500mg', instructions: 'Take 1 tablet after dinner with warm water', due: '2025-03-26T12:58', addedBy: 'd1', taken: false, createdAt: '2025-03-10' },
      { id: 'm2', patientId: 'p2', name: 'Metformin 500mg', instructions: 'Take after dinner — for diabetes management', due: '2025-03-04T20:00', addedBy: 'd1', taken: false, createdAt: '2025-03-02' },
      { id: 'm3', patientId: 'p1', name: 'Vitamin C 1000mg', instructions: 'Take 1 tablet every morning after breakfast', due: '2025-03-21T08:00', addedBy: 'd1', taken: true, createdAt: '2025-03-10' },
      { id: 'm4', patientId: 'p3', name: 'Aspirin 75mg', instructions: 'Take 1 tablet daily after breakfast', due: '2025-04-01T09:00', addedBy: 'd2', taken: false, createdAt: '2025-03-18' },
    ]);

    this._set('notices', [
      { id: 'n1', title: 'COVID Protocol Updated', body: 'All staff must wear N95 masks in high-risk wards. Updated PPE kits are at the nursing station.', type: 'urgent', author: 'Admin', createdAt: '2025-04-01T10:00' },
      { id: 'n2', title: 'System Maintenance Tonight', body: 'HealthSetu will be under maintenance from 11 PM to 1 AM. Please plan accordingly.', type: 'warning', author: 'Admin', createdAt: '2025-04-05T09:00' },
      { id: 'n3', title: 'New X-Ray Machine Available', body: 'The radiology department now has a new digital X-Ray machine. Refer patients accordingly.', type: 'success', author: 'Admin', createdAt: '2025-04-08T11:00' },
    ]);

    this._set('inventory', [
      { id: 'i1', name: 'Paracetamol', category: 'Medicine', qty: 100, unit: 'tablets', expiry: '2025-11-30' },
      { id: 'i2', name: 'Bandages', category: 'Supplies', qty: 2, unit: 'packs', expiry: '2025-12-31' },
      { id: 'i3', name: 'Insulin', category: 'Medicine', qty: 45, unit: 'vials', expiry: '2025-08-15' },
      { id: 'i4', name: 'Surgical Gloves', category: 'Equipment', qty: 0, unit: 'boxes', expiry: '2026-01-01' },
    ]);

    this._set('reports', [
      { id: 'r1', patientId: 'p1', doctorId: 'd1', type: 'X-Ray Report', title: 'Right Knee X-Ray', notes: 'Mild joint-space narrowing. Continue physiotherapy.', fileUrl: '', createdAt: '2025-04-21T10:00' },
      { id: 'r2', patientId: 'p3', doctorId: 'd2', type: 'Lab Report', title: 'Lipid Profile', notes: 'LDL slightly elevated; dietary changes advised.', fileUrl: '', createdAt: '2025-04-18T09:30' }
    ]);

    this._set('vitalsHistory', [
      { id: 'vh1', patientId: 'p1', doctorId: 'd1', bp: '122/80', weight: '73', createdAt: '2025-04-10T09:30' },
      { id: 'vh2', patientId: 'p1', doctorId: 'd1', bp: '120/80', weight: '72', createdAt: '2025-04-21T11:15' },
      { id: 'vh3', patientId: 'p3', doctorId: 'd2', bp: '118/76', weight: '69', createdAt: '2025-04-18T10:10' }
    ]);

    this._set('waitlist', []);

    this._set('seeded', true);
  },

  // ─── AUTH ───
  getSession() { return this._get('session'); },
  setSession(user, role) { this._set('session', { user, role, time: Date.now() }); },
  clearSession() { localStorage.removeItem('hs_session'); },
  requireAuth(expectedRole) {
    const s = this.getSession();
    if (!s) { window.location.href = 'login-' + (expectedRole||'patient') + '.html'; return null; }
    if (expectedRole && s.role !== expectedRole) { window.location.href = 'login-' + expectedRole + '.html'; return null; }
    return s;
  },

  // ─── GETTERS ───
  getDoctors() { return this._get('doctors') || []; },
  getPatients() { return this._get('patients') || []; },
  getAppointments() { return this._get('appointments') || []; },
  getMedicines() { return this._get('medicines') || []; },
  getNotices() { return this._get('notices') || []; },
  getInventory() { return this._get('inventory') || []; },
  getReports() { return this._get('reports') || []; },
  getVitalsHistory() { return this._get('vitalsHistory') || []; },
  getWaitlist() { return this._get('waitlist') || []; },

  // ─── SETTERS ───
  saveDoctors(arr) { this._set('doctors', arr); },
  savePatients(arr) { this._set('patients', arr); },
  saveAppointments(arr) { this._set('appointments', arr); },
  saveMedicines(arr) { this._set('medicines', arr); },
  saveNotices(arr) { this._set('notices', arr); },
  saveInventory(arr) { this._set('inventory', arr); },
  saveReports(arr) { this._set('reports', arr); },
  saveVitalsHistory(arr) { this._set('vitalsHistory', arr); },
  saveWaitlist(arr) { this._set('waitlist', arr); },

  // ─── HELPERS ───
  uid() { return '_' + Math.random().toString(36).substr(2,9); },
  now() { return new Date().toISOString(); },
  fmtDate(dt) {
    if (!dt) return 'Not set';
    try {
      const d = new Date(dt);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' at ' +
        d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch { return dt; }
  },
  fmtShort(dt) {
    if (!dt) return '—';
    try { return new Date(dt).toLocaleDateString('en-IN'); } catch { return dt; }
  },
  getInvStatus(qty) {
    if (qty === 0) return { label: 'Out of Stock', cls: 'badge-red' };
    if (qty <= 5) return { label: 'Low Stock', cls: 'badge-amber' };
    return { label: 'In Stock', cls: 'badge-green' };
  },
  statusBadge(status) {
    const map = { scheduled:'badge-blue', completed:'badge-green', pending:'badge-amber', cancelled:'badge-red' };
    return map[status] || 'badge-gray';
  },
  doctorColor(id) {
    const d = this.getDoctors().find(x => x.id === id);
    return d?.color || '#64748b';
  },
  doctorName(id) {
    const d = this.getDoctors().find(x => x.id === id);
    return d?.name || '—';
  },
  patientName(id) {
    const p = this.getPatients().find(x => x.id === id);
    return p?.name || '—';
  },
  toInputDateTime(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  },
  getAvailableSlots(doctorId, excludeApptId = null) {
    if (!doctorId) return [];
    const now = new Date();
    const slotTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(now.getDate() + i);
      slotTimes.forEach(t => {
        const [h, m] = t.split(':').map(Number);
        const slot = new Date(day);
        slot.setHours(h, m, 0, 0);
        if (slot > now) allSlots.push(this.toInputDateTime(slot));
      });
    }

    const blocked = new Set(
      this.getAppointments()
        .filter(a =>
          a.doctorId === doctorId &&
          a.datetime &&
          a.id !== excludeApptId &&
          a.status !== 'completed' &&
          a.status !== 'cancelled'
        )
        .map(a => String(a.datetime).slice(0, 16))
    );

    return allSlots.filter(s => !blocked.has(s));
  },
  _slotWindow(dt) {
    const h = new Date(dt).getHours();
    return h < 12 ? 'morning' : 'afternoon';
  },
  addToWaitlist(entry) {
    const wait = this.getWaitlist();
    wait.unshift({
      id: 'wl' + this.uid(),
      patientId: entry.patientId,
      doctorId: entry.doctorId || null,
      symptoms: entry.symptoms || '',
      type: entry.type || 'General Consultation',
      preferredWindow: entry.preferredWindow || 'any',
      preferredDate: entry.preferredDate || '',
      status: 'waiting',
      createdAt: this.now()
    });
    this.saveWaitlist(wait);
  },
  tryAssignFreedSlot(doctorId, freedSlot, reason = 'Auto-assigned from waitlist') {
    if (!doctorId || !freedSlot) return null;
    const wait = this.getWaitlist();
    const slotDate = String(freedSlot).slice(0, 10);
    const slotWindow = this._slotWindow(freedSlot);
    const idx = wait
      .map((w, i) => ({ w, i }))
      .find(({ w }) =>
        w.status === 'waiting' &&
        w.doctorId === doctorId &&
        (!w.preferredDate || w.preferredDate === slotDate) &&
        (w.preferredWindow === 'any' || w.preferredWindow === slotWindow)
      )?.i;
    if (idx === undefined) return null;

    const pick = wait[idx];
    const appts = this.getAppointments();
    const appt = {
      id: 'ap' + this.uid(),
      patientId: pick.patientId,
      doctorId,
      datetime: freedSlot,
      type: pick.type,
      symptoms: `${pick.symptoms} [${reason}]`,
      status: 'scheduled',
      createdAt: this.now(),
      source: 'waitlist'
    };
    appts.unshift(appt);
    this.saveAppointments(appts);
    wait.splice(idx, 1);
    this.saveWaitlist(wait);
    return appt;
  },
  greeting() {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  }
};

// Seed on load
HS._seed();

// ─── SHARED UI HELPERS ───
function toast(msg, type = 'info') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const el = document.createElement('div');
  el.className = `toast t-${type}`;
  el.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => el.classList.add('show'), 10);
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 3800);
}

function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

function setupModals() {
  document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
  });
}

function togglePw(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? 'Show' : 'Hide';
}

function renderBadge(label, cls) {
  return `<span class="badge ${cls}"><span class="badge-dot"></span>${label}</span>`;
}

function buildTopbar(userName, userRole, avatarBg, logoutPage) {
  const roleColors = { admin:'#0b1f3a', doctor:'#16a34a', patient:'#1a6bff' };
  const bg = avatarBg || roleColors[userRole] || '#64748b';
  return `
  <div class="topbar">
    <div class="topbar-brand">
      <div class="brand-logo">HS</div>
      <span class="brand-name">Health<span>Setu</span></span>
    </div>
    <div class="topbar-right">
      <button class="notif-bell" onclick="window.location.href='${logoutPage || 'login-'+userRole+'.html'}'">
        🔔<div class="notif-dot"></div>
      </button>
      <div class="topbar-user">
        <div class="user-avatar" style="background:${bg};">${userName.charAt(0).toUpperCase()}</div>
        <div class="user-details">
          <div class="name">${userName}</div>
          <div class="role">${userRole.toUpperCase()}</div>
        </div>
      </div>
      <button class="logout-btn" onclick="HS.clearSession(); window.location.href='login-${userRole}.html';">🚪 Sign Out</button>
    </div>
  </div>`;
}
