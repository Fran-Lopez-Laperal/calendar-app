/*
Rutas de Usuarios / Auth
host + /api/auth
*/
const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')


router.post('/new', auth.crearUsuario);

router.post('/', auth.loginUsuario);

router.get('/renew', auth.revalidarToken);

module.exports = router