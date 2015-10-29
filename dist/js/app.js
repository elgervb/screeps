/**
 * Declaration of the main skeleton app
 */
var app = angular.module('skeleton', ['ngRoute'])

/**
 * Configuration: state your routes and other configuration items here
 */
.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  
  $routeProvider
    .otherwise({
      controller: 'MainController',
      templateUrl: '/js/app/modules/main/main.html'
    });

  $locationProvider.html5Mode('true');

}]);

/* global app */
/**
 * Main controller
 */
angular.module('skeleton').controller('MainController', ['$scope', function($scope) {

  $scope.divider = '+';
  
  /**
   * Change the divider between Gulp and AngularJS
   */
  $scope.changeDivider = function(divider) {
    $scope.divider = divider;
  };

}]);