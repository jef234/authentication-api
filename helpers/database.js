const mongoose = require("mongoose")

exports.connect = () => {
    mongoose.connect(process.env.CONNECTION_URL,
        { userNewUrlParser: true },
        (err) => {
            if (!err) {
                console.log("DB Connected!");
            }
        })
}