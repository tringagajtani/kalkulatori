# Calculator Web App

Një kalkulator i thjeshtë me backend Node.js/Express dhe frontend React (Vite).

## Struktura e projektit

```
├── api/              # Vercel serverless functions
├── backend/          # API server lokal (Express)
├── frontend/         # React app (Vite)
├── lib/              # Logjika e përbashkët e kalkulatorit
└── README.md
```

## Kërkesat

- [Node.js](https://nodejs.org/) v18 ose më i ri
- npm (vjen me Node.js)

## Instalimi

### 1. Backend

```bash
cd backend
npm install
```

### 2. Frontend

```bash
cd frontend
npm install
```

## Nisja e projektit

Duhet të nisni **dy terminale** — një për backend, një për frontend.

### Terminal 1 — Backend (porti 3001)

```bash
cd backend
npm run dev
```

Do të shihni: `Calculator API running on http://localhost:3001`

### Terminal 2 — Frontend (porti 5173)

```bash
cd frontend
npm run dev
```

Hapni shfletuesin në: **http://localhost:5173**

## API

### `POST /api/calculate`

**Request body:**

```json
{
  "num1": 10,
  "num2": 5,
  "operation": "add"
}
```

**Operacionet e mbështetura:** `add`, `subtract`, `multiply`, `divide`

**Përgjigje e suksesshme:**

```json
{
  "result": 15
}
```

**Përgjigje gabimi (p.sh. pjestim me 0):**

```json
{
  "error": "Cannot divide by zero"
}
```

## Përdorimi

1. Shkruani dy numra në fushat e input-it
2. Klikoni një nga butonat `+`, `-`, `*`, `/`
3. Rezultati shfaqet poshtë (ose mesazh gabimi nëse diçka shkon keq)

## Deploy në Vercel

Projekti është konfiguruar për Vercel:

- **Frontend** — buildohet nga `frontend/` (Vite → `frontend/dist`)
- **API** — `/api/calculate` ekzekutohet si serverless function (folderi `api/`)

### Hapat

1. Ngarko projektin në GitHub
2. Shko te [vercel.com](https://vercel.com) → **Add New Project**
3. Importo repozitorin
4. **Root Directory** — lëre bosh (root i projektit)
5. Vercel lexon automatikisht `vercel.json` — kliko **Deploy**

Pas deploy-it, frontend-i dhe API-ja funksionojnë në të njëjtin domain (p.sh. `https://projekti.vercel.app/api/calculate`).

### Lokal vs Vercel

| Mjedis | API |
|--------|-----|
| Lokal | Express në portin 3001 (proxy përmes Vite) |
| Vercel | Serverless function në `api/calculate.js` |
