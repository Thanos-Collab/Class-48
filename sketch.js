var ground, groundImg;
var player, playerImg;
var spaceShip,
  spaceShipImg,
  spaceShip1Img,
  spaceShip3Img,
  spaceShip4Img,
  spaceShip5Img;
var spaceShipGroup;
var gameState = "play";
var edges;
var invisibleGround;
var playerEnd;
var gameOver, gameOverImg;
var reset, resetImg;
var score;
var gameOverSound;
var gameStartSound;

function preload() {
  groundImg = loadImage("ground1.jpg");
  playerImg = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png"
  );
  spaceShipImg = loadImage("SpaceShip.png");
  spaceShip1Img = loadImage("SpaceShip1.png");
  spaceShip3Img = loadImage("SpaceShip3.png");
  spaceShip4Img = loadImage("SpaceShip4.png");
  spaceShip5Img = loadImage("SpaceShip5.png");
  playerEnd = loadAnimation("sprite_0.png");
  gameOverImg = loadImage("GameOverImg.png");
  resetImg = loadImage("reset.png");
  gameOverSound = loadSound("Game_Over_Sound.mp3");
  gameStartSound = loadSound("GameStartSound.mp3");
}
function setup() {
  createCanvas(800, 615);
  ground = createSprite(400, 200, 1200, 600);
  ground.addImage("grnd1", groundImg);
  ground.scale = 1.6;

  player = createSprite(80, 430, 50, 50);
  player.addAnimation("plr", playerImg);
  player.addAnimation("ending", playerEnd);
  player.debug = false;
  player.setCollider("circle", 0, 0, 40);

  invisibleGround = createSprite(60, 480, 800, 20);
  invisibleGround.visible = false;

  gameOver = createSprite(400, 300);
  gameOver.addImage(gameOverImg);

  reset = createSprite(750, 50);
  reset.addImage(resetImg);
  reset.scale = 0.1;

  edges = createEdgeSprites();
  spaceShipGroup = new Group();
  score = 0;
}

function draw() {
  background(0);
  fill("yellow");
  if (gameState === "play") {
    score = score + Math.round(getFrameRate() / 60);
    gameOver.visible = false;
    reset.visible = false;
    ground.velocityX = -(6 + (2 * score) / 100);
    if (ground.x < 0) {
      ground.x = 400;
    }
    if (keyDown("space") && player.y >= 280) {
      gameStartSound.play();
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.5;

    player.collide(invisibleGround);
    spawnShips();

    if (spaceShipGroup.isTouching(player)) {
      gameOverSound.play();
      gameState = "end";
    }
  } else if (gameState === "end") {
    gameOver.visible = true;
    reset.visible = true;
    player.velocityX = 0;
    ground.velocityX = 0;
    player.velocityY = 0;
    player.changeAnimation("ending", playerEnd);
    spaceShipGroup.setVelocityXEach(0);
    spaceShipGroup.setLifetimeEach(-1);

    if (mousePressedOver(reset)) {
      restart();
    }
  }
  drawSprites();
  text("Score:- " + score, 10, 20);
}
function spawnShips() {
  if (frameCount % 200 === 0) {
    spaceShip = createSprite(780, 450, 50, 50);
    spaceShip.velocityX = -(6 + (2 * score) / 100);
    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1:
        spaceShip.addImage(spaceShipImg);
        break;
      case 2:
        spaceShip.addImage(spaceShip1Img);
        break;
      case 3:
        spaceShip.addImage(spaceShip3Img);
        break;
      case 4:
        spaceShip.addImage(spaceShip4Img);
        break;
      case 5:
        spaceShip.addImage(spaceShip5Img);
        break;
      default:
        break;
    }
    spaceShip.scale = 0.4;
    spaceShip.lifetime = 800;
    spaceShipGroup.add(spaceShip);
  }
}

function restart() {
  gameState = "play";
  gameOver.visible = false;
  reset.visible = false;
  spaceShipGroup.destroyEach();
  player.changeAnimation("plr", playerImg);
  score = 0;
}
