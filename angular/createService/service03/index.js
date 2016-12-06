'use strict';

angular.module('service03App', [])

.factory('userServices', function() {
    var userObj = {};
    var userArr =
        [{ name: 'Donald', email: 'donald@gmail.com'},
        { name: 'Trump', email: 'trump@gmail.com'},
        { name: 'Obama', email: 'obama@gmail.com'},
        { name: 'Bush', email: 'bush@gmail.com'},
        { name: 'Steve', email: 'steve@gmail.com'},
        { name: 'Flash', email: 'flash@gmail.com'},
        { name: 'Arrow', email: 'arrow@gmail.com'}];

    userObj.getUsers = function() {
      if(localStorage.getItem('users') !== null){
        userArr = JSON.parse(localStorage.getItem('users'));
      }else {
        localStorage.setItem('users', JSON.stringify(userArr));
      }
      return userArr;
    }

    //Add User Function
    userObj.addUsers = function(obj){
      var arr = this.getUsers();
      arr.push({name : obj.name, email : obj.email});
      localStorage.setItem('users', JSON.stringify(arr));
      return arr;
    }

    //Edit User Function
    userObj.userDetail = function(id){
      var arr = this.getUsers();
      return arr[id];
    }

    //Delete User Function
    userObj.deleteUser = function(id){
      var arr = this.getUsers();
      arr.splice(id, 1);
      localStorage.setItem('users', JSON.stringify(arr));
      return arr;
    }

    return userObj;
})

.controller('service03AppCtrl', ['$scope', 'userServices', function($scope, userServices) {

    //Load Data From Service to $scope.users
    $scope.users = userServices.getUsers();

    //Add new users
    $scope.clickSubmit = function(){
      $scope.users = userServices.addUsers($scope.newUser);
    }

    //Edit User
    $scope.userDetail = function(id){
      $scope.newUser = userServices.editUser(id);
    };

    //Delete User
    $scope.deleteUser = function(id){
      $scope.users = userServices.deleteUser(id);
    }

    //Delete LocalStorage
    $scope.removeLocalstorage = function(){
      localStorage.removeItem('users');
    }
}]);
