const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req,res){
   //fectch data from external server
    const query = req.body.cityName;
    const apiKey = "ec92fa117660d8ccf2fadef695bba1f6";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=metric";

    //get data in the form of JSON
    https.get(url,function(response){
        console.log(response.statusCode);

        // hold data from response using .on
        response.on("data",function(data){
            const weatherData = JSON.parse(data); //parse/convert into JS object by using JSON.
            const temp = weatherData.main.temp;
            const descrip = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(temp);
            console.log(descrip);

            res.write("<p>The weather is currently " + descrip + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Server is running on port 3000.")
});
