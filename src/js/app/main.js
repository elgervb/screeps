/* global Game, COLOR_RED, COLOR_GREEN */
module.exports.loop = function () {

  if (!Game.spawns.Spawn1) {
    return;
  }
  let start = new Date().getTime();
  let logPerf = (task) => {
    let time = new Date().getTime() - start;
    if (time > 5) {
      console.log(`${time}ms - ${Game.time} - ${task}`);
    }
  };
  
  let initialized = false;
  
  if (!initialized) {
    Game.spawns.Spawn1.room.createFlag(Game.spawns.Spawn1.pos.x - 3, Game.spawns.Spawn1.pos.y + 0, 'Defenders', COLOR_RED);
    Game.spawns.Spawn1.room.createFlag(Game.spawns.Spawn1.pos.x - 5, Game.spawns.Spawn1.pos.y + 2, 'Healers', COLOR_GREEN);
    initialized = true;
  }

  for (let name in Game.creeps) {
    if (name) {
      let creep = Game.creeps[name];
  
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
  
  require('autospawn')();
  
  logPerf('End loop');
};
