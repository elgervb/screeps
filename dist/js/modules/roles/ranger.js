/* global Game, FIND_HOSTILE_CREEPS, ERR_NOT_IN_RANGE */
"use strict";

module.exports = function (creep) {
  // let targets = creep.room.find(FIND_HOSTILE_CREEPS);
  var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
  if (targets.length) {
    var closest = creep.pos.findClosestByRange(targets);
    if (creep.rangedAttack(closest) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closest);
    }
  } else if (Game.flags.Defenders) {
    creep.moveTo(Game.flags.Defenders);
  }
};