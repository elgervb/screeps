/* global  */
'use strict';

let builder = require('builder');

module.exports = function (creep) {
  
  // build road to source
  // let sources = creep.room.find(FIND_SOURCES_ACTIVE);
  // creep.moveTo(sources[0]);
  // creep.room.createConstructionSite(creep, STRUCTURE_ROAD);
  
  builder(creep);
  
  // Game.creeps.TEST.moveTo(Game.spawns.Spawn1)
};
