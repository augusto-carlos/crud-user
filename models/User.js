const mongoose = require('../config/database')
const Shema = mongoose.Schema

const UserShema = new Shema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    }
})
const Users = mongoose.model('users', UserShema)

module.exports = Users