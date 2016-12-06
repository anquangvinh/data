app.config(function($routeProvider){
  $routeProvider.when("/html", {
    templateUrl : "route2/homepage/htmlTem.html",
    controller : "htmlCtrl"
  }).when("/css", {
    templateUrl : "route2/about/cssTem.html",
    controller : "cssCtrl"
  }).when("/php", {
    templateUrl : "route2/product/phpTem.html",
    controller : "phpCtrl"
  }).otherwise({
    template : "<h1>Main Page</h1>"
  });
});
