const dietsModel = require('./dietsModel.js');
const query = require('./dietsQuery.js');
const RATE_FIRST = 0.5;
const RATE_SECOND = 0.5;
const RATE_THIRD = 0.5;

let dailyIntakes = new Object();
let dailyStandard = new Object();;
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

exports.postRiceDiets = async(req, res) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        const users_age = req.body.users_age;
        const swipeRice = req.body.swipeRice;

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
            await query.postRiceDiets()
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

exports.postSoupDiets = async(req, res) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        const users_age = req.body.users_age;
        const riceDietName = req.body.riceDietName;
        const swipeSoup = req.body.swipeSoup; 
        if(users_age <= 29) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal
            dailyIntakes.protein = dailyIntakesYoungFirst.protein;
            dailyIntakes.folate = dailyIntakesYoungFirst.folate;
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium;
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum;
            dailyStandard.kcal = dailyIntakesYoungFirst.kcal
            dailyStandard.protein = dailyIntakesYoungFirst.protein;
            dailyStandard.folate = dailyIntakesYoungFirst.folate;
            dailyStandard.calcium = dailyIntakesYoungFirst.calcium;
            dailyStandard.ferrum = dailyIntakesYoungFirst.ferrum;
        } else {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal;
            dailyIntakes.protein = dailyIntakesOldFirst.protein;
            dailyIntakes.folate = dailyIntakesOldFirst.folate;
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium;
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum;
            dailyStandard.kcal = dailyIntakesYoungFirst.kcal
            dailyStandard.protein = dailyIntakesYoungFirst.protein;
            dailyStandard.folate = dailyIntakesYoungFirst.folate;
            dailyStandard.calcium = dailyIntakesYoungFirst.calcium;
            dailyStandard.ferrum = dailyIntakesYoungFirst.ferrum;
        }
        await query.getDiets(riceDietName)
            .then((result) => {
                dailyIntakes.kcal -= result[0].kcal;
                dailyIntakes.protein -= result[0].protein;
                dailyIntakes.folate -= result[0].folate;
                dailyIntakes.calcium -= result[0].calcium;
                dailyIntakes.ferrum -= result[0].ferrum;
            })
        do {
            await query.postSoupDiets()
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
            } while((swipeSoup.indexOf(returnJson.res_data.soup.dietName) != -1));
            console.log(dailyIntakes);
            res.send(returnJson);

    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.postSideDiets1 = async(req, res) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        const users_age = req.body.users_age;
        const riceDietName = req.body.riceDietName;
        const soupDietName = req.body.soupDietName;
        const swipeSide = req.body.swipeSide; 
        if(users_age <= 29) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal
            dailyIntakes.protein = dailyIntakesYoungFirst.protein;
            dailyIntakes.folate = dailyIntakesYoungFirst.folate;
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium;
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum;
            dailyStandard.kcal = dailyIntakesYoungFirst.kcal
            dailyStandard.protein = dailyIntakesYoungFirst.protein;
            dailyStandard.folate = dailyIntakesYoungFirst.folate;
            dailyStandard.calcium = dailyIntakesYoungFirst.calcium;
            dailyStandard.ferrum = dailyIntakesYoungFirst.ferrum;
        } else {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal;
            dailyIntakes.protein = dailyIntakesOldFirst.protein;
            dailyIntakes.folate = dailyIntakesOldFirst.folate;
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium;
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum;
            dailyStandard.kcal = dailyIntakesYoungFirst.kcal
            dailyStandard.protein = dailyIntakesYoungFirst.protein;
            dailyStandard.folate = dailyIntakesYoungFirst.folate;
            dailyStandard.calcium = dailyIntakesYoungFirst.calcium;
            dailyStandard.ferrum = dailyIntakesYoungFirst.ferrum;
        }
        await query.getDiets(riceDietName)
            .then((result) => {
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
        await query.getDiets(soupDietName)
            .then((result) => {
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
        do {
            await query.postSideDiets()
                .then((result) => {
                    returnJson.res_state = "success";
                    returnJson.res_msg = "반찬을 가져왔습니다.";
                    returnJson.res_data.side = result[0];

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
            } while((swipeSide.indexOf(returnJson.res_data.side.dietName) != -1))
            console.log(dailyIntakes);
            res.send(returnJson);

    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.postSideDiets2 = async(req, res) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        const users_age = req.body.users_age;
        const riceDietName = req.body.riceDietName;
        const soupDietName = req.body.soupDietName;
        const sideDietName = req.body.sideDietName;
        const swipeSide = req.body.swipeSide; 
        if(users_age <= 29) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal
            dailyIntakes.protein = dailyIntakesYoungFirst.protein;
            dailyIntakes.folate = dailyIntakesYoungFirst.folate;
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium;
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum;
            dailyStandard.kcal = dailyIntakesYoungFirst.kcal
            dailyStandard.protein = dailyIntakesYoungFirst.protein;
            dailyStandard.folate = dailyIntakesYoungFirst.folate;
            dailyStandard.calcium = dailyIntakesYoungFirst.calcium;
            dailyStandard.ferrum = dailyIntakesYoungFirst.ferrum;
        } else {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal;
            dailyIntakes.protein = dailyIntakesOldFirst.protein;
            dailyIntakes.folate = dailyIntakesOldFirst.folate;
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium;
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum;
            dailyStandard.kcal = dailyIntakesYoungFirst.kcal
            dailyStandard.protein = dailyIntakesYoungFirst.protein;
            dailyStandard.folate = dailyIntakesYoungFirst.folate;
            dailyStandard.calcium = dailyIntakesYoungFirst.calcium;
            dailyStandard.ferrum = dailyIntakesYoungFirst.ferrum;
        }
        await query.getDiets(riceDietName)
            .then((result) => {
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
        await query.getDiets(soupDietName)
            .then((result) => {
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
        await query.getDiets(sideDietName)
            .then((result) => {
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
        do {
            await query.postSideDiets()
                .then((result) => {
                    returnJson.res_state = "success";
                    returnJson.res_msg = "반찬을 가져왔습니다.";
                    returnJson.res_data.side = result[0];
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
            } while((swipeSide.indexOf(returnJson.res_data.side.dietName) != -1))
            console.log(dailyIntakes);
            res.send(returnJson);

    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}
