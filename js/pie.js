var width = 400
var height = 400

    var svg = d3.select("#in").append("svg")
        .attr("width", width)
        .attr("height", height)

    var dataSet = [
        ["脫離", 51.89],
        ["留下", 48.11]
    ]


    var outerRadius = width / 3
    var innerRadius = 0

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)

    //var color = d3.scale.category20()
    var color = [d3.rgb(31, 119, 180),d3.rgb(250, 199, 80), d3.rgb(174, 199, 232), d3.rgb(255, 127, 14), d3.rgb(255, 187, 120), d3.rgb(44, 160, 44), d3.rgb(152, 223, 138)]

    // -- 圓餅圖 -- 
    //draw()

    function draw() {
        d3.transition()
            .duration(4000)
            .tween("move", function() {
                return function(t) {

                    var pie = d3.layout.pie()
                        .startAngle(0)
                        .endAngle(Math.PI * t * 2)
                        .value(function(d) {
                            return d[1]
                        })

                    var pieData = pie(dataSet)
                    var update = svg.selectAll("g").data(pieData)
                    update
                        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
                        .select("path")
                        .call(setAttr)
                    var enter = update.enter()
                        .append("g")
                        .append("path")
                        .call(setAttr)
                    var exit = update.exit()
                }
            })
            .each("end", function(d) {
                var g = svg.selectAll("g")

                // -- 數字 -- 
                g.append("text")
                    .attr("transform", function(d) {
                        var x = arc.centroid(d)[0] * 1.4
                        var y = arc.centroid(d)[1] * 1.4
                        return "translate(" + x + "," + y + ")"
                    })
                    .attr("text-anchor", "middle")
                    .attr("font-size", "50")
                    .text(function(d) {
                        var percent = Number(d.value) / d3.sum(dataSet, function(d) { return d[1] }) * 100
                        return percent.toFixed(1) + "%"
                    })

                // -- 資料標籤 -- 
                g.append("text")
                    .attr("transform", function(d) {
                        var x = arc.centroid(d)[0] * 2 
                        var y = arc.centroid(d)[1] * 2
                        return "translate(" + x + "," + y + ")"
                    })
                    .attr("text-anchor", "middle")
                    .attr("font-size", "30")
                    .text(function(d) {
                        return d.data[0]
                    })

                // -- 資料標籤的連接線 --   
               /*
               g.append("line")
                    .attr("stroke", "black")
                    .attr("x1", function(d) { return arc.centroid(d)[0] * 2 })
                    .attr("x2", function(d) { return arc.centroid(d)[0] * 2.2 })
                    .attr("y1", function(d) { return arc.centroid(d)[1] * 2 })
                    .attr("y2", function(d) { return arc.centroid(d)[1] * 2.2 })
                */  
            })
    }

    function setAttr(target) {
        target
            .attr("fill", function(d, i) {
                return color[i]
            })
            .attr("d", function(d) {
                return arc(d)
            })
    }

    var wow = new WOW(
      {
        boxClass:     'draw',      // 要套用WOW.js縮需要的動畫class(預設是wow)
        //animateClass: 'animated', // 要"動起來"的動畫(預設是animated, 因此如果你有其他動畫library要使用也可以在這裡調整)
        offset:       0,          // 距離顯示多遠開始顯示動畫 (預設是0, 因此捲動到顯示時才出現動畫)
        mobile:       true,       // 手機上是否要套用動畫 (預設是true)
        live:         true,       // 非同步產生的內容是否也要套用 (預設是true, 非常適合搭配SPA)
        callback:     function(box) {
          draw()
        },
        scrollContainer: null // 可以設定成只套用在某個container中捲動才呈現, 不設定就是整個視窗
      }
    );
    wow.init();