# Fuentes y verificación de contenido

Este proyecto es una herramienta de estudio para el examen de radioaficionado en España. Para evitar que un dato didáctico, un banco histórico o una guía externa se presenten como verdad legal, el contenido debe revisarse con esta jerarquía.

## Jerarquía de confianza

1. BOE publicado/consolidado, convocatoria oficial de la prueba y sede administrativa vigente.
2. CEPT/ECC para T/R 61-01 (licencia CEPT temporal) y T/R 61-02 (programa HAREC).
3. URE, manuales, guías y cursos como apoyo didáctico.
4. Bancos históricos o de terceros (FEDI-EA, Quijotes u otros) solo como entrenamiento de redacción tipo test.

## Puntos que siempre requieren contraste

- Potencias, bandas, tramos de frecuencia y condiciones técnicas del anexo I.
- Plazos administrativos, órganos competentes, trámites, sanciones y requisitos de autorización.
- Formato real de la convocatoria: número de preguntas, tiempo, porcentaje de apto y bases de la prueba.
- Licencia CEPT, HAREC, operación en país visitado y prefijos aplicables.
- Preguntas importadas de bancos antiguos que puedan contener erratas o normativa superada.

## Checklist de auditoría manual

- [x] Orden IET/1311/2013: texto consolidado BOE revisado.
- [x] Anexo I: potencias y bandas contrastadas con la versión vigente.
- [x] Anexo II: programa de examen contrastado con HAREC/CEPT T/R 61-02.
- [x] Convocatoria abierta: número de preguntas, tiempo y baremo revisados.
- [x] Sede administrativa vigente: autorización, tasas, órgano competente y trámites revisados.
- [x] CEPT T/R 61-01: operación temporal en otros países revisada.
- [x] Bancos FEDI-EA/Quijotes: preguntas sensibles revisadas frente a BOE si citan cifras, plazos o trámites.
- [x] Preguntas propias: `sourceRef` revisado en los ítems normativos.
- [x] Figuras de bancos externos: solo activas si se dispone de calco exacto documentado.

## Regla editorial

Si un banco antiguo contradice BOE-A-2013-7624, se corrigen la opción correcta y la explicación en el simulador (`npm run apply:boe-bank`). No se debe reforzar un dato legal solo porque aparezca repetido en bancos de práctica.

Las preguntas que dependen de una figura de banco externo no pueden usar recreaciones aproximadas. Si no se dispone de la figura original exacta o de un calco documentado, la pregunta se conserva para auditoría pero queda excluida del banco activo.

Última revisión interna de avisos críticos: 18/05/2026.

## Catálogo y verificación automática

- **Catálogo BOE:** `data/boe-normativa.mjs` (10 normas BOE + fechas consolidado contrastadas con boe.es).
- **Verificación fechas:** `npm run verify:boe-dates` → `data/boe-dates-report.txt`.
- **Catálogo machine-readable:** `data/verification-sources.mjs` (BOE, CEPT, URE, FEDI, Quijotes, etc.).
- **Reglas de seguridad:** `lib/source-verification.mjs`.
- **Comando:** `npm run verify:sources` (incluye fechas BOE, enlaces y auditoría del banco).
- **Alinear explicaciones con BOE:** `npm run sync:boe-explanations` (regenera ~140+ explicaciones históricas con cita BOE-A-2013-7624).
- **Integrado en:** `npm run verify:all`.

### Tabla BOE (revisión 18/05/2026)

| BOE | Norma | Consolidado BOE | Uso en examen |
|-----|--------|-----------------|---------------|
| BOE-A-2013-7624 | Orden IET/1311/2013 · Reglamento aficionados | **10/04/2015** | **Principal** — potencias, anexo I, trámites |
| BOE-A-2006-10286 | Orden ITC/1791/2006 (derogada) | 12/07/2013 | Solo contrastar bancos antiguos |
| BOE-A-2022-10757 | Ley 11/2022 telecomunicaciones | **27/12/2025** | Marco sectorial |
| BOE-A-1983-25445 | Ley 19/1983 / Orden antenas | — | Fachadas, comunidades |
| BOE-A-1986-33766 | RD 2623/1986 antenas aficionado | — | Instalaciones de antenas |
| BOE-A-2017-2460 | RD 123/2017 · DPR general | **18/01/2023** | CNAF, concesiones, bandas |
| BOE-A-2023-1192 | RD 16/2023 mod. DPR/TDT | (integrado en 2017-2460) | 26 GHz, TDT SD → 14/02/2024 |
| BOE-A-2016-4444 | RD 188/2016 equipos RED | **13/03/2026** | Marcado CE, equipos |
| BOE-A-2026-5878 | RD 192/2026 mod. equipos | (integrado en 2016-4444) | Emergencia mercado interior |
| BOE-A-2026-552 | Resolución IR-291/IR-292 | — | Interfaces 700 MHz (MFCN) |

### PDF y libros (no están en el repositorio)

| Fuente | Formato | Uso |
|--------|---------|-----|
| PDFs BOE en Downloads del usuario | PDF oficial | Deben coincidir con enlaces de `boe-normativa.mjs` |
| Radiomanía temario simplificado | PDF comercial | Resumen didáctico |
| Libro EA5RCA (ea5rca.es) | Libro/PDF externo | Práctica paralela; no se copian enunciados |
| CEPT T/R 61-01 y 61-02 | PDF/web docdb.cept.org | CEPT y HAREC |

La app enlaza todo desde la vista **Normativa** (`data/regulatory.js`).
