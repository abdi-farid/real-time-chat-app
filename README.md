# Real-Time Chat App 🗨️

Une application de chat en temps réel construite avec **React.js** pour le frontend et **Spring Boot** pour le backend, utilisant **WebSockets (STOMP + SockJS)**.

---

## 📦 Structure du projet


real-time-chat-app/
├── chat-backend/ → Backend Spring Boot
├── chat-frontend/ → Frontend React.js




---

## 🚀 Fonctionnalités

- 💬 Envoi de messages en temps réel avec WebSocket
- 👥 Détection des connexions/déconnexions d’utilisateurs (JOIN/LEAVE)
- 📱 Interface responsive avec Bootstrap
- 🔁 Scroll automatique vers le dernier message
- 🎨 Différenciation visuelle entre les messages de soi et des autres

---

## 🛠️ Technologies utilisées

### Frontend – `React.js`

- React 18+
- React Hooks
- Bootstrap 5
- react-icons
- SockJS-client
- @stomp/stompjs

### Backend – `Spring Boot`

- Spring Boot 3+
- Spring WebSocket (STOMP)
- Spring Messaging
- Java 17+

---

## ⚙️ Installation

### 🔹 Backend (Spring Boot)

```bash
cd chat-backend
./mvnw spring-boot:run
```


Ou pour compiler et exécuter le .jar :
```bash
mvn clean install
java -jar target/chat-backend-0.0.1-SNAPSHOT.jar
```

Le backend tourne sur : http://localhost:8080


🔹 Frontend (React)


```bash
cd chat-frontend
npm install
npm start
```

L’application React tourne sur : http://localhost:3000



💬 Aperçu
- L’utilisateur saisit un nom d’utilisateur pour rejoindre le chat.

- Les messages sont transmis en temps réel via WebSocket.

- Messages JOIN/LEAVE indiquent l’activité des utilisateurs.

- Interface propre, simple, et intuitive.

