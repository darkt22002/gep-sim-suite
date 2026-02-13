/* ============================================
   LCARS Core JavaScript — Shared Utilities
   ============================================ */

const SIMS = [
  { id: 1, file: "sim01-higgs.html", title: "Higgs Sector SSB", cat: "forces", section: "Parts 27-28, §6", physics: "Mexican hat potential, VEV emergence, Goldstone/Higgs mode separation" },
  { id: 2, file: "sim02-darkmatter.html", title: "Dark Matter Saturation", cat: "forces", section: "Part 42, §2", physics: "Multi-channel entropy, β_EM saturation → invisibility, Ω_DM/Ω_b" },
  { id: 3, file: "sim03-blackhole.html", title: "Black Hole Thermo", cat: "cosmo", section: "Parts 44-46, §4", physics: "Gradient saturation = event horizon, no singularity, Hawking = R(t)" },
  { id: 4, file: "sim04-cosmocycle.html", title: "Cosmological Cycle", cat: "cosmo", section: "Parts 47-52, §5-8", physics: "Parent→child handshake, white hole Big Bang, CMB as parent data" },
  { id: 5, file: "sim05-darkenergy.html", title: "Dark Energy Vacuum Tilt", cat: "cosmo", section: "Part 43, §3", physics: "αE_vacuum → Λ, 10¹²⁰ discrepancy resolved, w = −1 exactly" },
  { id: 6, file: "sim06-lorentzian.html", title: "Lorentzian Emergence", cat: "foundation", section: "Parts 1-4", physics: "β=0→parabolic, β>0→hyperbolic, light cones from entropy" },
  { id: 7, file: "sim07-gauge.html", title: "Gauge Fields & Maxwell", cat: "forces", section: "Parts 11-12, 24-25", physics: "F_μν from entropy curl, U(1) phase, SU(N) coupling hierarchy" },
  { id: 8, file: "sim08-dirac.html", title: "Dirac Spinors & QED", cat: "forces", section: "Parts 16-18", physics: "Gradient orientation → matter/antimatter, UV finite, no renormalization" },
  { id: 9, file: "sim09-anchor.html", title: "SMBH Anchor Threshold", cat: "astro", section: "Part 56, §8B", physics: "Three-zone BH spectrum, M ∝ H(z)², JWST validation" },
  { id: 10, file: "sim10-voidlensing.html", title: "Void Lensing & De-Sat", cat: "astro", section: "Part 58, §8D", physics: "Boötes Void prediction, smooth lensing, cross-channel leakage" },
  { id: 11, file: "sim11-galaxyspin.html", title: "Galaxy Spin & Angular Mom", cat: "astro", section: "Part 57, §8C", physics: "Kerr import from parent, mass-dependent misalignment, Cold Spot" },
  { id: 12, file: "sim12-erpc.html", title: "ERPC Hardware Validation", cat: "applied", section: "ERPC Paper", physics: "β-damped switching, 95-96% reduction, same β as cosmos" },
  { id: 13, file: "sim13-nexusmemory.html", title: "Nexus Memory Lifecycle", cat: "applied", section: "Architecture", physics: "4-tier memory, GEP momentum, dream cycles, human mapping" },
  { id: 14, file: "sim14-falsification.html", title: "Falsification Dashboard", cat: "meta", section: "§9", physics: "40+ conditions, 8 domains, survived/open/falsified tracking" },
];

const CAT_NAMES = {
  foundation: "FOUNDATION",
  forces: "FORCES & FIELDS",
  cosmo: "COSMOLOGY",
  astro: "ASTROPHYSICS",
  applied: "APPLIED / HARDWARE",
  meta: "META / VALIDATION"
};

const CAT_COLORS = {
  foundation: "#9999FF",
  forces: "#9999CC",
  cosmo: "#CC99CC",
  astro: "#CC6699",
  applied: "#5588AA",
  meta: "#CC9933"
};

/**
 * Build the LCARS frame HTML and inject into body
 */
function buildLCARSFrame(currentSimId) {
  const currentSim = currentSimId ? SIMS.find(s => s.id === currentSimId) : null;
  const titleText = currentSim ? currentSim.title : "SIMULATION INDEX";

  document.body.innerHTML = `
    <div class="lcars-frame">
      <div class="lcars-sidebar">
        <div class="lcars-sidebar-top"><span>GEP SIMS</span></div>
        <div class="lcars-sidebar-nav" id="lcars-nav"></div>
        <div class="lcars-sidebar-bottom"></div>
      </div>
      <div class="lcars-topbar">
        <div class="lcars-topbar-title">
          <h1>${titleText}</h1>
          <span class="subtitle">GUIDED ENTROPY PRINCIPLE</span>
        </div>
        <div class="lcars-topbar-pills">
          <div class="lcars-pill"></div>
          <div class="lcars-pill"></div>
          <div class="lcars-pill"></div>
          <div class="lcars-pill"></div>
        </div>
      </div>
      <div class="lcars-main" id="lcars-main"></div>
      <div class="lcars-bottombar">
        <div class="lcars-bottombar-main">
          <span>Gary A. Muñoz — Lumiea Systems / ThunderStruck Service LLC</span>
          <span>ΔS = D·C·R·(1 + αE − β‖∇S‖)</span>
        </div>
        <div class="lcars-bottom-pills">
          <div class="lcars-bottom-pill"></div>
          <div class="lcars-bottom-pill"></div>
          <div class="lcars-bottom-pill"></div>
        </div>
      </div>
    </div>
  `;

  // Build nav
  const nav = document.getElementById('lcars-nav');

  // Index button
  const idxBtn = document.createElement('button');
  idxBtn.className = 'lcars-nav-btn' + (currentSimId === null ? ' active' : '');
  idxBtn.textContent = '■ INDEX';
  idxBtn.style.background = '#FF9900';
  idxBtn.onclick = () => window.location.href = 'index.html';
  nav.appendChild(idxBtn);

  // Sim buttons
  for (const sim of SIMS) {
    const btn = document.createElement('button');
    btn.className = 'lcars-nav-btn' + (sim.id === currentSimId ? ' active' : '');
    btn.dataset.cat = sim.cat;
    btn.textContent = `${String(sim.id).padStart(2, '0')} ${sim.title}`;
    btn.onclick = () => window.location.href = sim.file;
    nav.appendChild(btn);
  }

  return document.getElementById('lcars-main');
}

/**
 * LCARS beep sound
 */
function lcarsBeep(freq = 1200, dur = 0.06) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    gain.gain.value = 0.05;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.stop(ctx.currentTime + dur + 0.01);
  } catch (e) {}
}

/**
 * Helper to create slider group
 */
function createSlider(opts) {
  const { label, value, min, max, step, color, detail, onChange } = opts;
  const group = document.createElement('div');
  group.className = 'lcars-slider-group';

  const labelRow = document.createElement('div');
  labelRow.className = 'lcars-slider-label';
  const labelEl = document.createElement('span');
  labelEl.textContent = label + ': ';
  const valueEl = document.createElement('span');
  valueEl.className = 'lcars-slider-value';
  valueEl.textContent = typeof value === 'number' ? (Number.isInteger(step) ? value : value.toFixed(2)) : value;
  labelRow.appendChild(labelEl);
  labelRow.appendChild(valueEl);
  group.appendChild(labelRow);

  if (detail) {
    const detailEl = document.createElement('div');
    detailEl.className = 'lcars-slider-detail';
    detailEl.textContent = detail;
    detailEl.id = opts.detailId || '';
    group.appendChild(detailEl);
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = min;
  slider.max = max;
  slider.step = step;
  slider.value = value;
  if (color) slider.dataset.color = color;
  slider.oninput = () => {
    const v = parseFloat(slider.value);
    valueEl.textContent = Number.isInteger(step) ? v : v.toFixed(2);
    if (onChange) onChange(v, valueEl);
    lcarsBeep(800 + v * 200, 0.03);
  };
  group.appendChild(slider);

  return { group, slider, valueEl };
}

/**
 * Helper to create a badge
 */
function createBadge(label, detail, pass = true) {
  const badge = document.createElement('div');
  badge.className = `lcars-badge ${pass ? 'pass' : 'fail'}`;
  badge.innerHTML = `
    <span class="lcars-badge-icon">${pass ? '✓' : '✗'}</span>
    <span class="lcars-badge-label">${label}</span>
    <span class="lcars-badge-detail">${detail}</span>
  `;
  return badge;
}

/**
 * Helper to create view mode buttons
 */
function createViewButtons(modes, activeMode, onSelect) {
  const wrap = document.createElement('div');
  wrap.className = 'lcars-view-btns';
  modes.forEach(mode => {
    const btn = document.createElement('button');
    btn.className = 'lcars-view-btn' + (mode === activeMode ? ' active' : '');
    btn.textContent = mode;
    btn.onclick = () => {
      wrap.querySelectorAll('.lcars-view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(mode);
      lcarsBeep();
    };
    wrap.appendChild(btn);
  });
  return wrap;
}

/**
 * Stardate calculator (aesthetic only)
 */
function stardate() {
  const now = new Date();
  const y = now.getFullYear();
  const dayOfYear = Math.floor((now - new Date(y, 0, 0)) / 86400000);
  const sd = ((y - 2000) * 1000 + dayOfYear * 2.7397).toFixed(1);
  return sd;
}
