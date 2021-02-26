//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg, dog1, button ,button1, fedTime, lastFed, foodObj, Food, abc, readState;
var bedroomImg, gardenImg, washroomImg, sadDog, gameState;

function preload()
{
  happyDog = loadImage("images/dogImg1.png")
  dog = loadImage("images/dogImg.png")

  bedroomImg = loadImage("images/Bed Room.png")
  gardenImg = loadImage("images/Garden.png")
  washroomImg = loadImage("images/Wash Room.png") 
  sadDog = loadImage("images/deadDog.png") 
}

function setup() {
  createCanvas(500, 500);
  dog1 = createSprite(400, 200, 50, 50)
  dog1.addImage(dog)
  dog1.scale = 0.2

  database = firebase.database()

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)  

  button = createButton('Feed the Dog!!');
  button.position(388, 125)
  button.mousePressed(feedDog)

  button1 = createButton('Add Food!!');
  button1.position(388, 150)
  button1.mousePressed(addFood)

  foodObj = new food()

  readState = database.ref('gameState')
  readState.on("value",function(data){
    gameState = data.val()
  })
}


function draw() {  
  background(46, 139, 87)

  foodObj.display();

  drawSprites();
  //add styles here
  textSize(20)
  fill("blue")
  stroke(100)
  text("Note:Press UP_ARROW Key to Feed Drago Milk!", 35, 50)
  textSize(30)
  fill("red")
  text(foodS, 220, 100)

  fedTime = database.ref('FeedTime')
  fedTime.on('value',function(data){
    lastFed = data.val()
  })

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350, 25)
  }else if(lastFed === 0){
    text("Last Feed : 12 AM", 350, 25)
  }else{
    text("Last Feed : "+ lastFed + "AM", 350, 25)
  }

  function bedroom(){
    background(bedroomImg, 550, 500)
  }
  function garden(){
    background(gardenImg, 550, 500)
  }
  function washroom(){
    background(washroomImg, 550, 500)
  }

  if(gameState!="Hungry"){
    button.hide()
    button1.hide()
    dog1.remove()
  }else{
    button.show()
    button1.show()
    dog1.addImage(sadDog)
  }

  currentTime = hour()
  if(currentTime === (lastFed + 1)){
    update("Playing")
    foodObj.garden();
  }else if(currentTime === (lastFed + 2)){
    update("Sleeping")
    foodObj.bedroom();
  }else if(currentTime > (lastFed + 2) && currentTime<=(lastFed + 4)){
    update("Bathing")
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({Food:x})
}
function feedDog(){
  dog1.addImage(happyDog);

  abc = foodObj.getFoodStock()-1
  console.log(abc)
  foodObj.updateFoodStock(abc)
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
  console.log("hello")

}
function addFood(){
  foodS++
  database.ref('/').update({
    Food : foodS
  })
}

function update(state){
  database.ref('/').update({gameState : state})
}
