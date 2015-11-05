/* global Game, COLOR_RED, COLOR_GREEN */
'use strict';

module.exports.loop = function () {

  if (!Game.spawns.Spawn1) {
    return;
  }

  var initialized = false;

  if (!initialized) {
    Game.spawns.Spawn1.room.createFlag(Game.spawns.Spawn1.pos.x - 3, Game.spawns.Spawn1.pos.y + 5, 'Defenders', COLOR_RED);
    Game.spawns.Spawn1.room.createFlag(Game.spawns.Spawn1.pos.x - 5, Game.spawns.Spawn1.pos.y + 5, 'Healers', COLOR_GREEN);
    initialized = true;
  }

  require('autospawn')();

  for (var _name in Game.creeps) {
    if (_name) {
      var creep = Game.creeps[_name];

      if (creep.memory.role === 'harvester') {
        require('harvester')(creep);
      }

      if (creep.memory.role === 'builder') {
        require('builder')(creep);
      }

      if (creep.memory.role === 'guard') {
        require('guard')(creep);
      }

      if (creep.memory.role === 'ranger') {
        require('ranger')(creep);
      }

      if (creep.memory.role === 'healer') {
        require('healer')(creep);
      }

      if (creep.memory.role === 'test') {
        require('test')(creep);
      }
    }
  }
};