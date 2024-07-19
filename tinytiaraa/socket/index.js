const socketIO = require("socket.io")
const http = require("http")
const express = require('express')
const cors = require('cors')
const app = express();
const server = http.createServer(app)
const io = socketIO(server)


require("dotenv").config({
    path: "./.env"
})

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello soket")

})


let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
};

//define a message of 

const createMessage = ({ senderId, receiverId, text, images }) => ({
    senderId,
    receiverId,
    text,
    images,
    seen: false,
})

io.on("connection", (socket) => {
    //socket connect

    console.log(`a user is connected`)


    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)

    })

    //send and get message

    const messages = {}

    socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
        const message = createMessage({ senderId, receiverId, text, images })

        //store the messages in message object

        if (!messages[receiverId]) {
            messages[receiverId] = [message];
        } else {
            messages[receiverId].push(message);
        }



        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", message);
        

    })

    socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
        const user = getUser(senderId);

        // update the seen flag for the message
        if (messages[senderId]) {
            const message = messages[senderId].find((message) => message.receiverId === receiverId && message.id === messageId);
            if (message) {
                message.seen = true;

                // send a message seen event to the sender
                io.to(user?.socketId).emit("messageSeen", {
                    senderId,
                    receiverId,
                    messageId,
                });
            }
        }
    });



    // update and get last message
    socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
        io.emit("getLastMessage", {
            lastMessage,
            lastMessagesId,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log(`a user disconnected!`);
        removeUser(socket.id);
        io.emit("getUsers", users);
    });



})




server.listen(process.env.PORT || 4000, () => {
    console.log(`server is running on port ${process.env.PORT || 4000}`)
})