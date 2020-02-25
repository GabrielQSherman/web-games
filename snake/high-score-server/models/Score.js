const mongoose = require('mongoose');



const ScoreSchema = mongoose.Schema({ 

    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 3
    },

    score: {
        type: String,
        required: true
    }


});

const scoreExport = mongoose.model('User', ScoreSchema);

module.exports = scoreExport;