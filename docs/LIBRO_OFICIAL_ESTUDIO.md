# Libro oficial de examen — estudio local

Material en PDF por capítulos (no subir al repositorio: ~1,3 GB).

## Archivos (ejemplo en este equipo)

| Parte | Archivo | Páginas (aprox.) | Bloques en RadioExamen |
|-------|---------|------------------|------------------------|
| Portada e índice | `parte_01_Portada__introducción_e_índice.pdf` | ~20 | — |
| 1.ª · Técnica | `parte_02_Primera_parte__Técnica.pdf` | ~207 | P1: electricidad, ondas, componentes, receptores, antenas |
| 2.ª · Normas y procedimientos | `parte_03_Segunda_parte__Normas_y_procedimientos_de_operación.pdf` | ~33 | P2: operación, códigos Q, fonía |
| 3.ª · Normativa | `parte_04_Tercera_parte__Normativa_nacional_e_internacional.pdf` | ~72 | P2: marco normativo, licencias, instalaciones |

Ruta habitual en este proyecto: `C:\Users\joanc\Documents\output\chapters\`

### OCR / audiobook (1.ª parte técnica)

Texto por página (útil para alinear el temario, no para publicar en la web):

`C:\Users\joanc\Documents\output\audiobook\parte_02_Primera_parte__Técnica\ocr-pages\`

- `0022.txt` = página impresa **22** (cap. 1).
- Índice capítulos ↔ bloques del temario: `data/libro-tecnica-indice.mjs`.
- Tras generar o actualizar OCR: `npm run repair:ocr` (limpia marcas de agua, tildes/mojibake y errores léxicos frecuentes; regenera `texto.txt`).

## Cómo usarlo con la app

1. **Temario** en la app → leer el bloque.
2. **Practicar** con el banco (589 estudio / 565 simulacro; URE y FEDI ya integrados cuando pasan calidad).
3. **Auditoría** de huecos por tema: `npm run audit:libro-banco` → `docs/LIBRO_BANCO_AUDIT.txt`.
4. **Libro PDF** para profundizar diagramas y definiciones que no salen en el test.

Los PDF son escaneos: no se importan preguntas automáticamente. Las figuras del banco web URE sin enunciado explícito se eliminaron (banners publicitarios).

## Despliegue

No incluir los PDF en `index.html` ni en Git. Solo documentación y enlaces al BOE/convocatoria en la pestaña Normativa.
