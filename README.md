# Vibe Dashboard

Full-stack app: Express API + Next.js 14 (App Router) with glassmorphism UI, debounced search, and responsive card layout.

## Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env   # optional; PORT defaults to 5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # optional; API URL defaults to http://localhost:5000
```

## Run

**Terminal 1 – API**

cd backend
npm start

**Terminal 2 – Frontend**

cd frontend
npm run dev
```

App runs at `http://localhost:3000`.

## Project structure

vibe-dashboard/
├── backend/
│   ├── data/
│   │   └── items.js          # In-memory items
│   ├── routes/
│   │   └── items.js          # GET /api/items?search=term
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── ItemCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── SearchInput.tsx
│   ├── hooks/
│   │   └── useDebounce.ts
│   ├── lib/
│   │   └── api.ts            # Axios API client
│   ├── .env.example
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md


```

## Images

Below are some visual examples showing the dashboard functionality:

<p align="center">
  <img src="Images/Dashboard%20Overview.png" alt="Dashboard Overview" width="600" />
  <br>
  <em>Dashboard overview with item cards, search, and pagination.</em>
</p>

<p align="center">
  <img src="Images/Search%20view.png" alt="Search View" width="600" />
  <br>
  <em>Search functionality in action.</em>
</p>

<p align="center">
  <img src="Images/Pagination.png" alt="Pagination" width="600" />
  <br>
  <em>Pagination component in action.</em>
</p>

> Images are located in the `Images/` folder. Add your own screenshots for more examples.

## API
  Returns all items.
  Returns items whose `name` contains `term` (case-insensitive).

Response: `{ "items": [{ "id", "name", "description", "price" }, ...] }`
