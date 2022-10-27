const express = require('express')

module.exports.crearUsuario = (req, res = express.response, next) => {

    const { name, email, password } = req.body;

    if(name.length < 5){
        
        /*Este return vale para crear una unica respuesta y que se envie el objeto una única vez.
         Sin el return creariamos una respuesta encima de la anterior y nos daría un error  
        */
       
       return res.status(400).json({
            ok: false,
            msg: 'El nombre debe de ser de 5 letras'
        })
    }

    res.json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
}


module.exports.loginUsuario = (req, res = express.response, next) => {

    const { email, password } = req.body

    res.json({
        ok: true,
        msg: 'login',
        password,
        email
    })
};

module.exports.revalidarToken = (req, res = express.response, next) => {

    const { } = req.params

    res.json({
        ok: true,
        msg: 'renew'
    })
}
