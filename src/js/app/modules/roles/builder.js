/* global Game, ERR_NOT_IN_RANGE, FIND_CONSTRUCTION_SITES */
module.exports = (creep) => {
  
  let targets;
  
  /**
   * Upgrade controller when it's level is below 1 or when there are no construction sites
   * 
   * @return {boolean} whether or not to upgrade the controller
   */
  let upgradeController = () => {
    if (creep.room.controller && creep.room.controller.level < 2) {
      return true;
    }
    
    targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    return !targets || targets.length === 0;
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
    return;
  }
  
  // upgrade controller
  if (upgradeController()) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      // creep.room.createConstructionSite(creep, STRUCTURE_ROAD); // build road to the controller
      creep.moveTo(creep.room.controller);
    }
  }
  // build construction sites
  else if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
    creep.moveTo(targets[0]);
  }
  
};
