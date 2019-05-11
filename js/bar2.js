
 function draw_b(){
   /*var data=[
  {x:1, w:Math.floor(Math.random()*300)},
  {x:2, w:Math.floor(Math.random()*300)},
  {x:3, w:Math.floor(Math.random()*300)},
  {x:4, w:Math.floor(Math.random()*300)},
  {x:5, w:Math.floor(Math.random()*300)},
];*/


var data=[
  {x:1, w:48.1},
  {x:2, w:46.6},
  {x:3, w:62.0},
  {x:4, w:47.5},
  {x:5, w:55.8},
];

var s = d3.select("#long")
          .append('svg')
          .attr({
            'width':350,
            'height':350
          });


s.selectAll('rect')
 .data(data)
 .enter()
 .append('rect')
 .attr({
  'fill':'#f3d429',  //#0077cc 藍色 脫離
  'width':0,
  'height':30,
  'x':0,
  'y':function(d){
    return (d.x-1) * 35;
  }
 })
 .transition()
 .duration(1500)
 .attr({
  'width':function(d){
    return d.w+150;
  }
 });

s.selectAll('text')
 .data(data)
 .enter()
 .append('text')
 .text(function(d){
  return 0  ;
 })
 .attr({
  'fill':"white",
  'x':3,
  'y':function(d){
    return d.x * 35 - 12;
  } 
 })

 .transition()
 .duration(1500)
 .attr({
  'x':function(d){
    return 3;
  }
 })
 .tween('number',function(d){
    var i = d3.interpolateRound(0, d.w);
      return function(t) {
      this.textContent = i(t);
    };
 });   

 }
       
var waw = new WOW(
      {
        boxClass:     'bar',      // 要套用WOW.js縮需要的動畫class(預設是wow)
        //animateClass: 'animated', // 要"動起來"的動畫(預設是animated, 因此如果你有其他動畫library要使用也可以在這裡調整)
        offset:       0,          // 距離顯示多遠開始顯示動畫 (預設是0, 因此捲動到顯示時才出現動畫)
        mobile:       true,       // 手機上是否要套用動畫 (預設是true)
        live:         true,       // 非同步產生的內容是否也要套用 (預設是true, 非常適合搭配SPA)
        callback:     function(box) {
          draw_b()
        },
        scrollContainer: null // 可以設定成只套用在某個container中捲動才呈現, 不設定就是整個視窗
      }
    );
    waw.init();