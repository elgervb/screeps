/* global Game, FIND_HOSTILE_CREEPS, ERR_NOT_IN_RANGE */
"use strict";

module.exports = function (creep) {
  // let targets = creep.room.find(FIND_HOSTILE_CREEPS);
  var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 15);
  if (targets.length) {
    if (creep.attack(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  } else {
    if (Game.flags.Flag1) {
      creep.moveTo(Game.flags.Flag1);
    }
  }
};