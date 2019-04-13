module.exports.getDateTime = () => {
    let currentDate = new Date();
    let date = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    return {
        "date": date,
        "time": time
    }
}

// module.exports.splitDateTime = (date, time) => {
//     let valDate = date.split("-");
//     let day = valDate[0];
//     let month = valDate[1]-1;
//     let year = valDate[2];

//     let valTime = time.split(":");
//     let hours = valTime[0];
//     let minutes = valTime[1];
//     let seconds = valTime[2];
//     return {
//         "day": day,
//         "month": month,
//         "year": year,
//         "hours": hours,
//         "minutes": minutes,
//         "seconds": seconds,
//     }
// }