const studentModel = require("../models/studentModel")
const {isValid, isValidNumber, isValidObjectId, isValidName, isValidMail, isValidPassword} = require("../validation/validator")

const createStudent = async function(req, res){
  try {
    let data = req.body
    if(Object.keys(data).length == 0){
      return res.status(400).send({status: false, message: "Please provide something to create student's data"})
    }

    let {firstName, lastName, subject, marks, adminId, isDeleted, deletedAt} = data

    if(!isValid(firstName)){
      return res.status(400).send({status: false, message: "Please provide first name of the student"})
    }
    if(!isValidName.test(firstName)){
      return res.status(400).send({status: false, message: "Please provide valid first name"})
    }

    if(!isValid(lastName)){
      return res.status(400).send({status: false, message: "Please provide last name of the student"})
    }
    if(!isValidName.test(lastName)){
      return res.status(400).send({status: false, message: "Please provide valid last name"})
    }

    if(!isValid(subject)){
      return res.status(400).send({status: false, message: "Please provide subject for student"})
    }
    if(!isValidName.test(subject)){
      return res.status(400).send({status: false, message: "Please provide subjects only in Alphabetical order"})
    }

    if(!isValidNumber(marks)){
      return res.status(400).send({status: false, message: "Please provide marks for the student"})
    }

    if(!isValidObjectId(adminId)){
      return res.status(400).send({status: false, message: "Please provide valid admin id"})
    }

    if(isDeleted == true){
      return res.status(400).send({status: false, message: "You delete the student details on the time of creation"})
    }

    const findStudent = await studentModel.findOne({firstName: firstName, lastName: lastName, subject: subject, adminId: adminId, isDeleted: false})
    if(findStudent){
      let oldMarks = findStudent.marks
      let newMarks = oldMarks+marks
      const updateStudent = await studentModel.findOneAndUpdate({firstName: firstName, subject: subject}, {$set: newMarks}, {new: true})
      return res.status(200).send({status: true, message: "Marks updated successfully", data: updateStudent})
    }

    const createData = await studentModel.create(data)
    return res.status(201).send({status: true, message: "Student created successfully", data: createData})

  } catch (error) {
    return res.status(500).send({status: false, message: error.message})
  }
}

const getStudentsByParams = async function(req, res){
  try {
    let data = req.params
    if(!isValidObjectId(data)){
      return res.status(400).send({status: false, message: "Please provide valid id"})
    }

    const findStudent = await studentModel.find({data, isDeleted: false})
    if(!findStudent){
      return res.status(404).send({status: false, message: "Student not found with this id"})
    }

    return res.status(200).send({status: true, message: "Student's Data", data: findStudent})

  } catch (error) {
    return res.status(500).send({status: false, message: error.message})
  }
}

const getStudentsByQuery = async function(req, res){
  try {
    let data = req.query
    if(!data){
      const show = await studentModel.find({isDeleted: false})
      return res.status(200).send({status: true, message: "Student's data", data: show})
    }

    const findData = await studentModel.find({data, isDeleted: false})
    return res.status(200).send({status: true, message: "Student's Data", data: findData})

  } catch (error) {
    return res.status(500).send({status: false, message: error.message})
  }
}

const updateStudent = async function(req, res){
  try {
    let data = req.body
    if(Object.keys(data).length == 0){
      return res.status(400).send({status: false, message: "Please provide some data to update the student details"})
    }

    let {firstName, lastName, subject, marks, adminId} = data

    if(firstName){
      if(!isValidName.test(firstName)){
        return res.status(400).send({status: false, message: "Please provide valid first name"})
      }
    }

    if(lastName){
      if(!isValidName.test(lastName)){
        return res.status(400).send({status: false, message: "Please provide valid last name"})
      }
    }

    if(subject){
      if(!isValidName(subject)){
        return res.status(400).send({status: false, message: "Please provide valid subject name"})
      }
    }

    if(marks){
      const checkStudent = await studentModel.findOne({firstName: firstName, lastName: lastName, adminId: adminId, isDeleted: false})
      if(!checkStudent){
        return res.status(404).send({status: false, message: "Student Not Found"})
      }
      let oldMarks = checkStudent.marks
      let newMarks = oldMarks+marks
    }

    if(!isValidObjectId(adminId)){
      return res.status(400).send({status: false, message: "Please provide valid id"})
    }

    const updateStudentDetails = await studentModel.findOneAndUpdate({firstName: firstName, lastName: lastName, subject: subject, adminId: adminId, isDeleted: false}, {$set: data, newMarks}, {new: true})
    return res.status(200).send({status: true, message: "Student's details updated successfully", data: updateStudentDetails})

  } catch (error) {
    return res.status(500).send({status: false, message: error.message})
  }
}

const deleteStudent = async function(req, res){
  try {
    let id = req.params
    if(!isValidObjectId(id)){
      return res.status(400).send({status: false, message: "Please provide valid id"})
    }

    const checkDetails = await studentModel.findOne({id, isDeleted: false})
    if(!checkDetails){
      return res.status(404).send({status: false, message: "Student not found"})
    }

    const deleteStudents = await studentModel.findOneAndUpdate({id, isDeleted: false}, {$set: {isDeleted: true, deletedAt: Date.now}}, {new: true})
    return res.status(200).send({status: true, message: "Student deleted successfully"})

  } catch (error) {
    return res.status(500).send({status: false, message: error.message})
  }
}

module.exports = {createStudent, getStudentsByParams, getStudentsByQuery, updateStudent, deleteStudent}