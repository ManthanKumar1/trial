const studentModel = require("../models/studentModel")
const { isValid, isValidNumber, isValidObjectId, isValidName, isValidMail, isValidPassword } = require("../validation/validator")

const createStudent = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Please provide something to create student's data" })
    }

    let { firstName, lastName, subject, marks, adminId, isDeleted, deletedAt } = data

    if (!isValid(firstName)) {
      return res.status(400).send({ status: false, message: "Please provide first name of the student" })
    }
    if (!isValidName.test(firstName)) {
      return res.status(400).send({ status: false, message: "Please provide valid first name" })
    }

    if (!isValid(lastName)) {
      return res.status(400).send({ status: false, message: "Please provide last name of the student" })
    }
    if (!isValidName.test(lastName)) {
      return res.status(400).send({ status: false, message: "Please provide valid last name" })
    }

    if (!isValid(subject)) {
      return res.status(400).send({ status: false, message: "Please provide subject for student" })
    }
    if (!isValidName.test(subject)) {
      return res.status(400).send({ status: false, message: "Please provide subjects only in Alphabetical order" })
    }

    if (!isValidNumber(marks)) {
      return res.status(400).send({ status: false, message: "Please provide marks for the student" })
    }

    if (!isValidObjectId(adminId)) {
      return res.status(400).send({ status: false, message: "Please provide valid admin id" })
    }

    if (isDeleted == true) {
      return res.status(400).send({ status: false, message: "You delete the student details on the time of creation" })
    }

    const findStudent = await studentModel.findOne({ firstName: firstName, lastName: lastName, subject: subject, adminId: adminId, isDeleted: false })
    if (findStudent) {
      let admin = findStudent.adminId
      if (admin != req.decode.adminId) {
        return res.status(403).send({ status: false, message: "you are not Authorized person" })
      }
    
      let oldMarks = findStudent.marks
      let newMarks = oldMarks + marks
      const updateStudent = await studentModel.findOneAndUpdate({ firstName: firstName, subject: subject }, { $set: { marks: newMarks } }, { new: true })
      return res.status(200).send({ status: true, message: "Marks updated successfully", data: updateStudent })
    }

    const createData = await studentModel.create(data)
    return res.status(201).send({ status: true, message: "Student created successfully", data: createData })

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const getStudentsByParams = async function (req, res) {
  try {
    let studentId = req.params.studentId
    if (!isValidObjectId(studentId)) {
      return res.status(400).send({ status: false, message: "Please provide valid id" })
    }

    const findStudent = await studentModel.find({ _id: studentId, isDeleted: false })
    if (!findStudent) {
      return res.status(404).send({ status: false, message: "Student not found with this id" })
    }

    return res.status(200).send({ status: true, message: "Student's Data", data: findStudent })

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const getStudentsByQuery = async function (req, res) {
  try {
    let data = req.query
    let { firstName, subject } = data
    if (!data) {
      const show = await studentModel.find({ isDeleted: false })
      return res.status(200).send({ status: true, message: "Student's data", data: show })
    }

    const findData = await studentModel.find({ firstName: firstName, subject: subject, isDeleted: false })
    return res.status(200).send({ status: true, message: "Student's Data", data: findData })

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const updateStudent = async function (req, res) {
  try {
    let id = req.params.studentId
    if (!isValidObjectId(id)) {
      return res.status(400).send({ status: false, message: "Please provide valid id" })
    }
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Please provide some data to update the student details" })
    }
    let check = await studentModel.find({ _id: id, isDeleted: false })
    if (!check) {
      return res.status(404).send({ status: false, message: "Student not found" })
    }
    let admin = check.adminId
    if (admin != req.decode.adminId) {
      return res.status(403).send({ status: false, message: "you are not Authorized person" })
    }

    let oldMarks = check.marks
    let { marks } = data
    if (!marks) {
      return res.status(400).send({ status: false, message: "Please provide marks to update" })
    }
    let newMarks = oldMarks + marks
    let updateStudent = await studentModel.findOneAndUpdate({ _id: id }, { $set: { marks: newMarks } }, { new: true })
    return res.status(200).send({ status: true, message: "Student's details updated successfully", data: updateStudentDetails })

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const deleteStudent = async function (req, res) {
  try {
    let id = req.params.studentId
    if (!isValidObjectId(id)) {
      return res.status(400).send({ status: false, message: "Please provide valid id" })
    }
    let check = await studentModel.find({ _id: id, isDeleted: false })
    if (!check) {
      return res.status(404).send({ status: false, message: "Student not found" })
    }
    let admin = check.adminId
    if (admin != req.decode.adminId) {
      return res.status(403).send({ status: false, message: "you are not Authorized person" })
    }

    const deleteStudents = await studentModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now } }, { new: true })
    if (!deleteStudents) {
      return res.status(404).send({ status: false, message: "Student not found" })
    }

    return res.status(200).send({ status: true, message: "Student deleted successfully" })

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

module.exports = { createStudent, getStudentsByParams, getStudentsByQuery, updateStudent, deleteStudent }