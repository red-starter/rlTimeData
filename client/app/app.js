//dep injection
var app = angular.module('app',['ngRoute','app.services','app.create','app.graph','app.input'])

//setup client routes
//refactor 
app.config(function($routeProvider){
	$routeProvider
	.when('/create',{
		templateUrl:'app/create/create.html' ,
		controller: 'createController'
	})
	.when('/input',{
		templateUrl: 'app/input/input/html',
		controller: 'inputController'
	})
	.when('/graph',{
		templateUrl:'app/graph/graph.html',
		controller:'graphController'
	})
	.otherwise({
		redirectTo:'/'
	})
})

app.filter('range', function() {
  return function(input, min, max) {
    for (var i=min; i<max; i++)
      input.push(i);
    return input;
  };
});