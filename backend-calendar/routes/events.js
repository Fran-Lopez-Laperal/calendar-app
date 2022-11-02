const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const events = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { fieldValidates } = require('../middlewares/field-valiators');
const { validateJWT } = require('../middlewares/jwt-validates');


/* Al realizar este middleware de use aqui le decimos que TODAS LAS PETICIONES que se encuentren por debajo
deberan pasar primero por validateJWT */
router.use(validateJWT);

router.get('/', events.getEvents);

router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'fecha de inicio es obligatoria').custom(isDate),
        check('end', 'fecha de finalización es obligatoria').custom(isDate),
        fieldValidates
    ],
    events.createEvent);

router.put('/:id', events.updateEvent);

router.delete('/:id', events.deleteEvent);


module.exports = router 