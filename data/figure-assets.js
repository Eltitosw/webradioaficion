const figureSvgs = {
  "images/quiz/envelope-detector-am.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="540" height="220" viewBox="0 0 540 220" role="img" aria-labelledby="env1">
  <title id="env1">Esquema orientativo: detector de envolvente AM con diodo y filtro RC</title>
  <rect width="540" height="220" fill="#0f1419" rx="10"/>
  <text x="270" y="26" text-anchor="middle" fill="#e8ecf4" font-size="14" font-family="system-ui,sans-serif">Circuito orientativo (AM a la entrada)</text>
  <text x="52" y="118" text-anchor="middle" fill="#9aa3b5" font-size="12" font-family="system-ui,sans-serif">AM</text>
  <path d="M 30 100 Q 40 80 50 100 Q 60 120 70 100" fill="none" stroke="#7eb6ff" stroke-width="2"/>
  <line x1="75" y1="100" x2="115" y2="100" stroke="#9aa3b5" stroke-width="2"/>
  <line x1="120" y1="85" x2="120" y2="115" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="128" y1="85" x2="128" y2="115" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="115" y1="100" x2="145" y2="100" stroke="#9aa3b5" stroke-width="2"/>
  <polygon points="150,100 165,92 165,108" fill="#f4b942"/>
  <line x1="165" y1="100" x2="175" y2="100" stroke="#f4b942" stroke-width="2"/>
  <line x1="175" y1="92" x2="175" y2="108" stroke="#f4b942" stroke-width="3"/>
  <line x1="175" y1="100" x2="230" y2="100" stroke="#9aa3b5" stroke-width="2"/>
  <circle cx="245" cy="100" r="4" fill="#f4b942"/>
  <line x1="245" y1="100" x2="245" y2="155" stroke="#9aa3b5" stroke-width="2"/>
  <line x1="235" y1="155" x2="255" y2="155" stroke="#cbd5e1" stroke-width="2"/>
  <path d="M 245 155 L 245 175 L 320 175" fill="none" stroke="#9aa3b5" stroke-width="2"/>
  <line x1="320" y1="165" x2="320" y2="185" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="328" y1="165" x2="328" y2="185" stroke="#cbd5e1" stroke-width="2"/>
  <text x="350" y="180" fill="#9aa3b5" font-size="11" font-family="system-ui,sans-serif">GND</text>
  <line x1="245" y1="100" x2="400" y2="100" stroke="#3ecf8e" stroke-width="2"/>
  <text x="420" y="105" fill="#3ecf8e" font-size="12" font-family="system-ui,sans-serif">Salida AF</text>
  <text x="270" y="205" text-anchor="middle" fill="#9aa3b5" font-size="11" font-family="system-ui,sans-serif">Diodo + carga RC (detector de envolvente, esquema didactico)</text>
</svg>`,
  "images/quiz/fedi-ag-013-critical-frequency.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="300" viewBox="0 0 560 300" role="img" aria-labelledby="fedi-ag-013-title">
  <title id="fedi-ag-013-title">Tres trayectorias hacia la ionosfera: las señales 1 y 2 se refractan; la señal 3 atraviesa la capa por superar la frecuencia crítica</title>
  <rect width="560" height="300" rx="10" fill="#0f1419"/>
  <text x="280" y="28" text-anchor="middle" fill="#e8ecf4" font-size="15" font-family="system-ui,sans-serif">Frecuencia crítica e ionosfera (esquema orientativo)</text>
  <rect x="35" y="54" width="490" height="64" rx="28" fill="#15263a" stroke="#7eb6ff" stroke-width="1.5"/>
  <text x="280" y="91" text-anchor="middle" fill="#cbd5e1" font-size="14" font-family="system-ui,sans-serif">Capa ionosférica</text>
  <line x1="40" y1="245" x2="520" y2="245" stroke="#3d4a63" stroke-width="2"/>
  <text x="472" y="267" fill="#9aa3b5" font-size="12" font-family="system-ui,sans-serif">Tierra</text>
  <g stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M130 245 C165 185 195 145 225 112 C245 90 267 83 290 88 C250 120 218 160 185 245" stroke="#7eb6ff" stroke-width="3"/>
    <path d="M190 245 C225 178 260 137 298 112 C322 96 347 94 372 104 C332 132 292 176 250 245" stroke="#3ecf8e" stroke-width="3"/>
    <path d="M250 245 C288 170 325 112 372 64" stroke="#f4b942" stroke-width="3"/>
    <path d="M372 64 L362 70 M372 64 L371 78" stroke="#f4b942" stroke-width="3"/>
  </g>
  <g font-family="system-ui,sans-serif" font-size="18" font-weight="700">
    <text x="150" y="206" fill="#7eb6ff">1</text>
    <text x="236" y="190" fill="#3ecf8e">2</text>
    <text x="332" y="125" fill="#f4b942">3</text>
  </g>
  <path d="M120 245 L135 210 L150 245" fill="none" stroke="#cbd5e1" stroke-width="2"/>
  <text x="84" y="282" fill="#9aa3b5" font-size="12" font-family="system-ui,sans-serif">La señal 3 no vuelve: está por encima de la frecuencia crítica</text>
</svg>`,
  "images/quiz/fedi-ag-014-capacitor-divider.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="260" viewBox="0 0 560 260" role="img" aria-labelledby="fedi-ag-014-title">
  <title id="fedi-ag-014-title">Divisor de tensión de 12 voltios: caída superior de 3 voltios y condensador en paralelo con la rama inferior de 9 voltios</title>
  <rect width="560" height="260" rx="10" fill="#0f1419"/>
  <text x="280" y="28" text-anchor="middle" fill="#e8ecf4" font-size="15" font-family="system-ui,sans-serif">Condensador en régimen permanente de CC</text>
  <g stroke="#cbd5e1" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <line x1="120" y1="70" x2="270" y2="70"/>
    <path d="M270 70 l10 -12 l10 24 l10 -24 l10 24 l10 -24 l10 12"/>
    <line x1="340" y1="70" x2="430" y2="70"/>
    <line x1="430" y1="70" x2="430" y2="120"/>
    <path d="M430 120 l-12 10 l24 10 l-24 10 l24 10 l-12 10"/>
    <line x1="430" y1="190" x2="430" y2="220"/>
    <line x1="430" y1="220" x2="120" y2="220"/>
    <line x1="120" y1="220" x2="120" y2="70"/>
    <line x1="360" y1="120" x2="360" y2="145"/>
    <line x1="345" y1="145" x2="375" y2="145"/>
    <line x1="345" y1="157" x2="375" y2="157"/>
    <line x1="360" y1="157" x2="360" y2="220"/>
  </g>
  <circle cx="430" cy="70" r="4" fill="#f4b942"/>
  <circle cx="430" cy="220" r="4" fill="#f4b942"/>
  <g font-family="system-ui,sans-serif" font-size="13">
    <text x="82" y="150" fill="#7eb6ff" font-weight="700">12 V</text>
    <text x="294" y="53" fill="#9aa3b5">3 V</text>
    <text x="447" y="150" fill="#9aa3b5">9 V</text>
    <text x="380" y="153" fill="#f4b942" font-weight="700">C</text>
    <text x="205" y="244" fill="#9aa3b5">En CC estable, C queda cargado a la tensión de la rama en paralelo: 9 V</text>
  </g>
  <g stroke="#7eb6ff" stroke-width="2" fill="none">
    <line x1="100" y1="96" x2="100" y2="194"/>
    <line x1="88" y1="110" x2="112" y2="110"/>
    <line x1="94" y1="180" x2="106" y2="180"/>
  </g>
</svg>`,
  "images/quiz/fedi-ag-016-direct-conversion.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="260" viewBox="0 0 620 260" role="img" aria-labelledby="fedi-ag-016-title">
  <title id="fedi-ag-016-title">Diagrama de receptor de conversión directa: el bloque con interrogantes alimenta el mezclador</title>
  <rect width="620" height="260" rx="10" fill="#0f1419"/>
  <text x="310" y="28" text-anchor="middle" fill="#e8ecf4" font-size="15" font-family="system-ui,sans-serif">Receptor elemental de conversión directa</text>
  <g font-family="system-ui,sans-serif" font-size="13" text-anchor="middle">
    <rect x="35" y="95" width="95" height="52" rx="7" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
    <text x="82" y="126" fill="#e8ecf4">Antena / RF</text>
    <rect x="175" y="95" width="105" height="52" rx="7" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
    <text x="227" y="117" fill="#e8ecf4">Mezclador</text>
    <text x="227" y="136" fill="#9aa3b5">producto</text>
    <rect x="325" y="95" width="120" height="52" rx="7" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
    <text x="385" y="126" fill="#e8ecf4">Audiofrecuencia</text>
    <rect x="490" y="95" width="95" height="52" rx="7" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
    <text x="537" y="126" fill="#e8ecf4">Altavoz</text>
    <rect x="175" y="178" width="105" height="52" rx="7" fill="#241d12" stroke="#f4b942" stroke-width="1.8"/>
    <text x="227" y="211" fill="#f4b942" font-size="20" font-weight="700">???</text>
  </g>
  <g stroke="#9aa3b5" stroke-width="2.2" fill="none" marker-end="url(#arrow)">
    <line x1="130" y1="121" x2="175" y2="121"/>
    <line x1="280" y1="121" x2="325" y2="121"/>
    <line x1="445" y1="121" x2="490" y2="121"/>
    <line x1="227" y1="178" x2="227" y2="148"/>
  </g>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L8,3 z" fill="#9aa3b5"/></marker></defs>
  <text x="310" y="246" text-anchor="middle" fill="#9aa3b5" font-size="12" font-family="system-ui,sans-serif">En conversión directa, el mezclador necesita una señal local para bajar la RF directamente a audio.</text>
</svg>`,
  "images/quiz/quijotes-044-lc-wattmeter.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="200" viewBox="0 0 560 200" role="img" aria-labelledby="q44">
  <title id="q44">Esquema orientativo: transmisor, vatimetro, red resonante LC y linea hacia antena</title>
  <rect width="560" height="200" fill="#0f1419" rx="10"/>
  <text x="280" y="28" text-anchor="middle" fill="#e8ecf4" font-size="14" font-family="system-ui,sans-serif">Medicion con LC (orientativo)</text>
  <rect x="30" y="70" width="75" height="46" rx="6" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
  <text x="67" y="98" text-anchor="middle" fill="#e8ecf4" font-size="12" font-family="system-ui,sans-serif">TX</text>
  <line x1="105" y1="93" x2="130" y2="93" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="130" y="72" width="55" height="42" rx="6" fill="#161d2a" stroke="#f4b942" stroke-width="1.5"/>
  <text x="157" y="97" text-anchor="middle" fill="#f4b942" font-size="12" font-family="system-ui,sans-serif">W</text>
  <line x1="185" y1="93" x2="210" y2="93" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="210" y="68" width="120" height="50" rx="6" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
  <path d="M 230 105 L 250 85 L 250 125 L 270 105" fill="none" stroke="#cbd5e1" stroke-width="1.8"/>
  <text x="280" y="100" fill="#9aa3b5" font-size="11" font-family="system-ui,sans-serif">L</text>
  <line x1="300" y1="85" x2="300" y2="125" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="308" y1="85" x2="308" y2="125" stroke="#cbd5e1" stroke-width="2"/>
  <text x="318" y="100" fill="#9aa3b5" font-size="11" font-family="system-ui,sans-serif">C</text>
  <line x1="330" y1="93" x2="360" y2="93" stroke="#9aa3b5" stroke-width="2"/>
  <path d="M 370 75 L 430 60 L 430 126 L 370 111 Z" fill="#161d2a" stroke="#3ecf8e" stroke-width="1.5"/>
  <text x="400" y="100" text-anchor="middle" fill="#3ecf8e" font-size="12" font-family="system-ui,sans-serif">ANT</text>
  <text x="280" y="175" text-anchor="middle" fill="#9aa3b5" font-size="11" font-family="system-ui,sans-serif">LC en resonancia con la frecuencia del transmisor (esquema didactico)</text>
</svg>`,
  "images/quiz/quijotes-051.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="250" viewBox="0 0 500 250" role="img" aria-labelledby="q51">
  <title id="q51">Osciloscopio: A marca amplitud en vertical; B marca un periodo en horizontal</title>
  <rect width="500" height="250" fill="#0f1419" rx="10"/>
  <rect x="35" y="45" width="430" height="150" fill="#121722" stroke="#3d4a63" stroke-width="2" rx="6"/>
  <line x1="55" y1="120" x2="445" y2="120" stroke="#3d4a63" stroke-width="1"/>
  <polyline fill="none" stroke="#7eb6ff" stroke-width="2.5" points="65,120 85,78 105,48 125,78 145,120 165,162 185,192 205,162 225,120 245,78 265,48 285,78 305,120 325,162 345,192 365,162 385,120 405,78 425,48"/>
  <line x1="400" y1="55" x2="400" y2="185" stroke="#f4b942" stroke-width="2.5"/>
  <polygon points="400,55 395,63 405,63" fill="#f4b942"/>
  <polygon points="400,185 395,177 405,177" fill="#f4b942"/>
  <text x="412" y="125" fill="#f4b942" font-size="16" font-weight="700" font-family="system-ui,sans-serif">A</text>
  <line x1="125" y1="205" x2="305" y2="205" stroke="#f4b942" stroke-width="2.5"/>
  <polygon points="125,205 133,200 133,210" fill="#f4b942"/>
  <polygon points="305,205 297,200 297,210" fill="#f4b942"/>
  <text x="210" y="225" fill="#f4b942" font-size="16" font-weight="700" font-family="system-ui,sans-serif">B</text>
  <text x="250" y="32" text-anchor="middle" fill="#e8ecf4" font-size="14" font-family="system-ui,sans-serif">Pantalla (orientativa)</text>
</svg>`,
  "images/quiz/ure-p1-02.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="140" viewBox="0 0 520 140" role="img" aria-labelledby="t2">
  <title id="t2">Esquema: transmisor, watimetro, linea y antena con la misma impedancia</title>
  <rect width="520" height="140" fill="#0f1419" rx="10"/>
  <text x="260" y="26" text-anchor="middle" fill="#e8ecf4" font-size="14" font-family="system-ui,sans-serif">Adaptacion de impedancias (esquema orientativo)</text>
  <rect x="35" y="55" width="90" height="52" rx="6" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
  <text x="80" y="86" text-anchor="middle" fill="#e8ecf4" font-size="13" font-family="system-ui,sans-serif">TX</text>
  <line x1="125" y1="81" x2="155" y2="81" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="155" y="58" width="70" height="46" rx="6" fill="#161d2a" stroke="#f4b942" stroke-width="1.5"/>
  <text x="190" y="86" text-anchor="middle" fill="#f4b942" font-size="12" font-family="system-ui,sans-serif">W</text>
  <line x1="225" y1="81" x2="255" y2="81" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="255" y="58" width="100" height="46" rx="6" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
  <text x="305" y="86" text-anchor="middle" fill="#e8ecf4" font-size="12" font-family="system-ui,sans-serif">Linea</text>
  <line x1="355" y1="81" x2="385" y2="81" stroke="#9aa3b5" stroke-width="2"/>
  <path d="M 395 58 L 455 40 L 455 122 L 395 104 Z" fill="#161d2a" stroke="#3ecf8e" stroke-width="1.5"/>
  <text x="425" y="88" text-anchor="middle" fill="#3ecf8e" font-size="12" font-family="system-ui,sans-serif">ANT</text>
</svg>`,
  "images/quiz/ure-p1-08.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="360" viewBox="0 0 760 360" role="img" aria-labelledby="t8 d8">
  <title id="t8">Pantalla de osciloscopio: A es el periodo y B es la amplitud</title>
  <desc id="d8">La onda se dibuja sobre una pantalla de osciloscopio. La flecha A va de una cresta a la siguiente sobre el eje horizontal de tiempo. La flecha B mide la altura vertical desde el eje central hasta una cresta, que es la amplitud.</desc>
  <rect width="760" height="360" fill="#0f1419" rx="18"/>
  <text x="380" y="34" text-anchor="middle" fill="#e8ecf4" font-size="18" font-weight="700" font-family="system-ui,sans-serif">Pantalla de osciloscopio</text>
  <rect x="54" y="58" width="560" height="230" fill="#121722" stroke="#3d4a63" stroke-width="2" rx="10"/>
  <line x1="74" y1="178" x2="594" y2="178" stroke="#52627d" stroke-width="1.5"/>
  <line x1="74" y1="62" x2="74" y2="286" stroke="#52627d" stroke-width="1.5"/>
  <text x="580" y="169" fill="#9fb0ca" font-size="13" font-family="system-ui,sans-serif">tiempo</text>
  <text x="84" y="76" fill="#9fb0ca" font-size="13" font-family="system-ui,sans-serif">tensión</text>
  <polyline fill="none" stroke="#7eb6ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="74,178 94,122 114,78 134,122 154,178 174,234 194,278 214,234 234,178 254,122 274,78 294,122 314,178 334,234 354,278 374,234 394,178 414,122 434,78 454,122 474,178 494,234 514,278 534,234 554,178 574,122 594,78"/>
  <line x1="114" y1="314" x2="274" y2="314" stroke="#f4b942" stroke-width="4"/>
  <polygon points="114,314 126,307 126,321" fill="#f4b942"/>
  <polygon points="274,314 262,307 262,321" fill="#f4b942"/>
  <text x="194" y="342" text-anchor="middle" fill="#f4b942" font-size="18" font-weight="800" font-family="system-ui,sans-serif">A = periodo</text>
  <line x1="650" y1="178" x2="650" y2="78" stroke="#f4b942" stroke-width="4"/>
  <text x="670" y="132" fill="#f4b942" font-size="18" font-weight="800" font-family="system-ui,sans-serif">B = amplitud</text>
  <rect x="452" y="304" width="250" height="34" rx="10" fill="#172238" stroke="#2e405f"/>
  <text x="577" y="326" text-anchor="middle" fill="#dce7ff" font-size="14" font-family="system-ui,sans-serif">Horizontal = tiempo · Vertical = tensión</text>
</svg>`,
  "images/quiz/ure-p1-15.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260" role="img" aria-labelledby="t15">
  <title id="t15">Diagrama de radiacion: puntos A y B en los flancos del haz a media potencia</title>
  <rect width="500" height="260" fill="#0f1419" rx="10"/>
  <text x="250" y="28" text-anchor="middle" fill="#e8ecf4" font-size="14" font-family="system-ui,sans-serif">Diagrama de radiacion (orientativo)</text>
  <ellipse cx="250" cy="150" rx="160" ry="70" fill="none" stroke="#4a5568" stroke-width="1.5"/>
  <path d="M 250 150 L 250 55 Q 360 95 390 150 Q 360 205 250 245 Q 140 205 110 150 Q 140 95 250 55 Z" fill="rgba(126,182,255,0.12)" stroke="#7eb6ff" stroke-width="2"/>
  <line x1="250" y1="150" x2="330" y2="118" stroke="#f4b942" stroke-width="4"/>
  <line x1="250" y1="150" x2="170" y2="118" stroke="#f4b942" stroke-width="4"/>
  <text x="158" y="112" fill="#f4b942" font-size="16" font-weight="700" font-family="system-ui,sans-serif">A</text>
  <text x="328" y="112" fill="#f4b942" font-size="16" font-weight="700" font-family="system-ui,sans-serif">B</text>
  <text x="250" y="248" text-anchor="middle" fill="#9aa3b5" font-size="12" font-family="system-ui,sans-serif">A y B: puntos de media potencia del haz (lineas gruesas)</text>
</svg>`,
  "images/quiz/ure-p1-17.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="220" viewBox="0 0 500 220" role="img" aria-labelledby="t17">
  <title id="t17">Tension alterna sinusoidal con valor pico 10 voltios</title>
  <rect width="500" height="220" fill="#0f1419" rx="10"/>
  <text x="250" y="26" text-anchor="middle" fill="#e8ecf4" font-size="15" font-family="system-ui,sans-serif">u(t), valor pico +10 V / -10 V</text>
  <line x1="45" y1="110" x2="455" y2="110" stroke="#4a5568" stroke-width="1" stroke-dasharray="5 4"/>
  <polyline fill="none" stroke="#f4b942" stroke-width="2.5" stroke-linejoin="round" points="50,110 75,61.9 100,42 125,61.9 150,110 175,158.1 200,178 225,158.1 250,110 275,61.9 300,42 325,61.9 350,110 375,158.1 400,178 425,158.1 450,110"/>
  <text x="448" y="128" fill="#9aa3b5" font-size="14" font-family="system-ui,sans-serif">t</text>
  <text x="12" y="48" fill="#9aa3b5" font-size="13" font-family="system-ui,sans-serif">+10 V</text>
  <text x="12" y="192" fill="#9aa3b5" font-size="13" font-family="system-ui,sans-serif">-10 V</text>
</svg>`,
  "images/quiz/ure-p1-27.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="160" viewBox="0 0 560 160" role="img" aria-labelledby="t27">
  <title id="t27">Cadena de bloques de un receptor con un modulo indicado por interrogantes</title>
  <rect width="560" height="160" fill="#0f1419" rx="10"/>
  <text x="280" y="26" text-anchor="middle" fill="#e8ecf4" font-size="14" font-family="system-ui,sans-serif">Receptor (esquema orientativo)</text>
  <rect x="25" y="60" width="70" height="44" rx="6" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
  <text x="60" y="88" text-anchor="middle" fill="#e8ecf4" font-size="12" font-family="system-ui,sans-serif">ANT</text>
  <line x1="95" y1="82" x2="115" y2="82" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="115" y="60" width="70" height="44" rx="6" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
  <text x="150" y="88" text-anchor="middle" fill="#e8ecf4" font-size="12" font-family="system-ui,sans-serif">RF</text>
  <line x1="185" y1="82" x2="205" y2="82" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="205" y="58" width="90" height="48" rx="6" fill="#2a1f0a" stroke="#f4b942" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="250" y="88" text-anchor="middle" fill="#f4b942" font-size="17" font-weight="700" font-family="system-ui,sans-serif">?</text>
  <line x1="295" y1="82" x2="315" y2="82" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="315" y="60" width="70" height="44" rx="6" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
  <text x="350" y="88" text-anchor="middle" fill="#e8ecf4" font-size="12" font-family="system-ui,sans-serif">Dem.</text>
  <line x1="385" y1="82" x2="405" y2="82" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="405" y="60" width="55" height="44" rx="6" fill="#161d2a" stroke="#7eb6ff" stroke-width="1.5"/>
  <text x="432" y="88" text-anchor="middle" fill="#e8ecf4" font-size="12" font-family="system-ui,sans-serif">AF</text>
  <line x1="460" y1="82" x2="480" y2="82" stroke="#9aa3b5" stroke-width="2"/>
  <rect x="480" y="60" width="60" height="44" rx="6" fill="#161d2a" stroke="#3ecf8e" stroke-width="1.5"/>
  <text x="510" y="88" text-anchor="middle" fill="#3ecf8e" font-size="11" font-family="system-ui,sans-serif">ALT</text>
</svg>`,
};

export default figureSvgs;
