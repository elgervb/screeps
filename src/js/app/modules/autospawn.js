/* global Game, MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, OK */
module.exports = () => {
  
  // only generate if larger than 200 energy
  if (Game.spawns.Spawn1.energy < 200 || !!Game.spawns.Spawn1.spawning) {
    return;
  }
  
  // Generate these creeps
  let creeps = {
    harvester: {
      desired: 4,
      max: 6,
      create: () => {
        if (Game.spawns.Spawn1.canCreateCreep([MOVE, WORK, CARRY]) === OK) {
          return Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, {role: 'harvester'});
        }
      }
    },
    builder: {
      desired: 2,
      max: 2,
      create: () => {
        if (Game.spawns.Spawn1.canCreateCreep([MOVE, WORK, CARRY]) === OK) {
          return Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, {role: 'builder'});
        }
      }
    },
    guard: {
      desired: 10,
      max: 12,
      create: () => {
        if (Game.spawns.Spawn1.canCreateCreep([MOVE, WORK, CARRY, ATTACK]) === OK) {
          return Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY, ATTACK], null, {role: 'guard'});
        }
      }
    },
    ranger: {
      desired: 4,
      max: 6,
      create: () => {
        if (Game.spawns.Spawn1.canCreateCreep([MOVE, WORK, CARRY, RANGED_ATTACK]) === OK) {
          return Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY, RANGED_ATTACK], null, {role: 'ranger'});
        }
      }
    },
    test: {
      desired: 0,
      max: 1,
      create: () => {
        if (Game.spawns.Spawn1.canCreateCreep([MOVE, WORK, CARRY]) === OK) {
          return Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, {role: 'test'});
        }
      }
    }
  };
  
  function mustGenerate(maxNumber, role) {
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
    if (typeof creeps[role].create === 'function') {
      if (creeps[role].create()) {
        console.log(`Spawn creep ${role}`);
      }
    }
  }
  
  // create desired amount of creeps
  for (let role in creeps) {
    if (creeps[role] && mustGenerate(creeps[role].desired, role)) {
      if (typeof creeps[role].create === 'function') {
        createCreep(role);
        return; // done
      }
    }
  }
  
  // when full with energy..
  if (Game.spawns.Spawn1.energyCapacity === Game.spawns.Spawn1.energy) {
    // create max amount of creeps
    for (let role in creeps) {
      if (creeps[role] && mustGenerate(creeps[role].max, role)) {
        createCreep(role);
        return; // done
      }
    }
  }
};
