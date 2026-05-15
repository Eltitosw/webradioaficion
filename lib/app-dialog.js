/** Diálogo de confirmación accesible (sustituye window.confirm en la app). */

/** @type {((value: unknown) => void)|null} */
let pendingResolve = null;

function dialogEl() {
  return document.getElementById("app-dialog");
}

function altBtnEl() {
  return document.getElementById("app-dialog-alt");
}

function resetDialogChrome() {
  const dialog = dialogEl();
  const confirmBtn = document.getElementById("app-dialog-confirm");
  const altBtn = altBtnEl();
  dialog?.classList.remove("app-dialog--triple");
  if (confirmBtn instanceof HTMLButtonElement) {
    confirmBtn.classList.remove("btn--danger", "btn--primary");
    confirmBtn.classList.add("btn--primary");
  }
  if (altBtn instanceof HTMLButtonElement) {
    altBtn.hidden = true;
    altBtn.classList.remove("btn--danger", "btn--primary");
    altBtn.classList.add("btn--ghost");
  }
}

/**
 * @param {boolean | 'cancel' | 'confirm' | 'alt'} result
 */
function closeDialog(result) {
  const dialog = dialogEl();
  if (dialog instanceof HTMLDialogElement) {
    if (dialog.open) dialog.close();
  }
  resetDialogChrome();
  const resolve = pendingResolve;
  pendingResolve = null;
  resolve?.(result);
}

function openDialog(focusEl) {
  const dialog = dialogEl();
  if (!(dialog instanceof HTMLDialogElement)) return;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
  focusEl?.focus();
}

function configureTripleDialog(title, message, cancelLabel, altLabel, confirmLabel, { altDanger = false, confirmDanger = false } = {}) {
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
    return false;
  }

  resetDialogChrome();
  dialog.classList.add("app-dialog--triple");
  titleEl.textContent = title;
  msgEl.textContent = message;
  cancelBtn.textContent = cancelLabel;
  altBtn.textContent = altLabel;
  altBtn.hidden = false;
  confirmBtn.textContent = confirmLabel;

  altBtn.classList.remove("btn--primary", "btn--danger");
  altBtn.classList.add("btn--ghost");
  altBtn.classList.toggle("btn--danger", altDanger);

  confirmBtn.classList.remove("btn--primary", "btn--danger");
  confirmBtn.classList.add(confirmDanger ? "btn--danger" : "btn--primary");

  return true;
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

  resetDialogChrome();
  titleEl.textContent = opts.title;
  msgEl.textContent = opts.message;
  confirmBtn.textContent = opts.confirmLabel || "Aceptar";
  cancelBtn.textContent = opts.cancelLabel || "Cancelar";
  confirmBtn.classList.toggle("btn--danger", !!opts.danger);
  confirmBtn.classList.toggle("btn--primary", !opts.danger);

  return new Promise((resolve) => {
    pendingResolve = (v) => resolve(v === "confirm");
    openDialog(cancelBtn);
  });
}

/**
 * @returns {Promise<'stay'|'save'|'discard'>}
 */
export function showQuizLeaveDialog() {
  if (
    !configureTripleDialog(
      "¿Salir del test?",
      "Puedes seguir practicando, salir guardando el progreso en este dispositivo (continuarás después desde Practicar) o salir sin guardar y perder esta sesión.",
      "Seguir practicando",
      "Salir sin guardar",
      "Salir y guardar",
      { altDanger: true, confirmDanger: false },
    )
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

  return new Promise((resolve) => {
    pendingResolve = (v) => {
      if (v === "confirm") resolve("save");
      else if (v === "alt") resolve("discard");
      else resolve("stay");
    };
    openDialog(document.getElementById("app-dialog-cancel"));
  });
}

/**
 * @returns {Promise<'cancel'|'keep'|'new'>}
 */
export function showReplaceDraftDialog() {
  if (
    !configureTripleDialog(
      "¿Empezar una sesión nueva?",
      "Hay una sesión guardada sin terminar. Puedes conservarla, descartarla y empezar otra, o cancelar.",
      "Cancelar",
      "Guardar sesión",
      "Nueva sesión",
      { altDanger: false, confirmDanger: true },
    )
  ) {
    const ok = window.confirm(
      "Hay una sesión guardada. Si inicias una nueva, se descartará.\n\n¿Continuar?",
    );
    return Promise.resolve(ok ? "new" : "cancel");
  }

  if (pendingResolve) {
    closeDialog("cancel");
  }

  return new Promise((resolve) => {
    pendingResolve = (v) => {
      if (v === "confirm") resolve("new");
      else if (v === "alt") resolve("keep");
      else resolve("cancel");
    };
    openDialog(document.getElementById("app-dialog-cancel"));
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
