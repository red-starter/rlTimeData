//dep injection
var app = angular.module('app',['ngRoute','app.services','app.create','app.graph','app.input'])

//setup client routes
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