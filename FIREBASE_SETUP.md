# Activar online real en hosting

Esta PWA ya tiene una capa opcional de Firebase para login real, base de datos, amigos y salas.

1. Crea un proyecto en Firebase.
2. En Authentication, activa solo Email/Password.
3. En Firestore Database, crea una base de datos.
4. Copia la configuracion web del proyecto en `firebase-config.js`.
5. Cambia `enabled: false` por `enabled: true`.
6. En Firebase Authentication agrega tu dominio de hosting en dominios autorizados.
7. No actives proveedores sociales: el juego usa unicamente usuarios creados en el sitio.

Colecciones usadas:

- `users`: perfil publico, correo, usuario, edad, fecha de nacimiento, proveedor, estado online y amigos.
- `rooms`: salas creadas, modo, escenario, jugadores e invitados.

Reglas Firestore recomendadas para pruebas controladas:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && request.auth.uid == userId;
    }
    match /rooms/{roomId} {
      allow read, create, update: if request.auth != null;
    }
  }
}
```
