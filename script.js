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
  { name: "Albert Wesker", health: 90, trait: "+10 dano con nivel 2", portrait: "scout", image: `${CARD_PATH}CH-001.jpg` },
  { name: "Leon S. Kennedy", health: 80, trait: "recupera 10 de vida", portrait: "medic", image: `${CARD_PATH}CH-002.jpg` },
  { name: "Claire Redfield", health: 100, trait: "+1 compra con nivel 2", portrait: "tactician", image: `${CARD_PATH}CH-003.jpg` },
  { name: "Sheva Alomar", health: 70, trait: "+1 condecoracion contra jefe", portrait: "warden", image: `${CARD_PATH}CH-004.jpg` },
  { name: "Barry Burton", health: 85, trait: "+10 municion", portrait: "agent", image: `${CARD_PATH}CH-005.jpg` },
  { name: "Ada Wong", health: 75, trait: "+20 oro con nivel 2", portrait: "operator", image: `${CARD_PATH}CH-006.jpg` },
  { name: "Jack Krauser", health: 90, trait: "+10 dano", portrait: "scout", image: `${CARD_PATH}CH-007.jpg` },
  { name: "Chris Redfield", health: 90, trait: "+10 dano a infectados", portrait: "tactician", image: `${CARD_PATH}CH-008.jpg` },
  { name: "Jill Valentine", health: 80, trait: "+1 exploracion con nivel 3", portrait: "operator", image: `${CARD_PATH}CH-009.jpg` },
  { name: "Rebecca Chambers", health: 70, trait: "cura 20", portrait: "medic", image: `${CARD_PATH}CH-010.jpg` },
];

const catalog = {
  ammo10: { id: "ammo10", name: "Ammo x10", type: "Municion", ammo: 10, gold: 10, art: "ammo", cost: 0, image: `${CARD_PATH}AM-001.jpg` },
  ammo20: { id: "ammo20", name: "Ammo x20", type: "Municion", ammo: 20, gold: 20, art: "ammo", cost: 40, image: `${CARD_PATH}AM-002.jpg` },
  ammo30: { id: "ammo30", name: "Ammo x30", type: "Municion", ammo: 30, gold: 30, art: "ammo", cost: 60, image: `${CARD_PATH}AM-003.jpg` },
  knife: { id: "knife", name: "Combat Knife", type: "Arma", damage: 10, ammoCost: 0, art: "knife", cost: 20, image: `${CARD_PATH}WE-004.jpg` },
  handgun: { id: "handgun", name: "Handgun", type: "Arma", damage: 20, ammoCost: 20, art: "handgun", cost: 40, image: `${CARD_PATH}WE-009.jpg` },
  bow: { id: "bow", name: "Longbow", type: "Arma", damage: 30, ammoCost: 20, art: "handgun", cost: 50, image: `${CARD_PATH}WE-002.jpg` },
  grenade: { id: "grenade", name: "Grenade", type: "Arma", damage: 40, ammoCost: 20, splash: 10, art: "shotgun", cost: 60, image: `${CARD_PATH}WE-001.jpg`, text: "Hace daÃ±o adicional a otros jugadores si hay mas de uno." },
  six: { id: "six", name: "Six Shooter", type: "Arma", damage: 40, ammoCost: 30, art: "handgun", cost: 70, image: `${CARD_PATH}WE-006.jpg` },
  gatling: { id: "gatling", name: "Gatling Gun", type: "Arma", damage: 60, ammoCost: 40, damagePerAmmo: { step: 20, damage: 10 }, art: "shotgun", cost: 90, image: `${CARD_PATH}WE-007.jpg`, text: "DaÃ±o variable segun municion disponible." },
  rocket: { id: "rocket", name: "Rocket Launcher", type: "Arma", damage: 80, ammoCost: 50, damageXAmmo: true, art: "shotgun", cost: 110, image: `${CARD_PATH}WE-008.jpg`, text: "DaÃ±o X por municion disponible del turno." },
  green: { id: "green", name: "Green Herb", type: "Objeto", heal: 20, art: "herb", cost: 30, image: `${CARD_PATH}IT-001.jpg` },
  yellow: { id: "yellow", name: "Yellow Herb", type: "Objeto", maxHeal: 10, art: "herb", cost: 50, image: `${CARD_PATH}IT-002.jpg` },
  spray: { id: "spray", name: "First Aid Spray", type: "Objeto", fullHeal: true, art: "herb", cost: 70, image: `${CARD_PATH}IT-003.jpg` },
  action1: { id: "action1", name: "Deadly Aim", type: "Accion", damageBonus: 20, art: "action", cost: 40, image: `${CARD_PATH}AC-001.jpg`, text: "+20 daÃ±o este turno." },
  action2: { id: "action2", name: "Reload", type: "Accion", ammoBonus: 20, draw: 1, art: "action", cost: 40, image: `${CARD_PATH}AC-002.jpg`, text: "+20 municiÃ³n y roba 1 carta." },
  action3: { id: "action3", name: "Master of Unlocking", type: "Accion", extraBuy: 1, goldBonus: 20, art: "action", cost: 50, image: `${CARD_PATH}AC-003.jpg`, text: "+1 compra y +20 oro." },
  action4: { id: "action4", name: "Escape Route", type: "Accion", extraExplore: 1, draw: 1, art: "action", cost: 60, image: `${CARD_PATH}AC-004.jpg`, text: "+1 exploraciÃ³n y roba 1 carta." },
  action5: { id: "action5", name: "Ominous Battle", type: "Accion", damageBonus: 30, extraAction: 1, art: "action", cost: 70, image: `${CARD_PATH}AC-005.jpg`, text: "+30 daÃ±o y +1 acciÃ³n." },
  action6: { id: "action6", name: "Quick Reload", type: "Accion", ammoBonus: 30, goldBonus: 10, art: "action", cost: 50, image: `${CARD_PATH}AC-006.jpg`, text: "+30 municiÃ³n y +10 oro." },
  action7: { id: "action7", name: "Tactical Advance", type: "Accion", extraAction: 1, draw: 1, art: "action", cost: 60, image: `${CARD_PATH}AC-007.jpg`, text: "+1 acciÃ³n y roba 1 carta." },
  action8: { id: "action8", name: "Resource Sweep", type: "Accion", extraBuy: 1, goldBonus: 30, art: "action", cost: 60, image: `${CARD_PATH}AC-008.jpg`, text: "+1 compra y +30 oro." },
  action9: { id: "action9", name: "Focused Fire", type: "Accion", damageBonus: 40, ammoBonus: 10, art: "action", cost: 80, image: `${CARD_PATH}AC-009.jpg`, text: "+40 daÃ±o y +10 municiÃ³n." },
  action10: { id: "action10", name: "Emergency Supply", type: "Accion", draw: 2, goldBonus: 10, art: "action", cost: 70, image: `${CARD_PATH}AC-010.jpg`, text: "Roba 2 cartas y +10 oro." },
  action11: { id: "action11", name: "Last Stand", type: "Accion", damageBonus: 20, extraExplore: 1, art: "action", cost: 80, image: `${CARD_PATH}AC-011.jpg`, text: "+20 daÃ±o y +1 exploraciÃ³n." },
  action12: { id: "action12", name: "Field Command", type: "Accion", extraAction: 1, extraBuy: 1, goldBonus: 10, art: "action", cost: 90, image: `${CARD_PATH}AC-012.jpg`, text: "+1 acciÃ³n, +1 compra y +10 oro." },
};

const baseResourceIds = ["ammo10", "ammo20", "ammo30", "knife", "handgun", "green"];
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
  { name: "Majini", type: "Infectado", health: 20, damage: 10, decorations: 1, art: "infected", image: `${CARD_PATH}MA-001.jpg` },
  { name: "Zombie Male", type: "Infectado", health: 30, damage: 20, decorations: 1, art: "runner", image: `${CARD_PATH}MA-002.jpg` },
  { name: "Zombie Female", type: "Infectado", health: 30, damage: 20, decorations: 1, art: "runner", image: `${CARD_PATH}MA-003.jpg` },
  { name: "Zombie Butcher", type: "Infectado", health: 40, damage: 20, decorations: 2, art: "brute", image: `${CARD_PATH}MA-004.jpg` },
  { name: "Bui Kichwa", type: "Infectado", health: 40, damage: 20, decorations: 2, art: "brute", image: `${CARD_PATH}MA-005.jpg` },
  { name: "Licker", type: "Infectado", health: 50, damage: 30, decorations: 2, art: "brute", image: `${CARD_PATH}MA-006.jpg` },
  { name: "Hunter", type: "Infectado", health: 50, damage: 30, decorations: 2, art: "brute", image: `${CARD_PATH}MA-008.jpg` },
  { name: "Nemesis T-Type", type: "Infectado", health: 60, damage: 40, decorations: 3, nemesis: true, art: "boss", image: `${CARD_PATH}MA-007.jpg` },
  { name: "Yellow Herb", type: "Objeto", health: 0, damage: 0, decorations: 0, mansionItem: "yellow", art: "herb", image: `${CARD_PATH}IT-002.jpg` },
  { name: "Gatling Case", type: "Objeto", health: 0, damage: 0, decorations: 1, mansionItem: "gatling", art: "shotgun", image: `${CARD_PATH}WE-007.jpg` },
  { name: "Rocket Case", type: "Objeto", health: 0, damage: 0, decorations: 1, mansionItem: "rocket", art: "shotgun", image: `${CARD_PATH}WE-008.jpg` },
  { name: "Uroboros Aheri", type: "Jefe", health: 70, damage: 40, decorations: 4, boss: true, art: "boss", image: `${CARD_PATH}MA-010.jpg` },
];

const mercenaryBonus = [
  { name: "Time Bonus", type: "Bonus", health: 0, damage: 0, decorations: 0, bonusTurns: 1, art: "action", image: `${CARD_PATH}MA-018.jpg` },
  { name: "Combo Bonus", type: "Bonus", health: 0, damage: 0, decorations: 2, art: "action", image: `${CARD_PATH}MA-019.jpg` },
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
  diceRoll: null,
  authMode: "login",
  currentUser: JSON.parse(localStorage.getItem("mdbg-current-user") || "null"),
  siteUsers: [],
  friends: JSON.parse(localStorage.getItem("mdbg-friends") || "[]"),
  roomId: "",
  pendingFriendRequests: [],
  pendingRoomInvitations: [],
  unsubFriendRequests: null,
  unsubRoomInvitations: null,
  unsubRoom: null,
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
  ["unsubFriendRequests", "unsubRoomInvitations", "unsubRoom", "unsubVoice"].forEach((key) => {
    if (typeof state[key] === "function") state[key]();
    state[key] = null;
  });
  Object.values(state.voicePeers).forEach((peer) => peer.close?.());
  state.voicePeers = {};
  state.voiceCandidatesSeen = {};
  state.voiceStream?.getTracks?.().forEach((track) => track.stop());
  state.voiceStream = null;
}

function startOnlineSubscriptions() {
  const backend = getOnlineBackend();
  if (!backend || !state.currentUser?.uid) return;
  if (!state.unsubFriendRequests && backend.watchFriendRequests) {
    state.unsubFriendRequests = backend.watchFriendRequests(state.currentUser.uid, (requests) => {
      state.pendingFriendRequests = requests;
      renderInvitations();
    });
  }
  if (!state.unsubRoomInvitations && backend.watchRoomInvitations) {
    state.unsubRoomInvitations = backend.watchRoomInvitations(state.currentUser.uid, (invitations) => {
      state.pendingRoomInvitations = invitations;
      renderInvitations();
    });
  }
}

function watchCurrentRoom() {
  const backend = getOnlineBackend();
  if (typeof state.unsubRoom === "function") state.unsubRoom();
  state.unsubRoom = null;
  if (!backend?.watchRoom || !state.roomId) return;
  state.unsubRoom = backend.watchRoom(state.roomId, (room) => {
    if (!room) return;
    state.applyingRemoteRoom = true;
    try {
      if (room.gameState) applyRemoteGameState(room.gameState);
      else if (room.players) syncPlayersFromRoom(room.players);
      renderChatMessages(room.chatMessages || []);
      if (state.voiceStream) startRoomVoice().catch(() => {});
      renderRoom();
      renderGame();
    } finally {
      state.applyingRemoteRoom = false;
    }
  });
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
}

function schedulePublishRoomState() {
  if (!isOnlineRoomActive() || state.applyingRemoteRoom) return;
  window.clearTimeout(state.publishTimer);
  state.publishTimer = window.setTimeout(publishRoomState, 180);
}

async function publishRoomState() {
  if (!isOnlineRoomActive() || state.applyingRemoteRoom) return;
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
  if (!backend || !state.currentUser?.uid) return;
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
  }
}

async function ensureOnlineRoom() {
  const backend = getOnlineBackend();
  if (!backend || !state.loggedIn || state.sessionType === "offline" || !state.currentUser?.uid) return "";
  if (state.roomId) return state.roomId;
  try {
    state.roomId = await backend.createRoom(state.currentUser, {
      mode: getModeKey(),
      scenario: $("#scenario").value,
      sessionType: state.sessionType,
      maxPlayers: getMode().max,
    });
    saveProgress();
    watchCurrentRoom();
    notify("Sala online creada", `ID de sala: ${state.roomId}`, "success");
  } catch (error) {
    notify("Sala online no creada", error.message, "error");
  }
  return state.roomId;
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
  if (button.id === "firebase-test" || button.id === "firebase-test-panel") return "◆";
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
    .replaceAll("daÃ±o", "daño")
    .replaceAll("municiÃ³n", "munición")
    .replaceAll("acciÃ³n", "acción")
    .replaceAll("exploraciÃ³n", "exploración")
    .replaceAll("mansiÃ³n", "mansión");
}

function addChat(author, text, extra = {}) {
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
  state.chatMessages = [message, ...state.chatMessages].slice(0, 80);
  renderChatMessages(state.chatMessages);
  const backend = getOnlineBackend();
  if (isOnlineRoomActive() && backend?.addRoomChat) {
    backend.addRoomChat(state.roomId, message).catch((error) => notify("Chat no enviado", error.message, "error"));
  }
}

async function publishChatMessages() {
  const backend = getOnlineBackend();
  if (isOnlineRoomActive() && backend?.updateRoom) {
    await backend.updateRoom(state.roomId, { chatMessages: state.chatMessages.slice(0, 80) });
  }
}

function reactToMessage(messageId, reaction) {
  const key = state.currentUser?.uid || myPlayer()?.name || "local";
  state.chatMessages = state.chatMessages.map((message) => {
    if (message.id !== messageId) return message;
    const reactions = { ...(message.reactions || {}) };
    if (reactions[key] === reaction) delete reactions[key];
    else reactions[key] = reaction;
    return { ...message, reactions };
  });
  renderChatMessages(state.chatMessages);
  publishChatMessages().catch((error) => notify("Reaccion no enviada", error.message, "error"));
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
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    return notify("Audio no disponible", "Este navegador no permite grabar mensajes de voz.", "error");
  }
  if (state.voiceRecorder?.state === "recording") {
    await stopVoiceMessageRecording();
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  state.voiceChunks = [];
  const recorderOptions = MediaRecorder.isTypeSupported("audio/webm") ? { mimeType: "audio/webm" } : undefined;
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
    if (blob.size > 700000) {
      notify("Audio muy largo", "El mensaje supera el limite para sincronizar en Firebase.", "error");
      return;
    }
    const audioData = await blobToDataUrl(blob);
    addChat(state.currentUser?.name || myPlayer()?.name || "Jugador", "Mensaje de voz", {
      type: "voice",
      audioData,
      audioMime: blob.type,
    });
    notify("Audio enviado", "El mensaje de voz quedo en el chat.", "success");
  };
  recorder.start();
  button.textContent = "Grabando";
  button.classList.add("recording");
  state.voiceRecordTimer = window.setTimeout(stopVoiceMessageRecording, 8000);
  notify("Grabando audio", "Toca Audio otra vez para enviar. Maximo 8 segundos.", "success");
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
        <div class="chat-meta"><strong>${chatAuthorInitials(message)}</strong><span>${time}</span></div>
        ${message.audioData ? `<audio controls preload="metadata" src="${message.audioData}"></audio>` : `<p>${escapeHtml(message.text)}</p>`}
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
  if (player.decorations >= 5) return 3;
  if (player.decorations >= 3) return 2;
  return 1;
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
  if (provider !== "Offline") syncOnlineDirectory();
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
  const ids = [...baseResourceIds, ...getScenario().resources].filter((id) => !forbidden.has(id)).slice(0, 18);
  while (ids.length < 18) ids.push(baseResourceIds[ids.length % baseResourceIds.length]);
  state.resourceArea = ids.map((id) => ({ card: catalog[id], count: id === "ammo10" ? 28 : 6 }));
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
  $("#start-game").disabled = !state.started && !canStart();
  $("#start-game").textContent = state.started ? "Partida activa" : "Comenzar partida";
  $("#fill-room").hidden = state.sessionType !== "offline";
  renderAuth();
  renderFriends();
  renderPlayers();
  renderResources();
  enhanceButtonIcons();
  if (state.tutorialActive) renderTutorial();
}

function renderPlayers() {
  const grid = $("#players");
  grid.innerHTML = "";
  state.players.forEach((player, index) => {
    const card = document.createElement("article");
    const hpPercent = Math.max(0, Math.round((player.health / player.maxHealth) * 100));
    card.className = `player-card ${index === state.activeIndex && state.started ? "active" : ""}`;
    const stateLabel = player.eliminated ? "Eliminado" : player.skipTurns > 0 ? `Cae ${player.skipTurns} turno(s)` : index === state.activeIndex && state.started ? "Turno" : player.isBot ? "Bot" : "Humano";
    card.innerHTML = `
      ${characterPortrait(player.character, "small")}
      <div class="player-name-row">
        <strong>${player.name}</strong>
        <em>${stateLabel}</em>
      </div>
      <span>${player.character.name} - Nivel ${levelFor(player)}</span>
      <p>${player.character.trait}</p>
      <div class="health-bar"><span style="width:${hpPercent}%"></span></div>
      <div class="player-meta">
        <span>Vida ${player.health}</span>
        <span>Medallas ${player.decorations}</span>
        <span>Muertes ${player.deaths || 0}/3</span>
      </div>
    `;
    grid.append(card);
  });
}

function renderResources() {
  const area = $("#resource-area");
  const typeBar = $("#resource-types");
  area.innerHTML = "";
  typeBar.innerHTML = "";
  area.classList.toggle("collapsed", !state.resourceMarketOpen);

  const types = ["Todos", ...new Set(state.resourceArea.map((pile) => pile.card.type))];
  types.forEach((type) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = type === state.resourceFilter ? "active" : "";
    button.textContent = type;
    button.addEventListener("click", () => {
      state.resourceFilter = type;
      state.resourceMarketOpen = true;
      randomizeMarketOrder();
      renderResources();
    });
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
      <button type="button" aria-label="Comprar ${pile.card.name}" ${pile.count <= 0 ? "disabled" : ""}>
        <div class="card-face card-${pile.card.art}">${cardFace(pile.card, "resource")}</div>
      </button>
      <footer><span>${pile.card.cost} oro</span><span class="remaining">Quedan ${pile.count}</span></footer>
    `;
    item.querySelector("button").addEventListener("click", () => buyResource(index));
    return item;
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
  publishRoomState();
  schedulePublishRoomState();
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
    el.innerHTML = cardFace(card, "hand");
    el.addEventListener("click", () => playHandCard(card.instanceId));
    hand.append(el);
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
    list.innerHTML = "<p class=\"status\">No hay cartas de acciÃ³n en tu mano.</p>";
    return;
  }
  actions.forEach((card) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "action-choice action-select-card card-face card-action";
    item.innerHTML = `
      ${cardFace(card, "action")}
      <span class="action-effect">${actionEffectText(card)}</span>
    `;
    item.addEventListener("click", () => playHandCard(card.instanceId));
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
    const button = document.createElement("button");
    button.type = "button";
    button.className = `card card-face weapon-select-card card-${card.art} ${selectedWeapon ? "selected-card" : ""}`;
    button.setAttribute("aria-label", `${selectedWeapon ? "Quitar" : "Seleccionar"} ${card.name}`);
    button.innerHTML = cardFace(card, "weapon");
    button.addEventListener("click", () => selectWeapon(card));
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
    $("#current-hero").innerHTML = `<div class="portrait portrait-scout" aria-hidden="true"><span>PJ</span></div><div><strong>Sin personaje</strong><span>Comienza una partida</span></div>`;
    ["health", "actions", "buys", "explores", "decorations", "damage", "gold", "ammo"].forEach((key) => {
      $(`#live-${key}`).textContent = key === "health" ? "0/0" : "0";
    });
    return;
  }
  $("#current-hero").innerHTML = `
    ${characterPortrait(mine.character)}
    <div>
      <strong>${mine.character.name}</strong>
      <span>Tu personaje - Nivel ${levelFor(mine)} - ${mine.character.trait}</span>
    </div>
  `;
  $("#live-health").textContent = `${mine.health}/${mine.maxHealth}`;
  $("#live-decorations").textContent = mine.decorations;
  const isMyTurnNow = isMyTurn();
  $("#live-actions").textContent = isMyTurnNow ? state.turn.actions : 0;
  $("#live-buys").textContent = isMyTurnNow ? state.turn.buys : 0;
  $("#live-explores").textContent = isMyTurnNow ? state.turn.explores : 0;
  $("#live-damage").textContent = isMyTurnNow ? state.turn.damage : 0;
  $("#live-gold").textContent = isMyTurnNow ? state.turn.gold : 0;
  $("#live-ammo").textContent = isMyTurnNow ? state.turn.ammo : 0;
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
  if (card.damageBonus) effects.push(`+${card.damageBonus} daÃ±o`);
  if (card.ammoBonus) effects.push(`+${card.ammoBonus} municiÃ³n`);
  if (card.goldBonus) effects.push(`+${card.goldBonus} oro`);
  if (card.extraAction) effects.push(`+${card.extraAction} acciÃ³n`);
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
  if (!state.loggedIn) return notify("Inicia sesiÃ³n", "Debes ingresar con una cuenta del sitio para invitar jugadores.", "error");
  const backend = getOnlineBackend();
  if (!backend || !friend.uid) return notify("Firebase requerido", "Las invitaciones online requieren usuarios reales de Firebase.", "error");
  const freshFriend = backend.getUser ? await backend.getUser(friend.uid) : friend;
  if (!freshFriend?.uid || !freshFriend.email) return notify("Invitado invalido", "Este usuario ya no existe en Firebase.", "error");
  if (!freshFriend.online) return notify("Jugador no disponible", `${freshFriend.name} no esta online o no desea recibir invitaciones.`, "error");
  if (state.players.length >= mode.max) return notify("Sala completa", "No hay espacio para mÃ¡s jugadores en esta sala.", "error");
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
      renderChatMessages(room.chatMessages || []);
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
  notify("Sala completada", state.sessionType === "offline" ? `Bots agregados hasta el mÃ¡ximo: ${mode.max}.` : `MÃ­nimo requerido: ${mode.min}.`, "success");
  sound("card");
  renderRoom();
}

function resetRoom() {
  state.roomId = "";
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
  state.diceRoll = null;
    buildResourceArea();
  state.chatMessages = [];
  $("#chat-log").innerHTML = "";
  sound("click");
  notify("Sala nueva", "Se reiniciÃ³ la sala.", "success");
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
  state.started = true;
  state.matchRecorded = false;
  state.endVotes = {};
  state.diceRoll = null;
  state.lastPublishedState = "";
  state.round = 1;
  state.activeIndex = 0;
  state.turn = freshTurn();
  state.mansion = buildMansion();
  state.lastRevealed = null;
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

async function returnHome(options = {}) {
  const { force = false, logout = true } = options;
  if (state.started && !force) {
    notify("Partida activa", "Termina tu partida antes de salir al inicio o cerrar sesion.", "error");
    return false;
  }
  stopTurnTimer();
  if (logout) await markCurrentUserOffline();
  state.entryDone = false;
  state.loggedIn = false;
  state.provider = "";
  state.sessionType = "friends";
  if (logout) state.currentUser = null;
  state.players = [];
  state.started = false;
  state.activeIndex = 0;
  state.round = 0;
  state.roomId = "";
  state.turn = freshTurn();
  state.mansion = [];
  state.lastRevealed = null;
  state.resourceMarketOpen = false;
  $("#chat-log").innerHTML = "";
  if (logout) {
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
    notify(card.name, `Ya generÃ³ ${card.gold || 0} oro y ${card.ammo || 0} municiÃ³n al salir en tu mano.`);
    sound("card");
    renderGame();
    return;
  }
  if (card.type === "Accion") {
    if (state.turn.actions <= 0) return notify("No puedes jugar acciÃ³n", "No quedan acciones este turno.", "error");
    state.turn.actions -= 1;
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
    notify("Arma retirada", `${card.name} ya no se usarÃ¡ en este ataque.`);
    renderGame();
    return;
  }
  if (state.turn.ammo < (card.ammoCost || 0)) {
    notify("MuniciÃ³n insuficiente", `${card.name} requiere ${card.ammoCost || 0} de municiÃ³n. Disponible: ${state.turn.ammo}.`, "error");
    return;
  }
  state.turn.ammo -= card.ammoCost || 0;
  state.turn.weaponAmmoSpent += card.ammoCost || 0;
  state.turn.damage += weaponDamage(card);
  player.selectedWeapons.push(card);
  notify("Arma seleccionada", `${card.name}: +${weaponDamage(card)} daÃ±o. Coste: ${card.ammoCost || 0} municiÃ³n.`, "success");
  if (card.id === "grenade" && state.players.length > 1) {
    state.players
      .filter((target) => target !== player)
      .forEach((target) => {
        target.health = Math.max(0, target.health - (card.splash || 0));
      });
    notify("Efecto de granada", "Hace daÃ±o adicional a otros jugadores.", "success");
  }
  sound("card");
  renderGame();
}

function weaponDamage(card) {
  if (card.damagePerAmmo) return Math.floor((state.turn.autoAmmo || 0) / card.damagePerAmmo.step) * card.damagePerAmmo.damage;
  if (card.damageXAmmo) return state.turn.autoAmmo || 0;
  return card.damage || 0;
}

function drawCards(player, amount) {
  const drawn = [];
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
}

function playAction() {
  if (!state.started) return;
  if (!requireMyTurn()) return;
  const actions = currentPlayer().hand.filter((card) => card.type === "Accion");
  if (actions.length > 1) return notify("Selecciona acciÃ³n", "Tienes varias acciones. Elige la carta exacta en Acciones en mano.", "error");
  const action = actions[0];
  if (!action) return notify("Sin acciones", "No tienes cartas de acciÃ³n en la mano.", "error");
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
  if (["gatling", "rocket"].includes(pile.card.id)) return notify("Carta no comprable", "WE-007 y WE-008 solo se obtienen desde la mansiÃ³n.", "error");
  if (state.turn.buys <= 0) return notify("No puedes comprar", "No quedan compras este turno.", "error");
  if (state.turn.gold < pile.card.cost) return notify("Oro insuficiente", `Necesitas ${pile.card.cost} oro para ${pile.card.name}. Disponible: ${state.turn.gold}.`, "error");
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
    notify("Explorar sin arma", "No tienes armas en mano. Vuelve a pulsar Explorar para confirmar que deseas revelar la mansiÃ³n sin daÃ±o.", "error");
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
    notify("Bonus de mansiÃ³n", `${player.name} obtuvo ${revealed.name}.`, "success");
  } else if (revealed.type === "Objeto") {
    if (revealed.mansionItem && catalog[revealed.mansionItem]) player.discard.push(cloneCard(catalog[revealed.mansionItem]));
    player.decorations += revealed.decorations || 0;
    notify("Objeto de mansiÃ³n", `${revealed.name} va al descarte de ${player.name}.`, "success");
  } else if (state.turn.damage >= revealed.health) {
    player.decorations += revealed.decorations;
    if (revealed.boss && player.character.name === "Sheva Alomar") player.decorations += 1;
    notify("Infectado derrotado", `${player.name} derrotÃ³ ${revealed.name} con ${state.turn.damage} de daÃ±o.`, "success");
    addAchievement("Primer infectado derrotado");
    playAudio("matalo.mp3", 0.9);
    if (revealed.boss) {
      playAudio("game over.mp3", 0.9);
      finishGameByScore(`${revealed.name} fue derrotado.`);
    }
  } else {
    player.health = Math.max(0, player.health - revealed.damage);
    state.mansion.push(revealed);
    notify("DaÃ±o recibido", `${player.name} recibe ${revealed.damage}. ${revealed.name} vuelve al final del mazo.`, "error");
    playAudio("resident-evil-dead-caddicarus.mp3", 0.9);
    if (player.health <= 0) handlePlayerDeath(player, revealed.name);
  }
  renderGame();
}

function validateWeaponRequirements(player) {
  if (!player.selectedWeapons.length) return true;
  const required = player.selectedWeapons.reduce((total, weapon) => total + (weapon.ammoCost || 0), 0);
  const availableForWeapons = state.turn.ammo + state.turn.weaponAmmoSpent;
  if (required > availableForWeapons) {
    notify(
      "MuniciÃ³n insuficiente",
      `Las armas seleccionadas requieren ${required} municiÃ³n y solo tienes ${availableForWeapons}. Retira armas o genera mÃ¡s municiÃ³n.`,
      "error",
    );
    return false;
  }
  if (state.turn.weaponAmmoSpent < required) {
    notify(
      "Requerimiento no pagado",
      `Debes pagar ${required} municiÃ³n para usar las armas seleccionadas antes de atacar.`,
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
  notify("Ataque versus", `${attacker.name} atacÃ³ a ${target.name} por ${hit} de daÃ±o.`, "success");
  if (target.health <= 0) {
    attacker.decorations += 1;
    attacker.defeatedPlayers += 1;
    handlePlayerDeath(target, attacker.name);
    notify("Personaje derrotado", `${attacker.name} gana 1 condecoraciÃ³n.`, "success");
    if (attacker.decorations >= 3) finishGameByScore(`${attacker.name} alcanzo 3 condecoraciones.`);
  }
  sound("hit");
  renderGame();
}

function handlePlayerDeath(player, source = "daÃ±o") {
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

function useCharacterEffect() {
  if (!state.started) return;
  if (!requireMyTurn()) return;
  const player = currentPlayer();
  if (state.turn.characterUsed) return notify("Efecto ya usado", "El efecto del personaje ya fue usado este turno.", "error");
  const level = levelFor(player);
  state.turn.characterUsed = true;
  if (player.character.name.includes("Rebecca")) player.health = Math.min(player.maxHealth, player.health + 20);
  else if (player.character.name.includes("Leon")) player.health = Math.min(player.maxHealth, player.health + 10);
  else if (player.character.name.includes("Barry")) state.turn.ammo += 10;
  else if (player.character.name.includes("Claire") && level >= 2) state.turn.buys += 1;
  else if (player.character.name.includes("Ada") && level >= 2) state.turn.gold += 20;
  else if (player.character.name.includes("Jill") && level >= 3) state.turn.explores += 1;
  else state.turn.damage += level >= 2 ? 10 : 5;
  notify("Efecto de personaje", `${player.character.name} nivel ${level}: habilidad aplicada.`, "success");
  sound("click");
  renderGame();
}

function endTurn(auto = false) {
  if (!state.started) return;
  if (!auto && !requireMyTurn()) return;
  const player = currentPlayer();
  if (!player.eliminated && player.alive) {
    player.discard.push(...player.hand, ...player.played);
    player.played = [];
    player.selectedWeapons = [];
    player.hand = drawHand(player);
  }
  advanceToNextTurn();
  state.turn = freshTurn();
  state.turnEndsAt = Date.now() + 4 * 60 * 1000;
  applyHandResources(currentPlayer());

  if (getModeKey() === "mercenary" && state.round > modes.mercenary.turnLimit) return finishGameByScore("El tiempo mercenario termino.");

  if (!auto) notify("Turno finalizado", `Ahora juega ${currentPlayer().name}.`);
  startTurnTimer();
  renderGame();
  if (currentPlayer()?.isBot) window.setTimeout(botTurn, 700);
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
  if (gold || ammo) notify("MuniciÃ³n en mano", `${player.name} recibe +${gold} oro y +${ammo} municiÃ³n.`, "success");
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
  notify("Partida finalizada", `${reason} Gana ${winner.name} con ${winner.decorations} condecoraciones.`, "success");
  sound("win");
  renderAchievements();
  renderRoom();
  renderGame();
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
    .catch(() => notify("Permiso rechazado", "No se habilitÃ³ el micrÃ³fono.", "error"));
}

function renderAchievements() {
  $("#saved-achievements").textContent = state.achievements.length;
  $("#saved-wins").textContent = state.wins;
  $("#saved-losses").textContent = state.losses;
  const list = $("#achievements");
  list.innerHTML = "";
  const items = state.achievements.length ? state.achievements : ["Aun sin logros guardados"];
  items.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    list.append(li);
  });
  renderMatchHistory();
}

function renderMatchHistory() {
  const list = $("#match-history");
  if (!list) return;
  list.innerHTML = "";
  $("#match-history-status").textContent = `${state.matchHistory.length} partidas`;
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
$("#firebase-test").addEventListener("click", testFirebaseConnection);
$("#firebase-test-panel").addEventListener("click", testFirebaseConnection);
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
  if (state.loggedIn) syncOnlineDirectory();
  renderRoom();
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
$("#home-button").addEventListener("click", () => returnHome({ logout: true }));
$("#logout-button").addEventListener("click", () => returnHome({ logout: true }));
$("#game-over-close").addEventListener("click", () => {
  $("#game-over-modal").classList.add("hidden");
  returnHome({ force: true, logout: true });
});
$("#play-action").addEventListener("click", playAction);
$("#buy-resource").addEventListener("click", () => buyResource());
$("#explore").addEventListener("click", explore);
$("#mansion-card").addEventListener("click", explore);
$("#use-item").addEventListener("click", useItem);
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
$("#clear-progress").addEventListener("click", () => {
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
  const input = $("#chat-input");
  const text = input.value.trim();
  if (!text) return;
  addChat(state.currentUser?.name || myPlayer()?.name || "Jugador", text);
  input.value = "";
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
