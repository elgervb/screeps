/* global Game, COLOR_RED, COLOR_GREEN */
module.exports.loop = function () {

  if (!Game.spawns.Spawn1) {
    return;
  }
  let initialized = false;
  
  if (!initialized) {
    Game.spawns.Spawn1.room.createFlag(Game.spawns.Spawn1.pos.x + 3, Game.spawns.Spawn1.pos.y + 0, 'Defenders', COLOR_RED);
    Game.spawns.Spawn1.room.createFlag(Game.spawns.Spawn1.pos.x - 2, Game.spawns.Spawn1.pos.y + 2, 'Healers', COLOR_GREEN);
    initialized = true;
  }

  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    // only do this for my creeps
    if (!creep.my) { 
      return;
    }

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
  
  require('autospawn')();
};
