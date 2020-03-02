const express = require('express'),
      mongoose = require('mongoose'),

      router = express.Router(),

      highscoreSchema = require('../models/Score');


      router.post('/addnew', async (req, res) => {

          
          const newpost = new highscoreSchema( {

              name: req.body.name,
              score: req.body.score
              
          })


          await newpost.save()

          .then( response => {

            // console.log(response);

            res.json({message: 'Highscore Saved' })
            
          })

          .catch( err => {

            console.log(err);

            res.json({err: err.message})
            
          })

          .finally()
          
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



    //adminRoutes for development


    //delete all highscores in database (can be modified to delete specific, but one must hardcode filters)
    router.delete('/deleteall', async(req, res) => {

      let deleteReport =  await highscoreSchema.remove({});

      console.log(deleteReport);
      
      res.send('delete request sent')

    })

    //upload testing data

    router.post('/addtestpost/:postcount', async (req, res) => {

        let Errors = [], Successes = [], numOfPost = req.params.postcount
        
        for (let i = 0; i < numOfPost; i++) {
          
            const newpost = new highscoreSchema( {

              name: Math.random().toString(36).substring(3,6).toUpperCase(),
              score: Math.ceil(Math.random() * 50)
              
            })


            await newpost.save()

            .then( response => {

              // console.log(response);

              Successes.push(response)
              
              
            })

            .catch( err => {

              Errors.push(err)
              
            })
            
        }

        res.json({

          sucessfully_posted: Successes,
          errors_occured: Errors

        })

      
    })




module.exports = router;