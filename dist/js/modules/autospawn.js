/* global Game, MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, OK */
'use strict';

module.exports = function () {

  // only generate if larger than 200 energy
  if (Game.spawns.Spawn1.energy < 200 || !!Game.spawns.Spawn1.spawning) {
    return;
  }

  // Generate these creeps
  var creeps = {
    harvester: {
      min: 2,
      max: 5,
      body: [MOVE, WORK, CARRY, CARRY]
    },
    guard: {
      min: 2,
      max: 6,
      body: [MOVE, WORK, CARRY, ATTACK]
    },
    healer: {
      min: 2,
      max: 4,
      body: [MOVE, HEAL]
    },
    ranger: {
      min: 2,
      max: 6,
      body: [MOVE, RANGED_ATTACK]
    },
    builder: {
      min: 1,
      max: 2,
      body: [MOVE, WORK, CARRY]
    },
    test: {
      min: 0,
      max: 1,
      body: [MOVE, WORK, CARRY, CARRY]
    }
  };

  function canGenerate(maxNumber, role) {
    var active = 0;

    // collect roles
    for (var i in Game.creeps) {
      if (role === Game.creeps[i].memory.role) {
        active = active + 1;
      }
    }
    return active < maxNumber;
  }

  function createCreep(role) {
    if (Game.spawns.Spawn1.canCreateCreep(creeps[role].body) === OK) {
      var creep = Game.spawns.Spawn1.createCreep(creeps[role].body, 'creep.' + role + '.' + Game.time, { role: role });
      if (typeof creep === 'string') {
        console.log('Spawn creep ' + role);
      } else {
        console.error('Error creating creep with role ' + role + '. Error: ' + creep);
      }
    }
  }

  // create min amount of creeps
  for (var role in creeps) {
    if (creeps[role] && canGenerate(creeps[role].min, role)) {
      createCreep(role);
      return; // done
    }
  }

  // when full with energy..
  if (Game.spawns.Spawn1.energyCapacity === Game.spawns.Spawn1.energy) {
    // create max amount of creeps
    for (var role in creeps) {
      if (creeps[role] && canGenerate(creeps[role].max, role)) {
        createCreep(role);
        return; // done
      }
    }
  }
};