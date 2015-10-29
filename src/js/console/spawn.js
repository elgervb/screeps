/* global Game, MOVE, WORK, CARRY */
/**
 * Spawn a new harvester
 * 
 * @see http://support.screeps.com/hc/en-us/articles/203013212-Creep
 */
Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], null, {role: 'harvester'});

/**
 * Spawn a new builder
 */
Game.spawns.Spawn1.createCreep([MOVE, WORK, WORK, CARRY], null, {role: 'builder'});




Game.spawns.Spawn1.createCreep([MOVE, WORK, CARRY], 'TEST', {role: 'test'});