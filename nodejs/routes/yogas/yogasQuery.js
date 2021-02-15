const yogasModel = require('./yogasModel.js');


exports.getYogasList = (trimester) => {
    return new Promise((resolve, reject) => {
        yogasModel.find({"trimester": trimester}, {'trimester': 0, 'description': 0}, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getYogasPose = (trimester, pose) => {
    return new Promise((resolve, reject) => {
        yogasModel.find({"trimester": trimester, "pose": pose}, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}