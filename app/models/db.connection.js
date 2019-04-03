let CONFIG = require("../config");
const mongoose = require("mongoose");

require("./user.model");
require("./user_company.model");
require("./mail.model");
require("./discussions.model");

let options = {
    user: CONFIG.DBUSR,
    pass: CONFIG.DBPWD,
    authSource: CONFIG.authSource,
    useNewUrlParser: true
}
mongoose.connect(CONFIG.DBURL, options);

let _conn = mongoose.connection;

_conn.on("error", (error) => {
    console.log("Connection with MongoDB Failed");
    console.log(error);
});

_conn.once("open", () => {
    console.log("Connection with MongoDB Successful");
});