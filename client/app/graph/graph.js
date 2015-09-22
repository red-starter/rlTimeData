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
	var sizeArr = _.pluck($scope.userInput,'Life exp.')
	var opacityArr = _.pluck($scope.userInput,'population')
	var colorArr = _.pluck($scope.userInput,'countryName')

	$scope.genModel = function(){
		//used to scale the graph
		// if (xAxisArr && yAxisArr){
		// 	initGraph(xAxisArr,yAxisArr)
		// }
		initAxis()
	}
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

	var initAxis = function(){
		var xAxisArr = _.pluck($scope.userInput,$scope.xaxis) 
		var yAxisArr = _.pluck($scope.userInput,$scope.yaxis) 

		//scale x coordinate to fit into svg element, mapX and mapY are functions
		var mapX = d3.scale.linear().domain([d3.min(xAxisArr),d3.max(xAxisArr)]).range([options.margin,options.width-options.margin]);
		var mapY = d3.scale.linear().domain([d3.min(yAxisArr),d3.max(yAxisArr)]).range([options.height - options.margin,options.margin]);
		
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
	}

	var initGraph = function(xAxisArr,yAxisArr,sizeArr,opacityArr,colorArr){

		//defaults
		//scale x coordinate to fit into svg element, mapX and mapY are functions
		xAxisArr = xAxisArr || [0,10];
		yAxisArr = yAxisArr || [0,10];
		xAxisArr = xAxisArr || [0,10];

		var options ={
			width:600,
			height:600,
			margin:50
		}
		//svg selector 
		var svg = d3.select("#graph").append("svg")
		.attr("width",options.width)
		.attr("height",options.height)
		
		//scale x coordinate to fit into svg element, mapX and mapY are functions
		var mapX = d3.scale.linear().domain([d3.min(xAxisArr),d3.max(xAxisArr)]).range([options.margin,options.width-options.margin]);
		var mapY = d3.scale.linear().domain([d3.min(yAxisArr),d3.max(yAxisArr)]).range([options.height - options.margin,options.margin]);
		//scale the radius of countries (which represents population)
		var mapRadius = d3.scale.linear().domain([0,500]).range([0,20])
		//scale the opacity, based on gdp
		var mapOpacity = d3.scale.linear().domain([10000,100000]).range([.5,1]);
		// //sclae the color, based on continent
		var mapColor = d3.scale.category10().domain(["Africa","America","Europe","Asia","Oceania	"])
		//define axis function
		var xAxis = d3.svg.axis()
		.scale(mapX)
		//where to orient numbers
		.orient('bottom') 

		var yAxis = d3.svg.axis()
		.scale(mapY)
		.orient('left')

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

		svg.selectAll("circle").data($scope.userInput,function(e,index){ return index})
			.enter()
			.append("circle")
			//plotting GERD against growth, r is population,+converts to number,need mapping functio 
			.attr('cx',function(d){return mapX(+d['population'])})
			.attr('cy',function(d){return mapY(+d['GDP'])})
			.attr('r',function(d){return mapRadius(Math.sqrt(+d['population']))})
			.attr('fill',function(d){return mapColor(d['continent'])})
			.attr('opacity',function(d){return mapOpacity(d['population'])})
			.append('title')
			.text(function(d){return d['population'] + d['country']})
	}

	// initGraph();
})
//tell d3.csv function location of a csv file, 
// and a function will be run on the array of objects creted by using
//the first row as the keys
// window.onload = function()
// {






//issues an http get request for the file
//python -m SimpleHTTPServer
// d3.csv("data.csv",function(csv){
// //now we have access to the parsed csv
// //sort data based on population in ascending order
// console.log(csv)
// 	csv.sort(function(a,b){ 
// 		return b.population - a.population
// 	})
//do a data join, all the data will be provided to the enter selection 

// });

// }///end document load