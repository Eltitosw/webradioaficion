# Entrenador de examen

Esta nota documenta la lógica añadida al apartado `Practicar` para evitar errores al evolucionarla.

## Objetivo

Convertir la app en algo más que un banco de tests:

- Registrar fallos relevantes en un cuaderno local.
- Detectar temas débiles por bloque del temario.
- Recomendar el siguiente paso de estudio.
- Priorizar fallos marcados con seguridad alta.

La experiencia queda separada por intención:

- `Practicar`: hacer preguntas y usar modos de estudio.
- `Examen`: simular prueba de 30 preguntas y ver preparación.
- `Cuaderno`: corregir fallos, revisar temas débiles y lanzar repaso inteligente.

## Persistencia

Todo se guarda solo en el navegador, mediante `localStorage`.

- `radioexam_error_notebook_v1`: cuaderno de errores por `qid`.
- `radioexam_topic_quiz_stats_v1`: aciertos/intentos por bloque.
- `radioexam_user_stats_v1`: racha, cobertura y sesiones.
- `radioexam_last_wrong_ids_v1`: falladas de la última sesión.

No se envía información a ningún servidor.

## Flujo de datos

1. El usuario responde una pregunta en `Practicar`.
2. En modo estudio, cuando aparece feedback, se registra el resultado una sola vez por pregunta y sesión.
3. En modo examen, el resultado se registra al finalizar.
4. Si la pregunta se falla, entra o se actualiza en el cuaderno.
5. Si una pregunta del cuaderno se acierta después, pasa a estado `improving`.
6. El diagnóstico combina errores activos, fallos con seguridad alta y precisión por tema.

## Repaso inteligente

El botón `Repaso inteligente` crea una sesión corta de estudio con `mide tu seguridad`.

Orden de selección:

1. Preguntas con errores activos del cuaderno.
2. Fallos con seguridad alta antes que fallos normales.
3. Preguntas del tema o temas con peor diagnóstico.
4. Preguntas de relleno del banco si no hay historial suficiente.

La sesión se limita a 15 preguntas y vuelve a mezclar el orden de preguntas y respuestas. El objetivo es evitar memorizar la pregunta exacta y reforzar el concepto del bloque débil.

## Indicador de preparación

La vista `Examen` evalúa por separado la 1.ª prueba y la 2.ª prueba.

Estados:

- `Listo`: buena precisión, suficiente cobertura por bloques, pocos errores activos, sin fallos de seguridad alta y al menos dos simulacros de 30 preguntas aprobados en esa prueba.
- `Casi`: precisión aceptable, parte de los bloques practicados y al menos un simulacro aprobado, pero todavía falta cerrar errores.
- `Falta trabajo`: faltan datos, cobertura, aciertos o hay errores peligrosos.

Datos usados:

- Precisión acumulada en estudio por bloques.
- Porcentaje de bloques practicados de cada prueba.
- Errores activos del cuaderno.
- Fallos marcados con seguridad alta.
- Simulacros de `Examen tipo test` aprobados por prueba.

El indicador es orientativo y no sustituye al criterio de la convocatoria oficial.

## Módulo testeable

La lógica pura vive en `lib/learning-coach.js`.

Funciones principales:

- `updateErrorNotebookWithResult()`: actualiza el cuaderno con acierto/fallo.
- `buildTopicDiagnostics()`: calcula prioridades por tema.
- `buildRecommendedPlan()`: genera el plan sugerido a partir del diagnóstico.
- `buildSmartReviewQuestionIds()`: selecciona preguntas para el repaso inteligente.
- `buildExamReadiness()`: calcula `Listo`, `Casi` o `Falta trabajo` por prueba.
- `isActiveError()`: determina si un error sigue pendiente.

Los tests están en `tests/learning-coach.test.mjs`.

## Criterio de prioridad

Un tema sube de prioridad cuando:

- Tiene errores activos.
- Tiene fallos con seguridad alta.
- Acumula varios fallos.
- Su precisión por tema baja de forma clara tras varios intentos.

La prioridad no sustituye al criterio oficial del examen; sirve para decidir qué repasar primero.

## Modos de estudio en Practicar

Tres ejes que no deben mezclarse al editar el banco:

1. **Sesión:** `libre` (pool completo, preprueba opcional) o `teorico` (30 preguntas, temporizador en examen).
2. **Modo:** `study` (feedback al responder) o `exam` (resultado al final).
3. **Feedback en estudio:** `immediate`, `confidence` (seguridad antes de corregir) o `deepen` (panel temario/libro).

Explicaciones en el banco:

- `explain` — texto didáctico (`pedagogicalExplain` en inmediato/confianza).
- `explainSourceNote` — plantilla histórica FEDI/Quijotes, visible en profundizar y como «Origen» en otros modos.

Ver `.cursor/rules/study-modes.mdc` antes de ampliar `*-explanations.js` o `build-banco-principal.mjs`.

## Precauciones

- No borrar ni mutar el banco original de preguntas: el cuaderno guarda copias resumidas.
- Mantener sincronizadas respuestas y `correctIndex` cuando se aleatorizan opciones.
- Si se añade una pregunta que menciona figura/esquema/gráfico, debe incluir `stemFigure`.
- Si se cambia la forma del cuaderno, subir versión de clave o añadir migración.
- Si se mueve UI entre vistas, mantener una sola fuente de datos: `Practicar`, `Examen` y `Cuaderno` leen las mismas claves locales.
