var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http){
  $scope.addpart = false; //init status of ng-show addpart

  //Load Data From Json
  $http.get("products.json").then(function(response){
    $scope.products = response.data.products;
  });

  //change ng-show addpart Status
  $scope.addProduct = function(){
    $scope.addpart = !$scope.addpart;
  };

  //Iterate $scope.products
  $scope.checkExist = function(name, cb){
    for(i=0, len = $scope.products.length; i < len; i++){
      if($scope.products[i].name != name){
        return cb();
      }else{
        $scope.err = "This Product was existed!";
        $scope.addpart = true;
        return false;
      }
    }
  }

  //Add Button Function for Add Product
  $scope.addFunc = function(){
    $scope.addpart = false;
    var obj = { name : $scope.txtName, price : $scope.txtPrice};
    $scope.checkExist(obj.name, function(){
      $scope.products.push(obj);
    });
  };

  //Delete a Product
  $scope.deleteFunc = function(pos){
    $scope.products.splice(pos, 1);
  };

});
