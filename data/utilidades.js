/** Referencia rápida: no sustituye el BOE ni el temario oficial. */

export const PHONETIC_ALPHABET = [
  { letter: "A", word: "Alfa" },
  { letter: "B", word: "Bravo" },
  { letter: "C", word: "Charlie" },
  { letter: "D", word: "Delta" },
  { letter: "E", word: "Echo" },
  { letter: "F", word: "Foxtrot" },
  { letter: "G", word: "Golf" },
  { letter: "H", word: "Hotel" },
  { letter: "I", word: "India" },
  { letter: "J", word: "Juliett" },
  { letter: "K", word: "Kilo" },
  { letter: "L", word: "Lima" },
  { letter: "M", word: "Mike" },
  { letter: "N", word: "November" },
  { letter: "O", word: "Oscar" },
  { letter: "P", word: "Papa" },
  { letter: "Q", word: "Quebec" },
  { letter: "R", word: "Romeo" },
  { letter: "S", word: "Sierra" },
  { letter: "T", word: "Tango" },
  { letter: "U", word: "Uniform" },
  { letter: "V", word: "Victor" },
  { letter: "W", word: "Whiskey" },
  { letter: "X", word: "X-ray" },
  { letter: "Y", word: "Yankee" },
  { letter: "Z", word: "Zulu" },
];

/** Códigos Q más frecuentes en examen y en tráfico de aficionados. */
export const Q_CODES = [
  { code: "QRA", meaning: "¿Cuál es el nombre de su estación? / Mi nombre es…" },
  { code: "QRB", meaning: "¿A qué distancia está usted de mi estación?" },
  { code: "QRG", meaning: "¿Cuál es mi frecuencia exacta? / Su frecuencia exacta es…" },
  { code: "QRK", meaning: "La legibilidad de sus señales es… (1–5)" },
  { code: "QRM", meaning: "Estoy sufriendo interferencia" },
  { code: "QRN", meaning: "Estoy sufriendo ruido atmosférico" },
  { code: "QRO", meaning: "Aumente potencia" },
  { code: "QRP", meaning: "Disminuya potencia / operación de baja potencia" },
  { code: "QRU", meaning: "¿Tiene algo para mí? / No tengo nada para usted" },
  { code: "QRV", meaning: "Estoy listo / ¿Está usted listo?" },
  { code: "QRZ", meaning: "¿Quién me llama? / Le llamo…" },
  { code: "QSB", meaning: "Sus señales se debilitan y fortalecen (fading)" },
  { code: "QSL", meaning: "Recibo su transmisión / tarjeta de confirmación de contacto" },
  { code: "QSO", meaning: "Puedo comunicar con… directamente / contacto en curso" },
  { code: "QSY", meaning: "Cambie de frecuencia a… kHz" },
  { code: "QTH", meaning: "¿Cuál es su ubicación? / Mi ubicación es…" },
  { code: "QTR", meaning: "¿Cuál es la hora correcta? / La hora correcta es…" },
];

/** Distritos de indicativos españoles (EA/EB/EC + cifra). Resumen orientativo URE. */
export const EA_DISTRICTS = [
  {
    id: "1",
    label: "EA1",
    title: "Noroeste y norte interior",
    provinces:
      "Galicia (A Coruña, Lugo, Ourense, Pontevedra), Asturias, Cantabria, La Rioja y Castilla y León (León, Zamora, Salamanca, Palencia, Valladolid, Ávila, Burgos, Segovia, Soria).",
  },
  {
    id: "2",
    label: "EA2",
    title: "Norte y Aragón",
    provinces: "País Vasco (Vizcaya, Álava, Guipúzcoa), Navarra y Aragón (Huesca, Zaragoza, Teruel).",
  },
  {
    id: "3",
    label: "EA3",
    title: "Cataluña",
    provinces: "Lleida, Girona, Barcelona y Tarragona.",
  },
  {
    id: "4",
    label: "EA4",
    title: "Centro y Extremadura",
    provinces: "Madrid, Castilla-La Mancha (Guadalajara, Cuenca, Toledo, Ciudad Real) y Extremadura (Cáceres, Badajoz).",
  },
  {
    id: "5",
    label: "EA5",
    title: "Levante y sureste peninsular",
    provinces: "Comunidad Valenciana (Castellón, Valencia, Alicante), Albacete y Región de Murcia.",
  },
  { id: "6", label: "EA6", title: "Baleares", provinces: "Illes Balears (Mallorca, Menorca, Ibiza/Formentera)." },
  {
    id: "7",
    label: "EA7",
    title: "Andalucía",
    provinces: "Huelva, Sevilla, Córdoba, Jaén, Cádiz, Málaga, Granada y Almería.",
  },
  {
    id: "8",
    label: "EA8",
    title: "Canarias",
    provinces: "La Palma, La Gomera, El Hierro, Tenerife, Gran Canaria, Fuerteventura y Lanzarote.",
  },
  { id: "9", label: "EA9", title: "Ceuta y Melilla", provinces: "Ciudades autónomas de Ceuta y Melilla." },
];

/** Señales de urgencia, seguridad e informes (no confundir en examen). */
export const EMERGENCY_SIGNALS = [
  {
    signal: "Mayday",
    type: "Socorro",
    meaning: "Peligro grave e inminente para personas, embarcación o aeronave.",
    procedure: "Pronunciar «Mayday» tres veces antes del mensaje.",
    note: "Uso indebido es infracción. Reservado a emergencias reales.",
  },
  {
    signal: "Pan-pan",
    type: "Urgencia",
    meaning: "Situación urgente sin peligro inmediato (avería, fallo médico estable, etc.).",
    procedure: "Pronunciar «Pan-pan» tres veces antes del mensaje.",
    note: "No sustituye a Mayday cuando hay peligro grave.",
  },
  {
    signal: "Securité",
    type: "Seguridad",
    meaning: "Aviso de seguridad: meteorología, deriva, obstáculos, información que afecte a la navegación u operación.",
    procedure: "Pronunciar «Securité» tres veces (ortografía ITU).",
    note: "No es socorro ni urgencia; no confundir con Mayday ni con RST.",
  },
  {
    signal: "RST",
    type: "Informe de señal",
    meaning: "Calidad de la señal recibida en fonía: R legibilidad, S intensidad, T tono (a veces T imparcial).",
    procedure: "Ejemplo: «RST 59» — lectura habitual en tráfico.",
    note: "No es palabra de emergencia; no se repite tres veces como Mayday/Securité.",
  },
];

export const UTILIDADES_NOTES = [
  "El alfabeto fonético ICAO evita confusiones entre letras parecidas en fonía (B/P, M/N, etc.).",
  "Los códigos Q empiezan por Q; en examen suelen preguntar significado de QRM, QRN, QSB, QSL, QSY, QTH…",
  "Mayday = socorro · Pan-pan = urgencia · Securité = seguridad · RST = informe de calidad (R-S-T).",
  "La cifra del indicativo (EA4ABC → 4) indica el distrito de residencia según la tabla oficial vigente.",
];
