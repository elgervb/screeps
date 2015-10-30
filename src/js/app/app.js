/* global Game */
let harvester = require('harvester');
let guard = require('guard');
let ranger = require('ranger');
let builder = require('builder');
let healer = require('healer');
let test = require('test');
let autospawn = require('autospawn');

module.exports.loop = function () {

  autospawn();

  for (let name in Game.creeps) {
    if (name) {
      let creep = Game.creeps[name];
  
      if (creep.memory.role === 'harvester') {
        harvester(creep);
      }
  
      if (creep.memory.role === 'builder') {
        builder(creep);
      }
  
      if (creep.memory.role === 'guard') {
        guard(creep);
      }
      
      if (creep.memory.role === 'ranger') {
        ranger(creep);
      }
      
       if (creep.memory.role === 'healer') {
        healer(creep);
      }
      
      if (creep.memory.role === 'test') {
        test(creep);
      }
    }
  }
};
