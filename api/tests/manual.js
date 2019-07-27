const request = require('request');
const assert = require('assert');
request.post('http://localhost:5000/suggest', {
                json: {
                    energyCost: 0.302,
                    Appliances: [{
                      type: 'Fridge',
                      company: 'FridgeCo',
                      model: 'MAO123URA8'
                    }]
                }
            }, function(err,res,body){
              if (err){
                console.log("error alert");
                console.log(err);
              }
              else{
              console.log(res);
              }
            });
