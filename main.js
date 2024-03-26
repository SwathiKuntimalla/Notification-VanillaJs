import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import io from 'socket.io-client';

const mainEventButton = document.getElementById("mainEvent");
const localEventButton = document.getElementById("localEvent");

function runMainEvent() {
    const socket = io("http://localhost:3005", { transport: ["websocket"] });
    socket.emit("new_user_login", { message: "User has logged in" });
}

function runLocalEvents() {
    Toastify({
        text: "This is local event",
        position: "center",
        duration: 5000,
        gravity: "top",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            
          },
    }).showToast();
}

// Listen for the new_user_login event
const socket = io("http://localhost:3005", { transport: ["websocket"] });
socket.on("new_user_login", function (data) {
    Toastify({
        text: `New user logged in: ${data.message}`,
        position: "right",
        duration: 3000,
        gravity: "top",
        style:{
            background: "linear-gradient(to right,#f44336, #9c27b0)",
            color:"white",
        },
        
    }).showToast();
});

document.addEventListener('DOMContentLoaded', function () {
    const socket = io("http://localhost:3005", { transport: ["websocket"] });

    socket.on("connection", function () {
        console.log("connected to socket io");
    });

    socket.on("new_user_login", function (data) {
        console.log("New user logged in", data.message);
    });
});

mainEventButton.addEventListener('click', runMainEvent);
localEventButton.addEventListener('click', runLocalEvents);
