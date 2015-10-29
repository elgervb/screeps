/* global Game, MOVE, WORK, CARRY */
module.exports = () => {
  
  if (Game.spawns.Spawn1.energy < 200) {
    return;
  }
  
  let creeps = {
    harvester: {
      active: 0,
      desired: 6
    },
    builder: {
      active: 0,
      desired: 2
    },
    guard: {
      active: 0,
      desired: 2
    },
    test: {
      active: 0,
      desired: 1
    }
  };
  
  function mustGenerate(creep) {
    return creep.active < creep.desired;
  }
  
  // collect roles
  for (let i in Game.creeps) {
    if (i) {
    
      let role = Game.creeps[i].role;
      if (creeps.hasOwnProperty(role)) {
        creeps[role].active = creeps[role].active + 1;
      }
    }
  }
  
  for (let creep in creeps) {
    
    if (!mustGenerate(creep)) {
      return;
    }
    
    if (creep === 'harvester') {
      console.log('Autospawn harvester...');
      Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, {role: 'harvester'});
      return;
    }
    
    if (creep === 'builder') {
      console.log('Autospawn builder...');
      Game.spawns.Spawn1.createCreep([MOVE, WORK, WORK, CARRY], null, {role: 'builder'});
      return;
    }
    
    if (creep === 'guard') {
      console.log('Autospawn guard...');
      Game.spawns.Spawn1.createCreep([MOVE, WORK, WORK, CARRY], null, {role: 'guard'});
      return;
    }
    
    if (creep === 'test') {
      console.log('Autospawn test...');
      Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], 'TEST', {role: 'test'});
      return;
    }
  }
};
