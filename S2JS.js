<html>
 <head>
  <title> My Nuke Falling Game </title>
 </head>

<body>
<canvas id="myCanvas" width=300 height=300 style="background:url('/img/etc/boardwalk.png'); background-size: cover">
  </canvas> 
<script>

 var ctx = myCanvas.getContext("2d");


 var bug_x = myCanvas.width;
 var bug_y = myCanvas.height;
 var BugImg = new Image();
 BugImg.src = "game_13129048.png";         // The bug
 
 
 var bug2_x = myCanvas.width;
 var bug2_y = myCanvas.height;
 var Bug2Img = new Image();
 Bug2Img.src = "game_13129048.png";         // The bug

 var melon_x = 0;
 var melon_y = 0;
 var MelonImg = new Image();
 MelonImg.src = "nuclear_8342503.png";  // The melon
 
 var tree_x = 0;
 var tree_y = 0;
 var TreeImg = new Image();
 TreeImg.src = "tree_740934.png";

 var score = 0;
 var melon_speed = 3;
 var melon_sidespeed = 1;
 var tree_speed = 3;
 var tree_sidespeed = 1;
 var FPS = 40;                        // How many frames per second
 var time_remaining = 180;
 var i = 0;
 var e = 0;
 var r = 0;
 var p = 0;
 


 function restart_game() {
     // This gets called when the 'S' key is pressed and just sets 
     // some important variables back to the start.
     //
     // Alternatively they could just reload the page
     time_remaining = 180;
     score = 0;
     melon_speed = 3;
     }

 function ImagesTouching(x1, y1, img1, x2, y2, img2) {
          //
          // This function detects whether two images are touching - very useful function
          // 
          if (x1 >= x2+img2.width || x1+img1.width <= x2) return false;   // too far to the side
          if (y1 >= y2+img2.height || y1+img1.height <= y2) return false; // too far above/below
          return true;                                                    // otherwise, overlap   
          }


          
          



 function Do_a_Frame () {

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);                 // clear the background

    ctx.fillStyle= "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 0, 20);                               // display the score



    ctx.drawImage(BugImg, bug_x, bug_y);                                  // and draw it
       ctx.drawImage(Bug2Img, bug2_x, bug2_y);                                  // and draw it

    ctx.fillText("Time Remaining: " + Math.round(time_remaining), 0, 45); // display time remaining

    if (time_remaining <= 0) {                                            // if the time has run out
          ctx.fillStyle= "red";
          ctx.font = "bold 50px Arial";                                   // say so
          ctx.textAlign="center";
          ctx.fillText("Game Over", myCanvas.width / 2, myCanvas.height / 2);  
          ctx.font = "bold 20px Arial";
          ctx.fillText("Press R to play again", myCanvas.width / 2, (myCanvas.height / 2)+50);
          ctx.textAlign="left";
          }
    else {
          time_remaining = time_remaining - 1/FPS;                        // otherwise tick the time down
          r++;
          if (r == 400) {
              melon_speed = melon_speed + 0.5;
              tree_speed = tree_speed + 0.5;
              r = 0;
          }
        
          melon_y = melon_y + melon_speed;                                // move the melon down the screen
          melon_x = melon_x + melon_sidespeed;
          tree_y = tree_y + tree_speed;                                // move the melon down the screen
          tree_x = tree_x + tree_sidespeed;

          if ((melon_y > myCanvas.height) && (tree_y > myCanvas.height)) {                                // if it's gone past the bottom
            if (p == 0) {
                score--
              melon_y= 5;                                                 // move it back to the top
              
              melon_x= Math.random() * (myCanvas.width - MelonImg.width); // pick a random x-position, always fully visible
              i = Math.floor(Math.random()*2);
              e = Math.floor(Math.random()*2);
              p = Math.floor(Math.random()*2);
              if (i == 0) {
                  if (e == 0) {
                    melon_sidespeed = Math.random() * 3;
                  } else if (e == 1) {
                      melon_sidespeed = Math.random() * -3;
                  }
              } else if (i == 1) {
                melon_sidespeed= 0;
              } 
              
            } else if (p == 1) {
              tree_y= 5;                                                 // move it back to the top
              tree_x= Math.random() * (myCanvas.width - TreeImg.width); // pick a random x-position, always fully visible
              i = Math.floor(Math.random()*2);
              e = Math.floor(Math.random()*2);
              p = Math.floor(Math.random()*2);
              if (i == 0) {
                  if (e == 0) {
                    tree_sidespeed = Math.random() * 3;
                  } else if (e == 1) {
                      tree_sidespeed = Math.random() * -3;
                  }
              } else if (i == 1) {
                tree_sidespeed= 0;
              } 
            }
          }
        }
        

    if (p == 0) {
    ctx.drawImage(MelonImg, melon_x, melon_y);                          // draw the melon
    } else if (p == 1) {
    ctx.drawImage(TreeImg, tree_x, tree_y);
    }



        if (ImagesTouching(bug_x, bug_y, BugImg, melon_x, melon_y, MelonImg)) {  // check for touching
        score= score + 2;                                                    // add one to score
        melon_speed = melon_speed + 0.1;  
        tree_speed = tree_speed + 0.1;                // and make it fall a bit faster
        melon_x= -MelonImg.width;                                            // hide the melon so the score doesn't rocket
        
        } else if (ImagesTouching(bug_x, bug_y, BugImg, tree_x, tree_y, TreeImg)) {  // check for touching
         tree_x= -TreeImg.width;  
         restart_game();
         
        } else if (ImagesTouching(bug2_x, bug2_y, Bug2Img, melon_x, melon_y, MelonImg)) {  // check for touching
        score= score + 2;  
        melon_speed = melon_speed + 0.1;  
        tree_speed = tree_speed + 0.1;                // and make it fall a bit faster
        melon_x= -MelonImg.width;  
        
        } else if (ImagesTouching(bug2_x, bug2_y, Bug2Img, tree_x, tree_y, TreeImg)) {  // check for touching
         tree_x= -TreeImg.width;  
         restart_game();
        }
    } 
    
  

 setInterval(Do_a_Frame, 1000/FPS);                                          // Call our frame renderer every this many milliseconds


 function MyKeyDownHandler (MyEvent) { 
   if (MyEvent.keyCode == 37 && bug_x > 0) {bug_x = bug_x - 10;}                          // left
   if (MyEvent.keyCode == 39 && bug_x+BugImg.width < myCanvas.width) {bug_x = bug_x+10;}  // right
   if (MyEvent.keyCode == 38 && bug_y > 0) {bug_y = bug_y - 10;}                    
   if (MyEvent.keyCode == 40 && bug_y+BugImg.height < myCanvas.height) {bug_y = bug_y+10;}
    
    if (MyEvent.keyCode == 65 && bug2_x > 0) {bug2_x = bug2_x - 10;}                          // left
   if (MyEvent.keyCode == 68 && bug2_x+Bug2Img.width < myCanvas.width) {bug2_x = bug2_x+10;}  // right
   if (MyEvent.keyCode == 87 && bug2_y > 0) {bug2_y = bug2_y - 10;}                    
   if (MyEvent.keyCode == 83 && bug2_y+Bug2Img.height < myCanvas.height) {bug2_y = bug2_y+10;}
   
   if (MyEvent.keyCode == 82) restart_game();                                             // S to restart 
   MyEvent.preventDefault();
   }

 addEventListener("keydown", MyKeyDownHandler);                      // listen for keystrokes  

 myCanvas.width = window.innerWidth - 20;                            // fill the entire browser width
 myCanvas.height = window.innerHeight - 20;                          // fill the entire browser height

</script>
</body>
</html>