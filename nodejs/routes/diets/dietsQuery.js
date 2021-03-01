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

exports.patchSelectedDietsRatings = (users_idx, diets_idx) => {
    return new Promise((resolve, reject) => {
        ratingsModels.update({ "user_idx": users_idx, "diets_idx": diets_idx }, { $inc: { rating: 0.5 }}, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.postDietsRatingsInit = (users_idx) => {
    return new Promise((resolve, reject) => {
        dietsModels.find({ group: "반찬" }, { idx: 1 }, (err, idxs) => {
            if(err) reject(err);
            else {
                for (var i = 0; i < idxs.length; i++) {
                    const newRating = new ratingsModels({
                        users_idx : users_idx,
                        diets_idx : idxs[i].idx,
                        rating : 3,
                        registedDate : Date.now()
                    });
                    newRating.save((err) => {
                        if(err) reject(err);
                    });
                }
                resolve(1);
            }
        });
    });
}

exports.getAllDiets = () => {
    return new Promise((resolve, reject) => {
        dietsModels.find({},{idx:1, dietName:1}, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

exports.patchSelectedDietsRatingsInit = (users_idx, diets_idx) => {
    return new Promise((resolve, reject) => {
        ratingsModels.update({ "user_idx": users_idx, "diets_idx": diets_idx }, { $inc: { rating: 1 }}, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

// cron
exports.flattenDietsRatings = () => {
    return new Promise((resolve, reject) => {
        ratingsModels.update({ rating: { $gt: 3 }}, { $inc: { rating: -1 }}, { multi: true }, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}