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
    route: null,
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
      if (k === 'route') return;
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

    // --- Route (einzelne Paddelroute) ---
    const route = (window.ROUTES || [])[0];
    if (route) {
      const line = L.polyline(route.waypoints, {
        color: route.color,
        weight: route.weight || 5,
        opacity: 0.9,
      });
      line.bindPopup(
        '<strong>🛶 ' + route.name + '</strong><br>' +
        route.km[0] + '-' + route.km[1] + ' km · ' + route.start + ' → ' + route.ende +
        '<p style="margin:.4rem 0 0 0; font-size:.9em">' + route.description + '</p>'
      );
      layers.route = L.featureGroup([line]);
      layers.route.addTo(map);

      // Pfeile entlang der Route — Richtungsanzeige per decorations
      const n = route.waypoints.length;
      for (let i = Math.floor(n/6); i < n; i += Math.floor(n/6)) {
        const p1 = route.waypoints[i-1], p2 = route.waypoints[i];
        const angle = Math.atan2(p2[1]-p1[1], p2[0]-p1[0]) * 180 / Math.PI;
        const arrow = L.marker(p2, {
          icon: L.divIcon({
            className: 'route-arrow',
            html: '<div style="transform: rotate(' + (90 - angle) + 'deg); color: #1e6fbf; font-size: 20px; font-weight: 900; text-shadow: 0 0 3px #fff;">▶</div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          }),
          interactive: false,
        });
        layers.route.addLayer(arrow);
      }
    }

    // --- Layer Control ---
    L.control.layers(
      { 'Topographisch (OpenTopoMap)': topo, 'Straßenkarte (OSM)': osm },
      {
        '🏁 Start': layers.start,
        '⛺ Ziel / Camp': layers.camp,
        '🛶 Paddelroute': layers.route,
        '🔥 Rastplätze': layers.rest,
        '🪃 Umtragestellen': layers.portage,
        '🛒 Supermärkte': layers.shop,
        '🏥 Kliniken': layers.hospital,
        '🥾 Ausflugsziele': layers.excursion,
      },
      { collapsed: false, position: 'topright' }
    ).addTo(map);

    // Fit map on route
    if (layers.route) {
      map.fitBounds(layers.route.getBounds(), { padding: [30, 30] });
    }

    return map;
  }

  return { init: init };
})();
