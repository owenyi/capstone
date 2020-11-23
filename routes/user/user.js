//module dependencies
//const query = require('./userFct.js');

exports.getUser = async (req, res) => {
    let userName = req.query.userName;
    console.log(userName);
    res.send(userName);
}