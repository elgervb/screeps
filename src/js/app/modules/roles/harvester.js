/* global Game, ERR_NOT_IN_RANGE, FIND_SOURCES_ACTIVE */
module.exports = (creep) => {
  
  let activeSource;
  
  
  let isFull = () => {
    return creep.carry.energy === creep.carryCapacity;
  };
  
  
  // setup creep memory 
  if (!creep.memory.activeSourceID) {
    let source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (source) {
      creep.memory.activeSourceID = source.id;
      activeSource = source;
    }
  } else {
    activeSource = Game.getObjectById(creep.memory.activeSourceID);
  }
   
  // check if energy should be transferred back home 
  if (isFull() || (creep.carry.energy && creep.pos.isNearTo(Game.spawns.Spawn1))) {
    // bring energy back home
    if (creep.transferEnergy(Game.spawns.Spawn1) === ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.spawns.Spawn1);
    }
    return;
  }
  
  // harvest resources
  if (activeSource && !isFull()) {
    if (creep.harvest(activeSource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(activeSource);
    }
    return;
  }  
};
