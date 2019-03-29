require("./app/models/db.connection");
const express = require("express");
const bodyParser = require("body-parser");
let app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

let CONFIG = require("./app/config");
let authRoutes = require("./app/routes/auth.routes");
let userRoutes = require("./app/routes/user.routes");
let userCompanyRoutes = require("./app/routes/user_company.routes");
let mailingRoutes = require("./app/routes/mailing.routes");

let mailCtrl = require("./app/controllers/mail.controller");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({ type: "application/json" }));

app.use("/connect_and_share", authRoutes);
app.use("/connect_and_share/user", userRoutes);
app.use("/connect_and_share/company", userCompanyRoutes);
app.use("/connect_and_share/user/mail", mailingRoutes);

// io.emit('some event', { for: 'everyone' });

let numUsers = 0;

io.on('connection', (socket) => {
    var addedUser = false;
    console.log("User Connected");

    // when the client emits 'new-message', this listens and executes
    socket.on('new-message', (obj) => {
        console.log(obj);
        io.emit("new-message", obj);
        // we tell the client to execute 'new-message'
        // socket.broadcast.emit('new-message', {
        //     username: socket.username,
        //     message: message
        // });
        // socket.broadcast.emit('new-message', message);
    });

    socket.on("new-mail", (mail) => {
        console.log("Mail came to server");
        console.log(mail);
        let sendMail = {
            "from": mail.from,
            "subject": mail.subject,
            "message": mail.message
        }
        let mailSave = sendMail;
        mailSave.to = mail.to;
        mailCtrl.saveMail(mailSave);
        io.to(mail.to).emit("new-mail", sendMail);
    });

    // // when the client emits 'add user', this listens and executes
    // socket.on('add user', (username) => {
    //     if (addedUser) return;

    //     // we store the username in the socket session for this client
    //     socket.username = username;
    //     ++numUsers;
    //     addedUser = true;
    //     socket.emit('login', {
    //         numUsers: numUsers
    //     });
    //     // echo globally (all clients) that a person has connected
    //     socket.broadcast.emit('user joined', {
    //         username: socket.username,
    //         numUsers: numUsers
    //     });
    // });

    // // when the client emits 'typing', we broadcast it to others
    socket.on('typing', (typingStatus) => {
        console.log(typingStatus);
        socket.broadcast.emit("typing", typingStatus);
        // socket.broadcast.emit('typing', {
        //     username: socket.username
        // });
    });

    socket.on("join", (data) => {
        console.log("In Join");
        console.log(data);
        socket.join(data);
        console.log(socket.id);
    });

    socket.on("message-to-one", (obj) => {
        console.log("In message_to_one");
        console.log(obj);
        io.to(obj.userId).emit("my-message", obj);
        // io.sockets.in(obj.userId).emit("message-to-one", obj.array[1]);
    });

    // // when the client emits 'stop typing', we broadcast it to others
    // socket.on('stop typing', () => {
    //     socket.broadcast.emit('stop typing', {
    //         username: socket.username
    //     });
    // });

    // // when the user disconnects.. perform this
    // socket.on('disconnect', () => {
    //     if (addedUser) {
    //         --numUsers;

    //         // echo globally that this client has left
    //         socket.broadcast.emit('user left', {
    //             username: socket.username,
    //             numUsers: numUsers
    //         });
    //     }
    // });
});

// socket.on("disconnect", function () {
//     io.emit("User Disconnected");
// });

server.listen(CONFIG.PORT, CONFIG.HOST, (error) => {
    if (error) {
        console.log(`Error while connecting to the server with port ${CONFIG.PORT}`);
        console.log(error);
    } else {
        console.log(`Server running successfully at port ${CONFIG.PORT}`);
    }
});