const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Please enter service name'],
        trim : true
    },
    charge : {
        type : Number,
        required : [true,'Please enter service charge'],
        default : 0.0
    },
    description : {
        type : String,
        required : [true,'Please enter service description'],
        trim : true
    },
    ratings : {
        type : Number,
        default : 0,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Service', serviceSchema);