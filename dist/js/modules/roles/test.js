/* global FIND_SOURCES_ACTIVE, STRUCTURE_ROAD */
'use strict';

// let builder = require('builder');

module.exports = function (creep) {

  // build road to source
  var sources = creep.room.find(FIND_SOURCES_ACTIVE);
  creep.moveTo(sources[0]);

  creep.room.createConstructionSite(creep, STRUCTURE_ROAD);

  // build
  //  require('builder')(creep);

  // harvest
  //  require('harvester')(creep);

  // move to Spawn1
  // creep.moveTo(Game.spawns.Spawn1);

  // move to controller
  // creep.moveTo(creep.room.controller);
};