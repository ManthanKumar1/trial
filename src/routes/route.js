const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/cohort-members', function(req,res){
    let students = ['abc','mno','xyz']
    console.log(students)
    res.send("hi")
})

router.get('/student-details/:name/:age', function(req,res){
    console.log("This is the request "+ JSON.stringify(req.params))
    let reqParams = req.params
    let studentName = reqParams.name
    console.log('Name of the student is ', studentName)
    let student = studentName + " " + studentName
    res.send("studentDetails")
})

router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason
