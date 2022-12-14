const mongoose = require('mongoose')

const isValid = function(value){
    if(!value || typeof value === "undefined" || value === null || typeof value != 'string') return false
    if(typeof value === "string" && value.trim().length === 0 ) return false
    return true
}

const isValidNumber = function(value){
    if(!value || typeof value === "undefined" || value === null || typeof value != 'number') return false
    if(typeof value === "number" && value.length === 0 ) return false
    return true
}

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const isValidName = (/^[a-zA-Z ]*$/)
const isValidMail = (/^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/);
const isValidPassword = (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)

module.exports = {isValid, isValidNumber, isValidObjectId, isValidName, isValidMail, isValidPassword}