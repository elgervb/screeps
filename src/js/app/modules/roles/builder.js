/* global Game, ERR_NOT_IN_RANGE, FIND_CONSTRUCTION_SITES */
module.exports = (creep) => {
  
  let targets;
  targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  
  /**
   * Upgrade controller when it's level is below 1 or when there are no construction sites
   * 
   * @return {boolean} whether or not to upgrade the controller
   */
  let upgradeController = () => {
    return creep.room.controller && creep.room.controller.level < 2;
  };
  
  // only build when having more than ... energy
  if (Game.spawns.Spawn1.energy <= 250 || !!Game.spawns.Spawn1.spawning) {
    if (creep.carry.energy === 0) { // let creep finish his energy first
      return;
    }
  }
  
  // collect energy
  if (creep.carry.energy === 0) {
    if (creep.carry.energy <= creep.carryCapacity && Game.spawns.Spawn1.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.spawns.Spawn1);
    }
    creep.say('collect');
  }     
  // upgrade controller
  else if (upgradeController()) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
    creep.say('upgrade');
  }
  // build construction sites
  else if (targets && targets.length > 0) {
    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
      return;
    }
    creep.say('build');
  }
  // create construction sites
  else {
    // creep.room.createConstructionSite(creep, STRUCTURE_ROAD); // build road to the controller
    // creep.moveTo(Game.getObjectById(Memory.activeSourceID));
    // creep.say('create road');
  }
  
};
