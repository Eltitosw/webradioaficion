/**
 * Explicaciones ancladas al diagrama (IDs con stemFigure certificada).
 * Prioridad en polish-explanations-banco.mjs → curated-explanations.js
 */
export const FIGURE_EXPLAINS = {
  "fedi-ag-009":
    "En el esquema, el diodo en serie con la carga y el condensador forman un detector de envolvente: rectifica la RF y la constante de tiempo RC extrae la envolvente AM. No es oscilador ni conversor de frecuencia. «Detector de envolvente».",
  "fedi-ag-011":
    "En la figura de la fuente lineal, el flujo es: transformador (adapta y aísla), rectificador (CA→CC pulsante), filtro (suaviza rizado) y regulador (tensión estable). «Transformador → rectificador → filtro → regulador».",
  "fedi-ag-013":
    "La frecuencia crítica es el límite a partir del cual la onda ya no vuelve refractada por la ionosfera con esa geometría. En el esquema, la señal 3 atraviesa la capa en lugar de regresar: por eso está por encima de la frecuencia crítica. «La señal 3.».",
  "fedi-ag-014":
    "En régimen permanente el condensador ideal no conduce en CC: queda a la tensión de la rama en paralelo. En el divisor de la figura la rama inferior marca 9 V, no 12 V ni 0 V. «9.».",
  "fedi-ag-016":
    "En conversión directa el mezclador necesita una señal local estable; el bloque con interrogantes alimenta al mezclador y es el oscilador local, no un amplificador RF ni un variador. «Oscilador local.».",
  "fedi-ag-020":
    "La figura muestra radiales bajo la vertical λ/4: al variar su inclinación cambia la impedancia de entrada vista desde el coaxial, sin cambiar por sí sola la polarización emitida. «Una variación de la impedancia de entrada.».",
  "fedi-ag-024":
    "El dipolo en V invertida de la figura suele resonar cerca de 50 Ω y el diagrama en horizontal es casi omnidireccional, frente a una Yagi muy directiva o 75 Ω. «Un valor de impedancia próximo a 50 Ω y un diagrama de radiación prácticamente omnidireccional.».",
  "fedi-ag-028":
    "Cuando la onda rodea un obstáculo comparable a su longitud de onda, se curva: ese fenómeno es la difracción, no reflexión ni refracción ionosférica. «Difracción.».",
  "quijotes-84-1836":
    "El mapa del enunciado corresponde al distrito EA5 (Comunidad Valenciana y Murcia en la tabla de residencia del BOE-A-2013-7624). La cifra 5 identifica ese distrito geográfico. «Distrito 5.».",
  "ure-p1-q129":
    "El espectro muestra una portadora central y dos bandas laterales simétricas: es típico de modulación de amplitud (AM). En FM el ancho sería distinto; en SSB solo un lateral. «Amplitud».",
  "ure-p1-q140":
    "El diagrama presenta un lóbulo principal estrecho y lóbulos secundarios pequeños: patrón de antena directiva. Omnidireccional sería casi circular en el plano horizontal. «Directiva».",
  "ure-p1-q148":
    "En la traza del osciloscopio, A es la altura pico a pico (amplitud) y B la distancia entre dos picos iguales sucesivos (periodo T=1/f). No confundir periodo con frecuencia en Hz. «A es la amplitud y B es el periodo de la señal».",
  "ure-p1-q252":
    "El enunciado pide nivel de audio constante pese a variaciones de señal en antena: es función del AGC (CAG), que regula la ganancia en RF/FI. CAF mantiene frecuencia; no es squelch. «Control automático de ganancia».",
  "ure-p1-q262":
    "Las bobinas en serie en los brazos del dipolo añaden inductancia y alargan la longitud eléctrica sin aumentar tanto el tamaño físico (antena con carga inductiva). «Incrementar la longitud eléctrica de antena».",
  "ure-p1-q265":
    "La onda sinusoidal de la figura tiene valor de pico 10 V; la tensión eficaz es Vrms = Vp/√2 ≈ 7,071 V. 10 V sería el pico, no la eficaz. «7,071 V».",
  "ure-p1-q316":
    "En un transmisor SSB el ALC limita la excitación de la etapa de potencia y reduce distorsión e interferencias cuando sube el nivel de entrada. CAF estabiliza frecuencia; CAG es del receptor. «Control automático de nivel o ALC».",
  "ure-p1-q322":
    "Si transmisor, línea y antena están adaptados (misma impedancia), no hay reflexiones: la potencia reflejada del vatímetro es cero. Con desadaptación la reflejada sería notable. «La potencia reflejada es cero».",
  "ure-p1-q325":
    "En diagramas polares, la relación delante-atrás compara el nivel de radiación del lóbulo principal (punto 1) frente al opuesto (punto 2), en dB. No es ganancia absoluta ni impedancia. «Relación delante-atrás».",
  "ure-p1-q326":
    "El circuito entre transmisor y antena con elementos L y C en π o T es un acoplador (antenna tuner) para adaptar impedancias y minimizar ROE. No es discriminador ni atenuador fijo. «Acoplador de antena».",
  "ure-p1-q360":
    "La caja de apantallamiento tipo jaula de Faraday debe ser conductora, continua y a tierra para derivar corrientes inducidas; aislante o grietas dejan pasar el campo externo. «Metálica, eléctricamente estanca y con conexión a tierra».",
  "ure-p1-q375":
    "Entre las dos líneas a −3 dB del lóbulo principal se mide el ancho de haz (beamwidth): ángulo donde la radiación cae a la mitad de potencia respecto al máximo. «Ancho de haz de radiación».",
  "ure-p1-q379":
    "Si el vatímetro muestra potencia reflejada apreciable, hay desadaptación entre transmisor y antena (ROE > 1). Adaptado, la reflejada sería mínima y la directa máxima. «El transmisor no está adaptado a la antena».",
  "ure-p1-q387":
    "El esquema muestra mezclador y filtro de producto típicos de un receptor que demodula SSB y CW (telegrafía). No es un circuito solo FM ni un bloque inútil en el diagrama. «SSB y CW».",
  "ure-p1-q420":
    "El LC en paralelo con diodo forma un circuito resonante selectivo en la frecuencia de resonancia: puede actuar como receptor AM pasivo. No es amplificador ni oscilador alimentado. «Como receptor de AM a la frecuencia de resonancia del circuito LC».",
  "ure-p1-q422":
    "El diodo en serie con resistencia de carga y condensador rectifica y filtra la envolvente de una señal modulada: actúa como detector de envolvente, no como limitador. «Detector de envolvente».",
  "ure-p1-q434":
    "Un receptor de FM en superheterodino necesita oscilador local para trasladar la señal a FI; el recuadro vacío del diagrama es ese bloque. «Un oscilador».",
  "ure-p1-q439":
    "Si el LC resuena a la frecuencia del transmisor, la impedancia vista puede hacer que el vatímetro lea potencia mínima hacia la carga (energía desviada o absorbida en el resonador). «Mínima».",
  "ure-p1-q486":
    "Con impedancias iguales la energía se transfiere hacia la antena: en el vatímetro la potencia hacia delante supera a la reflejada. Con desadaptación la reflejada sería comparable. «La potencia directa es superior a la potencia reflejada».",
  "ure-p1-q499":
    "El vatímetro en figura mide en la resistencia de prueba: en la posición 1 los conmutadores conectan correctamente sensor directo/reflejado a esa resistencia. «Los conmutadores en la posición 1».",
  "ure-p1-q84":
    "A partir del circuito resonante y del esquema del superheterodino de la figura, la frecuencia de sintonía calculada coincide con 14,2 MHz (relación entre oscilador, FI y RF). «F=14,2 MHz».",
};
