const { response } = require('express')
const Event = require('../models/events.model')



/* DIFERENTES MANERAS DE REALIZAR UNA PROMESA */
module.exports.getEvents = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name')

    res.json({
        ok: true,
        events
    })

}


module.exports.createEvent = async (req, res) => {



    const event = new Event(req.body);

    try {

        event.user = req.uid;
        const eventSave = await event.save();

        res.json({
            ok: true,
            event: eventSave
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: ' Hable con el administrador'
        })
    }
}

module.exports.updateEvent = async (req, res) => {

    const eventID = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventID);
        if (!event) {
            res.status(404).json({

                ok: false,
                msg: "Evento no encontrado por ese ID"
            })
        }

        if (event.user.toString() !== uid){
            return res.status(401).json({
                od:false,
                msg: "No tiene privilegio de editar el evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }


        const updateEvent = await Event.findByIdAndUpdate(eventID, nuevoEvento, {new: true});

        res.json({
            ok:true,
            event: updateEvent
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hablé con el administrador'
        })
    }




    res.json({
        ok: true,
        eventID
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