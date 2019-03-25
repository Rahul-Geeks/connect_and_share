const path = require("path");

module.exports.composeMail = (req, res, next) => {
    let resolve = path.resolve("index.html");
    console.log(resolve);
    res
        .status(200)
        .sendFile(resolve);
}