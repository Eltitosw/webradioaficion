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
  "fedi-ag-030":
    "La ionosfera es la capa alta de la atmósfera ionizada por la radiación solar; refleja las ondas de HF, y por eso las condiciones de propagación cambian con la actividad solar. «Ionosfera».",
  "fedi-ah-034":
    "Salvo urgencia, la comunidad debe avisar al radioaficionado con tres meses de antelación antes de exigir el desmontaje de la antena por obras, para que pueda reorganizar su instalación. «Tres meses». (BOE-A-2013-7624).",
  "fedi-ah-041":
    "El titular debe permitir las obras de conservación del edificio, pero la comunidad ha de comprometerse a reponer la antena en sus condiciones iniciales al terminarlas. «Está obligado a permitir las obras, siempre que la Comunidad de vecinos se comprometa a dejar la instalación en las condiciones iniciales». (BOE-A-2013-7624).",
  "ofic-003":
    "En FM la información se transmite variando la frecuencia instantánea de la portadora, no su amplitud, que se mantiene constante. Por eso la magnitud que varía es «La frecuencia».",
  "q4":
    "En AM la portadora conserva su frecuencia fija y es su amplitud la que sigue a la señal moduladora. Por eso la magnitud que varía principalmente es «La amplitud».",
  "quijotes-84-1939":
    "Antes de obras que afecten a una antena autorizada, la comunidad debe informar al titular de la licencia con un mes de antelación si fuera necesario desmontarla. «Informar, con antelación mínima de un mes, al titular de la licencia de estación si fuera necesario desmontar la antena y/o elementos anejos.». (BOE-A-2013-7624).",
  "quijotes-84-1963":
    "Las emisiones no deseadas agrupan las no esenciales y las de fuera de banda: todo lo que se radia además de la emisión necesaria para la comunicación. «Conjunto de las emisiones no esenciales y de las emisiones fuera de banda.».",
  "quijotes-84-2043":
    "En el segmento 50,0–51,0 MHz se permite emitir en todo el territorio nacional siempre que la potencia máxima del equipo no supere los 50 W. «En todo el territorio nacional si la potencia máxima del equipo es inferior a 50 W.».",
  "quijotes-84-2203":
    "En el GMDSS, la banda MF tiene una frecuencia internacional reservada para la alerta de socorro por Llamada Selectiva Digital (DSC). Por eso esa alerta se transmite en «2.187,5 kHz».",
  "ure-p1-q1":
    "El campo eléctrico mide la fuerza por unidad de carga, es decir, tensión repartida a lo largo de una distancia. Por eso se expresa en voltios por metro: «V/m».",
  "ure-p1-q124":
    "El dBm es una medida logarítmica de potencia referida a 1 mW. Por tanto, la magnitud que representa el dBm es la potencia. «Potencia».",
  "ure-p1-q127":
    "La potencia disipada en una resistencia es P = I²·R. Con I = 2 A y R = 30 Ω resulta P = 2²·30 = 120 W. «120 vatios».",
  "ure-p1-q132":
    "Al conectar condensadores en paralelo las capacidades se suman, como si aumentara la superficie de armadura; por eso la capacidad total es mayor que cada una. «La suma de las capacidades individuales».",
  "ure-p1-q139":
    "Una guía de onda no deja pasar señales por debajo de cierta frecuencia: esa es su frecuencia de corte, por debajo de la cual no hay transmisión por la guía. «La frecuencia por debajo de la cual no es posible la transmisión en la guía de onda».",
  "ure-p1-q143":
    "En la propagación por onda de superficie la señal se guía por el terreno y sigue la curvatura terrestre, alcanzando puntos más allá del horizonte óptico. «La señal radioeléctrica se propaga siguiendo la curvatura terrestre».",
  "ure-p1-q150":
    "Las ondas electromagnéticas viajan en el vacío a la velocidad de la luz, unos 300.000 km/s (3·10⁸ m/s). «300.000 km/s».",
  "ure-p1-q181":
    "La potencia eléctrica es energía por unidad de tiempo. Por eso su unidad en el SI es el vatio (1 W = 1 julio por segundo). «El vatio».",
  "ure-p1-q182":
    "La fibra óptica transmite luz, no señales eléctricas. Por eso no capta las interferencias electromagnéticas radiadas que sí afectan a los conductores metálicos. «Fibra óptica».",
  "ure-p1-q183":
    "Un termistor NTC tiene coeficiente de temperatura negativo: su resistencia disminuye al aumentar la temperatura, al contrario que un PTC. «Una resistencia cuyo valor se reduce a medida que la temperatura aumenta».",
  "ure-p1-q185":
    "La velocidad de propagación cumple siempre la fórmula v = λ·f. Por tanto, es la longitud de onda multiplicada por la frecuencia. «La longitud de onda multiplicada por la frecuencia».",
  "ure-p1-q187":
    "El factor de calidad relaciona la frecuencia de resonancia f con el ancho de banda B mediante la fórmula Q = f/B. Por eso, cuanto más estrecha la respuesta, mayor es Q. «Q=f/B».",
  "ure-p1-q188":
    "La selectividad es la capacidad del receptor para separar dos señales de frecuencias próximas, rechazando la adyacente y dejando pasar la deseada. «La capacidad que tiene para separar dos señales de frecuencias próximas».",
  "ure-p1-q190":
    "El superheterodino de doble conversión emplea dos frecuencias intermedias independientes (dos mezclas sucesivas) para mejorar la selectividad y el rechazo de la frecuencia imagen. «Receptor con dos frecuencias intermedias independientes».",
  "ure-p1-q192":
    "Los condensadores electrolíticos son polarizados: deben conectarse respetando la polaridad marcada, pues en inversa pueden dañarse o reventar. «Deben conectarse respetando la polaridad indicada».",
  "ure-p1-q193":
    "La frecuencia intermedia es una frecuencia fija a la que el superheterodino traslada todas las señales para filtrarlas y amplificarlas con ganancia y selectividad constantes. «La frecuencia de valor constante utilizada en los receptores superheterodinos».",
  "ure-p1-q205":
    "El fading es el desvanecimiento transitorio del nivel de una señal que se propaga, causado por la interferencia de trayectos múltiples o por cambios en la propagación. «El desvanecimiento transitorio de una señal electromagnética que se propaga».",
  "ure-p1-q21":
    "Toda onda se atenúa al propagarse, porque su energía se reparte en un frente cada vez mayor y el medio introduce pérdidas. Por eso la respuesta es «Sí, siempre».",
  "ure-p1-q242":
    "La diferencia de potencial o tensión eléctrica se mide en voltios (V), unidad del SI que equivale al trabajo por unidad de carga. «Voltios».",
  "ure-p1-q243":
    "Para evitar que la RF se cuele en los altavoces de un equipo de baja frecuencia se usa cable blindado, cuya malla apantalla los conductores frente a las interferencias. «Utilizar para su conexión cable blindado».",
  "ure-p1-q250":
    "En resonancia las reactancias se igualan y f0 = 1/(2π√(LC)); por tanto el cuadrado de la frecuencia es inversamente proporcional al producto L·C. «Inversamente proporcional al producto de la inductancia de la bobina por la capacidad del condensador».",
  "ure-p1-q254":
    "El dBµV es una medida logarítmica de tensión referida a 1 microvoltio. Por tanto, «10 dBµV» expresa un valor de tensión eléctrica, no de potencia. «Tensión eléctrica».",
  "ure-p1-q260":
    "La banda de HF (3–30 MHz) es la que mejor se refleja en la ionosfera. Por eso permite enlaces a larga distancia mediante salto ionosférico. «HF».",
  "ure-p1-q299":
    "En un conductor metálico, al subir la temperatura los átomos vibran más y dificultan el paso de los electrones; por eso aumenta su resistencia eléctrica. «Aumenta su resistencia eléctrica».",
  "ure-p1-q303":
    "El control automático de ganancia (CAG) ajusta la ganancia del receptor según el nivel de entrada para mantener constante la amplitud de la señal de salida. «Mantener constante la amplitud de la señal de salida».",
  "ure-p1-q307":
    "Hay resonancia cuando las reactancias capacitiva e inductiva se igualan y se cancelan, de modo que el circuito se comporta como puramente resistivo. «Que las impedancias capacitiva e inductiva se igualen».",
  "ure-p1-q313":
    "La relación señal/ruido compara el nivel de señal útil con el de ruido; es un indicador de la calidad del receptor que se expresa en decibelios. «Es una característica del equipo indicativa de la calidad de este, que se expresa en decibelios (dB)».",
  "ure-p1-q323":
    "La propagación por onda ionosférica (reflexión en la ionosfera) predomina en la banda de HF. Por eso con HF se logran alcances de miles de kilómetros. «HF».",
  "ure-p1-q327":
    "La potencia de una señal eléctrica se mide con un vatímetro, que combina la medida de tensión y de corriente para dar el producto P = V·I. «Vatímetro».",
  "ure-p1-q362":
    "La reactancia inductiva es XL = 2πfL: crece con la frecuencia, de modo que en continua (f = 0) vale cero y la bobina se comporta como un cortocircuito. «Si la frecuencia es 0, su valor es 0».",
  "ure-p1-q366":
    "La velocidad de propagación de una onda electromagnética depende del medio; dentro de un mismo medio es constante (en el vacío, la velocidad de la luz). «Es constante en un determinado medio».",
  "ure-p1-q367":
    "En banda lateral única (SSB) se suprimen la portadora y una de las bandas laterales, transmitiendo solo la otra, lo que ahorra potencia y ancho de banda. «Se tiene una sola banda lateral sin portadora».",
  "ure-p1-q376":
    "En VHF y UHF las frecuencias apenas se reflejan en la ionosfera. Por eso la propagación habitual es de visión directa entre antenas, llamada onda directa o espacial. «Onda directa».",
  "ure-p1-q378":
    "En ondas medias la señal se guía por el suelo siguiendo la curvatura terrestre. Por eso la propagación por onda de superficie predomina en la banda «MF».",
  "ure-p1-q386":
    "El squelch o silenciador corta la salida de audio cuando la señal de entrada no supera un umbral, para no oír ruido de fondo cuando no hay comunicación. «Un circuito para suprimir la salida de sonido de un receptor cuando la señal de entrada a este no supera un determinado nivel».",
  "ure-p1-q419":
    "La carga eléctrica es corriente por tiempo: un culombio equivale al producto de un amperio por un segundo (1 C = 1 A·s). «Un culombio es igual al producto de un amperio por segundo».",
  "ure-p1-q432":
    "En el desvanecimiento (fading) la intensidad de la señal recibida varía con el tiempo, pudiendo llegar a no detectarse, por interferencia de trayectos o cambios de propagación. «La intensidad de una señal emitida sufre variaciones en un período de tiempo pudiendo llegar a no detectarse en el receptor».",
  "ure-p1-q435":
    "El rebote lunar (EME) necesita atravesar la ionosfera sin reflejarse en ella. Por eso se usan VHF y bandas superiores, que la traspasan camino de la Luna. «VHF y superiores».",
  "ure-p1-q482":
    "El dBm expresa potencia en escala logarítmica referida a 1 mW; por tanto la magnitud a la que se refiere es la potencia eléctrica. «Potencia eléctrica».",
  "ure-p1-q491":
    "Con acoplamiento óptimo entre transmisor y antena no hay onda reflejada. Por eso el medidor de ROE marca su valor mínimo posible, que es uno. «Uno».",
  "ure-p1-q494":
    "La amplitud de una señal sinusoidal es su valor de pico: la diferencia entre el valor máximo y el valor medio (la línea de cero) de la onda. «Es la diferencia entre el valor máximo y el valor medio de la señal».",
  "ure-p1-q65":
    "Por la ley de Ohm, V = I·R. Con I = 10 mA (0,01 A) y R = 1 kΩ (1000 Ω) resulta V = 0,01·1000 = 10 V. «10 voltios».",
  "ure-p1-q67":
    "La dispersión troposférica reenvía parte de la señal hacia el suelo desde la tropósfera, logrando alcances mayores que la simple visión directa entre antenas. «Mayor alcance que el meramente visual entre las antenas transmisora y receptora».",
  "ure-p1-q68":
    "En 3,5 MHz, de día la capa D de la ionosfera absorbe la señal y reduce la reflexión. Por eso los alcances diurnos son menores que durante la noche. «Menores».",
  "ure-p1-q7":
    "El termistor NTC (coeficiente negativo) reduce su resistencia al calentarse; se usa como sensor de temperatura y para compensación térmica. Por eso es «Una resistencia cuyo valor se reduce a medida que la temperatura aumenta».",
  "ure-p1-q70":
    "Un multiplicador de frecuencia entrega a su salida un múltiplo entero de la frecuencia de entrada, y sirve para elevar la frecuencia de un oscilador hasta la banda de trabajo. «Incrementar la frecuencia de un oscilador».",
  "ure-p1-q77":
    "El acoplamiento óptimo exige que la línea de transmisión tenga la misma impedancia que la antena y que el transmisor; así no hay reflexiones y la ROE vale 1. «Igual a la de la antena y a la del transmisor».",
  "ure-p1-q78":
    "La frecuencia crítica es el límite por encima del cual una onda con incidencia vertical ya no se refleja en la ionosfera, sino que la atraviesa. «A la frecuencia por encima de la cual no hay reflexiones en la ionosfera».",
  "ure-p1-q8":
    "Igual que en las resistencias, el código de bandas de color de un condensador indica su capacidad, su tolerancia y su tensión máxima de trabajo. «Su capacidad, su tolerancia y su tensión máxima de trabajo».",
  "ure-p2-q152":
    "En la nomenclatura ITU, la gama de 3 a 30 MHz recibe el símbolo HF (High Frequency), las ondas decamétricas. «HF».",
  "ure-p2-q222":
    "Tras desmontar la antena por obras de la comunidad, el radioaficionado tiene derecho a reinstalarla en condiciones similares a las que tenía antes, una vez terminadas. «Podrá instalarla nuevamente en condiciones similares a las anteriores».",
  "ure-p2-q223":
    "La banda HF son las ondas decamétricas, muy usadas para enlaces de larga distancia por reflexión ionosférica. Por eso, en la nomenclatura ITU, abarca de «3 a 30 MHz».",
  "ure-p2-q226":
    "El punto donde se fijan las riostras a la obra civil del inmueble reparte los esfuerzos mecánicos del mástil. Por eso ese elemento de fijación se denomina «Anclaje».",
  "ure-p2-q289":
    "La banda VHF (30–300 MHz) corresponde a las ondas métricas, llamadas así porque su longitud de onda es del orden del metro. «Métricas».",
  "ure-p2-q296":
    "En la nomenclatura ITU, A3E designa una emisión de amplitud con doble banda lateral y un solo canal de información analógica (telefonía AM clásica). «Doble banda lateral con un solo canal con información analógica».",
  "ure-p2-q344":
    "Las ondas métricas (VHF, 30–300 MHz) se abrevian B.m. en la nomenclatura de bandas, porque su longitud de onda es del orden del metro. «La abreviatura métrica B. m.».",
  "ure-p2-q396":
    "El reglamento vigente (BOE-A-2013-7624) limita la potencia de las estaciones desatendidas en zona urbana. Por eso en VHF/UHF dentro del casco urbano la salida no puede superar los «10 W».",
  "ure-p2-q398":
    "El reglamento vigente (BOE-A-2013-7624) fija el tope de potencia de las estaciones automáticas desatendidas. Por eso en la banda de HF su salida máxima es de «50 W».",
  "ure-p2-q44":
    "La comunidad de propietarios no autoriza la instalación: el derecho a instalar la antena lo ampara la normativa, aunque haya que informar a la comunidad. «No». (BOE-A-2013-7624).",
  "ure-p2-q457":
    "Las ondas métricas, de longitud de onda en torno al metro, se representan con el símbolo VHF (30–300 MHz). «VHF».",
  "ure-p2-q468":
    "La Ley 19/1983, llamada Ley de Antenas, reconoce el derecho de los radioaficionados a instalar sus antenas en el exterior de los inmuebles. «El derecho a instalar las antenas de aficionado en el exterior de los inmuebles».",
  "ure-p2-q515":
    "La Administración debe informar al presidente de la comunidad cuando se le ha solicitado autorización para instalar antenas de radioaficionado en el exterior del inmueble. «Se le haya solicitado autorización para instalar antenas de radioaficionado en el exterior del inmueble».",
  "ure-p2-q352":
    "El indicativo compuesto con barra señala operación temporal bajo CEPT. Por eso EA4ABC/M3BVM corresponde a un radioaficionado con licencia de otro país que opera ocasionalmente una estación española. «Se trata de un radioaficionado con licencia expedida por otro país, operando ocasionalmente una estación española».",
  "ure-p2-q390":
    "Bajo CEPT, el operador extranjero antepone el prefijo del país y distrito visitado a su indicativo de origen. Por eso EA3/OK2HM es un radioaficionado con licencia de otro país que opera ocasionalmente en el distrito 3. «Un radioaficionado con licencia expedida en otro país, opera ocasionalmente en el distrito 3».",
};
