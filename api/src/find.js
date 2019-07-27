const process = require('process');
module.exports = function find(body){
  var oldAppliance = body;
  let resp = [];

  let json = require(process.cwd() + '/' + oldAppliance.type + '.json');

  // standardise inputs
  oldAppliance.model = oldAppliance.model.toLowerCase();
  oldAppliance.company = oldAppliance.company.toLowerCase();

  for(let i = 0; i < json.length; i++){
    var appliance = json[i];

    if (oldAppliance.model == appliance.model && oldAppliance.company == appliance.company){
      oldAppliance = appliance;
      break;
    }
  }

  if(!oldAppliance.stars){
    resp.push(404);
  }
  else{
    resp.push(200);
    resp.push(oldAppliance);
  }

  return resp;
}
