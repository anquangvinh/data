var app = angular.module("mulCheckApp", []);

app.controller("mulCheckAppCtrl", function($scope){
  $scope.favorite = ["football", "swimming", "gym"];

  $scope.selection = [];

  $scope.changeStatus = function(fav){
    var favIndex = $scope.selection.indexOf(fav);

    if(favIndex == -1){
      $scope.selection.push(fav);
    }else {
      $scope.selection.splice(favIndex, 1);
    }
  };
});
