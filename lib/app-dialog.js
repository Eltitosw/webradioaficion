/** Diálogo de confirmación accesible (sustituye window.confirm en la app). */

/** @type {((value: unknown) => void)|null} */
let pendingResolve = null;

function dialogEl() {
  return document.getElementById("app-dialog");
}

function altBtnEl() {
  return document.getElementById("app-dialog-alt");
}

/**
 * @param {boolean | 'cancel' | 'confirm' | 'alt'} result
 */
function closeDialog(result) {
  const dialog = dialogEl();
  if (dialog instanceof HTMLDialogElement) {
    if (dialog.open) dialog.close();
  }
  const resolve = pendingResolve;
  pendingResolve = null;
  resolve?.(result);
}

function setAltVisible(visible, label = "", danger = false) {
  const altBtn = altBtnEl();
  if (!(altBtn instanceof HTMLButtonElement)) return;
  altBtn.hidden = !visible;
  if (visible) {
    altBtn.textContent = label;
    altBtn.classList.toggle("btn--danger", danger);
  }
}

/**
 * @param {{
 *   title: string;
 *   message: string;
 *   confirmLabel?: string;
 *   cancelLabel?: string;
 *   danger?: boolean;
 * }} opts
 * @returns {Promise<boolean>}
 */
export function showAppConfirm(opts) {
  const dialog = dialogEl();
  const titleEl = document.getElementById("app-dialog-title");
  const msgEl = document.getElementById("app-dialog-message");
  const confirmBtn = document.getElementById("app-dialog-confirm");
  const cancelBtn = document.getElementById("app-dialog-cancel");
  if (
    !(dialog instanceof HTMLDialogElement) ||
    !(titleEl instanceof HTMLElement) ||
    !(msgEl instanceof HTMLElement) ||
    !(confirmBtn instanceof HTMLButtonElement) ||
    !(cancelBtn instanceof HTMLButtonElement)
  ) {
    return Promise.resolve(window.confirm(`${opts.title}\n\n${opts.message}`));
  }

  if (pendingResolve) {
    closeDialog(false);
  }

  setAltVisible(false);
  titleEl.textContent = opts.title;
  msgEl.textContent = opts.message;
  confirmBtn.textContent = opts.confirmLabel || "Aceptar";
  cancelBtn.textContent = opts.cancelLabel || "Cancelar";
  confirmBtn.classList.toggle("btn--danger", !!opts.danger);
  confirmBtn.classList.toggle("btn--primary", !opts.danger);

  return new Promise((resolve) => {
    pendingResolve = (v) => resolve(v === "confirm");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    cancelBtn.focus();
  });
}

/**
 * @returns {Promise<'stay'|'save'|'discard'>}
 */
export function showQuizLeaveDialog() {
  const dialog = dialogEl();
  const titleEl = document.getElementById("app-dialog-title");
  const msgEl = document.getElementById("app-dialog-message");
  const confirmBtn = document.getElementById("app-dialog-confirm");
  const cancelBtn = document.getElementById("app-dialog-cancel");
  const altBtn = altBtnEl();
  if (
    !(dialog instanceof HTMLDialogElement) ||
    !(titleEl instanceof HTMLElement) ||
    !(msgEl instanceof HTMLElement) ||
    !(confirmBtn instanceof HTMLButtonElement) ||
    !(cancelBtn instanceof HTMLButtonElement) ||
    !(altBtn instanceof HTMLButtonElement)
  ) {
    const ok = window.confirm(
      "¿Salir del test?\n\nAceptar = salir y guardar. Cancelar = seguir practicando.",
    );
    if (!ok) return Promise.resolve("stay");
    const discard = window.confirm("¿Salir sin guardar el progreso?");
    return Promise.resolve(discard ? "discard" : "save");
  }

  if (pendingResolve) {
    closeDialog("cancel");
  }

  titleEl.textContent = "¿Salir del test?";
  msgEl.textContent =
    "Puedes seguir practicando, salir guardando el progreso en este dispositivo (continuarás después desde Practicar) o salir sin guardar y perder esta sesión.";
  cancelBtn.textContent = "Seguir practicando";
  confirmBtn.textContent = "Salir y guardar";
  confirmBtn.classList.remove("btn--danger");
  confirmBtn.classList.add("btn--primary");
  setAltVisible(true, "Salir sin guardar", true);
  dialog.classList.add("app-dialog--leave");

  return new Promise((resolve) => {
    pendingResolve = (v) => {
      dialog.classList.remove("app-dialog--leave");
      if (v === "confirm") resolve("save");
      else if (v === "alt") resolve("discard");
      else resolve("stay");
    };
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    cancelBtn.focus();
  });
}

export function initAppDialog() {
  const dialog = dialogEl();
  const form = document.getElementById("app-dialog-form");
  const confirmBtn = document.getElementById("app-dialog-confirm");
  const cancelBtn = document.getElementById("app-dialog-cancel");
  const altBtn = altBtnEl();

  if (!(dialog instanceof HTMLDialogElement) || !(form instanceof HTMLFormElement)) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitter = /** @type {HTMLButtonElement|null} */ (e.submitter);
    if (submitter === altBtn || submitter?.value === "alt") {
      closeDialog("alt");
      return;
    }
    if (submitter === confirmBtn || submitter?.value === "confirm") {
      closeDialog("confirm");
      return;
    }
    closeDialog("cancel");
  });

  cancelBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog("cancel");
  });

  altBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog("alt");
  });

  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeDialog("cancel");
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeDialog("cancel");
  });
}
