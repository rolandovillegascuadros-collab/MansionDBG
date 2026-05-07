import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = "C:\\Users\\Usuario\\Documents\\Codex\\2026-05-05\\MansionDBG";
const workbookPath = path.join(root, "outputs", "card-list", "MansionDBG-listado-cartas.xlsx");
const scriptPath = path.join(root, "script.js");

function cellText(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function cellNumber(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const number = Number(String(value).replace(",", "."));
  return Number.isFinite(number) ? number : undefined;
}

function fileNameFromPath(value = "") {
  const match = String(value).match(/([^/\\]+)$/);
  return match ? match[1] : "";
}

function normalize(value) {
  return cellText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function cleanObject(object) {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined || object[key] === null || object[key] === "") delete object[key];
  });
  return object;
}

function parseEffects(card, text) {
  if (card.type !== "Accion") return;
  delete card.damageBonus;
  delete card.ammoBonus;
  delete card.goldBonus;
  delete card.extraAction;
  delete card.extraBuy;
  delete card.extraExplore;
  delete card.draw;

  const source = normalize(text);
  const plus = (terms) => {
    const list = Array.isArray(terms) ? terms : [terms];
    for (const term of list) {
      const match = source.match(new RegExp(`\\+(\\d+)\\s*${term}`));
      if (match) return Number(match[1]);
    }
    return undefined;
  };
  const draw = source.match(/roba\s*(\d+)/);

  card.damageBonus = plus(["dano", "damage"]);
  card.ammoBonus = plus(["municion", "ammo"]);
  card.goldBonus = plus(["oro", "gold"]);
  card.extraAction = plus(["accion", "acciones"]);
  card.extraBuy = plus(["compra", "compras"]);
  card.extraExplore = plus(["exploracion", "exploraciones"]);
  if (draw) card.draw = Number(draw[1]);
  cleanObject(card);
}

function jsString(value) {
  return JSON.stringify(value);
}

function jsValue(key, value) {
  if (key === "image") return `\`${"${CARD_PATH}"}${fileNameFromPath(value)}\``;
  if (Array.isArray(value)) {
    return `[${value.map((item) => jsObject(item)).join(", ")}]`;
  }
  if (value && typeof value === "object") return jsObject(value);
  if (typeof value === "string") return jsString(value);
  return JSON.stringify(value);
}

function jsObject(object) {
  const entries = Object.entries(object).filter(([, value]) => value !== undefined && value !== "");
  return `{ ${entries.map(([key, value]) => `${key}: ${jsValue(key, value)}`).join(", ")} }`;
}

function replaceSection(source, startMarker, nextMarker, replacement) {
  const start = source.indexOf(startMarker);
  const next = source.indexOf(nextMarker, start);
  if (start < 0 || next < 0) throw new Error(`No se pudo reemplazar ${startMarker}`);
  return `${source.slice(0, start)}${replacement}${source.slice(next)}`;
}

function loadGameData(script) {
  const start = script.indexOf("const CARD_PATH");
  const end = script.indexOf("localStorage.removeItem");
  const source = `${script.slice(start, end)}
globalThis.characters = characters;
globalThis.catalog = catalog;
globalThis.mansionStory = mansionStory;
globalThis.mercenaryBonus = mercenaryBonus;`;
  const context = {};
  vm.createContext(context);
  vm.runInContext(source, context);
  return context;
}

function levelRows(row, idx) {
  const levels = [
    { min: cellNumber(row[idx.nivel1Medallas]), text: cellText(row[idx.habilidadNivel1]) },
    { min: cellNumber(row[idx.nivel2Medallas]), text: cellText(row[idx.habilidadNivel2]) },
    { min: cellNumber(row[idx.nivel3Medallas]), text: cellText(row[idx.habilidadNivel3]) },
  ].filter((level) => level.min !== undefined && level.text);
  return levels.length ? levels : undefined;
}

function traitFromLevels(levels, passive) {
  const parts = (levels || []).map((level, index) => `Nivel ${index + 1} (${level.min} medallas): ${level.text}`);
  if (passive) parts.push(`Pasivo: ${passive}`);
  return parts.join(" | ");
}

const input = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const table = await workbook.inspect({
  kind: "table",
  range: "Todas las cartas!A1:AE75",
  include: "values",
  tableMaxRows: 100,
  tableMaxCols: 40,
  maxChars: 200000,
});
const parsed = JSON.parse(table.ndjson.split(/\n/)[0]);
const [headers, ...rows] = parsed.values;
const idx = Object.fromEntries(headers.map((header, index) => [header, index]));

let script = await fs.readFile(scriptPath, "utf8");
const data = loadGameData(script);

const characterRows = rows.filter((row) => cellText(row[idx.origen]) === "characters");
const catalogRows = rows.filter((row) => cellText(row[idx.origen]) === "catalog");
const mansionRows = rows.filter((row) => cellText(row[idx.origen]) === "mansionStory");
const bonusRows = rows.filter((row) => cellText(row[idx.origen]) === "mercenaryBonus");

const characters = data.characters.map((character) => {
  const row = characterRows.find((item) => fileNameFromPath(item[idx.imagen]) === fileNameFromPath(character.image));
  if (!row) return character;
  const levels = levelRows(row, idx);
  const passive = cellText(row[idx.efectoPasivo]);
  return cleanObject({
    name: cellText(row[idx.nombre]) || character.name,
    health: cellNumber(row[idx.vida]) ?? character.health,
    trait: traitFromLevels(levels, passive) || cellText(row[idx.nuevaHabilidad]) || cellText(row[idx.habilidadActual]) || character.trait,
    levels,
    passive,
    portrait: character.portrait,
    image: character.image,
  });
});

const catalog = {};
Object.entries(data.catalog).forEach(([id, original]) => {
  const row = catalogRows.find((item) => cellText(item[idx.id]) === id);
  const card = { ...original };
  if (row) {
    card.name = cellText(row[idx.nombre]) || card.name;
    card.type = cellText(row[idx.tipo]) || card.type;
    card.cost = cellNumber(row[idx.coste]) ?? card.cost;
    card.damage = cellNumber(row[idx.dano]) ?? card.damage;
    card.ammo = cellNumber(row[idx.municion]) ?? card.ammo;
    card.gold = cellNumber(row[idx.oro]) ?? card.gold;
    card.ammoCost = cellNumber(row[idx.requisitoMunicion]) ?? card.ammoCost;
    const text = cellText(row[idx.nuevaHabilidad]) || cellText(row[idx.habilidadActual]) || cellText(row[idx.bonus]);
    if (text) card.text = text;
    parseEffects(card, text);
  }
  catalog[id] = cleanObject(card);
});

function updateMansionCard(original, row) {
  const card = { ...original };
  if (!row) return card;
  card.name = cellText(row[idx.nombre]) || card.name;
  card.type = cellText(row[idx.tipo]) || card.type;
  card.health = cellNumber(row[idx.vida]) ?? card.health;
  card.damage = cellNumber(row[idx.danoRecibido]) ?? card.damage;
  card.decorations = cellNumber(row[idx.medallas]) ?? card.decorations;
  const text = cellText(row[idx.nuevaHabilidad]) || cellText(row[idx.habilidadActual]);
  if (text) card.text = text;
  return cleanObject(card);
}

const mansionStory = data.mansionStory.map((card) => {
  const row = mansionRows.find((item) => fileNameFromPath(item[idx.imagen]) === fileNameFromPath(card.image));
  return updateMansionCard(card, row);
});

const mercenaryBonus = data.mercenaryBonus.map((card) => {
  const row = bonusRows.find((item) => fileNameFromPath(item[idx.imagen]) === fileNameFromPath(card.image));
  return updateMansionCard(card, row);
});

const charactersBlock = `const characters = [\n${characters.map((item) => `  ${jsObject(item)}`).join(",\n")},\n];\n\n`;
const catalogBlock = `const catalog = {\n${Object.entries(catalog).map(([id, card]) => `  ${id}: ${jsObject(card)}`).join(",\n")},\n};\n\n`;
const mansionBlock = `const mansionStory = [\n${mansionStory.map((item) => `  ${jsObject(item)}`).join(",\n")},\n];\n\n`;
const bonusBlock = `const mercenaryBonus = [\n${mercenaryBonus.map((item) => `  ${jsObject(item)}`).join(",\n")},\n];\n\n`;

script = replaceSection(script, "const characters = [", "const catalog = {", charactersBlock);
script = replaceSection(script, "const catalog = {", "const baseResourceIds", catalogBlock);
script = replaceSection(script, "const mansionStory = [", "const mercenaryBonus = [", mansionBlock);
script = replaceSection(script, "const mercenaryBonus = [", "localStorage.removeItem", bonusBlock);

await fs.writeFile(scriptPath, script, "utf8");
console.log(JSON.stringify({
  characters: characters.length,
  catalog: Object.keys(catalog).length,
  mansionStory: mansionStory.length,
  mercenaryBonus: mercenaryBonus.length,
}, null, 2));
