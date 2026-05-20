# Ruta al apto — RadioExamen

Objetivo del proyecto: **aprobar el examen de radioaficionado en España** (2 pruebas tipo test, habitualmente 30 preguntas y 30 minutos cada una, **≥50 % por prueba**).

## Qué ofrece la app (ya montado)

| Recurso | Estado |
|---------|--------|
| **Banco estudio** (Practicar, Tarjetas) | **542 preguntas** con explicación — repite, lee el feedback, memoriza |
| **Banco examen** (simulacro) | **481 preguntas** curadas — mismo formato que la prueba oficial |
| Simulacro | 30 preguntas, 30 min, corrección al final, veredicto **APTO / NO APTO** |
| Temario + explicaciones | 9 bloques; en estudio ves por qué acertaste o fallaste |
| Cuaderno + repaso inteligente | Errores y temas débiles |
| Indicador «Listo para presentarte» | Pestaña **Examen** (según tu progreso local) |

## Plan de estudio recomendado (4–6 semanas)

1. **Semanas 1–2** — Temario + **Practicar** por bloque (modo estudio, corrección inmediata). Repite el mismo bloque varias veces leyendo cada explicación. Objetivo: ~45 % de bloques tocados en cada prueba.
2. **Semana 3** — Cuaderno de falladas; 15 preguntas trampa; primera pasada por **instalaciones** y **electricidad básica** (pocos ítems en banco).
3. **Semana 4** — Primer simulacro de **1.ª** y **2.ª** prueba (Examen). Si &lt;15/30, no presentarse: volver a temas débiles.
4. **Semanas 5–6** — Repetir hasta **2 simulacros aptos seguidos** en cada prueba y indicador **Listo** en Examen. Última semana: plan «Última semana» en la pestaña Examen.

## Criterio interno «listo para presentarte»

La app marca **Listo para presentarte** cuando, en datos locales:

- Indicador **Listo** en 1.ª y 2.ª prueba, **o**
- **≥2 simulacros aptos** (≥15/30) en cada prueba, buena cobertura de bloques, ≤1 error activo por prueba y sin fallos de seguridad alta pendientes.

Es orientativo: **siempre** revisa convocatoria, tasas y BOE-IET/1311/2013 antes de inscribirte.

## Comandos de mantenimiento (antes de publicar)

```bash
pnpm run verify:exam-banco
pnpm run verify:explanations:strict
pnpm run audit:exam-ready
pnpm run build:web
```

## Huecos conocidos (no bloquean, pero repasa aparte)

- ~6 preguntas del banco piden figura y aún no tienen diagrama importado.
- Temas con pocas preguntas en banco: **instalaciones**, **electricidad básica** — refuerzo por temario.
- Pool URE completo en web &gt; preguntas en banco (cribado estricto); el simulador prioriza calidad sobre cantidad bruta.

## Confianza

Para **memorizar**: usa el banco ampliado (542) en Practicar y Tarjetas, sin prisa por el simulacro. Para **medir apto**: usa Examen (481 curadas). El volumen está pensado para **hacerlo una y otra vez** con explicaciones, no para un solo pase.
