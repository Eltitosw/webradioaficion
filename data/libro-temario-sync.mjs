/**
 * Teoría alineada al libro oficial (PDF local, 4 partes).
 * Complementa topics-study.js: orden de lectura + resumen para memorizar.
 * Ver docs/LIBRO_OFICIAL_ESTUDIO.md
 */
export const LIBRO_TEMA_TEORIA = {
  "electricidad-basica": {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "Magnitudes: V (tensión), I (intensidad), R (resistencia), P (potencia). Ohm V = I·R; potencia P = V·I.",
      "Serie suma R; paralelo: 1/Req = 1/R1 + 1/R2. CC estable: C ≈ abierto, L ideal ≈ corto.",
      "CA: valor eficaz Vp ≈ √2·Vrms; T = 1/f. Instrumentos: voltímetro en paralelo, amperímetro en serie.",
      "dB relación; dBm potencia respecto a 1 mW. Coulomb: fuerza ∝ producto de cargas.",
    ],
    lecturaOrden: [
      "Magnitudes eléctricas y unidades del SI (voltio, amperio, ohmio, vatio, faradio, henrio).",
      "Ley de Ohm y ley de Coulomb; resistencia, conductores y código de colores.",
      "Potencia en CC y CA; valor eficaz, periodo y frecuencia.",
      "Fuentes, FEM y resistencia interna; condensadores y bobinas en CC/CA.",
      "Decibelios y medidas (voltímetro, amperímetro, óhmetro, osciloscopio).",
      "Contrasta cada apartado con la sección «Teoría explicada» de este bloque en la app.",
    ],
    diagramasLibro: "Esquemas de divisor de tensión, serie/paralelo, forma de onda en osciloscopio, código de colores.",
  },
  "magnetismo-ondas": {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "Onda EM: campos E y B acoplados; en vacío c ≈ 3·10⁸ m/s → λ(m) ≈ 300/f(MHz).",
      "AM varía amplitud; FM varía frecuencia; SSB una banda lateral; CW portadora interrumpida.",
      "Fundamental + armónicos en señales no sinusoidales. Nyquist: fs ≥ 2·fmax.",
      "+3 dB ≈ doble potencia; +10 dB ≈ ×10.",
    ],
    lecturaOrden: [
      "Ondas electromagnéticas: propagación, polarización, relación frecuencia–longitud de onda.",
      "Señales sinusoidales y no sinusoidales (armónicos, ruido).",
      "Modulaciones AM, FM, fase, SSB y CW; anchura de banda y sobremodulación.",
      "Introducción a muestreo digital y criterio de Nyquist si aparece en el índice.",
      "Repasa la tabla AM/FM/SSB del temario antes de cerrar el capítulo.",
    ],
    diagramasLibro: "Espectros AM/SSB, diagrama de onda modulada, gráfica f versus λ.",
  },
  componentes: {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "R disipa; C almacena carga (Xc baja con f); L almacena campo (Xl sube con f).",
      "Diodo: conduce en directa, bloquea en inversa (ideal). Zener regula en inversa.",
      "Transistor: pequeña señal controla corriente mayor. Transformador: relación de espiras.",
      "Resonancia L–C: Q = f/B. Código de colores en R y C.",
    ],
    lecturaOrden: [
      "Resistencias: tipos, código de colores, PTC/NTC.",
      "Condensadores: capacidad, reactancia, tipos y polaridad en electrolíticos.",
      "Bobinas: inductancia, factor Q, núcleos.",
      "Diodos (rectificador, Zener, LED, varicap) y transistores (bipolar, FET).",
      "Transformadores y circuitos RLC; resonancia y filtros conceptuales.",
    ],
    diagramasLibro: "Símbolos esquemáticos, curva del diodo, puente rectificador, circuito resonante.",
  },
  "receptores-emisores": {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "Superheterodino: antena → RF → mezclador+OL → FI fija → IF → detector → audio/AF.",
      "Selectividad separa frecuencias; sensibilidad detecta señales débiles.",
      "Potencia: PEP en SSB; medidores de ROE, vatímetro, analizador de espectro según enunciado.",
      "Seguridad: no tocar antena en TX; EMC y puesta a tierra del equipo.",
    ],
    lecturaOrden: [
      "Bloques del receptor: entrada, mezclador, oscilador local, FI, demodulador, AF.",
      "Transmisores: oscilador, amplificadores, acoplamiento a antena, filtros de armónicos.",
      "Medidas de potencia y ROE; interpretación de esquemas de cadena.",
      "Seguridad eléctrica y RF en estación (tierra, contactos, potencia máxima).",
    ],
    diagramasLibro: "Esquema superheterodino, cadena TX, pantalla de instrumento o s-meter.",
  },
  "antenas-prop": {
    partePdf: "parte_02_Primera_parte__Técnica.pdf",
    resumenMemorizar: [
      "λ total dipolo ≈ λ/2; cuarto de onda vertical. Yagi: reflector–excitado–directores.",
      "ROE alta = mala adaptación (reflexión). Balun adapta línea 50 Ω a antena balanceada.",
      "HF: ionosfera; VHF/UHF: más línea de vista. dBi vs dBd (+2,15 dB aprox.).",
      "Antena corta → sube frecuencia de resonancia; alargar para bajar f.",
    ],
    lecturaOrden: [
      "Tipos de antenas: dipolo, Yagi, vertical, loop; diagramas de radiación.",
      "Líneas de transmisión, impedancia característica y ROE.",
      "Propagación HF (ionosfera) y VHF/UHF (troposfera, obstáculos).",
      "Adaptación, balun y medidas en antena analizador/ROE.",
    ],
    diagramasLibro: "Diagrama de radiación, esquema Yagi, curva ROE, capas ionosféricas.",
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
      "Interferencia a servicios protegidos → cesar o corregir. Cancelar licencia → antena puede exigir autorización.",
    ],
    lecturaOrden: [
      "Ley 19/1983: derecho a instalar antenas y límites en fachadas (parte_04).",
      "RD 2623/1986 e instrucciones: memoria, instalador, seguro, condiciones técnicas.",
      "Puesta a tierra, protecciones y descargas (parte_02, capítulo seguridad).",
      "Repetidores/desatendidas: gestor, identificación y potencias (cruce con marco normativo).",
      "EMC: vías de entrada de RF y medidas (filtros, blindaje, ferritas).",
      "Subraya procedimientos: pocas preguntas en banco; el PDF y el temario compensan.",
    ],
    diagramasLibro: "Croquis de instalación, esquema de toma de tierra, señalización de riostras.",
  },
};
