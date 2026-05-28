/**
 * Índice de la 1.ª parte · Técnica (libro oficial) alineado con OCR local.
 * Carpeta: …/audiobook/parte_02_Primera_parte__Técnica/ocr-pages/NNNN.txt
 * El número del fichero coincide con la página impresa del libro (p. ej. 0022 → p. 22).
 */
/** Ruta OCR para scripts (`repair:ocr`). Override: `LIBRO_OCR_DIR` o `--dir=`. */
export const LIBRO_TECNICA_OCR_BASE =
  (typeof process !== "undefined" && process.env?.LIBRO_OCR_DIR) ||
  "C:\\Users\\joanc\\Documents\\output\\audiobook\\parte_02_Primera_parte__Técnica\\ocr-pages";

/** Texto en la app (sin ruta personal del desarrollador). */
export const LIBRO_TECNICA_OCR_HINT =
  "audiobook/parte_02_Primera_parte__Técnica/ocr-pages (ver docs/LIBRO_OFICIAL_ESTUDIO.md)";

/** @type {{ n: number; titulo: string; pagDesde: number; pagHasta: number; bloques: string[] }} */
export const LIBRO_PARTE02_CAPITULOS = [
  {
    n: 1,
    titulo: "Corriente, inducción y corriente alterna",
    pagDesde: 22,
    pagHasta: 31,
    bloques: ["electricidad-basica"],
  },
  {
    n: 2,
    titulo: "Circuitos en CA, resonancia y ondas electromagnéticas",
    pagDesde: 32,
    pagHasta: 47,
    bloques: ["electricidad-basica", "magnetismo-ondas"],
  },
  {
    n: 3,
    titulo: "Válvulas, transistores y adaptación de impedancias",
    pagDesde: 48,
    pagHasta: 59,
    bloques: ["componentes"],
  },
  {
    n: 4,
    titulo: "Modulaciones (AM, FM, SSB, CW)",
    pagDesde: 61,
    pagHasta: 89,
    bloques: ["magnetismo-ondas"],
  },
  {
    n: 5,
    titulo: "Señales digitales y procesado (DSP, Nyquist)",
    pagDesde: 90,
    pagHasta: 99,
    bloques: ["magnetismo-ondas", "receptores-emisores"],
  },
  {
    n: 6,
    titulo: "Receptores (galena, sintonía, detección)",
    pagDesde: 100,
    pagHasta: 113,
    bloques: ["receptores-emisores"],
  },
  {
    n: 7,
    titulo: "Transmisores y diagramas de bloques",
    pagDesde: 114,
    pagHasta: 127,
    bloques: ["receptores-emisores"],
  },
  {
    n: 8,
    titulo: "Líneas de transmisión y antenas",
    pagDesde: 130,
    pagHasta: 149,
    bloques: ["antenas-prop"],
  },
  {
    n: 9,
    titulo: "Propagación de ondas",
    pagDesde: 150,
    pagHasta: 165,
    bloques: ["antenas-prop"],
  },
  {
    n: 10,
    titulo: "Medidas (ROE, potencia, instrumentos)",
    pagDesde: 166,
    pagHasta: 181,
    bloques: ["receptores-emisores", "antenas-prop"],
  },
  {
    n: 11,
    titulo: "Interferencias e inmunidad (EMC)",
    pagDesde: 184,
    pagHasta: 189,
    bloques: ["instalaciones", "receptores-emisores"],
  },
  {
    n: 12,
    titulo: "Seguridad eléctrica en el cuerpo humano",
    pagDesde: 190,
    pagHasta: 207,
    bloques: ["instalaciones", "receptores-emisores"],
  },
];

/**
 * Referencia por bloque del temario (1.ª prueba técnica).
 * @type {Record<string, { paginas: string; capitulos: string; ocrEjemplo: string[]; lecturaCapitulos: string[] }>}
 */
export const LIBRO_TEMA_PAGINAS = {
  "electricidad-basica": {
    paginas: "22–47",
    capitulos: "Cap. 1–2",
    ocrEjemplo: ["0022.txt", "0030.txt", "0035.txt"],
    lecturaCapitulos: [
      "Cap. 1 (pp. 22–31): inducción, alternador, regla de la mano derecha, FEM E = B·l·v, valor eficaz.",
      "Cap. 2 (pp. 32–44): reactancias Xc y Xl, desfase 90°, circuitos R-L-C en serie y paralelo.",
      "Cap. 2 (pp. 35–40): resonancia, factor Q, filtros PI y T.",
    ],
  },
  "magnetismo-ondas": {
    paginas: "45–99",
    capitulos: "Cap. 2 (§2.7) · 4–5",
    ocrEjemplo: ["0045.txt", "0080.txt", "0090.txt"],
    lecturaCapitulos: [
      "Cap. 2 §2.7 (pp. 45–47): ondas de radio, campos E y B, polarización, c ≈ 300.000 km/s.",
      "Cap. 4 (pp. 61–89): AM, FM, SSB, CW; envolvente, bandas laterales, sobremodulación.",
      "Cap. 5 (pp. 90–99): señal digital, muestreo y criterio de Nyquist.",
    ],
  },
  componentes: {
    paginas: "48–59",
    capitulos: "Cap. 3",
    ocrEjemplo: ["0048.txt", "0050.txt", "0055.txt", "0058.txt"],
    lecturaCapitulos: [
      "Cap. 3 (pp. 48–52): semiconductores N/P, diodo PN, rectificadores, Zener, LED, varicap.",
      "Cap. 3 (pp. 52–56): BJT NPN/PNP, curvas Fig. 63, montajes emisor común (Fig. 64), base y colector.",
      "Cap. 3 (pp. 54–55): FET/MOSFET — control por tensión en puerta.",
      "Cap. 3 (pp. 56–59): válvulas (concepto); acopladores T y π para presentar 50 Ω a la antena.",
    ],
  },
  "receptores-emisores": {
    paginas: "100–177",
    capitulos: "Cap. 6–7 · 10",
    ocrEjemplo: ["0100.txt", "0102.txt", "0106.txt", "0114.txt", "0118.txt", "0172.txt"],
    lecturaCapitulos: [
      "Cap. 6 (pp. 100–102): galena; por qué superheterodino (estabilidad, selectividad).",
      "Cap. 6 (pp. 102–108): cadena AM, FI, frecuencia imagen, mezcladores activo/pasivo.",
      "Cap. 6 (pp. 108–113): filtros FI, detectores, AGC, squelch, limitadores de ruido.",
      "Cap. 6 (pp. 123–127): interferencias (armónicos, mod. cruzada, bloqueo) y filtros de rechazo.",
      "Cap. 7 (pp. 114–127): TX directo vs cambio de frecuencia; excitador, PA, filtro SSB, transceptor.",
      "Cap. 10 (pp. 166–177): ROE, vatímetro, osciloscopio — usar PDF si OCR vacío en 0170.",
    ],
  },
  "antenas-prop": {
    paginas: "130–165",
    capitulos: "Cap. 8–9",
    ocrEjemplo: ["0130.txt", "0135.txt", "0140.txt", "0150.txt", "0160.txt"],
    lecturaCapitulos: [
      "Cap. 8 (pp. 130–139): función de la antena, λ, líneas (Zo, ROE), coaxial 50 Ω.",
      "Cap. 8 (pp. 140–149): Yagi, ERP/EIRP, relación frente-espalda, dipolo con trampas HF.",
      "Cap. 8 (pp. 135–137): acopladores T/π y filtros de salida — adaptar antena al transmisor.",
      "Cap. 9 (pp. 150–159): longitud de onda, periodo, reflexión, difracción.",
      "Cap. 9 (pp. 160–165): ionosfera, MUF, desvanecimiento, dispersión troposférica VHF.",
    ],
  },
  "marco-normativo": {
    paginas: "—",
    capitulos: "parte_04 (PDF)",
    ocrEjemplo: [],
    lecturaCapitulos: ["Usa parte_04 · Normativa (PDF en chapters/), no este OCR técnico."],
  },
  "licencias-indicativos": {
    paginas: "—",
    capitulos: "parte_04 + parte_03",
    ocrEjemplo: [],
    lecturaCapitulos: ["parte_04 distintivos; parte_03 alfabeto fonético."],
  },
  "operacion-seguridad": {
    paginas: "—",
    capitulos: "parte_03",
    ocrEjemplo: [],
    lecturaCapitulos: ["parte_03 · Normas y procedimientos de operación (código Q, QSO)."],
  },
  instalaciones: {
    paginas: "184–207+",
    capitulos: "Cap. 11–12",
    ocrEjemplo: ["0184.txt", "0190.txt", "0207.txt"],
    lecturaCapitulos: [
      "Cap. 11 (pp. 184–205): EMC, bloqueo/desensibilización, armónicos y espurias por mal uso (sobremodulación).",
      "Cap. 12 (pp. 190–200): electrocución, fibrilación, impedancia del cuerpo (Fig. 170), RCD.",
      "Cap. 12 (pp. 200+): tormentas — desconectar bajada; refugio en interior del edificio.",
      "Prácticas finales (p. 207+): herramientas aisladas, sin joyas, instrumentos acordes a la tensión.",
    ],
  },
};

/**
 * @param {string} blockId
 */
export function libroPaginaOcrPath(pagina) {
  const n = Number(pagina);
  if (!Number.isFinite(n) || n < 1) return "";
  return `${LIBRO_TECNICA_OCR_BASE}\\${String(n).padStart(4, "0")}.txt`;
}

/**
 * @param {string} blockId
 */
export function getLibroRefsForBlock(blockId) {
  return LIBRO_TEMA_PAGINAS[blockId] || null;
}
