const socket = io();

// DOM elements
const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

// Send message
sendBtn.addEventListener("click", () => {
    const msg = msgInput.value;
    if(msg.trim() !== "") {
        socket.emit("sendMessage", msg);
        msgInput.value = "";
    }
});

// Listen for messages
socket.on("messageToUser", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    li.style.color = "green"; // message only for user
    messages.appendChild(li);
});

socket.on("messageToOthers", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    li.style.color = "blue"; // message for others
    messages.appendChild(li);
});

socket.on("messageToAll", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    li.style.color = "red"; // message for all
    messages.appendChild(li);
});