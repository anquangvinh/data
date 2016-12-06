'use strict';

angular.module('service01App', [])
.factory('notifyFactory', ['$window', function($window){
  var msgs = [];

  return function(msg){
    msgs.push(msg);
    if(msgs.length === 3){
      $window.alert(msgs.join('\n'));
      msgs = [];
    }
  }
}])
.controller('service01AppCtrl', ['$scope', 'notifyFactory', function($scope, notifyFactory){
  $scope.callNotify = function(msg){
    notifyFactory(msg);
  };
}]);
