/**
 * Teoría alineada al libro oficial (PDF local, 4 partes).
 * Complementa topics-study.js: orden de lectura + resumen para memorizar.
 * Índice de páginas/capítulos: libro-tecnica-indice.mjs (OCR audiobook).
 * Ver docs/LIBRO_OFICIAL_ESTUDIO.md
 */
import { LIBRO_TECNICA_OCR_BASE, LIBRO_TEMA_PAGINAS } from "./libro-tecnica-indice.mjs";

export const LIBRO_TEMA_TEORIA = {
  "electricidad-basica": {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "Magnitudes: V (tensión), I (intensidad), R (resistencia), P (potencia). Ohm V = I·R; potencia P = V·I.",
      "Serie suma R; paralelo: 1/Req = 1/R1 + 1/R2. CC estable: C ≈ abierto, L ideal ≈ corto.",
      "CA: valor eficaz Vp ≈ √2·Vrms; T = 1/f. a(t) = A·sen(2πft + φ).",
      "Inducción: regla de la mano derecha (B, movimiento → sentido de I). Alternador: E = B·l·v.",
      "Coulomb: fuerza ∝ producto de cargas. dB y dBm según enunciado.",
    ],
    diagramasLibro:
      "Figs. 20–24 alternador y CA; circuitos R, L, C (Figs. 29–35); resonancia y filtros PI/T (Figs. 40–41).",
  },
  "magnetismo-ondas": {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "Onda EM: campos E y B acoplados; en vacío c ≈ 3·10⁸ m/s → λ(m) ≈ 300/f(MHz).",
      "AM varía amplitud; FM varía frecuencia; SSB una banda lateral; CW portadora interrumpida.",
      "Fundamental + armónicos en señales no sinusoidales. Nyquist: fs ≥ 2·fmax.",
      "+3 dB ≈ doble potencia; +10 dB ≈ ×10.",
    ],
    diagramasLibro: "§2.7 ondas EM; Fig. 84 AM; espectros FM/SSB; muestreo digital (cap. 5).",
  },
  componentes: {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "R disipa; C almacena carga (Xc baja con f); L almacena campo (Xl sube con f).",
      "Unión PN: por debajo del umbral ≈ abierto; por encima conduce. Rectificador media onda / puente.",
      "Zener (inversa), LED, varicap (C variable 1–500 pF). Tipo N donante; tipo P aceptor (huecos).",
      "BJT: emisor común = máxima ganancia; FET = control por tensión en puerta.",
      "Zonas transistor: corte, activa, saturación (Fig. 63). Acoplador T o π → 50 Ω a la antena.",
    ],
    diagramasLibro:
      "Figs. 56–57 rectificadores; 63 curvas BJT; 64–66 montajes; acopladores T/π (pp. 58–59).",
  },
  "receptores-emisores": {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "Galena Fig. 100–101: L-C + diodo → auriculares (histórico).",
      "Superheterodino: RF → mezclador+OL → FI (455 kHz AM / 10,7 MHz FM) → detector → audio.",
      "FI tras mezclador; suma y diferencia. FI alta ayuda contra frecuencia imagen.",
      "Mezclador activo ~+10 dB; pasivo diodos ~−8 dB, menos intermodulación.",
      "TX: excitador → PA → filtro. SSB: filtro banda lateral. AGC/squelch/DNL.",
      "Interferencias: armónicos, mod. cruzada, bloqueo → filtro rechazo.",
      "Cap. 10: vatímetro, ROE, osciloscopio, S-meter.",
    ],
    diagramasLibro:
      "Figs. 100–101 galena; bloques superheterodino AM; mezcladores DBM/TBM; TX cap. 7; medidas cap. 10.",
  },
  "antenas-prop": {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "Antena ↔ onda EM; tamaño ~ múltiplo de λ. Dipolo λ/2; vertical λ/4 + tierra.",
      "Línea 50 Ω; ROE 1:1 sin reflexión. Balun (balanceado); acoplador T/π (impedancia).",
      "Yagi: reflector–excitado–directores; frente-espalda ~20 dB (3 elem.). ERP/EIRP; dBi = dBd + 2,15.",
      "Cap. 9: λ = v/f; T = 1/f; reflexión/difracción. HF ionosfera/MUF; VHF troposfera/visión directa.",
      "Antena corta → resuena alto → alargar.",
    ],
    diagramasLibro:
      "Diagramas radiación; Yagi; dipolo con trampas HF; Fig. 143 (λ, T, f); ionosfera y troposfera.",
  },
  "marco-normativo": {
    partePdf: "parte_04_Tercera_parte__Normativa_nacional_e_internacional.pdf",
    resumenMemorizar: [
      "España: Orden IET/1311/2013 (BOE-A-2013-7624) + anexo I (bandas/potencias).",
      "HAREC = examen armonizado (CEPT T/R 61-02). CEPT T/R 61-01 = operar temporal en otro país.",
      "UIT: regiones y definiciones. IARU: planes de banda (recomendación, no BOE).",
      "CNAF atribuye espectro en España. Inspección y sanciones: ley telecomunicaciones.",
    ],
    lecturaOrden: [
      "Reglamento español de aficionados: objeto, definiciones, condiciones generales.",
      "Anexo I: bandas y potencias (contrastar siempre con BOE consolidado).",
      "Marco CEPT (T/R 61-01 y 61-02) y relación con HAREC.",
      "UIT: servicio de aficionados, regiones, definiciones básicas.",
      "Planes IARU y CNAF; régimen de inspección e infracciones.",
    ],
    diagramasLibro: "Tablas de bandas, mapa de regiones UIT (si figura).",
  },
  "licencias-indicativos": {
    partePdf: "parte_04_Tercera_parte__Normativa_nacional_e_internacional.pdf + parte_03 (fonía)",
    resumenMemorizar: [
      "Indicativo: prefijo (EA/EB/EC) + distrito + sufijo. EA5RCA → EA, 5, RCA.",
      "Autorización administrativa ≠ HAREC ≠ licencia CEPT temporal (T/R 61-01).",
      "Fonético examen español: N = Noviembre; cifras en castellano (cero… nueve).",
      "Distritos clave: 5 Levante/Murcia, 6 Baleares, 8 Canarias, 9 Ceuta/Melilla.",
      "F3E = telefonía FM; ED = desatendida; EG = eventos temporales según caso.",
      "Identificación al inicio y fin; deletrea sin palabras inventadas (Norte, Madrid).",
    ],
    lecturaOrden: [
      "Clases y categorías de estaciones; titular, responsabilidades y uso por terceros.",
      "Distintivos de llamada, distritos españoles (tabla del PDF) y prefijos CEPT.",
      "Clases de emisión (F3E, A3E, J3E, A1A) si figuran en el índice técnico.",
      "Procedimiento de autorización, HAREC y documentación de estación.",
      "Alfabeto fonético en parte_03; repasa en voz alta EA5RCA y EA6/OK2HM.",
      "Cierra con tarjetas de distritos y trampas Noviembre/November.",
    ],
    diagramasLibro: "Tabla de distritos, ejemplos de indicativos, tabla fonética ICAO.",
  },
  "operacion-seguridad": {
    partePdf: "parte_03_Segunda_parte__Normas_y_procedimientos_de_operación.pdf",
    resumenMemorizar: [
      "QRM interferencia estaciones; QRN ruido. QRO más potencia; QRP menos. QSY cambiar frecuencia; QRT cesar TX.",
      "QSL confirmar; QRZ quién llama; QTH ubicación. CQ llamada general; DX larga distancia.",
      "RST: R legibilidad, S intensidad, T tono (T en CW).",
      "Mayday socorro; Pan-Pan urgencia; Sécurité seguridad. PSE por favor; AR fin en CW.",
      "CB ≠ servicio de aficionado. Identificarse; potencia necesaria; no interferir.",
    ],
    lecturaOrden: [
      "Alfabeto fonético internacional (deletreo de letras y cifras).",
      "Código Q: grupos más usados (QRM, QRN, QRO, QRP, QSL, QSY, QRT, QTH).",
      "Procedimiento de llamada, cambio y cierre de QSO.",
      "Señales de socorro, urgencia y seguridad; tráfico prioritario.",
      "Buenas prácticas: potencia necesaria, no interferir, lenguaje claro.",
    ],
    diagramasLibro: "Tabla código Q, ejemplo de QSO en fonía (si aparece).",
  },
  instalaciones: {
    partePdf: "parte_04_Tercera_parte__Normativa_nacional_e_internacional.pdf + parte_02 (tierra/seguridad)",
    resumenMemorizar: [
      "Instalación fija: legal + mecánico + eléctrico (memoria, tierra, seguro).",
      "Ley 19/1983 + RD 2623/1986: antenas en inmuebles, no extremos libre/prohibido siempre.",
      "Comunidad: comunicación previa, obras, plazos; «excepto urgencia» cambia márgenes.",
      "Tipos: portátil, móvil, fija, remota, desatendida — no son sinónimos.",
      "RF en equipos: filtros, ferritas, tierra. No tocar antena en TX.",
      "Cap. 12: ajustes con equipo en marcha → herramientas aisladas; quitar anillos y relojes.",
      "EMC (cap. 11): interferencia = respuesta no deseada; bloqueo por señal fuerte; armónicos/espurias.",
      "Cap. 12: impedancia cuerpo (piel+interna); RCD dispara antes de fibrilación; tormenta: desconectar bajada.",
      "p. 207: herramientas aisladas si ajustas en marcha; sin anillos ni relojes; primeros auxilios.",
    ],
    diagramasLibro: "Fig. 170 impedancia cuerpo; cap. 11 bloqueo/EMC; cap. 12 tablas tensión; p. 207 prácticas.",
  },
};

const LECTURA_CIERRE = "Contrasta con «Teoría explicada» (sección 5) en la app.";

for (const [blockId, refs] of Object.entries(LIBRO_TEMA_PAGINAS)) {
  const tema = LIBRO_TEMA_TEORIA[blockId];
  if (!tema || !refs) continue;
  tema.paginasLibro = refs.paginas;
  tema.capitulosLibro = refs.capitulos;
  tema.ocrCarpeta = LIBRO_TECNICA_OCR_BASE;
  if (refs.lecturaCapitulos?.length) {
    tema.lecturaOrden = [...refs.lecturaCapitulos, LECTURA_CIERRE];
  }
}
