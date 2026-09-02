# Support App – Fullstack Monorepo Starter

Dieses Repository ist ein neutrales, lauffähiges Grundgerüst für eine
Fullstack-TypeScript-Anwendung. Es enthält keine fachliche Geschäftslogik
mehr – nur das saubere Konstrukt zum Weiterbauen.

## Struktur

```text
.
├── apps/
│   ├── backend/      # NestJS API
│   └── frontend/     # React + Vite UI
├── packages/         # Platzhalter für gemeinsame Pakete
├── .env.example      # Beispiel-Umgebungsvariablen
└── package.json      # NPM-Workspaces + gemeinsame Skripte
```

## Technologien

- **Backend:** NestJS 11, TypeScript, Jest, ESLint + Prettier
- **Frontend:** React 19, Vite 8, TypeScript, Oxlint
- **Monorepo:** npm workspaces

## Schnellstart

Voraussetzungen: Node.js (>= 22) und npm.

```bash
npm install
cp .env.example .env
npm run dev:backend
npm run dev:frontend
```

Danach erreichbar:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Health-Check: http://localhost:3000/health

Das Frontend ruft `/api/health` auf und proxyed diese Anfrage im Dev-Modus an
das Backend.

## Nützliche Skripte

| Befehl                  | Beschreibung                                      |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Startet Backend und Frontend (Watch-Modus)        |
| `npm run dev:backend`   | Startet nur das NestJS-Backend                    |
| `npm run dev:frontend`  | Startet nur das Vite-Frontend                     |
| `npm run build`         | Baut alle Workspaces                                |
| `npm run test`          | Führt alle Tests aus                               |
| `npm run lint`          | Lintet alle Workspaces                             |
| `npm run db:generate`   | Generiert den Prisma-Client (optional)             |
| `npm run db:migrate`    | Führt Prisma-Migrationen aus (optional)            |

## Datenbank (optional)

Ein neutrales Prisma-Schema liegt bereit unter
`apps/backend/prisma/schema.prisma`. Es ist derzeit **nicht** im aktiven
Backend-Code eingebunden, damit das Grundgerüst ohne laufende Datenbank
gebaut und getestet werden kann.

Wenn du eine Datenbank anbinden möchtest:

1. `DATABASE_URL` in deiner `.env` setzen.
2. `npm run db:generate` ausführen.
3. `npm run db:migrate` ausführen.

Hinweis: `prisma generate` lädt Binärdateien von `binaries.prisma.sh`. In
Umgebungen ohne Zugriff auf diese Domain schlägt die Generierung fehl; Build,
Tests und Linting des Skeletons funktionieren trotzdem ohne Prisma.

## Lokale Entwicklung

Beide Apps können zusammen oder einzeln laufen. Die Workspace-Skripte über
npm stellen sicher, dass alle Abhängigkeiten aufgelöst werden.
