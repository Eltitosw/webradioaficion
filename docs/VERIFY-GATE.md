# Gate de calidad (ahorro de tiempo / Cursor)

## Qué ejecutar y cuándo

| Comando | Cuándo | ~Tiempo |
|---------|--------|---------|
| `npm run verify:gate` | Tras tocar explicaciones o banco | ~3 s |
| `npm run verify:explain-grade -- --ids=ure-p1-q130` | Solo IDs editados | &lt;1 s |
| `npm run verify:explain-grade:strict` | Antes de publicar / cerrar oleada | ~1 s |
| `npm run audit:explain-grade` | Ver informe sin bloquear | ~1 s |
| `npm run verify:all` | Release completa (incluye red BOE) | ~30 s |

**Evitar** en el día a día: `verify:all`, `build:banco`, `refresh-all-explanations`, `import:web`.

## Grado examen (reglas endurecidas)

- Sin tautología («marca el banco», etc.).
- Sin plantilla «fuente ideal» fuera de contexto.
- Mínimo **120 caracteres**, o excepción compacta (≥72 con fórmula/unidad y cita correcta).
- Si &lt;180 caracteres: debe haber razonamiento («porque», «por eso», «art.», «no confundir», etc.).

## Anti-regresión

`data/explain-grade-baseline.json` fija el techo actual (**112** fallos; baja al cerrar oleadas).

Oleada P2 normativa: `npm run curate:wave:normativa` (licencias + marco + operación).

Oleada P1 técnica: `npm run curate:wave:p1` (receptores, antenas, componentes, electricidad, magnetismo, instalaciones).

- `npm run verify:explain-grade` → falla si hay **más** fallos que el baseline.
- Tras curar una oleada y bajar el número:  
  `npm run verify:explain-grade -- --update-baseline`

## Flujo de curación (oleadas)

1. Añadir texto en `data/curated-explanations.js`.
2. `node scripts/build-banco-principal.mjs` (solo si tocaste fuentes/cribado).
3. `npm run verify:explain-grade -- --ids=id1,id2`
4. Cuando un bloque quede limpio: `npm run verify:explain-grade:strict` sobre ese bloque o todo el banco.
