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
    fedieaSyllabus: [
      "FEDI-EA P1 sitúa aquí fuentes de electricidad: fuerza electromotriz, diferencia de potencial, resistencia interna, corriente de cortocircuito, tensión en bornes y conexión de fuentes en serie/paralelo.",
      "También entran campo eléctrico, campo magnético y campo electromagnético: intensidad de campo en V/m, campos cerca de conductores con corriente y la idea de onda de radio como onda electromagnética.",
      "Señales sinusoidales: valor instantáneo, máximo, eficaz y medio; periodo, frecuencia en hertzios y diferencia de fase. Es base para entender osciloscopio, potencia y modulaciones.",
      "Potencia y energía: P en señales sinusoidales, rendimiento, máxima transferencia de potencia, relaciones en decibelios y potencia de pico de la envolvente (PEP).",
      "Medidas: tensiones y corrientes continuas/alternas, resistencia interna del instrumento, forma de onda, errores de medida, osciloscopio, vatímetro, contador de frecuencia y analizador de espectro.",
    ],
    bookGuide: [
      "En el libro/manual, no leas solo fórmulas: localiza los cuadros de unidades y haz un mapa V-I-R-P con despejes. Las preguntas suelen cambiar números, no el principio.",
      "Marca ejemplos de valor eficaz frente a valor pico y periodo frente a frecuencia; son trampas visuales cuando aparece una gráfica de osciloscopio.",
      "Relee fuentes reales: tensión nominal sin carga, caída por resistencia interna y diferencia entre conectar fuentes en serie o en paralelo.",
      "Para decibelios, prioriza reglas mentales: +3 dB ≈ doble potencia, +10 dB = diez veces, pérdidas o atenuadores en serie se suman en dB.",
    ],
    quickSession: [
      "2 min: escribe de memoria V = I·R, P = V·I, P = I²R, P = V²/R y una unidad de cada magnitud.",
      "4 min: resuelve mentalmente tres casos: motor 220 V·10 A, resistencia de 100 Ω con 0,1 A y divisor simple de dos resistencias.",
      "3 min: repasa CA: periodo, frecuencia, valor eficaz y valor pico. Di en voz alta qué mediría un polímetro y qué verías en un osciloscopio.",
      "3 min: cierra con 5 tarjetas del banco filtradas por Electricidad básica y revisa solo las explicaciones falladas.",
    ],
    examChecklist: [
      "No confundas voltio, amperio, ohmio, vatio, faradio y henrio.",
      "En CC estable: condensador ideal abierto; bobina ideal casi cortocircuito.",
      "Si una fórmula de potencia multiplica por R cuando debería dividir, suele ser el distractor.",
      "dB y dBm no son lo mismo: dBm referencia potencia absoluta a 1 mW.",
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
    fedieaSyllabus: [
      "FEDI-EA P1 incluye ondas de radio como ondas electromagnéticas: velocidad de propagación, relación frecuencia-longitud de onda y polarización.",
      "Señales no sinusoidales: audio, onda cuadrada, componente continua, fundamental, armónicos, ruido térmico, ruido de banda, densidad de potencia y potencia de ruido en el ancho de banda del receptor.",
      "Modulación CW, AM, SSB, FM y fase: portadora, bandas laterales, porcentaje de modulación, sobremodulación, desviación, índice de modulación y anchura de banda.",
      "Modulación digital: FSK, 2PSK, 4PSK, QAM, velocidad binaria, velocidad de símbolo, anchura de banda, CRC y FEC.",
      "Procesado digital de señal: muestreo, cuantificación, frecuencia de Nyquist, filtros antisolapamiento y conversión A/D y D/A.",
    ],
    bookGuide: [
      "Busca en el manual las figuras de formas de onda: CW, AM, SSB y FM. Aprende a reconocerlas visualmente antes de memorizar definiciones.",
      "Haz una tabla con qué cambia en cada modulación: amplitud, frecuencia, fase o presencia de bandas laterales.",
      "En la parte digital, quédate con la lógica de examen: muestrear suficiente (Nyquist), cuantificar y evitar aliasing con filtrado.",
      "Repasa ruido como concepto de relación señal/ruido: no necesitas cálculo avanzado, pero sí saber por qué el ancho de banda influye en ruido recibido.",
    ],
    quickSession: [
      "3 min: calcula longitudes de onda aproximadas para 3,5 MHz, 14 MHz, 144 MHz y 430 MHz usando λ = 300/f(MHz).",
      "4 min: compara AM, SSB y FM: qué varía, qué bandas laterales aparecen y qué pasa con el ancho de banda.",
      "3 min: repasa señales no sinusoidales: fundamental, armónicos y por qué una onda cuadrada no es una sola frecuencia.",
      "3 min: haz 5 preguntas del banco de magnetismo/ondas y abre el detalle solo en las que confundas modulación con propagación.",
    ],
    examChecklist: [
      "λ y f son inversas; si sube frecuencia baja longitud de onda.",
      "FM: índice de modulación = desviación máxima / frecuencia moduladora.",
      "SSB elimina una banda lateral y normalmente la portadora, por eso ahorra ancho de banda/potencia.",
      "Nyquist: frecuencia de muestreo al menos el doble de la frecuencia máxima de la señal.",
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
    fedieaSyllabus: [
      "FEDI-EA P1 agrupa resistencias: ohmio, tipos, código de colores, característica tensión/corriente, disipación y coeficientes PTC/NTC.",
      "Condensadores: capacidad en faradios, dieléctrico, reactancia capacitiva, fase entre tensión y corriente, tipos fijos/variables, fuga y coeficiente de temperatura.",
      "Bobinas: autoinducción en henrios, efecto de espiras, diámetro, longitud y núcleo; reactancia, desfase, factor Q, efecto pelicular y pérdidas.",
      "Transformadores: transformador ideal, relaciones de espiras, tensiones, corrientes e impedancias entre primario y secundario.",
      "Semiconductores y otros: diodos rectificadores, Zener, LED, varicap; transistores bipolares y FET; válvulas, integrados y circuitos digitales básicos.",
      "Circuitos: combinaciones serie/paralelo de R, L, C, transformadores y diodos; comportamiento real a altas frecuencias.",
    ],
    bookGuide: [
      "En el libro, dedica una pasada a símbolos: resistencia, condensador polarizado/no polarizado, bobina, transformador, diodo, Zener, LED, transistor NPN/PNP y FET.",
      "Practica código de colores con 5 ejemplos; el examen suele pedir lectura directa, tolerancia y orden de bandas.",
      "Lee reactancia como oposición dependiente de frecuencia: C deja pasar mejor altas; L se opone más a altas. Eso explica filtros.",
      "Revisa transformadores con proporcionalidad, no con memoria aislada: más espiras implica más tensión y menos corriente si la potencia ideal se conserva.",
    ],
    quickSession: [
      "3 min: dibuja una tabla R/L/C con unidad, qué almacena y qué pasa al subir frecuencia.",
      "4 min: identifica símbolos y función: rectificador, Zener, LED, varicap, transistor y transformador.",
      "3 min: repasa serie/paralelo de resistencias y el caso de condensador en CC estable.",
      "4 min: haz tarjetas didácticas del bloque y después 5 preguntas filtradas en Componentes.",
    ],
    examChecklist: [
      "Faradio = capacidad; henrio = inductancia; ohmio = resistencia.",
      "Diodo ideal conduce en directa y bloquea en inversa.",
      "Zener se usa como referencia/regulación en inversa controlada.",
      "Factor Q aparece en bobinas/circuitos resonantes y selectividad.",
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
    fedieaSyllabus: [
      "FEDI-EA P1 recoge filtros: circuitos sintonizados serie/paralelo, resonancia, factor Q, ancho de banda, paso bajo/alto/banda, rechazo, filtros en pi/T, cuarzo y digitales.",
      "Fuentes de alimentación: rectificadores de media onda, onda completa y puente; filtrado; estabilización de bajo voltaje; fuentes conmutadas, aislamiento y compatibilidad electromagnética.",
      "Amplificadores: baja frecuencia y RF, ganancia, respuesta amplitud/frecuencia, ancho de banda, clases A, AB, B y C, armónicos, intermodulación y sobrecarga.",
      "Detectores y demoduladores: detector AM con diodo/envolvente, detector de producto y oscilador de batido para CW/SSB, FM con pendiente o discriminador.",
      "Osciladores y sintetizadores: realimentación, estabilidad, LC, cristal, sobretonos, VCO, ruido de fase, PLL y DDS.",
      "Receptores y transmisores: superheterodino simple/doble, conversión directa, bloques de CW/AM/SSB/FM, FI, CAG, medidor S, silenciador, excitador, PA, filtro de salida y repetidores VHF/UHF.",
    ],
    bookGuide: [
      "En el manual, mira los diagramas de bloques como una cadena de transformación: RF recibida → mezcla → FI → detección → audio; transmisión hace el camino inverso con filtrado.",
      "Aprende qué bloque cambia frecuencia: mezclador + oscilador local. Qué bloque selecciona: filtro. Qué bloque aumenta nivel: amplificador.",
      "Relee fuentes y filtros junto con interferencias: muchos fallos de examen mezclan armónicos, espurias, filtro de salida y sobrecarga.",
      "En modulación FM, no memorices solo 'desviación': relaciona desviación, frecuencia moduladora e índice de modulación.",
    ],
    quickSession: [
      "3 min: dibuja un receptor superheterodino mínimo con antena, mezclador, OL, FI, detector y audio.",
      "3 min: dibuja un transmisor mínimo con oscilador/modulador, excitador, PA y filtro de salida.",
      "4 min: repasa detector AM, detector de producto y discriminador FM; di qué señal entra y qué sale.",
      "4 min: practica 6 preguntas de Receptores/transmisores y revisa imágenes de diagrama si aparecen.",
    ],
    examChecklist: [
      "Mezclador genera suma y diferencia de frecuencias.",
      "FI = frecuencia intermedia; permite filtrado y ganancia estables.",
      "CAG/AGC controla ganancia para señales fuertes o débiles.",
      "Filtro de salida reduce armónicos/espurias antes de la antena.",
      "Clase A baja distorsión; clase C más eficiente pero no lineal para señal de amplitud.",
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
    fedieaSyllabus: [
      "FEDI-EA P1 incluye tipos de antena: dipolo de media onda al centro o extremo, dipolo plegado, vertical de cuarto de onda/plano de tierra, Yagi, aperturas/parabólicas/bocinas y dipolo con trampas.",
      "Características: distribución de tensión y corriente, impedancia en alimentación, reactancia de antenas no resonantes, polarización, ganancia, directividad, eficiencia, área de captura, potencia efectiva radiada y relación delante-atrás.",
      "Diagramas de radiación y polarización vertical/horizontal: se usan para interpretar máxima radiación, lóbulos y comparación delante/atrás.",
      "Líneas de transmisión: paralela, coaxial y guíaondas; impedancia característica, factor de velocidad, ROE, pérdidas, balun, cuarto de onda como transformador y acopladores.",
      "Propagación: onda de tierra, espacio, visión directa, ionosfera, frecuencia crítica, MUF, frecuencia óptima, distancia de salto, saltos múltiples, desvanecimiento, troposfera, conducto, esporádica, auroras, meteoros, EME y ruido atmosférico/galáctico.",
    ],
    bookGuide: [
      "En el libro, mira dibujos de corriente/tensión en dipolos y verticales: ayudan a no confundir máximo de corriente con máximo de tensión.",
      "Haz una lista de antenas con su idea central: dipolo resonante, vertical con plano de tierra, Yagi directiva, parabólica/apertura en frecuencias altas.",
      "Lee líneas como sistema con impedancia propia: la ROE no es 'potencia mala' por sí sola, sino síntoma de desadaptación y reflexiones.",
      "Para propagación, crea un mapa por frecuencia: HF ionosfera; VHF/UHF visión directa, repetidores, satélite y fenómenos troposféricos.",
    ],
    quickSession: [
      "3 min: calcula la longitud aproximada de media onda para 7, 14 y 28 MHz con λ = 300/f(MHz).",
      "4 min: repasa cinco conceptos: ROE, impedancia característica, balun, factor de velocidad y línea de cuarto de onda.",
      "4 min: resume HF/VHF/UHF: mecanismo dominante, obstáculos, horizonte y papel de la ionosfera.",
      "3 min: practica preguntas del bloque Antenas/propagación y revisa cualquier diagrama antes de responder.",
    ],
    examChecklist: [
      "Dipolo media onda: longitud total ≈ λ/2; cada brazo ≈ λ/4.",
      "Vertical cuarto de onda: máximo de radiación hacia el horizonte.",
      "Yagi: antena directiva; relación delante/atrás compara lóbulo frontal y posterior.",
      "ROE alta = desadaptación/reflexión; se corrige con adaptación, acoplador o antena ajustada.",
      "MUF y frecuencia crítica son conceptos de ionosfera, no de línea coaxial.",
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
    fedieaSyllabus: [
      "FEDI-EA P2 sitúa aquí la reglamentación nacional e internacional: Reglamento de uso del dominio público radioeléctrico por aficionados, instrucciones de aplicación, Ley 19/1983 y RD 2623/1986 sobre antenas.",
      "Incluye reglamentación CEPT: T/R 61-01 para uso temporal de estaciones en países CEPT y adheridos, y T/R 61-02 para HAREC y programa de examen.",
      "UIT: definiciones de Servicio de Aficionados y Aficionados por Satélite, estación de aficionado, condiciones de uso, regiones y zonas UIT.",
      "Inspección y régimen sancionador: órganos competentes, infracciones, sanciones, prescripción y actuación ante interferencias.",
      "Planes de bandas IARU: objetivos y uso recomendado de cada segmento, especialmente para ordenar modos y anchos de banda.",
    ],
    bookGuide: [
      "En el libro/manual separa tres niveles: ley general, reglamento español y recomendaciones CEPT/UIT. Muchas preguntas mezclan nombres parecidos.",
      "Haz una ficha con qué documento sirve para qué: BOE/reglamento español, CEPT T/R 61-01, CEPT T/R 61-02, IARU, UIT y CNAF.",
      "Cuando haya cifras de potencias, bandas o estaciones desatendidas, contrasta con anexo y artículo vigente; no memorices desde una pregunta aislada.",
      "Relee el apartado de inspección con lógica práctica: qué hacer ante interferencias, quién inspecciona y qué consecuencias tiene incumplir.",
    ],
    quickSession: [
      "3 min: escribe de memoria la pareja CEPT: T/R 61-01 licencia temporal, T/R 61-02 HAREC/programa.",
      "4 min: clasifica 10 conceptos en nacional, CEPT, UIT o IARU.",
      "4 min: repasa sanciones/interferencias con dos preguntas del banco y la explicación normativa.",
      "3 min: abre Normativa de la app y localiza BOE, CEPT y fuentes FEDI-EA para no estudiar de memoria ciega.",
    ],
    examChecklist: [
      "No confundas HAREC con licencia CEPT temporal.",
      "IARU propone planes de banda; la administración y el reglamento fijan condiciones legales.",
      "UIT define marco internacional y regiones; España está en Región 1.",
      "Ante interferencia a servicio autorizado, el titular debe adoptar medidas técnicas razonables y comunicar cuando proceda.",
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
    fedieaSyllabus: [
      "FEDI-EA P2 incluye distintivos de llamada: identificación de estaciones, uso del indicativo, composición, prefijos nacionales y reglas de llamada.",
      "Dentro de reglamentación nacional se conectan autorización, diploma/certificado, estación fija, portable, móvil, remota y uso por terceros autorizados.",
      "CEPT y HAREC aparecen como vías de reconocimiento y operación temporal para titulares de otros países o españoles en el extranjero.",
      "El alfabeto fonético internacional también afecta a indicativos: deletrear correctamente EA, EB, EC, sufijos y cifras evita errores de operación.",
    ],
    bookGuide: [
      "Haz una tabla del indicativo: prefijo, cifra/distrito y sufijo. Añade ejemplos normales y especiales.",
      "Relee la diferencia entre diploma de operador, autorización/licencia y estación. En test, no siempre preguntan por lo mismo.",
      "Marca casos de CEPT: operador español fuera, extranjero residente y visitante temporal; suelen caer como alternativas largas.",
      "Practica deletreo ICAO con indicativos completos, no solo letras sueltas: EA3RCQ, EB1ABC, EF2GGG.",
    ],
    quickSession: [
      "3 min: descompón 5 indicativos en prefijo, distrito/cifra y sufijo.",
      "4 min: repasa licencia CEPT, HAREC y autorización española con una frase para cada una.",
      "4 min: deletrea en voz alta 6 indicativos usando ICAO.",
      "3 min: haz preguntas filtradas por Autorización/indicativos y apunta los distractores normativos repetidos.",
    ],
    examChecklist: [
      "Prefijo no es lo mismo que sufijo; la cifra suele indicar distrito o uso especial según caso.",
      "HAREC acredita aptitud; no es exactamente la licencia CEPT temporal.",
      "La operación en otro país se ajusta a condiciones del país visitado.",
      "El distintivo debe identificar la estación al inicio/final y según reglas aplicables.",
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
    fedieaSyllabus: [
      "FEDI-EA P2 abre con alfabeto fonético internacional: deletreo de letras y cifras en comunicaciones.",
      "Código Q: grupos más utilizados en el servicio de aficionados, especialmente QRM, QRN, QRO, QRP, QSL, QSY, QTH y QRT.",
      "Abreviaturas usuales: procedimiento en telegrafía y comunicaciones, incluidas señales como PSE o AR según contexto.",
      "Señales internacionales de socorro, urgencia y seguridad; tráfico de emergencia y empleo de bandas de aficionado en catástrofes naturales.",
      "Responsabilidad social del radioaficionado y procedimientos operativos: buenas prácticas, claridad, prioridad, no interferir y respeto a planes de banda.",
    ],
    bookGuide: [
      "En el libro, crea una lista corta priorizada de códigos Q y abreviaturas que aparecen en exámenes; no intentes memorizar un diccionario completo de golpe.",
      "Lee emergencias como jerarquía: socorro, urgencia, seguridad; después relaciona con comunicaciones en desastres y prioridad del tráfico.",
      "Practica fonético internacional con palabras y distintivos: el error suele estar en una letra parecida, no en el concepto.",
      "Conecta operación con ética: no interferir deliberadamente, usar potencia necesaria, ceder frecuencia si procede y mantener identificación.",
    ],
    quickSession: [
      "3 min: repasa fonético ICAO de A-Z, pero detente en letras problemáticas: C, G, I, Q, R, Y, Z.",
      "4 min: escribe 12 códigos Q con significado breve: QRM, QRN, QRO, QRP, QSL, QSY, QTH, QRT, QRZ, QSO, QRS, QSB.",
      "4 min: clasifica señales de socorro/urgencia/seguridad y di qué harías como operador si escuchas tráfico prioritario.",
      "3 min: practica 5 preguntas de Operación y seguridad y revisa explicaciones antes de seguir.",
    ],
    examChecklist: [
      "QRO = aumentar potencia; QRP = reducir potencia/baja potencia.",
      "QRM = interferencia de otras estaciones; QRN = ruido natural.",
      "PSE = por favor; AR = fin de transmisión/mensaje en telegrafía.",
      "Nunca interferir deliberadamente; en emergencia prima claridad, identificación y prioridad.",
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
    fedieaSyllabus: [
      "FEDI-EA P2 enlaza instalaciones con Ley 19/1983 sobre derecho a instalar antenas de estaciones de aficionado en el exterior de inmuebles.",
      "También incluye el Real Decreto 2623/1986 sobre instalaciones de antenas de estaciones radioeléctricas de aficionado y las instrucciones de aplicación.",
      "En la parte técnica FEDI-EA P1, seguridad pide instalación eléctrica, protecciones generales y de equipos, protección contra contactos, puesta a tierra, líneas de alimentación, descargas atmosféricas y toma de tierra.",
      "Interferencia e inmunidad conectan con instalaciones: bloqueo, intermodulación, detección en audio, vías de entrada por antena/líneas/radiación directa y medidas de filtrado, desacoplo y apantallamiento.",
    ],
    bookGuide: [
      "En el manual, une instalación y seguridad: no es solo permiso de vecinos, también protección eléctrica, tierra, descargas y trazado de líneas.",
      "Lee antenas en propiedad horizontal como procedimiento: comunicación, documentación, comunidad/propiedad y supuestos de desmontaje por obras.",
      "Repasa interferencias desde la instalación: armónicos, espurias, campo intenso, entrada por cables y solución con filtros o apantallamiento.",
      "Distingue estación fija, portable, móvil, repetidor y desatendida; las obligaciones cambian según el tipo.",
    ],
    quickSession: [
      "3 min: lista riesgos de instalación: contacto eléctrico, caída de antena, descarga atmosférica, interferencia y mala tierra.",
      "4 min: repasa Ley 19/1983 y RD 2623/1986 como pareja de antenas en inmuebles.",
      "4 min: une causa y solución de interferencia: armónicos/filtro, RF por cable/desacoplo, radiación/apantallamiento.",
      "3 min: practica preguntas de Instalaciones y revisa si el distractor usa extremos tipo 'siempre' o 'nunca'.",
    ],
    examChecklist: [
      "La instalación exterior no es libertad absoluta ni prohibición total: hay procedimiento legal.",
      "Toma de tierra y protecciones son seguridad, no accesorio opcional.",
      "Filtrado, desacoplo y apantallamiento son medidas contra interferencias.",
      "Si se cancela licencia o hay obras, revisa condiciones de desmontaje o permanencia solo recepción según enunciado.",
    ],
    flashcards: [
      { front: "Tema típico de antenas en edificios compartidos", back: "Normativa de propiedad horizontal + normativa de antenas" },
      { front: "En test, opción más prudente sobre instalaciones", back: "La que refleja límites y procedimientos según norma vigente (no extremos)" },
    ],
    sources: "BOE reglamento IET/1311/2013; Ley 19/1983 (antenas); vista Normativa.",
  },
};
