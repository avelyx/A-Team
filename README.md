# Svartälven Kanutour · B43726

Offline-taugliche Begleit-Website für die 5-tägige Kanutour auf dem Svartälven (Hällefors, Schweden) mit Scandtrack.

## Features

- 🗺️ **Interaktive Karte** (Leaflet + OpenTopoMap) mit beiden Routen, Rastplätzen, Umtragestellen, Ausflugszielen und Kliniken
- ⏰ **Live-Countdown** zum Reisestart
- 🆘 **Notfall-Schnellwahl** (112, Camp, Taxi)
- 🎒 **Packliste** mit Fortschritt und localStorage-Persistenz
- 🛒 **Proviant-Einkaufsliste** (skalierbar 1-4 Personen)
- 📜 **Jedermannsrecht, Feuer-/Hygiene-Regeln, Angelkarte**
- 📱 **Mobile-first** · **PWA** (installierbar, offline-tauglich)
- 🖨️ **Druck-Stylesheet** für Handzettel

## Stack

- Vanilla HTML + CSS + JavaScript
- [Leaflet 1.9.4](https://leafletjs.com/) (lokal gebundled)
- [OpenTopoMap](https://opentopomap.org) + [OpenStreetMap](https://www.openstreetmap.org)
- Keine Build-Tools, kein Framework, kein Backend

## Start lokal

```bash
# Direkt:
open index.html

# Oder als lokaler Server (für Service Worker / PWA):
python -m http.server 8000
```

## Dateien

```
site/
├── index.html              # Shell mit Tab-Navigation
├── styles.css              # Mobile-first + Druck-Stylesheet
├── app.js                  # Tabs, Countdown, Checklisten, Clipboard
├── map.js                  # Leaflet-Karten-Modul
├── sw.js                   # Service Worker (Offline-Cache)
├── manifest.webmanifest    # PWA-Manifest
├── data/
│   ├── trip.js             # Buchungsdaten, Start/Ende
│   ├── contacts.js         # Notrufnummern, Kliniken
│   ├── pois.js             # Camp, Rastplätze, Umtragestellen
│   ├── routes.js           # Route-Polylines
│   ├── checklists.js       # Packliste + Proviant
│   └── arrival.js          # An-/Abreisetag-Schritte
└── assets/
    ├── leaflet/            # Leaflet Lib (lokal)
    └── icons/              # PWA-Icons
```

## Quellen

Inhalte basieren auf den offiziellen scandtrack-Reiseunterlagen (Buchung B43726).
Karten- und Route-Darstellung ist **schematisch** — maßgeblich ist die offizielle Wasserwanderkarte an Bord.

Kartendaten: © OpenStreetMap-Mitwirkende · © OpenTopoMap (CC-BY-SA)
