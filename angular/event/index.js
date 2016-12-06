var app = angular.module("eventApp", []);

app.controller("eventAppCtrl", function($scope){

  //Function for CLICK EVENT
  $scope.getInputValue = function(input, numOfClick){
    if(numOfClick == 1){
      $scope.valueOfFirstInput =  input;
    }else if(numOfClick == 2){
      $scope.valueOfSecondInput =  input;
    }
  };

  //Function for MOUSE EVENT
  $scope.changeColor = function(status){
    status == 'enter' ? $scope.color = 'orange' : $scope.color = 'black';
  }

  //Function for COPY EVENT
  $scope.copyTimes = 0;
  $scope.countCopyTimes = function(){
    $scope.copyTimes += 1;
  }

  //Function for PASTE EVENT
  $scope.noticePaste = function(){
    $scope.notice = "You pasted into text-area!";
  }
});
