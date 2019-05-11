


 'use strict';


 window.chartColors = {
	red: 'rgb(250, 199, 80)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(31, 119, 180)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
 };

(function(global) {
	var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	/* eslint-enable */

}(this));



 var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var color = Chart.helpers.color;
        var horizontalBarChartData = {
            labels: ['英國', '英格蘭', '蘇格蘭', '威爾斯', ' 北愛爾蘭'],
            datasets: [{
                label: '留下',
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                borderWidth: 1,
                data: [
                     48.1, 46.6, 62, 47.5, 55.8
                ]
            }, {
                label: '脫離',
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                data: [
                     51.9, 53.4, 38, 52.5, 44.2
                ]
            }]
        };

       	var ctx ;
        window.onload = function() {
            ctx = document.getElementById('canvas').getContext('2d');
            window.myHorizontalBar = new Chart(ctx, {
                type: 'horizontalBar',
                data: horizontalBarChartData,
                options: {
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });

        };
        document.getElementById('randomizeData').addEventListener('click', function() {
            var zero = Math.random() < 0.2 ? true : false;
            horizontalBarChartData.datasets.forEach(function(dataset) {
                dataset.data = dataset.data.map(function() {
                    return zero ? 0.0 : randomScalingFactor();
                });
            });
            window.myHorizontalBar.update();
        });
        var colorNames = Object.keys(window.chartColors);
        document.getElementById('addDataset').addEventListener('click', function() {
            var colorName = colorNames[horizontalBarChartData.datasets.length % colorNames.length];
            var dsColor = window.chartColors[colorName];
            var newDataset = {
                label: 'Dataset ' + (horizontalBarChartData.datasets.length + 1),
                backgroundColor: color(dsColor).alpha(0.5).rgbString(),
                borderColor: dsColor,
                data: []
            };
            for (var index = 0; index < horizontalBarChartData.labels.length; ++index) {
                newDataset.data.push(randomScalingFactor());
            }
            horizontalBarChartData.datasets.push(newDataset);
            window.myHorizontalBar.update();
        });
        document.getElementById('addData').addEventListener('click', function() {
            if (horizontalBarChartData.datasets.length > 0) {
                var month = MONTHS[horizontalBarChartData.labels.length % MONTHS.length];
                horizontalBarChartData.labels.push(month);
                for (var index = 0; index < horizontalBarChartData.datasets.length; ++index) {
                    horizontalBarChartData.datasets[index].data.push(randomScalingFactor());
                }
                window.myHorizontalBar.update();
            }
        });
        document.getElementById('removeDataset').addEventListener('click', function() {
            horizontalBarChartData.datasets.pop();
            window.myHorizontalBar.update();
        });
        document.getElementById('removeData').addEventListener('click', function() {
            horizontalBarChartData.labels.splice(-1, 1); // remove the label first
            horizontalBarChartData.datasets.forEach(function(dataset) {
                dataset.data.pop();
            });
            window.myHorizontalBar.update();
        });



var wow3 = new WOW(
      {
        boxClass:     'Barr',      // 要套用WOW.js縮需要的動畫class(預設是wow)
        //animateClass: 'animated', // 要"動起來"的動畫(預設是animated, 因此如果你有其他動畫library要使用也可以在這裡調整)
        offset:       0,          // 距離顯示多遠開始顯示動畫 (預設是0, 因此捲動到顯示時才出現動畫)
        mobile:       true,       // 手機上是否要套用動畫 (預設是true)
        live:         true,       // 非同步產生的內容是否也要套用 (預設是true, 非常適合搭配SPA)
        callback:     function(box) {
          	//Barr()
          	console.log("bar") ;
            window.myHorizontalBar = new Chart(ctx, {
                type: 'horizontalBar',
                data: horizontalBarChartData,
                options: {
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });
        },
        scrollContainer: null // 可以設定成只套用在某個container中捲動才呈現, 不設定就是整個視窗
      }
    );
wow3.init();