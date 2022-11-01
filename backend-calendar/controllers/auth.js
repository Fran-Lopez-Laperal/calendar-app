
const { response, json } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt.helpers');

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
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //Generar nuesto JWT Json Web Token
        const token = await generateJWT(user.id, user.name)




        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Email ya existe'
        })

    }


}


module.exports.loginUsuario = async(req, res = response, next) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        //Confirmar los password
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //Generar nuesto JWT Json Web Token
        const token = await generateJWT(user.id, user.name)




        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};

module.exports.revalidarToken = async(req, res = response, next) => {

    const uid  = req.uid;
    const name = req.name;

    const token = await generateJWT(uid, name) 

    res.json({
        ok: true,
        uid, name,
        token
    })
}
