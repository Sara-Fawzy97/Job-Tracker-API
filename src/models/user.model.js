const mongoose= require('mongoose')
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        uniqe:true
    },
    password:{
        type:String,
        required:true,
        select: false, // ده معناه إن Mongoose بيخفي الـ Password من نتائج البحث بشكل افتراضي. 

    }
},{timestamps:true})

// to hash a password
userSchema.pre('save',async function(){
       if(!this.isModified('password')) return;

       this.password=await bcrypt.hash(this.password,10);
})

//to check if the passwords is the same
userSchema.methods.comparePassword= async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model('User',userSchema);
module.exports=User;