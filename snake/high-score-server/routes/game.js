const express = require('express'),
      mongoose = require('mongoose'),

      router = express.Router(),

      highscoreSchema = require('../models/Score');


      router.get('/addnew', async (req, res) => {
          
          const newpost = new highscoreSchema( {

              name: req.body.name,
              score: req.body.score
              
          })


          await newpost.save()

          .then( response => {

            console.log(response);

            res.json({post: newpost })
            
          })
          .catch( err => {
            
            console.log(err);
            
          })
          
      })


      router.get('/all', async (req, res) => {
          const all = await highscoreSchema.find();

          res.json({all_scores: all})
      })

    //first test route for this server
      router.get('/', (req, res) => {

        let gameFilesRoute = __dirname.replace(/\\high-score-server\\routes/, '/public/snake.html');
          res.sendFile(gameFilesRoute)
      })



module.exports = router;