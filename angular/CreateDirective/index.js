var app = angular.module("directiveApp", []);

app.controller("directiveAppCtrl", function($scope){
  $scope.customer1st = {name: "France", address: "America"};
  $scope.customer2nd = {name: "Irac", address: "Campuchia"};
});

//isolated scope of directive
app.directive("customerInfor", function(){
  return {
    restrict : 'E',
    scope : {
      aboutCustomer : "=customerName"
    },
    template : 'Customer Name: {{ aboutCustomer.name }}; Customer Address: {{ aboutCustomer.address }}'
  };
});




