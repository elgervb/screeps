/* global Game, ERR_NOT_IN_RANGE, FIND_SOURCES_ACTIVE */
'use strict';

module.exports = function (creep) {

  var activeSource = undefined;

  var start = new Date().getTime();
  var isFull = function isFull() {
    return creep.carry.energy === creep.carryCapacity;
  };
  var logPerf = function logPerf(task) {
    var time = new Date().getTime() - start;
    if (time > 5) {
      console.log(time + 'ms - ' + Game.time + ' - Harvester ' + task);
    }
  };

  // setup creep memory
  if (!creep.memory.activeSourceID) {
    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (source) {
      creep.memory.activeSourceID = source.id;
      activeSource = source;
    }
  } else {
    activeSource = Game.getObjectById(creep.memory.activeSourceID);
  }

  // check if energy should be transferred back home
  if (isFull() || creep.carry.energy && creep.pos.isNearTo(Game.spawns.Spawn1)) {
    // bring energy back home
    if (creep.transferEnergy(Game.spawns.Spawn1) === ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.spawns.Spawn1);
    }
    logPerf('transferEnergy');
    return;
  }

  // harvest resources
  if (activeSource && !isFull()) {
    if (creep.harvest(activeSource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(activeSource);
    }
    logPerf('harvest');
    return;
  }

  logPerf('idle');
};