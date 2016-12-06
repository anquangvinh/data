app.config(function($routeProvider){
  $routeProvider.when("/html", {
    templateUrl : "../page/homepage/htmlTem.html",
    controller : "htmlCtrl"
  }).when("/css", {
    templateUrl : "../page/about/cssTem.html",
    controller : "cssCtrl"
  }).when("/php", {
    templateUrl : "../page/product/phpTem.html",
    controller : "phpCtrl"
  }).otherwise({
    template : "<h1>Main Page</h1>"
  });
});
