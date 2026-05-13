/**
 * Utilidades puras para el cuaderno de errores y diagnóstico por tema.
 * No acceden a localStorage: la app decide cuándo persistir.
 */

export function answerText(question, index) {
  if (!Array.isArray(question.options) || typeof index !== "number" || question.options[index] === undefined) {
    return "Sin respuesta";
  }
  return String(question.options[index]);
}

export function buildErrorEntry(question, selectedIndex, confidenceLevel, now = Date.now()) {
  const highSecurity = confidenceLevel === 2 ? 1 : 0;
  return {
    qid: question.id,
    topicId: question.topicId,
    part: question.part,
    stem: question.stem,
    selectedIndex,
    correctIndex: question.correctIndex,
    selectedAnswer: answerText(question, selectedIndex),
    correctAnswer: answerText(question, question.correctIndex),
    explanation: typeof question.explain === "string" ? question.explain : "",
    sourceRef: typeof question.sourceRef === "string" ? question.sourceRef : "",
    firstWrongAt: now,
    lastWrongAt: now,
    lastCorrectAt: null,
    wrongCount: 1,
    correctAfterWrongCount: 0,
    highSecurityWrongCount: highSecurity,
    lastConfidenceLevel: typeof confidenceLevel === "number" ? confidenceLevel : null,
    status: "open",
  };
}

export function updateErrorNotebookWithResult(notebook, question, selectedIndex, isCorrect, confidenceLevel, now = Date.now()) {
  const current = notebook?.[question.id] || null;
  const next = { ...(notebook || {}) };

  if (isCorrect) {
    if (!current) return next;
    next[question.id] = {
      ...current,
      lastCorrectAt: now,
      correctAfterWrongCount: (current.correctAfterWrongCount || 0) + 1,
      lastConfidenceLevel: typeof confidenceLevel === "number" ? confidenceLevel : current.lastConfidenceLevel ?? null,
      status: "improving",
    };
    return next;
  }

  if (!current) {
    next[question.id] = buildErrorEntry(question, selectedIndex, confidenceLevel, now);
    return next;
  }

  next[question.id] = {
    ...current,
    selectedIndex,
    correctIndex: question.correctIndex,
    selectedAnswer: answerText(question, selectedIndex),
    correctAnswer: answerText(question, question.correctIndex),
    explanation: typeof question.explain === "string" ? question.explain : current.explanation || "",
    sourceRef: typeof question.sourceRef === "string" ? question.sourceRef : current.sourceRef || "",
    lastWrongAt: now,
    wrongCount: (current.wrongCount || 0) + 1,
    highSecurityWrongCount: (current.highSecurityWrongCount || 0) + (confidenceLevel === 2 ? 1 : 0),
    lastConfidenceLevel: typeof confidenceLevel === "number" ? confidenceLevel : current.lastConfidenceLevel ?? null,
    status: "open",
  };
  return next;
}

export function errorNotebookEntries(notebook) {
  return Object.values(notebook || {}).filter((entry) => entry && typeof entry === "object" && entry.qid);
}

export function isActiveError(entry) {
  return !entry.lastCorrectAt || (entry.lastWrongAt || 0) >= (entry.lastCorrectAt || 0);
}

export function buildTopicDiagnostics(notebook, topicStats = {}, topicParts = []) {
  const rows = new Map();

  for (const part of topicParts || []) {
    for (const block of part.blocks || []) {
      rows.set(block.id, {
        topicId: block.id,
        title: block.title,
        partId: part.id,
        partTitle: part.title,
        attempts: 0,
        ok: 0,
        accuracy: null,
        wrongCount: 0,
        activeErrors: 0,
        highSecurityWrongCount: 0,
        score: 0,
      });
    }
  }

  for (const [topicId, stat] of Object.entries(topicStats || {})) {
    const row = rows.get(topicId);
    if (!row) continue;
    row.attempts = Number.isFinite(stat?.t) ? stat.t : 0;
    row.ok = Number.isFinite(stat?.ok) ? stat.ok : 0;
    row.accuracy = row.attempts > 0 ? Math.round((row.ok / row.attempts) * 100) : null;
  }

  for (const entry of errorNotebookEntries(notebook)) {
    const row = rows.get(entry.topicId);
    if (!row) continue;
    row.wrongCount += Number.isFinite(entry.wrongCount) ? entry.wrongCount : 0;
    row.highSecurityWrongCount += Number.isFinite(entry.highSecurityWrongCount) ? entry.highSecurityWrongCount : 0;
    if (isActiveError(entry)) row.activeErrors += 1;
  }

  for (const row of rows.values()) {
    const lowAccuracyPenalty = row.attempts >= 3 && row.accuracy !== null ? Math.max(0, 75 - row.accuracy) / 10 : 0;
    row.score =
      row.activeErrors * 4 + row.highSecurityWrongCount * 3 + row.wrongCount + Math.round(lowAccuracyPenalty);
  }

  return [...rows.values()]
    .filter((row) => row.score > 0 || row.attempts > 0)
    .sort((a, b) => b.score - a.score || b.activeErrors - a.activeErrors || a.title.localeCompare(b.title));
}

export function buildRecommendedPlan(diagnostics) {
  const [top] = diagnostics || [];
  if (!top) {
    return {
      title: "Empieza por un bloque concreto",
      topicId: null,
      steps: [
        "Elige un tema del temario y estudia la teoría explicada.",
        "Haz una sesión corta en Practicar con corrección inmediata.",
        "Cuando aparezca el primer fallo, el entrenador empezará a priorizar.",
      ],
    };
  }
  return {
    title: `Prioridad: ${top.title}`,
    topicId: top.topicId,
    steps: [
      "Repasa la teoría explicada y los errores típicos de este bloque.",
      "Haz 10-15 preguntas filtradas por este tema en modo estudio.",
      "Repite solo falladas si aparecen, y marca seguridad alta solo cuando puedas justificar la respuesta.",
      "Pasa las reglas débiles a tarjetas o repaso espaciado.",
    ],
  };
}

function pushUnique(out, seen, id, validIds) {
  if (!id || seen.has(id) || !validIds.has(id)) return false;
  seen.add(id);
  out.push(id);
  return true;
}

export function buildSmartReviewQuestionIds(notebook, diagnostics = [], allQuestions = [], max = 15) {
  const limit = Math.max(1, max);
  const validIds = new Set(allQuestions.map((q) => q.id).filter(Boolean));
  const out = [];
  const seen = new Set();
  const entries = errorNotebookEntries(notebook)
    .filter((entry) => isActiveError(entry))
    .sort(
      (a, b) =>
        (b.highSecurityWrongCount || 0) - (a.highSecurityWrongCount || 0) ||
        (b.wrongCount || 0) - (a.wrongCount || 0) ||
        (b.lastWrongAt || 0) - (a.lastWrongAt || 0),
    );

  for (const entry of entries) {
    pushUnique(out, seen, entry.qid, validIds);
    if (out.length >= limit) return out;
  }

  const topicIds = (diagnostics || [])
    .filter((row) => row && row.topicId && row.score > 0)
    .slice(0, 3)
    .map((row) => row.topicId);
  const targetFromWeakTopics = Math.max(out.length, Math.ceil(limit * 0.8));

  for (const topicId of topicIds) {
    for (const q of allQuestions) {
      if (q.topicId !== topicId) continue;
      pushUnique(out, seen, q.id, validIds);
      if (out.length >= targetFromWeakTopics || out.length >= limit) break;
    }
    if (out.length >= targetFromWeakTopics || out.length >= limit) break;
  }

  for (const q of allQuestions) {
    pushUnique(out, seen, q.id, validIds);
    if (out.length >= limit) break;
  }

  return out;
}

function emptyReadinessPart(part) {
  return {
    partId: part.id,
    title: part.title,
    status: "needs_work",
    label: "Falta trabajo",
    accuracy: null,
    coverage: 0,
    touchedBlocks: 0,
    totalBlocks: (part.blocks || []).length,
    activeErrors: 0,
    highSecurityWrongCount: 0,
    passedSimulations: 0,
    reasons: ["Aún faltan datos de práctica suficiente."],
    nextAction: "Estudia un bloque, practica ese tema y deja que el entrenador acumule diagnóstico.",
  };
}

export function buildExamReadiness(topicParts = [], diagnostics = [], userStats = {}) {
  const byPart = new Map();
  for (const part of topicParts || []) {
    byPart.set(part.id, emptyReadinessPart(part));
  }

  for (const row of diagnostics || []) {
    const part = byPart.get(row.partId);
    if (!part) continue;
    if (row.attempts > 0) part.touchedBlocks += 1;
    part.activeErrors += row.activeErrors || 0;
    part.highSecurityWrongCount += row.highSecurityWrongCount || 0;
    part._attempts = (part._attempts || 0) + (row.attempts || 0);
    part._ok = (part._ok || 0) + (row.ok || 0);
  }

  const gradedByPart = userStats?.gradedByPart && typeof userStats.gradedByPart === "object" ? userStats.gradedByPart : {};

  return [...byPart.values()].map((part) => {
    const attempts = part._attempts || 0;
    const ok = part._ok || 0;
    const coverage = part.totalBlocks ? Math.round((part.touchedBlocks / part.totalBlocks) * 100) : 0;
    const accuracy = attempts > 0 ? Math.round((ok / attempts) * 100) : null;
    const sim = gradedByPart[part.partId] || {};
    const passedSimulations = Number.isFinite(sim.passed) ? sim.passed : 0;
    const reasons = [];

    if (accuracy === null) reasons.push("Sin porcentaje de estudio suficiente.");
    else reasons.push(`${accuracy} % de aciertos acumulados en estudio.`);
    reasons.push(`${coverage} % de bloques practicados.`);
    if (part.activeErrors) reasons.push(`${part.activeErrors} error(es) activo(s) en cuaderno.`);
    else reasons.push("Sin errores activos registrados.");
    if (part.highSecurityWrongCount) reasons.push(`${part.highSecurityWrongCount} fallo(s) con seguridad alta.`);
    else reasons.push("Sin fallos de seguridad alta pendientes.");
    reasons.push(`${passedSimulations} simulacro(s) de 30 preguntas aprobado(s).`);

    let status = "needs_work";
    let label = "Falta trabajo";
    let nextAction = "Usa Repaso inteligente y refuerza los bloques con más errores antes de simular examen.";

    if (
      accuracy !== null &&
      accuracy >= 80 &&
      coverage >= 70 &&
      part.activeErrors <= 1 &&
      part.highSecurityWrongCount === 0 &&
      passedSimulations >= 2
    ) {
      status = "ready";
      label = "Listo";
      nextAction = "Mantén repaso espaciado y haz un simulacro periódico para conservar nivel.";
    } else if (
      accuracy !== null &&
      accuracy >= 65 &&
      coverage >= 45 &&
      part.highSecurityWrongCount <= 1 &&
      passedSimulations >= 1
    ) {
      status = "almost";
      label = "Casi";
      nextAction = "Haz un Repaso inteligente y cierra errores activos antes de buscar dos simulacros aprobados.";
    }

    delete part._attempts;
    delete part._ok;
    return {
      ...part,
      status,
      label,
      accuracy,
      coverage,
      passedSimulations,
      reasons,
      nextAction,
    };
  });
}
