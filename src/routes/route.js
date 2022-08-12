const express = require('express');
const router = express.Router();

let person = [
    {
        name : "PK",
        age : 10,
        votingStatus : false
    },
    {
        name : "SK",
        age : 20,
        votingStatus : false
    },
    {
        name : "AA",
        age : 70,
        votingStatus : false
    },
    {
        name : "SC",
        age : 5,
        votingStatus : false
    },
    {
        name : "HO",
        age : 40,
        votingStatus : false
    }
]

router.post("/voting", function(req,res){
    let votingAge = req.query.age
    let age = []
    for (i=0; i<person.length; i++){
        if(votingAge<person[i].age){
            person[i].votingStatus = true
            age.push(person[i])
        }
    }
    res.send({data: age, status: true})
})
module.exports = router;
