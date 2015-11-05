/* global Game, FIND_MY_CREEPS, ERR_NOT_IN_RANGE */
module.exports = (creep) => {

  function needsHealing(other) {
    return other.hits < other.hitsMax;
  }

  let creeps = creep.room.find(FIND_MY_CREEPS);
  for (let name in creeps) {
    if (needsHealing(creeps[name])) {
      if (creep.heal(creeps[name]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creeps[name]);
      }
      return;
    }
  }
  
  // when nobody needs healing, move to Flag Healers
  if (Game.flags.Healers) {
    creep.moveTo(Game.flags.Healers);
  }
};
