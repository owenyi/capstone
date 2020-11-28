const dietsModel = require('./dietsModel.js');
const query = require('./dietsQuery.js');
const dailyIntakes = new Object();
dailyIntakes.kcal = 2100;
dailyIntakes.protein = 50;
dailyIntakes.folate = 400;
dailyIntakes.calcium = 650;
dailyIntakes.ferrum = 14;

exports.getDiets = async(req,res) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        do {
            dailyIntakes.kcal = 2100 / 3;
            dailyIntakes.protein = 50 / 3;
            dailyIntakes.folate = 400 / 3;
            dailyIntakes.calcium = 650 / 3;
            dailyIntakes.ferrum = 14 / 3;
            await query.getRiceDiets()
                .then((result) => {
                    returnJson.res_state = "success";
                    returnJson.res_msg = "밥을 가져왔습니다.";
                    returnJson.res_data.rice = result[0];
                })
                .catch(() => {
                    returnJson.res_state = "sql_error";
                    returnJson.res_msg = "잠시 후에 시도해주세요.";
                    res.send(returnJson);
                });
            await query.getSoupDiets()
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
            
            if((Math.floor(Math.random() * 10)) % 2 == 0) {
                await query.getSideDiets2()
                    .then((result) => {
                        returnJson.res_state = "success";
                        returnJson.res_msg = "반찬을 가져왔습니다.";
                        returnJson.res_data.side_1 = result[0];
                        returnJson.res_data.side_2 = result[1];
                        dailyIntakes.kcal = dailyIntakes.kcal - returnJson.res_data.rice.kcal - returnJson.res_data.soup.kcal - returnJson.res_data.side_1.kcal - returnJson.res_data.side_2.kcal;
                        dailyIntakes.protein = dailyIntakes.protein - returnJson.res_data.rice.protein - returnJson.res_data.soup.protein - returnJson.res_data.side_1.protein - returnJson.res_data.side_2.protein;
                        dailyIntakes.folate = dailyIntakes.folate - returnJson.res_data.rice.folate - returnJson.res_data.soup.folate - returnJson.res_data.side_1.folate - returnJson.res_data.side_2.folate;
                        dailyIntakes.calcium = dailyIntakes.calcium - returnJson.res_data.rice.calcium - returnJson.res_data.soup.calcium - returnJson.res_data.side_1.calcium - returnJson.res_data.side_2.calcium;
                        dailyIntakes.ferrum = dailyIntakes.ferrum - returnJson.res_data.rice.ferrum - returnJson.res_data.soup.ferrum - returnJson.res_data.side_1.ferrum - returnJson.res_data.side_2.ferrum;
                    })
                    .catch(() => {
                        returnJson.res_state = "sql_error";
                        returnJson.res_msg = "잠시 후에 시도해주세요.";
                        res.send(returnJson);
                    });
            } else {
                await query.getSideDiets3()
                    .then((result) => {
                        returnJson.res_state = "success";
                        returnJson.res_msg = "반찬을 가져왔습니다.";
                        returnJson.res_data.side_1 = result[0];
                        returnJson.res_data.side_2 = result[1];
                        returnJson.res_data.side_3 = result[2];
                        dailyIntakes.kcal = dailyIntakes.kcal - returnJson.res_data.rice.kcal - returnJson.res_data.soup.kcal - returnJson.res_data.side_1.kcal - returnJson.res_data.side_2.kcal - returnJson.res_data.side_3.kcal;
                        dailyIntakes.protein = dailyIntakes.protein - returnJson.res_data.rice.protein - returnJson.res_data.soup.protein - returnJson.res_data.side_1.protein - returnJson.res_data.side_2.protein - returnJson.res_data.side_3.protein;
                        dailyIntakes.folate = dailyIntakes.folate - returnJson.res_data.rice.folate - returnJson.res_data.soup.folate - returnJson.res_data.side_1.folate - returnJson.res_data.side_2.folate - returnJson.res_data.side_3.folate;
                        dailyIntakes.calcium = dailyIntakes.calcium - returnJson.res_data.rice.calcium - returnJson.res_data.soup.calcium - returnJson.res_data.side_1.calcium - returnJson.res_data.side_2.calcium - returnJson.res_data.side_3.calcium;
                        dailyIntakes.ferrum = dailyIntakes.ferrum - returnJson.res_data.rice.ferrum - returnJson.res_data.soup.ferrum - returnJson.res_data.side_1.ferrum - returnJson.res_data.side_2.ferrum - returnJson.res_data.side_3.ferrum;
                    })
                    .catch(() => {
                        returnJson.res_state = "sql_error";
                        returnJson.res_msg = "잠시 후에 시도해주세요.";
                        res.send(returnJson);
                    });
                }
            
                // if((Math.floor(Math.random() * 10)) % 2 == 0) {
                //     dailyIntakes.kcal = dailyIntakes.kcal - returnJson.res_data.rice.kcal - returnJson.res_data.soup.kcal - returnJson.res_data.side_1.kcal - returnJson.res_data.side_2.kcal;
                //     dailyIntakes.protein = dailyIntakes.protein - returnJson.res_data.rice.protein - returnJson.res_data.soup.protein - returnJson.res_data.side_1.protein - returnJson.res_data.side_2.protein;
                //     dailyIntakes.folate = dailyIntakes.folate - returnJson.res_data.rice.folate - returnJson.res_data.soup.folate - returnJson.res_data.side_1.folate - returnJson.res_data.side_2.folate;
                //     dailyIntakes.calcium = dailyIntakes.calcium - returnJson.res_data.rice.calcium - returnJson.res_data.soup.calcium - returnJson.res_data.side_1.calcium - returnJson.res_data.side_2.calcium;
                //     dailyIntakes.ferrum = dailyIntakes.ferrum - returnJson.res_data.rice.ferrum - returnJson.res_data.soup.ferrum - returnJson.res_data.side_1.ferrum - returnJson.res_data.side_2.ferrum;
                // } else {
                //     dailyIntakes.kcal = dailyIntakes.kcal - returnJson.res_data.rice.kcal - returnJson.res_data.soup.kcal - returnJson.res_data.side_1.kcal - returnJson.res_data.side_2.kcal - returnJson.res_data.side_3.kcal;
                //     dailyIntakes.protein = dailyIntakes.protein - returnJson.res_data.rice.protein - returnJson.res_data.soup.protein - returnJson.res_data.side_1.protein - returnJson.res_data.side_2.protein - returnJson.res_data.side_3.protein;
                //     dailyIntakes.folate = dailyIntakes.folate - returnJson.res_data.rice.folate - returnJson.res_data.soup.folate - returnJson.res_data.side_1.folate - returnJson.res_data.side_2.folate - returnJson.res_data.side_3.folate;
                //     dailyIntakes.calcium = dailyIntakes.calcium - returnJson.res_data.rice.calcium - returnJson.res_data.soup.calcium - returnJson.res_data.side_1.calcium - returnJson.res_data.side_2.calcium - returnJson.res_data.side_3.calcium;
                //     dailyIntakes.ferrum = dailyIntakes.ferrum - returnJson.res_data.rice.ferrum - returnJson.res_data.soup.ferrum - returnJson.res_data.side_1.ferrum - returnJson.res_data.side_2.ferrum - returnJson.res_data.side_3.ferrum;
                    
                // }
            } while ((dailyIntakes.kcal <= -70));
            console.log(dailyIntakes);
            res.send(returnJson);
        
        
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}