const jwt = require('jsonwebtoken')
const SECRET_JWT_SEED = process.env.SECRET_JWT_SEED

module.exports.generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        jwt.sign(payload, SECRET_JWT_SEED, {
            expiresIn: '6h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }

            resolve(token)

        })
    })

}