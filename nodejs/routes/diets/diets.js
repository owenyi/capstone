const dietsModel = require('./dietsModel.js');

exports.getDiets = async(req,res) => {
    try{
        const diets = await dietsModel.find()
        res.json(diets);
    }catch(err){
        res.send('Error ' + err)
    }
}