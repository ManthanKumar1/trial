const express = require('express')
const route = require('./routes/route')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express();

app.use(express.json());
app.use(multer().any())
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Junaid619-DB:oS4jO8pwUnVaE0Fu@cluster0.4ufpuyj.mongodb.net/group65Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.use(function (req, res){
    return res.status(400).send({status: false, message: "Path not found"})
})

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
})
