const query = require('./dietsQuery.js');
const RATE_FIRST = 0.7;

let dailyIntakes = new Object();
let dailyStandard = new Object();

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
        let expectedDate = req.body.expectedDate;
        const swipeRice = req.body.swipeRice;

        expectedDate = new Date(expectedDate);
        expectedDate.setDate(expectedDate.getDate() - 280);
        const currDay = new Date();
        const pregnancyWeek = Math.floor((Math.floor((currDay.getTime() - expectedDate.getTime()) / (1000 * 60 * 60 * 24)) / 7));

        if(users_age <= 29 && pregnancyWeek <= 13) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal;
            dailyIntakes.protein = dailyIntakesYoungFirst.protein;
            dailyIntakes.folate = dailyIntakesYoungFirst.folate;
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium;
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum;
        } else if(users_age <= 29 && pregnancyWeek >=14 && pregnancyWeek <= 28) {
            dailyIntakes.kcal = dailyIntakesYoungSecond.kcal
            dailyIntakes.protein = dailyIntakesYoungSecond.protein
            dailyIntakes.folate = dailyIntakesYoungSecond.folate
            dailyIntakes.calcium = dailyIntakesYoungSecond.calcium
            dailyIntakes.ferrum = dailyIntakesYoungSecond.ferrum
        } else if(users_age <= 29 && pregnancyWeek >= 29) {
            dailyIntakes.kcal = dailyIntakesYoungThird.kcal
            dailyIntakes.protein = dailyIntakesYoungThird.protein
            dailyIntakes.folate = dailyIntakesYoungThird.folate
            dailyIntakes.calcium = dailyIntakesYoungThird.calcium
            dailyIntakes.ferrum = dailyIntakesYoungThird.ferrum
        } else if(users_age > 29 && pregnancyWeek <= 13) {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal
            dailyIntakes.protein = dailyIntakesOldFirst.protein
            dailyIntakes.folate = dailyIntakesOldFirst.folate
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum
        } else if(users_age > 29 && pregnancyWeek >= 14 && pregnancyWeek <= 28) {
            dailyIntakes.kcal = dailyIntakesOldSecond.kcal
            dailyIntakes.protein = dailyIntakesOldSecond.protein
            dailyIntakes.folate = dailyIntakesOldSecond.folate
            dailyIntakes.calcium = dailyIntakesOldSecond.calcium
            dailyIntakes.ferrum = dailyIntakesOldSecond.ferrum
        } else if (users_age > 29 && pregnancyWeek >= 29) {
            dailyIntakes.kcal = dailyIntakesOldThird.kcal
            dailyIntakes.protein = dailyIntakesOldThird.protein
            dailyIntakes.folate = dailyIntakesOldThird.folate
            dailyIntakes.calcium = dailyIntakesOldThird.calcium
            dailyIntakes.ferrum = dailyIntakesOldThird.ferrum
        }

        do {
            await query.postRiceDiets()
                .then((result) => {
                    returnJson.res_state = "success";
                    returnJson.res_msg = "밥 데이터를 가져왔습니다.";
                    returnJson.res_data.Rice = result[0];
                })
                .catch(() => {
                    returnJson.res_state = "sql_error";
                    returnJson.res_msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });
        } while(swipeRice.indexOf(returnJson.res_data.Rice.dietName) != -1)
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
        let expectedDate = req.body.expectedDate;
        const riceDietName = req.body.riceDietName;
        const swipeSoup = req.body.swipeSoup; 

        expectedDate = new Date(expectedDate);
        expectedDate.setDate(expectedDate.getDate() - 280);
        const currDay = new Date();
        const pregnancyWeek = Math.floor((Math.floor((currDay.getTime() - expectedDate.getTime()) / (1000 * 60 * 60 * 24)) / 7));

        if(users_age <= 29 && pregnancyWeek <= 13) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal
            dailyIntakes.protein = dailyIntakesYoungFirst.protein
            dailyIntakes.folate = dailyIntakesYoungFirst.folate
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum
        } else if(users_age <= 29 && pregnancyWeek >=14 && pregnancyWeek <= 28) {
            dailyIntakes.kcal = dailyIntakesYoungSecond.kcal
            dailyIntakes.protein = dailyIntakesYoungSecond.protein
            dailyIntakes.folate = dailyIntakesYoungSecond.folate
            dailyIntakes.calcium = dailyIntakesYoungSecond.calcium
            dailyIntakes.ferrum = dailyIntakesYoungSecond.ferrum
        } else if(users_age <= 29 && pregnancyWeek >= 29) {
            dailyIntakes.kcal = dailyIntakesYoungThird.kcal
            dailyIntakes.protein = dailyIntakesYoungThird.protein
            dailyIntakes.folate = dailyIntakesYoungThird.folate
            dailyIntakes.calcium = dailyIntakesYoungThird.calcium
            dailyIntakes.ferrum = dailyIntakesYoungThird.ferrum
        } else if(users_age > 29 && pregnancyWeek <= 13) {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal
            dailyIntakes.protein = dailyIntakesOldFirst.protein
            dailyIntakes.folate = dailyIntakesOldFirst.folate
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum
        } else if(users_age > 29 && pregnancyWeek >= 14 && pregnancyWeek <= 28) {
            dailyIntakes.kcal = dailyIntakesOldSecond.kcal
            dailyIntakes.protein = dailyIntakesOldSecond.protein
            dailyIntakes.folate = dailyIntakesOldSecond.folate
            dailyIntakes.calcium = dailyIntakesOldSecond.calcium
            dailyIntakes.ferrum = dailyIntakesOldSecond.ferrum
        } else if (users_age > 29 && pregnancyWeek >= 29) {
            dailyIntakes.kcal = dailyIntakesOldThird.kcal
            dailyIntakes.protein = dailyIntakesOldThird.protein
            dailyIntakes.folate = dailyIntakesOldThird.folate
            dailyIntakes.calcium = dailyIntakesOldThird.calcium
            dailyIntakes.ferrum = dailyIntakesOldThird.ferrum
        }

        await query.getDietsByName(riceDietName)
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
            await query.postSoupDiets()
                .then((result) => {
                    returnJson.res_state = "success";
                    returnJson.res_msg = "국을 가져왔습니다.";
                    returnJson.res_data.soup = result[0];
                })
                .catch(() => {
                    returnJson.res_state = "sql_error";
                    returnJson.res_msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });
            } while(swipeSoup.indexOf(returnJson.res_data.soup.dietName) != -1 || 
            dailyIntakes.kcal - returnJson.res_data.soup.kcal < 0 || 
            dailyIntakes.protein - returnJson.res_data.soup.protein < 0 || 
            dailyIntakes.folate - returnJson.res_data.soup.folate < 0 || 
            dailyIntakes.calcium - returnJson.res_data.soup.calcium < 0 || 
            dailyIntakes.ferrum - returnJson.res_data.soup.ferrum < 0);
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

        const users_idx = req.body.users_idx;
        const users_age = req.body.users_age;
        let expectedDate = req.body.expectedDate;
        const riceDietName = req.body.riceDietName;
        const soupDietName = req.body.soupDietName;
        const swipeSide = req.body.swipeSide; 

        expectedDate = new Date(expectedDate);
        expectedDate.setDate(expectedDate.getDate() - 280);
        const currDay = new Date();
        const pregnancyWeek = Math.floor((Math.floor((currDay.getTime() - expectedDate.getTime()) / (1000 * 60 * 60 * 24)) / 7));

        if(users_age <= 29 && pregnancyWeek <= 13) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal
            dailyIntakes.protein = dailyIntakesYoungFirst.protein
            dailyIntakes.folate = dailyIntakesYoungFirst.folate
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum
            dailyStandard = dailyIntakesYoungFirst
        } else if(users_age <= 29 && pregnancyWeek >=14 && pregnancyWeek <= 28) {
            dailyIntakes.kcal = dailyIntakesYoungSecond.kcal
            dailyIntakes.protein = dailyIntakesYoungSecond.protein
            dailyIntakes.folate = dailyIntakesYoungSecond.folate
            dailyIntakes.calcium = dailyIntakesYoungSecond.calcium
            dailyIntakes.ferrum = dailyIntakesYoungSecond.ferrum
            dailyStandard = dailyIntakesYoungSecond
        } else if(users_age <= 29 && pregnancyWeek >= 29) {
            dailyIntakes.kcal = dailyIntakesYoungThird.kcal
            dailyIntakes.protein = dailyIntakesYoungThird.protein
            dailyIntakes.folate = dailyIntakesYoungThird.folate
            dailyIntakes.calcium = dailyIntakesYoungThird.calcium
            dailyIntakes.ferrum = dailyIntakesYoungThird.ferrum
            dailyStandard = dailyIntakesYoungThird
        } else if(users_age > 29 && pregnancyWeek <= 13) {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal
            dailyIntakes.protein = dailyIntakesOldFirst.protein
            dailyIntakes.folate = dailyIntakesOldFirst.folate
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum
            dailyStandard = dailyIntakesOldFirst
        } else if(users_age > 29 && pregnancyWeek >= 14 && pregnancyWeek <= 28) {
            dailyIntakes.kcal = dailyIntakesOldSecond.kcal
            dailyIntakes.protein = dailyIntakesOldSecond.protein
            dailyIntakes.folate = dailyIntakesOldSecond.folate
            dailyIntakes.calcium = dailyIntakesOldSecond.calcium
            dailyIntakes.ferrum = dailyIntakesOldSecond.ferrum
            dailyStandard = dailyIntakesOldSecond
        } else if (users_age > 29 && pregnancyWeek >= 29) {
            dailyIntakes.kcal = dailyIntakesOldThird.kcal
            dailyIntakes.protein = dailyIntakesOldThird.protein
            dailyIntakes.folate = dailyIntakesOldThird.folate
            dailyIntakes.calcium = dailyIntakesOldThird.calcium
            dailyIntakes.ferrum = dailyIntakesOldThird.ferrum
            dailyStandard = dailyIntakesOldThird
        }

        await query.getDietsByName(riceDietName)
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
        await query.getDietsByName(soupDietName)
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

        var sideDietsArray = [];
        await query.postSideDiets()  
            .then((result) => {
                sideDietsArray = result;
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });

        var satisfidSideDietsArray = [];
        for(var i = 0; i < sideDietsArray.length; i++) {
            if( Math.abs(dailyIntakes.kcal - sideDietsArray[i].kcal) < dailyStandard.kcal * RATE_FIRST &&
                Math.abs(dailyIntakes.protein - sideDietsArray[i].protein) < dailyStandard.protein * RATE_FIRST &&
                Math.abs(dailyIntakes.folate - sideDietsArray[i].folate) < dailyStandard.folate * RATE_FIRST &&
                Math.abs(dailyIntakes.calcium - sideDietsArray[i].calcium) < dailyStandard.calcium * RATE_FIRST &&
                Math.abs(dailyIntakes.ferrum - sideDietsArray[i].ferrum) < dailyStandard.ferrum * RATE_FIRST)

                satisfidSideDietsArray.push(sideDietsArray[i])
        }

        var topSideDietsArray = []
        await query.getTopSideDiets(users_idx)  
            .then((result) => {
                topSideDietsArray = result;
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });

        var topSideDietsGroupArray  = [];
        for(var i = 0; i < 10; i ++) {
            await query.getDietsByIdx(topSideDietsArray[i].diets_idx)
            .then((result) => {
                topSideDietsGroupArray[i] = result[0].classification;
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });
        }

        var topSideDietsSortedObject = {};
        for (var i = 0; i < topSideDietsGroupArray.length; i++) {
            topSideDietsSortedObject[topSideDietsGroupArray[i]] = 1 + (topSideDietsSortedObject[topSideDietsGroupArray[i]] || 0);
        }

        var topSideDietsSortedArray = Object.entries(topSideDietsSortedObject).sort((a,b) => b[1]-a[1])

        for(var i = 0; i < satisfidSideDietsArray.length; i++) {
            for(var j = 0; j < topSideDietsSortedArray.length; j++) {
                if(satisfidSideDietsArray[i].classification == topSideDietsSortedArray[j][0]) {
                    satisfidSideDietsArray[i].priority = j + 1
                }
            }

            if(!satisfidSideDietsArray[i].priority) {
                satisfidSideDietsArray[i].priority = topSideDietsSortedArray.length + 1
            }
        }
        returnJson.res_state = "success";
        returnJson.res_msg = "반찬 데이터를 가져왔습니다.";
        returnJson.res_data = satisfidSideDietsArray;
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

        const users_idx = req.body.users_idx;
        const users_age = req.body.users_age;
        let expectedDate = req.body.expectedDate;
        const riceDietName = req.body.riceDietName;
        const soupDietName = req.body.soupDietName;
        const sideDietName = req.body.sideDietName;
        const swipeSide = req.body.swipeSide; 

        expectedDate = new Date(expectedDate);
        expectedDate.setDate(expectedDate.getDate() - 280);
        const currDay = new Date();
        const pregnancyWeek = Math.floor((Math.floor((currDay.getTime() - expectedDate.getTime()) / (1000 * 60 * 60 * 24)) / 7));

        if(users_age <= 29 && pregnancyWeek <= 13) {
            dailyIntakes.kcal = dailyIntakesYoungFirst.kcal
            dailyIntakes.protein = dailyIntakesYoungFirst.protein
            dailyIntakes.folate = dailyIntakesYoungFirst.folate
            dailyIntakes.calcium = dailyIntakesYoungFirst.calcium
            dailyIntakes.ferrum = dailyIntakesYoungFirst.ferrum
            dailyStandard = dailyIntakesYoungFirst
        } else if(users_age <= 29 && pregnancyWeek >=14 && pregnancyWeek <= 28) {
            dailyIntakes.kcal = dailyIntakesYoungSecond.kcal
            dailyIntakes.protein = dailyIntakesYoungSecond.protein
            dailyIntakes.folate = dailyIntakesYoungSecond.folate
            dailyIntakes.calcium = dailyIntakesYoungSecond.calcium
            dailyIntakes.ferrum = dailyIntakesYoungSecond.ferrum
            dailyStandard = dailyIntakesYoungSecond
        } else if(users_age <= 29 && pregnancyWeek >= 29) {
            dailyIntakes.kcal = dailyIntakesYoungThird.kcal
            dailyIntakes.protein = dailyIntakesYoungThird.protein
            dailyIntakes.folate = dailyIntakesYoungThird.folate
            dailyIntakes.calcium = dailyIntakesYoungThird.calcium
            dailyIntakes.ferrum = dailyIntakesYoungThird.ferrum
            dailyStandard = dailyIntakesYoungThird
        } else if(users_age > 29 && pregnancyWeek <= 13) {
            dailyIntakes.kcal = dailyIntakesOldFirst.kcal
            dailyIntakes.protein = dailyIntakesOldFirst.protein
            dailyIntakes.folate = dailyIntakesOldFirst.folate
            dailyIntakes.calcium = dailyIntakesOldFirst.calcium
            dailyIntakes.ferrum = dailyIntakesOldFirst.ferrum
            dailyStandard = dailyIntakesOldFirst
        } else if(users_age > 29 && pregnancyWeek >= 14 && pregnancyWeek <= 28) {
            dailyIntakes.kcal = dailyIntakesOldSecond.kcal
            dailyIntakes.protein = dailyIntakesOldSecond.protein
            dailyIntakes.folate = dailyIntakesOldSecond.folate
            dailyIntakes.calcium = dailyIntakesOldSecond.calcium
            dailyIntakes.ferrum = dailyIntakesOldSecond.ferrum
            dailyStandard = dailyIntakesOldSecond
        } else if (users_age > 29 && pregnancyWeek >= 29) {
            dailyIntakes.kcal = dailyIntakesOldThird.kcal
            dailyIntakes.protein = dailyIntakesOldThird.protein
            dailyIntakes.folate = dailyIntakesOldThird.folate
            dailyIntakes.calcium = dailyIntakesOldThird.calcium
            dailyIntakes.ferrum = dailyIntakesOldThird.ferrum
            dailyStandard = dailyIntakesOldThird
        }

        await query.getDietsByName(riceDietName)
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
        await query.getDietsByName(soupDietName)
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
        await query.getDietsByName(sideDietName)
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
        var topSideDietsArray = []
        await query.getTopSideDiets(users_idx)
            .then((result) => {
                topSideDietsArray = result;
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });

        var sideDietsArray = [];
        await query.postSideDiets()  
            .then((result) => {
                    sideDietsArray = result;
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });
    
        var satisfidSideDietsArray = [];
        for(var i = 0; i < sideDietsArray.length; i++) {
            if( Math.floor(dailyIntakes.kcal - sideDietsArray[i].kcal) > -30  &&
                Math.floor(dailyIntakes.protein - sideDietsArray[i].protein) > -17  &&
                Math.floor(dailyIntakes.folate - sideDietsArray[i].folate) > -200  &&
                Math.floor(dailyIntakes.calcium - sideDietsArray[i].calcium) > -310  &&
                Math.floor(dailyIntakes.ferrum - sideDietsArray[i].ferrum) > -50 )
    
                satisfidSideDietsArray.push(sideDietsArray[i])
            }
    
        var topSideDietsArray = []
        await query.getTopSideDiets(users_idx)  
            .then((result) => {
                topSideDietsArray = result;
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });
    
        var topSideDietsGroupArray  = [];
            for(var i = 0; i < 10; i ++) {
                await query.getDietsByIdx(topSideDietsArray[i].diets_idx)
                    .then((result) => {
                        topSideDietsGroupArray[i] = result[0].classification;
                    })
                    .catch(() => {
                        returnJson.res_state = "sql_error";
                        returnJson.res_msg = "잠시 후에 시도해주세요.";
                        res.send(returnJson);
                    });
                }
    
        var topSideDietsSortedObject = {};
            for (var i = 0; i < topSideDietsGroupArray.length; i++) {
                topSideDietsSortedObject[topSideDietsGroupArray[i]] = 1 + (topSideDietsSortedObject[topSideDietsGroupArray[i]] || 0);
            }
    
        var topSideDietsSortedArray = Object.entries(topSideDietsSortedObject).sort((a,b) => b[1]-a[1])
    
        for(var i = 0; i < satisfidSideDietsArray.length; i++) {
            for(var j = 0; j < topSideDietsSortedArray.length; j++) {
                if(satisfidSideDietsArray[i].classification == topSideDietsSortedArray[j][0]) {
                    satisfidSideDietsArray[i].priority = j + 1
                    }
                }
    
            if(!satisfidSideDietsArray[i].priority) {
                satisfidSideDietsArray[i].priority = topSideDietsSortedArray.length + 1
            }
        }
        returnJson.res_state = "success";
        returnJson.res_msg = "반찬 데이터를 가져왔습니다.";
        returnJson.res_data = satisfidSideDietsArray;
        res.send(returnJson);

    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.patchSelectedDietsRatings = async(req,res) => {
    try{
        const returnJson = new Object();

        returnJson.res_state = "";
        returnJson.res_msg = "";

        const { users_idx, diets_idx } = req.body;


        await query.patchSelectedDietsRatings(users_idx, diets_idx)
            .then(() => {
                returnJson.res_state = "success";
                returnJson.res_msg = "식단을 선택했습니다.";
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

exports.postDietsRatingsInit = async(req,res) => {
    try{
        const returnJson = new Object();

        returnJson.res_state = "";
        returnJson.res_msg = "";

        const { users_idx } = req.body;


        await query.postDietsRatingsInit(users_idx)
            .then(() => {
                returnJson.res_state = "success";
                returnJson.res_msg = "평점을 초기화했습니다.";
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

exports.getAllDiets = async(req,res) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        await query.getAllDiets()
            .then((result) => {
                returnJson.res_state = "success";
                returnJson.res_msg = "모든 식단을 가져왔습니다.";
                returnJson.res_data = result;
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

exports.patchSelectedDietsRatingsInit = async(req,res) => {
    try{
        const returnJson = new Object();

        returnJson.res_state = "";
        returnJson.res_msg = "";

        const { users_idx, diets_idx } = req.body;


        await query.patchSelectedDietsRatingsInit(users_idx, diets_idx)
            .then(() => {
                returnJson.res_state = "success";
                returnJson.res_msg = "식단을 선택했습니다.";
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

exports.flattenDietsRatings = async() => {
    try{
        await query.flattenDietsRatings()
            .then(() => {
                for (var i = 0; i < 10; i++) {
                    console.log("평점을 평탄화했습니다.");
                }
            })
            .catch(() => {
                for (var i = 0; i < 10; i++) {
                    console.log("잠시 후에 다시 시도해주세요.");
                }
            });
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}