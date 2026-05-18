/**
 * BOE de referencia para RadioExamen (solo enlaces oficiales; no aloja PDFs del usuario).
 * Para el examen de aficionado en España, la norma del servicio es BOE-A-2013-7624.
 *
 * Fechas «consolidatedAt»: última actualización del texto consolidado en boe.es
 * (verificado con scripts/verify-boe-dates.mjs). «published»: publicación original en BOE.
 */

/** Revisión interna del catálogo (contraste fechas BOE). */
export const BOE_CATALOG_REVIEWED_AT = "2026-05-18";

/** Identificador BOE del reglamento vigente de radioaficionados. */
export const BOE_REG_AFICIONADOS_VIGENTE = "BOE-A-2013-7624";

/** Reglamento de aficionados derogado por IET/1311/2013 (bancos antiguos). */
export const BOE_REG_AFICIONADOS_2006 = "BOE-A-2006-10286";

/** Modificación del reglamento de equipos radioeléctricos (RD 188/2016). */
export const BOE_RD_EQUIPOS_2026 = "BOE-A-2026-5878";

/** Interfaces IR-291 / IR-292 (700 MHz, sistemas terrenales comerciales). */
export const BOE_INTERFACES_IR_2026 = "BOE-A-2026-552";

/** RD 188/2016 consolidado (Directiva RED 2014/53/UE; incluye mod. 13/03/2026). */
export const BOE_RD_EQUIPOS_BASE = "BOE-A-2016-4444";

/** RD 123/2017 — Reglamento general de uso del dominio público radioeléctrico (consolidado). */
export const BOE_DPR_GENERAL = "BOE-A-2017-2460";

/** RD 16/2023 — Modificación del RD 123/2017 (banda 26 GHz) y TDT (RD 391/2019). */
export const BOE_DPR_MOD_2023 = "BOE-A-2023-1192";

/** Ley 11/2022 General de Telecomunicaciones (consolidada). */
export const BOE_LEY_TELECOM_2022 = "BOE-A-2022-10757";

/** Ley 19/1983 — antenas (Orden de desarrollo en BOE). */
export const BOE_LEY_ANTENAS_1983 = "BOE-A-1983-25445";

/** RD 2623/1986 — instalaciones de antenas de aficionado. */
export const BOE_RD_ANTENAS_1986 = "BOE-A-1986-33766";

/**
 * @typedef {"aficionados-vigente" | "aficionados-historico" | "marco-telecom" | "marco-instalaciones" | "dpr-general" | "dpr-modificacion" | "equipos-vigente" | "equipos-modificacion" | "interfaces-espectro"} BoeRole
 */

/**
 * @type {{
 *   id: string,
 *   role: BoeRole,
 *   title: string,
 *   published: string,
 *   consolidatedAt?: string | null,
 *   examScope: string,
 *   hrefHtml: string,
 *   hrefPdf?: string,
 *   hrefEli?: string,
 *   supersedes?: string,
 *   modifies?: string,
 * }[]}
 */
export const BOE_NORMATIVA = [
  {
    id: BOE_REG_AFICIONADOS_VIGENTE,
    role: "aficionados-vigente",
    title: "Orden IET/1311/2013 — Reglamento de uso del dominio público radioeléctrico por radioaficionados",
    published: "Orden de 9 de julio de 2013 · BOE núm. 166, de 12 de julio de 2013",
    consolidatedAt: "10/04/2015",
    examScope:
      "Potencias (anexo I), bandas, trámites, prueba de capacitación (anexo II), licencias CEPT, estaciones y sanciones del servicio de aficionados.",
    hrefHtml: "https://www.boe.es/buscar/act.php?id=BOE-A-2013-7624",
    hrefPdf: "https://www.boe.es/buscar/pdf/2013/BOE-A-2013-7624-consolidado.pdf",
    hrefEli: "https://www.boe.es/eli/es/o/2013/07/09/iet1311/con",
    supersedes: BOE_REG_AFICIONADOS_2006,
  },
  {
    id: BOE_REG_AFICIONADOS_2006,
    role: "aficionados-historico",
    title: "Orden ITC/1791/2006 — Reglamento de aficionados (derogado)",
    published: "BOE núm. 140, de 13 de junio de 2006",
    consolidatedAt: "12/07/2013",
    examScope:
      "Solo contraste histórico: bancos FEDI/Quijotes anteriores a 2013 pueden citar redacciones superadas. No usar para potencias ni trámites vigentes.",
    hrefHtml: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-10286",
    hrefPdf: "https://www.boe.es/buscar/pdf/2006/BOE-A-2006-10286-consolidado.pdf",
    supersedes: undefined,
  },
  {
    id: BOE_LEY_TELECOM_2022,
    role: "marco-telecom",
    title: "Ley 11/2022 — General de Telecomunicaciones",
    published: "BOE núm. 154, de 29 de junio de 2022",
    consolidatedAt: "27/12/2025",
    examScope:
      "Marco sectorial citado por el reglamento de aficionados y el RD 123/2017. Sustituye en lo esencial a la Ley 9/2014 para materia vigente.",
    hrefHtml: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-10757",
    hrefEli: "https://www.boe.es/eli/es/l/2022/06/28/11/con",
  },
  {
    id: BOE_LEY_ANTENAS_1983,
    role: "marco-instalaciones",
    title: "Ley 19/1983 — antenas en fachadas (Orden de desarrollo BOE)",
    published: "Orden de 16 de septiembre de 1983 (desarrollo de la Ley 19/1983)",
    consolidatedAt: null,
    examScope:
      "Comunidades de propietarios, desmontaje de antenas y derecho a instalar en exterior de inmuebles; citada por el reglamento de estaciones fijas de aficionado.",
    hrefHtml: "https://www.boe.es/buscar/act.php?id=BOE-A-1983-25445",
  },
  {
    id: BOE_RD_ANTENAS_1986,
    role: "marco-instalaciones",
    title: "Real Decreto 2623/1986 — Instalaciones de antenas de estaciones de aficionado",
    published: "BOE núm. 312, de 30 de diciembre de 1986",
    consolidatedAt: null,
    examScope:
      "Requisitos técnicos y administrativos de instalaciones de antenas de aficionado; complementa la Ley 19/1983.",
    hrefHtml: "https://www.boe.es/buscar/act.php?id=BOE-A-1986-33766",
    hrefPdf: "https://www.boe.es/boe/dias/1986/12/30/pdfs/A42392-42394.pdf",
    hrefEli: "https://www.boe.es/eli/es/rd/1986/11/21/2623",
  },
  {
    id: BOE_DPR_GENERAL,
    role: "dpr-general",
    title: "Real Decreto 123/2017 — Reglamento sobre el uso del dominio público radioeléctrico",
    published: "BOE núm. 57, de 8 de marzo de 2017",
    consolidatedAt: "18/01/2023",
    examScope:
      "Marco general del DPR: concesiones, títulos habilitantes, bandas con limitación de otorgamientos (disp. adicional 1ª), trámites electrónicos. Complementa al reglamento de aficionados (BOE-A-2013-7624).",
    hrefHtml: "https://www.boe.es/buscar/act.php?id=BOE-A-2017-2460",
    hrefPdf: "https://www.boe.es/buscar/pdf/2017/BOE-A-2017-2460-consolidado.pdf",
    hrefEli: "https://www.boe.es/eli/es/rd/2017/02/24/123/con",
    supersedes: undefined,
  },
  {
    id: BOE_DPR_MOD_2023,
    role: "dpr-modificacion",
    title: "Real Decreto 16/2023 — Modificación del RD 123/2017 y del RD 391/2019 (TDT)",
    published: "BOE núm. 15, de 18 de enero de 2023 · vigencia 19/01/2023",
    consolidatedAt: null,
    examScope:
      "Reorganiza parte de la banda 26 GHz (5G) y aplaza el cese de emisiones TDT en SD al 14/02/2024. Integrado en el consolidado BOE-A-2017-2460 (actualización 18/01/2023).",
    hrefHtml: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-1192",
    hrefPdf: "https://www.boe.es/boe/dias/2023/01/18/pdfs/BOE-A-2023-1192.pdf",
    hrefEli: "https://www.boe.es/eli/es/rd/2023/01/17/16",
    modifies: BOE_DPR_GENERAL,
  },
  {
    id: BOE_RD_EQUIPOS_BASE,
    role: "equipos-vigente",
    title: "Real Decreto 188/2016 — Equipos radioeléctricos (consolidado)",
    published: "BOE núm. 113, de 10 de mayo de 2016 · vigencia 13/06/2016",
    consolidatedAt: "13/03/2026",
    examScope:
      "Marcado CE, comercialización y puesta en servicio de equipos radioeléctricos (Directiva 2014/53/UE). Complementa el reglamento de aficionado; no sustituye anexo I ni art. 25.h.",
    hrefHtml: "https://www.boe.es/buscar/act.php?id=BOE-A-2016-4444",
    hrefEli: "https://www.boe.es/eli/es/rd/2016/05/06/188/con",
    modifies: undefined,
  },
  {
    id: BOE_RD_EQUIPOS_2026,
    role: "equipos-modificacion",
    title: "Real Decreto 192/2026 — Modificación del RD 188/2016 (procedimientos de emergencia)",
    published: "BOE núm. 64, de 13 de marzo de 2026",
    consolidatedAt: null,
    examScope:
      "Transpone procedimientos de emergencia del mercado interior (cap. VI arts. 40-44 del reglamento del RD 188/2016). Integrado en consolidado BOE-A-2016-4444 (actualización 13/03/2026).",
    hrefHtml: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-5878",
    hrefPdf: "https://www.boe.es/boe/dias/2026/03/13/pdfs/BOE-A-2026-5878.pdf",
    hrefEli: "https://www.boe.es/eli/es/rd/2026/03/11/192",
    modifies: BOE_RD_EQUIPOS_BASE,
  },
  {
    id: BOE_INTERFACES_IR_2026,
    role: "interfaces-espectro",
    title: "Resolución SETID — Interfaces IR-291 e IR-292 (703-733 MHz y 758-788 MHz)",
    published: "Resolución de 19/02/2025 · BOE núm. 8, de 9 de enero de 2026",
    consolidatedAt: null,
    examScope:
      "Interfaces reglamentadas (art. 7 RD 188/2016) para MFCN en 700 MHz; no bandas de aficionado.",
    hrefHtml: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-552",
    hrefPdf: "https://www.boe.es/boe/dias/2026/01/09/pdfs/BOE-A-2026-552.pdf",
    modifies: BOE_RD_EQUIPOS_BASE,
  },
];

/** @param {typeof BOE_NORMATIVA[0]} b */
function roleLabel(b) {
  const labels = {
    "aficionados-vigente": "Reglamento aficionados (vigente)",
    "aficionados-historico": "Reglamento 2006 (derogado)",
    "marco-telecom": "Ley 11/2022 telecomunicaciones",
    "marco-instalaciones": "Antenas (1983 / RD 2623/1986)",
    "dpr-general": "DPR general RD 123/2017",
    "dpr-modificacion": "Mod. DPR / TDT (RD 16/2023)",
    "equipos-vigente": "Equipos radioeléctricos RD 188/2016",
    "equipos-modificacion": "Modificación RD 188/2016 (marzo 2026)",
    "interfaces-espectro": "Interfaces IR-291 / IR-292 (700 MHz)",
  };
  return labels[b.role] || b.role;
}

/**
 * Entradas para data/verification-sources.mjs (tier binding o historical).
 * @returns {{ id: string, tier: string, title: string, href?: string, note: string, format?: string }[]}
 */
export function boeEntriesForSourcesCatalog() {
  return BOE_NORMATIVA.map((b) => {
    const dateNote = b.consolidatedAt
      ? ` Consolidado actualizado en BOE: ${b.consolidatedAt}.`
      : "";
    return {
      id: `boe-${b.id.replace(/^BOE-A-/, "").toLowerCase()}`,
      tier: b.role === "aficionados-historico" ? "historical" : "binding",
      title: `${b.id} · ${b.title.split("—")[0].trim()}`,
      href: b.hrefHtml,
      format: b.hrefPdf ? "HTML/PDF BOE" : "HTML BOE",
      note: `${b.examScope} ${b.published}.${dateNote}`,
    };
  });
}

/**
 * Enlaces marco legal (regulatory.js · sección leyes marco).
 * @returns {{ label: string, href: string, note: string }[]}
 */
export function boeMarcoLinksForRegulatory() {
  return BOE_NORMATIVA.filter((b) => b.role === "marco-telecom" || b.role === "marco-instalaciones").map(
    (b) => ({
      label: `${b.id} · ${b.title.split("—")[0].trim()}`,
      href: b.hrefHtml,
      note: `${b.examScope} ${b.published}.${b.consolidatedAt ? ` Consolidado BOE: ${b.consolidatedAt}.` : ""}`,
    }),
  );
}

/**
 * Enlaces para la vista Normativa (regulatory.js · sección BOE).
 * @returns {{ label: string, href: string, note: string }[]}
 */
export function boeLinksForRegulatory() {
  return BOE_NORMATIVA.flatMap((b) => {
    const links = [
      {
        label: `${b.id} · ${roleLabel(b)}`,
        href: b.hrefHtml,
        note: [
          b.examScope,
          b.published,
          b.consolidatedAt ? `Consolidado BOE actualizado: ${b.consolidatedAt}.` : null,
        ]
          .filter(Boolean)
          .join(" "),
      },
    ];
    if (b.hrefPdf) {
      links.push({
        label: `PDF · ${b.id}`,
        href: b.hrefPdf,
        note: `Publicación o consolidado en PDF oficial (equivalente a Downloads/${b.id}.pdf).`,
      });
    }
    if (b.hrefEli) {
      links.push({
        label: `ELI · ${b.id}`,
        href: b.hrefEli,
        note: "Permalink europeo Law Identifier (ELI) en el BOE.",
      });
    }
    return links;
  });
}
