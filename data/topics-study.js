/**
 * Material de estudio por bloque del temario (clave = topicId).
 * Basado en el programa tipo HAREC / anexo II del reglamento de aficionado (BOE IET/1311/2013),
 * recomendaciones CEPT (T/R 61-02, T/R 61-01) y material de práctica URE. Contrasta siempre con el BOE y tu manual.
 */
export default {
  "electricidad-basica": {
    memoryHooks: [
      "SI: V voltio, I amperio, R ohmio, P vatio.",
      "Ohm: V = I·R. Potencia CC: P = V·I = I²R = V²/R.",
      "Serie: R suman. Paralelo: 1/R = 1/R1 + 1/R2.",
      "Condensador en CC estable ≈ circuito abierto; bobina ideal en CC estable ≈ corto.",
    ],
    expressBullets: [
      "La ley de Ohm relaciona tres magnitudes; si te dan dos, despeja la tercera.",
      "Potencia es energía por tiempo: en CC sin armónicos raros, P = V·I es la fórmula base del examen.",
      "RMS vs pico (senoidal): Vp ≈ √2·Vrms (aparece en medidas y seguridad de etapas).",
      "Unidades coherentes: no confundas vatio (potencia) con voltio (tensión).",
    ],
    readMore: [
      "Corriente alterna: conceptos de frecuencia, periodo T = 1/f y valor eficaz; en examen suele bastar reconocer qué mide cada instrumento en CA.",
      "Divisor de tensión con resistencias: V en R proporcional a R en serie; útil para polarizaciones y lecturas de esquemas.",
    ],
    flashcards: [
      { front: "Ley de Ohm (CC)", back: "V = I · R" },
      { front: "Potencia en CC si conoces V e I", back: "P = V · I" },
      { front: "Dos resistencias iguales en paralelo", back: "Req = R / 2" },
      { front: "Unidad de intensidad en el SI", back: "Amperio (A)" },
    ],
    sources:
      "Programa HAREC / electricidad básica; manuales URE de 1.ª parte; BOE solo para aspectos reglados de equipos si aplica.",
  },
  "magnetismo-ondas": {
    memoryHooks: [
      "λ = c/f (vacío aprox. c ≈ 3·10⁸ m/s). λ corta ↔ f alta.",
      "AM: varía amplitud. FM: varía frecuencia. SSB: banda lateral (concepto de examen).",
      "3 dB en potencia ≈ doble; 10 dB ≈ ×10 (orden de magnitud).",
    ],
    expressBullets: [
      "Longitud de onda y frecuencia van inversas: memoriza una pareja numérica de ejemplo (p. ej. 14 MHz ↔ ~21 m en orden de magnitud).",
      "Modulación: identifica qué magnitud de la portadora cambia (AM vs FM) antes de leer distractores largos.",
      "Impedancia: en examen suele bastar saber que adaptar línea/antena evita ROE alta y reflejos.",
    ],
    readMore: [
      "Polarización (lineal/circular): suele ligarse a antenas y satélite en preguntas conceptuales; reconoce definiciones, no hace falta deducir ecuaciones largas.",
      "Espectro: localizar portadora y bandas laterales ayuda a entender ancho de banda aproximado en AM vs SSB.",
    ],
    flashcards: [
      { front: "Relación λ y f en el vacío", back: "λ = c / f" },
      { front: "¿Qué varía en FM?", back: "La frecuencia instantánea de la portadora" },
      { front: "¿Qué varía en AM clásica?", back: "La amplitud de la portadora" },
      { front: "+3 dB en potencia (misma Z)", back: "≈ el doble de potencia" },
    ],
    sources: "CEPT T/R 61-02 (programa); resúmenes URE de radioelectricidad.",
  },
  componentes: {
    memoryHooks: [
      "R disipa. L y C almacenan (campo y campo eléctrico). Diodo: rectifica. Transistor: amplifica/conmuta.",
      "Filtros RC/RLC: frecuencia de corte conceptual según R, L, C.",
    ],
    expressBullets: [
      "Diodo en directa conduce; en inversa bloquea (modelo ideal del test).",
      "Condensador pasa altas (bloquea DC en coupling); bobina opondráse a cambios bruscos de I.",
      "Puente rectificador: convierte AC en pulsante DC; después suele ir filtrado.",
    ],
    readMore: [
      "Transistor bipolar: base controla corriente colector–emisor en zona activa (concepto); en examen prevalece el reconocimiento de símbolo y función.",
      "Zener: referencia de tensión en paralelo cuando polarizas en inversa por encima de su tensión.",
    ],
    flashcards: [
      { front: "¿Qué hace un condensador en CC en régimen permanente (ideal)?", back: "Equivale a circuito abierto" },
      { front: "Función típica de diodo en fuente", back: "Rectificar / proteger polaridad (según montaje)" },
      { front: "Letra griega de constante dieléctrica frecuente", back: "ε (epsilon)" },
    ],
    sources: "Programa HAREC componentes; esquemas tipo en material URE/FEDI.",
  },
  "receptores-emisores": {
    memoryHooks: [
      "Superheterodino: mezclador + OL → FI fija; amplificar FI es más estable que a RF variable.",
      "Detector: AM diodo/envelope; SSB product detector; FM discriminador (concepto).",
      "Medición: vatímetro para potencia; ROE alto → desadaptación.",
    ],
    expressBullets: [
      "Cadena típica RX: entrada → mezclador → FI → detector → AF.",
      "Transmisor: oscilador/mezclador → amplificación → filtrado/armónicos (según pregunta) → acoplo a antena.",
      "Potencia reflejada alta con adaptación mala: ROE sube; en examen se asocia a desadaptación.",
    ],
    readMore: [
      "Estabilidad y selectividad: etapas a FI permiten filtros más estrechos que a la frecuencia de recepción directa.",
      "Control AGC: evita que se sature el receptor con señales fuertes (idea de examen).",
    ],
    flashcards: [
      { front: "Etapa que genera la FI en superheterodino", back: "El mezclador (con oscilador local)" },
      { front: "ROE alta suele indicar…", back: "Desadaptación de impedancias en línea/antena" },
      { front: "Instrumento para medir potencia en línea", back: "Vatímetro / sensor de potencia (según enunciado)" },
    ],
    sources: "CEPT programa; bloques de receptor en guías URE y bancos de práctica.",
  },
  "antenas-prop": {
    memoryHooks: [
      "Dipolo media onda: longitud total ~ λ/2 (brazos ~ λ/4 cada uno, orden de magnitud).",
      "ROE 1:1 ideal con carga adaptada; ROE >1 energía reflejada.",
      "Línea coaxial: modo TEM; impedancia característica Zo (50/75 Ω típicos).",
    ],
    expressBullets: [
      "Propagación: HF ionosfera (saltos); VHF/UHF más línea de vista y obstáculos.",
      "Ganancia en dBi vs dBd: diferencia fija 2,15 dB (2,15 dBi = 0 dBd) — suele aparecer como trampa/distractor.",
      "Altura de antena: más altura suele mejorar horizonte radioeléctrico en VHF.",
    ],
    readMore: [
      "Ondas estacionarias: nodos y vientres de tensión/corriente en línea; ROE relacionado con Γ (reflexión) a nivel conceptual.",
      "Yagi: director/reflector/driven — orden de directividad (memorizar roles, no hace falta calcular longitudes en examen salvo enunciado explícito).",
    ],
    flashcards: [
      { front: "Longitud total aproximada de dipolo medio onda", back: "Del orden de media longitud de onda (λ/2)" },
      { front: "¿Qué mide la ROE elevada en la práctica del test?", back: "Desadaptación / reflexión de energía" },
      { front: "Coaxial típico de laboratorio/RF", back: "50 Ω (a veces 75 Ω en TV; lee el enunciado)" },
    ],
    sources: "Anexo I del reglamento (potencias/bandas); programas de antenas HAREC; URE.",
  },
  "marco-normativo": {
    memoryHooks: [
      "Reglamento aficionado España: Orden IET/1311/2013 (BOE-A-2013-7624).",
      "Prueba: dos partes independientes (técnica + reglamento). HAREC ↔ programa CEPT T/R 61-02.",
      "CEPT T/R 61-01: licencia CEPT de operador; 61-02: programa de examen.",
    ],
    expressBullets: [
      "Siempre que potencias o bandas: mirar anexo I del reglamento y redacción vigente en BOE.",
      "Art. 25.h: límites de potencia en estaciones automáticas desatendidas VHF/UHF (dentro/fuera casco urbano) — memoriza la pareja orientativa del texto.",
      "MITECO/sede electrónica: trámites; el BOE es la letra del reglamento.",
    ],
    readMore: [
      "Leyes marco (Ley General de Telecomunicaciones, antenas en fachadas): suelen aparecer en preguntas de convivencia e instalaciones; enlaza con Normativa de la app.",
      "CNAF y Reglamento de Radiocomunicaciones: contexto de examen avanzado; no sustituyen el anexo I para cifras técnicas.",
    ],
    flashcards: [
      { front: "Orden que aprueba el reglamento de radioaficionado en España (nombre típico)", back: "Orden IET/1311/2013" },
      { front: "Programa de examen HAREC (CEPT)", back: "Recomendación CEPT T/R 61-02" },
      { front: "Licencia CEPT de operador (documento)", back: "CEPT T/R 61-01" },
      { front: "¿Cuántas partes suele tener la prueba?", back: "Dos (independientes)" },
    ],
    sources: "BOE (texto y PDF consolidado); CEPT ecc/ham-radio; resúmenes en vista Normativa de esta web.",
  },
  "licencias-indicativos": {
    memoryHooks: [
      "Indicativos en España: prefijo E (EA, EB, EC…).",
      "Identificación periódica y al final de comunicación (requisito operativo habitual).",
      "Prefijos de país en itinerancia: reglas CEPT + reglamento nacional.",
    ],
    expressBullets: [
      "Formato de indicativo: no confundas prefijo de país con sufijos de modos especiales del enunciado.",
      "Estación móvil/portátil: mismo titular, reglas de potencia y bandas según clase y anexo I.",
      "Reciprocidad y visitantes: figuran en el reglamento; en test suele ser lectura atenta de opciones legales.",
    ],
    readMore: [
      "Clases de emisión y abreviaturas (CW, telefonía, datos): el programa pide reconocerlas, no inventar nuevas.",
      "Indicativos especiales: concursos, eventos — el enunciado suele llevar la pista exacta.",
    ],
    flashcards: [
      { front: "Prefijo ITU de España en indicativos de aficionado", back: "Letra E (EA, EB, EC…)" },
      { front: "¿Qué certifica HAREC en la lógica del examen?", back: "Competencias alineadas con programa CEPT / prueba" },
      { front: "Buena práctica al acabar una QSO en telefonía", back: "Identificarse al inicio y al final (y según intervalos reglamentarios)" },
    ],
    sources: "Reglamento IET/1311/2013 (titulares, estaciones); CEPT T/R 61-01.",
  },
  "operacion-seguridad": {
    memoryHooks: [
      "QRM = interferencia de estaciones; QRN = ruido natural (aprox.).",
      "QSY = cambiar de frecuencia. QRT = dejar de emitir.",
      "Alfabeto fonético ICAO: M = Mike, S = Sierra, etc.",
    ],
    expressBullets: [
      "Señales de socorro: no uses formatos de emergencia si no es real; en examen se premia el criterio normativo.",
      "Banda ciudadana y servicio de aficionado no son lo mismo: ojo con distractores.",
      "Filtrado y armónicos: reduce interferencias a otros servicios — conecta con buenas prácticas y potencia legal.",
    ],
    readMore: [
      "Código Q completo no hace falta memorizarlo entero: domina las 10–15 más frecuentes en bancos de práctica.",
      "Emergencias: prioridad de comunicaciones; identificación clara y concisa.",
    ],
    flashcards: [
      { front: "Código Q de interferencia de otras señales", back: "QRM" },
      { front: "Código Q de ruido atmosférico (uso clásico)", back: "QRN" },
      { front: "Letra M en fonético ICAO", back: "Mike" },
      { front: "QSY", back: "Cambiar de frecuencia o desplazarse en la banda" },
    ],
    sources: "Reglamento de operación; práctica URE; códigos Q en manuales de operador.",
  },
  instalaciones: {
    memoryHooks: [
      "Antenas en comunidades: propiedad horizontal + normativa de antenas (Ley 19/1983 citada en el reglamento).",
      "Instalador autorizado y seguros pueden aparecer según enunciado y vigencia.",
    ],
    expressBullets: [
      "No existe “libertad total” ni “prohibido siempre” en opciones extremas: la norma suele exigir procedimientos y acuerdos.",
      "Instalaciones fijas vs móviles: responsabilidad del titular y licencia de estación asociada al marco del reglamento.",
      "Seguridad eléctrica y puesta a tierra: buenas prácticas técnicas + cumplimiento reglamentario cuando el test lo cite.",
    ],
    readMore: [
      "Revisar el artículo del reglamento que remite a la Ley de antenas en fachadas para preguntas de vecinos y desmontajes.",
      "Potencias en repetidores y estaciones desatendidas: cruzar con art. 25.h y anexo I.",
    ],
    flashcards: [
      { front: "Tema típico de antenas en edificios compartidos", back: "Normativa de propiedad horizontal + normativa de antenas" },
      { front: "En test, opción más prudente sobre instalaciones", back: "La que refleja límites y procedimientos según norma vigente (no extremos)" },
    ],
    sources: "BOE reglamento IET/1311/2013; Ley 19/1983 (antenas); vista Normativa.",
  },
};
