/* global Game, FIND_HOSTILE_CREEPS, ERR_NOT_IN_RANGE, FIND_DROPPED_ENERGY */
module.exports = (creep) => {
  let isFull = (me) => {
    return me.carry.energy && me.carry.energy === me.carry.carryCapacity;
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
  if (!isFull(creep)) {
    let target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (target) {
      if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return;
    }
  }
  
  // bring the energy back home
  if (creep.carry.energy) {
    if (creep.transferEnergy(Game.spawns.Spawn1) === ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.spawns.Spawn1);
    }
  }
  
  // creep needs healing -> stay here
  if(creep.hits < creep.hitsMax) {
    return;
  }
  
  // move to flag and wait
  if (Game.flags.Flag1) {
    creep.moveTo(Game.flags.Flag1);
  }
};
