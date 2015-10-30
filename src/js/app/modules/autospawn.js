/* global Game, MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, OK */
module.exports = () => {
  
  // only generate if larger than 200 energy
  if (Game.spawns.Spawn1.energy < 200 || !!Game.spawns.Spawn1.spawning) {
    return;
  }
  
  // Generate these creeps
  let creeps = {
    harvester: {
      desired: 2,
      max: 5,
      body: [MOVE, WORK, CARRY]
    },
    guard: {
      desired: 2,
      max: 12,
      body: [MOVE, WORK, CARRY, ATTACK]
    },
    ranger: {
      desired: 2,
      max: 6,
      body: [MOVE, RANGED_ATTACK]
    },
    healer: {
      desired: 2,
      max: 4,
      body: [MOVE, HEAL]
    },
    builder: {
      desired: 2,
      max: 2,
      body: [MOVE, WORK, CARRY]
    },
    test: {
      desired: 0,
      max: 1,
      body: [MOVE, WORK, CARRY]
    }
  };
  
  function canGenerate(maxNumber, role) {
    let active = 0;
    
    // collect roles
    for (let i in Game.creeps) {
      if (role === Game.creeps[i].memory.role) {
        active = active + 1;
      }
    }
    return active < maxNumber;
  }
  
  function createCreep(role) {
    if (Game.spawns.Spawn1.canCreateCreep(creeps[role].body) === OK) {
      let creep = Game.spawns.Spawn1.createCreep(creeps[role].body, null, {role});
      if (typeof creep === 'string') {
        console.log(`Spawn creep ${role}`);
      } else {
        console.error(`Error creating creep with role ${role}. Error: ${creep}`);
      }
    }
  }
  
  // create desired amount of creeps
  for (let role in creeps) {
    if (creeps[role] && canGenerate(creeps[role].desired, role)) {
      createCreep(role);
      return; // done
    }
  }
  
  // when full with energy..
  if (Game.spawns.Spawn1.energyCapacity === Game.spawns.Spawn1.energy) {
    // create max amount of creeps
    for (let role in creeps) {
      if (creeps[role] && canGenerate(creeps[role].max, role)) {
        createCreep(role);
        return; // done
      }
    }
  }
};
