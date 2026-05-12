# Cambios aplicados: indicadores, zona central responsiva y chat

Se añadió una capa final de estilos en `improvements.css` para responder a la solicitud de ajuste visual de la mesa de juego.

## Resumen de cambios

| Área | Cambio realizado |
|---|---|
| Indicadores del turno | Los indicadores ahora quedan agrupados dentro de un único bloque visual con el rótulo **Indicadores del turno**, borde verde y comportamiento compacto por columnas. |
| Zona central del juego | Se reforzó el uso de `minmax(0, 1fr)`, `min-width: 0`, `min-height: 0`, `dvh` y reglas específicas para notebooks, tablets y móviles, con el objetivo de evitar desbordes laterales y cortes del área principal. |
| Chat | La columna derecha conserva recursos, pero el panel de chat recibió más altura real mediante `clamp(240px, 34dvh, 380px)` en escritorio y alturas mayores en tablet/móvil. |
| Tablet y móvil | La mesa principal pasa a ocupar ancho completo y se apilan las zonas para evitar que la interfaz quede comprimida horizontalmente. |
| Caché | Se actualizó el parámetro de versión de `improvements.css` en `index.html` a `layout-fix-v17-turn-chat-responsive`. |

## Verificación realizada

Se ejecutaron verificaciones estáticas con `node --check` sobre `script.js` y `online-backend.js`, se confirmó que el HTML carga la nueva versión de `improvements.css` y se generaron capturas automáticas en tres tamaños: escritorio 1365×768, tablet 900×1200 y móvil 430×932. La captura automática inicial abre la pantalla de ingreso, por lo que sirve para confirmar carga y ausencia de fallos visibles de renderizado global; la lógica de layout de partida fue validada por inspección directa de los selectores reales `app-shell`, `game-surface`, `board`, `play-area`, `controls-panel`, `live-trackers`, `right-rail`, `chat-panel` y `resources-panel`.
