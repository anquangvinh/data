function PersonManager(person){
  this.personInstance = person;
}

PersonManager.prototype.getFirstName = function(){
  return this.personInstance.firstName;
};

PersonManager.prototype.getLastName = function(){
  return this.personInstance.lastName;
};

PersonManager.prototype.getFullName = function(){
  return this.personInstance.firstName + " " + this.personInstance.lastName;
};
var app = angular.module("myApp", []);

app.value("person", {
  firstName : "",
  lastName : "",
  getFullName : function(){
    return this.firstName + " " + this.lastName;
  }
});

app.service("personManager", PersonManager);

app.controller("ServiceCtrl", function($scope, person, personManager ){
  person.firstName = "John";
  person.lastName = "Doe";

  $scope.personManagerInstance = personManager;
});
