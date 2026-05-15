/** Diálogo de confirmación accesible (sustituye window.confirm en la app). */

/** @type {((value: boolean) => void)|null} */
let pendingResolve = null;

function dialogEl() {
  return document.getElementById("app-dialog");
}

function closeDialog(result) {
  const dialog = dialogEl();
  if (dialog instanceof HTMLDialogElement) {
    if (dialog.open) dialog.close();
  }
  const resolve = pendingResolve;
  pendingResolve = null;
  resolve?.(result);
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

  titleEl.textContent = opts.title;
  msgEl.textContent = opts.message;
  confirmBtn.textContent = opts.confirmLabel || "Aceptar";
  cancelBtn.textContent = opts.cancelLabel || "Cancelar";
  confirmBtn.classList.toggle("btn--danger", !!opts.danger);
  confirmBtn.classList.toggle("btn--primary", !opts.danger);

  return new Promise((resolve) => {
    pendingResolve = resolve;
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

  if (!(dialog instanceof HTMLDialogElement) || !(form instanceof HTMLFormElement)) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitter = e.submitter;
    const ok = submitter === confirmBtn || (submitter instanceof HTMLButtonElement && submitter.value === "confirm");
    closeDialog(ok);
  });

  cancelBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeDialog(false);
  });

  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeDialog(false);
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeDialog(false);
  });
}
