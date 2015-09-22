angular.module('app.graph',[])
.controller('graphController',function($scope,Data,Input){
	//get data off of controller

	$scope.userModel = Data.getData();
	//pluck all data names into an array

	$scope.modelProperties = [];
	$scope.modelProperties = _.pluck($scope.userModel,'dataName')

	$scope.userInput = Input.getInput();
	// console.log($scope.userInput);


	// console.log(modelPropertyNames)
	// console.log($scope.userModel);
	//$scope.xaxis
	//default scaler

	//create svg
	var options ={
		width:600,
		height:600,
		margin:50
	}
	//svg selector 
	var svg = d3.select("#graph").append("svg")
	.attr("width",options.width)
	.attr("height",options.height)

	//set up 
	var mapX = d3.scale.linear().domain([0,10]).range([options.margin,options.width-options.margin]);
	var mapY = d3.scale.linear().domain([0,10]).range([options.height - options.margin,options.margin]);
	//scale the radius of countries (which represents population)
	var mapRadius = d3.scale.linear().domain([0,500]).range([0,20])
	//scale the opacity, based on gdp
	var mapOpacity = d3.scale.linear().domain([10000,100000]).range([.5,1]);
	// //sclae the color, based on continent
	var mapColor = d3.scale.category10().domain(_.range(5))
	//define axis function

	$scope.initAxis = function(){

		//grab values off of UserInput
		var xAxisArr = _.pluck($scope.userInput,$scope.xaxis) 
		var yAxisArr = _.pluck($scope.userInput,$scope.yaxis) 
		var sizeArr = _.pluck($scope.userInput,$scope.size)
		var opacityArr = _.pluck($scope.userInput,$scope.opacity)
		var colorArr = _.pluck($scope.userInput,$scope.color)

		//initialize mapping based on range of user input
		mapX = d3.scale.linear().domain([d3.min(xAxisArr),d3.max(xAxisArr)]).range([options.margin,options.width-options.margin]);
		mapY = d3.scale.linear().domain([d3.min(yAxisArr),d3.max(yAxisArr)]).range([options.height - options.margin,options.margin]);
		// mapRadius = d3.scale.linear().domain([d3.min(sizeArr),d3.max(sizeArr)]).range([0,20]);
		mapRadius = d3.scale.linear().domain([d3.min(sizeArr),d3.max(sizeArr)]).range([0,options.width/30])
		mapOpacity = d3.scale.linear().domain([d3.min(opacityArr),d3.max(opacityArr)]).range([0.5,1]);
		mapColor = d3.scale.category10().domain(colorArr)

		var xAxis = d3.svg.axis()
		.scale(mapX) //where to orient numbers
		.orient('bottom') 

		var yAxis = d3.svg.axis()
		.scale(mapY)
		.orient('left')

		//clear previous append
		svg.selectAll("g").remove()
		svg.selectAll(".h").remove()
		svg.selectAll(".v").remove()

		// use svg selector, add axis to svg as a collection of g elements
		svg.append("g")
		.attr('class','axis')
		.attr('transform','translate(0,'+ (options.height- options.margin) +')')
		.call(xAxis)
		// call with the yAxis function
		svg.append("g")
		  .attr("class", "axis")
		  .attr("transform", "translate(" + (options.margin) + ",0)")
		  .call(yAxis);
		//fix later
		//create horizontal lines
		svg.selectAll(".h").data(d3.range(-8,10,1)).enter()
		  .append("line").classed("h",1)
		  .attr("x1",options.margin).attr("x2",options.height-options.margin)
		  .attr("y1",mapY).attr("y2",mapY)
		//create vertical lines
		svg.selectAll(".v").data(d3.range(1,5)).enter()
		  .append("line").classed("v",1)
		  .attr("y1",options.margin).attr("y2",options.width-options.margin)
		  .attr("x1",mapX).attr("x2",mapX)
		 //refresh page with new axis
		$scope.genGraph()	

	}

	$scope.genGraph = function(){
		//clear graph
		svg.selectAll("circle").remove()
		svg.selectAll("circle").data($scope.userInput,function(e,index){ return index})
			.enter()
			.append("circle")
			.attr('cx',function(d){return mapX(+d[$scope.xaxis])})
			.attr('cy',function(d){return mapY(+d[$scope.yaxis])})
			.attr('r',function(d){return mapRadius(+d[$scope.size])}) //sqrt makes negative
			.attr('fill',function(d){return mapColor(d[$scope.color])})
			.attr('opacity',function(d){return mapOpacity(d[$scope.opacity])})
			.append('title')
			// .text(function(d){return d[$scope.name]})
		}	
		
})