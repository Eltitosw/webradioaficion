# RadioExamen (webradioaficion)

Herramienta web para **aprobar el examen de radioaficionado en España**: temario, banco de preguntas verificado, práctica, simulacros (30+30), cuaderno de errores y tarjetas.

**Ruta de estudio:** ver [RUTA_AL_APTO.md](RUTA_AL_APTO.md).

## Requisitos

- Node.js 18+ (solo para verificación local; la app en producción es estática).
- Servidor HTTP/HTTPS (no abras `index.html` directamente desde el disco: los módulos ES no cargarán).

## Desarrollo local

```bash
npx --yes serve .
# o: python -m http.server 8080
```

Abre `http://localhost:3000` (o el puerto que indique el servidor).

## Verificación antes de publicar

```bash
npm run verify:all
```

Incluye integridad del banco (**481 preguntas** publicadas, sin material TETRA/Tráfico), BOE, explicaciones y tests.

```bash
npm run audit:exam-ready   # ¿proyecto listo para su cometido?
```

```bash
npm run build:banco      # regenerar banco tras cambiar fuentes
npm run build:web        # app.bundle.js para hosting estático
npm run cleanup:project  # quitar SVG/scripts legacy (una vez)
```

## Publicar una nueva versión

1. Actualiza la fecha en `data/version.js` (`build` y `label`).
2. Sincroniza la caché del navegador en HTML:

   ```bash
   node scripts/sync-version.mjs
   ```

3. Sube **toda** la carpeta: `index.html`, `app.js`, `styles.css`, `lib/`, `data/`, `images/`.
4. Comprueba en producción con recarga forzada (Ctrl+F5) que el pie de página muestra la versión nueva.

## Progreso del alumno

Todo se guarda en `localStorage` del navegador (sin cuenta). En **Ayuda** puede exportarse/importarse una copia JSON del progreso completo. Las tarjetas también tienen exportación propia en su sección.

## Documentación interna

- `ESTABILIDAD_99.md` — criterios para congelar una versión estable.
- `FUENTES_VERIFICACION.md` — checklist de fuentes oficiales y bancos de apoyo.

## Licencia / uso

Proyecto privado de estudio. Para normativa y convocatoria manda siempre el BOE y la sede administrativa vigente.
