# Data Modeling

## Authentication system

### User.model.js
user -> [_id,username,email,password,verified,createdAt, updatedAt]

### Chat.model.js
chat -> [_id,user,title,createdAt,updatedAt]

### Message.model.js
message [_id,chat,content,role:[user,ai]]

## Chat with the AI
## Chat history 
## Message Storage 
## AI with Internet research feature

# Terminal Command

PS C:\Users\LENOVO\OneDrive\Desktop\my work\classes-101-to-150\class-120> npm init -y

PS C:\Users\LENOVO\OneDrive\Desktop\my work\classes-101-to-150\class-120> npm i express mongoose jsonwebtoken dotenv cookie-parser

# Folder structure  

# User verification by email 

[user]-->--register-->--[server]-->--Data=Save-->--[Database]-->--send-a-mail-For-verification-on-email-->-- User-click-on-verification-link-->--After-Verify-User-login-[Server]-->--Create-token-and-give-to-[user]

[Documentation](https://github.com/ankurdotio/Difference-Backend-video/tree/f0e8b43d21bea7eec58dd679ee9e9147fa21efb7/026-nodemailer)

get ->
GOOGLE_CLIENT_ID, 
GOOGLE_CLIENT_SECRET,
GOOGLE_REFRESH_TOKEN,
GOOGLE_USER

WEB-Server-->--transporter-->--SMTP-server

# server
1. WEB Server 
2. SMTP server