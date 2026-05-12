/**
 * Descarga los tests QSM del Radio Club Quijotes (EA3RCQ) y genera
 * `data/quijotes-ea3rcq.js` (solo contenido orientado a España).
 *
 * Uso (desde la carpeta web): node scripts/build-quijotes.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "quijotes-ea3rcq.js");

const SOURCES = [
  {
    url: "https://radioclubquijotes.org/qsm_quiz/electricidad-y-radioelectricidad/",
    key: "1",
    part: 1,
    slug: "electricidad-examen",
  },
  {
    url: "https://radioclubquijotes.org/qsm_quiz/radioelectricidad-correccion-inmediata/",
    key: "83",
    part: 1,
    slug: "radioelectricidad-correccion",
  },
  {
    url: "https://radioclubquijotes.org/qsm_quiz/reglamentacion/",
    key: "14",
    part: 2,
    slug: "reglamentacion-examen",
  },
  {
    url: "https://radioclubquijotes.org/qsm_quiz/reglamentacion-correccion-inmediata/",
    key: "84",
    part: 2,
    slug: "reglamentacion-correccion",
  },
];

const SKIP_PATTERNS = [
  /\bFCC\b/i,
  /\bARRL\b/i,
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

/** Errores conocidos en el banco origen (clave = `${quizKey}-${qid}`). */
const CORRECT_OVERRIDES = {
  "1-6": 2, // realimentación, no demodulación
};

function unescapePhpStringInJson(s) {
  return s
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\\//g, "/");
}

function extractQuestionTitle(settings) {
  if (!settings || typeof settings !== "string") return "";
  const m = settings.match(
    /"question_title";s:\d+:"([\s\S]*?)";s:\d+:"(?:featureImageID|answerEditor)/,
  );
  if (!m) return "";
  return m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\").trim();
}

function shouldSkip(stem, options) {
  const blob = `${stem}\n${options.join("\n")}`;
  return SKIP_PATTERNS.some((re) => re.test(blob));
}

function topicIdPart1(stem) {
  const s = stem.toLowerCase();
  if (
    /antena|dipolo|radial|propagaci|ionosfera|troposfera|estratosfera|mesosfera|coaxial|impedancia.*antena|diagrama.*radiaci/i.test(
      s,
    )
  ) {
    return "antenas-prop";
  }
  if (
    /receptor|transmis|mezclad|modul|demodul|oscilador|portadora|squelch|selectividad|sensibilidad|estabilidad|sinton|excitad|dds|intermodulaci/i.test(
      s,
    )
  ) {
    return "receptores-emisores";
  }
  if (
    /transformador|condens|resist|ohm|farad|amper|volt|bobin|circuito resonante|diodo|rectific|campo eléctrico|campo magnético|serie|paralelo/i.test(
      s,
    )
  ) {
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

function parseQuizJson(html, quizKey) {
  const safeKey = String(quizKey).replace(/[^0-9A-Za-z_-]/g, "");
  const m = html.match(
    new RegExp(`window\\.qmn_quiz_data\\["${safeKey}"\\]\\s*=\\s*(\\{)`),
  );
  if (!m) throw new Error(`No se encontró qmn_quiz_data["${safeKey}"]`);
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
  if (end === -1) throw new Error("JSON del cuestionario incompleto");
  return JSON.parse(html.slice(startBrace, end));
}

function extractItems(html, quizKey, part, sourceSlug) {
  const data = parseQuizJson(html, quizKey);
  const qlist = data.question_list;
  if (!qlist) return { quizId: data.quiz_id, items: [] };

  const sortedIds = Object.keys(qlist).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  const items = [];
  for (const qid of sortedIds) {
    const q = qlist[qid];
    const settings = unescapePhpStringInJson(q.question_settings || "");
    let stem = extractQuestionTitle(settings).trim();
    if (!stem) continue;
    const rawAnswers = q.answers;
    if (!Array.isArray(rawAnswers) || rawAnswers.length < 2) continue;

    const options = [];
    let correctIndex = -1;
    rawAnswers.forEach((row, idx) => {
      options.push(String(row[0]).trim());
      if (row[2] === 1 || row[2] === true) correctIndex = idx;
    });

    const ok = `${quizKey}-${qid}`;
    if (CORRECT_OVERRIDES[ok] !== undefined) correctIndex = CORRECT_OVERRIDES[ok];

    if (correctIndex < 0 || options.length > 6) continue;
    if (shouldSkip(stem, options)) continue;

    const topicId = part === 1 ? topicIdPart1(stem) : topicIdPart2(stem);
    items.push({
      qid,
      quizKey,
      sourceSlug,
      stem,
      options,
      correctIndex,
      part,
      topicId,
    });
  }
  return { quizId: data.quiz_id, items };
}

function dedupeKey(it) {
  const norm = (s) =>
    s
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[¿?¡!.:;]+$/g, "")
      .trim();
  return `${norm(it.stem)}|${it.options.map(norm).join("¦")}`;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "radioexam-prep-bot/1.0 (+https://radioclubquijotes.org)",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

async function main() {
  const merged = [];
  const seen = new Set();

  for (const src of SOURCES) {
    process.stderr.write(`Descargando ${src.slug}…\n`);
    const html = await fetchHtml(src.url);
    const { items } = extractItems(html, src.key, src.part, src.slug);
    for (const it of items) {
      const k = dedupeKey(it);
      if (seen.has(k)) continue;
      seen.add(k);
      merged.push(it);
    }
  }

  const lines = [];
  lines.push("/**");
  lines.push(" * Radio Club Quijotes (EA3RCQ) — tests en línea.");
  lines.push(" * Generado por `node scripts/build-quijotes.mjs` (no editar a mano el bloque masivo).");
  lines.push(" * Fuentes:");
  for (const s of SOURCES) {
    lines.push(` *   - ${s.url}`);
  }
  lines.push(" * Se excluyen ítems con referencias claras a normativa estadounidense u otros países (FCC, ARRL, etc.).");
  lines.push(" */");
  lines.push("export default [");

  merged.forEach((it, idx) => {
    const id = `quijotes-${String(idx + 1).padStart(3, "0")}`;
    const explain = `Fuente: Radio Club Quijotes (EA3RCQ) — ${it.sourceSlug}, quiz QSM ${it.quizKey}, pregunta ${it.qid}.`;
    const optStr = it.options.map((o) => JSON.stringify(o)).join(",\n      ");
    lines.push(`  {`);
    lines.push(`    id: ${JSON.stringify(id)},`);
    lines.push(`    part: ${it.part},`);
    lines.push(`    topicId: ${JSON.stringify(it.topicId)},`);
    lines.push(`    stem: ${JSON.stringify(it.stem)},`);
    lines.push(`    options: [\n      ${optStr},\n    ],`);
    lines.push(`    correctIndex: ${it.correctIndex},`);
    lines.push(`    explain: ${JSON.stringify(explain)},`);
    lines.push(`  },`);
  });

  lines.push("];");
  lines.push("");
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  process.stderr.write(`Escrito ${OUT} (${merged.length} preguntas).\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
