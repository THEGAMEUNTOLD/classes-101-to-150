# Socket.IO 

## 1. What is Socket.IO?

**Socket.IO** ek JavaScript library hai jo **real-time communication** allow karti hai between **client (browser)** aur **server**.

Iska use karke client aur server **instant data exchange** kar sakte hain bina page reload ke.

Example:

* Chat application
* Live notifications
* Online multiplayer games
* Live tracking apps
* Realtime dashboards

---

## 2. Why do we need Socket.IO?

Normal **HTTP request-response model** me client request bhejta hai aur server response deta hai.

Lekin kuch applications me **real-time updates** chahiye hote hain.

Example:

* WhatsApp message instantly aana
* Instagram live comments
* Live stock price updates

Socket.IO **WebSocket connection** use karke **continuous connection** maintain karta hai.

Isliye data **instant send aur receive** ho sakta hai.

---

# Code Explanation

```javascript
import App from "./src/App.js";
import { createServer } from "http";
import { Server } from "socket.io";
```

### Explanation

* `App` → Express application
* `createServer` → HTTP server banata hai
* `Server` → Socket.IO server create karta hai

---

# 3. Why we use httpServer?

```javascript
const httpServer = createServer();
```

Socket.IO ko **HTTP server ke upar run karna padta hai**.

Express sirf **request-response handle karta hai**,
lekin Socket.IO ko **persistent connection** chahiye hota hai.

Isliye hum **HTTP server create karke uske saath Socket.IO attach karte hain**.

Example structure:

```
Browser
   │
HTTP Server
   │
Socket.IO
```

---

# 4. What is `io : Server` ?

```javascript
const io = new Server(httpServer);
```

Yaha

* **Server** → Socket.IO ka main server class hai
* **io** → Socket.IO ka instance hai

`io` ka use hum **connections handle karne aur events emit karne ke liye** karte hain.

---

# 5. What does `on` mean?

```javascript
io.on("connection", (socket) => {

});
```

`on` ka matlab hai **event ko listen karna**.

Yeh wait karta hai jab tak event trigger na ho.

Example:

```
on = listen
```

Example:

```javascript
socket.on("message", (msg) => {
    console.log(msg);
});
```

Yeh **message event ko listen karega**.

---

# 6. What does `emit` mean?

`emit` ka matlab hai **event fire karna / trigger karna**.

Example:

```javascript
socket.emit("message", "Hello user");
```

Yeh **client ko message bhej raha hai**.

Simple meaning:

```
emit = event fire karna
```

---

# 7. What is `socket` ?

`socket` represent karta hai **ek single connected user ko**.

Jab bhi koi user server se connect karta hai toh uske liye **ek socket object create hota hai**.

Example:

```
User1 → socket1
User2 → socket2
User3 → socket3
```

Har user ka **alag socket connection hota hai**.

---

# 8. What is `socket.emit()` ?

```javascript
socket.emit("event", data);
```

Ye **sirf usi user ko event bhejta hai jiska socket hai**.

Example:

```
Server → only one specific user
```

Example code:

```javascript
socket.emit("welcome", "Welcome to chat");
```

Sirf **connected user ko message milega**.

---

# 9. What is `socket.broadcast.emit()` ?

```javascript
socket.broadcast.emit("event", data);
```

Ye **current user ko chhodkar baaki sab users ko event bhejta hai**.

Example:

```
User1 sends message

Server → send message to User2, User3
NOT User1
```

Example code:

```javascript
socket.broadcast.emit("newUser", "A user joined");
```

---

# 10. What is `io.emit()` ?

```javascript
io.emit("event", data);
```

Ye **sabhi connected users ko event bhejta hai including sender**.

Example:

```
Server → User1
       → User2
       → User3
```

Example code:

```javascript
io.emit("message", "Hello everyone");
```


| Method                    | Meaning                          |
| ------------------------- | -------------------------------- |
| `io.on()`                 | event ko listen karna            |
| `socket.on()`             | user event ko listen karna       |
| `emit()`                  | event fire karna                 |
| `socket.emit()`           | sirf ek user ko message          |
| `socket.broadcast.emit()` | sender ko chhodkar sabko message |
| `io.emit()`               | sabko message                    |
