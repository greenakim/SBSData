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
 sharefb('http://mabu.newscloud.sbs.co.kr/2018paymetoo_1');
});

$('#twitter').on("click", function() {
 sharetwit('http://mabu.newscloud.sbs.co.kr/2018paymetoo_1', 'SBS마부작침: 페이 미투① 2017년 여성 연봉은 남성보다 1,584만 원이나 적었다');
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



$("#article3").css("z-index", "999");
$("#article5_1").css("z-index", "999");
$("#article8").css("z-index", "999");
$("#footerbar").css("z-index", "999");
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

// 1 // Bar chart: 17 Category

var svg2 = d3.select("#graph2"),
    margin2 = {top: 20, right: 20, bottom: 150, left: 30},
    width2 = +svg2.attr("width") - margin2.left - margin2.right,
    height2 = +svg2.attr("height") - margin2.top - margin2.bottom;


var x2 = d3.scaleBand().rangeRound([0, width2]).padding(0.1),
    y2 = d3.scaleLinear().rangeRound([height2, 0]);


var g2 = svg2.append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var graph2 = d3.csv("20180519category17.csv", function(d) {
  d.paygap = +d.paygap;
  return d;
}, function(error, data) {
  if (error) throw error;
 
  x2.domain(data.map(function(d) { return d.category; }));
  // y.domain([0, d3.max(data, function(d) { return d.paygap; })]);
  var yAxis = y2.domain([0,0.5]);

  g2.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");

  g2.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y2).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("paygap");


  var bar2 = g2.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x2(d.category); })
      .attr("y", height2)
      .attr("width", x2.bandwidth())
      .attr("height", 0)

    bar2.transition()
      .duration(2000)
      .attr("y", function(d) { return y2(d.paygap); })
      .attr("height", function(d) { return (height2 - y2(d.paygap)) ; });



var toolTip2 = g2.append("text")
                  .attr("class", "toolTip2")
                  .attr("x", width2)
                  .attr("y", 0)
                  .text("전체산업 31.7%")
                  .style("opacity", 1)
                  .attr("text-anchor", "end")
                  .attr("dy", 10)
                  .style("font-size", "1rem")
                  .style("font-family", "Spoqa Han Sans")
                  .style("letter-spacing", "-0.5px")
                  .style("font-weight", 400);

    bar2.on("mousemove", function(d) {
        toolTip2.style("opacity", 1)
        .html( d.category + " <br> " + Math.floor(d.paygap * 1000) / 10 + "%" )
      })
      .on("mouseout", function(d) { 
        toolTip2.style("opacity", 1)
                .text("전체산업 31.7%");

      });

  var totalValue2 = function(d) { return y2(0.317); };
  g2.append("line")
    .attr("class", "totalLine1")
    .attr("x1", 0)
    .attr("x2", width2)
    .attr("y1", totalValue2)
    .attr("y2", totalValue2) 
    .attr("stroke-width", "2px")
    .attr("stroke", "#f7b206");

}); // end of d3.csv



///////////////////////////////////////////////////////////////////////////////

// 2 // Bar chart: 64 Category


  var colors = d3.scaleOrdinal()
    .domain(["건설업", "광업", "교육 서비스업", "금융 및 보험업", 
      "농업, 임업 및 어업", "도매 및 소매업", "부동산업", 
      "사업시설 관리, 사업 지원 및 임대 서비스업", 
      "수도, 하수 및 폐기물 처리 원료 재생업", 
      "숙박 및 음식점업", "예술, 스포츠 및 여가관련 서비스업",
      "운수 및 창고업", "전기, 가스, 증기 및 공기 조절 공급업",
      "천문, 과학 및 기술 서비스업", "정보통신업",
      "제조업", "협회 및 단체, 수리 및 기타 개인 서비스업"])
    .range(["#D66E87", "#1D1B7F", "#F2BD88", "#EF7726", 
        "#FF595E", "#225560", "#4D5D8F", "#BCA21D", 
        "#2E86AB", "#A998D1", "#6BAF46", "#1AC8ED", 
        "#b13f9f", "#710256", "#FFCA3A", "#1D67DE",
        "#2DB6A6"]);
    
var svg3 = d3.select("#graph3");
var margin3 = {top: 20, right: 20, bottom: 30, left: 30},
    width3 = +svg3.attr("width") - margin3.left - margin3.right,
    height3 = +svg3.attr("height") - margin3.top - margin3.bottom;


            svg3
            .append("svg")
            .attr("width", width3 + margin3.left + margin3.right)
            .attr("height", height3 + margin3.top + margin3.bottom)
            .append("g")
            .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");


var x3 = d3.scaleBand().rangeRound([0, width3]).padding(0.1),
    y3 = d3.scaleLinear().rangeRound([height3, 0]);


var g3 = svg3.append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

var graph3 = d3.csv("20180519category64.csv", function(d) {
  d.paygap = +d.paygap;
  return d;
}, function(error, data) {
  if (error) throw error;
 
var xScale3 = x3.domain(data.map(function(d) { return d.division; }));
  // y.domain([0, d3.max(data, function(d) { return d.paygap; })]);
y3.domain(d3.extent(data, function(d) { return d.paygap; })).nice();


  var xAxis3 = d3.axisBottom(x3);
  var yAxis3 = d3.axisLeft(y3).tickSize(6,0);


  g3.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + y3(0) + ")")
      .call(d3.axisBottom(x3))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");

  g3.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis3.ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("paygap");


  var bar3 = g3.selectAll(".bar3")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) {
        return "bar3 bar3--" + (d.paygap < 0 ? "negative" : "positive");
      })
      .attr("x", function(d) { return x3(d.division); })
      .attr("y", y3(0))
      .attr("width", x3.bandwidth())
      .attr("height", 0)
      .attr("fill", function(d) {
        if ( d.paygap > 0 ) {
          return ("#9B59C6");
        } else {
          return ("#17bebb");
        }
      });
    bar3.transition()
      .duration(2000)
      .attr("y", function(d) { return y3(Math.max(0, d.paygap)); })
      .attr("height", function(d) { return Math.abs(y3(d.paygap) - y3(0)); });
   

var toolTip3 = g3.append("text")
                  .attr("class", "toolTip2")
                  .attr("x", width3)
                  .attr("y", 0)
                  .text("전체산업 31.7%")
                  .style("opacity", 1)
                  .attr("text-anchor", "end")
                  .attr("dy", 10)
                  .style("font-size", "2.5rem")
                  .style("font-family", "Spoqa Han Sans")
                  .style("letter-spacing", "-2px")
                  .style("font-weight", 800);

    bar3.on("mousemove", function(d) {
        toolTip3.style("opacity", 1)
        .html( d.division + " <br> " + Math.floor(d.paygap * 1000) / 10 + "%" )
      })
      .on("mouseout", function(d) { 
        toolTip3.style("opacity", 1)
                .text("전체산업 31.7%");

      });



  var thirtyPercentLine = function(d) { return y3(0.317); };
  g3.append("line")
    .attr("class", "thirtyPercentLine")
    .attr("x1", 0)
    .attr("x2", width3)
    .attr("y1", thirtyPercentLine)
    .attr("y2", thirtyPercentLine) 
    .attr("stroke-width", "2px")
    .attr("stroke", "#f7b206");
});