import topicsData from "./data/topics.js";
import topicStudy from "./data/topics-study.js";
import questionsBanco from "./data/questions-banco.js";
import { BANCO_STATS } from "./data/questions-banco.js";
import regulatory from "./data/regulatory.js";
import { isActiveQuestion } from "./data/question-policy.js";
import {
  PHONETIC_ALPHABET,
  Q_CODES,
  EA_DISTRICTS,
  EMERGENCY_SIGNALS,
  UTILIDADES_NOTES,
} from "./data/utilidades.js";
import { shuffle, buildQuestionList, shuffleQuestionOptions } from "./lib/quiz-session.js";
import { filterQuestionsForSession } from "./lib/question-pool.mjs";
import { isTemplateOnlyExplain, pedagogicalExplain } from "./lib/explain-quality.mjs";
import {
  isGenericExplainText,
  isMisassignedPedagogicalExplain,
  isStemExplainTopicConflict,
} from "./lib/explain-faithfulness.mjs";
import { generatePedagogicalExplain } from "./lib/generate-pedagogical-explain.mjs";
import { buildBestExplain } from "./lib/build-best-explain.mjs";
import {
  buildExamReadiness,
  buildRecommendedPlan,
  buildSmartReviewQuestionIds,
  buildTopicDiagnostics,
  errorNotebookEntries,
  isActiveError,
  updateErrorNotebookWithResult,
} from "./lib/learning-coach.js";
import appVersion from "./data/version.js";
import { showAppConfirm, showQuizLeaveDialog, showReplaceDraftDialog, initAppDialog } from "./lib/app-dialog.js";
import { buildProgressBackupPayload, applyProgressBackupPayload } from "./lib/progress-backup.js";

const STORAGE_KEY = "radioexam_card_schedule_v1";
const TOPIC_PRESELECT_KEY = "radioexam_practicar_topic";
const FC_TOPIC_PRESELECT_KEY = "radioexam_tarjetas_topic";
const QUIZ_PREFS_KEY = "radioexam_quiz_prefs_v1";
const LAST_WRONG_SESSION_KEY = "radioexam_last_wrong_ids_v1";
const QUIZ_TOPIC_STATS_KEY = "radioexam_topic_quiz_stats_v1";
const ERROR_NOTEBOOK_KEY = "radioexam_error_notebook_v1";
/** Resumen global, racha y cobertura del banco (solo este navegador). */
const USER_STATS_KEY = "radioexam_user_stats_v1";
/** Borrador de sesión de práctica en curso (solo este navegador). */
const QUIZ_DRAFT_KEY = "radioexam_quiz_draft_v1";
const QUIZ_DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const A11Y_STORAGE_KEY = "radioexam_a11y_v1";
const TEMARIO_READING_KEY = "radioexam_temario_reading_v1";

const PROGRESS_STORE_KEYS = {
  userStats: USER_STATS_KEY,
  topicQuizStats: QUIZ_TOPIC_STATS_KEY,
  errorNotebook: ERROR_NOTEBOOK_KEY,
  lastWrong: LAST_WRONG_SESSION_KEY,
  quizPrefs: QUIZ_PREFS_KEY,
  flashcards: STORAGE_KEY,
  quizDraft: QUIZ_DRAFT_KEY,
  a11y: A11Y_STORAGE_KEY,
};

const VIEW_HEADINGS = {
  inicio: "titulo-inicio",
  temario: "titulo-temario",
  normativa: "titulo-normativa",
  metodologia: "titulo-metodo",
  practicar: "titulo-practicar",
  examen: "titulo-examen",
  cuaderno: "titulo-cuaderno",
  tarjetas: "titulo-tarjetas",
  utilidades: "titulo-utilidades",
  ayuda: "titulo-ayuda",
};

const DOC_TITLES = {
  inicio: "RadioExamen · Inicio",
  temario: "RadioExamen · Temario y repaso",
  normativa: "RadioExamen · Normativa BOE y enlaces",
  metodologia: "RadioExamen · Método de estudio",
  practicar: "RadioExamen · Practicar test",
  examen: "RadioExamen · Simulacro de examen",
  cuaderno: "RadioExamen · Cuaderno de errores",
  tarjetas: "RadioExamen · Tarjetas",
  utilidades: "RadioExamen · Utilidades",
  ayuda: "RadioExamen · Ayuda",
};

const ROUTE_ANNOUNCE = {
  inicio: "Inicio",
  temario: "Temario",
  normativa: "Normativa",
  metodologia: "Método",
  practicar: "Practicar",
  examen: "Examen",
  cuaderno: "Cuaderno de errores",
  tarjetas: "Tarjetas",
  utilidades: "Utilidades",
  ayuda: "Ayuda",
};

const ABBREVIATION_GLOSSARY = [
  ["FI", "frecuencia intermedia: frecuencia fija a la que el receptor traslada la señal para filtrarla y amplificarla mejor."],
  ["RF", "radiofrecuencia: señal de radio antes de convertirse a frecuencia intermedia o audio."],
  ["AF", "audiofrecuencia: señal ya convertida a sonido o audio."],
  ["AGC", "control automático de ganancia: ajusta la ganancia del receptor para mantener estable el nivel de audio."],
  ["DSP", "procesador digital de señal: permite filtros y tratamientos digitales de la señal."],
  ["NBFM", "modulación de frecuencia de banda estrecha: FM con desviación limitada."],
  ["AM", "modulación de amplitud: varía la amplitud de la portadora."],
  ["FM", "modulación de frecuencia: varía la frecuencia instantánea de la portadora."],
  ["SSB", "banda lateral única: emisión de una sola banda lateral, sin portadora completa."],
  ["ROE", "relación de ondas estacionarias: indica adaptación entre línea y antena; alta ROE implica potencia reflejada."],
  ["SWR", "equivalente inglés de ROE: Standing Wave Ratio."],
  ["HPBW", "ancho de haz a media potencia: ángulo entre los puntos de media potencia del lóbulo principal."],
  ["CEPT", "Conferencia Europea de Administraciones de Correos y Telecomunicaciones; coordina recomendaciones como T/R 61-01 y T/R 61-02."],
  ["HAREC", "certificado armonizado CEPT que acredita conocimientos de operador de radioaficionado."],
  ["dBm", "nivel de potencia referido a 1 mW en escala logarítmica."],
  ["dBµV", "nivel de tensión referido a 1 microvoltio en escala logarítmica."],
  ["QRM", "interferencia causada por otras señales o estaciones."],
  ["QRN", "ruido natural o atmosférico."],
  ["QRP", "operación con baja potencia."],
  ["QSY", "cambiar de frecuencia o desplazarse en la banda."],
];

const methods = [
  {
    title: "Ruta recomendada: entender, practicar, corregir y repetir",
    tag: "Plan base",
    body:
      "<p>El ciclo más eficiente no es leer mucho seguido: es <strong>comprender una pieza pequeña</strong>, intentar recuperarla, corregir el fallo y volver a verla unos días después.</p><h4>Cómo aplicarlo</h4><ul><li><strong>1.</strong> Entra en <strong>Temario</strong> y estudia un bloque: idea clave, repaso express, teoría explicada y ejemplos.</li><li><strong>2.</strong> Pasa a <strong>Practicar</strong> con ese mismo tema en modo estudio.</li><li><strong>3.</strong> Lee el feedback completo: tu respuesta, correcta, por qué encaja y explicación.</li><li><strong>4.</strong> Guarda mentalmente el error como una regla corta y repásalo con <strong>Tarjetas</strong>.</li><li><strong>5.</strong> Cuando ya aciertes por tema, usa <strong>Intercalado</strong> y después <strong>Examen</strong>.</li></ul><p><strong>Evita:</strong> saltar al test sin leer el bloque; eso entrena reconocimiento de opciones, no comprensión.</p>",
  },
  {
    title: "Práctica de recuperación activa",
    tag: "Efecto testing",
    body:
      "<p>Responder sin mirar apuntes obliga al cerebro a <strong>recuperar</strong>. Ese esfuerzo fija más que releer, porque comprueba si realmente puedes traer la idea cuando el examen la pida.</p><h4>Cómo aplicarlo</h4><ul><li>Antes de mirar opciones, di en voz baja qué fórmula, definición o norma crees que aplica.</li><li>Marca la respuesta y corrige al momento en modo <strong>Estudio</strong>.</li><li>Si fallas, no memorices la letra: escribe la regla que habría descartado el distractor.</li></ul><p><strong>Señal de dominio:</strong> puedes explicar por qué tres opciones son falsas, no solo reconocer la verdadera.</p>",
  },
  {
    title: "Feedback elaborado: aprender del acierto y del fallo",
    tag: "Corrección útil",
    body:
      "<p>El feedback más útil no dice solo “correcto” o “incorrecto”: muestra <strong>qué criterio decidía la pregunta</strong>. En radioaficionado suele ser una unidad, una relación, un bloque de equipo, una norma o un procedimiento.</p><h4>Cómo aplicarlo</h4><ul><li>Tras cada respuesta, lee primero <strong>tu opción</strong> y la <strong>respuesta correcta</strong>.</li><li>Busca la diferencia exacta: unidad, frecuencia, órgano competente, etapa del circuito o palabra legal.</li><li>Reformula la explicación en una frase propia.</li></ul><p><strong>Evita:</strong> avanzar rápido tras acertar. Un acierto con duda todavía necesita explicación.</p>",
  },
  {
    title: "Mide tu seguridad antes de corregir",
    tag: "Metacognición",
    body:
      "<p>Medir tu seguridad antes del feedback entrena a distinguir <strong>lo que sabes</strong> de lo que solo te suena. Eso evita llegar al examen con falsa seguridad.</p><h4>Cómo aplicarlo</h4><ul><li>Usa <strong>Estudio · mide tu seguridad</strong> cuando ya hayas visto un bloque al menos una vez.</li><li>Prioriza los fallos con seguridad alta: son errores peligrosos y van primero al repaso.</li><li>Si aciertas con seguridad baja, vuelve al temario para convertir intuición en regla.</li></ul><p><strong>Objetivo:</strong> que los aciertos importantes pasen de “me suena” a “sé justificarlo”.</p>",
  },
  {
    title: "Espaciado y tarjetas",
    tag: "Retención",
    body:
      "<p>Estudiar una vez no basta. La memoria mejora cuando vuelves al concepto justo antes de olvidarlo, con intervalos crecientes.</p><h4>Cómo aplicarlo</h4><ul><li>Usa <strong>Tarjetas</strong> para fórmulas, unidades, códigos Q, organismos, indicativos y relaciones rápidas.</li><li>Marca <strong>Lo sabía</strong> solo si puedes responder sin mirar y explicar el porqué.</li><li>Marca <strong>No</strong> si acertaste por descarte débil o por memoria visual de la opción.</li></ul><p><strong>Evita:</strong> repasar siempre lo fácil; el espaciado debe traer de vuelta lo que cuesta.</p>",
  },
  {
    title: "Intercalado: mezclar temas para discriminar",
    tag: "Contraste",
    body:
      "<p>Cuando haces muchas preguntas iguales seguidas, aprendes el patrón local. Cuando mezclas electricidad, modulación, antenas y normativa, entrenas la habilidad real del examen: <strong>elegir la regla correcta</strong>.</p><h4>Cómo aplicarlo</h4><ul><li>Primero domina cada tema por separado.</li><li>Después usa <strong>Intercalado</strong> para mezclar 1.ª y 2.ª prueba.</li><li>Si fallas por confundir bloques, vuelve al temario y compara dos conceptos parecidos.</li></ul><p><strong>Ejemplo:</strong> no estudies ROE, MUF y dB como palabras sueltas; aprende qué pregunta pertenece a línea, ionosfera o relación logarítmica.</p>",
  },
  {
    title: "Preguntas previas",
    tag: "Activar hipótesis",
    body:
      "<p>Intentar responder antes de ver opciones activa conocimientos previos. Aunque falles, el feedback posterior se pega mejor porque ya tenías una hipótesis que corregir.</p><h4>Cómo aplicarlo</h4><ul><li>Activa <strong>Preprueba</strong> en sesiones libres.</li><li>Escribe una respuesta corta: fórmula, palabra clave o criterio legal.</li><li>Revela opciones y comprueba si tu hipótesis apuntaba al concepto correcto.</li></ul><p><strong>Úsalo especialmente</strong> al empezar un bloque nuevo o cuando repitas falladas.</p>",
  },
  {
    title: "Autoexplicación y generación",
    tag: "Más allá de la letra",
    body:
      "<p>Explicar con tus palabras obliga a organizar el concepto. En examen, esa organización ayuda a detectar trampas de redacción.</p><h4>Cómo aplicarlo</h4><ul><li>Después del feedback, completa la frase: “La respuesta es esta porque...”.</li><li>Si hay fórmula, di qué significa cada magnitud y unidad.</li><li>Si hay normativa, separa organismo, documento y consecuencia práctica.</li></ul><p><strong>Evita:</strong> copiar literalmente la explicación sin convertirla en una regla que puedas recordar.</p>",
  },
  {
    title: "Doble codificación: texto + imagen",
    tag: "Dual coding",
    body:
      "<p>Los esquemas reducen carga mental: una onda, un detector, un divisor o un diagrama de radiación se entiende mejor si conectas palabra e imagen.</p><h4>Cómo aplicarlo</h4><ul><li>En preguntas con figura, mira primero qué representa cada eje, flecha, bloque o punto marcado.</li><li>Describe la imagen en una frase antes de responder.</li><li>Después conecta la explicación con el esquema: qué elemento decide la respuesta.</li></ul><p><strong>Ejemplo:</strong> en osciloscopio, horizontal suele ser tiempo y vertical tensión; en antenas, el lóbulo o la línea marcada suele dar la pista.</p>",
  },
  {
    title: "Simulación de examen",
    tag: "Transferencia",
    body:
      "<p>Cuando ya has entrenado por temas, necesitas practicar en condiciones parecidas al examen: tiempo, mezcla, sin feedback inmediato y resultado al final.</p><h4>Cómo aplicarlo</h4><ul><li>Usa <strong>Examen tipo test</strong> con 30 preguntas.</li><li>Hazlo sin consultar temario durante la sesión.</li><li>Al terminar, revisa falladas y vuelve a <strong>Practicar</strong> con solo falladas.</li></ul><p><strong>Momento adecuado:</strong> no al inicio. Úsalo cuando tu estudio por bloques ya tenga base y quieras medir preparación.</p>",
  },
  {
    title: "Micro-objetivos y control de carga",
    tag: "Evitar saturación",
    body:
      "<p>El temario mezcla técnica, normativa y operación. Si intentas abarcarlo todo en una sentada, baja la calidad del recuerdo.</p><h4>Cómo aplicarlo</h4><ul><li>Trabaja objetivos pequeños: “Ohm y potencia”, “ROE y adaptación”, “CEPT y HAREC”, “códigos Q”.</li><li>Cierra cada sesión con una decisión: repetir, pasar a tarjetas o hacer test.</li><li>Si aparecen muchos fallos seguidos, vuelve a teoría explicada en vez de acumular preguntas.</li></ul><p><strong>Regla práctica:</strong> una sesión buena deja claro qué sabes, qué no sabes y cuál es el siguiente bloque.</p>",
  },
];

function questionIsPlayable(q) {
  if (!isActiveQuestion(q)) return false;
  if (!Array.isArray(q.options) || q.options.length < 2) return false;
  return q.options.filter((o) => String(o ?? "").trim().length > 0).length >= 2;
}

/** @type {typeof questionsBanco} */
let allQuestions = [...questionsBanco].filter(questionIsPlayable);

const TRAP_QUESTION_IDS = new Set([
  "q6",
  "q8",
  "q10",
  "q11",
  "q12",
  "ofic-004",
  "ofic-010",
  "ofic-011",
  "ofic-015",
  "ofic-016",
  "ofic-017",
  "ofic-018",
  "ofic-019",
  "ofic-020",
  "ofic-021",
  "ofic-022",
  "ofic-023",
  "ofic-024",
  "ofic-025",
  "ofic-026",
  "ofic-027",
  "ofic-028",
  "ofic-029",
  "ofic-030",
  "ofic-031",
  "ofic-034",
  "ofic-038",
  "ofic-040",
  "ofic-041",
  "ure-p1-02",
  "ure-p1-03",
  "ure-p1-04",
  "ure-p1-08",
  "ure-p1-13",
  "ure-p1-14",
  "ure-p1-15",
  "ure-p1-16",
  "ure-p1-17",
  "ure-p1-18",
  "ure-p1-20",
  "ure-p1-24",
  "ure-p1-25",
  "ure-p1-27",
  "ure-p1-30",
  "fedi-ag-003",
  "fedi-ag-006",
  "fedi-ag-009",
  "fedi-ag-013",
  "fedi-ag-014",
  "fedi-ag-016",
  "fedi-ag-017",
  "fedi-ag-018",
  "fedi-ag-022",
  "fedi-ag-026",
  "fedi-ag-030",
  "fedi-ah-032",
  "fedi-ah-035",
  "fedi-ah-036",
  "fedi-ah-037",
  "fedi-ah-040",
  "fedi-ah-041",
  "fedi-ah-042",
  "fedi-ah-047",
  "fedi-ah-048",
  "fedi-ah-049",
  "fedi-ah-050",
  "fedi-ah-053",
  "fedi-ah-054",
  "fedi-ah-057",
  "fedi-ah-059",
  "fedi-ah-060",
  "quijotes-1-0228",
  "quijotes-1-0205",
  "quijotes-84-1812",
  "quijotes-84-2063",
  "quijotes-84-2045",
  "quijotes-84-1988",
  "quijotes-84-1804",
  "quijotes-84-1805",
  "quijotes-84-1915",
  "quijotes-84-2074",
  "quijotes-84-1946",
  "quijotes-84-2048",
  "quijotes-84-1875",
]);

function $(sel, root = document) {
  return root.querySelector(sel);
}

function showView(id) {
  if (id !== "practicar") setQuizFocusMode(false);
  document.querySelectorAll(".view").forEach((v) => {
    const match = v.id === `view-${id}`;
    v.hidden = !match;
    v.classList.toggle("view--active", match);
    v.setAttribute("aria-hidden", match ? "false" : "true");
  });
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const on = a.getAttribute("data-nav") === id;
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  syncNavGroups();
}

function syncNavGroups() {
  document.querySelectorAll(".nav-group").forEach((g) => {
    const active = g.querySelector("[data-nav][aria-current='page']");
    g.classList.toggle("nav-group--active", !!active);
  });
}

function updateDocumentTitle(viewId) {
  document.title = DOC_TITLES[viewId] || DOC_TITLES.inicio;
}

function announceRoute(viewId) {
  const ann = $("#route-announce");
  if (!ann) return;
  ann.textContent = ROUTE_ANNOUNCE[viewId] || viewId;
}

let saveToastTimer = 0;

function trySetLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    showSaveToast(
      "No se pudo guardar en este navegador (almacenamiento lleno, modo privado estricto o bloqueado).",
      true,
    );
    return false;
  }
}

function readLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function showSaveToast(message = "Progreso guardado en este navegador.", warn = false) {
  const el = $("#save-toast");
  if (!el) return;
  el.textContent = message;
  el.classList.toggle("save-toast--warn", !!warn);
  el.hidden = false;
  window.clearTimeout(saveToastTimer);
  saveToastTimer = window.setTimeout(() => {
    el.hidden = true;
    el.classList.remove("save-toast--warn");
  }, warn ? 4200 : 2200);
}

function renderAppVersion() {
  const el = $("#app-version");
  if (!el) return;
  el.textContent = `Versión ${appVersion.label}`;
}

function focusViewHeading(viewId) {
  const hid = VIEW_HEADINGS[viewId];
  const el = hid ? document.getElementById(hid) : null;
  if (!el || !(el instanceof HTMLElement)) return;
  el.setAttribute("tabindex", "-1");
  try {
    el.focus({ preventScroll: true, focusVisible: false });
  } catch {
    el.focus({ preventScroll: true });
  }
  el.addEventListener(
    "blur",
    () => {
      el.removeAttribute("tabindex");
    },
    { once: true },
  );
}

function topicBelongsToPart(topicId, partValue) {
  if (topicId === "all") return true;
  if (partValue === "mix") return true;
  const partKey = partValue === "1" ? "p1" : partValue === "2" ? "p2" : "";
  if (!partKey) return false;
  const p = topicsData.parts.find((x) => x.id === partKey);
  return !!p?.blocks.some((b) => b.id === topicId);
}

function validateTopicPartConsistency() {
  const part = $("#quiz-part")?.value || "1";
  const sel = $("#quiz-topic");
  if (!sel) return;
  const topic = sel.value || "all";
  if (topic !== "all" && !topicBelongsToPart(topic, part)) {
    sel.value = "all";
  }
}

function syncTopicFromSession() {
  const raw = sessionStorage.getItem(TOPIC_PRESELECT_KEY);
  const sel = $("#quiz-topic");
  if (!sel || !raw) return;
  const has = [...sel.options].some((o) => o.value === raw);
  if (has) {
    sel.value = raw;
    validateTopicPartConsistency();
  }
  sessionStorage.removeItem(TOPIC_PRESELECT_KEY);
  renderQuizPracticeGuide();
}

function syncFcTopicFromSession() {
  const raw = sessionStorage.getItem(FC_TOPIC_PRESELECT_KEY);
  const sel = $("#fc-topic");
  if (!sel || !raw) return;
  const has = [...sel.options].some((o) => o.value === raw);
  if (has) {
    sel.value = raw;
  }
  sessionStorage.removeItem(FC_TOPIC_PRESELECT_KEY);
}

let quizLeaveGuardReverting = false;

/** @param {string} raw */
function resolveViewIdFromHash(raw) {
  if (raw.startsWith("temario--")) return "temario";
  if (raw.startsWith("normativa--")) return "normativa";
  if (
    [
      "inicio",
      "temario",
      "normativa",
      "metodologia",
      "practicar",
      "examen",
      "cuaderno",
      "tarjetas",
      "utilidades",
      "ayuda",
    ].includes(raw)
  ) {
    return raw;
  }
  return "inicio";
}

function isQuizSessionInProgress() {
  return quizState.list.length > 0 && !quizState._finished && !$("#quiz-area")?.hidden;
}

/** @returns {Promise<boolean>} true si el usuario eligió salir (guardando o sin guardar) */
async function promptQuizLeave() {
  const choice = await showQuizLeaveDialog();
  if (choice === "stay") return false;
  abandonQuizSession({ saveDraft: choice === "save" });
  if (choice === "discard") showSaveToast("Sesión descartada.");
  return true;
}

function abandonQuizSession(/** @type {{ saveDraft?: boolean }} */ { saveDraft = true } = {}) {
  if (saveDraft && quizState.list.length && !quizState._finished) {
    flushSaveQuizDraft();
  } else {
    clearQuizDraft();
  }
  clearExamTimer();
  quizState.list = [];
  quizState.index = 0;
  quizState.answers = {};
  quizState.confidence = {};
  quizState.marked = {};
  quizState._finished = true;
  quizState.smartLabel = "";
  const area = $("#quiz-area");
  if (area) area.hidden = true;
  const fb = $("#quiz-feedback");
  if (fb) fb.textContent = "";
  const score = $("#quiz-score");
  if (score) score.hidden = true;
  const qEl = $("#quiz-question");
  if (qEl) qEl.innerHTML = "";
  setQuizFocusMode(false);
  renderQuizResumePanel();
}

async function onRoute() {
  const rawFull = (location.hash || "#inicio").slice(1);
  const raw = rawFull || "inicio";

  if (raw === "fuentes") {
    const fuentes = document.getElementById("fuentes");
    if (fuentes instanceof HTMLDetailsElement) {
      fuentes.open = true;
      requestAnimationFrame(() => {
        fuentes.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
    return;
  }

  const targetId = resolveViewIdFromHash(raw);
  if (quizLeaveGuardReverting) {
    quizLeaveGuardReverting = false;
  } else if (isQuizSessionInProgress() && targetId !== "practicar") {
    if (!(await promptQuizLeave())) {
      quizLeaveGuardReverting = true;
      location.hash = "practicar";
      return;
    }
  }

  /** @type {string|null} */
  let scrollTargetId = null;
  let id = raw;
  if (raw.startsWith("temario--")) {
    const sub = raw.slice("temario--".length);
    id = "temario";
    if (sub) scrollTargetId = `temario-${sub}`;
  } else if (raw.startsWith("normativa--")) {
    const sub = raw.slice("normativa--".length);
    id = "normativa";
    if (sub) scrollTargetId = sub;
  } else if (
    ![
      "inicio",
      "temario",
      "normativa",
      "metodologia",
      "practicar",
      "examen",
      "cuaderno",
      "tarjetas",
      "utilidades",
      "ayuda",
    ].includes(raw)
  ) {
    id = "inicio";
  }
  if (id !== "practicar") clearExamTimer();
  if (id !== "temario") stopTemarioSpeech();
  showView(id);
  updateDocumentTitle(id);
  announceRoute(id);
  renderHeaderStatus();
  requestAnimationFrame(() => focusViewHeading(id));
  if (id === "tarjetas") {
    const fcSel = $("#fc-topic");
    if (fcSel instanceof HTMLSelectElement && fcSel.options.length <= 1) {
      fillTopicSelect(fcSel);
    }
    syncFcTopicFromSession();
    updateDueBadge();
  }
  if (id === "practicar") {
    ensureTopicSelectFilled();
    syncTopicFromSession();
    renderQuizProgressSummary();
    renderQuizPracticeGuide();
    renderQuizResumePanel();
  }
  if (id === "temario") {
    renderTemario();
    initTemarioInteractions();
  }
  if (id === "inicio") renderUserProgress();
  if (id === "examen" || id === "cuaderno") renderExamCoach();
  if (id === "utilidades") renderUtilidades();
  if (scrollTargetId) {
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 70);
    });
  }
}

function renderNormativa() {
  const root = $("#normativa-root");
  if (!root) return;
  const jumpNav =
    regulatory.normativaNav?.length > 0
      ? `<nav class="normativa-jump" aria-label="Ir a sección">
        ${regulatory.normativaNav
          .map(
            (n) =>
              `<button type="button" class="pill" data-norm-jump="${escapeHtml(n.id)}">${escapeHtml(n.label)}</button>`,
          )
          .join("")}
      </nav>`
      : "";

  const linkGroupsHtml = (regulatory.linkGroups || [])
    .map((g) => {
      const links = (g.links || [])
        .map(
          (l) => `
    <li>
      <strong><a href="${escapeHtml(l.href)}" rel="noopener noreferrer">${escapeHtml(l.label)}</a></strong>
      <span>${escapeHtml(l.note)}</span>
    </li>`,
        )
        .join("");
      const blurb = g.blurb ? `<p class="part-card__lead">${escapeHtml(g.blurb)}</p>` : "";
      return `
    <article class="part-card" id="${escapeHtml(g.id)}">
      <h2>${escapeHtml(g.title)}</h2>
      ${blurb}
      <ul class="block-list" style="margin-top:0.75rem">
        ${links}
      </ul>
    </article>`;
    })
    .join("");

  const anchorsHtml = (regulatory.studyAnchors || [])
    .map(
      (a) => `
    <article class="part-card" id="${escapeHtml(a.id)}">
      <h2>${escapeHtml(a.title)}</h2>
      <ul class="block-list">
        ${(a.bullets || []).map((b) => `<li><span>${escapeHtml(b)}</span></li>`).join("")}
      </ul>
    </article>`,
    )
    .join("");

  const trust = regulatory.trustNote
    ? `<p class="part-card__lead">${escapeHtml(regulatory.trustNote)}</p>`
    : "";
  const hierarchyHtml = regulatory.sourceHierarchy?.length
    ? `
    <article class="part-card" id="normativa-verificacion">
      <h2>Jerarquía de verificación</h2>
      <ol class="source-hierarchy">
        ${regulatory.sourceHierarchy.map((b) => `<li><span>${escapeHtml(b)}</span></li>`).join("")}
      </ol>
      <p class="fine-print">${escapeHtml(regulatory.lastReviewNote || "")}</p>
    </article>`
    : "";

  root.innerHTML = `
    ${jumpNav}
    <article class="part-card part-card--hero">
      <h2>${escapeHtml(regulatory.headline || "")}</h2>
      <p>${escapeHtml(regulatory.intro || "")}</p>
      ${trust}
    </article>
    ${hierarchyHtml}
    ${linkGroupsHtml}
    <section id="normativa-temas" class="normativa-stack" aria-labelledby="normativa-temas-title">
      <h2 id="normativa-temas-title" class="normativa-stack__title">Temas de estudio (resúmenes)</h2>
      ${anchorsHtml}
    </section>
  `;

  root.querySelectorAll("[data-norm-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-norm-jump");
      const el = id ? document.getElementById(id) : null;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/** Sección plegable del temario con título accesible para lectura en voz alta. */
function temarioDetailsSection(blockId, num, title, bodyHtml, openDefault = true) {
  const sid = `temario-${blockId}-sec-${num}`;
  const openAttr = openDefault ? " open" : "";
  return `
          <details class="temario-details"${openAttr}>
            <summary class="temario-details__summary">
              <span class="temario-details__num" aria-hidden="true">${num}.</span>
              <span class="temario-details__label">${escapeHtml(title)}</span>
            </summary>
            <div class="temario-section" role="region" aria-labelledby="${sid}">
              <h4 class="sr-only" id="${sid}">${num}. ${escapeHtml(title)}</h4>
              ${bodyHtml}
            </div>
          </details>`;
}

function renderBlockStudy(blockId) {
  const study = topicStudy[blockId];
  if (!study) return "";
  const listItems = (items) =>
    items?.length
      ? `<ul class="temario-list">${items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
      : "";
  const hooks = listItems(study.memoryHooks || []);
  const express = study.expressBullets?.length
    ? `<ul class="temario-list temario-list--compact">${study.expressBullets
        .map((x) => `<li>${escapeHtml(x)}</li>`)
        .join("")}</ul>`
    : "";
  const detailGroup = (title, items) =>
    items?.length
      ? `<section class="temario-study-group" aria-label="${escapeHtml(title)}">
          <h5 class="temario-study-group__title">${escapeHtml(title)}</h5>
          <ul class="temario-list">${items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
        </section>`
      : "";
  const detailHtml = [
    detailGroup("A. Teoría explicada del bloque", study.bookGuide || []),
    detailGroup("B. Ejemplos guiados y aplicación", study.quickSession || []),
    detailGroup("C. Ampliación conceptual", study.readMore || []),
    detailGroup("D. Programa de examen que cubre", study.fedieaSyllabus || []),
  ].join("");
  const readMore = detailHtml
    ? temarioDetailsSection(blockId, 3, "Aprender el tema: teoría, ejemplos y programa", detailHtml)
    : "";
  const trapWarnings = study.trapWarnings?.length
    ? temarioDetailsSection(blockId, 4, "Preguntas trampa para estudiar a fondo", listItems(study.trapWarnings))
    : "";
  const examChecklist = study.examChecklist?.length
    ? temarioDetailsSection(
        blockId,
        5,
        "Errores típicos y puntos de examen",
        listItems(study.examChecklist),
      )
    : "";
  const cards = (study.flashcards || [])
    .map(
      (fc, i) => `
        <div class="temario-flipcard" tabindex="0" role="button" aria-label="${escapeHtml(`Tarjeta ${i + 1}. Pregunta: ${fc.front}. Respuesta: ${fc.back}`)}">
          <div class="temario-flipcard__inner" aria-hidden="true">
            <div class="temario-flipcard__face temario-flipcard__face--front">${escapeHtml(fc.front)}</div>
            <div class="temario-flipcard__face temario-flipcard__face--back">${escapeHtml(fc.back)}</div>
          </div>
        </div>`,
    )
    .join("");
  const flashcards = study.flashcards || [];
  const cardsRead = flashcards.length
    ? `<dl class="temario-fc-read">
        ${flashcards
          .map(
            (fc, i) => `
          <div class="temario-fc-read__pair">
            <dt>Tarjeta ${i + 1} · pregunta</dt>
            <dd>${escapeHtml(fc.front)}</dd>
            <dt>Respuesta</dt>
            <dd>${escapeHtml(fc.back)}</dd>
          </div>`,
          )
          .join("")}
      </dl>`
    : "";
  const sources = study.sources
    ? `<p class="temario-sources"><strong>Contrastar con:</strong> ${escapeHtml(study.sources)}</p>`
    : "";
  return `
        <div class="temario-study" lang="es">
          <p class="temario-method-tip"><strong>Ruta teórica:</strong> ${escapeHtml(
            "lee en este orden: idea clave, resumen express, teoría explicada, ejemplos guiados, errores típicos y tarjetas conceptuales. Así no saltas al test sin entender el tema.",
          )}</p>
          ${hooks ? temarioDetailsSection(blockId, 1, "Idea clave para memorizar", hooks) : ""}
          ${express ? temarioDetailsSection(blockId, 2, "Repaso express, uno a tres minutos", express) : ""}
          ${readMore}
          ${trapWarnings}
          ${examChecklist}
          <section class="temario-fc-block" aria-labelledby="temario-${escapeHtml(blockId)}-fc-title">
            <h4 class="temario-fc-head" id="temario-${escapeHtml(blockId)}-fc-title">Autoevaluación conceptual del bloque</h4>
            <p class="temario-fc-hint muted">En modo lectura lineal las tarjetas se leen como pregunta y respuesta seguidas.</p>
            <div class="temario-fc-grid" aria-hidden="true">${cards}</div>
            ${cardsRead}
          </section>
          ${sources}
          <nav class="temario-cta" aria-label="Acciones tras estudiar este bloque">
            <button type="button" class="btn btn--ghost btn--sm temario-speak-block" data-block-id="${escapeHtml(blockId)}">Escuchar este bloque</button>
            <a href="#practicar" data-nav="practicar" data-practicar-topic="${escapeHtml(blockId)}" class="btn btn--primary btn--sm temario-cta__main">Practicar este bloque</a>
            <a href="#tarjetas" data-nav="tarjetas" data-tarjetas-topic="${escapeHtml(blockId)}" class="btn btn--ghost btn--sm">Tarjetas del banco (este bloque)</a>
            <a href="#tarjetas" data-nav="tarjetas" class="btn btn--ghost btn--sm">Tarjetas (todo el banco)</a>
            <a href="#normativa" data-nav="normativa" class="btn btn--ghost btn--sm">Normativa BOE</a>
          </nav>
        </div>`;
}

function renderTemarioToc() {
  const parts = topicsData.parts || [];
  return `
    <nav class="temario-toc panel" aria-label="Índice de bloques del temario">
      <h2 class="temario-toc__title">Índice por bloques</h2>
      <p class="temario-toc__hint muted">Usa los enlaces o «Ir al bloque». Pulsa <strong>Escuchar bloque</strong> para lectura en voz alta del navegador, o activa <strong>modo lectura lineal</strong> para ver todo seguido.</p>
      ${parts
        .map(
          (p) => `
        <section class="temario-toc__part" aria-labelledby="temario-toc-part-${escapeHtml(p.id)}">
          <h3 class="temario-toc__part-title" id="temario-toc-part-${escapeHtml(p.id)}">${escapeHtml(p.title)}</h3>
          <ol class="temario-toc__list">
            ${(p.blocks || [])
              .map(
                (b) =>
                  `<li><a href="#temario-${escapeHtml(b.id)}">${escapeHtml(b.title)}</a><span class="temario-toc__item-hint">${escapeHtml(b.hint)}</span></li>`,
              )
              .join("")}
          </ol>
        </section>`,
        )
        .join("")}
    </nav>`;
}

function fillTemarioJumpSelect() {
  const sel = $("#temario-jump");
  if (!(sel instanceof HTMLSelectElement)) return;
  const parts = topicsData.parts || [];
  sel.innerHTML =
    '<option value="">Ir a un bloque…</option>' +
    parts
      .map((part) => {
        const label =
          part.id === "p1" ? "1.ª prueba" : part.id === "p2" ? "2.ª prueba" : part.title || part.id;
        const opts = (part.blocks || [])
          .map((b) => `<option value="temario-${escapeHtml(b.id)}">${escapeHtml(b.title)}</option>`)
          .join("");
        return `<optgroup label="${escapeHtml(label)}">${opts}</optgroup>`;
      })
      .join("");
}

function ensureTopicSelectFilled() {
  const sel = $("#quiz-topic");
  if (sel instanceof HTMLSelectElement && sel.options.length <= 1) {
    fillTopicSelect(sel);
  }
}

function renderTemario() {
  const root = $("#temario-root");
  if (!root) return;
  try {
    if (!topicsData?.parts?.length) {
      root.innerHTML =
        '<p class="app-error" style="display:block">No se cargó el índice de temas. Recarga la página; si persiste, ejecuta <code>npm run build:web</code> y sube <code>app.bundle.js</code>.</p>';
      return;
    }
    const counts = questionCountByTopic();
    const topicStats = loadTopicQuizStats();
    root.innerHTML =
      renderTemarioToc() +
      topicsData.parts
    .map(
      (p) => `
    <article class="part-card">
      <h2>${escapeHtml(p.title)}</h2>
      <ul class="block-list block-list--temario">
        ${p.blocks
          .map((b) => {
            const nq = counts[b.id] ?? 0;
            const st = topicStats[b.id];
            const progress = topicProgressState(st);
            const searchRaw = buildTemarioSearchIndex(b.id, b, topicStudy[b.id]).toLowerCase();
            return `
          <li id="temario-${escapeHtml(b.id)}" class="temario-block" data-progress-state="${escapeHtml(progress.cls)}" data-temario-search="${escapeHtml(searchRaw)}">
            <header class="temario-block__head">
              <h3 class="temario-block__title">${escapeHtml(b.title)}</h3>
              <p class="temario-block__hint">${escapeHtml(b.hint)}</p>
            </header>
            <div class="temario-block__meta">
              <span class="temario-block__count">${nq} preguntas en el banco</span>
              <span class="temario-block__progress temario-block__progress--${escapeHtml(progress.cls)}" title="Modo estudio en esta app (este navegador)">
                <strong>${escapeHtml(progress.label)}</strong>
                ${escapeHtml(progress.detail)}
              </span>
            </div>
            ${renderBlockStudy(b.id)}
          </li>`;
          })
          .join("")}
      </ul>
    </article>`,
    )
      .join("");
    fillTemarioJumpSelect();
    applyTemarioReadingMode(loadTemarioReadingOpts());
  } catch (err) {
    console.error("renderTemario", err);
    root.innerHTML = `<p class="app-error" style="display:block">Error al cargar el temario: ${escapeHtml(String(err?.message || err))}. Recarga la página.</p>`;
  }
}

function loadTemarioReadingOpts() {
  try {
    const raw = localStorage.getItem(TEMARIO_READING_KEY);
    if (!raw) return { linear: false };
    const o = JSON.parse(raw);
    return { linear: !!o.linear };
  } catch {
    return { linear: false };
  }
}

function saveTemarioReadingOpts(/** @type {{ linear: boolean }} */ opts) {
  localStorage.setItem(TEMARIO_READING_KEY, JSON.stringify(opts));
}

function setTemarioDetailsOpen(root, open) {
  root?.querySelectorAll(".temario-details").forEach((el) => {
    if (el instanceof HTMLDetailsElement) el.open = open;
  });
}

function applyTemarioReadingMode(/** @type {{ linear: boolean }} */ opts) {
  const view = $("#view-temario");
  const root = $("#temario-root");
  const chk = $("#temario-reading-mode");
  if (view) view.classList.toggle("temario--reading", !!opts.linear);
  if (chk instanceof HTMLInputElement) chk.checked = !!opts.linear;
  if (opts.linear) setTemarioDetailsOpen(root, true);
}

function temarioSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function stopTemarioSpeech() {
  if (!temarioSpeechSupported()) return;
  window.speechSynthesis.cancel();
  document.querySelectorAll(".temario-speak-block.is-speaking").forEach((el) => {
    el.classList.remove("is-speaking");
  });
  const stopBtn = $("#temario-speak-stop");
  const status = $("#temario-speak-status");
  if (stopBtn instanceof HTMLButtonElement) stopBtn.hidden = true;
  if (status) status.textContent = "";
}

function buildTemarioBlockSpeechText(blockId) {
  const block = (topicsData.parts || []).flatMap((p) => p.blocks || []).find((b) => b.id === blockId);
  const study = topicStudy[blockId];
  const parts = [];
  if (block?.title) parts.push(block.title);
  if (block?.hint) parts.push(block.hint);
  if (!study) return parts.join(". ");
  const addList = (heading, items) => {
    if (!items?.length) return;
    parts.push(heading);
    parts.push(...items);
  };
  addList("Idea clave para memorizar.", study.memoryHooks);
  addList("Repaso express.", study.expressBullets);
  addList("Teoría explicada.", study.bookGuide);
  addList("Ejemplos guiados.", study.quickSession);
  addList("Ampliación conceptual.", study.readMore);
  addList("Programa de examen.", study.fedieaSyllabus);
  addList("Preguntas trampa.", study.trapWarnings);
  addList("Errores típicos y puntos de examen.", study.examChecklist);
  if (study.flashcards?.length) {
    parts.push("Autoevaluación conceptual.");
    study.flashcards.forEach((fc, i) => {
      parts.push(`Tarjeta ${i + 1}. Pregunta: ${fc.front}. Respuesta: ${fc.back}`);
    });
  }
  if (study.sources) parts.push(`Contrastar con: ${study.sources}`);
  return parts.join(". ");
}

function getTemarioBlockIdForSpeech() {
  const jumpSel = $("#temario-jump");
  if (jumpSel instanceof HTMLSelectElement && jumpSel.value) {
    return jumpSel.value.replace(/^temario-/, "");
  }
  const blocks = document.querySelectorAll(".temario-block:not([hidden])");
  for (const el of blocks) {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.55 && r.bottom > 72) {
      return el.id.replace(/^temario-/, "");
    }
  }
  const first = blocks[0];
  return first ? first.id.replace(/^temario-/, "") : null;
}

function updateTemarioSpeechUi(blockId, speaking) {
  const stopBtn = $("#temario-speak-stop");
  const status = $("#temario-speak-status");
  if (stopBtn instanceof HTMLButtonElement) stopBtn.hidden = !speaking;
  document.querySelectorAll(".temario-speak-block").forEach((btn) => {
    const id = btn.getAttribute("data-block-id");
    btn.classList.toggle("is-speaking", speaking && id === blockId);
    if (btn instanceof HTMLButtonElement) {
      btn.setAttribute("aria-pressed", speaking && id === blockId ? "true" : "false");
    }
  });
  if (status && blockId) {
    const block = (topicsData.parts || []).flatMap((p) => p.blocks || []).find((b) => b.id === blockId);
    status.textContent = speaking
      ? `Leyendo: ${block?.title || blockId}`
      : "";
  }
}

function pickSpanishSpeechVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => /^es(-|_)/i.test(v.lang) && v.localService) ||
    voices.find((v) => /^es(-|_)/i.test(v.lang)) ||
    null
  );
}

function speakTemarioBlock(blockId) {
  if (!blockId) {
    showSaveToast("Selecciona un bloque en el temario o desplázate hasta uno.", true);
    return;
  }
  if (!temarioSpeechSupported()) {
    showSaveToast("Tu navegador no admite lectura en voz alta. Prueba Chrome o Edge.", true);
    return;
  }
  const text = buildTemarioBlockSpeechText(blockId);
  if (!text.trim()) {
    showSaveToast("Este bloque no tiene texto de estudio para leer.", true);
    return;
  }
  stopTemarioSpeech();
  const blockEl = document.getElementById(`temario-${blockId}`);
  setTemarioDetailsOpen(blockEl, true);
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  utter.rate = 0.95;
  const startUi = () => updateTemarioSpeechUi(blockId, true);
  const endUi = () => updateTemarioSpeechUi(blockId, false);
  utter.onstart = startUi;
  utter.onend = endUi;
  utter.onerror = endUi;
  const speakNow = () => {
    const voice = pickSpanishSpeechVoice();
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  };
  if (pickSpanishSpeechVoice()) {
    speakNow();
    return;
  }
  const onVoices = () => {
    window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
    speakNow();
  };
  window.speechSynthesis.addEventListener("voiceschanged", onVoices);
  speakNow();
}

function initTemarioReading() {
  const expandBtn = $("#temario-expand-all");
  const collapseBtn = $("#temario-collapse-all");
  const readingChk = $("#temario-reading-mode");
  const jumpSel = $("#temario-jump");
  const speakBtn = $("#temario-speak-start");
  const stopBtn = $("#temario-speak-stop");
  const root = $("#temario-root");

  expandBtn?.addEventListener("click", () => setTemarioDetailsOpen(root, true));
  collapseBtn?.addEventListener("click", () => setTemarioDetailsOpen(root, false));
  speakBtn?.addEventListener("click", () => speakTemarioBlock(getTemarioBlockIdForSpeech()));
  stopBtn?.addEventListener("click", () => stopTemarioSpeech());

  if (temarioSpeechSupported() && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  root?.addEventListener("click", (e) => {
    const btn = e.target.closest(".temario-speak-block");
    if (!btn || !root.contains(btn)) return;
    const blockId = btn.getAttribute("data-block-id");
    if (blockId) speakTemarioBlock(blockId);
  });

  if (readingChk instanceof HTMLInputElement) {
    const opts = loadTemarioReadingOpts();
    readingChk.checked = opts.linear;
    applyTemarioReadingMode(opts);
    readingChk.addEventListener("change", () => {
      const next = { linear: readingChk.checked };
      saveTemarioReadingOpts(next);
      applyTemarioReadingMode(next);
    });
  }

  jumpSel?.addEventListener("change", () => {
    const id = jumpSel instanceof HTMLSelectElement ? jumpSel.value : "";
    if (!id) return;
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (jumpSel instanceof HTMLSelectElement) jumpSel.value = "";
  });
}

function initTemarioInteractions() {
  const root = $("#temario-root");
  if (!root || root.dataset.temarioBound === "1") return;
  root.dataset.temarioBound = "1";
  root.addEventListener("click", (e) => {
    const view = $("#view-temario");
    if (view?.classList.contains("temario--reading")) return;
    const card = e.target.closest(".temario-flipcard");
    if (!card || !root.contains(card)) return;
    card.classList.toggle("is-flipped");
  });
  root.addEventListener("keydown", (e) => {
    const view = $("#view-temario");
    if (view?.classList.contains("temario--reading")) return;
    if (e.key !== " " && e.key !== "Enter") return;
    const card = e.target.closest(".temario-flipcard");
    if (!card || !root.contains(card)) return;
    e.preventDefault();
    card.classList.toggle("is-flipped");
  });
}

function renderMethods() {
  const root = $("#method-root");
  if (!root) return;
  root.innerHTML = methods
    .map(
      (m, i) => `
    <details class="method-card"${i === 0 ? " open" : ""}>
      <summary>${escapeHtml(m.title)}</summary>
      <div class="method-card__body">
        <span class="method-card__tag">${escapeHtml(m.tag)}</span>
        ${m.body}
      </div>
    </details>`,
    )
    .join("");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fillTopicSelect(/** @type {HTMLSelectElement} */ sel) {
  const parts = topicsData.parts || [];
  sel.innerHTML =
    '<option value="all">Todos los temas (sin filtro)</option>' +
    parts
      .map((part) => {
        const label =
          part.id === "p1" ? "1.ª prueba" : part.id === "p2" ? "2.ª prueba" : escapeHtml(part.title || part.id);
        const opts = (part.blocks || [])
          .map((b) => `<option value="${escapeHtml(b.id)}">${escapeHtml(b.title)}</option>`)
          .join("");
        return `<optgroup label="${escapeHtml(label)}">${opts}</optgroup>`;
      })
      .join("");
}

function initQuizTopicSelect() {
  const sel = $("#quiz-topic");
  if (sel instanceof HTMLSelectElement) fillTopicSelect(sel);
}

function initFcTopicSelect() {
  const sel = $("#fc-topic");
  if (sel instanceof HTMLSelectElement) fillTopicSelect(sel);
}

/* ---------- Quiz ---------- */
/** Examen tipo test: misma longitud que una prueba oficial (30 ítems). */
const TEORICO_COUNT = 30;
const TEORICO_EXAM_MS = 30 * 60 * 1000;

const quizState = {
  list: /** @type {typeof questionsBanco} */ ([]),
  index: 0,
  mode: /** @type {"study"|"exam"} */ ("study"),
  /** Solo en estudio: inmediato, confianza (JOL) o panel temario/libro con texto literal del banco. */
  studyFeedback: /** @type {"immediate"|"confidence"|"deepen"} */ ("immediate"),
  sessionType: /** @type {"libre"|"teorico"} */ ("libre"),
  answers: /** @type {Record<string, number|null>} */ ({}),
  /** 0 baja · 1 media · 2 alta — solo modo confianza, tras elegir opción. */
  confidence: /** @type {Record<string, number>} */ ({}),
  marked: /** @type {Record<string, boolean>} */ ({}),
  pretest: false,
  optionsVisible: true,
  examEndsAt: /** @type {number|null} */ (null),
  timerId: /** @type {ReturnType<typeof setInterval>|null} */ (null),
  timedOut: false,
  _finished: false,
  smartLabel: "",
  /** @type {string} */
  topicFilter: "all",
  /** Contadores de estudio por pregunta (una vez por ítem y sesión). */
  _statsCounted: /** @type {Set<string>} */ (new Set()),
};

function clearExamTimer() {
  if (quizState.timerId) {
    clearInterval(quizState.timerId);
    quizState.timerId = null;
  }
  quizState.examEndsAt = null;
  const el = $("#quiz-timer");
  if (el) {
    el.hidden = true;
    el.textContent = "";
    el.classList.remove("quiz__timer--warn");
  }
}

function formatCountdown(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function startExamTimer(/** @type {number|undefined} */ remainingMs) {
  clearExamTimer();
  if (quizState.sessionType !== "teorico" || quizState.mode !== "exam") return;
  const el = $("#quiz-timer");
  if (!el) return;
  el.hidden = false;
  const duration =
    typeof remainingMs === "number" && Number.isFinite(remainingMs) ? Math.max(0, remainingMs) : TEORICO_EXAM_MS;
  quizState.examEndsAt = Date.now() + duration;
  quizState.timedOut = false;
  const tick = () => {
    const end = quizState.examEndsAt || 0;
    const left = end - Date.now();
    if (left <= 0) {
      el.textContent = "00:00";
      el.classList.add("quiz__timer--warn");
      clearExamTimer();
      if (!quizState.timedOut && quizState.list.length) {
        quizState.timedOut = true;
        finishQuiz();
      }
      return;
    }
    el.textContent = formatCountdown(left);
    el.classList.toggle("quiz__timer--warn", left <= 120000);
  };
  tick();
  quizState.timerId = setInterval(tick, 1000);
}

function syncPretestAvailability() {
  const session = $("#quiz-session")?.value || "libre";
  const wrap = $("#quiz-pretest-wrap");
  const cb = $("#quiz-pretest");
  if (!cb) return;
  if (session === "teorico") {
    cb.checked = false;
    cb.disabled = true;
    if (wrap) wrap.title = "La preprueba no está disponible en el examen tipo test (30 preguntas).";
  } else {
    cb.disabled = false;
    if (wrap) wrap.title = "";
  }
}

let quizDraftSaveTimer = /** @type {ReturnType<typeof setTimeout>|null} */ (null);

function readQuizSetupFromForm() {
  return {
    part: $("#quiz-part")?.value || "1",
    topic: $("#quiz-topic")?.value || "all",
    session: $("#quiz-session")?.value === "teorico" ? "teorico" : "libre",
    mode: $("#quiz-mode")?.value || "study",
    pretest: !!$("#quiz-pretest")?.checked,
    wrongOnly: !!$("#quiz-wrong-only")?.checked,
    trapOnly: !!$("#quiz-trap-only")?.checked,
  };
}

function applyQuizSetupToForm(/** @type {Record<string, unknown>} */ setup) {
  if (!setup || typeof setup !== "object") return;
  const partEl = $("#quiz-part");
  if (partEl instanceof HTMLSelectElement && typeof setup.part === "string") partEl.value = setup.part;
  const topicEl = $("#quiz-topic");
  if (topicEl instanceof HTMLSelectElement && typeof setup.topic === "string") {
    if ([...topicEl.options].some((o) => o.value === setup.topic)) topicEl.value = setup.topic;
  }
  const sessEl = $("#quiz-session");
  if (sessEl instanceof HTMLSelectElement && typeof setup.session === "string") sessEl.value = setup.session;
  const modeEl = $("#quiz-mode");
  if (modeEl instanceof HTMLSelectElement && typeof setup.mode === "string") modeEl.value = setup.mode;
  const preEl = $("#quiz-pretest");
  if (preEl instanceof HTMLInputElement) preEl.checked = !!setup.pretest;
  const wrongEl = $("#quiz-wrong-only");
  if (wrongEl instanceof HTMLInputElement) wrongEl.checked = !!setup.wrongOnly;
  const trapEl = $("#quiz-trap-only");
  if (trapEl instanceof HTMLInputElement) trapEl.checked = !!setup.trapOnly;
  syncPretestAvailability();
  validateTopicPartConsistency();
}

/** Combina filtros de falladas y trampa. */
function buildQuizOnlyPool() {
  let pool = null;
  const wrongOnly = !!$("#quiz-wrong-only")?.checked;
  const trapOnly = !!$("#quiz-trap-only")?.checked;

  if (wrongOnly) {
    const ids = loadLastWrongIds();
    if (ids.length) pool = new Set(ids);
  }
  if (trapOnly) {
    pool =
      pool && pool.size
        ? new Set([...pool].filter((id) => TRAP_QUESTION_IDS.has(id)))
        : new Set(TRAP_QUESTION_IDS);
  }
  return pool;
}

function clearQuizDraft() {
  try {
    localStorage.removeItem(QUIZ_DRAFT_KEY);
  } catch {
    /* ignore */
  }
  $("#view-practicar")?.classList.remove("has-resume-draft");
}

function formatQuizDraftSavedAt(/** @type {number} */ ts) {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "hace un momento";
  if (diff < 3_600_000) return `hace ${Math.max(1, Math.round(diff / 60_000))} min`;
  if (diff < 86_400_000) return `hace ${Math.max(1, Math.round(diff / 3_600_000))} h`;
  return `hace ${Math.max(1, Math.round(diff / 86_400_000))} día(s)`;
}

function quizDraftSessionLabel(/** @type {{ smartLabel?: string; sessionType?: string; mode?: string; studyFeedback?: string }} */ s) {
  if (s.smartLabel) return s.smartLabel;
  const type = s.sessionType === "teorico" ? "Examen tipo test" : "Práctica libre";
  if (s.mode === "exam") return `${type} · modo examen`;
  if (s.studyFeedback === "confidence") return `${type} · estudio con seguridad`;
  if (s.studyFeedback === "deepen") return `${type} · estudio temario y libro`;
  return `${type} · estudio`;
}

/** @param {unknown} draft */
function validateQuizDraft(draft) {
  if (!draft || typeof draft !== "object") return null;
  const d = /** @type {Record<string, unknown>} */ (draft);
  if (d.version !== 1) return null;
  const savedAt = typeof d.savedAt === "number" ? d.savedAt : 0;
  if (!savedAt || Date.now() - savedAt > QUIZ_DRAFT_MAX_AGE_MS) return null;
  const session = d.session;
  if (!session || typeof session !== "object") return null;
  const s = /** @type {Record<string, unknown>} */ (session);
  if (!Array.isArray(s.list) || !s.list.length) return null;
  const index = typeof s.index === "number" ? s.index : 0;
  if (index < 0 || index >= s.list.length) return null;
  const knownIds = new Set(allQuestions.map((q) => q.id));
  for (const q of s.list) {
    if (!q || typeof q !== "object") return null;
    const item = /** @type {Record<string, unknown>} */ (q);
    if (typeof item.id !== "string" || !knownIds.has(item.id)) return null;
    if (!Array.isArray(item.options) || typeof item.correctIndex !== "number") return null;
  }
  return /** @type {{ version: number; savedAt: number; setup: Record<string, unknown>; session: Record<string, unknown> }} */ (
    d
  );
}

function loadQuizDraft() {
  try {
    const raw = readLocalStorage(QUIZ_DRAFT_KEY);
    if (!raw) return null;
    return validateQuizDraft(JSON.parse(raw));
  } catch {
    return null;
  }
}

function saveQuizDraft() {
  if (quizState._finished || !quizState.list.length || $("#quiz-area")?.hidden) return;
  let examRemainingMs = null;
  if (quizState.examEndsAt) examRemainingMs = Math.max(0, quizState.examEndsAt - Date.now());
  const payload = {
    version: 1,
    savedAt: Date.now(),
    setup: readQuizSetupFromForm(),
    session: {
      list: quizState.list,
      index: quizState.index,
      mode: quizState.mode,
      studyFeedback: quizState.studyFeedback,
      sessionType: quizState.sessionType,
      answers: quizState.answers,
      confidence: quizState.confidence,
      marked: quizState.marked,
      pretest: quizState.pretest,
      optionsVisible: quizState.optionsVisible,
      topicFilter: quizState.topicFilter,
      smartLabel: quizState.smartLabel,
      timedOut: quizState.timedOut,
      statsCounted: [...quizState._statsCounted],
      pretext: $("#quiz-pretext")?.value || "",
      examRemainingMs,
    },
  };
  trySetLocalStorage(QUIZ_DRAFT_KEY, JSON.stringify(payload));
  renderQuizResumePanel();
}

function scheduleSaveQuizDraft() {
  if (quizState._finished || !quizState.list.length || $("#quiz-area")?.hidden) return;
  if (quizDraftSaveTimer) clearTimeout(quizDraftSaveTimer);
  quizDraftSaveTimer = setTimeout(() => {
    quizDraftSaveTimer = null;
    saveQuizDraft();
  }, 250);
}

function flushSaveQuizDraft() {
  if (quizDraftSaveTimer) {
    clearTimeout(quizDraftSaveTimer);
    quizDraftSaveTimer = null;
  }
  saveQuizDraft();
}

function renderQuizResumePanel() {
  const panel = $("#quiz-resume-panel");
  const meta = $("#quiz-resume-meta");
  const view = $("#view-practicar");
  if (!panel) return;
  const draft = loadQuizDraft();
  const show = !!draft && !isQuizSessionInProgress();
  panel.hidden = !show;
  view?.classList.toggle("has-resume-draft", show);
  if (!show || !meta || !draft) return;
  const s = /** @type {Record<string, unknown>} */ (draft.session);
  const list = /** @type {unknown[]} */ (s.list);
  const answers = /** @type {Record<string, number|null>} */ (s.answers || {});
  const index = typeof s.index === "number" ? s.index : 0;
  let answered = 0;
  for (const q of list) {
    const id = q && typeof q === "object" ? /** @type {{ id?: string }} */ (q).id : null;
    if (id && answers[id] !== null && answers[id] !== undefined) answered += 1;
  }
  const label = quizDraftSessionLabel(
    /** @type {{ smartLabel?: string; sessionType?: string; mode?: string; studyFeedback?: string }} */ (s),
  );
  meta.textContent = `${label} · pregunta ${index + 1}/${list.length} · ${answered} respondida(s) · ${formatQuizDraftSavedAt(draft.savedAt)}.`;
}

async function confirmReplaceQuizDraft() {
  if (!loadQuizDraft() || isQuizSessionInProgress()) return true;
  const choice = await showReplaceDraftDialog();
  if (choice === "keep") {
    showSaveToast("Sesión guardada conservada. Usa «Continuar sesión» cuando quieras.");
    return false;
  }
  if (choice === "new") {
    clearQuizDraft();
    renderQuizResumePanel();
    return true;
  }
  return false;
}

function launchQuizUi(/** @type {number|undefined} */ examRemainingMs) {
  $("#quiz-area").hidden = false;
  $("#quiz-score").hidden = true;
  $("#quiz-next").disabled = false;
  updateQuizStats();
  startExamTimer(examRemainingMs);
  flushSaveQuizDraft();
  renderQuizResumePanel();
  renderQuestion();
}

function resumeQuizSession() {
  const draft = loadQuizDraft();
  if (!draft || isQuizSessionInProgress()) return;
  const s = /** @type {Record<string, unknown>} */ (draft.session);
  applyQuizSetupToForm(draft.setup);
  quizState.list = /** @type {typeof quizState.list} */ (s.list);
  quizState.index = typeof s.index === "number" ? s.index : 0;
  quizState.mode = s.mode === "exam" ? "exam" : "study";
  quizState.studyFeedback =
    s.studyFeedback === "confidence" || s.studyFeedback === "deepen" ? s.studyFeedback : "immediate";
  quizState.sessionType = s.sessionType === "teorico" ? "teorico" : "libre";
  quizState.answers = /** @type {Record<string, number|null>} */ (s.answers || {});
  quizState.confidence = /** @type {Record<string, number>} */ (s.confidence || {});
  quizState.marked = /** @type {Record<string, boolean>} */ (s.marked || {});
  quizState.pretest = !!s.pretest;
  quizState.optionsVisible = s.optionsVisible !== false;
  quizState.topicFilter = typeof s.topicFilter === "string" ? s.topicFilter : "all";
  quizState.smartLabel = typeof s.smartLabel === "string" ? s.smartLabel : "";
  quizState.timedOut = !!s.timedOut;
  quizState._finished = false;
  quizState._statsCounted = new Set(
    Array.isArray(s.statsCounted) ? s.statsCounted.filter((id) => typeof id === "string") : [],
  );
  $("#quiz-pretest-box").hidden = !quizState.pretest;
  $("#quiz-pretext").value = typeof s.pretext === "string" ? s.pretext : "";
  $("#quiz-feedback").textContent = "";
  const examRemainingMs =
    typeof s.examRemainingMs === "number" && Number.isFinite(s.examRemainingMs) ? s.examRemainingMs : undefined;
  if (
    examRemainingMs !== undefined &&
    examRemainingMs <= 0 &&
    quizState.sessionType === "teorico" &&
    quizState.mode === "exam"
  ) {
    launchQuizUi(0);
    quizState.timedOut = true;
    requestAnimationFrame(() => finishQuiz());
    return;
  }
  launchQuizUi(examRemainingMs);
  requestAnimationFrame(() => {
    $("#quiz-area")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  showSaveToast("Sesión reanudada.");
}

function initQuizDraftPersistence() {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushSaveQuizDraft();
  });
  window.addEventListener("pagehide", () => flushSaveQuizDraft());
}

function updateQuizStats() {
  const el = $("#quiz-stats");
  if (!el || !quizState.list.length) {
    if (el) el.textContent = "";
    return;
  }
  const total = quizState.list.length;
  let answered = 0;
  let marked = 0;
  quizState.list.forEach((q) => {
    const sel = quizState.answers[q.id];
    if (sel !== null && sel !== undefined) answered += 1;
    if (quizState.marked[q.id]) marked += 1;
  });
  const bits = [`Respondidas: ${answered}/${total}`];
  if (marked) bits.push(`Marcadas repaso: ${marked}`);
  el.textContent = bits.join(" · ");
}

async function startQuiz() {
  if (isQuizSessionInProgress()) {
    if (!(await promptQuizLeave())) return;
  }
  if (!(await confirmReplaceQuizDraft())) return;
  syncPretestAvailability();
  const part = $("#quiz-part")?.value || "1";
  const modeVal = $("#quiz-mode")?.value || "study";
  if (modeVal === "exam") {
    quizState.mode = "exam";
    quizState.studyFeedback = "immediate";
  } else if (modeVal === "study_confidence") {
    quizState.mode = "study";
    quizState.studyFeedback = "confidence";
  } else if (modeVal === "study_deepen") {
    quizState.mode = "study";
    quizState.studyFeedback = "deepen";
  } else {
    quizState.mode = "study";
    quizState.studyFeedback = "immediate";
  }
  quizState.sessionType = $("#quiz-session")?.value === "teorico" ? "teorico" : "libre";
  quizState.smartLabel = "";
  quizState.pretest = !!$("#quiz-pretest")?.checked && quizState.sessionType === "libre";
  const topicRaw = $("#quiz-topic")?.value || "all";
  let topicFilter = topicRaw === "all" || topicBelongsToPart(topicRaw, part) ? topicRaw : "all";
  if (topicRaw !== "all" && topicFilter === "all" && $("#quiz-topic")) {
    $("#quiz-topic").value = "all";
  }
  quizState.topicFilter = topicFilter;
  renderQuizPracticeGuide();
  quizState._statsCounted = new Set();
  const wrongOnly = !!$("#quiz-wrong-only")?.checked;
  const trapOnly = !!$("#quiz-trap-only")?.checked;
  const onlyPool = buildQuizOnlyPool();
  const sessionPool = filterQuestionsForSession(allQuestions, {
    topicFilter,
    sessionType: quizState.sessionType,
    mode: quizState.mode,
  });
  quizState.list = buildQuestionList(
    sessionPool,
    part,
    quizState.sessionType,
    topicFilter,
    TEORICO_COUNT,
    onlyPool,
  ).map((q) => shuffleQuestionOptions(q));
  quizState.index = 0;
  quizState.answers = {};
  quizState.confidence = {};
  quizState.marked = {};
  quizState.optionsVisible = !quizState.pretest;
  quizState.timedOut = false;
  quizState._finished = false;
  clearExamTimer();
  $("#quiz-area").hidden = false;
  $("#quiz-pretest-box").hidden = !quizState.pretest;
  $("#quiz-pretext").value = "";
  $("#quiz-feedback").textContent = "";
  $("#quiz-score").hidden = true;
  if (!quizState.list.length) {
    const wrongOnly = !!$("#quiz-wrong-only")?.checked;
    const trapOnly = !!$("#quiz-trap-only")?.checked;
    let msg =
      "<p><strong>No hay preguntas</strong> con esta combinación de parte, tema y tipo de sesión. Prueba «Todos los temas» u otra parte.</p>";
    if (wrongOnly && trapOnly) {
      msg =
        "<p><strong>No hay preguntas</strong> que sean a la vez falladas y trampa con el filtro actual. Prueba «Todos los temas» o desmarca una de las dos casillas.</p>";
    } else if (wrongOnly && loadLastWrongIds().length) {
      msg =
        "<p><strong>No hay preguntas</strong> para «solo falladas» con el filtro actual. Prueba «Todos los temas», otra parte o desmarca la casilla de falladas.</p>";
    } else if (trapOnly) {
      msg =
        "<p><strong>No hay preguntas trampa</strong> con este filtro. Prueba «Todos los temas», otra parte o desmarca la casilla de preguntas trampa.</p>";
    }
    $("#quiz-feedback").innerHTML = msg;
    $("#quiz-question").innerHTML =
      '<p class="muted">Ajusta los selectores arriba y pulsa de nuevo <strong>Nueva sesión</strong>.</p>';
    $("#quiz-progress").textContent = "Sin preguntas";
    $("#quiz-prev").disabled = true;
    $("#quiz-next").disabled = true;
    updateQuizStats();
    return;
  }
  saveQuizPrefs();
  launchQuizUi();
}

async function startSmartReviewSession() {
  if (isQuizSessionInProgress()) {
    if (!(await promptQuizLeave())) return;
  }
  if (!(await confirmReplaceQuizDraft())) return;
  if ($("#view-practicar")?.hidden) {
    location.hash = "practicar";
    showView("practicar");
    updateDocumentTitle("practicar");
    announceRoute("practicar");
  }
  const notebook = loadErrorNotebook();
  const diagnostics = buildTopicDiagnostics(notebook, loadTopicQuizStats(), topicsData.parts);
  const ids = buildSmartReviewQuestionIds(notebook, diagnostics, allQuestions, 15);
  const byId = new Map(allQuestions.map((q) => [q.id, q]));
  const list = ids.map((id) => byId.get(id)).filter(Boolean);

  quizState.mode = "study";
  quizState.studyFeedback = "confidence";
  quizState.sessionType = "libre";
  quizState.pretest = false;
  quizState.topicFilter = "all";
  quizState.smartLabel = "Repaso inteligente";
  quizState._statsCounted = new Set();
  quizState.list = shuffle(list).map((q) => shuffleQuestionOptions(q));
  quizState.index = 0;
  quizState.answers = {};
  quizState.confidence = {};
  quizState.marked = {};
  quizState.optionsVisible = true;
  quizState.timedOut = false;
  quizState._finished = false;
  clearExamTimer();

  const modeEl = $("#quiz-mode");
  const sessEl = $("#quiz-session");
  const partEl = $("#quiz-part");
  const topicEl = $("#quiz-topic");
  if (modeEl) modeEl.value = "study_confidence";
  if (sessEl) sessEl.value = "libre";
  if (partEl) partEl.value = "mix";
  if (topicEl) topicEl.value = "all";
  saveQuizPrefs();
  renderQuizPracticeGuide();
  renderQuizProgressSummary();

  $("#quiz-area").hidden = false;
  $("#quiz-pretest-box").hidden = true;
  $("#quiz-pretext").value = "";
  $("#quiz-feedback").textContent = "";
  $("#quiz-score").hidden = true;

  if (!quizState.list.length) {
    $("#quiz-feedback").innerHTML =
      "<p><strong>No hay preguntas disponibles</strong> para crear el repaso inteligente. Revisa que el banco esté cargado.</p>";
    $("#quiz-question").innerHTML = '<p class="muted">No se pudo crear la sesión.</p>';
    $("#quiz-progress").textContent = "Sin preguntas";
    $("#quiz-prev").disabled = true;
    $("#quiz-next").disabled = true;
    updateQuizStats();
    return;
  }

  launchQuizUi();
}

function currentQ() {
  return quizState.list[quizState.index];
}

function safeStemFigureSrc(raw) {
  if (typeof raw !== "string") return null;
  const s = raw.trim();
  if (!s || s.includes("..") || s.includes("\\")) return null;
  if (!/^images\/quiz\/[A-Za-z0-9._-]+\.(svg|png|webp|jpg|jpeg)$/i.test(s)) return null;
  return s;
}

function stemFigureBlock(q) {
  if (!("stemFigure" in q)) return "";
  const src = safeStemFigureSrc(/** @type {{ stemFigure?: string }} */ (q).stemFigure);
  if (!src) return "";
  const rawAlt = "stemFigureAlt" in q ? /** @type {{ stemFigureAlt?: string }} */ (q).stemFigureAlt : "";
  const alt =
    typeof rawAlt === "string" && rawAlt.trim()
      ? rawAlt.trim()
      : "Figura asociada al enunciado.";
  return `<figure class="q-card__figure">
    <img class="q-card__figure-img" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" onerror="this.closest('figure').classList.add('is-missing')" />
    <figcaption class="q-card__figure-caption">${escapeHtml(alt)}</figcaption>
    <p class="q-card__figure-missing"><strong>Imagen no disponible:</strong> falta subir <code>${escapeHtml(src)}</code>. ${escapeHtml(alt)}</p>
  </figure>`;
}

function renderQuestion() {
  const q = currentQ();
  const total = quizState.list.length;
  const box = $("#quiz-question");
  if (!q || !total) {
    $("#quiz-progress").textContent = total ? "" : "Sin preguntas";
    if (box && !box.innerHTML.trim()) {
      box.innerHTML = '<p class="muted">Sin preguntas en esta sesión. Pulsa «Nueva sesión».</p>';
    }
    return;
  }
  const sessionLabel =
    quizState.sessionType === "teorico" ? " · Examen tipo test (30 máx.)" : "";
  const smartLabel = quizState.smartLabel ? ` · ${escapeHtml(quizState.smartLabel)}` : "";
  const topicExtra =
    quizState.topicFilter && quizState.topicFilter !== "all"
      ? ` · Tema: ${escapeHtml(topicBlockLabel(quizState.topicFilter))}`
      : "";
  $("#quiz-progress").textContent = `Pregunta ${quizState.index + 1} de ${total}${sessionLabel}${smartLabel}${topicExtra}`;
  announceQuizQuestion(q, quizState.index, total);
  const sel = quizState.answers[q.id];
  const showOpts = quizState.optionsVisible;
  const hideTopicMeta = quizState.sessionType === "teorico" && quizState.mode === "exam";
  const topicTitle = topicBlockLabel(q.topicId);
  const topicMeta = hideTopicMeta
    ? `<div class="q-card__meta"><span>Pregunta ${quizState.index + 1}/${total}</span><span>Simulacro sin pistas</span></div>`
    : `<div class="q-card__meta">
        <span>Pregunta ${quizState.index + 1}/${total}</span>
        <strong>${escapeHtml(topicTitle)}</strong>
        <span>Parte ${q.part}</span>
        <span>${escapeHtml(q.topicId)}</span>
      </div>`;
  const figureHtml = stemFigureBlock(q);

  const confDone =
    quizState.mode !== "study" ||
    quizState.studyFeedback !== "confidence" ||
    sel === null ||
    sel === undefined ||
    quizState.confidence[q.id] !== undefined;
  const optsHtml = q.options
    .map((opt, i) => {
      let cls = "opt";
      const checked = sel === i ? "checked" : "";
      if (quizState.mode === "study" && sel !== null && sel !== undefined && confDone) {
        if (i === q.correctIndex) cls += " opt--correct";
        else if (sel === i) cls += " opt--wrong";
      }
      return `
        <label class="${cls}">
          <input type="radio" name="opt" value="${i}" ${checked} ${showOpts ? "" : "disabled"} />
          <span>${escapeHtml(opt)}</span>
        </label>`;
    })
    .join("");

  const confidenceInline =
    quizState.mode === "study" &&
    quizState.studyFeedback === "confidence" &&
    sel !== null &&
    sel !== undefined &&
    quizState.confidence[q.id] === undefined
      ? `
        <div class="confidence-inline" id="quiz-confidence" role="group" aria-label="Nivel de seguridad antes de corregir">
          <p class="conf-prompt"><strong>Antes de corregir:</strong> mide tu seguridad.</p>
          <div class="confidence-bar">
            <button type="button" class="btn btn--ghost conf-btn" data-conf="0">Baja</button>
            <button type="button" class="btn btn--ghost conf-btn" data-conf="1">Media</button>
            <button type="button" class="btn btn--ghost conf-btn" data-conf="2">Alta</button>
          </div>
        </div>`
      : "";

  const preBtn =
    quizState.pretest && !showOpts
      ? `<p style="margin-top:1rem"><button type="button" class="btn btn--primary" id="quiz-reveal">Mostrar opciones</button></p>`
      : "";

  const markedOn = !!quizState.marked[q.id];
  const toolbar = `
    <div class="q-card__toolbar">
      <label>
        <input type="checkbox" id="quiz-mark-review" ${markedOn ? "checked" : ""} />
        Marcar para repasar antes de entregar
      </label>
    </div>`;

  box.innerHTML = `
    ${topicMeta}
    ${figureHtml}
    <h2 class="q-card__stem">${escapeHtml(q.stem)}</h2>
    <div class="opts" role="radiogroup" aria-label="Opciones">${optsHtml}</div>
    ${confidenceInline}
    ${preBtn}
    ${toolbar}
  `;

  $("#quiz-mark-review")?.addEventListener("change", (e) => {
    const t = /** @type {HTMLInputElement} */ (e.target);
    quizState.marked[q.id] = !!t.checked;
    updateQuizStats();
    scheduleSaveQuizDraft();
  });

  if (quizState.pretest && !showOpts) {
    $("#quiz-reveal")?.addEventListener("click", () => {
      quizState.optionsVisible = true;
      renderQuestion();
      scheduleSaveQuizDraft();
    });
  }

  box.querySelectorAll('input[name="opt"]').forEach((inp) => {
    inp.addEventListener("change", () => {
      const idx = Number.parseInt(inp.value, 10);
      const prev = quizState.answers[q.id];
      quizState.answers[q.id] = idx;
      if (quizState.mode === "study" && quizState.studyFeedback === "confidence" && prev !== idx) {
        delete quizState.confidence[q.id];
      }
      updateQuizStats();
      renderQuestion();
      scheduleSaveQuizDraft();
    });
  });

  box.querySelectorAll("[data-conf]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = Number.parseInt(btn.getAttribute("data-conf") || "1", 10);
      quizState.confidence[q.id] = Number.isFinite(v) ? v : 1;
      renderQuestion();
      scheduleSaveQuizDraft();
    });
  });

  $("#quiz-prev").disabled = quizState.index === 0;
  const atEnd = quizState.index === total - 1;
  $("#quiz-next").textContent = atEnd ? "Finalizar" : "Siguiente";

  if (quizState.mode === "study") {
    const selEnd = quizState.answers[q.id];
    if (selEnd !== null && selEnd !== undefined) {
      showStudyFeedback(q);
    } else {
      $("#quiz-feedback").textContent = "";
    }
  }

  updateQuizStats();
  scheduleSaveQuizDraft();
}

function topicBlockLabel(topicId) {
  for (const p of topicsData.parts) {
    const b = p.blocks.find((x) => x.id === topicId);
    if (b) return b.title;
  }
  return topicId;
}

function questionCountByTopic() {
  const m = /** @type {Record<string, number>} */ ({});
  for (const q of allQuestions) {
    m[q.topicId] = (m[q.topicId] || 0) + 1;
  }
  return m;
}

function topicProgressState(st) {
  if (!st || !st.t) {
    return {
      cls: "idle",
      label: "Sin empezar",
      detail: "Lee el bloque y haz una sesión corta.",
    };
  }
  const pct = Math.round((st.ok / st.t) * 100);
  if (st.t >= 10 && pct >= 80) {
    return {
      cls: "strong",
      label: "Fuerte",
      detail: `${pct} % · ${st.ok}/${st.t} aciertos`,
    };
  }
  if (st.t >= 5 && pct < 60) {
    return {
      cls: "weak",
      label: "Débil",
      detail: `${pct} % · repasar teoría y falladas`,
    };
  }
  return {
    cls: "active",
    label: "En práctica",
    detail: `${pct} % · ${st.ok}/${st.t} aciertos`,
  };
}

/** Texto plano para filtrar bloques del temario (sin HTML). */
function buildTemarioSearchIndex(blockId, blockMeta, study) {
  const bits = [blockId, blockMeta.title, blockMeta.hint];
  if (study && typeof study === "object") {
    for (const k of [
      "memoryHooks",
      "expressBullets",
      "readMore",
      "fedieaSyllabus",
      "bookGuide",
      "quickSession",
      "examChecklist",
      "trapWarnings",
      "sources",
    ]) {
      const arr = /** @type {unknown} */ (study)[k];
      if (Array.isArray(arr)) {
        for (const x of arr) bits.push(String(x));
      } else if (k === "sources" && typeof arr === "string") {
        bits.push(arr);
      }
    }
    const fcs = study.flashcards;
    if (Array.isArray(fcs)) {
      for (const fc of fcs) {
        if (fc && typeof fc === "object") {
          bits.push(String(fc.front || ""), String(fc.back || ""));
        }
      }
    }
  }
  return bits.join(" ");
}

function loadQuizPrefs() {
  try {
    const raw = localStorage.getItem(QUIZ_PREFS_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    return o && typeof o === "object" ? o : null;
  } catch {
    return null;
  }
}

function saveQuizPrefs() {
  const part = $("#quiz-part")?.value || "1";
  const topic = $("#quiz-topic")?.value || "all";
  const session = $("#quiz-session")?.value || "libre";
  const mode = $("#quiz-mode")?.value || "study";
  const pretest = !!$("#quiz-pretest")?.checked;
  const trapOnly = !!$("#quiz-trap-only")?.checked;
  localStorage.setItem(QUIZ_PREFS_KEY, JSON.stringify({ part, topic, session, mode, pretest, trapOnly }));
}

function applyQuizPrefsToForm() {
  const p = loadQuizPrefs();
  if (!p) return;
  const partEl = $("#quiz-part");
  if (partEl instanceof HTMLSelectElement && typeof p.part === "string") partEl.value = p.part;
  const topicEl = $("#quiz-topic");
  if (topicEl instanceof HTMLSelectElement && typeof p.topic === "string") {
    if ([...topicEl.options].some((o) => o.value === p.topic)) topicEl.value = p.topic;
  }
  const sessEl = $("#quiz-session");
  if (sessEl instanceof HTMLSelectElement && typeof p.session === "string") sessEl.value = p.session;
  const modeEl = $("#quiz-mode");
  if (modeEl instanceof HTMLSelectElement && typeof p.mode === "string") modeEl.value = p.mode;
  const preEl = $("#quiz-pretest");
  if (preEl instanceof HTMLInputElement) preEl.checked = !!p.pretest;
  const trapEl = $("#quiz-trap-only");
  if (trapEl instanceof HTMLInputElement) trapEl.checked = !!p.trapOnly;
  syncPretestAvailability();
  validateTopicPartConsistency();
}

function initQuizPrefsAutosave() {
  for (const id of ["quiz-part", "quiz-topic", "quiz-session", "quiz-mode"]) {
    $(`#${id}`)?.addEventListener("change", saveQuizPrefs);
  }
  $("#quiz-pretest")?.addEventListener("change", saveQuizPrefs);
  $("#quiz-trap-only")?.addEventListener("change", saveQuizPrefs);
}

function computeWrongIdsFromCurrentSession() {
  const out = [];
  for (const q of quizState.list) {
    const sel = quizState.answers[q.id];
    if (sel !== null && sel !== undefined && sel !== q.correctIndex) out.push(q.id);
  }
  return out;
}

function saveLastWrongIds(ids) {
  try {
    localStorage.setItem(LAST_WRONG_SESSION_KEY, JSON.stringify({ ids, savedAt: Date.now() }));
  } catch {
    /* ignore quota */
  }
  updateWrongOnlyCheckboxVisibility();
}

function loadLastWrongIds() {
  try {
    const raw = localStorage.getItem(LAST_WRONG_SESSION_KEY);
    if (!raw) return [];
    const o = JSON.parse(raw);
    return Array.isArray(o?.ids) ? o.ids.filter((/** @type {unknown} */ x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function updateWrongOnlyCheckboxVisibility() {
  const row = $("#quiz-wrong-row");
  const n = loadLastWrongIds().length;
  if (row) row.hidden = n === 0;
}

function loadErrorNotebook() {
  try {
    const raw = localStorage.getItem(ERROR_NOTEBOOK_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    return o && typeof o === "object" ? o : {};
  } catch {
    return {};
  }
}

function saveErrorNotebook(notebook) {
  try {
    localStorage.setItem(ERROR_NOTEBOOK_KEY, JSON.stringify(notebook || {}));
  } catch {
    /* ignore quota */
  }
}

function topicPartValue(topicId) {
  for (const part of topicsData.parts || []) {
    if ((part.blocks || []).some((b) => b.id === topicId)) return part.id === "p2" ? "2" : "1";
  }
  return "1";
}

function loadTopicQuizStats() {
  try {
    const raw = localStorage.getItem(QUIZ_TOPIC_STATS_KEY);
    if (!raw) return /** @type {Record<string, { t: number; ok: number }>} */ ({});
    const o = JSON.parse(raw);
    if (!o || typeof o !== "object") return {};
    return /** @type {Record<string, { t: number; ok: number }>} */ (o);
  } catch {
    return {};
  }
}

/** @returns {string} Fecha local YYYY-MM-DD */
function localDayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** @param {string} ymd */
function addCalendarDaysYMD(ymd, deltaDays) {
  const [y, mo, dy] = ymd.split("-").map((x) => Number.parseInt(x, 10));
  const dt = new Date(y, mo - 1, dy + deltaDays);
  return localDayKey(dt);
}

function defaultUserStats() {
  return {
    v: 1,
    streak: 0,
    lastActivityDay: /** @type {string|null} */ (null),
    lastActiveAt: /** @type {number|null} */ (null),
    studyLifetimeGrades: 0,
    studySessionsClosed: 0,
    gradedSessionsClosed: 0,
    gradedCorrectSum: 0,
    gradedTotalSum: 0,
    gradedByPart: {
      p1: { sessions: 0, passed: 0 },
      p2: { sessions: 0, passed: 0 },
    },
    flashRatings: 0,
    seenQuestionIds: /** @type {Record<string, 1>} */ ({}),
  };
}

function loadUserStats() {
  const base = defaultUserStats();
  try {
    const raw = localStorage.getItem(USER_STATS_KEY);
    if (!raw) return base;
    const o = JSON.parse(raw);
    if (!o || typeof o !== "object") return base;
    const seen =
      o.seenQuestionIds && typeof o.seenQuestionIds === "object"
        ? /** @type {Record<string, 1>} */ (o.seenQuestionIds)
        : {};
    const gradedByPart = {
      p1: {
        sessions: Number.isFinite(o.gradedByPart?.p1?.sessions) ? o.gradedByPart.p1.sessions : 0,
        passed: Number.isFinite(o.gradedByPart?.p1?.passed) ? o.gradedByPart.p1.passed : 0,
      },
      p2: {
        sessions: Number.isFinite(o.gradedByPart?.p2?.sessions) ? o.gradedByPart.p2.sessions : 0,
        passed: Number.isFinite(o.gradedByPart?.p2?.passed) ? o.gradedByPart.p2.passed : 0,
      },
    };
    return {
      ...base,
      ...o,
      seenQuestionIds: seen,
      gradedByPart,
    };
  } catch {
    return base;
  }
}

function saveUserStats(/** @type {ReturnType<typeof defaultUserStats>} */ stats) {
  try {
    localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
  } catch {
    /* ignore quota */
  }
}

/**
 * @param {(s: ReturnType<typeof defaultUserStats>) => void} fn
 */
function mutateUserStats(fn) {
  const stats = loadUserStats();
  if (!stats.seenQuestionIds || typeof stats.seenQuestionIds !== "object") stats.seenQuestionIds = {};
  fn(stats);
  const today = localDayKey();
  const now = Date.now();
  if (stats.lastActivityDay !== today) {
    const yesterday = addCalendarDaysYMD(today, -1);
    if (stats.lastActivityDay === yesterday) {
      stats.streak = (stats.streak || 0) + 1;
    } else {
      stats.streak = 1;
    }
    stats.lastActivityDay = today;
  }
  stats.lastActiveAt = now;
  saveUserStats(stats);
  renderUserProgress();
  renderQuizProgressSummary();
}

function totalTemarioBlocks() {
  let n = 0;
  for (const p of topicsData.parts || []) {
    n += (p.blocks || []).length;
  }
  return n;
}

/** Aciertos en modo estudio agregados por parte (temario). */
function aggregateTopicPracticeByPart(topicStats) {
  const out = {
    p1: { t: 0, ok: 0, blocks: 0, touched: 0 },
    p2: { t: 0, ok: 0, blocks: 0, touched: 0 },
  };
  for (const part of topicsData.parts || []) {
    const key = part.id === "p1" ? "p1" : part.id === "p2" ? "p2" : null;
    if (!key) continue;
    for (const b of part.blocks || []) {
      out[key].blocks += 1;
      const s = topicStats[b.id];
      if (s && s.t > 0) {
        out[key].touched += 1;
        out[key].t += s.t;
        out[key].ok += s.ok;
      }
    }
  }
  return out;
}

function formatRelativeLastActive(ts) {
  if (!ts || !Number.isFinite(ts)) return "Sin registro todavía";
  const dayMs = 86400000;
  const diff = Date.now() - ts;
  if (diff < dayMs && localDayKey(new Date(ts)) === localDayKey()) return "Hoy";
  if (diff < 2 * dayMs && localDayKey(new Date(ts)) === addCalendarDaysYMD(localDayKey(), -1)) return "Ayer";
  const d = Math.floor(diff / dayMs);
  if (d < 14) return `Hace ${d} días`;
  return new Date(ts).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

function pctBar(p) {
  const clamped = Math.max(0, Math.min(100, p));
  return `<div class="user-stats__bar" role="progressbar" aria-valuenow="${Math.round(clamped)}" aria-valuemin="0" aria-valuemax="100"><span class="user-stats__bar-fill" style="width:${clamped}%"></span></div>`;
}

function dueScheduledFlashcardsCount() {
  const sched = loadSchedule();
  const now = Date.now();
  let n = 0;
  for (const item of Object.values(sched || {})) {
    if (item && typeof item === "object" && Number(item.due || 0) <= now) n += 1;
  }
  return n;
}

function renderHeaderStatus() {
  const el = $("#header-status");
  if (!el) return;
  const u = loadUserStats();
  const bank = allQuestions.length;
  const seen = u.seenQuestionIds && typeof u.seenQuestionIds === "object" ? Object.keys(u.seenQuestionIds).length : 0;
  const coverage = bank ? Math.round((seen / bank) * 100) : 0;
  const activeErrors = errorNotebookEntries(loadErrorNotebook()).filter(isActiveError).length;
  const dueCards = dueScheduledFlashcardsCount();
  el.innerHTML = `
    <span><strong>${coverage} %</strong> banco</span>
    <span><strong>${activeErrors}</strong> errores</span>
    <span><strong>${dueCards}</strong> tarjetas</span>
  `;
}

function pickTodayPlan(u, topicStats, coverage, blocksTouched, blocksTotal) {
  const notebookEntries = errorNotebookEntries(loadErrorNotebook());
  const activeErrors = notebookEntries.filter(isActiveError).length;
  const highSecurity = notebookEntries.reduce((sum, entry) => sum + (entry.highSecurityWrongCount || 0), 0);
  const dueCards = dueScheduledFlashcardsCount();
  const gradedP1 = u.gradedByPart?.p1?.passed || 0;
  const gradedP2 = u.gradedByPart?.p2?.passed || 0;
  const byPart = aggregateTopicPracticeByPart(topicStats);

  if (activeErrors > 0 || highSecurity > 0) {
    return {
      tag: "Prioridad",
      title: "Hoy toca cerrar errores",
      text:
        highSecurity > 0
          ? `Tienes ${highSecurity} fallo(s) con seguridad alta. Corrígelos antes de hacer más simulacros.`
          : `Tienes ${activeErrors} error(es) activo(s). Repásalos y convierte cada fallo en una regla corta.`,
      href: "#cuaderno",
      cta: "Abrir cuaderno",
      secondaryHref: "#practicar",
      secondaryCta: "Practicar después",
    };
  }

  if ((u.flashRatings || 0) > 0 && dueCards > 0) {
    return {
      tag: "Retención",
      title: "Hoy toca repaso espaciado",
      text: `Tienes ${dueCards} tarjeta(s) programada(s) para repasar. Hazlas antes de abrir temas nuevos.`,
      href: "#tarjetas",
      cta: "Repasar tarjetas",
      secondaryHref: "#practicar",
      secondaryCta: "Practicar luego",
    };
  }

  if (coverage === 0 && blocksTouched === 0) {
    return {
      tag: "Primer paso",
      title: "Empieza por un bloque pequeño",
      text: "Lee Electricidad básica o Marco normativo, quédate con la idea clave y luego haz una sesión corta de práctica.",
      href: "#temario",
      cta: "Empezar temario",
      secondaryHref: "#practicar",
      secondaryCta: "Ir a practicar",
    };
  }

  if (blocksTotal && blocksTouched < Math.ceil(blocksTotal * 0.45)) {
    const weakPart = byPart.p1.t <= byPart.p2.t ? "1.ª prueba" : "2.ª prueba";
    return {
      tag: "Cobertura",
      title: "Hoy amplía cobertura por bloques",
      text: `Has practicado ${blocksTouched}/${blocksTotal} bloques. Elige un tema de ${weakPart} y trabaja en modo estudio con corrección inmediata.`,
      href: "#practicar",
      cta: "Practicar un bloque",
      secondaryHref: "#temario",
      secondaryCta: "Ver teoría",
    };
  }

  if (!gradedP1 || !gradedP2) {
    return {
      tag: "Medición",
      title: "Hoy mide nivel con un simulacro",
      text: "Ya tienes base suficiente para comprobar una prueba sin pistas. Haz un simulacro y revisa solo los fallos.",
      href: "#examen",
      cta: "Lanzar simulacro",
      secondaryHref: "#cuaderno",
      secondaryCta: "Ver errores",
    };
  }

  return {
    tag: "Consolidación",
    title: "Hoy mantén ritmo sin abrir frentes",
    text: "Alterna 15 preguntas trampa con tarjetas. Si todo va bien, conserva energía para un simulacro completo.",
    href: "#practicar",
    cta: "Practicar trampas",
    secondaryHref: "#tarjetas",
    secondaryCta: "Repasar tarjetas",
  };
}

function renderTodayPlan(u, topicStats, coverage, blocksTouched, blocksTotal) {
  const root = $("#today-plan-root");
  if (!root) return;
  const plan = pickTodayPlan(u, topicStats, coverage, blocksTouched, blocksTotal);
  root.innerHTML = `
    <div class="today-plan__copy">
      <p class="eyebrow">${escapeHtml(plan.tag)}</p>
      <h2 id="today-plan-title">Hoy qué hago</h2>
      <p><strong>${escapeHtml(plan.title)}:</strong> ${escapeHtml(plan.text)}</p>
    </div>
    <div class="today-plan__actions">
      <a class="btn btn--primary btn--hero-action" href="${escapeHtml(plan.href)}">${escapeHtml(plan.cta)}</a>
      <a class="btn btn--ghost" href="${escapeHtml(plan.secondaryHref)}">${escapeHtml(plan.secondaryCta)}</a>
    </div>
  `;
}

function renderUserProgress() {
  const root = $("#user-stats-root");
  renderHeaderStatus();
  if (!root) return;
  const u = loadUserStats();
  const topicStats = loadTopicQuizStats();
  const bank = allQuestions.length;
  const seen = u.seenQuestionIds && typeof u.seenQuestionIds === "object" ? Object.keys(u.seenQuestionIds).length : 0;
  const coverage = bank ? Math.round((seen / bank) * 100) : 0;
  const blocksTotal = totalTemarioBlocks();
  let blocksTouched = 0;
  for (const p of topicsData.parts || []) {
    for (const b of p.blocks || []) {
      const s = topicStats[b.id];
      if (s && s.t > 0) blocksTouched += 1;
    }
  }
  const blockPct = blocksTotal ? Math.round((blocksTouched / blocksTotal) * 100) : 0;
  const byPart = aggregateTopicPracticeByPart(topicStats);
  const avgGraded =
    u.gradedSessionsClosed > 0 && u.gradedTotalSum > 0
      ? Math.round((u.gradedCorrectSum / u.gradedTotalSum) * 100)
      : null;
  const p1rate = byPart.p1.t > 0 ? Math.round((byPart.p1.ok / byPart.p1.t) * 100) : null;
  const p2rate = byPart.p2.t > 0 ? Math.round((byPart.p2.ok / byPart.p2.t) * 100) : null;

  renderTodayPlan(u, topicStats, coverage, blocksTouched, blocksTotal);

  root.innerHTML = `
    <h2 id="user-stats-title" class="user-stats__title">Tu progreso</h2>
    <p class="user-stats__note">Resumen guardado solo en este navegador. Sirve para ver constancia y cobertura; no sustituye a un tutor ni al baremo oficial.</p>
    <div class="user-stats__grid">
      <div class="user-stats__metric">
        <span class="user-stats__metric-label">Racha (días seguidos con práctica)</span>
        <strong class="user-stats__metric-value">${escapeHtml(String(u.streak || 0))}</strong>
        <span class="user-stats__metric-hint">${escapeHtml(formatRelativeLastActive(u.lastActiveAt || 0))}</span>
      </div>
      <div class="user-stats__metric">
        <span class="user-stats__metric-label">Preguntas distintas vistas</span>
        <strong class="user-stats__metric-value">${seen}<span class="user-stats__metric-den">/${bank}</span></strong>
        ${pctBar(coverage)}
        <span class="user-stats__metric-hint">Cobertura aproximada del banco cargado</span>
      </div>
      <div class="user-stats__metric">
        <span class="user-stats__metric-label">Bloques del temario con práctica</span>
        <strong class="user-stats__metric-value">${blocksTouched}<span class="user-stats__metric-den">/${blocksTotal}</span></strong>
        ${pctBar(blockPct)}
        <span class="user-stats__metric-hint">Al menos una respuesta en estudio por bloque</span>
      </div>
      <div class="user-stats__metric">
        <span class="user-stats__metric-label">Respuestas valoradas en estudio</span>
        <strong class="user-stats__metric-value">${escapeHtml(String(u.studyLifetimeGrades || 0))}</strong>
        <span class="user-stats__metric-hint">Cada ítem al corregir (puede repetirse en otra sesión)</span>
      </div>
      <div class="user-stats__metric">
        <span class="user-stats__metric-label">Sesiones de estudio libre completadas</span>
        <strong class="user-stats__metric-value">${escapeHtml(String(u.studySessionsClosed || 0))}</strong>
        <span class="user-stats__metric-hint">Llegaste al final sin modo examen tipo test</span>
      </div>
      <div class="user-stats__metric">
        <span class="user-stats__metric-label">Sesiones con nota final</span>
        <strong class="user-stats__metric-value">${escapeHtml(String(u.gradedSessionsClosed || 0))}</strong>
        <span class="user-stats__metric-hint">${avgGraded !== null ? `Media acumulada: ${avgGraded} %` : "Examen al cierre o test de 30 en estudio"}</span>
      </div>
      <div class="user-stats__metric">
        <span class="user-stats__metric-label">Tarjetas (Lo sabía / No lo tenía claro)</span>
        <strong class="user-stats__metric-value">${escapeHtml(String(u.flashRatings || 0))}</strong>
        <span class="user-stats__metric-hint">Programaciones de repaso espaciado</span>
      </div>
    </div>
    <div class="user-stats__parts" aria-label="Ritmo en estudio por prueba">
      <div class="user-stats__part">
        <span class="user-stats__part-label">1.ª prueba (estudio)</span>
        ${p1rate !== null ? `<span class="user-stats__part-val">${p1rate} % aciertos (${byPart.p1.ok}/${byPart.p1.t})</span>` : `<span class="user-stats__part-val muted">Sin datos aún</span>`}
      </div>
      <div class="user-stats__part">
        <span class="user-stats__part-label">2.ª prueba (estudio)</span>
        ${p2rate !== null ? `<span class="user-stats__part-val">${p2rate} % aciertos (${byPart.p2.ok}/${byPart.p2.t})</span>` : `<span class="user-stats__part-val muted">Sin datos aún</span>`}
      </div>
    </div>
    <div class="user-stats__actions">
      <button type="button" class="btn btn--ghost btn--sm" id="user-stats-reset">Restablecer solo este resumen</button>
    </div>
  `;

  $("#user-stats-reset")?.addEventListener("click", async () => {
    if (
      !(await showAppConfirm({
        title: "¿Restablecer resumen global?",
        message:
          "Se borrarán racha, cobertura y contadores del resumen global. No afecta a tarjetas, cuaderno ni aciertos por bloque del temario.",
        confirmLabel: "Restablecer",
        danger: true,
      }))
    ) {
      return;
    }
    try {
      localStorage.removeItem(USER_STATS_KEY);
    } catch {
      /* ignore */
    }
    renderUserProgress();
    renderQuizProgressSummary();
  });
}

function renderQuizProgressSummary() {
  const el = $("#quiz-progress-summary");
  if (!el) return;
  const u = loadUserStats();
  const bank = allQuestions.length;
  const seen = u.seenQuestionIds && typeof u.seenQuestionIds === "object" ? Object.keys(u.seenQuestionIds).length : 0;
  const coverage = bank ? Math.round((seen / bank) * 100) : 0;
  const bits = [
    `Racha: ${u.streak || 0} día(s)`,
    `Cobertura banco: ${coverage} % (${seen}/${bank})`,
    `Sesiones con nota: ${u.gradedSessionsClosed || 0}`,
  ];
  el.textContent = bits.join(" · ");
}

function recordQuestionOutcome(q, selectedIndex, isCorrect) {
  const confidenceLevel =
    quizState.studyFeedback === "confidence" && quizState.confidence[q.id] !== undefined
      ? quizState.confidence[q.id]
      : null;
  const notebook = loadErrorNotebook();
  const next = updateErrorNotebookWithResult(notebook, q, selectedIndex, isCorrect, confidenceLevel);
  saveErrorNotebook(next);
  renderExamCoach();
}

function coachSnapshot() {
  const notebook = loadErrorNotebook();
  const entries = errorNotebookEntries(notebook);
  const activeEntries = entries.filter(isActiveError);
  const highSecurity = entries.reduce((sum, entry) => sum + (entry.highSecurityWrongCount || 0), 0);
  const diagnostics = buildTopicDiagnostics(notebook, loadTopicQuizStats(), topicsData.parts);
  const readiness = buildExamReadiness(topicsData.parts, diagnostics, loadUserStats());
  const plan = buildRecommendedPlan(diagnostics);
  const topTopics = diagnostics.slice(0, 3);
  const recent = [...entries]
    .sort((a, b) => (b.lastWrongAt || 0) - (a.lastWrongAt || 0))
    .slice(0, 4);
  return { entries, activeEntries, highSecurity, diagnostics, readiness, plan, topTopics, recent };
}

function renderReadinessCards(readiness) {
  return readiness
    .map(
      (item) => `
      <article class="exam-ready exam-ready--${escapeHtml(item.status)}">
        <div class="exam-ready__head">
          <h3>${escapeHtml(item.title)}</h3>
          <strong>${escapeHtml(item.label)}</strong>
        </div>
        <div class="exam-ready__metrics">
          <span>${item.accuracy === null ? "Sin aciertos aún" : `${item.accuracy} % aciertos`}</span>
          <span>${item.coverage} % bloques</span>
          <span>${item.passedSimulations} simulacro(s) apto(s)</span>
        </div>
        <ul>${item.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul>
        <p><strong>Siguiente acción:</strong> ${escapeHtml(item.nextAction)}</p>
      </article>`,
    )
    .join("");
}

function preparePracticeTopic(topicId) {
  const partEl = $("#quiz-part");
  const topicEl = $("#quiz-topic");
  if (partEl) partEl.value = topicPartValue(topicId);
  if (topicEl) topicEl.value = topicId;
  validateTopicPartConsistency();
  renderQuizPracticeGuide();
  renderQuizProgressSummary();
  saveQuizPrefs();
  location.hash = "practicar";
  requestAnimationFrame(() => {
    setTimeout(() => $("#quiz-start")?.focus(), 80);
  });
}

function startExamSimulation(partValue) {
  location.hash = "practicar";
  showView("practicar");
  updateDocumentTitle("practicar");
  announceRoute("practicar");
  const partEl = $("#quiz-part");
  const topicEl = $("#quiz-topic");
  const sessionEl = $("#quiz-session");
  const modeEl = $("#quiz-mode");
  const preEl = $("#quiz-pretest");
  const trapEl = $("#quiz-trap-only");
  if (partEl) partEl.value = partValue;
  if (topicEl) topicEl.value = "all";
  if (sessionEl) sessionEl.value = "teorico";
  if (modeEl) modeEl.value = "exam";
  if (preEl instanceof HTMLInputElement) preEl.checked = false;
  if (trapEl instanceof HTMLInputElement) trapEl.checked = false;
  syncPretestAvailability();
  validateTopicPartConsistency();
  renderQuizPracticeGuide();
  renderQuizProgressSummary();
  saveQuizPrefs();
  startQuiz();
  requestAnimationFrame(() => {
    $("#quiz-area")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderUtilidades() {
  const root = $("#utilidades-root");
  if (!root) return;

  const phoneticRows = PHONETIC_ALPHABET.map(
    (row) =>
      `<tr><th scope="row">${escapeHtml(row.letter)}</th><td><strong>${escapeHtml(row.word)}</strong></td></tr>`,
  ).join("");

  const qRows = Q_CODES.map(
    (row) =>
      `<tr><th scope="row"><code>${escapeHtml(row.code)}</code></th><td>${escapeHtml(row.meaning)}</td></tr>`,
  ).join("");

  const signalRows = EMERGENCY_SIGNALS.map(
    (row) =>
      `<tr>
        <th scope="row"><strong>${escapeHtml(row.signal)}</strong><br><span class="util-signal-type">${escapeHtml(row.type)}</span></th>
        <td>${escapeHtml(row.meaning)}</td>
        <td>${escapeHtml(row.procedure)}</td>
        <td class="util-signal-note">${escapeHtml(row.note)}</td>
      </tr>`,
  ).join("");

  const districtCards = EA_DISTRICTS.map(
    (d) => `
      <article class="util-district">
        <h3><span class="util-district__badge">${escapeHtml(d.label)}</span> ${escapeHtml(d.title)}</h3>
        <p>${escapeHtml(d.provinces)}</p>
      </article>`,
  ).join("");

  const notes = UTILIDADES_NOTES.map((n) => `<li>${escapeHtml(n)}</li>`).join("");

  root.innerHTML = `
    <ul class="util-notes">${notes}</ul>
    <div class="util-grid">
      <section class="panel util-panel" aria-labelledby="util-phonetic-title">
        <h2 id="util-phonetic-title">Alfabeto fonético ICAO</h2>
        <p class="muted">Para deletrear indicativos, nombres y mensajes en fonía sin confundir letras.</p>
        <div class="util-table-wrap">
          <table class="util-table">
            <thead><tr><th scope="col">Letra</th><th scope="col">Palabra</th></tr></thead>
            <tbody>${phoneticRows}</tbody>
          </table>
        </div>
      </section>
      <section class="panel util-panel" aria-labelledby="util-q-title">
        <h2 id="util-q-title">Códigos Q habituales</h2>
        <p class="muted">Los más usados en examen y en QSO. Todos empiezan por Q.</p>
        <div class="util-table-wrap">
          <table class="util-table util-table--q">
            <thead><tr><th scope="col">Código</th><th scope="col">Significado</th></tr></thead>
            <tbody>${qRows}</tbody>
          </table>
        </div>
      </section>
    </div>
    <section class="panel util-panel util-panel--signals" aria-labelledby="util-signals-title">
      <h2 id="util-signals-title">Mayday, Pan-pan, Securité y RST</h2>
      <p class="muted">Cuatro conceptos que el examen mezcla a menudo. No son intercambiables.</p>
      <div class="util-table-wrap">
        <table class="util-table util-table--signals">
          <thead>
            <tr>
              <th scope="col">Señal</th>
              <th scope="col">Para qué sirve</th>
              <th scope="col">Cómo se usa</th>
              <th scope="col">Trampa habitual</th>
            </tr>
          </thead>
          <tbody>${signalRows}</tbody>
        </table>
      </div>
    </section>
    <section class="panel util-panel util-panel--map" aria-labelledby="util-ea-title">
      <h2 id="util-ea-title">Distritos EA (indicativos españoles)</h2>
      <p class="muted">
        La cifra del indicativo (por ejemplo <strong>EA4ABC</strong>) indica el distrito según la división geográfica oficial.
        Mapa orientativo URE; contrasta con el reglamento vigente.
      </p>
      <figure class="util-map-figure">
        <img
          src="images/utilidades/distritos-ea.png"
          width="960"
          height="720"
          alt="Mapa de España con los nueve distritos de indicativos EA1 a EA9, incluyendo Baleares, Canarias, Ceuta y Melilla"
          loading="lazy"
          decoding="async"
        />
        <figcaption>Distritos EA · referencia URE</figcaption>
      </figure>
      <div class="util-district-grid">${districtCards}</div>
    </section>
    <aside class="panel util-panel util-panel--aside" aria-labelledby="util-practice-title">
      <h2 id="util-practice-title">Relación con el examen</h2>
      <p>
        Estas tablas son material de consulta rápida. En <strong>Practicar</strong> y <strong>Examen</strong> priorizamos
        preguntas de electricidad, radio y normativa del servicio de aficionados.
      </p>
      <p class="muted">
        Las preguntas de primeros auxilios o señalización del banco histórico solo aparecen si practicas el bloque
        <strong>Operación, emergencias y buenas prácticas</strong>.
      </p>
      <a class="btn btn--primary btn--sm" href="#practicar" data-nav="practicar">Ir a practicar</a>
      <a class="btn btn--ghost btn--sm" href="#temario--operacion-seguridad" data-nav="temario">Temario · operación</a>
    </aside>
  `;
}

function renderExamReadiness() {
  const root = $("#exam-readiness-root");
  if (!root) return;
  const { entries, activeEntries, highSecurity, readiness } = coachSnapshot();
  root.innerHTML = `
    <div class="exam-coach__head">
      <div>
        <h2 id="exam-readiness-title">Preparación para examen</h2>
        <p>Simula cada prueba y usa el indicador para decidir si estás listo o si conviene cerrar errores antes.</p>
      </div>
    </div>
    <div class="exam-coach__metrics" aria-label="Resumen de preparación">
      <span><strong>${entries.length}</strong> pregunta(s) en cuaderno</span>
      <span><strong>${activeEntries.length}</strong> error(es) pendiente(s)</span>
      <span><strong>${highSecurity}</strong> fallo(s) con seguridad alta</span>
    </div>
    <section class="exam-readiness" aria-label="Indicador de preparación por prueba">
      <h3>Indicador por prueba</h3>
      <div class="exam-readiness__grid">${renderReadinessCards(readiness)}</div>
    </section>
    <div class="exam-coach__actions">
      <button type="button" class="btn btn--primary btn--hero-action" data-exam-start="1">Simulacro 1.ª prueba</button>
      <button type="button" class="btn btn--primary btn--hero-action" data-exam-start="2">Simulacro 2.ª prueba</button>
      <a class="btn btn--ghost" href="#cuaderno" data-nav="cuaderno">Ver cuaderno</a>
    </div>
  `;

  root.querySelectorAll("[data-exam-start]").forEach((button) => {
    button.addEventListener("click", () => startExamSimulation(button.getAttribute("data-exam-start") === "2" ? "2" : "1"));
  });
}

function renderErrorNotebook() {
  const root = $("#error-notebook-root");
  if (!root) return;
  const { entries, activeEntries, highSecurity, topTopics, plan, recent } = coachSnapshot();
  const empty =
    entries.length === 0
      ? `<div class="empty-state empty-state--coach">
          <strong>Tu cuaderno todavía está limpio.</strong>
          <p>Haz una sesión en Practicar. Cuando falles, aquí aparecerán errores activos, fallos con seguridad alta y temas prioritarios.</p>
          <a class="btn btn--primary btn--sm" href="#practicar" data-nav="practicar">Crear primeros datos</a>
        </div>`
      : "";
  const topicsHtml = topTopics.length
    ? topTopics
        .map((row) => {
          const acc = row.accuracy === null ? "sin precisión aún" : `${row.accuracy} % aciertos`;
          return `<li>
            <strong>${escapeHtml(row.title)}</strong>
            <span>${escapeHtml(acc)} · ${row.activeErrors} error(es) activo(s) · ${row.highSecurityWrongCount} fallo(s) con seguridad alta</span>
            <button type="button" class="btn btn--ghost btn--sm" data-coach-topic="${escapeHtml(row.topicId)}">Preparar sesión</button>
          </li>`;
        })
        .join("")
    : `<li><strong>Sin temas priorizados todavía</strong><span>Haz una sesión de estudio para generar diagnóstico.</span></li>`;
  const planTopicButton = plan.topicId
    ? `<button type="button" class="btn btn--primary btn--sm" data-coach-topic="${escapeHtml(plan.topicId)}">Practicar prioridad</button>`
    : "";
  const smartButton = `<button type="button" class="btn btn--primary btn--sm" id="error-notebook-smart">Repaso inteligente</button>`;
  const recentHtml = recent.length
    ? recent
        .map((entry) => {
          const topic = topicBlockLabel(entry.topicId);
          const status = isActiveError(entry) ? "pendiente" : "en mejora";
          return `<li>
            <strong>${escapeHtml(entry.stem.slice(0, 110))}${entry.stem.length > 110 ? "…" : ""}</strong>
            <span>${escapeHtml(topic)} · ${escapeHtml(status)} · fallos: ${entry.wrongCount || 0}</span>
          </li>`;
        })
        .join("")
    : `<li><span>Sin errores recientes guardados.</span></li>`;

  root.innerHTML = `
    <div class="exam-coach__head">
      <div>
        <h2 id="error-notebook-title">Cuaderno y repaso inteligente</h2>
        <p>Diagnóstico local basado en tus fallos, aciertos posteriores y seguridad marcada.</p>
      </div>
      <button type="button" class="btn btn--ghost btn--sm" id="error-notebook-clear" ${entries.length ? "" : "disabled"}>Vaciar cuaderno</button>
    </div>
    <div class="exam-coach__metrics" aria-label="Resumen del cuaderno de errores">
      <span><strong>${entries.length}</strong> pregunta(s) en cuaderno</span>
      <span><strong>${activeEntries.length}</strong> pendiente(s)</span>
      <span><strong>${highSecurity}</strong> fallo(s) con seguridad alta</span>
    </div>
    ${empty}
    <div class="exam-coach__grid">
      <section>
        <h3>Diagnóstico por tema</h3>
        <ul class="exam-coach__topic-list">${topicsHtml}</ul>
      </section>
      <section>
        <h3>${escapeHtml(plan.title)}</h3>
        <ol class="exam-coach__steps">${plan.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
        <div class="exam-coach__actions">${smartButton}${planTopicButton}</div>
      </section>
    </div>
    <details class="exam-coach__notebook">
      <summary>Cuaderno de errores reciente</summary>
      <ul>${recentHtml}</ul>
    </details>
  `;

  root.querySelectorAll("[data-coach-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      const topicId = button.getAttribute("data-coach-topic") || "all";
      preparePracticeTopic(topicId);
    });
  });

  root.querySelector("#error-notebook-clear")?.addEventListener("click", async () => {
    if (
      !(await showAppConfirm({
        title: "¿Vaciar el cuaderno?",
        message: "Se eliminarán todos los errores activos del cuaderno. No borra estadísticas globales ni tarjetas.",
        confirmLabel: "Vaciar cuaderno",
        danger: true,
      }))
    ) {
      return;
    }
    saveErrorNotebook({});
    renderExamCoach();
  });

  root.querySelector("#error-notebook-smart")?.addEventListener("click", startSmartReviewSession);
}

function renderExamCoach() {
  renderHeaderStatus();
  renderExamReadiness();
  renderErrorNotebook();
}

function selectedQuizTopicForGuide() {
  const part = $("#quiz-part")?.value || "1";
  const topic = $("#quiz-topic")?.value || "all";
  if (topic === "all" || !topicBelongsToPart(topic, part)) return "all";
  return topic;
}

function renderQuizPracticeGuide() {
  const root = $("#quiz-practice-guide");
  if (!root) return;
  const topic = selectedQuizTopicForGuide();
  const part = $("#quiz-part")?.value || "1";
  const trapOnly = !!$("#quiz-trap-only")?.checked;
  const trapCount = trapOnly
    ? buildQuestionList(allQuestions, part, "libre", topic, allQuestions.length, TRAP_QUESTION_IDS).length
    : 0;
  const generic = [
    "Si eres nuevo, no cambies todo: elige una parte, un tema y deja el modo Estudio · corrección inmediata.",
    "Responde sin mirar apuntes y corrige con calma: primero entiende por qué la opción correcta encaja.",
    "Cuando falles, vuelve al bloque correspondiente del Temario y escribe la regla en una frase.",
    "Cuando quieras subir dificultad, activa preguntas trampa, falladas o usa Examen para simular sin pistas.",
  ];
  const title = topic === "all" ? "Práctica guiada · todos los temas" : `Práctica guiada · ${topicBlockLabel(topic)}`;
  const items = topic === "all" ? generic : topicStudy[topic]?.practiceDrills || generic;
  const topicLink =
    topic === "all"
      ? ""
      : `<a class="btn btn--ghost btn--sm" href="#temario--${encodeURIComponent(topic)}">Ver teoría de este tema</a>`;

  root.innerHTML = `
    <div class="quiz-practice-guide__head">
      <div>
        <h2>${escapeHtml(title)}</h2>
        <p><strong>Practicar</strong> es para entrenar, no para perderse entre opciones: test → explicación → refuerzo en Temario → repetición.</p>
        <p class="muted">Banco: ${allQuestions.length} preguntas (${BANCO_STATS.withFigure ?? 0} con figura original). Cribado: ${BANCO_STATS.cribadoPreferred ?? "?"} entradas únicas por enunciado. Las de primeros auxilios del banco histórico solo entran si eliges el tema <strong>Operación, emergencias y buenas prácticas</strong> (<a href="#utilidades" data-nav="utilidades">consulta en Utilidades</a>).</p>
        ${
          trapOnly
            ? `<p><strong>Modo preguntas trampa activo:</strong> distractores típicos (${trapCount} con filtros actuales).</p>`
            : ""
        }
      </div>
      ${topicLink}
    </div>
    <ol class="quiz-practice-guide__list">
      ${items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}
    </ol>
  `;
}

function bumpTopicQuizStatIfNew(q, selectedIndex, isCorrect) {
  if (quizState.mode !== "study") return;
  if (quizState._statsCounted.has(q.id)) return;
  quizState._statsCounted.add(q.id);
  recordQuestionOutcome(q, selectedIndex, isCorrect);
  const stats = loadTopicQuizStats();
  const cur = stats[q.topicId] || { t: 0, ok: 0 };
  cur.t += 1;
  if (isCorrect) cur.ok += 1;
  stats[q.topicId] = cur;
  try {
    localStorage.setItem(QUIZ_TOPIC_STATS_KEY, JSON.stringify(stats));
  } catch {
    /* ignore */
  }
  mutateUserStats((glob) => {
    glob.studyLifetimeGrades += 1;
    glob.seenQuestionIds[q.id] = 1;
  });
}

function announceQuizQuestion(q, index, total) {
  const ann = $("#quiz-announce");
  if (!ann) return;
  const title = topicBlockLabel(q.topicId);
  ann.textContent = `Pregunta ${index + 1} de ${total}. Tema: ${title}. Parte ${q.part}.`;
}

function quizAreaActive() {
  const area = $("#quiz-area");
  const view = $("#view-practicar");
  return !!(area && view && !area.hidden && !view.hidden);
}

function setQuizFocusMode(on) {
  const view = $("#view-practicar");
  const btn = $("#quiz-focus-toggle");
  view?.classList.toggle("is-focus-mode", !!on);
  document.body.classList.toggle("quiz-focus-active", !!on);
  if (btn instanceof HTMLButtonElement) {
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.textContent = on ? "Salir foco" : "Modo foco";
    btn.setAttribute("aria-label", on ? "Salir del modo foco" : "Entrar en modo foco");
  }
}

function toggleQuizFocusMode() {
  const view = $("#view-practicar");
  setQuizFocusMode(!view?.classList.contains("is-focus-mode"));
}

function initQuizKeyboard() {
  document.addEventListener("keydown", (e) => {
    if (!quizAreaActive() || quizState._finished) return;
    const ae = document.activeElement;
    if (
      ae &&
      (ae instanceof HTMLTextAreaElement ||
        (ae instanceof HTMLInputElement && (ae.type === "text" || ae.type === "search" || ae.type === "number")))
    ) {
      return;
    }
    const q = currentQ();
    if (!q) return;
    const key = e.key;
    if (key === "ArrowRight" || key === "ArrowDown" || key === "n" || key === "N") {
      if (!e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        finishOrAdvanceQuiz();
      }
      return;
    }
    if (key === "ArrowLeft" || key === "ArrowUp" || key === "p" || key === "P") {
      if (!e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        goPrev();
      }
      return;
    }
    if (/^[1-9]$/.test(key)) {
      const idx = Number.parseInt(key, 10) - 1;
      if (idx >= 0 && idx < q.options.length && quizState.optionsVisible) {
        const inp = document.querySelector(`#quiz-question input[name="opt"][value="${idx}"]`);
        if (inp instanceof HTMLInputElement) {
          e.preventDefault();
          inp.checked = true;
          inp.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    }
  });
}

function initTemarioFilter() {
  const inp = $("#temario-filter");
  const weakOnly = $("#temario-weak-only");
  const root = $("#temario-root");
  if (!(inp instanceof HTMLInputElement) || !root) return;
  const apply = () => {
    const qv = inp.value.trim().toLowerCase();
    const onlyWeak = weakOnly instanceof HTMLInputElement && weakOnly.checked;
    root.querySelectorAll(".temario-block").forEach((li) => {
      const hay = (li.getAttribute("data-temario-search") || "").toLowerCase();
      const matchesText = qv.length === 0 || hay.includes(qv);
      const matchesWeak = !onlyWeak || li.getAttribute("data-progress-state") === "weak";
      li.hidden = !matchesText || !matchesWeak;
    });
  };
  inp.addEventListener("input", apply);
  weakOnly?.addEventListener("change", apply);
}

function getFcDisplayMode() {
  const v = $("#fc-display-mode")?.value;
  if (v === "front_only" || v === "both") return v;
  return "flip";
}

function updateFlashcardWrapMode() {
  const wrap = document.querySelector(".flashcard-wrap");
  if (!wrap) return;
  wrap.classList.remove("fc-mode--front-only", "fc-mode--both");
  const m = getFcDisplayMode();
  if (m === "front_only") wrap.classList.add("fc-mode--front-only");
  if (m === "both") wrap.classList.add("fc-mode--both");
}

function updateScheduleDetail() {
  const el = $("#fc-schedule-detail");
  if (!el) return;
  const sched = loadSchedule();
  const pool = flashQuestionPool();
  const now = Date.now();
  const day = 86400000;
  let due0 = 0;
  let due3 = 0;
  let later = 0;
  let none = 0;
  for (const q of pool) {
    const s = sched[q.id];
    if (!s || !s.due) {
      none += 1;
      continue;
    }
    if (s.due <= now) due0 += 1;
    else if (s.due <= now + 3 * day) due3 += 1;
    else later += 1;
  }
  el.textContent = `Programación (mazo filtrado): ${due0} vencidas o sin cita · ${due3} en las próximas 72 h · ${later} más adelante · ${none} sin fecha de repaso guardada.`;
}

function quizFeedbackTemarioHint(q) {
  const href = `#temario--${encodeURIComponent(q.topicId)}`;
  const label = topicBlockLabel(q.topicId);
  return `<p class="quiz-fb-hint muted"><strong>Contexto:</strong> amplía en el bloque «${escapeHtml(label)}» del <a href="${href}">temario</a> (ganchos y viñetas de estudio).</p>`;
}

/** Explicación didáctica usable (sin plantillas genéricas ni LF/RST mal asignados). */
function usablePedagogy(q) {
  const p = pedagogicalExplain(q);
  if (!p || isGenericExplainText(p) || isMisassignedPedagogicalExplain(q)) return "";
  if (isStemExplainTopicConflict(p, q.stem)) return "";
  return p;
}

function fallbackReasoningForQuestion(q, sel) {
  const ok = sel === q.correctIndex;
  const correct =
    Array.isArray(q.options) && q.options[q.correctIndex] !== undefined
      ? String(q.options[q.correctIndex])
      : "";
  if (ok && correct) {
    return `La opción «${correct}» responde al enunciado. Revisa el temario del bloque «${topicBlockLabel(q.topicId)}» para fijar la regla o el dato que la justifica.`;
  }
  if (correct) {
    return `La opción correcta es «${correct}». Contrasta con el temario del bloque «${topicBlockLabel(q.topicId)}» y con la normativa oficial si el enunciado es reglamentario.`;
  }
  return "Revisa el temario del bloque y la normativa oficial para fijar la regla que resuelve este enunciado.";
}

/** Panel post-respuesta: explicación didáctica + nota histórica (si existe) + enlaces a temario. */
function renderDeepenPanel(q, reasoningPlain = "") {
  const blockTitle = topicBlockLabel(q.topicId);
  const temarioHref = `#temario--${encodeURIComponent(q.topicId)}`;
  const ureHref =
    q.part === 1
      ? "https://www.ure.es/examenes/electricidad-y-radioelectricidad/"
      : "https://www.ure.es/legislacion-y-reglamentacion/";
  const ureLinkText =
    q.part === 1 ? "URE · Material de práctica (electricidad y radioelectricidad)" : "URE · Legislación y reglamentación";
  const normativaHref = "#normativa--normativa-boe";
  const pedagogy = usablePedagogy(q);
  const historical =
    typeof q.explainSourceNote === "string" && q.explainSourceNote.trim() ? q.explainSourceNote.trim() : "";
  const norm = (t) =>
    String(t || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  const showPedagogy = pedagogy && norm(pedagogy) !== norm(reasoningPlain);
  const links = `<ul class="quiz-deepen__links">
      <li><a href="${temarioHref}">Temario · ${escapeHtml(blockTitle)}</a></li>
      <li><a href="${ureHref}" rel="noopener noreferrer">${escapeHtml(ureLinkText)}</a></li>
      <li><a href="${normativaHref}">Normativa BOE</a></li>
    </ul>`;
  if (!showPedagogy && !historical) {
    return `<div class="quiz-deepen quiz-deepen--links-only"><p class="quiz-deepen__note">Amplía en el temario y contrasta con fuentes oficiales:</p>${links}</div>`;
  }
  return `<div class="quiz-deepen">
    ${showPedagogy ? `<p class="quiz-deepen__note"><strong>Ampliación:</strong></p><blockquote class="quiz-deepen__exact"><p>${escapeHtml(pedagogy)}</p></blockquote>` : ""}
    ${
      historical
        ? `<details class="quiz-deepen__hist"><summary>Origen de la pregunta (banco histórico)</summary><p class="muted">${escapeHtml(historical)}</p></details>`
        : ""
    }
    <p class="quiz-deepen__note">Fuentes para contrastar:</p>${links}
  </div>`;
}

function focusConfidencePicker() {
  const picker = document.getElementById("quiz-confidence");
  if (!picker) return;
  picker.scrollIntoView({ behavior: "smooth", block: "center" });
  const first = picker.querySelector("[data-conf]");
  if (first instanceof HTMLButtonElement) {
    first.focus({ preventScroll: true });
  }
}

function confidenceCalibrationLine(q, sel, confLevel) {
  const ok = sel === q.correctIndex;
  const labels = ["baja", "media", "alta"];
  const lab = labels[confLevel] ?? "media";
  if (ok && confLevel === 2) {
    return `<p class="conf-cal conf-cal--ok"><strong>Concepto consolidado:</strong> acertaste con seguridad ${lab}. Mantén esta pregunta en repasos espaciados, pero no es prioridad.</p>`;
  }
  if (!ok && confLevel === 2) {
    return `<p class="conf-cal conf-cal--warn"><strong>Prioridad máxima de repaso:</strong> fallaste con seguridad ${lab}. Revisa el bloque del temario y convierte el error en una regla corta.</p>`;
  }
  if (ok && confLevel === 0) {
    return `<p class="conf-cal conf-cal--ok"><strong>Acierto frágil:</strong> acertaste con seguridad ${lab}. Lee la explicación y fija por qué la opción correcta encaja.</p>`;
  }
  if (!ok && confLevel === 0) {
    return `<p class="conf-cal"><strong>Hueco detectado:</strong> fallaste con seguridad ${lab}. Usa la explicación para construir la regla básica antes de repetir tests.</p>`;
  }
  if (ok) {
    return `<p class="conf-cal conf-cal--ok"><strong>Buen avance:</strong> acertaste con seguridad ${lab}. Refuerza la explicación para subirla a seguridad alta.</p>`;
  }
  return `<p class="conf-cal conf-cal--warn"><strong>Repaso recomendado:</strong> fallaste con seguridad ${lab}. Vuelve al concepto y repite una pregunta parecida.</p>`;
}

function correctAnswerParagraph(q) {
  const t =
    Array.isArray(q.options) && typeof q.correctIndex === "number" && q.options[q.correctIndex] !== undefined
      ? String(q.options[q.correctIndex])
      : "";
  if (!t) return "";
  return `<p class="quiz-fb-correct"><strong>Respuesta correcta:</strong> ${escapeHtml(t)}</p>`;
}

function selectedAnswerParagraph(q, sel) {
  const t = Array.isArray(q.options) && typeof sel === "number" && q.options[sel] !== undefined ? String(q.options[sel]) : "";
  if (!t) return "";
  return `<p class="quiz-fb-selected"><strong>Tu respuesta:</strong> ${escapeHtml(t)}</p>`;
}

function buildAnswerReasoningDetail(q, sel) {
  const optionExplanations = Array.isArray(q.optionExplanations) ? q.optionExplanations : [];
  const selectedExplanation = typeof optionExplanations[sel] === "string" ? optionExplanations[sel].trim() : "";
  const correctExplanation =
    typeof optionExplanations[q.correctIndex] === "string" ? optionExplanations[q.correctIndex].trim() : "";
  const pedagogy = usablePedagogy(q);
  const correctText =
    Array.isArray(q.options) && q.options[q.correctIndex] !== undefined ? String(q.options[q.correctIndex]) : "";
  if (sel === q.correctIndex) {
    return correctExplanation || pedagogy || fallbackReasoningForQuestion(q, sel);
  }
  const whyCorrect =
    correctExplanation ||
    pedagogy ||
    (correctText
      ? `La opción correcta es «${correctText}». Revisa el temario del bloque para la regla que la distingue del distractor marcado.`
      : "Revisa el temario del bloque para la regla que distingue la opción correcta del distractor marcado.");
  return whyCorrect;
}

function answerReasoningPanel(q, sel) {
  const optionExplanations = Array.isArray(q.optionExplanations) ? q.optionExplanations : [];
  const selectedExplanation = typeof optionExplanations[sel] === "string" ? optionExplanations[sel].trim() : "";
  const selectedText = Array.isArray(q.options) && q.options[sel] !== undefined ? String(q.options[sel]) : "";
  if (sel === q.correctIndex) {
    const detail = buildAnswerReasoningDetail(q, sel);
    return `<div class="quiz-fb-reasoning"><p><strong>Por qué encaja:</strong> ${escapeHtml(detail)}</p></div>`;
  }
  const whyWrong =
    selectedExplanation ||
    "No encaja con el criterio del enunciado. En las preguntas tipo test, el distractor suele cambiar una unidad, una relación, un organismo, una etapa del circuito o el sentido de la definición.";
  const whyCorrect = buildAnswerReasoningDetail(q, q.correctIndex);
  return `<div class="quiz-fb-reasoning">
    ${selectedText ? `<p><strong>Por qué no encaja tu opción:</strong> ${escapeHtml(whyWrong)}</p>` : ""}
    <p><strong>Por qué encaja la correcta:</strong> ${escapeHtml(whyCorrect)}</p>
  </div>`;
}

/** Texto `explain` del banco, siempre en bloque etiquetado (acierto o error). */
function quizFeedbackExplainParagraph(q) {
  const raw = typeof q.explain === "string" ? q.explain.trim() : "";
  const pedagogy = usablePedagogy(q);
  if (pedagogy) {
    return `<p class="quiz-fb-explain"><strong>Explicación:</strong> ${escapeHtml(pedagogy)}</p>${quizFeedbackTemarioHint(q)}`;
  }
  if (!raw) {
    return `<p class="quiz-fb-explain muted"><strong>Explicación:</strong> No hay texto de explicación registrado en el banco para este ítem.</p>${quizFeedbackTemarioHint(q)}`;
  }
  if (
    isGenericExplainText(raw) ||
    isMisassignedPedagogicalExplain(q) ||
    (raw && isStemExplainTopicConflict(raw, q.stem))
  ) {
    const rebuilt = buildBestExplain(q);
    if (rebuilt && !isGenericExplainText(rebuilt) && !isStemExplainTopicConflict(rebuilt, q.stem)) {
      return `<p class="quiz-fb-explain"><strong>Explicación:</strong> ${escapeHtml(rebuilt)}</p>${quizFeedbackTemarioHint(q)}`;
    }
    const gen = generatePedagogicalExplain(q);
    if (gen && !isGenericExplainText(gen) && !isStemExplainTopicConflict(gen, q.stem)) {
      return `<p class="quiz-fb-explain"><strong>Explicación:</strong> ${escapeHtml(gen)}</p>${quizFeedbackTemarioHint(q)}`;
    }
    return `<p class="quiz-fb-explain"><strong>Explicación:</strong> ${escapeHtml(fallbackReasoningForQuestion(q, q.correctIndex))}</p>${quizFeedbackTemarioHint(q)}`;
  }
  if (isTemplateOnlyExplain(raw)) {
    return `<p class="quiz-fb-explain muted"><strong>Explicación:</strong> Pregunta de banco histórico (FEDI/Quijotes) sin desarrollo didáctico en el original. Contrasta la respuesta correcta con el temario del bloque «${escapeHtml(topicBlockLabel(q.topicId))}».</p>${quizFeedbackTemarioHint(q)}`;
  }
  const sourceOnly = /^fuente\s*:/i.test(raw) && raw.length < 360;
  return (
    `<p class="quiz-fb-explain"><strong>Explicación:</strong> ${escapeHtml(raw)}</p>` +
    (sourceOnly ? quizFeedbackTemarioHint(q) : "")
  );
}

function abbreviationTextForQuestion(q) {
  const bits = [
    q.stem,
    q.explain,
    ...(Array.isArray(q.options) ? q.options : []),
    ...(Array.isArray(q.optionExplanations) ? q.optionExplanations : []),
  ];
  return bits.filter((x) => typeof x === "string").join(" ");
}

/** No repetir abreviatura si el feedback ya la desarrolla (p. ej. «FI significa…»). */
function abbreviationAlreadyExplainedIn(text, abbr, meaning) {
  if (!text || !abbr) return false;
  const escaped = abbr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`${escaped}\\s*(significa|significa que|=|es)\\s*`, "iu").test(text)) return true;
  const core = meaning
    .replace(/^[^:]+:\s*/, "")
    .split(/[.;]/)[0]
    .trim()
    .toLowerCase();
  if (core.length >= 12 && text.toLowerCase().includes(core.slice(0, Math.min(48, core.length)))) return true;
  return false;
}

function questionAbbreviationPanel(q, visibleFeedbackText = "") {
  const text = abbreviationTextForQuestion(q);
  if (!text.trim()) return "";
  const skipDup = [visibleFeedbackText, typeof q.explain === "string" ? q.explain : ""].filter(Boolean).join(" ");
  const matches = [];
  for (const [abbr, meaning] of ABBREVIATION_GLOSSARY) {
    const escaped = abbr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, "u");
    if (!re.test(text)) continue;
    if (abbreviationAlreadyExplainedIn(skipDup, abbr, meaning)) continue;
    matches.push([abbr, meaning]);
  }
  if (!matches.length) return "";
  return `<div class="abbr-hints" aria-label="Abreviaturas de esta pregunta">
    <strong>Abreviaturas:</strong>
    <ul>
      ${matches
        .map(([abbr, meaning]) => `<li><span>${escapeHtml(abbr)}</span>${escapeHtml(meaning)}</li>`)
        .join("")}
    </ul>
  </div>`;
}

function showStudyFeedback(q) {
  const sel = quizState.answers[q.id];
  const fb = $("#quiz-feedback");
  if (sel === null || sel === undefined) {
    fb.textContent = "";
    return;
  }
  if (quizState.mode === "study" && quizState.studyFeedback === "confidence" && quizState.confidence[q.id] === undefined) {
    fb.textContent = "";
    return;
  }
  const ok = sel === q.correctIndex;
  if (quizState.mode === "study") {
    bumpTopicQuizStatIfNew(q, sel, ok);
  }
  const cal =
    quizState.studyFeedback === "confidence" && quizState.confidence[q.id] !== undefined
      ? confidenceCalibrationLine(q, sel, quizState.confidence[q.id])
      : "";
  const label = `<p class="feedback__eyebrow">Corrección</p>`;
  const reasoning = answerReasoningPanel(q, sel);
  const explainBlock = quizFeedbackExplainParagraph(q);
  const visibleForAbbr = [reasoning, explainBlock, quizState.studyFeedback === "deepen" ? String(q.explain || "") : ""]
    .filter(Boolean)
    .join(" ");
  const abbr = questionAbbreviationPanel(q, visibleForAbbr);
  if (quizState.studyFeedback === "deepen") {
    const lead = ok
      ? `<p class="quiz-fb-lead"><strong>Correcto.</strong></p>`
      : `<p class="quiz-fb-lead"><strong>Incorrecto.</strong></p>${selectedAnswerParagraph(q, sel)}${correctAnswerParagraph(q)}`;
    fb.innerHTML = label + lead + reasoning + renderDeepenPanel(q, buildAnswerReasoningDetail(q, sel)) + abbr + cal;
    return;
  }
  fb.innerHTML = label + (ok
    ? `<p class="quiz-fb-lead"><strong>Correcto.</strong></p>${reasoning}${explainBlock}${abbr}`
    : `<p class="quiz-fb-lead"><strong>Incorrecto.</strong></p>${selectedAnswerParagraph(q, sel)}${correctAnswerParagraph(q)}${reasoning}${explainBlock}${abbr}`) + cal;
}

function calibrationSessionSummary() {
  if (quizState.mode !== "study" || quizState.studyFeedback !== "confidence") return "";
  let hiOk = 0;
  let hiWrong = 0;
  let medOk = 0;
  let medWrong = 0;
  let loOk = 0;
  let loWrong = 0;
  for (const qq of quizState.list) {
    const sel = quizState.answers[qq.id];
    if (sel === null || sel === undefined) continue;
    const c = quizState.confidence[qq.id];
    if (c === undefined) continue;
    const correct = sel === qq.correctIndex;
    if (c === 2) {
      if (correct) hiOk += 1;
      else hiWrong += 1;
    } else if (c === 1) {
      if (correct) medOk += 1;
      else medWrong += 1;
    } else {
      if (correct) loOk += 1;
      else loWrong += 1;
    }
  }
  const bits = [];
  if (hiOk + hiWrong > 0) bits.push(`alta: ${hiOk}✓ / ${hiWrong}✗`);
  if (medOk + medWrong > 0) bits.push(`media: ${medOk}✓ / ${medWrong}✗`);
  if (loOk + loWrong > 0) bits.push(`baja: ${loOk}✓ / ${loWrong}✗`);
  if (!bits.length) return "";
  return `<p class="muted conf-summary"><strong>Resumen de seguridad (sesión):</strong> ${bits.join(" · ")}.</p>`;
}

function quizMissingConfidenceCount() {
  if (quizState.mode !== "study" || quizState.studyFeedback !== "confidence") return 0;
  return quizState.list.filter((qq) => {
    const sel = quizState.answers[qq.id];
    return sel !== null && sel !== undefined && quizState.confidence[qq.id] === undefined;
  }).length;
}

function wrongTopicSummary(wrong) {
  if (!wrong.length) return "";
  const counts = new Map();
  for (const q of wrong) {
    const title = topicBlockLabel(q.topicId);
    counts.set(title, (counts.get(title) || 0) + 1);
  }
  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return `
    <div class="result-topic-summary">
      <strong>Fallos por bloque</strong>
      <ul>
        ${rows.map(([title, n]) => `<li><span>${escapeHtml(title)}</span><strong>${n}</strong></li>`).join("")}
      </ul>
    </div>`;
}

function resultNextActionPanel(good, total, wrong) {
  const pct = total ? Math.round((good / total) * 100) : 0;
  const firstWrong = wrong.find((q) => q && q.topicId);
  const topicHref = firstWrong ? `#temario--${encodeURIComponent(firstWrong.topicId)}` : "#temario";
  const topicLabel = firstWrong ? topicBlockLabel(firstWrong.topicId) : "Temario";
  if (wrong.length > 0) {
    const title = pct >= 50 ? "Buen punto de partida: cierra fallos antes de seguir" : "Prioridad: vuelve a base y repite falladas";
    const text =
      wrong.length === 1
        ? "Solo queda 1 pregunta por corregir. Revísala ahora para que no se convierta en fallo repetido."
        : `Hay ${wrong.length} pregunta(s) para repasar. Lo más rentable es repetir falladas y volver al bloque débil.`;
    return `
      <div class="result-next">
        <p class="feedback__eyebrow">Siguiente acción</p>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
        <div class="result-next__actions">
          <button type="button" class="btn btn--primary btn--sm" data-result-repeat-wrong>Repetir falladas</button>
          <a class="btn btn--ghost btn--sm" href="${escapeHtml(topicHref)}">Ver teoría · ${escapeHtml(topicLabel)}</a>
          <a class="btn btn--ghost btn--sm" href="#cuaderno" data-nav="cuaderno">Abrir cuaderno</a>
        </div>
      </div>`;
  }
  if (quizState.sessionType === "teorico" && quizState.mode === "exam") {
    return `
      <div class="result-next result-next--ok">
        <p class="feedback__eyebrow">Siguiente acción</p>
        <h3>Simulacro limpio: mide la otra prueba o conserva ritmo</h3>
        <p>Si esta prueba ya sale fuerte, pasa a la otra parte o usa tarjetas para mantener memoria sin saturarte.</p>
        <div class="result-next__actions">
          <a class="btn btn--primary btn--sm" href="#examen" data-nav="examen">Ir a Examen</a>
          <a class="btn btn--ghost btn--sm" href="#tarjetas" data-nav="tarjetas">Repasar tarjetas</a>
        </div>
      </div>`;
  }
  return `
    <div class="result-next result-next--ok">
      <p class="feedback__eyebrow">Siguiente acción</p>
      <h3>Sesión limpia: sube dificultad</h3>
      <p>Activa preguntas trampa, cambia de bloque o mide nivel con un simulacro sin pistas.</p>
      <div class="result-next__actions">
        <a class="btn btn--primary btn--sm" href="#examen" data-nav="examen">Hacer simulacro</a>
        <a class="btn btn--ghost btn--sm" href="#practicar" data-nav="practicar">Otra práctica</a>
      </div>
    </div>`;
}

function bindResultActions() {
  $("#quiz-feedback")?.querySelector("[data-result-repeat-wrong]")?.addEventListener("click", () => {
    const wrongEl = $("#quiz-wrong-only");
    const trapEl = $("#quiz-trap-only");
    const modeEl = $("#quiz-mode");
    const sessionEl = $("#quiz-session");
    if (wrongEl instanceof HTMLInputElement) wrongEl.checked = true;
    if (trapEl instanceof HTMLInputElement) trapEl.checked = false;
    if (modeEl instanceof HTMLSelectElement) modeEl.value = "study";
    if (sessionEl instanceof HTMLSelectElement) sessionEl.value = "libre";
    saveQuizPrefs();
    startQuiz();
    requestAnimationFrame(() => {
      $("#quiz-area")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function finishQuiz() {
  if (quizState._finished) return;
  clearQuizDraft();
  renderQuizResumePanel();
  saveLastWrongIds(computeWrongIdsFromCurrentSession());
  quizState._finished = true;
  clearExamTimer();
  let good = 0;
  const wrong = [];
  quizState.list.forEach((q) => {
    const sel = quizState.answers[q.id];
    if (sel === null || sel === undefined) {
      wrong.push(q);
      if (quizState.mode === "exam") recordQuestionOutcome(q, -1, false);
      return;
    }
    const correct = sel === q.correctIndex;
    if (quizState.mode === "exam") recordQuestionOutcome(q, sel, correct);
    if (correct) good += 1;
    else wrong.push(q);
  });
  const total = quizState.list.length;
  const pct = total ? Math.round((good / total) * 100) : 0;
  const isT = quizState.sessionType === "teorico";
  const minPass = Math.ceil(total / 2);
  const pass = isT && good >= minPass;
  const partsInSession = new Set(quizState.list.map((q) => q.part));
  const partKey =
    isT && partsInSession.size === 1 ? ([...partsInSession][0] === 2 ? "p2" : "p1") : null;
  if (total > 0) {
    mutateUserStats((s) => {
      s.gradedSessionsClosed += 1;
      s.gradedCorrectSum += good;
      s.gradedTotalSum += total;
      if (!s.gradedByPart) {
        s.gradedByPart = { p1: { sessions: 0, passed: 0 }, p2: { sessions: 0, passed: 0 } };
      }
      if (partKey) {
        const partStats = s.gradedByPart[partKey] || { sessions: 0, passed: 0 };
        partStats.sessions += 1;
        if (pass) partStats.passed += 1;
        s.gradedByPart[partKey] = partStats;
      }
      for (const qq of quizState.list) {
        s.seenQuestionIds[qq.id] = 1;
      }
    });
  }
  const verdict = isT
    ? `<div class="result-verdict ${pass ? "result-verdict--ok" : "result-verdict--fail"}">${pass ? "APTO" : "NO APTO"} · ${good}/${total} (mínimo ${minPass} para 50 %)</div>
       <p class="muted" style="margin:0.5rem 0 0;font-size:0.88rem">Criterio orientativo como en convocatorias habituales; revisa siempre las bases oficiales del examen.</p>`
    : "";
  const timeMsg =
    quizState.timedOut && isT && quizState.mode === "exam"
      ? `<p><strong>Tiempo agotado</strong> (límite ${formatCountdown(TEORICO_EXAM_MS)}).</p>`
      : "";
  const unanswered = wrong.filter(
    (q) => quizState.answers[q.id] === null || quizState.answers[q.id] === undefined,
  );
  const wrongAnswered = wrong.filter(
    (q) => quizState.answers[q.id] !== null && quizState.answers[q.id] !== undefined,
  );
  let wrongListHtml = "";
  if (isT) {
    if (wrongAnswered.length) {
      wrongListHtml = `<br/><br/><strong>Falladas:</strong><ul style="margin:0.5rem 0 0 1.1rem">${wrongAnswered
        .map((qq) => `<li>${escapeHtml(qq.stem.slice(0, 140))}${qq.stem.length > 140 ? "…" : ""}</li>`)
        .join("")}</ul>`;
    }
    if (unanswered.length) {
      wrongListHtml += `<br/><strong>Sin marcar respuesta:</strong> ${unanswered.length} (cuentan como error).`;
    }
  } else if (wrong.length) {
    wrongListHtml = `<br/><br/><strong>Repasar:</strong><ul style="margin:0.5rem 0 0 1.1rem">${wrong
      .map((qq) => `<li>${escapeHtml(qq.stem.slice(0, 120))}${qq.stem.length > 120 ? "…" : ""}</li>`)
      .join("")}</ul>`;
  }
  $("#quiz-feedback").innerHTML = `
    ${timeMsg}
    <strong>Resultado:</strong> ${good} / ${total} (${pct} %).
    ${verdict}
    ${wrongTopicSummary(wrong)}
    ${wrongListHtml}
    ${calibrationSessionSummary()}
    ${resultNextActionPanel(good, total, wrong)}`;
  bindResultActions();
  $("#quiz-score").hidden = false;
  $("#quiz-score").textContent = `${good}/${total}`;
  showSaveToast("Resultado y progreso guardados.");
}

function quizScrollBehavior() {
  return document.documentElement.classList.contains("a11y-reduce-motion") ? "auto" : "smooth";
}

/** Muestra el enunciado bajo la cabecera fija (útil en móvil/tablet tras Siguiente/Anterior). */
function scrollQuizToQuestion() {
  const run = () => {
    const el = $("#quiz-question") || $("#quiz-area");
    el?.scrollIntoView({ behavior: quizScrollBehavior(), block: "start" });
  };
  requestAnimationFrame(() => requestAnimationFrame(run));
}

function goNext() {
  const total = quizState.list.length;
  if (quizState.index >= total - 1) return;
  quizState.index += 1;
  quizState.optionsVisible = !quizState.pretest;
  $("#quiz-pretext").value = "";
  $("#quiz-feedback").textContent = "";
  renderQuestion();
  scrollQuizToQuestion();
  scheduleSaveQuizDraft();
}

function finishOrAdvanceQuiz() {
  const total = quizState.list.length;
  if (!total) return;
  if (quizState.index < total - 1) {
    const q = currentQ();
    const sel = quizState.answers[q.id];
    if (
      quizState.mode === "study" &&
      quizState.studyFeedback === "confidence" &&
      sel !== null &&
      sel !== undefined &&
      quizState.confidence[q.id] === undefined
    ) {
      $("#quiz-feedback").textContent = "";
      focusConfidencePicker();
      return;
    }
    goNext();
    return;
  }
  if (quizState.mode === "exam") {
    finishQuiz();
    return;
  }
  if (quizState.sessionType === "teorico") {
    const missEnd = quizMissingConfidenceCount();
    if (missEnd > 0) {
      const q = currentQ();
      const sel = q ? quizState.answers[q.id] : undefined;
      if (q && sel !== null && sel !== undefined && quizState.confidence[q.id] === undefined) {
        $("#quiz-feedback").textContent = "";
        focusConfidencePicker();
        return;
      }
      $("#quiz-feedback").innerHTML = `<strong>Falta medir tu seguridad en ${missEnd} pregunta(s).</strong> Usa «Anterior» y marca baja, media o alta antes de finalizar.`;
      return;
    }
    finishQuiz();
    return;
  }
  const missLibre = quizMissingConfidenceCount();
  if (missLibre > 0) {
    const q = currentQ();
    const sel = q ? quizState.answers[q.id] : undefined;
    if (q && sel !== null && sel !== undefined && quizState.confidence[q.id] === undefined) {
      $("#quiz-feedback").textContent = "";
      focusConfidencePicker();
      return;
    }
    $("#quiz-feedback").innerHTML = `<strong>Falta medir tu seguridad en ${missLibre} pregunta(s).</strong> Revísalas antes de cerrar la sesión.`;
    return;
  }
  const wrongIds = computeWrongIdsFromCurrentSession();
  saveLastWrongIds(wrongIds);
  const wrongHint =
    wrongIds.length > 0
      ? ` Fallaste ${wrongIds.length}: marca «Solo las falladas de la última sesión» y pulsa <strong>Nueva sesión</strong> para repasarlas.`
      : "";
  const wrongQs = quizState.list.filter((q) => wrongIds.includes(q.id));
  $("#quiz-feedback").innerHTML = `<strong>Sesión completada.</strong>${wrongHint} Vuelve a empezar o cambia modo / parte para variar.${wrongTopicSummary(
    wrongQs,
  )}${resultNextActionPanel(
    quizState.list.length - wrongQs.length,
    quizState.list.length,
    wrongQs,
  )}`;
  bindResultActions();
  mutateUserStats((s) => {
    s.studySessionsClosed += 1;
  });
  showSaveToast("Sesión completada y progreso guardado.");
}

function goPrev() {
  if (quizState.index === 0) return;
  quizState.index -= 1;
  quizState.optionsVisible = true;
  renderQuestion();
  scrollQuizToQuestion();
  scheduleSaveQuizDraft();
}

/* ---------- Flashcards + spacing ---------- */
const fcState = {
  deck: /** @type {Array<{ q: (typeof questionsBanco)[number]; due: number; step: number }>} */ ([]),
  index: 0,
  flipped: false,
};

function loadSchedule() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveSchedule(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

function exportFlashcardSchedule() {
  const data = loadSchedule();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = `radioexam-tarjetas-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function parseScheduleEntries(o) {
  const out = {};
  if (!o || typeof o !== "object") return out;
  for (const [k, v] of Object.entries(o)) {
    if (!v || typeof v !== "object") continue;
    const step = Number(v.step);
    const due = Number(v.due);
    if (!Number.isFinite(step) && !Number.isFinite(due)) continue;
    out[k] = {
      step: Number.isFinite(step) ? step : 0,
      due: Number.isFinite(due) ? due : 0,
    };
  }
  return out;
}

function importFlashcardScheduleFile(file) {
  const status = $("#fc-import-status");
  const replace = !!$("#fc-import-replace")?.checked;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const o = JSON.parse(String(reader.result));
      if (!o || typeof o !== "object") throw new Error("invalid");
      const parsed = parseScheduleEntries(o);
      if (replace) {
        saveSchedule(parsed);
        if (status) status.textContent = "Programación importada (sustituye por completo la anterior).";
      } else {
        saveSchedule({ ...loadSchedule(), ...parsed });
        if (status) status.textContent = "Programación importada (fusionada con la actual).";
      }
      updateDueBadge();
      if (fcState.deck.length) {
        fcState.deck = buildFlashDeck();
        renderFlashcard();
      }
    } catch {
      if (status) status.textContent = "No se pudo leer el JSON. Comprueba el formato.";
    }
  };
  reader.onerror = () => {
    if (status) status.textContent = "No se pudo leer el archivo.";
  };
  reader.readAsText(file);
}

function getFlashTopicFilter() {
  const v = $("#fc-topic")?.value;
  return v && v !== "all" ? v : "all";
}

function flashQuestionPool() {
  const t = getFlashTopicFilter();
  if (t === "all") return allQuestions;
  return allQuestions.filter((q) => q.topicId === t);
}

function buildFlashDeck() {
  const sched = loadSchedule();
  const pool = flashQuestionPool();
  return shuffle(
    pool.map((q) => {
      const s = sched[q.id] || { step: 0, due: 0 };
      return {
        q,
        due: s.due || 0,
        step: s.step || 0,
      };
    }),
  ).sort((a, b) => a.due - b.due);
}

function updateDueBadge() {
  const el = $("#fc-due");
  if (!el) return;
  const sched = loadSchedule();
  const now = Date.now();
  const pool = flashQuestionPool();
  const due = pool.filter((q) => {
    const s = sched[q.id];
    return !s || !s.due || s.due <= now;
  }).length;
  const t = getFlashTopicFilter();
  if (t === "all") {
    el.textContent = due ? `${due} tarjetas pendientes hoy` : "Nada urgente: repaso espaciado al día";
  } else {
    const title = topicBlockLabel(t);
    el.textContent = due
      ? `${due} pendientes en «${title}» (mazo filtrado)`
      : `Nada urgente en «${title}» con el mazo filtrado`;
  }
  updateScheduleDetail();
}

function scheduleCard(qid, easy) {
  const sched = loadSchedule();
  const cur = sched[qid] || { step: 0, due: 0 };
  const now = Date.now();
  const day = 86400000;
  let step = cur.step;
  let add = day;
  if (easy) {
    const next = Math.min(step + 1, 4);
    step = next === 4 ? 4 : next;
    const days = [1, 3, 7, 14];
    add = days[Math.min(next, 4) - 1] * day;
  } else {
    step = 0;
    add = 0.5 * day;
  }
  sched[qid] = { step, due: now + add };
  saveSchedule(sched);
  renderHeaderStatus();
  showSaveToast(easy ? "Tarjeta programada para repaso." : "Tarjeta marcada para reforzar pronto.");
}

function updateFcFlipHint() {
  const hint = $("#fc-flip-hint");
  if (!hint) return;
  const m = getFcDisplayMode();
  if (m === "front_only") {
    hint.textContent = "Modo solo enunciado: decide de memoria y usa «Lo sabía / No lo tenía claro» (sin voltear).";
    return;
  }
  if (m === "both") {
    hint.textContent = "Modo lectura: enunciado y respuesta visibles a la vez. Usa los botones para programar el repaso.";
    return;
  }
  hint.textContent = fcState.flipped
    ? "Pulsa de nuevo la tarjeta o Espacio para volver al enunciado."
    : "Pulsa la tarjeta o Espacio para ver la respuesta correcta y la explicación.";
}

function renderFlashcard() {
  const item = fcState.deck[fcState.index];
  const card = $("#fc-card");
  const front = $("#fc-front");
  const back = $("#fc-back");
  if (!item || !card || !front || !back) {
    $("#fc-area").hidden = true;
    return;
  }
  $("#fc-area").hidden = false;
  updateFlashcardWrapMode();
  const mode = getFcDisplayMode();
  const { q } = item;
  const topicTitle = escapeHtml(topicBlockLabel(q.topicId));
  const partLabel = q.part === 2 ? "2.ª" : "1.ª";
  const badge = `<p class="fc-topic-line muted"><strong>${topicTitle}</strong> · Parte ${partLabel} · <span class="fc-topic-id">${escapeHtml(q.topicId)}</span></p>`;
  const ans =
    Array.isArray(q.options) && typeof q.correctIndex === "number" && q.options[q.correctIndex] !== undefined
      ? q.options[q.correctIndex]
      : "";
  const stemBlock = `<div class="fc-stem">${escapeHtml(q.stem)}</div>`;
  front.innerHTML = badge + stemBlock;
  if (!ans) {
    back.innerHTML = `${badge}<p class="muted">No hay texto de respuesta asociado a esta pregunta.</p>`;
  } else {
    back.innerHTML = `${badge}<div><strong>${escapeHtml(ans)}</strong><p style="margin-top:0.75rem;font-weight:400;font-size:0.95rem;line-height:1.45">${escapeHtml(
      q.explain || "",
    )}</p></div>`;
  }
  fcState.flipped = false;
  card.classList.remove("is-flipped");
  if (mode === "both") {
    card.setAttribute("aria-expanded", "true");
    card.setAttribute("aria-label", "Tarjeta. Enunciado y respuesta visibles.");
  } else {
    card.setAttribute("aria-expanded", "false");
    card.setAttribute("aria-label", "Tarjeta. Pulsa para mostrar la respuesta.");
  }
  const tf = getFlashTopicFilter();
  const scope = tf === "all" ? "todo el banco" : topicBlockLabel(tf);
  const meta = $("#fc-meta");
  if (meta) {
    meta.textContent = `Tarjeta ${fcState.index + 1} de ${fcState.deck.length} · ${scope}`;
  }
  updateFcFlipHint();
}

function loadFlashcards() {
  fcState.deck = buildFlashDeck();
  fcState.index = 0;
  const imp = $("#fc-import-status");
  if (imp) imp.textContent = "";
  if (!fcState.deck.length) {
    $("#fc-area").hidden = true;
    const empty = $("#fc-empty-state");
    if (empty) {
      empty.hidden = false;
      empty.textContent =
        "No hay preguntas en el banco para el tema seleccionado. Elige «Todos los temas» u otro bloque y pulsa de nuevo «Cargar tarjetas desde preguntas».";
    }
    const meta = $("#fc-meta");
    if (meta) {
      meta.textContent =
        "No hay preguntas en el banco para el tema seleccionado. Elige «Todos los temas» u otro bloque y pulsa de nuevo «Cargar tarjetas desde preguntas».";
    }
    updateDueBadge();
    return;
  }
  const empty = $("#fc-empty-state");
  if (empty) empty.hidden = true;
  $("#fc-area").hidden = false;
  renderFlashcard();
  updateDueBadge();
  updateScheduleDetail();
}

function flipCard() {
  if (getFcDisplayMode() !== "flip") return;
  fcState.flipped = !fcState.flipped;
  const card = $("#fc-card");
  card.classList.toggle("is-flipped", fcState.flipped);
  card.setAttribute("aria-expanded", fcState.flipped ? "true" : "false");
  card.setAttribute(
    "aria-label",
    fcState.flipped ? "Tarjeta. Pulsa para volver al enunciado." : "Tarjeta. Pulsa para mostrar la respuesta.",
  );
  updateFcFlipHint();
}

function advanceCard(easy) {
  const item = fcState.deck[fcState.index];
  if (item) {
    scheduleCard(item.q.id, easy);
    mutateUserStats((s) => {
      s.flashRatings += 1;
    });
  }
  fcState.index += 1;
  if (fcState.index >= fcState.deck.length) {
    fcState.index = 0;
    fcState.deck = buildFlashDeck();
  }
  renderFlashcard();
  updateDueBadge();
  updateScheduleDetail();
}

/* ---------- Init ---------- */
let navDocumentBound = false;
let hashChangeBound = false;

function exportUserProgress() {
  const payload = buildProgressBackupPayload(PROGRESS_STORE_KEYS, readLocalStorage, appVersion.build);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `radioexam-progreso-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showSaveToast("Copia de seguridad exportada.");
}

function importUserProgressFile(/** @type {File} */ file) {
  const status = $("#progress-import-status");
  const replace = !!$("#progress-import-replace")?.checked;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      const count = applyProgressBackupPayload(data, PROGRESS_STORE_KEYS, readLocalStorage, trySetLocalStorage, {
        replace,
      });
      applyQuizPrefsToForm();
      renderUserProgress();
      renderQuizProgressSummary();
      renderQuizPracticeGuide();
      renderQuizResumePanel();
      renderExamCoach();
      updateDueBadge();
      if (status) {
        status.textContent = replace
          ? `Progreso importado (${count} bloque(s)); sustituye el anterior.`
          : `Progreso importado (${count} bloque(s)); fusionado con el actual.`;
      }
      showSaveToast("Copia de seguridad restaurada en este navegador.");
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      if (status) {
        if (code === "version") status.textContent = "Versión de archivo no compatible.";
        else if (code === "quota") status.textContent = "No hay espacio suficiente en este navegador.";
        else status.textContent = "No se pudo leer el JSON. Comprueba el archivo.";
      }
    }
  };
  reader.onerror = () => {
    if (status) status.textContent = "No se pudo leer el archivo.";
  };
  reader.readAsText(file);
}

function initProgressBackup() {
  $("#progress-export")?.addEventListener("click", exportUserProgress);
  $("#progress-import")?.addEventListener("click", () => $("#progress-import-file")?.click());
  $("#progress-import-file")?.addEventListener("change", (e) => {
    const input = /** @type {HTMLInputElement} */ (e.target);
    const f = input.files?.[0];
    input.value = "";
    if (f) importUserProgressFile(f);
  });
}

function initQuizLeaveGuard() {
  window.addEventListener("beforeunload", (e) => {
    if (!isQuizSessionInProgress()) return;
    e.preventDefault();
    e.returnValue = "";
  });
}

function initNav() {
  if (!navDocumentBound) {
    navDocumentBound = true;
    document.addEventListener("click", async (e) => {
      const el = e.target.closest("[data-nav]");
      if (!el) return;
      const id = el.getAttribute("data-nav");
      if (!id) return;
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      if (isQuizSessionInProgress() && id !== "practicar") {
        e.preventDefault();
        if (!(await promptQuizLeave())) return;
      }
      if (id === "practicar") {
        const topic = el.getAttribute("data-practicar-topic");
        if (topic) sessionStorage.setItem(TOPIC_PRESELECT_KEY, topic);
        else sessionStorage.removeItem(TOPIC_PRESELECT_KEY);
      }
      if (id === "tarjetas") {
        const fcTopic = el.getAttribute("data-tarjetas-topic");
        if (fcTopic) sessionStorage.setItem(FC_TOPIC_PRESELECT_KEY, fcTopic);
        else sessionStorage.removeItem(FC_TOPIC_PRESELECT_KEY);
      }
      const href = el.getAttribute("href") || "";
      const targetHash = href.startsWith("#") ? href.slice(1) || id : id;
      e.preventDefault();
      if (location.hash.replace(/^#/, "") !== targetHash) {
        location.hash = targetHash;
      } else {
        void onRoute();
      }
      closeMobileNav();
    });
  }
  if (!hashChangeBound) {
    hashChangeBound = true;
    window.addEventListener("hashchange", onRoute);
  }
}

function isMobileNavViewport() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function closeMobileNav() {
  const nav = $("#site-nav");
  const btn = $("#nav-toggle");
  const backdrop = $("#site-nav-backdrop");
  if (nav) nav.classList.remove("is-open");
  if (btn) btn.setAttribute("aria-expanded", "false");
  nav?.querySelectorAll(".nav-group[open]").forEach((d) => {
    d.removeAttribute("open");
  });
  if (backdrop) backdrop.hidden = true;
  document.body.classList.remove("nav-menu-open");
}

function initMobileNav() {
  const btn = $("#nav-toggle");
  const nav = $("#site-nav");
  const backdrop = $("#site-nav-backdrop");
  if (!btn || !nav) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const willOpen = !nav.classList.contains("is-open");
    if (willOpen && isMobileNavViewport()) {
      nav.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      if (backdrop) backdrop.hidden = false;
      document.body.classList.add("nav-menu-open");
    } else {
      closeMobileNav();
    }
  });

  backdrop?.addEventListener("click", () => {
    closeMobileNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  window.addEventListener("resize", () => {
    if (!isMobileNavViewport()) closeMobileNav();
  });

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const a11y = $("#a11y-panel");
    if (a11y instanceof HTMLDetailsElement && a11y.open && !t.closest("#a11y-panel")) {
      a11y.removeAttribute("open");
    }
  });
}

const A11Y_FONT_SCALE_MIN = 0.85;
const A11Y_FONT_SCALE_MAX = 1.5;
const A11Y_FONT_SCALE_STEP = 0.05;

function normalizeA11yOpts(raw) {
  const defaults = {
    spacing: false,
    reduceMotion: false,
    contrast: false,
    fontScale: 1,
    theme: "dark",
  };
  const o = { ...defaults, ...(raw && typeof raw === "object" ? raw : {}) };
  if (o.large === true && (!raw || raw.fontScale === undefined)) {
    o.fontScale = 1.125;
  }
  const scale = Number(o.fontScale);
  o.fontScale = Number.isFinite(scale)
    ? Math.min(A11Y_FONT_SCALE_MAX, Math.max(A11Y_FONT_SCALE_MIN, scale))
    : 1;
  o.theme = o.theme === "light" ? "light" : "dark";
  delete o.large;
  return o;
}

function loadA11yOpts() {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return normalizeA11yOpts({});
    return normalizeA11yOpts(JSON.parse(raw));
  } catch {
    return normalizeA11yOpts({});
  }
}

function saveA11yOpts(/** @type {ReturnType<typeof normalizeA11yOpts>} */ opts) {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(opts));
}

function applyA11yOpts(/** @type {ReturnType<typeof normalizeA11yOpts>} */ opts) {
  const root = document.documentElement;
  const isLight = opts.theme === "light";
  root.style.setProperty("--a11y-font-scale", String(opts.fontScale));
  root.classList.toggle("a11y-wide-lines", !!opts.spacing);
  root.classList.toggle("a11y-reduce-motion", !!opts.reduceMotion);
  root.classList.toggle("a11y-high-contrast", !!opts.contrast);
  root.classList.toggle("a11y-light", isLight);
  root.dataset.theme = isLight ? "light" : "dark";
  const meta = document.getElementById("meta-theme-color");
  if (meta) meta.setAttribute("content", isLight ? "#eef2f7" : "#090c11");
}

function initA11y() {
  const opts = loadA11yOpts();
  applyA11yOpts(opts);

  const bindCheck = (id, key) => {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLInputElement) || el.type !== "checkbox") return;
    el.checked = !!opts[key];
    el.addEventListener("change", () => {
      opts[key] = el.checked;
      saveA11yOpts(opts);
      applyA11yOpts(opts);
    });
  };

  bindCheck("a11y-spacing", "spacing");
  bindCheck("a11y-reduce-motion", "reduceMotion");
  bindCheck("a11y-contrast", "contrast");

  const lightEl = document.getElementById("a11y-light");
  if (lightEl instanceof HTMLInputElement) {
    lightEl.checked = opts.theme === "light";
    lightEl.addEventListener("change", () => {
      opts.theme = lightEl.checked ? "light" : "dark";
      saveA11yOpts(opts);
      applyA11yOpts(opts);
    });
  }

  const scaleEl = document.getElementById("a11y-font-scale");
  const scaleOut = document.getElementById("a11y-font-scale-out");
  const decBtn = document.getElementById("a11y-font-dec");
  const incBtn = document.getElementById("a11y-font-inc");

  const syncFontScaleUi = () => {
    const pct = Math.round(opts.fontScale * 100);
    if (scaleEl instanceof HTMLInputElement) {
      scaleEl.value = String(pct);
      scaleEl.setAttribute("aria-valuenow", String(pct));
    }
    if (scaleOut) scaleOut.textContent = `${pct}%`;
  };

  const setFontScale = (scale) => {
    opts.fontScale = Math.min(
      A11Y_FONT_SCALE_MAX,
      Math.max(A11Y_FONT_SCALE_MIN, Math.round(scale / A11Y_FONT_SCALE_STEP) * A11Y_FONT_SCALE_STEP),
    );
    saveA11yOpts(opts);
    applyA11yOpts(opts);
    syncFontScaleUi();
  };

  syncFontScaleUi();

  if (scaleEl instanceof HTMLInputElement) {
    scaleEl.addEventListener("input", () => {
      setFontScale(Number(scaleEl.value) / 100);
    });
  }
  decBtn?.addEventListener("click", () => setFontScale(opts.fontScale - A11Y_FONT_SCALE_STEP));
  incBtn?.addEventListener("click", () => setFontScale(opts.fontScale + A11Y_FONT_SCALE_STEP));
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    initNav();

    initA11y();
    initAppDialog();
    renderAppVersion();
    try {
      renderTemario();
      initTemarioInteractions();
    } catch (err) {
      console.error("renderTemario", err);
    }
    try {
      renderNormativa();
    } catch (err) {
      console.error("renderNormativa", err);
    }
    try {
      renderMethods();
    } catch (err) {
      console.error("renderMethods", err);
    }
    initQuizTopicSelect();
    initFcTopicSelect();
    applyQuizPrefsToForm();
    initQuizPrefsAutosave();
    initQuizKeyboard();
    initTemarioFilter();
    initTemarioReading();
    updateWrongOnlyCheckboxVisibility();
    initQuizLeaveGuard();
    initQuizDraftPersistence();
    initProgressBackup();
    initMobileNav();
    syncPretestAvailability();
    $("#quiz-session")?.addEventListener("change", syncPretestAvailability);
    $("#quiz-part")?.addEventListener("change", () => {
      validateTopicPartConsistency();
      renderQuizPracticeGuide();
    });
    $("#quiz-topic")?.addEventListener("change", renderQuizPracticeGuide);
    $("#quiz-trap-only")?.addEventListener("change", renderQuizPracticeGuide);
    void onRoute();
    renderUserProgress();
    renderQuizProgressSummary();
    renderExamCoach();
    renderQuizPracticeGuide();

    $("#quiz-start")?.addEventListener("click", startQuiz);
    $("#quiz-resume")?.addEventListener("click", resumeQuizSession);
    $("#quiz-discard-draft")?.addEventListener("click", async () => {
      if (!loadQuizDraft()) return;
      if (
        !(await showAppConfirm({
          title: "¿Descartar sesión guardada?",
          message: "No podrás recuperar el progreso de esa sesión en este dispositivo.",
          confirmLabel: "Descartar",
          danger: true,
        }))
      ) {
        return;
      }
      clearQuizDraft();
      renderQuizResumePanel();
    });
    $("#quiz-next")?.addEventListener("click", finishOrAdvanceQuiz);
    $("#quiz-prev")?.addEventListener("click", goPrev);
    $("#quiz-focus-toggle")?.addEventListener("click", toggleQuizFocusMode);

    $("#fc-load")?.addEventListener("click", loadFlashcards);
    $("#fc-topic")?.addEventListener("change", () => {
      updateDueBadge();
      const area = $("#fc-area");
      if (!area || area.hidden || !fcState.deck.length) return;
      fcState.deck = buildFlashDeck();
      fcState.index = 0;
      if (!fcState.deck.length) {
        area.hidden = true;
        const meta = $("#fc-meta");
        if (meta) {
          meta.textContent =
            "El filtro actual no deja ninguna pregunta en el mazo. Elige otro tema o «Todos los temas» y vuelve a cargar.";
        }
      } else {
        renderFlashcard();
      }
    });
    $("#fc-export")?.addEventListener("click", exportFlashcardSchedule);
    $("#fc-import")?.addEventListener("click", () => $("#fc-import-file")?.click());
    $("#fc-import-file")?.addEventListener("change", (e) => {
      const inp = /** @type {HTMLInputElement} */ (e.target);
      const f = inp.files?.[0];
      inp.value = "";
      if (f) importFlashcardScheduleFile(f);
    });
    $("#fc-display-mode")?.addEventListener("change", () => {
      fcState.flipped = false;
      $("#fc-card")?.classList.remove("is-flipped");
      renderFlashcard();
    });
    $("#fc-card")?.addEventListener("click", flipCard);
    $("#fc-card")?.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        flipCard();
      }
    });
    $("#fc-easy")?.addEventListener("click", () => advanceCard(true));
    $("#fc-hard")?.addEventListener("click", () => advanceCard(false));

    updateDueBadge();

    window.__radioexamAppReady = true;
  } catch (err) {
    console.error(err);
    const el = $("#app-error");
    if (el) {
      el.hidden = false;
      el.textContent =
        "No se pudo inicializar la aplicación. Recarga la página; si persiste, abre la consola (F12) y comprueba que sirves la carpeta del proyecto por HTTP.";
    }
    void onRoute();
  }
});
