# Architecture

OrbitBoard is a small two-tier application: a React front end talks to an Express
API over HTTP, and the API persists data to a local JSON file. There's no
external database required to run it.

## High-level diagram

```
        ┌──────────────────────────┐          ┌──────────────────────────┐
        │        client/           │          │         server/          │
        │   React + Vite (UI)      │          │   Node.js + Express API  │
        │                          │  HTTP    │                          │
        │  App.jsx                 │ ───────► │  routes/boards.js        │
        │   ├─ Column.jsx          │  fetch   │   ├─ GET    /api/boards  │
        │   │   ├─ Card.jsx        │ ◄─────── │   ├─ POST   /api/cards   │
        │   │   └─ AddCard.jsx     │  JSON    │   ├─ PUT    /api/cards   │
        │  api.js (API_URL)        │          │   └─ DELETE /api/cards   │
        └──────────────────────────┘          │  store/dataStore.js      │
                                               │        │                 │
                                               │        ▼                 │
                                               │  data/board.json  (disk) │
                                               └──────────────────────────┘
```

## Request lifecycle

1. The browser loads the built client (served as static files by Express in
   `npm run dev`).
2. `client/src/api.js` calls the API using `API_URL` from the environment.
3. `server/src/routes/boards.js` handles the route and calls the data store.
4. `server/src/store/dataStore.js` reads/writes `DATA_FILE` (JSON on disk).
5. JSON flows back to the client, which re-renders the board.

## Directory responsibilities

| Path | Responsibility |
|---|---|
| `server/src/index.js` | Express app entry; loads env, wires middleware, serves client build |
| `server/src/routes/boards.js` | REST endpoints for boards & cards |
| `server/src/store/dataStore.js` | JSON file read/write helpers |
| `server/src/middleware/` | Logging + error-handling middleware |
| `client/src/App.jsx` | Fetches board and renders columns |
| `client/src/components/` | Presentational components (Column, Card, AddCard) |
| `scripts/seed.js` | Writes sample data into `DATA_FILE` |
| `scripts/check-env.js` | Verifies required env vars are present |

## Configuration

All configuration comes from environment variables (see `.env.example`):

- `PORT` — API/server port (default `3000`)
- `API_URL` — base URL the client uses to reach the API
- `DATA_FILE` — path to the JSON data file
