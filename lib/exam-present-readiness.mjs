/**
 * Resumen global: ¿conviene presentarse al examen según datos locales?
 * Complementa buildExamReadiness (por prueba) con un veredicto único.
 */

/** Simulacros aptos (≥50 %) por prueba recomendados antes de presentarse. */
export const EXAM_PASS_MIN_SIMULATIONS_PER_PART = 2;

/**
 * @param {Array<{ partId: string, status: string, passedSimulations: number, activeErrors: number, highSecurityWrongCount: number }>} readiness
 * @param {{ p1?: { passed?: number }, p2?: { passed?: number } }} [gradedByPart]
 */
export function summarizePresentReadiness(readiness, gradedByPart = {}) {
  const byId = Object.fromEntries((readiness || []).map((r) => [r.partId, r]));
  const p1 = byId.p1;
  const p2 = byId.p2;
  const simP1 = Number(gradedByPart.p1?.passed) || p1?.passedSimulations || 0;
  const simP2 = Number(gradedByPart.p2?.passed) || p2?.passedSimulations || 0;
  const bothReady = p1?.status === "ready" && p2?.status === "ready";
  const bothAlmost =
    (p1?.status === "ready" || p1?.status === "almost") &&
    (p2?.status === "ready" || p2?.status === "almost");
  const simsOk =
    simP1 >= EXAM_PASS_MIN_SIMULATIONS_PER_PART && simP2 >= EXAM_PASS_MIN_SIMULATIONS_PER_PART;
  const errorsOk =
    (p1?.activeErrors || 0) <= 1 &&
    (p2?.activeErrors || 0) <= 1 &&
    (p1?.highSecurityWrongCount || 0) === 0 &&
    (p2?.highSecurityWrongCount || 0) === 0;

  if (bothReady || (simsOk && errorsOk && bothAlmost)) {
    return {
      status: "ready",
      label: "Listo para presentarte",
      canPresent: true,
      message:
        "Has cumplido el criterio interno: buen nivel en estudio, cobertura de bloques y al menos dos simulacros aptos por prueba (o indicador «Listo» en ambas). Repasa convocatoria y BOE antes de inscribirte.",
      simP1,
      simP2,
    };
  }

  if (simsOk || bothAlmost) {
    const missing = [];
    if (simP1 < EXAM_PASS_MIN_SIMULATIONS_PER_PART) missing.push(`1.ª prueba: faltan simulacros aptos (${simP1}/${EXAM_PASS_MIN_SIMULATIONS_PER_PART})`);
    if (simP2 < EXAM_PASS_MIN_SIMULATIONS_PER_PART) missing.push(`2.ª prueba: faltan simulacros aptos (${simP2}/${EXAM_PASS_MIN_SIMULATIONS_PER_PART})`);
    if (!errorsOk) missing.push("cierra errores activos o fallos de seguridad alta en el Cuaderno");
    return {
      status: "almost",
      label: "Casi listo",
      canPresent: false,
      message: `Vas bien, pero aún no conviene presentarte con tranquilidad. ${missing.join("; ")}.`,
      simP1,
      simP2,
    };
  }

  const hints = [];
  if (simP1 < 1) hints.push("haz al menos un simulacro apto de 1.ª prueba");
  else if (simP1 < EXAM_PASS_MIN_SIMULATIONS_PER_PART) hints.push("repite simulacros de 1.ª prueba hasta 2 aptos seguidos");
  if (simP2 < 1) hints.push("haz al menos un simulacro apto de 2.ª prueba");
  else if (simP2 < EXAM_PASS_MIN_SIMULATIONS_PER_PART) hints.push("repite simulacros de 2.ª prueba hasta 2 aptos seguidos");
  if (!hints.length) hints.push("practica más bloques del temario y corrige el cuaderno");

  return {
    status: "needs_work",
    label: "Sigue preparando",
    canPresent: false,
    message: `Para el apto necesitas estudio por bloques y simulacros sin pistas. Siguiente paso: ${hints.join("; ")}.`,
    simP1,
    simP2,
  };
}
