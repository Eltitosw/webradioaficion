/**
 * Reescritura manual de explicaciones técnicas que antes eran genéricas o
 * reutilizaban un texto que no describía la pregunta concreta (UTF-8).
 * Máxima prioridad: se fusionan en curated por polish-explanations-banco.mjs.
 */
export const TECNICA_EXPLAIN_REWRITES = {
  "fedi-ag-002":
    "En paralelo las capacidades se suman: C_total = C1 + C2 + C3. Con 400 pF de total y dos condensadores de 100 pF, el tercero vale 400 − 100 − 100 = 200 pF. «200 pF».",
  "fedi-ag-010":
    "Un oscilador toma energía de corriente continua y la entrega como una señal alterna periódica a una frecuencia determinada, sin necesidad de señal de entrada. Por eso es un «Dispositivo que convierte la corriente continua en alterna».",
  "fedi-ag-027":
    "El tamaño físico de una antena resonante es proporcional a la longitud de onda, y como λ = c/f, a mayor frecuencia la antena es más corta. Por eso su tamaño depende de la «Frecuencia».",
  "ofic-005":
    "Un dipolo de media onda mide eléctricamente, como indica su nombre, λ/2 en total, repartido en dos brazos de λ/4. Por eso su longitud es «Media longitud de onda».",
  "ofic-013":
    "En un circuito LC ideal la resonancia ocurre cuando se igualan las reactancias de bobina y condensador; al despejar esa condición se obtiene la fórmula f0 = 1/(2π√(LC)). «f0 = 1/(2π√(LC))».",
  "ofic-044":
    "El diodo varicap aprovecha que la capacidad de su unión polarizada en inversa cambia con la tensión aplicada. Por eso se emplea como condensador variable controlado por tensión en circuitos de sintonía. «Un condensador variable controlado por tensión».",
  "ofic-055":
    "Una bobina solo se opone a las variaciones de corriente; en corriente continua estable no hay variación, así que no presenta reactancia y equivale a un cortocircuito. «Un cortocircuito».",
  "ure-p1-q10":
    "Los transistores bipolares se fabrican en dos polaridades según el dopado de sus uniones: NPN y PNP. Por eso uno de los tipos válidos es «NPN».",
  "ure-p1-q11":
    "La energía almacenada en un condensador depende de su capacidad y del cuadrado de la tensión, según la fórmula E = ½·C·V². Por eso la expresión correcta es «½C.V²».",
  "ure-p1-q123":
    "El periodo es el tiempo que tarda la onda en completar un ciclo, es decir, el intervalo entre dos puntos equivalentes consecutivos (dos máximos o dos mínimos). «Es el tiempo que transcurre entre dos mínimos consecutivos».",
  "ure-p1-q125":
    "Un transformador necesita como mínimo un primario y un secundario que transfieren energía por inducción. Por eso está formado al menos por «Dos bobinas acopladas».",
  "ure-p1-q126":
    "Para impedir que la RF del equipo salga hacia la red eléctrica se intercala un filtro de línea de desacoplo, que bloquea la radiofrecuencia y deja pasar los 50 Hz de la alimentación. «Filtro de línea de desacoplo».",
  "ure-p1-q13":
    "El dipolo doblado presenta una impedancia unas cuatro veces mayor que el dipolo simple (del orden de 300 Ω frente a 75 Ω). Por eso, respecto al dipolo simple, su impedancia es «Mayor».",
  "ure-p1-q131":
    "Modular es variar un parámetro de la portadora con la información a transmitir; en amplitud modulada (AM) lo que varía es precisamente la amplitud de la portadora siguiendo la señal moduladora. «La modulación AM hace variar la amplitud de la portadora».",
  "ure-p1-q135":
    "Un mezclador genera a su salida la suma y la diferencia de las frecuencias de entrada: 14 + 4 = 18 MHz y 14 − 4 = 10 MHz. De las opciones, la válida es la diferencia: «10 MHz».",
  "ure-p1-q142":
    "La Yagi concentra la radiación en una dirección gracias a sus elementos parásitos (reflector y directores), lo que le da ganancia hacia delante. Por eso «Son directivas».",
  "ure-p1-q15":
    "La clase AB conduce algo más de medio ciclo: combina la buena linealidad de la clase A con la mayor eficiencia de la clase B, reduciendo la distorsión de cruce. «El de clase AB es una combinación de A y B».",
  "ure-p1-q189":
    "Una Yagi enfoca la energía hacia delante mediante su reflector y sus directores, lo que le da ganancia en una dirección concreta. Por eso es una antena «Directiva».",
  "ure-p1-q195":
    "La polarización de una onda electromagnética se define por la dirección en la que oscila su campo eléctrico (vertical, horizontal o circular). «La dirección del campo eléctrico».",
  "ure-p1-q202":
    "La ganancia de una antena es una relación de potencias; por tanto se expresa en decibelios, referida a un dipolo (dBd) o a una antena isótropa (dBi). «dB».",
  "ure-p1-q22":
    "Un generador de señal de RF entrega una señal patrón de frecuencia y nivel conocidos; se inyecta en un equipo para medir, ajustar y caracterizar sus etapas de radiofrecuencia. «Caracterizar etapas de radiofrecuencia».",
  "ure-p1-q239":
    "Cuando coinciden las impedancias del emisor, la línea y la antena hay adaptación: no aparece onda reflejada y se transfiere la máxima potencia a la antena. «Se transfiere la máxima energía a la antena».",
  "ure-p1-q241":
    "Un dieléctrico no conduce la corriente pero sí puede polarizarse, y se usa entre las armaduras de los condensadores. Por eso, en esencia, es «Un aislante».",
  "ure-p1-q244":
    "En un montaje en paralelo la corriente se reparte por cada rama; por la ley de nudos de Kirchhoff, la intensidad total es la suma de las intensidades de cada rama. «La suma de las intensidades de cada una de las ramas».",
  "ure-p1-q245":
    "Las ondas de radio son campos eléctrico y magnético acoplados que se propagan por el espacio sin necesidad de medio material. Por eso su naturaleza es «Electromagnética».",
  "ure-p1-q247":
    "La etapa de frecuencia intermedia se construye con amplificadores sintonizados y filtros, que aportan la mayor parte de la ganancia y de la selectividad del receptor. «Amplificadores y filtros».",
  "ure-p1-q248":
    "El transistor sirve para amplificar, conmutar u oscilar, pero no para adaptar líneas balanceadas y no balanceadas; de eso se encarga un balun, que es un componente pasivo. «Balun».",
  "ure-p1-q249":
    "La resistencia shunt deriva parte de la corriente para poder medir intensidades mayores, y para ello se conecta junto al aparato de medida. Por eso va «En paralelo».",
  "ure-p1-q25":
    "El varicap es un diodo polarizado en inversa cuya capacidad de unión cambia con la tensión aplicada; por eso equivale a un condensador variable controlado por tensión. «Un condensador variable controlado por tensión».",
  "ure-p1-q251":
    "La etapa de detección recupera la información (audio o datos) que viajaba montada sobre la portadora ya filtrada y amplificada. Por eso sirve para «Demodular la señal recibida».",
  "ure-p1-q255":
    "Para cambiar la frecuencia de emisión hace falta un oscilador de frecuencia variable (VFO o sintetizador) que fije en cada momento la frecuencia de trabajo. «Un oscilador de frecuencia variable».",
  "ure-p1-q257":
    "La sensibilidad mide la señal mínima que el receptor puede aprovechar con calidad: cuanta menos señal necesita, más sensible es y mejor capta señales débiles. «Su capacidad para recibir señales débiles».",
  "ure-p1-q258":
    "Los elementos parásitos de una Yagi (reflector y directores) no están alimentados, pero reradian la señal con la fase adecuada para reforzar la radiación hacia delante: dan directividad. «Proporcionan directividad».",
  "ure-p1-q261":
    "Antes de la toma de antena conviene un filtro paso bajo o paso banda que atenúe armónicos y emisiones no deseadas para que no lleguen a radiarse. «Un filtro paso bajo o paso banda».",
  "ure-p1-q308":
    "La frecuencia de corte es aquella en la que el filtro pasa de dejar pasar la señal a atenuarla (caída de 3 dB); marca el límite entre la banda de paso y la de rechazo. «La frecuencia que delimita la banda de paso o no paso por el filtro».",
  "ure-p1-q311":
    "Colocada en paralelo con el instrumento, la resistencia shunt deriva el exceso de corriente y amplía la escala, protegiendo así los aparatos de medida frente a sobreintensidades. «Proteger aparatos de medida».",
  "ure-p1-q319":
    "Hay sobremodulación cuando el índice de modulación de AM supera el 100%: la envolvente se recorta y aparecen distorsión y emisiones espurias. «El índice modulación es superior al 100%».",
  "ure-p1-q324":
    "En serie las resistencias se suman (Req = R1 + R2 + …), de modo que la resistencia total siempre resulta mayor que cualquiera de las individuales. «En serie, la resistencia total siempre es mayor que cualquiera de ellas».",
  "ure-p1-q365":
    "El cristal de cuarzo tiene una resonancia mecánica muy precisa y poco sensible a la temperatura; por eso los osciladores a cuarzo generan una frecuencia muy estable. «De frecuencia muy estable».",
  "ure-p1-q369":
    "CAG son las siglas de Control Automático de Ganancia: ajusta la ganancia del receptor en función del nivel de señal para mantener el volumen del audio aproximadamente constante. «Control Automático de Ganancia».",
  "ure-p1-q377":
    "El balun adapta la línea coaxial (no balanceada) al dipolo (balanceado), evitando corrientes parásitas por la malla del cable. Por eso el circuito buscado es el «Balun».",
  "ure-p1-q380":
    "La onda reflejada por la desadaptación se compara con la directa para cuantificarla. Por eso se usa «Un medidor de ROE», que da la relación de onda estacionaria entre transmisor y antena.",
  "ure-p1-q381":
    "El osciloscopio representa la señal en el dominio del tiempo, mostrando gráficamente su forma de onda (amplitud frente a tiempo). «La representación gráfica de las formas de onda».",
  "ure-p1-q417":
    "El amperímetro mide la corriente que circula, de modo que esa misma corriente debe atravesarlo. Por eso se intercala «En serie» en la rama que se quiere medir.",
  "ure-p1-q418":
    "Al asociar resistencias en serie sus valores se suman (Req = R1 + R2 + …), por lo que el total siempre supera al de cualquiera de ellas. «Es mayor que el valor de cualquiera de las resistencias».",
  "ure-p1-q428":
    "Un mezclador produce a su salida la suma y la diferencia de las frecuencias de entrada. Por eso entre las componentes resultantes aparece la suma «f 1 + f 2».",
  "ure-p1-q429":
    "En la banda de 40 m la longitud de onda es de unos 40 m, y un dipolo de media onda mide λ/2. Por eso su longitud física es de aproximadamente «20 m».",
  "ure-p1-q431":
    "Las trampas (circuitos LC) aíslan tramos del dipolo según la banda en uso, de manera que la misma antena puede resonar en varias frecuencias. «Permite obtener resonancia en varias frecuencias».",
  "ure-p1-q434":
    "Un receptor superheterodino de FM necesita un oscilador local para mezclar y trasladar la señal a frecuencia intermedia. Por eso el bloque que falta en el diagrama es «Un oscilador».",
  "ure-p1-q438":
    "El S-meter mide el nivel relativo de la señal que llega al receptor (la fuerza de la señal recibida), no la potencia transmitida ni la frecuencia. «La intensidad de la señal de entrada del receptor».",
  "ure-p1-q440":
    "El transistor bipolar controla la corriente entre dos de sus patillas mediante una tercera. Por eso son dispositivos que «Tienen tres terminales»: emisor, base y colector.",
  "ure-p1-q441":
    "El dBW es una medida logarítmica de potencia referida a 1 vatio; por tanto, la magnitud que expresa es la potencia. «Potencia».",
  "ure-p1-q444":
    "Para bajar la frecuencia de resonancia hay que aumentar la longitud eléctrica de la antena, y 28.500 kHz es menor que 29.900 kHz. Por eso la solución es «Alargarla».",
  "ure-p1-q479":
    "Con la antena transmitiendo existen tensiones y corrientes de RF elevadas que pueden producir quemaduras; por seguridad no se debe tocar mientras se emite. «No se debe tocar una antena trasmitiendo».",
  "ure-p1-q483":
    "El mezclador traslada la señal a la frecuencia intermedia; la etapa de FI se conecta justo a su salida para amplificar y filtrar esa FI antes de la detección. «A la salida del mezclador».",
  "ure-p1-q492":
    "La estabilidad de un receptor se define como su capacidad de mantener la frecuencia sintonizada sin derivas con el paso del tiempo o los cambios de temperatura. «Estabilidad».",
  "ure-p1-q498":
    "El transistor bipolar está formado por tres regiones semiconductoras, cada una con su terminal. Por eso sus tres patillas son «Emisor, base y colector».",
  "ure-p1-q502":
    "La desadaptación provoca onda reflejada y ROE alta, además de pérdida de potencia útil. Por eso puede producir radiaciones no deseadas e «Interferencias».",
  "ure-p1-q503":
    "Las trampas de un dipolo multibanda son circuitos resonantes LC que, a su frecuencia, se comportan como un aislante y desconectan eléctricamente el resto de la antena. «Circuitos resonantes».",
  "ure-p1-q64":
    "Un condensador acumula en sus armaduras cargas de signo opuesto y, con ellas, energía en el campo eléctrico del dieléctrico. Por eso lo que almacena es «Carga eléctrica».",
  "ure-p1-q71":
    "El índice de modulación (β = desviación de frecuencia / frecuencia moduladora) cuantifica cuánto se desvía la portadora respecto a la moduladora, magnitud propia de la modulación de frecuencia. «La modulación de frecuencia».",
  "ure-p1-q74":
    "La toma de tierra deriva hacia el suelo las corrientes de fuga y las descargas, de modo que protege al operador frente a posibles descargas eléctricas. «Proteger al operador de descargas».",
  "ure-p1-q75":
    "Los elementos parásitos de una Yagi no están conectados al alimentador (no son activos): reradian la señal para dirigir y reforzar la radiación. «Componentes de la antena no activos».",
  "ure-p1-q76":
    "La polarización de una antena es la orientación del campo eléctrico que radia (vertical, horizontal…); conviene que coincida con la de la antena receptora para captar bien. «La orientación del campo eléctrico transmitido».",
  "ure-p2-q101":
    "La señal de alarma radiotelefónica está pensada para activar alarmas automáticas en los receptores. Por eso emplea dos tonos sinusoidales alternados de aproximadamente «2.220 Hz y 1.300 Hz».",
  "ure-p2-q119":
    "Estas componentes nacen del propio proceso de modulación y caen justo al lado de la anchura de banda necesaria. Por eso se llaman emisiones «Fuera de banda», distintas de los armónicos.",
  "ure-p2-q160":
    "Decir «cambio» al ceder el turno avisa al corresponsal de que ya puede hablar. Por eso, como buena práctica operativa en fonía, su uso es «Recomendable».",
  "ure-p2-q180":
    "En el código Q, QRT significa «cese la transmisión»; conviene no confundirlo con QRP (reducir potencia) ni con QSA (intensidad de la señal recibida). «QRT».",
  "ure-p2-q211":
    "Las frecuencias de llamada son puntos comunes donde los operadores de un mismo modo se buscan para establecer contacto, y después pasan a otra frecuencia para el QSO. «Permiten contactar con otros operadores que utilizan el mismo modo».",
  "ure-p2-q237":
    "Se define como radiocomunicación toda telecomunicación realizada por medio de ondas radioeléctricas, frente a otras telecomunicaciones por cable o fibra. «Radiocomunicación».",
  "ure-p2-q270":
    "En telegrafía, la señal de procedimiento AR (·−·−·) se transmite para marcar el fin del mensaje enviado. «AR».",
  "ure-p2-q506":
    "En el código Q, QRP pide reducir la potencia de transmisión. Por eso, para pedir lo contrario, aumentar la potencia, la abreviatura correcta es «QRO».",
};
