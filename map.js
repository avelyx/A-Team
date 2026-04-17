/* ============================================================
   map.js — Leaflet-Initialisierung, POIs, Routen
   ============================================================ */

window.SvartalvenMap = (function () {
  let map;
  let layers = {
    camp: null,
    start: null,
    rest: null,
    portage: null,
    shop: null,
    hospital: null,
    excursion: null,
    cities: null,
    routeFluss: null,
    routeRund: null,
  };

  function makeIcon(type, emoji) {
    return L.divIcon({
      className: '',
      html: '<div class="custom-icon ci-' + type + '">' + (emoji || '•') + '</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -14],
    });
  }

  function init(elId) {
    if (!window.L) {
      document.getElementById(elId).innerHTML =
        '<div style="padding:2rem;text-align:center;color:#c0392b;">' +
        '⚠️ Leaflet konnte nicht geladen werden.</div>';
      return;
    }

    map = L.map(elId, {
      center: [59.78617, 14.505],
      zoom: 10,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    // --- Base Layers ---
    const topo = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OSM</a>-Mitwirkende · ' +
          '© <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
      }
    );
    const osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',
      }
    );
    topo.addTo(map);

    // --- POI Layers (Feature Groups) ---
    Object.keys(layers).forEach(function (k) {
      if (k.startsWith('route')) return;
      layers[k] = L.featureGroup();
    });

    (window.POIS || []).forEach(function (p) {
      const marker = L.marker(p.coords, { icon: makeIcon(p.type, p.icon) });
      marker.bindPopup(p.popup, { maxWidth: 260 });
      const lyrKey =
        p.type === 'camp'       ? 'camp' :
        p.type === 'start'      ? 'start' :
        p.type === 'rest'       ? 'rest' :
        p.type === 'portage'    ? 'portage' :
        p.type === 'shop'       ? 'shop' :
        p.type === 'hospital'   ? 'hospital' :
        p.type === 'excursion'  ? 'excursion' :
        p.type === 'city'       ? 'cities' : null;
      if (lyrKey && layers[lyrKey]) layers[lyrKey].addLayer(marker);
    });

    // Default-sichtbare Layer
    layers.camp.addTo(map);
    layers.start.addTo(map);
    layers.rest.addTo(map);
    layers.portage.addTo(map);
    layers.shop.addTo(map);
    layers.hospital.addTo(map);
    layers.excursion.addTo(map);

    // --- Routes (Fluss + Rund) ---
    function addRoute(r, layerKey) {
      const line = L.polyline(r.waypoints, {
        color: r.color,
        weight: r.weight || 4,
        opacity: 0.9,
        dashArray: r.dashArray || null,
      });
      line.bindPopup(
        '<strong>🛶 ' + r.name + '</strong><br>' +
        r.km[0] + '-' + r.km[1] + ' km · ' + r.start + ' → ' + r.ende +
        '<p style="margin:.4rem 0 0 0; font-size:.9em">' + r.description + '</p>'
      );
      const group = L.featureGroup([line]);

      // Richtungspfeile
      const n = r.waypoints.length;
      const step = Math.max(1, Math.floor(n / 6));
      for (let i = step; i < n; i += step) {
        const p1 = r.waypoints[i-1], p2 = r.waypoints[i];
        const angle = Math.atan2(p2[1]-p1[1], p2[0]-p1[0]) * 180 / Math.PI;
        const arrow = L.marker(p2, {
          icon: L.divIcon({
            className: 'route-arrow',
            html: '<div style="transform: rotate(' + (90 - angle) + 'deg); color: ' + r.color + '; font-size: 18px; font-weight: 900; text-shadow: 0 0 3px #fff, 0 0 3px #fff;">▶</div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          }),
          interactive: false,
        });
        group.addLayer(arrow);
      }
      layers[layerKey] = group;
      group.addTo(map);
    }

    const routes = window.ROUTES || [];
    if (routes[0]) addRoute(routes[0], 'routeFluss');
    if (routes[1]) addRoute(routes[1], 'routeRund');

    // --- Layer Control ---
    L.control.layers(
      { 'Topographisch (OpenTopoMap)': topo, 'Straßenkarte (OSM)': osm },
      {
        '🏁 Start (Fluss-Tour)': layers.start,
        '⛺ Camp (Start/Ziel Rund-Tour)': layers.camp,
        '🛶 Fluss-Tour (50-80 km)': layers.routeFluss,
        '🔄 Rund-Tour (70-90 km)': layers.routeRund,
        '🔥 Rastplätze': layers.rest,
        '🪃 Umtragestellen': layers.portage,
        '🛒 Supermärkte': layers.shop,
        '🏥 Kliniken': layers.hospital,
        '🥾 Ausflugsziele': layers.excursion,
      },
      { collapsed: false, position: 'topright' }
    ).addTo(map);

    // Fit map on both routes
    const bounds = [];
    if (layers.routeFluss) bounds.push(layers.routeFluss.getBounds());
    if (layers.routeRund) bounds.push(layers.routeRund.getBounds());
    if (bounds.length) {
      let b = bounds[0];
      for (let i = 1; i < bounds.length; i++) b = b.extend(bounds[i]);
      map.fitBounds(b, { padding: [30, 30] });
    }

    return map;
  }

  return { init: init };
})();
