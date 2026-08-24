# FAQ & Troubleshooting

Quick answers to common setup questions. For the full walkthrough, see
[`SETUP.md`](../SETUP.md).

## Setup

### `node -v` shows v16 (or lower) — what do I do?
OrbitBoard requires **Node 18+** (see `.nvmrc` and the `engines` field in
`package.json`). Upgrade with nvm:
```bash
nvm install 18
nvm use 18
node -v   # should print v18.x
```

### `npm install` prints `ERESOLVE` / peer dependency warnings
This is **expected**. One dependency (`react-beautiful-dnd`, used for the planned
drag-and-drop feature) is pinned to an older major version whose peer range
predates React 18. Install with:
```bash
npm install --legacy-peer-deps
npm --prefix server install --legacy-peer-deps
npm --prefix client install --legacy-peer-deps
```

### The server crashes with `Missing config: did you run cp .env.example .env?`
You skipped the env step. Create your `.env`:
```bash
cp .env.example .env      # macOS/Linux
copy .env.example .env    # Windows
```
Then run `npm run dev` again.

### `Error: listen EADDRINUSE :::3000`
Port 3000 is already in use. Either close the other process, or run on a
different port:
```bash
PORT=3001 npm run dev
```

### The board is empty
Seed sample data:
```bash
npm run seed
```

## Known gaps & good first issues 🐣

OrbitBoard is intentionally **~50% complete**. These are open for contribution:

| Area | Status | Notes |
|---|---|---|
| Drag-and-drop between columns | ⏳ Not implemented | `react-beautiful-dnd` is installed but unused. See `client/src/components/Column.jsx` TODO. |
| Card editing | ⏳ Read-only | The `PUT` endpoint exists, but the UI doesn't wire it up yet. |
| **Deleting a card** | 🐛 **Broken (good first bug)** | Clicking delete throws a server error. The app still runs fine otherwise. |

### 🐛 The "delete a card" bug (good first issue)
When you click the delete (✕) button on a card, the request fails and the server
logs an error. The app itself keeps running — only that one action breaks.

- **Where to look:** `server/src/store/dataStore.js` (`deleteCard`) and
  `server/src/routes/boards.js` (the `DELETE` route).
- **Hint:** pay close attention to how the code *finds* the card before removing
  it, and what value it filters on.
- **Acceptance:** deleting a card removes it and returns `{ "ok": true }`, and
  `npm run dev` still boots and renders the board.

This is a great first contribution — grab it from the Issues tab! 💚
