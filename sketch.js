var dog;
var foodS;
var database;
var foodstock;
var happydogImg;
var dogImg;

var food;
var addfood,feedfood;
var fedTime,lastFed;

function preload()
{
	happydogImg=loadImage("images/dogImg1.png")
  dogImg=loadImage("images/dogImg.png")
}

function setup() 
{
	createCanvas(1000, 400);

  dog = createSprite(900,250)
  dog.addImage(dogImg)
  dog.scale=0.2

  database=firebase.database()

  foodstock=database.ref('Food')
  foodstock.on("value",readStock)


  food = new Food()

  
  feedfood = createButton("Feed Food")
  feedfood.position(600,70)
  feedfood.mousePressed(feedDog)

  addfood = createButton("Add Food")
  addfood.position(500,70)
  addfood.mousePressed(addFood)
  
}


function draw() 
{  
  background("lightblue")

  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data)
  {
  lastFed = data.val();
  })

  fill("black")
  textSize(15)
  if(lastFed>=12){
  text("LAST FEED :" +lastFed%12 + "PM",350,35)}
  else if(lastFed===0)
  {
   text("LAST FEED: 12AM",350,35)
  }
  else
  {
  text("LAST FEED:" +lastFed +"AM",350,35)
  }

 
  drawSprites();
  food.display()


}

function readStock(data)
{
  foodS = data.val();
  food.updateFood(foodS)
}

function writeStock(x)
{
  if(x<=0){
   x=0
  }else{
   x=x-1}
  database.ref('/').update({
    Food:x
  })
}

function addFood()
{
 foodS++
 dog.addImage(dogImg)
 database.ref('/').update({
 Food: foodS
 })
}

function feedDog()
{
  foodS--
 dog.addImage(happydogImg)

 database.ref('/').update({
  Food: foodS
 })
}

