# Cierre de estabilidad 99 %

Este documento define el mínimo para considerar la web estable antes de publicarla o usarla como referencia seria de estudio.

## 1. Verificación técnica obligatoria

- Ejecutar `npm run verify:all` antes de publicar.
- Confirmar que no hay errores en consola al abrir `Inicio`, `Temario`, `Practicar`, `Examen`, `Cuaderno`, `Método`, `Tarjetas` y `Normativa`.
- Revisar que el servidor entrega `app.js`, `lib/`, `data/`, `styles.css` e `images/` por HTTP/HTTPS, no abriendo `index.html` directamente desde disco.
- Comprobar que los módulos JavaScript se sirven con MIME correcto y que no aparecen errores de `import`.
- Confirmar que la web funciona en HTTPS y que el dominio canónico sigue siendo correcto.

## 2. Prueba manual por dispositivo

- PC: navegación completa, simulacro de ambas pruebas, tarjetas y cuaderno.
- Smartphone estrecho: menú, selects largos, botones de test, feedback, tarjetas y bloques desplegables.
- Tablet vertical: cabecera, panel de accesibilidad, tarjetas, simulacro y normativa.
- Modo accesibilidad: texto grande, más contraste, más espacio entre líneas y reducción de animaciones.

## 3. Auditoría BOE / convocatoria

Antes de cerrar una versión estable, contrastar manualmente:

- Formato exacto de la prueba: número de preguntas, tiempo y porcentaje de apto.
- Orden IET/1311/2013 consolidada: artículos de autorización, prueba, estaciones, indicativos e instalaciones.
- Anexo I: bandas, potencias y condiciones técnicas.
- Anexo II: programa de examen y relación con HAREC.
- CEPT T/R 61-01: licencia CEPT temporal y condiciones en país visitado.
- CEPT T/R 61-02: programa HAREC.
- Sede administrativa vigente: trámites, tasas, plazos y órgano competente.

## 4. Regla para congelar versión

Una vez marcada como estable, solo deberían entrar:

- Correcciones de BOE, convocatoria o CEPT.
- Erratas claras.
- Bugs reproducibles.
- Mejoras de accesibilidad o compatibilidad.

No añadir bloques grandes, rediseños ni bancos nuevos sin reiniciar auditoría de contenido y `npm run verify:all`.

## 5. Criterio de confianza

La app puede guiar, entrenar y explicar. La decisión final antes de pagar tasas o presentarse debe contrastarse siempre con BOE consolidado, convocatoria abierta y sede administrativa vigente.
