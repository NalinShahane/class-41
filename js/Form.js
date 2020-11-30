class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.reset = createButton("Reset");   
    this.rank = createElement('h2');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
  }

  display(){
    var title = createElement('h2')
    title.html("Car Racing Game");
    title.position(displayWidth/2-50 , 0);

    this.input.position(displayWidth/2-40,displayHeight/2-80);
    this.button.position(displayWidth/2+30 ,displayHeight/2);
    this.reset.position(displayWidth-75,30);
    this.rank.position(displayWidth/2);

    this.button.mousePressed(()=>{   
      //hiding the elements 
      this.input.hide();
      this.button.hide();
      //taking the Input From User
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2-70, displayHeight/4);
    });
    
    //Checking the mousepressed and reseting the FireBase
    this.reset.mousePressed(()=>{
      player.updateRank(0);
      player.updateCount(0);
      game.update(0);
    });

  }
}
