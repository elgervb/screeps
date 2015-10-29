/* global Game, MOVE, WORK, CARRY, ATTACK */
'use strict';

module.exports = function () {

  // only generate if larger than 200 energy
  if (Game.spawns.Spawn1.energy < 200 || !!Game.spawns.Spawn1.spawning) {
    return;
  }

  // Generate these creeps
  var creeps = {
    harvester: {
      desired: 4,
      create: function create() {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, { role: 'harvester' });
      }
    },
    builder: {
      desired: 2,
      create: function create() {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, { role: 'builder' });
      }
    },
    guard: {
      desired: 4,
      create: function create() {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY, ATTACK], null, { role: 'guard' });
      }
    },
    test: {
      desired: 1,
      create: function create() {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, { role: 'test' });
      }
    }
  };

  function mustGenerate(creep, role) {
    var active = 0;

    // collect roles
    for (var i in Game.creeps) {
      if (role === Game.creeps[i].memory.role) {
        active = active + 1;
      }
    }
    return active < creep.desired;
  }

  for (var role in creeps) {
    if (mustGenerate(creeps[role], role)) {
      if (creeps[role] && typeof creeps[role].create === 'function') {
        console.log('Spawn creep ' + role);
        creeps[role].create();
        return; // done
      }
    }
  }
};