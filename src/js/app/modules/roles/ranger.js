/* global Game, FIND_HOSTILE_CREEPS, ERR_NOT_IN_RANGE */
module.exports = (creep) => {
  // let targets = creep.room.find(FIND_HOSTILE_CREEPS);
  let targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
  if (targets.length) {
    let closest = creep.pos.findClosestByRange(targets);
    if (creep.rangedAttack(closest) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closest);
    }
  } else {
    if (Game.flags.Flag1){
      creep.moveTo(Game.flags.Flag1);
    }
  }
};
