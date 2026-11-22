const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    company:{
       type:String,
       required:true,
       trim:true,
       minlength:3,
       maxlength:100
    },
    position:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['Applied','Interview','Rejected','Accepted'],
        default:'Applied'

    },
    location:{
        type:String,
        trim:true
    },
    salary:{
        type:Number,
        min:0
    },
    description:{
        type:String,
        maxlength:2000
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timeStamps:true});

const job=mongoose.model('Job',jobSchema);

module.exports=job