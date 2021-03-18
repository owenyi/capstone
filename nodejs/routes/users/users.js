const query = require('./usersQuery.js');
const password = require('../configs/password.js');
const valid = require('validator');
const { default: validator } = require('validator');

exports.signup = async(req, res, next) => {
    try{
        const returnJson = new Object();

        returnJson.res_state = "";
        returnJson.res_msg = "";

        const {id, pw, pw2, userName, age, expectedDate} = req.body;
        signupDatetime = new Date();
        

        let availableId = 0;
        const userNamePattern = /[가-힣]/;
    

        if(id.length > 50 || id == '' || valid.isEmail(id) == false) {
            returnJson.res_state = "id_is_invalid_form";
            returnJson.res_msg = "올바른 이메일을 입력해주세요.";
            res.send(returnJson);
        } else if(pw.length > 16 || pw.length < 8) {
            returnJson.res_state = "pw_is_invalid_form";
            returnJson.res_msg = "올바른 비밀번호를 입력해주세요.";
            res.send(returnJson);
        } else if(pw != pw2) {
            returnJson.res_state = "pw_do_not_match";
            returnJson.res_msg = "비밀번호가 일치하지 않습니다.";
            res.send(returnJson);
        } else if(userName.length > 10 || (userName != '' && userNamePattern.test(userName) == false)) {
            returnJson.res_state = "userName_is_invalid_form";
            returnJson.res_msg = "올바른 이름을 입력해주세요.";
            res.send(returnJson);
        } else {
            await query.chkId(id)
                .then((result) => {
                    if(result == 1) {
                        availableId = 1;
                    }else if(result == 0){
                        returnJson.res_state = "email_is_already_used";
                        returnJson.res_msg = "사용중인 이메일 입니다.";
                        res.send(returnJson);
                    }
                })
                .catch(() => {
                    returnJson.res_state = "sql_error";
                    returnJson.res_msg = "잠시 후에 시도해주세요!.";
                    res.send(returnJson);
                });
    
            if(availableId) {
                await query.signup(id, password.encipher(pw), userName, age, expectedDate, signupDatetime)
                    .then(() => {
                        returnJson.res_state = "success";
                        returnJson.res_msg = "회원가입을 축하드립니다.";
                        res.send(returnJson);
                    })
                    .catch(() => {
                        returnJson.res_state = "sql_error";
                        returnJson.res_msg = "잠시 후에 시도해주세요.";
                        res.send(returnJson);
                    });
            }
        }
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.signin = async(req, res, next) => {
    try{
        const returnJson = new Object();
        
        returnJson.res_state = "";
        returnJson.res_msg = "";
        returnJson.res_data = new Object();

        const id = req.body.id;
        const pw = req.body.pw;
        const token = req.body.token;

        returnJson.res_data = await query.signin(id, password.encipher(pw));
        if(returnJson.res_data == null) {
            returnJson.res_state = "invalid_data";
            returnJson.res_msg = "잘못된 아이디 혹은 잘못된 비밀번호입니다.";
            res.send(returnJson);
        } else {
            await query.updateToken(id, token)
                .then(() => {
                    returnJson.res_state = "success";
                    returnJson.res_msg = "로그인 되었습니다.";
                    res.send(returnJson);
                })
                .catch(() => {
                    returnJson.res_state = "sql_error";
                    returnJson.res_msg = "잠시 후에 시도해주세요.";
                });
        }
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.updateExpectedDate = async(req,res) => {
    try{
        const returnJson = new Object();

        returnJson.res_state = "";
        returnJson.res_msg = "";

        const {id, expectedDate} = req.body;


        await query.updateExpectedDate(id, expectedDate)
            .then(() => {
                returnJson.res_state = "success";
                returnJson.res_msg = "출산 예정일을 수정했습니다.";
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
