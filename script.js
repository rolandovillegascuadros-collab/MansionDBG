const CARD_PATH = "assets/cards/";
const AUDIO_PATH = "assets/audio/";

const modes = {
  story: {
    name: "Historia",
    min: 1,
    max: 4,
    turnLimit: null,
    objective: "Mejora tu mazo, explora la mansion y vence a Uroboros Aheri.",
  },
  mercenary: {
    name: "Mercenario",
    min: 1,
    max: 4,
    turnLimit: 15,
    objective: "Ataca sin parar: gana quien tenga mas condecoraciones al terminar el tiempo.",
  },
  versus: {
    name: "Versus",
    min: 2,
    max: 4,
    turnLimit: null,
    objective: "Sin mansion ni infectados: todos contra todos hasta 3 condecoraciones.",
  },
};

const characters = [
  { name: "Albert Wesker", health: 90, trait: "Nivel 1 (2 medallas): Cuando Albert wesker aqtaque a un personaje o explore mansion, consigue +20 oro durante este turno. | Nivel 2 (9 medallas): Durante tu turno, elige a un jugador. Ese jugador consigue +1 exploracion y debe explorar ese turno obligatorio.", levels: [{ min: 2, text: "Cuando Albert wesker aqtaque a un personaje o explore mansion, consigue +20 oro durante este turno." }, { min: 9, text: "Durante tu turno, elige a un jugador. Ese jugador consigue +1 exploracion y debe explorar ese turno obligatorio." }], portrait: "scout", image: `${CARD_PATH}CH-001.png` },
  { name: "Leon S. Kennedy", health: 80, trait: "Nivel 1 (2 medallas): Todas mis Armas Pistolas reciben -10 de municion | Nivel 2 (6 medallas): Todas mis Armas Pistolas pueden ser usada dos veces por turno.", levels: [{ min: 2, text: "Todas mis Armas Pistolas reciben -10 de municion" }, { min: 6, text: "Todas mis Armas Pistolas pueden ser usada dos veces por turno." }], portrait: "medic", image: `${CARD_PATH}CH-002.png` },
  { name: "Claire Redfield", health: 100, trait: "Nivel 1 (2 medallas): Cada carta municion otorga +10 municion | Nivel 2 (6 medallas): Cada carta municion otorga +10 oro", levels: [{ min: 2, text: "Cada carta municion otorga +10 municion" }, { min: 6, text: "Cada carta municion otorga +10 oro" }], portrait: "tactician", image: `${CARD_PATH}CH-003.png` },
  { name: "Sheva Alomar", health: 70, trait: "Nivel 1 (2 medallas): Durante tu turno, puedes intercambiar 1 carta de tu mano con la primera de tu inventario. | Nivel 2 (4 medallas): Todas mis Armas Rifles reciben -20 de municion", levels: [{ min: 2, text: "Durante tu turno, puedes intercambiar 1 carta de tu mano con la primera de tu inventario." }, { min: 4, text: "Todas mis Armas Rifles reciben -20 de municion" }], portrait: "warden", image: `${CARD_PATH}CH-004.png` },
  { name: "Barry Burton", health: 85, trait: "Nivel 1 (2 medallas): Cuando ataca a otro personaje o explora, puedes dar +5 dano a un arma. | Nivel 2 (7 medallas): Todas mis Armas Magnun reciben +20 de dano", levels: [{ min: 2, text: "Cuando ataca a otro personaje o explora, puedes dar +5 dano a un arma." }, { min: 7, text: "Todas mis Armas Magnun reciben +20 de dano" }], portrait: "agent", image: `${CARD_PATH}CH-005.png` },
  { name: "Ada Wong", health: 75, trait: "Nivel 1 (4 medallas): Cuando explora, puede mirar la carta superior de la mansion y dejar al principio o al final del  mazo de la mancion. | Nivel 2 (8 medallas): Al principio de tu turno, puedes tener +1 Accion y -1 compra", levels: [{ min: 4, text: "Cuando explora, puede mirar la carta superior de la mansion y dejar al principio o al final del  mazo de la mancion." }, { min: 8, text: "Al principio de tu turno, puedes tener +1 Accion y -1 compra" }], portrait: "operator", image: `${CARD_PATH}CH-006.png` },
  { name: "Jack Krauser", health: 90, trait: "Nivel 1 (1 medallas): Al principio de tu turno, puedes seleccionar un cuchillo, que va a tu pila de descarte. | Nivel 2 (7 medallas): Todos tus  cuchillos consiguen +5 dano", levels: [{ min: 1, text: "Al principio de tu turno, puedes seleccionar un cuchillo, que va a tu pila de descarte." }, { min: 7, text: "Todos tus  cuchillos consiguen +5 dano" }], portrait: "scout", image: `${CARD_PATH}CH-007.png` },
  { name: "Chris Redfield", health: 90, trait: "Nivel 1 (0 medallas): Este jugador No se puede ser curado por ninguna hierba o spray. Desde la mansion si sale una carta que adquiera un spray o hierba. No la tome. | Nivel 2 (3 medallas): Un arma selecionada gana +5 dano por cada infectado que explore en la mansion en este turno.", levels: [{ min: 0, text: "Este jugador No se puede ser curado por ninguna hierba o spray. Desde la mansion si sale una carta que adquiera un spray o hierba. No la tome." }, { min: 3, text: "Un arma selecionada gana +5 dano por cada infectado que explore en la mansion en este turno." }], portrait: "tactician", image: `${CARD_PATH}CH-008.png` },
  { name: "Jill Valentine", health: 80, trait: "Nivel 1 (5 medallas): Todas mis Armas Explosiva reciben +5 de dano | Nivel 2 (8 medallas): Todas mis Armas Explosiva van a la pila de descarte en ves de recurso.", levels: [{ min: 5, text: "Todas mis Armas Explosiva reciben +5 de dano" }, { min: 8, text: "Todas mis Armas Explosiva van a la pila de descarte en ves de recurso." }], portrait: "operator", image: `${CARD_PATH}CH-009.png` },
  { name: "Rebecca Chambers", health: 70, trait: "Nivel 1 (2 medallas): Cuando tengas que devolver alguna carta al area de recurso puedes enviarla a otro jugador a su pila de descarte. | Nivel 2 (3 medallas): Al principio de tu turno, puedes devolver al area de recurso de tu area de pila de descarte", levels: [{ min: 2, text: "Cuando tengas que devolver alguna carta al area de recurso puedes enviarla a otro jugador a su pila de descarte." }, { min: 3, text: "Al principio de tu turno, puedes devolver al area de recurso de tu area de pila de descarte" }], portrait: "medic", image: `${CARD_PATH}CH-010.png` },
];

const catalog = {
  ammo10: { id: "ammo10", name: "Ammo x10", type: "Municion", ammo: 10, gold: 10, art: "ammo", cost: 0, image: `${CARD_PATH}AM-001.png` },
  ammo20: { id: "ammo20", name: "Ammo x20", type: "Municion", ammo: 20, gold: 20, art: "ammo", cost: 30, image: `${CARD_PATH}AM-002.png` },
  ammo30: { id: "ammo30", name: "Ammo x30", type: "Municion", ammo: 30, gold: 30, art: "ammo", cost: 60, image: `${CARD_PATH}AM-003.png` },
  knife: { id: "knife", name: "Combat Knife", type: "Arma", damage: 10, ammoCost: 0, art: "knife", cost: 20, image: `${CARD_PATH}WE-004.png` },
  handgun: { id: "handgun", name: "Handgun", type: "Arma", damage: 20, ammoCost: 20, art: "handgun", cost: 40, image: `${CARD_PATH}WE-009.png` },
  bow: { id: "bow", name: "Longbow", type: "Arma", damage: 30, ammoCost: 20, art: "handgun", cost: 50, image: `${CARD_PATH}WE-002.png` },
  grenade: { id: "grenade", name: "Grenade", type: "Arma", damage: 40, ammoCost: 0, splash: 10, explosive: true, art: "shotgun", cost: 60, image: `${CARD_PATH}WE-001.png`, text: "-5 dano a sus puntos de vida de cada jugador de los costado del jugador que explora. Se activa al explorar mansion esta carta." },
  six: { id: "six", name: "Six Shooter", type: "Arma", damage: 50, ammoCost: 50, art: "handgun", cost: 90, image: `${CARD_PATH}WE-006.png` },
  gatling: { id: "gatling", name: "Gatling Gun", type: "Arma", damage: 0, ammoCost: 0, damagePerAmmo: { step: 20, damage: 10 }, art: "shotgun", cost: 110, image: `${CARD_PATH}WE-007.png`, text: "Al explorar con esta arma puedes seleccionar cuanta municion tengas disponible para poder hacer daño." },
  rocket: { id: "rocket", name: "Rocket Launcher", type: "Arma", damage: 90, ammoCost: 0, damageXAmmo: true, explosive: true, art: "shotgun", cost: 110, image: `${CARD_PATH}WE-008.png`, text: "Dano X por municion disponible del turno." },
  submission: { id: "submission", name: "Submission", type: "Arma", damage: 5, ammoCost: 0, art: "knife", cost: 20, image: `${CARD_PATH}WE-003.png`, text: "Si tu vida es 80 o superior, esta arma gana +5 dano.", weaponClass: "cuchillo" },
  survivalKnife: { id: "survivalKnife", name: "Survival Knife", type: "Arma", damage: 10, ammoCost: 0, art: "knife", cost: 50, image: `${CARD_PATH}WE-005.png`, text: "+5 dano por cada otro cuchillo usado este turno.", weaponClass: "cuchillo" },
  burstHandgun: { id: "burstHandgun", name: "Burst-Fire Handgun", type: "Arma", damage: 20, ammoCost: 30, art: "handgun", cost: 60, image: `${CARD_PATH}WE-010.png`, text: "Si atacas con mas de 1 arma, esta pistola gana +20 dano.", weaponClass: "pistola" },
  assaultMachineGun: { id: "assaultMachineGun", name: "Assault Machine Gun", type: "Arma", damage: 20, ammoCost: 40, art: "shotgun", cost: 30, image: `${CARD_PATH}WE-011.png`, weaponClass: "machine gun" },
  fullBoreMachineGun: { id: "fullBoreMachineGun", name: "Full-Bore Machine Gun", type: "Arma", damage: 40, ammoCost: 70, art: "shotgun", cost: 100, image: `${CARD_PATH}WE-012.png`, text: "Si tienes mas de 100 municion, esta arma gana +30 dano.", weaponClass: "machine gun" },
  pumpShotgun: { id: "pumpShotgun", name: "Pump-Action Shotgun", type: "Arma", damage: 25, ammoCost: 40, extraExplore: 1, art: "shotgun", cost: 40, image: `${CARD_PATH}WE-013.png`, text: "+1 exploracion este turno.", weaponClass: "escopeta" },
  automaticShotgun: { id: "automaticShotgun", name: "Automatic Shotgun", type: "Arma", damage: 50, ammoCost: 80, extraExplore: 1, art: "shotgun", cost: 80, image: `${CARD_PATH}WE-014.png`, text: "Si el proximo infectado tiene 40 o menos vida, lo derrotas. +1 exploracion.", weaponClass: "escopeta" },
  boltRifle: { id: "boltRifle", name: "Bolt-Action Rifle", type: "Arma", damage: 20, ammoCost: 50, art: "handgun", cost: 50, image: `${CARD_PATH}WE-015.png`, weaponClass: "rifle" },
  semiRifle: { id: "semiRifle", name: "Semi-Automatic Rifle", type: "Arma", damage: 30, ammoCost: 70, art: "handgun", cost: 90, image: `${CARD_PATH}WE-016.png`, text: "+10 dano por cada accion jugada este turno.", weaponClass: "rifle" },
  green: { id: "green", name: "Green Herb", type: "Objeto", heal: 20, art: "herb", cost: 30, image: `${CARD_PATH}IT-001.png`, text: "cura 20" },
  yellow: { id: "yellow", name: "Yellow Herb", type: "Objeto", maxHeal: 10, art: "herb", cost: 50, image: `${CARD_PATH}IT-002.png`, text: "vida maxima +10" },
  spray: { id: "spray", name: "First Aid Spray", type: "Objeto", fullHeal: true, art: "herb", cost: 70, image: `${CARD_PATH}IT-003.png`, text: "cura completa" },
  action1: { id: "action1", name: "Mansion Foyer", type: "Accion", art: "action", cost: 30, image: `${CARD_PATH}AC-001.png`, text: "roba 2 cartas", draw: 2 },
  action2: { id: "action2", name: "Deadly Aim", type: "Accion", art: "action", cost: 50, image: `${CARD_PATH}AC-002.png`, text: "+20 municion / todas mis armas selecionadad al atacar dan+10 dano", damageBonus: 10, ammoBonus: 20 },
  action3: { id: "action3", name: "Shattered memories", type: "Accion", art: "action", cost: 20, image: `${CARD_PATH}AC-003.png`, text: "Seleciona 2 cartas de tu descarte y devuelvela al area de recurso, esta carta al finalizar el turno es devuelta la zona de recurso." },
  action4: { id: "action4", name: "Escape from the dead city", type: "Accion", art: "action", cost: 70, image: `${CARD_PATH}AC-004.png`, text: "+2 accion / roba 1", extraAction: 2, draw: 1 },
  action5: { id: "action5", name: "Reload", type: "Accion", art: "action", cost: 50, image: `${CARD_PATH}AC-005.png`, text: "+20 municion /+2 accion", ammoBonus: 20, extraAction: 2 },
  action6: { id: "action6", name: "The Merchant", type: "Accion", art: "action", cost: 50, image: `${CARD_PATH}AC-006.png`, text: "+20 oro  / roba 1/ +1 compra", goldBonus: 20, extraBuy: 1, draw: 1 },
  action7: { id: "action7", name: "Umbrella Corporation", type: "Accion", art: "action", cost: 50, image: `${CARD_PATH}AC-007.png`, text: "roba 2 / +1 accion", extraAction: 1, draw: 2 },
  action8: { id: "action8", name: "Back To Back", type: "Accion", art: "action", cost: 30, image: `${CARD_PATH}AC-008.png`, text: "+10 oro / +1 accion", goldBonus: 10, extraAction: 1 },
  action9: { id: "action9", name: "Item Mangament", type: "Accion", art: "action", cost: 30, image: `${CARD_PATH}AC-009.png`, text: "Devuelve al area de recursos 1 carta de municion y puedes conseguir otra carta de municion de hasta 30 de oro mas que la carta devuelta." },
  action10: { id: "action10", name: "Ominous Battle", type: "Accion", art: "action", cost: 60, image: `${CARD_PATH}AC-010.png`, text: "+10 oro / roba 3", goldBonus: 10, draw: 3 },
  action11: { id: "action11", name: "Master of Unlocking", type: "Accion", art: "action", cost: 30, image: `${CARD_PATH}AC-011.png`, text: "+1 accion / los dejamas jugadores entregan la primera carta del maso y si es un arma puedo escogerla y llevarla a mi pila de descarte.", extraAction: 1 },
  action12: { id: "action12", name: "Struggle for Survival", type: "Accion", art: "action", cost: 30, image: `${CARD_PATH}AC-012.png`, text: "+1 accion / +1 exploracion", extraAction: 1, extraExplore: 1 },
};

const baseResourceIds = ["ammo10", "ammo20", "ammo30", "knife", "handgun", "green"];
const weaponResourceIds = Object.keys(catalog).filter((id) => catalog[id].type === "Arma" && !["gatling", "rocket"].includes(id));
const actionResourceIds = Object.keys(catalog).filter((id) => catalog[id].type === "Accion");
const scenarios = {
  firstTimer: {
    name: "First Timer",
    modes: ["story", "mercenary", "versus"],
    resources: ["bow", "grenade", "six", "yellow", "spray", "action1", "action2", "action3", "action4", "action5", "action6", "action7"],
  },
  mansionRush: {
    name: "Mansion Rush",
    modes: ["story", "mercenary"],
    resources: ["bow", "six", "grenade", "green", "yellow", "spray", "action6", "action7", "action8", "action9", "ammo20", "ammo30"],
  },
  versusArsenal: {
    name: "Versus Arsenal",
    modes: ["versus"],
    resources: ["grenade", "six", "yellow", "spray", "action7", "action8", "action9", "action10", "action11", "bow", "ammo20", "ammo30"],
  },
};

const mansionStory = [
  { name: "Majini", type: "Infectado", health: 15, damage: 10, decorations: 1, art: "infected", image: `${CARD_PATH}MA-001.png` },
  { name: "Zombie Male", type: "Infectado", health: 20, damage: 20, decorations: 1, art: "runner", image: `${CARD_PATH}MA-002.png` },
  { name: "Zombie Female", type: "Infectado", health: 15, damage: 20, decorations: 1, art: "runner", image: `${CARD_PATH}MA-003.png` },
  { name: "Zombie Butcher", type: "Infectado", health: 15, damage: 10, decorations: 1, art: "brute", image: `${CARD_PATH}MA-004.png` },
  { name: "Bui Kichwa", type: "Infectado", health: 10, damage: 10, decorations: 1, art: "brute", image: `${CARD_PATH}MA-005.png` },
  { name: "Licker", type: "Infectado", health: 40, damage: 30, decorations: 3, art: "brute", image: `${CARD_PATH}MA-006.png` },
  { name: "Hunter", type: "Infectado", health: 40, damage: 30, decorations: 4, art: "brute", image: `${CARD_PATH}MA-008.png` },
  { name: "Nemesis T-Type", type: "Infectado", health: 60, damage: 40, decorations: 5, nemesis: true, art: "boss", image: `${CARD_PATH}MA-007.png` },
  { name: "Yellow Herb", type: "Objeto", health: 0, damage: 0, decorations: 0, mansionItem: "yellow", art: "herb", image: `${CARD_PATH}IT-002.png` },
  { name: "Gatling Case", type: "Objeto", health: 0, damage: 0, decorations: 1, mansionItem: "gatling", art: "shotgun", image: `${CARD_PATH}WE-007.png` },
  { name: "Rocket Case", type: "Objeto", health: 0, damage: 0, decorations: 1, mansionItem: "rocket", art: "shotgun", image: `${CARD_PATH}WE-008.png` },
  { name: "Uroboros Aheri", type: "Jefe", health: 90, damage: 70, decorations: 8, boss: true, art: "boss", image: `${CARD_PATH}MA-010.png` },
];

const mercenaryBonus = [
  { name: "Time Bonus", type: "Bonus", health: 0, damage: 0, decorations: 0, bonusTurns: 1, art: "action", image: `${CARD_PATH}MA-018.png` },
  { name: "Combo Bonus", type: "Bonus", health: 0, damage: 0, decorations: 2, art: "action", image: `${CARD_PATH}MA-019.png` },
];

localStorage.removeItem("mdbg-site-users");

const state = {
  loggedIn: false,
  entryDone: false,
  provider: "",
  sessionType: "friends",
  players: [],
  started: false,
  activeIndex: 0,
  round: 0,
  selectedResource: 0,
  resourceFilter: "Todos",
  resourceMarketOpen: false,
  resourceMarketOrder: [],
  resourceArea: [],
  mansion: [],
  lastRevealed: null,
  turn: freshTurn(),
  sound: localStorage.getItem("mdbg-sound") !== "off",
  ambientVolume: Number(localStorage.getItem("mdbg-ambient-volume") || 32),
  gameVolume: Number(localStorage.getItem("mdbg-game-volume") || 75),
  audio: null,
  achievements: JSON.parse(localStorage.getItem("mdbg-achievements") || "[]"),
  wins: Number(localStorage.getItem("mdbg-wins") || 0),
  losses: Number(localStorage.getItem("mdbg-losses") || 0),
  matchHistory: JSON.parse(localStorage.getItem("mdbg-match-history") || "[]"),
  matchRecorded: false,
  endVotes: {},
  startConfirmations: {},
  startRequest: null,
  lastStartPromptId: "",
  roomOwnerUid: "",
  diceRoll: null,
  authMode: "login",
  currentUser: JSON.parse(localStorage.getItem("mdbg-current-user") || "null"),
  siteUsers: [],
  friends: JSON.parse(localStorage.getItem("mdbg-friends") || "[]"),
  roomId: "",
  roomCreationPromise: null,
  pendingFriendRequests: [],
  pendingRoomInvitations: [],
  unsubUsers: null,
  unsubFriendRequests: null,
  unsubRoomInvitations: null,
  unsubRoom: null,
  unsubChat: null,
  unsubVoice: null,
  voiceStream: null,
  voicePeers: {},
  voiceCandidatesSeen: {},
  voiceRecorder: null,
  voiceChunks: [],
  voiceRecordTimer: null,
  playedVoiceMessages: new Set(),
  applyingRemoteRoom: false,
  publishTimer: null,
  onlineDirectoryTimer: null,
  onlineDirectorySyncing: false,
  lastPublishedState: "",
  syncStatus: "",
  chatMessages: [],
  onlineReady: false,
  music: null,
  musicOn: false,
  ambientBlocked: false,
  turnTimerId: null,
  turnEndsAt: null,
  allowUnarmedExplore: false,
  tutorialActive: false,
  tutorialStep: 0,
  cardGuideFilter: "Personaje",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let cardInstanceSequence = 0;
const cleanedChatRooms = new Set();
const ONLINE_DIRECTORY_REFRESH_MS = 1000;

const tutorialSteps = [
  {
    selector: ".room-panel",
    title: "Prepara la sala",
    text: "Elige modo y escenario. En offline puedes completar con bots; en online debes invitar jugadores reales disponibles antes de comenzar.",
  },
  {
    selector: "#players",
    title: "Jugadores y personajes",
    text: "Aqui ves vida, personaje, nivel, medallas y de quien es el turno. El jugador marcado como Turno es el unico que debe actuar.",
  },
  {
    selector: "#start-game",
    title: "Comenzar partida",
    text: "Al iniciar, el juego reparte personajes y mazos. Luego aparece el dado inicial: quien saque el numero mas alto comienza.",
  },
  {
    selector: "#hand",
    title: "Tu mano",
    text: "Cada turno robas 5 cartas. La municion de tu mano suma oro y municion automaticamente; las acciones, objetos y armas se usan tocando la carta.",
  },
  {
    selector: ".controls-panel",
    title: "Acciones del turno",
    text: "Puedes jugar acciones, comprar, explorar, usar objeto, activar personaje y finalizar turno. Si algo no se puede hacer, el juego te dira por que.",
  },
  {
    selector: "#weapon-list",
    title: "Armas y daño",
    text: "Selecciona armas antes de explorar o atacar. Cada arma requiere municion; el daño total se muestra en los indicadores del turno.",
  },
  {
    selector: ".mansion-panel",
    title: "Explorar mansion",
    text: "Explorar revela una carta de mansion. Si tu daño alcanza la vida del enemigo, ganas medallas; si no, recibes daño y el enemigo vuelve al mazo.",
  },
  {
    selector: "#resource-area",
    title: "Comprar recursos",
    text: "Usa el oro del turno para comprar cartas del mercado. Las compras van al descarte y apareceran en turnos futuros cuando barajes.",
  },
  {
    selector: ".chat-panel",
    title: "Online, chat y voz",
    text: "En online puedes hablar por chat y activar voz con la sala. Los movimientos se sincronizan para que todos vean el estado de la partida.",
  },
  {
    selector: "#request-end-game",
    title: "Terminar partida",
    text: "Si todos aceptan terminar, gana quien tenga mas medallas; si hay empate, gana quien tenga mas vida.",
  },
];

function freshTurn() {
  return {
    actions: 1,
    buys: 1,
    explores: 1,
    damage: 0,
    gold: 0,
    ammo: 0,
    weaponAmmoSpent: 0,
    weaponUses: {},
    actionsPlayed: 0,
    drawAnimation: 0,
    shuffleAnimation: false,
    weaponDamageBonus: 0,
    characterUsed: false,
    autoGold: 0,
    autoAmmo: 0,
  };
}

function cloneCard(card) {
  const id = globalThis.crypto?.randomUUID?.() || `card-${Date.now()}-${cardInstanceSequence++}-${Math.random().toString(16).slice(2)}`;
  return { ...card, instanceId: id };
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function saveProgress() {
  localStorage.setItem("mdbg-achievements", JSON.stringify(state.achievements));
  localStorage.setItem("mdbg-wins", String(state.wins));
  localStorage.setItem("mdbg-losses", String(state.losses));
  localStorage.setItem("mdbg-match-history", JSON.stringify(state.matchHistory));
  localStorage.setItem("mdbg-sound", state.sound ? "on" : "off");
  localStorage.setItem("mdbg-ambient-volume", String(state.ambientVolume));
  localStorage.setItem("mdbg-game-volume", String(state.gameVolume));
  localStorage.setItem("mdbg-friends", JSON.stringify(state.friends));
  localStorage.setItem("mdbg-session-type", state.sessionType);
  if (state.roomId) localStorage.setItem("mdbg-room-id", state.roomId);
  else localStorage.removeItem("mdbg-room-id");
  if (state.currentUser) localStorage.setItem("mdbg-current-user", JSON.stringify(state.currentUser));
  else localStorage.removeItem("mdbg-current-user");
}

function saveAccount(user) {
  const accounts = JSON.parse(localStorage.getItem("mdbg-accounts") || "[]");
  const existing = accounts.find((account) => account.email === user.email);
  if (existing) Object.assign(existing, user);
  else accounts.push(user);
  localStorage.setItem("mdbg-accounts", JSON.stringify(accounts));
}

function findAccount(email, password) {
  const accounts = JSON.parse(localStorage.getItem("mdbg-accounts") || "[]");
  return accounts.find((account) => account.email === email && account.password === password);
}

function localAccountExists(email) {
  const accounts = JSON.parse(localStorage.getItem("mdbg-accounts") || "[]");
  return accounts.some((account) => account.email === email);
}

function getOnlineBackend() {
  return window.onlineBackend?.isEnabled?.() ? window.onlineBackend : null;
}

function publicUser(user) {
  return {
    uid: user.uid || user.email,
    name: user.name || user.displayName || user.email?.split("@")[0] || "Jugador",
    email: user.email || "",
    password: user.password || "",
    provider: user.provider || "Correo",
    online: user.online !== false,
    birthdate: user.birthdate || "",
    age: user.age || "",
  };
}

function waitForOnlineBackend(timeout = 8000) {
  if (window.onlineBackend?.isEnabled?.()) return Promise.resolve(window.onlineBackend);
  if (window.onlineBackendReadyPromise) {
    return Promise.race([
      window.onlineBackendReadyPromise,
      new Promise((resolve) => window.setTimeout(() => resolve(window.onlineBackend || null), timeout)),
    ]);
  }
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => resolve(window.onlineBackend || null), timeout);
    window.addEventListener("online-backend-ready", (event) => {
      window.clearTimeout(timer);
      resolve(event.detail || window.onlineBackend || null);
    }, { once: true });
  });
}

async function onlineBackendForAuth() {
  const backend = await waitForOnlineBackend();
  return backend?.isEnabled?.() ? backend : null;
}

async function testFirebaseConnection() {
  addEntryMessage("Probando conexion con Firebase...");
  const backend = await onlineBackendForAuth();
  if (!backend) {
    const reason = window.onlineBackend?.reason || "Firebase no termino de cargar en este navegador";
    notify("Firebase no conectado", reason, "error");
    addEntryMessage(`Firebase no conectado: ${reason}`);
    return;
  }
  if (!state.loggedIn || !state.currentUser?.uid) {
    notify("Firebase cargado", "Auth esta listo. Para probar Firestore crea una cuenta o inicia sesion primero.", "success");
    addEntryMessage("Firebase cargo correctamente. Firestore exige usuario logeado: crea una cuenta o inicia sesion y vuelve a probar.");
    return;
  }
  try {
    const users = await backend.listUsers();
    notify("Firebase conectado", `Auth configurado y Firestore responde. Usuarios leidos: ${users.length}.`, "success");
    addEntryMessage(`Firebase conectado. Firestore responde y hay ${users.length} usuarios visibles.`);
  } catch (error) {
    notify("Firestore no responde", error.message, "error");
    addEntryMessage(`Firebase cargo, pero Firestore fallo: ${error.message}`);
  }
}

function mergeSiteUsers(users) {
  const merged = new Map(state.siteUsers.map((user) => [user.uid || user.email, user]));
  users
    .map(publicUser)
    .filter((user) => user.uid && user.email && !user.email.endsWith("@demo.local"))
    .forEach((user) => merged.set(user.uid || user.email, { ...merged.get(user.uid || user.email), ...user }));
  state.siteUsers = [...merged.values()];
}

function stopOnlineSubscriptions() {
  ["unsubUsers", "unsubFriendRequests", "unsubRoomInvitations", "unsubRoom", "unsubChat", "unsubVoice"].forEach((key) => {
    if (typeof state[key] === "function") state[key]();
    state[key] = null;
  });
  stopOnlineDirectoryRefresh();
  Object.values(state.voicePeers).forEach((peer) => peer.close?.());
  state.voicePeers = {};
  state.voiceCandidatesSeen = {};
  state.voiceStream?.getTracks?.().forEach((track) => track.stop());
  state.voiceStream = null;
}

function startOnlineSubscriptions() {
  const backend = getOnlineBackend();
  if (!backend || !state.currentUser?.uid) return;
  if (!state.unsubUsers && backend.watchUsers) {
    state.unsubUsers = backend.watchUsers((users) => {
      state.siteUsers = [];
      mergeSiteUsers(users);
      renderSiteUsers();
      renderFriends();
      renderRoom();
    });
  }
  if (!state.unsubFriendRequests && backend.watchFriendRequests) {
    state.unsubFriendRequests = backend.watchFriendRequests(state.currentUser.uid, (requests) => {
      state.pendingFriendRequests = requests;
      renderInvitations();
    });
  }
  if (!state.unsubRoomInvitations && backend.watchRoomInvitations) {
    state.unsubRoomInvitations = backend.watchRoomInvitations(state.currentUser.uid, (invitations) => {
      const prev = state.pendingRoomInvitations || [];
      state.pendingRoomInvitations = invitations;
      renderInvitations();
      // Detectar nueva invitación y mostrar modal central
      const newInvite = invitations.find((inv) => !prev.some((p) => p.id === inv.id));
      if (newInvite) {
        showRoomInviteModal(newInvite);
      }
    });
  }
}

function watchCurrentRoom() {
  const backend = getOnlineBackend();
  if (typeof state.unsubRoom === "function") state.unsubRoom();
  if (typeof state.unsubChat === "function") state.unsubChat();
  state.unsubRoom = null;
  state.unsubChat = null;
  if (!backend?.watchRoom || !state.roomId) return;
  state.unsubRoom = backend.watchRoom(state.roomId, (room) => {
    if (!room) return;
    state.applyingRemoteRoom = true;
    try {
      state.roomOwnerUid = room.ownerUid || state.roomOwnerUid || "";
      state.startRequest = room.startRequest || null;
      state.startConfirmations = room.startConfirmations || {};
      if (room.gameState) applyRemoteGameState(room.gameState);
      else if (room.players) syncPlayersFromRoom(room.players);
      handleStartRequestUpdate(room);
      if (room.chatMessages?.length) {
        renderChatMessages(room.chatMessages || []);
        if (backend.cleanupRoomChatCache && !cleanedChatRooms.has(state.roomId)) {
          cleanedChatRooms.add(state.roomId);
          backend.cleanupRoomChatCache(state.roomId).catch(() => {});
        }
      }
      if (state.voiceStream) startRoomVoice().catch(() => {});
      renderRoom();
      renderGame();
    } finally {
      state.applyingRemoteRoom = false;
    }
  });
  if (backend.watchRoomChat) {
    state.unsubChat = backend.watchRoomChat(state.roomId, (messages) => {
      const sorted = [...(messages || [])].sort((a, b) => (b.time || b.createdAt || 0) - (a.time || a.createdAt || 0));
      const prev = state.chatMessages || [];
      // Notificar si llegó un mensaje nuevo de otro jugador
      if (sorted.length > 0 && prev.length > 0) {
        const newest = sorted[0];
        const alreadyKnown = prev.some((m) => m.id === newest.id);
        const fromOther = newest.uid !== state.currentUser?.uid;
        if (!alreadyKnown && fromOther) {
          const author = newest.author || "Jugador";
          const preview = newest.audioData ? "🎤 Mensaje de voz" : (newest.text || "").slice(0, 60);
          showChatNotification(author, preview);
        }
      }
      renderChatMessages(messages || []);
    });
  }
}

function isOnlineRoomActive() {
  return state.loggedIn && state.sessionType !== "offline" && Boolean(state.roomId) && Boolean(getOnlineBackend());
}

function myPlayer() {
  return state.players.find((player) => player.uid && player.uid === state.currentUser?.uid) || state.players.find((player) => player.name === "Tu") || state.players[0];
}

function isOpeningRollActive() {
  return Boolean(state.started && state.diceRoll?.rolling);
}

function isMyTurn() {
  const current = currentPlayer();
  if (!state.started || !current) return true;
  if (isOpeningRollActive()) return false;
  if (!isOnlineRoomActive()) return true;
  return current.uid === state.currentUser?.uid;
}

function requireMyTurn() {
  if (isMyTurn()) return true;
  if (isOpeningRollActive()) {
    notify("Dado inicial", "Espera a que termine la tirada inicial.", "error");
    return false;
  }
  notify("Espera tu turno", `Ahora juega ${currentPlayer()?.name || "otro jugador"}.`, "error");
  return false;
}

function roomGameState() {
  return {
    mode: getModeKey(),
    scenario: $("#scenario").value,
    started: state.started,
    activeIndex: state.activeIndex,
    round: state.round,
    players: playersForSharedState(),
    turn: state.turn,
    mansion: state.mansion,
    lastRevealed: state.lastRevealed,
    resourceArea: state.resourceArea,
    resourceMarketOpen: state.resourceMarketOpen,
    resourceMarketOrder: state.resourceMarketOrder,
    resourceFilter: state.resourceFilter,
    selectedResource: state.selectedResource,
    matchRecorded: state.matchRecorded,
    allowUnarmedExplore: state.allowUnarmedExplore,
    endVotes: state.endVotes,
    diceRoll: state.diceRoll,
    turnEndsAt: state.turnEndsAt,
    updatedBy: state.currentUser?.uid || "",
    updatedAt: Date.now(),
  };
}

function realNameForUid(uid, fallback = "Jugador") {
  if (uid && uid === state.currentUser?.uid) return state.currentUser.name || fallback;
  const user = state.siteUsers.find((item) => item.uid === uid);
  return user?.name || fallback;
}

function playersForSharedState() {
  return state.players.map((player) => ({
    ...player,
    name: player.uid ? realNameForUid(player.uid, player.name === "Tu" ? state.currentUser?.name : player.name) : player.name,
  }));
}

function playersForLocalView(players = []) {
  return players.map((player) => ({
    ...player,
    character: hydrateCardVisual(player.character || {}),
    hand: (player.hand || []).map(hydrateCardVisual),
    deck: (player.deck || []).map(hydrateCardVisual),
    discard: (player.discard || []).map(hydrateCardVisual),
    played: (player.played || []).map(hydrateCardVisual),
    name: player.uid && player.uid === state.currentUser?.uid ? "Tu" : player.name,
  }));
}

function cardVisualTemplates() {
  return [
    ...characters,
    ...Object.values(catalog),
    ...mansionStory,
    ...mercenaryBonus,
  ];
}

function hydrateCardVisual(card = {}) {
  if (!card || card.image) return card;
  const template = cardVisualTemplates().find((item) => (
    (card.id && item.id === card.id) ||
    (card.name && item.name === card.name && (!card.type || item.type === card.type))
  ));
  return template ? { ...card, image: template.image, art: card.art || template.art } : card;
}

function applyRemoteGameState(gameState) {
  if (!gameState) return;
  if (gameState.mode && $("#mode").value !== gameState.mode) {
    $("#mode").value = gameState.mode;
    populateScenarios();
  }
  if (gameState.scenario) $("#scenario").value = gameState.scenario;
  const prevActiveIndex = state.activeIndex;
  const wasStarted = state.started;
  state.started = Boolean(gameState.started);
  state.activeIndex = Number(gameState.activeIndex || 0);
  state.round = Number(gameState.round || 0);
  state.players = gameState.players ? playersForLocalView(gameState.players) : state.players;
  state.turn = gameState.turn || freshTurn();
  state.mansion = (gameState.mansion || []).map(hydrateCardVisual);
  state.lastRevealed = gameState.lastRevealed ? hydrateCardVisual(gameState.lastRevealed) : null;
  state.resourceArea = (gameState.resourceArea || state.resourceArea).map((pile) => ({
    ...pile,
    card: hydrateCardVisual(pile.card),
  }));
  state.resourceMarketOpen = Boolean(gameState.resourceMarketOpen);
  state.resourceMarketOrder = gameState.resourceMarketOrder || state.resourceMarketOrder;
  state.resourceFilter = gameState.resourceFilter || "Todos";
  state.selectedResource = Number(gameState.selectedResource || 0);
  state.matchRecorded = Boolean(gameState.matchRecorded);
  state.allowUnarmedExplore = Boolean(gameState.allowUnarmedExplore);
  state.endVotes = gameState.endVotes || {};
  state.diceRoll = gameState.diceRoll || null;
  state.turnEndsAt = gameState.turnEndsAt || null;
  checkEndGameVote();
  // Mostrar alerta de turno si el turno cambió y ahora es mi turno
  if (state.started && wasStarted && state.activeIndex !== prevActiveIndex && isMyTurn() && !currentPlayer()?.isBot) {
    window.setTimeout(() => showTurnAlert(currentPlayer()), 300);
  }
}

function schedulePublishRoomState(force = false) {
  if (!isOnlineRoomActive() || (!force && state.applyingRemoteRoom)) return;
  window.clearTimeout(state.publishTimer);
  state.publishTimer = window.setTimeout(() => publishRoomState(force), 180);
}

async function publishRoomState(force = false) {
  if (!isOnlineRoomActive() || (!force && state.applyingRemoteRoom)) return;
  const backend = getOnlineBackend();
  const gameState = roomGameState();
  const serialized = JSON.stringify(gameState);
  if (serialized === state.lastPublishedState) return;
  try {
    await backend.updateRoom(state.roomId, {
      gameState,
      players: playersForSharedState().map((player) => ({
        uid: player.uid || "",
        name: player.name,
        email: player.email || "",
        online: true,
      })).filter((player) => player.uid),
      playerUids: state.players.map((player) => player.uid).filter(Boolean),
      status: state.started ? "playing" : "waiting",
      started: state.started,
      startRequest: state.startRequest || null,
      startConfirmations: state.startConfirmations || {},
    });
    state.lastPublishedState = serialized;
    state.syncStatus = "En vivo.";
  } catch (error) {
    state.syncStatus = `No sincroniza: ${error.message}`;
    notify("Sincronizacion fallida", error.message, "error");
  }
}

function syncPlayersFromRoom(roomPlayers = []) {
  const mode = getMode();
  const realPlayers = roomPlayers.slice(0, mode.max);
  const existing = new Map(state.players.map((player) => [player.uid || player.email || player.name, player]));
  state.players = realPlayers.map((roomPlayer, index) => {
    const key = roomPlayer.uid || roomPlayer.email || roomPlayer.name;
    const fallbackName = index === 0 && roomPlayer.uid === state.currentUser?.uid ? "Tu" : roomPlayer.name;
    return {
      ...(existing.get(key) || createPlayer(fallbackName, false, roomPlayer.uid !== state.currentUser?.uid)),
      uid: roomPlayer.uid,
      email: roomPlayer.email || "",
      name: roomPlayer.uid === state.currentUser?.uid ? "Tu" : roomPlayer.name,
      isBot: false,
      isFriend: roomPlayer.uid !== state.currentUser?.uid,
    };
  });
}

async function syncOnlineDirectory() {
  const backend = getOnlineBackend();
  if (!backend || !state.currentUser?.uid || state.onlineDirectorySyncing) return;
  state.onlineDirectorySyncing = true;
  try {
    const [users, friendIds] = await Promise.all([
      backend.listUsers(),
      backend.getMyFriends(state.currentUser.uid),
    ]);
    state.siteUsers = [];
    mergeSiteUsers(users);
    state.friends = friendIds;
    startOnlineSubscriptions();
    saveProgress();
    renderSiteUsers();
    renderFriends();
    renderRoom();
  } catch (error) {
    notify("Online no sincronizado", error.message, "error");
  } finally {
    state.onlineDirectorySyncing = false;
  }
}

function startOnlineDirectoryRefresh() {
  if (state.onlineDirectoryTimer) return;
  state.onlineDirectoryTimer = window.setInterval(() => {
    if (!state.loggedIn || !state.currentUser?.uid || state.sessionType === "offline" || document.hidden) return;
    syncOnlineDirectory();
  }, ONLINE_DIRECTORY_REFRESH_MS);
}

function stopOnlineDirectoryRefresh() {
  if (!state.onlineDirectoryTimer) return;
  window.clearInterval(state.onlineDirectoryTimer);
  state.onlineDirectoryTimer = null;
}

async function ensureOnlineRoom() {
  const backend = getOnlineBackend();
  if (!backend || !state.loggedIn || state.sessionType === "offline" || !state.currentUser?.uid) return "";
  if (state.roomId) return state.roomId;
  if (state.roomCreationPromise) return state.roomCreationPromise;
  state.roomCreationPromise = (async () => {
  try {
    state.roomId = await backend.createRoom(state.currentUser, {
      mode: getModeKey(),
      scenario: $("#scenario").value,
      sessionType: state.sessionType,
      maxPlayers: getMode().max,
    });
    state.roomOwnerUid = state.currentUser.uid || "";
    saveProgress();
    watchCurrentRoom();
    notify("Sala online creada", `ID de sala: ${state.roomId}`, "success");
  } catch (error) {
    notify("Sala online no creada", error.message, "error");
  }
    return state.roomId;
  })();
  try {
    return await state.roomCreationPromise;
  } finally {
    state.roomCreationPromise = null;
  }
}

async function addFriendByUser(user) {
  if (!user) return;
  const backend = getOnlineBackend();
  if (!backend || !state.currentUser?.uid || !user.uid) {
    notify("Firebase requerido", "Solo puedes agregar usuarios reales registrados en Firebase.", "error");
    return;
  }
  const id = user.uid || user.email;
  if (state.friends.includes(id) || state.friends.includes(user.email)) {
    notify("Amigo existente", `${user.name} ya esta en tu lista.`, "success");
    return;
  }
  try {
    await backend.sendFriendRequest(state.currentUser, user);
    notify("Solicitud enviada", `${user.name} debe aceptar tu invitacion de amistad.`, "success");
  } catch (error) {
    notify("Solicitud no enviada", error.message, "error");
  }
}

function calculateAge(birthdate) {
  if (!birthdate) return "";
  const date = new Date(birthdate);
  if (Number.isNaN(date.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getDate())) age -= 1;
  return age;
}

function sound(name) {
  if (!state.sound) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  state.audio ||= new AudioContext();
  const ctx = state.audio;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  const presets = {
    click: [240, 0.045, 0.04, "triangle"],
    card: [520, 0.09, 0.05, "sine"],
    explore: [90, 0.22, 0.08, "sawtooth"],
    hit: [130, 0.18, 0.11, "square"],
    win: [660, 0.35, 0.08, "triangle"],
    voice: [380, 0.12, 0.05, "sine"],
  };
  const [freq, length, volume, type] = presets[name] || presets.click;
  const finalVolume = volume * (state.gameVolume / 100);
  if (finalVolume <= 0) return;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.55), now + length);
  gain.gain.setValueAtTime(finalVolume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + length);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + length);
}

function playAudio(file, volume = 0.75) {
  if (!state.sound || state.gameVolume <= 0) return;
  const audio = new Audio(`${AUDIO_PATH}${file}`);
  audio.volume = Math.min(1, Math.max(0, volume * (state.gameVolume / 100)));
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function syncAmbientVolume() {
  const audio = $("#ambient-audio");
  if (!audio) return;
  audio.volume = state.sound ? Math.min(1, Math.max(0, state.ambientVolume / 100)) : 0;
}

function playAmbient() {
  const audio = $("#ambient-audio");
  if (!audio) return;
  syncAmbientVolume();
  if (!state.sound || state.ambientVolume <= 0) {
    audio.pause();
    state.musicOn = false;
    return;
  }
  audio.play()
    .then(() => {
      state.musicOn = true;
      state.ambientBlocked = false;
    })
    .catch(() => {
      state.ambientBlocked = true;
    });
}

function stopAmbient() {
  const audio = $("#ambient-audio");
  if (!audio) return;
  audio.pause();
  state.musicOn = false;
}

function renderSoundControls() {
  const soundButton = $("#sound-toggle");
  const ambientInput = $("#ambient-volume");
  const gameInput = $("#game-volume");
  if (soundButton) {
    soundButton.textContent = state.sound ? "Sonido" : "Silencio";
    soundButton.setAttribute("aria-pressed", String(state.sound));
  }
  if (ambientInput && document.activeElement !== ambientInput) ambientInput.value = String(state.ambientVolume);
  if (gameInput && document.activeElement !== gameInput) gameInput.value = String(state.gameVolume);
  syncAmbientVolume();
}

function setSoundEnabled(enabled) {
  state.sound = enabled;
  if (state.sound) playAmbient();
  else stopAmbient();
  saveProgress();
  renderSoundControls();
}

function setAmbientVolume(value) {
  state.ambientVolume = Math.max(0, Math.min(100, Number(value) || 0));
  saveProgress();
  renderSoundControls();
  if (state.sound && state.ambientVolume > 0) playAmbient();
  if (state.ambientVolume <= 0) stopAmbient();
}

function setGameVolume(value) {
  state.gameVolume = Math.max(0, Math.min(100, Number(value) || 0));
  saveProgress();
  renderSoundControls();
}

function chatAuthorInitials(message) {
  return initials(message.author || message.name || "Jugador").toLowerCase();
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function cardGuideEffect(card) {
  if (card.trait) return cleanText(card.trait);
  if (card.text) return cleanText(card.text);
  if (card.type === "Municion") return `Entrega ${card.gold || 0} oro y ${card.ammo || 0} municion al salir en mano.`;
  if (card.type === "Arma") return `Hace ${card.damage || 0} dano. Requiere ${card.ammoCost || 0} municion para atacar.`;
  if (card.type === "Objeto") {
    if (card.fullHeal) return "Cura toda la vida del personaje.";
    if (card.heal) return `Cura ${card.heal} de vida.`;
    if (card.maxHeal) return `Aumenta vida maxima en ${card.maxHeal}.`;
  }
  if (card.type === "Infectado" || card.type === "Jefe") return `Vida ${card.health}. Si no lo derrotas recibes ${card.damage} dano. Otorga ${card.decorations} medallas.`;
  if (card.type === "Bonus") return card.bonusTurns ? `Reduce el contador mercenario en ${card.bonusTurns} turno.` : `Otorga ${card.decorations || 0} medallas.`;
  return "Carta con efecto especial.";
}

function homeGuideCards() {
  return [
    ...characters.map((card) => ({ ...card, type: "Personaje", cost: "", guideGroup: "Personaje" })),
    ...Object.values(catalog).map((card) => ({ ...card, guideGroup: card.type })),
    ...mansionStory.map((card) => ({ ...card, guideGroup: "Mansion" })),
    ...mercenaryBonus.map((card) => ({ ...card, guideGroup: "Mansion" })),
  ];
}

function renderHomeCardGuide() {
  const grid = $("#home-card-guide");
  if (!grid) return;
  const cards = homeGuideCards().filter((card) => card.guideGroup === state.cardGuideFilter).slice(0, 12);
  grid.innerHTML = "";
  cards.forEach((card) => {
    const item = document.createElement("article");
    item.className = "guide-card";
    item.innerHTML = `
      <img src="${card.image}" alt="${escapeHtml(card.name)}" loading="lazy" />
      <div>
        <strong>${escapeHtml(card.name)}</strong>
        <span>${escapeHtml(card.type)}${card.cost ? ` / ${card.cost} oro` : ""}</span>
        <p>${escapeHtml(cardGuideEffect(card))}</p>
      </div>
    `;
    grid.append(item);
  });
}

function buttonIcon(button) {
  if (button.id === "site-auth-submit") return "↪";
  if (button.id === "reset-password") return "?";
  if (button.id === "offline-entry") return "▶";
  if (button.id === "add-user-form") return "+";
  if (button.id === "reset-room") return "↻";
  if (button.id === "fill-room") return "+";
  if (button.id === "start-game") return "▶";
  if (button.id === "home-button") return "⌂";
  if (button.id === "logout-button") return "⇥";
  if (button.id === "tutorial-start") return "?";
  if (button.id === "sound-toggle") return "♪";
  if (button.id === "voice-toggle") return "◉";
  if (button.id === "voice-message") return "●";
  if (button.id === "explore" || button.id === "mansion-card") return "⌖";
  if (button.id === "buy-resource") return "$";
  if (button.id === "play-action") return "✦";
  if (button.id === "use-item") return "+";
  if (button.id === "character-effect") return "★";
  if (button.id === "end-turn") return "→";
  if (button.id === "request-end-game") return "✓";
  if (button.matches("[data-auth-tab='login']")) return "↪";
  if (button.matches("[data-auth-tab='register']")) return "+";
  if (button.matches("[data-session='friends']")) return "☷";
  if (button.matches("[data-session='matchmaking']")) return "◎";
  if (button.matches("[data-session='offline']")) return "▣";
  if (button.matches("[data-card-guide]")) return "▤";
  const text = button.textContent.trim().toLowerCase();
  if (text.includes("agregar")) return "+";
  if (text.includes("enviar")) return "↑";
  if (text.includes("acept")) return "✓";
  if (text.includes("rechaz")) return "×";
  if (text.includes("ver mas")) return "↓";
  return "";
}

function enhanceButtonIcons(root = document) {
  root.querySelectorAll("button").forEach((button) => {
    if (button.dataset.iconized || button.querySelector(".card-face") || button.closest(".chat-reactions")) return;
    const icon = buttonIcon(button);
    if (!icon) return;
    button.dataset.icon = icon;
    button.dataset.iconized = "true";
  });
}

function cleanText(value) {
  return String(value || "")
    .replaceAll("dano", "daño")
    .replaceAll("municion", "munición")
    .replaceAll("accion", "acción")
    .replaceAll("exploracion", "exploración")
    .replaceAll("mansion", "mansión");
}

function isInOnlineSession() {
  return state.loggedIn && state.sessionType !== "offline" && Boolean(state.roomId);
}

async function ensureChatRoomReady() {
  if (!state.loggedIn || state.sessionType === "offline") {
    notify("Chat deshabilitado", "El chat solo funciona en partidas Online.", "error");
    return false;
  }
  const backend = getOnlineBackend();
  if (!backend?.addRoomChat) {
    notify("Chat no disponible", "Firebase todavia no esta listo en este navegador. Recarga e intenta nuevamente.", "error");
    return false;
  }
  if (!state.roomId) await ensureOnlineRoom();
  if (!state.roomId) {
    notify("Sin sala online", "Crea o entra a una sala antes de enviar mensajes.", "error");
    return false;
  }
  return true;
}

async function addChat(author, text, extra = {}) {
  // Restricción: Solo permitir chat si hay una sala online activa (con o sin backend real)
  if (!(await ensureChatRoomReady())) return false;
  const message = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    author,
    uid: state.currentUser?.uid || "",
    text: text || "",
    type: extra.type || "text",
    audioData: extra.audioData || "",
    audioMime: extra.audioMime || "",
    reactions: {},
    time: Date.now(),
  };
  const backend = getOnlineBackend();
  if (isOnlineRoomActive() && backend?.addRoomChat) {
    try {
      await backend.addRoomChat(state.roomId, message);
    } catch (error) {
      notify("Chat no enviado", error.message, "error");
      return false;
    }
  }
  state.chatMessages = [message, ...state.chatMessages].slice(0, 80);
  renderChatMessages(state.chatMessages);
  return true;
}

async function publishChatMessages() {
  const backend = getOnlineBackend();
  if (isOnlineRoomActive() && backend?.addRoomChat) {
    await Promise.all(state.chatMessages.slice(0, 80).map((message) => backend.addRoomChat(state.roomId, message)));
  }
}

function reactToMessage(messageId, reaction) {
  const key = state.currentUser?.uid || myPlayer()?.name || "local";
  let nextReactions = null;
  state.chatMessages = state.chatMessages.map((message) => {
    if (message.id !== messageId) return message;
    const reactions = { ...(message.reactions || {}) };
    if (reactions[key] === reaction) delete reactions[key];
    else reactions[key] = reaction;
    nextReactions = reactions;
    return { ...message, reactions };
  });
  renderChatMessages(state.chatMessages);
  const backend = getOnlineBackend();
  if (isOnlineRoomActive() && backend?.updateRoomChatReaction) {
    backend.updateRoomChatReaction(state.roomId, messageId, nextReactions || {}).catch((error) => notify("Reaccion no enviada", error.message, "error"));
  }
}

function reactionCounts(reactions = {}) {
  return Object.values(reactions).reduce((counts, reaction) => {
    counts[reaction] = (counts[reaction] || 0) + 1;
    return counts;
  }, {});
}

function playVoiceMessage(message) {
  if (!message.audioData || state.playedVoiceMessages.has(message.id)) return;
  if (message.uid && message.uid === state.currentUser?.uid) return;
  state.playedVoiceMessages.add(message.id);
  const audio = new Audio(message.audioData);
  audio.volume = Math.min(1, Math.max(0, state.gameVolume / 100));
  audio.play().catch(() => {});
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function stopVoiceMessageRecording() {
  if (!state.voiceRecorder || state.voiceRecorder.state === "inactive") return;
  state.voiceRecorder.stop();
}

async function toggleVoiceMessage() {
  const button = $("#voice-message");
  
  // Verificar que sea online
  if (!(await ensureChatRoomReady())) return;
  
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    return notify("Audio no disponible", "Este navegador no permite grabar mensajes de voz.", "error");
  }
  if (state.voiceRecorder?.state === "recording") {
    await stopVoiceMessageRecording();
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  state.voiceChunks = [];
  const recorderOptions = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ? { mimeType: "audio/webm;codecs=opus", audioBitsPerSecond: 24000 }
    : MediaRecorder.isTypeSupported("audio/webm")
      ? { mimeType: "audio/webm", audioBitsPerSecond: 24000 }
      : { audioBitsPerSecond: 24000 };
  const recorder = new MediaRecorder(stream, recorderOptions);
  state.voiceRecorder = recorder;
  recorder.ondataavailable = (event) => {
    if (event.data?.size) state.voiceChunks.push(event.data);
  };
  recorder.onstop = async () => {
    window.clearTimeout(state.voiceRecordTimer);
    stream.getTracks().forEach((track) => track.stop());
    button.textContent = "Audio";
    button.classList.remove("recording");
    const blob = new Blob(state.voiceChunks, { type: recorder.mimeType || "audio/webm" });
    if (!blob.size) return;
    if (blob.size > 850000) {
      notify("Audio muy largo", "El mensaje supera el limite seguro para Firebase. Graba un audio mas corto.", "error");
      return;
    }
    const audioData = await blobToDataUrl(blob);
    const sent = await addChat(state.currentUser?.name || myPlayer()?.name || "Jugador", "Mensaje de voz", {
      type: "voice",
      audioData,
      audioMime: blob.type,
    });
    if (sent) notify("Audio enviado", "El mensaje de voz quedo en el chat.", "success");
  };
  recorder.start();
  button.textContent = "Grabando";
  button.classList.add("recording");
  state.voiceRecordTimer = window.setTimeout(stopVoiceMessageRecording, 15000);
  notify("Grabando audio", "Toca Audio otra vez para enviar. Maximo 15 segundos.", "success");
}

function renderChatMessages(messages = []) {
  const list = $("#chat-log");
  if (!list) return;
  const normalized = [...messages]
    .filter((message) => message?.text || message?.audioData)
    .sort((a, b) => (b.time || b.createdAt || 0) - (a.time || a.createdAt || 0))
    .slice(0, 80);
  state.chatMessages = normalized;
  list.innerHTML = "";
  normalized.forEach((message) => {
    const item = document.createElement("li");
    item.className = `chat-message ${message.uid === state.currentUser?.uid ? "mine" : "theirs"}`;
    const time = new Intl.DateTimeFormat("es-CL", { hour: "2-digit", minute: "2-digit" }).format(new Date(message.time || message.createdAt || Date.now()));
    const counts = reactionCounts(message.reactions);
    const reactionSummary = Object.entries(counts).map(([reaction, count]) => `<span>${reaction} ${count}</span>`).join("");
    item.innerHTML = `
      <div class="chat-avatar">${chatAuthorInitials(message)}</div>
      <div class="chat-bubble">
        <div class="chat-meta"><strong>${message.author || chatAuthorInitials(message)}</strong><span>${time}</span></div>
        ${message.audioData ? `
          <div class="chat-audio-container">
            <audio controls preload="metadata" src="${message.audioData}"></audio>
            <span class="audio-label">Mensaje de voz</span>
          </div>
        ` : `<p>${escapeHtml(message.text)}</p>`}
        <div class="chat-reactions" data-message-id="${message.id}">
          <button type="button" data-reaction="👍" aria-label="Me gusta">👍</button>
          <button type="button" data-reaction="❤️" aria-label="Me encanta">❤️</button>
          <button type="button" data-reaction="😂" aria-label="Me divierte">😂</button>
          <button type="button" data-reaction="😡" aria-label="Me enoja">😡</button>
          <button type="button" data-reaction="😭" aria-label="Llorando">😭</button>
          <div class="reaction-summary">${reactionSummary}</div>
        </div>
      </div>
    `;
    item.querySelectorAll("[data-reaction]").forEach((button) => {
      button.addEventListener("click", () => reactToMessage(message.id, button.dataset.reaction));
    });
    list.append(item);
    if (message.audioData) playVoiceMessage(message);
  });
}

function notify(title, text = "", type = "info") {
  const stack = $("#toast-stack");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<strong>${title}</strong>${text ? `<span>${text}</span>` : ""}`;
  stack.append(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function tutorialTarget(step) {
  const preferred = step?.selector ? $(step.selector) : null;
  if (preferred && preferred.offsetParent !== null) return preferred;
  return $(".game-surface") || $(".app-shell") || document.body;
}

function clearTutorialFocus() {
  $$(".tutorial-focus").forEach((item) => item.classList.remove("tutorial-focus"));
}

function renderTutorial() {
  const overlay = $("#tutorial-overlay");
  if (!overlay) return;
  overlay.classList.toggle("hidden", !state.tutorialActive);
  clearTutorialFocus();
  if (!state.tutorialActive) return;
  const step = tutorialSteps[state.tutorialStep] || tutorialSteps[0];
  const target = tutorialTarget(step);
  target.classList.add("tutorial-focus");
  target.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
  $("#tutorial-count").textContent = `Paso ${state.tutorialStep + 1}/${tutorialSteps.length}`;
  $("#tutorial-title").textContent = step.title;
  $("#tutorial-text").textContent = step.text;
  $("#tutorial-prev").disabled = state.tutorialStep === 0;
  $("#tutorial-next").textContent = state.tutorialStep === tutorialSteps.length - 1 ? "Finalizar" : "Siguiente";
}

function startTutorial() {
  state.tutorialActive = true;
  state.tutorialStep = 0;
  renderTutorial();
  sound("click");
}

function closeTutorial() {
  state.tutorialActive = false;
  clearTutorialFocus();
  renderTutorial();
}

function nextTutorialStep() {
  if (state.tutorialStep >= tutorialSteps.length - 1) {
    closeTutorial();
    notify("Tutorial finalizado", "Ya puedes jugar siguiendo las indicaciones de pantalla.", "success");
    return;
  }
  state.tutorialStep += 1;
  renderTutorial();
  sound("click");
}

function previousTutorialStep() {
  state.tutorialStep = Math.max(0, state.tutorialStep - 1);
  renderTutorial();
  sound("click");
}

function addAchievement(name) {
  if (!state.achievements.includes(name)) {
    state.achievements.push(name);
    saveProgress();
    notify("Logro desbloqueado", name, "success");
    renderAchievements();
  }
}

function recordMatchResult(result, reason, winner = null) {
  if (state.matchRecorded) return;
  const mine = state.players.find((player) => player.name === "Tu");
  const winnerName = winner?.name || "Sin ganador";
  if (result === "win") state.wins += 1;
  if (result === "loss") state.losses += 1;
  state.matchHistory.unshift({
    result,
    reason,
    winner: winnerName,
    character: mine?.character?.name || "Sin personaje",
    mode: getMode().name,
    scenario: getScenario().name,
    decorations: mine?.decorations || 0,
    health: mine?.health || 0,
    date: new Date().toLocaleString("es-CL"),
  });
  state.matchHistory = state.matchHistory.slice(0, 20);
  state.matchRecorded = true;
  saveProgress();
  renderAchievements();
}

function createStartingDeck() {
  return shuffle([
    ...Array.from({ length: 7 }, () => cloneCard(catalog.ammo10)),
    cloneCard(catalog.handgun),
    cloneCard(catalog.knife),
    cloneCard(catalog.knife),
  ]);
}

function createPlayer(name, isBot = false, isFriend = false) {
  const used = state.players.map((player) => player.character.name);
  const character = shuffle(characters.filter((item) => !used.includes(item.name)))[0] || shuffle(characters)[0];
  const deck = createStartingDeck();
  return {
    name,
    isBot,
    isFriend,
    character,
    maxHealth: character.health,
    health: character.health,
    decorations: 0,
    defeatedPlayers: 0,
    deaths: 0,
    skipTurns: 0,
    eliminated: false,
    hand: deck.slice(0, 5),
    deck: deck.slice(5),
    discard: [],
    played: [],
    selectedWeapons: [],
    alive: true,
  };
}

function refreshRandomCharacters() {
  const pool = shuffle(characters);
  state.players.forEach((player, index) => {
    const character = pool[index % pool.length] || shuffle(characters)[0];
    player.character = character;
    player.maxHealth = character.health;
    player.health = character.health;
    player.decorations = 0;
    player.defeatedPlayers = 0;
    player.deaths = 0;
    player.skipTurns = 0;
    player.eliminated = false;
    player.selectedWeapons = [];
    player.alive = true;
  });
}

function getModeKey() {
  return $("#mode").value;
}

function getMode() {
  return modes[getModeKey()];
}

function getScenario() {
  return scenarios[$("#scenario").value] || scenarios.firstTimer;
}

function levelFor(player) {
  return activeCharacterLevel(player)?.level || 0;
}

function characterLevelRules(character) {
  return (character?.levels?.length ? character.levels : [
    { min: 0, text: character?.trait || "" },
    { min: 3, text: character?.trait || "" },
    { min: 5, text: character?.trait || "" },
  ])
    .map((level, index) => ({
      level: index + 1,
      min: Number(level.min || 0),
      text: level.text || "",
    }))
    .sort((a, b) => a.min - b.min);
}

function activeCharacterLevel(player) {
  const rules = characterLevelRules(player?.character);
  let active = null;
  rules.forEach((rule) => {
    if ((player?.decorations || 0) >= rule.min) active = rule;
  });
  return active;
}

function nextCharacterLevel(player) {
  return characterLevelRules(player?.character).find((rule) => (player?.decorations || 0) < rule.min);
}

function canStart() {
  const mode = getMode();
  return state.entryDone && state.players.length >= mode.min && state.players.length <= mode.max;
}

function applySessionUi(provider) {
  document.body.classList.toggle("offline-mode", provider === "Offline");
  $("#entry-screen").classList.add("hidden");
  $("#player-name").textContent = state.currentUser.name;
  $("#login-provider").textContent = provider === "Offline" ? "Modo offline de prueba" : "Sesion iniciada con cuenta del sitio";
  $("#avatar").textContent = provider === "Offline" ? "OFF" : initials(state.currentUser.name);
  $$("[data-session]").forEach((item) => item.classList.toggle("active", item.dataset.session === state.sessionType));
}

function startEntry(provider, user = null, options = {}) {
  state.entryDone = true;
  state.loggedIn = provider !== "Offline";
  state.provider = provider;
  state.sessionType = options.sessionType || (provider === "Offline" ? "offline" : "friends");
  state.currentUser = publicUser(user || {
    name: provider === "Offline" ? "Invitado offline" : `Usuario ${provider}`,
    email: provider === "Offline" ? "offline@demo.local" : `${provider.toLowerCase()}@demo.local`,
    provider,
  });
  applySessionUi(provider);
  saveProgress();
  sound("click");
  renderAuth();
  renderSiteUsers();
  if (!options.keepRoom) resetRoom();
  if (provider !== "Offline") {
    startOnlineDirectoryRefresh();
    syncOnlineDirectory();
  } else {
    stopOnlineDirectoryRefresh();
  }
}

async function restoreSavedSession() {
  if (state.entryDone) return;
  const storedUser = JSON.parse(localStorage.getItem("mdbg-current-user") || "null");
  if (!storedUser?.uid || storedUser.email?.endsWith("@demo.local")) return;
  const backend = getOnlineBackend();
  if (!backend?.getCurrentUserProfile) return;
  try {
    const firebaseUser = await backend.getCurrentUserProfile();
    if (!firebaseUser?.uid || firebaseUser.uid !== storedUser.uid) return;
    state.entryDone = true;
    state.loggedIn = true;
    state.provider = firebaseUser.provider || "Correo";
    state.sessionType = localStorage.getItem("mdbg-session-type") || "friends";
    state.currentUser = publicUser(firebaseUser);
    state.roomId = localStorage.getItem("mdbg-room-id") || "";
    applySessionUi(state.provider);
    buildResourceArea();
    if (state.roomId && backend.getRoom) {
      const room = await backend.getRoom(state.roomId);
      if (room?.players?.some((player) => player.uid === state.currentUser.uid)) {
        state.sessionType = room.sessionType || state.sessionType;
        state.roomOwnerUid = room.ownerUid || "";
        $("#mode").value = room.mode || $("#mode").value;
        populateScenarios();
        if (room.scenario) $("#scenario").value = room.scenario;
        syncPlayersFromRoom(room.players || []);
        watchCurrentRoom();
      } else {
        state.roomId = "";
        resetRoom();
      }
    } else {
      resetRoom();
    }
    startOnlineSubscriptions();
    startOnlineDirectoryRefresh();
    await syncOnlineDirectory();
    renderRoom();
    renderGame();
    renderAchievements();
    notify("Sesion restaurada", "Volviste a tu cuenta online.", "success");
  } catch (error) {
    notify("Sesion no restaurada", error.message, "error");
  }
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 3).toUpperCase();
}

function populateScenarios() {
  const mode = getModeKey();
  const select = $("#scenario");
  const current = select.value;
  select.innerHTML = "";
  Object.entries(scenarios)
    .filter(([, scenario]) => scenario.modes.includes(mode))
    .forEach(([key, scenario]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = scenario.name;
      select.append(option);
    });
  if ([...select.options].some((option) => option.value === current)) select.value = current;
}

function buildResourceArea() {
  const forbidden = new Set(["gatling", "rocket"]);
  const ids = [...new Set([...baseResourceIds, ...getScenario().resources, ...weaponResourceIds, ...actionResourceIds])]
    .filter((id) => catalog[id] && !forbidden.has(id));
  while (ids.length < 18) ids.push(baseResourceIds[ids.length % baseResourceIds.length]);
  state.resourceArea = ids.map((id) => ({
    card: catalog[id],
    count: id === "ammo10" ? 10 : id === "ammo20" ? 16 : id === "ammo30" ? 16 : 10,
  }));
  state.selectedResource = 0;
  state.resourceFilter = "Todos";
  randomizeMarketOrder();
}

function randomizeMarketOrder() {
  state.resourceMarketOrder = shuffle(state.resourceArea.map((_, index) => index));
}

function buildMansion() {
  const mode = getModeKey();
  if (mode === "versus") return [];
  if (mode === "mercenary") {
    const lighter = mansionStory.filter((card) => !card.boss && card.health <= 50 && card.type !== "Objeto");
    return shuffle([...lighter, ...lighter, ...mercenaryBonus, ...mercenaryBonus]);
  }
  return shuffle([...mansionStory, ...mansionStory.filter((card) => !card.boss)]);
}

function renderAuth() {
  $("#auth-panel").classList.toggle("hidden", state.entryDone);
  $("#profile-panel").classList.toggle("hidden", !state.entryDone);
  $("#online-panel").classList.toggle("hidden", !state.entryDone || state.sessionType === "offline");
  
  // Ocultar chat en modo offline
  const chatPanel = $(".chat-panel");
  if (chatPanel) {
    chatPanel.classList.toggle("hidden", state.sessionType === "offline");
  }

  $("#availability-toggle").checked = state.currentUser?.online !== false;
  document.body.classList.toggle("offline-mode", state.entryDone && state.sessionType === "offline");
  $$("[data-session]").forEach((item) => {
    const hiddenInOffline = state.sessionType === "offline" && item.dataset.session !== "offline";
    item.hidden = hiddenInOffline;
  });
  $("#saved-wins").textContent = state.wins;
  $("#saved-losses").textContent = state.losses;
  $("#saved-achievements").textContent = state.achievements.length;
}

function renderFriends() {
  const list = $("#friend-list");
  list.innerHTML = "";
  if (state.sessionType === "offline") return;
  state.friends.forEach((friendId) => {
    const friend = state.siteUsers.find((user) => user.uid === friendId || user.email === friendId);
    if (!friend) return;
    const row = document.createElement("div");
    row.className = `friend ${friend.online ? "" : "offline"}`;
    row.innerHTML = `
      <div><strong>${friend.name}</strong><span>${friend.online ? "Disponible online" : "No disponible"}</span></div>
      <button type="button" ${friend.online ? "" : "disabled"}>Invitar</button>
    `;
    row.querySelector("button").addEventListener("click", () => inviteFriend(friend));
    list.append(row);
  });
}

function renderSiteUsers() {
  const list = $("#site-users");
  if (!list) return;
  list.innerHTML = "";
  const connected = state.siteUsers.filter((user) => user.online).length;
  $("#users-status").textContent = `${connected} conectados`;
  if (!state.siteUsers.length) {
    const empty = document.createElement("div");
    empty.className = "friend offline";
    empty.innerHTML = "<div><strong>Sin usuarios Firebase</strong><span>Solo aparecen cuentas reales registradas en Firestore.</span></div>";
    list.append(empty);
  }
  state.siteUsers.forEach((user) => {
    const userId = user.uid || user.email;
    if (state.currentUser?.email === user.email || state.currentUser?.uid === user.uid) return;
    const isFriend = state.friends.includes(userId) || state.friends.includes(user.email);
    const row = document.createElement("div");
    row.className = `friend ${user.online ? "" : "offline"}`;
    row.innerHTML = `
      <div><strong>${user.name}</strong><span>${user.email} - ${user.online ? "Disponible online" : "No disponible"}</span></div>
      <button type="button" ${isFriend ? "disabled" : ""}>${isFriend ? "Agregado" : "Agregar"}</button>
    `;
    row.querySelector("button").addEventListener("click", () => addFriendByUser(user));
    list.append(row);
  });
  renderInvitations();
}

function renderInvitations() {
  const list = $("#invitation-list");
  if (!list) return;
  list.innerHTML = "";
  const items = [
    ...state.pendingFriendRequests.map((request) => ({ kind: "friend", ...request })),
    ...state.pendingRoomInvitations.map((invite) => ({ kind: "room", ...invite })),
  ];
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "invitation-card";
    const isRoom = item.kind === "room";
    card.innerHTML = `
      <div>
        <strong>${isRoom ? "Invitacion a sala" : "Solicitud de amistad"}</strong>
        <span>${isRoom ? `${item.fromName} te invita a jugar ${item.mode || "online"}` : `${item.fromName} quiere agregarte como amigo`}</span>
      </div>
      <div class="invite-actions">
        <button type="button" data-action="accept">Aceptar</button>
        <button type="button" data-action="reject">Rechazar</button>
      </div>
    `;
    card.querySelector('[data-action="accept"]').addEventListener("click", () => isRoom ? acceptRoomInvitation(item) : acceptFriendInvitation(item));
    card.querySelector('[data-action="reject"]').addEventListener("click", () => isRoom ? rejectRoomInvitation(item) : rejectFriendInvitation(item));
    list.append(card);
  });
}

/* ── Modal central de invitación a sala ─────────────────── */
let _currentInviteModalItem = null;

function showRoomInviteModal(invitation) {
  const overlay = document.getElementById("invite-modal-overlay");
  const fromEl = document.getElementById("invite-modal-from");
  const detailsEl = document.getElementById("invite-modal-details");
  const acceptBtn = document.getElementById("invite-modal-accept");
  const rejectBtn = document.getElementById("invite-modal-reject");
  if (!overlay) return;

  _currentInviteModalItem = invitation;
  fromEl.textContent = `De: ${invitation.fromName || "Jugador"}`;
  const parts = [];
  if (invitation.mode) parts.push(`Modo: ${invitation.mode}`);
  if (invitation.scenario) parts.push(`Escenario: ${invitation.scenario}`);
  if (invitation.maxPlayers) parts.push(`Max jugadores: ${invitation.maxPlayers}`);
  detailsEl.textContent = parts.join("  ·  ");
  overlay.classList.remove("hidden");

  function close() {
    overlay.classList.add("hidden");
    _currentInviteModalItem = null;
    acceptBtn.removeEventListener("click", onAccept);
    rejectBtn.removeEventListener("click", onReject);
  }
  function onAccept() {
    const inv = _currentInviteModalItem;
    close();
    if (inv) acceptRoomInvitation(inv);
  }
  function onReject() {
    const inv = _currentInviteModalItem;
    close();
    if (inv) rejectRoomInvitation(inv);
  }
  acceptBtn.addEventListener("click", onAccept);
  rejectBtn.addEventListener("click", onReject);
}

function onlineHumanPlayers() {
  return state.players.filter((player) => !player.isBot && player.uid);
}

function startConfirmationKey() {
  return state.currentUser?.uid || "";
}

function confirmedStartCount() {
  const players = onlineHumanPlayers();
  return players.filter((player) => state.startConfirmations?.[player.uid]).length;
}

function allPlayersConfirmedStart() {
  const players = onlineHumanPlayers();
  return Boolean(players.length) && players.every((player) => state.startConfirmations?.[player.uid]);
}

async function updateStartConfirmation(confirmed = true) {
  const backend = getOnlineBackend();
  const uid = startConfirmationKey();
  if (!state.roomId || !backend?.updateRoom || !uid) return;
  if (backend.getRoom) {
    const room = await backend.getRoom(state.roomId).catch(() => null);
    state.startConfirmations = {
      ...(room?.startConfirmations || {}),
      ...(state.startConfirmations || {}),
    };
  } else {
    state.startConfirmations ||= {};
  }
  if (confirmed) {
    state.startConfirmations[uid] = {
      name: state.currentUser?.name || myPlayer()?.name || "Jugador",
      time: Date.now(),
    };
  } else {
    delete state.startConfirmations[uid];
  }
  await backend.updateRoom(state.roomId, {
    startConfirmations: state.startConfirmations,
  });
  if (state.roomOwnerUid && state.currentUser?.uid === state.roomOwnerUid && allPlayersConfirmedStart()) {
    window.setTimeout(() => {
      beginConfirmedGame().catch((error) => notify("No se pudo iniciar", error.message, "error"));
    }, 0);
  }
  renderRoom();
}

function hideStartConfirmModal() {
  const overlay = document.getElementById("start-confirm-overlay");
  if (overlay) overlay.classList.add("hidden");
}

function showStartConfirmModal(request = state.startRequest) {
  const overlay = document.getElementById("start-confirm-overlay");
  const title = document.getElementById("start-confirm-title");
  const message = document.getElementById("start-confirm-message");
  const status = document.getElementById("start-confirm-status");
  const acceptBtn = document.getElementById("start-confirm-accept");
  const waitBtn = document.getElementById("start-confirm-wait");
  if (!overlay || !request) return;
  const total = Math.max(onlineHumanPlayers().length, Number(request.totalPlayers || 0), 1);
  const accepted = confirmedStartCount();
  title.textContent = "Confirmar inicio";
  message.textContent = `${request.requestedByName || "El anfitrion"} quiere comenzar la partida.`;
  status.textContent = `${accepted}/${total} jugadores listos.`;
  acceptBtn.disabled = Boolean(state.startConfirmations?.[startConfirmationKey()]);
  acceptBtn.textContent = acceptBtn.disabled ? "Listo confirmado" : "Estoy listo";
  overlay.classList.remove("hidden");

  acceptBtn.onclick = () => {
    updateStartConfirmation(true).catch((error) => notify("Confirmacion no enviada", error.message, "error"));
  };
  waitBtn.onclick = () => hideStartConfirmModal();
}

async function requestOnlineStartConfirmation() {
  const backend = getOnlineBackend();
  if (!backend?.updateRoom || !state.roomId) return false;
  if (state.startRequest && !state.started) {
    showStartConfirmModal(state.startRequest);
    notify("Inicio pendiente", "Ya hay una solicitud de inicio esperando confirmaciones.", "error");
    return false;
  }
  const request = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    requestedByUid: state.currentUser?.uid || "",
    requestedByName: state.currentUser?.name || "Anfitrion",
    totalPlayers: onlineHumanPlayers().length,
    time: Date.now(),
  };
  state.startRequest = request;
  state.startConfirmations = {};
  await backend.updateRoom(state.roomId, {
    startRequest: request,
    startConfirmations: {},
  });
  await updateStartConfirmation(true);
  showStartConfirmModal(request);
  notify("Inicio solicitado", "Esperando confirmacion de todos los jugadores.", "success");
  return true;
}

async function clearStartConfirmationRequest() {
  const backend = getOnlineBackend();
  state.startRequest = null;
  state.startConfirmations = {};
  state.lastStartPromptId = "";
  hideStartConfirmModal();
  if (backend?.updateRoom && state.roomId) {
    await backend.updateRoom(state.roomId, {
      startRequest: null,
      startConfirmations: {},
    }).catch(() => {});
  }
}

function handleStartRequestUpdate(room = {}) {
  if (state.started || !state.startRequest) {
    hideStartConfirmModal();
    return;
  }
  const requestId = state.startRequest.id || "";
  if (requestId && state.lastStartPromptId !== requestId && !state.startConfirmations?.[startConfirmationKey()]) {
    state.lastStartPromptId = requestId;
    window.setTimeout(() => showStartConfirmModal(state.startRequest), 120);
  }
  if (state.roomOwnerUid && state.currentUser?.uid === state.roomOwnerUid && allPlayersConfirmedStart()) {
    window.setTimeout(() => {
      beginConfirmedGame().catch((error) => notify("No se pudo iniciar", error.message, "error"));
    }, 0);
  }
}

/* ── Notificación flotante de chat ──────────────────────── */
function showChatNotification(author, text) {
  const existing = document.getElementById("chat-notif-toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.id = "chat-notif-toast";
  toast.className = "chat-notif-toast";
  toast.innerHTML = `<strong>💬 ${author}</strong><span>${text}</span>`;
  document.body.appendChild(toast);
  // Click lleva al panel de chat
  toast.addEventListener("click", () => {
    const chatPanel = document.querySelector(".chat-panel");
    if (chatPanel) chatPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    toast.remove();
  });
  window.setTimeout(() => toast && toast.remove(), 5000);
}

function renderRoom() {
  const mode = getMode();
  $("#room-title").textContent = `${mode.name} - ${getScenario().name}`;
  const backendLabel = state.sessionType !== "offline" && getOnlineBackend()
    ? "Online real activo."
    : state.loggedIn && state.provider !== "Offline"
      ? "Online demo hasta configurar Firebase."
      : "";
  $("#room-status").textContent = state.entryDone
    ? `Sala con ${state.players.length}/${mode.max}. Minimo: ${mode.min}. ${mode.objective} ${backendLabel} ${state.syncStatus}`
    : "Inicia sesion con tu cuenta del sitio o prueba offline para crear una sala.";
  const waitingStart = Boolean(state.startRequest && !state.started);
  $("#start-game").disabled = state.started || (!state.started && !canStart()) || waitingStart;
  $("#start-game").textContent = state.started
    ? "Partida activa"
    : waitingStart
      ? `Esperando ${confirmedStartCount()}/${Math.max(onlineHumanPlayers().length, 1)}`
      : "Comenzar partida";
  $("#fill-room").hidden = state.sessionType !== "offline";
  renderAuth();
  renderFriends();
  renderPlayers();
  renderResources();
  enhanceButtonIcons();
  
  // Deshabilitar chat si no hay sesión online activa.
  const chatInput = $("#chat-input");
  const chatSubmit = $("#chat-submit");
  const voiceToggle = $("#voice-toggle");
  const voiceMessage = $("#voice-message");
  const canUseOnlineChat = state.loggedIn && state.sessionType !== "offline";
  const isVoiceReady = canUseOnlineChat && Boolean(getOnlineBackend()?.addRoomChat);
  
  if (chatInput) {
    chatInput.disabled = !canUseOnlineChat;
    chatInput.placeholder = canUseOnlineChat ? "Mensaje a la sala" : "Chat solo en modo Online";
  }
  if (chatSubmit) chatSubmit.disabled = !canUseOnlineChat;
  if (voiceToggle) voiceToggle.disabled = !isOnlineRoomActive();
  if (voiceMessage) voiceMessage.disabled = !isVoiceReady;

  if (state.tutorialActive) renderTutorial();
}

function renderPlayers() {
  const grid = $("#players");
  grid.innerHTML = "";
  const mode = getMode();
  const maxSlots = Math.max(4, mode?.max || 4);
  const visiblePlayers = state.players.slice(0, maxSlots);
  visiblePlayers.forEach((player, index) => {
    const card = document.createElement("article");
    const hpPercent = Math.max(0, Math.round((player.health / player.maxHealth) * 100));
    card.className = `player-card ${index === state.activeIndex && state.started ? "active" : ""}`;
    const stateLabel = player.eliminated ? "Eliminado" : player.skipTurns > 0 ? `Cae ${player.skipTurns} turno(s)` : index === state.activeIndex && state.started ? "Tu turno" : player.isBot ? "Bot" : "Jugador";
    card.innerHTML = `
      ${characterPortrait(player.character, "small")}
      <div class="player-name-row">
        <strong>${player.name}</strong>
        <em>${stateLabel}</em>
      </div>
      <span>${player.character.name} - Nivel ${levelFor(player)}</span>
      <button class="character-read-btn" type="button">Ver caracteristicas</button>
      <div class="health-bar"><span style="width:${hpPercent}%"></span></div>
      <div class="player-meta">
        <span>Vida ${player.health}/${player.maxHealth}</span>
        <span>Medallas ${player.decorations}</span>
        <span>Muertes ${player.deaths || 0}/3</span>
      </div>
    `;
    card.querySelector(".character-read-btn").addEventListener("click", () => showCharacterDetails(player));
    grid.append(card);
  });
  for (let index = visiblePlayers.length; index < maxSlots; index += 1) {
    const empty = document.createElement("article");
    empty.className = "player-slot-empty";
    empty.innerHTML = `<div><strong>Espacio disponible</strong><span>Invita o agrega un jugador</span></div>`;
    grid.append(empty);
  }
}

function showCharacterDetails(player) {
  const rules = characterLevelRules(player.character)
    .map((rule) => `Nivel ${rule.level}: ${rule.min} medallas - ${rule.text || "Sin texto"}`)
    .join("\n");
  const passive = player.character.passive ? `\nPasivo: ${player.character.passive}` : "";
  window.alert(`${player.character.name}\nVida base: ${player.character.health}\nMedallas actuales: ${player.decorations}\n\n${rules}${passive}`);
}

function renderResources() {
  const area = $("#resource-area");
  const typeBar = $("#resource-types");
  area.innerHTML = "";
  typeBar.innerHTML = "";
  area.classList.toggle("collapsed", !state.resourceMarketOpen);

  const availableTypes = new Set(state.resourceArea.map((pile) => pile.card.type));
  const types = ["Todos", ...Array.from(availableTypes)];
  types.forEach((type) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = type === state.resourceFilter ? "active" : "";
    button.textContent = type;
    const handleFilter = (e) => {
      e.preventDefault();
      state.resourceFilter = type;
      state.resourceMarketOpen = true;
      randomizeMarketOrder();
      renderResources();
    };
    button.addEventListener("click", handleFilter);
    button.addEventListener("touchend", handleFilter);
    typeBar.append(button);
  });

  $("#resource-status").textContent = state.resourceMarketOpen
    ? `${state.resourceArea.length || 18} montones disponibles`
    : "Pulsa Comprar carta";

  if (!state.resourceMarketOpen) return;

  const grouped = new Map();
  state.resourceMarketOrder.forEach((index) => {
    const pile = state.resourceArea[index];
    if (state.resourceFilter !== "Todos" && pile.card.type !== state.resourceFilter) return;
    if (!grouped.has(pile.card.type)) grouped.set(pile.card.type, []);
    grouped.get(pile.card.type).push({ pile, index });
  });

  [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "es"))
    .forEach(([type, piles]) => {
      const group = document.createElement("section");
      group.className = "resource-group";
      group.innerHTML = `<h3>${type}</h3><div class="resource-group-grid"></div>`;
      const grid = group.querySelector(".resource-group-grid");
      piles.forEach(({ pile, index }) => grid.append(resourceCardElement(pile, index)));
      area.append(group);
    });
}

function resourceCardElement(pile, index) {
    const item = document.createElement("div");
    item.className = `resource-card ${pile.count <= 0 ? "empty" : ""}`;
    item.innerHTML = `
      <header class="resource-name"><strong>${pile.card.name}</strong></header>
      <button class="inspect-btn" type="button" title="Ver detalles">🔍</button>
      <button class="card-face-btn" type="button" aria-label="Comprar ${pile.card.name}" ${pile.count <= 0 ? "disabled" : ""}>
        <div class="card-face card-${pile.card.art}">${cardFace(pile.card, "resource")}</div>
      </button>
      <footer><span class="cost-gold">${pile.card.cost} oro</span><span class="remaining">Quedan ${pile.count}</span></footer>
    `;
    
    const btn = item.querySelector(".card-face-btn");
    const inspect = item.querySelector(".inspect-btn");

    const handlePurchase = (e) => {
        if (e.type === 'touchend') e.preventDefault();
        buyResource(index);
    };
    
    const handleInspect = (e) => {
        if (e.type === 'touchend') e.preventDefault();
        e.stopPropagation();
        inspectCard(pile.card);
    };

    btn.addEventListener("click", handlePurchase);
    btn.addEventListener("touchend", handlePurchase);
    inspect.addEventListener("click", handleInspect);
    inspect.addEventListener("touchend", handleInspect);
    
    return item;
}

function inspectCard(card) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="inspect-modal">
      <button class="close-btn" type="button">X</button>
      <img src="${card.image}" class="inspect-image" alt="${card.name}">
      <div class="inspect-info">
        <h2>${card.name}</h2>
        <span class="type-badge">${card.type}</span>
        <div class="inspect-details">
          ${card.damage ? `<p><strong>Daño:</strong> ${card.damage}</p>` : ""}
          ${card.ammoCost ? `<p><strong>Costo Munición:</strong> ${card.ammoCost}</p>` : ""}
          ${card.cost ? `<p><strong>Costo Oro:</strong> ${card.cost}</p>` : ""}
          ${card.text ? `<p><strong>Efecto:</strong> ${card.text}</p>` : "<p>Sin efectos adicionales.</p>"}
        </div>
      </div>
    </div>
  `;
  
  const close = () => {
    overlay.remove();
    sound("click");
  };
  
  overlay.querySelector(".close-btn").addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.body.appendChild(overlay);
  sound("click");
}

function renderGame() {
  const mode = getModeKey();
  const current = state.players[state.activeIndex];
  $("#turn-pill").textContent = state.started ? `Ronda ${state.round}` : "Turno 0";
  $("#current-player").textContent = current ? current.name : "Sin jugador";
  $("#mansion-count").textContent = mode === "versus" ? "Sin mansion" : `${state.mansion.length} cartas`;
  renderSoundControls();
  if (state.started && !isOpeningRollActive() && !state.turnTimerId) startTurnTimer();
  if (!state.started && state.turnTimerId) stopTurnTimer();
  $("#game-status").textContent = state.started
    ? `${current.name} esta jugando. ${getMode().objective}`
    : "Crea una sala y comienza para repartir personajes al azar.";
  renderTurnTimer();
  $("#target-row").classList.toggle("active", state.started && mode === "versus");
  renderTargets();
  renderLiveTrackers(current);
  renderMansionCard(mode);
  renderHand(current);
  renderPlayerCardZones(myPlayer());
  renderActionCards(current);
  renderWeapons(current);
  renderPlayed(current);
  renderPlayers();
  renderDiceRoll();
  renderResources();
  renderTurnControls();
  schedulePublishRoomState();
  enhanceButtonIcons();
  if (state.tutorialActive) renderTutorial();
}

function renderDiceRoll() {
  const panel = $("#dice-roll-panel");
  const grid = $("#dice-roll-grid");
  if (!panel || !grid) return;
  const roll = state.diceRoll;
  panel.classList.toggle("hidden", !roll);
  if (!roll) return;
  const winner = state.players[roll.winnerIndex];
  $("#dice-roll-status").textContent = roll.rolling
    ? "Girando dados..."
    : winner
      ? `Comienza ${winner.name} con ${roll.values?.[roll.winnerIndex] || 0}`
      : "Tirada completa";
  grid.innerHTML = "";
  state.players.forEach((player, index) => {
    const item = document.createElement("div");
    item.className = `dice-result ${index === roll.winnerIndex ? "winner" : ""} ${roll.rolling ? "rolling" : ""}`;
    item.innerHTML = `
      <span>${player.name}</span>
      <strong>${roll.values?.[index] || "-"}</strong>
    `;
    grid.append(item);
  });
}

function rollOpeningDiceValues(playerIndexes) {
  const values = {};
  playerIndexes.forEach((index) => {
    values[index] = 1 + Math.floor(Math.random() * 6);
  });
  return values;
}

function resolveOpeningRoll() {
  let contenders = state.players.map((_, index) => index);
  let values = rollOpeningDiceValues(contenders);
  let guard = 0;
  while (contenders.length > 1 && guard < 12) {
    const roundValues = rollOpeningDiceValues(contenders);
    values = { ...values, ...roundValues };
    const max = Math.max(...contenders.map((index) => roundValues[index]));
    contenders = contenders.filter((index) => roundValues[index] === max);
    guard += 1;
  }
  return {
    values,
    winnerIndex: contenders[0] || 0,
  };
}

function runOpeningDiceRoll() {
  const result = resolveOpeningRoll();
  state.diceRoll = {
    values: Object.fromEntries(state.players.map((_, index) => [index, 1])),
    winnerIndex: null,
    rolling: true,
  };
  renderDiceRoll();
  renderTurnTimer();
  renderTurnControls();
  publishRoomState(true);
  schedulePublishRoomState(true);
  let ticks = 0;
  const spin = window.setInterval(() => {
    ticks += 1;
    state.diceRoll.values = Object.fromEntries(state.players.map((_, index) => [index, 1 + Math.floor(Math.random() * 6)]));
    renderDiceRoll();
    schedulePublishRoomState();
    if (ticks >= 12) {
      window.clearInterval(spin);
      state.diceRoll = {
        values: result.values,
        winnerIndex: result.winnerIndex,
        rolling: false,
      };
      state.activeIndex = result.winnerIndex;
      state.turn = freshTurn();
      state.turnEndsAt = Date.now() + 4 * 60 * 1000;
      applyHandResources(currentPlayer());
      notify("Dado inicial", `${currentPlayer().name} comienza la partida.`, "success");
      startTurnTimer();
      renderRoom();
      renderGame();
    }
  }, 110);
}

function renderTurnControls() {
  const canAct = isMyTurn();
  $$(".turn-command").forEach((button) => {
    button.disabled = state.started && !canAct;
  });
  $("#request-end-game").disabled = !state.started || hasVotedToEnd();
  $("#request-end-game").textContent = hasVotedToEnd() ? "Voto enviado" : "Terminar partida";
  $("#mansion-card").disabled = getModeKey() === "versus" || (state.started && !canAct);
  $$("#hand button, #action-card-list button, #weapon-list button").forEach((button) => {
    button.disabled = state.started && !canAct;
  });
  $$("#resource-area button").forEach((button) => {
    button.disabled = button.closest(".resource-card.empty") || (state.started && !canAct);
  });
}

function renderTurnTimer() {
  const timer = $("#turn-timer");
  if (isOpeningRollActive()) {
    timer.textContent = "Dado";
    return;
  }
  if (!state.started || !state.turnEndsAt) {
    timer.textContent = "04:00";
    return;
  }
  const remaining = Math.max(0, state.turnEndsAt - Date.now());
  const minutes = String(Math.floor(remaining / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
  timer.textContent = `${minutes}:${seconds}`;
}

function renderTargets() {
  const select = $("#versus-target");
  const current = currentPlayer();
  select.innerHTML = "";
  state.players
    .filter((player) => player !== current && player.alive)
    .forEach((player, index) => {
      const option = document.createElement("option");
      option.value = state.players.indexOf(player);
      option.textContent = `${player.name} (${player.health} vida)`;
      if (index === 0) option.selected = true;
      select.append(option);
    });
}

function renderMansionCard(mode) {
  $("#mansion-card").disabled = mode === "versus";
  $("#mansion-card").className = state.lastRevealed
    ? `mansion-card card-face card-${state.lastRevealed.art} ${state.lastRevealed.image ? "has-card-image" : ""}`
    : "mansion-card card-face card-back";
  if (mode === "versus") {
    $("#mansion-card").innerHTML = "<span class=\"card-mark\">VS</span><strong>Sin mansion</strong><small>Ataca personajes</small>";
    $("#discard-slot").innerHTML = "<span>Modo Versus</span><strong>Elige un objetivo</strong>";
    return;
  }
  $("#mansion-card").innerHTML = state.lastRevealed
    ? cardFace(state.lastRevealed, "mansion")
    : "<span class=\"card-mark\">?</span><strong>Mazo cerrado</strong><small>Explora para revelar</small>";
  $("#discard-slot").innerHTML = state.lastRevealed
    ? `<span>Ultima carta</span><strong>${state.lastRevealed.name}</strong><small>${state.lastRevealed.type}</small>`
    : "<span>Descarte</span><strong>Sin encuentros</strong>";
}

function renderHand(current) {
  const hand = $("#hand");
  hand.innerHTML = "";
  const cards = current?.hand || [];
  if (!cards.length) {
    hand.innerHTML = "<p class=\"status\">Sin cartas en mano. Finaliza el turno para robar 5.</p>";
    return;
  }
    cards.forEach((card) => {
    const el = document.createElement("button");
    el.type = "button";
    const selected = current?.selectedWeapons?.some((weapon) => weapon.instanceId === card.instanceId);
    const isAction = card.type === "Accion";
    el.className = `card card-face card-${card.art} ${selected ? "selected-card" : ""} ${isAction ? "action-hand-card" : ""}`;
    el.setAttribute("aria-label", card.type === "Arma" ? `Ver arma ${card.name}` : `Jugar ${card.name}`);
    el.style.position = "relative";
    el.innerHTML = `
      <button class="inspect-btn" type="button" style="top:2px; right:2px; width:20px; height:20px; font-size:10px; position:absolute; z-index:10;">🔍</button>
      ${cardFace(card, "hand")}
    `;
    
    const handlePlay = (e) => {
        if (e.type === 'touchend') e.preventDefault();
        playHandCard(card.instanceId);
    };
    const handleInspect = (e) => {
        if (e.type === 'touchend') e.preventDefault();
        e.stopPropagation();
        inspectCard(card);
    };

    el.addEventListener("click", handlePlay);
    el.addEventListener("touchend", handlePlay);
    el.querySelector(".inspect-btn").addEventListener("click", handleInspect);
    el.querySelector(".inspect-btn").addEventListener("touchend", handleInspect);
    
    hand.append(el);
  });
}

function renderCardBackStack(count, label) {
  if (count <= 0) return `<div class="empty-stack"><span>${label}</span><strong>Sin cartas</strong></div>`;
  const visible = Math.min(5, count);
  const cards = Array.from({ length: visible }, (_, index) => (
    `<div class="mini-back-card" style="--i:${index}"></div>`
  )).join("");
  return `<div class="mini-stack ${state.turn.drawAnimation ? "dealing" : ""} ${state.turn.shuffleAnimation ? "shuffling" : ""}">${cards}<span>${count}</span></div>`;
}

function renderPlayerCardZones(player) {
  const deckZone = $("#player-deck-zone");
  const discardZone = $("#player-discard-zone");
  if (!deckZone || !discardZone) return;
  const deckCount = player?.deck?.length || 0;
  const discard = player?.discard || [];
  $("#player-deck-count").textContent = `${deckCount} cartas`;
  $("#player-discard-count").textContent = `${discard.length} cartas`;
  deckZone.innerHTML = renderCardBackStack(deckCount, "Mazo");
  discardZone.innerHTML = "";
  if (!discard.length) {
    discardZone.innerHTML = "<div class=\"empty-stack\"><span>Descarte</span><strong>Sin cartas</strong></div>";
    return;
  }
  discard.slice(-4).reverse().forEach((card) => {
    const item = document.createElement("div");
    item.className = `card card-face discard-mini-card card-${card.art || "ammo"}`;
    item.innerHTML = cardFace(card, "discard");
    discardZone.append(item);
  });
}

async function setCurrentAvailability(online) {
  if (!state.currentUser) return;
  state.currentUser.online = Boolean(online);
  mergeSiteUsers([state.currentUser]);
  saveProgress();
  renderAuth();
  renderSiteUsers();
  const backend = getOnlineBackend();
  if (backend && state.currentUser.uid) {
    try {
      await backend.setAvailability(state.currentUser.uid, state.currentUser.online);
      notify("Disponibilidad actualizada", state.currentUser.online ? "Ahora apareces disponible online." : "Ahora apareces desconectado para invitaciones.", "success");
      await syncOnlineDirectory();
    } catch (error) {
      notify("Disponibilidad no guardada", error.message, "error");
    }
  }
}

function renderActionCards(current) {
  const list = $("#action-card-list");
  const actions = (current?.hand || []).filter((card) => card.type === "Accion");
  $("#action-status").textContent = `${actions.length} disponibles`;
  list.innerHTML = "";
  if (!actions.length) {
    list.innerHTML = "<p class=\"status\">No hay cartas de accion en tu mano.</p>";
    return;
  }
  actions.forEach((card) => {
    const item = document.createElement("div");
    item.className = "action-choice action-select-card";
    item.style.position = "relative";
    item.innerHTML = `
      <button class="inspect-btn" type="button" style="top:5px; right:5px; width:20px; height:20px; font-size:10px;">🔍</button>
      <button class="card-face card-action" type="button">
        ${cardFace(card, "action")}
        <span class="action-effect">${actionEffectText(card)}</span>
      </button>
    `;
    
    const btn = item.querySelector(".card-face");
    const inspect = item.querySelector(".inspect-btn");

    const handlePlay = (e) => {
        if (e.type === 'touchend') e.preventDefault();
        playHandCard(card.instanceId);
    };
    const handleInspect = (e) => {
        if (e.type === 'touchend') e.preventDefault();
        e.stopPropagation();
        inspectCard(card);
    };

    btn.addEventListener("click", handlePlay);
    btn.addEventListener("touchend", handlePlay);
    inspect.addEventListener("click", handleInspect);
    inspect.addEventListener("touchend", handleInspect);
    list.append(item);
  });
}

function renderWeapons(current) {
  const list = $("#weapon-list");
  const weapons = (current?.hand || []).filter((card) => card.type === "Arma");
  const selected = current?.selectedWeapons?.length || 0;
  $("#weapon-status").textContent = `${selected} seleccionadas`;
  list.innerHTML = "";
  if (!weapons.length) {
    list.innerHTML = "<p class=\"status\">No hay armas en tu mano. Puedes intentar explorar sin arma.</p>";
    return;
  }
    weapons.forEach((card) => {
    const selectedWeapon = current.selectedWeapons.some((weapon) => weapon.instanceId === card.instanceId);
    const usedUp = weaponUseCount(card) >= weaponUseLimit(current, card);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `card card-face weapon-select-card card-${card.art} ${selectedWeapon ? "selected-card" : ""} ${usedUp ? "used-card" : ""}`;
    button.disabled = usedUp && !selectedWeapon;
    button.setAttribute("aria-label", `${selectedWeapon ? "Quitar" : "Seleccionar"} ${card.name}`);
    button.style.position = "relative";
    button.innerHTML = `
      <button class="inspect-btn" type="button" style="top:2px; right:2px; width:18px; height:18px; font-size:8px; position:absolute; z-index:10;">🔍</button>
      ${cardFace(card, "weapon")}
    `;
    
    const handleSelect = (e) => {
        if (e.type === 'touchend') e.preventDefault();
        selectWeapon(card);
    };
    const handleInspect = (e) => {
        if (e.type === 'touchend') e.preventDefault();
        e.stopPropagation();
        inspectCard(card);
    };

    button.addEventListener("click", handleSelect);
    button.addEventListener("touchend", handleSelect);
    button.querySelector(".inspect-btn").addEventListener("click", handleInspect);
    button.querySelector(".inspect-btn").addEventListener("touchend", handleInspect);
    
    list.append(button);
  });
}

function renderPlayed(current) {
  const played = $("#played-cards");
  const cards = current?.played || [];
  $("#played-status").textContent = `${cards.length} cartas`;
  played.innerHTML = "";
  if (!cards.length) {
    played.innerHTML = "<p class=\"status\">Juega municion para sumar oro y municion este turno.</p>";
    return;
  }
  cards.forEach((card) => {
    const el = document.createElement("div");
    el.className = `card card-face played-turn-card card-${card.art}`;
    el.innerHTML = cardFace(card, "played");
    played.append(el);
  });
}

function renderLiveTrackers(current) {
  const mine = myPlayer();
  if (!mine) {
    ["health", "actions", "buys", "explores", "decorations", "damage", "gold", "ammo"].forEach((key) => {
      const el = $(`#live-${key}`);
      if (el) el.textContent = key === "health" ? "0/0" : "0";
    });
    return;
  }
  $("#live-health").textContent = `${mine.health}/${mine.maxHealth}`;
  $("#live-decorations").textContent = mine.decorations;
  const isMyTurnNow = isMyTurn();
  const liveValues = {
    actions: isMyTurnNow ? state.turn.actions : 0,
    buys: isMyTurnNow ? state.turn.buys : 0,
    explores: isMyTurnNow ? state.turn.explores : 0,
    damage: isMyTurnNow ? state.turn.damage : 0,
    gold: isMyTurnNow ? state.turn.gold : 0,
    ammo: isMyTurnNow ? state.turn.ammo : 0,
  };
  $("#live-actions").textContent = liveValues.actions;
  $("#live-buys").textContent = liveValues.buys;
  $("#live-explores").textContent = liveValues.explores;
  $("#live-damage").textContent = liveValues.damage;
  $("#live-gold").textContent = liveValues.gold;
  $("#live-ammo").textContent = liveValues.ammo;
}

function cardFace(card) {
  const stats = [
    card.damage ? `Dano ${card.damage}` : "",
    card.ammo ? `Ammo ${card.ammo}` : "",
    card.gold ? `Oro ${card.gold}` : "",
    card.ammoCost ? `Requiere ${card.ammoCost}` : "",
    card.health ? `Vida ${card.health}` : "",
    card.decorations ? `Medallas ${card.decorations}` : "",
    card.cost ? `Coste ${card.cost}` : "",
  ].filter(Boolean);
  const effect = card.text ? `<span>${card.text}</span>` : "";
  return `
    <div class="card-art" aria-hidden="true">${card.image ? `<img src="${card.image}" alt="" loading="lazy" />` : `<span>${cardIcon(card)}</span>`}</div>
    <div class="card-copy">
      <small>${card.type}</small>
      <strong>${card.name}</strong>
      <span>${stats.join(" / ") || "Efecto especial"}</span>
      ${effect}
    </div>
  `;
}

function actionEffectText(card) {
  const effects = [];
  if (card.damageBonus) effects.push(`+${card.damageBonus} dano`);
  if (card.ammoBonus) effects.push(`+${card.ammoBonus} municion`);
  if (card.goldBonus) effects.push(`+${card.goldBonus} oro`);
  if (card.extraAction) effects.push(`+${card.extraAction} accion`);
  if (card.extraBuy) effects.push(`+${card.extraBuy} compra`);
  if (card.extraExplore) effects.push(`+${card.extraExplore} explorar`);
  if (card.draw) effects.push(`roba ${card.draw}`);
  return effects.join(" / ") || card.text || "Efecto especial";
}

function characterPortrait(character, size = "large") {
  const initials = character.name.split(" ").map((part) => part[0]).join("");
  return `
    <div class="portrait portrait-${character.portrait} portrait-${size}" aria-hidden="true">
      ${character.image ? `<img src="${character.image}" alt="" loading="lazy" />` : ""}
      <span>${initials}</span>
    </div>
  `;
}

function cardIcon(card) {
  if (card.art === "ammo") return "AM";
  if (card.art === "action") return "AC";
  if (card.art === "handgun") return "HG";
  if (card.art === "knife") return "KN";
  if (card.art === "shotgun") return "SG";
  if (card.art === "boss") return "B";
  return "IN";
}

async function inviteFriend(friend) {
  const mode = getMode();
  if (!state.loggedIn) return notify("Inicia sesion", "Debes ingresar con una cuenta del sitio para invitar jugadores.", "error");
  const backend = getOnlineBackend();
  if (!backend || !friend.uid) return notify("Firebase requerido", "Las invitaciones online requieren usuarios reales de Firebase.", "error");
  const freshFriend = backend.getUser ? await backend.getUser(friend.uid) : friend;
  if (!freshFriend?.uid || !freshFriend.email) return notify("Invitado invalido", "Este usuario ya no existe en Firebase.", "error");
  if (!freshFriend.online) return notify("Jugador no disponible", `${freshFriend.name} no esta online o no desea recibir invitaciones.`, "error");
  if (state.players.length >= mode.max) return notify("Sala completa", "No hay espacio para mas jugadores en esta sala.", "error");
  if (state.players.some((player) => player.uid === freshFriend.uid || player.email === freshFriend.email)) {
    return notify("Ya esta en sala", `${freshFriend.name} ya participa en esta sala.`, "success");
  }
  await ensureOnlineRoom();
  if (state.roomId) {
    try {
      await backend.inviteToRoom(state.roomId, freshFriend, state.currentUser, { maxPlayers: mode.max });
      sound("card");
      await syncOnlineDirectory();
      notify("Invitacion enviada", `${freshFriend.name} puede aceptar o rechazar la sala.`, "success");
    } catch (error) {
      notify("Invitacion no enviada", error.message, "error");
    }
  }
}

async function acceptFriendInvitation(request) {
  const backend = getOnlineBackend();
  if (!backend?.acceptFriendRequest) return;
  try {
    await backend.acceptFriendRequest(request.id);
    notify("Amigo agregado", `${request.fromName} quedo en tu lista.`, "success");
    await syncOnlineDirectory();
  } catch (error) {
    notify("No se pudo aceptar", error.message, "error");
  }
}

async function rejectFriendInvitation(request) {
  const backend = getOnlineBackend();
  if (!backend?.rejectFriendRequest) return;
  try {
    await backend.rejectFriendRequest(request.id);
    notify("Solicitud rechazada", `${request.fromName} no fue agregado.`, "success");
  } catch (error) {
    notify("No se pudo rechazar", error.message, "error");
  }
}

async function acceptRoomInvitation(invitation) {
  const backend = getOnlineBackend();
  if (!backend || !state.currentUser?.uid) return;
  try {
    let room = null;
    if (backend.acceptRoomInvite) {
      try {
        room = await backend.acceptRoomInvite(invitation.id, state.currentUser);
      } catch (error) {
        if (!backend.joinRoomFromInvitation || !invitation.roomId) throw error;
      }
    }
    if (!room && backend.joinRoomFromInvitation && invitation.roomId) {
      room = await backend.joinRoomFromInvitation(invitation.roomId, state.currentUser, invitation);
    }
    if (room) {
      state.sessionType = room.sessionType || "friends";
      state.roomOwnerUid = room.ownerUid || "";
      state.roomId = room.id;
      state.entryDone = true;
      state.loggedIn = true;
      state.provider = state.currentUser.provider || "Correo";
      $("#mode").value = room.mode || $("#mode").value;
      populateScenarios();
      if (room.scenario) $("#scenario").value = room.scenario;
      $$("[data-session]").forEach((item) => item.classList.toggle("active", item.dataset.session === state.sessionType));
      syncPlayersFromRoom(room.players || []);
      if (room.gameState) applyRemoteGameState(room.gameState);
      if (room.chatMessages?.length) {
        renderChatMessages(room.chatMessages || []);
        if (backend.cleanupRoomChatCache && !cleanedChatRooms.has(room.id)) {
          cleanedChatRooms.add(room.id);
          backend.cleanupRoomChatCache(room.id).catch(() => {});
        }
      }
      $("#entry-screen").classList.add("hidden");
      document.body.classList.toggle("offline-mode", false);
      watchCurrentRoom();
      saveProgress();
      renderRoom();
      renderGame();
    }
    notify("Invitacion aceptada", `Entraste a la sala de ${invitation.fromName}.`, "success");
  } catch (error) {
    notify("No se pudo entrar", error.message, "error");
  }
}

async function rejectRoomInvitation(invitation) {
  const backend = getOnlineBackend();
  if (!backend?.rejectRoomInvite) return;
  try {
    await backend.rejectRoomInvite(invitation.id);
    notify("Invitacion rechazada", `No entraste a la sala de ${invitation.fromName}.`, "success");
  } catch (error) {
    notify("No se pudo rechazar", error.message, "error");
  }
}

async function handleSiteAuth(event) {
  event.preventDefault();
  const fullName = $("#site-fullname").value.trim();
  const birthdate = $("#site-birthdate").value || "2000-01-01";
  const age = Number($("#site-age").value || calculateAge(birthdate) || 18);
  const name = fullName || $("#site-name").value.trim() || $("#site-email").value.split("@")[0] || "Jugador";
  const email = $("#site-email").value.trim().toLowerCase();
  const password = $("#site-password").value;
  if (!email || !password) return;
  const profile = { name, email, password, birthdate, age, provider: "Correo", online: true };
  addEntryMessage("Conectando con Firebase...");
  const backend = await onlineBackendForAuth();
  if (!backend) {
    addEntryMessage("Firebase es obligatorio para jugar online con usuarios reales. Configura Firebase o usa Probar offline.");
    return;
  }
  if (state.authMode === "register") {
    if (password.length < 6) return addEntryMessage("La clave debe tener al menos 6 caracteres para Firebase.");
    try {
      const user = await backend.register(profile);
      mergeSiteUsers([user]);
      startEntry("Correo", user);
    } catch (error) {
      addEntryMessage(`No se pudo crear la cuenta en Firebase: ${error.message}`);
    }
    return;
  }
  try {
    const user = await backend.login(email, password);
    startEntry("Correo", user);
  } catch (error) {
    addEntryMessage(`No se pudo ingresar: ${error.message}. Debes usar una cuenta real de Firebase.`);
  }
}

function addEntryMessage(text) {
  $("#permission-note").textContent = text;
}

function fillRoom() {
  if (!state.entryDone) return;
  if (state.sessionType !== "offline") {
    notify("Sala online", "En online debes invitar amigos disponibles o emparejar con jugadores reales.", "error");
    return;
  }
  const mode = getMode();
  if (state.players.length === 0) state.players.push(createPlayer("Tu", false));
  const targetSize = state.sessionType === "offline" ? mode.max : mode.min;
  while (state.players.length < targetSize) {
    const name = state.sessionType === "offline" ? `Bot ${state.players.length}` : state.sessionType === "matchmaking" ? `Rival online ${state.players.length}` : `Bot invitado ${state.players.length}`;
    state.players.push(createPlayer(name, state.sessionType !== "matchmaking"));
  }
  notify("Sala completada", state.sessionType === "offline" ? `Bots agregados hasta el maximo: ${mode.max}.` : `Minimo requerido: ${mode.min}.`, "success");
  sound("card");
  renderRoom();
}

function resetRoom() {
  state.roomId = "";
  state.roomCreationPromise = null;
  state.roomOwnerUid = "";
  state.players = state.entryDone ? [{
    ...createPlayer("Tu", false),
    uid: state.currentUser?.uid || "",
    email: state.currentUser?.email || "",
  }] : [];
  state.started = false;
  state.activeIndex = 0;
  state.round = 0;
  state.turn = freshTurn();
  state.mansion = [];
  state.lastRevealed = null;
  state.resourceMarketOpen = false;
  state.matchRecorded = false;
  state.endVotes = {};
  state.startConfirmations = {};
  state.startRequest = null;
  state.lastStartPromptId = "";
  state.diceRoll = null;
    buildResourceArea();
  state.chatMessages = [];
  $("#chat-log").innerHTML = "";
  sound("click");
  notify("Sala nueva", "Se reinicio la sala.", "success");
  if (state.sessionType === "offline" && state.entryDone) {
    const mode = getMode();
    while (state.players.length < mode.max) {
      state.players.push(createPlayer(`Bot ${state.players.length}`, true));
    }
  }
  renderRoom();
  renderGame();
  if (state.loggedIn && state.sessionType !== "offline") ensureOnlineRoom();
}

async function startGame() {
  if (state.started) {
    notify("Ya estan jugando", "Termina tu partida antes de comenzar una nueva.", "error");
    return;
  }
  if (!canStart()) return;
  await ensureOnlineRoom();
  const backend = getOnlineBackend();
  if (state.roomId && backend?.getRoom) {
    try {
      const room = await backend.getRoom(state.roomId);
      if (room?.started || room?.status === "playing" || room?.gameState?.started) {
        notify("Partida activa", "Esta sala ya tiene una partida en juego. Deben terminarla antes de iniciar otra.", "error");
        if (room.gameState) applyRemoteGameState(room.gameState);
        renderRoom();
        renderGame();
        return;
      }
    } catch (error) {
      notify("Sala no verificada", error.message, "error");
      return;
    }
  }
  if (isOnlineRoomActive()) {
    await requestOnlineStartConfirmation();
    return;
  }
  await beginConfirmedGame();
}

async function beginConfirmedGame() {
  if (state.started) return;
  if (!canStart()) return;
  state.started = true;
  state.matchRecorded = false;
  state.endVotes = {};
  state.startConfirmations = {};
  state.startRequest = null;
  state.lastStartPromptId = "";
  state.diceRoll = null;
  state.lastPublishedState = "";
  state.round = 1;
  state.activeIndex = 0;
  state.turn = freshTurn();
  state.mansion = buildMansion();
  state.lastRevealed = null;
  refreshRandomCharacters();
  state.players.forEach((player) => {
    const deck = createStartingDeck();
    player.health = player.maxHealth;
    player.decorations = 0;
    player.defeatedPlayers = 0;
    player.deaths = 0;
    player.skipTurns = 0;
    player.eliminated = false;
    player.hand = deck.slice(0, 5);
    player.deck = deck.slice(5);
    player.discard = [];
    player.played = [];
    player.selectedWeapons = [];
    player.alive = true;
  });
  sound("card");
  addAchievement("Primera sala iniciada");
  notify("Partida iniciada", "Tirada inicial para definir quien comienza.", "success");
  renderRoom();
  hideStartConfirmModal();
  runOpeningDiceRoll();
  renderGame();
}

async function markCurrentUserOffline() {
  const user = state.currentUser;
  if (!user) return;
  user.online = false;
  mergeSiteUsers([user]);
  const backend = getOnlineBackend();
  if (backend && user.uid) {
    try {
      await backend.setAvailability(user.uid, false);
    } catch (error) {
      console.warn("No se pudo marcar usuario offline", error);
    }
  }
}

function removeUidFromGameState(gameState, uid) {
  if (!gameState || !uid) return gameState;
  const players = [...(gameState.players || [])];
  const removedIndex = players.findIndex((player) => player.uid === uid);
  const remainingPlayers = players.filter((player) => player.uid !== uid);
  const nextStarted = Boolean(gameState.started) && remainingPlayers.length > 1;
  let nextActiveIndex = Number(gameState.activeIndex || 0);
  if (removedIndex >= 0) {
    if (remainingPlayers.length === 0) nextActiveIndex = 0;
    else if (removedIndex < nextActiveIndex) nextActiveIndex -= 1;
    else if (removedIndex === nextActiveIndex) nextActiveIndex = Math.min(nextActiveIndex, remainingPlayers.length - 1);
  }
  return {
    ...gameState,
    started: nextStarted,
    players: remainingPlayers,
    activeIndex: Math.max(0, Math.min(nextActiveIndex, Math.max(remainingPlayers.length - 1, 0))),
    endVotes: Object.fromEntries(Object.entries(gameState.endVotes || {}).filter(([key]) => key !== uid)),
    startConfirmations: Object.fromEntries(Object.entries(gameState.startConfirmations || {}).filter(([key]) => key !== uid)),
    updatedBy: uid,
    updatedAt: Date.now(),
  };
}

async function leaveCurrentOnlineRoom(reason = "salio de su sesion") {
  const backend = getOnlineBackend();
  const user = state.currentUser;
  const roomId = state.roomId;
  if (!backend?.getRoom || !backend?.updateRoom || !roomId || !user?.uid || state.sessionType === "offline") return;
  try {
    const room = await backend.getRoom(roomId);
    if (!room?.players?.some((player) => player.uid === user.uid)) return;
    const displayName = user.name || myPlayer()?.name || "Jugador";
    if (backend.addRoomChat) {
      await backend.addRoomChat(roomId, {
        id: `leave-${user.uid}-${Date.now()}`,
        author: "Sistema",
        uid: user.uid,
        text: `El jugador ${displayName} ${reason}.`,
        type: "system",
        time: Date.now(),
      }).catch(() => {});
    }
    const remainingPlayers = (room.players || []).filter((player) => player.uid !== user.uid);
    const remainingUids = remainingPlayers.map((player) => player.uid).filter(Boolean);
    const nextGameState = removeUidFromGameState(room.gameState || roomGameState(), user.uid);
    const nextOwner = remainingPlayers[0] || null;
    await backend.updateRoom(roomId, {
      players: remainingPlayers,
      playerUids: remainingUids,
      ownerUid: nextOwner?.uid || "",
      ownerName: nextOwner?.name || "",
      gameState: nextGameState,
      started: Boolean(nextGameState?.started),
      status: nextGameState?.started ? "playing" : "waiting",
      startRequest: null,
      startConfirmations: {},
    });
  } catch (error) {
    notify("Salida no sincronizada", error.message, "error");
  }
}

async function returnHome(options = {}) {
  const { force = false, logout = true, returnToOnline = false } = options;
  if (state.started && !force && (!logout || state.sessionType === "offline")) {
    notify("Partida activa", "Termina tu partida antes de salir al inicio o cerrar sesion.", "error");
    return false;
  }
  stopTurnTimer();
  if (logout && !returnToOnline) {
    await leaveCurrentOnlineRoom();
    await markCurrentUserOffline();
  }
  state.entryDone = false;
  state.loggedIn = returnToOnline && state.loggedIn ? true : false;
  state.provider = returnToOnline ? state.provider : "";
  state.sessionType = "friends";
  if (logout && !returnToOnline) state.currentUser = null;
  if (logout && !returnToOnline) stopOnlineDirectoryRefresh();
  state.players = [];
  state.started = false;
  state.activeIndex = 0;
  state.round = 0;
  state.roomId = "";
  state.roomCreationPromise = null;
  state.roomOwnerUid = "";
  state.turn = freshTurn();
  state.mansion = [];
  state.lastRevealed = null;
  state.resourceMarketOpen = false;
  $("#chat-log").innerHTML = "";
  if (logout && !returnToOnline) {
    stopOnlineSubscriptions();
    state.pendingFriendRequests = [];
    state.pendingRoomInvitations = [];
    localStorage.removeItem("mdbg-current-user");
  }
  $("#entry-screen").classList.remove("hidden");
  document.body.classList.remove("offline-mode");
  $$("[data-session]").forEach((item) => {
    item.hidden = false;
    item.classList.toggle("active", item.dataset.session === "friends");
  });
  renderAuth();
  renderRoom();
  renderGame();
  notify(logout ? "Sesion cerrada" : "Volviste al inicio", "Puedes ingresar con tu cuenta o probar offline nuevamente.", "success");
  return true;
}

function protectNavigationDuringMatch() {
  try {
    if (!history.state?.mdbgGuard) {
      history.replaceState({ mdbgGuard: true }, "");
      history.pushState({ mdbgGuard: true }, "");
    }
  } catch (error) {
    console.warn("No se pudo preparar bloqueo de navegacion", error);
  }
}

window.addEventListener("beforeunload", (event) => {
  if (!state.started) return;
  event.preventDefault();
  event.returnValue = "";
});

window.addEventListener("popstate", async () => {
  if (state.started) {
    protectNavigationDuringMatch();
    notify("Partida activa", "No se puede salir con atras mientras la partida sigue en curso.", "error");
    return;
  }
  if (state.entryDone) {
    await returnHome({ logout: true });
    protectNavigationDuringMatch();
  }
});

function startTurnTimer() {
  if (isOpeningRollActive()) return;
  clearInterval(state.turnTimerId);
  state.turnEndsAt ||= Date.now() + 4 * 60 * 1000;
  state.turnTimerId = setInterval(() => {
    renderTurnTimer();
    if (state.started && Date.now() >= state.turnEndsAt) {
      if (isOnlineRoomActive() && !isMyTurn()) return;
      notify("Turno finalizado", "Se agotaron los 4 minutos del turno.", "error");
      endTurn(true);
    }
  }, 1000);
}

function stopTurnTimer() {
  clearInterval(state.turnTimerId);
  state.turnTimerId = null;
  state.turnEndsAt = null;
}

function currentPlayer() {
  return state.players[state.activeIndex] || state.players.find((player) => !player.eliminated);
}

function playHandCard(instanceId) {
  if (!state.started) return;
  if (!requireMyTurn()) return;
  const player = currentPlayer();
  const card = player.hand.find((item) => item.instanceId === instanceId);
  if (!card) return;
  playAudio("resident-evil-2-inventario.mp3", 0.8);
  if (card.type === "Municion") {
    notify(card.name, `Ya genero ${card.gold || 0} oro y ${card.ammo || 0} municion al salir en tu mano.`);
    sound("card");
    renderGame();
    return;
  }
  if (card.type === "Accion") {
    if (state.turn.actions <= 0) return notify("No puedes jugar accion", "No quedan acciones este turno.", "error");
    if (card.id === "action9" && !playItemManagement(player, card)) return;
    state.turn.actions -= 1;
    state.turn.actionsPlayed += 1;
    state.turn.damage += card.damageBonus || 0;
    state.turn.gold += card.goldBonus || 0;
    state.turn.ammo += card.ammoBonus || 0;
    state.turn.buys += card.extraBuy || 0;
    state.turn.explores += card.extraExplore || 0;
    state.turn.actions += card.extraAction || 0;
    if (card.draw) drawCards(player, card.draw);
    notify(card.name, card.text || "Efecto aplicado.", "success");
  } else if (card.type === "Arma") {
    return selectWeapon(card);
  } else if (card.type === "Objeto") {
    useSpecificItem(card);
  }
  player.hand = player.hand.filter((item) => item.instanceId !== instanceId);
  player.played.push(card);
  const gain = card.type === "Municion" ? ` (+${card.gold || 0} oro, +${card.ammo || 0} municion)` : "";
  notify(card.name, `${card.type} usada${gain}.`, "success");
  addAchievement("Primera carta jugada");
  sound("card");
  renderGame();
}

function selectWeapon(card) {
  if (!requireMyTurn()) return;
  const player = currentPlayer();
  playAudio("resident-evil-2-inventario.mp3", 0.8);
  if (player.selectedWeapons.some((weapon) => weapon.instanceId === card.instanceId)) {
    player.selectedWeapons = player.selectedWeapons.filter((weapon) => weapon.instanceId !== card.instanceId);
    state.turn.ammo += card.ammoCost || 0;
    state.turn.weaponAmmoSpent = Math.max(0, state.turn.weaponAmmoSpent - (card.ammoCost || 0));
    state.turn.damage = Math.max(0, state.turn.damage - weaponDamage(card));
    state.turn.explores = Math.max(0, state.turn.explores - (card.extraExplore || 0));
    notify("Arma retirada", `${card.name} ya no se usara en este ataque.`);
    renderGame();
    return;
  }
  if (weaponUseCount(card) >= weaponUseLimit(player, card)) {
    notify("Arma ya usada", `${card.name} ya fue usada en una exploracion de este turno.`, "error");
    return;
  }
  if (state.turn.ammo < (card.ammoCost || 0)) {
    notify("Municion insuficiente", `${card.name} requiere ${card.ammoCost || 0} de municion. Disponible: ${state.turn.ammo}.`, "error");
    return;
  }
  state.turn.ammo -= card.ammoCost || 0;
  state.turn.weaponAmmoSpent += card.ammoCost || 0;
  state.turn.damage += weaponDamage(card);
  state.turn.explores += card.extraExplore || 0;
  player.selectedWeapons.push(card);
  notify("Arma seleccionada", `${card.name}: +${weaponDamage(card)} dano. Coste: ${card.ammoCost || 0} municion.`, "success");
  if (card.id === "grenade" && state.players.length > 1) {
    state.players
      .filter((target) => target !== player)
      .forEach((target) => {
        target.health = Math.max(0, target.health - (card.splash || 0));
      });
    notify("Efecto de granada", "Hace dano adicional a otros jugadores.", "success");
  }
  sound("card");
  renderGame();
}

function weaponUseCount(card) {
  return state.turn.weaponUses?.[card.instanceId || card.id] || 0;
}

function weaponUseLimit(player, card) {
  const activeText = cleanText(activeCharacterLevel(player)?.text || "").toLowerCase();
  if (card.weaponClass === "pistola" && activeText.includes("pistola") && activeText.includes("dos veces")) return 2;
  if (activeText.includes("armas") && activeText.includes("dos veces")) return 2;
  return 1;
}

function markSelectedWeaponsUsed(player) {
  state.turn.weaponUses ||= {};
  (player.selectedWeapons || []).forEach((weapon) => {
    const key = weapon.instanceId || weapon.id;
    state.turn.weaponUses[key] = (state.turn.weaponUses[key] || 0) + 1;
  });
}

function returnCardToResource(card) {
  const pile = state.resourceArea.find((item) => item.card.id === card.id);
  if (pile) pile.count += 1;
}

function resolveUsedWeaponsAfterExplore(player) {
  const used = [...(player.selectedWeapons || [])];
  const usedDamage = used.reduce((total, weapon) => total + weaponDamage(weapon), 0);
  markSelectedWeaponsUsed(player);
  const activeText = cleanText(activeCharacterLevel(player)?.text || "").toLowerCase();
  const keepExplosive = activeText.includes("explosiva") && activeText.includes("descarte");
  used.forEach((weapon) => {
    const isExplosive = weapon.explosive || weapon.id === "grenade" || weapon.id === "rocket";
    if (!isExplosive) return;
    player.hand = player.hand.filter((card) => card.instanceId !== weapon.instanceId);
    
    if (weapon.id === "rocket") {
      // Lógica especial Rocket Launcher: barajar Rocket Launcher Case en la mansión
      state.mansion = shuffle([...state.mansion, cloneCard(catalog.rocket)]);
      notify("Rocket Launcher agotado", "Se ha barajado un 'Rocket Launcher Case' en la mansion.", "warning");
      // La carta original se pierde (no va a descarte ni a recursos)
      return;
    }

    if (keepExplosive) player.discard.push(weapon);
    else returnCardToResource(weapon);
  });
  player.selectedWeapons = [];
  state.turn.weaponAmmoSpent = 0;
  state.turn.weaponDamageBonus = 0;
  state.turn.damage = Math.max(0, state.turn.damage - usedDamage);
}

function weaponDamage(card) {
  let damage = card.damage || 0;
  if (card.id === "rocket") damage = 90; // Daño fijo de 90 solicitado
  if (card.damagePerAmmo) damage = Math.floor((state.turn.autoAmmo || 0) / card.damagePerAmmo.step) * card.damagePerAmmo.damage;
  if (card.damageXAmmo && card.id !== "rocket") damage = state.turn.autoAmmo || 0;
  if (card.id === "burstHandgun" && currentPlayer()?.selectedWeapons?.length > 0) damage += 20;
  if (card.id === "fullBoreMachineGun" && state.turn.ammo + state.turn.weaponAmmoSpent > 100) damage += 30;
  if (card.id === "semiRifle") damage += (state.turn.actionsPlayed || 0) * 10;
  return damage + (state.turn.weaponDamageBonus || 0);
}

function drawCards(player, amount) {
  const drawn = [];
  state.turn.drawAnimation = amount;
  for (let i = 0; i < amount; i += 1) {
    if (player.deck.length === 0) {
      player.deck = shuffle(player.discard);
      player.discard = [];
    }
    const card = player.deck.shift();
    if (card) {
      player.hand.push(card);
      drawn.push(card);
    }
  }
  applyAmmoResourcesFromCards(player, drawn);
  setTimeout(() => {
    state.turn.drawAnimation = 0;
    renderGame();
  }, 650);
}

function addCardToResource(card) {
  const pile = state.resourceArea.find((item) => item.card.id === card.id);
  if (pile) pile.count += 1;
}

function takeResourceCardById(id) {
  const pile = state.resourceArea.find((item) => item.card.id === id && item.count > 0);
  if (!pile) return null;
  pile.count -= 1;
  return cloneCard(pile.card);
}

function playItemManagement(player) {
  const ammoCards = player.hand.filter((card) => card.type === "Municion");
  const upgradeable = ammoCards.filter((card) => card.id === "ammo10" || card.id === "ammo20");
  if (!upgradeable.length) {
    window.alert("Item Management no se puede usar: solo tienes Ammo x30 o no tienes municion disponible para devolver.");
    notify("Item Management bloqueada", "Necesitas devolver Ammo x10 o Ammo x20 para obtener una municion superior.", "error");
    return false;
  }
  const choice = upgradeable.length === 1
    ? upgradeable[0]
    : upgradeable.find((card) => window.confirm(`¿Devolver ${card.name} al area de recursos?`)) || null;
  if (!choice) return false;
  const nextId = choice.id === "ammo10" ? "ammo20" : "ammo30";
  player.hand = player.hand.filter((card) => card.instanceId !== choice.instanceId);
  addCardToResource(choice);
  const gained = takeResourceCardById(nextId) || cloneCard(catalog[nextId]);
  player.discard.push(gained);
  notify("Item Management", `Devuelves ${choice.name} y ganas ${gained.name} al descarte.`, "success");
  return true;
}

function playAction() {
  if (!state.started) return;
  if (!requireMyTurn()) return;
  const actions = currentPlayer().hand.filter((card) => card.type === "Accion");
  if (actions.length > 1) return notify("Selecciona accion", "Tienes varias acciones. Elige la carta exacta en Acciones en mano.", "error");
  const action = actions[0];
  if (!action) return notify("Sin acciones", "No tienes cartas de accion en la mano.", "error");
  playHandCard(action.instanceId);
}

function buyResource(index) {
  if (!state.started) return;
  if (typeof index === "number" && !requireMyTurn()) return;
  if (typeof index !== "number") {
    playAudio("welcome.mp3", 0.8);
    state.resourceMarketOpen = !state.resourceMarketOpen;
    if (state.resourceMarketOpen) randomizeMarketOrder();
    sound("click");
    renderResources();
    return;
  }
  const player = currentPlayer();
  const pile = state.resourceArea[index];
  if (!pile || pile.count <= 0) return;
  state.selectedResource = index;
  if (["gatling", "rocket"].includes(pile.card.id)) return notify("Carta no comprable", "WE-007 y WE-008 solo se obtienen desde la mansion.", "error");
  if (state.turn.buys <= 0) return notify("No puedes comprar", "No quedan compras este turno.", "error");
  if (state.turn.gold < pile.card.cost) return notify("Oro insuficiente", `Necesitas ${pile.card.cost} oro para ${pile.card.name}. Disponible: ${state.turn.gold}.`, "error");
  const confirmText = `¿Estás seguro de comprar ${pile.card.name} por ${pile.card.cost} oro?\n\nOro disponible: ${state.turn.gold}\nCompras disponibles: ${state.turn.buys}\n\nLa carta irá a tu descarte.`;
  if (!window.confirm(confirmText)) {
    return;
  }
  state.turn.buys -= 1;
  state.turn.gold -= pile.card.cost;
  pile.count -= 1;
  player.discard.push(cloneCard(pile.card));
  notify("Carta comprada", `${pile.card.name} va a tu descarte. Quedan ${pile.count}.`, "success");
  addAchievement("Primer recurso comprado");
  playAudio("thank-you-mp3.mp3", 0.85);
  sound("card");
  renderGame();
}

function explore() {
  if (!state.started) return;
  if (!requireMyTurn()) return;
  if (state.turn.explores <= 0) return notify("No puedes explorar", "No quedan exploraciones este turno.", "error");
  const player = currentPlayer();
  const hasWeapons = player.hand.some((card) => card.type === "Arma");
  if (!player.selectedWeapons.length && hasWeapons) {
    const attackWithoutWeapon = window.confirm("Tienes armas disponibles para seleccionar. ¿Estas seguro que deseas atacar sin usar arma?");
    if (!attackWithoutWeapon) {
      notify("Selecciona arma", "Elige un arma disponible para atacar o vuelve a explorar y confirma ataque sin arma.", "error");
      return;
    }
  }
  if (!player.selectedWeapons.length && !hasWeapons && !state.allowUnarmedExplore) {
    state.allowUnarmedExplore = true;
    notify("Explorar sin arma", "No tienes armas en mano. Vuelve a pulsar Explorar para confirmar que deseas revelar la mansion sin dano.", "error");
    return;
  }
  if (!validateWeaponRequirements(player)) return;
  if (getModeKey() === "versus") return attackVersus();
  if (state.mansion.length === 0) return finishGameByScore("La mansion se agoto.");

  const revealed = state.mansion.shift();
  state.lastRevealed = revealed;
  state.turn.explores -= 1;
  if (revealed.nemesis) playAudio("stars.mp3", 0.95);
  sound(revealed.boss ? "hit" : "explore");

  if (revealed.type === "Bonus") {
    state.round = Math.max(1, state.round - (revealed.bonusTurns || 0));
    player.decorations += revealed.decorations || 0;
    notify("Bonus de mansion", `${player.name} obtuvo ${revealed.name}.`, "success");
  } else if (revealed.type === "Objeto") {
    if (revealed.mansionItem && catalog[revealed.mansionItem]) player.discard.push(cloneCard(catalog[revealed.mansionItem]));
    player.decorations += revealed.decorations || 0;
    notify("Objeto de mansion", `${revealed.name} va al descarte de ${player.name}.`, "success");
  } else if (state.turn.damage >= revealed.health) {
    player.decorations += revealed.decorations;
    if (revealed.boss && player.character.name === "Sheva Alomar") player.decorations += 1;
    notify("Infectado derrotado", `${player.name} derroto ${revealed.name} con ${state.turn.damage} de dano.`, "success");
    addAchievement("Primer infectado derrotado");
    playAudio("matalo.mp3", 0.9);
    if (revealed.boss) {
      playAudio("game over.mp3", 0.9);
      finishGameByScore(`${revealed.name} fue derrotado.`);
    }
  } else {
    player.health = Math.max(0, player.health - revealed.damage);
    state.mansion.push(revealed);
    notify("Dano recibido", `${player.name} recibe ${revealed.damage}. ${revealed.name} vuelve al final del mazo.`, "error");
    playAudio("resident-evil-dead-caddicarus.mp3", 0.9);
    if (player.health <= 0) handlePlayerDeath(player, revealed.name);
  }
  resolveUsedWeaponsAfterExplore(player);
  renderGame();
}

function validateWeaponRequirements(player) {
  if (!player.selectedWeapons.length) return true;
  const required = player.selectedWeapons.reduce((total, weapon) => total + (weapon.ammoCost || 0), 0);
  const availableForWeapons = state.turn.ammo + state.turn.weaponAmmoSpent;
  if (required > availableForWeapons) {
    notify(
      "Municion insuficiente",
      `Las armas seleccionadas requieren ${required} municion y solo tienes ${availableForWeapons}. Retira armas o genera mas municion.`,
      "error",
    );
    return false;
  }
  if (state.turn.weaponAmmoSpent < required) {
    notify(
      "Requerimiento no pagado",
      `Debes pagar ${required} municion para usar las armas seleccionadas antes de atacar.`,
      "error",
    );
    return false;
  }
  return true;
}

function attackVersus() {
  const attacker = currentPlayer();
  const target = state.players[Number($("#versus-target").value)] || state.players.find((player) => player !== attacker && player.alive);
  if (!target) return;
  state.turn.explores -= 1;
  const hit = Math.max(0, state.turn.damage);
  target.health = Math.max(0, target.health - hit);
  notify("Ataque versus", `${attacker.name} ataco a ${target.name} por ${hit} de dano.`, "success");
  if (target.health <= 0) {
    attacker.decorations += 1;
    attacker.defeatedPlayers += 1;
    handlePlayerDeath(target, attacker.name);
    notify("Personaje derrotado", `${attacker.name} gana 1 condecoracion.`, "success");
    if (attacker.decorations >= 3) finishGameByScore(`${attacker.name} alcanzo 3 condecoraciones.`);
  }
  resolveUsedWeaponsAfterExplore(attacker);
  sound("hit");
  renderGame();
}

function handlePlayerDeath(player, source = "dano") {
  if (player.eliminated) return;
  player.deaths = (player.deaths || 0) + 1;
  player.health = 0;
  player.alive = false;
  player.selectedWeapons = [];
  player.discard.push(...player.hand, ...player.played);
  player.hand = [];
  player.played = [];

  if (player.deaths >= 3) {
    player.eliminated = true;
    player.skipTurns = Infinity;
    notify("Jugador eliminado", `${player.name} murio por tercera vez. Su juego se acabo.`, "error");
    if (player.name === "Tu") {
      recordMatchResult("loss", "Tu personaje murio tres veces.", state.players.find((item) => item.name !== "Tu" && !item.eliminated));
      showGameOverModal();
    }
    checkRemainingPlayers();
    return;
  }

  player.skipTurns = 2;
  notify("Personaje caido", `${player.name} cae por ${source}. Pierde 2 turnos y luego revive con -20 de vida.`, "error");
}

function revivePlayer(player) {
  player.maxHealth = Math.max(10, player.maxHealth - 20);
  player.health = player.maxHealth;
  player.alive = true;
  player.skipTurns = 0;
  player.hand = drawHand(player);
  notify("Personaje revivido", `${player.name} revive con ${player.health} de vida maxima.`, "success");
}

function showGameOverModal() {
  $("#game-over-modal").classList.remove("hidden");
  playAudio("game over.mp3", 0.9);
}

function checkRemainingPlayers() {
  const active = state.players.filter((player) => !player.eliminated);
  if (state.started && active.length <= 1) finishGameByScore("Solo queda un jugador activo.");
}

function voteEligiblePlayers() {
  return state.players.filter((player) => !player.eliminated && !player.isBot && (player.uid || !isOnlineRoomActive()));
}

function endVoteKey() {
  return state.currentUser?.uid || myPlayer()?.name || "local";
}

function hasVotedToEnd() {
  return Boolean(state.endVotes?.[endVoteKey()]);
}

function requestEndGameVote() {
  if (!state.started) return;
  const key = endVoteKey();
  state.endVotes ||= {};
  state.endVotes[key] = {
    name: state.currentUser?.name || myPlayer()?.name || "Jugador",
    time: Date.now(),
  };
  const eligible = voteEligiblePlayers();
  const total = Math.max(1, eligible.length);
  const votes = eligible.filter((player) => state.endVotes[player.uid || player.name]).length;
  notify("Voto registrado", `Terminar partida: ${votes}/${total} votos.`, "success");
  checkEndGameVote();
  renderGame();
  schedulePublishRoomState();
}

function checkEndGameVote() {
  if (!state.started) return false;
  const eligible = voteEligiblePlayers();
  if (!eligible.length) return false;
  const allAccepted = eligible.every((player) => state.endVotes?.[player.uid || player.name]);
  if (!allAccepted) return false;
  finishGameByScore("Todos los jugadores aceptaron terminar la partida.");
  return true;
}

function refreshPendingEndVotes() {
  if (!state.started || !state.endVotes || !Object.keys(state.endVotes).length) return;
  checkEndGameVote();
  renderTurnControls();
}

function useItem() {
  if (!state.started) return;
  if (!requireMyTurn()) return;
  const item = currentPlayer().hand.find((card) => card.type === "Objeto");
  if (!item) return notify("Sin objetos", "No tienes objetos en la mano.", "error");
  playHandCard(item.instanceId);
}

function useSpecificItem(card) {
  const player = currentPlayer();
  if (card.fullHeal) player.health = player.maxHealth;
  if (card.heal) player.health = Math.min(player.maxHealth, player.health + card.heal);
  if (card.maxHeal) {
    player.maxHealth += card.maxHeal;
    player.health = Math.min(player.maxHealth, player.health + card.maxHeal);
  }
}

function applyCharacterAbilityText(player, text) {
  const source = cleanText(text).toLowerCase();
  let applied = 0;
  const numberFor = (pattern) => {
    const match = source.match(pattern);
    return match ? Number(match[1]) : 0;
  };
  const add = (key, value) => {
    if (!value) return;
    state.turn[key] += value;
    applied += 1;
  };
  const selectedWeaponBonus = numberFor(/\+(\d+)\s*dano/);
  if (selectedWeaponBonus && source.includes("arma") && (source.includes("seleccionada") || source.includes("selecionada"))) {
    if (!player.selectedWeapons?.length) {
      notify("Selecciona arma", "Esta habilidad necesita que primero selecciones un arma.", "error");
      return 0;
    }
    state.turn.weaponDamageBonus += selectedWeaponBonus;
    state.turn.damage += selectedWeaponBonus;
    return 1;
  }
  const heal = numberFor(/cura(?:r|ndo)?\s*(\d+)/);
  if (heal) {
    player.health = Math.min(player.maxHealth, player.health + heal);
    applied += 1;
  }
  add("ammo", numberFor(/\+(\d+)\s*municion/));
  add("gold", numberFor(/\+(\d+)\s*oro/));
  add("damage", numberFor(/\+(\d+)\s*dano/));
  add("actions", numberFor(/\+(\d+)\s*accion/));
  add("buys", numberFor(/\+(\d+)\s*compra/));
  add("explores", numberFor(/\+(\d+)\s*exploracion/));
  add("ammo", -numberFor(/-(\d+)\s*municion/));
  add("gold", -numberFor(/-(\d+)\s*oro/));
  add("damage", -numberFor(/-(\d+)\s*dano/));
  add("actions", -numberFor(/-(\d+)\s*accion/));
  add("buys", -numberFor(/-(\d+)\s*compra/));
  add("explores", -numberFor(/-(\d+)\s*exploracion/));
  const draw = numberFor(/roba\s*(\d+)/);
  if (draw) {
    drawCards(player, draw);
    applied += 1;
  }
  ["ammo", "gold", "damage", "actions", "buys", "explores"].forEach((key) => {
    state.turn[key] = Math.max(0, state.turn[key]);
  });
  return applied;
}

function useCharacterEffect() {
  if (!state.started) return;
  if (!requireMyTurn()) return;
  const player = currentPlayer();
  if (state.turn.characterUsed) return notify("Efecto ya usado", "El efecto del personaje ya fue usado este turno.", "error");
  const activeLevel = activeCharacterLevel(player);
  if (!activeLevel) {
    const nextLevel = nextCharacterLevel(player);
    const requirement = nextLevel ? `${nextLevel.min} medallas` : "mas medallas";
    return notify("Habilidad bloqueada", `Necesitas ${requirement} para activar la habilidad del personaje.`, "error");
  }
  state.turn.characterUsed = true;
  const applied = applyCharacterAbilityText(player, activeLevel.text);
  const message = applied
    ? `${player.character.name} nivel ${activeLevel.level}: habilidad aplicada.`
    : `${player.character.name} nivel ${activeLevel.level}: ${activeLevel.text}`;
  notify("Efecto de personaje", message, applied ? "success" : "info");
  sound("click");
  renderGame();
}

function endTurn(auto = false) {
  if (!state.started) return;
  if (!auto && !requireMyTurn()) return;
  const player = currentPlayer();

  // Detect if discard needs shuffling into deck before drawing new hand
  const willShuffle = player && !player.eliminated && player.alive &&
    (player.deck.length < 5 && player.discard.length > 0);

  if (!player.eliminated && player.alive) {
    player.discard.push(...player.hand, ...player.played);
    player.played = [];
    player.selectedWeapons = [];
    player.hand = drawHand(player);
  }

  // Cierra la carta de mansion al terminar el turno
  state.lastRevealed = null;

  advanceToNextTurn();
  state.turn = freshTurn();
  state.turn.drawAnimation = currentPlayer()?.hand?.length || 0;
  if (willShuffle) {
    state.turn.shuffleAnimation = true;
  }
  state.turnEndsAt = Date.now() + 4 * 60 * 1000;
  applyHandResources(currentPlayer());

  if (getModeKey() === "mercenary" && state.round > modes.mercenary.turnLimit) return finishGameByScore("El tiempo mercenario termino.");

  if (!auto) notify("Turno finalizado", `Ahora juega ${currentPlayer().name}.`);
  startTurnTimer();
  renderGame();
  window.setTimeout(() => {
    state.turn.drawAnimation = 0;
    state.turn.shuffleAnimation = false;
    renderGame();
  }, 900);
  if (currentPlayer()?.isBot) window.setTimeout(botTurn, 700);
  // Mostrar alerta de turno si es el turno del jugador local
  if (isMyTurn() && !currentPlayer()?.isBot) {
    window.setTimeout(() => showTurnAlert(currentPlayer()), 300);
  }
}

/* ── Alerta de inicio de turno ────────────────────────────── */
function showTurnAlert(player) {
  const overlay = document.getElementById("turn-alert");
  const playerLabel = document.getElementById("turn-alert-player");
  const closeBtn = document.getElementById("turn-alert-close");
  const alertAudio = document.getElementById("turn-alert-audio");
  if (!overlay) return;

  playerLabel.textContent = player?.name ? `Jugador: ${player.name}` : "";
  overlay.classList.remove("hidden");

  // Reproducir sonido en loop hasta cerrar
  if (alertAudio && state.sound && state.gameVolume > 0) {
    alertAudio.volume = Math.min(1, Math.max(0, (state.gameVolume || 75) / 100));
    alertAudio.currentTime = 0;
    alertAudio.play().catch(() => {});
  }

  function closeTurnAlert() {
    overlay.classList.add("hidden");
    if (alertAudio) {
      alertAudio.pause();
      alertAudio.currentTime = 0;
    }
    closeBtn.removeEventListener("click", closeTurnAlert);
    overlay.removeEventListener("click", handleOverlayClick);
  }

  function handleOverlayClick(e) {
    if (e.target === overlay) closeTurnAlert();
  }

  closeBtn.addEventListener("click", closeTurnAlert);
  overlay.addEventListener("click", handleOverlayClick);
}

function advanceToNextTurn() {
  const total = state.players.length;
  let guard = 0;
  do {
    state.activeIndex = (state.activeIndex + 1) % total;
    if (state.activeIndex === 0) state.round += 1;
    const next = currentPlayer();
    if (next.eliminated) {
      guard += 1;
      continue;
    }
    if (next.skipTurns > 0) {
      next.skipTurns -= 1;
      notify("Turno perdido", `${next.name} esta caido y pierde este turno.`, "error");
      if (next.skipTurns === 0) revivePlayer(next);
      guard += 1;
      continue;
    }
    break;
  } while (guard < total * 3);
  checkRemainingPlayers();
}

function drawHand(player) {
  let source = [...player.deck];
  if (source.length < 5) {
    source = shuffle([...source, ...player.discard]);
    player.discard = [];
  }
  player.deck = source.slice(5);
  return source.slice(0, 5);
}

function applyHandResources(player) {
  if (!player) return;
  applyAmmoResourcesFromCards(player, player.hand);
}

function applyAmmoResourcesFromCards(player, cards) {
  const ammoCards = cards.filter((card) => card.type === "Municion");
  const gold = ammoCards.reduce((total, card) => total + (card.gold || 0), 0);
  const ammo = ammoCards.reduce((total, card) => total + (card.ammo || 0), 0);
  state.turn.gold += gold;
  state.turn.ammo += ammo;
  state.turn.autoGold += gold;
  state.turn.autoAmmo += ammo;
  state.allowUnarmedExplore = false;
  if (gold || ammo) notify("Municion en mano", `${player.name} recibe +${gold} oro y +${ammo} municion.`, "success");
}

function botTurn() {
  if (!state.started || !currentPlayer()?.isBot || currentPlayer().eliminated || !currentPlayer().alive) return;
  const bot = currentPlayer();
  bot.hand.filter((card) => ["Accion"].includes(card.type)).slice(0, 1).forEach((card) => {
    if (bot.hand.includes(card)) playHandCard(card.instanceId);
  });
  bot.hand.filter((card) => card.type === "Arma").forEach((card) => {
    if (state.turn.ammo >= (card.ammoCost || 0) && !bot.selectedWeapons.some((weapon) => weapon.instanceId === card.instanceId)) {
      selectWeapon(card);
    }
  });
  if (state.started) explore();
  if (state.started) endTurn();
}

function finishGameByScore(reason) {
  const winner = [...state.players].sort((a, b) => b.decorations - a.decorations || b.health - a.health)[0];
  state.started = false;
  state.endVotes = {};
  stopTurnTimer();
  recordMatchResult(winner.name === "Tu" ? "win" : "loss", reason, winner);
  addAchievement("Partida finalizada");
  if (winner.name === "Tu") addAchievement("Victoria guardada");
  saveProgress();
  sound("win");
  renderAchievements();
  showWinnerAlert(winner, reason);
  refreshRandomCharacters();
  renderRoom();
  renderGame();
  notify("Personajes renovados", "La sala quedo lista con personajes aleatorios nuevos.", "success");
}

function showWinnerAlert(winner, reason) {
  const overlay = document.getElementById("winner-alert");
  if (!overlay) return;

  document.getElementById("winner-alert-reason").textContent = reason || "";
  document.getElementById("winner-alert-name").textContent =
    winner.name === "Tu" ? "¡Tú eres el ganador!" : `Ganador: ${winner.name}`;

  const statsEl = document.getElementById("winner-alert-stats");
  statsEl.innerHTML = `
    <div class="winner-stat">
      <span class="winner-stat-value">${winner.health}/${winner.maxHealth}</span>
      <span class="winner-stat-label">Vida</span>
    </div>
    <div class="winner-stat">
      <span class="winner-stat-value">${winner.decorations}</span>
      <span class="winner-stat-label">Medallas</span>
    </div>
    <div class="winner-stat">
      <span class="winner-stat-value">${winner.deaths || 0}</span>
      <span class="winner-stat-label">Muertes</span>
    </div>
    <div class="winner-stat">
      <span class="winner-stat-value">${winner.defeatedPlayers || 0}</span>
      <span class="winner-stat-label">Rivales</span>
    </div>
  `;

  overlay.classList.remove("hidden");

  const closeBtn = document.getElementById("winner-alert-close");
  function closeWinnerAlert() {
    overlay.classList.add("hidden");
    closeBtn.removeEventListener("click", closeWinnerAlert);
  }
  closeBtn.addEventListener("click", closeWinnerAlert);
}

function voiceConnectionId(uidA, uidB) {
  return [uidA, uidB].sort().join("_");
}

function remoteVoiceAudio(id) {
  let audio = document.getElementById(`voice-${id}`);
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = `voice-${id}`;
    audio.autoplay = true;
    audio.playsInline = true;
    audio.hidden = true;
    document.body.append(audio);
  }
  return audio;
}

function createVoicePeer(connectionId, remoteUid) {
  if (state.voicePeers[connectionId]) return state.voicePeers[connectionId];
  const backend = getOnlineBackend();
  const peer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
  state.voiceStream?.getTracks?.().forEach((track) => peer.addTrack(track, state.voiceStream));
  peer.ontrack = (event) => {
    const audio = remoteVoiceAudio(remoteUid);
    audio.srcObject = event.streams[0];
    audio.volume = Math.min(1, Math.max(0, state.gameVolume / 100));
    audio.play().catch(() => notify("Voz recibida", "Toca la pantalla una vez si el navegador bloqueo la reproduccion.", "error"));
  };
  peer.onicecandidate = (event) => {
    if (!event.candidate || !backend?.addVoiceCandidate) return;
    backend.addVoiceCandidate(state.roomId, connectionId, {
      fromUid: state.currentUser.uid,
      candidate: event.candidate.toJSON(),
    }).catch(() => {});
  };
  state.voicePeers[connectionId] = peer;
  return peer;
}

async function handleVoiceConnections(connections) {
  const backend = getOnlineBackend();
  if (!backend || !state.voiceStream || !state.currentUser?.uid) return;
  for (const connection of connections) {
    const remoteUid = connection.participants.find((uid) => uid !== state.currentUser.uid);
    if (!remoteUid) continue;
    const peer = createVoicePeer(connection.id, remoteUid);
    if (connection.offer && connection.fromUid !== state.currentUser.uid && !peer.remoteDescription) {
      await peer.setRemoteDescription(new RTCSessionDescription(connection.offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      await backend.answerVoiceOffer(state.roomId, connection.id, answer.toJSON());
    }
    if (connection.answer && connection.fromUid === state.currentUser.uid && !peer.remoteDescription) {
      await peer.setRemoteDescription(new RTCSessionDescription(connection.answer));
    }
    state.voiceCandidatesSeen[connection.id] ||= new Set();
    for (const item of connection.candidates || []) {
      const key = JSON.stringify(item);
      if (item.fromUid === state.currentUser.uid || state.voiceCandidatesSeen[connection.id].has(key)) continue;
      state.voiceCandidatesSeen[connection.id].add(key);
      if (item.candidate) await peer.addIceCandidate(new RTCIceCandidate(item.candidate)).catch(() => {});
    }
  }
}

async function startRoomVoice() {
  const backend = getOnlineBackend();
  if (!backend?.watchVoiceConnections || !backend?.createVoiceOffer) {
    notify("Voz online no disponible", "Firebase debe estar activo para conectar la voz de sala.", "error");
    return;
  }
  if (!state.roomId) await ensureOnlineRoom();
  if (!state.roomId || !state.currentUser?.uid) {
    notify("Sin sala online", "Entra o crea una sala online antes de activar voz.", "error");
    return;
  }
  state.voiceStream ||= await navigator.mediaDevices.getUserMedia({ audio: true });
  if (!window.RTCPeerConnection) {
    notify("Voz no disponible", "Este navegador no soporta WebRTC.", "error");
    return;
  }
  if (!state.unsubVoice) {
    state.unsubVoice = backend.watchVoiceConnections(state.roomId, state.currentUser.uid, (connections) => {
      handleVoiceConnections(connections).catch((error) => notify("Voz no sincronizada", error.message, "error"));
    });
  }
  const remotePlayers = state.players.filter((player) => player.uid && player.uid !== state.currentUser.uid);
  for (const player of remotePlayers) {
    const connectionId = voiceConnectionId(state.currentUser.uid, player.uid);
    const peer = createVoicePeer(connectionId, player.uid);
    if (peer.localDescription) continue;
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    await backend.createVoiceOffer(state.roomId, connectionId, {
      fromUid: state.currentUser.uid,
      toUid: player.uid,
      participants: [state.currentUser.uid, player.uid],
      offer: offer.toJSON(),
      candidates: [],
    });
  }
}

function toggleVoice() {
  const button = $("#voice-toggle");
  if (!navigator.mediaDevices?.getUserMedia) return notify("Voz no disponible", "Chat de voz no disponible en este navegador.", "error");
  startRoomVoice()
    .then(() => {
      button.textContent = "Voz lista";
      notify("Microfono habilitado", "La voz queda disponible para los jugadores reales de esta sala.", "success");
      sound("voice");
    })
    .catch(() => notify("Permiso rechazado", "No se habilito el microfono.", "error"));
}

function renderAchievements() {
  $("#saved-achievements").textContent = state.achievements.length;
  $("#saved-wins").textContent = state.wins;
  $("#saved-losses").textContent = state.losses;
  const list = $("#achievements-list-nav");
  if (list) {
    list.innerHTML = "";
    const items = state.achievements.length ? state.achievements : ["Aun sin logros guardados"];
    items.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      list.append(li);
    });
  }
  renderMatchHistory();
}

function renderMatchHistory() {
  const list = $("#match-history-list-nav");
  if (!list) return;
  list.innerHTML = "";
  const statusEl = $("#match-history-status-nav");
  if (statusEl) statusEl.textContent = `${state.matchHistory.length} partidas`;
  if (!state.matchHistory.length) {
    const li = document.createElement("li");
    li.textContent = "Aun sin partidas guardadas";
    list.append(li);
    return;
  }
  state.matchHistory.forEach((match) => {
    const li = document.createElement("li");
    const result = match.result === "win" ? "Victoria" : "Derrota";
    li.innerHTML = `
      <strong>${result} - ${match.character}</strong>
      <span>${match.mode} / ${match.scenario}</span>
      <span>Ganador: ${match.winner}. Medallas tuyas: ${match.decorations}. Vida: ${match.health}.</span>
      <span>${match.date}</span>
    `;
    list.append(li);
  });
}

  $("#offline-entry").addEventListener("click", () => startEntry("Offline"));
  
  // Lógica de navegación lateral (Logros/Historial) con soporte táctil
  $$(".nav-button").forEach(btn => {
    const toggleNav = (e) => {
      if (e.type === 'touchend') e.preventDefault();
      const targetId = btn.dataset.navTarget;
      const content = $(`#${targetId}`);
      const isHidden = content.classList.contains("hidden");
      
      // Cerrar otros
      $$(".nav-content").forEach(c => c.classList.add("hidden"));
      $$(".nav-button").forEach(b => b.classList.remove("active"));
      
      if (isHidden) {
        content.classList.remove("hidden");
        btn.classList.add("active");
        sound("click");
      }
    };
    btn.addEventListener("click", toggleNav);
    btn.addEventListener("touchend", toggleNav);
  });

  $("#clear-progress-nav")?.addEventListener("click", () => {
    if (window.confirm("¿Deseas borrar todos tus logros y victorias guardadas localmente?")) {
      state.achievements = [];
      state.wins = 0;
      state.losses = 0;
      state.matchHistory = [];
      saveProgress();
      renderAchievements();
      notify("Progreso borrado", "Se han limpiado tus estadisticas locales.", "success");
    }
  });

  $("#rules-more").addEventListener("click", () => {
  const details = $("#rules-details");
  const visible = !details.classList.toggle("hidden");
  $("#rules-more").textContent = visible ? "Ver menos" : "Ver mas";
  sound("click");
  enhanceButtonIcons();
});
$$("[data-card-guide]").forEach((button) => {
  button.addEventListener("click", () => {
    state.cardGuideFilter = button.dataset.cardGuide;
    $$("[data-card-guide]").forEach((item) => item.classList.toggle("active", item === button));
    renderHomeCardGuide();
    enhanceButtonIcons();
    sound("click");
  });
});
$("#site-birthdate").addEventListener("change", () => {
  const age = calculateAge($("#site-birthdate").value);
  if (age) $("#site-age").value = age;
});
$("#reset-password").addEventListener("click", async () => {
  const email = $("#site-email").value.trim().toLowerCase();
  if (!email) return addEntryMessage("Ingresa tu correo para recuperar la clave.");
  addEntryMessage("Conectando con Firebase para recuperar clave...");
  const backend = await onlineBackendForAuth();
  if (!backend) {
    const reason = window.onlineBackend?.reason || "Firebase todavia no cargo en el navegador";
    return addEntryMessage(`No se pudo activar recuperacion: ${reason}. Recarga con Ctrl + F5 e intenta nuevamente.`);
  }
  try {
    await backend.resetPassword(email);
    addEntryMessage("Correo de recuperacion enviado. Revisa tu bandeja de entrada.");
  } catch (error) {
    addEntryMessage(`No se pudo enviar recuperacion: ${error.message}`);
  }
});
$("#availability-toggle").addEventListener("change", (event) => setCurrentAvailability(event.target.checked));
document.addEventListener("pointerdown", () => {
  if (!state.musicOn && (state.ambientBlocked || state.sound)) playAmbient();
}, { once: true });
$("#site-auth-form").addEventListener("submit", handleSiteAuth);
$$("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    state.authMode = button.dataset.authTab;
    $$("[data-auth-tab]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    ["#site-name", "#site-fullname", "#site-birthdate", "#site-age"].forEach((selector) => {
      $(selector).style.display = state.authMode === "register" ? "block" : "none";
    });
    $("#site-auth-submit").textContent = state.authMode === "register" ? "Crear cuenta" : "Ingresar";
    $("#site-password").autocomplete = state.authMode === "register" ? "new-password" : "current-password";
  });
});
$("#site-name").style.display = "none";
["#site-fullname", "#site-birthdate", "#site-age"].forEach((selector) => {
  $(selector).style.display = "none";
});

window.addEventListener("online-backend-ready", async (event) => {
  state.onlineReady = event.detail?.isEnabled?.() || false;
  addEntryMessage(state.onlineReady ? "Online real listo: cuentas del sitio, usuarios, amigos y salas usan Firebase." : "Modo demo activo. Para online real configura Firebase en firebase-config.js.");
  await restoreSavedSession();
  if (state.loggedIn) {
    startOnlineDirectoryRefresh();
    syncOnlineDirectory();
  }
  renderRoom();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && state.loggedIn && state.sessionType !== "offline") syncOnlineDirectory();
});

$$("[data-session]").forEach((button) => {
  button.addEventListener("click", () => {
    $$("[data-session]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.sessionType = button.dataset.session;
    document.body.classList.toggle("offline-mode", state.sessionType === "offline");
    sound("click");
    renderRoom();
  });
});

$("#mode").addEventListener("change", () => {
  populateScenarios();
  resetRoom();
});
$("#scenario").addEventListener("change", resetRoom);
$("#fill-room").addEventListener("click", fillRoom);
$("#reset-room").addEventListener("click", resetRoom);
$("#start-game").addEventListener("click", startGame);
  $("#home-button").addEventListener("click", (e) => {
    if (e.target.closest("#chat-form") || e.target.closest(".chat-panel")) return;
    const isOnline = state.loggedIn && state.currentUser;
    returnHome({ logout: true, returnToOnline: isOnline });
  });
$("#logout-button").addEventListener("click", () => returnHome({ logout: true }));
$("#game-over-close").addEventListener("click", () => {
  $("#game-over-modal").classList.add("hidden");
});
$("#play-action").addEventListener("click", playAction);
$("#buy-resource").addEventListener("click", () => buyResource());
$("#explore").addEventListener("click", explore);
$("#mansion-card").addEventListener("click", explore);
// Protección: Solo agregar listener si el botón existe
if ($("#use-item")) {
  $("#use-item").addEventListener("click", useItem);
}
$("#character-effect").addEventListener("click", useCharacterEffect);
$("#end-turn").addEventListener("click", endTurn);
$("#request-end-game").addEventListener("click", requestEndGameVote);
$("#voice-toggle").addEventListener("click", toggleVoice);
$("#tutorial-start").addEventListener("click", startTutorial);
$("#tutorial-close").addEventListener("click", closeTutorial);
$("#tutorial-next").addEventListener("click", nextTutorialStep);
$("#tutorial-prev").addEventListener("click", previousTutorialStep);
$("#sound-toggle").addEventListener("click", () => {
  setSoundEnabled(!state.sound);
  renderGame();
  sound("click");
});
$("#ambient-volume").addEventListener("input", (event) => setAmbientVolume(event.target.value));
$("#game-volume").addEventListener("input", (event) => setGameVolume(event.target.value));
$("#clear-progress")?.addEventListener("click", () => {
  state.achievements = [];
  state.wins = 0;
  state.losses = 0;
  state.matchHistory = [];
  state.matchRecorded = false;
  saveProgress();
  renderAchievements();
});
  $("#chat-form").addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const input = $("#chat-input");
    const text = input.value.trim();
    if (!text) return;
    
    addChat(state.currentUser?.name || myPlayer()?.name || "Jugador", text).then((sent) => {
      if (!sent) return;
      input.value = "";
      input.focus();
    });
    return false;
  });

// Soporte adicional: clic directo en botón Enviar
  $("#chat-submit")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const input = $("#chat-input");
    const text = input?.value.trim();
    if (!text) return;
    // Llamar directamente en vez de re-despachar el submit (evita bubbling indeseado)
    addChat(state.currentUser?.name || myPlayer()?.name || "Jugador", text).then((sent) => {
      if (!sent || !input) return;
      input.value = "";
      input.focus();
    });
  });
$("#voice-message").addEventListener("click", () => {
  toggleVoiceMessage().catch((error) => notify("Audio no enviado", error.message, "error"));
});
$("#add-user-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const term = $("#friend-email").value.trim().toLowerCase();
  if (!term) return;
  const backend = getOnlineBackend();
  let user = state.siteUsers.find((siteUser) => siteUser.email === term || siteUser.uid === term);
  if (!user && backend) {
    try {
      user = await backend.findUser(term);
    } catch (error) {
      notify("Busqueda online fallida", error.message, "error");
    }
  }
  if (!user?.uid || !user.email) {
    notify("Usuario no encontrado", "Solo puedes agregar correos registrados realmente en Firebase.", "error");
    return;
  }
  await addFriendByUser(user);
  $("#friend-email").value = "";
});

if ("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js").catch(() => {});

window.setInterval(refreshPendingEndVotes, 2000);

populateScenarios();
renderHomeCardGuide();
enhanceButtonIcons();
buildResourceArea();
protectNavigationDuringMatch();
renderAuth();
renderFriends();
renderSiteUsers();
renderRoom();
renderGame();
renderAchievements();
playAmbient();

// Ajuste visual responsive: mueve botones/dados bajo la columna Mansión para que todo caiga en horizontal.
(function fitHorizontalBoard(){
  function moveCommands(){
    const mansion = document.querySelector('.mansion-panel');
    const command = document.querySelector('.mansion-command-zone');
    if (mansion && command && command.parentElement !== mansion) {
      mansion.appendChild(command);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', moveCommands);
  else moveCommands();
  window.addEventListener('resize', moveCommands);
})();
