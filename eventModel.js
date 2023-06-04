const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type : {
        type : String,
    },
    name : {
        type: String,
    },
    tagline : {
        type: String,
    },
    schedule : {
        type : String,
    },
    description : {
        type: String,
    },
    moderator : {
        type : String,
    },
    category : {
        type : String,
    },
    sub_category : {
        type : String,
    },
    rigor_rank : {
        type : String,
    },
    files : [
        {
            type : String,
        }
    ]
}, {
    timestamps: true
});

const eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel;