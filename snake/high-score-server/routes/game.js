const express = require('express'),
      mongoose = require('mongoose'),

      router = express.Router(),

      highscoreSchema = require('../models/Score');


      router.get('/addnew', async (req, res) => {
          const newpost = new highscoreSchema( {
              name: 'bil',
              score: '100'
          })


          await newpost.save()

          res.json({post: newpost})
      })


      router.get('/all', async (req, res) => {
          const all = await highscoreSchema.find();

          res.json({all_scores: all})
      })

    //first test route for this server
      router.get('/', (req, res) => {
          res.send('testing')
      })



module.exports = router;