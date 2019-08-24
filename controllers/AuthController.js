const User = require("../models/User")

exports.login = (req, res) => {
    console.log("body:");
    console.log(req.body);
    console.log("email:");
    console.log(req.body.email);
    console.log("password:");
    console.log(req.body.password);
    User.findOne({email:req.body.email})
    .then(user => {
        if(user && user.comparePassword(req.body.password)){
            res.json({
                user: user.genUserObject()
            })
        } else {
            res.status(404).json({
                msg:"User not found"
            })
        }
    })
}

exports.register = (req, res) => {
    const user = new User(req.body)
    user.createHash(req.body.password)
    user.save().then(user => {
        res.status(200).json({
            user: {
                user: user.name,
                email: user.email
            }
        })
    })
}