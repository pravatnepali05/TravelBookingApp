TravelEase
TravelEase ist eine Full-Stack MERN (MongoDB, Express, React, Node.js) Webanwendung für Tourbuchung und Reiseplanung. Nutzer können verfügbare Touren durchsuchen, Details einsehen, Reisen buchen und ihre Reservierungen verwalten. Administratoren haben die Möglichkeit, Touren und Kategorien über ein geschütztes Dashboard zu erstellen und zu verwalten.

FUNKTIONEN:

-Authentifizierung & Autorisierung (JWT-basiertes Login/Registrierung mit Admin- und Benutzerrollen)
-Tour-Kategorien und Beiträge – Durchsuchen und Anzeigen von Touren mit Details und Bildern
-Buchungssystem – Touren zum Warenkorb hinzufügen und buchen
-Bild-Uploads über Cloudinary (konfigurierbar in .env)
-Responsives UI mit React + Tailwind
-Admin-Dashboard – Verwaltung von Touren, Kategorien und Buchungen

PROJEKTSTRUKTUR (Client und Server) 
ravelEase/
│── client/        # React-Frontend
│   ├── src/       # Komponenten, Seiten, Routen
│   ├── public/    # Statische Dateien
│── server/        # Express-Backend
│   ├── src/
│   │   ├── models/       # Mongoose-Schemas
│   │   ├── controllers/  # API-Logik
│   │   ├── routes/       # REST-Endpunkte
│   │   ├── middlewares/  # Authentifizierung, Fehlerbehandlung
│   └── index.js   # Einstiegspunkt für den Server
│── README.md
│── package.json   # Root-Abhängigkeiten (falls Monorepo)

INSTALLATION & EINRICHTUNG

*Repository klonen
-git clone https://github.com/pravatnepali05/TravelBookingApp/tree/my-new-branch

*Abhängigkeiten installieren
Für den Server:
-cd server
npm install


Für den Client:
-cd ../client
-npm install

*Projekt starten
Backend starten:

-cd server
-npm run dev


Frontend starten:

cd client
npm run dev


Standardmäßig:

React-App läuft unter http://localhost:5173

API-Server läuft unter http://localhost:3000

Nutzung

Benutzer:
-
Registrieren oder anmelden
-Touren durchsuchen und Details ansehen
-Touren buchen und Warenkorb verwalten

Administrator:
-Anmeldung mit Admin-Zugangsdaten
-Zugriff auf das Admin-Dashboard
-Touren und Kategorien erstellen, bearbeiten und löschen
-Buchungen anzeigen und verwalten

Technologiestack
-Frontend: React, Vite, Tailwind CSS, React Router
-Backend: Node.js, Express.js
-Datenbank: MongoDB (Mongoose ODM)

Bildspeicherung: Cloudinary

Authentifizierung: JWT

