/**
 * Explicaciones concretas para enunciados de reglamento / servicio de aficionados
 * (evita plantilla «En este enunciado…» en preguntas FEDI históricas).
 */
import { BOE_AFICIONADOS_REF, explainAnexoIPotencia } from "./boe-explain.mjs";
import { repairSpanishText } from "./text-encoding.mjs";

/**
 * @param {string} stem
 * @param {string} correct
 * @returns {string|null}
 */
export function tryExplainAficionadosReglamento(stem, correct) {
  const s = String(stem || "").toLowerCase();
  const c = repairSpanishText(String(correct || "").trim());
  if (!c) return null;

  if (/estaciones de aficionados deber[aá]n estar provistas|provistas de:/i.test(s)) {
    return `El reglamento exige que la estación disponga de medios para comprobar su funcionamiento técnico (instrumentos de medida adecuados). No basta con operar «a ojo». La opción del banco es «${c}».`;
  }
  if (/conecte con otras instalaciones de telecomunicaci|conectar una estaci[oó]n de aficionado con otras instalaciones/i.test(s)) {
    return `La interconexión con otras instalaciones de radiocomunicación no está prohibida de forma absoluta: puede admitirse si se cumplen las condiciones que fija la normativa (protección de otros servicios, autorización cuando proceda). «${c}».`;
  }
  if (/estaci[oó]n m[oó]vil de aficionado:/i.test(s) && !/port[aá]til/i.test(s)) {
    return `Estación móvil: puede usarse en movimiento o en un emplazamiento distinto del fijo habitual del titular (vehículo, desplazamiento). No es la fija ni la portátil de un día. «${c}».`;
  }
  if (/imprescindible obtener la previa autorizaci|utilizaci[oó]n de estaciones de radioaficionado es imprescindible/i.test(s)) {
    return `Sin autorización administrativa no puedes poner en servicio una estación de aficionado: el trámite lo gestiona la administración de telecomunicaciones (en el banco histórico aparece la Dirección General de Telecomunicaciones). «${c}».`;
  }
  if (/veh[ií]culo en movimiento|destinada a ser utilizada en un veh[ií]culo/i.test(s)) {
    return `La estación instalada o usada principalmente en un vehículo en movimiento se clasifica como estación móvil de aficionado. «${c}».`;
  }
  if (/plazo de validez de la autorizaci[oó]n.*montaje|proceda al montaje de su estaci[oó]n/i.test(s)) {
    return `La autorización para montar la instalación tiene caducidad: si no montas en plazo, debes renovar o solicitar de nuevo según el reglamento del examen. El banco fija «${c}».`;
  }
  if (/servicio de radioaficionados es:/i.test(s)) {
    return `El servicio de aficionados es formativo e individual: ensayos técnicos, intercambio de mensajes entre radioaficionados y autoformación, no un servicio comercial de telecomunicaciones al público. «${c}».`;
  }
  if (/durante sus emisiones, las estaciones de aficionados/i.test(s) && /distintivo|llamada/i.test(c)) {
    return `La identificación con el distintivo asignado es obligatoria en las emisiones; el momento exacto (inicio, mitad, final) depende del supuesto del enunciado. Aquí «${c}».`;
  }
  if (/modificaciones de sistema radiante/i.test(s)) {
    return `Cambiar el sistema radiante (antena, cableado, emplazamiento) suele requerir comunicarlo o tramitar de nuevo la documentación de la estación, no es un cambio libre sin avisar. «${c}».`;
  }
  if (/edad m[ií]nima.*licencia de estaci[oó]n/i.test(s)) {
    return `Para la licencia de estación de aficionado el reglamento del banco fija una edad mínima (15 años en este enunciado), con autorización de los representantes legales si es menor. «${c}».`;
  }
  if (/tr[aá]fico entre estaciones de aficionados est[aá] autorizado/i.test(s)) {
    return `El tráfico entre aficionados debe ceñirse al objeto del servicio: mensajes técnicos, ensayos y comunicaciones propias del hobby, no tráfico ajeno ni comercial. «${c}».`;
  }
  if (/extranjeros que acrediten|extranjeros.*residentes/i.test(s)) {
    return `Un extranjero residente puede obtener autorización en España si acredita residencia y, según el supuesto, el certificado HAREC (armonización CEPT T/R 61-02). «${c}».`;
  }
  if (/qui[eé]n puede hacer uso de una estaci[oó]n de aficionado/i.test(s)) {
    return `No cualquiera puede operar una estación ajena: debe ser titular de autorización de radioaficionado (o invitado con permiso del titular según otro enunciado). «${c}».`;
  }
  if (/autorizaci[oó]n de radioaficionado habilita a su titular/i.test(s)) {
    return `La autorización de radioaficionado acredita al titular para emitir en las bandas y condiciones que permite el reglamento vigente (${BOE_AFICIONADOS_REF}), no sustituye la licencia de estación cuando esta sea exigible. «${c}».`;
  }
  if (/traslade su residencia a un pa[ií]s con t\/r 61-02|pa[ií]s con t\/r 61-02/i.test(s)) {
    return `En países que aplican T/R 61-02 (HAREC), el certificado facilita el reconocimiento de tu formación; cada administración mantiene su trámite de autorización local. «${c}».`;
  }
  if (/reglamento de uso del dominio p[uú]blico radioel[eé]ctrico por aficionado/i.test(s) && /constituye|documento fundamental/i.test(c)) {
    return `El reglamento de aficionados (${BOE_AFICIONADOS_REF}) es la norma nacional que desarrolla bandas, potencias, procedimientos y requisitos del servicio en España. «${c}».`;
  }
  if (/art[ií]culo 25 del reglamento de radiocomunicaciones de la uit|de acuerdo con el art[ií]culo 25 del reglamento de radiocomunicaciones/i.test(s)) {
    return `El art. 25 UIT regula comunicaciones entre aficionados, identificación y condiciones del servicio; las administraciones pueden notificar restricciones. «${c}».`;
  }
  if (/potencia m[aá]xima de emisi[oó]n.*estaci[oó]n de radioaficionado/i.test(s)) {
    return `La potencia máxima depende de la banda y del tipo de estación (anexo I, ${BOE_AFICIONADOS_REF}). El banco histórico puede citar 250 W u otros límites: contrasta banda y anexo I vigente. «${c}».`;
  }
  if (/estaci[oó]n de aficionado debe estar construida/i.test(s)) {
    return `La estación debe ajustarse al estado de la técnica y a las normas de seguridad e inmunidad aplicables; no basta con montar equipo sin criterio técnico. «${c}».`;
  }
  if (/operar estaciones en el pa[ií]s visitado|pa[ií]s visitado temporalmente/i.test(s)) {
    return `Con licencia CEPT u homologación, en el país visitado debes poder acreditar tu autorización si la administración lo solicita. «${c}».`;
  }
  if (/autorizaci[oó]n administrativa de uso del espectro/i.test(s) && /posesi[oó]n previa|diploma|requerir/i.test(s + c)) {
    return `Primero se obtiene el diploma de operador (prueba de capacidad); la autorización de radioaficionado es el paso previo o paralelo según el trámite del enunciado. «${c}».`;
  }
  if (/identifica a un radioaficionado titular de una autorizaci[oó]n/i.test(s)) {
    return `Lo que identifica al operador autorizado ante terceros en emisión es su distintivo de llamada asignado, no el DNI ni el domicilio. «${c}».`;
  }
  if (/obtenci[oó]n de la autorizaci[oó]n de radioaficionado requerir[aá]/i.test(s) && /diploma/i.test(c)) {
    return `Sin superar la prueba de operador (diploma) no se concede la autorización de radioaficionado. «${c}».`;
  }
  if (/plazo.*administraci[oó]n.*resolver.*notificar|plazo tiene la administraci[oó]n.*solicitud de auto/i.test(s)) {
    return `Los plazos de resolución administrativa están en el reglamento; el banco fija un plazo concreto para este supuesto (p. ej. seis semanas). «${c}».`;
  }
  if (/autorizaci[oó]n de aficionados para extranjeros residentes/i.test(s)) {
    return `El extranjero residente debe acreditar residencia y, según el caso, diploma o HAREC reconocido en España. «${c}».`;
  }
  if (/autorizaciones especiales de uso del espectro.*aficionado/i.test(s) && /nominativas/i.test(c)) {
    return `Las autorizaciones especiales son personales (nominativas) y limitan bandas, potencia o modalidad; no son transferibles. «${c}».`;
  }
  if (/causa.*revocaci[oó]n de la auto|causas ser[aá] causa espec[ií]fica de revocaci/i.test(s)) {
    return `La revocación exige causas tasadas en el reglamento; el enunciado pide la opción que el banco considera correcta (a veces refleja normativa derogada: léelo como «según el banco»). «${c}».`;
  }
  if (/licencia de estaci[oó]n de radioaficionado se expedir[aá]/i.test(s)) {
    return `La licencia de estación suele expedirse una vez presentada la memoria o comprobado el montaje, no antes de tener instalación real. «${c}».`;
  }
  if (/menor de edad.*licencia de estaci[oó]n/i.test(s)) {
    return `Los menores necesitan autorización fehaciente de padres o tutores además de cumplir requisitos de edad y examen. «${c}».`;
  }
  if (/cancelaci[oó]n de la licencia de estaci[oó]n/i.test(s) && /recepci[oó]n/i.test(c)) {
    return `Tras cancelar la licencia, el uso del equipo puede limitarse a recepción y solo con autorización expresa, no a emitir con el distintivo anterior. «${c}».`;
  }
  if (/revocaci[oó]n.*autorizaci[oó]n de radioaficionado.*podr[aá]/i.test(s)) {
    return `Revocada la autorización, no puedes ejercer actividad de aficionado hasta obtener una nueva si el reglamento lo permite. «${c}».`;
  }
  if (/con autorizaci[oó]n de su titular.*uso de una estaci[oó]n/i.test(s)) {
    return `Otro titular de autorización puede operar la estación del titular si este lo autoriza; en emisión se identifican ambos según el reglamento. «${c}».`;
  }
  if (/no es causa de revocaci[oó]n.*no adquirir una estaci/i.test(s)) {
    return `No tener aún equipo o estación montada no revoca la autorización de operador; sí pueden ser causas otras infracciones. «${c}».`;
  }
  if (/autorizado a instalar una estaci[oó]n autom[aá]tica|autorizado a instalar un repetidor/i.test(s)) {
    return `El reglamento (${BOE_AFICIONADOS_REF}, arts. 24-25) autoriza repetidores y estaciones automáticas desatendidas con resolución administrativa; no están prohibidas. «${c}».`;
  }
  if (/antena.*terraza.*comunidad|comunidad de propietarios.*antena/i.test(s)) {
    return `En elementos comunes hace falta acuerdo o procedimiento con la comunidad; no es instalación unilateral sin informar. «${c}».`;
  }
  if (/ley 19\/1983.*antenas/i.test(s)) {
    return `La Ley de 19 julio 1983 sobre inmobiliaria y antenas regula el derecho a instalar en fachadas y cubiertas con límites de seguridad y estética. «${c}».`;
  }
  if (/instalaci[oó]n.*exterior.*sistema radiante|sistema radiante en el exterior/i.test(s)) {
    return `No toda antena exige proyecto complejo: las de baja complejidad pueden autorizarse por procedimiento simplificado según el reglamento de antenas. «${c}».`;
  }
  if (
    /instalador de telecomunicaciones inscrito|montaje del sistema radiante|instalaci[oó]n de una estaci[oó]n de aficionado deber[aá]|montaje del sistema radiante de una estaci[oó]n fija/i.test(
      s,
    )
  ) {
    return `Como norma general el montaje del sistema radiante lo realiza un instalador inscrito en el registro correspondiente. «${c}».`;
  }
  if (/instalaci[oó]n y funcionamiento de una estaci[oó]n de aficionado precis/i.test(s) && /autorizaci[oó]n de radioaficionado/i.test(c)) {
    return `Sin titular con autorización de radioaficionado (y licencia de estación cuando proceda) no hay instalación regular. «${c}».`;
  }
  if (/para la instalaci[oó]n.*es preciso|es preciso.*licencia de estaci[oó]n/i.test(s)) {
    return `Además de la autorización de operador, la puesta en marcha de la estación requiere licencia de estación cuando el reglamento lo exige. «${c}».`;
  }
  if (/soportes de una antena/i.test(s)) {
    return `Los soportes deben mantener la resistencia mecánica del edificio y cumplir normativa de seguridad estructural. «${c}».`;
  }
  if (/tejado.*antena.*obras|realizar obras aun cuando haya que desmontar/i.test(s)) {
    return `El titular debe facilitar obras de mantenimiento del edificio aunque implique desmontar temporalmente la antena, con reposición posterior. «${c}».`;
  }
  if (/da[nñ]os y perjuicios.*antena/i.test(s)) {
    return `El titular responde de daños por instalación, uso o mantenimiento defectuoso de su antena (seguro y responsabilidad civil). «${c}».`;
  }
  if (/estaci[oó]n autom[aá]tica.*asociaci[oó]n|autorizar la instalaci[oó]n de una estaci[oó]n autom[aá]tica/i.test(s)) {
    return `Las estaciones automáticas desatendidas colectivas suelen vincularse a asociaciones legalmente constituidas, no a cualquier particular sin más. «${c}».`;
  }
  if (/derecho de terceros a no sufrir/i.test(s)) {
    return `La instalación debe respetar salud, seguridad y molestias razonables de vecinos (EMC, altura, elementos voladores). «${c}».`;
  }
  if (/a cu[aá]l de estos circuitos.*repetidor.*rele|parte receptora de un repetidor/i.test(s)) {
    return `El relé de repetición debe activarse desde el silenciador (squelch) o cadena que detecta señal útil en recepción, no desde el amplificador de audio ni la fuente de alimentación. «${c}».`;
  }
  if (/radiaci[oó]n perturbadora de los receptores/i.test(s)) {
    return `Los límites de emisiones no deseadas (espurios, LO) se expresan en potencia muy baja; el banco usa «cuatro nanovatios» como orden de magnitud del examen. «${c}».`;
  }
  if (/riesgo de producir interferencias.*aumentar la potencia/i.test(s)) {
    return `A mayor potencia de transmisión aumenta la probabilidad de interferir a otros receptores si no hay filtros, ubicación y buenas prácticas. «${c}».`;
  }
  if (/r\.o\.e\.|roe de una instalaci[oó]n.*antena/i.test(s) && /intensidad/i.test(c)) {
    return `La ROE (relación de ondas estacionarias) compara componentes de la onda estacionaria en la línea; no es cociente de intensidades de campo del diagrama. Si el banco mezcla conceptos, elige la definición que marca «${c}».`;
  }
  if (/misma potencia radiada.*ondas que/i.test(s) && /144\s*mhz/i.test(c)) {
    return `A igual potencia, en VHF (144 MHz) la propagación por línea de vista suele ser más favorable que en HF para enlaces locales; el enunciado pide la banda con mejor alcance en esas condiciones. «${c}».`;
  }
  if (/se identifica como ea\d.*\/[a-z]/i.test(s)) {
    return `La barra y el segundo indicativo indican operación con autorización de otro país (CEPT) o invitado según el patrón del enunciado (EA/IZ…, EA/…, EA…/R…). «${c}».`;
  }
  if (/repetidor.*objetivo|qu[eé] es un repetidor/i.test(s)) {
    return `Un repetidor recibe en una frecuencia y retransmite en otra para extender el alcance de las comunicaciones de aficionados. «${c}».`;
  }
  if (/acceso a los repetidores/i.test(s)) {
    return `El acceso a repetidores debe ser libre salvo código técnico justificado; no puede reservarse a un club sin base reglamentaria. «${c}».`;
  }
  if (/no se puede considerar.*estaci[oó]n autom[aá]tica desatendida/i.test(s)) {
    return `Una estación colectiva de aficionados sí puede ser automática desatendida si cumple requisitos; el enunciado pide la opción que no encaja con la definición. «${c}».`;
  }
  if (/objetivo se pretende al instalar un repetidor|repetidor de radioficionado/i.test(s)) {
    return `El repetidor amplía cobertura retransmitiendo en otra frecuencia; no sustituye la licencia ni autoriza tráfico ajeno al servicio. «${c}».`;
  }
  if (/cu[aá]ntas estaciones autom[aá]ticas desatendidas/i.test(s)) {
    return `El número de desatendidas autorizadas depende de necesidades del servicio y criterio de la administración, no de un cupo fijo universal en el enunciado. «${c}».`;
  }
  if (/interferir deliberadamente/i.test(s)) {
    return `Interferir a sabiendas a otra estación está prohibido; es mala práctica e infracción. «${c}».`;
  }
  if (/cuadro nacional de atribuci|cnaf/i.test(s) && /reglamento.*aficionado/i.test(s)) {
    return `El CNAF fija atribuciones de bandas en España; el reglamento de aficionados remite a él para frecuencias permitidas. «${c}».`;
  }
  if (/inventar palabras para deletrear/i.test(s)) {
    return `En tráfico se usa el alfabeto fonético estándar (ICAO), no palabras inventadas que generen errores. «${c}».`;
  }
  if (/repetidoras y radiobalizas.*sistema/i.test(s) && /horas/i.test(c)) {
    return `Las estaciones desatendidas deben identificarse periódicamente; el banco fija un intervalo (p. ej. seis horas). «${c}».`;
  }
  if (/transmisiones entre estaciones no deber[aá]n codificarse|no deber[aá]n codificar/i.test(s)) {
    return `El servicio de aficionados exige transparencia: no se admiten cifrados que oculten el significado del mensaje a terceros autorizados. «${c}».`;
  }
  if (/gestor de una estaci[oó]n desatendid/i.test(s)) {
    return `El gestor debe cumplir requisitos técnicos y de supervisión que marca el reglamento; no «otorga» licencias a terceros en sentido administrativo. «${c}».`;
  }
  if (/estaci[oó]n digital de aficionado/i.test(s)) {
    return `Estación digital: conjunto de equipos que permiten modos digitales en las bandas autorizadas, con las mismas obligaciones de identificación. «${c}».`;
  }
  if (/estaci[oó]n de aficionado es una estaci[oó]n del servicio/i.test(s)) {
    return `Definición UIT: estación del servicio de aficionados, controlada por persona con certificado reconocido por su administración. «${c}».`;
  }
  if (/no es titular de la estaci[oó]n que est[aá] utilizando/i.test(s)) {
    return `El operador invitado se identifica con su distintivo tras el del titular, con permiso de este. «${c}».`;
  }
  if (/titular de una estaci[oó]n autom[aá]tica desatendida/i.test(s) && /asociaci/i.test(c)) {
    return `Suelen autorizarse a asociaciones de aficionados legalmente constituidas, no a particulares sin estructura de gestión. «${c}».`;
  }
  if (/definir[ií]a.*estaci[oó]n autom[aá]tica desatendida/i.test(s)) {
    return `Es una estación colectiva que funciona sin operador presente, con identificación automática y supervisión del gestor. «${c}».`;
  }
  if (/equipos.*construcci[oó]n propia/i.test(s)) {
    return `El equipo casero debe cumplir requisitos técnicos y puede necesitar autorización o declaración conforme al reglamento. «${c}».`;
  }
  if (/regi[oó]n 1.*espa[nñ]a|art[ií]culo 5 del reglamento de radiocomunicaciones/i.test(s)) {
    return `España pertenece a la Región 1 de la UIT (Europa, África y parte de Asia). «${c}».`;
  }
  if (/obligado a comunicar.*intenci[oó]n|ya no hay que comunicarlo/i.test(s)) {
    return `Algunos trámites de comunicación previa han sido simplificados en normativa reciente; el banco puede reflejar la redacción histórica «ya no hay que comunicarlo». «${c}».`;
  }
  if (/nota 5\.141|7100.*7200/i.test(s)) {
    return `La nota 5.141C UIT reserva segmentos en HF; contrasta el cuadro de atribuciones con el CNAF y el reglamento vigente. «${c}».`;
  }
  if (/estaci[oó]n port[aá]til.*marque la alternativa|port[aá]til de aficionado/i.test(s) && /portable|port[aá]til/i.test(c)) {
    return `Portátil y portátil de mano son categorías del reglamento: una estación portátil puede ser también «portable» según el desplazamiento del enunciado. «${c}».`;
  }
  if (/una emisi[oó]n de radioaficionado:/i.test(s)) {
    return `Las emisiones deben limitarse a finalidades del servicio de aficionados (técnicas, ensayos, intercambio entre operadores). «${c}».`;
  }
  if (/diploma de operador de estaciones de aficionado:/i.test(s)) {
    return `El diploma acredita que superaste la prueba de capacidad para operar estaciones del servicio. «${c}».`;
  }
  if (/1\.830-1\.850|1830.*1850/i.test(s) && /\bw\b/i.test(c)) {
    return `En 160 m el límite de potencia del banco histórico puede ser 50 W PEP; verifica en anexo I (${BOE_AFICIONADOS_REF}) la banda exacta. «${c}».`;
  }
  if (/40 metros.*modo de emisi[oó]n|banda.*40.*lsb/i.test(s)) {
    return `En 40 m fonía el modo habitual es LSB; el enunciado pide el modo no permitido según el plan del banco. «${c}».`;
  }
  if (/equipos fijos de ea3rcq|equipos port[aá]tiles de ea3rcq/i.test(s)) {
    return `Datos operativos del club EA3RCQ en el material Quijotes: potencias orientativas para el examen práctico, no límites legales generales. «${c}».`;
  }
  if (/equipos port[aá]tiles tetra/i.test(s)) {
    return `TETRA es servicio profesional PMR; la potencia típica de portátiles es del orden de 1–3 W, distinto del servicio de aficionados. «${c}».`;
  }
  if (/repetidor dmr/i.test(s)) {
    return `Un repetidor DMR puede trabajar en modo digital; algunos equipos admiten también analógico según configuración. «${c}».`;
  }
  if (/abreviaturas m[aá]s usuales/i.test(s)) {
    return `QRT indica cese de transmisión o cierre de estación en el Q-code internacional; otros Q-codes abrevian tráfico (QSY, QSL…). «${c}».`;
  }
  if (/instalar la antena de su estaci[oó]n fija en el exterior/i.test(s)) {
    return `El titular puede usar zonas comunes o fachada del inmueble donde tiene derecho, respetando normativa de antenas y comunidad de propietarios. «${c}».`;
  }
  if (/al instalar una antena de radioaficionado se tendr[aá] en cuenta/i.test(s)) {
    return `Debes garantizar seguridad estructural, EMC y derechos de terceros; no basta con «tener señal». «${c}».`;
  }
  if (/utilizaci[oó]n de una estaci[oó]n de aficionado se debe ajustar/i.test(s)) {
    return `Entre las reglas está no cifrar mensajes de forma opaca y ceñirse al objeto del servicio de aficionados. «${c}».`;
  }
  if (/seg[uú]n el reglamento de radiocomunicaciones de la uit:/i.test(s) && /estaci[oó]n de aficionado/i.test(c)) {
    return `La UIT define la estación de aficionado como parte del servicio de aficionados, bajo supervisión de un operador acreditado. «${c}».`;
  }
  if (/para la instalaci[oó]n y funcionamiento de una estaci[oó]n de aficionado, es necesario/i.test(s)) {
    return `Hace falta licencia de estación (y autorización de operador vigente); no basta con comprar equipo. «${c}».`;
  }
  if (/tejado de un edificio donde est[aá] instalada una antena/i.test(s)) {
    return `Deben poder ejecutarse obras de mantenimiento del edificio, aunque obligue a desmontar temporalmente la antena autorizada. «${c}».`;
  }
  if (/tras la revocaci[oó]n.*autorizaci[oó]n de radioaficionado/i.test(s)) {
    return `Revocada la autorización, no puedes operar hasta obtener una nueva si la normativa lo permite. «${c}».`;
  }
  if (/no es causa de revocaci[oó]n de una autorizaci[oó]n de radioaficionado/i.test(s)) {
    return `La revocación requiere causas legales concretas; no tener todavía estación montada no es, por sí solo, motivo de revocación en este supuesto. «${c}».`;
  }
  if (/estaci[oó]n autom[aá]tica desatendida \(repetidora\)/i.test(s)) {
    return `La repetidora desatendida retransmite señales para ampliar alcance; debe identificarse y cumplir límites técnicos del reglamento. «${c}».`;
  }
  if (/protecci[oó]n contra interferencias.*austria|utiliza temporalmente.*australia|estaci[oó]n en australia/i.test(s)) {
    return `En país visitado CEPT aplicas sus condiciones locales; la protección contra interferencias la rige la administración visitada. «${c}».`;
  }
  if (/radioaficionado debe tener en cuenta/i.test(s) && /deletrear|inventar/i.test(c)) {
    return `Usa siempre el alfabeto fonético reconocido; inventar palabras aumenta errores en fonía. «${c}».`;
  }
  if (/condici[oó]n imprescindible.*extranjero.*otorgue/i.test(s) && /residente/i.test(c)) {
    return `Sin acreditar residencia legal en España no procede la autorización de extranjero residente. «${c}».`;
  }
  if (/obtenci[oó]n de la autorizaci[oó]n de aficionado por un extranjero/i.test(s) && /diploma/i.test(c)) {
    return `El extranjero residente debe aportar diploma de operador válido (o equivalente reconocido) además de la residencia. «${c}».`;
  }
  if (/vat[ií]metro.*transmisor.*antena|potencia directa y reflejada/i.test(s)) {
    return `Potencia reflejada en el vatímetro indica desadaptación (ROE > 1): el transmisor no entrega toda la energía a la antena. «${c}».`;
  }
  if (/diagrama de bloques.*receptor de fm|receptor de fm/i.test(s)) {
    return `La superheterodinia FM necesita oscilador local para mezclar a frecuencia intermedia; sin ese bloque el diagrama está incompleto. «${c}».`;
  }
  if (/conjunto l-c resuena.*frecuencia del transmisor/i.test(s)) {
    return `En resonancia serie el LC presenta impedancia mínima y puede desviar potencia: el vatímetro lee un valor mínimo hacia la carga. «${c}».`;
  }
  if (/gr[aá]fico.*distritos geogr[aá]ficos|distrito geogr[aá]fico.*titular/i.test(s)) {
    return `La cifra del indicativo (EA5, EA2…) identifica el distrito de residencia según la tabla del reglamento (${BOE_AFICIONADOS_REF}). «${c}».`;
  }
  if (/potencia m[aá]xima.*14[.,\s]*000|14\.000.*14[.,\s]*350/i.test(s)) {
    return explainAnexoIPotencia(stem, c);
  }
  if (/colaboraci[oó]n de los radioaficionados con servicios de emergencia/i.test(s)) {
    return `La ayuda en catástrofes es voluntaria; el radioaficionado no está obligado por el reglamento (${BOE_AFICIONADOS_REF}) a prestar servicios de emergencia. «${c}».`;
  }
  if (/potencia de un transmisor.*puede estar definida/i.test(s)) {
    return `La potencia de salida puede calcularse como P = V·I en la etapa final (tensión de alimentación por corriente del etapa de potencia). «${c}».`;
  }
  if (/utilizaciones de car[aá]cter experimental/i.test(s)) {
    return `Las emisiones experimentales fuera del cuadro habitual requieren autorización especial (art. 17, ${BOE_AFICIONADOS_REF}). «${c}».`;
  }
  if (/instalaciones en una estaci[oó]n de radioaficionado deber[aá]n ser efectuadas/i.test(s)) {
    return `Como norma general el montaje lo realiza un instalador inscrito en el registro de empresas instaladoras (art. 19.e, ${BOE_AFICIONADOS_REF}). «${c}».`;
  }
  if (/utilizaci[oó]n es correcto significar/i.test(s)) {
    return `La estación debe disponer de medios para verificar que emite dentro de las bandas y condiciones autorizadas (anexo I, ${BOE_AFICIONADOS_REF}). «${c}».`;
  }
  if (/estaci[oó]n colectiva fija.*estudios de propagaci[oó]n/i.test(s)) {
    return `Una estación colectiva para experimentación de propagación puede ser una radiobaliza u otra estación automática desatendida según el supuesto. «${c}».`;
  }
  if (/instalaci[oó]n de una antena.*elementos anejos/i.test(s)) {
    return `Debes coordinar la instalación con otros servicios y usuarios del espectro; evitar interferencias y respetar normativa de antenas. «${c}».`;
  }
  if (/estaci[oó]n portable de aficionado:/i.test(s)) {
    return `La estación portátil es una estación fija usada temporalmente fuera del emplazamiento habitual del titular (anexo I, ${BOE_AFICIONADOS_REF}). «${c}».`;
  }
  if (/en el servicio de aficionados, la radiobaliza:/i.test(s)) {
    return `La radiobaliza es una estación automática desatendida que emite identificación periódica (anexo I, ${BOE_AFICIONADOS_REF}). «${c}».`;
  }
  if (/al realizar las emisiones desde estaciones de radioaficionados/i.test(s)) {
    return `En fonía es buena práctica cerrar con «cambio» o «out» para indicar fin de transmisión; no sustituye la identificación con distintivo. «${c}».`;
  }

  return null;
}
