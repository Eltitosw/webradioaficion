/**
 * Banco de ESTUDIO: repaso, memorización y explicaciones (Practicar, Tarjetas, Cuaderno).
 * Incluye el banco examen + preguntas extra sin duplicar enunciado+opciones.
 * Generado: 2026-05-28 · 587 preguntas · node scripts/build-banco-estudio.mjs
 * Examen estricto: 563 preguntas en questions-banco.js (simulacro tipo test).
 * Añadidas solo estudio (antes dedupe): 150
 * Parafraseos eliminados: 126 (713 → 587)
 */

export const BANCO_ESTUDIO_GENERATED_AT = "2026-05-28";
export const BANCO_ESTUDIO_STATS = {"count":587,"examSubset":563,"studyOnlyAdded":24,"paraphraseRemoved":126,"withFigure":30,"withPedagogicalExplain":580};

export default [
  {
    "id": "fedi-ag-001",
    "part": 1,
    "topicId": "componentes",
    "stem": "En la teoría de electricidad, un ohmio equivale a:",
    "options": [
      "1 amperio x 1 voltio",
      "1 amperio x 1 segundo",
      "1 voltio / 1 amperio",
      "1 amperio / 1 voltio"
    ],
    "correctIndex": 2,
    "explain": "Un ohmio (Ω) es la resistencia entre dos puntos cuando 1 V produce 1 A (ley de Ohm). «1 voltio / 1 amperio»."
  },
  {
    "id": "fedi-ag-002",
    "part": 1,
    "topicId": "componentes",
    "stem": "Colocamos 3 condensadores en paralelo; si el valor individual de 2 de ellos es 100 pF y el valor total es 400 pF, ¿cuál será el valor del otro condensador?",
    "options": [
      "200 pF",
      "300 pF",
      "400 pF",
      "100 pF"
    ],
    "correctIndex": 0,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «200 pF»."
  },
  {
    "id": "fedi-ag-003",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El llamado \"detector de envolvente\" se implementa en receptores para señales con modulación de:",
    "options": [
      "Fase (PM)",
      "Amplitud (AM)",
      "Frecuencia (FM)",
      "Banda lateral única"
    ],
    "correctIndex": 1,
    "explain": "AM significa modulación de amplitud: la información viaja en los cambios de amplitud de la portadora. Un detector de envolvente con diodo y filtro RC sigue esa envolvente para recuperar el audio. No sirve como detector principal de FM (modulación de frecuencia), PM (modulación de fase) o SSB (banda lateral única)."
  },
  {
    "id": "fedi-ag-004",
    "part": 1,
    "topicId": "componentes",
    "stem": "En un transformador ideal, si V es la tensión y N el número de espiras, se cumple:",
    "options": [
      "V1 / V2 = N1 / N2",
      "V1 · N1 = V2 · N2",
      "La tensión es inversamente proporcional al cuadrado de N",
      "Ninguna de las anteriores es correcta"
    ],
    "correctIndex": 0,
    "explain": "En el transformador ideal V1/V2 = N1/N2 (equivalente a V1/N1 = V2/N2). En la web FEDI la tabla original mostraba opciones A–C vacías; aquí se ha normalizado el enunciado. FEDI-EA."
  },
  {
    "id": "fedi-ag-005",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "¿Cómo se denomina al proceso de tomar parte de la señal de salida de un circuito para introducirla de nuevo en su entrada?",
    "options": [
      "Rectificación",
      "Conversión",
      "Demodulación",
      "Realimentación"
    ],
    "correctIndex": 3,
    "explain": "Tomar parte de la salida y reinyectarla a la entrada es realimentación (feedback): puede estabilizar o modificar la ganancia del circuito. No confundir con rectificación ni demodulación. «Realimentación»."
  },
  {
    "id": "fedi-ag-006",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En la realización de medidas usando un polímetro, indique la respuesta correcta:",
    "options": [
      "Para tensión, las puntas en serie con el elemento.",
      "Para corriente, las puntas en paralelo al elemento.",
      "Para resistencia, las puntas en serie con la resistencia.",
      "Ninguna de las respuestas anteriores es correcta"
    ],
    "correctIndex": 3,
    "explain": "La resistencia se mide sin tensión aplicada (fuera de circuito o en banco de prueba). En paralelo la tensión es común; en serie, la intensidad. Las tres primeras afirmaciones del enunciado no son correctas en conjunto. «Ninguna de las respuestas anteriores es correcta»."
  },
  {
    "id": "fedi-ag-007",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El ancho de banda necesario de un transmisor es:",
    "options": [
      "La anchura de banda estrictamente suficiente para transmitir la información en condiciones adecuadas",
      "El conjunto de frecuencias en las que puede trabajar el transmisor",
      "La relación entre la ganancia de antena y la impedancia del transmisor",
      "La dependencia del margen de frecuencias de la antena sin acoplador"
    ],
    "correctIndex": 0,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «La anchura de banda estrictamente suficiente para transmitir la información en condiciones adecuadas»."
  },
  {
    "id": "fedi-ag-008",
    "part": 1,
    "topicId": "componentes",
    "stem": "La capacidad de un condensador se mide en:",
    "options": [
      "Amperios",
      "Faradios",
      "Webers",
      "Decibelios"
    ],
    "correctIndex": 1,
    "explain": "La capacidad indica cuánta carga puede almacenar un condensador; en el SI la unidad es el faradio (F), con submúltiplos µF, nF o pF. «Faradios»."
  },
  {
    "id": "fedi-ag-009",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "¿Cómo se denomina el siguiente circuito eléctrico?",
    "stemFigure": "images/quiz/fedi-ag-009-original.jpg",
    "stemFigureAlt": "Figura original FEDI-EA ag-9: circuito eléctrico de detector de envolvente.",
    "options": [
      "Generador de audiofrecuencia",
      "Detector de envolvente",
      "Conversor de audiofrecuencia",
      "Detector de fase"
    ],
    "correctIndex": 1,
    "explain": "En el esquema, el diodo en serie con la carga y el condensador forman un detector de envolvente: rectifica la RF y la constante de tiempo RC extrae la envolvente AM. No es oscilador ni conversor de frecuencia. «Detector de envolvente»."
  },
  {
    "id": "fedi-ag-010",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "¿Qué es un oscilador?",
    "options": [
      "Dispositivo que convierte la corriente continua en alterna",
      "Circuito que se emplea para estabilizar la señal de RF",
      "Elemento del transmisor que reduce el ancho de banda",
      "Parte del transmisor que reduce los ruidos"
    ],
    "correctIndex": 0,
    "explain": "Osciladores generan portadora; PLL y DDS mejoran estabilidad y resolución de frecuencia. «Dispositivo que convierte la corriente continua en alterna»."
  },
  {
    "id": "fedi-ag-011",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Indique el orden de los elementos de una fuente de alimentación lineal:",
    "stemFigure": "images/quiz/fedi-ag-011-original.jpg",
    "stemFigureAlt": "Figura original FEDI-EA ag-011 (ag-11.jpg): Indique el orden de los elementos de una fuente de alimentación lineal:",
    "options": [
      "Transformador → rectificador → filtro → regulador",
      "Rectificador → transformador → filtro → regulador",
      "Regulador → filtro → transformador → rectificador",
      "Filtro → transformador → regulador → rectificador"
    ],
    "correctIndex": 0,
    "explain": "En una fuente lineal: el transformador adapta y aísla la CA de red, el rectificador convierte a CC pulsante, el filtro suaviza el rizado y el regulador estabiliza la tensión de salida. El orden habitual es transformador → rectificador → filtro → regulador. «Transformador → rectificador → filtro → regulador»."
  },
  {
    "id": "fedi-ag-013",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En el siguiente gráfico, si la antena emite tres señales en distintas frecuencias, ¿cuál de ellas tiene una frecuencia superior a la frecuencia crítica?:",
    "stemFigure": "images/quiz/fedi-ag-013-original.jpg",
    "stemFigureAlt": "Figura original FEDI-EA ag-13: tres señales con distintas trayectorias respecto a la ionosfera.",
    "options": [
      "Las señales 1 y 2.",
      "La señal 1.",
      "La señal 3.",
      "Las señales 1 y 3."
    ],
    "correctIndex": 2,
    "explain": "La frecuencia crítica es el límite a partir del cual la onda ya no vuelve refractada por la ionosfera con esa geometría. En el esquema, la señal 3 atraviesa la capa en lugar de regresar: por eso es la que está por encima de la frecuencia crítica. FEDI-EA."
  },
  {
    "id": "fedi-ag-014",
    "part": 1,
    "topicId": "componentes",
    "stem": "En el siguiente circuito, en régimen permanente, ¿qué tensión eléctrica, en voltios, tiene el condensador C?:",
    "stemFigure": "images/quiz/fedi-ag-014-original.jpg",
    "stemFigureAlt": "Figura original FEDI-EA ag-14: circuito con condensador C y tensiones indicadas.",
    "options": [
      "12.",
      "3.",
      "0.",
      "9."
    ],
    "correctIndex": 3,
    "explain": "En corriente continua y en régimen permanente, el condensador ideal se comporta como circuito abierto: no circula corriente por él, pero queda cargado a la tensión entre sus bornes. Como está en paralelo con la rama inferior del divisor, su tensión es la de esa rama: 9 V. FEDI-EA."
  },
  {
    "id": "fedi-ag-015",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La potencia suministrada a la línea de alimentación de la antena por un transmisor, durante un ciclo en ausencia de modulación, se denomina:",
    "options": [
      "Potencia reflejada",
      "Potencia de pico de la envolvente",
      "Potencia de portadora",
      "Ninguna de las anteriores"
    ],
    "correctIndex": 2,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «Potencia de portadora». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ag-016",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En el siguiente diagrama de bloques, correspondiente a un receptor elemental de conversión directa, el bloque con interrogantes representa un:",
    "stemFigure": "images/quiz/fedi-ag-016-original.jpg",
    "stemFigureAlt": "Figura original FEDI-EA ag-16: diagrama de bloques de receptor elemental de conversión directa con interrogantes.",
    "options": [
      "Amplificador RF.",
      "Filtro paso banda.",
      "Oscilador local.",
      "Variador de potencia."
    ],
    "correctIndex": 2,
    "explain": "Un receptor de conversión directa mezcla la señal de RF recibida con una señal generada localmente para obtener directamente audio o una frecuencia muy baja. El bloque que alimenta al mezclador debe ser, por tanto, el oscilador local. FEDI-EA."
  },
  {
    "id": "fedi-ag-018",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En una instalación eléctrica, el \"factor de potencia\" o coseno φ es:",
    "options": [
      "Indicador del desfasaje entre tensión y corriente",
      "Un factor para duplicar la potencia consumida",
      "Una magnitud que varía entre 1 y 3",
      "Un factor que solo se aplica en corriente continua"
    ],
    "correctIndex": 0,
    "explain": "El factor de potencia (coseno φ) relaciona potencia activa y aparente en CA y refleja el desfase entre tensión y corriente. «Indicador del desfasaje entre tensión y corriente». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ag-019",
    "part": 1,
    "topicId": "componentes",
    "stem": "En general los diodos se caracterizan por ser dispositivos que:",
    "options": [
      "Permiten el paso de la corriente en una única dirección",
      "Permiten el paso en las dos direcciones",
      "No permiten el paso de la corriente",
      "Ninguna de las anteriores"
    ],
    "correctIndex": 0,
    "explain": "Un diodo conduce bien en polarización directa y bloquea en inversa; por eso rectifica y protege etapas. No confundir con un transistor o una resistencia. «Permiten el paso de la corriente en una única dirección»."
  },
  {
    "id": "fedi-ag-020",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La inclinación de los radiales en una antena vertical de cuarto de onda, produce:",
    "stemFigure": "images/quiz/fedi-ag-020-original.jpg",
    "stemFigureAlt": "Figura original FEDI-EA ag-020 (ag-20.jpg): La inclinación de los radiales en una antena vertical de cuarto de onda, produce:",
    "options": [
      "Una variación de la polarización de la señal emitida.",
      "Un incremento de la altura efectiva.",
      "Una variación de la impedancia de entrada.",
      "Una reducción del ruido captado por la antena."
    ],
    "correctIndex": 2,
    "explain": "En una vertical de cuarto de onda los radiales simulan el plano de tierra y modifican la impedancia de entrada según su longitud e inclinación. «Una variación de la impedancia de entrada.»."
  },
  {
    "id": "fedi-ag-021",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La \"desensibilización o bloqueo\" de un receptor puede producirse por:",
    "options": [
      "Fallo en la fuente de alimentación",
      "Insuficiente ancho de banda de salida",
      "Escaso nivel de squelch",
      "Excesivo nivel de señal en la antena"
    ],
    "correctIndex": 3,
    "explain": "RF es radiofrecuencia; la FI (frecuencia intermedia) se amplifica antes de detectar. Un nivel excesivo en antena puede saturar el mezclador o la FI y empeorar la sensibilidad (desensibilización). «Excesivo nivel de señal en la antena»."
  },
  {
    "id": "fedi-ag-022",
    "part": 1,
    "topicId": "componentes",
    "stem": "Indique el valor de la resistencia cuyos colores son, en este orden: violeta, verde, rojo, oro:",
    "options": [
      "7.500 Ω y 5 %",
      "75 Ω y 10 %",
      "570 Ω y 1 %",
      "No se puede calcular"
    ],
    "correctIndex": 0,
    "explain": "Código de colores: violeta = 7, verde = 5, rojo = ×10², oro = tolerancia ±5 %. Valor 75 × 100 = 7500 Ω = 7,5 kΩ. «7.500 Ω y 5 %»."
  },
  {
    "id": "fedi-ag-023",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El excitador:",
    "options": [
      "Suministra la potencia necesaria a la etapa amplificadora de potencia",
      "Suma las frecuencias del oscilador local y del oscilador variable",
      "Excita la etapa osciladora",
      "Alimenta el transmisor"
    ],
    "correctIndex": 0,
    "explain": "El excitador genera y modula la señal de RF de baja potencia que alimenta la etapa de potencia del transmisor. «Suministra la potencia necesaria a la etapa amplificadora de potencia»."
  },
  {
    "id": "fedi-ag-024",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "¿Qué ventajas presenta la antena dipolo en V invertida?:",
    "stemFigure": "images/quiz/fedi-ag-024-original.jpg",
    "stemFigureAlt": "Figura original FEDI-EA ag-024 (ag-24.jpg): ¿Qué ventajas presenta la antena dipolo en V invertida?:",
    "options": [
      "Un valor de impedancia próximo a 75&Omega; y polarización circular.",
      "Un valor de impedancia próximo a 75&Omega; y un diagrama de radiación muy directivo.",
      "Un valor de impedancia constante y elevada ganancia.",
      "Un valor de impedancia próximo a 50&Omega; y un diagrama de radiación prácticamente omnidireccional."
    ],
    "correctIndex": 3,
    "explain": "Radiales a ~45° suelen acercar la impedancia de la vertical a unos 50 Ω y el diagrama en horizontal se aproxima al omnidireccional. «Un valor de impedancia próximo a 50 Ω y un diagrama de radiación prácticamente omnidireccional.»."
  },
  {
    "id": "fedi-ag-025",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Los medios más comunes para proteger de interferencias a un receptor son:",
    "options": [
      "Sobremodular la señal de entrada",
      "Transformadores de tensión",
      "Altavoces de alta impedancia",
      "Tomas de tierra y condensadores"
    ],
    "correctIndex": 3,
    "explain": "La RF puede acoplarse a masas y cables de audio. Tomas de tierra en el chasis y condensadores de desacoplo en alimentación limitan ese acoplamiento. «Tomas de tierra y condensadores»."
  },
  {
    "id": "fedi-ag-027",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "El tamaño físico de una antena debe ser función de la:",
    "options": [
      "Conductividad del terreno",
      "Potencia de emisión",
      "Altura efectiva",
      "Frecuencia"
    ],
    "correctIndex": 3,
    "explain": "La longitud eléctrica de una antena resonante depende de la longitud de onda λ, y λ = c/f: a mayor frecuencia, antena más corta. «Frecuencia»."
  },
  {
    "id": "fedi-ag-028",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "La curvatura que experimenta una onda radioeléctrica al encontrarse un obstáculo en su trayectoria, se denomina:",
    "stemFigure": "images/quiz/fedi-ag-028-original.jpg",
    "stemFigureAlt": "Figura original FEDI-EA ag-028 (ag-28.jpg): La curvatura que experimenta una onda radioeléctrica al encontrarse un obstáculo en su trayectoria, se denomina:",
    "options": [
      "Difracción.",
      "Reflexión.",
      "Dispersión.",
      "Refracción."
    ],
    "correctIndex": 0,
    "explain": "La difracción permite que la onda rodee obstáculos cuando el obstáculo es comparable en tamaño a la longitud de onda. «Difracción.»."
  },
  {
    "id": "fedi-ag-029",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "¿Cómo se puede eliminar una interferencia generada por la fuente de alimentación de un transmisor?",
    "options": [
      "Elevando el nivel de squelch",
      "Colocando un filtro apropiado",
      "Añadiendo etapa de potencia",
      "Suprimiendo la portadora"
    ],
    "correctIndex": 1,
    "explain": "EMI es interferencia electromagnética conducida o radiada. Un filtro de línea en la alimentación atenúa componentes RF que entran o salen por la red. «Colocando un filtro apropiado»."
  },
  {
    "id": "fedi-ag-030",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La capa de la atmósfera responsable de las variaciones de propagación en HF (<30 MHz) según actividad solar se denomina:",
    "options": [
      "Reflexosfera",
      "Estratosfera",
      "Ionosfera",
      "Troposfera"
    ],
    "correctIndex": 2,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «Ionosfera»."
  },
  {
    "id": "fedi-ah-031",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El examen de radioaficionado:",
    "options": [
      "Evalúa la capacidad de la persona para operar estaciones radioeléctricas del Servicio de Aficionados y Servicio de Aficionados por Satélite",
      "Quien lo supera puede iniciar las emisiones en las bandas de radioaficionados",
      "Sólo puede realizarse una vez al año",
      "En Europa sólo se exige en España y Portugal"
    ],
    "correctIndex": 0,
    "explain": "La convocatoria oficial define dos pruebas independientes (técnica y reglamentación), alineadas con el programa de examen. La respuesta es «Evalúa la capacidad de la persona para operar estaciones radioeléctricas del Servicio de Aficionados y Servicio de Aficionados por Satélite». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-032",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los distintivos de llamada con sufijos de una letra:",
    "options": [
      "Se reservan para concursos internacionales de alta competitividad",
      "Se reservan para concursos nacionales de alta competitividad",
      "Se reservan para radioaficionados con antigüedad mínima de 10 años",
      "No están permitidos en la reglamentación vigente"
    ],
    "correctIndex": 0,
    "explain": "Los distintivos especiales (p. ej. /MM, /P) tienen reglas de asignación en el reglamento vigente; el criterio FEDI (2011) puede diferir: contrasta con BOE-A-2013-7624. «Se reservan para concursos internacionales de alta competitividad»."
  },
  {
    "id": "fedi-ah-033",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "El código Q:",
    "options": [
      "Se utiliza exclusivamente en emergencia",
      "Está compuesto por siete letras",
      "Ha caído en desuso",
      "Empieza siempre por la letra Q"
    ],
    "correctIndex": 3,
    "explain": "Los códigos Q son abreviaturas de tres letras que empiezan por Q (QTH ubicación, QRM interferencia, etc.). «Empieza siempre por la letra Q»."
  },
  {
    "id": "fedi-ah-034",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Excepto en casos de urgencia, ¿con qué antelación la propiedad del inmueble debe requerir el desmontaje de antenas de radioaficionado por la realización de obras?",
    "options": [
      "Un mes",
      "Dos meses",
      "Tres meses",
      "Medio año"
    ],
    "correctIndex": 2,
    "explain": "Las antenas en comunidades de propietarios requieren procedimiento, comunicación y a veces acuerdos; no es libertad total ni prohibición absoluta. «Tres meses». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-035",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿Quién puede hacer uso de una estación de aficionado?",
    "options": [
      "Cualquier familiar de primer grado que conviva con él, bajo su responsabilidad",
      "Cualquiera que vaya a obtener el Diploma de Operador",
      "Cualquier titular de autorización de radioaficionado, con permiso de su propietario",
      "Solo su titular"
    ],
    "correctIndex": 2,
    "explain": "No cualquiera puede operar una estación ajena: debe ser titular de autorización de radioaficionado (o invitado con permiso del titular según otro enunciado). «Cualquier titular de autorización de radioaficionado, con permiso de su propietario». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-036",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Con qué anticipación a la fecha prevista para el comienzo de las emisiones se deberá solicitar una autorización especial de uso del espectro radioeléctrico por radioaficionados?",
    "options": [
      "1 mes",
      "2 meses",
      "3 meses",
      "Ninguno"
    ],
    "correctIndex": 0,
    "explain": "Los plazos administrativos del reglamento deben contrastarse con el BOE vigente; el banco fija la opción «1 mes» para este enunciado. (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-037",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Las estaciones radioeléctricas de aficionado quedan sometidas a la inspección de Telecomunicaciones:",
    "options": [
      "Únicamente en el caso de que se produzcan interferencias a otros usuarios",
      "Únicamente en el caso de que el operador de la estación tenga menos de 5 años de antigüedad",
      "Siempre",
      "Únicamente si emite con más de 500 W de potencia"
    ],
    "correctIndex": 2,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «Siempre» es la formulación del banco. (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-038",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "El alfabeto fonético internacional:",
    "options": [
      "Solo en emisiones digitales",
      "Se utiliza para el deletreo de palabras",
      "Solo para deletrear números",
      "Está prohibido"
    ],
    "correctIndex": 1,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Se utiliza para el deletreo de palabras»."
  },
  {
    "id": "fedi-ah-039",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cuál de estas provincias pertenece al distrito 7?",
    "options": [
      "Guipúzcoa",
      "Girona",
      "Guadalajara",
      "Granada"
    ],
    "correctIndex": 0,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Guipúzcoa»."
  },
  {
    "id": "fedi-ah-040",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Salvo circunstancias especiales debidamente motivadas, las estaciones automáticas desatendidas en VHF y UHF fuera del casco urbano no podrán exceder de una potencia de salida máxima de (Reglamento IET/1311/2013, art. 25.h):",
    "options": [
      "10 W",
      "25 W",
      "50 W",
      "100 W"
    ],
    "correctIndex": 2,
    "explain": "Según el art. 25.h y el anexo I del reglamento vigente (BOE-A-2013-7624), en VHF/UHF desatendidas suele ser hasta 10 W en casco urbano y hasta 50 W fuera, salvo motivación especial. En este enunciado la opción correcta del banco es «50 W»."
  },
  {
    "id": "fedi-ah-041",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Si una antena debidamente autorizada, e instalada en la terraza de una Comunidad de propietarios, impide la realización de obras de conservación del edificio, el radioaficionado titular de la misma:",
    "options": [
      "Puede exigir a la Comunidad el pago de los costes de desmontaje",
      "Está obligado a desmontarla temporalmente sin derecho a indemnización",
      "Sólo debe abonar la mitad de los costes",
      "Está obligado a permitir las obras, siempre que la Comunidad de vecinos se comprometa a dejar la instalación en las condiciones iniciales"
    ],
    "correctIndex": 3,
    "explain": "En elementos comunes hace falta acuerdo o procedimiento con la comunidad; no es instalación unilateral sin informar. «Está obligado a permitir las obras, siempre que la Comunidad de vecinos se comprometa a dejar la instalación en las condiciones iniciales». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-042",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "El deletreo del distintivo AN6BL según el alfabeto fonético internacional:",
    "options": [
      "Alfa, Noviembre, Seis, Bravo, Lima",
      "A, Ene, Seis, B, Ele",
      "Alfa, November, Six, Bravo, Lima",
      "El deletreo no está permitido"
    ],
    "correctIndex": 0,
    "explain": "En España se usa el alfabeto fonético en castellano (Alfa, Noviembre…), no la pronunciación inglesa de ICAO. «Alfa, Noviembre, Seis, Bravo, Lima»."
  },
  {
    "id": "fedi-ah-043",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La autorización especial de emisiones se otorgará por el periodo que duren las pruebas y, como máximo:",
    "options": [
      "9 meses",
      "12 meses",
      "15 meses",
      "18 meses"
    ],
    "correctIndex": 1,
    "explain": "El plazo de 12 meses aparece en enunciados FEDI históricos; verifica el artículo concreto en el reglamento vigente (BOE-A-2013-7624). «12 meses»."
  },
  {
    "id": "fedi-ah-044",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Una emisión de estación de aficionado debe identificarse con un distintivo:",
    "options": [
      "Únicamente si el operador es menor de edad",
      "Únicamente si la potencia de pico supera 50 W",
      "Únicamente si la potencia media supera 50 W",
      "Siempre"
    ],
    "correctIndex": 3,
    "explain": "El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «Siempre». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-045",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La autorización de radioaficionado habilita a su titular para:",
    "options": [
      "Durante el primer año solo emitir en VHF",
      "Emitir siempre que domine el código Morse",
      "Durante el primer año solo emitir los fines de semana",
      "Emitir en las bandas y con las características del reglamento"
    ],
    "correctIndex": 3,
    "explain": "La autorización de radioaficionado acredita al titular para emitir en las bandas y condiciones que permite el reglamento vigente (BOE-A-2013-7624), no sustituye la licencia de estación cuando esta sea exigible. «Emitir en las bandas y con las características del reglamento»."
  },
  {
    "id": "fedi-ah-047",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En la licencia CEPT debe constar cierta información. Indique la respuesta incorrecta:",
    "options": [
      "Autoridad que expide la licencia",
      "Distintivo de llamada",
      "Asociación de radioaficionados a la que pertenece",
      "Periodo de validez"
    ],
    "correctIndex": 2,
    "explain": "El certificado CEPT no exige indicar la asociación del titular en el formato habitual del diploma. «Asociación de radioaficionados a la que pertenece»."
  },
  {
    "id": "fedi-ah-049",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Un radioaficionado español que traslade su residencia a un país con T/R 61-02 podrá obtener licencia allí si:",
    "options": [
      "Acredita 10 años de experiencia internacional",
      "Supera un examen en el idioma del país",
      "Dispone del certificado HAREC",
      "Obtiene la nacionalidad del país"
    ],
    "correctIndex": 2,
    "explain": "En países que aplican T/R 61-02 (HAREC), el certificado facilita el reconocimiento de tu formación; cada administración mantiene su trámite de autorización local. «Dispone del certificado HAREC». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-051",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Qué sufijo puede asignarse a una autorización de radioaficionado?",
    "options": [
      "DDD",
      "FFF",
      "TTT",
      "XXX"
    ],
    "correctIndex": 2,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «TTT». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-052",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El contrato de seguro que cubre la responsabilidad del titular de una licencia de estación:",
    "options": [
      "Solo si la instalación fue autorizada, en un mes",
      "Solo si la instalación es compleja",
      "Debe estar formalizado antes de la expedición de la licencia de estación",
      "Al solicitar la autorización de radioaficionado"
    ],
    "correctIndex": 2,
    "explain": "HAREC y las recomendaciones CEPT facilitan reconocimiento entre administraciones; cada país mantiene su procedimiento nacional. Encaja «Debe estar formalizado antes de la expedición de la licencia de estación». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-053",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Las transmisiones entre estaciones de radioaficionados deberán limitarse a:",
    "options": [
      "Actualidad nacional e internacional",
      "Boletines de su radio club",
      "Comunicaciones relacionadas con el servicio de aficionados",
      "Cualquier comunicación"
    ],
    "correctIndex": 2,
    "explain": "El servicio de aficionados solo admite comunicaciones relacionadas con ensayos técnicos, formación y actividad propia del servicio, no tráfico ajeno. Por eso encaja «Comunicaciones relacionadas con el servicio de aficionados». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-055",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Según la nomenclatura de bandas, el símbolo MF corresponde a:",
    "options": [
      "Ondas miriamétricas",
      "Ondas kilométricas",
      "Ondas hectométricas",
      "Ondas decamétricas"
    ],
    "correctIndex": 2,
    "explain": "En la nomenclatura ITU, MF (Medium Frequency) designa el tramo aproximado de 300–3000 kHz. Para este enunciado la respuesta correcta es «Ondas hectométricas»."
  },
  {
    "id": "fedi-ah-056",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La colaboración de los radioaficionados con servicios de emergencia en catástrofes:",
    "options": [
      "Es obligatoria en cualquier caso",
      "Es obligatoria si la autoridad competente lo requiere",
      "Es voluntaria",
      "Está prohibida"
    ],
    "correctIndex": 2,
    "explain": "La ayuda en catástrofes es voluntaria; el radioaficionado no está obligado por el reglamento (BOE-A-2013-7624) a prestar servicios de emergencia. «Es voluntaria»."
  },
  {
    "id": "fedi-ah-057",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿Con qué potencia máxima de portadora se puede emitir en la banda de frecuencias 50,0–51,0 MHz, de acuerdo con el Reglamento de Radioaficionados?",
    "options": [
      "50 W",
      "100 W",
      "150 W",
      "200 W"
    ],
    "correctIndex": 0,
    "explain": "Potencias máximas por banda en el anexo I del reglamento (BOE-A-2013-7624). El test FEDI (2011) puede usar redacción antigua: contrasta banda y supuesto con el anexo vigente. «50 W»."
  },
  {
    "id": "fedi-ah-059",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Según el artículo 25 del Reglamento de Radiocomunicaciones de la UIT, las comunicaciones entre aficionados de países distintos:",
    "options": [
      "Solo observaciones personales",
      "Solo entre estaciones de la misma Región",
      "Siempre pueden codificarse para ocultar contenido",
      "Se permiten salvo que una Administración notifique oposición"
    ],
    "correctIndex": 3,
    "explain": "El art. 25 UIT regula comunicaciones entre aficionados, identificación y condiciones del servicio; las administraciones pueden notificar restricciones. «Se permiten salvo que una Administración notifique oposición». (BOE-A-2013-7624)."
  },
  {
    "id": "fedi-ah-060",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Si una autorización especial de emisiones produce interferencias a radiodifusión o TV, deberá:",
    "options": [
      "Informar al interferido del horario de emisión",
      "Suspender de inmediato las emisiones",
      "Comunicar a Telecomunicaciones y seguir emitiendo",
      "Seguir emitiendo"
    ],
    "correctIndex": 1,
    "explain": "Si causas interferencias perjudiciales debes cesar la emisión de inmediato hasta resolver la causa (buena práctica y deber reglamentario). «Suspender de inmediato las emisiones»."
  },
  {
    "id": "ofic-001",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En corriente continua, si la tensión es V y la intensidad I, la potencia disipada P es:",
    "options": [
      "P = V / I",
      "P = V · I",
      "P = I / V",
      "P = V + I"
    ],
    "correctIndex": 1,
    "explain": "En corriente continua la potencia disipada o entregada es P = V·I (vatios). Es la relación básica del bloque de electricidad. «P = V · I».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / electricidad básica; contrastar con manuales URE."
  },
  {
    "id": "ofic-002",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Dos resistencias en serie R1 y R2 se comportan como una resistencia equivalente:",
    "options": [
      "R1 · R2 / (R1 + R2)",
      "R1 + R2",
      "|R1 − R2|",
      "1 / (1/R1 + 1/R2)"
    ],
    "correctIndex": 1,
    "explain": "En serie las resistencias se suman: Req = R1 + R2 + … La tensión se reparte según cada R. «R1 + R2».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / electricidad básica; contrastar con manuales URE."
  },
  {
    "id": "ofic-003",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En modulación de frecuencia (FM), la magnitud de la portadora que varía con la señal moduladora es principalmente:",
    "options": [
      "La amplitud",
      "La frecuencia",
      "La polarización lineal",
      "La impedancia del vacío"
    ],
    "correctIndex": 1,
    "explain": "Sin modulación de información solo se transmite la portadora (potencia de portadora). La respuesta es «La frecuencia».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / magnetismo y ondas electromagnéticas."
  },
  {
    "id": "ofic-004",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Un aumento de 3 dB en potencia (misma impedancia) corresponde aproximadamente a:",
    "options": [
      "Doblar la potencia",
      "Mitad de potencia",
      "Diez veces la potencia",
      "Igual de potencia"
    ],
    "correctIndex": 0,
    "explain": "La geometría del sistema radiante y los radiales modifican la impedancia de entrada de la antena. «Doblar la potencia». (BOE-A-2013-7624). 3 dB en potencia implica un factor ~2 (doble); 10 dB implica un factor ~10.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / magnetismo y ondas electromagnéticas."
  },
  {
    "id": "ofic-005",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Un dipolo recto de media onda a una frecuencia dada tiene una longitud total eléctrica aproximada de:",
    "options": [
      "Un cuarto de longitud de onda",
      "Media longitud de onda",
      "Una longitud de onda",
      "Dos longitudes de onda"
    ],
    "correctIndex": 1,
    "explain": "Un dipolo de media onda mide del orden de λ/2 en total; vertical de λ/4 necesita plano de tierra o radiales. «Media longitud de onda».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / antenas y propagación."
  },
  {
    "id": "ofic-006",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un condensador ideal en circuito abierto en régimen permanente de corriente continua se comporta como:",
    "options": [
      "Un cortocircuito",
      "Un circuito abierto",
      "Una resistencia nula siempre",
      "Una fuente de tensión"
    ],
    "correctIndex": 1,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «Un circuito abierto».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / componentes y circuitos."
  },
  {
    "id": "ofic-007",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En un receptor superheterodino, la etapa que traslada la señal recibida a la frecuencia intermedia (FI) suele ser:",
    "options": [
      "El detector de producto únicamente",
      "El mezclador (con oscilador local)",
      "Solo el filtro de entrada",
      "El microófono"
    ],
    "correctIndex": 1,
    "explain": "FI significa frecuencia intermedia. En un receptor superheterodino, el mezclador combina la señal de antena con el oscilador local para trasladarla a una FI fija, donde resulta más fácil filtrar y amplificar.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / receptores y emisores."
  },
  {
    "id": "ofic-008",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En España, el reglamento específico de uso del dominio público radioeléctrico por radioaficionados se aprueba principalmente mediante:",
    "options": [
      "Una orden ministerial que aprueba el reglamento (p. ej. IET/1311/2013)",
      "Solo una ley autonómica de telecomunicaciones",
      "Un reglamento europeo directamente aplicable sin publicación en el BOE",
      "Un acuerdo de club local"
    ],
    "correctIndex": 0,
    "explain": "El marco habitual es la Orden IET/1311/2013, que aprueba el Reglamento de aficionados publicado en el BOE; el texto vinculante está en el BOE.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente en BOE."
  },
  {
    "id": "ofic-009",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La prueba de capacitación de radioaficionado en España consta, en lo habitual, de:",
    "options": [
      "Una sola prueba mezclada sin partes",
      "Dos partes independientes (electricidad/radioelectricidad y reglamentación)",
      "Solo legislación autonómica",
      "Solo práctica oral sin test"
    ],
    "correctIndex": 1,
    "explain": "El esquema habitual es dos pruebas independientes alineadas con el programa (electricidad y reglamentación), reflejado en el reglamento y en la convocatoria.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente en BOE."
  },
  {
    "id": "ofic-010",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La recomendación CEPT que describe la licencia CEPT de radioaficionado para uso en países que la reconocen es, por lo general:",
    "options": [
      "T/R 61-02",
      "T/R 61-01",
      "T/R 62-01",
      "ERC Report 089"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «T/R 61-01». (BOE-A-2013-7624).",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y CEPT T/R 61-01 (licencia CEPT)."
  },
  {
    "id": "ofic-011",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En el reglamento de radioaficionados (Orden IET/1311/2013), para estaciones automáticas desatendidas en VHF/UHF, el artículo 25.h fija límites de potencia de salida; dentro del casco urbano el techo orientativo es del orden de:",
    "options": [
      "1 W",
      "10 W",
      "50 W",
      "500 W"
    ],
    "correctIndex": 1,
    "explain": "El art. 25.h distingue dentro/fuera del casco urbano; dentro del urbano el límite orientativo citado en el propio texto es 10 W de salida (fuera suele ser mayor; ver tabla y redacción vigente).",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente en BOE."
  },
  {
    "id": "ofic-012",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El anexo I del reglamento de radioaficionados (IET/1311/2013) es especialmente relevante para consultar:",
    "options": [
      "Solo el color de los conectores de micro",
      "Condiciones técnicas como potencias y bandas de emisión del aficionado",
      "Únicamente tarifas de examen",
      "Solo el código Q completo"
    ],
    "correctIndex": 1,
    "explain": "El anexo I desarrolla condiciones técnicas (incluye tablas de potencias por banda, etc.); es referencia obligada ante dudas de enunciados.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente en BOE."
  },
  {
    "id": "ofic-013",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "La frecuencia de resonancia de un circuito LC ideal en paralelo viene dada en buena aproximación por:",
    "options": [
      "f0 = 2π√(LC)",
      "f0 = 1/(2π√(LC))",
      "f0 = LC / (2π)",
      "f0 = √(L/C)"
    ],
    "correctIndex": 1,
    "explain": "En un circuito LC ideal, la frecuencia de resonancia es f0 = 1/(2π√(LC)); en paralelo o serie cambia la forma de la impedancia en resonancia. «f0 = 1/(2π√(LC))».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / magnetismo y ondas electromagnéticas."
  },
  {
    "id": "ofic-014",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En jerga telefónica de aficionado, «QSY» suele indicar que se va a:",
    "options": [
      "Aumentar la potencia sin límite",
      "Cambiar de frecuencia o canal",
      "Apagar el equipo de forma inmediata",
      "Emitir en modo exclusivamente digital"
    ],
    "correctIndex": 1,
    "explain": "Los códigos Q abrevian situaciones en tráfico: QRL ocupado, QRX espera, QSY cambio de frecuencia, QRT cese, QRM interferencia, QRN ruido atmosférico. «Cambiar de frecuencia o canal». (BOE-A-2013-7624).",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE)."
  },
  {
    "id": "ofic-015",
    "part": 1,
    "topicId": "componentes",
    "stem": "Al aumentar la frecuencia de una señal alterna, la reactancia de un condensador ideal:",
    "options": [
      "Aumenta siempre",
      "Disminuye",
      "Permanece constante",
      "Se convierte en resistencia pura"
    ],
    "correctIndex": 1,
    "explain": "La reactancia capacitiva es Xc = 1/(2πfC). Si f aumenta y C permanece constante, Xc disminuye. Por eso los condensadores dejan pasar mejor las componentes de alta frecuencia que la corriente continua.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / componentes y circuitos."
  },
  {
    "id": "ofic-016",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un diodo Zener se utiliza habitualmente en un circuito para:",
    "options": [
      "Generar una señal de audio",
      "Rectificar solo radiofrecuencia",
      "Obtener una referencia o estabilización de tensión",
      "Medir la ROE"
    ],
    "correctIndex": 2,
    "explain": "El Zener trabaja polarizado en inversa dentro de su zona Zener, con corriente limitada, y mantiene aproximadamente una tensión fija. En examen suele asociarse a referencia o regulación de tensión.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / componentes y circuitos."
  },
  {
    "id": "ofic-017",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En un transmisor de radioaficionado, el filtro de salida de RF se emplea principalmente para:",
    "options": [
      "Aumentar el volumen del altavoz",
      "Reducir armónicos y emisiones no deseadas",
      "Cambiar el indicativo transmitido",
      "Medir la capacidad de la batería"
    ],
    "correctIndex": 1,
    "explain": "Tras la etapa de potencia pueden aparecer armónicos o espurias. El filtro de salida atenúa esas componentes antes de la antena, reduciendo interferencias y manteniendo la emisión dentro del espectro permitido.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / receptores y emisores."
  },
  {
    "id": "ofic-018",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Para muestrear digitalmente una señal sin aliasing, la frecuencia de muestreo debe ser, como mínimo:",
    "options": [
      "Igual a la frecuencia mínima de la señal",
      "La mitad de la frecuencia máxima",
      "El doble de la frecuencia máxima de la señal",
      "Independiente de la señal"
    ],
    "correctIndex": 2,
    "explain": "El criterio de Nyquist exige muestrear al menos al doble de la frecuencia máxima presente. Si se muestrea por debajo, aparecen componentes falsas por aliasing; por eso también se usan filtros antialias.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / magnetismo y ondas electromagnéticas."
  },
  {
    "id": "ofic-019",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En una antena Yagi, el lóbulo principal de radiación apunta normalmente hacia:",
    "options": [
      "El reflector",
      "Los directores",
      "El mástil de soporte",
      "La línea coaxial"
    ],
    "correctIndex": 1,
    "explain": "En una Yagi, el reflector queda detrás del elemento excitado y los directores se sitúan hacia delante. La máxima radiación o recepción se produce en la dirección de los directores.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / antenas y propagación."
  },
  {
    "id": "ofic-020",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Cuando se expresa la ganancia de una antena en dBd, la referencia utilizada es:",
    "options": [
      "Una antena isotrópica",
      "Un dipolo de media onda",
      "Un plano de tierra perfecto",
      "La potencia del transmisor"
    ],
    "correctIndex": 1,
    "explain": "dBd expresa ganancia respecto a un dipolo de media onda. dBi expresa ganancia respecto a una antena isotrópica; entre ambas referencias hay aproximadamente 2,15 dB.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / antenas y propagación."
  },
  {
    "id": "ofic-021",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En radiotelefonía, la señal internacional «Pan Pan» indica:",
    "options": [
      "Socorro con peligro grave e inminente",
      "Urgencia, sin ser necesariamente socorro inmediato",
      "Mensaje meteorológico ordinario",
      "Fin de transmisión"
    ],
    "correctIndex": 1,
    "explain": "Mayday se reserva para socorro. Pan Pan indica urgencia, por ejemplo una situación que requiere prioridad pero no implica necesariamente peligro grave e inmediato para la vida. Sécurité/Securite se asocia a avisos de seguridad.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE)."
  },
  {
    "id": "ofic-022",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En un reporte RST usado en radioafición, las letras significan:",
    "options": [
      "Radio, señal y tono",
      "Repetidor, sincronismo y tiempo",
      "Legibilidad, intensidad y tono",
      "Ruido, seguridad y tráfico"
    ],
    "correctIndex": 2,
    "explain": "RST resume Readability, Strength y Tone: legibilidad, intensidad de señal y tono. En telefonía suelen usarse R y S; en telegrafía se añade T para valorar el tono.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE)."
  },
  {
    "id": "ofic-023",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "Las comunicaciones de radioaficionado destinadas a ocultar deliberadamente su significado mediante cifrado:",
    "options": [
      "Están permitidas si son entre amigos",
      "Están permitidas solo en concursos",
      "No son propias del servicio y deben evitarse",
      "Son obligatorias en DX"
    ],
    "correctIndex": 2,
    "explain": "El servicio de radioaficionado es técnico y abierto: no se usan comunicaciones encubiertas ni fines ajenos al servicio (comercial, secreto, etc.). «No son propias del servicio y deben evitarse».",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE)."
  },
  {
    "id": "ofic-024",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Durante una transmisión, tocar una antena o elementos próximos al sistema radiante:",
    "options": [
      "Es inocuo si la ROE es baja",
      "Puede ser peligroso por tensiones y corrientes de RF",
      "Solo afecta al indicativo",
      "Mejora la adaptación de impedancias"
    ],
    "correctIndex": 1,
    "explain": "En transmisión puede haber tensiones y corrientes de radiofrecuencia elevadas en antena, acoplador o línea. La seguridad exige no tocar elementos radiantes, mantener distancias y cuidar tierra y protecciones.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 / instalaciones, seguridad y EMC."
  },
  {
    "id": "ofic-025",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Si la RF de una estación entra en altavoces o equipos de audio cercanos, una medida técnica razonable es:",
    "options": [
      "Aumentar siempre la potencia",
      "Añadir ferritas, filtros o apantallamiento adecuados",
      "Cambiar el indicativo",
      "Emitir sin toma de tierra"
    ],
    "correctIndex": 1,
    "explain": "La RF puede entrar por cables, alimentación o falta de apantallamiento. Las soluciones típicas son ferritas, filtros, desacoplos, cables blindados, buena puesta a tierra y revisión de armónicos.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 / instalaciones, seguridad y EMC."
  },
  {
    "id": "ofic-026",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El Cuadro Nacional de Atribución de Frecuencias (CNAF) sirve para:",
    "options": [
      "Asignar nombres fonéticos a las letras",
      "Ordenar la atribución de bandas y condiciones de uso del espectro en España",
      "Calcular la ROE de una antena",
      "Sustituir al indicativo de llamada"
    ],
    "correctIndex": 1,
    "explain": "El CNAF organiza qué servicios pueden usar cada banda y con qué condiciones dentro del marco español. Para el radioaficionado se complementa con el reglamento específico y sus anexos.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente en BOE."
  },
  {
    "id": "ofic-027",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Los planes de banda de la IARU deben entenderse principalmente como:",
    "options": [
      "Recomendaciones operativas para ordenar modos y usos",
      "Autorizaciones legales que sustituyen al BOE",
      "Permisos individuales de estación",
      "Certificados HAREC"
    ],
    "correctIndex": 0,
    "explain": "Los planes de banda IARU ayudan a convivir en el espectro recomendando segmentos para modos, anchos de banda o actividades. No sustituyen la autorización, el reglamento español ni el CNAF.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente en BOE."
  },
  {
    "id": "ofic-028",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Al operar temporalmente en otro país bajo licencia CEPT, el radioaficionado debe respetar:",
    "options": [
      "Solo las condiciones de su país de origen",
      "Las bandas y condiciones del país visitado",
      "Cualquier frecuencia libre de ocupación",
      "Únicamente las normas de su radio club"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT facilita operación temporal, pero el operador se somete a las bandas, potencias, prefijos y condiciones del país donde transmite. No basta con aplicar solo la normativa española.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y CEPT T/R 61-01 (licencia CEPT)."
  },
  {
    "id": "ofic-029",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El S-meter de un receptor de radioaficionado indica normalmente:",
    "options": [
      "La potencia de salida del transmisor",
      "La intensidad relativa de la señal recibida",
      "La capacidad de la batería",
      "La ROE de la antena"
    ],
    "correctIndex": 1,
    "explain": "El S-meter es un indicador de nivel o intensidad relativa de señal recibida. No mide la potencia de salida del transmisor ni sustituye a un vatímetro o medidor de ROE.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / receptores y emisores."
  },
  {
    "id": "ofic-030",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En banda lateral única (SSB), frente a una AM convencional, se transmite normalmente:",
    "options": [
      "La portadora completa y las dos bandas laterales",
      "Una sola banda lateral, normalmente con portadora suprimida",
      "Solo una señal de audio sin RF",
      "Dos portadoras sin información"
    ],
    "correctIndex": 1,
    "explain": "La SSB transmite una sola banda lateral y normalmente suprime la portadora. Así reduce anchura de banda y concentra mejor la potencia útil respecto a una AM con portadora y dos bandas laterales.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / magnetismo y ondas electromagnéticas."
  },
  {
    "id": "ofic-031",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En bancos españoles de práctica, si se pide deletrear la letra N con la tabla fonética usada para indicativos, la respuesta esperada suele ser:",
    "options": [
      "Noviembre",
      "November",
      "Norte",
      "Náutico"
    ],
    "correctIndex": 0,
    "explain": "Es una pregunta trampa habitual: en operación internacional puede verse la forma inglesa November, pero algunos bancos españoles formulan el deletreo con la adaptación usada en castellano: N = Noviembre. No inventes palabras como Norte o Náutico.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y CEPT T/R 61-01 (licencia CEPT)."
  },
  {
    "id": "ofic-032",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Las capas ionizadas de la atmósfera que condicionan la propagación por reflexión en HF se denominan habitualmente:",
    "options": [
      "Troposfera, estratosfera y mesosfera",
      "Capas D, E, F1 y F2",
      "Solo capa ozono",
      "Capas AM y FM"
    ],
    "correctIndex": 1,
    "explain": "En HF interesa la ionosfera y sus subcapas (D, E, F1, F2). La troposfera influye más en VHF/UHF; no confundir con capas meteorológicas.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / antenas y propagación."
  },
  {
    "id": "ofic-033",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La designación internacional de una clase de emisión consta, en el esquema habitual, de:",
    "options": [
      "Un solo dígito",
      "Tres signos: letra, número y letra",
      "Cuatro letras seguidas del indicativo",
      "Dos números y un prefijo"
    ],
    "correctIndex": 1,
    "explain": "El formato clásico es letra-número-letra (p. ej. modulación y tipo de señal). En examen suele preguntarse la estructura, no memorizar todas las clases.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 (BOE-A-2013-7624); contrastar redacción vigente en BOE."
  },
  {
    "id": "ofic-034",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los prefijos temporales ED, EE y EF en distintivos españoles se asocian, según la práctica habitual del examen, a:",
    "options": [
      "Eventos de relevancia internacional únicamente",
      "Usos temporales no atribuidos a nivel nacional ni autonómico",
      "Solo estaciones de barco",
      "Distritos 8 y 9"
    ],
    "correctIndex": 1,
    "explain": "ED/EE/EF suelen reservarse a usos temporales especiales. EG/EH se relacionan con eventos regionales; AM/AN/AO con relevancia nacional o internacional (tablas de estudio españolas).",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y CEPT T/R 61-01 (licencia CEPT)."
  },
  {
    "id": "ofic-035",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "Si una interferencia perjudicial afecta a la seguridad de la vida humana, el operador debe:",
    "options": [
      "Aumentar potencia para superarla",
      "Dejar de emitir hasta resolver el problema",
      "Cambiar solo el indicativo",
      "Ignorarla si la ROE es baja"
    ],
    "correctIndex": 1,
    "explain": "La seguridad de personas prevalece: cesar la emisión que causa o agrava la interferencia y cooperar en su resolución.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE)."
  },
  {
    "id": "ofic-036",
    "part": 1,
    "topicId": "componentes",
    "stem": "En resonancia de un circuito serie LC ideal, la reactancia capacitiva y la inductiva:",
    "options": [
      "Siempre son nulas",
      "Se igualan en magnitud y se cancelan",
      "Suman el doble",
      "Solo importa la resistencia"
    ],
    "correctIndex": 1,
    "explain": "En resonancia serie |XL| = |XC|; las reactancias se cancelan y la impedancia queda esencialmente resistiva. «Se igualan en magnitud y se cancelan».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / componentes y circuitos."
  },
  {
    "id": "ofic-037",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El factor de calidad Q de un circuito resonante se relaciona con la frecuencia de resonancia f y el ancho de banda B como:",
    "options": [
      "Q = B / f",
      "Q = f / B",
      "Q = f · B",
      "Q = f + B"
    ],
    "correctIndex": 1,
    "explain": "El factor de calidad Q relaciona frecuencia central y ancho de banda: Q = f/B. A mayor Q, mayor selectividad del resonador. «Q = f / B».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / receptores y emisores."
  },
  {
    "id": "ofic-038",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Una potencia de 1000 mW (1 W) referida a 1 mW equivale aproximadamente a:",
    "options": [
      "0 dBm",
      "10 dBm",
      "30 dBm",
      "100 dBm"
    ],
    "correctIndex": 2,
    "explain": "1 W = 1000 mW → 10·log10(1000) = 30 dBm. Confundir con 10 dBm (10 mW) es error típico de examen.",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / magnetismo y ondas electromagnéticas."
  },
  {
    "id": "ofic-039",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La función principal del silenciador (squelch) en un receptor es:",
    "options": [
      "Amplificar la antena",
      "Suprimir el audio cuando no hay señal útil de RF",
      "Medir la ROE",
      "Generar la portadora"
    ],
    "correctIndex": 1,
    "explain": "El CAG/AGC ajusta ganancia para mantener nivel de audio ante señales fuertes o débiles; no cambia la frecuencia sintonizada. «Suprimir el audio cuando no hay señal útil de RF».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / receptores y emisores."
  },
  {
    "id": "ofic-040",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En el código Q, QRX indica normalmente que:",
    "options": [
      "Se cambia de banda de inmediato",
      "Se volverá a llamar más tarde",
      "Se solicita repetición",
      "Se cierra la estación"
    ],
    "correctIndex": 1,
    "explain": "QRX indica que la estación volverá a llamar o está esperando. QRL significa «estoy ocupado». «Se volverá a llamar más tarde».",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE)."
  },
  {
    "id": "ofic-041",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Un distintivo que incorpora el prefijo EG suele asociarse en España a:",
    "options": [
      "Uso temporal internacional exclusivo",
      "Eventos de carácter regional o autonómico",
      "Solo repetidores",
      "Estaciones de barco"
    ],
    "correctIndex": 1,
    "explain": "EG/EH se vinculan a eventos regionales o locales. AM/AN/AO suelen usarse en eventos de mayor relevancia; ED/EE/EF en otros usos temporales.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y CEPT T/R 61-01 (licencia CEPT)."
  },
  {
    "id": "ofic-042",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Un receptor superheterodino de doble conversión utiliza:",
    "options": [
      "Una sola frecuencia intermedia",
      "Dos frecuencias intermedias en cadena",
      "Solo conversión directa a audio",
      "Dos antenas obligatoriamente"
    ],
    "correctIndex": 1,
    "explain": "La doble superheterodina usa dos mezclas a FI distintas para mejorar selectividad y suprimir imagen en bandas altas. «Dos frecuencias intermedias en cadena».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / receptores y emisores."
  },
  {
    "id": "ofic-043",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En el diagrama de radiación de una antena, la relación delante-atrás mide:",
    "options": [
      "La ROE de la línea",
      "La diferencia en dB entre radiación frontal y posterior",
      "La potencia de la batería",
      "El código Q"
    ],
    "correctIndex": 1,
    "explain": "La relación delante–atrás (F/B) compara radiación o recepción del lóbulo principal frente a la parte trasera, en dB. «La diferencia en dB entre radiación frontal y posterior».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / antenas y propagación."
  },
  {
    "id": "ofic-044",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un diodo varicap se comporta, en esencia, como:",
    "options": [
      "Una resistencia fija",
      "Un condensador variable controlado por tensión",
      "Un transformador de potencia",
      "Un altavoz"
    ],
    "correctIndex": 1,
    "explain": "El varicap se comporta como condensador variable controlado por la tensión inversa aplicada. «Un condensador variable controlado por tensión».",
    "sourceRef": "Elaboración propia (2026) · programa HAREC / componentes y circuitos."
  },
  {
    "id": "ofic-045",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "Antes de transmitir en una frecuencia, escuchar si la frecuencia está libre es:",
    "options": [
      "Opcional y sin importancia",
      "Una buena práctica operativa",
      "Prohibido por el reglamento",
      "Solo obligatorio en HF"
    ],
    "correctIndex": 1,
    "explain": "Evita interferir a comunicaciones en curso. Es buena práctica aunque el reglamento también exija identificarse y respetar bandas.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE)."
  },
  {
    "id": "ofic-046",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En tráfico de radioaficionado, la abreviatura «CL» suele significar:",
    "options": [
      "Cambio de polarización",
      "Cierre de estación",
      "Licencia CEPT",
      "Control de ganancia"
    ],
    "correctIndex": 1,
    "explain": "CL = Closing / cierre de estación. No confundir con QRT (cesar emisión) en todos los contextos, pero CL es cierre habitual.",
    "sourceRef": "Elaboración propia (2026) · Orden IET/1311/2013 y buenas prácticas operativas (IARU / URE)."
  },
  {
    "id": "ofic-047",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Según la ley de Coulomb, la fuerza entre dos cargas puntuales es directamente proporcional a:",
    "options": [
      "La suma de las cargas",
      "El producto de las cargas",
      "El cuadrado de la distancia entre cargas",
      "La resistencia del medio"
    ],
    "correctIndex": 1,
    "explain": "Coulomb: la fuerza crece con el producto de las cargas (q1·q2) y decrece con el cuadrado de la distancia. No confundas «producto de cargas» con «cuadrado de la distancia» en el enunciado.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-048",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Dos resistencias iguales de valor R conectadas en paralelo equivalen a:",
    "options": [
      "2R",
      "R / 2",
      "R²",
      "1 / (2R)"
    ],
    "correctIndex": 1,
    "explain": "En paralelo, resistencias iguales: Req = R/n. Con dos iguales, Req = R/2. En serie sería 2R.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-049",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En una señal sinusoidal, si el valor eficaz (RMS) de tensión es 10 V, el valor de pico aproximado es:",
    "options": [
      "5 V",
      "10 V",
      "14,1 V",
      "20 V"
    ],
    "correctIndex": 2,
    "explain": "Para sinusoidal: Vp ≈ √2 · Vrms. Con 10 V eficaces, Vp ≈ 14,1 V. El pico no coincide con el eficaz.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-050",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La relación entre periodo T (segundos) y frecuencia f (hertzios) de una señal periódica es:",
    "options": [
      "T = f",
      "T = 1 / f",
      "T = f²",
      "T = 2πf"
    ],
    "correctIndex": 1,
    "explain": "Periodo y frecuencia son inversos: T = 1/f. Si f duplica, el periodo se reduce a la mitad.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-051",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Para medir la tensión entre dos puntos de un circuito, el voltímetro debe conectarse:",
    "options": [
      "En serie con la rama",
      "En paralelo entre esos puntos",
      "Sustituyendo la fuente",
      "Con el circuito alimentado por corriente alterna únicamente"
    ],
    "correctIndex": 1,
    "explain": "En corriente continua, V = I·R y P = V·I son las relaciones base del examen. La magnitud o fórmula correcta aquí es «En paralelo entre esos puntos». El voltímetro mide diferencia de potencial en paralelo (alta impedancia de entrada). En serie mediría corriente, no tensión.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-052",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La unidad dBm expresa potencia referida a:",
    "options": [
      "1 vatio",
      "1 miliwatio",
      "1 voltio",
      "1 ohmio"
    ],
    "correctIndex": 1,
    "explain": "dBm es potencia absoluta respecto a 1 mW (miliwatio). No es tensión ni resistencia; dB sin «m» es relación entre potencias.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-053",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Una resistencia con bandas violeta–verde–rojo–oro (tolerancia oro) tiene un valor nominal aproximado de:",
    "options": [
      "75 Ω",
      "750 Ω",
      "7500 Ω",
      "75 kΩ"
    ],
    "correctIndex": 2,
    "explain": "Violeta=7, verde=5, rojo=×100 → 75×100 = 7500 Ω. La banda oro suele indicar tolerancia ±5 %, no una cifra del valor.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-054",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Un condensador ideal en régimen permanente de corriente continua se comporta, en primera aproximación, como:",
    "options": [
      "Un cortocircuito",
      "Un circuito abierto",
      "Una fuente de tensión constante",
      "Una resistencia que crece con el tiempo indefinidamente"
    ],
    "correctIndex": 1,
    "explain": "En CC estable el condensador está cargado y no circula corriente continua: modelo ideal = circuito abierto.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-055",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Una bobina ideal en régimen permanente de corriente continua se comporta, en primera aproximación, como:",
    "options": [
      "Un circuito abierto",
      "Un cortocircuito",
      "Un condensador en serie",
      "Una antena resonante"
    ],
    "correctIndex": 1,
    "explain": "La bobina almacena energía en campo magnético; en CC estable se comporta como cortocircuito ideal tras el transitorio. «Un cortocircuito». No confundir con el distractor del mismo bloque temático.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-056",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "4,7 kΩ expresado en ohmios (Ω) sin prefijo es:",
    "options": [
      "47 Ω",
      "470 Ω",
      "4700 Ω",
      "47 000 Ω"
    ],
    "correctIndex": 2,
    "explain": "El prefijo «k» multiplica por 1000: 4,7 kΩ = 4,7 × 10³ Ω = 4700 Ω. Convierte unidades antes de aplicar Ohm.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-057",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Una pila tiene fuerza electromotriz 12 V y resistencia interna 0,5 Ω. Si la corriente de carga es 2 A, la tensión en bornes es aproximadamente:",
    "options": [
      "12 V",
      "11 V",
      "13 V",
      "6 V"
    ],
    "correctIndex": 1,
    "explain": "Caída interna: Vint = I·Ri = 2×0,5 = 1 V. Tensión en bornes ≈ FEM − Vint = 12 − 1 = 11 V (modelo serie).",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-058",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La intensidad de un campo eléctrico se expresa habitualmente en:",
    "options": [
      "Amperios por metro (A/m)",
      "Voltios por metro (V/m)",
      "Vatios por ohmio",
      "Hertzios"
    ],
    "correctIndex": 1,
    "explain": "Campo eléctrico E: unidad SI V/m (voltio por metro). A/m corresponde al campo magnético, no al eléctrico.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-059",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La energía almacenada en un condensador cargado (modelo ideal) es proporcional a:",
    "options": [
      "Solo a la capacidad C",
      "C · V (lineal en V)",
      "C · V²",
      "V / C"
    ],
    "correctIndex": 2,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «C · V²». Energía en condensador: W = ½·C·V². Aparece el cuadrado de la tensión; no confundas con P = V·I en vatios.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-060",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Para proteger un amperímetro de sobrecorriente suele usarse un resistencia shunt que:",
    "options": [
      "Va en serie y es muy alta",
      "Deriva la mayor parte de la corriente en paralelo de baja resistencia",
      "Sustituye al voltímetro",
      "Aumenta la FEM de la fuente"
    ],
    "correctIndex": 1,
    "explain": "La resistencia shunt va en paralelo con el galvanómetro para derivar corriente y ampliar el rango del amperímetro. «Deriva la mayor parte de la corriente en paralelo de baja resistencia».",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-061",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En corriente alterna, el factor de potencia (cos φ) relaciona principalmente:",
    "options": [
      "Tensión continua y resistencia",
      "Potencia activa y potencia aparente",
      "Frecuencia y longitud de onda",
      "dBm y dBµV sin más"
    ],
    "correctIndex": 1,
    "explain": "cos φ = Pactiva / Paparente en alterna con desfase. No es una fórmula de continua pura ni una relación de onda λ = c/f.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-062",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La intensidad de un campo eléctrico homogéneo se mide en unidades SI de:",
    "options": [
      "V/m",
      "A/m",
      "W/Ω",
      "Hz"
    ],
    "correctIndex": 0,
    "explain": "Campo eléctrico E: voltios por metro (V/m). A/m es campo magnético; Hz es frecuencia.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-063",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Una onda de radio en el espacio libre se modela principalmente como:",
    "options": [
      "Solo onda sonora",
      "Onda electromagnética (campos E y B acoplados)",
      "Corriente continua en el vacío",
      "Solo campo magnético estático"
    ],
    "correctIndex": 1,
    "explain": "La radiación de RF se propaga como onda electromagnética: campos eléctrico y magnético variables y perpendiculares a la dirección de propagación. No es corriente continua ni solo sonido en el aire.",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-064",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Si la tensión eficaz de una sinusoide es 230 V, el valor de pico aproximado es:",
    "options": [
      "115 V",
      "230 V",
      "325 V",
      "460 V"
    ],
    "correctIndex": 2,
    "explain": "Vp ≈ √2·Vrms. Con 230 V eficaces, Vp ≈ 325 V (red doméstica en alterna).",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "ofic-065",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Para medir la diferencia de potencial entre dos nodos, el instrumento adecuado se conecta:",
    "options": [
      "En serie en la rama",
      "Entre los dos nodos (derivación / paralelo)",
      "Sustituyendo el fusible",
      "Solo con la antena desconectada"
    ],
    "correctIndex": 1,
    "explain": "Potencia es energía por unidad de tiempo; en CC P = V·I. Identifica unidad y fórmula antes de elegir. «Entre los dos nodos (derivación / paralelo)». (BOE-A-2013-7624).",
    "sourceRef": "Elaboración propia (2026) · libro oficial 1.ª parte Técnica (electricidad); programa HAREC / electricidad básica."
  },
  {
    "id": "q1",
    "part": 1,
    "topicId": "componentes",
    "stem": "En corriente continua, la ley de Ohm relaciona tensión (V), intensidad (I) y resistencia (R) como:",
    "options": [
      "V = I / R",
      "V = I · R",
      "V = R / I",
      "V = I + R"
    ],
    "correctIndex": 1,
    "explain": "En CC la intensidad es la misma en serie en un lazo simple; tensiones se reparten según resistencias. «V = I · R»."
  },
  {
    "id": "q10",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El certificado HAREC (nivel armonizado CEPT) se asocia principalmente a:",
    "options": [
      "Permiso de instalar torres sin límite de altura",
      "Acreditar superación de examen de competencias de aficionado",
      "Eximir de identificación en emisión",
      "Licencia de radio comercial"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Acreditar superación de examen de competencias de aficionado»."
  },
  {
    "id": "q11",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Respecto a antenas en comunidades de propietarios, lo habitual normativamente es:",
    "options": [
      "No aplican normas; cada vecino instala libremente",
      "Solo cuenta el criterio del presidente",
      "Pueden existir límites y requisitos de comunicación/acuerdos según normativa y estatutos",
      "Está prohibido siempre"
    ],
    "correctIndex": 2,
    "explain": "En comunidades de propietarios suelen aplicarse límites, comunicación y acuerdos según normativa y estatutos. «Pueden existir límites y requisitos de comunicación/acuerdos según normativa y estatutos»."
  },
  {
    "id": "q3",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "La longitud de onda λ (en metros) y la frecuencia f (en hertzios) en el vacío se relacionan aproximadamente con c ≈ 3·10⁸ m/s como:",
    "options": [
      "λ = c · f",
      "λ = c / f",
      "λ = f / c",
      "λ = c + f"
    ],
    "correctIndex": 1,
    "explain": "En el vacío, λ = c/f (c ≈ 3·10⁸ m/s). A mayor frecuencia, menor longitud de onda. «λ = c / f»."
  },
  {
    "id": "q4",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En la modulación de amplitud (AM), ¿qué magnitud de la portadora varía principalmente?",
    "options": [
      "La frecuencia",
      "La fase",
      "La amplitud",
      "La polarización mecánica"
    ],
    "correctIndex": 2,
    "explain": "AM suele usar detector de envolvente; SSB/CW detector de producto; FM discriminador o equivalente de frecuencia. «La amplitud»."
  },
  {
    "id": "q5",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un diodo en polarización directa idealmente:",
    "options": [
      "Bloquea el paso de corriente",
      "Conduce en un sentido con baja resistencia",
      "Amplifica la señal",
      "Almacena carga como un condensador"
    ],
    "correctIndex": 1,
    "explain": "En polarización directa el diodo conduce con baja resistencia dinámica; en inversa bloquea (modelo ideal). «Conduce en un sentido con baja resistencia»."
  },
  {
    "id": "q6",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La relación de ondas estacionarias (ROE) elevada en la línea de transmisión suele indicar:",
    "options": [
      "Buen acoplamiento antena-transmisor",
      "Desadaptación de impedancias",
      "Oscilador desbalanceado",
      "Modulación excesiva"
    ],
    "correctIndex": 1,
    "explain": "ROE elevada indica reflexiones por desadaptación de impedancias en la línea o antena. «Desadaptación de impedancias»."
  },
  {
    "id": "q7",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En España, los indicativos de radioaficionado suelen comenzar por el prefijo:",
    "options": [
      "I",
      "F",
      "E",
      "G"
    ],
    "correctIndex": 2,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «E». (BOE-A-2013-7624)."
  },
  {
    "id": "q8",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "El código Q que tradicionalmente se asocia a interferencias de otras señales es:",
    "options": [
      "QRP",
      "QRM",
      "QRN",
      "QSB"
    ],
    "correctIndex": 1,
    "explain": "QRM indica interferencia de origen artificial (otras emisiones o equipos). QRN es ruido atmosférico. «QRM»."
  },
  {
    "id": "q9",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "El deletreo fonético internacional de la letra M es:",
    "options": [
      "Madrid",
      "Metro",
      "Mike",
      "Maestro"
    ],
    "correctIndex": 2,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Mike»."
  },
  {
    "id": "quijotes-84-1810",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Como norma general, y salvo circunstancias especiales debidamente motivadas, las estaciones automáticas desatendidas en las bandas de VHF y UHF fuera del casco urbano, emitirán una potencia de salida máxima de:",
    "options": [
      "10 W.",
      "15 W.",
      "20 W.",
      "50 W."
    ],
    "correctIndex": 3,
    "explain": "Art. 25.h (BOE-A-2013-7624): fuera del casco urbano, potencia de salida máxima de 50 W en VHF/UHF desatendidas (salvo circunstancias especiales motivadas). «50 W.»."
  },
  {
    "id": "quijotes-84-1817",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En la licencia de estación de radioaficionado CEPT habrá de constar necesariamente una determinada información. Indique la respuesta incorrecta:",
    "options": [
      "Autoridad que expide la licencia.",
      "Distintivo de llamada.",
      "Asociación de radioaficionados a la que pertenece.",
      "Periodo de validez."
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Asociación de radioaficionados a la que pertenece.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1817). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1819",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Un radioaficionado español que traslade su residencia a un país que aplica la Recomendación de la CEPT T/R 61-02 podrá obtener una licencia de radioaficionado en dicho país si:",
    "options": [
      "Acredita 10 años de experiencia en la radioafición internacional.",
      "Supera un examen en el idioma del país.",
      "Dispone del Certificado HAREC.",
      "Obtiene la nacionalidad del país donde resida."
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Dispone del Certificado HAREC.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1819). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1822",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Las transmisiones entre estaciones de radioaficionados deberá limitarse a:",
    "options": [
      "La actualidad nacional e internacional.",
      "Comunicaciones relacionadas con el Servicio de Aficionados.",
      "Los boletines de su radio club.",
      "Cualquier comunicación."
    ],
    "correctIndex": 1,
    "explain": "El servicio de aficionados solo admite comunicaciones relacionadas con ensayos técnicos, formación y actividad propia del servicio, no tráfico ajeno. Por eso encaja «Comunicaciones relacionadas con el Servicio de Aficionados.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1822). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1828",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "De acuerdo con el Artículo 25 del Reglamento de Radiocomunicaciones de la UIT las comunicaciones por radio entre estaciones de aficionado de países distintos:",
    "options": [
      "Se limitarán exclusivamente a observaciones de carácter personal.",
      "Se limitarán exclusivamente a estaciones de la misma Región.",
      "Siempre pueden ser codificadas para ocultar su contenido.",
      "Se permitirán siempre, excepto si la Administración de uno de los países afectados ha notificado su oposición a dichas comunicaciones."
    ],
    "correctIndex": 3,
    "explain": "El art. 25 UIT regula comunicaciones entre aficionados, identificación y condiciones del servicio; las administraciones pueden notificar restricciones. «Se permitirán siempre, excepto si la Administración de uno de los países afectados ha notificado su oposición a dichas comunicaciones.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1828). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1829",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En el caso de que un titular de una autorización especial de emisiones produzca interferencias a otros sistemas y, específicamente a instalaciones receptoras de radiodifusión o televisión, deberá:",
    "options": [
      "Informar al titular de la estación interferida del horario en que va a emitir.",
      "Suspender de inmediato las emisiones.",
      "Comunicar la interferencia a Telecomunicaciones para que adopte medidas.",
      "Seguir emitiendo."
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Suspender de inmediato las emisiones.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1829). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1833",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Qué identifica a un radioaficionado titular de una autorización?:",
    "options": [
      "La matrícula de su estación.",
      "Su distintivo de llamada asociado.",
      "El permiso de instalación de la antena.",
      "La autorización de la Administración competente en espectro radioeléctrico para instalar la antena."
    ],
    "correctIndex": 1,
    "explain": "Lo que identifica al operador autorizado ante terceros en emisión es su distintivo de llamada asignado, no el DNI ni el domicilio. «Su distintivo de llamada asociado.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1833). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1836",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El siguiente gráfico se corresponde con uno de los distritos geográficos de residencia del titular de una autorización de radioaficionado, indíquelo:",
    "stemFigure": "images/quiz/quijotes-84-1836-original.jpg",
    "stemFigureAlt": "Figura Quijotes EA3RCQ (quiz 84, pregunta 1836): El siguiente gráfico se corresponde con uno de los distritos geográficos de residencia del titular de una autorización d",
    "options": [
      "Distrito 1.",
      "Distrito 2.",
      "Distrito 5.",
      "Distrito 6."
    ],
    "correctIndex": 2,
    "explain": "El mapa del enunciado corresponde al distrito EA5 (Comunidad Valenciana y Murcia en la tabla de residencia del BOE-A-2013-7624). La cifra 5 identifica ese distrito geográfico. «Distrito 5.».",
    "explainSourceNote": "Práctica con figura (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1836). Contrastar con BOE y convocatoria."
  },
  {
    "id": "quijotes-84-1842",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La autorización de aficionados para extranjeros residentes en España se podrá obtener:radioaficionado, cuando:",
    "options": [
      "Cuando sea titular de un certificado HAREC expedido por cualquier país que aplique la Recomendación CEPT T/R 61-02.",
      "Solo si existe Acuerdo o Convenio de reciprocidad en la materia con su país de origen.",
      "No existen autorizaciones de aficionados para extranjeros residentes, solamente temporales.",
      "Si se han examinado en España de la Reglamentación Nacional."
    ],
    "correctIndex": 0,
    "explain": "Un extranjero residente puede obtener autorización en España si acredita residencia y, según el supuesto, el certificado HAREC (armonización CEPT T/R 61-02). «Cuando sea titular de un certificado HAREC expedido por cualquier país que aplique la Recomendación CEPT T/R 61-02.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1842). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1843",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "A cual de las siguientes provincias pertenece el distintivo EA5EYR:",
    "options": [
      "Valencia.",
      "Almeria",
      "Zaragoza",
      "Zamora."
    ],
    "correctIndex": 0,
    "explain": "Interpreta la figura junto con el enunciado: identifica qué magnitud, bloque o relación se pregunta. La opción que encaja es «Valencia.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1843). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1847",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Como norma general, la instalación de una estación de aficionado deberá ser efectuada:",
    "options": [
      "Únicamente por el propietario de la estación.",
      "Por un funcionario técnico de la Jefatura Provincial de Inspección de Telecomunicaciones correspondiente.",
      "Exclusivamente por un técnico de una asociación legalizada de radioaficionados.",
      "Por un instalador de telecomunicaciones inscrito en el Registro de Empresas Instaladoras de Telecomunicación."
    ],
    "correctIndex": 3,
    "explain": "Como norma general el montaje del sistema radiante lo realiza un instalador inscrito en el registro correspondiente. «Por un instalador de telecomunicaciones inscrito en el Registro de Empresas Instaladoras de Telecomunicación.»."
  },
  {
    "id": "quijotes-84-1862",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Los planes de banda de la IARU para la Región 1 deben ser tenidos en cuenta:",
    "options": [
      "Unicamente por los radioaficionados principiantes.",
      "Unicamente en HF.",
      "Unicamente si se opera en Canarias.",
      "Por todo radioaficionado que opera en España."
    ],
    "correctIndex": 3,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Por todo radioaficionado que opera en España.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1862). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1864",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "A cual de las siguientes localidades puede pertenecer el distintivo de llamada: EA6PDM:",
    "options": [
      "Lleida.",
      "Huelva.",
      "Palma de Mallorca.",
      "Bilbao."
    ],
    "correctIndex": 2,
    "explain": "Interpreta la figura junto con el enunciado: identifica qué magnitud, bloque o relación se pregunta. La opción que encaja es «Palma de Mallorca.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1864). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1867",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cuáles de estas causas será causa específica de revocación de la autorización de radioaficionado?:",
    "options": [
      "Estar sin utilizar el espectro radioeléctrico durante cinco años seguidos.",
      "No comunicar fehacientemente a la Administración, cada cinco años, su deseo de continuar utilizando el espectro radioeléctrico.",
      "Cambiarse de domicilio sin comunicárselo fehacientemente a la Administración en un plazo de cinco años.",
      "Ninguna de ellas, ya no es necesario comunicarlo."
    ],
    "correctIndex": 3,
    "explain": "La revocación exige causas tasadas en el reglamento; el enunciado pide la opción que el banco considera correcta (a veces refleja normativa derogada: léelo como «según el banco»). «Ninguna de ellas, ya no es necesario comunicarlo.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1867). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1875",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Para no desmontar el sistema radiante de una estación fija, una vez cancelada la licencia, y dejarlo sólo para recepción, su titular deberá obtener:",
    "options": [
      "Autorización por escrito de la Jefatura Provincial de Inspección de Telecomunicaciones.",
      "Autorización por escrito de la propiedad del inmueble o, en su caso, de la comunidad de propietarios.",
      "Comunicarlo por escrito a la Jefatura Provincial de Inspección de Telecomunicaciones.",
      "Comunicarlo por escrito a la propiedad del inmueble o, en su caso, de la comunidad de propietarios."
    ],
    "correctIndex": 1,
    "explain": "Tras cancelar la licencia, conservar el sistema radiante solo para recepción requiere autorización escrita del propietario o de la comunidad de propietarios (BOE-A-2013-7624). «Autorización por escrito de la propiedad del inmueble o, en su caso, de la comunidad de propietarios.»."
  },
  {
    "id": "quijotes-84-1882",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Si un radioaficionado se identifica como EA2ABC/R7BHZ:",
    "options": [
      "Se trata de un radioaficionado con licencia expedida en otro país, operando ocasionalmente en una estación española.",
      "Se trata de un distintivo temporal reservado a estaciones colectivas.",
      "Pertenece a un corresponsal de un diario nacional, emitiendo a un país extranjero.",
      "Se trata de un estación no autorizada."
    ],
    "correctIndex": 0,
    "explain": "La barra y el segundo indicativo indican operación con autorización de otro país (CEPT) o invitado según el patrón del enunciado (EA/IZ…, EA/…, EA…/R…). «Se trata de un radioaficionado con licencia expedida en otro país, operando ocasionalmente en una estación española.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1882). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1892",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Se puede interferir deliberadamente a otra estación de radioaficionado:",
    "options": [
      "Si está operando ilegalmente.",
      "Para disminuir la ocupación de la banda.",
      "Si no ha emitido su indicativo.",
      "Nunca."
    ],
    "correctIndex": 3,
    "explain": "Interferir a sabiendas a otra estación está prohibido; es mala práctica e infracción. «Nunca.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1892). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1904",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En la banda de frecuencia de 50,00-51,00 MHz, existen restricciones geográficas de uso. Señale la provincia desde la que se podrán efectuar emisiones:",
    "options": [
      "Madrid.",
      "Avila.",
      "Valladolid.",
      "Almería."
    ],
    "correctIndex": 3,
    "explain": "La autorización y el indicativo condicionan quién puede operar, dónde y con qué requisitos. Para este enunciado, la respuesta correcta es «Almería.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1904). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1905",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En relación con los exámenes para la obtención del diploma de operador de estación de aficionado, indique la opción incorrecta:",
    "options": [
      "Es necesario estar en posesión del certificado HAREC para poder acceder a ellos.",
      "Para poder examinarse es necesario abonar previamente la tasa por presentación a las pruebas.",
      "Entre las materias de examen objeto se encuentra el conocimiento y dominio de la normativa reglamentaria referente a las estaciones de aficionado.",
      "Se convocan por Resolución de la Secretaría de Estado de Telecomunicaciones y Digitalización."
    ],
    "correctIndex": 0,
    "explain": "El diploma de operador acredita superar el examen oficial; no sustituye la licencia de estación ni el indicativo. «Es necesario estar en posesión del certificado HAREC para poder acceder a ellos.». (BOE-A-2013-7624)."
  },
  {
    "id": "quijotes-84-1906",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Según la normativa vigente:",
    "options": [
      "Tendrá carácter personal y no transferible.",
      "Habilita para el uso de cualquier banda de frecuencias del Servicio de Aficionados con determinadas características técnicas y restricciones geográficas.",
      "Requerirá disponer previamente del diploma de operador de estación de aficionado.",
      "El titular no tendrá que comunicar en ningún momento su intención de continuar utilizando el espectro radioeléctrico."
    ],
    "correctIndex": 3,
    "explain": "En reglamentación de aficionados, la redacción del BOE y la convocatoria mandan sobre potencias, trámites y procedimientos. La opción que encaja con este enunciado es «El titular no tendrá que comunicar en ningún momento su intención de continuar utilizando el espectro radioeléctrico.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1906). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1925",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Como norma general las instalaciones en una estación de radioaficionado deberán ser efectuadas:",
    "options": [
      "Directamente por el propietario de la estación.",
      "Exclusivamente por un técnico de una Asociación legalizada de Radioaficionados.",
      "Por un funcionario técnico de la Administración competente.",
      "Por un instalador de telecomunicaciones inscrito en el Registro de Empresas Instaladoras de Telecomunicación."
    ],
    "correctIndex": 3,
    "explain": "Como norma general el montaje lo realiza un instalador inscrito en el registro de empresas instaladoras (art. 19.e, BOE-A-2013-7624). «Por un instalador de telecomunicaciones inscrito en el Registro de Empresas Instaladoras de Telecomunicación.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1925). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1936",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "El cambio de ubicación de una antena:",
    "options": [
      "No es necesario solicitarlo a la Administración competente en espectro radioeléctrico.",
      "Se debe solicitar a la Administración competente en espectro radioeléctrico y seguir un procedimiento distinto al de la primera instalación.",
      "Se debe solicitar a la Administración competente en espectro radioeléctrico y seguir el mismo procedimiento que si se tratase de la primera instalación.",
      "Únicamente requiere ser notificado al Ayuntamiento de la localidad."
    ],
    "correctIndex": 2,
    "explain": "Cualquier modificación sustancial de la instalación exige comunicación o autorización ante la Administración competente, con el mismo procedimiento que una nueva instalación (BOE-A-2013-7624). «Se debe solicitar a la Administración competente y seguir el mismo procedimiento que si se tratase de la primera instalación.»."
  },
  {
    "id": "quijotes-84-1939",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Para la realización de obras que afecten a la instalación de una antena autorizada de radioaficionado, la Comunidad de Propietarios deberá:",
    "options": [
      "Indemnizar previamente al radioaficionado por los daños y perjuicios ocasionados.",
      "Solicitar autorización a la Administración competente.",
      "Informar, con antelación mínima de un mes, al titular de la licencia de estación si fuera necesario desmontar la antena y/o elementos anejos.",
      "Solicitar permiso al titular de la licencia de estación."
    ],
    "correctIndex": 2,
    "explain": "Las antenas en comunidades de propietarios requieren procedimiento, comunicación y a veces acuerdos; no es libertad total ni prohibición absoluta. «Informar, con antelación mínima de un mes, al titular de la licencia de estación si fuera necesario desmontar la antena y/o elementos anejos.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1939). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1952",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En el caso de que un radioaficionado cambie de domicilio que implique cambio de distrito. ¿Qué ocurriría con su distintivo?:",
    "options": [
      "Tendría que volverse a examinar de nuevo.",
      "No ocurriría nada, los distintivos son únicos e inamovibles.",
      "El interesado podrá solicitar mantener su sufijo, si este estuviera disponible. Caso contrario le será asignado un nuevo sufijo siguiendo el orden establecido.",
      "Se le autorizaría uno temporal de periodo ilimitado."
    ],
    "correctIndex": 2,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «El interesado podrá solicitar mantener su sufijo, si este estuviera disponible. Caso contrario le será asignado un nuevo sufijo siguiendo el orden establecido.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1952). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1963",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "¿Qué se entiende por emisiones no deseadas?:",
    "options": [
      "Conjunto de emisiones que producen interferencias.",
      "Conjunto de emisiones situadas fuera de la anchura de banda.",
      "Conjunto de las emisiones no esenciales y de las emisiones fuera de banda.",
      "Conjunto de emisiones de banda estrecha."
    ],
    "correctIndex": 2,
    "explain": "En reglamentación de aficionados, la redacción del BOE y la convocatoria mandan sobre potencias, trámites y procedimientos. La opción que encaja con este enunciado es «Conjunto de las emisiones no esenciales y de las emisiones fuera de banda.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 1963). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-1965",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En caso de cancelación de la Licencia de Estación de Aficionado. ¿Puede su titular mantener instalado el sistema radiante?:",
    "options": [
      "Nunca.",
      "Sí, si el sistema es poco voluminosos.",
      "Siempre que lo autorice la Administración competente en espectro radioeléctrico.",
      "Sólo en recepción, previa autorización por escrito de la propiedad del inmueble o, en su caso, de la Comunidad de Propietarios, remitiendo una copia de dicha autorización a la Administración competente en espectro radioeléctrico."
    ],
    "correctIndex": 3,
    "explain": "Tras cancelar la licencia, el uso del equipo puede limitarse a recepción y solo con autorización expresa, no a emitir con el distintivo anterior. «Sólo en recepción, previa autorización por escrito de la propiedad del inmueble o, en su caso, de la Comunidad de Propietarios, remitiendo una copia de dicha autorización a la Administración competente en espectro radioeléctrico.»."
  },
  {
    "id": "quijotes-84-1981",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En los planes de bandas de la IARU para la Región 1:",
    "options": [
      "Hay previstas frecuencias para repetidores en la banda 145,594-145,7935 MHz.",
      "No hay previstas frecuencias para repetidores en UHF.",
      "Hay previstas frecuencias para repetidores analógicos en la banda 88,5 - 99,0 MHz.",
      "No hay planes de banda de la IARU para la Región 1."
    ],
    "correctIndex": 0,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Hay previstas frecuencias para repetidores en la banda 145,594-145,7935 MHz.»."
  },
  {
    "id": "quijotes-84-2025",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El radioaficionado está obligado a comunicar, fehacientemente, su intención de continuar utilizando el dominio público radioeléctrico cada:",
    "options": [
      "Ya no hay que comunicarlo",
      "Cinco años",
      "Siete años",
      "Diez años"
    ],
    "correctIndex": 0,
    "explain": "Algunos trámites de comunicación previa han sido simplificados en normativa reciente; el banco puede reflejar la redacción histórica «ya no hay que comunicarlo». «Ya no hay que comunicarlo». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2025). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2034",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Conforme a la nota 5.141C del Reglamento de Radioaficionados de la Unión Internacional de Radiocomunicaciones:",
    "options": [
      "La banda 7100 a 7200 kHz está atribuida a titulo primario al servicio de radiodifusión hasta el 29 de marzo de 2009",
      "La banda 144 - 146 MHz no está atribuida al Servicio de Aficionados",
      "La banda 144 - 146 MHz está atribuida al Servicio de Aficionados hasta el 29 de marzo de 2030",
      "La banda 7100 - 7200 kHz no está atribuida a ningún servicio"
    ],
    "correctIndex": 0,
    "explain": "La nota 5.141C UIT reserva segmentos en HF; contrasta el cuadro de atribuciones con el CNAF y el reglamento vigente. «La banda 7100 a 7200 kHz está atribuida a titulo primario al servicio de radiodifusión hasta el 29 de marzo de 2009». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2034). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2043",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Las emisiones en la banda de frecuencias 50,0-51,0 MHz se podrán efectuar:",
    "options": [
      "Desde cualquier punto del territorio nacional.",
      "Desde las provincias de Barcelona, Valencia y Zaragoza.",
      "Desde la provincia de Valencia.",
      "En todo el territorio nacional si la potencia máxima del equipo es inferior a 50 W."
    ],
    "correctIndex": 3,
    "explain": "En reglamentación de aficionados, la redacción del BOE y la convocatoria mandan sobre potencias, trámites y procedimientos. La opción que encaja con este enunciado es «En todo el territorio nacional si la potencia máxima del equipo es inferior a 50 W.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2043). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2048",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "De acuerdo con el artículo 25 del Reglamento de Radiocomunicaciones de la ITU:",
    "options": [
      "Las transmisiones entre estaciones de aficionado de diferentes países no deberán codificarse para ocultar su significado.",
      "Siempre estarán permitidas las comunicaciones por radio entre radioaficionados de distintos países.",
      "Las comunicaciones por radio entre radioaficionados de diferentes países se utilizarán únicamente en casos de emergencia o desastre.",
      "La potencia máxima de las estaciones de aficionado será fijada por la Unión Internacional de Telecomunicaciones (ITU)."
    ],
    "correctIndex": 0,
    "explain": "El art. 25 UIT regula comunicaciones entre aficionados, identificación y condiciones del servicio; las administraciones pueden notificar restricciones. «Las transmisiones entre estaciones de aficionado de diferentes países no deberán codificarse para ocultar su significado.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2048). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2051",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En las comunicaciones de radio, la palabra GOLF se deletreará:",
    "options": [
      "Simplemete con la palabra Golf.",
      "Golfo, oscar, lima, félix.",
      "Golfo, oscar, lima, foxtrot.",
      "Golf, oscar, lima, foxtrot."
    ],
    "correctIndex": 3,
    "explain": "El alfabeto fonético ICAO evita confusiones entre letras parecidas en fonía. La secuencia correcta del enunciado es «Golf, oscar, lima, foxtrot.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2051). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2057",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Puedo realizar transmisiones desde Andorra si tengo la licencia?",
    "options": [
      "Si, segun el articulo 6, radioaficionados titulares de una licencia extranjera en vigor en el país en el que residen habitualmente, pueden obtener una licencia temporal para usar su estación en territorio andorrano.",
      "Si",
      "No, en ningun caso",
      "Solo en caso de emergencia"
    ],
    "correctIndex": 0,
    "explain": "La opción correcta recoge el régimen temporal andorrano indicado por el banco: un radioaficionado con licencia extranjera válida puede solicitar operar temporalmente allí.",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2057). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2060",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Al conjunto de las emisiones no esenciales y de las emisiones fuera de banda se las denomina emisiones:",
    "options": [
      "Catódicas.",
      "Parásitas.",
      "No deseadas.",
      "Por conversión de frecuencias."
    ],
    "correctIndex": 2,
    "explain": "En «Al conjunto de las emisiones no esenciales y de las emisiones fuera de banda se las denomi…», la formulación que encaja según el banco de examen es «No deseadas.». Contrasta con el temario de la normativa de aficionados y el BOE vigente si el distractor te confundió.",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2060). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2069",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El distintivo de llamada AM3SOS:",
    "options": [
      "Ha sido asignado para uso temporal.",
      "Le ha sido otorgado a una Asociación de Radioaficionados, vinculada con Protección Civil.",
      "No se puede asignar.",
      "Su titular reside en Cataluña."
    ],
    "correctIndex": 2,
    "explain": "El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «No se puede asignar.».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2069). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2072",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Si una estación tiene el indicativo de llamada EF2GGG:",
    "options": [
      "Pertenece a un radioaficionado de la provincia de Cantabria.",
      "Se le ha adjudicado al periódico de tirada nacional \"GGG\", de ahí el sufijo.",
      "Es concedido para uso temporal por un evento no especialmente significativo.",
      "Es de naturaleza indefinida."
    ],
    "correctIndex": 2,
    "explain": "El prefijo EF identifica un indicativo especial temporal. En este caso el banco lo asocia a un evento no especialmente significativo.",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2072). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2085",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La tipificación de las infracciones en que puede incurrir un radioaficionado es establecida por:",
    "options": [
      "La Ley 30/1992, de 26 de noviembre, de Régimen Jurídico de las Administraciones Públicas y del Procedimiento Administrativo Común.",
      "La Ley 11/2022, de 28 de junio, General de Telecomunicaciones.",
      "El Reglamento de uso del dominio público radioeléctrico por aficionados, Orden IET/1311/2013, de 9 de julio (BOE-A-2013-7624).",
      "La Resolución de 20 de septiembre de 2006, de la Secretaría de Estado de Telecomunicaciones y Digitalización, por la que se dictan Instrucciones para el desarrollo y aplicación del Reglamento de uso del dominio público radioeléctrico por aficionados."
    ],
    "correctIndex": 1,
    "explain": "Las infracciones del sector telecomunicaciones se tipifican en la Ley 11/2022 (BOE-A-2022-10757). «Ley 11/2022, de 28 de junio, General de Telecomunicaciones»."
  },
  {
    "id": "quijotes-84-2094",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Al realizar las emisiones desde estaciones de radioaficionados:",
    "options": [
      "Es aceptable dar únicamente la parte final (sufijo) del indicativo.",
      "Es aceptable inventar nuevas palabras para deletrear el indicativo.",
      "Es recomendable finalizar la emisión con la palabra \"cambio\".",
      "Es aconsejable emitir sin comprobar que la frecuencia se está utilizando."
    ],
    "correctIndex": 2,
    "explain": "En fonía es buena práctica cerrar con «cambio» o «out» para indicar fin de transmisión; no sustituye la identificación con distintivo. «Es recomendable finalizar la emisión con la palabra \"cambio\".». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2094). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2104",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En la banda de frecuencias de 1.830-1.850 kHz, la potencia de cresta de la envolvente (p.c.e.) de las emisiones, no deberá ser superior a",
    "options": [
      "5 w",
      "50 w",
      "75 w",
      "1000 w"
    ],
    "correctIndex": 1,
    "explain": "En 160 m el límite de potencia del banco histórico puede ser 50 W PEP; verifica en anexo I (BOE-A-2013-7624) la banda exacta. «50 w».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2104). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2203",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En el sistema GMDSS, la alerta de socorro inicial en MF/HF se realiza mediante Llamada Selectiva Digital (DSC). ¿En qué frecuencia se transmite esta alerta en banda MF?",
    "options": [
      "2.182 kHz",
      "2.187,5 kHz",
      "1.414 kHz",
      "156,525 MHz"
    ],
    "correctIndex": 1,
    "explain": "Las señales de socorro están reservadas a emergencias reales; su uso indebido es infracción grave. «2.187,5 kHz».",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2203). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2210",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En España, los Planes de Banda utilizados por los radioaficionados:",
    "options": [
      "Son establecidos por asociaciones locales de radioaficionados.",
      "Son aprobados por la Administración competente en espectro radioeléctrico.",
      "Son los planes de la IARU Región 1, utilizados como norma general.",
      "No tienen ninguna relación con la UIT."
    ],
    "correctIndex": 2,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Son los planes de la IARU Región 1, utilizados como norma general.». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2210). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "quijotes-84-2214",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En la banda de radioaficionado de 40 metros, el modo de emisión que normalmente se utiliza es",
    "options": [
      "USB",
      "AM",
      "LSB",
      "LSB y AM"
    ],
    "correctIndex": 2,
    "explain": "En 40 m fonía el modo habitual es LSB; el enunciado pide el modo no permitido según el plan del banco. «LSB». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica histórica (Quijotes EA3RCQ · reglamentacion-correccion-inmediata, quiz 84, pregunta 2214). Puede contener erratas; contrastar con BOE/convocatoria."
  },
  {
    "id": "ure-p1-q1",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "El campo eléctrico se expresa en:",
    "options": [
      "V.m",
      "W/m",
      "Q/s",
      "V/m"
    ],
    "correctIndex": 3,
    "explain": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q10",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un transistor bipolar puede ser de tipo:",
    "options": [
      "NPN",
      "NNP",
      "PNN",
      "PPN"
    ],
    "correctIndex": 0,
    "explain": "Los BJT comerciales son NPN o PNP según el material y dopado; NNP, PNN o PPN no son designaciones válidas. «NPN».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q11",
    "part": 1,
    "topicId": "componentes",
    "stem": "La energía almacenada en un condensador C se expresa por la fórmula:",
    "options": [
      "2C.V",
      "½C/V",
      "½V/C",
      "½C.V²"
    ],
    "correctIndex": 3,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «½C.V²».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q12",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "A una potencia de valor 1000 mW le corresponde un valor en dB de:",
    "options": [
      "30 dBm",
      "3dBw",
      "-3dBm",
      "0 dBm"
    ],
    "correctIndex": 0,
    "explain": "Los decibelios expresan relaciones logarítmicas; dBm referencia potencia a 1 mW. La respuesta es «30 dBm». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q122",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Para tratar de minimizar la producción de interferencias con una estación de radioaficionado, debe procurarse:",
    "options": [
      "Radiar con potencia elevada",
      "Tener una ROE alta",
      "Tener una ROE baja",
      "Tener un sintonizador muy fino"
    ],
    "correctIndex": 2,
    "explain": "Si una emisión perjudica servicios protegidos, el titular debe corregir o cesar; la buena práctica es actuar antes de que escale. «Tener una ROE baja».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q123",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "El periodo de una onda sinusoidal:",
    "options": [
      "Es el valor entre un máximo y un mínimo",
      "Las ondas no tienen periodo",
      "Es el tiempo que transcurre entre dos mínimos consecutivos",
      "No se puede calcular"
    ],
    "correctIndex": 2,
    "explain": "Relación clave: λ = c/f (en vacío c ≈ 3·10⁸ m/s) o λ = v/f en un medio. «Es el tiempo que transcurre entre dos mínimos consecutivos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q124",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "La unidad dBm corresponde a la magnitud:",
    "options": [
      "Potencia",
      "Frecuencia",
      "Tensión",
      "Intensidad"
    ],
    "correctIndex": 0,
    "explain": "dBm expresa potencia referida a 1 mW; dBµV suele referirse a tensión. No confundas con dB de ganancia sin referencia. «Potencia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q125",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un transformador está formado por al menos:",
    "options": [
      "Un circuito resonante serie",
      "Dos resistencias con propiedades ferromagnéticas",
      "Bobinas con rectificadores de onda completa",
      "Dos bobinas acopladas"
    ],
    "correctIndex": 3,
    "explain": "En el transformador ideal V1/V2 = N1/N2; un núcleo ferromagnético aumenta el acoplamiento y la inductancia. «Dos bobinas acopladas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q126",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Al objeto de evitar que el transceptor introduzca señales de radiofrecuencia en la red de suministro eléctrico, se emplea:",
    "options": [
      "Blindaje por apantallamiento",
      "El cable coaxial",
      "El acoplador de antena",
      "Filtro de línea de desacoplo"
    ],
    "correctIndex": 3,
    "explain": "El filtro de línea de desacoplo evita que RF del equipo entre en la red eléctrica doméstica. «Filtro de línea de desacoplo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q127",
    "part": 1,
    "topicId": "componentes",
    "stem": "¿Qué potencia se disipará en una resistencia de 30 ohmios por la que circula una corriente eléctrica de 2 amperios?",
    "options": [
      "30 vatios",
      "60 vatios",
      "120 vatios",
      "15 vatios"
    ],
    "correctIndex": 2,
    "explain": "En una resistencia, P = V·I = I²R = V²/R. Calcula V = I·R y luego la potencia disipada. «120 vatios». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q128",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La transferencia máxima de potencia entre dos circuitos se dará cuando:",
    "options": [
      "La antena esté bien despejada",
      "La antena esté puesta a tierra",
      "Exista adaptación de las impedancias",
      "Haya ondas estacionarias"
    ],
    "correctIndex": 2,
    "explain": "Potencia es energía por unidad de tiempo; en CC P = V·I. Identifica unidad y fórmula antes de elegir. «Exista adaptación de las impedancias».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q129",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La siguiente gráfica de espectro a la salida de un trasmisor corresponde a una señal con modulación de:",
    "stemFigure": "images/quiz/ure-p1-q129-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q129): La siguiente gráfica de espectro a la salida de un trasmisor corresponde a una señal con modulación de:",
    "options": [
      "Frecuencia",
      "Amplitud",
      "Banda lateral única",
      "Fase por portadora"
    ],
    "correctIndex": 1,
    "explain": "Cada instrumento mide una magnitud: potencia (vatímetro), forma de onda (osciloscopio), frecuencia (frecuencímetro) o espectro (analizador). «Amplitud».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q13",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Una antena dipolo doblado, en resonancia, presenta una impedancia respecto de la dipolo simple:",
    "options": [
      "Mayor",
      "Menor",
      "Igual",
      "Nula"
    ],
    "correctIndex": 0,
    "explain": "El dipolo doblado (folded) presenta en resonancia una impedancia de entrada mayor que el dipolo simple (del orden de cuatro veces en el centro). «Mayor».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q130",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "¿Para qué se ponen \"circuitos de filtrado\" en la salidas de las fuentes de alimentación?:",
    "options": [
      "Para impedir señales espúreas en la entrada de la fuente",
      "Para protección de los bobinados",
      "Para reducir el rizado de la señal de salida y obtener un valor más constante de esta",
      "Para igualar la señal de salida a la de entrada"
    ],
    "correctIndex": 2,
    "explain": "Tras el rectificador la salida de una fuente de alimentación tiene rizado (ripple); el filtro (condensadores, a veces inductores) lo atenúa para dejar una tensión de salida más estable. «Para reducir el rizado de la señal de salida y obtener un valor más constante de esta».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q131",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Modulación de señales radioeléctricas:",
    "options": [
      "La modulación AM hace variar la amplitud de la portadora",
      "La modulación AM hace variar fundamentalmente la frecuencia de la portadora",
      "La modulación AM ya no se utiliza",
      "Las siglas AM significan modulación de armónicos"
    ],
    "correctIndex": 0,
    "explain": "Modular es variar algún parámetro de la portadora (amplitud, frecuencia o fase) según la señal de información. «La modulación AM hace variar la amplitud de la portadora».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q132",
    "part": 1,
    "topicId": "componentes",
    "stem": "Cuando se conectan condensadores en paralelo, la capacidad resultante del conjunto es:",
    "options": [
      "La suma de las inversas de las capacidades individuales",
      "El producto de las capacidades individuales dividido por la suma de estas",
      "La mayor de las capacidades individuales",
      "La suma de las capacidades individuales"
    ],
    "correctIndex": 3,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «La suma de las capacidades individuales».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q133",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La sensibilidad de un receptor se define como:",
    "options": [
      "La facultad que tiene para seleccionar una determinada señal y separarla de las restantes",
      "La capacidad que tiene de captar señales débiles y amplificarlas",
      "La propiedad por la que reproduce la modulación emitida sin distorsión",
      "No es correcta ninguna de las anteriores respuestas"
    ],
    "correctIndex": 1,
    "explain": "Selectividad separa señales cercanas; sensibilidad detecta señales débiles; el ruido limita el umbral mínimo. «La capacidad que tiene de captar señales débiles y amplificarlas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q134",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Dados dos receptores, A y B, con las siguientes curvas de respuesta en amplitud para cada uno de ellos, a una Frecuencia Intermedia de 455 kHz, se puede afirmar que:",
    "options": [
      "El receptor B es más selectivo que el receptor A",
      "El receptor A es más selectivo que el receptor B",
      "El receptor A es más sensible que el receptor B",
      "El receptor B es más estable que el receptor A"
    ],
    "correctIndex": 1,
    "explain": "En superheterodino el mezclador con oscilador local traslada la señal a una FI fija para filtrar y amplificar con estabilidad. «El receptor A es más selectivo que el receptor B».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q135",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Si a la entrada de un mezclador se aplican las frecuencias 14 MHz y 4 MHz, indique qué frecuencia dará a la salida:",
    "options": [
      "14.4 MHz",
      "1 MHz",
      "200 MHz",
      "10 MHz",
      "",
      "",
      "",
      ""
    ],
    "correctIndex": 3,
    "explain": "En superheterodino el mezclador con oscilador local traslada la señal a una FI fija para filtrar y amplificar con estabilidad. «10 MHz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q136",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Los transmisores de VHF en radioafición se utilizan normalmente:",
    "options": [
      "Para cualquier distancia",
      "Para distancias muy largas",
      "Para distancias cortas",
      "No se pueden utilizar"
    ],
    "correctIndex": 2,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Para distancias cortas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q137",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El mando NB de un transceptor sirve para:",
    "options": [
      "Seleccionar las señales moduladas en AM",
      "Suprimir ruidos impulsivos",
      "Suprimir ruidos de emisoras no deseadas",
      "Anula la salida del receptor cuando se recibe una señal con ruido muy alto"
    ],
    "correctIndex": 1,
    "explain": "NB (noise blanker) atenúa ruidos impulsivos en recepción; no es el silenciador por falta de señal (squelch). «Suprimir ruidos impulsivos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q138",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "¿A qué se le conoce como \"dipolo con trampas\"?:",
    "options": [
      "Una partícula mal imantada",
      "Un dipolo de onda completa",
      "Una antena dipolo con circuitos resonantes instalados simétricamente, en cada rama, desde el centro, para su utilización en una banda de frecuencias más amplia",
      "Una varilla con varios tramos"
    ],
    "correctIndex": 2,
    "explain": "Las trampas en un dipolo permiten resonar en varias bandas sin cambiar de antena físicamente. «Una antena dipolo con circuitos resonantes instalados simétricamente, en cada rama, desde el centro, para su utilización en una banda de frecuencias más amplia»."
  },
  {
    "id": "ure-p1-q139",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Se conoce como \"frecuencia de corte\" de una guía de onda a:",
    "options": [
      "La frecuencia por debajo de la cual no es posible la transmisión en la guía de onda",
      "La frecuencia máxima de la transmisión",
      "La frecuencia intermedia",
      "La frecuencia con la que debe cortarse la guía para la transmisión"
    ],
    "correctIndex": 0,
    "explain": "Relación clave: λ = c/f (en vacío c ≈ 3·10⁸ m/s) o λ = v/f en un medio. «La frecuencia por debajo de la cual no es posible la transmisión en la guía de onda».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q14",
    "part": 1,
    "topicId": "componentes",
    "stem": "La capacidad de un condensador depende:",
    "options": [
      "De la tensión en sus extremos y de la corriente que lo atraviesa",
      "De la geometría y disposición de sus placas además de la naturaleza del dieléctrico",
      "Del material dieléctrico de los conductores que forman las placas",
      "De la potencia que disipa en corriente continúa"
    ],
    "correctIndex": 1,
    "explain": "La capacidad indica cuánta carga puede almacenar un condensador; en el SI la unidad es el faradio (F), con submúltiplos µF, nF o pF. «De la geometría y disposición de sus placas además de la naturaleza del dieléctrico».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q140",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "El siguiente diagrama de radiación corresponde a una antena tipo:",
    "stemFigure": "images/quiz/ure-p1-q140-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q140): El siguiente diagrama de radiación corresponde a una antena tipo:",
    "options": [
      "Omnidireccional",
      "Dipolo",
      "Directiva",
      "Isotrópica"
    ],
    "correctIndex": 2,
    "explain": "El diagrama presenta un lóbulo principal estrecho y lóbulos secundarios pequeños: patrón de antena directiva. Omnidireccional sería casi circular en el plano horizontal. «Directiva».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q142",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Las antenas Yagi:",
    "options": [
      "Son directivas",
      "Son omnidireccionales",
      "Solo tienen reflector y dipolo",
      "Solo tienen dipolo y directores"
    ],
    "correctIndex": 0,
    "explain": "Antenas directivas concentran radiación; Yagi usa reflector y directores, parabólicas enfocan por apertura. «Son directivas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q143",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La propagación radioeléctrica por onda de superficie:",
    "options": [
      "Se emplea para cualquier enlace radioeléctrico a excepción de los enlaces satélites",
      "La señal radioeléctrica se propaga siguiendo la curvatura terrestre",
      "Sólo se emplea para trayectos marítimos",
      "Es el medio de propagación característico en las grandes ciudades"
    ],
    "correctIndex": 1,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «La señal radioeléctrica se propaga siguiendo la curvatura terrestre»."
  },
  {
    "id": "ure-p1-q147",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Las radiaciones espurias de los transmisores:",
    "options": [
      "Son aquellas que no molestan a otros receptores",
      "Se anularán cuando la frecuencia de trabajo sea inferior a 30 MHz",
      "Deben estar 40 dB por debajo de la frecuencia fundamental",
      "Para frecuencias inferiores a 30 MHz se atenuaran al menos 40 dB"
    ],
    "correctIndex": 3,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Para frecuencias inferiores a 30 MHz se atenuaran al menos 40 dB».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q148",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En la siguiente gráfica de la pantalla de un osciloscopio, se puede afirmar que:",
    "stemFigure": "images/quiz/ure-p1-q148-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q148): En la siguiente gráfica de la pantalla de un osciloscopio, se puede afirmar que:",
    "options": [
      "A es la frecuencia y B es la amplitud de la señal",
      "A es el período y B es la amplitud de la señal",
      "A es la amplitud y B es la potencia de la señal",
      "A es la amplitud y B es el periodo de la señal"
    ],
    "correctIndex": 3,
    "explain": "En la traza del osciloscopio, A es la altura pico a pico (amplitud) y B la distancia entre dos picos iguales sucesivos (periodo T=1/f). No confundir periodo con frecuencia en Hz. «A es la amplitud y B es el periodo de la señal».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q149",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En relación con las baterías es correcto afirmar que:",
    "options": [
      "No se pueden conectar en serie",
      "Sólo se pueden conectar en paralelo",
      "La tensión de un conjunto conectadas en serie es la suma de las tensiones de cada una de ellas",
      "Transforman la energía eléctrica en magnética"
    ],
    "correctIndex": 2,
    "explain": "En serie las tensiones de cada pila o batería se suman; en paralelo se suman capacidades de corriente manteniendo la misma tensión nominal. «La tensión de un conjunto conectadas en serie es la suma de las tensiones de cada una de ellas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q15",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Existen varias clases de amplificadores, A, B, AB y C:",
    "options": [
      "El de clase AB es una combinación de A y B",
      "El de clase A amplifica la señal en medio ciclo",
      "El de clase B ya no se utiliza",
      "El de clase A tiene una distorsión elevada"
    ],
    "correctIndex": 0,
    "explain": "Clase A conduce todo el ciclo (lineal, ineficiente); B/AB/C recortan conducción para mayor eficiencia en RF. «El de clase AB es una combinación de A y B».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q150",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La velocidad de propagación de las ondas electromagnéticas en el vacio es de:",
    "options": [
      "300.000 km/s",
      "300.000 km/h",
      "300.000 m/s",
      "300.000 m/h"
    ],
    "correctIndex": 0,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «300.000 km/s».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q16",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El margen dinámico de un receptor queda determinado fundamentalmente en:",
    "options": [
      "El primer mezclador de entrada",
      "El oscilador local",
      "El demodulador",
      "El amplificador de audiofrecuencia"
    ],
    "correctIndex": 0,
    "explain": "RF significa radiofrecuencia. El margen dinámico suele quedar limitado en las primeras etapas de RF y mezcla, donde aparecen compresión e intermodulación. IP3 es el punto de intercepción de tercer orden, una medida usada para valorar esa intermodulación.",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q17",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Las etapas desde la antena hasta el altavoz de un receptor superheterodino son por el siguiente orden:",
    "options": [
      "Mezclador, limitador, detector, amplificador de RF, amplificador de audio",
      "Amplificador RF, mezclador, amplificador de FI, demodulador, amplificador de audio",
      "Detector, limitador, amplificador de RF, mezclador, amplificador de audio",
      "Amplificador de FI, detector, mezclador, amplificador de audio"
    ],
    "correctIndex": 1,
    "explain": "En un superheterodino la señal pasa: antena → amplificador RF → mezclador (+ oscilador) → amplificador FI → demodulador → audio. Ese es el flujo estándar del temario. «Amplificador RF, mezclador, amplificador de FI, demodulador, amplificador de audio».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q18",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "El acoplador de antena se emplea para:",
    "options": [
      "Adaptar la impedancia de la etapa final de potencia a la línea de transmisión y antena",
      "Acoplar la antena a la modulación empleada por el transmisor",
      "Limitar el desplazamiento doppler de la señal transmitida",
      "Anular las pérdidas de la línea de transmisión entre la etapa final de potencia y la antena"
    ],
    "correctIndex": 0,
    "explain": "El acoplador adapta impedancias entre transmisor y línea o antena para minimizar reflexiones. «Adaptar la impedancia de la etapa final de potencia a la línea de transmisión y antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q181",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La unidad de potencia eléctrica es:",
    "options": [
      "El amperio",
      "El voltio",
      "El decibelio",
      "El vatio"
    ],
    "correctIndex": 3,
    "explain": "Potencia es energía por unidad de tiempo; en CC P = V·I. Identifica unidad y fórmula antes de elegir. «El vatio».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q182",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "¿Cuál es el tipo de conductor más inmune a las interferencias radiadas?:",
    "options": [
      "Fibra óptica",
      "Cable coaxial",
      "Cable paralelo",
      "Hilo de cobre desnudo"
    ],
    "correctIndex": 0,
    "explain": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q183",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Un termistor de tipo NTC es:",
    "options": [
      "Un transistor con alto coeficiente de temperatura",
      "Un diodo rectificador para circuitos de corriente elevada",
      "Una resistencia cuyo valor se reduce a medida que la temperatura aumenta",
      "Un divisor de tensión en función de la temperatura externa"
    ],
    "correctIndex": 2,
    "explain": "NTC: la resistencia baja cuando sube la temperatura (coeficiente negativo). PTC hace lo contrario. «Una resistencia cuyo valor se reduce a medida que la temperatura aumenta».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q184",
    "part": 1,
    "topicId": "componentes",
    "stem": "¿Qué es un diodo?",
    "options": [
      "Elemento que filtra la corriente eléctrica",
      "Dispositivo que permite el paso de la corriente eléctrica en un sólo sentido",
      "Componente eléctrico que elimina espurias",
      "Dispositivo limitador de potencia"
    ],
    "correctIndex": 1,
    "explain": "El diodo de estado sólido conduce preferentemente en un sentido y bloquea en el otro. «Dispositivo que permite el paso de la corriente eléctrica en un sólo sentido».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q185",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La velocidad de propagación de las ondas electromagnéticas siempre es igual a:",
    "options": [
      "La frecuencia dividida por la longitud de onda",
      "La longitud de onda dividida por la frecuencia",
      "La longitud de onda multiplicada por la frecuencia",
      "300.000 Km/seg"
    ],
    "correctIndex": 2,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «La longitud de onda multiplicada por la frecuencia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q186",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Se denomina rendimiento de un transmisor:",
    "options": [
      "La relación entre la potencia entregada y la reflejada",
      "La capacidad de detectar señales cercanas al nivel de ruido",
      "La relación entre la potencia entregada al sistema radiante y la consumida",
      "Al valor correspondiente al 99% de la potencia emitida por el transmisor"
    ],
    "correctIndex": 2,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «La relación entre la potencia entregada al sistema radiante y la consumida».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q187",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "El factor de calidad Q de un circuito, es la relación que hay entre la frecuencia de resonancia f y su ancho de banda B y se expresa con la fórmula:",
    "options": [
      "Q=f/B",
      "Q=f.B2",
      "Q=f.B",
      "Q=B/f"
    ],
    "correctIndex": 0,
    "explain": "Al estrechar el ancho de banda del receptor se filtran más señales fuera del canal deseado; suele aumentar la selectividad. «Q=f/B».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q188",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Se conoce como \"selectividad\" de un receptor:",
    "options": [
      "El grado de selección efectuado en la fabricación",
      "El número de bandas de frecuencia que puede seleccionar",
      "La capacidad que tiene para separar dos señales de frecuencias próximas",
      "La diferencia que existe entre la señal sintonizada y el ruido"
    ],
    "correctIndex": 2,
    "explain": "Selectividad separa señales cercanas; sensibilidad detecta señales débiles; el ruido limita el umbral mínimo. «La capacidad que tiene para separar dos señales de frecuencias próximas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q189",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Una antena YAGI es:",
    "options": [
      "Rómbica",
      "Directiva",
      "Vertical con plano de tierra",
      "Parabólica"
    ],
    "correctIndex": 1,
    "explain": "Antenas directivas concentran radiación; Yagi usa reflector y directores, parabólicas enfocan por apertura. «Directiva».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q19",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "¿A qué se suele llamar \"frecuencias imagen\" en un receptor?:",
    "options": [
      "A las frecuencias portadoras de las imágenes",
      "A las frecuencias dos veces mayor que las intermedias, por encima y por debajo de las frecuencias centrales originales",
      "A las partes imaginarias de las frecuencias",
      "A las simetrías de de cada frecuencia"
    ],
    "correctIndex": 1,
    "explain": "Las frecuencias imagen aparecen en superheterodinos por el mezclado (portadora ± FI); deben filtrarse en FI. «A las frecuencias dos veces mayor que las intermedias, por encima y por debajo de las frecuencias centrales originales».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q190",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Se denomina receptor superheterodino de doble conversión al:",
    "options": [
      "Receptor con dos frecuencias intermedias independientes",
      "Receptor con dos circuitos limitadores",
      "Receptor con dos entradas de antenas",
      "Receptor con dos amplificadores de RF"
    ],
    "correctIndex": 0,
    "explain": "En superheterodino el mezclador con oscilador local traslada la señal a una FI fija para filtrar y amplificar con estabilidad. «Receptor con dos frecuencias intermedias independientes».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q191",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La anchura de banda necesaria de un transmisor:",
    "options": [
      "Es la máxima anchura de banda permitida al transmisor",
      "Es la necesaria para lograr transmitir a la máxima distancia",
      "Es la suficiente para permitir la transmisión a la velocidad y calidad requeridas",
      "Es aquella que contiene el 99% de la potencia emitida por el transmisor"
    ],
    "correctIndex": 2,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Es la suficiente para permitir la transmisión a la velocidad y calidad requeridas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q192",
    "part": 1,
    "topicId": "componentes",
    "stem": "Los condensadores de tipo electrolítico:",
    "options": [
      "Deben conectarse respetando la polaridad indicada",
      "Varían su capacidad en función de la tensión aplicada",
      "Se utilizan en las fuentes de alimentación para rectificar la tensión alterna",
      "Funcionan por el principio de electrólisis"
    ],
    "correctIndex": 0,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «Deben conectarse respetando la polaridad indicada».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q193",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Se denomina frecuencia intermedia (FI) a:",
    "options": [
      "La frecuencia empleada en los receptores de conversión directa",
      "La frecuencia comprendida entre la inferior y la superior de las sintonizadas",
      "La frecuencia de trabajo del oscilador local",
      "La frecuencia de valor constante utilizada en los receptores superheterodinos"
    ],
    "correctIndex": 3,
    "explain": "En superheterodino el mezclador con oscilador local traslada la señal a una FI fija para filtrar y amplificar con estabilidad. «La frecuencia de valor constante utilizada en los receptores superheterodinos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q194",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "El ancho del haz de la antena:",
    "options": [
      "Es la separación angular entre dos puntos de potencia radiada la mitad de la máxima",
      "Es una unidad que se expresa en dB",
      "No existe",
      "Suele valer 13 dB"
    ],
    "correctIndex": 0,
    "explain": "El ancho de haz es la apertura angular entre puntos de referencia del diagrama; antenas más directivas tienen haz más estrecho. «Es la separación angular entre dos puntos de potencia radiada la mitad de la máxima».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q195",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En una onda electromagnética, ¿qué caracteriza su polarización?",
    "options": [
      "La dirección del campo eléctrico",
      "La dirección de propagación",
      "La potencia del transmisor",
      "La carga atmosférica del camino recorrido por la onda"
    ],
    "correctIndex": 0,
    "explain": "Las ondas EM combinan campo eléctrico y magnético; la luz y la RF son el mismo fenómeno a distinta frecuencia. «La dirección del campo eléctrico».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q197",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Si se desea medir la frecuencia de un transmisor no se puede emplear:",
    "options": [
      "Un osciloscopio",
      "Un voltímetro de radiofrecuencia",
      "Un analizador del espectro radioeléctrico",
      "Un frecuencímetro"
    ],
    "correctIndex": 1,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Un voltímetro de radiofrecuencia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q198",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La potencia de pico de un transmisor con modulación de amplitud es siempre:",
    "options": [
      "Constante",
      "Inferior a la potencia media del transmisor",
      "Superior a la potencia media del transmisor",
      "Igual a la potencia media del transmisor"
    ],
    "correctIndex": 2,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Superior a la potencia media del transmisor».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q199",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Los armónicos son:",
    "options": [
      "Batidos de frecuencias indeseadas",
      "Múltiplos de la frecuencia fundamental",
      "Interferencia indeseadas",
      "La energía de radiofrecuencia que retorna por el cable de bajada"
    ],
    "correctIndex": 1,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Múltiplos de la frecuencia fundamental»."
  },
  {
    "id": "ure-p1-q2",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El filtro de salida de un transmisor:",
    "options": [
      "Elimina las frecuencias no deseadas",
      "Limita la amplitud de la señal transmitida",
      "Permite mantener una relación señal ruido constante",
      "Elimina la portadora en los transmisores de banda lateral única"
    ],
    "correctIndex": 0,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Elimina las frecuencias no deseadas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q20",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Una antena es resonante si:",
    "options": [
      "La línea de alimentación y el transmisor tienen la misma impedancia",
      "Entre el transmisor y la antena se sitúa un acoplador de antenas",
      "La ganancia y la directividad son iguales",
      "La impedancia en el punto de alimentación es resistiva pura"
    ],
    "correctIndex": 3,
    "explain": "En resonancia la reactancia se anula: la impedancia de alimentación es prácticamente resistiva pura. Fuente: URE (práctica web).",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q202",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La ganancia de una antena se puede expresar en:",
    "options": [
      "dBm",
      "dBW",
      "dBV",
      "dB"
    ],
    "correctIndex": 3,
    "explain": "La ganancia de una antena se expresa en decibelios (dB) respecto a un dipolo (dBd) o a una isótropa (dBi). «dB».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q203",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Un medidor de Relación de Ondas Estacionarias (R.O.E.):",
    "options": [
      "Mide la robustez del equipo",
      "Mide el rizado de la señal transmitida",
      "Mide la relación entre la señal incidente en la antena y la reflejada por ésta",
      "No existe"
    ],
    "correctIndex": 2,
    "explain": "ROE significa relación de ondas estacionarias; SWR es su sigla inglesa. Compara la onda incidente con la reflejada en la línea/antena. Si la adaptación es mala, aumenta la potencia reflejada y sube la ROE."
  },
  {
    "id": "ure-p1-q204",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Para medir intensidad del campo eléctrico se utilizan unidades de:",
    "options": [
      "dBV",
      "dBW",
      "dBV/m",
      "dBW/ m2"
    ],
    "correctIndex": 2,
    "explain": "En corriente continua, V = I·R y P = V·I son las relaciones base del examen. La magnitud o fórmula correcta aquí es «dBV/m».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q205",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "¿Qué es el \"fading\"?:",
    "options": [
      "La alimentación del transmisor",
      "El desvanecimiento transitorio de una señal electromagnética que se propaga",
      "La capacidad del receptor para reconocer señales débiles",
      "La acción de sintonizar una determinada estación"
    ],
    "correctIndex": 1,
    "explain": "El fading es variación rápida de nivel por multipath o propagación; no es armónico ni selectividad. «El desvanecimiento transitorio de una señal electromagnética que se propaga».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q21",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En una transmisión radioeléctrica, ¿se atenúan las ondas por la propagación?:",
    "options": [
      "No, nunca",
      "A veces",
      "Sí, siempre",
      "Sólo se atenúan si hay lluvia"
    ],
    "correctIndex": 2,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «Sí, siempre».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q22",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Un generador de señal de radiofrecuencia se utiliza para:",
    "options": [
      "Medir la tensión de radiofrecuencia",
      "Medir la corriente de radiofrecuencia",
      "Caracterizar etapas de radiofrecuencia",
      "Recibir en banda lateral única"
    ],
    "correctIndex": 2,
    "explain": "Las ondas EM combinan campo eléctrico y magnético; la luz y la RF son el mismo fenómeno a distinta frecuencia. «Caracterizar etapas de radiofrecuencia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q23",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El silenciador (squelch) de un receptor permite:",
    "options": [
      "Mantener constante el nivel de la señal demodulada",
      "Mejorar el factor de ruido",
      "Suprimir el audio si no hay señal de RF",
      "Aumentar la selectividad del receptor"
    ],
    "correctIndex": 2,
    "explain": "El CAG/AGC ajusta ganancia para mantener nivel de audio ante señales fuertes o débiles; no cambia la frecuencia sintonizada. «Suprimir el audio si no hay señal de RF».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q239",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Cuando la impedancia de la antena, de la línea de transmisión y de salida del emisor, coinciden:",
    "options": [
      "Se transfiere la máxima energía a la antena",
      "La corriente que circula es cero",
      "Su impedancia dependerá de la altura",
      "Habrá que adaptarla con un balun relación 1:1"
    ],
    "correctIndex": 0,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «Se transfiere la máxima energía a la antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q24",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un amperio es la intensidad de corriente que corresponde al paso por un conductor, durante un segundo, de una carga de un culombio.",
    "options": [
      "No es correcto",
      "Es correcto",
      "Sólo a 0 grados centígrados",
      "Es imposible"
    ],
    "correctIndex": 1,
    "explain": "La cantidad de electricidad (carga) se mide en culombios (C), no en amperios ni vatios. «Es correcto».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q240",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En los modernos transceptores el uso de procesadores digitales de señal (DSP) permite entre otras cosas:",
    "options": [
      "Duplicar la potencia de emisión",
      "Optimizar los filtros del transceptor",
      "Disminuir la potencia reflejada en la línea de transmisión",
      "Incrementar el tiempo de transmisión sin calentamiento del equipo"
    ],
    "correctIndex": 1,
    "explain": "DSP significa procesador digital de señal. En un transceptor permite aplicar filtros digitales, reducción de ruido y procesado avanzado de recepción/transmisión; no aumenta por sí mismo la potencia ni elimina la ROE."
  },
  {
    "id": "ure-p1-q241",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Un dieléctrico es:",
    "options": [
      "Un buen conductor",
      "Semiconductor",
      "Un aislante",
      "Un condensador con polaridad",
      "",
      "",
      "",
      ""
    ],
    "correctIndex": 2,
    "explain": "Un dieléctrico es un material aislante que puede almacenar carga en un condensador (constante dieléctrica ε). «Un aislante».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q242",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La diferencia de potencial eléctrico se mide en:",
    "options": [
      "Vatios",
      "Faradios",
      "Microfaradios",
      "Voltios"
    ],
    "correctIndex": 3,
    "explain": "Potencia es energía por unidad de tiempo; en CC P = V·I. Identifica unidad y fórmula antes de elegir. «Voltios».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q243",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Para evitar interferencias en los altavoces de un equipo de baja frecuencia, se debe:",
    "options": [
      "Utilizar para su conexión cable de igual longitud de onda que la señal interferente",
      "Conectar a masa los terminales del altavoz",
      "Conectar un diodo detector entre los terminales del altavoz",
      "Utilizar para su conexión cable blindado"
    ],
    "correctIndex": 3,
    "explain": "Relación clave: λ = c/f (en vacío c ≈ 3·10⁸ m/s) o λ = v/f en un medio. «Utilizar para su conexión cable blindado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q244",
    "part": 1,
    "topicId": "componentes",
    "stem": "En un circuito con dos resistencias en paralelo, la intensidad total será:",
    "options": [
      "La suma de las caídas de tensión",
      "La misma que la que circule por la rama con la menor resistencia",
      "La misma que la que circule por la rama con la mayor resistencia",
      "La suma de las intensidades de cada una de las ramas"
    ],
    "correctIndex": 3,
    "explain": "R disipa energía; PTC sube R con temperatura y NTC la baja. «La suma de las intensidades de cada una de las ramas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q245",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Las ondas de radio son de naturaleza:",
    "options": [
      "Eléctrica",
      "Magnética",
      "Electromagnética",
      "Acústica"
    ],
    "correctIndex": 2,
    "explain": "Las ondas de radio son ondas electromagnéticas que se propagan en el espacio sin medio material. «Electromagnética»."
  },
  {
    "id": "ure-p1-q246",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Si se reduce la sección de un conductor:",
    "options": [
      "La resistencia eléctrica aumenta",
      "La resistencia eléctrica disminuye",
      "Disminuye la temperatura del conductor",
      "Aumenta el número de átomos por centímetro cuadrado"
    ],
    "correctIndex": 0,
    "explain": "La resistencia depende de resistividad, longitud y sección: R = ρ·L/S. La pareja proporcional del enunciado es «La resistencia eléctrica aumenta».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q247",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Una etapa de frecuencia intermedia en un receptor superheterodino, básicamente, se compone de:",
    "options": [
      "Atenuadores y mezcladores",
      "Osciladores y conversores de tensión",
      "Demoduladores y redes inductivas",
      "Amplificadores y filtros"
    ],
    "correctIndex": 3,
    "explain": "En superheterodino el mezclador con oscilador local traslada la señal a una FI fija para filtrar y amplificar con estabilidad. «Amplificadores y filtros».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q248",
    "part": 1,
    "topicId": "componentes",
    "stem": "En un circuito electrónico, un transistor no se puede emplear como:",
    "options": [
      "Amplificador",
      "Oscilador",
      "Mezclador",
      "Balun"
    ],
    "correctIndex": 3,
    "explain": "Transistores amplifican o conmutan con corriente de base/puerta; la clase de polarización define linealidad y eficiencia. «Balun».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q249",
    "part": 1,
    "topicId": "componentes",
    "stem": "Una resistencia en SHUNT irá colocada:",
    "options": [
      "En serie",
      "En mixto con otra en serie",
      "En paralelo",
      "Nunca podrá conectarse una resistencia en SHUNT"
    ],
    "correctIndex": 2,
    "explain": "La resistencia shunt va en paralelo con el galvanómetro para derivar corriente y ampliar el rango del amperímetro. «En paralelo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q25",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un diodo varicap equivale a:",
    "options": [
      "Un rectificador variable",
      "Una bobina de inducción ajustable",
      "Un condensador variable controlado por tensión",
      "Un filtro de frecuencia de corte variable"
    ],
    "correctIndex": 2,
    "explain": "El varicap se comporta como condensador variable controlado por la tensión inversa aplicada. «Un condensador variable controlado por tensión».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q250",
    "part": 1,
    "topicId": "componentes",
    "stem": "A la frecuencia de resonancia las reactancias inductiva y capacitiva de un circuito se igualan, el cuadrado de esta frecuencia es:",
    "options": [
      "Directamente proporcional a la inductancia de la bobina",
      "Directamente proporcional a la capacidad del condensador",
      "Inversamente proporcional al producto de la inductancia de la bobina por la capacidad del condensador",
      "Cero"
    ],
    "correctIndex": 2,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «Inversamente proporcional al producto de la inductancia de la bobina por la capacidad del condensador».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q251",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La etapa de detección de un receptor se emplea para:",
    "options": [
      "Mezclar la señal recibida",
      "Demodular la señal recibida",
      "Limitar la señal recibida",
      "Amplificar la señal recibida"
    ],
    "correctIndex": 1,
    "explain": "La etapa de detección (demodulador) extrae audio o datos de la portadora o FI ya filtrada. «Demodular la señal recibida».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q252",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En el siguiente esquema de un receptor, ¿que circuito incluiría en el cuadro con interrogantes al objeto de obtener un nivel de audio constante en el altavoz, independientemente del nivel de señal en antena?:",
    "stemFigure": "images/quiz/ure-p1-q252-original.jpg",
    "stemFigureAlt": "Figura original URE (ure-p1-q252): En el siguiente esquema de un receptor, ¿que circuito incluiría en el cuadro con interrogantes al objeto de obtener un n",
    "options": [
      "Control automático de ganancia",
      "Control automático de estabilidad",
      "Control automático de frecuencia",
      "Control automático de audio"
    ],
    "correctIndex": 0,
    "explain": "El enunciado pide nivel de audio constante pese a variaciones de señal en antena: es función del AGC (CAG), que regula la ganancia en RF/FI. CAF mantiene frecuencia; no es squelch. «Control automático de ganancia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q253",
    "part": 1,
    "topicId": "componentes",
    "stem": "El “Factor de calidad, Q” de un circuito resonante es:",
    "options": [
      "La relación que existe entre la frecuencia de resonancia de ese circuito y su ancho de banda",
      "Independiente de la frecuencia",
      "La relación entre la onda estacionaria y el ancho de banda del circuito",
      "Inexistente"
    ],
    "correctIndex": 0,
    "explain": "El factor Q mide la selectividad del resonador: a mayor Q, pico más estrecho y más selectividad. «La relación que existe entre la frecuencia de resonancia de ese circuito y su ancho de banda».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q254",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La lectura “10 dBµV”, es un valor de:",
    "options": [
      "Resistencia eléctrica",
      "Potencia eléctrica",
      "Intensidad de corriente eléctrica",
      "Tensión eléctrica"
    ],
    "correctIndex": 3,
    "explain": "Los decibelios expresan relaciones logarítmicas; dBm referencia potencia a 1 mW. La respuesta es «Tensión eléctrica»."
  },
  {
    "id": "ure-p1-q255",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Los transceptores con cambio de frecuencia de emisión, utilizan:",
    "options": [
      "Un oscilador de frecuencia variable",
      "Un amplificador de clase AB",
      "Filtros de cristal",
      "Redes de desplazamiento de fase"
    ],
    "correctIndex": 0,
    "explain": "QSY solicita o indica cambio de frecuencia de operación. «Un oscilador de frecuencia variable».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q257",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La sensibilidad de un receptor indica:",
    "options": [
      "El ancho de banda del preamplificador de RF",
      "Su capacidad para recibir señales débiles",
      "El máximo nivel de señal que puede recibir su antena",
      "Su capacidad para rechazar señales fuertes"
    ],
    "correctIndex": 1,
    "explain": "Selectividad separa señales cercanas; sensibilidad detecta señales débiles; el ruido limita el umbral mínimo. «Su capacidad para recibir señales débiles».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q258",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En una antena directiva tipo Yagui los elementos parásitos:",
    "options": [
      "Se conectan al cable de alimentación",
      "Necesitan un balun para su adaptación",
      "Proporcionan directividad",
      "Permiten aumentar el ancho de banda de emisión"
    ],
    "correctIndex": 2,
    "explain": "Una antena directiva concentra radiación o recepción en una dirección preferente. «Proporcionan directividad».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q259",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En una antena pasiva, se puede afirmar que:",
    "options": [
      "La ganancia es igual a la directividad",
      "La ganacia es superior a la directividad",
      "Los diagramas de radiación en transmisión y en recepción son iguales",
      "La impedancia es constante con la frecuencia"
    ],
    "correctIndex": 2,
    "explain": "Por reciprocidad, el diagrama de radiación de una antena pasiva es el mismo en transmisión y recepción. «Los diagramas de radiación en transmisión y en recepción son iguales»."
  },
  {
    "id": "ure-p1-q260",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "¿Qué banda de frecuencias presenta mejores condiciones para la propagación por reflexión ionosférica?",
    "options": [
      "HF",
      "UHF",
      "SHF",
      "EHF"
    ],
    "correctIndex": 0,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «HF».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q261",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "¿Qué se debería encontrar siempre antes de la toma de antena en un emisor?:",
    "options": [
      "Un interruptor",
      "El mezclador",
      "La etapa de potencia",
      "Un filtro paso bajo o paso banda"
    ],
    "correctIndex": 3,
    "explain": "Antes de la toma de antena suele haber protección o interruptor para seguridad y mantenimiento. «Un filtro paso bajo o paso banda».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q262",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Las bobinas conectadas en los extremos del dipolo de la figura permiten:",
    "stemFigure": "images/quiz/ure-p1-q262-original.jpg",
    "stemFigureAlt": "Figura original URE (ure-p1-q262): Las bobinas conectadas en los extremos del dipolo de la figura permiten:",
    "options": [
      "Aumentar la potencia de emisión",
      "Disminuir la longitud eléctrica de la antena",
      "Incrementar la longitud eléctrica de antena",
      "Evitar el uso del balun"
    ],
    "correctIndex": 2,
    "explain": "Un dipolo de media onda mide del orden de λ/2 en total; vertical de λ/4 necesita plano de tierra o radiales. «Incrementar la longitud eléctrica de antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q265",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "¿Qué valor de los siguientes corresponde a la “tensión eficaz” de la señal representada?:",
    "stemFigure": "images/quiz/ure-p1-q265-original.jpg",
    "stemFigureAlt": "Figura original URE (ure-p1-q265): ¿Qué valor de los siguientes corresponde a la “tensión eficaz” de la señal representada?:",
    "options": [
      "20 V",
      "7,071 V",
      "10 V",
      "3.14 V"
    ],
    "correctIndex": 1,
    "explain": "La onda sinusoidal de la figura tiene valor de pico 10 V; la tensión eficaz es Vrms = Vp/√2 ≈ 7,071 V. 10 V sería el pico, no la eficaz. «7,071 V».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q266",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La capacidad de que un sistema electrónico no produzca interferencias que comprometan su funcionamiento o que afecten a su entorno, se denomina:",
    "options": [
      "Fiabilidad y baja distorsión interferente",
      "Compatibilidad electromagnética",
      "AMC (Ambiente Medido y Comprobado)",
      "SLI (Sistema Libre de Interferencia)"
    ],
    "correctIndex": 1,
    "explain": "En condensadores en paralelo se suman capacidades; en serie la capacidad equivalente baja. En CC estable el condensador ideal equivale a circuito abierto. «Compatibilidad electromagnética».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q268",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En relación con los fusibles eléctricos de protección, es correcto afirmar que:",
    "options": [
      "Es recomendable instalarlos entre la emisora y el acoplador de antena",
      "Deben tener un valor nominal superior al máximo consumo previsto para el equipo",
      "Deben tener un valor nominal inferior al consumo máximo previsto para el equipo",
      "Solo se deben instalar los de tipo semiconductor"
    ],
    "correctIndex": 1,
    "explain": "La protección y la toma de tierra siguen reglas de seguridad eléctrica; no confundas con fusibles de línea. «Deben tener un valor nominal superior al máximo consumo previsto para el equipo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q299",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Si aumenta la temperatura en un conductor:",
    "options": [
      "Aumenta su resistencia eléctrica",
      "Mejora la conductancia",
      "Disminuye su resistencia eléctrica",
      "La resistencia eléctrica es inmune a los cambios de temperatura"
    ],
    "correctIndex": 0,
    "explain": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q3",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La capacidad de un receptor para separar señales de RF de frecuencias muy próximas se denomina:",
    "options": [
      "Figura de ruido",
      "Sensibilidad",
      "Selectividad",
      "Modulación cruzada"
    ],
    "correctIndex": 2,
    "explain": "La selectividad permite separar señales de frecuencias muy próximas; la sensibilidad es captar señales débiles. «Selectividad».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q301",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El riesgo de producir interferencias, al aumentar la potencia de transmisión, es:",
    "options": [
      "Mayor",
      "Menor",
      "Igual",
      "No existe"
    ],
    "correctIndex": 0,
    "explain": "A mayor potencia de transmisión aumenta la probabilidad de interferir a otros receptores si no hay filtros, ubicación y buenas prácticas. «Mayor».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q303",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El control automático de ganancia (CAG) en un receptor tiene como objetivo:",
    "options": [
      "Mantener constante la amplitud de la señal de salida",
      "Anular el control de volumen",
      "Ajustar el nivel del silenciador",
      "Mantener constante el valor de la frecuencia intermedia"
    ],
    "correctIndex": 0,
    "explain": "El CAG/AGC ajusta ganancia para mantener nivel de audio ante señales fuertes o débiles; no cambia la frecuencia sintonizada. «Mantener constante la amplitud de la señal de salida».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q304",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un Kiloohmio equivale a:",
    "options": [
      "Cien ohmios",
      "Mil ohmios",
      "Un Megaohmio",
      "Diez mil ohmios"
    ],
    "correctIndex": 1,
    "explain": "Kilo = 10³ y mega = 10⁶; un kiloohmio son 1000 Ω y un megaohmio son 10⁶ Ω. La equivalencia del enunciado es «Mil ohmios».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q305",
    "part": 1,
    "topicId": "componentes",
    "stem": "El valor de la tolerancia de una resistencia viene indicada por la:",
    "options": [
      "Primera línea de color",
      "Segunda línea de color",
      "Tercera línea de color",
      "Cuarta línea de color"
    ],
    "correctIndex": 3,
    "explain": "En el código de colores, la tolerancia suele indicarse en la última banda (p. ej. oro ±5 %, plata ±10 %). «Cuarta línea de color».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q306",
    "part": 1,
    "topicId": "componentes",
    "stem": "En un transformador eléctrico, ¿qué se conoce como “relación de transformación”?:",
    "options": [
      "El tamaño del primario frente al secundario",
      "La relación entre las espiras mayores y las menores del primario",
      "La separación entre la entrada y la salida",
      "La relación entre el número de espiras del primario y el número de espiras del secundario"
    ],
    "correctIndex": 3,
    "explain": "En el transformador ideal V1/V2 = N1/N2; un núcleo ferromagnético aumenta el acoplamiento y la inductancia. «La relación entre el número de espiras del primario y el número de espiras del secundario».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q307",
    "part": 1,
    "topicId": "componentes",
    "stem": "¿Cual es la “condición de resonancia” para un circuito resonante?:",
    "options": [
      "Que se produzca un buen eco del sonido",
      "Que tenga dos bobinas iguales",
      "Que las impedancias capacitiva e inductiva se igualen",
      "Que el circuito sea de corriente continua"
    ],
    "correctIndex": 2,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «Que las impedancias capacitiva e inductiva se igualen».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q308",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "La característica de un filtro denominada como “frecuencia de corte” es:",
    "options": [
      "La frecuencia central del filtro",
      "El primer armónico de la frecuencia a la que el filtro deja de funcionar",
      "La frecuencia que delimita la banda de paso o no paso por el filtro",
      "Un dato irrelevante para el filtro"
    ],
    "correctIndex": 2,
    "explain": "Relación clave: λ = c/f (en vacío c ≈ 3·10⁸ m/s) o λ = v/f en un medio. «La frecuencia que delimita la banda de paso o no paso por el filtro».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q309",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Una batería eléctrica es un dispositivo que convierte:",
    "options": [
      "Energía química en potencial negativo",
      "Energía química en energía eléctrica",
      "Energía cinética en energía potencial",
      "Ninguna de las anteriores respuestas es válida"
    ],
    "correctIndex": 1,
    "explain": "Una pila o batería convierte energía química almacenada en energía eléctrica mediante reacciones en sus electrodos (FEM). Por eso la transformación correcta es «Energía química en energía eléctrica».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q311",
    "part": 1,
    "topicId": "componentes",
    "stem": "Una resistencia en SHUNT se puede utilizar para:",
    "options": [
      "Adaptar la impedancia de la etapa final",
      "Adaptar la impedancia de la antena",
      "Proteger aparatos de medida",
      "Nada de lo anterior"
    ],
    "correctIndex": 2,
    "explain": "La resistencia shunt va en paralelo con el galvanómetro para derivar corriente y ampliar el rango del amperímetro. «Proteger aparatos de medida»."
  },
  {
    "id": "ure-p1-q313",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La relación señal/ruido en un receptor:",
    "options": [
      "Es siempre igual a uno",
      "Es una característica del equipo indicativa de la calidad de este, que se expresa en decibelios (dB)",
      "No tiene sentido. En los receptores de alta calidad no hay ruido",
      "Depende de la potencia del equipo y se expresa en dBm"
    ],
    "correctIndex": 1,
    "explain": "Selectividad separa señales cercanas; sensibilidad detecta señales débiles; el ruido limita el umbral mínimo. «Es una característica del equipo indicativa de la calidad de este, que se expresa en decibelios (dB)».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q314",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Referido al parámetro “ROE” de una estación transmisora, señale la opción que es correcta:",
    "options": [
      "Debe ser cero",
      "Sirve para indicar el consumo de energía de la estación",
      "Es un indicador del grado de adaptación de impedancias entre el transmisor y la antena",
      "Cuanto mas elevado sea su valor, mayor rendimiento se obtiene en la transmisión"
    ],
    "correctIndex": 2,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «Es un indicador del grado de adaptación de impedancias entre el transmisor y la antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q316",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En el siguiente esquema de un transmisor de banda lateral única, ¿qué circuito incluiría en el cuadro con interrogantes al objeto de evitar la generación de interferencias?:",
    "stemFigure": "images/quiz/ure-p1-q316-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q316): En el siguiente esquema de un transmisor de banda lateral única, ¿qué circuito incluiría en el cuadro con interrogantes",
    "options": [
      "Control automático de frecuencia o CAF",
      "Control automático de ganancia o CAG",
      "Control automático de nivel o ALC",
      "Control automático de saturación o CAS"
    ],
    "correctIndex": 2,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Control automático de nivel o ALC».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q317",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿Hay alguna limitación para las radiaciones espurias en el servicio de radioaficionados, en la banda HF?:",
    "options": [
      "No hay limitaciones",
      "Sí, 40 dB por debajo de la potencia media, dentro de la anchura de banda necesaria y no superar el valor de 50 mW",
      "Sí, menor que 30 dBm",
      "Sólo cuando hay interferencias"
    ],
    "correctIndex": 1,
    "explain": "En la nomenclatura ITU, HF (High Frequency) designa el tramo aproximado de 3–30 MHz. Para este enunciado la respuesta correcta es «Sí, 40 dB por debajo de la potencia media, dentro de la anchura de banda necesaria y no superar el valor de 50 mW».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q319",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Decimos que hay sobremodulación, cuando:",
    "options": [
      "Se emiten 2 portadoras",
      "El volumen está al máximo",
      "El índice de modulación es inferior a 100%",
      "El índice modulación es superior al 100%"
    ],
    "correctIndex": 3,
    "explain": "Sobremodulación distorsiona la envolvente AM cuando el índice de modulación supera el límite lineal. «El índice modulación es superior al 100%».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q320",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "El máximo de radiación del diagrama de una antena vertical se produce:",
    "options": [
      "Hacia arriba",
      "En la dirección más despejada",
      "En el plano horizontal",
      "Hacia tierra"
    ],
    "correctIndex": 2,
    "explain": "La polarización de la antena debe alinearse con la de la onda para máxima transferencia. «En el plano horizontal».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q322",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En el siguiente esquema, el transmisor, la línea de alimentación y la antena tienen la misma impedancia a la frecuencia de trabajo, por lo que el vatímetro indicará que:",
    "stemFigure": "images/quiz/ure-p1-q322-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q322): En el siguiente esquema, el transmisor, la línea de alimentación y la antena tienen la misma impedancia a la frecuencia",
    "options": [
      "La potencia reflejada es cero",
      "La potencia directa es cero",
      "La potencia reflejada es igual a la potencia directa",
      "La potencia reflejada es superior a la potencia directa"
    ],
    "correctIndex": 0,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «La potencia reflejada es cero».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q323",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En que bandas de frecuencia predomina el modo de propagación por onda ionosférica:",
    "options": [
      "VHF",
      "HF",
      "UHF",
      "LF"
    ],
    "correctIndex": 1,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «HF».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q324",
    "part": 1,
    "topicId": "componentes",
    "stem": "Las resistencias conectadas:",
    "options": [
      "En serie, se restan",
      "En paralelo, se suman",
      "En mixto, no se pueden colocar",
      "En serie, la resistencia total siempre es mayor que cualquiera de ellas"
    ],
    "correctIndex": 3,
    "explain": "R disipa energía; PTC sube R con temperatura y NTC la baja. «En serie, la resistencia total siempre es mayor que cualquiera de ellas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q325",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En el siguiente diagrama de radiación de una antena, la diferencia en decibelios entre los puntos 1 y 2, se denomina:",
    "stemFigure": "images/quiz/ure-p1-q325-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q325): En el siguiente diagrama de radiación de una antena, la diferencia en decibelios entre los puntos 1 y 2, se denomina:",
    "options": [
      "Ganancia",
      "Relación delante-atrás",
      "Directividad",
      "Impedancia"
    ],
    "correctIndex": 1,
    "explain": "En diagramas polares, la relación delante-atrás compara el nivel de radiación del lóbulo principal (punto 1) frente al opuesto (punto 2), en dB. No es ganancia absoluta ni impedancia. «Relación delante-atrás».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q326",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "El siguiente circuito conectado entre el transmisor y la antena se utiliza como:",
    "stemFigure": "images/quiz/ure-p1-q326-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q326): El siguiente circuito conectado entre el transmisor y la antena se utiliza como:",
    "options": [
      "Limitador",
      "Discriminador",
      "Acoplador de antena",
      "Atenuador"
    ],
    "correctIndex": 2,
    "explain": "El circuito entre transmisor y antena con elementos L y C en π o T es un acoplador (antenna tuner) para adaptar impedancias y minimizar ROE. No es discriminador ni atenuador fijo. «Acoplador de antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q327",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Para medir la potencia de una señal eléctrica, se emplea un:",
    "options": [
      "Vatímetro",
      "Frecuencímetro",
      "Puente se resonancia",
      "Capacímetro"
    ],
    "correctIndex": 0,
    "explain": "Potencia es energía por unidad de tiempo; en CC P = V·I. Identifica unidad y fórmula antes de elegir. «Vatímetro».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q360",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Para evitar que un campo electromagnético externo interfiera al circuito electrónico de la figura se puede apantallar en una caja:",
    "stemFigure": "images/quiz/ure-p1-q360-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q360): Para evitar que un campo electromagnético externo interfiera al circuito electrónico de la figura se puede apantallar en",
    "options": [
      "De cualquier material con conexión a tierra",
      "Semiconductora a la frecuencia de la señal",
      "Aislante para evitar las corrientes de circulación",
      "Metálica, eléctricamente estanca y con conexión a tierra"
    ],
    "correctIndex": 3,
    "explain": "La caja de apantallamiento tipo jaula de Faraday debe ser conductora, continua y a tierra para derivar corrientes inducidas; aislante o grietas dejan pasar el campo externo. «Metálica, eléctricamente estanca y con conexión a tierra».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q361",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "El período de una corriente alterna es:",
    "options": [
      "El tiempo que tarda en empezar a circular la corriente",
      "El tiempo que está encendida una bombilla",
      "El tiempo que transcurre entre dos valores máximos consecutivos",
      "Siempre vale cero"
    ],
    "correctIndex": 2,
    "explain": "En CA sinusoidal distinguimos valor máximo, eficaz y periodo; el eficaz es el que equivale térmicamente a una continua. «El tiempo que transcurre entre dos valores máximos consecutivos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q362",
    "part": 1,
    "topicId": "componentes",
    "stem": "La oposición que presenta una bobina de inductancia L al paso de una corriente alterna se llama reactancia inductiva, y:",
    "options": [
      "Se expresa en hertzios",
      "Si la frecuencia es 0, su valor es 0",
      "Si la frecuencia es f, su valor es 2π / fL",
      "Siempre vale 1"
    ],
    "correctIndex": 1,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «Si la frecuencia es 0, su valor es 0».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q365",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Los osciladores a cristal de cuarzo generan una señal:",
    "options": [
      "De frecuencia muy estable",
      "Variable en función de la impedancia del circuito",
      "Poco estable no utilizándose en la actualidad",
      "Modulada en banda lateral única"
    ],
    "correctIndex": 0,
    "explain": "Osciladores generan portadora; PLL y DDS mejoran estabilidad y resolución de frecuencia. «De frecuencia muy estable».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q366",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La velocidad de propagación de las ondas electromagnéticas:",
    "options": [
      "En el vacío es menor que a través del aire",
      "Aumenta con la frecuencia",
      "Disminuye con la frecuencia",
      "Es constante en un determinado medio"
    ],
    "correctIndex": 3,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «Es constante en un determinado medio»."
  },
  {
    "id": "ure-p1-q367",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En una emisión de banda lateral única (SSB):",
    "options": [
      "Se tiene una sola banda lateral sin portadora",
      "Se tiene una única banda lateral más la portadora",
      "La portadora esta modulada en frecuencia",
      "La portadora está desfasada 180º respecto a la única banda lateral"
    ],
    "correctIndex": 0,
    "explain": "AM suele usar detector de envolvente; SSB/CW detector de producto; FM discriminador o equivalente de frecuencia. «Se tiene una sola banda lateral sin portadora».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q368",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En los equipos de radioaficionado, el modo de modulación conocido como NBFM (Narrow Band Frequency Modulation) ¿Qué excursión de frecuencia máxima permite?:",
    "options": [
      "12 kHz",
      "50 kHz",
      "150 kHz",
      "La 1 MHz"
    ],
    "correctIndex": 0,
    "explain": "NBFM significa Narrow Band Frequency Modulation, es decir, modulación de frecuencia de banda estrecha. En el material de examen español suele asociarse a una excursión o desviación máxima de 12 kHz frente a la FM ancha."
  },
  {
    "id": "ure-p1-q369",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La característica de un receptor conocida como CAG significa",
    "options": [
      "Control Automático de Ganancia",
      "Centro Automático de Gestión",
      "Control Automático de Gálibo",
      "Certificado de Alta Garantía"
    ],
    "correctIndex": 0,
    "explain": "El CAG/AGC ajusta ganancia para mantener nivel de audio ante señales fuertes o débiles; no cambia la frecuencia sintonizada. «Control Automático de Ganancia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q370",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "¿Qué clase de amplificador reproduce la señal de entrada con la mínima distorsión?:",
    "options": [
      "Clase B",
      "Clase A",
      "Clase C",
      "La distorsión es independiente de la clase de amplificador"
    ],
    "correctIndex": 1,
    "explain": "Clase A conduce todo el ciclo (lineal, ineficiente); B/AB/C recortan conducción para mayor eficiencia en RF. «Clase A».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q372",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La ganancia de una antena de 40 dB equivalen a una relación de:",
    "options": [
      "10000",
      "1000",
      "100",
      "40"
    ],
    "correctIndex": 0,
    "explain": "40 dB de ganancia equivalen a un factor de potencia de 10⁴ (10 elevado a 40/10). La relación numérica del banco es «10000».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q373",
    "part": 1,
    "topicId": "componentes",
    "stem": "La “relación de transformación” de un transformador de tensión depende de:",
    "options": [
      "El tamaño y el peso del mismo",
      "El dieléctrico utilizado",
      "La tensión de entrada",
      "El número de espiras del primario y del secundario"
    ],
    "correctIndex": 3,
    "explain": "En el transformador ideal V1/V2 = N1/N2; un núcleo ferromagnético aumenta el acoplamiento y la inductancia. «El número de espiras del primario y del secundario».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q375",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La región angular comprendida entre las dos líneas gruesas del siguiente diagrama de radiación de una antena, se denomina:",
    "stemFigure": "images/quiz/ure-p1-q375-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q375): La región angular comprendida entre las dos líneas gruesas del siguiente diagrama de radiación de una antena, se denomin",
    "options": [
      "Polarización",
      "Relación delante-atrás",
      "Ancho de haz de radiación",
      "Región de campo radiado"
    ],
    "correctIndex": 2,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «Ancho de haz de radiación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q376",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La forma más común de propagación en VHF y UHF es por:",
    "options": [
      "Onda de superficie",
      "Onda directa",
      "Onda ionosférica",
      "Onda reflejada"
    ],
    "correctIndex": 1,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «Onda directa»."
  },
  {
    "id": "ure-p1-q377",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Qué circuito, dentro del cuadro discontinuo, se emplea para conectar un cable coaxial a un dipolo:",
    "options": [
      "Condensador variable",
      "Filtro paso banda",
      "Aislante de porcelana",
      "Balun"
    ],
    "correctIndex": 3,
    "explain": "El balun adapta la línea coaxial (no balanceada) al dipolo (balanceado) y puede transformar impedancia. «Balun».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q378",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En que bandas de frecuencia predomina el modo de propagación por onda de superficie:",
    "options": [
      "VHF",
      "UHF",
      "MF",
      "HF"
    ],
    "correctIndex": 2,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «MF».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q379",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Si en el vatímetro de la figura conectado entre un transmisor y una antena, se observa la siguiente lectura de potencia directa y reflejada, se puede afirmar que:",
    "stemFigure": "images/quiz/ure-p1-q379-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q379): Si en el vatímetro de la figura conectado entre un transmisor y una antena, se observa la siguiente lectura de potencia",
    "options": [
      "El transmisor está adaptado a la antena",
      "El transmisor no está adaptado a la antena",
      "No existe onda estacionaria en la línea",
      "El valor de la R.O.E. es 1"
    ],
    "correctIndex": 1,
    "explain": "Potencia reflejada en el vatímetro indica desadaptación (ROE > 1): el transmisor no entrega toda la energía a la antena. «El transmisor no está adaptado a la antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q380",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Para determinar la desadaptación de impedancias entre el transmisor y la antena se usa:",
    "options": [
      "Un medidor de ROE",
      "Un osciloscopio",
      "Un amperímetro",
      "Un polímetro digital"
    ],
    "correctIndex": 0,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «Un medidor de ROE».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q381",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La aplicación más importante del osciloscopio consiste en:",
    "options": [
      "La representación gráfica de las formas de onda",
      "Determinar la anchura de banda",
      "Determinar la ROE",
      "Ser utilizado para comunicaciones de corta distancia"
    ],
    "correctIndex": 0,
    "explain": "El osciloscopio muestra señales en el dominio del tiempo (forma de onda), no el espectro en frecuencia. «La representación gráfica de las formas de onda».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q382",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Las interferencias son más frecuentes empleando:",
    "options": [
      "Modulación AM",
      "Antenas directivas",
      "Amplificadores lineales de potencia",
      "Receptores convencionales"
    ],
    "correctIndex": 2,
    "explain": "El enunciado del banco asocia aquí las interferencias a «Amplificadores lineales de potencia» frente a AM, antenas directivas o receptores convencionales. Contrastar con el temario URE.",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q385",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Un termistor PTC es aquel que:",
    "options": [
      "Su resistencia está en función de la corriente que la atraviesa",
      "Su valor aumenta con la temperatura",
      "Se usa como estabilizadora de corriente",
      "Su valor disminuye al aumentar la temperatura",
      "",
      "",
      "",
      ""
    ],
    "correctIndex": 1,
    "explain": "PTC: la resistencia sube con la temperatura; se usa en protección térmica. NTC baja con el calor. «Su valor aumenta con la temperatura».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q386",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "¿Qué es el denominado “squelch” de un equipo?:",
    "options": [
      "Un circuito para suprimir la salida de sonido de un receptor cuando la señal de entrada a este no supera un determinado nivel",
      "Un circuito amplificador para oír el sonido con mayor volumen que en la entrada",
      "Un circuito atenuador de la señal portadora que mejora la relación señal/ruido",
      "Un oscilador de cuarzo"
    ],
    "correctIndex": 0,
    "explain": "El CAG/AGC ajusta ganancia para mantener nivel de audio ante señales fuertes o débiles; no cambia la frecuencia sintonizada. «Un circuito para suprimir la salida de sonido de un receptor cuando la señal de entrada a este no supera un determinado nivel».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q387",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El siguiente esquema se puede emplear como receptor de:",
    "stemFigure": "images/quiz/ure-p1-q387-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q387): El siguiente esquema se puede emplear como receptor de:",
    "options": [
      "SSB y CW",
      "CW y FM",
      "AM y FM",
      "No se puede utilizar como receptor, al no disponer de etapa de frecuencia intermedia"
    ],
    "correctIndex": 0,
    "explain": "El esquema muestra mezclador y filtro de producto típicos de un receptor que demodula SSB y CW (telegrafía). No es un circuito solo FM ni un bloque inútil en el diagrama. «SSB y CW».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q415",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Una batería almacena energía eléctrica mediante un proceso:",
    "options": [
      "Químico",
      "Acústico",
      "Mecánico",
      "Fotovoltaico"
    ],
    "correctIndex": 0,
    "explain": "Energía en un condensador o resistencia se relaciona con V, I y tiempo según el elemento; revisa la fórmula del temario. «Químico».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q416",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "De la batería de un portátil, donde figure la siguiente inscripción “DC 7.4 v - 1500 mAh”, se puede afirmar que podrá proporcionar:",
    "options": [
      "7,4 voltios y 1,5 amperios durante una hora",
      "1,5 voltios y 7,4 amperios durante una hora",
      "7,4 voltios y 1500 amperios durante una hora",
      "7,4 voltios y 1500 amperios durante media hora"
    ],
    "correctIndex": 0,
    "explain": "7,4 V es la tensión nominal; 1500 mAh indica que puede entregar 1500 mA (1,5 A) durante una hora aproximadamente si la descarga es nominal (capacidad en miliamperios-hora). «7,4 voltios y 1,5 amperios durante una hora».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q417",
    "part": 1,
    "topicId": "componentes",
    "stem": "El amperímetro se debe conectar:",
    "options": [
      "En serie",
      "En paralelo",
      "Por medio de un transformador",
      "Con una carga artificial"
    ],
    "correctIndex": 0,
    "explain": "El amperímetro mide intensidad y debe ir en serie con la rama a medir; nunca en paralelo como un voltímetro. «En serie».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q418",
    "part": 1,
    "topicId": "componentes",
    "stem": "El valor de la resistencia total resultante de asociar varias resistencias en serie:",
    "options": [
      "Es mayor que el valor de cualquiera de las resistencias",
      "Es igual al valor de la mayor de las resistencias",
      "Es menor que cualquiera las resistencias",
      "Es igual al valor de la menor de las resistencias"
    ],
    "correctIndex": 0,
    "explain": "R disipa energía; PTC sube R con temperatura y NTC la baja. «Es mayor que el valor de cualquiera de las resistencias».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q419",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Unidades eléctricas:",
    "options": [
      "La intensidad se mide en voltios",
      "La tensión se mide en vatios",
      "Un culombio es igual al producto de un amperio por segundo",
      "La tensión se mide en amperios"
    ],
    "correctIndex": 2,
    "explain": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q420",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "El siguiente circuito eléctrico podría emplearse:",
    "stemFigure": "images/quiz/ure-p1-q420-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q420): El siguiente circuito eléctrico podría emplearse:",
    "options": [
      "Como receptor de AM a la frecuencia de resonancia del circuito LC",
      "Para nada, al no disponer de alimentación eléctrica",
      "Como amplificador a la frecuencia de resonancia del circuito LC",
      "Como oscilador a la frecuencia de resonancia del circuito LC"
    ],
    "correctIndex": 0,
    "explain": "El LC en paralelo con diodo forma un circuito resonante selectivo en la frecuencia de resonancia: puede actuar como receptor AM pasivo. No es amplificador ni oscilador alimentado. «Como receptor de AM a la frecuencia de resonancia del circuito LC».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q422",
    "part": 1,
    "topicId": "componentes",
    "stem": "En el siguiente esquema eléctrico el diodo está actuando como:",
    "stemFigure": "images/quiz/ure-p1-q422-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q422): En el siguiente esquema eléctrico el diodo está actuando como:",
    "options": [
      "Amplificador de tensión",
      "Detector de envolvente",
      "Filtro paso banda",
      "Rectificador de onda completa"
    ],
    "correctIndex": 1,
    "explain": "El diodo en serie con resistencia de carga y condensador rectifica y filtra la envolvente de una señal modulada: actúa como detector de envolvente, no como limitador. «Detector de envolvente».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q424",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En un receptor se denomina selectividad a:",
    "options": [
      "La mínima señal que puede recibir",
      "La capacidad de separar dos señales muy próximas en frecuencia",
      "El nivel de la señal del canal adyacente",
      "La capacidad de rechazar frecuencias superiores a la frecuencia intermedia"
    ],
    "correctIndex": 1,
    "explain": "Selectividad separa señales cercanas; sensibilidad detecta señales débiles; el ruido limita el umbral mínimo. «La capacidad de separar dos señales muy próximas en frecuencia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q425",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En un equipo transmisor con modulación de frecuencia (FM) la desviación máxima de frecuencia es 25 kHz y la frecuencia moduladora es 10 kHz. ¿Cuál es el valor del “índice de modulación” del equipo?:",
    "options": [
      "250",
      "15",
      "2´5",
      "35"
    ],
    "correctIndex": 2,
    "explain": "En FM, el índice de modulación β = Δf_máx / f_mod. Con Δf = 25 kHz y f_mod = 10 kHz, β = 2,5. «2´5».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q426",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "¿Cual es la impedancia de salida típica en los transmisores de radioaficionado?:",
    "options": [
      "1000 ohmios",
      "12´5 ohmios",
      "50 ohmios",
      "125 ohmios"
    ],
    "correctIndex": 2,
    "explain": "La geometría del sistema radiante y los radiales modifican la impedancia de entrada de la antena. «50 ohmios».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q427",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "¿Qué símbolo va asociado a la modulación de frecuencia en fonía?:",
    "options": [
      "PNP",
      "F3E",
      "F1F",
      "AM"
    ],
    "correctIndex": 1,
    "explain": "En fonía, la clase F3E designa emisión de voz en FM (modulación de frecuencia). A3E corresponde a AM con doble banda lateral. «F3E».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q428",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El mezclador de un emisor, combina dos frecuencias f1 y f2 , de tal manera que a su salida se encuentra, entre otras la frecuencia:",
    "options": [
      "f 1 ∙ f 2",
      "f 1 ∕ f 2",
      "f 1 + f 2",
      "(f 1 - f 2 ) ∕ (f 1 +f 2 )"
    ],
    "correctIndex": 2,
    "explain": "En superheterodino el mezclador con oscilador local traslada la señal a una FI fija para filtrar y amplificar con estabilidad. «f 1 + f 2».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q429",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Un dipolo de media onda, para la banda de 40 metros, debe tener una longitud aproximada de:",
    "options": [
      "10 m",
      "20 m",
      "40 m",
      "80 m"
    ],
    "correctIndex": 1,
    "explain": "En 40 m (~7 MHz), λ ≈ 40 m; un dipolo de media onda mide del orden de λ/2 en total (unos 20 m de longitud física). «20 m».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q430",
    "part": 1,
    "topicId": "componentes",
    "stem": "En un transformador con relación 2:1 se puede afirmar que:",
    "options": [
      "Uno de los devanados tiene el doble número de espiras que el otro",
      "Amplifica con un factor de cuatro la tensión de entrada",
      "Atenúa en un factor de dos la potencia de entrada",
      "Duplica la potencia que se le entrega"
    ],
    "correctIndex": 0,
    "explain": "En el transformador ideal V1/V2 = N1/N2; un núcleo ferromagnético aumenta el acoplamiento y la inductancia. «Uno de los devanados tiene el doble número de espiras que el otro».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q431",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Una antena dipolo con trampas:",
    "options": [
      "Sólo se puede utilizar como antena receptora",
      "Permite obtener resonancia en varias frecuencias",
      "Incrementa el ancho de banda de la señal radiada",
      "Tiene varios elementos denominados parásitos"
    ],
    "correctIndex": 1,
    "explain": "Las trampas en un dipolo permiten resonar en varias bandas sin cambiar de antena físicamente. «Permite obtener resonancia en varias frecuencias».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q432",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Para el desvanecimiento o fading, es correcto afirmar que:",
    "options": [
      "A frecuencias muy altas se pierden las ondas espaciales",
      "La energía de una onda permanece invariable",
      "Se evita con una antena omnidireccional",
      "La intensidad de una señal emitida sufre variaciones en un período de tiempo pudiendo llegar a no detectarse en el receptor"
    ],
    "correctIndex": 3,
    "explain": "El fading es variación rápida de nivel por multipath o propagación; no es armónico ni selectividad. «La intensidad de una señal emitida sufre variaciones en un período de tiempo pudiendo llegar a no detectarse en el receptor».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q433",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Los transmisores de radiofrecuencia producen una emisión de energía denominada:",
    "options": [
      "Radiación electromagnética",
      "Emisión termoeléctrica",
      "Intensidad de campo",
      "Rayos gamma"
    ],
    "correctIndex": 0,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «Radiación electromagnética».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q434",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Qué falta en el siguiente diagrama de bloques para que actúe como un receptor de FM:",
    "stemFigure": "images/quiz/ure-p1-q434-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q434): Qué falta en el siguiente diagrama de bloques para que actúe como un receptor de FM:",
    "options": [
      "Nada",
      "Un ondulador",
      "Un oscilador",
      "Un detector de envolvente"
    ],
    "correctIndex": 2,
    "explain": "La superheterodinia FM necesita oscilador local para mezclar a frecuencia intermedia; sin ese bloque el diagrama está incompleto. «Un oscilador».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q435",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "¿Qué bandas de frecuencia son más idóneas para conseguir una comunicación mediante “rebote lunar”?:",
    "options": [
      "Ninguna",
      "Todas",
      "VLF",
      "VHF y superiores"
    ],
    "correctIndex": 3,
    "explain": "En la nomenclatura ITU, VHF designa el tramo aproximado de 30–300 MHz. Para este enunciado la respuesta correcta es «VHF y superiores».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q437",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Un polímetro, también denominado multímetro o tester, NO sirve para medir:",
    "options": [
      "La resistencia eléctrica",
      "La impedancia de la antena",
      "La corriente eléctrica",
      "La tensión eléctrica"
    ],
    "correctIndex": 1,
    "explain": "Tensión en paralelo, intensidad en serie; resistencia sin tensión de trabajo en el circuito. Para esta pregunta: «La impedancia de la antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q438",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El medidor comúnmente denominado “s-meter” indica:",
    "options": [
      "La relación de onda estacionaria",
      "La estabilidad del receptor",
      "La intensidad de la señal de entrada del receptor",
      "El consumo de potencia de alimentación"
    ],
    "correctIndex": 2,
    "explain": "El S-meter indica nivel de señal recibida (intensidad relativa), no potencia transmitida ni frecuencia. «La intensidad de la señal de entrada del receptor».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q439",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Si en el siguiente esquema el conjunto L-C resuena a la frecuencia del transmisor, se puede afirmar que la potencia medida por el vatímetro será:",
    "stemFigure": "images/quiz/ure-p1-q439-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q439): Si en el siguiente esquema el conjunto L-C resuena a la frecuencia del transmisor, se puede afirmar que la potencia medi",
    "options": [
      "Igual a la del transmisor",
      "La mitad de la disipada en el circuito L-C",
      "Mínima",
      "El doble de la disipada en el circuito L-C"
    ],
    "correctIndex": 2,
    "explain": "En resonancia serie el LC presenta impedancia mínima y puede desviar potencia: el vatímetro lee un valor mínimo hacia la carga. «Mínima».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q440",
    "part": 1,
    "topicId": "componentes",
    "stem": "Los transistores bipolares son dispositivos que:",
    "options": [
      "Son elementos pasivos",
      "Siempre dan más potencia que las válvulas",
      "Tienen tres terminales",
      "Disponen de rejilla"
    ],
    "correctIndex": 2,
    "explain": "Transistores amplifican o conmutan con corriente de base/puerta; la clase de polarización define linealidad y eficiencia. «Tienen tres terminales».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q441",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "¿Qué magnitud se expresa en unidades “dBw”?:",
    "options": [
      "Resistencia",
      "Energía",
      "Ancho de banda",
      "Potencia",
      "",
      "",
      "",
      ""
    ],
    "correctIndex": 3,
    "explain": "Los decibelios expresan relaciones logarítmicas; dBm referencia potencia a 1 mW. La respuesta es «Potencia». No confundir con el distractor del mismo bloque temático.",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q444",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Para que una antena que resuena en 29.900 kHz resuene en 28.500 kHz, deberemos:",
    "options": [
      "Acortarla",
      "Aumentar el ancho de banda",
      "Alargarla",
      "Colocarle un plano de tierra"
    ],
    "correctIndex": 2,
    "explain": "Para bajar la frecuencia de resonancia hay que alargar el dipolo (mayor longitud eléctrica). «Alargarla»."
  },
  {
    "id": "ure-p1-q475",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La radiodifusión sonora con Modulación de Frecuencia (FM), ¿qué banda de frecuencias utiliza?:",
    "options": [
      "SHF",
      "VHF",
      "HF",
      "UHF"
    ],
    "correctIndex": 1,
    "explain": "La radiodifusión sonora FM en España utiliza bandas VHF (aprox. 88–108 MHz); no confundir con segmentos de aficionado en HF. «VHF».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q477",
    "part": 1,
    "topicId": "componentes",
    "stem": "El producto de 13 voltios por 1 amperio son:",
    "options": [
      "13 vatios",
      "13 amperios",
      "13 ohmios",
      "13 faradios"
    ],
    "correctIndex": 0,
    "explain": "Potencia eléctrica P = V·I; un voltio multiplicado por un amperio es un vatio (W). «13 vatios».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q478",
    "part": 1,
    "topicId": "componentes",
    "stem": "En la conexión de resistencias en un circuito:",
    "options": [
      "El valor de la agrupación de ellas en serie puede ser menor que el valor de una de ellas",
      "El valor de la conexión de dos resistencias en paralelo da un valor resultante menor que cualquiera de ellas",
      "Sólo se pueden conectar en serie",
      "Sólo se pueden conectar en paralelo"
    ],
    "correctIndex": 1,
    "explain": "R disipa energía; PTC sube R con temperatura y NTC la baja. «El valor de la conexión de dos resistencias en paralelo da un valor resultante menor que cualquiera de ellas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q479",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Una antena en trasmisión, ¿se puede tocar con las manos?:",
    "options": [
      "Sólo si existe una eficaz toma de tierra",
      "No se debe tocar una antena trasmitiendo",
      "Sí, para aumentar su potencia",
      "Sólo cuando el suelo este lo suficientemente seco"
    ],
    "correctIndex": 1,
    "explain": "No se debe tocar una antena en transmisión: tensiones RF y corrientes de antena pueden causar quemaduras. «No se debe tocar una antena trasmitiendo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q481",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "En un circuito eléctrico de corriente continua:",
    "options": [
      "La intensidad está en razón inversa a la tensión",
      "La resistencia es variable con la tensión",
      "La intensidad está en razón directa a la tensión",
      "La capacidad del circuito disminuye"
    ],
    "correctIndex": 2,
    "explain": "En un circuito CC simple, la intensidad es la misma en serie; no confundir con reparto de tensión. «La intensidad está en razón directa a la tensión».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q482",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Cuando se expresa una cantidad en dBm, ¿a qué magnitud se refiere?:",
    "options": [
      "Corriente eléctrica",
      "Diferencia de potencial eléctrico",
      "Potencia eléctrica",
      "Longitud de onda"
    ],
    "correctIndex": 2,
    "explain": "dBm expresa potencia referida a 1 mW; dBµV suele referirse a tensión. No confundas con dB de ganancia sin referencia. «Potencia eléctrica»."
  },
  {
    "id": "ure-p1-q483",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La etapa de FI en un receptor debe estar conectada:",
    "options": [
      "A la entrada del mezclador",
      "Al amplificador de B.F.",
      "A la salida del mezclador",
      "Al oscilador local"
    ],
    "correctIndex": 2,
    "explain": "En superheterodino el mezclador con oscilador local traslada la señal a una FI fija para filtrar y amplificar con estabilidad. «A la salida del mezclador».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q485",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Si queremos sintonizar una frecuencia de 7 MHz en un receptor que tiene una frecuencia intermedia de 9 MHz, ¿cuál deberá ser la frecuencia del oscilador local?:",
    "options": [
      "63 MHz",
      "79 MHz",
      "16 MHz",
      "8 MHz"
    ],
    "correctIndex": 2,
    "explain": "FI significa frecuencia intermedia: la frecuencia fija a la que el receptor traslada la señal para trabajarla mejor. En un mezclador clásico, |fLO − fRF| = fFI: oscilador local menos radiofrecuencia recibida debe dar 9 MHz. Por tanto, |fLO − 7| = 9 y la solución útil es fLO = 16 MHz."
  },
  {
    "id": "ure-p1-q486",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Si en el siguiente esquema el transmisor, la línea de alimentación y la antena tienen la misma impedancia a la frecuencia de trabajo, se puede afirmar que:",
    "stemFigure": "images/quiz/ure-p1-q486-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q486): Si en el siguiente esquema el transmisor, la línea de alimentación y la antena tienen la misma impedancia a la frecuenci",
    "options": [
      "La potencia reflejada es superior a la potencia directa",
      "La potencia directa es superior a la potencia reflejada",
      "La potencia reflejada es igual a la potencia directa",
      "Sólo existe potencia reflejada siendo nula la potencia directa"
    ],
    "correctIndex": 1,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «La potencia directa es superior a la potencia reflejada».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q488",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "De las siguientes bandas de frecuencias la más adecuada para comunicaciones por satélite se corresponde con:",
    "options": [
      "HF",
      "MF",
      "LF",
      "VHF"
    ],
    "correctIndex": 3,
    "explain": "Las comunicaciones por satélite de radioaficionado (SO-50, etc.) usan bandas VHF/UHF con enlaces línea de vista al satélite; HF depende de ionósfera y MF/LF no son el caso típico. «VHF».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q490",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En un amplificador de ganancia 20 dB, con impedancia de entrada igual a la de salida, y una potencia de entrada de 0,2 vatios, ¿cuánto vale la potencia de salida?:",
    "options": [
      "200 W",
      "120 W",
      "20 W",
      "20,2 W"
    ],
    "correctIndex": 2,
    "explain": "Transistores amplifican o conmutan con corriente de base/puerta; la clase de polarización define linealidad y eficiencia. «20 W». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q491",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "¿Qué valor indicará un medidor de ondas estacionarias, en el caso de un acoplamiento óptimo entre un transmisor y una antena?:",
    "options": [
      "Cero",
      "Diez",
      "Dos",
      "Uno"
    ],
    "correctIndex": 3,
    "explain": "Con acoplamiento perfecto no hay reflexiones y la ROE vale 1 (adaptación ideal). Valores muy altos indican desadaptación. «Uno».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q492",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En un receptor, la capacidad de mantener la frecuencia sintonizada se denomina:",
    "options": [
      "Sintonía fina",
      "Sensibilidad",
      "Selectividad",
      "Estabilidad"
    ],
    "correctIndex": 3,
    "explain": "Una antena sintonizada resuena a la frecuencia de la señal y acopla mejor la energía radiada. «Estabilidad».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q493",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Un elevado nivel de intensidad de campo eléctrico puede producir:",
    "options": [
      "La desensibilización o bloqueo de los diferentes equipos electrónicos que se encuentren en las inmediaciones",
      "Un aumento de la potencia entregada por la línea de alimentación a la antena",
      "Una mejora en las condiciones de recepción debido al acoplamiento ferromagnético",
      "Mejoras en la puesta a tierra de los equipos que componen la estación radioeléctrica"
    ],
    "correctIndex": 0,
    "explain": "En corriente continua, V = I·R y P = V·I son las relaciones base del examen. La magnitud o fórmula correcta aquí es «La desensibilización o bloqueo de los diferentes equipos electrónicos que se encuentren en las inmediaciones».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q494",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "¿Qué se entiende por \"amplitud\" de una señal sinusoidal?:",
    "options": [
      "Es la diferencia entre el valor máximo y el valor medio de la señal",
      "Es la diferencia entre el valor máximo y el mínimo de la sinusoide",
      "Es el valor de la frecuencia de la señal",
      "Es el valor indicativo de la diferencia de fase de la sinusoide"
    ],
    "correctIndex": 0,
    "explain": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q495",
    "part": 1,
    "topicId": "componentes",
    "stem": "Se conoce con el nombre genérico de \"diodo\" a:",
    "options": [
      "Un componente para amplificar señales",
      "Un diversificador de corriente",
      "Un dispositivo que permite el paso de la comente eléctrica en un único sentido",
      "Una antena de TV"
    ],
    "correctIndex": 2,
    "explain": "El diodo es un componente de dos terminales que permite el paso de corriente en un solo sentido. «Un dispositivo que permite el paso de la comente eléctrica en un único sentido».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q497",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Para cualquier comunicación radioeléctrica en la banda UHF, se puede afirmar que:",
    "options": [
      "A mayor frecuencia menor es el alcance conseguido",
      "A mayor altura de las antenas menor es el alcance conseguido",
      "A menor frecuencia mayor deberá de ser la altura de las antenas",
      "A menor alcance mayor será la polarización de la señal"
    ],
    "correctIndex": 0,
    "explain": "En la nomenclatura ITU, UHF designa el tramo aproximado de 300–3000 MHz. Para este enunciado la respuesta correcta es «A mayor frecuencia menor es el alcance conseguido».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q498",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un transistor bipolar está compuesto por:",
    "options": [
      "Base, colector y drenador",
      "Emisor, base y colector",
      "Fuente, base y emisor",
      "Emisor, colector y puerta"
    ],
    "correctIndex": 1,
    "explain": "Transistores amplifican o conmutan con corriente de base/puerta; la clase de polarización define linealidad y eficiencia. «Emisor, base y colector».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q499",
    "part": 1,
    "topicId": "componentes",
    "stem": "Para medir la potencia disipada en la resistencia del circuito de la figura, se deben seleccionar:",
    "stemFigure": "images/quiz/ure-p1-q499-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q499): Para medir la potencia disipada en la resistencia del circuito de la figura, se deben seleccionar:",
    "options": [
      "Los conmutadores en la posición 1",
      "Los conmutadores en la posición 2",
      "Los conmutadores en la posición 1 ó 2, las dos posiciones son válidas",
      "Ninguna de las anteriores ya que la potencia sólo se puede medir con un vatímetro"
    ],
    "correctIndex": 0,
    "explain": "R disipa energía; PTC sube R con temperatura y NTC la baja. «Los conmutadores en la posición 1».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q502",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Una instalación radioeléctrica con desadaptación de impedancias entre el transmisor y la antena podrá producir:",
    "options": [
      "Interferencias",
      "Una mayor potencia radiada",
      "Acoplamiento magnético de alta frecuencia",
      "Componentes de campo ajustados a impedancia nula"
    ],
    "correctIndex": 0,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «Interferencias».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q503",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En una antena dipolo con trampas multibanda, las trampas están formadas por:",
    "options": [
      "Rectificadores supresores de ondas estacionarias",
      "Transformadores simétricos-asimétricos",
      "Circuitos resonantes",
      "Aisladores para corrientes inversas"
    ],
    "correctIndex": 2,
    "explain": "Las trampas en un dipolo permiten resonar en varias bandas sin cambiar de antena físicamente. «Circuitos resonantes».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q6",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En sistemas de transmisión analógicos, las señales:",
    "options": [
      "Pueden tener infinitos valores",
      "Sólo pueden tener unos valores discretos",
      "No varían con el tiempo",
      "No existen"
    ],
    "correctIndex": 0,
    "explain": "En analógico, la señal puede tomar infinitos valores intermedios entre mínimo y máximo. «Pueden tener infinitos valores».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q61",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "La ley de Coulomb dice que la fuerza entre dos cargas eléctricas es:",
    "options": [
      "Directamente proporcional a la distancia de separación",
      "Directamente proporcional al cuadrado de la distancia de separación",
      "Inversamente proporcional a las cargas",
      "Directamente proporcional al producto de las cargas"
    ],
    "correctIndex": 3,
    "explain": "La carga se mide en culombios; intensidad es carga por segundo. La opción correcta es «Directamente proporcional al producto de las cargas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q63",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "El ancho de banda ocupado es:",
    "options": [
      "El comprendido entre los límites superior e inferior de la señal modulada",
      "El ancho del canal en uso, más los adyacentes",
      "El número de vatios necesarios para mantener una buena comunicación",
      "El número de kilohercios que ocupa la banda de trabajo del equipo"
    ],
    "correctIndex": 0,
    "explain": "Al estrechar el ancho de banda del receptor se filtran más señales fuera del canal deseado; suele aumentar la selectividad. «El comprendido entre los límites superior e inferior de la señal modulada».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q64",
    "part": 1,
    "topicId": "componentes",
    "stem": "Un condensador es un dispositivo que almacena:",
    "options": [
      "Energía acústica",
      "Energía electromagnética",
      "Carga eléctrica",
      "No almacena nada"
    ],
    "correctIndex": 2,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «Carga eléctrica».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q65",
    "part": 1,
    "topicId": "componentes",
    "stem": "En una resistencia de 1 kΩ, por la que pasa una corriente de continua de 10 mA, se genera una diferencia de potencial de:",
    "options": [
      "10 voltios",
      "1 voltio",
      "1000 voltios",
      "100 voltios"
    ],
    "correctIndex": 0,
    "explain": "En una resistencia, P = V·I = I²R = V²/R. Calcula V = I·R y luego la potencia disipada. «10 voltios». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q67",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "¿Qué se consigue con el efecto llamado \"dispersión troposférica\" en la propagación de las ondas electromagnéticas?:",
    "options": [
      "Nada",
      "Únicamente desvanecimientos",
      "Reflexiones en la ionosfera",
      "Mayor alcance que el meramente visual entre las antenas transmisora y receptora"
    ],
    "correctIndex": 3,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «Mayor alcance que el meramente visual entre las antenas transmisora y receptora».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q68",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En la propagación de ondas electromagnéticas por reflexión ionosférica, para la banda de 3,5 MHz, durante el día frente a la noche, se consiguen alcances:",
    "options": [
      "Mayores",
      "Menores",
      "Iguales",
      "Nulos"
    ],
    "correctIndex": 1,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «Menores».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q69",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Los receptores de conversión directa:",
    "options": [
      "Tienen un circuito de frecuencia fija denominada etapa de frecuencia intermedia",
      "Mezclan directamente la señal recibida para obtener una señal de audiofrecuencia",
      "Incorporan dos osciladores locales con acoplo directo",
      "Convierten la señal recibida a una de frecuencia fija denominada frecuencia imagen"
    ],
    "correctIndex": 1,
    "explain": "En conversión directa (homodino) se mezcla la RF con un oscilador para obtener audio o FI muy baja en un solo paso. «Mezclan directamente la señal recibida para obtener una señal de audiofrecuencia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q7",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Un termistor NTC es:",
    "options": [
      "Una resistencia cuyo valor se reduce a medida que la temperatura aumenta",
      "Una resistencia cuyo valor aumenta a medida que la temperatura aumenta",
      "Una resistencia cuyo valor se mantiene constante a medida que la temperatura aumenta",
      "Una resistencia cuyo valor se mantiene constante a medida que la temperatura disminuye"
    ],
    "correctIndex": 0,
    "explain": "NTC: la resistencia baja cuando sube la temperatura (coeficiente negativo). PTC hace lo contrario. «Una resistencia cuyo valor se reduce a medida que la temperatura aumenta».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q70",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "El multiplicador de frecuencia se emplea para:",
    "options": [
      "Demodular señales en banda lateral única",
      "Incrementar la frecuencia de un oscilador",
      "Amplificar el nivel en frecuencia intermedia",
      "Incrementar el margen de sintonía de un amplificador"
    ],
    "correctIndex": 1,
    "explain": "Relación clave: λ = c/f (en vacío c ≈ 3·10⁸ m/s) o λ = v/f en un medio. «Incrementar la frecuencia de un oscilador».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q71",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El índice de modulación caracteriza a:",
    "options": [
      "La modulación de amplitud",
      "La distorsión del modulador",
      "La modulación de frecuencia",
      "La ganancia de modulación"
    ],
    "correctIndex": 2,
    "explain": "El índice de modulación m es típico de AM; este enunciado se refiere al tipo de modulación. «La modulación de frecuencia»."
  },
  {
    "id": "ure-p1-q74",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "El transceptor debe estar conectado a tierra para:",
    "options": [
      "Evitar las interferencias atmosféricas",
      "Evitar variaciones de señal",
      "Proteger al operador de descargas",
      "No es necesario conectarlo a tierra"
    ],
    "correctIndex": 2,
    "explain": "La protección y la toma de tierra siguen reglas de seguridad eléctrica; no confundas con fusibles de línea. «Proteger al operador de descargas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q75",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En una antena yagi existen los llamados \"elementos parásitos\", ¿qué son estos elementos?:",
    "options": [
      "Componentes de la antena activos",
      "Componentes de la antena no activos",
      "Elementos que sobran",
      "Elementos que viven a costa de los demás"
    ],
    "correctIndex": 1,
    "explain": "Antenas directivas concentran radiación; Yagi usa reflector y directores, parabólicas enfocan por apertura. «Componentes de la antena no activos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q76",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La polarización de una antena es:",
    "options": [
      "La relación entre la impedancia de entrada y la potencia transmitida",
      "La orientación del campo eléctrico transmitido",
      "El cociente entre la ganancia y la directividad",
      "La orientación del campo magnético transmitido"
    ],
    "correctIndex": 1,
    "explain": "La polarización de la antena debe alinearse con la de la onda para máxima transferencia. «La orientación del campo eléctrico transmitido».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q77",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Para un acoplamiento óptimo entre transmisor y antena, la línea de transmisión debe tener una impedancia:",
    "options": [
      "Menor a la de la antena",
      "Comprendida entre la de la antena y la del transmisor",
      "Inferior a la del transmisor",
      "Igual a la de la antena y a la del transmisor"
    ],
    "correctIndex": 3,
    "explain": "ROE alta indica energía reflejada por desadaptación; el balun adapta sistemas balanceados y no balanceados. «Igual a la de la antena y a la del transmisor».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q78",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Relativo a la propagación de las ondas electromagnéticas, se llama \"frecuencia crítica\":",
    "options": [
      "A la frecuencia más sensible",
      "A la frecuencia mínima del receptor",
      "A la frecuencia por encima de la cual no hay reflexiones en la ionosfera",
      "A la banda del transmisor"
    ],
    "correctIndex": 2,
    "explain": "HF usa mucho la ionosfera; VHF/UHF dependen más de línea de vista. MUF y frecuencia crítica son conceptos ionosféricos. «A la frecuencia por encima de la cual no hay reflexiones en la ionosfera».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q79",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En armónicos producidos por circuitos no lineales:",
    "options": [
      "Solo existen los de segundo orden",
      "La frecuencia de los de segundo orden es doble de la fundamental",
      "Los de segundo orden siempre son despreciables",
      "Los equipos modernos nunca producen armónicos"
    ],
    "correctIndex": 1,
    "explain": "La etapa de potencia amplifica antes de la antena; filtros de salida reducen armónicos. Clase C es eficiente pero no lineal para AM. «La frecuencia de los de segundo orden es doble de la fundamental».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q8",
    "part": 1,
    "topicId": "componentes",
    "stem": "Las bandas de colores en un condensador indican:",
    "options": [
      "Los materiales de los que está hecho",
      "Su precio",
      "Su garantía",
      "Su capacidad, su tolerancia y su tensión máxima de trabajo"
    ],
    "correctIndex": 3,
    "explain": "La reactancia de C baja al subir frecuencia y la de L sube; en resonancia LC la impedancia puede mínimizarse o maximizarse según el montaje. «Su capacidad, su tolerancia y su tensión máxima de trabajo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q80",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Para realizar medidas de intensidad de campo radiado por una antena se emplea:",
    "options": [
      "Un medidor de ondas estacionarias",
      "Un frecuencímetro",
      "Un medidor de campo",
      "Un acoplador de antenas"
    ],
    "correctIndex": 2,
    "explain": "La intensidad de campo se mide con sonda o medidor de campo (V/m o dBµV/m), no con vatímetro de potencia directa. «Un medidor de campo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q82",
    "part": 1,
    "topicId": "componentes",
    "stem": "Para que un transformador reduzca la tensión, es necesario que:",
    "options": [
      "El secundario tenga menos espiras que el primario",
      "El secundario tenga más espiras que el primario",
      "No tenga tensión en el primario",
      "El transformador sea muy pequeño"
    ],
    "correctIndex": 0,
    "explain": "En el transformador ideal V1/V2 = N1/N2; un núcleo ferromagnético aumenta el acoplamiento y la inductancia. «El secundario tenga menos espiras que el primario».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q84",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Calcular la frecuencia F sintonizada en el receptor para el siguiente esquema:",
    "stemFigure": "images/quiz/ure-p1-q84-original.png",
    "stemFigureAlt": "Figura original URE (ure-p1-q84): Calcular la frecuencia F sintonizada en el receptor para el siguiente esquema:",
    "options": [
      "F=3,67 MHz",
      "F=7,1 MHz",
      "F=14,2 MHz",
      "F=13,5 MHz"
    ],
    "correctIndex": 2,
    "explain": "A partir del circuito resonante y del esquema del superheterodino de la figura, la frecuencia de sintonía calculada coincide con 14,2 MHz (relación entre oscilador, FI y RF). «F=14,2 MHz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q85",
    "part": 1,
    "topicId": "electricidad-basica",
    "stem": "Si se montan 4 pilas iguales en serie:",
    "options": [
      "La intensidad del conjunto es igual a la de una pila",
      "La tensión del conjunto es igual a la de una pila",
      "No se pueden montar en serie",
      "Siempre se produce un cortocircuito"
    ],
    "correctIndex": 0,
    "explain": "En serie las resistencias se suman; en paralelo la inversa de la equivalente es la suma de inversas. La respuesta es «La intensidad del conjunto es igual a la de una pila».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p1-q9",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La R.O.E. de una instalación de una antena de radioaficionado se expresa con la fórmula:",
    "options": [
      "Intensidad máxima / intensidad media",
      "Intensidad mínima / intensidad máxima",
      "Siempre vale 1",
      "Intensidad máxima / intensidad mínima"
    ],
    "correctIndex": 3,
    "explain": "La ROE (relación de ondas estacionarias) compara componentes de la onda estacionaria en la línea; no es cociente de intensidades de campo del diagrama. Si el banco mezcla conceptos, elige la definición que marca «Intensidad máxima / intensidad mínima».",
    "explainSourceNote": "Práctica URE (Fuente: URE (electricidad y radioelectricidad)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q100",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "La señal de urgencia en radiotelefonía consiste en la transmisión, repetida tres veces, de:",
    "options": [
      "PAN PAN",
      "SOS",
      "XXX",
      "URGENCE"
    ],
    "correctIndex": 0,
    "explain": "Pan-Pan (tres veces) es la señal de urgencia sin peligro grave inmediato; Mayday reserva el socorro. «PAN PAN».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q101",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "La señal de alarma en radiotelefonía consiste en dos señales de audiofrecuencia, aproximadamente sinusoidales, transmitidas alternativamente. ¿Qué frecuencias son?:",
    "options": [
      "2.220 Hz y 1.300 Hz",
      "2.220 kHz y 1.300 kHz",
      "1.100 Hz y 650 kz",
      "1.100 kHz y 650 kHz"
    ],
    "correctIndex": 0,
    "explain": "La señal de alarma en radiotelefonía usa dos tonos alternos; en el banco son aproximadamente 2.220 Hz y 1.300 Hz. «2.220 Hz y 1.300 Hz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q102",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los distintivos de llamada con sufijos de dos letras; marque la opción falsa:",
    "options": [
      "Podrán ser asignados a cualquier radioaficionado que cumpla con unas determinadas condiciones",
      "Se asignarán en función de las disponibilidades existentes",
      "Se reservan únicamente para estaciones colectivas",
      "Una de las condiciones para su adjudicación es que el radioaficionado no haya sido sometido a expediente sancionador en los últimos cinco años"
    ],
    "correctIndex": 2,
    "explain": "Lee qué afirmación es falsa: el banco no reserva los sufijos de dos letras solo a estaciones colectivas. «Se reservan únicamente para estaciones colectivas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q103",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Una comunidad de propietarios, ¿puede autorizar la instalación de antenas de radioaficionado?:",
    "options": [
      "No, solo pronunciarse respecto a la idoneidad de la instalación",
      "Si, pues ella es la afectada",
      "Siempre y cuando se tenga el permiso de obra",
      "Si, siempre que se tenga el proyecto técnico"
    ],
    "correctIndex": 0,
    "explain": "En elementos comunes hace falta acuerdo o procedimiento con la comunidad; no es instalación unilateral sin informar. «No, solo pronunciarse respecto a la idoneidad de la instalación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q104",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La licencia CEPT:",
    "options": [
      "Permite operar en las bandas autorizadas al Servicio de Aficionados en cualquier país visitado",
      "Permite operar en cualquier banda del Servicio de Aficionados en cualquier país de Europa",
      "Permite operar en las bandas autorizadas al Servicio de Aficionados en cualquier país visitado que se haya adherido a la Recomendación T/R61-01 de la CEPT",
      "Permite operar permanentemente en cualquier país CEPT"
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Permite operar en las bandas autorizadas al Servicio de Aficionados en cualquier país visitado que se haya adherido a la Recomendación T/R61-01 de la CEPT».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q105",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El \"distrito\", que compone el distintivo de llamada de un radioaficionado:",
    "options": [
      "Es la cifra coincidente con el Distrito Postal de residencia del titular",
      "Son las dos últimas cifras del D.N.I. de la autorización",
      "Es la cifra coincidente con el número de distrito de residencia del titular, con arreglo a la división geográfica que se especifica en el Reglamento de Aficionados en vigor",
      "Es la cifra 0 de uso exclusiva para distintivos temporales"
    ],
    "correctIndex": 2,
    "explain": "La cifra de distrito coincide con la residencia del titular según la división geográfica del reglamento de aficionados. «Es la cifra coincidente con el número de distrito de residencia del titular, con arreglo a la división geográfica que se especifica en el Reglamento de Aficionados en vigor».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q106",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En el tejado de un edificio donde está instalada una antena de radioaficionado autorizada:",
    "options": [
      "Se podrán realizar obras aun cuando haya que desmontar temporalmente, parcial o totalmente, la instalación de la antena",
      "No se podrá realizar ninguna obra",
      "Se podrán realizar obras previa autorización del titular de la antena",
      "Se podrá desmontar la antena para realizar obras previo pago de una indemnización al titular de la antena"
    ],
    "correctIndex": 0,
    "explain": "Deben poder ejecutarse obras de mantenimiento del edificio, aunque obligue a desmontar temporalmente la antena autorizada. «Se podrán realizar obras aun cuando haya que desmontar temporalmente, parcial o totalmente, la instalación de la antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q107",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El indicativo de llamada ED3ZHO:",
    "options": [
      "Pertenece a una estación fija de la provincia de Zaragoza",
      "Tiene carácter temporal",
      "Corresponde a una estación automática desatendida",
      "No se puede adjudicar a estación colectiva alguna"
    ],
    "correctIndex": 2,
    "explain": "Los indicativos ED… en el banco identifican estaciones desatendidas según el tipo (analógica o digital). «Corresponde a una estación automática desatendida».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q108",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "En la instalación de una antena de radioaficionado y sus elementos anejos:",
    "options": [
      "No es necesario tener en cuenta la proximidad de líneas eléctricas aéreas",
      "No es necesario señalizar los anclajes y riostras si la antena está situada en un lugar transitable",
      "Es necesario tener en cuenta las instalaciones y antenas de otros servicios",
      "Los soportes de la antena se podrán fijar al mástil de conducción aérea de energía eléctrica"
    ],
    "correctIndex": 2,
    "explain": "Debes coordinar la instalación con otros servicios y usuarios del espectro; evitar interferencias y respetar normativa de antenas. «Es necesario tener en cuenta las instalaciones y antenas de otros servicios».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q111",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Si observa que un distintivo de llamada va precedido del prefijo EA seguido de un determinado número (del 1 al 9):",
    "options": [
      "No haga caso, ya que se trata de una llamada de estación no autorizada",
      "Deberá corregir al que emite, pues lo está haciendo mal",
      "Se trata de un radioaficionado de clase A",
      "Es que un titular de licencia CEPT extranjero está emitiendo en España"
    ],
    "correctIndex": 3,
    "explain": "EA más cifra de distrito y barra indica un titular CEPT extranjero operando temporalmente en España. «Es que un titular de licencia CEPT extranjero está emitiendo en España».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q112",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Tras la revocación, en su caso, de la autorización de radioaficionado, el interesado:",
    "options": [
      "Conserva la licencia de radioaficionado",
      "El distintivo de llamada de su licencia no podrá ser adjudicado a un tercero",
      "Hasta una nueva autorización no podrá ejercer la actividad de la radioafición",
      "Queda inhabilitado a perpetuidad a ser radioaficionado"
    ],
    "correctIndex": 2,
    "explain": "Revocada la autorización, no puedes operar hasta obtener una nueva si la normativa lo permite. «Hasta una nueva autorización no podrá ejercer la actividad de la radioafición».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q114",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En aquellas Comunidades Autónomas en las que exista lengua cooficial además del castellano, la autorización de radioaficionados:",
    "options": [
      "Siempre se expedirá únicamente en la lengua cooficial",
      "Deberá expedirse en formato bilingüe, si así lo solicita el interesado",
      "Se expedirá únicamente en castellano",
      "El Reglamento de Aficionados no contempla tal extremo"
    ],
    "correctIndex": 1,
    "explain": "Las antenas en comunidades de propietarios requieren procedimiento, comunicación y a veces acuerdos; no es libertad total ni prohibición absoluta. «Deberá expedirse en formato bilingüe, si así lo solicita el interesado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q115",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cuál de las siguientes alternativas es válida, en relación con la autorización administrativa del uso del espectro radioeléctrico por aficionados?:",
    "options": [
      "Es gratuita",
      "Su periodo máximo de validez es de cuatro años",
      "Cuando se conceda, a la vez se otorgará el distintivo de llamada",
      "No se exigen requisitos previos para solicitarla"
    ],
    "correctIndex": 2,
    "explain": "La autorización de espectro para aficionados conlleva la asignación del indicativo al concederse; no es gratuita ni sin requisitos previos. «Cuando se conceda, a la vez se otorgará el distintivo de llamada».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q116",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Entre las condiciones de utilización de la licencia CEPT señaladas en el Reglamento de Aficionados, no se encuentra una de las siguientes. Indíquela:",
    "options": [
      "Dicha licencia habilita para las utilizaciones de estaciones portables y móviles",
      "Su titular viene obligado a presentar la licencia a petición de las autoridades del país visitado",
      "El titular no podrá solicitar protección contra las interferencias perjudiciales",
      "La licencia permitirá utilizar todas las bandas de frecuencias atribuidas al Servicio de Aficionados, autorizadas en su país, aunque no lo estén en el país donde va a operar la estación"
    ],
    "correctIndex": 3,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «La licencia permitirá utilizar todas las bandas de frecuencias atribuidas al Servicio de Aficionados, autorizadas en su país, aunque no lo estén en el país donde va a operar la estación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q117",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En el extranjero, deberemos respetar la reglamentación del país CEPT donde vayamos:",
    "options": [
      "Seguiremos siempre la reglamentación española",
      "Siempre",
      "Sólo en las bandas VHF/UHF",
      "Siempre y cuando no esté en contradicción con la nuestra"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Siempre».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q119",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "La emisión de una o varias frecuencias situada inmediatamente fuera de la anchura de banda necesaria, resultante del proceso de modulación, se denomina emisión:",
    "options": [
      "Esencial",
      "Fuera de banda",
      "Armónica",
      "En dúplex"
    ],
    "correctIndex": 1,
    "explain": "Emisiones fuera de banda son componentes espectrales adyacentes no deseadas (armónicos, splatter). «Fuera de banda».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q120",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "La señal internacional de socorro en radiotelefonía es:",
    "options": [
      "Help",
      "Securité",
      "Mayday",
      "Pan"
    ],
    "correctIndex": 2,
    "explain": "Las señales de socorro están reservadas a emergencias reales; su uso indebido es infracción grave. «Mayday».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q151",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cómo se deletrea la palabra TOP?:",
    "options": [
      "Tunga, Oslo, Papa",
      "Tango, Oscar, Papa",
      "Tunga, Oscar, Pepe",
      "Tango, Oslo, Pepe"
    ],
    "correctIndex": 1,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Tango, Oscar, Papa».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q152",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "¿Que símbolo le corresponde a la gama de frecuencias de 3 a 30 MHz?:",
    "options": [
      "VHF",
      "HF",
      "LF",
      "UHF"
    ],
    "correctIndex": 1,
    "explain": "En la nomenclatura ITU, HF (High Frequency) designa el tramo aproximado de 3–30 MHz. Para este enunciado la respuesta correcta es «HF».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q153",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En el procedimiento previsto en la Recomendación CEPT T/R 61-02 sobre el certificado HAREC pueden participar:",
    "options": [
      "Únicamente países pertenecientes a la CEPT",
      "Únicamente países pertenecientes a la CEPT y los Estados Unidos",
      "Todos los países pertenezcan, o no, a la CEPT",
      "Únicamente países de la Comunidad Europea"
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Todos los países pertenezcan, o no, a la CEPT».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q154",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los sufijos de dos letras podrán ser asignados:",
    "options": [
      "Nunca",
      "Siempre y cuando comiencen por la letra Q",
      "Únicamente a una agrupación de radioaficionados",
      "A cualquier radioaficionado que acredite cinco años de prácticas en la radioafición internacional"
    ],
    "correctIndex": 3,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «A cualquier radioaficionado que acredite cinco años de prácticas en la radioafición internacional».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q155",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "La llamada de socorro en radiotelefonía se compone de:",
    "options": [
      "La palabra \"help\", seguida de la palabra \"aquí\" o \"de\" y a continuación el distintivo de llamada u otra señal que identifique a la estación móvil en peligro",
      "La palabra \"mayday\", seguida de la palabra \"aquí\" o \"de\" y a continuación el distintivo de llamada u otra señal que identifique a la estación móvil en peligro",
      "La palabra \"help\" (tres veces), seguida de la palabra \"aquí\" o \"de\" y a continuación el distintivo de llamada u otra señal que identifique a la estación móvil en peligro (tres veces)",
      "La palabra \"mayday\" (tres veces), seguida de la palabra \"aquí\" o \"de\" y a continuación el distintivo de llamada u otra señal que identifique a la estación móvil en peligro (tres veces)"
    ],
    "correctIndex": 3,
    "explain": "Las señales de socorro están reservadas a emergencias reales; su uso indebido es infracción grave. «La palabra \"mayday\" (tres veces), seguida de la palabra \"aquí\" o \"de\" y a continuación el distintivo de llamada u otra señal que identifique a la estación móvil en peligro (tres veces)».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q156",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Las estaciones automáticas desatendidas utilizarán el prefijo:",
    "options": [
      "AM y AN",
      "EC, EB, EA",
      "ED",
      "No tienen prefijo"
    ],
    "correctIndex": 2,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «ED».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q157",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Para la instalación y funcionamiento de una estación de aficionado, es necesario obtener:",
    "options": [
      "Autorización administrativa",
      "Licencia de Estación",
      "Nada",
      "Solo el Diploma de Operador"
    ],
    "correctIndex": 1,
    "explain": "Hace falta licencia de estación (y autorización de operador vigente); no basta con comprar equipo. «Licencia de Estación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q158",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿A cuál de las siguientes localidades pertenece el distintivo de llamada EA9ADI?:",
    "options": [
      "Linares (Jaén)",
      "Ceuta",
      "Avilés (Asturias)",
      "Sabadell (Barcelona)"
    ],
    "correctIndex": 1,
    "explain": "El prefijo EA9 corresponde a Ceuta y Melilla en la numeración de indicativos españoles. «Ceuta».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q160",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Utilizar la palabra \"cambio\" al finalizar una transmisión en fonía es:",
    "options": [
      "Recomendable",
      "Obligatorio",
      "Necesario",
      "Sancionable según la reglamentación vigente"
    ],
    "correctIndex": 0,
    "explain": "En fonía se usa «cambio» al ceder el turno de palabra; es buena práctica operativa. «Recomendable».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q161",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En relación con una estación de aficionado y su utilización es correcto significar que:",
    "options": [
      "El operador viene obligado a utilizar potencias altas para comunicaciones de corta distancia",
      "Deberá estar provista la estación de los elementos adecuados para comprobar que la emisión se realiza dentro de las bandas autorizadas",
      "En el caso de una operación se podrá ocupar mayor anchura de banda que la anchura de banda necesaria para cada clase de emisión",
      "El operador no viene obligado a cumplir el Reglamento sobre perturbaciones parasitas en vigor"
    ],
    "correctIndex": 1,
    "explain": "La estación debe disponer de medios para verificar que emite dentro de las bandas y condiciones autorizadas (anexo I, BOE-A-2013-7624). «Deberá estar provista la estación de los elementos adecuados para comprobar que la emisión se realiza dentro de las bandas autorizadas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q162",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El plazo del que dispone la Administración para resolver una solicitud de autorización de radioaficionado será de:",
    "options": [
      "Seis semanas",
      "Un mes",
      "Tres meses",
      "Quince días"
    ],
    "correctIndex": 0,
    "explain": "Los plazos administrativos del reglamento deben contrastarse con el BOE vigente; el banco fija la opción «Seis semanas» para este enunciado.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q163",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En el alfabeto fonético internacional la letra V se corresponde con la palabra:",
    "options": [
      "Victor",
      "Valencia",
      "Victoria",
      "Vid"
    ],
    "correctIndex": 0,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Victor».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q165",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cuál de las siguientes proposiciones contiene mayor número de provincias adscritas al distrito 4?:",
    "options": [
      "Málaga, Murcia, Madrid, Vizcaya",
      "Cáceres, Cádiz, Cuenca, Ciudad Real",
      "Córdoba, Castellón, Cantabria, Burgos",
      "Toledo, Teruel, Tarragona, Santa Cruz de Tenerife"
    ],
    "correctIndex": 1,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Cáceres, Cádiz, Cuenca, Ciudad Real».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q166",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los extranjeros que acrediten la condición de residentes en España podrán ser titulares de autorizaciones de radioaficionado españolas en los siguientes casos, indique la alternativa correcta:",
    "options": [
      "Cuando sean titulares de un diploma de operador",
      "Cuando sean titulares de un certificado expedido por cualquier país",
      "Cuando exista Acuerdo o Convenio de reciprocidad en la materia con el país de origen del radioaficionado",
      "Siempre que el país de origen del radioaficionado aplique la Recomendación T/R 5000"
    ],
    "correctIndex": 2,
    "explain": "Un extranjero residente puede obtener autorización en España si acredita residencia y, según el supuesto, el certificado HAREC (armonización CEPT T/R 61-02). «Cuando exista Acuerdo o Convenio de reciprocidad en la materia con el país de origen del radioaficionado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q167",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En un distintivo de llamada, la cifra 0 podrá ser autorizada exclusivamente:",
    "options": [
      "Para exposiciones de carácter internacional",
      "Para concursos de alta competitividad",
      "Con motivos de actos que sean inaugurados o visitados por Su Majestad el Rey",
      "Para uso temporal en eventos de carácter autonómico o local"
    ],
    "correctIndex": 2,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Con motivos de actos que sean inaugurados o visitados por Su Majestad el Rey».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q168",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "No es un requisito que habrá de constar necesariamente en la licencia de estación de radioaficionado CEPT:",
    "options": [
      "Nombre y dirección del titular",
      "Distintivo de llamada",
      "Fecha de superación del examen",
      "Autoridad que expide la licencia"
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Fecha de superación del examen».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q169",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Toda estación colectiva fija de aficionado destinada a realizar estudios de propagación y cuyo funcionamiento se basa en la emisión automática de señales de identificación, recibe el nombre de:",
    "options": [
      "Servicio de aficionado por satélite",
      "Estación repetidora de portadora o nodo",
      "Estación repetidora final",
      "Radiobaliza"
    ],
    "correctIndex": 3,
    "explain": "Una estación colectiva para experimentación de propagación puede ser una radiobaliza u otra estación automática desatendida según el supuesto. «Radiobaliza».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q170",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En relación con los distintivos de llamada, la provincia de Murcia se identifica por la cifra:",
    "options": [
      "7",
      "6",
      "5",
      "4"
    ],
    "correctIndex": 2,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «5».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q171",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿Definiría \"estación automática desatendida\" como?:",
    "options": [
      "Estación de emisiones no deseadas",
      "Estación repetidora de poco uso",
      "Estación colectiva de aficionado, que para su funcionamiento habitual no requiere la intervención directa del operador",
      "Estación de mediciones de potencia"
    ],
    "correctIndex": 2,
    "explain": "Es una estación colectiva que funciona sin operador presente, con identificación automática y supervisión del gestor. «Estación colectiva de aficionado, que para su funcionamiento habitual no requiere la intervención directa del operador».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q172",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La identificación de emisiones de una estación móvil marítima se efectuará añadiendo a su distintivo de llamada la expresión:",
    "options": [
      "/MOMA",
      "/M",
      "/MA",
      "/MM"
    ],
    "correctIndex": 3,
    "explain": "Las estaciones móviles marítimas usan indicativos y procedimientos del servicio marítimo (UIT/OMI), distintos del indicativo EA de aficionado terrestre. «/MM».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q174",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Los soportes de una antena de radioaficionado:",
    "options": [
      "Se podrán fijar a los anclajes de un pararrayos",
      "No deberán deteriorar la resistencia mecánica de los elementos constructivos a los que se fijen",
      "Se podrán fijar al soporte de una conducción aérea de energía eléctrica",
      "Nunca se fijarán directamente a la obra civil"
    ],
    "correctIndex": 1,
    "explain": "Los soportes deben mantener la resistencia mecánica del edificio y cumplir normativa de seguridad estructural. «No deberán deteriorar la resistencia mecánica de los elementos constructivos a los que se fijen».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q175",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Defina \"estación fija remota de aficionado\":",
    "options": [
      "Estación fija de aficionado que puede ser accionada a distancia",
      "Estación móvil de uso intermitente",
      "Estación portátil que se utiliza en itinerarios de larga distancia",
      "Estación repetidora de gran alcance"
    ],
    "correctIndex": 0,
    "explain": "La memoria descriptiva identifica emplazamiento, equipos y sistema radiante; no sustituye otros documentos que el reglamento exija aparte. La opción válida es «Estación fija de aficionado que puede ser accionada a distancia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q176",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Es obligatorio respetar la reglamentación del país CEPT donde vayamos a emitir?:",
    "options": [
      "No. Seguiremos siempre la reglamentación española",
      "Siempre",
      "Utilizaremos solo VHF/UHF",
      "Siempre y cuando no esté en contradicción con la nuestra"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Siempre».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q177",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Las autorizaciones especiales para emisiones en bandas de frecuencias de uso restringido:",
    "options": [
      "No están previstas en la reglamentación vigente",
      "Están previstas para realizar emisiones sin utilización de un distintivo",
      "Se otorgarán por un plazo máximo de dieciocho meses",
      "No permiten la utilización de equipos de construcción propia"
    ],
    "correctIndex": 2,
    "explain": "Las autorizaciones en bandas restringidas tienen plazo limitado; el enunciado fija el máximo legal aplicable. «Se otorgarán por un plazo máximo de dieciocho meses».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q179",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "De acuerdo con el artículo 25 del Reglamento de Radiocomunicaciones de la UIT:",
    "options": [
      "Las estaciones de aficionado nunca transmitirán su indicativo",
      "Las estaciones de aficionado nunca transmitirán su indicativo si así lo determina la reglamentación nacional vigente",
      "En el transcurso de sus emisiones, las estaciones de aficionado deberán transmitir su indicativo a intervalos cortos",
      "Las transmisiones entre estaciones de aficionados de diferentes países deberán codificarse siempre por motivos de seguridad"
    ],
    "correctIndex": 2,
    "explain": "El art. 25 UIT regula comunicaciones entre aficionados, identificación y condiciones del servicio; las administraciones pueden notificar restricciones. «En el transcurso de sus emisiones, las estaciones de aficionado deberán transmitir su indicativo a intervalos cortos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q180",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "¿Cuál de las siguientes abreviaturas del código Q indica que se debe cesar de transmitir?:",
    "options": [
      "QRT",
      "QRI",
      "QRH",
      "QSA"
    ],
    "correctIndex": 0,
    "explain": "QRT indica cese de transmisión; QRP es baja potencia y QSA la fuerza de la señal recibida. «QRT». No confundir con el distractor del mismo bloque temático.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q206",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En el alfabeto fonético internacional la letra R se codifica como:",
    "options": [
      "Roger",
      "Romeo",
      "Ron",
      "Radio"
    ],
    "correctIndex": 1,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Romeo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q207",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El sufijo de una letra se reservará para:",
    "options": [
      "Concursos internacionales de alta competitividad",
      "Radioaficionados que exclusivamente practiquen la radioafición internacional",
      "Concursos nacionales de alta competitividad",
      "Eventos especiales de relevancia internacional"
    ],
    "correctIndex": 0,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Concursos internacionales de alta competitividad».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q208",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Los planes de banda de la IARU en las diferentes Regiones geográficas definidas por la Unión Internacional de Telecomunicaciones (UIT):",
    "options": [
      "Pueden ser distintos en cada Región",
      "Son los mismos en todas las Regiones",
      "Son siempre iguales los de la Región 1 a los de la Región 3",
      "No hay planes de banda en la Región 3"
    ],
    "correctIndex": 0,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Pueden ser distintos en cada Región».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q211",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Las frecuencias de llamada:",
    "options": [
      "Sólo se usan en HF",
      "Actualmente ya no se utilizan",
      "Permiten contactar con otros operadores que utilizan el mismo modo",
      "Nunca se usan en VHF"
    ],
    "correctIndex": 2,
    "explain": "Relación clave: λ = c/f (en vacío c ≈ 3·10⁸ m/s) o λ = v/f en un medio. «Permiten contactar con otros operadores que utilizan el mismo modo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q212",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Los daños y perjuicios originados por una antena de una estación de radioaficionado, correrán a cargo del titular de la licencia de la estación:",
    "options": [
      "Únicamente los producidos al instalar la antena",
      "Los producidos con motivo de la instalación, mantenimiento y desmontaje de la antena",
      "Únicamente los producidos al desmontar la antena",
      "Únicamente los producidos por un mantenimiento defectuoso"
    ],
    "correctIndex": 1,
    "explain": "El titular responde de daños por instalación, uso o mantenimiento defectuoso de su antena (seguro y responsabilidad civil). «Los producidos con motivo de la instalación, mantenimiento y desmontaje de la antena».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q213",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cómo se deletrea la palabra MAR?:",
    "options": [
      "Mayo, Alfa, Roma",
      "Mike, Alfa, Roma",
      "Mayo, Alfa, Romeo",
      "Mike, Alfa, Romeo"
    ],
    "correctIndex": 3,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Mike, Alfa, Romeo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q215",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "La señal QRT tiene el significado de:",
    "options": [
      "Su frecuencia varía",
      "Deje de transmitir",
      "Haga el favor de no interferir",
      "Acuse recibo"
    ],
    "correctIndex": 1,
    "explain": "Los códigos Q abrevian situaciones en tráfico: QRL ocupado, QRX espera, QSY cambio de frecuencia, QRT cese, QRM interferencia, QRN ruido atmosférico. «Deje de transmitir».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q216",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La transmisión del distintivo de llamada se efectuará:",
    "options": [
      "Únicamente al comienzo de la emisión",
      "Al menos cada treinta minutos",
      "Únicamente si se emite desde una estación móvil",
      "Al comienzo y final de cada emisión"
    ],
    "correctIndex": 3,
    "explain": "El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «Al comienzo y final de cada emisión».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q219",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Las comunicaciones entre estaciones de aficionados se identificarán mediante un distintivo de llamada al comienzo y al final de cada emisión. Esta norma puede verse modificada en el supuesto de que la emisión:",
    "options": [
      "Se realice a partir de las 22 horas",
      "Sea demasiado extensa",
      "Se realice para información de propaganda, cualquiera que sea la naturaleza de esta",
      "Sea de un corresponsal extranjero"
    ],
    "correctIndex": 1,
    "explain": "El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «Sea demasiado extensa».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q220",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Una estación portable de aficionado:",
    "options": [
      "Puede ser utilizada durante su traslado",
      "Es una estación fija, que puede ser utilizada temporalmente en ubicación distinta de la habitual",
      "Al ser estación móvil, puede ser utilizada mientras se encuentre detenida en puntos no determinados",
      "Posee antena y fuente de energía incorporada al propio equipo, ya que es una estación móvil"
    ],
    "correctIndex": 1,
    "explain": "La estación portátil es una estación fija usada temporalmente fuera del emplazamiento habitual del titular (anexo I, BOE-A-2013-7624). «Es una estación fija, que puede ser utilizada temporalmente en ubicación distinta de la habitual».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q222",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Según la legislación de Telecomunicaciones, en el caso de desmontar una instalación de antenas por obras en la comunidad, cuando estas hayan terminado:",
    "options": [
      "Tendrá que presentar nueva memoria",
      "Podrá instalarla nuevamente en condiciones similares a las anteriores",
      "Ha de pedir permiso a la comunidad de propietarios",
      "Deberá comunicarlo a la Administración competente en espectro radioeléctrico y Tecnología de la Información"
    ],
    "correctIndex": 1,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «Podrá instalarla nuevamente en condiciones similares a las anteriores» es la formulación del banco.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q223",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En la nomenclatura de las bandas de frecuencia, la banda de HF corresponde a la gama de frecuencias de:",
    "options": [
      "3 a 30 KHz",
      "300 a 3.000 KHz",
      "3 a 30 MHz",
      "300 a 3.000 MHz"
    ],
    "correctIndex": 2,
    "explain": "En la nomenclatura ITU, HF (High Frequency) designa el tramo aproximado de 3–30 MHz. Para este enunciado la respuesta correcta es «3 a 30 MHz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q225",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En las comunicaciones del servicio de aficionados, la palabra GOLF se deletreará:",
    "options": [
      "Simplemente con la palabra Golf",
      "Golfo, oscar, lima, félix",
      "Golfo, oscar, lima, foxtrot",
      "Golf, oscar, lima, foxtrot"
    ],
    "correctIndex": 3,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Golf, oscar, lima, foxtrot».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q226",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "En relación con la instalación en el exterior de un inmueble de una antena de estación de aficionado, el punto o elemento de fijación de las riostras en la obra civil del inmueble, repartiendo los esfuerzos mecánicos, se conoce con el nombre de:",
    "options": [
      "Mástil",
      "Soporte",
      "Plano de paso",
      "Anclaje"
    ],
    "correctIndex": 3,
    "explain": "Las antenas en comunidades de propietarios requieren procedimiento, comunicación y a veces acuerdos; no es libertad total ni prohibición absoluta. «Anclaje».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q227",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En relación con una estación portátil de aficionado, marque la alternativa errónea:",
    "options": [
      "Posee una antena incorporada al propio equipo",
      "Puede ser utilizada en movimiento",
      "Posee una fuente de energía incorporada al propio equipo",
      "Es a la vez una estación portable de aficionado"
    ],
    "correctIndex": 3,
    "explain": "Portátil y portátil de mano son categorías del reglamento: una estación portátil puede ser también «portable» según el desplazamiento del enunciado. «Es a la vez una estación portable de aficionado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q228",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Con autorización de su titular, podrá hacer uso de una estación de aficionado:",
    "options": [
      "Cualquier familiar de primer grado de consanguinidad",
      "Aquella persona que se encuentre solamente en posesión del diploma de operador de estaciones radioeléctricas de aficionado",
      "Cualquier otro titular de autorización de radioaficionado",
      "Salvo en casos de emergencia o desastre, nadie"
    ],
    "correctIndex": 2,
    "explain": "Otro titular de autorización puede operar la estación del titular si este lo autoriza; en emisión se identifican ambos según el reglamento. «Cualquier otro titular de autorización de radioaficionado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q229",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La licencia CEPT de un radioaficionado español:",
    "options": [
      "Solamente le permite hacer uso de ella dentro del territorio español",
      "No le habilita para utilizar estaciones portables",
      "Se la concederá la autoridad competente del país europeo que vaya a visitar",
      "Le permite la utilización de todas las bandas atribuidas al Servicio de Aficionados autorizadas en el país donde se va a operar la estación"
    ],
    "correctIndex": 3,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Le permite la utilización de todas las bandas atribuidas al Servicio de Aficionados autorizadas en el país donde se va a operar la estación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q230",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En el país visitado temporalmente, el radioaficionado está obligado a:",
    "options": [
      "Pedir indicativo de dicho país",
      "Presentar copia de su expediente",
      "Solicitar permiso de antenas",
      "Presentar la autorización de radioaficionado, si las autoridades se lo exigen"
    ],
    "correctIndex": 3,
    "explain": "Con licencia CEPT u homologación, en el país visitado debes poder acreditar tu autorización si la administración lo solicita. «Presentar la autorización de radioaficionado, si las autoridades se lo exigen».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q232",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La cancelación de la licencia de estación de aficionado se efectuará en el siguiente caso:",
    "options": [
      "Cuando no disponga de diploma de operador",
      "Si presenta quejas la comunidad de vecinos",
      "En cualquier momento a petición del titular",
      "Cuando la instalación de la antena sea defectuosa"
    ],
    "correctIndex": 2,
    "explain": "HAREC y las recomendaciones CEPT facilitan reconocimiento entre administraciones; cada país mantiene su procedimiento nacional. Encaja «En cualquier momento a petición del titular».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q233",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En radiotelefonía, si tenemos necesidad de emitir la señal de socorro, lo haremos mediante la palabra:",
    "options": [
      "Socorro",
      "Ayuda",
      "Mayday",
      "Auxilio"
    ],
    "correctIndex": 2,
    "explain": "Las señales de socorro están reservadas a emergencias reales; su uso indebido es infracción grave. «Mayday».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q234",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La autorización administrativa de uso del espectro radioeléctrico por radioaficionados:",
    "options": [
      "Puede ser objeto de transferencia",
      "Para su obtención se requerirá la posesión previa del diploma de operador",
      "Nunca podrá ser objeto de revocación",
      "Tiene naturaleza de autorización colectiva"
    ],
    "correctIndex": 1,
    "explain": "Primero se obtiene el diploma de operador (prueba de capacidad); la autorización de radioaficionado es el paso previo o paralelo según el trámite del enunciado. «Para su obtención se requerirá la posesión previa del diploma de operador».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q237",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Toda telecomunicación transmitida por medio de ondas radioeléctricas recibe el nombre de:",
    "options": [
      "Espectro radioeléctrico",
      "Campo eléctrico",
      "Radioafición",
      "Radiocomunicación"
    ],
    "correctIndex": 3,
    "explain": "Radiocomunicación es toda telecomunicación realizada mediante ondas radioeléctricas. «Radiocomunicación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q238",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Como norma general, la potencia máxima de salida de los transmisores de las estaciones desatendidas en las bandas de VHF y UHF, cuando estén instaladas fuera del casco urbano, será:",
    "options": [
      "Igual que la permitida en la banda de HF",
      "50 W.",
      "Igual que la permitida a las instaladas en el interior del casco urbano",
      "35 W"
    ],
    "correctIndex": 1,
    "explain": "Según el art. 25.h y el anexo I del reglamento vigente (BOE-A-2013-7624), en VHF/UHF desatendidas suele ser hasta 10 W en casco urbano y hasta 50 W fuera, salvo motivación especial. En este enunciado la opción correcta del banco es «25 W»."
  },
  {
    "id": "ure-p2-q269",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cómo se deletrea la palabra FIN?:",
    "options": [
      "Fado, India, November",
      "Foxtrot, India, November",
      "Foxtrot, Inglés, Nono",
      "Fox, India, Nada"
    ],
    "correctIndex": 1,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Foxtrot, India, November».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q27",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "¿Qué abreviatura indica que el operador sufre una interferencia?:",
    "options": [
      "QRM",
      "QRK",
      "QRL",
      "QRA"
    ],
    "correctIndex": 0,
    "explain": "QRM indica interferencia de origen artificial (otras emisiones o equipos). QRN es ruido atmosférico. «QRM».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q270",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "En telegrafía, la abreviatura de procedimiento usada para finalizar una transmisión es:",
    "options": [
      "AS",
      "TU",
      "FN",
      "AR"
    ],
    "correctIndex": 3,
    "explain": "En telegrafía, AR (end of message) marca el fin del mensaje. VA (end of work) indica fin de la comunicación. «AR».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q271",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "La señal de Socorro en radiotelefonía se compone de:",
    "options": [
      "MAYDAY (tres veces), la palabra AQUÍ o DE y el distintivo de llamada (tres veces)",
      "AQUÍ o DE, el distintivo de llamada (tres veces) y la palabra MAYDAY (tres veces)",
      "Únicamente MAYDAY (tres veces)",
      "MAYDAY (una vez), la palabra AQUÍ o DE y el distintivo de llamada ( tres veces)"
    ],
    "correctIndex": 0,
    "explain": "Las señales de socorro están reservadas a emergencias reales; su uso indebido es infracción grave. «MAYDAY (tres veces), la palabra AQUÍ o DE y el distintivo de llamada (tres veces)».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q273",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Sobre los planes de bandas de la IARU es correcto decir que:",
    "options": [
      "La IARU no tiene planes de banda para la Región 1",
      "Sirven de guía a los radioaficionados de todo el mundo",
      "Deben ser tenidos en cuenta únicamente si se opera en Canarias",
      "En España se deben aplicar los planes de banda de la IARU para la Región 2"
    ],
    "correctIndex": 1,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Sirven de guía a los radioaficionados de todo el mundo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q274",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La obtención de la autorización de radioaficionado requerirá la obtención previa de:",
    "options": [
      "Titulo de operador",
      "Carnet de operador",
      "Diploma de operador",
      "Permiso de un radio club"
    ],
    "correctIndex": 2,
    "explain": "Sin superar la prueba de operador (diploma) no se concede la autorización de radioaficionado. «Diploma de operador».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q276",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "¿Qué abreviatura del código Q se refiere a la inteligibilidad de las señales?:",
    "options": [
      "QRV",
      "QRK",
      "QRA",
      "QSW"
    ],
    "correctIndex": 1,
    "explain": "QRK califica la inteligibilidad de la señal recibida (claridad del mensaje). No confundir con QRM (interferencia) ni QRN (ruido natural). «QRK».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q277",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El sufijo de un distintivo de llamada de tres letras que comience por “Y” o “Z”, se reservará para:",
    "options": [
      "Uso temporales de relevancia internacional",
      "Usos temporales de relevancia nacional",
      "No se contempla dicha reserva en el reglamento vigente",
      "Las estaciones automáticas desatendidas analógicas y digitales respectivamente"
    ],
    "correctIndex": 3,
    "explain": "Los sufijos que empiezan por Y o Z se reservan a estaciones automáticas desatendidas (analógicas y digitales). «Las estaciones automáticas desatendidas analógicas y digitales respectivamente».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q278",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Al deletrear las letras de su indicativo el radioaficionado debe utilizar:",
    "options": [
      "El código de deletreo RST",
      "Palabras de una sola sílaba",
      "Palabras del idioma en que mejor se exprese",
      "El código de deletreo ICAO"
    ],
    "correctIndex": 3,
    "explain": "El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «El código de deletreo ICAO».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q279",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Qué sufijos de tres letras están reservados para estaciones colectivas de Asociaciones de radioaficionados y Radio Clubs respectivamente?:",
    "options": [
      "Los que comienzan por: DD; TT; XX",
      "Los que comienzan por: UR y RC o RK",
      "Los que comienzan por: MMA, MAM, PAN",
      "Los que comienzan por: EEE, EDD, EFF"
    ],
    "correctIndex": 1,
    "explain": "Los sufijos que empiezan por Y o Z se reservan a estaciones automáticas desatendidas (analógicas y digitales). «Los que comienzan por: UR y RC o RK».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q280",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El plazo de que dispone la Administración para resolver y notificar las solicitudes de autorizaciones de radioaficionado será de:",
    "options": [
      "Tres semanas",
      "Cuatro semanas",
      "Cinco semanas",
      "Seis semanas"
    ],
    "correctIndex": 3,
    "explain": "Los plazos de resolución administrativa están en el reglamento; el banco fija un plazo concreto para este supuesto (p. ej. seis semanas). «Seis semanas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q281",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los extranjeros que acrediten documentalmente su condición de residentes en España, podrán obtener autorización de radioaficionado, cuando:",
    "options": [
      "Sean titulares de Licencia de radioaficionado en su país de origen",
      "Tengan Diploma de Operador de su país de origen",
      "Sean titulares del Certificado HAREC",
      "Nunca"
    ],
    "correctIndex": 2,
    "explain": "Un extranjero residente puede obtener autorización en España si acredita residencia y, según el supuesto, el certificado HAREC (armonización CEPT T/R 61-02). «Sean titulares del Certificado HAREC».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q282",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "A cual de las siguientes provincias pertenece el distintivo EB1VZY:",
    "options": [
      "Álava",
      "Ávila",
      "Zaragoza",
      "Guadalajara"
    ],
    "correctIndex": 1,
    "explain": "EB indica estación de aficionado en España; la cifra de distrito identifica la provincia (EB1 incluye Ávila en el banco). «Ávila».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q283",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cual de los siguientes sufijos podrá ser asignado a un distintivo de llamada de la autorización de radioaficionado?:",
    "options": [
      "EEE",
      "TTT",
      "PAN",
      "QRS"
    ],
    "correctIndex": 0,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «EEE».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q284",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En la memoria descriptiva, para la obtención de la licencia de una estación de aficionado, no es preciso incluir:",
    "options": [
      "Las características y resistencia de la toma de tierra",
      "Un plano señalando la ubicación de la estación",
      "Marca, modelo y número de serie de los equipos radioeléctricos",
      "Certificado de empadronamiento"
    ],
    "correctIndex": 3,
    "explain": "La memoria descriptiva identifica emplazamiento, equipos y sistema radiante; no sustituye otros documentos que el reglamento exija aparte. La opción válida es «Certificado de empadronamiento».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q285",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En la nomenclatura de las bandas de frecuencia, el símbolo LF corresponde a la banda de frecuencias:",
    "options": [
      "30 a 300 kHz",
      "30 a 300 GHz",
      "300 a 3000 GHz",
      "30 a 300 MHz"
    ],
    "correctIndex": 0,
    "explain": "En la nomenclatura ITU, LF (Low Frequency) designa el tramo aproximado de 30–300 kHz. Para este enunciado la respuesta correcta es «30 a 300 kHz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q287",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Las autorizaciones especiales de uso del espectro radioeléctrico por aficionados:",
    "options": [
      "No están sujetas a ningún procedimiento",
      "Habilitan a sus titulares a un uso ilimitado y permanente",
      "Son nominativas y sólo habilitarán para la realización de emisiones a su titular",
      "No tienen limitaciones geográficas"
    ],
    "correctIndex": 2,
    "explain": "Las autorizaciones especiales son personales (nominativas) y limitan bandas, potencia o modalidad; no son transferibles. «Son nominativas y sólo habilitarán para la realización de emisiones a su titular».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q288",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Entre las obligaciones de un gestor de una estación desatendida no se encuentra la de:",
    "options": [
      "Actualizar periódicamente la información existente",
      "Procurar que el mantenimiento técnico de la estación garantice el servicio continuo de la misma",
      "Otorgar la autorización y conformidad del inicio del funcionamiento de la estación",
      "Verificar que el tráfico de información se realice conforme a lo previsto por la normativa vigente al respecto"
    ],
    "correctIndex": 2,
    "explain": "El gestor debe cumplir requisitos técnicos y de supervisión que marca el reglamento; no «otorga» licencias a terceros en sentido administrativo. «Otorgar la autorización y conformidad del inicio del funcionamiento de la estación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q289",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "La banda de frecuencias número 8, cuyo símbolo es VHF, corresponde a las ondas:",
    "options": [
      "Kilométricas",
      "Métricas",
      "Decimétricas",
      "Milimétricas"
    ],
    "correctIndex": 1,
    "explain": "Las ondas métricas (30–300 MHz) se asocian al símbolo VHF en la nomenclatura habitual del examen. «Métricas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q291",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿Un radioaficionado podrá ser autorizado a instalar una estación automática desatendida?:",
    "options": [
      "Si únicamente realiza emisiones en bandas de HF",
      "Únicamente en localidades aisladas",
      "Sí, previa autorización administrativa conforme a los arts. 24 y 25 del reglamento.",
      "Si dispone de diploma desde hace más de 15 años"
    ],
    "correctIndex": 2,
    "explain": "El reglamento (BOE-A-2013-7624, arts. 24-25) autoriza repetidores y estaciones automáticas desatendidas con resolución administrativa; no están prohibidas. «En ningún caso»."
  },
  {
    "id": "ure-p2-q292",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿Un radioaficionado debe tener siempre una estación fija?:",
    "options": [
      "Si reside en una isla",
      "Si ha obtenido el diploma hace más de 5 años",
      "Si emite únicamente en VHF",
      "No es obligatorio disponer de estación fija"
    ],
    "correctIndex": 3,
    "explain": "La memoria descriptiva identifica emplazamiento, equipos y sistema radiante; no sustituye otros documentos que el reglamento exija aparte. La opción válida es «No es obligatorio disponer de estación fija».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q293",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Un radioaficionado que cambia de residencia no podrá mantener el mismo distintivo si:",
    "options": [
      "Su nueva residencia se encuentra en otra provincia",
      "Su nueva residencia se encuentra en una provincia a la que corresponde el distrito 0",
      "Su nueva provincia de residencia pertenece a un distrito distinto",
      "Su nueva provincia de residencia se encuentra en distinta Comunidad Autónoma"
    ],
    "correctIndex": 2,
    "explain": "Si la nueva residencia está en otro distrito (otra cifra EA), no puedes conservar el mismo indicativo sin trámite. «Su nueva provincia de residencia pertenece a un distrito distinto».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q294",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Un radioaficionado está obligado a ser socio de una asociación de radioaficionados:",
    "options": [
      "Siempre",
      "Únicamente si el radioaficionado es menor de 18 años",
      "No",
      "Únicamente si efectúa emisiones en frecuencias atribuidas al Servicio de Aficionados por Satélite"
    ],
    "correctIndex": 2,
    "explain": "Pertenecer a una asociación puede ser útil, pero no es requisito legal para operar con autorización vigente. Por eso «No».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q295",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Un radioaficionado español que traslade su residencia a Croacia podrá obtener una licencia de radioaficionado en dicho país si:",
    "options": [
      "Croacia aplica la Recomendación T/R 61-02 de la CEPT",
      "Tiene una antigüedad mínima de 5 años",
      "Tiene familiares de nacionalidad croata",
      "Se compromete a emitir únicamente en VHF"
    ],
    "correctIndex": 0,
    "explain": "HAREC y las recomendaciones CEPT facilitan reconocimiento entre administraciones; cada país mantiene su procedimiento nacional. Encaja «Croacia aplica la Recomendación T/R 61-02 de la CEPT».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q296",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "La clase de emisión A3E corresponde a:",
    "options": [
      "Doble banda lateral con ausencia de señal moduladora",
      "Doble banda lateral con un solo canal con información analógica",
      "Modulación de frecuencia con dos o más canales",
      "Banda lateral única con portadora reducida"
    ],
    "correctIndex": 1,
    "explain": "Las clases ITU describen tipo de modulación y contenido; A3E indica AM con doble banda lateral y señal analógica de telefonía. La correcta es «Doble banda lateral con un solo canal con información analógica».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q298",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En el alfabeto fonético internacional con que palabra se identifica la letra U:",
    "options": [
      "Uniform",
      "Unidad",
      "Universal",
      "Ungir"
    ],
    "correctIndex": 0,
    "explain": "El alfabeto fonético ICAO evita confusiones entre letras parecidas (B/D, M/N) en tráfico de voz. La palabra correcta del enunciado es «Uniform».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q30",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "No es causa de revocación de una autorización de radioaficionado:",
    "options": [
      "El mal uso del dominio público que provoque alteraciones que impidan el uso por terceros que dispongan del correspondiente título habilitante",
      "No adquirir una estación radioeléctrica de aficionado",
      "El incumplimiento del deber de comunicar fehacientemente a la Administración, cada cinco años, la intención de continuar utilizando el dominio público radioeléctrico",
      "La utilización para fines distintos de los que se establecen en la resolución de la autorización"
    ],
    "correctIndex": 1,
    "explain": "La revocación requiere causas legales concretas; no tener todavía estación montada no es, por sí solo, motivo de revocación en este supuesto. «No adquirir una estación radioeléctrica de aficionado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q31",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Una de las siguientes provincias españolas se encuentra adscrita al distrito 5. Indíquela:",
    "options": [
      "Almería",
      "Albacete",
      "Álava",
      "Ávila"
    ],
    "correctIndex": 1,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Albacete».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q32",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El distintivo de llamada AM8SOS:",
    "options": [
      "Ha sido asignado para uso temporal",
      "Le ha sido otorgado a una Asociación de Radioaficionados, vinculada con Protección Civil",
      "Su titular reside en Las Palmas de Gran Canaria",
      "No se puede asignar"
    ],
    "correctIndex": 3,
    "explain": "El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «No se puede asignar».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q329",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En comunicaciones del Servicio de Aficionados, la palabra BOJ se deletrea:",
    "options": [
      "Bravo, Oscar, Julio",
      "Brezo, Oscar, Juliett",
      "Bravo, Oscar, Juliett",
      "Bravo, Ortega, Julio"
    ],
    "correctIndex": 2,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Bravo, Oscar, Juliett».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q33",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Para utilizar un repetidor de VHF se emitirá en el canal apropiado de la banda:",
    "options": [
      "145,0000 - 145,1875 MHz",
      "430,000 - 440,000 MHz",
      "144,000 - 144,500 MHz",
      "431,050 - 431,825 MHz"
    ],
    "correctIndex": 0,
    "explain": "En la nomenclatura ITU, VHF designa el tramo aproximado de 30–300 MHz. Para este enunciado la respuesta correcta es «145,0000 - 145,1875 MHz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q330",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "¿Que grupo del código Q indica que el operador de la estación llamará más tarde?:",
    "options": [
      "QRZ",
      "QRX",
      "QRL",
      "QSW"
    ],
    "correctIndex": 1,
    "explain": "QRX indica que la estación volverá a llamar o está esperando. QRL significa «estoy ocupado». «QRX».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q331",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El distintivo de llamada estará constituido por un grupo alfanumérico del modo siguiente:",
    "options": [
      "Prefijo + 1 letra",
      "UR + RC+ RK",
      "Prefijo + Distrito + Sufijo",
      "EA+EB+EC"
    ],
    "correctIndex": 2,
    "explain": "El distintivo español combina prefijo nacional (E…), cifra de distrito y sufijo asignado por la administración. Por eso la estructura es «Prefijo + Distrito + Sufijo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q332",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Los planes de bandas de la IARU para la Región 1 deben ser tenidos en cuenta:",
    "options": [
      "Únicamente por los radioaficionados principiantes",
      "Únicamente en HF",
      "Únicamente si se opera en Canarias",
      "Por todo radioaficionado que opere en España"
    ],
    "correctIndex": 3,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Por todo radioaficionado que opere en España».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q334",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "A cual de las siguientes localidades puede pertenece el distintivo de llamada: EA6VYX:",
    "options": [
      "Lleida",
      "Huelva",
      "Palma de Mallorca",
      "Bilbao"
    ],
    "correctIndex": 2,
    "explain": "El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «Palma de Mallorca».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q335",
    "part": 1,
    "topicId": "receptores-emisores",
    "stem": "Comprobar si alguien está utilizando una frecuencia, antes de iniciar una transmisión en la misma, es:",
    "options": [
      "Muy perjudicial para el uso eficiente del espectro radioeléctrico",
      "Obligatorio",
      "Una práctica de operar adecuada",
      "Sancionable según la reglamentación vigente"
    ],
    "correctIndex": 2,
    "explain": "Antes de transmitir conviene escuchar la frecuencia (QRL/QRY) para no interferir: buena práctica operativa. «Una práctica de operar adecuada».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q336",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Indica cual de las siguientes series de prefijos internacionales corresponden a las atribuidas a España, según el Reglamento de Radiocomunicaciones:",
    "options": [
      "FM, FN, FA",
      "EA, EB, EC",
      "KN, KK, KL",
      "EPA, EQZ, EAA"
    ],
    "correctIndex": 1,
    "explain": "España tiene prefijos ITU EA, EB y EC para estaciones amateur. FM/FN son francés; KN americano. «EA, EB, EC».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q338",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El prefijo “EG” de un distintivo de llamada se relaciona con:",
    "options": [
      "Usos temporales de especial relevancia para eventos de carácter regional, autonómico o local",
      "Usos temporales de especial relevancia para eventos de carácter nacional",
      "Usos temporales no especialmente significativos",
      "Usos temporales de relevancia internacional"
    ],
    "correctIndex": 0,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Usos temporales de especial relevancia para eventos de carácter regional, autonómico o local».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q339",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Entre las abreviaturas más usuales en las comunicaciones de radioaficionados se encuentra “CL”, que significa:",
    "options": [
      "Cierre de la estación",
      "Repita",
      "Interferencia de RF",
      "Estación de control"
    ],
    "correctIndex": 0,
    "explain": "QRT indica cese de transmisión o cierre de estación en el Q-code internacional; otros Q-codes abrevian tráfico (QSY, QSL…). «Cierre de la estación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q34",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Una emisión de radioaficionado:",
    "options": [
      "Se podrá codificar para ocultar su contenido",
      "No debe utilizarse para casos de emergencia o desastre",
      "Podrá utilizarse para comunicar con radioaficionados de cualquier país, sin limitaciones",
      "Se limitará a temas relacionados con el servicio de aficionados y a observaciones de carácter personal"
    ],
    "correctIndex": 3,
    "explain": "Las emisiones deben limitarse a finalidades del servicio de aficionados (técnicas, ensayos, intercambio entre operadores). «Se limitará a temas relacionados con el servicio de aficionados y a observaciones de carácter personal».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q340",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "Un mensaje de socorro NO incluirá:",
    "options": [
      "La señal de socorro Mayday",
      "Datos relativos de la estación en peligro",
      "Indicaciones relativas a su situación y otras informaciones aclaratorias",
      "La señal de seguridad Securite"
    ],
    "correctIndex": 3,
    "explain": "Las señales de socorro están reservadas a emergencias reales; su uso indebido es infracción grave. «La señal de seguridad Securite».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q341",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El titular de una licencia CEPT, expedida por una Administración que haya adoptado la recomendación T/R 61-01, estará obligado a: (indique cual de estas afirmaciones es falsa):",
    "options": [
      "Respetar las disposiciones del Reglamento de Radiocomunicaciones y de la Reglamentación vigente en el País visitado",
      "No respetar las disposiciones del Reglamento de Radiocomunicaciones y de la Reglamentación vigente en el país de origen",
      "Observar todas las limitaciones que le vengan impuestas en lo concerniente a las condiciones locales de naturaleza técnica o relativa a los poderes públicos",
      "Respetar las diferencias de atribuciones de frecuencias en los servicios de aficionados en las tres Regiones de la Unión Internacional de Telecomunicaciones"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «No respetar las disposiciones del Reglamento de Radiocomunicaciones y de la Reglamentación vigente en el país de origen».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q344",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En la nomenclatura de las bandas de frecuencia las ondas métricas se relacionan con:",
    "options": [
      "La gama de frecuencia de 3 a 30 GHz",
      "El símbolo MF",
      "La banda nº 9",
      "La abreviatura métrica B. m."
    ],
    "correctIndex": 3,
    "explain": "Relación clave: λ = c/f (en vacío c ≈ 3·10⁸ m/s) o λ = v/f en un medio. «La abreviatura métrica B. m.».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q346",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "De acuerdo con el Apéndice 1 del Reglamento de Radiocomunicaciones de la UIT la clase de emisión F3E corresponde a una emisión de:",
    "options": [
      "Telegrafía",
      "Televisión",
      "Telefonía con dos o más canales",
      "Telefonía con un solo canal"
    ],
    "correctIndex": 3,
    "explain": "Las clases ITU describen tipo de modulación y contenido; A3E indica AM con doble banda lateral y señal analógica de telefonía. La correcta es «Telefonía con un solo canal».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q347",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La instalación y funcionamiento de una estación de aficionado precisará de una licencia, la cual se considerará asociada a:",
    "options": [
      "Una asociación legalizada de radioaficionados de la provincia correspondiente",
      "La estación automática desatendida más cercana",
      "La autorización de radioaficionado de su titular",
      "Toda la gama de frecuencias que pueda utilizar"
    ],
    "correctIndex": 2,
    "explain": "Sin titular con autorización de radioaficionado (y licencia de estación cuando proceda) no hay instalación regular. «La autorización de radioaficionado de su titular».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q348",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "No se puede considerar como estación automática desatendida a una estación:",
    "options": [
      "Repetidora de portadora",
      "Radiobaliza",
      "Repetidora digital",
      "Colectiva de aficionado"
    ],
    "correctIndex": 3,
    "explain": "Una estación colectiva de aficionados sí puede ser automática desatendida si cumple requisitos; el enunciado pide la opción que no encaja con la definición. «Colectiva de aficionado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q349",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Qué objetivo se pretende al instalar un repetidor de radioaficionado:",
    "options": [
      "Determinar la ubicación de aparatos radioeléctricos",
      "Ampliar el alcance de las comunicaciones",
      "Inspeccionar fehacientemente las emisiones fuera de banda",
      "Detectar y reducir interferencias dentro de un área determinada"
    ],
    "correctIndex": 1,
    "explain": "El repetidor amplía cobertura retransmitiendo en otra frecuencia; no sustituye la licencia ni autoriza tráfico ajeno al servicio. «Ampliar el alcance de las comunicaciones».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q35",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Si una estación tiene el indicativo de llamada EF6ABC:",
    "options": [
      "Pertenece a un radioaficionado de la provincia de Cantabria",
      "Se le ha adjudicado al periódico de tirada nacional \"ABC\", de ahí el sufijo",
      "Es concedido para uso temporal por un evento no especialmente significado",
      "Es de naturaleza indefinida"
    ],
    "correctIndex": 2,
    "explain": "EF marca distintivo temporal para eventos o autorizaciones no permanentes según el supuesto del banco. «Es concedido para uso temporal por un evento no especialmente significado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q350",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cuántas estaciones automáticas desatendidas podrán autorizarse en una zona?:",
    "options": [
      "No existe límite para estas autorizaciones",
      "Exclusivamente dos por provincia",
      "Se autorizarán en función de las necesidades del servicio",
      "Tres en VHF y dos en UHF"
    ],
    "correctIndex": 2,
    "explain": "El número de desatendidas autorizadas depende de necesidades del servicio y criterio de la administración, no de un cupo fijo universal en el enunciado. «Se autorizarán en función de las necesidades del servicio».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q351",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La Ley General de Telecomunicaciones tipifica como infracción muy grave:",
    "options": [
      "Carecer de los preceptivos cuadros de tarifas o de precios cuando su exhibición se exija por la normativa vigente",
      "La interceptación, sin autorización, de telecomunicaciones no destinadas al público en general",
      "La distribución, venta o exposición para la venta de equipos o aparatos cuya conformidad con los requisitos esenciales aplicables no haya sido evaluada de acuerdo con lo dispuesto en el titulo IV de esta ley o con los acuerdos o convenios internacionales celebrados por el Estado español",
      "La alteración, la manipulación o la omisión de las características técnicas, de las marcas, de las etiquetas, de los signos de identificación o de la documentación de los equipos o de los aparatos de telecomunicaciones"
    ],
    "correctIndex": 1,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «La interceptación, sin autorización, de telecomunicaciones no destinadas al público en general» es la formulación del banco.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q352",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Si un radioaficionado se identifica como: EA4ABC/M3BVM:",
    "options": [
      "Se trata de un radioaficionado con licencia expedida por otro país, operando ocasionalmente una estación española",
      "Se trata de un distintivo temporal reservado a estaciones colectivas",
      "Pertenece a un corresponsal de un diario nacional, emitiendo a un país extranjero",
      "Se trata de una estación no autorizada"
    ],
    "correctIndex": 0,
    "explain": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q353",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Un radioaficionado podrá ser autorizado a instalar un repetidor:",
    "options": [
      "Si la antigüedad de su licencia es superior a 5 años",
      "Sí, previa autorización administrativa conforme a los arts. 24 y 25 del reglamento.",
      "Únicamente en localidades de menos de 5000 habitantes",
      "Si la cota de su emplazamiento es inferior a 500 metros"
    ],
    "correctIndex": 1,
    "explain": "El reglamento (BOE-A-2013-7624, arts. 24-25) autoriza repetidores y estaciones automáticas desatendidas con resolución administrativa. «Sí, previa autorización administrativa conforme a los arts. 24 y 25 del reglamento.»."
  },
  {
    "id": "ure-p2-q354",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El montaje del sistema radiante una estación fija de radioaficionado será realizado:",
    "options": [
      "Como norma general, por un instalador de telecomunicaciones autorizado",
      "Siempre por el propio radioaficionado",
      "Utilizando exclusivamente equipos de fabricación española",
      "Por cualquier persona"
    ],
    "correctIndex": 0,
    "explain": "Como norma general el montaje del sistema radiante lo realiza un instalador inscrito en el registro correspondiente. «Como norma general, por un instalador de telecomunicaciones autorizado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q355",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Un radioaficionado podrá instalar la antena de su estación fija en el exterior de un inmueble si:",
    "options": [
      "En el inmueble reside un amigo",
      "En el inmueble no hay instalada otra antena",
      "Se hace cargo de los costes de la instalación",
      "Está legitimado para usar de la totalidad o parte del mismo y ha obtenido la autorización reglamentaria"
    ],
    "correctIndex": 3,
    "explain": "El titular puede usar zonas comunes o fachada del inmueble donde tiene derecho, respetando normativa de antenas y comunidad de propietarios. «Está legitimado para usar de la totalidad o parte del mismo y ha obtenido la autorización reglamentaria».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q356",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Un radioaficionado español que utiliza temporalmente su estación en Australia (país que aplica la Recomendación CEPT T/R 61-01):",
    "options": [
      "Puede emitir en las mismas frecuencias que en España",
      "Únicamente puede emitir en frecuencias inferiores a 1GHz",
      "No podrá solicitar protección contra interferencias perjudiciales",
      "Únicamente puede emitir en frecuencias de HF"
    ],
    "correctIndex": 2,
    "explain": "En país visitado CEPT aplicas sus condiciones locales; la protección contra interferencias la rige la administración visitada. «No podrá solicitar protección contra interferencias perjudiciales».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q358",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En el alfabeto fonético internacional con que palabra se identifica el número 9:",
    "options": [
      "Neuf",
      "Nove",
      "Nine",
      "Neun"
    ],
    "correctIndex": 2,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Nine».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q36",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "De acuerdo con la Ley General de Telecomunicaciones, por comisión de infracciones graves se puede imponer al infractor una multa de hasta:",
    "options": [
      "50.000 euros",
      "30.000 euros",
      "100.000 euros",
      "500.000 euros"
    ],
    "correctIndex": 3,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «500.000 euros» es la formulación del banco.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q37",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Para instalar una antena en un edificio en régimen de propiedad horizontal:",
    "options": [
      "Se necesita autorización expresa de la comunidad de propietarios",
      "Se comunicará a la Administración la dirección del presidente de la comunidad de propietarios",
      "No se precisa contratar un seguro para garantizar posibles responsabilidades",
      "No será necesario tener en cuenta las características mecánicas de la misma"
    ],
    "correctIndex": 1,
    "explain": "La polarización de la antena debe alinearse con la de la onda para máxima transferencia. «Se comunicará a la Administración la dirección del presidente de la comunidad de propietarios».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q38",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Para la instalación de antenas de radioaficionados, es obligatorio tener un seguro que cubra:",
    "options": [
      "La responsabilidad civil del titular",
      "Los desperfectos del material empleado",
      "Los accidentes del instalador",
      "Las posibles pérdidas de radiofrecuencia"
    ],
    "correctIndex": 0,
    "explain": "El seguro de antenas cubre daños a terceros por la instalación; es parte de la responsabilidad del titular. «La responsabilidad civil del titular».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q389",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El distintivo de llamada ED1YBD:",
    "options": [
      "Corresponde a una estación desatendida analógica",
      "Corresponde a una estación móvil marítima",
      "Tiene carácter temporal",
      "La secuencia no se contempla en el reglamento vigente"
    ],
    "correctIndex": 0,
    "explain": "Los indicativos ED… en el banco identifican estaciones desatendidas según el tipo (analógica o digital). «Corresponde a una estación desatendida analógica».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q39",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El distintivo de llamada de una estación de radioaficionado, estará constituido por:",
    "options": [
      "Ondas decamétricas",
      "Por un grupo alfanumérico",
      "Por un sufijo sin letras",
      "Sin sufijo"
    ],
    "correctIndex": 1,
    "explain": "El distintivo asignado es un grupo alfanumérico (prefijo, cifra de distrito y sufijo según el caso). «Por un grupo alfanumérico».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q390",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Que está ocurriendo si un radioaficionado se identifica como: EA3/OK2HM:",
    "options": [
      "Se están realizando pruebas en el distrito 3",
      "Un radioaficionado con licencia expedida en otro país, opera ocasionalmente en el distrito 3",
      "Se están realizando cambios en el reglamento y el distrito 3 es pionero",
      "Se trata de una conexión con interferencias"
    ],
    "correctIndex": 1,
    "explain": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q392",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los repetidores analógicos, ¿a qué velocidad deberán emitir, de forma automática, su distintivo en código Morse?:",
    "options": [
      "Nueve palabras por minuto",
      "Diez palabras por minuto",
      "Once palabras por minuto",
      "Doce palabras por minuto"
    ],
    "correctIndex": 1,
    "explain": "La identificación automática en CW del repetidor va a la velocidad que fija el banco (diez palabras por minuto). «Diez palabras por minuto».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q393",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Si un radioaficionado emite con el siguiente distintivo: EA7UE:",
    "options": [
      "Se trata de un radioaficionado de la Unión Europea temporalmente en España",
      "Se trata de un radioaficionado de Segovia",
      "Está emitiendo desde Andalucía",
      "Se trata de un distintivo solicitado por una Escuela Universitaria"
    ],
    "correctIndex": 2,
    "explain": "El distintivo identifica la estación en cada contacto; la forma y momento concretos dependen del supuesto del enunciado. «Está emitiendo desde Andalucía».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q394",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Los Planes de Banda:",
    "options": [
      "Son establecidos por las Asociaciones locales de radioaficionados",
      "Sirven de guía a los radioaficionados de todo el mundo",
      "Son establecidos sin tener en cuenta la división en Regiones de la UIT",
      "Deben ser aprobados por la Dirección General de Telecomunciaciones"
    ],
    "correctIndex": 1,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Sirven de guía a los radioaficionados de todo el mundo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q395",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "¿Qué grupo del código Q indica que perturban los atmosféricos?:",
    "options": [
      "QRN",
      "QSB",
      "QSD",
      "QRX"
    ],
    "correctIndex": 0,
    "explain": "QRN indica ruido atmosférico o natural (tormentas, estática). QRM es interferencia de origen artificial. «QRN».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q396",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Como norma general, la potencia de salida de los trasmisores de las estaciones desatendidas en las bandas de VHF y UHF dentro del casco urbano, no podrá exceder de:",
    "options": [
      "5 W",
      "10 W",
      "15 W",
      "20 W"
    ],
    "correctIndex": 1,
    "explain": "Según el art. 25.h y el anexo I del reglamento vigente (BOE-A-2013-7624), en VHF/UHF desatendidas suele ser hasta 10 W en casco urbano y hasta 50 W fuera, salvo motivación especial. En este enunciado la opción correcta del banco es «10 W»."
  },
  {
    "id": "ure-p2-q397",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Para la obtención de la licencia de estación de radioaficionado es necesario presentar:",
    "options": [
      "Solicitud adjuntando una memoria descriptiva del conjunto de la instalación",
      "Un escrito informando que se ha efectuado la instalación",
      "La cédula de habitabilidad del inmueble donde se va a instalar",
      "Documento que acredite estar inscrito en una asociación de Radioaficionado"
    ],
    "correctIndex": 0,
    "explain": "HAREC y las recomendaciones CEPT facilitan reconocimiento entre administraciones; cada país mantiene su procedimiento nacional. Encaja «Solicitud adjuntando una memoria descriptiva del conjunto de la instalación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q398",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Las estaciones automáticas desatendidas en la banda de HF tendrán una potencia de salida máxima de:",
    "options": [
      "25 W",
      "50 W",
      "75 W",
      "100 W"
    ],
    "correctIndex": 1,
    "explain": "Según el art. 25.h y el anexo I del reglamento vigente (BOE-A-2013-7624), en VHF/UHF desatendidas suele ser hasta 10 W en casco urbano y hasta 50 W fuera, salvo motivación especial. En este enunciado la opción correcta del banco es «50 W».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q399",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Las utilizaciones de carácter experimental con características técnicas distintas a las especificadas en el Reglamento de uso del dominio público radioeléctrico por aficionados:",
    "options": [
      "Únicamente están previstas en bandas de frecuencia superiores a 10,6 GHz",
      "Requerirán una autorización especial",
      "No están previstas en la reglamentación vigente",
      "Deberán ser previamente autorizadas por el Ayuntamiento de la localidad"
    ],
    "correctIndex": 1,
    "explain": "Las emisiones experimentales fuera del cuadro habitual requieren autorización especial (art. 17, BOE-A-2013-7624). «Requerirán una autorización especial».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q40",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿Qué regula la Ley 19/1983, en lo relativo a las antenas de las estaciones de radioaficionados?",
    "options": [
      "Las sanciones por instalaciones no comunicadas a la Administración",
      "La calidad de una buena instalación",
      "El derecho a instalar las antenas en el exterior de los inmuebles",
      "La obligación de respetar el plan de bandas reservado al servicio de aficionados"
    ],
    "correctIndex": 2,
    "explain": "La Ley de 19 julio 1983 sobre inmobiliaria y antenas regula el derecho a instalar en fachadas y cubiertas con límites de seguridad y estética. «El derecho a instalar las antenas en el exterior de los inmuebles».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q400",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "En el Reglamento de uso del dominio público radioeléctrico por aficionados aparece la abreviatura CNAF que significa:",
    "options": [
      "Cuadro Nacional de Autorización de Frecuencia",
      "Cuadro Normativo de Autorización de Frecuencias",
      "Cuadro Normativo de Atribución de Frecuencias",
      "Cuadro Nacional de Atribución de Frecuencias"
    ],
    "correctIndex": 3,
    "explain": "El CNAF fija atribuciones de bandas en España; el reglamento de aficionados remite a él para frecuencias permitidas. «Cuadro Nacional de Atribución de Frecuencias».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q401",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La licencia de estación de radioaficionado se expedirá:",
    "options": [
      "Finalizado el montaje de la instalación y presentada la documentación requerida en cada caso",
      "En el momento de otorgamiento del diploma de operador de estación de aficionado",
      "La primera semana de cada mes",
      "En el momento de presentar la memoria descriptiva de la estación"
    ],
    "correctIndex": 0,
    "explain": "La licencia de estación suele expedirse una vez presentada la memoria o comprobado el montaje, no antes de tener instalación real. «Finalizado el montaje de la instalación y presentada la documentación requerida en cada caso».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q404",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cuál de las siguientes proposiciones continene mayor número de provincias pertenecientes al distrito 1?:",
    "options": [
      "Soria, Sevilla, Santa Cruz de Tenerife",
      "Asturias, Ávila, León",
      "Salamanca, Castellón, Cádiz",
      "Valencia, Valladolid, Vizcaya"
    ],
    "correctIndex": 1,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Asturias, Ávila, León».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q405",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Para que un menor de edad pueda obtener una licencia de estación de radioaficionado, deberá:",
    "options": [
      "Estar en posesión del título de Graduado Escolar",
      "Aportar un escrito de autorización, en forma fehaciente de sus padres o personas que ostenten su custodia legal, en el que asumirán las responsabilidades que correspondan al menor titular de la licencia",
      "Presentar una declaración jurada de que hará buen uso del espectro radioeléctrico",
      "Poseer una estación propia"
    ],
    "correctIndex": 1,
    "explain": "Los menores necesitan autorización fehaciente de padres o tutores además de cumplir requisitos de edad y examen. «Aportar un escrito de autorización, en forma fehaciente de sus padres o personas que ostenten su custodia legal, en el que asumirán las responsabilidades que correspondan al menor titular de la licencia».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q407",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Cómo se efectúa el acceso a los repetidores analógicos y digitales finales:",
    "options": [
      "Se accede solamente en el caso de que el radioafionado tenga una licencia de 10 años de antigüedad",
      "El acceso será necesariamente libre y si la estación estuviera dotada de código de acceso éste deberá ser públicamente conocido",
      "Únicamente las Asociaciones de aficionado reconocidas, tendrán acceso a cualquier tipo de repetidor",
      "Dado que el número de estaciones automáticas desatendidas es limitado, no es posible su acceso si el radioaficionado no pertenece a un Radio Club"
    ],
    "correctIndex": 1,
    "explain": "El acceso a repetidores debe ser libre salvo código técnico justificado; no puede reservarse a un club sin base reglamentaria. «El acceso será necesariamente libre y si la estación estuviera dotada de código de acceso éste deberá ser públicamente conocido».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q408",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "Al instalar una antena de radioaficionado se tendrá en cuenta que:",
    "options": [
      "No se pueden situar en azoteas o lugares transitables",
      "Es obligatorio fijar sus soportes a anclajes o soportes de pararrayos o de conducciones eléctricas",
      "Se debe garantizar el derecho de terceros a no sufrir daños en su propiedad derivados de la instalación",
      "Los elementos radiantes nunca pueden sobrepasar el espacio de los inmuebles donde están situados"
    ],
    "correctIndex": 2,
    "explain": "Debes garantizar seguridad estructural, EMC y derechos de terceros; no basta con «tener señal». «Se debe garantizar el derecho de terceros a no sufrir daños en su propiedad derivados de la instalación».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q409",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Al visitar un país distinto al suyo todo titular de una licencia CEPT podrá:",
    "options": [
      "Operar en cualquier banda de frecuencias sin limitación de potencia",
      "Solicitar protección a la administración del país visitado contra las interferencias perjudiciales",
      "Identificarse durante las emisiones emitiendo únicamente su propio distintivo",
      "Realizar emisiones si el país visitado ha adoptado la Recomendación CEPT T/R61-01"
    ],
    "correctIndex": 3,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Realizar emisiones si el país visitado ha adoptado la Recomendación CEPT T/R61-01».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q41",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Una estación automática desatendida (repetidora):",
    "options": [
      "Es destinada a realizar estudios de propagación",
      "Es una estación colectiva bien fija, bien portátil",
      "Basa su funcionamiento en la emisión automática de señales de identificación",
      "Tiene por objeto ampliar el alcance de las comunicaciones"
    ],
    "correctIndex": 3,
    "explain": "La repetidora desatendida retransmite señales para ampliar alcance; debe identificarse y cumplir límites técnicos del reglamento. «Tiene por objeto ampliar el alcance de las comunicaciones».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q410",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El certificado HAREC:",
    "options": [
      "Sirve para obtener autorización de aficionado en cualquier país del mundo",
      "En España únicamente se proporciona a ciudadanos no residentes",
      "No se expide conjuntamente con el diploma de operador",
      "Permite que un ciudadano extranjero residente en España pueda obtener una autorización de radioaficionado sin examinarse de nuevo"
    ],
    "correctIndex": 3,
    "explain": "HAREC (T/R 61-02) acredita el programa de examen armonizado; facilita obtener autorización en países que lo reconocen. «Permite que un ciudadano extranjero residente en España pueda obtener una autorización de radioaficionado sin examinarse de nuevo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q414",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Por la comisión de una infracción grave tipificada en la Ley General de Telecomunicaciones se podrá imponer al infractor una multa por importe de hasta el duplo del beneficio bruto obtenido o, en el caso de que no resulte aplicable este criterio el límite máximo será de:",
    "options": [
      "500.000 €",
      "2.000.000 €",
      "1.000.000 €",
      "Ninguna de las anteriores"
    ],
    "correctIndex": 0,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «500.000 €» es la formulación del banco. (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q42",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Según la Ley 9/2014, de 9 de mayo, General de Telecomunicaciones, retrasar injustificadamente la aportación de datos requeridos por la Administración cuando resulte exigible conforme a lo previsto por la normativa reguladora de las comunicaciones electrónicas es considerado como una infracción:",
    "options": [
      "Leve",
      "Muy grave",
      "Grave",
      "Menos grave"
    ],
    "correctIndex": 0,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «Leve» es la formulación del banco."
  },
  {
    "id": "ure-p2-q43",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El sufijo AO se otorgará para eventos temporales:",
    "options": [
      "De carácter regional",
      "Especiales de relevancia nacional",
      "Especiales de relevancia internacional",
      "No especialmente significativos"
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Especiales de relevancia internacional».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q44",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "¿Es la comunidad de propietarios la que autoriza la instalación de antenas de radioaficionado?:",
    "options": [
      "No",
      "Sí",
      "Sí, siempre que se le informe con antelación",
      "Sólo en caso de que la instalación sea sencilla"
    ],
    "correctIndex": 0,
    "explain": "En elementos comunes hace falta acuerdo o procedimiento con la comunidad; no es instalación unilateral sin informar. «No». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q445",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En comunicaciones del Servicio de Aficionados, la palabra CID se deletrea:",
    "options": [
      "Charter, India, Delfo",
      "Charlie, India, Delta",
      "Charlie, India, Delfo",
      "Charter, Inca , Delta"
    ],
    "correctIndex": 1,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Charlie, India, Delta».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q446",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Como norma general, la ganancia del sistema radiante de las estaciones desatendidas en las bandas de VHF y UHF, no será superior a:",
    "options": [
      "6 dB",
      "8 dB",
      "10 dB",
      "12 dB"
    ],
    "correctIndex": 0,
    "explain": "En la nomenclatura ITU, VHF designa el tramo aproximado de 30–300 MHz. Para este enunciado la respuesta correcta es «6 dB».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q447",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿A quién se le puede autorizar la instalación de una Estación Automática Desatendida?:",
    "options": [
      "A cualquier titular de licencia de Estación",
      "A cualquier Asociación de Aficionado legamente reconocida",
      "A cualquier titular de Autorización de Radioaficionado",
      "Solo puede instalarla la A.E.R. (Agencia Estatal de Radiocomunicaciones)"
    ],
    "correctIndex": 1,
    "explain": "Las estaciones automáticas desatendidas colectivas suelen vincularse a asociaciones legalmente constituidas, no a cualquier particular sin más. «A cualquier Asociación de Aficionado legamente reconocida».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q448",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "La señal de seguridad en radiotelefonía se compone:",
    "options": [
      "De la palabra “Securité” repetida cinco veces",
      "De la palabra Cuidado repetida cinco veces",
      "De la palabra “Securité” repetida tres veces",
      "De la palabra Cuidado repetida tres veces"
    ],
    "correctIndex": 2,
    "explain": "La señal radiotelefónica internacional de seguridad es la palabra «Securité» repetida tres veces (ITU). No confundir con Mayday ni con RST. «De la palabra “Securité” repetida tres veces».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q449",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los distintivos de llamada con sufijo de 2 letras:",
    "options": [
      "Se reservan únicamente para estaciones colectivas",
      "Devengan una tasa distinta a la estipulada para sufijos de 3 letras",
      "Podrán ser asignados a cualquier radioaficionado que cumpla con determinadas condiciones",
      "No pueden ser reutilizados"
    ],
    "correctIndex": 2,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Podrán ser asignados a cualquier radioaficionado que cumpla con determinadas condiciones».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q45",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Una de las siguientes bandas que se citan a continuación precisa autorización especial de uso. Señálela:",
    "options": [
      "47,00-47,20 GHz",
      "10,00-10,5 GHz",
      "14.000-14.250 kHz",
      "50,000-51,000 MHz"
    ],
    "correctIndex": 1,
    "explain": "La banda 10,00–10,5 GHz entre aficionados requiere autorización especial de uso según el cuadro nacional del BOE; 14 MHz y 50 MHz son bandas habituales sin ese requisito adicional. «10,00-10,5 GHz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q450",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La utilización de distintivos temporales requerirá la presentación de una solicitud; señale la proposición errónea:",
    "options": [
      "Indicando el nombre y distintivo de llamada del solicitante",
      "Dirigida a la Asociación o Radio Club de aficionados correspondiente, que será la que autorice",
      "Indicando el período de utilización",
      "Indicando el distintivo de llamada solicitado"
    ],
    "correctIndex": 1,
    "explain": "La solicitud de distintivo temporal se presenta a la administración competente, no la autoriza por sí sola el radio club. La opción errónea es la que dice lo contrario. «Dirigida a la Asociación o Radio Club de aficionados correspondiente, que será la que autorice».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q451",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Los planes de banda de la IARU:",
    "options": [
      "Solamente tienen en cuenta las bandas inferiores a 1.000 MHz",
      "Proporcionan información sobre el modo recomendado de utilización en cada banda de frecuencias",
      "Solamente detallan el uso de las bandas superiores a 1.000 MHz",
      "No tienen en cuenta la atribución de bandas del Reglamento de Radiocomunicaciones de la UIT"
    ],
    "correctIndex": 1,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Proporcionan información sobre el modo recomendado de utilización en cada banda de frecuencias».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q452",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "¿Qué grupo del código Q indica “su frecuencia varía”?:",
    "options": [
      "QRG",
      "QRF",
      "QTH",
      "QRH"
    ],
    "correctIndex": 3,
    "explain": "QRH indica que la frecuencia de la estación varía o es inestable. QSY es cambio voluntario de frecuencia de operación. «QRH».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q453",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El radioaficionado debe tener en cuenta que:",
    "options": [
      "No debe utilizar el código ICAO por no estar reconocido internacionalmente",
      "Es muy conveniente dar el indicativo por partes (preferiblemente la parte final)",
      "No es aconsejable inventar palabras para deletrear el mensaje",
      "El código RST se utiliza para deletrear el mensaje"
    ],
    "correctIndex": 2,
    "explain": "Usa siempre el alfabeto fonético reconocido; inventar palabras aumenta errores en fonía. «No es aconsejable inventar palabras para deletrear el mensaje».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q454",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Las Estaciones Repetidoras y Radiobalizas, deberán disponer de un sistema de alimentación ininterrumpida, para que en caso de fallo en la alimentación externa, puedan seguir funcionando por un periodo mínimo de:",
    "options": [
      "Seis horas",
      "Siete horas",
      "Ocho horas",
      "Nueve horas"
    ],
    "correctIndex": 0,
    "explain": "Las estaciones desatendidas deben identificarse periódicamente; el banco fija un intervalo (p. ej. seis horas). «Seis horas».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q457",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "Las ondas métricas se representan por el símbolo:",
    "options": [
      "LF",
      "UHF",
      "EHF",
      "VHF"
    ],
    "correctIndex": 3,
    "explain": "Las ondas métricas (30–300 MHz) se asocian al símbolo VHF en la nomenclatura habitual del examen. «VHF».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q458",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El distintivo de llamada de una autorización de radioaficionado estará constituido por:",
    "options": [
      "Una secuencia numérica de 6 caracteres",
      "Un grupo alfanumérico de 6 caracteres como máximo",
      "6 letras atribuidas a España por la UIT",
      "Las iniciales y fecha de nacimiento del titular"
    ],
    "correctIndex": 1,
    "explain": "El distintivo asignado es un grupo alfanumérico (prefijo, cifra de distrito y sufijo según el caso). «Un grupo alfanumérico de 6 caracteres como máximo».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q459",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La utilización de una estación de aficionado se debe ajustar a una serie de normas, entre las que se encuentra una de las que se citan a continuación, indíquela:",
    "options": [
      "Solamente el titular de la estación podrá hacer uso de ella",
      "Las transmisiones entre estaciones no deberán codificarse para ocultar su significado",
      "No existen limitaciones de comunicación en las transmisiones entre estaciones",
      "En general se permite que entre estaciones se transmitan comunicaciones en nombre de terceras personas"
    ],
    "correctIndex": 1,
    "explain": "Entre las reglas está no cifrar mensajes de forma opaca y ceñirse al objeto del servicio de aficionados. «Las transmisiones entre estaciones no deberán codificarse para ocultar su significado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q460",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El acceso a los repetidores analógicos y digitales finales será:",
    "options": [
      "Intermitente",
      "Necesariamente libre",
      "Obligatorio",
      "Restringido, si la estación estuviera dotada de código de acceso"
    ],
    "correctIndex": 1,
    "explain": "El acceso a repetidores debe ser libre salvo código técnico justificado; no puede reservarse a un club sin base reglamentaria. «Necesariamente libre». (BOE-A-2013-7624).",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q461",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿En qué bandas de frecuencias se permite emitir si se dispone de la licencia CEPT:",
    "options": [
      "Solamente en la banda 1240-1300 MHz",
      "Temporalmente en la banda 10,00 a 10,5 GHz",
      "En todas las bandas de frecuencias atribuidas al Servicio de Aficionados en el país visitado",
      "Exclusivamente, en las bandas atribuidas al servicio por Satélite"
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «En todas las bandas de frecuencias atribuidas al Servicio de Aficionados en el país visitado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q464",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los distintivos de llamada se podrán reasignar:",
    "options": [
      "En caso de fallecimiento del titular, a familiares en primer grado",
      "Solo si el radioaficionado piensa utilizarlo temporalmente",
      "A Radio Clubs o a Asociaciones con carácter experimental",
      "Por periodos, hasta un máximo de 20 días al año"
    ],
    "correctIndex": 0,
    "explain": "Un distintivo liberado puede reasignarse cuando se cancela la autorización previa; no se hereda automáticamente por familiaridad. «En caso de fallecimiento del titular, a familiares en primer grado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q465",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La obtención de la Autorización de Aficionado por un extranjero residente en España precisará:",
    "options": [
      "Que sea titular de un Diploma de operador expedido en España, o de un Certificado HAREC expedido por cualquier país que aplique la Recomendación CEPT T/R 61-02",
      "Que únicamente exista Acuerdo o Convenio de reciprocidad en la materia con su país de origen",
      "Que el país de origen del radioaficionado aplique la Recomendación T/R 5000",
      "Que se haya examinado en España exclusivamente de la Reglamentación Nacional"
    ],
    "correctIndex": 0,
    "explain": "El extranjero residente debe aportar diploma de operador válido (o equivalente reconocido) además de la residencia. «Que sea titular de un Diploma de operador expedido en España, o de un Certificado HAREC expedido por cualquier país que aplique la Recomendación CEPT T/R 61-02».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q466",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Se entiende por estación digital de aficionado, la estación:",
    "options": [
      "Dotada de un conjunto de dispositivos que permiten la realización de emisiones con técnicas digitales",
      "Destinada a ser utilizada exclusivamente en movimiento",
      "Fija de aficionado",
      "Que posee antena y fuente de energía incorporada al propio equipo"
    ],
    "correctIndex": 0,
    "explain": "Estación digital: conjunto de equipos que permiten modos digitales en las bandas autorizadas, con las mismas obligaciones de identificación. «Dotada de un conjunto de dispositivos que permiten la realización de emisiones con técnicas digitales».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q468",
    "part": 1,
    "topicId": "antenas-prop",
    "stem": "La Ley 19/1983, conocida como Ley de Antenas, regula:",
    "options": [
      "La obligación de comunicar la instalación de una antena a la Administración competente en espectro radioeléctrico",
      "El derecho a instalar una antena de cualquier tamaño",
      "El derecho a instalar las antenas de aficionado en el exterior de los inmuebles",
      "La exención de presentar memoria descriptiva de la instalación"
    ],
    "correctIndex": 2,
    "explain": "La Ley de 19 julio 1983 sobre inmobiliaria y antenas regula el derecho a instalar en fachadas y cubiertas con límites de seguridad y estética. «El derecho a instalar las antenas de aficionado en el exterior de los inmuebles».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q47",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Una estación fija de radioaficionado:",
    "options": [
      "Puede ser utilizada mientras esté detenida en puntos no determinados",
      "Podrá ser utilizada con carácter temporal como portable",
      "No podrá ser accionada a distancia, ya que se convertiría en móvil",
      "Se encuentra dentro de la clasificación de estaciones automáticas desatendidas"
    ],
    "correctIndex": 1,
    "explain": "La memoria descriptiva identifica emplazamiento, equipos y sistema radiante; no sustituye otros documentos que el reglamento exija aparte. La opción válida es «Podrá ser utilizada con carácter temporal como portable».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q471",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los prefijos de uso temporal ED, EE y EF:",
    "options": [
      "Deberán solicitarse exclusivamente a una asociación de radioaficionados reconocida",
      "Mantendrán sin variación el resto del distintivo asignado con carácter permanente al radioaficionado",
      "Están reservados solamente para los distritos 7, 8 y 9",
      "Se asignarán para eventos especiales de relevancia internacional"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Mantendrán sin variación el resto del distintivo asignado con carácter permanente al radioaficionado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q473",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Según el Reglamento de Radiocomunicaciones de la UIT:",
    "options": [
      "El Servicio de Aficionados por Satélite no es un servicio de radiocomunicación",
      "La banda 144,00 -146,00 MHz no está atribuida al Servicio de Aficionados",
      "Las estaciones de aficionado nunca pueden ser utilizadas para la transmisión de comunicaciones internacionales en nombre de terceros",
      "Una estación de aficionado es una estación del Servicio de Aficionados"
    ],
    "correctIndex": 3,
    "explain": "La UIT define la estación de aficionado como parte del servicio de aficionados, bajo supervisión de un operador acreditado. «Una estación de aficionado es una estación del Servicio de Aficionados».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q474",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La Ley General de Telecomunicaciones tipifica como infracción leve:",
    "options": [
      "La emisión de señales de identificación falsas o engañosas",
      "No facilitar los datos requeridos por la Administración o retrasar injustificadamente su aportación cuando resulte exigible conforme a lo previsto por la normativa reguladora de las comunicaciones electrónicas",
      "La instalación de estaciones radioeléctricas sin autorización, cuando, de acuerdo con lo dispuesto en la normativa reguladora de las telecomunicaciones, sea necesaria",
      "No atender el requerimiento hecho por la autoridad competente para el cese de las emisiones radioeléctricas, en los supuestos de producción de interferencias"
    ],
    "correctIndex": 1,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «No facilitar los datos requeridos por la Administración o retrasar injustificadamente su aportación cuando resulte exigible conforme a lo previsto por la normativa reguladora de las comunicaciones electrónicas» es la formulación del banco.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q48",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "La licencia CEPT habilita para la utilización de estaciones móviles en:",
    "options": [
      "Todo el mundo",
      "En cualquier país que haya adoptado la Recomendación T/R 61-01",
      "Todo el mundo excepto la Región 3 de la UIT",
      "Únicamente en Europa"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «En cualquier país que haya adoptado la Recomendación T/R 61-01».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q49",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "De acuerdo con la Ley General de Telecomunicaciones, la sanción impuesta por una falta grave prescribirá:",
    "options": [
      "Al año",
      "A los dos años",
      "Al mes",
      "A los tres años"
    ],
    "correctIndex": 1,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «A los dos años» es la formulación del banco.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q504",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cómo se deletrea el número 7?:",
    "options": [
      "Severo",
      "Sesteo",
      "Seven",
      "Six"
    ],
    "correctIndex": 2,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Seven».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q505",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Conforme al Reglamento de Radiocomunicaciones de la Unión Internacional de Telecomunicaciones:",
    "options": [
      "El Servicio de Aficionados tiene por objeto, entre otros, la realización de emisiones comerciales",
      "El Servicio de Aficionados por Satélite utiliza estaciones espaciales situadas en satélites",
      "Siempre estarán permitidas las comunicaciones por radio entre radioaficionados de diferentes países",
      "Los equipos receptores de radio no forman parte de una estación radioeléctrica"
    ],
    "correctIndex": 1,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «El Servicio de Aficionados por Satélite utiliza estaciones espaciales situadas en satélites» es la formulación del banco.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q506",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "¿Cuál de las siguientes abreviaturas del código Q indica que debe aumentar la potencia de transmisión?:",
    "options": [
      "QRO",
      "QRM",
      "QSV",
      "QRP"
    ],
    "correctIndex": 0,
    "explain": "QRO solicita aumentar potencia de transmisión; QRP pediría reducirla. «QRO». No confundir con el distractor del mismo bloque temático.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q508",
    "part": 1,
    "topicId": "magnetismo-ondas",
    "stem": "En la nomenclatura de las bandas de frecuencia, la banda SHF corresponde a las frecuencias comprendidas entre:",
    "options": [
      "3 y 30 MHz",
      "300 y 3.000 kHz",
      "3 y 30 GHz",
      "300 y 3.000 MHz"
    ],
    "correctIndex": 2,
    "explain": "En la nomenclatura ITU, SHF designa el tramo aproximado de 3–30 GHz (tabla ITU). Para este enunciado la respuesta correcta es «3 y 30 GHz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q51",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El Reglamento de uso del dominio público radioeléctrico por aficionados:",
    "options": [
      "Tiene por objeto la regulación del uso privativo del dominio público radioeléctrico",
      "Garantiza el derecho a su mantenimiento en el tiempo",
      "Determina que podrá realizarse el uso con fines de lucro y de contenido económico",
      "Prevé que el CNAF podrá modificar en algún momento el carácter de uso especial de determinadas bandas, subbandas o frecuencias y establecer su atribución para otros usos"
    ],
    "correctIndex": 3,
    "explain": "El reglamento de aficionados define el uso del espectro; el CNAF puede ajustar condiciones según el texto vigente. «Prevé que el CNAF podrá modificar en algún momento el carácter de uso especial de determinadas bandas, subbandas o frecuencias y establecer su atribución para otros usos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q510",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Cada autorización de radioaficionado dispondrá de un distintivo de llamada, cuyo sufijo estará constituido por:",
    "options": [
      "Una cifra correspondiente al distrito de residencia",
      "Dos primeras letras de alguna de las series internacionales atribuidas a España",
      "Hasta tres letras que se asignarán ordenadas alfabéticamente por turno riguroso de expedición",
      "Tres letras que comiencen por la Q"
    ],
    "correctIndex": 2,
    "explain": "El distintivo asignado es un grupo alfanumérico (prefijo, cifra de distrito y sufijo según el caso). «Hasta tres letras que se asignarán ordenadas alfabéticamente por turno riguroso de expedición».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q511",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Toda licencia CEPT expedida por una Administración que haya adoptado la Recomendación T/R 61-01:",
    "options": [
      "Da derecho a la obtención del Diploma de Operador",
      "Da derecho a obtener un distintivo de llamada en el país visitado",
      "Goza de equiparación a la autorización de aficionado nacional, en los términos recogidos en el Reglamento de uso del dominio público radioeléctrico por aficionados",
      "Su titular tendrá que superar un examen especial"
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Goza de equiparación a la autorización de aficionado nacional, en los términos recogidos en el Reglamento de uso del dominio público radioeléctrico por aficionados».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q512",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿En qué caso se reasignará un distintivo ya utilizado?:",
    "options": [
      "Si se cancela la autorización correspondiente",
      "Si el radioaficionado se integra en una asociación reconocida",
      "En el supuesto de que se produzca sanción por mal uso de la estación",
      "Si su titular crea interferencias"
    ],
    "correctIndex": 0,
    "explain": "Un distintivo liberado puede reasignarse cuando se cancela la autorización previa; no se hereda automáticamente por familiaridad. «Si se cancela la autorización correspondiente».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q513",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "El código RST se utiliza para:",
    "options": [
      "Identificar el país desde el que se emite",
      "Informar sobre el tipo de equipo que se está utilizando",
      "Acceder a una radiobaliza",
      "Informar sobre la intensidad de la señal recibida"
    ],
    "correctIndex": 3,
    "explain": "RST resume legibilidad, intensidad y tono; en fonía se usan normalmente R y S. «Informar sobre la intensidad de la señal recibida».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q514",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Sobre los planes de banda de la IARU es correcto decir que:",
    "options": [
      "Solo existen planes para la Región 1",
      "Los planes para la Región 1 y la Región 2 son idénticos",
      "No tienen previstas frecuencias para repetidores",
      "Tienen en cuenta la atribución de bandas del Reglamento de Radiocomunicaciones de la UIT"
    ],
    "correctIndex": 3,
    "explain": "Los planes IARU orientan el uso de segmentos y modos; no sustituyen al BOE, pero son la referencia operativa en Región 1. La respuesta correcta es «Tienen en cuenta la atribución de bandas del Reglamento de Radiocomunicaciones de la UIT».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q515",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "La Administración competente en espectro radioeléctrico debe informar al presidente de la comunidad de propietarios afectada siempre que:",
    "options": [
      "Se pretenda cambiar las antenas",
      "Se le haya solicitado autorización para instalar antenas de radioaficionado en el exterior del inmueble",
      "Se expida la autorización de radioaficionado a algún residente",
      "Se vayan a realizar obras por parte de la comunidad"
    ],
    "correctIndex": 1,
    "explain": "La inspección verifica cumplimiento técnico y reglamentario de estaciones; no la sustituye el hecho de tener licencia. «Se le haya solicitado autorización para instalar antenas de radioaficionado en el exterior del inmueble» es la formulación del banco.",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q516",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "La señal de urgencia en radiotelefonía se compone:",
    "options": [
      "Del grupo \"urgence urgente\" repetido tres veces",
      "Del grupo \"pan pan\" repetido tres veces",
      "De la palabra \"urgente\" repetido tres veces",
      "De la palabra \"pan\" repetido tres veces"
    ],
    "correctIndex": 1,
    "explain": "Pan-Pan (tres veces) es la señal de urgencia sin peligro grave inmediato; Mayday reserva el socorro. «Del grupo \"pan pan\" repetido tres veces».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q517",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "La instalación, en el exterior de los edificios, del sistema radiante de una estación de radioaficionado ¿puede ser realizada por el propio radioaficionado?:",
    "options": [
      "Siempre",
      "Solo puede ser realizada por instalador autorizado",
      "Solo aquellas que por su simplicidad así lo autorice el Jefe Provincial de Inspección de Telecomunicaciones",
      "Nunca"
    ],
    "correctIndex": 2,
    "explain": "No toda antena exige proyecto complejo: las de baja complejidad pueden autorizarse por procedimiento simplificado según el reglamento de antenas. «Solo aquellas que por su simplicidad así lo autorice el Jefe Provincial de Inspección de Telecomunicaciones».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q518",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Una condición imprescindible para que a un extranjero se le otorgue una autorización de radioaficionado es que:",
    "options": [
      "Sea propietario de bienes inmuebles en España",
      "Sea titular de un diploma español de operador de estaciones de aficionado",
      "Exista Acuerdo de Reciprocidad en esta materia con su país de origen",
      "Acredite documentalmente su condición de residente en España"
    ],
    "correctIndex": 3,
    "explain": "Sin acreditar residencia legal en España no procede la autorización de extranjero residente. «Acredite documentalmente su condición de residente en España».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q519",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El certificado HAREC lo hemos de relacionar con la Recomendación CEPT:",
    "options": [
      "T/R 61-00",
      "T/R 61-01",
      "T/R 61-02",
      "T/R 61-03"
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «T/R 61-02».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q52",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cómo se deletrea la palabra MERO?",
    "options": [
      "MADRID, ECHO, ROMA, OSCAR",
      "MIKE, ECHO, ROMA, OSCAR",
      "MIKE, ECHO, ROMEO, OSCAR",
      "MADRID, ECHO, ROMEO, OSCAR"
    ],
    "correctIndex": 2,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «MIKE, ECHO, ROMEO, OSCAR».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q520",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El Reglamento de uso del dominio público radioeléctrico por aficionados se dicta al amparo de lo dispuesto en el artículo 149.1.21ª de la Constitución, que atribuye al Estado competencias exclusivas en materia de:",
    "options": [
      "Telecomunicaciones",
      "Interferencias y calidad de los servicios de radiocomunicaciones",
      "Gestión en materia de protección de medio ambiente",
      "Normas básicas del régimen de prensa, radio y televisión"
    ],
    "correctIndex": 0,
    "explain": "Si una emisión perjudica servicios protegidos, el titular debe corregir o cesar; la buena práctica es actuar antes de que escale. «Telecomunicaciones».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q523",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cuándo se puede solicitar a la Administración competente en espectro radioeléctrico un distintivo temporal?:",
    "options": [
      "El Reglamento actual no contempla el uso de distintivos temporales",
      "Sólo para los extranjeros residentes en España",
      "Cuando un radioaficionado desee participar en concursos, experimentos, ensayos, demostraciones y otros eventos",
      "En ningún caso, teniendo en cuenta que la autorización de radioaficionado ya lleva asociado un distintivo de llamada"
    ],
    "correctIndex": 2,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «Cuando un radioaficionado desee participar en concursos, experimentos, ensayos, demostraciones y otros eventos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q525",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Si un radioaficionado no es titular de la estación que está utilizando:",
    "options": [
      "Infringe el Reglamento de uso del dominio público radioeléctrico por aficionados",
      "Se identificará, con autorización del titular, mediante su propio distintivo precedido del distintivo del titular de la estación operada",
      "No podrá emitir en todas las bandas de frecuencias",
      "Deberá obtener un permiso especial de la Inspección de Telecomunicaciones"
    ],
    "correctIndex": 1,
    "explain": "El operador invitado se identifica con su distintivo tras el del titular, con permiso de este. «Se identificará, con autorización del titular, mediante su propio distintivo precedido del distintivo del titular de la estación operada».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q526",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "Podrá ser titular de una estación automática desatendida:",
    "options": [
      "Cualquier titular de una autorización de radioaficionado con una antigüedad de al menos tres años",
      "Cualquier titular de una autorización de radioaficionado",
      "Una asociación de radioaficionados reconocida",
      "Cualquier titular de licencia CEPT"
    ],
    "correctIndex": 2,
    "explain": "Suelen autorizarse a asociaciones de aficionados legalmente constituidas, no a particulares sin estructura de gestión. «Una asociación de radioaficionados reconocida».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q53",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "El diploma de operador de estaciones de aficionado:",
    "options": [
      "Lo hay de diversas clases",
      "Lleva implícito la autorización para el uso del espectro radioeléctrico",
      "Certifica la capacidad de su titular para operar estaciones radioeléctricas del servicio de aficionados",
      "Habilita para hacer uso común del espectro radioeléctrico"
    ],
    "correctIndex": 2,
    "explain": "El diploma acredita que superaste la prueba de capacidad para operar estaciones del servicio. «Certifica la capacidad de su titular para operar estaciones radioeléctricas del servicio de aficionados».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q530",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "La reglamentación vigente permite el funcionamiento de radiobalizas en las bandas:",
    "options": [
      "87,5 -107 MHz sin limitación de potencia",
      "26,960 - 27,410 MHz",
      "144 -146 MHz",
      "87,5 -108 MHz con potencia máxima de 10 mW"
    ],
    "correctIndex": 2,
    "explain": "Las radiobalizas de emergencia usan bandas asignadas en VHF (p. ej. 144–146 MHz en el banco). «144 -146 MHz».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q531",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "En el alfabeto fonético internacional las letras S y L se corresponden con las palabras:",
    "options": [
      "Sierra, Lemon",
      "Sierra, Luna",
      "Sol, Lima",
      "Sierra, Lima"
    ],
    "correctIndex": 3,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Sierra, Lima».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q54",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "En relación con la licencia CEPT, señale la alternativa falsa:",
    "options": [
      "Habilita a su titular a operar su estación de radioaficionado en el territorio de aquellos países que hayan adoptado la Recomendación CEPT T/R 61-01",
      "La utilización a que habilita es de forma temporal",
      "Se concede a través del certificado HAREC",
      "En ella ha de constar, entre otros datos, el distintivo de llamada y su periodo de validez"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «La utilización a que habilita es de forma temporal».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q56",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Para operar estaciones en el país visitado temporalmente, el radioaficionado está obligado a:",
    "options": [
      "Pedir indicativo en dicho país",
      "Presentar copia de su expediente",
      "Solicitar permiso de antenas",
      "Presentar la autorización de radioaficionado a petición de las autoridades"
    ],
    "correctIndex": 3,
    "explain": "Con licencia CEPT u homologación, en el país visitado debes poder acreditar tu autorización si la administración lo solicita. «Presentar la autorización de radioaficionado a petición de las autoridades».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q57",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Se puede solicitar protección contra interferencias perjudiciales al operar estaciones en otro país con licencia CEPT?:",
    "options": [
      "Sí",
      "No",
      "Siempre que se informe a la administración del país CEPT",
      "Solo en casos muy graves"
    ],
    "correctIndex": 1,
    "explain": "La licencia CEPT (T/R 61-01) permite operar temporalmente en países adheridos aplicando sus bandas locales, no las del país de origen si difieren. «No».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q58",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cuál de las siguientes ciudades se encuentra adscrita al distrito 9?:",
    "options": [
      "Melilla",
      "Barcelona",
      "Zamora",
      "Murcia"
    ],
    "correctIndex": 0,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «Melilla».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q87",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "De acuerdo con el artículo 5 del Reglamento de Radiocomunicaciones de la UIT, desde el punto de vista de la atribución de frecuencias:",
    "options": [
      "El mundo está dividido en cuatro Regiones",
      "En la Región 4 no están permitidas las emisiones de radioaficionados",
      "España se encuentra en la Región 1",
      "Canarias se encuentra en la Región 2"
    ],
    "correctIndex": 2,
    "explain": "España pertenece a la Región 1 de la UIT (Europa, África y parte de Asia). «España se encuentra en la Región 1».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q88",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "El distintivo de llamada se define como:",
    "options": [
      "Conjunto de sonidos armónicos",
      "Documento que certifica la capacitación para operar estaciones",
      "Grupo de caracteres que constituye la señal de identificación del radioaficionado",
      "La ganancia isótropa o absoluta"
    ],
    "correctIndex": 2,
    "explain": "El distintivo de llamada es el grupo de caracteres que identifica la estación en las emisiones. «Grupo de caracteres que constituye la señal de identificación del radioaficionado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q90",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los distintivos de uso temporal con sufijo de una sola letra están reservados para:",
    "options": [
      "La participación en concursos internacionales",
      "La participación en concursos nacionales de alta competitividad",
      "Eventos que sean inaugurados o visitados por Su Majestad el Rey",
      "La participación en concursos internacionales de alta competitividad"
    ],
    "correctIndex": 3,
    "explain": "Los distintivos temporales de una letra se reservan a concursos internacionales de alta competitividad. «La participación en concursos internacionales de alta competitividad».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q91",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "¿Cómo se deletrea la palabra REY?",
    "options": [
      "Radio, Echo, Yankee",
      "Romeo, Echo, Yankee",
      "Radio, Elo, Yuma",
      "Romeo, Echo, Yuma"
    ],
    "correctIndex": 1,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Romeo, Echo, Yankee».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q92",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los distritos de los indicativos de llamada son:",
    "options": [
      "9 (nueve)",
      "Ilimitados",
      "Todos los que se soliciten",
      "Se han suprimido los distritos"
    ],
    "correctIndex": 0,
    "explain": "El indicativo español combina prefijo E, cifra de distrito y sufijo asignado por la administración. La opción válida es «9 (nueve)».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q93",
    "part": 2,
    "topicId": "marco-normativo",
    "stem": "¿Cuál de las siguientes acciones está permitida realizar en el tráfico entre estaciones de aficionado?:",
    "options": [
      "Transmitir mensajes de naturaleza técnica sobre ensayos",
      "Transmitir propaganda electoral",
      "Emitir anuncios relacionados con productos a utilizar en la radioafición, siempre y cuando sean con fines lucrativos",
      "Emitir con el distintivo de llamada de otro radioaficionado sin su permiso"
    ],
    "correctIndex": 0,
    "explain": "En tráfico entre aficionados están permitidos mensajes técnicos de ensayos; no propaganda comercial ni usar indicativo ajeno sin permiso. «Transmitir mensajes de naturaleza técnica sobre ensayos».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q94",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "El alfabeto fonético se utiliza para:",
    "options": [
      "Deletrear el mensaje",
      "Informar sobre la banda de frecuencias que se está utilizando",
      "Acceder a un repetidor",
      "Informar sobre la intensidad de la señal recibida"
    ],
    "correctIndex": 0,
    "explain": "El alfabeto fonético ICAO deletrea letras para evitar errores en tráfico de voz. La secuencia correcta es «Deletrear el mensaje».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q95",
    "part": 2,
    "topicId": "licencias-indicativos",
    "stem": "Los prefijos de los distintivos de llamada correspondientes a España son, entre otros:",
    "options": [
      "FM-UHF",
      "EA, EB, EC",
      "UHM-ARG",
      "No existen"
    ],
    "correctIndex": 1,
    "explain": "Los prefijos de indicativos españoles en el servicio de aficionado incluyen EA (aficionado), EB y EC según tipo de estación o autorización en territorio nacional. Por eso la terna habitual del banco es «EA, EB, EC».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q96",
    "part": 2,
    "topicId": "operacion-seguridad",
    "stem": "¿Qué abreviatura del código Q indica cual es la ubicación o situación?",
    "options": [
      "QTH",
      "QRS",
      "QTW",
      "QTR"
    ],
    "correctIndex": 0,
    "explain": "QTH es la ubicación o emplazamiento de la estación en tráfico. QSY indica cambio de frecuencia. «QTH».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  },
  {
    "id": "ure-p2-q97",
    "part": 2,
    "topicId": "instalaciones",
    "stem": "Los daños y perjuicios originados por la conservación o desmontaje de una antena de radioaficionado correrán por cuenta de:",
    "options": [
      "La comunidad de propietarios",
      "El radioaficionado",
      "El ayuntamiento si autoriza la obra",
      "El propietario de la vivienda si esta es de alquiler"
    ],
    "correctIndex": 1,
    "explain": "El titular responde de daños por instalación, uso o mantenimiento defectuoso de su antena (seguro y responsabilidad civil). «El radioaficionado».",
    "explainSourceNote": "Práctica URE (Fuente: URE (reglamentación)). Contrastar con BOE-A-2013-7624 y convocatoria vigente del Ministerio."
  }
];
