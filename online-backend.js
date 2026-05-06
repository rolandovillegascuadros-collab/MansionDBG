import { firebaseSettings } from "./firebase-config.js";

const disabledBackend = {
  isEnabled: () => false,
  reason: "Firebase no configurado",
};

const loadingBackend = {
  isEnabled: () => false,
  isLoading: true,
  reason: "Firebase esta cargando",
};

function cleanText(value) {
  return String(value || "").trim();
}

function publicUserFromDoc(snapshot) {
  const data = snapshot.data();
  return {
    uid: snapshot.id,
    name: data.name || data.displayName || data.email || "Jugador",
    email: data.email || "",
    provider: data.provider || "Correo",
    online: Boolean(data.online),
    birthdate: data.birthdate || "",
    age: data.age || "",
  };
}

async function createBackend() {
  if (!firebaseSettings?.enabled) return disabledBackend;

  const [{ initializeApp }, authModule, firestoreModule] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"),
  ]);
  const {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updateProfile,
  } = authModule;
  const {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
  } = firestoreModule;

  const app = initializeApp(firebaseSettings.config);
  const auth = getAuth(app);
  const db = getFirestore(app);

  async function saveUserProfile(user, profile = {}) {
    const provider = profile.provider || user.providerData?.[0]?.providerId || "Correo";
    const payload = {
      uid: user.uid,
      email: user.email || profile.email || "",
      name: cleanText(profile.name || profile.fullName || user.displayName || user.email?.split("@")[0]),
      birthdate: profile.birthdate || "",
      age: profile.age || "",
      provider,
      online: profile.online !== false,
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", user.uid), payload, { merge: true });
    return payload;
  }

  async function register(profile) {
    const credential = await createUserWithEmailAndPassword(auth, profile.email, profile.password);
    await updateProfile(credential.user, { displayName: profile.name || profile.email });
    return saveUserProfile(credential.user, { ...profile, provider: "Correo" });
  }

  async function login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return saveUserProfile(credential.user, { provider: "Correo" });
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function listUsers() {
    const usersQuery = query(collection(db, "users"), orderBy("name"), limit(80));
    const snapshot = await getDocs(usersQuery);
    return snapshot.docs.map(publicUserFromDoc);
  }

  async function getMyFriends(uid) {
    const snapshot = await getDoc(doc(db, "users", uid));
    return snapshot.exists() ? snapshot.data().friends || [] : [];
  }

  async function findUser(term) {
    const normalized = cleanText(term).toLowerCase();
    if (!normalized) return null;
    const result = await getDocs(query(collection(db, "users"), where("email", "==", normalized), limit(1)));
    return result.empty ? null : publicUserFromDoc(result.docs[0]);
  }

  async function setAvailability(uid, online) {
    if (!uid) return;
    await updateDoc(doc(db, "users", uid), { online: Boolean(online), updatedAt: serverTimestamp() });
  }

  async function addFriend(myUid, friendUid) {
    if (!myUid || !friendUid || myUid === friendUid) return;
    await updateDoc(doc(db, "users", myUid), { friends: arrayUnion(friendUid), updatedAt: serverTimestamp() });
  }

  async function createRoom(owner, details) {
    const roomRef = await addDoc(collection(db, "rooms"), {
      ownerUid: owner.uid,
      ownerName: owner.name,
      mode: details.mode,
      scenario: details.scenario,
      sessionType: details.sessionType,
      status: "waiting",
      players: [{ uid: owner.uid, name: owner.name, online: true }],
      invited: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return roomRef.id;
  }

  async function inviteToRoom(roomId, friend) {
    if (!roomId || !friend?.uid) return;
    await updateDoc(doc(db, "rooms", roomId), {
      invited: arrayUnion({ uid: friend.uid, name: friend.name, email: friend.email }),
      players: arrayUnion({ uid: friend.uid, name: friend.name, online: friend.online }),
      updatedAt: serverTimestamp(),
    });
  }

  async function updateRoom(roomId, patch) {
    if (!roomId) return;
    await updateDoc(doc(db, "rooms", roomId), { ...patch, updatedAt: serverTimestamp() });
  }

  onAuthStateChanged(auth, (user) => {
    window.dispatchEvent(new CustomEvent("online-auth-change", { detail: { user } }));
  });

  return {
    isEnabled: () => true,
    register,
    login,
    resetPassword,
    listUsers,
    getMyFriends,
    findUser,
    addFriend,
    setAvailability,
    createRoom,
    inviteToRoom,
    updateRoom,
  };
}

window.onlineBackend = loadingBackend;
window.onlineBackendReadyPromise = createBackend()
  .then((backend) => {
    window.onlineBackend = backend;
    return backend;
  })
  .catch((error) => {
    window.onlineBackend = {
      ...disabledBackend,
      reason: error.message,
    };
    return window.onlineBackend;
  })
  .finally(() => {
    window.dispatchEvent(new CustomEvent("online-backend-ready", { detail: window.onlineBackend }));
  });
