/* global Game */
module.exports.loop = function () {

  require('autospawn')();

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
};
