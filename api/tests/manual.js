const request = require('request');
const assert = require('assert');
request.post('http://localhost:5000/suggest', {
                json: {
                    energyCost: 0.302,
                    appliance: [{
                      type: 'fridge',
                      company: 'FridgeCo88',
                      model: 'AOAO23109AOE24'
                    }]
                }
            }, function(err,res,body){
              if (err){
                console.log("error alert");
                console.log(err);
              }
              else{
              console.log("POST SENT");
              }
            });
