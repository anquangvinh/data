app.config(function($routeProvider){
  $routeProvider.when('/book/:bookName', {
    templateUrl : "page/book/book.html",
    controller  : "bookCtrl"
  }).when('/book/:bookName/ch/:chapNumber', {
    templateUrl : "page/chapter/chapter.html",
    controller  : "chapterCtrl"
  }).otherwise({
    template : "<h1>Choose a Book!</h1>"
  });
});
