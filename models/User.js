const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
}, {
    timestamps: true
})

UserSchema.methods.genToken = function () {
    return jwt.sign({email:this.email}, process.env.JWT_SECRET)
}

UserSchema.methods.genUserObject = function () {
    return {
        name: this.name,
        email: this.email,
        token: this.genToken()
    }
}

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash)
}

UserSchema.methods.createHash = function (password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    this.passwordHash = hash
}

module.exports = mongoose.model("User", UserSchema)