const mongoose = require('mongoose');



const ScoreSchema = mongoose.Schema({ 

    name: {
        type: String,
        required: true
    },

    score: {
        type: String,
        required: true
    }


});

const scoreExport = mongoose.model('User', ScoreSchema);

module.exports = scoreExport;