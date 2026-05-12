import topicsData from "./data/topics.js";
import topicStudy from "./data/topics-study.js";
import questionsData from "./data/questions.js";
import ureElectricidad from "./data/ure-electricidad.js";
import fediea2011 from "./data/fediea-2011.js";
import quijotesEa3rcq from "./data/quijotes-ea3rcq.js";
import questionsExamenPropias from "./data/questions-examen-propias.js";
import regulatory from "./data/regulatory.js";
import { shuffle, buildQuestionList } from "./lib/quiz-session.mjs";

const STORAGE_KEY = "radioexam_card_schedule_v1";
const TOPIC_PRESELECT_KEY = "radioexam_practicar_topic";
const FC_TOPIC_PRESELECT_KEY = "radioexam_tarjetas_topic";
const QUIZ_PREFS_KEY = "radioexam_quiz_prefs_v1";
const LAST_WRONG_SESSION_KEY = "radioexam_last_wrong_ids_v1";
const QUIZ_TOPIC_STATS_KEY = "radioexam_topic_quiz_stats_v1";
/** Resumen global, racha y cobertura del banco (solo este navegador). */
const USER_STATS_KEY = "radioexam_user_stats_v1";

const VIEW_HEADINGS = {
  inicio: "titulo-inicio",
  temario: "titulo-temario",
  normativa: "titulo-normativa",
  metodologia: "titulo-metodo",
  practicar: "titulo-practicar",
  tarjetas: "titulo-tarjetas",
};

const DOC_TITLES = {
  inicio: "RadioExamen · Inicio",
  temario: "RadioExamen · Temario y repaso",
  normativa: "RadioExamen · Normativa BOE y enlaces",
  metodologia: "RadioExamen · Metodología de estudio",
  practicar: "RadioExamen · Practicar test",
  tarjetas: "RadioExamen · Tarjetas",
};

const ROUTE_ANNOUNCE = {
  inicio: "Inicio",
  temario: "Temario",
  normativa: "Normativa",
  metodologia: "Metodología",
  practicar: "Practicar",
  tarjetas: "Tarjetas",
};

const methods = [
  {
    title: "Práctica de recuperación activa (self-testing)",
    tag: "Efecto testing",
    body:
      "<p>Responder preguntas sin apuntes obliga al cerebro a <strong>recuperar</strong>, no solo a reconocer. Las revisiones muestran que esto suele superar a releer pasivamente el mismo tiempo.</p><p><em>En la app:</em> modo <strong>Estudio</strong> con corrección inmediata, <strong>Estudio con confianza</strong> (metacognición), <strong>Estudio temario y libro</strong> (explicación literal del banco + enlaces al temario y material URE) o <strong>Examen</strong> para simular carga cognitiva. El modo <strong>Examen tipo test</strong> (30 ítems al azar, reloj en examen) reproduce el formato habitual de examen oficial. Los ítems adicionales del proyecto van en <code>data/questions-examen-propias.js</code> (solo temática típica de examen, con <code>sourceRef</code> al BOE/CEPT/URE).</p>",
  },
  {
    title: "Juicio de aprendizaje y confianza (metacognición)",
    tag: "Calibración",
    body:
      "<p>Indicar <strong>cuánta confianza</strong> tienes en tu respuesta <em>antes</em> de ver si es correcta obliga a estimar qué dominas de verdad; con feedback después suele mejorar la calibración y, en varios diseños experimentales con test, también el aprendizaje.</p><p><em>En la app:</em> modo <strong>Estudio · confianza antes de corregir</strong> (mismo formato tipo test; la corrección y el color de acierto/error aparecen tras marcar baja/media/alta).</p>",
  },
  {
    title: "Espaciado (spacing)",
    tag: "Retención a largo plazo",
    body:
      "<p>Repartir sesiones en el tiempo vence con frecuencia al “atracón” del mismo día: la memoria consolida con pausas. Los meta-análisis de espaciado miden beneficios robustos según intervalo y materia.</p><p><em>En la app:</em> tarjetas con botones <strong>Lo sabía / No</strong> que calculan la próxima revisión (1 · 3 · 7 días, simplificado).</p>",
  },
  {
    title: "Intercalado (interleaving)",
    tag: "Contrastar conceptos",
    body:
      "<p>Mezclar tipos de problemas (p. ej. AM vs FM vs ROE) fuerza a <strong>elegir la regla correcta</strong> en cada intento, no a repetir el mismo patrón en racha. Suele sentirse más difícil al principio, pero mejora la discriminación.</p><p><em>En la app:</em> selector <strong>Intercalado</strong> en Practicar.</p>",
  },
  {
    title: "Dificultades deseables (desirable difficulties)",
    tag: "Bjork & Bjork",
    body:
      "<p>Lo cómodo no siempre es lo que más fija: un poco de fricción (olvidar casi, equivocarse, esperar feedback) puede aumentar el aprendizaje duradero si hay feedback de calidad después.</p><p><em>En la app:</em> modo <strong>Examen</strong> retrasa la corrección para imitar esa fricción controlada.</p>",
  },
  {
    title: "Preguntas previas (prequestions)",
    tag: "Activar hipótesis",
    body:
      "<p>Intentar responder <strong>antes</strong> de estudiar el tema activa esquemas mentales y mejora en varios experimentos la comprensión posterior, incluso si fallas.</p><p><em>En la app:</em> casilla <strong>Precueba</strong>: escribe tu hipótesis y luego revela opciones.</p>",
  },
  {
    title: "Generación y autoexplicación",
    tag: "Más allá de la letra",
    body:
      "<p>Explicar <em>por qué</em> es la respuesta (en voz alta o por escrito) enlaza ideas nuevas con las que ya tienes. Es barato y muy alineado con el artículo EA1CN: ir del test al libro y viceversa.</p><p><em>En la app:</em> tras cada ítem, lee la explicación y reformúlala con tus palabras antes de seguir.</p>",
  },
  {
    title: "Doble codificación (palabra + imagen)",
    tag: "Dual coding",
    body:
      "<p>Combinar canal verbal con esquema (diagrama de bloques, flechas en la antena…) crea más rutas de acceso a la memoria. El libro URE es fuerte en figuras: úsalas como ancla, no solo el texto.</p>",
  },
  {
    title: "Micro-objetivos y delimitación",
    tag: "Evitar la sobrecarga",
    body:
      "<p>La carga cognitiva trabaja mejor con <strong>unidades pequeñas</strong> medibles (p. ej. “10 preguntas de dipolos + revisar un esquema”). Encaja con listas de verificación del temario sin leer el libro linealmente.</p><p><em>En la app:</em> cada bloque del <strong>Temario</strong> propone una <strong>micro-sesión</strong> (ganchos, repaso express, tarjetas y acceso a tests) para encajar estudio en pausas cortas.</p>",
  },
];

/** @type {typeof questionsData} */
let allQuestions = [...questionsData, ...questionsExamenPropias, ...ureElectricidad, ...fediea2011, ...quijotesEa3rcq];

function $(sel, root = document) {
  return root.querySelector(sel);
}

function showView(id) {
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
}

function updateDocumentTitle(viewId) {
  document.title = DOC_TITLES[viewId] || DOC_TITLES.inicio;
}

function announceRoute(viewId) {
  const ann = $("#route-announce");
  if (!ann) return;
  ann.textContent = ROUTE_ANNOUNCE[viewId] || viewId;
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

function onRoute() {
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
  } else if (!["inicio", "temario", "normativa", "metodologia", "practicar", "tarjetas"].includes(raw)) {
    id = "inicio";
  }
  if (id !== "practicar") clearExamTimer();
  showView(id);
  updateDocumentTitle(id);
  announceRoute(id);
  requestAnimationFrame(() => focusViewHeading(id));
  if (id === "tarjetas") {
    syncFcTopicFromSession();
    updateDueBadge();
  }
  if (id === "practicar") syncTopicFromSession();
  if (id === "temario") {
    renderTemario();
    initTemarioInteractions();
  }
  if (id === "inicio") renderUserProgress();
  if (id === "practicar") renderQuizProgressSummary();
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

  root.innerHTML = `
    ${jumpNav}
    <article class="part-card part-card--hero">
      <h2>${escapeHtml(regulatory.headline || "")}</h2>
      <p>${escapeHtml(regulatory.intro || "")}</p>
      ${trust}
    </article>
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

function renderBlockStudy(blockId) {
  const study = topicStudy[blockId];
  if (!study) return "";
  const hooks = (study.memoryHooks || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  const express = (study.expressBullets || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  const readMore = study.readMore?.length
    ? `<details class="temario-details"><summary>Más detalle (10–15 min)</summary><ul class="temario-list">${study.readMore
        .map((x) => `<li>${escapeHtml(x)}</li>`)
        .join("")}</ul></details>`
    : "";
  const cards = (study.flashcards || [])
    .map(
      (fc, i) => `
        <div class="temario-flipcard" tabindex="0" role="button" aria-label="Tarjeta ${i + 1} del bloque. Activar para voltear.">
          <div class="temario-flipcard__inner">
            <div class="temario-flipcard__face temario-flipcard__face--front">${escapeHtml(fc.front)}</div>
            <div class="temario-flipcard__face temario-flipcard__face--back">${escapeHtml(fc.back)}</div>
          </div>
        </div>`,
    )
    .join("");
  const sources = study.sources
    ? `<p class="temario-sources"><strong>Contrastar con:</strong> ${escapeHtml(study.sources)}</p>`
    : "";
  return `
        <div class="temario-study">
          <p class="temario-method-tip"><strong>Micro-sesión (≈3–5 min):</strong> ${escapeHtml(
            "lee los ganchos, voltea unas tarjetas del bloque y enlaza con el banco: «Practicar tests» (tipo test filtrado) o «Tarjetas del banco» (repaso espaciado solo de este tema).",
          )}</p>
          <details class="temario-details" open>
            <summary>Ganchos para memorizar</summary>
            <ul class="temario-list">${hooks}</ul>
          </details>
          <details class="temario-details">
            <summary>Repaso express (≈1–3 min)</summary>
            <ul class="temario-list temario-list--compact">${express}</ul>
          </details>
          ${readMore}
          <div class="temario-fc-block">
            <p class="temario-fc-head">Tarjetas didácticas del bloque (volteo en esta página; distintas de «Tarjetas del banco»)</p>
            <div class="temario-fc-grid">${cards}</div>
          </div>
          ${sources}
          <p class="temario-cta">
            <a href="#practicar" data-nav="practicar" data-practicar-topic="${escapeHtml(blockId)}" class="btn btn--ghost btn--sm">Practicar tests</a>
            <a href="#tarjetas" data-nav="tarjetas" data-tarjetas-topic="${escapeHtml(blockId)}" class="btn btn--ghost btn--sm">Tarjetas del banco (este bloque)</a>
            <a href="#tarjetas" data-nav="tarjetas" class="btn btn--ghost btn--sm">Tarjetas (todo el banco)</a>
            <a href="#normativa" data-nav="normativa" class="btn btn--ghost btn--sm">Normativa BOE</a>
          </p>
        </div>`;
}

function renderTemario() {
  const root = $("#temario-root");
  if (!root) return;
  const counts = questionCountByTopic();
  const topicStats = loadTopicQuizStats();
  root.innerHTML = topicsData.parts
    .map(
      (p) => `
    <article class="part-card">
      <h2>${escapeHtml(p.title)}</h2>
      <ul class="block-list block-list--temario">
        ${p.blocks
          .map((b) => {
            const nq = counts[b.id] ?? 0;
            const st = topicStats[b.id];
            const prog =
              st && st.t > 0
                ? `<span class="temario-block__progress" title="Modo estudio en esta app (este navegador)">${st.ok}/${st.t} aciertos en práctica</span>`
                : "";
            const searchRaw = buildTemarioSearchIndex(b.id, b, topicStudy[b.id]).toLowerCase();
            return `
          <li id="temario-${escapeHtml(b.id)}" class="temario-block" data-temario-search="${escapeHtml(searchRaw)}">
            <div class="temario-block__head">
              <strong class="temario-block__title">${escapeHtml(b.title)}</strong>
              <span class="temario-block__hint">${escapeHtml(b.hint)}</span>
            </div>
            <div class="temario-block__meta">
              <span class="temario-block__count">${nq} preguntas en el banco</span>
              ${prog}
            </div>
            ${renderBlockStudy(b.id)}
          </li>`;
          })
          .join("")}
      </ul>
    </article>`,
    )
    .join("");
}

function initTemarioInteractions() {
  const root = $("#temario-root");
  if (!root || root.dataset.temarioBound === "1") return;
  root.dataset.temarioBound = "1";
  root.addEventListener("click", (e) => {
    const card = e.target.closest(".temario-flipcard");
    if (!card || !root.contains(card)) return;
    card.classList.toggle("is-flipped");
  });
  root.addEventListener("keydown", (e) => {
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
      (m) => `
    <details class="method-card">
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
  list: /** @type {typeof questionsData} */ ([]),
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

function startExamTimer() {
  clearExamTimer();
  if (quizState.sessionType !== "teorico" || quizState.mode !== "exam") return;
  const el = $("#quiz-timer");
  if (!el) return;
  el.hidden = false;
  quizState.examEndsAt = Date.now() + TEORICO_EXAM_MS;
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
    if (wrap) wrap.title = "La precueba no está disponible en el examen tipo test (30 preguntas).";
  } else {
    cb.disabled = false;
    if (wrap) wrap.title = "";
  }
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

function startQuiz() {
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
  quizState.pretest = !!$("#quiz-pretest")?.checked && quizState.sessionType === "libre";
  const topicRaw = $("#quiz-topic")?.value || "all";
  let topicFilter = topicRaw === "all" || topicBelongsToPart(topicRaw, part) ? topicRaw : "all";
  if (topicRaw !== "all" && topicFilter === "all" && $("#quiz-topic")) {
    $("#quiz-topic").value = "all";
  }
  quizState.topicFilter = topicFilter;
  quizState._statsCounted = new Set();
  const wrongOnly = !!$("#quiz-wrong-only")?.checked;
  let onlyPool = null;
  if (wrongOnly) {
    const ids = loadLastWrongIds();
    if (ids.length) onlyPool = new Set(ids);
  }
  quizState.list = buildQuestionList(
    allQuestions,
    part,
    quizState.sessionType,
    topicFilter,
    TEORICO_COUNT,
    onlyPool,
  );
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
    const msg =
      wrongOnly && loadLastWrongIds().length
        ? "<p><strong>No hay preguntas</strong> para «solo falladas» con el filtro actual. Prueba «Todos los temas», otra parte o desmarca la casilla de falladas.</p>"
        : "<p><strong>No hay preguntas</strong> con esta combinación de parte, tema y tipo de sesión. Prueba «Todos los temas» u otra parte.</p>";
    $("#quiz-feedback").innerHTML = msg;
    $("#quiz-question").innerHTML =
      '<p class="muted">Ajusta los selectores arriba y pulsa de nuevo <strong>Nueva sesión</strong>.</p>';
    $("#quiz-progress").textContent = "Sin preguntas";
    $("#quiz-prev").disabled = true;
    $("#quiz-next").disabled = true;
    updateQuizStats();
    return;
  }
  $("#quiz-next").disabled = false;
  updateQuizStats();
  startExamTimer();
  saveQuizPrefs();
  renderQuestion();
}

function currentQ() {
  return quizState.list[quizState.index];
}

function safeStemFigureSrc(raw) {
  if (typeof raw !== "string") return null;
  const s = raw.trim();
  if (!s || s.includes("..") || s.includes("\\")) return null;
  if (!/^images\/quiz\/[A-Za-z0-9._-]+\.(svg|png|webp)$/i.test(s)) return null;
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
  return `<figure class="q-card__figure"><img class="q-card__figure-img" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" /></figure>`;
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
  const topicExtra =
    quizState.topicFilter && quizState.topicFilter !== "all"
      ? ` · Tema: ${escapeHtml(topicBlockLabel(quizState.topicFilter))}`
      : "";
  $("#quiz-progress").textContent = `Pregunta ${quizState.index + 1} de ${total}${sessionLabel}${topicExtra}`;
  announceQuizQuestion(q, quizState.index, total);
  const sel = quizState.answers[q.id];
  const showOpts = quizState.optionsVisible;
  const hideTopicMeta = quizState.sessionType === "teorico" && quizState.mode === "exam";
  const topicTitle = topicBlockLabel(q.topicId);
  const topicMeta = hideTopicMeta
    ? ""
    : `<p class="muted q-card__topic" style="margin:0 0 0.5rem;font-size:0.85rem"><strong>${escapeHtml(topicTitle)}</strong> <span class="muted">(${escapeHtml(q.topicId)})</span> · Parte ${q.part}</p>`;
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
    <h2>${escapeHtml(q.stem)}</h2>
    <div class="opts" role="radiogroup" aria-label="Opciones">${optsHtml}</div>
    ${preBtn}
    ${toolbar}
  `;

  $("#quiz-mark-review")?.addEventListener("change", (e) => {
    const t = /** @type {HTMLInputElement} */ (e.target);
    quizState.marked[q.id] = !!t.checked;
    updateQuizStats();
  });

  if (quizState.pretest && !showOpts) {
    $("#quiz-reveal")?.addEventListener("click", () => {
      quizState.optionsVisible = true;
      renderQuestion();
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

/** Texto plano para filtrar bloques del temario (sin HTML). */
function buildTemarioSearchIndex(blockId, blockMeta, study) {
  const bits = [blockId, blockMeta.title, blockMeta.hint];
  if (study && typeof study === "object") {
    for (const k of ["memoryHooks", "expressBullets", "readMore", "sources"]) {
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
  localStorage.setItem(QUIZ_PREFS_KEY, JSON.stringify({ part, topic, session, mode, pretest }));
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
  syncPretestAvailability();
  validateTopicPartConsistency();
}

function initQuizPrefsAutosave() {
  for (const id of ["quiz-part", "quiz-topic", "quiz-session", "quiz-mode"]) {
    $(`#${id}`)?.addEventListener("change", saveQuizPrefs);
  }
  $("#quiz-pretest")?.addEventListener("change", saveQuizPrefs);
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
    return {
      ...base,
      ...o,
      seenQuestionIds: seen,
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

function renderUserProgress() {
  const root = $("#user-stats-root");
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
        <span class="user-stats__metric-label">Tarjetas (Lo sabía / No)</span>
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

  $("#user-stats-reset")?.addEventListener("click", () => {
    if (!window.confirm("¿Borrar racha, cobertura y contadores del resumen global? No borra la programación de tarjetas ni los aciertos por bloque del temario.")) {
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

function bumpTopicQuizStatIfNew(q, isCorrect) {
  if (quizState.mode !== "study") return;
  if (quizState._statsCounted.has(q.id)) return;
  quizState._statsCounted.add(q.id);
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
  const root = $("#temario-root");
  if (!(inp instanceof HTMLInputElement) || !root) return;
  inp.addEventListener("input", () => {
    const qv = inp.value.trim().toLowerCase();
    root.querySelectorAll(".temario-block").forEach((li) => {
      const hay = (li.getAttribute("data-temario-search") || "").toLowerCase();
      li.hidden = qv.length > 0 && !hay.includes(qv);
    });
  });
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

/** Panel post-respuesta: texto literal `explain` del banco + enlaces a temario y material de estudio. */
function renderDeepenPanel(q) {
  const blockTitle = topicBlockLabel(q.topicId);
  const temarioHref = `#temario--${encodeURIComponent(q.topicId)}`;
  const ureHref =
    q.part === 1
      ? "https://www.ure.es/examenes/electricidad-y-radioelectricidad/"
      : "https://www.ure.es/legislacion-y-reglamentacion/";
  const ureLinkText =
    q.part === 1 ? "URE · Material de práctica (electricidad y radioelectricidad)" : "URE · Legislación y reglamentación";
  const normativaHref = "#normativa--normativa-boe";
  return `<div class="quiz-deepen">
    <h3 class="quiz-deepen__title">Ampliación · temario y libro</h3>
    <p class="quiz-deepen__note">Explicación <strong>exacta</strong> registrada en el banco para esta pregunta (no es un resumen generado).</p>
    <blockquote class="quiz-deepen__exact"><p>${escapeHtml(q.explain)}</p></blockquote>
    ${
      "sourceRef" in q && q.sourceRef
        ? `<p class="quiz-deepen__source"><strong>Fuente al redactar el ítem:</strong> ${escapeHtml(String(q.sourceRef))}</p>`
        : ""
    }
    <p class="quiz-deepen__note">Relación con tu estudio y fuentes oficiales:</p>
    <ul class="quiz-deepen__links">
      <li><a href="${temarioHref}">Temario orientativo · ${escapeHtml(blockTitle)}</a></li>
      <li><a href="${ureHref}" rel="noopener noreferrer">${escapeHtml(ureLinkText)}</a></li>
      <li><a href="${normativaHref}">Normativa · BOE y administración</a></li>
      <li><a href="https://www.cept.org/ecc/ham-radio" rel="noopener noreferrer">CEPT · HAREC y documentación</a></li>
    </ul>
  </div>`;
}

function showConfidencePrompt(q) {
  const fb = $("#quiz-feedback");
  fb.innerHTML = `
    <p class="conf-prompt"><strong>Antes de la corrección:</strong> ¿cuán seguro estás de haber acertado?</p>
    <div class="confidence-bar" role="group" aria-label="Nivel de confianza">
      <button type="button" class="btn btn--ghost conf-btn" data-conf="0">Baja</button>
      <button type="button" class="btn btn--ghost conf-btn" data-conf="1">Media</button>
      <button type="button" class="btn btn--ghost conf-btn" data-conf="2">Alta</button>
    </div>`;
  fb.querySelectorAll("[data-conf]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = Number.parseInt(btn.getAttribute("data-conf") || "1", 10);
      quizState.confidence[q.id] = Number.isFinite(v) ? v : 1;
      renderQuestion();
    });
  });
}

function confidenceCalibrationLine(q, sel, confLevel) {
  const ok = sel === q.correctIndex;
  const labels = ["baja", "media", "alta"];
  const lab = labels[confLevel] ?? "media";
  if (ok && confLevel === 2) {
    return `<p class="conf-cal conf-cal--ok">Calibración: acertaste con confianza ${lab}.</p>`;
  }
  if (!ok && confLevel === 2) {
    return `<p class="conf-cal conf-cal--warn">Calibración: fallaste con confianza ${lab}; conviene repasar este punto en el temario.</p>`;
  }
  if (ok && confLevel === 0) {
    return `<p class="conf-cal conf-cal--ok">Acertaste con confianza ${lab}: repasa el porqué para fijar la idea.</p>`;
  }
  if (!ok && confLevel === 0) {
    return `<p class="conf-cal">Fallaste con confianza ${lab}: usa la explicación de arriba para cerrar el hueco.</p>`;
  }
  if (ok) {
    return `<p class="conf-cal conf-cal--ok">Acertaste (confianza ${lab}).</p>`;
  }
  return `<p class="conf-cal conf-cal--warn">Incorrecto (confianza ${lab}).</p>`;
}

function correctAnswerParagraph(q) {
  const t =
    Array.isArray(q.options) && typeof q.correctIndex === "number" && q.options[q.correctIndex] !== undefined
      ? String(q.options[q.correctIndex])
      : "";
  if (!t) return "";
  return `<p class="quiz-fb-correct"><strong>Respuesta correcta:</strong> ${escapeHtml(t)}</p>`;
}

/** Texto `explain` del banco, siempre en bloque etiquetado (acierto o error). */
function quizFeedbackExplainParagraph(q) {
  const raw = q.explain;
  const ex = typeof raw === "string" ? raw.trim() : "";
  if (!ex) {
    return `<p class="quiz-fb-explain muted"><strong>Explicación:</strong> No hay texto de explicación registrado en el banco para este ítem.</p>${quizFeedbackTemarioHint(q)}`;
  }
  const base = `<p class="quiz-fb-explain"><strong>Explicación:</strong> ${escapeHtml(ex)}</p>`;
  const sourceOnly = /^fuente\s*:/i.test(ex) && ex.length < 360;
  return base + (sourceOnly ? quizFeedbackTemarioHint(q) : "");
}

function showStudyFeedback(q) {
  const sel = quizState.answers[q.id];
  const fb = $("#quiz-feedback");
  if (sel === null || sel === undefined) {
    fb.textContent = "";
    return;
  }
  if (quizState.mode === "study" && quizState.studyFeedback === "confidence" && quizState.confidence[q.id] === undefined) {
    showConfidencePrompt(q);
    return;
  }
  const ok = sel === q.correctIndex;
  if (quizState.mode === "study") {
    bumpTopicQuizStatIfNew(q, ok);
  }
  const cal =
    quizState.studyFeedback === "confidence" && quizState.confidence[q.id] !== undefined
      ? confidenceCalibrationLine(q, sel, quizState.confidence[q.id])
      : "";
  if (quizState.studyFeedback === "deepen") {
    const lead = ok
      ? `<p class="quiz-fb-lead"><strong>Correcto.</strong></p>`
      : `<p class="quiz-fb-lead"><strong>Incorrecto.</strong></p>${correctAnswerParagraph(q)}`;
    fb.innerHTML = lead + renderDeepenPanel(q) + cal;
    return;
  }
  fb.innerHTML = (ok
    ? `<p class="quiz-fb-lead"><strong>Correcto.</strong></p>${quizFeedbackExplainParagraph(q)}`
    : `<p class="quiz-fb-lead"><strong>Incorrecto.</strong></p>${correctAnswerParagraph(q)}${quizFeedbackExplainParagraph(q)}`) + cal;
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
  return `<p class="muted conf-summary"><strong>Resumen de confianza (sesión):</strong> ${bits.join(" · ")}.</p>`;
}

function quizMissingConfidenceCount() {
  if (quizState.mode !== "study" || quizState.studyFeedback !== "confidence") return 0;
  return quizState.list.filter((qq) => {
    const sel = quizState.answers[qq.id];
    return sel !== null && sel !== undefined && quizState.confidence[qq.id] === undefined;
  }).length;
}

function finishQuiz() {
  if (quizState._finished) return;
  saveLastWrongIds(computeWrongIdsFromCurrentSession());
  quizState._finished = true;
  clearExamTimer();
  let good = 0;
  const wrong = [];
  quizState.list.forEach((q) => {
    const sel = quizState.answers[q.id];
    if (sel === null || sel === undefined) {
      wrong.push(q);
      return;
    }
    if (sel === q.correctIndex) good += 1;
    else wrong.push(q);
  });
  const total = quizState.list.length;
  if (total > 0) {
    mutateUserStats((s) => {
      s.gradedSessionsClosed += 1;
      s.gradedCorrectSum += good;
      s.gradedTotalSum += total;
      for (const qq of quizState.list) {
        s.seenQuestionIds[qq.id] = 1;
      }
    });
  }
  const pct = total ? Math.round((good / total) * 100) : 0;
  const isT = quizState.sessionType === "teorico";
  const minPass = Math.ceil(total / 2);
  const pass = isT && good >= minPass;
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
    ${wrongListHtml}
    ${calibrationSessionSummary()}`;
  $("#quiz-score").hidden = false;
  $("#quiz-score").textContent = `${good}/${total}`;
}

function goNext() {
  const total = quizState.list.length;
  if (quizState.index >= total - 1) return;
  quizState.index += 1;
  const q = currentQ();
  quizState.optionsVisible = !quizState.pretest;
  $("#quiz-pretext").value = "";
  $("#quiz-feedback").textContent = "";
  renderQuestion();
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
      $("#quiz-feedback").innerHTML =
        "<strong>Falta un paso:</strong> indica tu confianza (baja / media / alta) antes de pasar de pregunta.";
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
      $("#quiz-feedback").innerHTML = `<strong>Falta confianza en ${missEnd} pregunta(s).</strong> Usa «Anterior» y marca tu nivel de seguridad antes de finalizar.`;
      return;
    }
    finishQuiz();
    return;
  }
  const missLibre = quizMissingConfidenceCount();
  if (missLibre > 0) {
    $("#quiz-feedback").innerHTML = `<strong>Falta confianza en ${missLibre} pregunta(s).</strong> Revísalas antes de cerrar la sesión.`;
    return;
  }
  const wrongIds = computeWrongIdsFromCurrentSession();
  saveLastWrongIds(wrongIds);
  const wrongHint =
    wrongIds.length > 0
      ? ` Fallaste ${wrongIds.length}: marca «Solo las falladas de la última sesión» y pulsa <strong>Nueva sesión</strong> para repasarlas.`
      : "";
  $("#quiz-feedback").innerHTML = `<strong>Sesión completada.</strong>${wrongHint} Vuelve a empezar o cambia modo / parte para variar.`;
  mutateUserStats((s) => {
    s.studySessionsClosed += 1;
  });
}

function goPrev() {
  if (quizState.index === 0) return;
  quizState.index -= 1;
  quizState.optionsVisible = true;
  renderQuestion();
}

/* ---------- Flashcards + spacing ---------- */
const fcState = {
  deck: /** @type {Array<{ q: (typeof questionsData)[number]; due: number; step: number }>} */ ([]),
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
    const meta = $("#fc-meta");
    if (meta) {
      meta.textContent =
        "No hay preguntas en el banco para el tema seleccionado. Elige «Todos los temas» u otro bloque y pulsa de nuevo «Cargar tarjetas desde preguntas».";
    }
    updateDueBadge();
    return;
  }
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

function initNav() {
  if (!navDocumentBound) {
    navDocumentBound = true;
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-nav]");
      if (!el) return;
      const id = el.getAttribute("data-nav");
      if (!id) return;
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
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
      if (el.tagName === "A") {
        const href = el.getAttribute("href") || "";
        if (href.startsWith("#")) {
          e.preventDefault();
          location.hash = href.slice(1) || id;
        }
      } else {
        location.hash = id;
      }
      $("#site-nav")?.classList.remove("is-open");
      $("#nav-toggle")?.setAttribute("aria-expanded", "false");
    });
  }
  if (!hashChangeBound) {
    hashChangeBound = true;
    window.addEventListener("hashchange", onRoute);
  }
}

function initMobileNav() {
  const btn = $("#nav-toggle");
  const nav = $("#site-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
}

const A11Y_STORAGE_KEY = "radioexam_a11y_v1";

function loadA11yOpts() {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    return typeof o === "object" && o ? o : {};
  } catch {
    return {};
  }
}

function saveA11yOpts(/** @type {Record<string, boolean>} */ opts) {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(opts));
}

function applyA11yOpts(/** @type {Record<string, boolean>} */ opts) {
  const root = document.documentElement;
  root.classList.toggle("a11y-large-text", !!opts.large);
  root.classList.toggle("a11y-wide-lines", !!opts.spacing);
  root.classList.toggle("a11y-reduce-motion", !!opts.reduceMotion);
  root.classList.toggle("a11y-high-contrast", !!opts.contrast);
}

function initA11y() {
  const defaults = { large: false, spacing: false, reduceMotion: false, contrast: false };
  const opts = { ...defaults, ...loadA11yOpts() };
  applyA11yOpts(opts);

  const bind = (id, key) => {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLInputElement)) return;
    el.checked = !!opts[key];
    el.addEventListener("change", () => {
      opts[key] = el.checked;
      saveA11yOpts(opts);
      applyA11yOpts(opts);
    });
  };

  bind("a11y-large", "large");
  bind("a11y-spacing", "spacing");
  bind("a11y-reduce-motion", "reduceMotion");
  bind("a11y-contrast", "contrast");
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    initA11y();
    renderTemario();
    initTemarioInteractions();
    renderNormativa();
    renderMethods();
    initQuizTopicSelect();
    initFcTopicSelect();
    applyQuizPrefsToForm();
    initQuizPrefsAutosave();
    initQuizKeyboard();
    initTemarioFilter();
    updateWrongOnlyCheckboxVisibility();
    initNav();
    initMobileNav();
    syncPretestAvailability();
    $("#quiz-session")?.addEventListener("change", syncPretestAvailability);
    $("#quiz-part")?.addEventListener("change", validateTopicPartConsistency);
    onRoute();
    renderUserProgress();
    renderQuizProgressSummary();

    $("#quiz-start")?.addEventListener("click", startQuiz);
    $("#quiz-next")?.addEventListener("click", finishOrAdvanceQuiz);
    $("#quiz-prev")?.addEventListener("click", goPrev);

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
  } catch (err) {
    console.error(err);
    const el = $("#app-error");
    if (el) {
      el.hidden = false;
      el.textContent =
        "No se pudo inicializar la aplicación. Recarga la página; si persiste, abre la consola (F12) y comprueba que sirves la carpeta web por HTTP.";
    }
  }
});
