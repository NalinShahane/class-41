class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    });
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
    
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form();
      form.display();
    }

    car1 = createSprite(150 , 50);
    car2 = createSprite(200 , 50);
    car3 = createSprite(250 , 50);
    car4 = createSprite(300 , 50);
    Cars = [ car1 , car2 , car3 , car4];

    //adding Images to cars 

    car1.addImage(car1Image);
    car2.addImage(car2Image);
    car3.addImage(car3Image);
    car4.addImage(car4Image);
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", displayWidth/2-50 , displayHeight/2-70 );

    Player.getPlayerInfo();
    player.getRank();
    
    //Storing data 
    if(allPlayers !== undefined){
      background("black");
      //Starting four times Above zero
      image( trackImage , 0 , -displayHeight * 4 , displayWidth , displayHeight * 5 );
      var display_position = 130;

      //index of Cars array.
      var index = 0;

      //X , Y position of cars
      var x = 200 , y;
      for(var plr in allPlayers){

        //add 1 to index for every Loop
        index = index + 1;

        //Positions Cars a little away from each other in X positon
        x += 200;

        //Use the Data from dataBase (FireBase) to display the cars in Y direction
        y = displayHeight - allPlayers[plr].distance;

        //Storing Values Of X , Y in Cars Array
        Cars[index-1].x = x;
        Cars[index-1].y = y;

        //Checking the Current players Index
        if(index === player.index){
         // Cars[index-1].shapeColor= "red";
          strokeWeight(4);
          fill("red");
          ellipse(x , y , 75 , 75);
          //Camera's postion
          camera.position.x = displayWidth/2 ;
          camera.position.y = Cars[index - 1].y ;
          
        } 

        //Current Player will apper In Given colour ( String Concatination ) 
        if (plr === "player" + player.index )
          fill("red");
        else
          fill("black");
        display_position += 20;
        textSize(15);        
        // arrayName[index](plr in ALLPLAYERS).PlayersName : (distance) , Next players 
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120 , display_position);
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance > 3800) {
      player.rank += 1;
      player.updateRank(player.rank);
      text(allPlayers[plr].name + " = " + allPlayers[plr].rank , 400 , display_position);
      gameState = 2;
      console.log(player.rank);
    }
  }
  end() {
    player.rank = 0 ;
    console.log("GameOver");
  }

}

