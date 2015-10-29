/* global Game */
'use strict';

var harvester = require('harvester');
var guard = require('guard');
var builder = require('builder');
var test = require('test');
var autospawn = require('autospawn');

module.exports.loop = function () {

  autospawn();

  for (var _name in Game.creeps) {
    if (_name) {
      var creep = Game.creeps[_name];

      if (creep.memory.role === 'harvester') {
        harvester(creep);
      }

      if (creep.memory.role === 'builder') {
        builder(creep);
      }

      if (creep.memory.role === 'guard') {
        guard(creep);
      }

      if (creep.memory.role === 'test') {
        test(creep);
      }
    }
  }
};