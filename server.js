require("./app/models/db.connection");
const express = require("express");
const bodyParser = require("body-parser");

let CONFIG = require("./app/config");
let authRoutes = require("./app/routes/auth.routes");
let userCompanyRoutes = require("./app/routes/user_company.routes");

let app = express();
app.use(bodyParser.json({ type: "application/json" }));

app.use("/connect_and_share", authRoutes);
app.use("/connect_and_share/company", userCompanyRoutes);

app.listen(CONFIG.PORT, CONFIG.HOST, (error) => {
    if (error) {
        console.log(`Error while connecting to the server with port ${CONFIG.PORT}`);
        console.log(error);
    } else {
        console.log(`Server running successfully at port ${CONFIG.PORT}`);
    }
});