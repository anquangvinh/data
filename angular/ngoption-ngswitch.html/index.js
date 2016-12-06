var app = angular.module("selectSwitchApp", []);
app.controller("appCtrl", function($scope){
  $scope.person = [
    { id: 1, name : "First", age : 24 },
    { id: 2, name : "Second", age : 32 },
    { id: 3, name : "Third", age : 45 }
  ];

  $scope.person2 = ["First", "Second", "Third"];
});
