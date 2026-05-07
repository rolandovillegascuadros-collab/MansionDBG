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
    .replaceAll("daÃƒÂ±o", "dano")
    .replaceAll("acciÃƒÂ³n", "acciÃ³n")
    .replaceAll("municiÃƒÂ³n", "municiÃ³n")
    .replaceAll("exploraciÃƒÂ³n", "exploraciÃ³n")
    .replaceAll("mansiÃƒÂ³n", "mansiÃ³n")
    .replaceAll("MÃƒÂ­nimo", "MÃ­nimo");
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
  if (card.damageBonus) effects.push(`+${card.damageBonus} dano`);
  if (card.ammoBonus) effects.push(`+${card.ammoBonus} municiÃ³n`);
  if (card.goldBonus) effects.push(`+${card.goldBonus} oro`);
  if (card.extraAction) effects.push(`+${card.extraAction} acciÃ³n`);
  if (card.extraBuy) effects.push(`+${card.extraBuy} compra`);
  if (card.extraExplore) effects.push(`+${card.extraExplore} exploraciÃ³n`);
  if (card.draw) effects.push(`roba ${card.draw}`);
  if (card.heal) effects.push(`cura ${card.heal}`);
  if (card.maxHeal) effects.push(`vida mÃ¡xima +${card.maxHeal}`);
  if (card.fullHeal) effects.push("cura completa");
  if (card.splash) effects.push(`dano splash ${card.splash}`);
  if (card.damagePerAmmo) effects.push(`dano variable: ${card.damagePerAmmo.damage} por cada ${card.damagePerAmmo.step} municiÃ³n`);
  if (card.damageXAmmo) effects.push("dano igual a municiÃ³n disponible");
  return cleanText(effects.join(" / ") || card.text || "");
}

function scenarioResourceIds(data, scenario) {
  const forbidden = new Set(["gatling", "rocket"]);
  const actionIds = Object.keys(data.catalog).filter((id) => data.catalog[id].type === "Accion");
  return [...new Set([...data.baseResourceIds, ...(scenario.resources || []), ...actionIds])]
    .filter((id) => data.catalog[id] && !forbidden.has(id));
}

function purchaseScenarioNames(data, cardId) {
  return Object.values(data.scenarios)
    .filter((scenario) => scenarioResourceIds(data, scenario).includes(cardId))
    .map((scenario) => scenario.name);
}

function characterLevelEffects(character) {
  const name = character.name || "";
  if (name.includes("Rebecca")) {
    return {
      nivel1Medallas: 0,
      habilidadNivel1: "Cura 20 vida.",
      nivel2Medallas: 3,
      habilidadNivel2: "Cura 20 vida.",
      nivel3Medallas: 5,
      habilidadNivel3: "Cura 20 vida.",
      efectoPasivo: "",
    };
  }
  if (name.includes("Leon")) {
    return {
      nivel1Medallas: 0,
      habilidadNivel1: "Recupera 10 vida.",
      nivel2Medallas: 3,
      habilidadNivel2: "Recupera 10 vida.",
      nivel3Medallas: 5,
      habilidadNivel3: "Recupera 10 vida.",
      efectoPasivo: "",
    };
  }
  if (name.includes("Barry")) {
    return {
      nivel1Medallas: 0,
      habilidadNivel1: "+10 municion.",
      nivel2Medallas: 3,
      habilidadNivel2: "+10 municion.",
      nivel3Medallas: 5,
      habilidadNivel3: "+10 municion.",
      efectoPasivo: "",
    };
  }
  if (name.includes("Claire")) {
    return {
      nivel1Medallas: 0,
      habilidadNivel1: "+5 dano.",
      nivel2Medallas: 3,
      habilidadNivel2: "+1 compra.",
      nivel3Medallas: 5,
      habilidadNivel3: "+1 compra.",
      efectoPasivo: "",
    };
  }
  if (name.includes("Ada")) {
    return {
      nivel1Medallas: 0,
      habilidadNivel1: "+5 dano.",
      nivel2Medallas: 3,
      habilidadNivel2: "+20 oro.",
      nivel3Medallas: 5,
      habilidadNivel3: "+20 oro.",
      efectoPasivo: "",
    };
  }
  if (name.includes("Jill")) {
    return {
      nivel1Medallas: 0,
      habilidadNivel1: "+5 dano.",
      nivel2Medallas: 3,
      habilidadNivel2: "+10 dano.",
      nivel3Medallas: 5,
      habilidadNivel3: "+1 exploracion.",
      efectoPasivo: "",
    };
  }
  if (name.includes("Sheva")) {
    return {
      nivel1Medallas: 0,
      habilidadNivel1: "+5 dano.",
      nivel2Medallas: 3,
      habilidadNivel2: "+10 dano.",
      nivel3Medallas: 5,
      habilidadNivel3: "+10 dano.",
      efectoPasivo: "+1 medalla adicional al derrotar jefe.",
    };
  }
  return {
    nivel1Medallas: 0,
    habilidadNivel1: "+5 dano.",
    nivel2Medallas: 3,
    habilidadNivel2: "+10 dano.",
    nivel3Medallas: 5,
    habilidadNivel3: "+10 dano.",
    efectoPasivo: "",
  };
}

function buildRows(data, assets) {
  const rows = [];
  const seenFiles = new Set();
  data.characters.forEach((character, index) => {
    const imageFile = basenameFromImage(character.image);
    if (imageFile) seenFiles.add(imageFile);
    const levelEffects = characterLevelEffects(character);
    rows.push({
      grupo: "Personajes",
      id: `CH-${String(index + 1).padStart(3, "0")}`,
      nombre: character.name,
      tipo: "Personaje",
      coste: "",
      vida: character.health || "",
      dano: "",
      danoRecibido: "",
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
      disponibleCompra: "",
      escenariosCompra: "",
      cantidadMonton: "",
      ...levelEffects,
      nuevaHabilidad: "",
      notas: "",
    });
  });

  Object.values(data.catalog).forEach((card) => {
    const imageFile = basenameFromImage(card.image);
    if (imageFile) seenFiles.add(imageFile);
    const purchaseScenarios = purchaseScenarioNames(data, card.id);
    rows.push({
      grupo: "Recursos",
      id: card.id,
      nombre: card.name,
      tipo: cleanText(card.type),
      coste: card.cost ?? "",
      vida: "",
      dano: card.damage ?? "",
      danoRecibido: "",
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
      disponibleCompra: purchaseScenarios.length ? "Si" : "No",
      escenariosCompra: purchaseScenarios.join(", "),
      cantidadMonton: card.id === "ammo10" ? 28 : 6,
      nivel1Medallas: "",
      habilidadNivel1: "",
      nivel2Medallas: "",
      habilidadNivel2: "",
      nivel3Medallas: "",
      habilidadNivel3: "",
      efectoPasivo: "",
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
      dano: "",
      danoRecibido: card.damage ?? "",
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
      disponibleCompra: "",
      escenariosCompra: "",
      cantidadMonton: "",
      nivel1Medallas: "",
      habilidadNivel1: "",
      nivel2Medallas: "",
      habilidadNivel2: "",
      nivel3Medallas: "",
      habilidadNivel3: "",
      efectoPasivo: "",
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
      dano: "",
      danoRecibido: card.damage ?? "",
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
      disponibleCompra: "",
      escenariosCompra: "",
      cantidadMonton: "",
      nivel1Medallas: "",
      habilidadNivel1: "",
      nivel2Medallas: "",
      habilidadNivel2: "",
      nivel3Medallas: "",
      habilidadNivel3: "",
      efectoPasivo: "",
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
      dano: "",
      danoRecibido: "",
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
      disponibleCompra: "",
      escenariosCompra: "",
      cantidadMonton: "",
      nivel1Medallas: "",
      habilidadNivel1: "",
      nivel2Medallas: "",
      habilidadNivel2: "",
      nivel3Medallas: "",
      habilidadNivel3: "",
      efectoPasivo: "",
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
  "grupo", "id", "nombre", "tipo", "coste", "vida", "dano", "danoRecibido", "medallas", "municion", "oro",
  "requisitoMunicion", "curacion", "bonus", "habilidadActual", "flags", "imagen", "ruta", "origen", "disponibleCompra",
  "escenariosCompra", "cantidadMonton", "nivel1Medallas", "habilidadNivel1", "nivel2Medallas", "habilidadNivel2",
  "nivel3Medallas", "habilidadNivel3", "efectoPasivo", "nuevaHabilidad", "notas",
];
const wideColumns = [130, 120, 190, 110, 70, 70, 70, 110, 85, 80, 70, 120, 90, 260, 320, 190, 150, 230, 130, 120, 320, 100, 110, 260, 110, 260, 110, 260, 260, 300, 300];
addSheet(workbook, "Todas las cartas", allHeaders, allRows, wideColumns);
addSheet(workbook, "Personajes", allHeaders, allRows.filter((row) => row.grupo === "Personajes"), wideColumns);
addSheet(workbook, "Recursos", allHeaders, allRows.filter((row) => row.grupo === "Recursos"), wideColumns);
addSheet(workbook, "Mansion", allHeaders, allRows.filter((row) => row.grupo === "Mansion" || row.grupo === "Bonus mercenario"), wideColumns);
const scenarioRows = Object.entries(data.scenarios).map(([id, scenario]) => ({
  id,
  nombre: scenario.name,
  modos: (scenario.modes || []).join(", "),
  recursos: (scenario.resources || []).join(", "),
  totalRecursos: (scenario.resources || []).length,
}));
addSheet(workbook, "Escenarios", ["id", "nombre", "modos", "recursos", "totalRecursos"], scenarioRows, [140, 180, 180, 700, 120]);

const purchaseRows = Object.values(data.catalog).map((card) => {
  const row = {
    id: card.id,
    nombre: card.name,
    tipo: cleanText(card.type),
    coste: card.cost ?? "",
    efecto: actionSummary(card),
  };
  Object.entries(data.scenarios).forEach(([id, scenario]) => {
    row[id] = scenarioResourceIds(data, scenario).includes(card.id) ? "Si" : "";
  });
  return row;
});
addSheet(workbook, "Compra por escenario", ["id", "nombre", "tipo", "coste", "efecto", ...Object.keys(data.scenarios)], purchaseRows, [120, 190, 110, 70, 340, 120, 120, 120]);

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

for (const sheetName of ["Resumen", "Todas las cartas", "Personajes", "Recursos", "Mansion", "Escenarios", "Compra por escenario", "Assets cartas"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName.replace(/[^A-Za-z0-9]/g, "-")}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(outputPath);


