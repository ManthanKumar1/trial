const express = require('express');
const router = express.Router();
const {createAdmin, login} = require("../controllers/adminController")
const {createStudent, getStudentsByParams, getStudentsByQuery, updateStudent, deleteStudent} = require("../controllers/studentController")


router.post('/createAdmin', createAdmin)
router.post('/login', login)

router.post('/createStudent', createStudent)
router.get('/getStudents/:id', getStudentsByParams)
router.get('/getStudent', getStudentsByQuery)
router.put('/updateStudent', updateStudent)
router.delete('/deleteStudent', deleteStudent)

module.exports = router;