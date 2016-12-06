var app = angular.module("eventApp", []);
app.controller("eventAppCtrl", function($scope){
  $scope.persons = [
    {id : "p1", name: "First Person"},
    {id : "p2", name: "Second Person"},
    {id : "p3", name: "Third Person"}
  ];
});

app.directive("click", function(){
  return {
    link : function(scope, element, attrs){
      element.bind('click', function(){
        alert("Click into person: " + attrs.id);
      });
    }
  };
});
