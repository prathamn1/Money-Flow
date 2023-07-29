const mongoose = require('mongoose')


const IncomeSchema = new mongoose.Schema( {
    title : {
        type : String,
        required: true,
        trim : true,
        maxLength : 50
    },
    amount : {
        type : Number,
        required : true,
        trim : true,
        maxLength : 20
    },
    type : {   // this is the type of transaction ie. income or expenditure
        type : String,
        default : "Income",
        
    },
    date : {
        type : Date,
        required: true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        maxLength : 100,
        trim : true
    },
    category : {
        type : String,
        required : true,
        maxLength : 20,
        trim : true
    }

},{timestamps : true})

module.exports = mongoose.model('Income', IncomeSchema)