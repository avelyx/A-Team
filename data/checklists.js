// Packliste aus Reiseunterlagen Seite 15 + Outdoor-Ausrüstung
window.PACKLISTE = {
  title: 'Packliste Kanu-/Kajaktour',
  note: 'Persönliches Gepäck — vom Camp gibt es Ausrüstungspaket + wasserdichten Packsack/Packtonne.',
  groups: [
    {
      name: 'Dokumente',
      items: [
        { id: 'pass', label: 'Ausweis/Reisepass (gültig bis Rückreise)', essential: true },
        { id: 'voucher', label: 'Voucherheft + Reiseunterlagen (Tickets!)', essential: true },
        { id: 'akv', label: 'Auslands­kranken­versicherung', essential: true },
        { id: 'ec', label: 'EC-/Kreditkarte (bargeldlos in SE)', essential: true },
      ],
    },
    {
      name: 'Schlafen & Zelt',
      items: [
        { id: 'zelt', label: 'Zelt', essential: true },
        { id: 'schlafsack', label: 'Schlafsack', essential: true },
        { id: 'isomatte', label: 'Isomatte', essential: true },
        { id: 'kocher', label: 'Kocher + Spiritus/Gas', essential: true },
        { id: 'plane', label: 'Plane / Tarp', essential: false },
      ],
    },
    {
      name: 'Kleidung',
      items: [
        { id: 'schuhe', label: 'Feste, eingelaufene Schuhe (knöchelhoch)', essential: true },
        { id: 'sandalen', label: 'Wasserfeste Sandalen', essential: false },
        { id: 'regen', label: 'Regenbekleidung (Gore-Tex empfohlen)', essential: true },
        { id: 'rucksack', label: 'Rucksack oder Reisetasche', essential: true },
        { id: 'daypack', label: 'Kleiner Rucksack für Tagesausflüge', essential: false },
        { id: 'warm', label: 'Warme Jacke oder Fleece-Pulli', essential: true },
        { id: 'ww', label: 'Warme Unterwäsche', essential: true },
        { id: 'wechsel', label: 'Wechselkleidung', essential: true },
        { id: 'badekl', label: 'Badebekleidung', essential: false },
        { id: 'leicht', label: 'Leichte Bekleidung (T-Shirts, kurze Hose)', essential: true },
        { id: 'hut', label: 'Kopfbedeckung (Sonnenschutz)', essential: true },
      ],
    },
    {
      name: 'Hygiene',
      items: [
        { id: 'wasch', label: 'Waschzeug (nur Bio-Seife auf Tour!)', essential: true },
        { id: 'handtuch', label: 'Handtuch / Badetuch', essential: true },
        { id: 'sonne', label: 'Sonnencreme + Mückenschutz', essential: true },
      ],
    },
    {
      name: 'Küche unterwegs',
      items: [
        { id: 'besteck', label: 'Essbesteck, Becher, tiefer Teller (kein Porzellan!)', essential: true },
        { id: 'trinkfl', label: 'Trinkflasche', essential: true },
        { id: 'geschirrt', label: 'Geschirrtuch', essential: false },
        { id: 'dose', label: 'Büchsenöffner, Kochlöffel, Kelle', essential: true },
        { id: 'feuerz', label: 'Feuerzeug', essential: true },
        { id: 'wasserf', label: 'Wasserfilter (Grayl Ultrapress empfohlen)', essential: false },
      ],
    },
    {
      name: 'Ausrüstung / Werkzeug',
      items: [
        { id: 'taschenl', label: 'Taschen-/Stirnlampe + Ersatzbatterien', essential: true },
        { id: 'messer', label: 'Taschenmesser (keine Machete!)', essential: true },
        { id: 'waesche', label: 'Wäscheklammern + kurze Wäscheleine', essential: false },
        { id: 'powerbank', label: 'Powerbank(s) für Handy', essential: true },
        { id: 'ersatzakku', label: 'Ersatzakkus / Solarpanel für Kamera', essential: false },
      ],
    },
    {
      name: 'Reiseapotheke',
      items: [
        { id: 'meds', label: 'Persönliche Medikamente', essential: true },
        { id: 'erk', label: 'Medis: Erkältung, Sonnenbrand, Insektenstiche, Durchfall', essential: true },
        { id: 'zecke', label: 'Zeckenzange + Zeckenkarte', essential: true },
        { id: 'ehset', label: 'Erste-Hilfe-Set (Pflaster, Verband)', essential: true },
        { id: 'reisek', label: 'Tabletten gegen Reisekrankheit', essential: false },
      ],
    },
  ],
};

// Proviant aus Reiseunterlagen S. 18-19 — Tabelle skaliert für 2 Personen / 5 Tage
// (Originaltabelle war für 2 Personen / 7 Tage — hier *5/7 gerundet)
window.PROVIANT = {
  title: 'Proviant-Einkaufsliste',
  note: 'Empfehlung von scandtrack für 2 Personen, 5-tägige Tour. Einkauf im Pekås-Supermarkt (800 m vom Camp, tägl. 08-22 Uhr). Mengen sind Richtwerte.',
  baselinePersons: 2,
  baselineDays: 5,
  groups: [
    {
      name: 'Frühstück & Brotzeit',
      items: [
        { id: 'brot', label: 'Brot (Bröd)', menge: '4 Packungen (je 500 g)' },
        { id: 'cornfl', label: 'Cornflakes / Flingor', menge: '1 Tüte (375 g)' },
        { id: 'muesli', label: 'Müsli', menge: '1 Tüte (375 g)' },
        { id: 'milchpulv', label: 'Magermilchpulver (Mjölkpulver)', menge: '2 Tüten (250 g)' },
        { id: 'nutella', label: 'Nutella', menge: '1 Glas (400 g)' },
        { id: 'konfitur', label: 'Konfitüre (Sylt)', menge: '1 Glas (450 g)' },
        { id: 'margarine', label: 'Margarine', menge: '1 Packung (250 g)' },
        { id: 'mjukost', label: 'Schmelzkäse-Ecken (Mjukost)', menge: '1 Schachtel' },
        { id: 'ost', label: 'Käse Aufschnitt (Ost)', menge: '1 Packung (250 g)' },
        { id: 'salami', label: 'Salami', menge: '1 Packung (ca. 450 g)' },
        { id: 'leverp', label: 'Leberpastete (Leverpastej)', menge: '1 Dose (200 g)' },
      ],
    },
    {
      name: 'Hauptgerichte / Dosenwaren',
      items: [
        { id: 'champ', label: 'Champignons (Champinjoner)', menge: '1 Dose (290 g)' },
        { id: 'kidney', label: 'Kidneybohnen rot (Röda kidneybönor)', menge: '2 Dosen (je 425 g)' },
        { id: 'vitabon', label: 'Weiße Bohnen (Vita bönor)', menge: '1 Dose (425 g)' },
        { id: 'rotkohl', label: 'Rotkohl (Rödkål)', menge: '1 Dose (300 g)' },
        { id: 'tomaten', label: 'Passierte Tomaten (Krossade tomater)', menge: '1 Tetrapack (500 g)' },
        { id: 'korv', label: 'Würstchen (Korvar)', menge: '1 Dose (550 g)' },
        { id: 'gulasch', label: 'Schweinegulasch (Gulasch)', menge: '1 Dose (500 g)' },
        { id: 'sill', label: 'Heringsfilets (Sill)', menge: '2 Dosen (je 200 g)' },
      ],
    },
    {
      name: 'Beilagen / Sättigung',
      items: [
        { id: 'nudeln', label: 'Nudeln (Pasta)', menge: '1 Tüte (500 g)' },
        { id: 'linsen', label: 'Linsentopf (Linssoppa)', menge: '2 Tüten (je 130 g)' },
        { id: 'reis', label: 'Gemüsereis (Grönsaksris)', menge: '2 Tüten (je 150 g)' },
        { id: 'milchreis', label: 'Milchreis (Risgrynsgröt)', menge: '2 Tüten (je 133 g)' },
        { id: 'nudelsup', label: 'Nudelsuppe (Nudelsoppa)', menge: '3 Tüten (je 85 g)' },
        { id: 'huhnsup', label: 'Hühnersuppe (Kycklingsoppa)', menge: '2 Tüten (je 54 g)' },
        { id: 'knoedel', label: 'Knödel', menge: '1 Packung (6 Stück)' },
        { id: 'muesliriegel', label: 'Müsliriegel (Müslibar)', menge: '1 Packung (8 Stück)' },
      ],
    },
    {
      name: 'Frisches',
      items: [
        { id: 'apfel', label: 'Äpfel (Äpple)', menge: '4 Stück' },
        { id: 'gurke', label: 'Gurke', menge: '1 Stück' },
        { id: 'tomate', label: 'Tomaten', menge: '4 Stück' },
        { id: 'zwiebel', label: 'Zwiebeln (Lök)', menge: '5 Stück' },
      ],
    },
    {
      name: 'Würze, Öl, Kleinigkeiten',
      items: [
        { id: 'tomp', label: 'Tomatenmark (Tomatpuré)', menge: '1 Tube (200 g)' },
        { id: 'oel', label: 'Sonnenblumenöl (Solrosolja)', menge: '1 Flasche (250 ml)' },
        { id: 'lime', label: 'Limettensaft (Limejuice)', menge: '1 Flasche (100 ml)' },
        { id: 'senf', label: 'Senf (Senap)', menge: '3 Tüten (je 10 ml)' },
        { id: 'ketchup', label: 'Ketchup', menge: '5 Tüten (je 15 ml)' },
        { id: 'backp', label: 'Backpulver (Bakpulver)', menge: '1 Tüte' },
        { id: 'mehl', label: 'Mehl / Vetemjöl', menge: '1 Tüte (1 kg)' },
        { id: 'zucker', label: 'Streuzucker (Strösocker)', menge: '1 Streuer (200 g)' },
      ],
    },
    {
      name: 'Getränke',
      items: [
        { id: 'kaffee', label: 'Instantkaffee (Snabbkaffe)', menge: '15 Portionstüten' },
        { id: 'tee', label: 'Tee', menge: '1 Packung' },
        { id: 'getraenkp', label: 'Getränkepulver (Dryck pulver)', menge: '7 Tüten (je 100 g)' },
      ],
    },
  ],
};
