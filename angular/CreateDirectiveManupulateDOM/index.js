var app = angular.module("createDirectiveApp", []);

app.controller("CreateDirectiveAppCtrl", function($scope){
  $scope.format = "dd/MM/yyyy hh:mm:ss a";
});

app.directive("createWatch", function($interval, dateFilter){
  return {
    link : function(scope, element, attrs){
      //Create Time Function
      function updateTime(){
        element.text(dateFilter(new Date(), format));
      }

      //Change Time After 1 second
      $interval(function(){
        updateTime();
      }, 1000);

      //change Format of time
      scope.$watch(attrs.createWatch, function(value){
        format = value;
        updateTime();
      });
    }
  };
});


