const calendarsModel = require('./calendarsModel.js');


exports.getCalendars = (users_id) => {
    return new Promise((resolve, reject) => {
        calendarsModel.find({"users_id": users_id}, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postCalendars = (users_id, date, content) => {
    const newCalendar = new calendarsModel({
        users_id : users_id,
        date : date,
        content : content
    })

    return new Promise((resolve, reject) => {
        newCalendar.save((err) => {
            if(err) reject(err);
            else resolve(1);
        });
    });
}
