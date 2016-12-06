'use strict';

angular.module('service02App', [])
.factory('reverseFactory', function(){
  return function(input){
    var result = '';
    for(var i = input.length - 1; i >= 0; i--){
      result += input[i];
    }
    return result;
  };
})
.controller('service02AppCtrl', ['$scope', 'reverseFactory', function($scope, reverseFactory){
  $scope.reverseString = function(input){
    $scope.result = reverseFactory(input);
  }
}]);
