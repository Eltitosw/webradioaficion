/**
 * Referencias BOE estándar en explicaciones del banco (alineado con data/boe-normativa.mjs).
 */
import { BOE_REG_AFICIONADOS_VIGENTE } from "../data/boe-normativa.mjs";

export const BOE_AFICIONADOS_REF = BOE_REG_AFICIONADOS_VIGENTE;

/** Exige cita explícita al reglamento vigente de aficionados. */
export const BOE_AFICIONADOS_ANCHOR_RE = /BOE-A-2013-7624|IET\/1311\/2013|Orden IET\/1311/i;

/** Ley 11/2022 (infracciones telecomunicaciones, marco general). */
export const BOE_LEY_TELECOM_ANCHOR_RE = /BOE-A-2022-10757|Ley\s*11\/2022/i;

export const BOE_HISTORICAL_HEDGE =
  " Pregunta de banco histórico (FEDI/Quijotes): la respuesta válida en el test puede diferir del texto actual del BOE; contrasta con el reglamento consolidado BOE-A-2013-7624 (anexo I potencias, anexo II examen) antes del examen.";

/**
 * Enunciados cuya respuesta legal depende del reglamento de aficionados (BOE-A-2013-7624).
 * No incluye nomenclatura ITU, alfabeto ICAO ni electricidad pura aunque el bloque sea «normativo».
 * @param {string} stem
 */
export function stemNeedsBoeAficionadosAnchor(stem) {
  const s = String(stem || "").toLowerCase();
  return /reglamento|radioaficion|aficionad|dominio p[uú]blico radio|cnae?f|cuadro nacional de atribuci|anexo\s*[i12]|art[ií]culo\s*\d|potencia|vatios|\bw\b.*mhz|mhz.*\bw\b|infracci[oó]n|sanci[oó]n|plazo|autorizaci[oó]n de radio|licencia de estaci|titular de la estaci|memoria descriptiva|repetidor|desatendid|estaciones autom[aá]ticas|examen.*capacit|prueba de capacit|securit[eé]|mayday|pan-pan|indicativo.*(espa|ea\d)|distintivo.*(inicio|final|comunicaci)/i.test(
    s,
  );
}

/**
 * @param {object} q
 * @param {string} [explainText]
 */
export function explainHasBoeAficionadosAnchor(q, explainText) {
  const ped = explainText !== undefined ? String(explainText) : String(q?.explain || "");
  const stem = String(q?.stem || "");
  if (
    /ley\s*11\/2022|infracci[oó]n.*telecomunicaciones|general de telecomunicaciones/i.test(stem) &&
    BOE_LEY_TELECOM_ANCHOR_RE.test(ped)
  ) {
    return true;
  }
  return BOE_AFICIONADOS_ANCHOR_RE.test(ped);
}

/**
 * Art. 25.h / anexo I — plantilla con cita BOE.
 * @param {string} correct
 * @param {{ bankNote?: string }} [opts]
 */
export function explainArt25hPotencia(correct, opts = {}) {
  const c = String(correct || "").trim();
  const extra = opts.bankNote ? ` ${opts.bankNote}` : "";
  return `Según el art. 25.h y el anexo I del reglamento vigente (${BOE_AFICIONADOS_REF}), en VHF/UHF desatendidas suele ser hasta 10 W en casco urbano y hasta 50 W fuera, salvo motivación especial.${extra} En este enunciado la opción correcta del banco es «${c}».`;
}

/**
 * Potencia por banda (anexo I).
 * @param {string} stem
 * @param {string} correct
 */
export function explainAnexoIPotencia(stem, correct) {
  const c = String(correct || "").trim();
  return `Las potencias máximas por banda están en el anexo I del reglamento de aficionados (${BOE_AFICIONADOS_REF}). El test FEDI (2011) puede usar redacción antigua: contrasta la banda del enunciado con el anexo I vigente. La respuesta que marca el banco es «${c}».`;
}
