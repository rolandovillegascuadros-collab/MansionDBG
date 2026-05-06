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
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    onSnapshot,
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
    await Promise.all([
      updateDoc(doc(db, "users", myUid), { friends: arrayUnion(friendUid), updatedAt: serverTimestamp() }),
      updateDoc(doc(db, "users", friendUid), { friends: arrayUnion(myUid), updatedAt: serverTimestamp() }),
    ]);
  }

  async function sendFriendRequest(fromUser, toUser) {
    if (!fromUser?.uid || !toUser?.uid || fromUser.uid === toUser.uid) return "";
    const requestId = `${fromUser.uid}_${toUser.uid}`;
    await setDoc(doc(db, "friendRequests", requestId), {
      fromUid: fromUser.uid,
      fromName: fromUser.name,
      fromEmail: fromUser.email || "",
      toUid: toUser.uid,
      toName: toUser.name,
      toEmail: toUser.email || "",
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return requestId;
  }

  async function acceptFriendRequest(requestId) {
    if (!requestId) return;
    const requestRef = doc(db, "friendRequests", requestId);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) return;
    const request = snapshot.data();
    await Promise.all([
      addFriend(request.toUid, request.fromUid),
      updateDoc(requestRef, { status: "accepted", updatedAt: serverTimestamp() }),
    ]);
  }

  async function rejectFriendRequest(requestId) {
    if (!requestId) return;
    await updateDoc(doc(db, "friendRequests", requestId), { status: "rejected", updatedAt: serverTimestamp() });
  }

  async function createRoom(owner, details) {
    const roomRef = await addDoc(collection(db, "rooms"), {
      ownerUid: owner.uid,
      ownerName: owner.name,
      mode: details.mode,
      scenario: details.scenario,
      sessionType: details.sessionType,
      status: "waiting",
      players: [{ uid: owner.uid, name: owner.name, email: owner.email || "", online: true }],
      invited: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return roomRef.id;
  }

  async function inviteToRoom(roomId, friend, sender) {
    if (!roomId || !friend?.uid) return;
    const roomSnapshot = await getDoc(doc(db, "rooms", roomId));
    const room = roomSnapshot.exists() ? roomSnapshot.data() : {};
    const inviteId = `${roomId}_${friend.uid}`;
    await setDoc(doc(db, "roomInvitations", inviteId), {
      roomId,
      toUid: friend.uid,
      toName: friend.name,
      toEmail: friend.email || "",
      fromUid: sender?.uid || room.ownerUid || "",
      fromName: sender?.name || room.ownerName || "Jugador",
      mode: room.mode || "",
      scenario: room.scenario || "",
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    await updateDoc(doc(db, "rooms", roomId), {
      invited: arrayUnion({ uid: friend.uid, name: friend.name, email: friend.email }),
      updatedAt: serverTimestamp(),
    });
    return inviteId;
  }

  async function updateRoom(roomId, patch) {
    if (!roomId) return;
    await updateDoc(doc(db, "rooms", roomId), { ...patch, updatedAt: serverTimestamp() });
  }

  async function acceptRoomInvite(inviteId, user) {
    if (!inviteId || !user?.uid) return null;
    const inviteRef = doc(db, "roomInvitations", inviteId);
    const inviteSnapshot = await getDoc(inviteRef);
    if (!inviteSnapshot.exists()) return null;
    const invitation = inviteSnapshot.data();
    const player = { uid: user.uid, name: user.name, email: user.email || "", online: true };
    await Promise.all([
      updateDoc(doc(db, "rooms", invitation.roomId), {
        players: arrayUnion(player),
        invited: arrayRemove({ uid: invitation.toUid, name: invitation.toName, email: invitation.toEmail || "" }),
        updatedAt: serverTimestamp(),
      }),
      updateDoc(inviteRef, { status: "accepted", updatedAt: serverTimestamp() }),
    ]);
    const roomSnapshot = await getDoc(doc(db, "rooms", invitation.roomId));
    return roomSnapshot.exists() ? { id: roomSnapshot.id, ...roomSnapshot.data() } : null;
  }

  async function rejectRoomInvite(inviteId) {
    if (!inviteId) return;
    await updateDoc(doc(db, "roomInvitations", inviteId), { status: "rejected", updatedAt: serverTimestamp() });
  }

  function watchFriendRequests(uid, callback) {
    if (!uid) return () => {};
    const requestsQuery = query(collection(db, "friendRequests"), where("toUid", "==", uid));
    return onSnapshot(requestsQuery, (snapshot) => {
      callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })).filter((item) => item.status === "pending"));
    });
  }

  function watchRoomInvitations(uid, callback) {
    if (!uid) return () => {};
    const invitationsQuery = query(collection(db, "roomInvitations"), where("toUid", "==", uid));
    return onSnapshot(invitationsQuery, (snapshot) => {
      callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })).filter((item) => item.status === "pending"));
    });
  }

  function watchRoom(roomId, callback) {
    if (!roomId) return () => {};
    return onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
      callback(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
    });
  }

  async function createVoiceOffer(roomId, connectionId, payload) {
    if (!roomId || !connectionId) return;
    await setDoc(doc(db, "rooms", roomId, "voiceConnections", connectionId), {
      ...payload,
      status: "offer",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    }, { merge: true });
  }

  async function answerVoiceOffer(roomId, connectionId, answer) {
    if (!roomId || !connectionId) return;
    await updateDoc(doc(db, "rooms", roomId, "voiceConnections", connectionId), {
      answer,
      status: "answered",
      updatedAt: serverTimestamp(),
    });
  }

  async function addVoiceCandidate(roomId, connectionId, candidate) {
    if (!roomId || !connectionId || !candidate) return;
    await updateDoc(doc(db, "rooms", roomId, "voiceConnections", connectionId), {
      candidates: arrayUnion(candidate),
      updatedAt: serverTimestamp(),
    });
  }

  function watchVoiceConnections(roomId, uid, callback) {
    if (!roomId || !uid) return () => {};
    const voiceQuery = query(collection(db, "rooms", roomId, "voiceConnections"), where("participants", "array-contains", uid));
    return onSnapshot(voiceQuery, (snapshot) => {
      callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    });
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
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    setAvailability,
    createRoom,
    inviteToRoom,
    updateRoom,
    acceptRoomInvite,
    rejectRoomInvite,
    watchFriendRequests,
    watchRoomInvitations,
    watchRoom,
    createVoiceOffer,
    answerVoiceOffer,
    addVoiceCandidate,
    watchVoiceConnections,
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
