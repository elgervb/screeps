/* global Game, FIND_HOSTILE_CREEPS, ERR_NOT_IN_RANGE */
"use strict";

module.exports = function (creep) {
  var targets = creep.room.find(FIND_HOSTILE_CREEPS);
  if (targets.length) {
    if (creep.attack(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  } else {
    if (Game.flags.Flag1) {
      creep.moveTo(creep.room.find(Game.flags.Flag1));
    }
  }
};