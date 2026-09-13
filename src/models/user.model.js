const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is required for creating user"],
        trim:true,
        lowercase:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9,-]+\.[a-zA-Z]{2,}$/, "Invalid email address"],
        unique:[true, "Email must be unique"]
    },
    name: {
        type:String,
        required:[true, "Username is required"]
    },
    password: {
        type:String,
        required:[true, "Password is required"],
        minLength:[6, "Password should contain more than 6 characters"],
        select:false
    }

},{
    timestamps:true
})

// schema ke data ko save karne se pehle check kar rahe hai ki password hashed hai ki nahi?

userSchema.pre("save",async function(){
    if(!this.isModified('password')){
        return 
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
        return 
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user",userSchema)

module.exports = userModel