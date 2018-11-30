

////// GOOGLE ANALYTICS //////

$(document).ready(function() {

 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
   ga('create','UA-53828044-1','auto');
   ga('require', 'displayfeatures');
   ga('send','pageview');
});


////// SNS LINK //////

function sharefb(url) {
 window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
};

function sharetwit(url, text) {
 window.open('http://twitter.com/intent/tweet?text=' + text + '&url=' + url);
};

$('#facebook').on("click", function() {
 sharefb('http://mabu.newscloud.sbs.co.kr/201810fairtrade/2');
});

$('#twitter').on("click", function() {
 sharetwit('http://mabu.newscloud.sbs.co.kr/201810fairtrade/2', 'SBS마부작침: 공정이란 무엇인가 - 공정위 과징금의 공정(公正)을 묻다');
});


///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////	


var days = ["대우건설", "현대건설", "SK건설", "대림산업", "현대산업개발", "SK텔레콤", "삼성물산", 
			"포스코건설", "코오롱글로벌", "경남기업", "GS건설", "LS전선", "롯데쇼핑", "kt", "서희건설", "금호산업"],
	times = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018];

var margin = {
	top: 50,
	right: 100,
	bottom: 70,
	left: 100
};

var width = Math.max(Math.min(window.innerWidth, 1280), 670) - margin.left - margin.right - 20,
	gridSize = Math.floor(width / times.length),
	height = gridSize * (days.length+2) /2;

  function bandClassifier(val,multiplier)
  {
        if(val>=0)
        { 
            return (Math.floor((val*multiplier)/(.33*multiplier))+1)>3?3:Math.floor((val*multiplier)/(.33*multiplier))+1
        }
        else{
            return (Math.floor((val*multiplier)/(.33*multiplier)))<-3?-3:Math.floor((val*multiplier)/(.33*multiplier))
        }
  }	

//SVG container
var svg = d3.select('#trafficAccidents')
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Add tooltip
tooltip = d3.select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("width", "160px")
			.style("height", "60px")
			.style("background", "#ffffff")
			.style("opacity", "1")
			.style("position", "absolute")
			.style("visibility", "hidden")
			.style("box-shadow","0px 0px 6px #999492")
			.style("padding", "10px");
toolval = tooltip.append("div");

var formatComma = d3.format(",");


// //Reset the overall font size
// var newFontSize = width * 62.5 / 900;
// d3.select("html").style("font-size", newFontSize + "%");

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Draw Heatmap /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//Based on the heatmap example of: http://blockbuilder.org/milroc/7014412

var colorScale = d3.scale.linear()
	// .domain([0, d3.max(accidents, function(d) {return d.count; })/2, d3.max(accidents, function(d) {return d.count; })])
	// .domain([0, 100, d3.max(accidents, function(d) {return d.count; })])
	// .range(["#8c0000", "#EDDFCA", "#BFE4EF"])
	//.interpolate(d3.interpolateHcl);
	.domain([0,10])
	.range(['#EDDFCA', '#8C0000']);

var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", 0)
    .attr("y", function (d, i) { return (i-0.45) * gridSize /2; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 2 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 8 && i <= 17) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });




var heatMap = svg.selectAll(".hour")
    .data(accidents)
    .enter().append("rect")
    .attr("x", function(d) { return (d.hour - 1) * gridSize; })
    .attr("y", function(d) { return (d.day - 1) * gridSize /2; })
    .attr("class", "hour bordered")
    .attr("width", gridSize)
    .attr("height", gridSize/2.5)
    .style("stroke", function(d) { 
    	if (d.count=="없음") {
    		return "#F7F7F7";}
    	else {
    		return "white"; }
    	})
    .style("stroke-opacity", 0.6)
    .style("stroke-width", "2px")
    .style("fill", function(d) { 
    	if (d.count=="없음") {
    		return "#ededed";} 
    	else if (d.count=="blank") {
    		return "#ffffff";
    	 } else {
    		return colorScale(d.count); }
    	})
    .on("mouseover", function(d) {
   	 	if (d.count == "없음") {
   	 		d3.select(this).style("stroke", "#F7F7F7");
   	 		d3.select(".trianglepointer").attr("opacity", 0);   	 		
   	 	} else {
   	 		var triangleLinear = d3.scale.linear()
										.domain([0,10])
										.range([legendWidth/2, (-legendWidth/2)]);
	    	d3.select(this).style("stroke", "#333231");
	    	// d3.select(".trianglepointer").transition().delay(100).attr("transform", "translate("+(-((legendWidth/colorScale.range().length)/2+(colorScale.domain().indexOf(bandClassifier(d.perChange,100))*(legendWidth/colorScale.range().length)))+",0)"));
	    	d3.select(".trianglepointer").attr("opacity",1).transition().delay(100).attr("transform", "translate("+triangleLinear(d.count)+",0)")
    }})
    .on("mouseout", function(d) {
    	d3.select(this).style("stroke","white");
    	tooltip.style("visibility", "hidden");
    })
    .on("mousemove", function(d) {
    	if (d.count == "blank" || d.count == "없음") {
    		tooltip.style("visibility", "hidden");
    	} else if (d.popup == "과징금 면제") {
    		tooltip.style("visibility", "visible")
	    			.style("top", (d3.event.pageY-70)+"px")
	    			.style("left", (d3.event.pageX-0)+"px");
	    	tooltip.select("div").html("위반횟수 <strong>"+d.count+"</strong> 회<br/>과징금 면제")
    	} else {
	    	tooltip.style("visibility", "visible")
	    			.style("top", (d3.event.pageY-70)+"px")
	    			.style("left", (d3.event.pageX-0)+"px");
	    	tooltip.select("div").html("위반횟수 <strong>"+d.count+"</strong> 회<br/>"+formatComma(d.popup)+"원")
    	}
    })

//Append title to the top
// svg.append("text")
// 	.attr("class", "title")
//     .attr("x", width/2)
//     .attr("y", -90)
//     .style("text-anchor", "middle")
//     .text("연도별 조정률 변화");
// svg.append("text")
// 	.attr("class", "subtitle")
//     .attr("x", width/2)
//     .attr("y", -60)
//     .style("text-anchor", "middle")
//     .text("The Netherlands | 2014");

// //Append credit at bottom
// svg.append("text")
// 	.attr("class", "credit")
//     .attr("x", width/2)
//     .attr("y", gridSize * (days.length+1) + 80)
//     .style("text-anchor", "middle")
//     .text("Based on Miles McCrocklin's Heatmap block");

///////////////////////////////////////////////////////////////////////////
//////////////// Create the gradient for the legend ///////////////////////
///////////////////////////////////////////////////////////////////////////

//Extra scale since the color scale is interpolated
var countScale = d3.scale.linear()
	// .domain([0, d3.max(accidents, function(d) {return d.count; })])
	.domain([0,10])
	.range([0, width])

//Calculate the variables for the temp gradient
var numStops = 10;
countRange = countScale.domain();
countRange[2] = countRange[1] - countRange[0];
countPoint = [];
for(var i = 0; i < numStops; i++) {
	countPoint.push(i * countRange[2]/(numStops-1) + countRange[0]);
}//for i
		console.log(countScale);


//Create the gradient
svg.append("defs")
	.append("linearGradient")
	.attr("id", "legend-traffic")
	.attr("x1", "0%").attr("y1", "0%")
	.attr("x2", "100%").attr("y2", "0%")
	.selectAll("stop") 
	.data(d3.range(numStops))                
	.enter().append("stop") 
	.attr("offset", function(d,i) { 
		return countScale( countPoint[i] )/width;

	})   
	.attr("stop-color", function(d,i) { 
		return colorScale( countPoint[i] ); 
	});

///////////////////////////////////////////////////////////////////////////
////////////////////////// Draw the legend ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

var legendWidth = Math.min(width*0.8, 400);
//Color Legend container
var legendsvg = svg.append("g")
	.attr("class", "legendWrapper")
	.attr("transform", "translate(" + (width/2) + "," + (gridSize * days.length + 80)/2 + ")");



//Draw the Rectangle
legendsvg.append("rect")
	.attr("class", "legendRect")
	.attr("x", -legendWidth/2)
	.attr("y", 5)
	//.attr("rx", hexRadius*1.25/2)
	.attr("width", legendWidth)
	.attr("height", 10)
	.style("fill", "url(#legend-traffic)");
	

//Triangle pointer generator
var symbolGenerator = d3.svg.symbol()
						.type('triangle-up')
						.size(40);

legendsvg.append("g")
		.attr("transform", "rotate(180)")
		.append("g")
		.attr("class", "trianglepointer")
		.attr("transform","translate(0"+",0)")
		.append("path")
		.attr("d", symbolGenerator());


//Append title
legendsvg.append("text")
	.attr("class", "legendTitle")
	.attr("x", 0)
	.attr("y", -10)
	.style("text-anchor", "middle")
	.text("위반행위 횟수");

//Set scale for x-axis
var xScale = d3.scale.linear()
	 .range([-legendWidth/2, legendWidth/2])
	 // .domain([ 0, d3.max(accidents, function(d) { return d.count; })] );
	 .domain([0,10])
//Define x-axis
var xAxis = d3.svg.axis()
	  .orient("bottom")
	  .ticks(5)
	  //.tickFormat(formatPercent)
	  .scale(xScale);

//Set up X axis
legendsvg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (12) + ")")
	.call(xAxis);

