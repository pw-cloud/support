# Frontend

Neutrales React + Vite-Frontend des Monorepo-Starters.

## Skripte

```bash
npm run dev       # Entwicklungs-Server
npm run build     # Produktions-Build
npm run lint      # Oxlint
npm run preview   # Vite-Preview
```

## API-Anbindung

Die App fragt `/api/health` ab. Im Dev-Modus leitet Vite `/api` an das
Backend unter `http://localhost:3000` weiter (siehe `vite.config.ts`).
