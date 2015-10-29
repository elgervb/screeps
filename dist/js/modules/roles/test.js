/* global FIND_SOURCES_ACTIVE, STRUCTURE_ROAD */
'use strict';

// let builder = require('builder');

module.exports = function (creep) {

  // build road to source
  var sources = creep.room.find(FIND_SOURCES_ACTIVE);
  creep.moveTo(sources[0]);
  creep.room.createConstructionSite(creep, STRUCTURE_ROAD);
};