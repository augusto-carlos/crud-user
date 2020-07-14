const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const UserRoutes = require('./routes')

//Session
app.use(session({
    secret: 'crud-user',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//Public
app.use(express.static(path.join(__dirname, "public")))

// Template engine
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Routes
app.get('/', (req, res) => {
    res.render('home')
})

app.use('/usuarios', UserRoutes)

// Server
const port = 8081
app.listen(port, () => {
    console.log('Servidor rodando...')
})

