/**
 * CLI opcional: exporta un único HTML+QSM a JS (sin deduplicar).
 * Para el conjunto completo Quijotes + deduplicación, usa `node scripts/build-quijotes.mjs`.
 *
 * Uso (desde web/): node scripts/import-quijotes-quiz.mjs <input.html> <quizDataKey> <idPrefix> <part>
 */
import fs from "fs";

function unescapePhpStringInJson(s) {
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\\//g, "/");
}

/** Pull question_title from PHP-serialized question_settings (minimal parser). */
function extractQuestionTitle(settings) {
  if (!settings || typeof settings !== "string") return "";
  const m = settings.match(
    /"question_title";s:\d+:"([\s\S]*?)";s:\d+:"(?:featureImageID|answerEditor)/,
  );
  if (!m) return "";
  return m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\").trim();
}

/** US / non-Spain indicators — skip whole question if matched on stem+options. */
const SKIP_PATTERNS = [
  /\bFCC\b/i,
  /\bARRL\b/i,
  /\bUS\b(?!\s*O)/i,
  /\bUnited States\b/i,
  /\bAmerican\b/i,
  /\bExtra class\b/i,
  /\bTechnician\b/i,
  /\bGeneral license\b/i,
  /\bNTIA\b/i,
  /\bPart 97\b/i,
  /\bVE team\b/i,
  /\bCanadian\b/i,
  /\bIndustry Canada\b/i,
];

/** Manual corrections when source quiz marks wrong answer (verified conceptually). */
const CORRECT_OVERRIDES = {
  // Stem contains "introducirla de nuevo en su entrada" → realimentación, not demodulación.
  "1-6": 2,
};

function shouldSkip(stem, options) {
  const blob = `${stem}\n${options.join("\n")}`;
  return SKIP_PATTERNS.some((re) => re.test(blob));
}

function topicIdPart1(stem) {
  const s = stem.toLowerCase();
  if (/antena|dipolo|radial|propagaci|ionosfera|troposfera|estratosfera|mesosfera|coaxial|línea de transmisión|impedancia.*antena|diagrama.*radiaci/i.test(s)) {
    return "antenas-prop";
  }
  if (/receptor|transmis|mezclad|modul|demodul|oscilador|portadora|squelch|selectividad|sensibilidad|estabilidad|sinton|excitad|dds|intermodulaci/i.test(s)) {
    return "receptores-emisores";
  }
  if (/transformador|condens|resist|ohm|farad|amper|volt|bobin|circuito resonante|diodo|rectific|campo eléctrico|campo magnético|serie|paralelo/i.test(s)) {
    return "componentes";
  }
  if (/onda|polarizaci|frecuencia|hf\b|vhf|uhf|ancho de banda|espectro/i.test(s)) {
    return "magnetismo-ondas";
  }
  return "electricidad-basica";
}

function topicIdPart2(stem) {
  const s = stem.toLowerCase();
  if (/distintivo|indicativo|cept|harec|autorizaci.*radioaficionado|sufijo|prefijo|licencia de estación/i.test(s)) {
    return "licencias-indicativos";
  }
  if (/antena|inmueble|comunidad|instalaci|desmontaje|terraza|seguro.*licencia|sistema radiante/i.test(s)) {
    return "instalaciones";
  }
  if (/código q|rst\b|mayday|fonétic|deletreo|identificaci|pse\b|alfabeto/i.test(s)) {
    return "operacion-seguridad";
  }
  return "marco-normativo";
}

function main() {
  const [, , htmlPath, quizKey, exportPrefix, partStr] = process.argv;
  if (!htmlPath || !quizKey || !exportPrefix || !partStr) {
    console.error(
      "Usage: node scripts/import-quijotes-quiz.mjs <page.html> <quizDataKey> <idPrefix> <part>",
    );
    process.exit(1);
  }
  const part = parseInt(partStr, 10);
  const html = fs.readFileSync(htmlPath, "utf8");
  const safeKey = String(quizKey).replace(/[^0-9A-Za-z_-]/g, "");
  const m = html.match(
    new RegExp(
      `window\\.qmn_quiz_data\\["${safeKey}"\\]\\s*=\\s*(\\{)`,
    ),
  );
  if (!m) {
    console.error("quiz data assignment not found");
    process.exit(1);
  }
  const startBrace = m.index + m[0].length - 1;
  let depth = 0;
  let end = -1;
  for (let i = startBrace; i < html.length; i += 1) {
    const c = html[i];
    if (c === "{") depth += 1;
    else if (c === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) {
    console.error("Could not find end of JSON object");
    process.exit(1);
  }
  const jsonSlice = html.slice(startBrace, end);
  let data;
  try {
    data = JSON.parse(jsonSlice);
  } catch (e) {
    console.error("JSON parse failed", e.message);
    process.exit(1);
  }
  const qlist = data.question_list;
  if (!qlist || typeof qlist !== "object") {
    console.error("No question_list");
    process.exit(1);
  }

  const items = [];
  let seq = 0;
  const sortedIds = Object.keys(qlist).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  for (const qid of sortedIds) {
    const q = qlist[qid];
    const settings = unescapePhpStringInJson(q.question_settings || "");
    let stem = extractQuestionTitle(settings).trim();
    if (!stem) stem = `(sin enunciado id ${qid})`;
    const rawAnswers = q.answers;
    if (!Array.isArray(rawAnswers) || rawAnswers.length < 2) continue;

    const options = [];
    let correctIndex = -1;
    rawAnswers.forEach((row, idx) => {
      const text = row[0];
      const isCorrect = row[2] === 1 || row[2] === true;
      options.push(String(text).trim());
      if (isCorrect) correctIndex = idx;
    });

    const overrideKey = `${quizKey}-${qid}`;
    if (CORRECT_OVERRIDES[overrideKey] !== undefined) {
      correctIndex = CORRECT_OVERRIDES[overrideKey];
    }

    if (correctIndex < 0 || options.length < 2) continue;
    if (options.length > 6) continue;

    if (shouldSkip(stem, options)) continue;

    const topicId = part === 1 ? topicIdPart1(stem) : topicIdPart2(stem);
    seq += 1;
    const id = `${exportPrefix}-${String(seq).padStart(3, "0")}`;
    items.push({ id, qid, stem, options, correctIndex, topicId });
  }

  const lines = [];
  lines.push("/**");
  lines.push(` * Radio Club Quijotes / EA3RCQ — preguntas extraídas del test en línea.`);
  lines.push(` * Origen: ${htmlPath} (quiz_id ${data.quiz_id}).`);
  lines.push(" * Solo contenido aplicable a España; ítems con referencias EE. UU. u otras se descartan.");
  lines.push(" * Las respuestas correctas vienen del JSON embebido del plugin QSM; se aplican correcciones puntuales si el banco origen erra.");
  lines.push(" */");
  lines.push("export default [");
  for (const it of items) {
    const optStr = it.options.map((o) => JSON.stringify(o)).join(",\n      ");
    lines.push(`  {`);
    lines.push(`    id: ${JSON.stringify(it.id)},`);
    lines.push(`    part: ${part},`);
    lines.push(`    topicId: ${JSON.stringify(it.topicId)},`);
    lines.push(`    stem: ${JSON.stringify(it.stem)},`);
    lines.push(`    options: [\n      ${optStr},\n    ],`);
    lines.push(`    correctIndex: ${it.correctIndex},`);
    lines.push(
      `    explain: "Fuente: Radio Club Quijotes (EA3RCQ) — id pregunta QSM ${it.qid}.",`,
    );
    lines.push(`  },`);
  }
  lines.push("];");
  lines.push("");
  process.stdout.write(lines.join("\n"));
}

main();
