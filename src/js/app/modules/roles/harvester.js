/* global Game, ERR_NOT_IN_RANGE, FIND_SOURCES */
module.exports = (creep) => {
  if (creep.carry.energy < creep.carryCapacity) {
    let sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
    }
  }
  else if (creep.transferEnergy(Game.spawns.Spawn1) === ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.spawns.Spawn1);
  }
};
