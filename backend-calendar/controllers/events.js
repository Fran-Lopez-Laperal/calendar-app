const express = require('express')
const Event = require('../models//events.model')

module.exports.getEvents =  (req, res, next) => {

    Event.find()
    .then(event => res.status(201).json(event))
    .catch(error => next(error))
}


module.exports.createEvent = async(req, res) => {

    

    const event =  new Event(req.body);

    try{

         event.user = req.uid;
          const eventSave = await  event.save();

          res.json({
            ok: true,
            event: eventSave
          })

    }catch(error){
        res.status(500).json({
            ok: false,
            msg: ' Hable con el administrador'
        })
    }
}

module.exports.updateEvent = (req, res) => {
    res.json({
        ok: true,
        msg: 'updateEvents'
    })
}

module.exports.deleteEvent = (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteEvents'
    })
}




// {
//     ok: true,
//     msg: 'getEventos'
// }


// {
//     ok: true,
//     msg: 'crearEventos
// }

// {
//     ok: true,
//     msg: ' actualizarEvento'
// }


// {
//     ok: true,
//     msg: ' eliminarEvento'
// }