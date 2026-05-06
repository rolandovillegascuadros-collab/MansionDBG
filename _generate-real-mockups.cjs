const { chromium } = require("playwright");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = __dirname;
const outDir = path.join(root, "mockups");
const baseUrl = "http://127.0.0.1:4190/index.html";

const shots = [
  {
    file: "01-ingreso-desktop.png",
    title: "Ingreso - desktop",
    viewport: { width: 1440, height: 900 },
    prepare: async (page) => {
      await page.goto(`${baseUrl}?mockup=entry-desktop-${Date.now()}`, { waitUntil: "domcontentloaded" });
    },
  },
  {
    file: "02-sala-desktop.png",
    title: "Sala offline - desktop",
    viewport: { width: 1440, height: 900 },
    prepare: async (page) => {
      await page.goto(`${baseUrl}?mockup=room-desktop-${Date.now()}`, { waitUntil: "domcontentloaded" });
      await page.click("#offline-entry");
      await page.click("#fill-room");
    },
  },
  {
    file: "03-partida-desktop.png",
    title: "Partida activa con dado inicial - desktop",
    viewport: { width: 1440, height: 900 },
    prepare: async (page) => {
      await page.goto(`${baseUrl}?mockup=game-desktop-${Date.now()}`, { waitUntil: "domcontentloaded" });
      await page.click("#offline-entry");
      await page.click("#fill-room");
      await page.click("#start-game");
      await page.waitForFunction(() => {
        const status = document.querySelector("#dice-roll-status")?.textContent || "";
        return status.includes("Comienza");
      }, { timeout: 7000 });
    },
  },
  {
    file: "04-iphone-15-pro-max-horizontal.png",
    title: "Partida activa - iPhone 15 Pro Max horizontal",
    viewport: { width: 932, height: 430, isMobile: true },
    prepare: async (page) => {
      await page.goto(`${baseUrl}?mockup=iphone-game-${Date.now()}`, { waitUntil: "domcontentloaded" });
      await page.click("#offline-entry");
      await page.click("#fill-room");
      await page.click("#start-game");
      await page.waitForFunction(() => {
        const status = document.querySelector("#dice-roll-status")?.textContent || "";
        return status.includes("Comienza");
      }, { timeout: 7000 });
    },
  },
  {
    file: "05-final-partida-desktop.png",
    title: "Final de partida por votos - desktop",
    viewport: { width: 1440, height: 900 },
    prepare: async (page) => {
      await page.goto(`${baseUrl}?mockup=end-desktop-${Date.now()}`, { waitUntil: "domcontentloaded" });
      await page.click("#offline-entry");
      await page.click("#fill-room");
      await page.click("#start-game");
      await page.waitForFunction(() => {
        const status = document.querySelector("#dice-roll-status")?.textContent || "";
        return status.includes("Comienza");
      }, { timeout: 7000 });
      await page.click("#request-end-game");
      await page.waitForTimeout(400);
    },
  },
];

function htmlEscape(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

(async () => {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });

  const results = [];
  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: { width: shot.viewport.width, height: shot.viewport.height },
      isMobile: Boolean(shot.viewport.isMobile),
      deviceScaleFactor: shot.viewport.isMobile ? 3 : 1,
    });
    const page = await context.newPage();
    await shot.prepare(page);
    await page.screenshot({ path: path.join(outDir, shot.file), fullPage: false });
    results.push(shot);
    await context.close();
  }

  await browser.close();

  const gallery = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mockups Mansion DBG</title>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #111; color: #f4efe4; }
    header { padding: 24px; border-bottom: 1px solid #333; }
    h1 { margin: 0 0 8px; font-size: 28px; }
    p { margin: 0; color: #c9c0ad; }
    main { display: grid; gap: 24px; padding: 24px; }
    figure { margin: 0; padding: 16px; background: #1b1b1b; border: 1px solid #333; border-radius: 8px; }
    figcaption { margin-bottom: 12px; font-weight: 700; }
    img { display: block; max-width: 100%; height: auto; border: 1px solid #3a3429; border-radius: 6px; }
  </style>
</head>
<body>
  <header>
    <h1>Mockups reales Mansion DBG</h1>
    <p>Capturas generadas desde la app local en navegador.</p>
  </header>
  <main>
    ${results.map((shot) => `<figure><figcaption>${htmlEscape(shot.title)}</figcaption><img src="${htmlEscape(shot.file)}" alt="${htmlEscape(shot.title)}"></figure>`).join("\n    ")}
  </main>
</body>
</html>`;
  await fs.writeFile(path.join(outDir, "index.html"), gallery, "utf8");
  console.log(JSON.stringify({
    output: outDir,
    files: [...results.map((shot) => shot.file), "index.html"],
  }, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
