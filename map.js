/* ============================================================
   map.js — Leaflet-Initialisierung, POIs, Routen
   ============================================================ */

window.SvartalvenMap = (function () {
  let map;
  let layers = {
    camp: null,
    rest: null,
    portage: null,
    shop: null,
    hospital: null,
    excursion: null,
    cities: null,
    route1: null,
    route2: null,
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
        p.type === 'rest'       ? 'rest' :
        p.type === 'portage'    ? 'portage' :
        p.type === 'shop'       ? 'shop' :
        p.type === 'hospital'   ? 'hospital' :
        p.type === 'excursion'  ? 'excursion' :
        p.type === 'city'       ? 'cities' :
        p.type === 'start'      ? 'cities' : null;
      if (lyrKey && layers[lyrKey]) layers[lyrKey].addLayer(marker);
    });

    // Default-sichtbare Layer
    layers.camp.addTo(map);
    layers.rest.addTo(map);
    layers.portage.addTo(map);
    layers.shop.addTo(map);
    layers.hospital.addTo(map);
    layers.excursion.addTo(map);
    layers.cities.addTo(map);

    // --- Routes ---
    (window.ROUTES || []).forEach(function (r, idx) {
      const line = L.polyline(r.waypoints, {
        color: r.color,
        weight: r.weight || 4,
        opacity: 0.85,
        dashArray: idx === 1 ? '8,6' : null,
      });
      line.bindPopup(
        '<strong>' + r.name + '</strong><br>' +
        r.km[0] + '-' + r.km[1] + ' km · ' + r.start + ' → ' + r.ende + '<br>' +
        '<p style="margin:.4rem 0 0 0; font-size:.9em">' + r.description + '</p>'
      );
      const key = idx === 0 ? 'route1' : 'route2';
      layers[key] = L.featureGroup([line]);
      layers[key].addTo(map);
    });

    // --- Layer Control ---
    L.control.layers(
      { 'Topographisch (OpenTopoMap)': topo, 'Straßenkarte (OSM)': osm },
      {
        '⛺ Camp': layers.camp,
        '🔥 Rastplätze': layers.rest,
        '🪃 Umtragestellen': layers.portage,
        '🛒 Supermärkte': layers.shop,
        '🏥 Kliniken': layers.hospital,
        '🥾 Ausflugsziele': layers.excursion,
        '🏙️ Orte': layers.cities,
        '🛶 Fluss-Tour': layers.route1,
        '🔄 Rund-Tour': layers.route2,
      },
      { collapsed: false, position: 'topright' }
    ).addTo(map);

    // Fit map to show both routes + camp
    const allRoutes = [];
    if (layers.route1) allRoutes.push(layers.route1.getBounds());
    if (layers.route2) allRoutes.push(layers.route2.getBounds());
    if (allRoutes.length) {
      let b = allRoutes[0];
      for (let i = 1; i < allRoutes.length; i++) b = b.extend(allRoutes[i]);
      map.fitBounds(b, { padding: [20, 20] });
    }

    return map;
  }

  return { init: init };
})();
