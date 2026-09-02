# Backend

Neutrales NestJS-Backend des Monorepo-Starters.

## Endpunkte

| Methode | Pfad      | Antwort                                            |
| ------- | --------- | -------------------------------------------------- |
| GET     | `/`       | `{ "message": "Support API is running" }`           |
| GET     | `/health` | `{ "status": "ok", "timestamp": "...ISO-8601..." }` |

## Skripte

```bash
npm run start:dev    # Watch-Modus
npm run build        # Produktions-Build
npm run test         # Unit-Tests
npm run test:e2e     # End-to-End-Tests
npm run lint         # Linting mit Autofix
```

## Konfiguration

Die Backend-Konfiguration liest `.env` aus `apps/backend` oder aus dem
Repository-Root. Beispiel: `.env.example`.

| Variable      | Standard                                     | Beschreibung                |
| ------------- | -------------------------------------------- | --------------------------- |
| `PORT`        | `3000`                                        | HTTP-Port                   |
| `CORS_ORIGIN` | `http://localhost:5173`                       | Erlaubte Frontend-Origin    |
| `DATABASE_URL`| `postgresql://...support_db`                 | Optionale Prisma-Datenbank  |
