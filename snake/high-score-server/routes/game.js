const express = require('express'),
      mongoose = require('mongoose'),

      router = express.Router(),

      highscoreSchema = require('../models/Score');




    //first test route for this server
      router.get('/', (req, res) => {
          res.send('testing')
      })



module.exports = router;