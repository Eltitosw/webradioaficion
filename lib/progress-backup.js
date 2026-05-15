/** Exportación e importación del progreso guardado en localStorage. */

export const PROGRESS_BACKUP_VERSION = 1;

/**
 * @param {Record<string, string>} keyMap nombre lógico → clave localStorage
 * @param {(key: string) => string|null} read
 * @param {string} [appBuild]
 */
export function buildProgressBackupPayload(keyMap, read, appBuild) {
  /** @type {Record<string, unknown>} */
  const stores = {};
  for (const [name, storageKey] of Object.entries(keyMap)) {
    const raw = read(storageKey);
    if (!raw) continue;
    try {
      stores[name] = JSON.parse(raw);
    } catch {
      stores[name] = raw;
    }
  }
  return {
    version: PROGRESS_BACKUP_VERSION,
    exportedAt: Date.now(),
    appBuild: appBuild || "",
    stores,
  };
}

/**
 * @param {unknown} data
 * @param {Record<string, string>} keyMap
 * @param {(key: string) => string|null} read
 * @param {(key: string, value: string) => boolean} write
 * @param {{ replace: boolean }} opts
 * @returns {number} número de almacenes importados
 */
export function applyProgressBackupPayload(data, keyMap, read, write, opts) {
  if (!data || typeof data !== "object") throw new Error("invalid");
  const d = /** @type {Record<string, unknown>} */ (data);
  if (d.version !== PROGRESS_BACKUP_VERSION) throw new Error("version");
  const stores = d.stores;
  if (!stores || typeof stores !== "object") throw new Error("stores");
  const incoming = /** @type {Record<string, unknown>} */ (stores);

  if (opts.replace) {
    for (const storageKey of Object.values(keyMap)) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }
  }

  let count = 0;
  for (const [name, storageKey] of Object.entries(keyMap)) {
    if (!(name in incoming)) continue;
    let value = incoming[name];

    if (!opts.replace && value && typeof value === "object" && !Array.isArray(value)) {
      let existing = null;
      try {
        const raw = read(storageKey);
        if (raw) existing = JSON.parse(raw);
      } catch {
        existing = null;
      }
      if (existing && typeof existing === "object" && !Array.isArray(existing)) {
        value = { ...existing, ...value };
      }
    }

    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    if (!write(storageKey, serialized)) throw new Error("quota");
    count += 1;
  }
  return count;
}
