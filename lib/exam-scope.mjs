/**
 * Ámbito del simulador: examen y autorización de radioaficionado (España).
 * @see https://avance.digital.gob.es/espectro/radioaficionados/Paginas/examenes-radioaficionado.aspx
 * @see https://avance.digital.gob.es/espectro/radioaficionados/autorizaciones/Paginas/autorizacion-administrativa-radioaficionado.aspx
 *
 * No incluye Dirección General de Tráfico (carreteras), ni formación TETRA/Protección Civil
 * importada de bancos ajenos al temario oficial.
 */

export const EXAM_OFFICIAL_URLS = {
  examenes:
    "https://avance.digital.gob.es/espectro/radioaficionados/Paginas/examenes-radioaficionado.aspx",
  autorizaciones:
    "https://avance.digital.gob.es/espectro/radioaficionados/autorizaciones/Paginas/autorizacion-administrativa-radioaficionado.aspx",
};

/** Vial / DGT Tráfico (no telecomunicaciones ni examen de aficionado). */
const ROAD_TRAFFIC_RE =
  /accidente de tr[aá]fico|sentido de circulaci[oó]n|contra sentido de circulaci[oó]n|señal de tr[aá]fico|direcci[oó]n de tr[aá]fico|direcci[oó]n seg[uú]n veh[ií]culos|circular en (sentido|rotonda)|proteger la zona|numeraci[oó]n que (aumenta|disminuye|sube|baja)|calle (cerrada|en obras)|mapa de carreteras|permiso de conducir|sem[aá]foro vial|autopista\b|carretera\b/i;

/** Primeros auxilios, orientación urbana, TETRA/EA3RCQ (fuera del BOE de aficionados). */
const NON_EXAM_RADIO_RE =
  /\btetra\b|\bea3rcq\b|protocolo pas\b|\bpls\b|posici[oó]n lateral de seguridad|accidentado\b|inconsciente y respira|reanimaci[oó]n card|desfibrilador|hemorragia severa|palabra clave.*["“]?(tome nota|filiaci[oó]n|disp[oó]ngase)|fin de silencio radio|slots de tiempo.*portadora|encriptaci[oó]n.*aes-?(128|256)|llamada m[uú]ltiple.*mando|equipo instalado en veh[ií]culos.*equipo m[oó]vil/i;

/** Quiz Quijotes 85 = comunicaciones club / civil (no examen Ministerio). */
const QUIZ_85_ID = /^quijotes-85-/;

/** Telefonía/Internet de consumo (no temario examen radioaficionado). */
const CONSUMER_TELECOM_RE =
  /acceso a internet|\badsl\b|megabytes por segundo|velocidad de descarga|velocidad m[ií]nima real.*mbps|ancho de banda de \d+ millones de bits|fibra óptica al hogar|router wi-?fi doméstico/i;

/**
 * @param {string} text
 */
function isRoadTrafficText(text) {
  return ROAD_TRAFFIC_RE.test(text);
}

/**
 * Pregunta fuera del ámbito del examen oficial de radioaficionado.
 * @param {{ id?: string, stem?: string, options?: string[] }} q
 */
export function isOffTopicForRadioaficionadoExam(q) {
  if (!q?.id) return false;
  const id = String(q.id);
  if (QUIZ_85_ID.test(id)) return true;

  const stem = String(q.stem || "");
  const blob = `${stem} ${(q.options || []).join(" ")}`;

  if (isRoadTrafficText(stem)) return true;
  if (NON_EXAM_RADIO_RE.test(blob)) return true;
  if (CONSUMER_TELECOM_RE.test(blob)) return true;

  const opts = q.options || [];
  if (
    opts.some((o) => /direcci[oó]n de tr[aá]fico|señal de tr[aá]fico/i.test(String(o))) &&
    !/radioaficionado|estaci[oó]n de aficionado|distintivo de llamada/i.test(stem)
  ) {
    return true;
  }

  return false;
}
