/**
 * Enlaces y notas orientativas. El texto legal completo solo en el BOE.
 * Texto consolidado: informativo; para fines jurídicos, publicación oficial.
 */
import { boeLinksForRegulatory, boeMarcoLinksForRegulatory, BOE_CATALOG_REVIEWED_AT } from "./boe-normativa.mjs";

export default {
  headline: "Normativa principal (España)",
  intro:
    "Este simulador prepara el examen oficial de radioaficionado y la autorización administrativa en España (Secretaría de Estado de Telecomunicaciones y Digitalización). La norma del servicio es la Orden IET/1311/2013 (BOE-A-2013-7624). No incluye temas de Tráfico (DGT carreteras), TETRA ni bancos ajenos al temario del examen.",
  trustNote:
    "Las asociaciones y los bancos de tests enlazan aquí como apoyo didáctico. El simulador corrige respuestas y explicaciones frente a BOE-A-2013-7624; si hubiera discrepancia con el texto oficial, prevalece siempre el BOE.",
  /** Saltos dentro de la vista Normativa (scroll suave). */
  normativaNav: [
    { id: "normativa-boe", label: "BOE" },
    { id: "normativa-verificacion", label: "Verificación" },
    { id: "normativa-marco", label: "Leyes marco" },
    { id: "normativa-europa", label: "CEPT" },
    { id: "normativa-practica", label: "Práctica examen" },
    { id: "normativa-guias", label: "Guías y cursos" },
    { id: "normativa-asociaciones", label: "Asociaciones" },
    { id: "normativa-temas", label: "Temas de estudio" },
  ],
  linkGroups: [
    {
      id: "normativa-boe",
      title: "1. BOE y administración (fuente vinculante)",
      blurb:
        "Para potencias, bandas, trámites o sanciones del servicio de aficionados, usa BOE-A-2013-7624. Los PDF locales (2013, 2006 derogado, 2026 equipos) deben coincidir con estos enlaces oficiales del BOE.",
      links: [
        ...boeLinksForRegulatory(),
        {
          label: "Exámenes de radioaficionado (convocatoria y programa)",
          href: "https://avance.digital.gob.es/espectro/radioaficionados/Paginas/examenes-radioaficionado.aspx",
          note: "Referencia oficial del examen: dos pruebas (electricidad/radioelectricidad y reglamentación). El simulador se alinea a este ámbito.",
        },
        {
          label: "Autorización de radioaficionado",
          href: "https://avance.digital.gob.es/espectro/radioaficionados/autorizaciones/Paginas/autorizacion-administrativa-radioaficionado.aspx",
          note: "Trámite de autorización tras superar el examen. No confundir con la DGT de Tráfico (carreteras).",
        },
      ],
    },
    {
      id: "normativa-marco",
      title: "2. Leyes marco citadas en el reglamento (BOE)",
      blurb:
        "El reglamento de aficionado remite con frecuencia a la Ley General de Telecomunicaciones, a la ley de antenas en fachadas y al RD de instalaciones de antenas. Complétalo con el anexo I del propio reglamento.",
      links: [
        ...boeMarcoLinksForRegulatory(),
        {
          label: "Ley 9/2014, General de Telecomunicaciones (BOE) — sustituida en lo esencial",
          href: "https://www.boe.es/buscar/act.php?id=BOE-A-2014-4950",
          note: "Marco histórico; consolidado BOE últ. 29/06/2022. Para estudio vigente usar Ley 11/2022 (BOE-A-2022-10757).",
        },
        {
          label: "Normativa en telecomunicaciones · CNMC",
          href: "https://www.cnmc.es/somos-cnmc/normativa/normativa-telecomunicaciones",
          note: "Supervisión de mercados y normativa aplicable en telecomunicaciones (complementario respecto al examen de aficionado; útil para contexto jurídico).",
        },
      ],
    },
    {
      id: "normativa-europa",
      title: "3. CEPT y HAREC (armonización europea)",
      blurb:
        "El programa de examen y la licencia CEPT están alineados con recomendaciones CEPT; el BOE español sigue siendo la referencia para operar en España.",
      links: [
        {
          label: "ECO/CEPT · T/R 61-01 (licencia CEPT de radioaficionado)",
          href: "https://docdb.cept.org/document/925",
          note: "Documento activo de la base ECO: licencia CEPT para operación temporal; última actualización publicada 18/10/2024.",
        },
        {
          label: "ECO/CEPT · T/R 61-02 (HAREC y programa armonizado)",
          href: "https://docdb.cept.org/document/926",
          note: "Documento activo de la base ECO: certificados HAREC y programa armonizado; última actualización publicada 16/02/2024.",
        },
        {
          label: "ECO/CEPT · Implementación T/R 61-01 y T/R 61-02",
          href: "https://docdb.cept.org/implementation/925",
          note: "Estado de implementación por países para T/R 61-01.",
        },
        {
          label: "ECO/CEPT · Implementación HAREC/T/R 61-02",
          href: "https://docdb.cept.org/implementation/926",
          note: "Estado de implementación por países para certificados HAREC y recomendación T/R 61-02.",
        },
      ],
    },
    {
      id: "normativa-practica",
      title: "4. Práctica de examen y bancos de preguntas",
      blurb:
        "Material de entrenamiento alineado con BOE-A-2013-7624. Si un enunciado antiguo contradice el BOE, el banco del simulador se corrige; prevalece siempre el texto oficial.",
      links: [
        {
          label: "Legislación y reglamentación · URE",
          href: "https://www.ure.es/legislacion-y-reglamentacion/",
          note: "Recopilación desde la Unión de Radioaficionados Españoles (entidad de ámbito estatal, utilidad pública).",
        },
        {
          label: "Exámenes de práctica · URE (Electricidad y radioelectricidad)",
          href: "https://www.ure.es/examenes/electricidad-y-radioelectricidad/",
          note: "Listado tipo test en la web de la URE.",
        },
        {
          label: "Ejercicios y tests · FEDI-EA",
          href: "https://www.fediea.org/examen/ejercicios/",
          note: "Banco histórico por bloques y convocatorias (puede estar obsoleto; advierten posibles errores).",
        },
        {
          label: "Tests en línea · Radio Club Quijotes (EA3RCQ)",
          href: "https://radioclubquijotes.org/qsm_quiz/reglamentacion/",
          note: "Reglamentación y electricidad (examen y corrección inmediata). Esta app importa un subconjunto; si se actualiza, vuelve a contrastarlo con BOE y convocatoria.",
        },
      ],
    },
    {
      id: "normativa-guias",
      title: "5. Guías, temarios en PDF y cursos (terceros)",
      blurb:
        "Material didáctico de editoriales, asociaciones y particulares. Las URLs pueden cambiar; el criterio legal y técnico sigue en el BOE y en la convocatoria oficial. Contrasta fechas y cifras (potencias, bandas) con el reglamento consolidado.",
      links: [
        {
          label: "Libro oficial de examen (programa HAREC, PDF en 4 partes)",
          href: "https://avance.digital.gob.es/espectro/radioaficionados/Paginas/examenes-radioaficionado.aspx",
          note:
            "Guía editorial del examen: 1.ª parte Técnica, 2.ª Normas y procedimientos, 3.ª Normativa. Puedes guardar los capítulos en local (ver docs/LIBRO_OFICIAL_ESTUDIO.md en el repositorio); no se redistribuyen desde RadioExamen.",
        },
        {
          label: "PDF · Temario simplificado del libro de examen (tienda Radiomanía)",
          href: "https://radiomania.net/WebRoot/Store14/Shops/a460337c-7435-4ca8-a697-f50605a3ed82/58C2/A070/5BDC/3557/4836/0A48/3534/C9F6/89754710-Temario-Simplificado-Del-Libro-de-Examen-de-Radio-Aficionado.pdf",
          note: "Descarga comercial; úsalo como resumen, no como sustituto del anexo II del BOE ni del programa HAREC.",
        },
        {
          label: "Curso interactivo · URVAG (artículo EA3OG)",
          href: "https://urvag.com/index.php/radioaficion/articulos-de-ea3og/674-curso-interactivo-para-la-obtencion-de-la-autorizacion-de-operador-radioaficionado",
          note: "Curso divulgativo en abierto; requisitos y textos vinculantes: BOE y sede administrativa vigente.",
        },
        {
          label: "Guía para obtener la licencia en España · EA5URA",
          href: "https://ea5ura.org/guia-para-obtener-la-licencia-de-radioaficionado-en-espana/",
          note: "Guía orientativa sobre trámite y estudio; verifica siempre la normativa y los plazos publicados oficialmente.",
        },
        {
          label: "Libro de examen EA5CB · Radio Club Utiel (PDF gratuito, descarga oficial)",
          href: "https://www.ea5rca.es",
          note:
            "Más de 1.000 preguntas de estudio en el libro del autor (mayo 2025). No se aloja en RadioExamen ni se copian sus enunciados por copyright; úsalo como apoyo paralelo y contrasta con BOE/CEPT.",
        },
        {
          label: "URE · Ejemplos de examen",
          href: "https://www.ure.es/ejemplos-de-examen/",
          note: "Material de apoyo en el sitio de la Unión de Radioaficionados Españoles.",
        },
        {
          label: "URE · Exámenes (índice de recursos)",
          href: "https://www.ure.es/examenes/",
          note: "Listados de práctica, electricidad, reglamentación y convocatorias según la web vigente de la URE.",
        },
      ],
    },
    {
      id: "normativa-asociaciones",
      title: "6. Asociaciones y clubes (divulgación y comunidad)",
      blurb:
        "Ejemplos de entidades que publican actividades y refuerzan el cumplimiento del Reglamento de Radiocomunicaciones y del reglamento de aficionados. No son fuente legal sustitutiva del BOE.",
      links: [
        {
          label: "Unión de Radioaficionados de Sevilla (EA7URS)",
          href: "https://www.ea7urs.es/que-es-la-u-r-s/",
          note: "Asociación territorial miembro de URE; en sus fines figura explícitamente cumplir y estimular el cumplimiento de la normativa de radiocomunicaciones y de estaciones de aficionado.",
        },
        {
          label: "Web principal EA7URS",
          href: "https://www.ea7urs.es/",
          note: "Calendario, sede y actividades en Sevilla.",
        },
      ],
    },
  ],
  sourceHierarchy: [
    "Fuente vinculante: BOE publicado/consolidado, convocatoria oficial de la prueba y sede administrativa vigente. Aquí se verifican potencias, bandas, plazos, trámites, sanciones y criterio real del examen.",
    "Armonización: CEPT/ECC, especialmente T/R 61-01 para licencia CEPT temporal y T/R 61-02 para programa HAREC. Sirve para entender reconocimiento y programa, no sustituye la norma española.",
    "Apoyo técnico y didáctico: URE, manuales, guías y cursos. Son útiles para estudiar, pero las cifras legales se contrastan con BOE y convocatoria.",
    "Bancos históricos o de terceros: FEDI-EA, Quijotes y otros tests. Se usan para entrenar redacción tipo test; si contradicen BOE, se estudia la explicación corregida y no el dato antiguo.",
  ],
  lastReviewNote:
    `Última revisión interna de fuentes y avisos críticos: 18/05/2026 (catálogo BOE ${BOE_CATALOG_REVIEWED_AT}; fechas consolidado contrastadas con boe.es). Antes de presentarse, revisa BOE consolidado, convocatoria abierta y sede administrativa por si hubiera cambios posteriores.`,
  /** Puntos útiles para estudiar la 2.ª prueba; no sustituyen la lectura del artículo. */
  studyAnchors: [
    {
      id: "art5-10",
      title: "Autorización y prueba (título II, arts. 5 a 10)",
      bullets: [
        "La autorización de radioaficionado exige, en general, superar la prueba de capacitación (salvo supuestos de reconocimiento o reciprocidad para residentes extranjeros con HAREC u otros convenios, recogidos en el propio texto).",
        "La prueba consta de dos partes independientes: electricidad/radioelectricidad y normativa de estaciones.",
        "El programa figura como anexo II del reglamento, alineado con el anexo 6 de la Recomendación CEPT T/R 61-02.",
        "La Secretaría de Estado competente en telecomunicaciones dicta resolución sobre condiciones de la prueba; superar ambas partes acredita la capacitación y el procedimiento asociado al certificado HAREC.",
      ],
    },
    {
      id: "cept",
      title: "Licencia CEPT y operación en el extranjero (arts. 11 a 15)",
      bullets: [
        "Se definen licencias CEPT según adopción de la Recomendación T/R 61-01 y equivalencias para visitantes.",
        "En emisión en país visitado suele exigirse el prefijo del país seguido del indicativo nacional (el texto desarrolla supuestos y límites).",
      ],
    },
    {
      id: "estaciones",
      title: "Estaciones fijas, móviles y régimen técnico (títulos III en adelante)",
      bullets: [
        "Instalaciones, licencias de estación, potencias y condiciones técnicas aparecen reguladas en el reglamento y sus anexos; conviene estudiarlos junto al CNAF y al Reglamento de Radiocomunicaciones de la UIT.",
        "Los plazos de resolución de ciertos procedimientos administrativos están fijados en el artículo 4 (seis semanas en los supuestos que enumera).",
      ],
    },
    {
      id: "repetidores-potencia",
      title: "Repetidores y estaciones desatendidas (art. 25.h) y tabla de potencias (anexo I)",
      bullets: [
        "Art. 25.h: en VHF/UHF, estaciones automáticas desatendidas —salvo circunstancias especiales motivadas— no superan 50 W de salida fuera del casco urbano y 10 W dentro; la ganancia del sistema radiante no suele superar 6 dBd (mismo artículo).",
        "Las potencias máximas por banda de emisión del aficionado (incluidos tramos en MHz) están en el anexo I, apartado 3.1, del mismo reglamento; conviene contrastar tests antiguos (p. ej. FEDI 2011) porque el enunciado puede quedar desfasado.",
      ],
    },
    {
      id: "admin-telecom",
      title: "Administración competente (no es la DGT de Tráfico)",
      bullets: [
        "En tests antiguos aparece «Dirección General de Telecomunicaciones» o «DGTel»: la antigua autoridad de telecomunicaciones. No es la Dirección General de Tráfico (carreteras).",
        "Hoy los trámites de aficionado corresponden a la Administración competente en telecomunicaciones o espectro radioeléctrico (Secretaría de Estado, sede digital.gob.es, etc.).",
      ],
    },
    {
      id: "titular-estacion",
      title: "Titular de la estación y licencia (art. 18 y examen tipo)",
      bullets: [
        "La licencia de estación fija se asocia a la autorización de radioaficionado de su titular (art. 18.1); el distintivo y la responsabilidad siguen al marco de esa titularidad.",
        "En bancos tipo test suele darse como correcta la opción «otro titular de autorización puede operar con permiso del titular de la estación» frente a «solo el titular» en sentido absoluto: refleja la práctica de operación bajo responsabilidad y consentimiento del titular de la instalación.",
      ],
    },
  ],
};
