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
  resp.push(powerSave(oldAppliance, newAppList[0], energyCost));
  resp.push(greenHouse(oldAppliance, newAppList[0], 'NSW'))
  console.log(resp[0]);
  return resp;
}

function powerSave(oldApp, topApp, energyCost){
  powerInfo = []

  oldPowerCost = energyCost * oldApp.energyConsumption;
  powerInfo.push(oldPowerCost);

  newPowerCost = energyCost * newApp.energyConsumption;
  powerInfo.push(newPowerCost);

  priceDiff = oldPowerCost - newPowerCost;
  powerInfo.push(priceDiff);

  return powerInfo;
}

function greenHouse(oldApp, topApp, state){
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

  carbonInfo = []
  // Carbon values are in GHG (CO2 in kg)
  oldCarbon = state_EF.state * oldApp.energyConsumption;
  carbonInfo.push(oldCarbon);

  newCarbon = state_EF.state * newApp.energyConsumption;
  carbonInfo.push(newCarbon);

  carbonDiff = oldCarbon - newCarbon;
  carbonInfo.push(carbonDiff);

  return carbonInfo;
}
