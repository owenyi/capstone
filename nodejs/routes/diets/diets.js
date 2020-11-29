const dietsModel = require('./dietsModel.js');
const query = require('./dietsQuery.js');
const RATE = 0.1;
let dailyIntakes = new Object();
let dailyStandard;
const dailyIntakesYoungFirst = {
    kcal : 2100 / 3,
    protein : 50 / 3,
    folate : 600 / 3,
    calcium : 930 / 3,
    ferrum : 24 / 3
}

const dailyIntakesYoungSecond = {
    kcal : 2440 / 3,
    protein : 65 / 3,
    folate : 600 / 3,
    calcium : 930 / 3,
    ferrum : 24 / 3
}

const dailyIntakesYoungThird = {
    kcal : 2550 / 3,
    protein : 80 / 3,
    folate : 600 / 3,
    calcium : 930 / 3,
    ferrum : 24 / 3
}

const dailyIntakesOldFirst = {
    kcal : 1900 / 3,
    protein : 45 / 3,
    folate : 600 / 3,
    calcium : 930 / 3,
    ferrum : 24 / 3
}

const dailyIntakesOldSecond = {
    kcal : 2240 / 3,
    protein : 60 / 3,
    folate : 600 / 3,
    calcium : 930 / 3,
    ferrum : 24 / 3
}

const dailyIntakesOldThird = {
    kcal : 2350 / 3,
    protein : 75 / 3,
    folate : 600 / 3,
    calcium : 930 / 3,
    ferrum : 24 / 3
}

let returnJson = new Object();
        
returnJson.res_state = "";
returnJson.res_msg = "";
returnJson.res_data = new Object();

exports.getRiceDiets = async(req, res) => {
    try{
        const users_age = req.query.users_age;
        const swipeRice = req.query.swipeRice; 

        if(users_age <= 29) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal
            dailyIntakes.protein = dailyIntakesYoungFirst.protein
            dailyIntakes.folate = dailyIntakesYoungFirst.folate
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum
        } else {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal
            dailyIntakes.protein = dailyIntakesOldFirst.protein
            dailyIntakes.folate = dailyIntakesOldFirst.folate
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum
        }

        do {
            await query.getRiceDiets()
                .then((result) => {
                    returnJson.res_state = "success";
                    returnJson.res_msg = "밥 데이터를 가져왔습니다.";
                    returnJson.res_data.Rice = result[0];

                    dailyIntakes.kcal -= result[0].kcal;
                    dailyIntakes.protein -= result[0].protein;
                    dailyIntakes.folate -= result[0].folate;
                    dailyIntakes.calcium -= result[0].calcium;
                    dailyIntakes.ferrum -= result[0].ferrum;
                })
                .catch(() => {
                    returnJson.res_state = "sql_error";
                    returnJson.res_msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });
        } while(swipeRice.indexOf(returnJson.res_data.Rice.dietName) != -1)
        console.log(dailyIntakes);
        res.send(returnJson);

    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.getSoupDiets = async(req, res) => {
    try{
        const users_age = req.query.users_age;
        const riceDiet = new Object;
        riceDiet.riceDiet = req.query.riceDiet;
        const swipeSoup = req.query.swipeSoup; 
        if(users_age <= 29) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal - riceDiet.kcal;
            dailyIntakes.protein = dailyIntakesYoungFirst.protein - riceDiet.protein;
            dailyIntakes.folate = dailyIntakesYoungFirst.folate - riceDiet.folate;
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium - riceDiet.calcium;
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum - riceDiet.ferrum;
        } else {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal - riceDiet.kcal;;
            dailyIntakes.protein = dailyIntakesOldFirst.protein - riceDiet.protein;
            dailyIntakes.folate = dailyIntakesOldFirst.folate - riceDiet.folate;
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium - riceDiet.calcium;
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum - riceDiet.ferrum;
        }

        await query.getDiets(riceDiet)
            .then((result) => {

            })
        do {
            await query.getSoupDiets()
                .then((result) => {
                    returnJson.res_state = "success";
                    returnJson.res_msg = "국을 가져왔습니다.";
                    returnJson.res_data.soup = result[0];
                    dailyIntakes.kcal -= result[0].kcal;
                    dailyIntakes.protein -= result[0].protein;
                    dailyIntakes.folate -= result[0].folate;
                    dailyIntakes.calcium -= result[0].calcium;
                    dailyIntakes.ferrum -= result[0].ferrum;
                })
                .catch(() => {
                    returnJson.res_state = "sql_error";
                    returnJson.res_msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });
            } while(swipeSoup.indexOf(returnJson.res_data.soup.dietName) != -1 && (Math.abs(dailyIntakes.kcal) >= (dailyStandard.kcal * RATE)) && (Math.abs(dailyIntakes.protein) >= (dailyStandard.protein * RATE)) && (Math.abs(dailyIntakes.folate) >= (dailyStandard.folate * RATE)) && (Math.abs(dailyIntakes.calcium) >= (dailyStandard.calcium * RATE)) && (Math.abs(dailyIntakes.ferrum) >= (dailyStandard.ferrum * RATE)))
            console.log(dailyIntakes);
            res.send(returnJson);

    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.getSideDiets = async(req, res) => {
    try{        
        await query.getSideDiets()
            .then((result) => {
                returnJson.res_state = "success";
                returnJson.res_msg = "반찬을 가져왔습니다.";
                returnJson.res_data.side1 = result[0];
                returnJson.res_data.side2 = result[1];
                res.send(returnJson);
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}
