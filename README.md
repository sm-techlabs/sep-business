# Minimal SEP App Scaffold  

A simple web app with:  
- **Frontend:** static HTML  
- **Backend:** Node.js + Express  
- **CI/CD:** GitHub Actions for Dev & Prod  

## Running Locally  

### Backend  
```bash
cd backend
npm install
npm run dev
```
➡ Runs at [http://localhost:3000](http://localhost:3000)  

### Frontend  
Just open `frontend/index.html` in your browser and click **“Fetch Hello”**.  

## Deployment  

- **Dev:** Deploys automatically when you push to `main`.  
- **Prod:** After testing Dev, trigger “Promote to Prod” in GitHub Actions (requires approval).  

✅ That’s it. You can run it locally, push to deploy to Dev, and promote to Prod when ready.  
