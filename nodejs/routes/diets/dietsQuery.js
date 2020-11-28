const dietsMoels = require('./dietsModel.js');


exports.getRiceDiets = () => {
    return new Promise((resolve, reject) => {
        dietsMoels.aggregate([{$match : {"group" :"밥"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getSoupDiets = () => {
    return new Promise((resolve, reject) => {
        dietsMoels.aggregate([{$match : {"group" :"국"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getSideDiets2 = () => {
    return new Promise((resolve, reject) => {
        dietsMoels.aggregate([{$match : {"group" :"반찬"} },{ $sample: { size: 2 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getSideDiets3 = () => {
    return new Promise((resolve, reject) => {
        dietsMoels.aggregate([{$match : {"group" :"반찬"} },{ $sample: { size: 3 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}
