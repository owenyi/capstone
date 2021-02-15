const query = require('./yogasQuery.js');

exports.getYogas = async(req,res) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        const trimester = req.query.trimester;
        const pose = req.query.pose;

        if (pose === undefined) {
            await query.getYogasList(trimester)
            .then((result) => {
                returnJson.res_state = "success";
                returnJson.res_msg = "요가 목록을 성공적으로 가져왔습니다.";
                returnJson.res_data = result;
                res.send(returnJson);
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });
        } else {
            await query.getYogasPose(trimester, pose)
            .then((result) => {
                returnJson.res_state = "success";
                returnJson.res_msg = "요가 자세를 성공적으로 가져왔습니다.";
                returnJson.res_data = result;
                res.send(returnJson);
            })
            .catch(() => {
                returnJson.res_state = "sql_error";
                returnJson.res_msg = "잠시 후에 시도해주세요.";
                res.send(returnJson);
            });
        }
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}
