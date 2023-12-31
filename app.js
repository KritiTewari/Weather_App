const express= require("express");
 const app= express();
const https= require("https");
const bodyParser=require("body-parser");
require('dotenv').config()


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const query=req.body.cityName;
  const apiKey=process.env.API_KEY;
  const unit= "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit ;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData= JSON.parse(data);
      const temp=weatherData.main.temp;
      const descp=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The current weather is " +descp + ". </p>");
    res.write("<h1>The temprature in "+ query +" is " + temp + " Degrees Celcius</h1>");
    res.write("<img src="+ imgUrl +">");
    res.send();
    });
  });
})







 app.listen(3000, function(){
   console.log("Server is running on port 3000");

 });
-59
