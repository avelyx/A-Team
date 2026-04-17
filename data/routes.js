// Schematische Routenverläufe entlang des Svartälven.
// Der echte Flussverlauf ist durch die zahlreichen Seen und Windungen wesentlich
// detaillierter — diese Polylines dienen nur der groben Orientierung.
window.ROUTES = [
  {
    id: 'bergslagen-fluss',
    name: 'Bergslagen-Fluss-Tour',
    km: [50, 80],
    color: '#1e6fbf',
    weight: 4,
    description:
      'Mit Transport nach Tyfors starten, dann flussabwärts zurück bis Hällefors. ' +
      'Führt durch schöne Natur, über den Svartälven und kleinere Seen. ' +
      'Übernachtung auf Kanurastplätzen am Ufer, im Wald oder auf Inseln. ' +
      'Bestens für Svartälven-Neulinge geeignet.',
    start: 'Tyfors',
    ende: 'Hällefors (Outdoorcamp)',
    waypoints: [
      [60.1475, 14.3600],  // Tyfors Start
      [60.100, 14.370],
      [60.050, 14.390],    // Gustavsström
      [60.000, 14.398],
      [59.980, 14.400],    // Älvsjöhyttan
      [59.955, 14.410],
      [59.930, 14.420],    // Vraket
      [59.905, 14.430],
      [59.880, 14.440],    // Vintersjön
      [59.870, 14.448],
      [59.855, 14.455],    // Risbergsforget
      [59.840, 14.462],
      [59.830, 14.470],    // Avläggt
      [59.825, 14.475],    // Umtragen Hammarn
      [59.815, 14.483],
      [59.810, 14.485],    // Storsand
      [59.800, 14.498],
      [59.78617, 14.505],  // Camp Svartälven (Ziel)
    ],
  },
  {
    id: 'bergslagen-rund',
    name: 'Bergslagen Rundtour',
    km: [70, 90],
    color: '#c0392b',
    weight: 4,
    description:
      'Von Hällefors am südlichen Svartälven Fluss starten — und auch hier wieder zurück. ' +
      'Führt vor allem über Seen, u.a. zwei größere Seen mit tollen Ausblicken und ' +
      'wunderschönen Übernachtungsstellen. Kanurastplätze im ersten und letzten Teil, ' +
      'dazwischen viele Möglichkeiten zum Zelten am Strand, auf Halbinseln und Inseln.',
    start: 'Hällefors (Outdoorcamp)',
    ende: 'Hällefors (Outdoorcamp)',
    waypoints: [
      [59.78617, 14.505],  // Camp Start
      [59.770, 14.510],
      [59.760, 14.510],    // Sundsudden
      [59.740, 14.515],
      [59.720, 14.520],    // Hälgsnäsviken
      [59.700, 14.530],    // bei Grytthyttan
      [59.680, 14.530],
      [59.660, 14.510],    // Sävsjön Umtragen
      [59.650, 14.470],    // Umtragen Älvestorp
      [59.620, 14.440],
      [59.585, 14.410],    // Svanvik
      [59.550, 14.410],
      [59.520, 14.405],    // Umtragen Rockesholm
      [59.485, 14.380],
      [59.450, 14.340],    // Umtragen Västgöthytefors
      [59.440, 14.300],    // Flosjönäset
      [59.420, 14.260],
      [59.405, 14.220],    // Brattforsen
      [59.385, 14.230],    // Tväränstorp
      // Rückweg schematisch
      [59.450, 14.340],
      [59.550, 14.420],
      [59.660, 14.510],
      [59.78617, 14.505],  // Camp Ziel
    ],
  },
];
