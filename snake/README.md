1/26/2020 - so far I have created an application that allows the user to play the basic game of snake. The program can keep score, restart, and detect a loss.
            my next step is to create a highscore system and then implement that into a server database of my own. 


2/19/20

updated the theme of my snake game to 'space', I've created a space background and updated the way the 'food' and the play looks on the screen

updated the Html/CSS to look a lot better


2/20/20 

after working on creating apis of my own and connecting them frontend pages I am ready to start adding a highscore system for my game that will store highscores on my Mongo-Database

2/23/20

setup schema model and set up index with a route handler that is being imported from the routes folder.
all together these will be the key components to sending and recieving highscore information to an from my Mongo Database

2/29/20

after a few days of work i have completed connecting the front end to the backend with one route. When the user's page loads, a request for all the current highscores is made and all the scores are displayed to the user. 

install morgan to see all routes in console for debug refrence.

3/1/20

leaderboard appearance was improved greatly, all elements, including leaderboard title are created dynamically in JS.

If the server is not connected it will show a message to the users along the lines of 'server is not connected'

The appearence of the game looks much better after todays work. Worked on CSS and Html a good bit

The backend-to-frontend connection is working great when the server is running and the game will still run fine if the server is offline

limited the number of table rows but also increase the limit if dupplicates were found
(7 unique scores, 15 max)

3/2/20

improved the look of the game so the gamespace is much bigger on screen and the sidebars take up almost the full height of the window

added a trail effect when the player picks up points. to do this i created a new array of objects. a new object will be created each frame in the wake of the snakes tail. a new object is created with the position of the snail tail and pushed to the trailArray. then as time goes on the objects color changes and its alpha fades. once its alpha has reached 0 it will be deleted from the array

created a darkmode toggle button that is linked to a function. The elements will start off in color and the background with a background image. if the button is toggled than darkmode will change all the divs and window background color to black. then back to default if the button is pressed a again.

increased the starting speed of the snake as the area of play is much bigger for the snake now. there is now a 50ms delay between snake movements with a minimum of 20ms

3/3/20

update the star background to something i like alot better, instead of the stars being circles they are now streaks that grow in length as they get closer to the border of the canvas

updated the darkmode function to include the game info background, the canvas border, and the leaderboard background

updated the border of the canvas and the gameinfo div to have a rainbow effect


3/12/2020 

updated wall detection so play is teleported to other side of gamespace instead of gameover on wallhit

next i am going to make enemies because game is much harder to lose with this change