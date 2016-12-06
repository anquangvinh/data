'use strict';

angular.module('manageUserApp', [
    'ngRoute',
    'manageUserApp.userlist',
    'manageUserApp.useredit',
    'manageUserApp.useradd'
])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.otherwise({ redirectTo : '/userlist' });
}])
.controller('manageUserCtrl', ['$scope', function($scope){
  $scope.userArr = [
    {name : 'Donald', email : 'donald@gmail.com'},
    {name : 'Trump', email : 'trump@gmail.com'},
    {name : 'Obama', email : 'obama@gmail.com'},
    {name : 'Bush', email : 'bush@gmail.com'},
    {name : 'Steve', email : 'steve@gmail.com'},
    {name : 'Flash', email : 'flash@gmail.com'},
    {name : 'Arrow', email : 'arrow@gmail.com'}
  ];
}]);
