//Global Vars

const express = require('express'),
      mongoose = require('mongoose'),

      app = express(),

      gameRoute = require('./routes/game');

      app.use('/', gameRoute)

      app.listen(3000, () => {

          console.log('listening on port 3000');
          
      })