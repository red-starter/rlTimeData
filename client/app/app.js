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
        userModel: [
        {dataName:"continent",dataType:"String"},
        {dataName:"Life exp.",dataType:"Number"},
        {dataName:"countryName",dataType:"String"},
        {dataName:"GDP",dataType:"Number"},
        {dataName:"population",dataType:"Number"}]//delete later
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
app.factory('Input', function () {

    var input = {
        userInput: [{"continent":"Africa","Life exp.":55,"country":"zambia","GDP":500,"population":65000},
                    {"continent":"EU","Life exp.":75,"country":"Slovakia","GDP":1000,"population":70000},
                    {"continent":"America","Life exp.":80,"country":"USA","GDP":5000,"population":300000},
                    {"continent":"EU","Life exp.":81,"country":"Germany","GDP":6000,"population":80000},
                    {"continent":"America","Life exp.":69,"country":"Mexico","GDP":3000,"population":250000},
                    {"continent":"EU","Life exp.":79,"country":"Czech","GDP":4000,"population":6000}]
    };

    return {
        getInput: function () {
            return input.userInput;
        },
        setInput: function (userInput) {
            input.userInput = userInput;
        }
    };
})