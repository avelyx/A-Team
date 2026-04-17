window.CONTACTS = {
  notfall: [
    { label: 'Notruf (Polizei, Feuer, Rettung)', tel: '112', display: '112', priority: 'critical' },
    { label: 'Camp Svartälven (24 h Notfall)', tel: '+46738125601', display: '+46 73 812 56 01', priority: 'critical' },
    { label: 'Polizei (nicht dringend)', tel: '+46771141400', display: '+46 771 141 400' },
    { label: 'Medizinische Beratung (1177)', tel: '+46771117700', display: '+46 771 117 700' },
    { label: 'Feuer-Info Örebro län', tel: '+46191899005', display: '+46 19-18 99 05' },
    { label: 'Taxi Hällefors', tel: '+4672429 1607', display: '+46 72 429 1607' },
  ],
  kliniken: [
    {
      name: 'Hällefors vårdcentral (Ärztehaus)',
      adresse: 'Gillersvägen 20, 712 30 Hällefors',
      tel: '+4659168500',
      display: '+46 591 685 00',
      gps: [59.78140, 14.51450],
    },
    {
      name: 'Centralsjukhuset Karlstad',
      adresse: 'Rosenborgsgatan 9, 652 30 Karlstad',
      tel: '+461083150 00',
      display: '+46 10 831 50 00',
      gps: [59.3793, 13.5036],
    },
    {
      name: 'Vårdcentralen Filipstad (Ärztehaus)',
      adresse: 'Vikhyttegatan 14, 682 34 Filipstad',
      tel: '+46108318801',
      display: '+46 10 831 88 01',
      gps: [59.7188, 14.1692],
    },
    {
      name: 'Karlskoga lasarett',
      adresse: 'Lasarettsvägen 1, 691 44 Karlskoga',
      tel: '+4658666000',
      display: '+46 586 660 00',
      gps: [59.3266, 14.5242],
    },
  ],
  scandtrack: {
    vorReise: {
      email: 'info@scandtrack.de',
      tel: '+493303297311 1',
      display: '+49 3303 29 73 111',
      zeiten: 'Mo-Fr 08:00 – 16:00 Uhr',
    },
    waehrendReise: {
      tel: '+46738125601',
      display: '+46 73 812 56 01',
      zeiten: 'Mo-So 08:00 – 17:00 Uhr (organisatorisch), 24 h bei Notfällen',
    },
    adresseDE: 'scandtrack touristik GmbH, Sperberstr. 25, D-16556 Hohen Neuendorf OT Borgsdorf',
    adresseSE: 'scandtrack touristik GmbH, c/o Hällefors Vandrarhem & Kanotcenter, Saxhyttevägen 2, S-71234 Hällefors',
    checkinUrl: 'https://www.scandtrack.com/checkin',
  },
};
