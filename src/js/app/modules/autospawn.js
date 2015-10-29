/* global Game, MOVE, WORK, CARRY, ATTACK */
module.exports = () => {
  
  // only generate if larger than 200 energy
  if (Game.spawns.Spawn1.energy < 200 || !!Game.spawns.Spawn1.spawning) {
    return;
  }
  
  // Generate these creeps
  let creeps = {
    harvester: {
      desired: 1,
      create: () => {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, {role: 'harvester'});
      }
    },
    builder: {
      desired: 2,
      create: () => {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, {role: 'builder'});
      }
    },
    guard: {
      desired: 4,
      create: () => {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY, ATTACK], null, {role: 'guard'});
      }
    },
    test: {
      desired: 1,
      create: () => {
        Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, {role: 'test'});
      }
    }
  };
  
  function mustGenerate(creep, role) {
    let active = 0;
    
    // collect roles
    for (let i in Game.creeps) {
      if (role === Game.creeps[i].memory.role){
        active = active + 1;
      }
    }
    return active < creep.desired;
  }
  
  for (let role in creeps) {
    if (mustGenerate(creeps[role], role)) {
      console.log(`Spawn creep ${role}`);
      if (creeps[role] && typeof creeps[role].create === 'function') {
        creeps[role].create();
        return; // done
      }
    }
  }
};
