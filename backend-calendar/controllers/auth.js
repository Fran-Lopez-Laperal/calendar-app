
const { response } = require('express');

module.exports.crearUsuario = (req, res = response, next) => {


    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
}


module.exports.loginUsuario = (req, res = response, next) => {

    const { email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'login',
        password,
        email
    })
};

module.exports.revalidarToken = (req, res = response, next) => {

    const { } = req.params

    res.json({
        ok: true,
        msg: 'renew'
    })
}
