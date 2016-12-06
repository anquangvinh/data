var app = angular.module("myApp", []);
app.controller("FirstCtrl", function($scope){
  $scope.firstName = "John";
});

app.controller("SecondCtrl", function($scope){
  $scope.lastName = "Doe";
  $scope.getFullName = function(){
    return $scope.firstName + " " + $scope.lastName;
  };
});

app.controller("ThirdCtrl", function($scope){
  $scope.middleName = "Al";
  $scope.lastName = "Smith";

  $scope.getFullName = function(){
    return $scope.firstName + " " + $scope.middleName + " " + $scope.lastName;
  };
});
