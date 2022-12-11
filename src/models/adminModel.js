const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true 
    },
    lastName: {
      type: String,
      required: true,
      trim: true 
    },
    email: {
      type: String,
      required: true,
      trim: true 
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },{ timestamps: true });

module.exports = mongoose.model("admin", adminSchema);
