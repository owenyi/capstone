const dietsModels = require('./dietsModel.js');
const ratingsModels = require('./ratingsModel.js');

exports.getDiets = (dietName) => {
    return new Promise((resolve, reject) => {
        dietsModels.aggregate([{$match : {"dietName" :dietName} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postRiceDiets = () => {
    return new Promise((resolve, reject) => {
        dietsModels.aggregate([{$match : {"group" :"밥"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postSoupDiets = () => {
    return new Promise((resolve, reject) => {
        dietsModels.aggregate([{$match : {"group" :"국"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postSideDiets = () => {
    return new Promise((resolve, reject) => {
        dietsModels.aggregate([{$match : {"group" :"반찬"} },{ $sample: { size: 1 } }], (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postDietsRatingsInit = (users_idx) => {
    return new Promise((resolve, reject) => {
        ratingsModels.update({ rating: { $gte: 0, $lt: 3 }}, { $inc: { rating: 1 }}, { multi: true }, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
} // 모든 ratings 3으로 초기화하도록

exports.getAllDiets = (users_idx) => {
    return new Promise((resolve, reject) => {
        ratingsModels.update({ rating: { $gte: 0, $lt: 3 }}, { $inc: { rating: 1 }}, { multi: true }, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.patchSelectedDietsRatings = (users_idx, diets_idx) => {
    return new Promise((resolve, reject) => {
        ratingsModels.update({ "user_idx": users_idx, "diets_idx": diets_idx }, { $inc: { rating: 0.5 }}, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
} // 선택된 식단 평점 0.5 오르도록

// cron
exports.flattenDietsRatings = () => {
    return new Promise((resolve, reject) => {
        ratingsModels.update({ rating: { $gt: 3 }}, { $inc: { rating: -1 }}, { multi: true }, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}