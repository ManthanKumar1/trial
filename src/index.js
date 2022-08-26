const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://manthankumar:DRdwwpc5da3xwXTV@cluster0.gax1eez.mongodb.net/Manthan29-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);

// app.use (
//     function (req, res, next) {
//         console.log ("inside GLOBAL MW");
//         res.send({msg:"done"})
//   }
//   );


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
