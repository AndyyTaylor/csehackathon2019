module.exports = function find(body){
  var input = body;
  var oldAppliance = input.appliance[0];
  let resp = [];

  let json = require('./appliance_data/' + oldAppliance.type + '.json');

  for(let i = 0; i < json.length; i++){
    var appliance = json[i];

    if (oldAppliance.model == appliance.model && oldAppliance.company == appliance.company){
      oldAppliance = appliance;
      break;
    }
  }

  if(!oldAppliance.energyConsumption){
    resp.push(404);
  }

  else{
    resp.push(200);
    resp.push(oldAppliance);
  }

  console.log(resp[0]);
  return resp;
}
