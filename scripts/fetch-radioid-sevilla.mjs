#!/usr/bin/env node
/**
 * Descarga usuarios RadioID de Sevilla (España).
 * Uso: node scripts/fetch-radioid-sevilla.mjs [--solo-ciudad]
 *
 * Sin flag: ciudad Sevilla/Seville + provincia (state=Sevilla).
 * --solo-ciudad: solo city Sevilla o Seville (capital).
 */
import { writeFileSync } from "fs";
import { readResponseText } from "../lib/http-text.mjs";

const SOLO_CIUDAD = process.argv.includes("--solo-ciudad");
const BASE = "https://radioid.net/api/users";
const QUERIES = ["city=Sevilla", "city=Seville", "state=Sevilla"];

function normCity(c) {
  return (c ?? "").trim().toLowerCase();
}

function isCitySevilla(u) {
  const c = normCity(u.city);
  return c === "sevilla" || c === "seville";
}

function isProvinciaSevilla(u) {
  return u.country === "Spain" && normCity(u.state) === "sevilla";
}

function includeUser(u) {
  if (u.country !== "Spain") return false;
  if (SOLO_CIUDAD) return isCitySevilla(u);
  return isCitySevilla(u) || isProvinciaSevilla(u);
}

async function fetchQuery(query) {
  const all = [];
  let page = 1;
  let pages = 1;
  while (page <= pages) {
    const url = `${BASE}?${query}&per_page=200&page=${page}`;
    const res = await fetch(url);
    const text = await readResponseText(res);
    const data = JSON.parse(text);
    pages = data.pages;
    all.push(...data.results);
    page++;
  }
  return all;
}

const byId = new Map();
for (const q of QUERIES) {
  const batch = await fetchQuery(q);
  for (const u of batch) {
    if (includeUser(u)) byId.set(u.id, u);
  }
  console.error(`${q}: ${batch.length} registros API`);
}

const results = [...byId.values()].sort((a, b) => {
  const ta = a.lastheard ? new Date(a.lastheard).getTime() : Infinity;
  const tb = b.lastheard ? new Date(b.lastheard).getTime() : Infinity;
  if (ta !== tb) return ta - tb;
  return (a.callsign || "").localeCompare(b.callsign || "", "es");
});

const out = {
  count: results.length,
  filter: SOLO_CIUDAD ? "ciudad" : "ciudad+provincia",
  sorted_by: "lastheard_asc",
  fetched: new Date().toISOString(),
  results,
};

writeFileSync("data/radioid-sevilla.json", JSON.stringify(out, null, 2), "utf8");

const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const hdr =
  "callsign,radio_id,nombre,ciudad,provincia,pais,ultima_escucha,ultimo_master";
const rows = results.map((u) =>
  [
    u.callsign,
    u.radio_id,
    u.fname || u.name,
    (u.city ?? "").trim(),
    (u.state ?? "").trim(),
    u.country,
    u.lastheard ?? "",
    u.lastmaster ?? "",
  ]
    .map(esc)
    .join(","),
);
writeFileSync("data/radioid-sevilla.csv", [hdr, ...rows].join("\n"), "utf8");

console.log(`Total únicos (${out.filter}): ${results.length}`);
console.log("→ data/radioid-sevilla.json");
console.log("→ data/radioid-sevilla.csv");
