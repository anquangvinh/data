var app = angular.module("customFilterApp", []);

app.filter("CurrencyFilter", function(numberFilter){
  return function(inputNumber, currencySymbol, decimalSymbol, thousandSymbol, decimalDigits){
    if(!isNaN(inputNumber)){
      var currencySymbol = (typeof currencySymbol === "undefined") ? "$" : currencySymbol;
      var decimalSymbol  = (typeof decimalSymbol  === "undefined") ? "." : decimalSymbol;
      var thousandSymbol = (typeof thousandSymbol === "undefined") ? "," : thousandSymbol;
      var decimalDigits  = (typeof decimalDigits  === "undefined") ? 2 : decimalDigits;

      if(decimalDigits < 0){
        decimalDigits = 0
      }

      var formatedNumber = numberFilter(inputNumber, decimalDigits);

      //Divide number into 2 part
      var numberPart = formatedNumber.split("."); //1000,000.035 => 1000,000 , 035

      //Join in 2 part of the in
      numberPart[0] = numberPart[0].split(",").join(thousandSymbol); //1000,000 => 1000.000

      var result = "";
      if(numberPart.length == 2){
        result += numberPart[0] + decimalSymbol + numberPart[1] + " " + currencySymbol;
      } else {
        result += numberPart[0] + currencySymbol;
      }
      return result;
    }else {
      return inputNumber;
    }
  }
});

app.controller("customFilterCtrl", function($scope){
  $scope.number = 10230932.302;
});
