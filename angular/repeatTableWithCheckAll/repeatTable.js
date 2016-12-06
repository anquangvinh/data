var app = angular.module("myApp", []);

app.controller("repeaterCtrl", function($scope){
  $scope.allCheck = false;

  $scope.user = [
    {name : "John", age : 18, isSelect : false},
    {name : "Terry", age : 27, isSelect : false},
    {name : "Rooney", age : 34, isSelect : false},
    {name : "Ronaldo", age : 67, isSelect : false}
  ];

  $scope.CheckAllFunc = function(checkValue){
    for(i = 0, len = $scope.user.length; i < len; i++){
      $scope.user[i].isSelect = checkValue;
    }
  };
});
