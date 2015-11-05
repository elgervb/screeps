/* global Game, FIND_MY_CREEPS, ERR_NOT_IN_RANGE */
"use strict";

module.exports = function (creep) {

  function needsHealing(other) {
    return other.hits < other.hitsMax;
  }

  var creeps = creep.room.find(FIND_MY_CREEPS);
  for (var _name in creeps) {
    if (needsHealing(creeps[_name])) {
      if (creep.heal(creeps[_name]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creeps[_name]);
      }
      return;
    }
  }

  // when nobody needs healing, move to Flag Healers
  if (Game.flags.Healers) {
    creep.moveTo(Game.flags.Healers);
  }
};