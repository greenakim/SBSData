// ANIMATION ON SCROLL
$(function() {
  AOS.init();
});

$(window).on('load', function() {
  AOS.refresh();
});


// GOOGLE ANALYTICS
$(document).ready(function() {
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
   ga('create','UA-53828044-1','auto');
   ga('require', 'displayfeatures');
   ga('send','pageview');
});


// SNS LINK
function sharefb(url) {
 window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
};

function sharetwit(url, text) {
 window.open('http://twitter.com/intent/tweet?text=' + text + '&url=' + url);
};

$('#facebook').on("click", function() {
 sharefb('http://mabu.newscloud.sbs.co.kr/201807refugee');
});

$('#twitter').on("click", function() {
 sharetwit('http://mabu.newscloud.sbs.co.kr/201807refugee', 'SBS마부작침: ');
});


// PROGRESS BAR
$(document).ready(function(){

  var windowWidth = $(window).width();

  $(window).scroll(function() {

        var winScroll = $(window).scrollTop();
        var docheight = $(document).height();
        var winheight = $(window).height();

        var totalScroll = (winScroll/(docheight - winheight)) * 100;
        $("#bar").css("width", totalScroll + "%");
    
    });
});


// // NAVIGATION BAR ON CLICK SCROLL MOVE AND ANIMATE
// $(".navigator a").on('click', function (e) {
//   var targetSec = $(this).attr("data-target");
//   $('html, body').animate({
//     scrollTop: $(targetSec).offset().top
//   }, 500)
// });




// LEAFLET TIMELINE
      var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
      var osmAttrib = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' +
        'OpenStreetMap</a> contributors';
      var osm = L.tileLayer(osmUrl, {
        maxZoom: 18,
        minZoom: 1,
        attribution: osmAttrib
        // noWrap: true
      });
      var map = L.map('map', {
        layers: [osm],
        center: new L.LatLng(16.704008, 3.350995),
        zoom: 2,
        maxBounds: [[90,-180], [-90, 180]],
      });
        var timeline;
        var timelineControl;

      function refugeeData(data) {


        timeline = L.timeline(data, {
          pointToLayer: function(data, latlng) {
            return L.circleMarker(latlng, {
              radius : data.properties.people / 100000,
              color: "rgb(228,87,46)",
              fillColor: "rgb(228,87,46)"
            })
            .bindPopup(data.properties.place + "<br>" + data.properties.people + "명");
          }
          // ,waitToUpdateMap: true
        });

        timelineControl = L.timelineSliderControl({
          formatOutput: function(date) {
            return new Date(date).getFullYear() + "년";
          }
        });

        timeline.addTo(map);
        timelineControl.addTo(map);
        timelineControl.addTimelines(timeline);

      }// end of refugeeData


// SCROLLABLE BAR CHART
var svg,
      defs,
      gBrush,
      brush,
      main_xScale,
      mini_xScale,
      main_yScale,
      mini_yScale,
      main_yZoom,
      main_xAxis,
      main_yAxis,
      mini_width,
      textScale;

var data = [
{key:1, country:'독일', total_dec:2880157, total_app:2563990, rec_refugee:689961, rec_protect:374168, rate_refugee:31.7, rate_protect:48.8},
{key:2, country:'미국', total_dec:1892565, total_app:1636383, rec_refugee:402745, rec_protect:2287, rate_refugee:44.6, rate_protect:44.9},
{key:3, country:'프랑스', total_dec:1598656, total_app:1673149, rec_refugee:253692, rec_protect:59547, rate_refugee:16.5, rate_protect:20.4},
{key:4, country:'영국', total_dec:1337724, total_app:1183613, rec_refugee:224718, rec_protect:103010, rate_refugee:19.4, rate_protect:28.3},
{key:5, country:'캐나다', total_dec:474952, total_app:503233, rec_refugee:207843, rec_protect:0, rate_refugee:51.8, rate_protect:51.8},
{key:6, country:'말레이시아', total_dec:303797, total_app:351298, rec_refugee:204538, rec_protect:23847, rate_refugee:82.5, rate_protect:92.1},
{key:7, country:'우간다', total_dec:248601, total_app:292951, rec_refugee:197062, rec_protect:0, rate_refugee:87.7, rate_protect:87.7},
{key:8, country:'터키', total_dec:300818, total_app:596121, rec_refugee:149887, rec_protect:0, rate_refugee:88.1, rate_protect:88.1},
{key:9, country:'수단', total_dec:189337, total_app:206559, rec_refugee:115426, rec_protect:6834, rate_refugee:88.6, rate_protect:93.8},
{key:10, country:'케냐', total_dec:293560, total_app:313736, rec_refugee:114382, rec_protect:2053, rate_refugee:80.3, rate_protect:81.7},
{key:11, country:'오스트리아', total_dec:429107, total_app:461770, rec_refugee:104253, rec_protect:28353, rate_refugee:39.6, rate_protect:50.3},
{key:12, country:'남아프리카공화국', total_dec:1666115, total_app:1438705, rec_refugee:83496, rec_protect:552, rate_refugee:11.2, rate_protect:11.3},
{key:13, country:'이란', total_dec:237470, total_app:249471, rec_refugee:83305, rec_protect:3940, rate_refugee:35.4, rate_protect:37.1},
{key:14, country:'스웨덴', total_dec:932916, total_app:865354, rec_refugee:81110, rec_protect:222390, rate_refugee:10.2, rate_protect:38.2},
{key:15, country:'에티오피아', total_dec:92358, total_app:95260, rec_refugee:78173, rec_protect:1, rate_refugee:94.9, rate_protect:94.9},
{key:16, country:'벨기에', total_dec:342842, total_app:489470, rec_refugee:75771, rec_protect:17978, rate_refugee:25.3, rate_protect:31.3},
{key:17, country:'이집트', total_dec:141843, total_app:196564, rec_refugee:70512, rec_protect:751, rate_refugee:64.9, rate_protect:65.6},
{key:18, country:'호주', total_dec:236838, total_app:275106, rec_refugee:65678, rec_protect:0, rate_refugee:29.4, rate_protect:29.4},
{key:19, country:'스위스', total_dec:589297, total_app:457668, rec_refugee:64828, rec_protect:137394, rate_refugee:16.8, rate_protect:52.3},
{key:20, country:'네덜란드', total_dec:526783, total_app:349766, rec_refugee:57889, rec_protect:108399, rate_refugee:15.2, rate_protect:43.6},
{key:21, country:'부룬디', total_dec:98838, total_app:101896, rec_refugee:54185, rec_protect:355, rate_refugee:81, rate_protect:81.5},
{key:22, country:'노르웨이', total_dec:323240, total_app:298637, rec_refugee:47143, rec_protect:40395, rate_refugee:17.6, rate_protect:32.6},
{key:23, country:'에콰도르', total_dec:181644, total_app:191980, rec_refugee:46745, rec_protect:13785, rate_refugee:35.5, rate_protect:46},
{key:24, country:'요르단', total_dec:72864, total_app:125267, rec_refugee:41706, rec_protect:67, rate_refugee:77.6, rate_protect:77.7},
{key:25, country:'이탈리아', total_dec:540908, total_app:637846, rec_refugee:40162, rec_protect:162764, rate_refugee:7.8, rate_protect:39.6},
{key:26, country:'르완다', total_dec:43408, total_app:43020, rec_refugee:36661, rec_protect:3100, rate_refugee:89.3, rate_protect:96.8},
{key:27, country:'인도', total_dec:62242, total_app:72740, rec_refugee:35864, rec_protect:0, rate_refugee:73.1, rate_protect:73.1},
{key:28, country:'덴마크', total_dec:113343, total_app:127195, rec_refugee:29335, rec_protect:20956, rate_refugee:26.9, rate_protect:46.1},
{key:29, country:'태국', total_dec:98269, total_app:110707, rec_refugee:26226, rec_protect:33148, rate_refugee:35.7, rate_protect:80.8},
{key:30, country:'탄자니아', total_dec:28136, total_app:59796, rec_refugee:25435, rec_protect:0, rate_refugee:95.8, rate_protect:95.8},
{key:31, country:'레바논', total_dec:53955, total_app:64155, rec_refugee:25348, rec_protect:2401, rate_refugee:60.3, rate_protect:66},
{key:32, country:'카메룬', total_dec:61743, total_app:66957, rec_refugee:24506, rec_protect:0, rate_refugee:64.3, rate_protect:64.3},
{key:33, country:'잠비아', total_dec:30671, total_app:35205, rec_refugee:23857, rec_protect:76, rate_refugee:89.8, rate_protect:90},
{key:34, country:'가나', total_dec:61746, total_app:59931, rec_refugee:23203, rec_protect:1036, rate_refugee:93.1, rate_protect:97.3},
{key:35, country:'그리스', total_dec:366851, total_app:373919, rec_refugee:21997, rec_protect:12089, rate_refugee:9.4, rate_protect:14.5},
{key:36, country:'인도네시아', total_dec:44209, total_app:48223, rec_refugee:17920, rec_protect:61, rate_refugee:83.8, rate_protect:84.1},
{key:37, country:'짐바브웨', total_dec:29724, total_app:31766, rec_refugee:16408, rec_protect:1215, rate_refugee:85.5, rate_protect:91.8},
{key:38, country:'파키스탄', total_dec:69727, total_app:57594, rec_refugee:14243, rec_protect:0, rate_refugee:32.9, rate_protect:32.9},
{key:39, country:'시리아', total_dec:51831, total_app:62883, rec_refugee:13804, rec_protect:260, rate_refugee:46.5, rate_protect:47.4},
{key:40, country:'차드', total_dec:16197, total_app:17573, rec_refugee:13633, rec_protect:138, rate_refugee:93.2, rate_protect:94.2},
{key:41, country:'불가리아', total_dec:72935, total_app:78962, rec_refugee:12529, rec_protect:10836, rate_refugee:36.6, rate_protect:68.2},
{key:42, country:'예멘', total_dec:42368, total_app:51426, rec_refugee:12479, rec_protect:1194, rate_refugee:64.3, rate_protect:70.5},
{key:43, country:'말라위', total_dec:57183, total_app:78822, rec_refugee:12060, rec_protect:68, rate_refugee:73, rate_protect:73.4},
{key:44, country:'아일랜드', total_dec:136615, total_app:132365, rec_refugee:11722, rec_protect:377, rate_refugee:12, rate_protect:12.4},
{key:45, country:'핀란드', total_dec:90725, total_app:89494, rec_refugee:10501, rec_protect:15553, rate_refugee:17.7, rate_protect:43.9},
{key:46, country:'코스타리카', total_dec:34544, total_app:39525, rec_refugee:10309, rec_protect:3213, rate_refugee:36.1, rate_protect:47.4},
{key:47, country:'리비아', total_dec:18124, total_app:36671, rec_refugee:9729, rec_protect:365, rate_refugee:86.8, rate_protect:90.1},
{key:48, country:'기니', total_dec:21412, total_app:20592, rec_refugee:9567, rec_protect:49, rate_refugee:80.9, rate_protect:81.3},
{key:49, country:'지부티', total_dec:12811, total_app:21668, rec_refugee:8982, rec_protect:29, rate_refugee:82.1, rate_protect:82.4},
{key:50, country:'멕시코', total_dec:24034, total_app:36321, rec_refugee:8921, rec_protect:243, rate_refugee:55.7, rate_protect:57.2},
{key:51, country:'기니비사우', total_dec:9384, total_app:9506, rec_refugee:7953, rec_protect:1, rate_refugee:96.3, rate_protect:96.3},
{key:52, country:'브라질', total_dec:20637, total_app:85700, rec_refugee:7722, rec_protect:933, rate_refugee:49.8, rate_protect:55.8},
{key:53, country:'베네수엘라', total_dec:35726, total_app:35822, rec_refugee:7437, rec_protect:0, rate_refugee:26.7, rate_protect:26.7},
{key:54, country:'나이지리아', total_dec:11454, total_app:20098, rec_refugee:5733, rec_protect:266, rate_refugee:68.8, rate_protect:72},
{key:55, country:'베냉', total_dec:15477, total_app:11937, rec_refugee:4899, rec_protect:0, rate_refugee:38.3, rate_protect:38.3},
{key:56, country:'스페인', total_dec:100095, total_app:143209, rec_refugee:4863, rec_protect:16011, rate_refugee:7.5, rate_protect:32.3},
{key:57, country:'타지키스탄', total_dec:13002, total_app:11357, rec_refugee:4801, rec_protect:0, rate_refugee:61.2, rate_protect:61.2},
{key:58, country:'몰타', total_dec:26547, total_app:28215, rec_refugee:4294, rec_protect:11288, rate_refugee:17.7, rate_protect:64.1},
{key:59, country:'튀니지', total_dec:6657, total_app:6781, rec_refugee:4189, rec_protect:0, rate_refugee:80.6, rate_protect:80.6},
{key:60, country:'콩고공화국', total_dec:15984, total_app:22861, rec_refugee:4121, rec_protect:47, rate_refugee:60.6, rate_protect:61.3},
{key:61, country:'키르기스스탄', total_dec:9667, total_app:9552, rec_refugee:4062, rec_protect:198, rate_refugee:64.2, rate_protect:67.4},
{key:62, country:'폴란드', total_dec:173289, total_app:163637, rec_refugee:3985, rec_protect:15095, rate_refugee:5.3, rate_protect:25.4},
{key:63, country:'말리', total_dec:7687, total_app:7500, rec_refugee:3887, rec_protect:0, rate_refugee:89.4, rate_protect:89.4},
{key:64, country:'우크라이나', total_dec:31858, total_app:38195, rec_refugee:3811, rec_protect:994, rate_refugee:21.2, rate_protect:26.7},
{key:65, country:'중앙아프리카공화국', total_dec:19042, total_app:18356, rec_refugee:3809, rec_protect:9659, rate_refugee:23.9, rate_protect:84.5},
{key:66, country:'보츠와나', total_dec:6543, total_app:6402, rec_refugee:3792, rec_protect:12, rate_refugee:71.3, rate_protect:71.5},
{key:67, country:'뉴질랜드', total_dec:18959, total_app:14138, rec_refugee:3680, rec_protect:0, rate_refugee:19.8, rate_protect:19.8},
{key:68, country:'루마니아', total_dec:26470, total_app:27512, rec_refugee:3611, rec_protect:2317, rate_refugee:16.4, rate_protect:27},
{key:69, country:'모잠비크', total_dec:19589, total_app:40778, rec_refugee:3599, rec_protect:1, rate_refugee:76.6, rate_protect:76.6},
{key:70, country:'러시아', total_dec:501630, total_app:503149, rec_refugee:3428, rec_protect:438142, rate_refugee:0.7, rate_protect:93},
{key:71, country:'소말리아', total_dec:28452, total_app:41266, rec_refugee:3368, rec_protect:3, rate_refugee:56.6, rate_protect:56.7},
{key:72, country:'룩셈부르크', total_dec:28845, total_app:26783, rec_refugee:3242, rec_protect:2719, rate_refugee:14.2, rate_protect:26.1},
{key:73, country:'우즈베키스탄', total_dec:5946, total_app:5670, rec_refugee:3153, rec_protect:1, rate_refugee:80.8, rate_protect:80.9},
{key:74, country:'아제르바이잔', total_dec:17965, total_app:17618, rec_refugee:3054, rec_protect:532, rate_refugee:37.9, rate_protect:44.5},
{key:75, country:'체코', total_dec:87308, total_app:85281, rec_refugee:2823, rec_protect:2238, rate_refugee:5.7, rate_protect:10.2},
{key:76, country:'아랍에미리트', total_dec:3840, total_app:5386, rec_refugee:2549, rec_protect:29, rate_refugee:83.3, rate_protect:84.3},
{key:77, country:'헝가리', total_dec:312728, total_app:321398, rec_refugee:2501, rec_protect:6548, rate_refugee:5.6, rate_protect:20.3},
{key:78, country:'모리타니', total_dec:6480, total_app:7144, rec_refugee:2466, rec_protect:7, rate_refugee:51.8, rate_protect:51.9},
{key:79, country:'모로코', total_dec:21751, total_app:23772, rec_refugee:2385, rec_protect:19, rate_refugee:19, rate_protect:19.2},
{key:80, country:'스리랑카', total_dec:4910, total_app:5521, rec_refugee:2360, rec_protect:0, rate_refugee:67.5, rate_protect:67.5},
{key:81, country:'앙골라', total_dec:7785, total_app:19979, rec_refugee:2251, rec_protect:9, rate_refugee:60, rate_protect:60.2},
{key:82, country:'캄보디아', total_dec:5126, total_app:5123, rec_refugee:2198, rec_protect:0, rate_refugee:50.8, rate_protect:50.8},
{key:83, country:'아르헨티나', total_dec:13820, total_app:14998, rec_refugee:2018, rec_protect:36, rate_refugee:20.9, rate_protect:21.3},
{key:84, country:'나미비아', total_dec:5998, total_app:7645, rec_refugee:1999, rec_protect:10, rate_refugee:61.8, rate_protect:62.1},
{key:85, country:'코트디부아르', total_dec:15628, total_app:14901, rec_refugee:1997, rec_protect:7556, rate_refugee:16.4, rate_protect:78.6},
{key:86, country:'콩고민주공화국', total_dec:6523, total_app:7162, rec_refugee:1815, rec_protect:288, rate_refugee:53.6, rate_protect:62.1},
{key:87, country:'키프로스', total_dec:85585, total_app:90734, rec_refugee:1781, rec_protect:7974, rate_refugee:3.1, rate_protect:17},
{key:88, country:'쿠웨이트', total_dec:5687, total_app:6649, rec_refugee:1729, rec_protect:7, rate_refugee:75.6, rate_protect:75.9},
{key:89, country:'카자흐스탄', total_dec:4936, total_app:4119, rec_refugee:1714, rec_protect:522, rate_refugee:46.2, rate_protect:60.2},
{key:90, country:'이라크', total_dec:8946, total_app:21002, rec_refugee:1601, rec_protect:429, rate_refugee:59.5, rate_protect:75.4},
{key:91, country:'페루', total_dec:5026, total_app:42535, rec_refugee:1515, rec_protect:3, rate_refugee:46.4, rate_protect:46.5},
{key:92, country:'토고', total_dec:14024, total_app:14257, rec_refugee:1479, rec_protect:10813, rate_refugee:11.3, rate_protect:93.8},
{key:93, country:'칠레', total_dec:4111, total_app:12884, rec_refugee:1472, rec_protect:84, rate_refugee:40.9, rate_protect:43.2},
{key:94, country:'파나마', total_dec:11071, total_app:18196, rec_refugee:1337, rec_protect:192, rate_refugee:54, rate_protect:61.8},
{key:95, country:'아르메니아', total_dec:3525, total_app:3602, rec_refugee:1211, rec_protect:888, rate_refugee:48, rate_protect:83.3},
{key:96, country:'네팔', total_dec:6215, total_app:6115, rec_refugee:1047, rec_protect:2242, rate_refugee:25.6, rate_protect:80.3},
{key:97, country:'이스라엘', total_dec:40348, total_app:59576, rec_refugee:964, rec_protect:14902, rate_refugee:3.4, rate_protect:56.3},
{key:98, country:'홍콩특별행정구', total_dec:14473, total_app:16782, rec_refugee:846, rec_protect:40, rate_refugee:9.8, rate_protect:10.2},
{key:99, country:'시에라리온', total_dec:2126, total_app:1286, rec_refugee:808, rec_protect:27, rate_refugee:72.9, rate_protect:75.3},
{key:100, country:'나우루', total_dec:1243, total_app:1567, rec_refugee:786, rec_protect:0, rate_refugee:69.7, rate_protect:69.7},
{key:101, country:'중화인민공화국', total_dec:3139, total_app:3828, rec_refugee:758, rec_protect:42, rate_refugee:38.7, rate_protect:40.9},
{key:102, country:'대한민국', total_dec:24488, total_app:33582, rec_refugee:708, rec_protect:1475, rate_refugee:3.5, rate_protect:10.7},
{key:103, country:'세네갈', total_dec:5629, total_app:6767, rec_refugee:616, rec_protect:177, rate_refugee:18.3, rate_protect:23.5},
{key:104, country:'감비아', total_dec:1607, total_app:1603, rec_refugee:613, rec_protect:2, rate_refugee:99.2, rate_protect:99.5},
{key:105, country:'사우디아라비아', total_dec:2034, total_app:2025, rec_refugee:553, rec_protect:111, rate_refugee:42.5, rate_protect:51},
{key:106, country:'파푸아뉴기니', total_dec:1447, total_app:1629, rec_refugee:539, rec_protect:187, rate_refugee:52.8, rate_protect:71.1},
{key:107, country:'부르키나파소', total_dec:2464, total_app:2093, rec_refugee:521, rec_protect:14, rate_refugee:57.2, rate_protect:58.7},
{key:108, country:'알제리', total_dec:14546, total_app:20484, rec_refugee:498, rec_protect:0, rate_refugee:8.1, rate_protect:8.1},
{key:109, country:'슬로베니아', total_dec:22603, total_app:21631, rec_refugee:487, rec_protect:212, rate_refugee:9.8, rate_protect:14.1},
{key:110, country:'벨라루스', total_dec:6686, total_app:6410, rec_refugee:483, rec_protect:2671, rate_refugee:10.1, rate_protect:66},
{key:111, country:'일본', total_dec:59288, total_app:88794, rec_refugee:479, rec_protect:2470, rate_refugee:0.9, rate_protect:5.8},
{key:112, country:'투르크메니스탄', total_dec:2034, total_app:1218, rec_refugee:471, rec_protect:0, rate_refugee:39.4, rate_protect:39.4},
{key:113, country:'쿠바', total_dec:784, total_app:787, rec_refugee:463, rec_protect:0, rate_refugee:65.7, rate_protect:65.7},
{key:114, country:'리투아니아', total_dec:4743, total_app:5198, rec_refugee:436, rec_protect:694, rate_refugee:15.4, rate_protect:39.9},
{key:115, country:'몰도바', total_dec:2840, total_app:2701, rec_refugee:433, rec_protect:605, rate_refugee:22.5, rate_protect:54},
{key:116, country:'슬로바키아', total_dec:53454, total_app:55093, rec_refugee:429, rec_protect:701, rate_refugee:5.3, rate_protect:13.9},
{key:117, country:'스와질란드', total_dec:831, total_app:1374, rec_refugee:429, rec_protect:0, rate_refugee:82.2, rate_protect:82.2},
{key:118, country:'니카라과', total_dec:1065, total_app:1457, rec_refugee:411, rec_protect:2, rate_refugee:99, rate_protect:99.5},
{key:119, country:'포르투갈', total_dec:5403, total_app:7440, rec_refugee:408, rec_protect:1466, rate_refugee:13.7, rate_protect:62.8},
{key:120, country:'필리핀', total_dec:828, total_app:1043, rec_refugee:407, rec_protect:0, rate_refugee:80.4, rate_protect:80.4},
{key:121, country:'바레인', total_dec:603, total_app:711, rec_refugee:405, rec_protect:55, rate_refugee:83.7, rate_protect:95},
{key:122, country:'보스니아헤르체고비나', total_dec:4004, total_app:4206, rec_refugee:393, rec_protect:87, rate_refugee:18.9, rate_protect:23.1},
{key:123, country:'트리니다드토바고', total_dec:900, total_app:2794, rec_refugee:379, rec_protect:3, rate_refugee:69.5, rate_protect:70.1},
{key:124, country:'크로아티아', total_dec:9802, total_app:10209, rec_refugee:377, rec_protect:101, rate_refugee:12.9, rate_protect:16.3},
{key:125, country:'오만', total_dec:466, total_app:826, rec_refugee:376, rec_protect:1, rate_refugee:97.9, rate_protect:98.2},
{key:126, country:'라이베리아', total_dec:1413, total_app:1401, rec_refugee:368, rec_protect:22, rate_refugee:28.5, rate_protect:30.2},
{key:127, country:'조지아', total_dec:6318, total_app:6922, rec_refugee:333, rec_protect:1288, rate_refugee:9.9, rate_protect:48},
{key:128, country:'과테말라', total_dec:989, total_app:1007, rec_refugee:294, rec_protect:3, rate_refugee:68.4, rate_protect:69.1},
{key:129, country:'아프가니스탄', total_dec:767, total_app:970, rec_refugee:261, rec_protect:1, rate_refugee:50.4, rate_protect:50.6},
{key:130, country:'방글라데시', total_dec:556, total_app:639, rec_refugee:259, rec_protect:0, rate_refugee:60.5, rate_protect:60.5},
{key:131, country:'아이슬란드', total_dec:3765, total_app:4608, rec_refugee:250, rec_protect:144, rate_refugee:11.5, rate_protect:18.2},
{key:132, country:'콜롬비아', total_dec:3205, total_app:3732, rec_refugee:247, rec_protect:0, rate_refugee:18.6, rate_protect:18.6},
{key:133, country:'니제르', total_dec:1286, total_app:1186, rec_refugee:245, rec_protect:1, rate_refugee:40.9, rate_protect:41.1},
{key:134, country:'가봉', total_dec:10931, total_app:8846, rec_refugee:241, rec_protect:2677, rate_refugee:3.6, rate_protect:44},
{key:135, country:'볼리비아', total_dec:670, total_app:665, rec_refugee:222, rec_protect:11, rate_refugee:53.4, rate_protect:56},
{key:136, country:'카타르', total_dec:473, total_app:575, rec_refugee:208, rec_protect:58, rate_refugee:60.5, rate_protect:77.3},
{key:137, country:'에스토니아', total_dec:1008, total_app:877, rec_refugee:206, rec_protect:184, rate_refugee:23.9, rate_protect:45.3},
{key:138, country:'우루과이', total_dec:1135, total_app:3232, rec_refugee:191, rec_protect:2, rate_refugee:63.5, rate_protect:64.1},
{key:139, country:'파라과이', total_dec:348, total_app:403, rec_refugee:185, rec_protect:1, rate_refugee:72.8, rate_protect:73.2},
{key:140, country:'남수단', total_dec:1409, total_app:3300, rec_refugee:175, rec_protect:0, rate_refugee:54.9, rate_protect:54.9},
{key:141, country:'알바니아', total_dec:4280, total_app:4238, rec_refugee:162, rec_protect:83, rate_refugee:51.1, rate_protect:77.3},
{key:142, country:'세르비아및코소보', total_dec:31492, total_app:31547, rec_refugee:149, rec_protect:86, rate_refugee:13.5, rate_protect:21.4},
{key:143, country:'에리트레아', total_dec:2750, total_app:2834, rec_refugee:146, rec_protect:382, rate_refugee:23.7, rate_protect:85.6},
{key:144, country:'라트비아', total_dec:2246, total_app:2362, rec_refugee:140, rec_protect:461, rate_refugee:10.6, rate_protect:45.7},
{key:145, country:'퀴라소', total_dec:134, total_app:884, rec_refugee:83, rec_protect:0, rate_refugee:73.5, rate_protect:73.5},
{key:146, country:'온두라스', total_dec:720, total_app:740, rec_refugee:82, rec_protect:2, rate_refugee:31.7, rate_protect:32.4},
{key:147, country:'싱가포르', total_dec:200, total_app:200, rec_refugee:75, rec_protect:2, rate_refugee:57.3, rate_protect:58.8},
{key:148, country:'도미니카공화국', total_dec:1505, total_app:327, rec_refugee:69, rec_protect:0, rate_refugee:15.1, rate_protect:15.1},
{key:149, country:'마케도니아공화국', total_dec:9978, total_app:10016, rec_refugee:69, rec_protect:1458, rate_refugee:3, rate_protect:66.9},
{key:150, country:'엘살바도르', total_dec:309, total_app:310, rec_refugee:63, rec_protect:0, rate_refugee:60, rate_protect:60},
{key:151, country:'리히텐슈타인', total_dec:1636, total_app:1716, rec_refugee:56, rec_protect:117, rate_refugee:7.3, rate_protect:22.5},
{key:152, country:'마다가스카르', total_dec:73, total_app:149, rec_refugee:44, rec_protect:0, rate_refugee:97.8, rate_protect:97.8},
{key:153, country:'몽골', total_dec:71, total_app:71, rec_refugee:42, rec_protect:0, rate_refugee:77.8, rate_protect:77.8},
{key:154, country:'레소토', total_dec:45, total_app:72, rec_refugee:39, rec_protect:0, rate_refugee:97.5, rate_protect:97.5},
{key:155, country:'바하마', total_dec:514, total_app:655, rec_refugee:38, rec_protect:1, rate_refugee:7.8, rate_protect:8},
{key:156, country:'벨리즈', total_dec:362, total_app:3540, rec_refugee:37, rec_protect:5, rate_refugee:37, rate_protect:42},
{key:157, country:'케이맨군도', total_dec:300, total_app:319, rec_refugee:33, rec_protect:0, rate_refugee:11.3, rate_protect:11.3},
{key:158, country:'몬테네그로', total_dec:10261, total_app:10448, rec_refugee:30, rec_protect:19, rate_refugee:1.8, rate_protect:2.9},
{key:159, country:'수리남', total_dec:82, total_app:151, rec_refugee:30, rec_protect:0, rate_refugee:62.5, rate_protect:62.5},
{key:160, country:'앤티가바부다', total_dec:17, total_app:16, rec_refugee:16, rec_protect:0, rate_refugee:100, rate_protect:100},
{key:161, country:'피지', total_dec:40, total_app:48, rec_refugee:16, rec_protect:0, rate_refugee:64, rate_protect:64},
{key:162, country:'팔라우', total_dec:19, total_app:23, rec_refugee:15, rec_protect:0, rate_refugee:100, rate_protect:100},
{key:163, country:'아이티', total_dec:61, total_app:71, rec_refugee:13, rec_protect:0, rate_refugee:86.7, rate_protect:86.7},
{key:164, country:'마카오', total_dec:30, total_app:21, rec_refugee:10, rec_protect:0, rate_refugee:55.6, rate_protect:55.6},
{key:165, country:'바누아투', total_dec:9, total_app:9, rec_refugee:7, rec_protect:0, rate_refugee:77.8, rate_protect:77.8},
{key:166, country:'자메이카', total_dec:36, total_app:45, rec_refugee:6, rec_protect:1, rate_refugee:27.3, rate_protect:31.8},
{key:167, country:'세인트루시아', total_dec:15, total_app:14, rec_refugee:5, rec_protect:0, rate_refugee:55.6, rate_protect:55.6},
{key:168, country:'그레나다', total_dec:4, total_app:4, rec_refugee:4, rec_protect:0, rate_refugee:100, rate_protect:100},
{key:169, country:'미크로네시아', total_dec:55, total_app:55, rec_refugee:4, rec_protect:0, rate_refugee:7.3, rate_protect:7.3},
{key:170, country:'터크스케이커스제도', total_dec:38, total_app:36, rec_refugee:4, rec_protect:0, rate_refugee:36.4, rate_protect:36.4},
{key:171, country:'아루바', total_dec:10, total_app:29, rec_refugee:3, rec_protect:0, rate_refugee:37.5, rate_protect:37.5},
{key:172, country:'사모아', total_dec:3, total_app:3, rec_refugee:3, rec_protect:0, rate_refugee:100, rate_protect:100},
{key:173, country:'솔로몬제도', total_dec:3, total_app:3, rec_refugee:3, rec_protect:0, rate_refugee:100, rate_protect:100},
{key:174, country:'동티모르', total_dec:77, total_app:89, rec_refugee:3, rec_protect:0, rate_refugee:10.3, rate_protect:10.3},
{key:175, country:'통가', total_dec:4, total_app:4, rec_refugee:3, rec_protect:0, rate_refugee:75, rate_protect:75},
{key:176, country:'앵귈라', total_dec:1, total_app:1, rec_refugee:1, rec_protect:0, rate_refugee:100, rate_protect:100},
{key:177, country:'바베이도스', total_dec:2, total_app:4, rec_refugee:1, rec_protect:0, rate_refugee:100, rate_protect:100},
{key:178, country:'세인트키츠네비스', total_dec:8, total_app:12, rec_refugee:1, rec_protect:0, rate_refugee:14.3, rate_protect:14.3},
{key:179, country:'세이셸', total_dec:1, total_app:1, rec_refugee:1, rec_protect:0, rate_refugee:100, rate_protect:100},
{key:180, country:'보나이러', total_dec:0, total_app:1, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:181, country:'영국령버진아일랜드', total_dec:30, total_app:36, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:182, country:'도미니카', total_dec:2, total_app:1, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:183, country:'가이아나', total_dec:2, total_app:2, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:184, country:'라오스', total_dec:4, total_app:4, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:185, country:'모리셔스', total_dec:0, total_app:5, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:186, country:'모나코', total_dec:2, total_app:3, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:187, country:'몬트세랫', total_dec:14, total_app:0, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:188, country:'미얀마', total_dec:1, total_app:1, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:189, country:'세인트빈센트그레나딘', total_dec:2, total_app:1, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0},
{key:190, country:'신트마르턴', total_dec:13, total_app:19, rec_refugee:0, rec_protect:0, rate_refugee:0, rate_protect:0}
];


  init();

  function init() {

    //Create the random data
    // for (var i = 0; i < 40; i++) {
    //   var my_object = {};
    //   my_object.key = i;
    //   my_object.country = makeWord();
    //   my_object.value = Math.floor(Math.random() * 600);
    //   data.push(my_object);
    // }//for i 
    // data.sort(function(a,b) { return b.value - a.value; });

    /////////////////////////////////////////////////////////////
    ///////////////// Set-up SVG and wrappers ///////////////////
    /////////////////////////////////////////////////////////////

    //Added only for the mouse wheel
    var zoomer = d3.behavior.zoom()
        .on("zoom", null);

    var width = $('#chart').width(),
        height = $('#chart').height();

    var main_margin = {top: 10, right: 10, bottom: 30, left: 160},
        main_width = width*0.9 - main_margin.left - main_margin.right,
        main_height = height - main_margin.top - main_margin.bottom;

    var mini_margin = {top: 10, right: 10, bottom: 30, left: 10},
        mini_width = width*0.1 - mini_margin.left - mini_margin.right;
        mini_height = height - mini_margin.top - mini_margin.bottom;


    svg = d3.select("#chart").append("svg")
        .attr("class", "svgWrapper")
        .attr("width", main_width + main_margin.left + main_margin.right + mini_width + mini_margin.left + mini_margin.right)
        .attr("height", main_height + main_margin.top + main_margin.bottom)
        .call(zoomer)
        .on("wheel.zoom", scroll)
        //.on("mousewheel.zoom", scroll)
        //.on("DOMMouseScroll.zoom", scroll)
        //.on("MozMousePixelScroll.zoom", scroll)
        //Is this needed?
        .on("mousedown.zoom", null)
        .on("touchstart.zoom", null)
        .on("touchmove.zoom", null)
        .on("touchend.zoom", null);

    var mainGroup = svg.append("g")
            .attr("class","mainGroupWrapper")
            .attr("transform","translate(" + main_margin.left + "," + main_margin.top + ")")
            .append("g") //another one for the clip path - due to not wanting to clip the labels
            .attr("clip-path", "url(#clip)")
            .style("clip-path", "url(#clip)")
            .attr("class","mainGroup")

    var miniGroup = svg.append("g")
            .attr("class","miniGroup")
            .attr("transform","translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

    var brushGroup = svg.append("g")
            .attr("class","brushGroup")
            .attr("transform","translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

    /////////////////////////////////////////////////////////////
    ////////////////////// Initiate scales //////////////////////
    /////////////////////////////////////////////////////////////

    main_xScale = d3.scale.linear().range([0, main_width]);
    mini_xScale = d3.scale.linear().range([0, mini_width]);

    main_yScale = d3.scale.ordinal().rangeBands([0, main_height], 0.4, 0);
    mini_yScale = d3.scale.ordinal().rangeBands([0, mini_height], 0.4, 0);

    //Based on the idea from: http://stackoverflow.com/questions/21485339/d3-brushing-on-grouped-bar-chart
    main_yZoom = d3.scale.linear()
        .range([0, main_height])
        .domain([0, main_height]);

    //Create x axis object
    main_xAxis = d3.svg.axis()
      .scale(main_xScale)
      .orient("bottom")
      .ticks(6)
      //.tickSize(0)
      .outerTickSize(0);

    //Add group for the x axis
    d3.select(".mainGroupWrapper").append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + 0 + "," + (main_height + 5) + ")");

    //Create y axis object
    main_yAxis = d3.svg.axis()
      .scale(main_yScale)
      .orient("left")
      .tickSize(0)
      .outerTickSize(0);

    //Add group for the y axis
    mainGroup.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-5,0)");
 
    /////////////////////////////////////////////////////////////
    /////////////////////// Update scales ///////////////////////
    /////////////////////////////////////////////////////////////

    //Update the scales
    main_xScale.domain([0, d3.max(data, function(d) { return d.rec_refugee; })]);
    mini_xScale.domain([0, d3.max(data, function(d) { return d.rec_refugee; })]);
    main_yScale.domain(data.map(function(d) { return d.country; }));
    mini_yScale.domain(data.map(function(d) { return d.country; }));
    
    //Create the visual part of the y axis
    d3.select(".mainGroup").select(".y.axis").call(main_yAxis);
    d3.select(".mainGroupWrapper").select(".x.axis").call(main_xAxis);

    /////////////////////////////////////////////////////////////
    ///////////////////// Label axis scales /////////////////////
    /////////////////////////////////////////////////////////////

    textScale = d3.scale.linear()
      .domain([15,50])
      .range([12,6])
      .clamp(true)
      ;
    
    /////////////////////////////////////////////////////////////
    ///////////////////////// Create brush //////////////////////
    /////////////////////////////////////////////////////////////

    //What should the first extent of the brush become - a bit arbitrary this
    var brushExtent = Math.max( 1, Math.min( 20, Math.round(data.length*0.2) ) );

    brush = d3.svg.brush()
        .y(mini_yScale)
        .extent([mini_yScale(data[0].country), mini_yScale(data[brushExtent].country)])
        .on("brush", brushmove)
        //.on("brushend", brushend);

    //Set up the visual part of the brush
    gBrush = d3.select(".brushGroup").append("g")
      .attr("class", "brush")
      .call(brush);

    gBrush.selectAll(".resize")
      .append("line")
      .attr("x2", mini_width);

    gBrush.selectAll(".resize")
      .append("path")
      .attr("d", d3.svg.symbol().type("triangle-up").size(20))
      .attr("transform", function(d,i) { 
        return i ? "translate(" + (mini_width/2) + "," + 4 + ") rotate(180)" : "translate(" + (mini_width/2) + "," + -4 + ") rotate(0)"; 
      });

    gBrush.selectAll("rect")
      .attr("width", mini_width);

    //On a click recenter the brush window
    gBrush.select(".background")
      .on("mousedown.brush", brushcenter)
      .on("touchstart.brush", brushcenter);

/////////////////////////////////////////////////////////////////////////

    defs = svg.append("defs")

    //Add the clip path for the main bar chart
    defs.append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", -main_margin.left)
      .attr("width", main_width + main_margin.left)
      .attr("height", main_height);

    /////////////////////////////////////////////////////////////
    /////////////// Set-up the mini bar chart ///////////////////
    /////////////////////////////////////////////////////////////

    //The mini brushable bar
    //DATA JOIN
    var mini_bar = d3.select(".miniGroup").selectAll(".bar")
      .data(data, function(d) { return d.key; });

    //UPDATE
    mini_bar
      .attr("width", function(d) { return mini_xScale(d.rec_refugee); })
      .attr("y", function(d,i) { return mini_yScale(d.country); })
      .attr("height", mini_yScale.rangeBand());

    //ENTER
    mini_bar.enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("width", function(d) { return mini_xScale(d.rec_refugee); })
      .attr("y", function(d,i) { return mini_yScale(d.country); })
      .attr("height", mini_yScale.rangeBand())
      .style("fill", function(d) {
        if (d.country == '대한민국') {
        return "#E4572E";} else {
        return "#BA9A74";}
      });


    //EXIT
    mini_bar.exit()
      .remove();

    //Start the brush
    gBrush.call(brush.event);

  }//init

  //Function runs on a brush move - to update the big bar chart
  function update() {

    /////////////////////////////////////////////////////////////
    ////////// Update the bars of the main bar chart ////////////
    /////////////////////////////////////////////////////////////

    //DATA JOIN
    var bar = d3.select(".mainGroup").selectAll(".bar")
        .data(data, function(d) { return d.key; });

    var label = d3.select(".mainGroup").selectAll(".label")
        .data(data, function(d) { return d.key; });

    //UPDATE
    bar
      .attr("x", 0)
      .attr("width", function(d) { return main_xScale(d.rec_refugee); })
      .attr("y", function(d,i) { return main_yScale(d.country); })
      .attr("height", main_yScale.rangeBand());

    label
      .attr("x", function(d) { return main_xScale(d.rec_refugee);} )
      .attr("width", function(d) { return main_xScale(d.rec_refugee); })
      .attr("y", function(d,i) { return main_yScale(d.country); })
      .attr("height", main_yScale.rangeBand());

    //ENTER
    bar.enter().append("rect")
      .attr("class", "bar")
      .style("fill", function(d) {
        if (d.country == '대한민국') {
        return "#E4572E";} else {
        return "#BA9A74";}
      })
      .attr("x", 0)
      .attr("width", function(d) { return main_xScale(d.rec_refugee); })
      .attr("y", function(d,i) { return main_yScale(d.country); })
      .attr("height", main_yScale.rangeBand());

    label.enter().append("text")
      .attr("class", "label")
      .text(function(d) { return d.rec_refugee + "명"; })
      .attr("y", function(d,i) { return main_yScale(d.country) })
      .attr("x", function(d) { return main_xScale(d.rec_refugee); })
      .style("text-anchor", "start")
      .attr("fill", "#4C4C47")
      .style("font-size", "12px")
      .attr("dx", "5px")
      .attr("dy", main_yScale.rangeBand() / 2 + 4);

    //EXIT
    bar.exit()
      .remove();

  }//update

  /////////////////////////////////////////////////////////////
  ////////////////////// Brush functions //////////////////////
  /////////////////////////////////////////////////////////////

  //First function that runs on a brush move
  function brushmove() {

    var extent = brush.extent();

    //Reset the part that is visible on the big chart
    var originalRange = main_yZoom.range();
    main_yZoom.domain( extent );

    /////////////////////////////////////////////////////////////
    ///////////////////// Update the axis ///////////////////////
    /////////////////////////////////////////////////////////////

    //Update the domain of the x & y scale of the big bar chart
    main_yScale.domain(data.map(function(d) { return d.country; }));
    main_yScale.rangeBands( [ main_yZoom(originalRange[0]), main_yZoom(originalRange[1]) ], 0.4, 0);

    //Update the y axis of the big chart
    d3.select(".mainGroup")
      .select(".y.axis")
      .call(main_yAxis);

    /////////////////////////////////////////////////////////////
    /////////////// Update the mini bar fills ///////////////////
    /////////////////////////////////////////////////////////////

    //Update the colors within the mini bar chart
    var selected = mini_yScale.domain()
      .filter(function(d) { return (extent[0] - mini_yScale.rangeBand() + 1e-2 <= mini_yScale(d)) && (mini_yScale(d) <= extent[1] - 1e-2); }); 
    //Update the colors of the mini chart - Make everything outside the brush grey
    d3.select(".miniGroup").selectAll(".bar")
      .style("fill", function(d) {
        if (d.country == '대한민국') {
        return "#E4572E";} else {
        return "#BA9A74";}
      });

    //Update the label size
    d3.selectAll(".y.axis text")
    // .style("font-size", "12px");
      .style("font-size", textScale(selected.length+ 2));
    
    //Update the big bar chart
    update();
    
  }//brushmove

  /////////////////////////////////////////////////////////////
  ////////////////////// Click functions //////////////////////
  /////////////////////////////////////////////////////////////

  //Based on http://bl.ocks.org/mbostock/6498000
  //What to do when the user clicks on another location along the brushable bar chart
  function brushcenter() {
    var target = d3.event.target,
        extent = brush.extent(),
        size = extent[1] - extent[0],
        range = mini_yScale.range(),
        y0 = d3.min(range) + size / 2,
        y1 = d3.max(range) + mini_yScale.rangeBand() - size / 2,
        center = Math.max( y0, Math.min( y1, d3.mouse(target)[1] ) );

    d3.event.stopPropagation();

    gBrush
        .call(brush.extent([center - size / 2, center + size / 2]))
        .call(brush.event);

  }//brushcenter

  /////////////////////////////////////////////////////////////
  ///////////////////// Scroll functions //////////////////////
  /////////////////////////////////////////////////////////////

  function scroll() {

    //Mouse scroll on the mini chart
    var extent = brush.extent(),
      size = extent[1] - extent[0],
      range = mini_yScale.range(),
      y0 = d3.min(range),
      y1 = d3.max(range) + mini_yScale.rangeBand(),
      dy = d3.event.deltaY,
      topSection;

    if ( extent[0] - dy < y0 ) { topSection = y0; } 
    else if ( extent[1] - dy > y1 ) { topSection = y1 - size; } 
    else { topSection = extent[0] - dy; }

    //Make sure the page doesn't scroll as well
    d3.event.stopPropagation();
    d3.event.preventDefault();

    gBrush
        .call(brush.extent([ topSection, topSection + size ]))
        .call(brush.event);

  }//scroll

  /////////////////////////////////////////////////////////////
  ///////////////////// Helper functions //////////////////////
  /////////////////////////////////////////////////////////////





  /////////////////////////////////////////////////////////////
  ////////////////////// Select Options ///////////////////////
  /////////////////////////////////////////////////////////////

  // var dropdownChange = function() {
  //   var newRefugee = d3.select(this).property('value'),
  //       newData    = 
  // }


