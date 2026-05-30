/**
 * Sustituye plantilla «Interpreta la figura…» en preguntas sin figura o con gráfico en enunciado.
 */
/** Entradas que conservaban padding al no pasar gate tras recorte. */
export const PADDING_REMNANT_FIXES = {
  "ofic-006":
    "En corriente continua y en régimen permanente, un condensador ideal no deja pasar corriente continua: equivale a circuito abierto entre bornes (se carga hasta la tensión aplicada). No confundir con cortocircuito. «Un circuito abierto».",
  "ure-p1-q23":
    "El silenciador (squelch) corta la salida de audio cuando desaparece la portadora o señal útil de RF, para no escuchar ruido de fondo. No es AGC (regula ganancia) ni selectividad. «Suprimir el audio si no hay señal de RF».",
  "ure-p1-q184":
    "El diodo de estado sólido conduce preferentemente en un sentido y bloquea en el otro; por eso rectifica y protege etapas. No confundir con resistencia o condensador. «Dispositivo que permite el paso de la corriente eléctrica en un sólo sentido».",
  "ure-p1-q259":
    "Una antena pasiva no amplifica: solo irradia o captura; por reciprocidad los diagramas de radiación en transmisión y recepción son iguales para la misma antena. «Los diagramas de radiación en transmisión y en recepción son iguales».",
  "ure-p1-q373":
    "En el transformador ideal la relación de tensiones depende del número de espiras N1/N2; el núcleo ferromagnético aumenta el acoplamiento. No confundir con la frecuencia de trabajo. «El número de espiras del primario y del secundario».",
  "ure-p1-q478":
    "Dos resistencias en paralelo dan una resistencia equivalente menor que cualquiera de ellas; en serie sería mayor. Los termistores PTC/NTC varían R con la temperatura. «El valor de la conexión de dos resistencias en paralelo da un valor resultante menor que cualquiera de ellas».",
  "ure-p1-q82":
    "En un transformador reductor el secundario tiene menos espiras que el primario (V2 < V1 en ideal). El núcleo ferromagnético mejora el acoplamiento magnético. «El secundario tenga menos espiras que el primario».",
};

/**
 * Preguntas a las que se pegó una explicación equivocada (intro de etapa de
 * potencia / Clase C) que no corresponde con el enunciado. Reescritas a mano.
 */
export const MISASSIGNED_EXPLAIN_FIXES = {
  "fedi-ag-007":
    "El ancho de banda necesario es el mínimo imprescindible para transmitir la información con la calidad requerida; usar más desperdicia espectro e interfiere a otros usuarios. «La anchura de banda estrictamente suficiente para transmitir la información en condiciones adecuadas».",
  "ure-p1-q136":
    "En VHF la propagación es básicamente de visión directa (línea de vista), por lo que los enlaces son de alcance local o regional, no DX intercontinental como en HF. «Para distancias cortas».",
  "ure-p1-q147":
    "El reglamento exige que las radiaciones espurias por debajo de 30 MHz estén atenuadas al menos 40 dB respecto a la potencia de la frecuencia fundamental. «Para frecuencias inferiores a 30 MHz se atenuaran al menos 40 dB».",
  "ure-p1-q186":
    "El rendimiento de un transmisor es la relación entre la potencia entregada al sistema radiante y la potencia consumida de la fuente; mide la eficiencia, no la potencia reflejada. «La relación entre la potencia entregada al sistema radiante y la consumida».",
  "ure-p1-q191":
    "La anchura de banda necesaria es la justa para transmitir a la velocidad y calidad requeridas; ni la máxima permitida ni la que contiene el 99% de la potencia. «Es la suficiente para permitir la transmisión a la velocidad y calidad requeridas».",
  "ure-p1-q197":
    "Un voltímetro de RF mide tensión, no frecuencia; para medir la frecuencia se emplea un frecuencímetro, un osciloscopio o un analizador de espectro. «Un voltímetro de radiofrecuencia».",
  "ure-p1-q198":
    "La potencia de pico de envolvente (PEP) en AM es siempre superior a la potencia media, porque la envolvente alcanza valores instantáneos mayores que el promedio. «Superior a la potencia media del transmisor».",
  "ure-p1-q199":
    "Los armónicos son múltiplos enteros de la frecuencia fundamental (2f, 3f, …); aparecen en circuitos no lineales y deben filtrarse para no emitir espurias. «Múltiplos de la frecuencia fundamental».",
  "ure-p1-q2":
    "El filtro de salida del transmisor atenúa armónicos y emisiones fuera de banda y deja pasar la frecuencia útil: elimina las frecuencias no deseadas antes de la antena. «Elimina las frecuencias no deseadas».",
  "ure-p1-q433":
    "Un transmisor de RF radia su energía en forma de onda electromagnética a través de la antena; no es emisión térmica ni rayos gamma. «Radiación electromagnética».",
  "ure-p1-q79":
    "El armónico de segundo orden tiene frecuencia doble de la fundamental (2·f); el de tercer orden el triple, y así sucesivamente. «La frecuencia de los de segundo orden es doble de la fundamental».",
};

export const TEMPLATE_EXPLAIN_FIXES = {
  "quijotes-84-1843":
    "El prefijo EA5 corresponde a radioaficionados con distrito de residencia en Comunidad Valenciana; el distintivo EA5EYR encaja con Valencia. No confundir EA6 (Baleares) ni EA7 (Aragón). «Valencia.».",
  "quijotes-84-1864":
    "EA6 es la serie de las Islas Baleares; EA6PDM puede corresponder a estaciones en Mallorca, como Palma. Lleida es EA3, Huelva EA7. «Palma de Mallorca.».",
  "ure-p1-q134":
    "Las curvas de respuesta en FI muestran el ancho de banda útil: la curva más estrecha separa emisoras adyacentes (mayor selectividad). En 455 kHz, A es más selectivo que B. «El receptor A es más selectivo que el receptor B».",
  "ure-p1-q17":
    "En un superheterodino la señal pasa: antena → amplificador RF → mezclador (+ oscilador) → amplificador FI → demodulador → audio. Ese es el flujo estándar del temario. «Amplificador RF, mezclador, amplificador de FI, demodulador, amplificador de audio».",
  "ure-p1-q320":
    "Una antena vertical de cuarto de onda radiencia con máximo en el plano horizontal perpendicular al mástil, no hacia el zenit. No confundir con el efecto de inclinar radiales (impedancia). «En el plano horizontal».",
  "ure-p1-q488":
    "Las comunicaciones por satélite de radioaficionado (SO-50, etc.) usan bandas VHF/UHF con enlaces línea de vista al satélite; HF depende de ionósfera y MF/LF no son el caso típico. «VHF».",
  "ure-p2-q115":
    "La autorización de espectro para aficionados conlleva la asignación del indicativo al concederse; no es gratuita ni sin requisitos previos. «Cuando se conceda, a la vez se otorgará el distintivo de llamada».",
  "ure-p2-q180":
    "QRT indica cese de transmisión; QRP es baja potencia y QSA la fuerza de la señal recibida. «QRT».",
  "ure-p2-q336":
    "España tiene prefijos ITU EA, EB y EC para estaciones amateur. FM/FN son francés; KN americano. «EA, EB, EC».",
  "ure-p2-q45":
    "La banda 10,00–10,5 GHz entre aficionados requiere autorización especial de uso según el cuadro nacional del BOE; 14 MHz y 50 MHz son bandas habituales sin ese requisito adicional. «10,00-10,5 GHz».",
  "ure-p2-q506":
    "QRO solicita aumentar potencia de transmisión; QRP pediría reducirla. «QRO».",
  "ure-p2-q93":
    "En tráfico entre aficionados están permitidos mensajes técnicos de ensayos; no propaganda comercial ni usar indicativo ajeno sin permiso. «Transmitir mensajes de naturaleza técnica sobre ensayos».",
};
