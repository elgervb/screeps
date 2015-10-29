/* global Room */
/* global Game */

/**
 * Build a road
 */

  Game.rooms.roomName.createConstructionSite(10, 15, Game.STRUCTURE_ROAD);

/*
  FIND_CREEPS
  FIND_MY_CREEPS
  FIND_HOSTILE_CREEPS
  FIND_MY_SPAWNS
  FIND_HOSTILE_SPAWNS
  FIND_SOURCES
  FIND_SOURCES_ACTIVE
  FIND_DROPPED_ENERGY
  FIND_STRUCTURES
  FIND_MY_STRUCTURES (Note: walls and roads cannot be found using this constant as they have no owner, use FIND_STRUCTURES instead)
  FIND_HOSTILE_STRUCTURES
  FIND_FLAGS
  FIND_CONSTRUCTION_SITES
  FIND_MY_CONSTRUCTION_SITES
  FIND_HOSTILE_CONSTRUCTION_SITES
  FIND_EXIT_TOP
  FIND_EXIT_RIGHT
  FIND_EXIT_BOTTOM
  FIND_EXIT_LEFT
  FIND_EXIT
*/


function createRoad(creep){
  var sources = creep.room.find(FIND_SOURCES_ACTIVE);
  creep.moveTo(sources[0]);
  creep.room.createConstructionSite(creep, STRUCTURE_ROAD);
}

createRoad(Game.creeps.TEST)