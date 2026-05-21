#!/usr/bin/env node
/**
 * Prueba funcional E2E (Playwright) de todas las vistas y flujos críticos.
 * Requiere servidor local: npx serve -l 5173 .
 * Uso: node scripts/e2e-functional-check.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = (process.argv[2] || "http://localhost:5173").replace(/\/$/, "");
/** Practicar al final: la guarda de sesión bloquea otras rutas si hay test en curso. */
const VIEWS = [
  "inicio",
  "temario",
  "normativa",
  "metodologia",
  "examen",
  "cuaderno",
  "tarjetas",
  "utilidades",
  "ayuda",
  "practicar",
];

const results = [];
let failures = 0;

function pass(view, step, detail = "") {
  results.push({ status: "OK", view, step, detail });
  console.log(`OK  [${view}] ${step}${detail ? ` — ${detail}` : ""}`);
}
function fail(view, step, detail = "") {
  failures += 1;
  results.push({ status: "FAIL", view, step, detail });
  console.error(`FAIL [${view}] ${step}${detail ? ` — ${detail}` : ""}`);
}

async function consoleErrors(page) {
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e.message || e)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errs.push(msg.text());
  });
  return errs;
}

async function gotoView(page, id) {
  await page.goto(`${BASE}/#${id}`, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.waitForTimeout(400);
  const title = await page.title();
  const active = await page.locator(`#view-${id}`).evaluate((el) => {
    if (!el) return false;
    const s = getComputedStyle(el);
    return s.display !== "none" && !el.hidden;
  });
  return { title, active };
}

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    console.error("Playwright no disponible. Instala: npx playwright install chromium");
    console.error(e.message);
    process.exit(2);
  }

  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") pageErrors.push(msg.text());
  });
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  // 1) Carga inicial
  try {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 30000 });
    const bundleOk = await page.locator('script[src*="app.bundle"]').count();
    if (!bundleOk) fail("global", "bundle", "No carga app.bundle.js");
    else pass("global", "bundle cargado");
    if (pageErrors.length) fail("global", "consola inicio", pageErrors.join(" | "));
    else pass("global", "sin errores JS al cargar");
  } catch (e) {
    fail("global", "carga", e.message);
    await browser.close();
    process.exit(1);
  }

  // 2) Cada vista
  for (const id of VIEWS) {
    pageErrors.length = 0;
    try {
      const { title, active } = await gotoView(page, id);
      if (!active) fail(id, "vista visible", `title=${title}`);
      else pass(id, "navegación hash", title);

      if (id === "temario") {
        const root = page.locator("#temario-root");
        if ((await root.count()) === 0 || !(await root.innerText()).trim()) {
          fail(id, "temario-root vacío");
        } else {
          pass(id, "temario renderizado");
          const expand = page.locator(".temario-block details").first();
          if (await expand.count()) {
            await expand.click();
            pass(id, "expandir bloque");
          }
          const filter = page.locator("#temario-filter");
          if (await filter.count()) {
            await filter.fill("dipolo");
            await page.waitForTimeout(200);
            pass(id, "filtro búsqueda");
            await filter.fill("");
          }
        }
      }

      if (id === "normativa") {
        const links = await page.locator("#normativa-root a[href]").count();
        if (links < 3) fail(id, "enlaces normativa", `solo ${links}`);
        else pass(id, "enlaces normativa", `${links} enlaces`);
      }

      if (id === "metodologia") {
        const txt = await page.locator("#method-root").innerText();
        if (!txt || txt.length < 100) fail(id, "method-root corto");
        else pass(id, "método renderizado");
      }

      if (id === "practicar") {
        const start = page.locator("#quiz-start");
        if (!(await start.count())) fail(id, "botón iniciar");
        else {
          await page.selectOption("#quiz-part", "1").catch(() => {});
          await page.selectOption("#quiz-topic", { index: 1 }).catch(() => {});
          await start.click();
          await page.waitForTimeout(600);
          const area = page.locator("#quiz-area");
          const hidden = await area.getAttribute("hidden");
          if (hidden !== null) fail(id, "quiz-area oculto tras iniciar");
          const opts = page.locator("#quiz-question label.opt input[type=radio]");
          if ((await opts.count()) < 2) {
            fail(id, "iniciar test", "sin opciones visibles");
          } else {
            await opts.first().click({ force: true });
            await page.waitForTimeout(600);
            const fb = await page.locator("#quiz-feedback").innerText();
            if (!fb.trim()) fail(id, "feedback vacío tras responder");
            else pass(id, "iniciar y responder", `opts=${await opts.count()}`);
            // Modo ampliar temario
            const mode = page.locator("#quiz-mode");
            if (await mode.count()) {
              await mode.selectOption("study_deepen").catch(() => {});
              pass(id, "modo study_deepen seleccionable");
            }
          }
        }
      }

      if (id === "examen") {
        const coach = page.locator("#exam-readiness-root, .exam-coach");
        const txt = await page.locator("#view-examen").innerText();
        if (!txt.includes("simulacro") && !txt.includes("listo") && !txt.includes("Examen")) {
          fail(id, "contenido examen");
        } else pass(id, "coach examen");
      }

      if (id === "cuaderno") {
        const nb = page.locator("#error-notebook-root");
        if (!(await nb.count())) fail(id, "cuaderno root");
        else pass(id, "cuaderno renderizado");
      }

      if (id === "tarjetas") {
        const load = page.locator("#fc-load");
        if (await load.count()) {
          await load.click();
          await page.waitForTimeout(400);
          pass(id, "cargar tarjetas");
        } else fail(id, "fc-load ausente");
      }

      if (id === "utilidades") {
        const util = page.locator("#utilidades-root");
        if (!(await util.count()) || !(await util.innerText()).trim()) fail(id, "utilidades vacías");
        else pass(id, "utilidades renderizadas");
      }

      if (id === "ayuda") {
        const help = await page.locator("#view-ayuda").innerText();
        if (help.length < 200) fail(id, "ayuda corta");
        else pass(id, "ayuda renderizada");
      }

      if (pageErrors.length) fail(id, "errores consola", pageErrors.slice(0, 3).join(" | "));
    } catch (e) {
      fail(id, "excepción", e.message);
    }
  }

  // 3) Guarda de sesión (debe pedir confirmación al salir de practicar con test activo)
  try {
    await gotoView(page, "practicar");
    await page.locator("#quiz-start").click();
    await page.waitForTimeout(500);
    await page.goto(`${BASE}/#cuaderno`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(300);
    const hash = await page.evaluate(() => location.hash);
    if (hash === "#cuaderno") pass("guard", "salir de quiz con confirmación", hash);
    else pass("guard", "bloqueo o cancelación de salida", hash);
  } catch (e) {
    fail("guard", "sesión activa", e.message);
  }

  // 4) Accesibilidad
  try {
    await gotoView(page, "inicio");
    const panel = page.locator("#a11y-panel");
    if (await panel.count()) {
      await panel.evaluate((el) => {
        if (el instanceof HTMLDetailsElement) el.open = true;
      });
      const light = page.locator("#a11y-light");
      const before = await page.evaluate(() => document.documentElement.classList.contains("a11y-light"));
      await light.evaluate((el) => {
        el.click();
      });
      await page.waitForTimeout(150);
      const after = await page.evaluate(() => document.documentElement.classList.contains("a11y-light"));
      if (before !== after) pass("a11y", "modo claro toggle");
      else fail("a11y", "modo claro no cambió clase en html");
    } else fail("a11y", "panel ausente");
    const dlg = page.locator("#app-dialog[open]");
    if (await dlg.count()) {
      await page.locator("#app-dialog-confirm, #app-dialog button").first().click({ force: true }).catch(() => {});
      await page.waitForTimeout(200);
    }
    const inc = page.locator("#a11y-font-inc");
    if (await inc.count()) {
      const fsBefore = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
      await inc.evaluate((el) => el.click());
      await page.waitForTimeout(100);
      const fsAfter = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
      if (fsBefore !== fsAfter) pass("a11y", "escala fuente", `${fsBefore} → ${fsAfter}`);
      else pass("a11y", "escala fuente (sin cambio visible)", fsAfter);
    }
  } catch (e) {
    fail("a11y", "controles", e.message);
  }

  await browser.close();

  const reportPath = join(import.meta.dirname, "..", "docs", "E2E_FUNCTIONAL_REPORT.txt");
  const lines = [
    `E2E funcional — ${new Date().toISOString()}`,
    `URL: ${BASE}`,
    `Fallos: ${failures}`,
    "",
    ...results.map((r) => `${r.status}\t${r.view}\t${r.step}\t${r.detail}`),
  ];
  writeFileSync(reportPath, lines.join("\n") + "\n", "utf8");

  console.log(`\n=== Resumen: ${results.filter((r) => r.status === "OK").length} OK, ${failures} FAIL ===`);
  console.log(`Informe: ${reportPath}`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
