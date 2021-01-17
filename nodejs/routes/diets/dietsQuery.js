const dietsModel = require('./dietsModel.js');
const recommendModel = require('./recommendModel.js');

exports.getDietsByName = (dietName) => {
    return new Promise((resolve, reject) => {
        dietsModel.aggregate([{$match : {"dietName" :dietName} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getDietsByIdx = (dietIdx) => {
    return new Promise((resolve, reject) => {
        dietsModel.aggregate([{$match : {"idx" :dietIdx} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getRecommendUser = (users_idx) => {
    return new Promise((resolve, reject) => {
        recommendModel.aggregate([{$match : {"users_idx" :users_idx} }, {$sort : {"users_idx" : 1, "diets_idx" : 1}}], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postRiceDiets = () => {
    return new Promise((resolve, reject) => {
        dietsModel.aggregate([{$match : {"group" :"밥"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postSoupDiets = () => {
    return new Promise((resolve, reject) => {
        dietsModel.aggregate([{$match : {"group" :"국"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postSideDiets = () => {
    return new Promise((resolve, reject) => {
        dietsModel.aggregate([{$match : {"group" :"반찬"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}