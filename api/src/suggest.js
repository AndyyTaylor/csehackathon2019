module.exports = function suggest(body) {
  let oldAppliance = body;
  let newAppList = [];
  let json = require(process.cwd() + '/' + oldAppliance.type + '.json');
  let resp = [];
  let state;
  let energyCost;
  let margin = 0.1;
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
  console.log(newAppList);
  newAppList = compileList(newAppList, oldAppliance, margin, json);
  console.log(newAppList);
  newAppList.sort(function (a,b){if(a.stars != b.stars){
    return Number(b.stars) - Number(a.stars)
  }
  else{

    return a.energyConsumption - b.energyConsumption;

  }});

  resp.push(200);
  newAppList = savingsInfo(oldAppliance, newAppList, energyCost, state);
  resp.push(newAppList);
  return resp;
}




function compileList(newAppList, oldAppliance, margin, json){
  let oldVolume = oldAppliance.length * oldAppliance.width * oldAppliance.height;

  newAppList = compileList(newAppList, oldAppliance, 0.1, json)
  newAppList.sort(function (a,b){return Number(b.stars) - Number(a.stars)});

  resp.push(200);
  //newAppList = savingsInfo(oldAppliance, newAppList, energyCost, state);
  resp.push(newAppList);
  return resp;
}


function compileList(newAppList, oldAppliance, margin, json){
  let oldVolume = oldAppliance.length * oldAppliance.width * oldAppliance.height;

  for(let i = 0; i < json.length; i++){
    var appliance = json[i];
    let newVolume = appliance.length * appliance.width * appliance.height;
    let dupFlag = 0;
      if (newAppList.length > 9){
        break;
      }
        if (Number(appliance.stars) > Number(oldAppliance.stars)){
          if (newVolume <= oldVolume + margin*oldVolume){
            if (newVolume >= oldVolume - margin*oldVolume){
              if (appliance.model != oldAppliance.model && appliance.company != oldAppliance.company){
                for (let i = 0; i < newAppList.length; i++){
                  if (newAppList[i].model == appliance.model && newAppList[i].company == appliance.company){
                    dupFlag++;
                    break;
                }
              }
              if (dupFlag == 0){
              newAppList.push(appliance);
            }
          }
        }
      }
    }
  }


  if (newAppList.length < 5 && margin < 0.5){
     margin = margin + 0.1
     return compileList(newAppList, oldAppliance, margin, json);
   }
   else{
     return newAppList;
   }
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
let tree = 6.28;

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
    newApp['trees'] = "By purchasing this appliance you have offset as much carbon as" + Math.floor((oldCarbon -  newCarbon)/tree) + 'trees.'

    newAppList[i] = newApp;
  }

  return newAppList;
}
