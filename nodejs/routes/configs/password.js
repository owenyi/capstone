const md5 = require('md5');

exports.encipher = (pw) => {
    const pwSalt = "sangsoonlee";
    return md5(pw + pwSalt);
}