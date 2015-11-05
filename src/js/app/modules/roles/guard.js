/* global Game, FIND_HOSTILE_CREEPS, ERR_NOT_IN_RANGE, FIND_DROPPED_ENERGY */
module.exports = (creep) => {
  let isFull = () => {
    return creep.carry.energy && creep.carry.energy === creep.carryCapacity;
  };
  
  
  let targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
  // attack !!
  if (targets.length) {
    let closest = creep.pos.findClosestByRange(targets);
    if (creep.attack(closest) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closest);
    }
    return;
  }
  
  // pickup energy dropped from enemies
  if (!isFull()) {
    let energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (energy) {
      if (creep.pickup(energy) === ERR_NOT_IN_RANGE) {
        creep.moveTo(energy);
      }
      return;
    }
  }
  
  // bring the energy back home
  if (creep.carry.energy > 0) {
    if (creep.transferEnergy(Game.spawns.Spawn1) === ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.spawns.Spawn1);
    }
    return;
  }
  
  // creep needs healing -> stay here
  if (creep.hits < creep.hitsMax) {
    return;
  }
  
  // move to flag and wait
  if (Game.flags.Defenders) {
    creep.moveTo(Game.flags.Defenders);
  }
};
