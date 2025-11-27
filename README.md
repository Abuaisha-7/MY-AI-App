# MY-AI-App

A small full-stack AI/chat example using a Vite React client and a Bun-powered TypeScript server. The repo is organized as a workspace with the client and server under `packages/`.

This README explains how to install dependencies, run the project in development, and build it for production.

## Contents

- `index.ts` - (root) entry script and workspace configuration (uses Bun for some scripts).
- `packages/client/` - React + Vite front-end (TypeScript).
- `packages/server/` - TypeScript server (Bun/Express-like) implementing chat APIs and controllers.

## Prerequisites

- Bun (recommended) — https://bun.sh
- Or Node.js >= 18 and npm / pnpm / yarn (most commands below show both Bun and npm variants).

Note: The repository uses workspaces. Installing at the repository root will install dependencies for the packages.

## Quick start (recommended: Bun)

1. From repository root, install dependencies:

```bash
bun install
```

2. Start the server (from its package):

```bash
cd packages/server
bun run dev
# or to run once: bun run start
```

3. Start the client (in a separate terminal):

```bash
cd packages/client
bun install # optional if already installed at root
bun run dev
# or with npm: npm run dev
```

Open the client URL printed by Vite (usually http://localhost:5173) and the server will be available at the port configured in the server (see ENV section).

## Quick start (Node / npm)

If you don't use Bun, you can use npm or pnpm. From the repository root:

```bash
npm install
cd packages/server
npm install
npm run dev # if available (server package.json uses bun by default, so this may require adjusting scripts)

# in another terminal
cd packages/client
npm install
npm run dev
```

If a `dev` script relies on Bun-specific features, replace with the appropriate Node command or install Bun.

## Build for production

Client:

```bash
cd packages/client
npm run build
```

Server:

```bash
cd packages/server
# If server build steps are required, run them here. By default the server runs TypeScript directly with Bun.
```

## Environment variables

The server may read configuration from a `.env` file (see `dotenv` in `packages/server/package.json`). Create a `.env` file in `packages/server/` with values such as:

```
PORT=3000
OPENAI_API_KEY=your_api_key_here
# other vars used by the server
```

Adjust keys to match your provider and usage.

## Project layout (important files)

- `packages/client/src/` — React app source (see `App.tsx`, `ChatBot.tsx`, `components/`).
- `packages/client/vite.config.ts` — Vite config for the client.
- `packages/server/index.ts` — Server entry (handled by Bun scripts in `packages/server/package.json`).
- `packages/server/controllers/` — API controllers (e.g., `chat.controller.ts`).
- `packages/server/services/` — Business logic and service code.

## Scripts (observed)

Root `package.json` includes:

- `dev` — runs `bun run index.ts` (root dev helper)
- `format` — prettier formatting

Client `packages/client/package.json` includes:

- `dev` — `vite`
- `build` — build + tsc

Server `packages/server/package.json` includes:

- `dev` — `bun run --watch index.ts`
- `start` — `bun run index.ts`

Use the package-level scripts in `packages/client` and `packages/server` to run the respective parts.

## Contributing

1. Fork and create a feature branch.
2. Follow existing code style (Prettier + ESLint in client).
3. Open a PR with a clear description and test steps.

## Troubleshooting

- If you see Bun-specific errors and you don't have Bun installed, install Bun or run equivalent Node commands.
- If ports are in use, change `PORT` in `packages/server/.env` or in the server start command.

## License & Contact

This repository does not include a license file by default. Add `LICENSE` if you want to publish under an open-source license.

For questions, open an issue or contact the repository owner.
