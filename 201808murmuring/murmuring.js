$(function() {
  AOS.init();
});

$(window).on('load', function() {
  AOS.refresh();
});


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
 sharefb('http://mabu.newscloud.sbs.co.kr/201808murmuring');
});

$('#twitter').on("click", function() {
 sharetwit('http://mabu.newscloud.sbs.co.kr/201808murmuring', 'SBS마부작침: 여전히 ‘낮은 목소리’ - 다큐에서 코미디까지 ‘위안부’ 영화의 오늘');
});




////// NUMBER COUNTER //////

function animateValue(id, start, end, duration) {

    var obj = document.getElementById(id);
    var range = end - start;
    var minTimer = 50;
    var stepTime = Math.abs(Math.floor(duration / range));
    
    stepTime = Math.max(stepTime, minTimer);
    
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
  
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}

animateValue("value1", 0, 685, 5000);
animateValue("value2", 0, 36, 5000);



////// INTERACTIVE GRAPH //////

$(function(){
    var $container = $('#graph1'),
        width = $container.width(),
        height = $container.height();

var vw = width / 100;

var margin = { top: -5.3*vw, right: 50, bottom: 150, left: 50 };

// SET MODAL POPUP //
  var modal = $('.modal');
  var span = $('.close')[0];

// SET THE SIZE OF INTERACTIVE GRAPH //
var graph2 = d3.select("#graph1")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "95.5%")
    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')
    .append("g")
    .attr("transform", "translate(0,"+margin.top+")")
  // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

// LOAD THE DATA // 
d3.csv("movie0813_6.csv", function(error, data) {
  // data pre-processing
  data.forEach(function(d) {
    d.y = +d["year"];
    d.x = +d["number"];
  });

  data.sort(function(a,b) { return b.r - a.r; });


var xscale = d3.scaleLinear()
  .domain([-50,50])
  .range([0,width]);

var yscale = d3.scaleLinear()
  .domain([d3.min(data, function(d){ return Math.min(d.year);}), d3.max(data, function(d){ return Math.max(d.year);})])
  .range([0,height]);

var radius = d3.scaleSqrt()
  .range([2,8]);

var xAxis = d3.axisBottom()
  .tickSize(-height)
  .scale(xscale);

var yAxis = d3.axisLeft()
  .tickSize(-width)
  .scale(yscale);


  yscale.domain(d3.extent(data, function(d) {
    return d.y;
  })).nice();

  radius.domain(d3.extent(data, function(d) {
    return d.r;
  })).nice();


  graph2.append("g")
    .attr("transform", "translate(" + width / 2 + ",0)")
    .attr("class", "y axis")
    .call(yAxis
          .ticks(73)
          .tickFormat(d3.format("d"))
    );

  var group = graph2.selectAll("g.bubble")
    .data(data)
    .enter().append("g")
    .attr("class", "bubble")
    .attr("transform", function(d) {
      return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")"
    });


// ADD CIRCLES //
  var circle = group
    .append("circle")
    .attr("r", 5.5)
    .style("opacity", 0.9)
    .style("fill", function(d, i) {
      var i = d.x;
      if (i>0) {
        return "#FF7F00";
      } else {return "#5B5A56"}
    });

// ADD LABELS OF THE CIRCLES //
  var rect = group.append("rect").attr("class", "rect");
  var text = group
    .append("text")
    .attr("class", "text")
    .attr("x", function(data) {
      if (data.number > 0) {
        return 10;
      } else { return 0; }
    })
    .attr("y", -25)
    .attr("alignment-baseline", "center")
    .attr("text-anchor", function(data) {
        if (data.number > 0) {
          return "start";
        } else { return "end"; }
    })
    .attr("dx", -5)
    .text(function(d) {
        return d["title"];
    })
    .attr("fill", function(data) {
      if (data.number > 0) {
        return "black";
      } else { return "white"; }
    })
    .each(function() {
      var bbox = this.getBBox();
        var rect = d3.select(this.parentNode).select('rect');
        rect
        .attr("x", bbox.x - 5)
        .attr("y", bbox.y -5)
        .attr("width", bbox.width + 10)
        .attr("height", bbox.height + 5)
        .style("fill", function(data) {
          if (data.number > 0) {
            return "#FF7F00";
          } else { return "#403f3d"; }
        })
    });

// MOUSEOVER EVENT //
  group.on("mouseover", function(type) {
      d3.selectAll(".bubble")
        .style("opacity", 0.4);
      d3.select(this)
        .style("opacity", 1);
      d3.selectAll(".circle")
        .style("opacity", 0.4);
  })
    .on("mouseout", function(d) {
      d3.selectAll(".y")
        .style("opacity", 1);
      d3.selectAll(".bubble")
        .style("opacity", 1);
      d3.selectAll(".line")
        .style("opacity", 0.5);
    });

// MOUSE CLICK EVENT : MODAL POPUP //
  group.on("click", function(type) {
    // console.log(type);
    modal.css('display', 'block');
    
    $('.modal-movie-poster', modal).attr("src", type.poster);

    $('.modal-movie-header-title', modal).text(type.title);
    $('.modal-movie-header-date', modal).text(type.year);

    $('.director .content', modal).text(type.director);
    $('.genre .content', modal).text(type.genre);
    $('.location .content', modal).text(type.location);
    $('.field .content', modal).text(type.field);
    $('.boxoffice .content', modal).text(type.boxoffice);
    $('.info a', modal).attr("href", type.info);

  });

// CLOSE THE MODAL POPUP //
  span.onclick = function() {
    modal.css('display', 'none');
  };
  // $(window).on("click", function(event) {
  //   if (event.target == modal) {
  //     modal.css('display', 'none');
  //     console.log("CLICKED");
  //   }
  // });

// ADD MAJOR HISTORICAL EVENTS : LINES AND TEXTS //
  group.append("line")
    .data(data)
    .attr("class", "major-events")
    .attr("x1", function(data) {
      if (data.events == null) {
        return 0;
      }
      else if (data.events !== null && data.number > 0) {
        return data.x+10;
      } else {
        return data.x-10;
      }
    })
    .attr("y1", 0)
    .attr("x2", function(data, d, i) {
      var i = d.x;
      if (data.events == null) {
        return 0;
      } else if (data.events !== null && data.number < 0) {
        return -width / 2 + 230 + 18 * -(data.number-1);
      } else {
        return width / 2 - 230 - 18 * (data.number-1);
      }
    })
    .attr("y2", 0)
    .style("opacity", 0.5)
    .attr("stroke-width", "0.5px")
    .attr("stroke", "#403f3d");
    
    group
    .append("text")
    .data(data)
    .attr("class", "major-events-text")
    .attr("x", function(data, d, i) {
      var i = d.x;
      if (data.events == null) {
        return 0;
      } else if (data.events !== null && data.number < 0) {
        return -width / 2 + 225 + 18 * -(data.number-1);
      } else {
        return width / 2 - 225 - 18 * (data.number-1);
      }
    })
    .attr("y", 6)
    .text(function(data) { return data.events; })
    .style("opacity", 1)
    .style("font-size", "0.8vw")
    .attr("text-anchor", function(data, d, i) {
      var i = d.x;
      if (data.events == null) {
        return 0;
      } else if (data.events !== null && data.number < 0) {
        return "end";
      } else {
        return "start";
      }
    })
    .style("font-family", "Spoqa Han Sans")
    .style("font-weight", 300)
    .style("letter-spacing", "-1.5px")
    .style("fill", "#403f3d");

  }); // END OF d3.csv
}); // END OF $(function)


////// INFOGRAPHIC: STICK A DIV //////

$(document).ready(function() {

  var ch1 = $("#chapter1");
  var ch2 = $("#chapter2");
  var ch3 = $("#chapter3");
  var s = $("#sticker");
  var graph0 = $('#info-graph-0');
  var graph1 = $('#info-graph-1');
  var graph2 = $('#info-graph-2');
  var graph3 = $('#info-graph-3');
  var description0 = $('#info-description-0');
  var description1 = $('#info-description-1');
  var description2 = $('#info-description-2');
  var description3 = $('#info-description-3');
  var intro = $('#intro');
  var intro1 = $('#intro1');
  var intro2 = $('#intro2');
  var intro3 = $('#intro3');

  var ch1top = ch1.position().top;
  var ch2top = ch2.position().top;
  var ch3top = ch3.position().top;
  var sTop = s.position().top;
  var graph0top = ch2top + graph0.position().top;
  var graph1top = ch2top + graph1.position().top;
  var graph2top = ch2top + graph2.position().top;
  var graph3top = ch2top + graph3.position().top;
  var description0top = ch2top + description0.position().top;
  var description1top = ch2top + description1.position().top;
  var description2top = ch2top + description2.position().top;
  var description3top = ch2top + description3.position().top;
  var introTop = intro.position().top;
  var intro1top = introTop + intro1.position().top;
  var intro2top = introTop + intro2.position().top;
  var intro3top = introTop + intro3.position().top;  

// console.log(introTop, intro1top, intro2top, intro3top);

  // var stickermax = $(document).outerHeight() - ch3.outerHeight() - graph0.outerHeight();

  $(window).scroll(function() {

    var windowTop = $(window).scrollTop();
    var windowBottom = windowTop + graph1.height();


    // console.log(windowTop, windowBottom);
    // if (windowTop >= $("#chapter2").position().top && windowTop < stickermax) {
    //   graph1.attr("style", ""); //kill absolute positioning
    //   graph1.addClass("stick"); //stick it

    // } else if (windowTop >= stickermax) {
    //   graph1.removeClass(); //un-stick
    //   graph1.css({position: "absolute", top: stickermax + "px"});

    // } else {
    //   graph1.removeClass(); //top of page

    // }



var resetClass = function() {
  graph0.removeClass();
  graph1.removeClass();
  graph2.removeClass();
  graph3.removeClass();
};



    if (windowTop >= graph0top && windowTop < description0top) {
      // console.log("GRAPH0");

        graph0.attr("style", "");
        graph0.addClass("stick");

        resetClass();

        graph0.attr("style", "");
        graph0.addClass("stick");
        graph1.addClass("hide");
        graph2.addClass("hide");
        graph3.addClass("hide");

    } else if (windowTop >= description0top && windowTop < description2top) {
      // console.log("GRAPH1");
        resetClass();

        graph1.attr("style", "");
        graph1.addClass("stick");
        graph0.addClass("hide");        
        graph2.addClass("hide");
        graph3.addClass("hide");

    } else if (windowTop >= description2top && windowTop < description3top) {
      // console.log("GRAPH2");
        resetClass();

        graph2.attr("style", "");
        graph2.addClass("stick");
        graph0.addClass("hide"); 
        graph1.addClass("hide");
        graph3.addClass("hide");

    } else if (windowTop >= description3top && windowTop < ch3top) {
      // console.log("GRAPH3");
        resetClass();

        graph3.attr("style", "");
        graph3.addClass("stick");
        graph0.addClass("hide"); 
        graph1.addClass("hide");
        graph2.addClass("hide");

    } else if (windowTop >= ch3top) {
      // console.log("BOTTOM OF THE GRAPH");
        graph3.removeClass();
        graph3.css({position: "absolute", bottom: description3top + "px"});

    } else {
      // console.log("BEYOND THE GRAPH");
        resetClass();
    };


  }); // END OF scroll(function)
}) // END OF ready(function)
