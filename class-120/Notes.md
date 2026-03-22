# Data Modeling

## Authentication

### **User Model (`User.model.js`)**

* Fields:

  * `_id` – unique identifier (MongoDB ObjectId)
  * `username` – string, required, unique
  * `email` – string, required, unique
  * `password` – string, hashed before saving
  * `verified` – boolean, default `false`, indicates if email is verified
  * `createdAt` – timestamp
  * `updatedAt` – timestamp
* Features to add:

  * **Password hashing** using `bcrypt` in `pre('save')`
  * **Password validation** method for login
  * **Email verification token** (optional) for account verification
  * **JWT token generation** for authentication

---

### **Chat Model (`Chat.model.js`)**

* Fields:

  * `_id` – unique identifier
  * `user` – reference to `User._id` (owner of the chat)
  * `title` – string, chat title
  * `createdAt` – timestamp
  * `updatedAt` – timestamp
* Features to add:

  * **User reference population** for easy retrieval of chat owner
  * Optional: **lastMessage** or **message count** for quick summary

---

### **Message Model (`Message.model.js`)**

* Fields:

  * `_id` – unique identifier
  * `chat` – reference to `Chat._id` (which chat this message belongs to)
  * `content` – string, message content
  * `role` – enum: `'user' | 'ai'` (who sent the message)
  * `createdAt` – timestamp
  * `updatedAt` – timestamp
* Features to add:

  * **Chat reference population** to easily fetch all messages in a chat
  * Optional: **index on chat** for faster querying

## Chat with the AI
## Chat history 
## Message Storage 
## AI with Internet research feature


# Project Initialization

* `npm init -y`

  * Initializes a new Node.js project.
  * Creates a `package.json` with default values (`-y` auto-accepts defaults).

### **Installed Dependencies**

1. **express** – Web framework for building APIs and server-side applications.
2. **mongoose** – ODM (Object Data Modeling) library for MongoDB, helps interact with the database.
3. **jsonwebtoken** – For creating and verifying JWT tokens (authentication).
4. **dotenv** – Loads environment variables from a `.env` file.
5. **cookie-parser** – Parses cookies attached to client requests.
6. **bcrypt** – Library to hash and compare passwords securely.
7. **express-validator** – Middleware for validating and sanitizing user input.
8. **nodemailer** – Module for sending emails via SMTP.



# User verification by email 
```
                ┌──────────────┐
                │    USER      │
                └──────┬───────┘
                       │
                       │  Register (username, email, password)
                       ▼
                ┌──────────────┐
                │    SERVER    │
                └──────┬───────┘
                       │
                       │  Save Data
                       ▼
                ┌──────────────┐
                │   DATABASE   │
                └──────┬───────┘
                       │
                       │  Send Verification Email
                       ▼
                ┌──────────────┐
                │    USER      │
                └──────┬───────┘
                       │
                       │  Click Verification Link
                       ▼
                ┌──────────────┐
                │    SERVER    │
                └──────┬───────┘
                       │
                       │  Verify User
                       ▼
                ┌──────────────┐
                │    USER      │
                └──────┬───────┘
                       │
                       │  Login Request
                       ▼
                ┌──────────────┐
                │    SERVER    │
                └──────┬───────┘
                       │
                       │  Create Token (JWT)
                       ▼
                ┌──────────────┐
                │    USER      │
                └──────────────┘
```


### **User Verification by Email 

1. **Required Google Credentials (for OAuth2 SMTP access):**

* `GOOGLE_CLIENT_ID` → OAuth2 Client ID
* `GOOGLE_CLIENT_SECRET` → OAuth2 Client Secret
* `GOOGLE_REFRESH_TOKEN` → Token to refresh access automatically
* `GOOGLE_USER` → Email address of the sender

2. **Reference Documentation:**
[GitHub – Difference-Backend video](https://github.com/ankurdotio/Difference-Backend-video/tree/f0e8b43d21bea7eec58dd679ee9e9147fa21efb7/026-nodemailer)



# Understanding Web and SMTP Servers: How Emails Travel from Your App to Inbox
 
## Types of Servers

### 1. **Web Server**

* A **web server** is a computer or software that **delivers web pages** to users over the internet.
* When you type a website URL in your browser, the web server **processes the request** and sends back the website content (HTML, CSS, JS, images).
* **Examples:** Apache, Nginx.
* **Key point:** It handles **HTTP/HTTPS requests** from browsers.

### 2. **SMTP Server**

* **SMTP** stands for **Simple Mail Transfer Protocol**.
* An **SMTP server** is used to **send emails** from one computer to another over the internet.
* It **handles outgoing emails** and ensures they reach the recipient’s email server.
* **Examples:** Gmail SMTP, Outlook SMTP.
* **Key point:** It only sends emails, not receives them.



* Web server → **websites**
* SMTP server → **emails**



```
WEB-Server
   │
   │  1. Application (Node.js/Express, etc.) triggers email sending
   ▼
transporter
   │
   │  2. Configured using nodemailer or similar library
   │     Handles email formatting, authentication, and sending
   ▼
SMTP-server
   │
   │  3. Receives the email from transporter
   │     Delivers it to recipient's email server (Gmail, Outlook, etc.)
   ▼
Recipient Inbox
```

**Explanation in Steps:**

1. **WEB-Server:** Your web application initiates the email process. For example, after user registration, it decides to send a verification email.
2. **transporter:** This is the middle layer (usually `nodemailer.createTransport`) that connects your app to an SMTP server. It manages authentication (email & password or OAuth), formats the message, and sends it.
3. **SMTP-server:** The mail server (like Gmail SMTP) that actually sends the email across the internet to the recipient’s inbox.


#### server
1. WEB Server 
2. SMTP server
