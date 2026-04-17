/* ============================================================
   app.js — Tabs, Countdown, Checklisten, Clipboard, Renderer
   ============================================================ */

(function () {
  'use strict';

  const qs  = (s, c) => (c || document).querySelector(s);
  const qsa = (s, c) => Array.from((c || document).querySelectorAll(s));

  // ============== Tabs ==============
  function initTabs() {
    const tabs  = qsa('.tabs a');
    const panels = qsa('.panel');

    function activate(id, push) {
      tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
      panels.forEach(p => p.classList.toggle('active', p.id === id));
      if (id === 'karte' && window.SvartalvenMap && window.__mapReady) {
        // Tile refresh nach Tab-Wechsel (sonst graue Flecken)
        setTimeout(() => window.__mapInst && window.__mapInst.invalidateSize(), 50);
      }
      if (push && location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    }

    tabs.forEach(t => t.addEventListener('click', e => {
      e.preventDefault();
      activate(t.dataset.tab, true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));

    const initial = (location.hash || '#karte').slice(1);
    if (qsa('.tabs a').some(t => t.dataset.tab === initial)) activate(initial, false);
  }

  // ============== Countdown ==============
  function initCountdown() {
    const trip = window.TRIP;
    if (!trip) return;
    const target = new Date(trip.startDate).getTime();
    const elD = qs('#cd-d'), elH = qs('#cd-h'), elM = qs('#cd-m');
    const elStart = qs('#cd-start');

    const fmtDate = (d) => {
      const wd = ['So','Mo','Di','Mi','Do','Fr','Sa'][d.getDay()];
      return wd + ', ' + d.toLocaleDateString('de-DE', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    };
    elStart.textContent = 'Start: ' + fmtDate(new Date(trip.startDate));

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        elD.textContent = '0'; elH.textContent = '0'; elM.textContent = '0';
        qs('.cd-label').textContent = 'Viel Spaß auf der Tour!';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      elD.textContent = d;
      elH.textContent = String(h).padStart(2, '0');
      elM.textContent = String(m).padStart(2, '0');
    }
    tick();
    setInterval(tick, 60000);
  }

  // ============== Clipboard ==============
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(ta);
        resolve();
      } catch (e) {
        document.body.removeChild(ta);
        reject(e);
      }
    });
  }

  function showToast(msg) {
    const t = qs('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2000);
  }

  function initClipboard() {
    qsa('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        copyToClipboard(text)
          .then(() => showToast('✓ Kopiert: ' + text))
          .catch(() => {
            prompt('Kopiere folgenden Text mit Strg+C (Cmd+C):', text);
          });
      });
    });
  }

  // ============== Routes Info ==============
  function renderRoutesInfo() {
    const host = qs('#routes-info');
    if (!host || !window.ROUTES) return;
    host.innerHTML = window.ROUTES.map((r, i) => `
      <div class="route-info r${i + 1}">
        <h4>${r.name}</h4>
        <div class="meta">${r.km[0]} – ${r.km[1]} km · ${r.start} → ${r.ende}</div>
        <p>${r.description}</p>
      </div>
    `).join('');
  }

  // ============== Anreise ==============
  function renderAnreise() {
    if (!window.ANREISE) return;
    qs('#anreise-pkw').innerHTML = window.ANREISE.anreiseRoute.pkwFaehre
      .map(s => `<li>${s}</li>`).join('');
    qs('#anreise-eigen').innerHTML = window.ANREISE.anreiseRoute.eigen
      .map(s => `<li>${s}</li>`).join('');
    qs('#anreisetag-steps').innerHTML = window.ANREISE.anreisetag
      .map(s => `<li><h4>${s.title}</h4><p>${s.text}</p></li>`).join('');
    qs('#abreisetag-steps').innerHTML = window.ANREISE.abreisetag
      .map(s => `<li><h4>${s.title}</h4><p>${s.text}</p></li>`).join('');
  }

  // ============== Notfall / Emergency ==============
  function renderEmergency() {
    const c = window.CONTACTS;
    if (!c) return;

    const main = c.notfall.filter(n => n.priority === 'critical');
    const more = c.notfall.filter(n => !n.priority);

    qs('#emergency-main').innerHTML = main.map(n => `
      <a class="btn critical" href="tel:${n.tel}">
        <span>${n.label}</span>
        <strong>${n.display}</strong>
      </a>
    `).join('');

    qs('#emergency-more').innerHTML = more.map(n => `
      <li>
        <span>${n.label}</span>
        <a href="tel:${n.tel}">${n.display}</a>
      </li>
    `).join('');

    qs('#kliniken-list').innerHTML = c.kliniken.map(k => `
      <div class="klinik">
        <h4>${k.name}</h4>
        <p class="addr">${k.adresse}</p>
        <a class="btn" href="tel:${k.tel}">📞 ${k.display}</a>
      </div>
    `).join('');
  }

  // ============== Trip Overview ==============
  function renderTripOverview() {
    const t = window.TRIP;
    if (!t) return;
    const fmt = (iso) => new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    qs('#trip-overview').innerHTML = `
      <tr><th>Buchung</th><td>${t.bookingRef}</td></tr>
      <tr><th>Tour</th><td>${t.tour}</td></tr>
      <tr><th>Reisecode</th><td>${t.reisecode}</td></tr>
      <tr><th>Gruppe</th><td>${t.group} · ${t.persons} Personen</td></tr>
      <tr><th>Reisebeginn</th><td>${fmt(t.startDate)} · ${t.checkinWindow}</td></tr>
      <tr><th>Reiseende</th><td>${fmt(t.endDate)}</td></tr>
      <tr><th>Camping vorher</th><td>${fmt(t.campingVor.beginn)} → ${fmt(t.campingVor.ende)}</td></tr>
      <tr><th>Hostel nachher</th><td>${fmt(t.hostelNach.beginn)} → ${fmt(t.hostelNach.ende)}</td></tr>
      <tr><th>Naturecard</th><td>${fmt(t.naturecard.beginn)} – ${fmt(t.naturecard.ende)}</td></tr>
      <tr><th>Camp</th><td>${t.camp.name}<br><span class="muted">${t.camp.adresse}</span></td></tr>
    `;
  }

  // ============== Checklist (Packliste + Proviant) ==============
  function initChecklist(cfg) {
    const { hostId, storageKey, titleId, noteId, data, countId, fillId, resetId, scaleId } = cfg;
    const host = qs(hostId);
    if (!host || !data) return;

    if (titleId) qs(titleId).textContent = data.title;
    if (noteId)  qs(noteId).textContent  = data.note;

    let state = {};
    try { state = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (e) { state = {}; }

    let currentScale = 1;
    if (scaleId && data.baselinePersons) {
      const select = qs(scaleId);
      currentScale = parseFloat(select.value) / data.baselinePersons;
      select.addEventListener('change', () => {
        currentScale = parseFloat(select.value) / data.baselinePersons;
        render();
      });
    }

    function render() {
      let total = 0, done = 0;
      host.innerHTML = data.groups.map(g => {
        const items = g.items.map(it => {
          total++;
          const checked = !!state[it.id];
          if (checked) done++;
          const mengeText = it.menge ? scaleMenge(it.menge, currentScale) : '';
          return `
            <li class="${checked ? 'done' : ''}${it.essential ? ' essential' : ''}">
              <input type="checkbox" id="cb-${storageKey}-${it.id}" ${checked ? 'checked' : ''} data-id="${it.id}">
              <label for="cb-${storageKey}-${it.id}">${it.label}${it.essential ? '' : ''}</label>
              ${mengeText ? `<span class="menge">${mengeText}</span>` : ''}
            </li>
          `;
        }).join('');
        const groupDone = g.items.filter(it => state[it.id]).length;
        return `
          <div class="checklist-group">
            <h4>${g.name} <span class="cnt">${groupDone} / ${g.items.length}</span></h4>
            <ul class="checklist">${items}</ul>
          </div>
        `;
      }).join('');

      qs(countId).textContent = done + ' / ' + total + ' erledigt';
      qs(fillId).style.width = (total ? (done / total * 100) : 0) + '%';

      host.querySelectorAll('input[type=checkbox]').forEach(cb => {
        cb.addEventListener('change', () => {
          state[cb.dataset.id] = cb.checked;
          localStorage.setItem(storageKey, JSON.stringify(state));
          render();
        });
      });
    }

    qs(resetId).addEventListener('click', () => {
      if (confirm('Alle Haken entfernen?')) {
        state = {};
        localStorage.removeItem(storageKey);
        render();
      }
    });

    render();
  }

  function scaleMenge(mengeText, scale) {
    if (scale === 1) return mengeText;
    // Skaliere die erste Zahl im String
    return mengeText.replace(/^(\d+(?:[.,]\d+)?)/, (m) => {
      const n = parseFloat(m.replace(',', '.')) * scale;
      return n % 1 === 0 ? String(Math.round(n)) : n.toFixed(1).replace('.', ',');
    });
  }

  // ============== Service Worker ==============
  function initServiceWorker() {
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      navigator.serviceWorker.register('sw.js').catch(() => { /* egal */ });
    }
  }

  // ============== Map (nach DOM-Ready) ==============
  function initMap() {
    if (!window.SvartalvenMap) return;
    window.__mapInst = window.SvartalvenMap.init('map');
    window.__mapReady = true;
  }

  // ============== Bootstrap ==============
  document.addEventListener('DOMContentLoaded', function () {
    initMap();
    initTabs();
    initCountdown();
    renderRoutesInfo();
    renderAnreise();
    renderEmergency();
    renderTripOverview();

    initChecklist({
      hostId: '#packliste-groups',
      storageKey: 'svartalven.b43726.packliste.v1',
      titleId: '#packliste-title',
      noteId: '#packliste-note',
      data: window.PACKLISTE,
      countId: '#pack-count',
      fillId: '#pack-fill',
      resetId: '#pack-reset',
    });

    initChecklist({
      hostId: '#proviant-groups',
      storageKey: 'svartalven.b43726.proviant.v1',
      titleId: '#proviant-title',
      noteId: '#proviant-note',
      data: window.PROVIANT,
      countId: '#prov-count',
      fillId: '#prov-fill',
      resetId: '#prov-reset',
      scaleId: '#proviant-scale',
    });

    initClipboard();
    initServiceWorker();
  });
})();
