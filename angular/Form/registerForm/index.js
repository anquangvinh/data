var app = angular.module("FormApp", []);
app.controller('FormAppCtrl', function($scope){
  $scope.finalRs = [];

  //Data for check box
  $scope.favorite = ["Football", "Swimming", "Tennis", "Others"];
  $scope.favorChecked = [];

  $scope.changeFavorChecked = function(favor){
    var favorPos = $scope.favorChecked.indexOf(favor);
    if (favorPos == -1) {
      $scope.favorChecked.push(favor);
    }else {
      $scope.favorChecked.splice(favorPos, 1);
    }
  };

  //Data for select - option
  $scope.country = [
    {id: 1, name: "America"},
    {id: 2, name: "France"},
    {id: 3, name: "Viet Nam"}
  ];

  //Function check validation of select - option
  $scope.changeSltCountry = function(sltCountry){
    if(sltCountry == null){
      $scope.validateCountry = true;
    }else {
      $scope.validateCountry = false;
    }
  }

  //btnSubmit ng-click function
  $scope.finalSubmit = function(){
    $scope.user.favorite = $scope.favorChecked;
  }
});
