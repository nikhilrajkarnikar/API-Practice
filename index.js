const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var options = {
        url : "https://apiv2.bitcoinaverage.com/convert/global",
        method : "Get",
        qs : {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }

    request(options, function(error, response, body){
        // console.log(response.statusCode);


        var data = JSON.parse(body);
        var price = data.price;

        console.log(price);

        var currentDate = data.time;

        res.write("<p> The current date is :" + currentDate + "</p>");
        res.write("<h1>" + amount + " " + crypto + " is currently worth " + price + " " + fiat + " </h1>");

        res.send();
        // console.log("The price is " + price);
    });
});

app.listen(3000, function(){
    // console.log("This is the port 3000");
}); 