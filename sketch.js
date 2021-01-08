var PLAY = 0;
var END = 1;
var gameState = 0;

var sword, sword_image, gameOverImage,gameOver_sound;
var fruit1_image, fruit2_image, fruit3_image, fruit4_image,Knife_sound;

var fruits, alien, alien_image, r;

var fruitGroup, enemyGroup;


function preload() {
  sword_image = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png")

  alien_image = loadImage("alien1.png", "alien2.png");

  fruit1_image = loadImage("fruit1.png");
  fruit2_image = loadImage("fruit2.png");
  fruit3_image = loadImage("fruit3.png");
  fruit4_image = loadImage("fruit4.png");
  
  Knife_Sound = loadSound("knifeSwooshSound.mp3");
  gameOver_sound=loadSound("gameover.mp3")

}

function setup() {
  createCanvas(400, 400);

  score = 0;

  sword = createSprite(40, 200, 20, 20);
  sword.addImage(sword_image);
  sword.scale = 0.7;

  console.log("GameState", gameState);

  fruitGroup = new Group();
  enemyGroup = new Group();

}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {

    fruits();
    monster();

    sword.y = World.mouseY;
    sword.x = World.mouseX;

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      Knife_Sound.play();
      score = score + 2;
    } 
  
      if (enemyGroup.isTouching(sword)){
     gameOver_sound.play();
     Knife_Sound.play();
      gameState = END;
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityEach(0);
      enemyGroup.setVelocityEach(0);
      sword.addImage(gameOverImage);
      sword.x = 200;
      sword.y = 200;
    }
  }


  text("Score: " + score, 180, 20);
  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    r = Math.round(random(1, 4));
    if (r === 1) {
      fruit.addImage(fruit1_image)
    } else if (r === 2) {
      fruit.addImage(fruit2_image)
    } else if (r === 3) {
      fruit.addImage(fruit3_image)
    } else if (r === 4) {
      fruit.addImage(fruit4_image)
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -(7+(score/4));
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}

function monster() {
  if (World.frameCount % 200 === 0) {
    alien = createSprite(400, 200, 20, 20);
    alien.addAnimation("moving", alien_image);
    alien.y = Math.round(random(100, 300));
    
    alien.velocityX = -(8+(score/10));
    alien.setLifetime = 50;

    enemyGroup.add(alien);

  }
}