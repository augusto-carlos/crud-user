const mongoose = require("mongoose")

//Mongoose connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/crud-user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conected to mongoBD')
}).catch((err) => {
    console.log('Error connecting to mongoBD: ' + err)
})

module.exports = mongoose