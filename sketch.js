var trex,gamestate="play";
var obsGroup;
var cloudGroup;
var score=0;
var touches=[];
function preload(){
trex1=loadAnimation("trex1.png","trex3.png","trex4.png");
ground1=loadImage("ground2.png");
cloud1=loadImage("cloud.png");
obstacle=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
restartbutton=loadImage("restart.png");
trexCollider=loadImage("trex_collided.png");
GameOver= loadImage("gameOver.png");
Checkpoint=loadSound("checkPoint.mp3");
Die=loadSound("die.mp3");
Jump=loadSound("jump.mp3");
}
function setup() {
createCanvas(windowWidth,windowHeight); 
trex=createSprite (100,height/2,40,70);
trex.addAnimation("t",trex1);
trex.addAnimation("c",trexCollider);
trex.scale= 0.5;
//trex.debug=true;
ground2= createSprite(width/2,height-40,width,10);
//trex.setCollider("circle",0,20,30);
trex.setCollider("rectangle",0,0,30,70,30);
//ground2.shapeColor = 220;
ground2.visible=false;
ground=createSprite(width/2,height-44,400,20);
ground.addImage(ground1);
ground.velocityX = -6;
obsGroup=new Group();
cloudGroup=new Group();
restart= createSprite(width/2,height/2);
restart.addImage(restartbutton);
restart.scale = 0.5;
Overgame= createSprite(width/2+20,height/2+30);
Overgame.addImage(GameOver);
Overgame.scale = 0.5;
}

function draw() {
background("white");
if(gamestate=="play"){
trex.changeAnimation("t",trex1);
if(ground.x<0){
ground.x=200;
}
if(score%200==0){
ground.velocityX=ground.velocityX-1;
obsGroup.setVelocityXEach(ground.velocityX);
//console.log(ground.velocityX);
Checkpoint.play();
}
restart.visible=false;
Overgame.visible=false;
//console.log(touches)
if((keyDown(UP_ARROW))&& trex.y>height-100){
trex.velocityY = -10;
Jump.play();
console.log(touches)
touches=[];
}
score= score+1;
trex.velocityY = trex.velocityY + 0.4;
trex.collide(ground2);
if(frameCount%40==0){//frameCount divisible by 10
var R = Math.round(random(height/8,height/2));
cloud=createSprite(width+20,R);
cloud.addImage(cloud1);
cloud.velocityX = -3;
cloud.depth = 0.5;
//console.log("clouds",cloud.depth);
cloudGroup.add(cloud);
cloud.lifetime = 190;
}
if(frameCount%80==0){//frameCount divisible by 10 
var A = Math.round(random(1,6));
var obstacle1 = createSprite(width,height-60);
obsGroup.add(obstacle1);
//obstacle1.addImage(obstacle);
obstacle1.velocityX = -6;
obstacle1.scale = 0.5;
obstacle1.lifetime = 100;
switch(A){
case 1:obstacle1.addImage(obstacle);break;
case 2 :obstacle1.addImage(obstacle2);break;
case 3:obstacle1.addImage(obstacle3);break;
case 4:obstacle1.addImage(obstacle4);break;
case 5:obstacle1.addImage(obstacle5);break;
case 6:obstacle1.addImage(obstacle6);break;
default:break;
}//end of switch

}//end of if obstacle

if(trex.isTouching(obsGroup)){
Die.play();
gamestate="end";
}
}//end of gamestate play

//%(modulus):finds out the remainder
//30%4==2,10%5==0
//random(min,max):produces any number between min and max 

if(gamestate=="end"){
trex.changeAnimation("c",trexCollider);
ground.velocityX = 0;
obsGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
trex.velocityY = 0;
obsGroup.setLifetimeEach(-1);
cloudGroup.setLifetimeEach(-1);
restart.visible=true;
Overgame.visible= true;

}//end ofgamestate end 
if(mousePressedOver(restart)){
gamestate="play";
obsGroup.destroyEach();
cloudGroup.destroyEach();
score= 0;
}

//console.log(trex.y);
//console.log(frameCount);
//console.log(random(1,5));
//console.log(Math.round(2.58455357990));
//console.log(Math.round(random(1,5)));
//console.log(trex.depth);

drawSprites();
textSize(20);
text("score- "+score,120,120);//concatenation
}