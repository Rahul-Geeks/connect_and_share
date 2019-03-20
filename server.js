const express = require("express");

let CONFIG = require("./config");
let authRoutes = require("./routes/auth.routes");
let app = express();

app.use("/connect_and_share", authRoutes);

app.listen(CONFIG.PORT, CONFIG.HOST, (error)=>{
    if(error){
        console.log(`Error while connecting to the server with port ${CONFIG.PORT}`);
        console.log(error);
    }else{
        console.log(`Server running successfully at port ${CONFIG.PORT}`);
    }
});