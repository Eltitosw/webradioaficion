/**
 * Catálogo de fuentes para verificación editorial (no aloja PDFs; enlaza fuentes oficiales y didácticas).
 * Jerarquía alineada con FUENTES_VERIFICACION.md y data/regulatory.js.
 */
import { boeEntriesForSourcesCatalog } from "./boe-normativa.mjs";

/** @typedef {"binding" | "harmonization" | "didactic" | "historical" | "project"} */

export const SOURCE_TIER_LABELS = {
  binding: "Vinculante (BOE, convocatoria, sede administrativa)",
  harmonization: "Armonización CEPT/UIT (HAREC, licencia CEPT)",
  didactic: "Didáctico (URE, manuales, guías, PDFs editoriales)",
  historical: "Banco histórico (FEDI-EA, Quijotes; contrastar con BOE)",
  project: "Proyecto (preguntas propias con sourceRef)",
};

/**
 * Fuentes con URL o referencia explícita. Los PDFs no se copian al repo.
 * @type {{ id: string, tier: string, title: string, href?: string, note: string, format?: string }[]}
 */
export const SOURCES_CATALOG = [
  ...boeEntriesForSourcesCatalog(),
  {
    id: "boe-reglamento-pdf-2013",
    tier: "binding",
    title: "PDF consolidado BOE-A-2013-7624",
    href: "https://www.boe.es/buscar/pdf/2013/BOE-A-2013-7624-consolidado.pdf",
    format: "PDF oficial",
    note: "Misma norma que HTML; búsqueda de art. 25.h y anexo I.",
  },
  {
    id: "admin-autorizacion",
    tier: "binding",
    title: "Autorización radioaficionado · sede administrativa",
    href: "https://avance.digital.gob.es/espectro/radioaficionados/autorizaciones/Paginas/autorizacion-administrativa-radioaficionado.aspx",
    format: "Web administración",
    note: "Trámites y requisitos vigentes; URL puede cambiar.",
  },
  {
    id: "cept-tr-61-01",
    tier: "harmonization",
    title: "CEPT T/R 61-01 · licencia CEPT",
    href: "https://docdb.cept.org/document/925",
    format: "PDF/web CEPT",
    note: "Operación temporal en países adheridos.",
  },
  {
    id: "cept-tr-61-02",
    tier: "harmonization",
    title: "CEPT T/R 61-02 · HAREC y programa",
    href: "https://docdb.cept.org/document/926",
    format: "PDF/web CEPT",
    note: "Programa de examen armonizado (anexo II reglamento español).",
  },
  {
    id: "ure-legislacion",
    tier: "didactic",
    title: "URE · Legislación y reglamentación",
    href: "https://www.ure.es/legislacion-y-reglamentacion/",
    format: "Web",
    note: "Recopilación didáctica; contrastar cifras con BOE.",
  },
  {
    id: "ure-examenes",
    tier: "didactic",
    title: "URE · Exámenes electricidad y reglamentación",
    href: "https://www.ure.es/examenes/electricidad-y-radioelectricidad/",
    format: "Web",
    note: "Tests de práctica URE.",
  },
  {
    id: "fediea-ejercicios",
    tier: "historical",
    title: "FEDI-EA · Ejercicios históricos",
    href: "https://www.fediea.org/examen/ejercicios/",
    format: "Web",
    note: "Banco por bloques; puede estar desfasado (p. ej. 2011).",
  },
  {
    id: "quijotes-tests",
    tier: "historical",
    title: "Radio Club Quijotes EA3RCQ · tests",
    href: "https://radioclubquijotes.org/qsm_quiz/reglamentacion/",
    format: "Web",
    note: "Importado parcialmente; contrastar normativa con BOE.",
  },
  {
    id: "pdf-radiomania-temario",
    tier: "didactic",
    title: "Radiomanía · Temario simplificado (PDF comercial)",
    href: "https://radiomania.net/WebRoot/Store14/Shops/a460337c-7435-4ca8-a697-f50605a3ed82/58C2/A070/5BDC/3557/4836/0A48/3534/C9F6/89754710-Temario-Simplificado-Del-Libro-de-Examen-de-Radio-Aficionado.pdf",
    format: "PDF terceros",
    note: "Resumen editorial; no sustituye anexo II ni HAREC.",
  },
  {
    id: "libro-ea5rca",
    tier: "didactic",
    title: "Libro EA5RCA (EA5CB) · descarga oficial",
    href: "https://www.ea5rca.es",
    format: "Libro/PDF externo",
    note: "No alojado en RadioExamen; contrastar con BOE/CEPT.",
  },
  {
    id: "urvag-curso",
    tier: "didactic",
    title: "URVAG · curso interactivo EA3OG",
    href: "https://urvag.com/index.php/radioaficion/articulos-de-ea3og/674-curso-interactivo-para-la-obtencion-de-la-autorizacion-de-operador-radioaficionado",
    format: "Web",
    note: "Curso divulgativo.",
  },
  {
    id: "ea5ura-guia",
    tier: "didactic",
    title: "EA5URA · guía licencia España",
    href: "https://ea5ura.org/guia-para-obtener-la-licencia-de-radioaficionado-en-espana/",
    format: "Web",
    note: "Guía orientativa de trámite.",
  },
  {
    id: "topics-study",
    tier: "didactic",
    title: "Temario integrado · data/topics-study.js",
    format: "Repositorio",
    note: "Síntesis por bloque con campo sources; contrastar normativa con BOE.",
  },
  {
    id: "project-propias",
    tier: "project",
    title: "Preguntas propias · questions-examen-propias.js",
    format: "Repositorio",
    note: "Cada ítem con sourceRef explícito.",
  },
];

/** Prefijos de id de pregunta → origen y nivel de confianza. */
export const QUESTION_SOURCE_BY_PREFIX = [
  { re: /^fedi-/, tier: "historical", catalogId: "fediea-ejercicios", label: "FEDI-EA" },
  { re: /^quijotes-/, tier: "historical", catalogId: "quijotes-tests", label: "Quijotes EA3RCQ" },
  { re: /^ure-/, tier: "didactic", catalogId: "ure-examenes", label: "URE" },
  { re: /^ofic-/, tier: "project", catalogId: "project-propias", label: "Propias RadioExamen" },
];

/**
 * @param {object} q
 */
export function getQuestionSourceMeta(q) {
  const id = String(q?.id || "");
  for (const row of QUESTION_SOURCE_BY_PREFIX) {
    if (row.re.test(id)) return { ...row };
  }
  return { tier: "didactic", catalogId: "topics-study", label: "Otro/importado" };
}

/**
 * @param {string} tier
 */
export function tierRank(tier) {
  const order = ["binding", "harmonization", "didactic", "historical", "project"];
  const i = order.indexOf(tier);
  return i === -1 ? 99 : i;
}
