/**
 * Enriquecimiento del temario: libro oficial PDF (estudio local) y práctica en la app.
 * Ver docs/LIBRO_OFICIAL_ESTUDIO.md
 */
export const LIBRO_OFICIAL_INTRO = {
  title: "Libro oficial de examen (PDF en 4 partes)",
  pathHint:
    "Carpeta local con los 4 PDF del libro oficial (no van en Git). Ver docs/LIBRO_OFICIAL_ESTUDIO.md.",
  parts: [
    { file: "parte_01_Portada__introducción_e_índice.pdf", label: "Portada, introducción e índice (~20 pp)" },
    { file: "parte_02_Primera_parte__Técnica.pdf", label: "1.ª parte · Técnica (~207 pp)" },
    { file: "parte_03_Segunda_parte__Normas_y_procedimientos_de_operación.pdf", label: "2.ª · Normas y procedimientos (~33 pp)" },
    { file: "parte_04_Tercera_parte__Normativa_nacional_e_internacional.pdf", label: "3.ª · Normativa nacional e internacional (~72 pp)" },
  ],
  studyRoute:
    "Orden recomendado: idea clave y express → resumen para memorizar (sección 3) → teoría explicada → orden de lectura en el PDF → practica en la app → tarjetas y preguntas trampa.",
};

/** @type {Record<string, { libro: string; capitulos: string; enfoque: string; bankPractice: string[] }>} */
export const TEMARIO_BLOCK_ENRICHMENT = {
  "electricidad-basica": {
    libro: "1.ª parte · Técnica",
    capitulos: "Electricidad básica: magnitudes, Ohm, CA, resonancia (libro pp. 22–47, caps. 1–2).",
    enfoque:
      "Bloque ampliado con URE, FEDI y propias (≈57 en banco). El PDF sigue siendo la referencia para diagramas y definiciones largas.",
    bankPractice: [
      "Practicar: elige «Electricidad básica» — verás todas las preguntas del bloque (no 30: es el tema completo). Pulsa «Nueva sesión» para reordenar.",
      "Tras cada fallo, lee la explicación y anota la fórmula o regla en una línea; vuelve al temario «Idea clave» y «Errores típicos».",
      "Cuando domines el bloque, pasa a «Todos los temas» en simulacro de 1.ª prueba.",
    ],
  },
  "magnetismo-ondas": {
    libro: "1.ª parte · Técnica",
    capitulos: "Ondas electromagnéticas, propagación, modulaciones AM/FM/SSB, espectro y muestreo.",
    enfoque: "Memoriza λ = 300/f(MHz) y la diferencia AM vs FM antes de leer opciones largas.",
    bankPractice: [
      "50 preguntas en simulacro de 1.ª prueba; en Practicar por tema puedes hacer sesiones largas mezclando solo ondas.",
      "Prioriza preguntas con «gráfica», «espectro» o «modulación» — suelen llevar figura didáctica en el banco.",
    ],
  },
  componentes: {
    libro: "1.ª parte · Técnica",
    capitulos: "Cap. 3 (pp. 48–59): semiconductores, diodos, BJT/FET, acopladores.",
    enfoque:
      "Libro + OCR 0048–0059: unión PN, rectificadores, montajes BJT (emisor común = ganancia), FET por tensión, acoplador T/π a 50 Ω.",
    bankPractice: [
      "49 preguntas: conviene repasar por familias (R, L, C, diodo, transistor) y luego mezclar.",
      "Activa «preguntas trampa» cuando domines lo básico: confunden rectificar con limitar corriente.",
    ],
  },
  "receptores-emisores": {
    libro: "1.ª parte · Técnica",
    capitulos: "Cap. 6–7 (pp. 100–127) + medidas cap. 10 (pp. 166–177).",
    enfoque:
      "Tres sesiones: galena+superheterodino (FI tras mezclador), TX excitador/PA/filtro SSB, instrumentos ROE/vatímetro. OCR 0100–0120; PDF si página vacía.",
    bankPractice: [
      "79 preguntas — el bloque más grande de la 1.ª prueba: divide en 2–3 sesiones de ~30.",
      "Figuras de esquema de receptor/transmisor: léelas con calma; el enunciado suele citar «siguiente esquema».",
    ],
  },
  "antenas-prop": {
    libro: "1.ª parte · Técnica",
    capitulos: "Cap. 8–9 (pp. 130–165): antenas, líneas, propagación.",
    enfoque:
      "Dos sesiones: cap. 8 (dipolo, Yagi, ROE, ERP, acopladores) y cap. 9 (λ, ionosfera, troposfera). OCR 0130–0165 como apoyo; teoría curada en la app.",
    bankPractice: [
      "70 preguntas con varias figuras: practica primero las que piden diagrama de radiación o esquema de línea.",
      "Contrasta ROE alta (mala adaptación) frente a «buen acoplamiento» en distractores.",
    ],
  },
  "marco-normativo": {
    libro: "3.ª parte · Normativa nacional e internacional",
    capitulos: "Reglamento español, UIT, CEPT, CNAF, HAREC, planes IARU e inspección.",
    enfoque: "Tabla mental: documento → función → trampa (HAREC ≠ licencia CEPT).",
    bankPractice: [
      "83 preguntas de reglamentación: mezcla con «Todos los temas» en 2.ª prueba para simulacro real.",
      "Normativa sensible: si el banco histórico contradice el BOE, sigue la explicación corregida de la app.",
    ],
  },
  "licencias-indicativos": {
    libro: "3.ª parte · Normativa + 2.ª parte (procedimientos)",
    capitulos: "Distintivos, distritos, clases, CEPT, autorización y alfabeto fonético.",
    enfoque:
      "Bloque denso en banco (~129 preguntas): teoría ampliada a ~11 párrafos y resumen de distritos. Deletrea con la tabla del temario; N = Noviembre en tests españoles.",
    bankPractice: [
      "129 preguntas — volumen alto: sesiones cortas diarias mejor que un solo bloque largo.",
      "Haz dictados de indicativos (EA5RCA, ED3ZHO) en voz alta usando fonético ICAO.",
    ],
  },
  "operacion-seguridad": {
    libro: "2.ª parte · Normas y procedimientos de operación",
    capitulos: "Código Q, RST, procedimiento en fonía/CW, emergencias y buenas prácticas.",
    enfoque:
      "Teoría alineada al PDF (~9 párrafos + resumen Q/códigos). QRM/QRN y QRO/QRP son parejas trampa; Mayday ≠ Pan-Pan; CB ≠ aficionado.",
    bankPractice: [
      "34 preguntas: repite hasta automatizar códigos Q más frecuentes.",
      "Ensaya una QSO de 30 s en voz: identificación, reporte, cambio, cierre.",
    ],
  },
  instalaciones: {
    libro: "3.ª parte (antenas/instalaciones) + 1.ª parte (seguridad eléctrica)",
    capitulos: "Instalación exterior, comunidades, tierra, repetidores y compatibilidad electromagnética.",
    enfoque:
      "Solo ~12 preguntas en banco: teoría + caps. 11–12 del libro (EMC, bloqueo, RCD, p. 207 taller). PDF y temario compensan el banco.",
    bankPractice: [
      "Practica las ~12 preguntas varias veces; luego refuerza con checklist de instalación fija del temario.",
      "Relaciona cada pregunta con un ítem de «Errores típicos» (tierra, RF, comunidad de propietarios).",
    ],
  },
};
