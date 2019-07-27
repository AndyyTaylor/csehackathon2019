const request = require('request');
const assert = require('assert');
request.post('http://localhost:5000/find', {
                json: {
                      "productUrl":"https://www.appliancesonline.com.au/product/artusi-aret330b-retro-style-fridge-freezer",
                      "title":"Artusi 330L Retro Style Top Mount Fridge ARET330B",
                      "price":"1,062",
                      "image":"https://www.appliancesonline.com.au/public/images/attributeicons/Finish Colour/Black.png",
                      "company":"artusi",
                      "model":"aret330b",
                      "height":"1524",
                      "width":"600",
                      "length":"693",
                      "volume":"330",
                      "stars":"2",
                      "type": "fridge"
                    }

            }, function(err,res,body){
              if (err){
                console.log("error alert");
                console.log(err);
              }
              else{
              console.log(res.statusCode);
              }
            });
