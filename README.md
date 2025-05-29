# DevOps Status Dashboard

## Overview

This project is a real-time DevOps status dashboard that monitors the health of multiple server regions by polling their status endpoints and broadcasting updates via WebSocket to a React frontend.

- **Backend**: Node.js + TypeScript WebSocket server
- **Frontend**: React + TypeScript dashboard client
- **Features**:  
  - Periodic polling of multiple regional endpoints  
  - Aggregation and error handling  
  - WebSocket push updates to multiple clients  
  - Real-time UI with CPU load, DB/Redis status, and other metrics  
  - Caching to prevent overloading endpoints with multiple connections

## Deployment

- Frontend URL: https://dev-dashboard-sigma.vercel.app/
- Backend WebSocket URL: https://dev-dashboard-production.up.railway.app/

## How to Run Locally

### Backend & Frontend

```bash
Backend

cd server
npm install
npm run build
npm start

Frontend

cd client
npm install
npm start

