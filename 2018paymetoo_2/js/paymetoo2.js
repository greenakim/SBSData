$(function() {
  AOS.init();
});

$(window).on('load', function() {
  AOS.refresh();
});

$(document).ready(function() {
// Google analytics
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
   ga('create','UA-53828044-1','auto');
   ga('require', 'displayfeatures');
   ga('send','pageview');
});

// SNS link
function sharefb(url) {
 window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
};

function sharetwit(url, text) {
 window.open('http://twitter.com/intent/tweet?text=' + text + '&url=' + url);
};

$('#facebook').on("click", function() {
 sharefb('http://mabu.newscloud.sbs.co.kr/2018paymetoo_2');
});

$('#twitter').on("click", function() {
 sharetwit('http://mabu.newscloud.sbs.co.kr/2018paymetoo_2', 'SBS마부작침: 페이 미투③ 페이갭 최악 공공기관 정부법무공단...최악의 부처 중소벤처기업부');
});

$(document).ready(function(){
// $(document).ready(function(){
  var windowWidth = $(window).width();

    // if (windowWidth < 640) {
    //   window.sr = ScrollReveal();
    //   sr.reveal('.articlebox');
    // }




  $(window).scroll(function() {

        var winScroll = $(window).scrollTop();
        var docheight = $(document).height();
        var winheight = $(window).height();
        // console.log(winScroll);
// Progress Bar
        var totalScroll = (winScroll/(docheight - winheight)) * 100;
        $("#bar").css("width", totalScroll + "%");

    });
        

    });


///////////////////////////////////////////////////////////////////////////////

// Hide and Show Navigation bar on Scroll

window.addEventListener("scroll", function() {
  if(window.pageYOffset > 1000 && window.pageYOffset < 12000 && $(window).width() > 639 ) {
    $('.navbar').css('display', 'block');
  } else {
    $('.navbar').css('display', 'none');
  }
}, false);


$("#article5_1").css("z-index", "999");
$("#article5_2").css("z-index", "999");
$("#article8").css("z-index", "999");
$("footer").css("z-index", "999");

///////////////////////////////////////////////////////////////////////////////

// Navigation bar on click Scroll Move & Animate

$(".navbar a").on('click', function (e) {
  var targetSec = $(this).attr("data-target");
  $('html, body').animate({
    scrollTop: $(targetSec).offset().top
  }, 500)
});




///////////////////////////////////////////////////////////////////////////////

/////////////////////////  G R A P H  /////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

// 1 // Beeswarm plot

if ($(window).width() > 639) {
var w = $("#svganchor").width(),
    h = $("#svganchor").height();

      var padding = [0, 40, 34, 40];
      var r = 5;

      var xScale = d3.scaleLinear()
        .range([ padding[3], w - padding[1] ]);

      var xAxis = d3.axisBottom(xScale)
        .ticks(10, ".0s")
        .tickSizeOuter(0);

      var formatNumber = d3.format(",");

      var tt = d3.select("#svganchor").append("div")  
        .attr("class", "tooltip")       
        .style("opacity", 0);

        var svg = d3.select("#svganchor")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

      // var svg = d3.select("#svganchor")
      //   .append("svg")
      //     .attr('width', '100%')
      //     .attr('height', '100%')
      //     .attr('viewBox', '0 0 '+Math.min(w, h) +' '+Math.min(w, h))
      //     .attr('preserveAspectRatio', 'xMinYMin')
      //     .append("g")
      //     .attr("transform", "translate(" + Math.min(w, h) / 2 + "," + Math.min(w, h) /2 + ")");


      // var xline = svg.append("line")
      //   .attr("stroke", "gray")
      //   .attr("stroke-dasharray", "1,2");

      var chartState = {};

      chartState.variable = "totalEmission";
      chartState.scale = "scaleLinear";
      chartState.legend = "페이갭(%)";

      d3.csv("180517paygap64.csv", function(error, data) {
        if (error) throw error;

        var dataSet = data;

        xScale.domain(d3.extent(data, function(d) { return +d.totalEmission; }));

        // svg.append("g")
        //       .attr("class", "x axis")
        //       .attr("transform", "translate(0," + (h - padding[2]) + ")")
        //       .call(xAxis);

            var legend = svg.append("text")
              .attr("text-anchor", "middle")
              .attr("x", w / 2)
              .attr("y", h - 4)
              .attr("font-family", "PT Sans")
              .attr("font-size", 12)
              .attr("fill", "darkslategray")
              .attr("fill-opacity", 1)
              .attr("class", "legend");

        redraw(chartState.variable);


        function redraw(variable){

          // if (chartState.scale == "scaleLinear"){ xScale = d3.scaleLinear().range([ padding[3], w - padding[1] ]);}

          // if (chartState.scale == "scaleLog"){ xScale = d3.scaleLog().range([ padding[3], w - padding[1] ]);}

          xScale.domain(d3.extent(dataSet, function(d) { return +d[variable]; }));

          var xAxis = d3.axisBottom(xScale)
            .ticks(10, ".0s")
            .tickSizeOuter(0);

          // d3.transition(svg).select(".x.axis").transition().duration(1000)
          //       .call(xAxis);

          var simulation = d3.forceSimulation(dataSet)
            .force("x", d3.forceX(function(d) { return xScale(+d[variable]); }).strength(2))
              .force("y", d3.forceY((h / 2)-padding[2]/2))
              .force("collide", d3.forceCollide(r * 1.333))
              .stop();

          for (var i = 0; i < dataSet.length; ++i) simulation.tick();

          var countriesCircles = svg.selectAll(".countries")
            .data(dataSet, function(d) { return d.countryCode});

          countriesCircles.exit()
            .transition()
              .duration(1000)
              .attr("cx", 0)
            .attr("cy", (h / 2)-padding[2]/2)
            .remove();

          countriesCircles.enter()
            .append("circle")
            .attr("class", "countries")
            .attr("cx", 0)
            .attr("cy", (h / 2)-padding[2]/2)
            .attr("r", r)
            .attr("fill", function(d){ 
              if ( d[variable] > 0 &&  d[variable] < 30 ) { 
                return "#B48ED6";
            } else if ( d[variable] > 30  && d[variable] < 40 || d[variable] ==  30) {
                return "#A400C1";
            } else if ( d[variable] > 40  && d[variable] < 50 || d[variable] == 40) {
                return "#7F0646";
            } else if ( d[variable] > 50 || d[variable] == 50 ) {
                return "#EF2B2B";
            } else if (d[variable] < 0 ) {
              return "#17BEBB";
            } else if ( d[variable] == 0 ) {
              return "#F7B206";
            }})
            .merge(countriesCircles)
            .transition()
              .duration(2000)
              .attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });

          // legend.text(chartState.legend);

            d3.selectAll(".countries").on("mousemove", function(d) {
            tt.html("<strong>" + d.countryName + "</strong><br>중분류 <strong>" + d.continent
            + "</strong> <br>페이갭 <strong>" + formatNumber(d[variable]) + "%</strong>")
              .style('top', d3.event.pageY - 12 + 'px')
              .style('left', d3.event.pageX + 25 + 'px')
              .style("opacity", 0.9);

              // xline.attr("x1", d3.select(this).attr("cx"))
              //   .attr("y1", d3.select(this).attr("cy"))
              //   .attr("y2", (h - padding[2]))
              //   .attr("x2",  d3.select(this).attr("cx"))
              //   .attr("opacity", 1);

          }).on("mouseout", function(d) {
            tt.style("opacity", 0);
            // xline.attr("opacity", 0);
          });

        //end of redraw
        }

      //end of d3.csv
      });


};

///////////////////////////////////////////////////////////////////////////////

// 2 // paygap over 50% plot

var $graph = $("#graph50");
var width = $graph.width(),
    height = $graph.height();

var margin = { top: 10, bottom: 0, left: 0, right: 0 }

var svg2 = d3.select("#graph50")
            .append("svg")
            .attr("width", "90%")
            .attr("height", "110%")
            .attr('viewBox', '0 0 '+Math.min(width, height) +' '+Math.min(width, height))
            .attr('preserveAspectRatio', 'xMinYMin')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            // .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) /2 + ")");

      d3.csv("4555.csv", function(error, data) {
        if (error) throw error;

var data = data;
          var circleElements;

          circleElements = svg2.selectAll("circle")
                                .data(data);

          // r = f
          // circleElements.enter()
          //     .append("circle")
          //     .attr("class", "circle")
          //     .attr("cx", function (d) { return d.paygap * 10; })
          //     .attr("cy", function(d, i) {
          //       if (d.f > 10000) {
          //           return height;
          //       } else {
          //       return i * 15;
          //     }
          //     })
          //     .attr("r", function (d) { return d.f / 50; })
          //     .style("fill", "#FE5F55")
          //     .style("opacity", 0.5);

          // r = n
          circleElements.enter()
              .append("circle")
              .attr("class", "circle")
              .attr("cx", function (d) { return d.paygap * 10 - 50; })
              .attr("cy", function (d, i) { return i * 22.5 + 25 ; })
              // .attr("r",function (d) { return d.f / 50; })
              // .attr("r", function(d) { return d.paygap; })
              .attr("r", function(d) { return d.f_rate; })
              .style("fill", "#EF4743")
              .style("opacity", function (d) { return 1 - d.f_rate / 100; });


          var circleName = svg2.append("g")
                              .attr("class", "cName")
                              .selectAll("cName")
                              .data(data);

         var pp = svg2.append("g")
                              .attr("class", "fNum")
                              .selectAll("fNum")
                              .data(data);

          var t = svg2.append("div")
                          .attr("class","tip")
                          .data(data);



           circleName.enter()
                       .append("text")
                        .attr("x", function (d) { return d.paygap * 10 - 60; })
                        .attr("y", function(d, i) { return i * 22.5 + 25; })
                        .text( function (d) { return d.corpName; } )
                        .attr("text-anchor", "end")
                        .style("fill", "#47413d")
                        .attr("dy", 5)
                        .style("font-size", "1rem")
                        .style("font-family", "Spoqa Han Sans")
                        .style("letter-spacing", "-0.3px")
                        .style("font-weight", 400)


              pp.enter()
                       .append("text")
                        .attr("x", function (d) { return d.paygap * 10 - 40; })
                        .attr("y", function(d, i) { return i * 22.5 + 25; })
                        .text( function (d) { return d.paygap + "%"; } )
                        .attr("text-anchor", "start")
                        .style("fill", "#47413d")
                        .attr("dy", 5)
                        .style("font-size", "1rem")
                        .style("font-family", "Spoqa Han Sans")
                        .style("letter-spacing", "-0.3px")
                        .style("font-weight", 400);





          d3.selectAll(".circle").on("mousemove", function (d, i) {
            // d3.select(this).transition().duration(500).attr("r", function(d) { return d.f /10 ; })
                            // .style("opacity", 0.6);

                d3.select(this).transition().duration(300).style("opacity", 1);


          })
          .on("mouseout", function (d) {
            // d3.select(this).transition().duration(1200).attr("r", 7)
                            // .style("opacity", 1);
                            d3.select(this).transition().duration(1000).style("opacity", 0.8);
          });
});// end of d3.csv




///////////////////////////////////////////////////////////////////////////////

// 3 // beeswarm plot for 30 groups