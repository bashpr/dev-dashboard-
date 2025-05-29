# DevOps Status Dashboard


A real-time monitoring dashboard displaying infrastructure health across multiple regions, built with Node.js (WebSocket server) and React/TypeScript.

## Features

- **Real-time updates**: WebSocket connection for live data
- **Region monitoring**: Track servers across 6 global regions
- **Key metrics**:
  - Server count
  - Active connections
  - CPU load (with color-coded thresholds)
- **Status indicators**:
  - ✅ Healthy (<70% CPU)
  - ⚠️ Degraded (70-90% CPU)
  - ❌ Error (>90% CPU or connection issues)
- **Connection monitoring**: Live/Disconnected status

## Technologies

- **Backend**:
  - Node.js with TypeScript
  - WebSocket server (`ws` library)
  - Axios for API requests
- **Frontend**:
  - React with TypeScript
  - Functional components with hooks
  - Responsive CSS grid layout
## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/devops-dashboard.git
   cd devops-dashboardnt, etc.

🛠️ Getting Started
1. Clone the Repository
bash
git clone https://github.com/your-username/dev-dashboard.git
cd dev-dashboard/client
2. Install Dependencies
bash
npm install
3. Start the Dev Server
bash
npm run dev
App runs at → http://localhost:5173

🏗️ Production Build
bash
npm run build        # Outputs to /dist
npm run preview      # Locally test the production build

⚙️ Tech Stack
Frontend: Vite + TypeScript

Linting: ESLint (pre-configured)
