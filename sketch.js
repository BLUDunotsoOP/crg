var canvas, backgroundImage;
var carsAtEnd ;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var count ;
var form, player, game;

var cars, car1, car2, car3, car4;
var car1i,car2i,car3i,car4i,trcki

function preload(){
    car1i =loadImage("../images/car1.png");//absolute 
    car2i = loadImage("../images/car2.png");
    car3i = loadImage("../images/car3.png");
    car4i = loadImage("../images/car4.png");
    trcki = loadImage("../images/track.jpg");
    
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  carsAtEnd = 0;
}


function draw(){
  
  console.log("this is unmain room and will remain room forever");
  var count_cars = database.ref('carsAtEnd');
  count_cars.on("value",(data)=>{
    count = data.val();
    })
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2 && count === 4){
     clear();
     game.displayOp();
  }
  if(gameState === 2){
    game.end();
  }
}
