const query = require('./calendarsQuery.js');

exports.getCalendars = async(req,res) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        const users_id = req.query.users_id;

        await query.getCalendars(users_id)
            .then((result) => {
                returnJson.res_state = "success";
                returnJson.res_msg = "일정을 가져왔습니다.";
                returnJson.res_data = result;
                console.log(result);
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

exports.postCalendars = async(req,res) => {
    try{
        const returnJson = new Object();

        returnJson.res_state = "";
        returnJson.res_msg = "";

        const {users_id, date, content} = req.body;


        await query.postCalendars(users_id, date, content)
            .then(() => {
                returnJson.res_state = "success";
                returnJson.res_msg = "일정을 등록하였습니다.";
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

