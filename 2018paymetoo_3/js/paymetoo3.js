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
 sharefb('http://mabu.newscloud.sbs.co.kr/2018paymetoo_3');
});

$('#twitter').on("click", function() {
 sharetwit('http://mabu.newscloud.sbs.co.kr/2018paymetoo_3', 'SBS마부작침: 페이 미투③ 페이갭 최악 공공기관 정부법무공단...최악의 부처 중소벤처기업부');
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
  if(window.pageYOffset > 1000 && window.pageYOffset < 11200 && $(window).width() > 639 ) {
    $('.navbar').css('display', 'block');
  } else {
    $('.navbar').css('display', 'none');
  }
}, false);

if ($(window).width() < 640) {
  $('.navbar').css('display', 'none');
};



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
