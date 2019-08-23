const mongoose = require("mongoose")

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI || process.env.CONNECTION_URL,
        { userNewUrlParser: true },
        (err) => {
            if (!err) {
                console.log("DB Connected!");
            }
        })
}