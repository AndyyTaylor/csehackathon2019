module.exports = function suggest(body) {
  var input = body;
  var oldAppliance = input.appliance[0];
  let newAppList = [];
  let resp = [];

  //Check to see if customer gave energy bill cost, if not set to default
  if(!input.energyCost){
    let energyCost = 0.307;
  }
  else{
    let energyCost = input.energyCost;
  }

  let json = require('./appliance_data/' + oldAppliance.type + '.json');

  for(let i = 0; i < json.length; i++){
    var appliance = json[i];

    if (oldAppliance.model == appliance.model && oldAppliance.company == appliance.company){
      oldAppliance = appliance;
      break;
    }
  }

  if(!oldAppliance.energyConsumption){
    resp.push(204);
    console.log(resp[0]);
    return resp;
  }
  else{
    for(let i = 0; i < json.length; i++){
      var appliance = json[i];

      if(appliance.energyConsumption < oldAppliance.energyConsumption){
        newAppList.push(appliance);
      }
    }
  }

  newAppList.sort(function (a,b){return a.energyConsumption - b.energyConsumption});

  resp.push(200);
  resp.push(newAppList);
  console.log(resp[0]);
  return resp;
}

function powerSave(oldApp, topApp){


}

function greenHouse(energyCost, topApp, state){
  var state_EF = {
    "VIC" : 1.17,
    "WA" : 0.78,
    "QLD" : 0.82,
    "ACT" : 0.87,
    "SA" : 0.62,
    "NSW" : 0.87,
    "TAS" : 0.20,
    "NT" : 0.69
    //data taken from: https://coolaustralia.org/wp-content/uploads/2013/12/Calculating-GHG-emissions.pdf
  };

}
