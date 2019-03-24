module.exports.getDateTime = () => {
    let currentDate = new Date();
    let date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    return {
        "date": date,
        "time": time
    }
}