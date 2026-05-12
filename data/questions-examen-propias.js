/**
 * Banco propio: solo ítems alineados con lo que suele caer en el examen oficial
 * (programa HAREC / anexo II del reglamento de aficionado en España).
 *
 * Criterios al añadir preguntas:
 * - Redactar a partir del texto del BOE (PDF/HTML consolidado del reglamento),
 *   del programa CEPT T/R 61-02 y del material de práctica URE; no inventar
 *   curiosidades que no estén en esas fuentes.
 * - `topicId` debe existir en data/topics.js (bloque del temario).
 * - `sourceRef`: trazabilidad breve (documento + sección o URL); obligatorio
 *   en este archivo.
 * - Cuatro opciones, una sola correcta; explicación literal y revisable.
 */
export default [
  {
    id: "ofic-001",
    part: 1,
    topicId: "electricidad-basica",
    stem: "En corriente continua, si la tensión es V y la intensidad I, la potencia disipada P es:",
    options: ["P = V / I", "P = V · I", "P = I / V", "P = V + I"],
    correctIndex: 1,
    explain: "Potencia en CC: P = V·I (vatios). Es fórmula básica del programa de electricidad.",
    sourceRef: "Programa tipo HAREC / electricidad básica; cualquier manual URE de 1.ª parte.",
  },
  {
    id: "ofic-002",
    part: 1,
    topicId: "electricidad-basica",
    stem: "Dos resistencias en serie R1 y R2 se comportan como una resistencia equivalente:",
    options: ["R1 · R2 / (R1 + R2)", "R1 + R2", "|R1 − R2|", "1 / (1/R1 + 1/R2)"],
    correctIndex: 1,
    explain: "En serie las resistencias se suman: Req = R1 + R2.",
    sourceRef: "Electricidad básica · circuitos en serie (temario y libros de examen).",
  },
  {
    id: "ofic-003",
    part: 1,
    topicId: "magnetismo-ondas",
    stem: "En modulación de frecuencia (FM), la magnitud de la portadora que varía con la señal moduladora es principalmente:",
    options: ["La amplitud", "La frecuencia", "La polarización lineal", "La impedancia del vacío"],
    correctIndex: 1,
    explain: "En FM varía la frecuencia instantánea de la portadora alrededor de la frecuencia central.",
    sourceRef: "CEPT T/R 61-02 · bloque de modulaciones; resúmenes URE de radioelectricidad.",
  },
  {
    id: "ofic-004",
    part: 1,
    topicId: "magnetismo-ondas",
    stem: "Un aumento de 3 dB en potencia (misma impedancia) corresponde aproximadamente a:",
    options: ["Doblar la potencia", "Mitad de potencia", "Diez veces la potencia", "Igual de potencia"],
    correctIndex: 0,
    explain: "3 dB en potencia implica un factor ~2 (doble); 10 dB implica un factor ~10.",
    sourceRef: "Decibelios · definición logarítmica habitual en exámenes de radioelectricidad.",
  },
  {
    id: "ofic-005",
    part: 1,
    topicId: "antenas-prop",
    stem: "Un dipolo recto de media onda a una frecuencia dada tiene una longitud total eléctrica aproximada de:",
    options: ["Un cuarto de longitud de onda", "Media longitud de onda", "Una longitud de onda", "Dos longitudes de onda"],
    correctIndex: 1,
    explain: "El dipolo clásico «media onda» mide del orden de λ/2 en total (cada brazo ~λ/4).",
    sourceRef: "Tema antenas · programas de examen y manuales URE (ondas estacionarias en dipolo).",
  },
  {
    id: "ofic-006",
    part: 1,
    topicId: "componentes",
    stem: "Un condensador ideal en circuito abierto en régimen permanente de corriente continua se comporta como:",
    options: ["Un cortocircuito", "Un circuito abierto", "Una resistencia nula siempre", "Una fuente de tensión"],
    correctIndex: 1,
    explain: "En CC estable no circula corriente por el condensador: equivale a circuito abierto (modelo ideal).",
    sourceRef: "Electricidad básica · comportamiento de R, L y C en CC (temario 1.ª parte).",
  },
  {
    id: "ofic-007",
    part: 1,
    topicId: "receptores-emisores",
    stem: "En un receptor superheterodino, la etapa que traslada la señal recibida a la frecuencia intermedia (FI) suele ser:",
    options: ["El detector de producto únicamente", "El mezclador (con oscilador local)", "Solo el filtro de entrada", "El microófono"],
    correctIndex: 1,
    explain: "El mezclador combina señal de antena y oscilador local para generar la FI fija.",
    sourceRef: "Bloques de receptor · programa HAREC / esquemas tipo en material URE.",
  },
  {
    id: "ofic-008",
    part: 2,
    topicId: "marco-normativo",
    stem: "En España, el reglamento específico de uso del dominio público radioeléctrico por radioaficionados se aprueba principalmente mediante:",
    options: [
      "Una orden ministerial que aprueba el reglamento (p. ej. IET/1311/2013)",
      "Solo una ley autonómica de telecomunicaciones",
      "Un reglamento europeo directamente aplicable sin publicación en el BOE",
      "Un acuerdo de club local",
    ],
    correctIndex: 0,
    explain:
      "El marco habitual es la Orden IET/1311/2013, que aprueba el Reglamento de aficionados publicado en el BOE; el texto vinculante está en el BOE.",
    sourceRef: "BOE · Orden IET/1311/2013 (BOE-A-2013-7624), título y preámbulo; PDF consolidado en boe.es.",
  },
  {
    id: "ofic-009",
    part: 2,
    topicId: "marco-normativo",
    stem: "La prueba de capacitación de radioaficionado en España consta, en lo habitual, de:",
    options: [
      "Una sola prueba mezclada sin partes",
      "Dos partes independientes (electricidad/radioelectricidad y reglamentación)",
      "Solo legislación autonómica",
      "Solo práctica oral sin test",
    ],
    correctIndex: 1,
    explain:
      "El esquema habitual es dos pruebas independientes alineadas con el programa (electricidad y reglamentación), reflejado en el reglamento y en la convocatoria.",
    sourceRef: "BOE · Reglamento IET/1311/2013 (estructura de la prueba); anexo II programa HAREC.",
  },
  {
    id: "ofic-010",
    part: 2,
    topicId: "licencias-indicativos",
    stem: "La recomendación CEPT que describe la licencia CEPT de radioaficionado para uso en países que la reconocen es, por lo general:",
    options: ["T/R 61-02", "T/R 61-01", "T/R 62-01", "ERC Report 089"],
    correctIndex: 1,
    explain: "T/R 61-01 desarrolla la licencia CEPT; T/R 61-02 es el programa de examen (HAREC).",
    sourceRef: "CEPT · ECC T/R 61-01 y T/R 61-02 (cept.org/ecc/ham-radio).",
  },
  {
    id: "ofic-011",
    part: 2,
    topicId: "marco-normativo",
    stem: "En el reglamento de radioaficionados (Orden IET/1311/2013), para estaciones automáticas desatendidas en VHF/UHF, el artículo 25.h fija límites de potencia de salida; dentro del casco urbano el techo orientativo es del orden de:",
    options: ["1 W", "10 W", "50 W", "500 W"],
    correctIndex: 1,
    explain:
      "El art. 25.h distingue dentro/fuera del casco urbano; dentro del urbano el límite orientativo citado en el propio texto es 10 W de salida (fuera suele ser mayor; ver tabla y redacción vigente).",
    sourceRef: "BOE · Reglamento IET/1311/2013, art. 25.h y anexo I; PDF consolidado BOE-A-2013-7624.",
  },
  {
    id: "ofic-012",
    part: 2,
    topicId: "marco-normativo",
    stem: "El anexo I del reglamento de radioaficionados (IET/1311/2013) es especialmente relevante para consultar:",
    options: [
      "Solo el color de los conectores de micro",
      "Condiciones técnicas como potencias y bandas de emisión del aficionado",
      "Únicamente tarifas de examen",
      "Solo el código Q completo",
    ],
    correctIndex: 1,
    explain:
      "El anexo I desarrolla condiciones técnicas (incluye tablas de potencias por banda, etc.); es referencia obligada ante dudas de enunciados.",
    sourceRef: "BOE · Reglamento IET/1311/2013, anexo I (condiciones técnicas).",
  },
  {
    id: "ofic-013",
    part: 1,
    topicId: "magnetismo-ondas",
    stem: "La frecuencia de resonancia de un circuito LC ideal en paralelo viene dada en buena aproximación por:",
    options: ["f0 = 2π√(LC)", "f0 = 1/(2π√(LC))", "f0 = LC / (2π)", "f0 = √(L/C)"],
    correctIndex: 1,
    explain: "f0 = 1/(2π√(LC)) es la relación estándar en resonancia serie/paralelo ideal LC.",
    sourceRef: "Radioelectricidad básica · resonancia LC (programa HAREC / temario URE).",
  },
  {
    id: "ofic-014",
    part: 2,
    topicId: "operacion-seguridad",
    stem: "En jerga telefónica de aficionado, «QSY» suele indicar que se va a:",
    options: ["Aumentar la potencia sin límite", "Cambiar de frecuencia o canal", "Apagar el equipo de forma inmediata", "Emitir en modo exclusivamente digital"],
    correctIndex: 1,
    explain: "QSY: cambiar de frecuencia (o desplazarse en la banda).",
    sourceRef: "Código Q · práctica operativa habitual en exámenes y manuales de operación.",
  },
];
