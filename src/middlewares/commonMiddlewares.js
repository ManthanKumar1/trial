
const user = require('../models/userModel')

const freeUser = function (req, res, next){
    let freeApp = req.headers
    if (!freeApp.isfreeappuser){
        return res.send("isFreeAppUser is mandatory field")        
    } else {
    next()
}
}

module.exports.freeUser = freeUser