/**
 * Comprobaciones extra: cobertura topicId ↔ banco, rutas, h1, #ids, avisos de fuentes y figuras.
 * Ejecutar desde la raíz del proyecto: node scripts/verify-extra.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import regulatory from "../data/regulatory.js";
import topics from "../data/topics.js";
import questionsBanco from "../data/questions-banco.js";
import questions from "../data/questions.js";
import propias from "../data/questions-examen-propias.js";
import ure from "../data/ure-electricidad.js";
import ureExtra from "../data/ure-electricidad-extra.js";
import ureReg from "../data/ure-reglamentacion.js";
import fedi from "../data/fediea-2011.js";
import fediBloques from "../data/fediea-bloques.js";
import quij from "../data/quijotes-ea3rcq.js";
import quijotesExplanations from "../data/quijotes-explanations.js";
import { CRIBADO_PREFERRED_IDS } from "../data/question-cribado.js";
import { EXACT_FIGURE_QUESTION_IDS, EXCLUDED_UNTIL_EXACT_FIGURE_IDS } from "../data/question-policy.js";
import { checkStemFigures } from "../lib/stem-figure-check.mjs";
import { FIGURE_REQUIRED_STEM_RE, FIGURE_STEM_EXCLUDE_RE } from "../lib/import-question-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");

const all = questionsBanco;
const bancoIds = new Set(all.map((q) => q.id));

let errors = 0;
function fail(msg) {
  console.error(msg);
  errors += 1;
}

const blockIds = new Set();
for (const p of topics.parts || []) {
  for (const b of p.blocks || []) blockIds.add(b.id);
}

for (const id of blockIds) {
  const n = all.filter((q) => q.topicId === id).length;
  if (n === 0) fail(`Ninguna pregunta con topicId "${id}" (bloque huérfano en el banco).`);
}

const html = fs.readFileSync(path.join(webRoot, "index.html"), "utf8");
const app = fs.readFileSync(path.join(webRoot, "app.js"), "utf8");
const sourceDocPath = path.join(webRoot, "FUENTES_VERIFICACION.md");

const htmlIds = new Set();
for (const m of html.matchAll(/\bid\s*=\s*"([^"]+)"/gi)) htmlIds.add(m[1]);

const expectedViews = ["inicio", "temario", "normativa", "metodologia", "practicar", "examen", "cuaderno", "tarjetas", "ayuda"];
for (const id of expectedViews) {
  if (!htmlIds.has(`view-${id}`)) fail(`Falta sección principal id="view-${id}" en index.html`);
  if (!app.includes(`${id}: "RadioExamen`)) fail(`Falta título de documento para ruta "${id}" en DOC_TITLES`);
}

for (const m of html.matchAll(/data-nav\s*=\s*"([^"]+)"/gi)) {
  const id = m[1];
  if (!expectedViews.includes(id)) fail(`data-nav="${id}" no corresponde a una vista principal esperada.`);
}

for (const id of expectedViews) {
  if (!new RegExp(`href="#${id}"[^>]*data-nav="${id}"`).test(html)) {
    fail(`No hay enlace de navegación coherente href="#${id}" data-nav="${id}" en index.html`);
  }
}

for (const m of html.matchAll(/<section\b[^>]*id="(view-[^"]+)"[^>]*aria-labelledby="([^"]+)"/gi)) {
  const [, viewId, headingId] = m;
  if (!htmlIds.has(headingId)) fail(`${viewId} usa aria-labelledby="${headingId}" pero el título no existe.`);
}

const vhBlock = app.match(/const VIEW_HEADINGS = \{([\s\S]*?)\n\};/);
if (!vhBlock) {
  fail("No se encontró VIEW_HEADINGS en app.js");
} else {
  for (const m of vhBlock[1].matchAll(/:\s*"([^"]+)"/g)) {
    const hid = m[1];
    if (!htmlIds.has(hid)) fail(`VIEW_HEADINGS apunta a id inexistente en index.html: "${hid}"`);
  }
}

const dynamicIds = new Set(["quiz-mark-review", "quiz-reveal", "user-stats-reset"]);
const appRefs = new Set();
for (const m of app.matchAll(/\$\(\s*"#([^"]+)"\s*\)/g)) appRefs.add(m[1]);

for (const id of appRefs) {
  if (dynamicIds.has(id)) continue;
  if (!htmlIds.has(id)) fail(`app.js usa $("#${id}") pero no hay id="${id}" en index.html`);
}

if (!fs.existsSync(sourceDocPath)) fail("Falta FUENTES_VERIFICACION.md para auditoría editorial.");
if (!/Control de veracidad del banco/.test(html)) fail("Practicar debe mostrar un aviso visible de veracidad del banco.");
if (!Array.isArray(regulatory.sourceHierarchy) || regulatory.sourceHierarchy.length < 4) {
  fail("data/regulatory.js debe definir sourceHierarchy con jerarquía clara de fuentes.");
} else {
  const hierarchy = regulatory.sourceHierarchy.join(" ");
  for (const word of ["BOE", "convocatoria", "CEPT", "Bancos históricos"]) {
    if (!hierarchy.includes(word)) fail(`sourceHierarchy no menciona "${word}".`);
  }
}
if (!regulatory.lastReviewNote || !/\d{2}\/\d{2}\/\d{4}/.test(regulatory.lastReviewNote)) {
  fail("data/regulatory.js debe indicar fecha de última revisión interna en lastReviewNote.");
}
if (/README\.md|carpeta web/.test(html + app)) {
  fail("Quedan mensajes de despliegue obsoletos que citan README.md o carpeta web.");
}

checkStemFigures(all, webRoot, fail);

for (const q of all) {
  const ex = typeof q.explain === "string" ? q.explain.trim() : "";
  if (!ex) {
    fail(`Pregunta ${q.id}: falta explain.`);
    continue;
  }
  if (/^Fuente:/i.test(ex) && ex.length < 180) {
    fail(`Pregunta ${q.id}: explain es solo fuente; añade explicación didáctica.`);
  }
}

for (const q of quij) {
  if (!q.explain || !String(q.explain).trim()) {
    fail(`Pregunta ${q.id}: falta explain en el banco Quijotes.`);
  }
}
for (const id of Object.keys(quijotesExplanations)) {
  if (!quij.some((q) => q.id === id)) {
    fail(`quijotes-explanations: entrada huérfana "${id}" (no existe en quijotes-ea3rcq.js).`);
  }
}

const bancoByStem = new Map();
for (const q of all) {
  const key = `${String(q.stem || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()}|${q.options.map((o) => String(o).toLowerCase().trim()).join("¦")}`;
  bancoByStem.set(key, q);
}

for (const id of CRIBADO_PREFERRED_IDS) {
  if (bancoIds.has(id)) continue;
  const src = [...questions, ...propias, ...ure, ...ureExtra, ...ureReg, ...fedi, ...fediBloques, ...quij].find(
    (q) => q.id === id,
  );
  if (!src) continue;
  const key = `${String(src.stem || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()}|${src.options.map((o) => String(o).toLowerCase().trim()).join("¦")}`;
  const alt = bancoByStem.get(key);
  if (alt?.stemFigure) continue;
  fail(`question-cribado: id "${id}" falta en questions-banco.js (sin sustituto con figura).`);
}

const externalFigureReferenceRe = /(ver|consulta|consultar|consultarla|consultarlas)\s+(la\s+|el\s+|las\s+|los\s+)?(figura|gr[aá]fica|gr[aá]fico|esquema|circuito|forma de onda).{0,80}\b(URE|FEDI|web)\b/i;
for (const q of all) {
  const stem = String(q.stem || "");
  if (FIGURE_STEM_EXCLUDE_RE.test(stem)) continue;
  if (FIGURE_REQUIRED_STEM_RE.test(stem) && !q.stemFigure) {
    fail(`Pregunta ${q.id}: el enunciado requiere figura pero no tiene stemFigure.`);
  }
  if (q.stemFigure) {
    const figureText = `${q.stem || ""} ${q.explain || ""} ${Array.isArray(q.optionExplanations) ? q.optionExplanations.join(" ") : ""}`;
    if (externalFigureReferenceRe.test(figureText)) {
      fail(`Pregunta ${q.id}: tiene stemFigure local; no debe derivar la figura a URE/FEDI/web externa.`);
    }
    const figPath = String(q.stemFigure);
    if (figPath.toLowerCase().endsWith(".svg")) {
      fail(`Pregunta ${q.id}: el banco activo no admite SVG interpretado (${figPath}); usa *-original.jpg|png.`);
    }
    if (!/-original\.(jpg|jpeg|png|webp)$/i.test(figPath)) {
      fail(`Pregunta ${q.id}: stemFigure debe apuntar a imagen original fiel (*-original.*): ${figPath}`);
    }
    if (!EXACT_FIGURE_QUESTION_IDS.has(q.id) && !EXCLUDED_UNTIL_EXACT_FIGURE_IDS.has(q.id)) {
      fail(`Pregunta ${q.id}: figura sin estatus editorial. Debe certificarse como exacta o excluirse del banco activo.`);
    }
  }
}

if (errors) {
  console.error(`\nverify-extra: ${errors} error(es).`);
  process.exit(1);
}
console.log("verify-extra: OK.", blockIds.size, "bloques con preguntas,", appRefs.size, "refs # en app.js.");
