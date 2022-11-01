/*
Rutas de Usuarios / Auth
host + /api/auth
*/
const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')
const { check } = require('express-validator');
const { fieldValidates } = require('../middlewares/field-valiators');
const { validateJWT } = require('../middlewares/jwt-validates');


router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser obligatorio').isLength(6),
        fieldValidates
    ],
    auth.crearUsuario);

router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser obligatorio').isLength(6),
    fieldValidates
],
auth.loginUsuario);

router.get('/renew', validateJWT, auth.revalidarToken,);

module.exports = router;