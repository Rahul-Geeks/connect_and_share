// server connection related terms
let port = "5000";
let host = "127.0.0.1";

// database connection related terms
let dbUrl = "mongodb://@ds117816.mlab.com:17816/connect_and_share";
let dbUsr = "rahul";
let dbPwd = "password1";
let dbName = "connect_and_share";
let authSource = "connect_and_share";

// secret key for token generation at the time of login
let scrtKey = "Rahul And Reshmi";

module.exports = {
    PORT: port,
    HOST: host,
    DBUSR: dbUsr,
    DBPWD: dbPwd,
    DBNAME: dbName,
    DBURL: dbUrl,
    authSource: authSource,
    SCRTKEY: scrtKey
}