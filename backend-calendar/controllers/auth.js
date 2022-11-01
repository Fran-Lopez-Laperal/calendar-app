
const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

module.exports.crearUsuario = async (req, res = response, next) => {

    const { email, password } = req.body;


    try {

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        user = new User(req.body)

        //Encriptar constraseña con librería bcryptjs

        await user.save()

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Email ya existe'
        })

    }


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
