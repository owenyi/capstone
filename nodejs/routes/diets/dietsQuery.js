const dietsMoels = require('./dietsModel.js');
const ratingsModel = require('./ratingsModel.js');

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

exports.postDietsRatingsInit = (users_idx, diets_idx) => {
    const newratings = new ratingsModel({
        users_idx : users_idx,
        diets_idx : diets_idx,
        rating : 3,
        registedDate : Date.now()
    })

    return new Promise((resolve, reject) => {
        newratings.save((err) => {
            if(err) reject(err);
            else resolve(1);
        });
    });
}

exports.getAllDiets = () => {
    return new Promise((resolve, reject) => {
        dietsMoels.find({},{idx:1}, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}
