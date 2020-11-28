const { db } = require('./usersModel.js');
const usersModel = require('./usersModel.js');

exports.chkId = (id) => {
    return new Promise ((resolve, reject) => {
        usersModel.find({"id": id}, (err, rows) => {
            if(err) reject(err);
            else {
                if (rows.length == 0) resolve(1);
                else resolve(0);
            };
        });
    });
};

exports.signup = (id, pw, userName, age, weight, expectedDate, signupDatetime) => {
    const newUser = new usersModel({
        id : id,
        pw : pw,
        userName : userName,
        age : age,
        weight : weight,
        expectedDate : expectedDate,
        signupDatetime : signupDatetime 
    })

    return new Promise((resolve, reject) => {
        newUser.save((err) => {
            if(err) reject(err);
            else resolve(1);
        });
    });
};

exports.signin = (id, pw) => {
    return new Promise((resolve, reject) => {
        usersModel.findOne({"id": id, "pw": pw}, "id", (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.updateToken = (id, token) => {
    return new Promise((resolve, reject) => {
        usersModel.update(({"id": id}, {"token": token, "lstSigninDatetime": new Date()}), (err) => {
            if(err) reject(err);
            else resolve(1);
        });
    });
}
