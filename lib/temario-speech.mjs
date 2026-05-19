/**
 * Lectura en voz alta del temario (speechSynthesis) con soporte móvil/tablet.
 */

/** Bloque elegido en el selector o chips (no se borra al cerrar el picker nativo). */
let pinnedBlockId = "";

/** @param {string} blockId */
export function setTemarioPinnedBlockId(blockId) {
  pinnedBlockId = String(blockId || "").replace(/^temario-/, "");
}

export function getTemarioPinnedBlockId() {
  return pinnedBlockId;
}

export function temarioSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
}

function resumeSpeechSynth() {
  if (!temarioSpeechSupported()) return;
  try {
    window.speechSynthesis.resume();
  } catch {
    /* ignore */
  }
}

function pickSpanishSpeechVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => /^es(-|_)/i.test(v.lang) && v.localService) ||
    voices.find((v) => /^es(-|_)/i.test(v.lang)) ||
    null
  );
}

/** Parte el texto en trozos cortos (iOS / Samsung suelen fallar con párrafos largos). */
function chunkSpeechText(text, maxLen = 320) {
  const clean = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return [];
  if (clean.length <= maxLen) return [clean];
  const parts = [];
  let rest = clean;
  while (rest.length > maxLen) {
    let cut = rest.lastIndexOf(". ", maxLen);
    if (cut < maxLen * 0.35) cut = rest.lastIndexOf(" ", maxLen);
    if (cut < 1) cut = maxLen;
    parts.push(rest.slice(0, cut + 1).trim());
    rest = rest.slice(cut + 1).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}

let speakSession = 0;

export function stopTemarioSpeech() {
  if (!temarioSpeechSupported()) return;
  speakSession += 1;
  window.speechSynthesis.cancel();
  document.querySelectorAll(".temario-speak-block.is-speaking").forEach((el) => {
    el.classList.remove("is-speaking");
  });
  document.querySelectorAll(".temario-block-chip.is-active").forEach((el) => {
    el.classList.remove("is-active");
  });
  const stopBtn = document.getElementById("temario-speak-stop");
  const status = document.getElementById("temario-speak-status");
  if (stopBtn instanceof HTMLButtonElement) stopBtn.hidden = true;
  if (status) status.textContent = "";
}

/**
 * @param {string} blockId
 * @param {(blockId: string, speaking: boolean) => void} updateUi
 * @param {(msg: string, isError?: boolean) => void} toast
 * @param {() => string} buildText
 */
export function speakTemarioBlock(blockId, updateUi, toast, buildText) {
  if (!blockId) {
    toast("Elige un bloque en la lista o en los botones de módulo.", true);
    return;
  }
  if (!temarioSpeechSupported()) {
    toast(
      "Tu navegador no admite lectura en voz alta aquí. Prueba Chrome en Android o Safari en iPhone.",
      true,
    );
    return;
  }
  const text = buildText(blockId);
  if (!text.trim()) {
    toast("Este bloque no tiene texto de estudio para leer.", true);
    return;
  }

  stopTemarioSpeech();
  const session = ++speakSession;
  pinnedBlockId = blockId;

  const blockEl = document.getElementById(`temario-${blockId}`);
  blockEl?.querySelectorAll(".temario-details").forEach((el) => {
    if (el instanceof HTMLDetailsElement) el.open = true;
  });

  resumeSpeechSynth();

  const chunks = chunkSpeechText(text);
  let index = 0;

  const speakNext = () => {
    if (session !== speakSession) return;
    if (index >= chunks.length) {
      updateUi(blockId, false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(chunks[index]);
    index += 1;
    utter.lang = "es-ES";
    utter.rate = isCoarsePointer() ? 0.92 : 0.95;
    const voice = pickSpanishSpeechVoice();
    if (voice) utter.voice = voice;
    utter.onstart = () => {
      if (session === speakSession) updateUi(blockId, true);
    };
    utter.onend = () => speakNext();
    utter.onerror = () => {
      if (session === speakSession) updateUi(blockId, false);
    };
    window.speechSynthesis.speak(utter);
  };

  updateUi(blockId, true);
  speakNext();

  if (!pickSpanishSpeechVoice()) {
    const onVoices = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
      if (session !== speakSession) return;
      window.speechSynthesis.cancel();
      index = 0;
      speakNext();
    };
    window.speechSynthesis.addEventListener("voiceschanged", onVoices);
  }
}

/** Precarga voces tras el primer toque (requerido en iOS). */
export function primeTemarioSpeechVoices() {
  if (!temarioSpeechSupported()) return;
  resumeSpeechSynth();
  pickSpanishSpeechVoice();
}
