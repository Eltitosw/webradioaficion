/**
 * Decodifica respuestas HTTP según charset (FEDI usa ISO-8859-15, no UTF-8).
 */

const CHARSET_ALIASES = {
  "iso-8859-1": "iso-8859-1",
  "iso-8859-15": "iso-8859-15",
  "windows-1252": "windows-1252",
  "cp1252": "windows-1252",
  latin1: "iso-8859-1",
};

/**
 * @param {Response} res
 */
export async function readResponseText(res) {
  const buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type") || "";
  const m = ct.match(/charset=([^;\s]+)/i);
  let charset = (m?.[1] || "utf-8").trim().toLowerCase().replace(/^"|"$/g, "");
  charset = CHARSET_ALIASES[charset] || charset;

  try {
    return new TextDecoder(charset).decode(buf);
  } catch {
    try {
      return new TextDecoder("iso-8859-15").decode(buf);
    } catch {
      return buf.toString("latin1");
    }
  }
}
