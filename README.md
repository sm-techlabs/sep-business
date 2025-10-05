# 🧱 SEP Business App - Modern Methods of Software Engineering - Group 17

A minimal web application for the SEP. Demonstrates a React frontend and a Node.js Express backend.

---

## Project Structure

```
sep-business/
├── .github/workflows/  # CI/CD Automation
├── backend/            # Node.js Express API
├── frontend/           # React UI
└── infra/              # Terraform OCI Infrastructure
```

---

## Running the App Locally

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The backend runs at **http://localhost:3000** (unless configured otherwise).

---

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

The frontend will start on the port shown in the terminal (e.g. `http://localhost:5173` for Vite).

---

### Run full-stack application

Open two terminals and run backend and frontend separately:
```bash
# Terminal 1
cd backend && npm start
# Terminal 2
cd frontend && npm run dev
```

---

## Running Backend Tests

In the `backend` directory:
```bash
npm test
```

Tests use Jest and cover routes and basic logic.

---

## Versioning

Automated with **semantic-release**. Use Conventional Commits for proper version bumps.

---

## Authors

**Moa Granberg** - KTH Physics Graduate

**Pavlos Spanoudakis** - MSc Student @ KTH  

**Sam Mosios** — Site Reliability Engineer & MSc Student @ KTH
