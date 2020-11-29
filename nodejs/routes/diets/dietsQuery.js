const dietsMoels = require('./dietsModel.js');

exports.getDiets = (dietName) => {
    return new Promise((resolve, reject) => {
        dietsMoels.aggregate([{$match : {"dietName" :dietName} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postRiceDiets = () => {
    return new Promise((resolve, reject) => {
        dietsMoels.aggregate([{$match : {"group" :"밥"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postSoupDiets = () => {
    return new Promise((resolve, reject) => {
        dietsMoels.aggregate([{$match : {"group" :"국"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postSideDiets = () => {
    return new Promise((resolve, reject) => {
        dietsMoels.aggregate([{$match : {"group" :"반찬"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}
