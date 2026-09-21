const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true, "User is required for creating account"],
        index:true
    },
    status: {
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status must be either ACTIVE, FROZEN, or CLOSED"
        }
    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating account"],
        default: "INR",
    }
},{
    timestamps:true
})

accountSchema.index({ user: 1, status: 1})  // Compound index to ensure unique combination of user and status

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel