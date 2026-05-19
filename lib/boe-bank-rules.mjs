/**
 * Reglas de alineación del banco con BOE-A-2013-7624 y marco vigente (Ley 11/2022, etc.).
 *
 * DGT en bancos históricos = Dirección General de Telecomunicaciones (organismo
 * desaparecido). No confundir con la Dirección General de Tráfico (carreteras).
 * Solo sustituimos la forma completa «…de Telecomunicaciones» o la abreviatura
 * didáctica «DGTel»; nunca un «DGT» suelto que pueda leerse como Tráfico.
 */
import { BOE_REG_AFICIONADOS_VIGENTE } from "../data/boe-normativa.mjs";
import { explainArt25hPotencia } from "./boe-explain.mjs";

export const BOE_REF = BOE_REG_AFICIONADOS_VIGENTE;

/** Sustituto de la antigua DGT de telecomunicaciones (no DGT de Tráfico). */
export const ADMIN_ESPECTRO_LABEL = "la Administración competente en espectro radioeléctrico";

export const ADMIN_TELECOM_LABEL = "la Administración competente en telecomunicaciones";

/** @type {[RegExp, string][]} */
export const STEM_TEXT_REPLACEMENTS = [
  [
    /Ley 32\/2003, de 3 de noviembre, General de Telecomunicaciones/gi,
    "Ley 11/2022, de 28 de junio, General de Telecomunicaciones (BOE-A-2022-10757)",
  ],
  [
    /Dirección General de Telecomunicaciones/gi,
    ADMIN_ESPECTRO_LABEL,
  ],
  [
    /Direccion General de Telecomunicaciones/gi,
    ADMIN_ESPECTRO_LABEL,
  ],
  [
    /DIRECCION GENERAL DE TELECOMUNICACIONES/gi,
    "LA ADMINISTRACIÓN COMPETENTE EN ESPECTRO RADIOELÉCTRICO",
  ],
  [/^La la Administraci[oó]n/gi, "La Administración"],
  [/la la Administraci[oó]n/gi, "la Administración"],
];

/** @type {[RegExp, string][]} */
export const OPTION_TEXT_REPLACEMENTS = [
  [
    /Dirección General de Telecomunicaciones/gi,
    ADMIN_ESPECTRO_LABEL,
  ],
  [
    /Direccion General de Telecomunicaciones/gi,
    ADMIN_ESPECTRO_LABEL,
  ],
  [/\bDGTel\b/gi, ADMIN_TELECOM_LABEL],
  [/1a DGTel/gi, ADMIN_TELECOM_LABEL],
  [/del la Administraci[oó]n/gi, "de la Administración"],
  [
    /Ley 32\/2003, de 3 de noviembre, General de Telecomunicaciones/gi,
    "Ley 11/2022, de 28 de junio, General de Telecomunicaciones",
  ],
  [
    /Orden ITC\/1791\/2006, de 5 de junio/gi,
    "Orden IET/1311/2013, de 9 de julio (BOE-A-2013-7624)",
  ],
  [
    /Ministerio de Industria, Turismo y Comercio/gi,
    ADMIN_ESPECTRO_LABEL,
  ],
  [/\bSETSI\b/g, "la Administración competente en telecomunicaciones"],
  [/la la Administraci[oó]n/gi, "la Administración"],
  [/^La la Administraci[oó]n/gi, "La Administración"],
  [
    /Secretaría de Estado de Telecomunicaciones y para la Sociedad de la Información/gi,
    "Secretaría de Estado de Telecomunicaciones y Digitalización",
  ],
];

const AUTH_YES_REPEAT =
  "Sí, previa autorización administrativa conforme a los arts. 24 y 25 del reglamento.";

/**
 * Sustituye opción «En ningún caso» en preguntas de repetidor/desatendida.
 * @param {object} q
 * @returns {object}
 */
export function patchRepeaterDenialOptions(q) {
  const stem = String(q.stem || "");
  if (
    !/repetidor|desatendid|estaci[oó]n autom[aá]tica/i.test(stem) ||
    !/autorizado a instalar|podr[aá] ser autorizado|titular de una estaci[oó]n autom/i.test(stem)
  ) {
    return q;
  }
  const options = [...(q.options || [])];
  let correctIndex = q.correctIndex;
  let changed = false;
  for (let i = 0; i < options.length; i += 1) {
    if (/^En ning[uú]n caso\.?$/i.test(String(options[i] || "").trim())) {
      options[i] = AUTH_YES_REPEAT;
      if (correctIndex === i) changed = true;
    }
  }
  if (changed) {
    correctIndex = options.findIndex((o) => o === AUTH_YES_REPEAT);
  }
  return { ...q, options, correctIndex };
}

/**
 * Art. 25.h: 50 W fuera del casco urbano, 10 W dentro (VHF/UHF desatendidas).
 * @param {object} q
 * @returns {object}
 */
export function patchDesatendidaPotenciaOptions(q) {
  const stem = String(q.stem || "");
  const fuera =
    /fuera del casco urbano/i.test(stem) &&
    /desatendid|autom[aá]tica/i.test(stem) &&
    /vhf|uhf|potencia|salida/i.test(stem);
  const dentro =
    /dentro del casco urbano|interior del casco urbano/i.test(stem) &&
    /desatendid|autom[aá]tica/i.test(stem) &&
    /vhf|uhf|potencia|salida/i.test(stem);
  if (!fuera && !dentro) return q;

  const options = [...(q.options || [])];
  const pick = (re) => options.findIndex((o) => re.test(String(o || "")));

  if (fuera) {
    let i50 = pick(/\b50\s*w\.?/i);
    const i25 = pick(/\b25\s*w\.?/i);
    if (i50 < 0 && i25 >= 0) {
      options[i25] = String(options[i25]).replace(/\b25\s*w\.?/i, "50 W.");
      i50 = i25;
    }
    if (i50 >= 0) {
      return { ...q, options, correctIndex: i50 };
    }
  }

  if (dentro) {
    const i10 = pick(/\b10\s*w\.?/i);
    const i5 = pick(/\b5\s*w\.?/i);
    if (i10 >= 0) {
      return { ...q, options, correctIndex: i10 };
    }
  }

  return q;
}

/**
 * Ajusta índice correcto según reglas BOE.
 * @param {object} q
 * @returns {object}
 */
export function resolveCorrectIndexByBoe(q) {
  let next = patchDesatendidaPotenciaOptions({ ...q, options: [...(q.options || [])] });
  const stem = String(next.stem || "");
  const opts = next.options;

  const pick = (re) => opts.findIndex((o) => re.test(String(o || "")));

  if (/tipificaci[oó]n de las infracciones/i.test(stem)) {
    const i = pick(/ley 11\/2022/i);
    if (i >= 0) return { ...next, correctIndex: i };
  }

  if (/qu[eé] identifica a un radioaficionado titular/i.test(stem)) {
    const i = pick(/distintivo de llamada asociado/i);
    if (i >= 0) return { ...next, correctIndex: i };
  }

  if (/retrasar injustificadamente la aportaci[oó]n de datos/i.test(stem)) {
    const i = pick(/^Leve\.?$/i);
    if (i >= 0) return { ...next, correctIndex: i };
  }

  return next;
}

/**
 * @param {string} stem
 * @param {string} correct
 */
export function explainForBoeRule(stem, correct) {
  const s = stem.toLowerCase();
  const c = String(correct || "").trim();
  if (/repetidor|desatendid/.test(s) && /previa autorizaci[oó]n administrativa/i.test(c)) {
    return `El reglamento (${BOE_REF}, arts. 24-25) autoriza repetidores y estaciones automáticas desatendidas con resolución administrativa. «${c}».`;
  }
  if (/ley 11\/2022.*infracci[oó]n|aportaci[oó]n de datos requeridos/i.test(s)) {
    return `Según la Ley 11/2022 (BOE-A-2022-10757), retrasar injustificadamente datos exigidos por la Administración puede ser infracción leve. «${c}».`;
  }
  if (/tipificaci[oó]n de las infracciones/i.test(s) && /ley 11\/2022/i.test(c)) {
    return `Las infracciones del sector telecomunicaciones se tipifican en la Ley 11/2022 (BOE-A-2022-10757). «${c}».`;
  }
  if (/fuera del casco urbano.*desatendid|desatendid.*fuera del casco/i.test(s)) {
    return explainArt25hPotencia(c);
  }
  if (/dentro del casco urbano.*desatendid|desatendid.*casco urbano/i.test(s)) {
    return explainArt25hPotencia(c);
  }
  return null;
}

/**
 * @param {object} q
 * @returns {object}
 */
export function applyBoeBankRules(q) {
  let next = { ...q };
  let stem = String(next.stem || "");
  for (const [re, repl] of STEM_TEXT_REPLACEMENTS) {
    stem = stem.replace(re, repl);
  }
  next = { ...next, stem };
  const options = (next.options || []).map((o) => {
    let t = String(o ?? "");
    for (const [re, repl] of OPTION_TEXT_REPLACEMENTS) {
      t = t.replace(re, repl);
    }
    return t;
  });
  next = { ...next, options };
  next = patchRepeaterDenialOptions(next);
  next = resolveCorrectIndexByBoe(next);
  const ruleExplain = explainForBoeRule(next.stem, next.options?.[next.correctIndex]);
  if (ruleExplain) {
    next = { ...next, explain: ruleExplain };
  }
  return next;
}
