angular.module('myApp', [])
.controller('myCtrl', ['$scope', function($scope){
  $scope.data = { time : new Date()};

  $scope.updateTime = function(){
    $scope.data.time = new Date();
  }

  document.getElementById("btnUpdate").addEventListener('click', function(){
    $scope.data.time = new Date();
    $scope.$apply();
  });
}]);
