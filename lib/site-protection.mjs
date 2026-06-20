/**
 * Medidas disuasorias contra copia masiva del banco (no sustituyen backend).
 * En localhost no se activan eventos de copia para no molestar en desarrollo.
 */
const PROTECTED_SEL = ".site-protected";

/** Dominio oficial (y www). */
const ALLOWED_HOSTS = new Set(["examenradioaficionado.online", "www.examenradioaficionado.online"]);

export const SITE_ATTRIBUTION = "RadioExamen · examenradioaficionado.online";

function isLocalHost() {
  const h = globalThis.location?.hostname || "";
  return !h || h === "localhost" || h === "127.0.0.1" || h === "[::1]" || h.endsWith(".local");
}

/** @returns {boolean} */
export function isBankHostAllowed() {
  if (isLocalHost()) return true;
  const h = (globalThis.location?.hostname || "").toLowerCase();
  return ALLOWED_HOSTS.has(h);
}

/**
 * @param {(s: string) => string} escapeHtml
 * @returns {string}
 */
export function renderSiteAttributionHtml(escapeHtml) {
  return `<p class="site-attribution" aria-hidden="true">${escapeHtml(SITE_ATTRIBUTION)}</p>`;
}

function ensureHostBanner() {
  if (isBankHostAllowed() || document.getElementById("site-host-banner")) return;
  document.documentElement.classList.add("site-host-blocked");
  const el = document.createElement("div");
  el.id = "site-host-banner";
  el.className = "site-host-banner";
  el.setAttribute("role", "alert");
  el.innerHTML =
    '<p><strong>Copia no autorizada.</strong> El banco de preguntas solo funciona en ' +
    '<a href="https://examenradioaficionado.online/">examenradioaficionado.online</a>.</p>';
  document.body.prepend(el);
}

/** @param {Event} e */
function blockIfProtected(e) {
  const t = /** @type {Node | null} */ (e.target);
  if (t && "closest" in t && /** @type {Element} */ (t).closest(PROTECTED_SEL)) {
    e.preventDefault();
  }
}

export function initSiteProtection() {
  ensureHostBanner();
  if (isLocalHost()) return;

  document.addEventListener("contextmenu", blockIfProtected, { capture: true });
  document.addEventListener("copy", blockIfProtected, { capture: true });
  document.addEventListener("cut", blockIfProtected, { capture: true });
  document.addEventListener("dragstart", blockIfProtected, { capture: true });
}
