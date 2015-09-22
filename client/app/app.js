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
		templateUrl: 'app/input/input.html',
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

//keep reference to user model
app.factory('Data', function () {

    var data = {
        userModel: [{dataName:"countryName",dataType:"String"},{dataName:"GDP",dataType:"Number"},{dataName:"population",dataType:"Number"}]//delete later
    };

    return {
        getData: function () {
            return data.userModel;
        },
        setData: function (userModel) {
            data.userModel = userModel;
        }
    };
});