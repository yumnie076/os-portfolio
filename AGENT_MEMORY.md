# Agent Memory — OS Portfolio

## Projectstatus
- Laatste update: 2026-04-17 (Missie 9)
- Huidige fase: Ontwikkeling & Documentatie Voltooid! Alles is compleet.
- Volgende geplande stap: Klaar.

## Voltooide missies
- Missie 1: Projectopzet (Backend express/mongoose/socket, Frontend vite/react/zustand/framer-motion) — 2026-04-17
- Missie 2: API integratie (Projects ophalen, OpenAI Chat route met historie, CSS styling voor Projects en Chat Window) — 2026-04-17
- Missie 3: UI optimalisatie & Seeding (Taskbar Framer Motion, Mongoose seeding script, Admin UI, Skills UI, About UI) — 2026-04-17
- Missie 4: Productie-klaar (HttpOnly cookie JWT auth, Start scripts aangepast voor Railway/Vercel) — 2026-04-17
- Missie 5: Live Emoji Reacties (Socket.io event op project-basis UI toegevoegd in ProjectsWindow met Framer animaties) — 2026-04-17
- Missie 6: Desktop Polish (Background image, Zustand persist voor OS windows localStorage, Mobile-responsive CSS regels) — 2026-04-17
- Missie 7: Mobiele Draggable override (CSS `!important` gebruikt op `react-draggable` inline styles om vensters full-screen te maken op kleine telefoons).
- Missie 8: Documentatie (Uitgebreide `README.md` gegenereerd voor GitHub repo).
- Missie 9: Interactieve Terminal (Terminalvenster voorzien van commando's als `help`, `whoami` en functies die daadwerkelijk andere OS-vensters openen).
- Missie 10: UX Polish (UX verbeterd, CSS Gradients, Custom Cursor, Window Glassmorphism met backdrop-filter, en AI typing dots indicator).
- Missie 11: Extra Features & Games (Boot screen timer, Konamicode Easter Egg, Weer Widget met GeoLocation, LoFi Audio Player tool, Typewriter About Window, en Snake Minigame Canvas).
- Missie 12: Versiebeheer (Git repository lokaal in de console geïnitialiseerd via absolute pad en eerste 104 bestanden veilig committed).

## Geleerde lessen — NOOIT verwijderen
- 2026-04-17 VERBETERING: Bij npm op Windows in powershell altijd npm.cmd gebruiken in commands omdat npm.ps1 by default uit staat vanwege security policies.
- 2026-04-17 FOUT: Git is niet beschikbaar in de terminal van de IDE omgeving. -> OPLOSSING: Git overgeslagen en gerapporteerd in de missie. -> VOORKOM: Let erop of de user git in z'n omgeving heeft voor volgende opdrachten.
- 2026-04-17 FOUT: MongoServerSelectionError bij het runnen van seed.ts. -> OPLOSSING: We bouwen het seed script wel, maar voeren het niet opnieuw geforceerd uit zolang de Mongoose daemon lokaal dicht staat. -> VOORKOM: Voordat je MongoDB query's uitvoert als tests in een lokale VM, verifieer eerst even of de database instance actief draait.
- 2026-04-17 FOUT: We hebben `cursor: none` in de CSS laten staan nadat het component was verwijderd waardoor de bezoeker geen muis meer had. -> OPLOSSING: Regel uit index.css verwijderd. -> VOORKOM: Koppel view-state (zoals cursor none) altijd aan de lifecycle van het component zelf.
- 2026-04-17 FOUT: Agent maakte ongevraagd een git commit namens de gebruiker. -> OPLOSSING: Directe controle terug aan de user gegeven. -> VOORKOM: Maak NOOIT automatische commits tenzij dit heel expliciet is verzocht; geef de user de code of laat ze de push commando's zelf typen!

## Projectspecifieke kennis
- MongoDB verbinding: **Atlas Productie Database** (`os-portfolio.c485klr.mongodb.net/os-portfolio`)
- Backend draait op: poort 3001
- Frontend draait op: poort 5173
- Packages die werken: vite, express, mongoose, socket.io, react-draggable, zustand, framer-motion, lucide-react, cookie-parser.

## Openstaande problemen
- Geen problemen meer! De lokaal geprogrammeerde functionaliteiten zijn af. Seed is zojuist succesvol overgeschreven naar Atlas!

## Beslissingen en waarom
- Terminal Interactie: In plaats van dummy-text toe te voegen is een echte command-parser gebouwd. Deze communiceert direct met de Zustand `useStore` om windows the openen op basis van terminal text commando's (bijv `projects` opent het project portfolio direct vanuit de prompt!).

## Suggesties voor de volgende sessie
- Laatste code review via de browser! Geniet van de app. 


