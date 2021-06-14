class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

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
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1i);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2i);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3i);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4i);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
  


    if(allPlayers !== undefined){
      background("#c68767");
      image(trcki,0,-displayHeight*4,displayWidth,displayHeight*5)
      var index = 0;
      var x = 175;
      var y;
     for(var plr in allPlayers){
        index = index + 1 ;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 30){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateCarsAtEnd(player.rank);
      updateCarsAtEnd = player.rank;
      player.update();
    }
    drawSprites();
  }  
    end(){
      console.log("gameEnded");
      console.log(player.rank);
    }
    displayOp(){
      camera.position.y = 0 ;
      camera.position.x = 0 ;
      textSize(40);
      stroke("black");
      strokeWeight(3);
      fill("yellow");
      Player.getPlayerInfo();
      for(var plr in allPlayers){
        if(allPlayers[plr].rank === 1 ){
          text("first: "+allPlayers[plr].name,250,250);
        }
        else if(allPlayers[plr].rank === 2){
          text("second: "+allPlayers[plr].name,250,300);
        }
        else if(allPlayers[plr].rank === 3){
          text("thirrd: "+allPlayers[plr].name,250,350);
        }
        else if(allPlayers[plr].rank === 4){
          text("YOU LOSE!!!!! YOU ARE LOSER GO PLAY WITH SUBWAY SURFERS !!!!#Sponsored by kiloo: "+allPlayers[plr].name,250,400);
        }
        
      }
    }
}
