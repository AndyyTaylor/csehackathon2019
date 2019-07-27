const request = require('request');
const assert = require('assert');
request.post('http://localhost:5000/find', {
                json: {
                    energyCost: 0.302,
                    appliance: [{
                      type: 'fridge',
                      company: 'bosch',
                      model: 'kin34p60au'
                    }]
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
