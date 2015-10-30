/* global Game, FIND_HOSTILE_CREEPS, ERR_NOT_IN_RANGE, FIND_DROPPED_ENERGY */
"use strict";

module.exports = function (creep) {
  // let targets = creep.room.find(FIND_HOSTILE_CREEPS);
  var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 15);
  if (targets.length) {
    if (creep.attack(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  } else {
    // pickup energy dropped from enemies
    var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (target) {
      if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
    // bring the energy back home
    else if (creep.carry.energy) {
        if (creep.transferEnergy(Game.spawns.Spawn1) === ERR_NOT_IN_RANGE) {
          creep.moveTo(Game.spawns.Spawn1);
        }
      }
      // move to flag and wait
      else if (Game.flags.Flag1) {
          creep.moveTo(Game.flags.Flag1);
        }
  }
};