/* global Game, FIND_HOSTILE_CREEPS, ERR_NOT_IN_RANGE */
module.exports = (creep) => {
  // let targets = creep.room.find(FIND_HOSTILE_CREEPS);
  let targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 15);
  if (targets.length) {
    if (creep.rangedAttack(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  } else {
    if (Game.flags.Flag1){
      creep.moveTo(Game.flags.Flag1);
    }
  }
};
