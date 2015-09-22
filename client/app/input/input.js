angular.module('app.input',[])
.controller('inputController',function($scope,Model,Input){
	//get Model off of controller
	$scope.userModel = Model.getModel();

	// console.log('data',$scope.userModel)

	//pluck all data names into an array
	var modelPropertyNames = _.pluck($scope.userModel,'dataName')
	var modelPropertyTypes = _.pluck($scope.userModel,'dataType')

	$scope.inputs = [];

	// save all user inputs
	// $scope.inputs = [
	// {country:'zambia',
	// GDP:1000,
	// population:65000000},
	// {country:'Czech',
	// GDP:1000,
	// population:10000000}
	// ];

	//save for later
	// Input.setInput($scope.inputs)


	$scope.saveInput = function(args){
		var res = {}
		_.each($scope.userModel,function(scopedElement,index){
			//get property name off of array
			var key = modelPropertyNames[index];
			//each scoped element can be accessed from DOM 
			console.log(scopedElement.dataName)
			res[key] = scopedElement.dataName;
			scopedElement.dataName = "";
		})
		$scope.inputs.push(res)
		// console.log($scope.inputs)
	}

	$scope.saveGraph = function(){
		Input.setInput($scope.inputs)
	}
})