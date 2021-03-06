angular.module('app.create', [])
    .controller('createController', function($scope,Model) {
        //where the selection gets saved

        // $scope.$watch('numSelected',function(){
        // 	console.log('something changed')
        // })
        $scope.upperbound = 7;
        //generates the users model object 
        // $scope.genModel = function(){
        // 	var userModel = {};
        // 	_.each(_.range(_.$scope.numSelected),function(index){
        // 		userModel
        // 	})
        // }

        $scope.userModel = []
        //mock Model
        // $scope.userModel = [{dataName:"country",dataType:"String"},{dataName:"GDP",dataType:"Number"},{dataName:"pop",dataType:"Number"}];
        $scope.submit = function() {
            if ($scope.dataType && $scope.dataName) {
                $scope.userModel.push({dataName:this.dataName,dataType:this.dataType})
                $scope.dataName = $scope.dataType = '';
            }
        };
        $scope.remove = function(index){
        	$scope.userModel.splice(index,1)
        }

        $scope.saveModel = function(){
        	Model.setModel($scope.userModel);
        	console.log('saved model',Model.getModel())
        }
    })