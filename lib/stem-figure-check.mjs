import fs from "node:fs";
import path from "node:path";

export const STEM_FIGURE_PATH_RE = /^images\/quiz\/[A-Za-z0-9._-]+\.(svg|png|webp)$/i;
export const EXPLICIT_FIGURE_STEM_RE =
  /(siguiente\s+(esquema|gr[aá]fico|figura|diagrama|circuito)|ver\s+(gr[aá]fico|figura|diagrama|circuito)|pantalla de un osciloscopio|señal representada|senal representada)/i;

/**
 * Validación de stemFigure / stemFigureAlt (misma regla de ruta que safeStemFigureSrc en app.js).
 * @param {readonly unknown[]} all
 * @param {string} webRoot Ruta absoluta a la raíz del proyecto.
 * @param {(msg: string) => void} fail
 */
export function checkStemFigures(all, webRoot, fail) {
  for (const q of all) {
    if (!q || typeof q !== "object") continue;
    const id = typeof q.id === "string" ? q.id : "(sin id)";
    const stem = typeof q.stem === "string" ? q.stem : "";
    if (EXPLICIT_FIGURE_STEM_RE.test(stem) && !("stemFigure" in q)) {
      fail(`Pregunta ${id}: el enunciado menciona figura/esquema/gráfico pero no define stemFigure.`);
      continue;
    }
    if (!("stemFigure" in q)) continue;
    const raw = /** @type {{ stemFigure?: unknown; stemFigureAlt?: unknown; id?: string }} */ (q).stemFigure;
    if (typeof raw !== "string" || !raw.trim()) {
      fail(`Pregunta ${id}: stemFigure debe ser una ruta no vacía.`);
      continue;
    }
    const rel = raw.trim();
    if (!STEM_FIGURE_PATH_RE.test(rel)) {
      fail(
        `Pregunta ${id}: stemFigure no cumple el patrón permitido (images/quiz/nombre.svg|png|webp): ${JSON.stringify(rel)}`,
      );
      continue;
    }
    const abs = path.join(webRoot, ...rel.split("/"));
    if (!fs.existsSync(abs)) {
      fail(`Pregunta ${id}: no existe el archivo de figura ${rel}`);
      continue;
    }
    const alt = "stemFigureAlt" in q ? /** @type {{ stemFigureAlt?: unknown }} */ (q).stemFigureAlt : "";
    if (typeof alt !== "string" || !alt.trim()) {
      fail(`Pregunta ${id}: stemFigure requiere stemFigureAlt descriptivo.`);
    }
    if (rel.toLowerCase().endsWith(".svg")) {
      const svgText = fs.readFileSync(abs, "utf8");
      if (!/\bviewBox\s*=\s*["'][^"']+["']/i.test(svgText)) {
        fail(`Pregunta ${id}: SVG sin atributo viewBox (${rel}).`);
      }
      const open = svgText.match(/<svg\b[^>]*>/i);
      if (open && !/\bwidth\s*=/i.test(open[0])) {
        fail(`Pregunta ${id}: SVG sin width intrínseco en la raíz (${rel}); añade width/height junto al viewBox.`);
      }
      if (open && !/\bheight\s*=/i.test(open[0])) {
        fail(`Pregunta ${id}: SVG sin height intrínseco en la raíz (${rel}); añade width/height junto al viewBox.`);
      }
    }
  }
}
