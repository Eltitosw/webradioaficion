/**
 * Reparación de texto español: mojibake, U+FFFD y tildes perdidas en importaciones.
 */

const REPLACEMENT = "\uFFFD";

const HTML_NAMED = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  aacute: "á",
  eacute: "é",
  iacute: "í",
  oacute: "ó",
  uacute: "ú",
  Aacute: "Á",
  Eacute: "É",
  Iacute: "Í",
  Oacute: "Ó",
  Uacute: "Ú",
  ntilde: "ñ",
  Ntilde: "Ñ",
  iquest: "¿",
  iexcl: "¡",
  uuml: "ü",
  Uuml: "Ü",
  auml: "ä",
  Auml: "Ä",
  ouml: "ö",
  Ouml: "Ö",
  ccedil: "ç",
  Ccedil: "Ç",
  ordm: "º",
  ordf: "ª",
  euro: "€",
};

/** @param {string} text */
export function decodeHtmlEntities(text) {
  let t = String(text || "");
  t = t.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
  t = t.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
  t = t.replace(/&([a-z]+);/gi, (m, name) => HTML_NAMED[name.toLowerCase()] ?? HTML_NAMED[name] ?? m);
  return t;
}

/** @param {string} text */
export function fixMojibake(text) {
  if (!text || !/[ÃÂ]/.test(text)) return text;
  try {
    return Buffer.from(text, "latin1").toString("utf8");
  } catch {
    return text;
  }
}

/** @param {string} text */
export function repairReplacementChar(text) {
  if (!text || !text.includes(REPLACEMENT)) return text;
  let t = text;

  t = t.replace(/ci\uFFFdn/gi, "ción");
  t = t.replace(/si\uFFFdn/gi, "sión");
  t = t.replace(/cci\uFFFdn/gi, "cción");
  t = t.replace(/ge\uFFFDn/gi, "geón");
  t = t.replace(/Se\uFFFDale/gi, "Señale");
  t = t.replace(/se\uFFFDal/gi, "señal");
  t = t.replace(/se\uFFFDales/gi, "señales");
  t = t.replace(/ioel\uFFFDctri/gi, "ioeléctri");
  t = t.replace(/el\uFFFDctr/gi, "eléctr");
  t = t.replace(/energ\uFFFDa/gi, "energía");
  t = t.replace(/micr\uFFFDo/gi, "micrófono");
  t = t.replace(/autom\uFFFDt/gi, "automát");
  t = t.replace(/m\uFFFDvil/gi, "móvil");
  t = t.replace(/car\uFFFDcter/gi, "carácter");
  t = t.replace(/caracter\uFFFDstic/gi, "característic");
  t = t.replace(/p\uFFFDblic/gi, "públic");
  t = t.replace(/arm\uFFFDn/gi, "armón");
  t = t.replace(/t\uFFFDpic/gi, "tópic");
  t = t.replace(/t\uFFFDcnic/gi, "técnic");
  t = t.replace(/f\uFFFDsic/gi, "físic");
  t = t.replace(/m\uFFFDs /gi, "más ");
  t = t.replace(/m\uFFFDs\./gi, "más.");
  t = t.replace(/ \uFFFDnica/gi, " única");
  t = t.replace(/ \uFFFDnico/gi, " único");
  t = t.replace(/"\uFFFDC\uFFFDo/gi, '"¿Cómo');
  t = t.replace(/"\uFFFDQu\uFFFD/gi, '"¿Qué');
  t = t.replace(/"\uFFFD/g, '"¿');
  t = t.replace(/\uFFFDnica/gi, "única");
  t = t.replace(/\uFFFD/g, "");

  return t;
}

/** Tildes perdidas tras reparación U+FFFD o HTML mal parseado (FEDI histórico). */
export function repairLostAccents(text) {
  if (!text || typeof text !== "string") return text;
  let t = text;

  t = t.replace(/\bqu (circuito|valor|tipo|esquema|funci[oó]n)/gi, "qué $1");
  t = t.replace(/\bQu valor\b/g, "Qué valor");
  t = t.replace(/grfico/gi, "gráfico");
  t = t.replace(/geogrf/gi, "geográf");
  t = t.replace(/indquelo/gi, "indíquelo");
  t = t.replace(/\bincluira\b/gi, "incluirá");
  t = t.replace(/\bbsico\b/gi, "básico");
  t = t.replace(/banda lateral unica\b/gi, "banda lateral única");
  t = t.replace(/lateral unica\b/gi, "lateral única");
  t = t.replace(/\bunica\b/gi, "única");
  t = t.replace(/\bunico\b/gi, "único");
  t = t.replace(/\belectrico\b/gi, "eléctrico");
  t = t.replace(/\belectrica\b/gi, "eléctrica");
  t = t.replace(/\bradioelectrico\b/gi, "radioeléctrico");
  t = t.replace(/\bradioelectrica\b/gi, "radioeléctrica");
  t = t.replace(/\bgeografico\b/gi, "geográfico");
  t = t.replace(/\bgeografica\b/gi, "geográfica");
  t = t.replace(/\bgeograficos\b/gi, "geográficos");

  return t;
}

/** @param {string} text */
export function repairSpanishText(text) {
  if (!text || typeof text !== "string") return text;
  let t = decodeHtmlEntities(text);
  t = fixMojibake(t);
  if (t.includes(REPLACEMENT)) t = repairReplacementChar(t);
  t = repairLostAccents(t);
  return t.replace(/\s+/g, " ").trim();
}

/** @param {object} q */
export function repairQuestionFields(q) {
  if (!q || typeof q !== "object") return q;
  const out = { ...q };
  if (typeof out.stem === "string") out.stem = repairSpanishText(out.stem);
  if (typeof out.stemFigureAlt === "string") out.stemFigureAlt = repairSpanishText(out.stemFigureAlt);
  if (typeof out.explain === "string") out.explain = repairSpanishText(out.explain);
  if (Array.isArray(out.options)) {
    out.options = out.options.map((o) => (typeof o === "string" ? repairSpanishText(o) : o));
    // Descartar opciones vacías (datos de origen con relleno) y reajustar correctIndex.
    const correctText =
      typeof out.correctIndex === "number" ? out.options[out.correctIndex] : undefined;
    const cleaned = out.options.filter((o) => String(o ?? "").trim().length > 0);
    if (cleaned.length !== out.options.length) {
      out.options = cleaned;
      if (correctText !== undefined) {
        const idx = cleaned.indexOf(correctText);
        if (idx >= 0) out.correctIndex = idx;
      }
    }
  }
  if (Array.isArray(out.optionExplanations)) {
    out.optionExplanations = out.optionExplanations.map((o) =>
      typeof o === "string" ? repairSpanishText(o) : o,
    );
  }
  return out;
}
