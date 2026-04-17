# OS Portfolio

Een interactief, "desktop-style" web portfolio gebouwd door Yumnie. Dit project emuleert een besturingssysteem in een browser, compleet met draggable vensters, live emoji-reacties via Socket.io en een ingebouwde OpenAI-assistent.

## 🚀 Features

- **Draggable OS Windows**: Volledig te verslepen en positioneren vensters (`framer-motion` & `react-draggable`).
- **Live Emoji Reacties**: Bezoekers kunnen live reacties achterlaten op projecten via WebSockets (`Socket.io`).
- **OpenAI Integratie**: Een AI-assistent (Chatbot) aangesloten op `GPT-4o` die context-aware reageert.
- **Admin Authenticatie**: Beheeromgeving beveiligd met JWT op basis van HttpOnly cookies.
- **Zustand Persist**: Herladen van de browser onthoudt welke vensters geopend zijn.
- **Mobiel Vriendelijk**: Volautomatische transformatie naar responsive full-screen views bij kleine schermen (`max-width: 600px`).

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Framer Motion
- Zustand (State management)
- Socket.io-client
- CSS3 (Custom properties, grid, flexbox)
- Lucide React (Icons)

### Backend
- Node.js & Express
- Mongoose (MongoDB)
- Socket.io
- JWT & bcryptjs
- OpenAI API
- cookie-parser & helmet

## 💻 Lokaal Draaien

### Vereisten
- Node.js (v18+)
- MongoDB (lokaal geïnstalleerd en draaiend op poort 27017, of een MongoDB Atlas string).

### Stap 1: Installatie
Kloon de repository en installeer pakketten voor de backend en frontend.
```bash
git clone https://github.com/jouw-repo/os-portfolio.git
cd os-portfolio

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Stap 2: Environment Variables
Kopieer de environment voorbeelden (of pas aan indien je geen variabelen hebt):

**Backend `.env`:**
```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/os-portfolio
JWT_SECRET=super-secret-jwt-key
ADMIN_PASSWORD=admin
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=sk-...
```

**Frontend `.env.local`:**
```env
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
```

### Stap 3: Database Seeding (optioneel)
Om testdata (projecten etc.) te inladen:
```bash
cd backend
npm run build
npx ts-node src/seed.ts
```

### Stap 4: Start Development Servers
Start de backend:
```bash
cd backend
npm run dev
```

Start in een andere terminal de frontend:
```bash
cd frontend
npm run dev
```
Open de browser en navigeer naar `http://localhost:5173`.

## 🔒 Security Architectuur
- **Rate Limiting**: Preventie van brute-force op `/admin/login` en API endpoints.
- **Helmet**: Standard express beveiligingsheaders.
- **HttpOnly Cookies**: JWT wordt via een veilige in browser-code onbereikbare cookie verzonden, waarmee XSS-aanvallen geen toegang hebben tot de tokens.

---

**© 2026 Yumnie**
Gemaakt met passie voor de web-technologie.
