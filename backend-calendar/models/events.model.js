const mongoose = require('mongoose');
const Schema = mongoose.Schema


const eventSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    notes:{
        type: String,
    },

    start:{
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,
        toJSON:{
            transform: (doc, event) => {
                event.id = event._id,


                delete event._id
            }
        }
    },
    
)


const Event = mongoose.model('Event', eventSchema);
module.exports = Event