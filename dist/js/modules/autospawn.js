/* global Game, MOVE, WORK, CARRY */
'use strict';

module.exports = function () {

  // only generate if larger than 200 energy
  if (Game.spawns.Spawn1.energy < 200 && !Game.spawns.Spawn1.spawning) {
    return;
  }

  // Generate these creeps
  var creeps = {
    harvester: {
      active: 0,
      desired: 6,
      create: function create() {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, { role: 'harvester' });
      }
    },
    builder: {
      active: 0,
      desired: 2,
      create: function create() {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, { role: 'builder' });
      }
    },
    guard: {
      active: 0,
      desired: 2,
      create: function create() {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, { role: 'guard' });
      }
    },
    test: {
      active: 0,
      desired: 1,
      create: function create() {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, { role: 'test' });
      }
    }
  };

  function mustGenerate(creep) {
    return creep.active < creep.desired;
  }

  // collect roles
  for (var i in Game.creeps) {
    var role = Game.creeps[i].role;
    if (creeps.hasOwnProperty(role)) {
      creeps[role].active = creeps[role].active + 1;
    }
  }

  for (var key in creeps) {
    if (mustGenerate(creeps[key])) {
      console.log('Spawn creep ' + key);
      if (creeps[key] && typeof creeps[key].create === 'function') {
        creeps[key].create();
      }
    }
  }
};