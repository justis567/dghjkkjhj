// assaining variables for game State
var PLAY = 1;
var END = 0;
var gameState = PLAY;
// assining variable for gameover and restart State

// assining variable for trex and ground
var trex, trex_running, trex_collided;
var ground, invisibleGround,backgroundImg,background,log,logImg;
// assining variable for cloud 

// assining varibale for obstacles
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

// function preload
function preload(){
// loadImages for trex
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png","trex4.png","trex5.png","trex6.png","trex7.png","trex8.png","trex9.png","trex10.png",);
  backgroundImg=loadImage("background.png")
  
  // loadImage for obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
 
}
// function setup
function setup() {
  createCanvas(1200, 600);
  
  // trex Sprite 
  trex = createSprite(100,180,20,50);
  
  // trex addAnimation
  trex.addAnimation("running", trex_running);
  
  trex.scale = 0.3;



 
  
  // invisable ground Sprite
  invisibleGround = createSprite(500,500,9000000000000000000000000000,10);
  invisibleGround.visible = false;
  
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();

  

  
  score = 0
}
// function draw
function draw() {
  // add background color
  background(backgroundImg);


  

  if (background.x < 0){
    background.x = background.width/2;
    
  }

  //displaying score
  text("Score: "+ score, 500,50);

  if(keyDown("left_arrow")) {
    trex.x=trex.x-4
  }
  if(keyDown("right_arrow")) {
    trex.x=trex.x+4
  } 


  
  
  console.log("this is ",gameState)
  
  // game State for PLAY 
  if(gameState === PLAY){
    //move the ground
    
    //scoring
    score = score + Math.round(frameCount/60);
    
   
   
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >=100) {
        trex.velocityY = -13;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    
    //spawn obstacles on the ground
    spawnObstacles();
    
    // Game end if trex is Touching obstacles
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
       
    }
  }
  // game State for END
   else if (gameState === END) {
     // ground and trex velocity
    //  ground.velocityX = 0;
     trex.velocityY = 0;
     trex.velocityX=0
     
     
     // Lifetime of clouds and obstacles
     obstaclesGroup.setLifetimeEach(-1)
     
     // set volocity
     obstaclesGroup.setVelocityXEach(0);
     
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
 

  
  
  
  
  // drawSprites
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(1000,Math.round(random(20, 370)), 10, 10);
   obstacle.velocityX = -9;
   
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

