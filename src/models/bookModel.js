const mongoose = require('mongoose');
const ObjectIdAuthor = mongoose.Schema.Types.ObjectId
const ObjectIdPublisher = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
	author:{
        type: ObjectIdAuthor,
        ref: "newAuthor",
    },
	price: Number,
	ratings: Number,
	publisher: {
        type: ObjectIdPublisher,
        ref: "newPublisher",
    },
    isHardCover: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
