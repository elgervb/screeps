/* global Game, ERR_NOT_IN_RANGE, FIND_CONSTRUCTION_SITES, FIND_HOSTILE_CREEPS */
var harvester = require('harvester');

module.exports.loop = function () {

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'harvester') {
			harvester(creep);
		}

		if(creep.memory.role == 'builder') {
		
			if(creep.carry.energy == 0) {
				if(Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Game.spawns.Spawn1);				
				}
			}
			else {
				var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(targets.length) {
					if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);					
					}
				}
			}
		}
		
		if(creep.memory.role == 'guard') {
        	var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        	if (targets.length) {
        		if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
        			creep.moveTo(targets[0]);		
        		}
        	}
        }
	}
}
/* global Game */
/* global ERR_NOT_IN_RANGE */
/* global FIND_SOURCES */
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function (creep) {

	if(creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[0]);
		}
	}
	else {
		if(creep.transferEnergy(Game.spawns.Spawn1) == ERR_NOT_IN_RANGE) {
			creep.moveTo(Game.spawns.Spawn1);
		}			
	}
};