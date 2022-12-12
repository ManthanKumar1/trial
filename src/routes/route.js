const express = require('express');
const router = express.Router();
const {createAdmin, login} = require("../controllers/adminController")
const {createStudent, getStudentsByParams, getStudentsByQuery, updateStudent, deleteStudent} = require("../controllers/studentController")
const {authentication} = require("../middleware/auth")

router.post('/createAdmin', createAdmin)
router.post('/login', login)

router.post('/createStudent', authentication, createStudent)
router.get('/getStudents/:studentId', authentication, getStudentsByParams)
router.get('/getStudent', authentication, getStudentsByQuery)
router.put('/updateStudent/:studentId', authentication, updateStudent)
router.delete('/deleteStudent/:studentId', authentication, deleteStudent)

module.exports = router;