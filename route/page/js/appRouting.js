app.config(function($routeProvider){
  $routeProvider.when("/html", {
    templateUrl : "homepage/htmlTem.html",
    controller : "htmlCtrl"
  }).when("/css", {
    templateUrl : "about/cssTem.html",
    controller : "cssCtrl"
  }).when("/php", {
    templateUrl : "product/phpTem.html",
    controller : "phpCtrl"
  }).otherwise({
    template : "<h1>Main Page</h1>"
  });
});
