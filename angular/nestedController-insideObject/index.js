var app = angular.module("myApp", []);

app.controller("firstCtrlObj", function($scope){
  $scope.firstModelObj = {firstName: "John"};
});

app.controller("secondCtrlObj", function($scope){
  $scope.secondModelObj = {lastName : "Doe"};

  $scope.getFullName = function(){
    return $scope.firstModelObj.firstName + " " + $scope.secondModelObj.lastName;
  }
});

app.controller("thirdCtrlObj", function($scope){
  $scope.thirdModelObj = {
    middleName : "Al",
    lastName : "Smith"
  };

  $scope.getFullName = function(){
    return $scope.firstModelObj.firstName + " " + $scope.thirdModelObj.middleName + " " + $scope.thirdModelObj.lastName;
  };
});
