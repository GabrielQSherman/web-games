
    //HIGHSCORE FUNCTIONS 

    //LOAD HIGHSCORES when page loads
    

    function load_latest_hs() {

      const xhr = new XMLHttpRequest(), method = 'GET', endpoint = 'http://localhost:7777/all';

      xhr.open(method, endpoint, true )

      xhr.setRequestHeader('Accept', '*')

      xhr.onload = () => {

          let jsonData = JSON.parse(xhr.responseText);

          // console.log(jsonData.all_scores);
          
          set_up_leaderboard(jsonData.all_scores)

          serverConnected = true
      }

      xhr.onerror = (err) => {
          //function that will send a message to the user letting them know
          // the highscores could not be retrieved from server
          get_hs_failed() 

          serverConnected = false;
      }

      xhr.send()

  }

  function enter_highscore_name(message, cancelCount) {

      if (message === 0) {
          message = "YOU MADE THE LEADERBOARD!!!\nEnter 3 Charaters To Secure Your Spot On The Leaderboard"
      }

      let hsName = prompt(message, "");

      if (hsName != null) {

          hsName = hsName.trim()

          if (hsName.length > 2) {

              // console.log(hsName.substring(0,3).toUpperCase());

              return hsName.substring(0,3).toUpperCase();

          } else {

              message = "The Name Entered Must Be 3 Character, longer inputs will be shortened"

              return enter_highscore_name(message, 0)

          }

          
      } else if (cancelCount == 0) {

          message = "Are you sure you want to cancel? Just enter a name and your highscore will be saved"

         return enter_highscore_name(message, 1)
          
      } else if (cancelCount == 1) {

          message = "If this prompt is cancled your highscore will not be saved"

         return enter_highscore_name(message, 2)

      }  
      
  }

  
  //SEND SCORE DATA TO DATABASE

  function upload_highscore(score, name) {

      let userScore = score, userName = name,

          json = JSON.stringify({name: userName, score: userScore});

      const xhr = new XMLHttpRequest(), method = 'POST', endpoint = 'http://localhost:7777/addnew';

      xhr.open(method, endpoint, true )

      xhr.setRequestHeader('Accept', '*')
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {

          let jsonData = JSON.parse(xhr.responseText);

          console.log(jsonData.message);

      }

      xhr.send(json)

      setTimeout(load_latest_hs, 100)

  }

  
    //CREATING LEADERBOARD

    //send message to user if get request was not sucessful

    function get_hs_failed() {

      const leaderBoardDiv = document.getElementById("lbdiv");

      leaderBoardDiv.innerHTML = '<h1>Failed to get highscore data from server, make sure server is up and running correctly<h1>'

  }

  //set up leaderboard html table element if get request was successful
  function set_up_leaderboard(responseArr) {

      //create leaderboard 'title'
      // <h1 id="LB">Leader Board</h1> htmt equivelent
      const lbTitle = document.createElement('h1');

      lbTitle.id = 'LB';
      lbTitle.innerText = 'Leader Board';

      //use xhr to get all scores -> pass the array from the parsed response text, and passes as parameter of this function
      const sortedScores = responseArr.sort((a, b) => {
         
          return (parseInt(b.score) - parseInt(a.score));

      });

      //responseArr will have all the current highscores in database (name & score) as a json obj
     
      //CREATING scores table ...

      //create table in DOM
      const leaderTable = document.createElement('table'),

      //create headers
       tableRow = document.createElement('tr'),
       tableHeaderName = document.createElement('th'),
       tableHeaderScore = document.createElement('th');

       tableHeaderName.innerText = 'Name';
       tableHeaderScore.innerText = 'Score';

       tableRow.appendChild(tableHeaderName);
       tableRow.appendChild(tableHeaderScore);

       leaderTable.appendChild(tableRow)

       let numOfScores = 21;
      
       for (let i = 0; i < sortedScores.length && i < numOfScores && i < 27; i++) {

          if (sortedScores[i-1] != undefined && sortedScores[i].score === sortedScores[i-1].score) {
              numOfScores++
          }
          
          const tr = document.createElement('tr'); //one variable for the row the info is contained on

          const tdName = document.createElement('td'); //one for each

          const tdScore = document.createElement('td'); //peice of infomation

          tdName.innerText = sortedScores[i].name;
          tdScore.innerText = sortedScores[i].score;

          tr.appendChild(tdName);
          tr.appendChild(tdScore);

          leaderTable.appendChild(tr);
          
      }

      leaderTable.id = 'leaderBoardTab';

      leaderTable.align = 'center';
      
      const leaderBoardDiv = document.getElementById("lbdiv");

      leaderBoardDiv.innerHTML = ''

      //append the title then the table
      leaderBoardDiv.appendChild(lbTitle)

      leaderBoardDiv.appendChild(leaderTable);


  }