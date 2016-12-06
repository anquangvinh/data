'use strict';

var app = angular.module('manageUserApp', [ 'ngRoute',
                                  'manageUserApp.userList',
                                  'manageUserApp.userEdit',
                                  'manageUserApp.userAdd' ])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.otherwise({
    redirectTo: '/userList'
  });
}])

.controller('manageUserAppCtrl', ['$scope', function($scope){
  $scope.deleteLocalStorage = function(){
    localStorage.removeItem('users');
  }
}]);
// .service('userServices', function(){
//   var userArr =
//         [{ name: 'Donald', email: 'donald@gmail.com'},
//         { name: 'Trump', email: 'trump@gmail.com'},
//         { name: 'Obama', email: 'obama@gmail.com'},
//         { name: 'Bush', email: 'bush@gmail.com'},
//         { name: 'Steve', email: 'steve@gmail.com'},
//         { name: 'Flash', email: 'flash@gmail.com'},
//         { name: 'Arrow', email: 'arrow@gmail.com'}];

//   this.getUsers = function(){
//     return userArr;
//   }
// });
