module.exports = function suggest(body) {
  let oldAppliance = body;
  let newAppList = [];
  let json = require(process.cwd() + '/' + oldAppliance.type + '.json');
  let resp = [];
  let state;
  let energyCost;
  let oldVolume = oldAppliance.length * oldAppliance.width * oldAppliance.height;

  //Check to see if customer gave energy bill cost, if not set to

  if(!oldAppliance.energyCost){
    energyCost = 0.307;
  }
  else{
    energyCost = oldAppliance.energyCost;
  }
  // let energyCost = 0.0
  if (!oldAppliance.state){
    state = 'NSW';
  }
  else{
    state = oldAppliance.state;
  }

  for(let i = 0; i < json.length; i++){
    var appliance = json[i];
    let newVolume = appliance.length * appliance.width * appliance.height;

      if (Number(appliance.stars) > Number(oldAppliance.stars)){
        if (newVolume <= oldVolume + 0.2*oldVolume){
          if (newVolume >= oldVolume - 0.2*oldVolume){
            newAppList.push(appliance);
          }
        }
      }
    }

  newAppList.sort(function (a,b){return Number(b.stars) - Number(a.stars)});

  resp.push(200);
  newAppList = savingsInfo(oldAppliance, newAppList, energyCost, state);
  resp.push(newAppList);
  return resp;
}

function savingsInfo(oldApp, newAppList, energyCost, state){
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
    // Carbon values are in GHG (CO2 in kg)
  };

let  oldPowerCost = energyCost * oldApp.energyConsumption;
let  oldCarbon = state_EF[state] * oldApp.energyConsumption;

  for(let i = 0; i < newAppList.length; i++){
    newApp = newAppList[i];

    newPowerCost = energyCost * newApp.energyConsumption;
    priceDiff = oldPowerCost - newPowerCost;

    newCarbon = state_EF[state] * newApp.energyConsumption;
    carbonDiff = oldCarbon - newCarbon;

    newApp['oldPower'] = Math.floor(oldApp.energyConsumption);
    newApp['oldCarbonFootprint'] = Math.floor(oldCarbon);
    newApp['newPower'] = Math.floor(newApp.energyConsumption);
    newApp['newCarbonFootprint'] = Math.floor(newCarbon);
    newApp['savingsOne'] = Math.floor(priceDiff);
    newApp['savingsFive'] = Math.floor(5*priceDiff);
    newApp['savingsTen'] = Math.floor(10*priceDiff);
  //  newApp['carbonFootprintDiffernce'] = carbonDiff;

    newAppList[i] = newApp;
  }
  console.log(newAppList);
  return newAppList;
}
