//Global Vars

require('dotenv/config');

const express = require('express'),
      mongoose = require('mongoose'),

      app = express(),

      gameRoute = require('./routes/game');

      app.use('/', gameRoute)


      //MongoDB Connection

        //get the database connection uri from my .env file
        let mongoUri = process.env.MDBURI;

        //connnect using the previously declared variable and use obj to pass through parameters so no depercation warnings occur
        mongoose.connect(mongoUri, ({ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} ))

        //when the connection occurs these promises will fire
        mongoose.connection.on('connected', () => {

            // console.log(`\nMongoose connection open to ${mongoUri}\n`);

        });

        //if an error occurs, the a message will be logged
        mongoose.connection.on('error', (err) => { 

            console.log(`Mongoose connection error: ${err}`);

        }); 

        //this will fire once the database has successfully made a connection
        mongoose.connection.once('open', () => {

            console.log("\nDatabase Connected\n");

        })

        //if the DB disconnects a message will be logged
        mongoose.connection.on('disconnected', () => { 

            console.log('\nMongoose default connection disconnected'); 

        });
      

      //Local Host Port Connection

      let port = process.env.PORT

      app.listen(port, () => {

          console.log(`listening on port ${port}`);
          
      })