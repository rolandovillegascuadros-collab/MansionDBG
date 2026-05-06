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

  function waitForAuthUser(timeout = 2500) {
    if (auth.currentUser) return Promise.resolve(auth.currentUser);
    return new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        unsubscribe();
        resolve(auth.currentUser);
      }, timeout);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        window.clearTimeout(timer);
        unsubscribe();
        resolve(user);
      });
    });
  }

  async function getCurrentUserProfile() {
    const user = await waitForAuthUser();
    if (!user) return null;
    const snapshot = await getDoc(doc(db, "users", user.uid));
    if (snapshot.exists()) return publicUserFromDoc(snapshot);
    return saveUserProfile(user, { provider: "Correo" });
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

  async function getUser(uid) {
    if (!uid) return null;
    const snapshot = await getDoc(doc(db, "users", uid));
    return snapshot.exists() ? publicUserFromDoc(snapshot) : null;
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
      maxPlayers: Number(details.maxPlayers || 4),
      status: "waiting",
      players: [{ uid: owner.uid, name: owner.name, email: owner.email || "", online: true }],
      playerUids: [owner.uid],
      invited: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return roomRef.id;
  }

  function roomHasPlayer(room, uid) {
    return (room.players || []).some((player) => player.uid === uid);
  }

  function roomHasInvite(room, uid) {
    return (room.invited || []).some((item) => item.uid === uid);
  }

  function roomInvitationId(roomId, uid) {
    return `room:${roomId}:${uid}`;
  }

  function parseRoomInvitationId(inviteId) {
    const parts = String(inviteId || "").split(":");
    return parts[0] === "room" && parts.length === 3 ? { roomId: parts[1], uid: parts[2] } : null;
  }

  async function inviteToRoom(roomId, friend, sender, details = {}) {
    if (!roomId) throw new Error("Sala invalida: crea una sala online antes de invitar.");
    if (!friend?.uid) throw new Error("Invitado invalido: el usuario debe existir en Firebase.");
    if (!sender?.uid) throw new Error("Sesion invalida: inicia sesion nuevamente.");
    if (friend.uid === sender.uid) throw new Error("No puedes invitarte a ti mismo.");
    const [roomSnapshot, friendProfile] = await Promise.all([
      getDoc(doc(db, "rooms", roomId)),
      getUser(friend.uid),
    ]);
    if (!roomSnapshot.exists()) throw new Error("La sala online ya no existe. Crea una sala nueva.");
    if (!friendProfile?.email) throw new Error("El usuario invitado no tiene correo real en Firebase.");
    if (!friendProfile.online) throw new Error(`${friendProfile.name} no esta disponible online ahora.`);
    const room = roomSnapshot.data();
    if (!roomHasPlayer(room, sender.uid)) throw new Error("Tu usuario no pertenece a esta sala online.");
    if (room.status === "playing" || room.started) throw new Error("La partida ya comenzo. No se pueden unir nuevos jugadores.");
    const maxPlayers = Number(details.maxPlayers || room.maxPlayers || 4);
    if ((room.players || []).length >= maxPlayers) throw new Error("La sala ya esta completa.");
    const inviteId = `${roomId}_${friend.uid}`;
    const existingInvite = await getDoc(doc(db, "roomInvitations", inviteId)).catch(() => null);
    if (existingInvite?.exists?.() && existingInvite.data().status === "pending") throw new Error(`${friendProfile.name} ya tiene una invitacion pendiente.`);
    if (roomHasPlayer(room, friend.uid)) throw new Error(`${friendProfile.name} ya esta dentro de la sala.`);
    if (roomHasInvite(room, friend.uid)) throw new Error(`${friendProfile.name} ya tiene una invitacion pendiente.`);
    const invitation = {
      roomId,
      toUid: friendProfile.uid,
      toName: friendProfile.name,
      toEmail: friendProfile.email || "",
      fromUid: sender.uid,
      fromName: sender.name || room.ownerName || "Jugador",
      mode: room.mode || "",
      scenario: room.scenario || "",
      maxPlayers,
      status: "pending",
    };
    try {
      await setDoc(doc(db, "roomInvitations", inviteId), {
        ...invitation,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      if (!String(error?.message || "").toLowerCase().includes("permission")) throw error;
    }
    await updateDoc(doc(db, "rooms", roomId), {
      invited: arrayUnion(invitation),
      updatedAt: serverTimestamp(),
    });
    return inviteId;
  }

  async function updateRoom(roomId, patch) {
    if (!roomId) return;
    await updateDoc(doc(db, "rooms", roomId), { ...patch, updatedAt: serverTimestamp() });
  }

  async function addRoomChat(roomId, message) {
    if (!roomId || (!message?.text && !message?.audioData)) return;
    await updateDoc(doc(db, "rooms", roomId), {
      chatMessages: arrayUnion({
        ...message,
        createdAt: Date.now(),
      }),
      updatedAt: serverTimestamp(),
    });
  }

  async function getRoom(roomId) {
    if (!roomId) return null;
    const snapshot = await getDoc(doc(db, "rooms", roomId));
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }

  async function joinRoomFromInvitation(roomId, user, invitation = {}) {
    const roomRef = doc(db, "rooms", roomId);
    const currentRoomSnapshot = await getDoc(roomRef);
    if (!currentRoomSnapshot.exists()) throw new Error("La sala invitada ya no existe.");
    const currentRoom = currentRoomSnapshot.data();
    const maxPlayers = Number(invitation.maxPlayers || currentRoom.maxPlayers || 4);
    if (currentRoom.status === "playing" || currentRoom.started) throw new Error("La partida ya comenzo. No puedes unirte ahora.");
    if (roomHasPlayer(currentRoom, user.uid)) return { id: currentRoomSnapshot.id, ...currentRoom };
    if ((currentRoom.players || []).length >= maxPlayers) throw new Error("La sala ya esta completa.");
    const roomInvitation = (currentRoom.invited || []).find((item) => item.uid === user.uid);
    if (!roomInvitation && invitation.toUid !== user.uid) throw new Error("Tu usuario no tiene invitacion pendiente en esta sala.");
    const player = { uid: user.uid, name: user.name, email: user.email || "", online: true };
    const patch = {
      players: arrayUnion(player),
      playerUids: arrayUnion(user.uid),
      updatedAt: serverTimestamp(),
    };
    if (roomInvitation) patch.invited = arrayRemove(roomInvitation);
    await updateDoc(roomRef, patch);
    const roomSnapshot = await getDoc(roomRef);
    return roomSnapshot.exists() ? { id: roomSnapshot.id, ...roomSnapshot.data() } : null;
  }

  async function acceptRoomInvite(inviteId, user) {
    if (!inviteId) throw new Error("Invitacion invalida: falta identificador.");
    if (!user?.uid) throw new Error("Sesion invalida: inicia sesion nuevamente.");
    const roomBased = parseRoomInvitationId(inviteId);
    const inviteRef = roomBased ? null : doc(db, "roomInvitations", inviteId);
    const inviteSnapshot = inviteRef ? await getDoc(inviteRef).catch(() => null) : null;
    let invitation = inviteSnapshot?.exists?.() ? inviteSnapshot.data() : null;
    if (!invitation && roomBased) {
      const roomSnapshot = await getDoc(doc(db, "rooms", roomBased.roomId));
      if (roomSnapshot.exists()) invitation = (roomSnapshot.data().invited || []).find((item) => item.uid === user.uid) || null;
    }
    if (!invitation) throw new Error("Invitacion invalida o expirada.");
    if (invitation.status !== "pending") throw new Error("Esta invitacion ya fue respondida.");
    if (invitation.toUid !== user.uid) throw new Error("Esta invitacion pertenece a otro usuario.");
    const room = await joinRoomFromInvitation(invitation.roomId, user, invitation);
    if (inviteRef) await updateDoc(inviteRef, { status: "accepted", updatedAt: serverTimestamp() }).catch(() => {});
    return room;
  }

  async function rejectRoomInvite(inviteId) {
    if (!inviteId) return;
    const roomBased = parseRoomInvitationId(inviteId);
    const inviteRef = roomBased ? null : doc(db, "roomInvitations", inviteId);
    const inviteSnapshot = inviteRef ? await getDoc(inviteRef).catch(() => null) : null;
    let invitation = inviteSnapshot?.exists?.() ? inviteSnapshot.data() : null;
    if (!invitation && roomBased) {
      const roomSnapshot = await getDoc(doc(db, "rooms", roomBased.roomId));
      if (roomSnapshot.exists()) invitation = (roomSnapshot.data().invited || []).find((item) => item.uid === roomBased.uid) || null;
    }
    if (!invitation) return;
    await Promise.all([
      inviteRef ? updateDoc(inviteRef, { status: "rejected", updatedAt: serverTimestamp() }).catch(() => {}) : Promise.resolve(),
      updateDoc(doc(db, "rooms", invitation.roomId), {
        invited: arrayRemove(invitation),
        updatedAt: serverTimestamp(),
      }).catch(() => {}),
    ]);
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
    let latestCollection = [];
    let latestRooms = [];
    const emit = () => callback([...latestCollection, ...latestRooms]);
    const invitationsQuery = query(collection(db, "roomInvitations"), where("toUid", "==", uid));
    const roomsQuery = collection(db, "rooms");
    const unsubscribeInvites = onSnapshot(invitationsQuery, (snapshot) => {
      latestCollection = snapshot.docs.map((item) => ({ id: item.id, ...item.data() })).filter((item) => item.status === "pending");
      emit();
    }, () => {
      latestCollection = [];
      emit();
    });
    const unsubscribeRooms = onSnapshot(roomsQuery, (snapshot) => {
      latestRooms = snapshot.docs.flatMap((roomDoc) => {
        const room = roomDoc.data();
        return (room.invited || [])
          .filter((item) => item.uid === uid && item.status === "pending")
          .map((item) => ({ id: roomInvitationId(roomDoc.id, uid), ...item, roomId: roomDoc.id, mode: room.mode, scenario: room.scenario }));
      });
      emit();
    });
    return () => {
      unsubscribeInvites();
      unsubscribeRooms();
    };
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
    getCurrentUserProfile,
    listUsers,
    getMyFriends,
    findUser,
    getUser,
    addFriend,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    setAvailability,
    createRoom,
    inviteToRoom,
    updateRoom,
    addRoomChat,
    getRoom,
    joinRoomFromInvitation,
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
