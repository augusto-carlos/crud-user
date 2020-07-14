const express = require('express')
const router = express.Router()
const Users = require('./models/User')

/*=============== CRIANDO ROTAS DE USUÁRIO ================*/

// listar usuários
router.get('/', (req, res) => {
    Users.find().exec((err, users) => {
        if (err) {
            req.flash('error_msg', 'houve um erro ao listar usuários')
            res.redirect('./')
        } else {
            res.render('users/index', { users })
        }
    })
})

// renderizar formulário de cadastro
router.get('/novo', (req, res) => {
    res.render('users/new')
})

// cadastrar novo usuário
router.post('/novo', (req, res) => {
    let erros = []

    // Validação gambiarra kkk
    if (!req.body.Name || typeof req.body.Name == undefined || req.body.Name == null) {
        erros.push({ texto: 'Nome de usuário inválido!' })
    }

    if (erros.length > 0) {
        res.render('users/index', { erros })
    } else {
        new Users({
            name: req.body.Name,
            age: req.body.Age
        })
            .save()
            .then(() => {
                req.flash('success_msg', 'Usuário cadastrado com sucesso!')
                res.redirect('./')
            }).catch(() => {
                req.flash('error_msg', 'houve um erro ao cadastrar o usuário, tente novamente')
                res.redirect('./')
            })
    }
})

module.exports = router