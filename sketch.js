var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,bananaGroup
var score = 0
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(650,575)
  ground = createSprite(400,350,900,10)
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running)
  ground.x = ground.width/2;
  monkey.scale = 0.1
  bananaGroup = new Group()
  obstacleGroup = new Group()
}


function draw() {
  background(250)
 if (ground.x < 0){
      ground.x = ground.width/2;
 }
  textSize(20)
  text("Score: "+ score, 500,50)
  fill("black")
  textSize(20)
  text("Survival Time: "+survivalTime,200,50)
  survivalTime=Math.ceil(frameCount/getFrameRate())
  monkey.collide(ground)
  if (keyDown("space") && monkey.y>100) {
    monkey.velocityY = -12
  }
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach()
    score++
  }
  if (monkey.isTouching(obstacleGroup)) {
    monkey.velocityY = 0
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
      
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground)
  obstacleGroup.setLifetimeEach(-1)
  bananaGroup.setLifetimeEach(-1)
  food()
  obstacleFn()
  drawSprites()
}
function food(){
  if (frameCount%80 === 0) {
    banana = createSprite(700,220,10,10)
    banana.y = random(20,150)
    banana.addImage(bananaImage)
    bananaGroup.lifetime = 200;
    banana.scale = 0.1
    bananaGroup.add(banana)
    banana.velocityX = -3
  }
}
function obstacleFn(){
  if (frameCount%300 == 0) {
    obstacle = createSprite(600,315,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.1
    obstacleGroup.add(obstacle)
 obstacle.velocityX = -3
obstacleGroup.setLifetimeEach(-1)
  }
}




