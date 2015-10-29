/* global Game, ERR_NOT_IN_RANGE, FIND_CONSTRUCTION_SITES, STRUCTURE_ROAD */
module.exports = (creep) => {
  
  // only build when having more than 200 energy
  if (Game.spawns.Spawn1.energy < 201 || !!Game.spawns.Spawn1.spawning) {
    return;
  }
  
  // collect energy
  if (creep.carry.energy === 0) {
    if (creep.carry.energy <= creep.carryCapacity && Game.spawns.Spawn1.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
      creep.say('gather resources');
      creep.moveTo(Game.spawns.Spawn1);
    }
    return;
  }
   
  // build construction
  let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length) {
    creep.say('building');
    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
    return;
  }
  
  // upgrade controller
  if(creep.room.controller) {
    creep.say('upgrade controller');
    if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.room.createConstructionSite(creep, STRUCTURE_ROAD); // build road to the controller
      creep.moveTo(creep.room.controller);
    }
    return;
  }
};
