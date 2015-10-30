/* global Game */
'use strict';

var harvester = require('harvester');
var guard = require('guard');
var ranger = require('ranger');
var builder = require('builder');
var healer = require('healer');
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