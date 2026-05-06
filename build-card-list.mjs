import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "C:\\Users\\Usuario\\Documents\\Codex\\2026-05-05\\MansionDBG";
const outputDir = path.join(root, "outputs", "card-list");
const outputPath = path.join(outputDir, "MansionDBG-listado-cartas.xlsx");
const scriptPath = path.join(root, "script.js");
const cardsDir = path.join(root, "assets", "cards");

function colName(index) {
  let n = index + 1;
  let name = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function rangeFor(rows, cols) {
  return `A1:${colName(cols - 1)}${Math.max(rows, 1)}`;
}

function cleanText(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replaceAll("daÃ±o", "daño")
    .replaceAll("acciÃ³n", "acción")
    .replaceAll("municiÃ³n", "munición")
    .replaceAll("exploraciÃ³n", "exploración")
    .replaceAll("mansiÃ³n", "mansión")
    .replaceAll("MÃ­nimo", "Mínimo");
}

function boolText(value) {
  return value ? "Si" : "";
}

function basenameFromImage(image = "") {
  const match = String(image).match(/([^/\\]+)$/);
  return match ? match[1] : "";
}

function prefixCategory(filename) {
  const prefix = filename.split("-")[0].toUpperCase();
  const map = {
    AC: "Accion",
    AM: "Municion",
    CH: "Personaje",
    CHPR: "Perfil personaje",
    IT: "Objeto",
    MA: "Mansion",
    WE: "Arma",
  };
  return map[prefix] || "Otro";
}

async function listCardAssets() {
  const entries = await fs.readdir(cardsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => ({
      filename: entry.name,
      category: prefixCategory(entry.name),
      relativePath: `assets/cards/${entry.name}`,
    }))
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

function loadCardData(script) {
  const start = script.indexOf("const CARD_PATH");
  const end = script.indexOf("localStorage.removeItem");
  if (start < 0 || end < 0) throw new Error("No se pudo ubicar el bloque de datos de cartas.");
  const source = `${script.slice(start, end)}
globalThis.characters = characters;
globalThis.catalog = catalog;
globalThis.baseResourceIds = baseResourceIds;
globalThis.scenarios = scenarios;
globalThis.mansionStory = mansionStory;
globalThis.mercenaryBonus = mercenaryBonus;`;
  const context = {};
  vm.createContext(context);
  vm.runInContext(source, context);
  return context;
}

function actionSummary(card) {
  const effects = [];
  if (card.damageBonus) effects.push(`+${card.damageBonus} daño`);
  if (card.ammoBonus) effects.push(`+${card.ammoBonus} munición`);
  if (card.goldBonus) effects.push(`+${card.goldBonus} oro`);
  if (card.extraAction) effects.push(`+${card.extraAction} acción`);
  if (card.extraBuy) effects.push(`+${card.extraBuy} compra`);
  if (card.extraExplore) effects.push(`+${card.extraExplore} exploración`);
  if (card.draw) effects.push(`roba ${card.draw}`);
  if (card.heal) effects.push(`cura ${card.heal}`);
  if (card.maxHeal) effects.push(`vida máxima +${card.maxHeal}`);
  if (card.fullHeal) effects.push("cura completa");
  if (card.splash) effects.push(`daño splash ${card.splash}`);
  if (card.damagePerAmmo) effects.push(`daño variable: ${card.damagePerAmmo.damage} por cada ${card.damagePerAmmo.step} munición`);
  if (card.damageXAmmo) effects.push("daño igual a munición disponible");
  return cleanText(effects.join(" / ") || card.text || "");
}

function buildRows(data, assets) {
  const rows = [];
  const seenFiles = new Set();
  data.characters.forEach((character, index) => {
    const imageFile = basenameFromImage(character.image);
    if (imageFile) seenFiles.add(imageFile);
    rows.push({
      grupo: "Personajes",
      id: `CH-${String(index + 1).padStart(3, "0")}`,
      nombre: character.name,
      tipo: "Personaje",
      coste: "",
      vida: character.health || "",
      daño: "",
      dañoRecibido: "",
      medallas: "",
      municion: "",
      oro: "",
      requisitoMunicion: "",
      curacion: "",
      bonus: "",
      habilidadActual: cleanText(character.trait),
      flags: "",
      imagen: imageFile,
      ruta: character.image || "",
      origen: "characters",
      nuevaHabilidad: "",
      notas: "",
    });
  });

  Object.values(data.catalog).forEach((card) => {
    const imageFile = basenameFromImage(card.image);
    if (imageFile) seenFiles.add(imageFile);
    rows.push({
      grupo: "Recursos",
      id: card.id,
      nombre: card.name,
      tipo: cleanText(card.type),
      coste: card.cost ?? "",
      vida: "",
      daño: card.damage ?? "",
      dañoRecibido: "",
      medallas: "",
      municion: card.ammo ?? "",
      oro: card.gold ?? "",
      requisitoMunicion: card.ammoCost ?? "",
      curacion: card.fullHeal ? "Completa" : card.heal || card.maxHeal || "",
      bonus: actionSummary(card),
      habilidadActual: cleanText(card.text || actionSummary(card)),
      flags: [
        card.damagePerAmmo ? "damagePerAmmo" : "",
        card.damageXAmmo ? "damageXAmmo" : "",
        card.fullHeal ? "fullHeal" : "",
      ].filter(Boolean).join(", "),
      imagen: imageFile,
      ruta: card.image || "",
      origen: "catalog",
      nuevaHabilidad: "",
      notas: "",
    });
  });

  data.mansionStory.forEach((card, index) => {
    const imageFile = basenameFromImage(card.image);
    if (imageFile) seenFiles.add(imageFile);
    rows.push({
      grupo: "Mansion",
      id: imageFile.replace(/\.[^.]+$/, "") || `MA-${String(index + 1).padStart(3, "0")}`,
      nombre: card.name,
      tipo: cleanText(card.type),
      coste: "",
      vida: card.health ?? "",
      daño: "",
      dañoRecibido: card.damage ?? "",
      medallas: card.decorations ?? "",
      municion: "",
      oro: "",
      requisitoMunicion: "",
      curacion: "",
      bonus: card.mansionItem ? `Entrega carta: ${card.mansionItem}` : "",
      habilidadActual: cleanText(card.text || ""),
      flags: [
        card.boss ? "boss" : "",
        card.nemesis ? "nemesis" : "",
        card.mansionItem ? "mansionItem" : "",
      ].filter(Boolean).join(", "),
      imagen: imageFile,
      ruta: card.image || "",
      origen: "mansionStory",
      nuevaHabilidad: "",
      notas: "",
    });
  });

  data.mercenaryBonus.forEach((card, index) => {
    const imageFile = basenameFromImage(card.image);
    if (imageFile) seenFiles.add(imageFile);
    rows.push({
      grupo: "Bonus mercenario",
      id: imageFile.replace(/\.[^.]+$/, "") || `BONUS-${index + 1}`,
      nombre: card.name,
      tipo: cleanText(card.type),
      coste: "",
      vida: card.health ?? "",
      daño: "",
      dañoRecibido: card.damage ?? "",
      medallas: card.decorations ?? "",
      municion: "",
      oro: "",
      requisitoMunicion: "",
      curacion: "",
      bonus: card.bonusTurns ? `+${card.bonusTurns} turno` : "",
      habilidadActual: cleanText(card.text || ""),
      flags: card.bonusTurns ? "bonusTurns" : "",
      imagen: imageFile,
      ruta: card.image || "",
      origen: "mercenaryBonus",
      nuevaHabilidad: "",
      notas: "",
    });
  });

  assets.forEach((asset) => {
    if (seenFiles.has(asset.filename)) return;
    rows.push({
      grupo: "Solo archivo",
      id: asset.filename.replace(/\.[^.]+$/, ""),
      nombre: asset.filename.replace(/\.[^.]+$/, ""),
      tipo: asset.category,
      coste: "",
      vida: "",
      daño: "",
      dañoRecibido: "",
      medallas: "",
      municion: "",
      oro: "",
      requisitoMunicion: "",
      curacion: "",
      bonus: "",
      habilidadActual: "",
      flags: "Imagen existe pero no esta parametrizada en script.js",
      imagen: asset.filename,
      ruta: asset.relativePath,
      origen: "assets/cards",
      nuevaHabilidad: "",
      notas: "",
    });
  });
  return rows;
}

function addSheet(workbook, name, headers, rows, widths = []) {
  const sheet = workbook.worksheets.add(name);
  sheet.showGridLines = false;
  const matrix = [headers, ...rows.map((row) => headers.map((header) => row[header] ?? ""))];
  sheet.getRange(rangeFor(matrix.length, headers.length)).values = matrix;
  const headerRange = sheet.getRange(`A1:${colName(headers.length - 1)}1`);
  headerRange.format = {
    fill: "#7A1F1F",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
  };
  sheet.getRange(rangeFor(matrix.length, headers.length)).format.wrapText = true;
  sheet.freezePanes.freezeRows(1);
  if (matrix.length > 1) {
    const table = sheet.tables.add(rangeFor(matrix.length, headers.length), true, `${name.replace(/[^A-Za-z0-9]/g, "")}Table`);
    table.style = "TableStyleMedium2";
  }
  widths.forEach((width, index) => {
    if (!width) return;
    sheet.getRange(`${colName(index)}:${colName(index)}`).format.columnWidthPx = width;
  });
  return sheet;
}

await fs.mkdir(outputDir, { recursive: true });
const script = await fs.readFile(scriptPath, "utf8");
const data = loadCardData(script);
const assets = await listCardAssets();
const allRows = buildRows(data, assets);

const workbook = Workbook.create();
const resumenRows = [
  ["Cartas/personajes parametrizados", allRows.filter((row) => row.origen !== "assets/cards").length],
  ["Imagenes solo en assets/cards", allRows.filter((row) => row.origen === "assets/cards").length],
  ["Personajes", allRows.filter((row) => row.grupo === "Personajes").length],
  ["Recursos/armas/acciones/objetos", allRows.filter((row) => row.grupo === "Recursos").length],
  ["Cartas de mansion", allRows.filter((row) => row.grupo === "Mansion").length],
  ["Bonus mercenario", allRows.filter((row) => row.grupo === "Bonus mercenario").length],
];
const summary = workbook.worksheets.add("Resumen");
summary.showGridLines = false;
summary.getRange("A1:D1").merge();
summary.getRange("A1").values = [["Mansion DBG - listado editable de cartas"]];
summary.getRange("A1").format = { fill: "#1F2933", font: { bold: true, color: "#FFFFFF", size: 16 } };
summary.getRange("A3:B8").values = resumenRows;
summary.getRange("A3:A8").format = { font: { bold: true }, fill: "#E9DED0" };
summary.getRange("B3:B8").format = { fill: "#FFF7ED" };
summary.getRange("A10:D13").values = [
  ["Uso sugerido", "", "", ""],
  ["Edita las columnas 'nuevaHabilidad' y 'notas' en la hoja Todas las cartas para corregir habilidades.", "", "", ""],
  ["Las filas 'Solo archivo' indican imagenes que existen en assets/cards pero no tienen reglas en script.js.", "", "", ""],
  ["Fuente", "script.js y assets/cards", "", ""],
];
summary.getRange("A10:D10").merge();
summary.getRange("A11:D11").merge();
summary.getRange("A12:D12").merge();
summary.getRange("A13:D13").merge();
summary.getRange("A10").format = { fill: "#7A1F1F", font: { bold: true, color: "#FFFFFF" } };
summary.getRange("A:D").format.columnWidthPx = 240;

const allHeaders = [
  "grupo", "id", "nombre", "tipo", "coste", "vida", "daño", "dañoRecibido", "medallas", "municion", "oro",
  "requisitoMunicion", "curacion", "bonus", "habilidadActual", "flags", "imagen", "ruta", "origen", "nuevaHabilidad", "notas",
];
addSheet(workbook, "Todas las cartas", allHeaders, allRows, [130, 120, 190, 110, 70, 70, 70, 110, 85, 80, 70, 120, 90, 260, 320, 190, 150, 230, 130, 300, 300]);

addSheet(workbook, "Personajes", allHeaders, allRows.filter((row) => row.grupo === "Personajes"), [130, 120, 190, 110, 70, 70, 70, 110, 85, 80, 70, 120, 90, 260, 320, 190, 150, 230, 130, 300, 300]);
addSheet(workbook, "Recursos", allHeaders, allRows.filter((row) => row.grupo === "Recursos"), [130, 120, 190, 110, 70, 70, 70, 110, 85, 80, 70, 120, 90, 260, 320, 190, 150, 230, 130, 300, 300]);
addSheet(workbook, "Mansion", allHeaders, allRows.filter((row) => row.grupo === "Mansion" || row.grupo === "Bonus mercenario"), [130, 120, 190, 110, 70, 70, 70, 110, 85, 80, 70, 120, 90, 260, 320, 190, 150, 230, 130, 300, 300]);

const scenarioRows = Object.entries(data.scenarios).map(([id, scenario]) => ({
  id,
  nombre: scenario.name,
  modos: (scenario.modes || []).join(", "),
  recursos: (scenario.resources || []).join(", "),
  totalRecursos: (scenario.resources || []).length,
}));
addSheet(workbook, "Escenarios", ["id", "nombre", "modos", "recursos", "totalRecursos"], scenarioRows, [140, 180, 180, 700, 120]);

addSheet(workbook, "Assets cartas", ["filename", "category", "relativePath"], assets, [220, 160, 320]);

const inspect = await workbook.inspect({ kind: "sheet", include: "name", maxChars: 2000 });
console.log(inspect.ndjson);
const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

for (const sheetName of ["Resumen", "Todas las cartas", "Personajes", "Recursos", "Mansion", "Escenarios", "Assets cartas"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName.replace(/[^A-Za-z0-9]/g, "-")}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(outputPath);
