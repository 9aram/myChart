/*
 * http://www.cyber-i.com/
 * 최초 작성자 : dajinnim@cyber-i.com
 * 마지막 수정자 : dajinnim@cyber-i.com
 */
(function() {

	var self = {};
	var stockDefaultStyle = {
		stockmenuwidth: 0,
		stocksliderheight: 30

	};
	self.init = function(_selector, _options, _styles, _series, _sliderHtml){
		var doc = document;
		var g = {doc: document, win: window};
		var TYPE = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
		_options.use.stock = true;
		_options.stock.menuWidth = 0;
		var accWidth = 0;

		var sliderHeight = stockDefaultStyle.stocksliderheight;
		if(_options.stock.sliderHeight != undefined) sliderHeight = _options.stock.sliderHeight;

		var itemCount = 80; // 기본 아이템 갯수(종합차트에서 쓰임)
		var itemCountArray = [10,20,30,50,80,140,200,280,400,'*'];
		var itemCountIndex = 4;

		var stockStyles = _styles.useStyles;

		_options.division = stockStyles.division;
		var series = initMakeSeries(_series);
		var styles = initMakeStyles(_styles, stockStyles, accWidth);

		var data = [], sliderData = [];

		loadData(_options, {
			init: function(_data){
				if(_data.length < itemCount) {
					
					for(var i = 0; i < itemCountArray.length; i ++) {
						if(itemCountArray[i] >= _data.length) {
							// 데이터 갯수보다 itemCountArray[i]가 커지기 바로 직전까지 저장하고 
							itemCountIndex = i;

							break;
						}
					}

					itemCount = itemCountArray[itemCountIndex];
				}
				data = _data;
			}
		});

		var chart = webponent.chart.init(_selector, _options, styles, series);

		var stockLegend = {};
		stockLegend.main = {}, stockLegend.assist = {};

		var overlaySerieses = [], assistSerieses = [];

		_selector.css('overflow', 'hidden');

		/* STOCKCHART LEFT MENU
			_selector: DIV 객체 _chart: svg _width: Accor 넓이 _sliderHeight: slider 높이 _data: 데이터 _styles: 스타일
			_series: 만들어진 series, __series: 사용자 입력 series, _overlaySerieses: 오버레이 활성 체크 변수, _assistSerieses: 보조지표 활성 체크 변수
		*/
		var overlay = new webponent.STOCKOVERLAYMINI();
		var assist = new webponent.STOCKASSISTMINI(_selector);
		var chartType = '';

		/**
		 * 오버레이 실행
		 * @param  {[type]}  text       [description]
		 * @param  {Boolean} isRealTime 실시간 데이터로 인해 갱신이 시도되면 true
		 * @return {[type]}             [description]
		 */
		var subGraphScript = function(text, isRealTime) {
			var type = '';
			if(text === 'overlay'){
				type = 'overlay';

				var returnData = reDrawOverLay(_selector, stockStyles, data, 'over1', styles, _series, series, overlaySerieses, overlay, isRealTime);
				
				_overlaySerieses = returnData.overSerieses;
				
				styles = $.extend(true, {}, styles, returnData.styles), series = $.extend({}, series, returnData.series);

				sliceData(data, returnData);

			} else {
				type = 'assist';
				var returnData = reDrawAssist(_selector, stockStyles, data, 'volume', styles, _series, series, assistSerieses, assist, accWidth);
				assistSerieses = returnData.assistSerieses;
				_styles = returnData.styles, _series = returnData.series;
				styles = _styles, series = _series;
				sliceData(data, returnData);

				for(var k = assistSerieses.length; k--;){
					$(stockLegend.assist).removeProp(_assistSerieses[k]);
				}
			}
		};

		var waitForFinalEvent = (function () {
		  	var timers = {};
		  	return function (callback, ms, uniqueId) {
		    	if (!uniqueId) {
			      	uniqueId = "Don't call this twice without a uniqueId";
			    }
		    	if (timers[uniqueId]) {
			      	clearTimeout (timers[uniqueId]);
			    }
		    	timers[uniqueId] = setTimeout(callback, ms);
		  	};
		})();
		var chkReDraw = false;
		var sliceData = function(user_data, _returnData, _thisType){
			var tempData = user_data.concat([]);
			
			var sliceIndex = slider.rightSliderIndecator - itemCount;
			if(sliceIndex < 0) {
				sliceIndex = 0;
			}
			var maxCount = itemCount;
			if(tempData.length < maxCount){
				maxCount = tempData.length;
			}

			sliderData = tempData.splice(sliceIndex, maxCount);

			var options = chart.getOptions();
			options.stock.leftIndecator = slider.leftSliderIndecator;
			options.stock.rightIndecator = slider.rightSliderIndecator;

			if(_thisType !== 'slider') {
				chart.setStockOriginalData(user_data);
			}

			chart.reDraw(sliderData, _returnData.styles, _returnData.series, true, chkReDraw, _thisType);

			if(sliderData.length > 0) {
				maxMinLabel(_returnData.series);
			}

			if(_thisType === 'slider') {
				var i = 0;
				for(i = 0; i < overlaySerieses.length; i ++) {
					overlay.toFrontLegend(overlaySerieses[i]);
				}
				for(i = 0; i < assistSerieses.length; i++) {
					assist.toFrontLegend(assistSerieses[i]);
				}
				return;
			}

			if(sliderData.length <= 0) {

				return;
			}

			
			waitForFinalEvent(function(){

			   initLegend(chart, stockStyles, stockLegend, overlay, assist, overlaySerieses, assistSerieses, _thisType);
			      //...
			}, 1, "legend making");
			
			chkReDraw = true;

		};
		var maxLabel = null, minLabel = null;
		var maxArrow = null, minArrow = null;
		var imagesObject = {};
		var maxMinLabel = function( _series){
			var maxStyle = stockStyles.core_main.maxLabel;
			var minStyle = stockStyles.core_main.minLabel;

			var drawLabel = function(){
				var selectorWidth = (_selector.width() + accWidth) / 2; //(selectorWidth + accWidth) / 2
				var mainSeries = _series.main;
				var thisSeries = {};
				for(var s in mainSeries){
					if(mainSeries[s].type == 'MAIN' && mainSeries[s].visible != false){
						thisSeries.series = mainSeries[s];
						thisSeries.key = s;
						break;
					}
				}
				var data = chart.getData().main;
				var thisData = data['DATA-' + thisSeries.key].data, count = thisData.length;

				var maxValue = -999999999999, minValue = 999999999999;
				var maxData = null, minData = null;
				var maxCheck = false, minCheck = false;
				for(var i = 0; i < count; i ++){
					var maxPrice = Number(thisData[i].high || thisData[i].yaxis);
					var minPrice = Number(thisData[i].low || thisData[i].yaxis);
					if(maxPrice >= maxValue){
						maxValue = maxPrice;
						maxData = thisData[i];
					}
					if(minPrice <= minValue){
						minValue = minPrice;
						minData = thisData[i];
					}
				}

				if(maxLabel == null){
					maxArrow = chart.image(maxStyle.arrow, 0, 0, imagesObject.max.width, imagesObject.max.height);
					maxLabel = chart.text().attr({
						'text-anchor': 'start',
						'font-family': maxStyle.family,
						'font-size': maxStyle.size,
						fill: maxStyle.color || '#000000'
					});
				}
				var maxBBox = maxLabel.getBBox();
				var maxX = maxData.shape.x, maxWHalf = (thisSeries.key === 'candle') ? Math.round(maxData.shape.width / 2) : 0;
				var maxImageX = (maxX + maxWHalf) - imagesObject.max.widthHalf, maxImageY = (thisSeries.key !== 'line') ? maxData.shape.high - maxStyle.size : maxData.shape.y - maxStyle.size;
				var maxTextX = maxX + maxWHalf, maxTextY = (thisSeries.key !== 'line') ? maxData.shape.high - (maxStyle.size / 2) : maxData.shape.y - (maxStyle.size / 2);
				var maxAlign = 'start', maxText = _options.format.yAxis == null ? maxData.high || maxData.yaxis :  eval(_options.format.yAxis)(maxData.high || maxData.yaxis);
				maxText = '최대값 ' + maxText;
				if(maxX > selectorWidth){
					maxAlign = 'end';
					maxTextX = maxTextX - imagesObject.max.widthHalf
				} else {
					maxAlign = 'start';
					maxTextX = maxTextX + imagesObject.max.widthHalf
				}
				maxArrow.attr({
					x: maxImageX, y: maxImageY, width: imagesObject.max.width, height: imagesObject.max.height
				})
				maxLabel.attr({x: maxTextX, y: maxTextY, text: maxText, 'text-anchor': maxAlign})


				if(minLabel == null){
					minArrow = chart.image(minStyle.arrow, 0, 0, imagesObject.min.width, imagesObject.min.height);
					minLabel = chart.text().attr({
						'text-anchor': 'start',
						'font-family': minStyle.family,
						'font-size': minStyle.size,
						fill: minStyle.color || '#000000'
					});
				}
				if(maxData.shape == null || minData.shape == null) {
					return;
				}

				var minBBox = minLabel.getBBox();
				var minX = minData.shape.x, minWHalf = (thisSeries.key === 'candle') ? Math.round(minData.shape.width / 2) : 0;
				var minImageX = (minX + minWHalf) - imagesObject.min.widthHalf, minImageY = (thisSeries.key !== 'line') ? minData.shape.low : minData.shape.y;
				var minTextX = minX + minWHalf, minTextY = (thisSeries.key !== 'line') ? minData.shape.low + (maxStyle.size / 2) : minData.shape.y + (maxStyle.size / 2);
				var minAlign = 'start', minText = _options.format.yAxis == null ? minData.low || minData.yaxis :  eval(_options.format.yAxis)(minData.low || minData.yaxis);
				minText = '최소값 ' + minText;
				if(minX > selectorWidth){
					minAlign = 'end';
					minTextX = minTextX - imagesObject.min.widthHalf
				} else {
					minAlign = 'start';
					minTextX = minTextX + imagesObject.min.widthHalf
				}
				minArrow.attr({
					x: minImageX, y: minImageY, width: imagesObject.min.width, height: imagesObject.min.height
				});
				minLabel.attr({x: minTextX, y: minTextY, text: minText, 'text-anchor': minAlign});

				maxArrow.toFront(), maxLabel.toFront();
				minArrow.toFront(), minLabel.toFront();
			}


			if(maxLabel == null && minLabel == null){
				var images = [maxStyle.arrow, minStyle.arrow];

				var count = images.length;
				var thingToDoCompleted = function (item, img, i) {
					count--;
					var obj = {};
					obj.width = img.width, obj.height = img.height;
					obj.widthHalf = Math.round(obj.width / 2);
					obj.heightHalf = Math.round(obj.height / 2);
					var type = 'max';
					if(i == 1) type = 'min';

					imagesObject[type] = obj;

					if (0 == count) {

						drawLabel();

					}
				};
				var loader = function(items, thingToDo, allDone){
					if(!items) return;
					if("undefined" === items.length) items = [items];
					for(var i = 0; i < items.length; i++){
						loadImage(items, i, allDone);
					}
				};
				var loadImage = function(items, i, onComplete){
					var img = new Image();
					img.onload = function(e){
						img.onload = img.onerror = null;
						img = null;
						onComplete(items[i], this, i);
					};
					img.onerror = function(e){
						console.log(e.message);
					};
					img.src = items[i];
				};
				loader(images, loadImage, thingToDoCompleted);
			} else {
				drawLabel();
			}
		};
		if(!_sliderHtml) {
			_sliderHtml = ''
				+ '<style>'
					+ '.sliderContainer {font-size: 12px; font-family: Tahoma, dotum, gulim; background: #fff; position: absolute; overflow: hidden;  bottom: 0; border-top: 1px solid #ddd;}'
					+ '.sliderArea 		{font-size: 12px; font-family: Tahoma, dotum, gulim; background: #fff; position: absolute; overflow: hidden; background: url(../../../lib/stock/img/slider_bg.png) 50% 50% no-repeat;}'
					+ '.sliderArea .slider {background: url(../../../lib/stock/img/slider_cent.gif) 50% 50% no-repeat; height: 17px; position: absolute;}'
					+ '.sliderArea .slider .slider-left {display: block; background: url(../../../lib/stock/img/slider_left.gif) left 50% no-repeat; height: 17px; width: 100%;}'
					+ '.sliderArea .slider .slider-right {display: block; background: url(../../../lib/stock/img/slider_right.gif) right 50% no-repeat; height: 17px; width: 100%;}'
					+ '.sliderArea .slider .slider-right span {visibility: hidden}'
					+ '.sliderButton {font-size: 12px; font-family: Tahoma, dotum, gulim; background: #fff; position: absolute; overflow: hidden; right: 5px;}'
					+ '.sliderButton input {font-size: 11px;font-family: Tahoma, dotum, gulim; margin: 6px 0 0 2px; padding: 0 4px; vertical-align: top;}'

					+ '.sliderButton input[type=button]{text-indent: -9999px; cursor: pointer; overflow: hidden;}'
					+ '*html .sliderButton input[type=button]{font-size:0;line-height:0;}' /*ie6*/
					+ '*+html .sliderButton input[type=button]{text-indent: 0;font-size:0;line-height:0;padding-left: 100px;}'  /*ie7*/

					+ '.sliderButton .slider-plus {width: 18px; height: 19px; background: url(../../../lib/stock/img/bt_plus.png)}'
					+ '.sliderButton .slider-plus:hover {background-image: url(../../../lib/stock/img/bt_plus_over.png)}'
					+ '.sliderButton .slider-plus:active {background-image: url(../../../lib/stock/img/bt_plus_sel.png)}'
					+ '.sliderButton .slider-default {width: 43px; height: 19px; background: url(../../../lib/stock/img/bt_default.png)}'
					+ '.sliderButton .slider-default:hover {background-image: url(../../../lib/stock/img/bt_default_over.png)}'
					+ '.sliderButton .slider-default:active {background-image: url(../../../lib/stock/img/bt_default_sel.png)}'
					+ '.sliderButton .slider-minus {width: 18px; height: 19px; background: url(../../../lib/stock/img/bt_minus.png)}'
					+ '.sliderButton .slider-minus:hover {background-image: url(../../../lib/stock/img/bt_minus_over.png)}'
					+ '.sliderButton .slider-minus:active {background-image: url(../../../lib/stock/img/bt_minus_sel.png)}'
				+ '</style>'
				+ '<div class="sliderContainer">'
					+ '<div class="sliderArea">'
						+ '<div class="slider">'
							+ '<span class="slider-left"><span class="slider-right"><span>SLIDER</span></span></span>'
						+ '</div>'
					+ '</div>'
					+ '<div class="sliderButton">'
						+ '<input type="button" value="+" class="slider-plus" />'
						+ '<input type="button" value="초기화" class="slider-default" />'
						+ '<input type="button" value="-" class="slider-minus" />'
					+ '</div>';
				+ '</div>';
		}
		var slider = new window.webponent.STOCKSLIDERMINI(_selector, accWidth, sliderHeight, _sliderHtml);

		slider.init(data, itemCount);
		
		var mouseDownCheck = false, sliderEventCheck = false;
		if(('createTouch' in doc) || ('ontouchstart' in doc)){
			var downPos = {};
			var svg = _selector.children().get(0);
			svg.addEventListener('touchstart', function(event){
				
				mouseDownCheck = true;
			})
			$(svg).swipe({
				swipeStatus: function(event, phase, direction, distance , duration , fingerCount){
					
					if(direction === 'up' || direction === 'down'){
						event.preventDefault();
						return;
					}
					if(mouseDownCheck){
						slider.touchMoveHandler(event, direction, distance);
					}
				}
			})

			svg.addEventListener("touchend", function(event){
				waitForFinalEvent(function(){
				  	sliceData(data, {styles: styles, series: series}, 'slider');     //...
				}, 0, "touchMove");
				mouseDownCheck = false;

				var downPos = {};
				if(event.changedTouches.length > 0){
			    		
			    	var target = event.target || event.srcElement,
			    		rect = target.getBoundingClientRect(),
			    		parent = target.parentNode,
			    		parentRect = parent.getBoundingClientRect();

			    	downPos.x = event.changedTouches[0].clientX - parentRect.left; 
			    	downPos.y = event.changedTouches[0].clientY - parentRect.top;
		    	}
				
				if(downPos.x > accWidth){
					 getChartData(chart, downPos, stockLegend, overlay, assist, overlaySerieses, assistSerieses);
				}
			}, false);

			$('.slider', _selector).bind('touchend', function(event){
				waitForFinalEvent(function(){
				  	sliceData(data, {styles: styles, series: series}, 'slider');     //...
				}, 0, "touchMove");
				mouseDownCheck = false;
			});

		} else {
			var downEvent = {};
			_selector.mousedown(function(event){
				mouseDownCheck = true;
				downEvent = event;
			}).mousemove(function(event){
				if(!sliderEventCheck && mouseDownCheck){
					if(TYPE === 'SVG') sliceData(data, {styles: styles, series: series}, 'slider');
				}
				var downPos = {};
				if (typeof event.layerX !== 'undefined') { // Opera
					downPos.x = event.layerX, downPos.y = event.layerY;
			    } else if(typeof event.offsetX !== 'undefined') { // Firefox
			    	downPos.x = event.offsetX, downPos.y = event.offsetY;
			    	if(TYPE === 'VML') downPos.x +=  $(event.target).offset().left;
			    } else {
			    	downPos.x = event.clientX - $(event.target).offset().left;
			    	downPos.y = event.clientY - $(event.target).offset().top;
				}
				if(downPos.x > accWidth){
					 getChartData(chart, downPos, stockLegend, overlay, assist, overlaySerieses, assistSerieses);
				}
			}).mouseup(function(event){
				mouseDownCheck = false;
				if(TYPE === 'VML') sliceData(data, {styles: styles, series: series}, 'slider');
			});
		}
		slider.plusButton.bind('click', function(){ // +
			plusButtonClick();
		});
		slider.minusButton.bind('click', function(){ // 초기화
			minusButtonClick();
		});
		slider.defaultButton.bind('click', function(){ // -
			defaultButtonClick();
		});
		var plusButtonClick = function(){
			if(itemCountArray[0] > data.length) return;
			
			--itemCountIndex;
			if(itemCountIndex < 0) {

				itemCountIndex = 0;
			}

			itemCount = itemCountArray[itemCountIndex];

			for(var j = overlaySerieses.length; j--;){
				if(overlaySerieses[j] == "over2" && itemCount < overlay.over2_param1){
					itemCount = overlay.over2_param1;
					++ itemCountIndex;
					break;
				}
			}

			slider.sliderUpdate('plus', data, itemCount);
			sliceData(data, {styles: styles, series: series}, 'slider');
		};
		var minusButtonClick = function(){
			if(itemCountArray[0] > data.length) return;

			++itemCountIndex;
			if(itemCountIndex >= itemCountArray.length) {
			
				itemCountIndex = itemCountArray.length - 1;
			}

			itemCount = itemCountArray[itemCountIndex];
			if(itemCount > data.length || itemCount === "*") {itemCount = data.length;}
			slider.sliderUpdate('minus', data, itemCount);
			sliceData(data, {styles: styles, series: series}, 'slider');
		};
		var defaultButtonClick = function(){
			if(itemCountArray[0] > data.length) return;
			
			itemCountIndex = 4;
			itemCount = _options.stock.itemCount || 80;
			
			if(itemCount > data.length) {

				for(var i = 0; i < itemCountArray.length; i ++) {

					if(itemCountArray[i] >= data.length) {
						itemCountIndex = i;
						break;
					}
				}
			}

			if(itemCount > data.length) {itemCount = data.length;}
			slider.sliderUpdate('default', data, itemCount);
			sliceData(data, {styles: styles, series: series}, 'slider');
		};

		function bindAPIs (chartInstance) {
			/**
			 * 주식차트의 재조회
			 * @param  {Object} user_option 사용자 정의 옵션
			 * @param  {Object} user_styles 사용자 정의 스타일
			 * @param  {Object} user_series 사용자 정의 시리즈
			 * @return -
			 */
			chartInstance.inquery = function (user_option, user_styles, user_series){

				_options = $.extend(true, {}, _options, user_option);

				if(_options.data.hasOwnProperty('data') && _options.data.data != null)
					_options.data.data = user_option.data.data;

				loadData(_options, {
					init: function(_data){
						data = _data;

						if(_data.length < itemCount || _data.length < 80) {
							
							for(var i = 0; i < itemCountArray.length; i ++) {
								if(itemCountArray[i] >= _data.length) {
									// 데이터 갯수보다 itemCountArray[i]가 커지기 바로 직전까지 저장하고 
									itemCountIndex = i;

									break;
								}
							}

							itemCount = itemCountArray[itemCountIndex];
						}

						if(_data.length >= 80) {
							itemCountIndex = 4;
							itemCount = itemCountArray[itemCountIndex];
						}

						if(data.length > 0) {
							if(data.length < itemCount) {
								itemCount = data.length;
							}
							slider.sliderReInit(data, itemCount);

							_options.data.url = null;
							_options.data.data = data;
						}
						
						chart.inquery(_options, {}, series);
						chartInstance.subGraphScript(true);
					},
					removeElement: function() {
						if(maxLabel != null && minLabel != null) {

							maxLabel.remove();
							minLabel.remove();
							maxArrow.remove();
							minArrow.remove();

							maxLabel = null;
							minLabel = null;
							maxArrow = null;
							minArrow = null;

							overlay.removeLegend('over1');
							assist.removeLegend('volume');

							slider.slider.hide();
						}
					}
				});

			};
			/**
			 * 주식차트의 원본데이터 변경
			 * @param {Array} newData 새로운 데이터
			 */
			chartInstance.setOriginalData = function (newData){
				data = newData;
			};
			/**
			 * 주식차트의 원본데이터 리턴
			 * @return {Array} 원본데이터
			 */
			chartInstance.getOriginalData = function () {
				return data;
			};
			/**
			 * 주식차트의 데이터 자르기
			 * @param  {Array} _data       원본 데이터
			 * @param  {Array} _returnData 오버레이나 보조지표가 적용된 데이터
			 * @param  {String} _thisType   슬라이더를 움직여서 호출되면 'slider' 가 들어온다.
			 * @return -
			 */
			chartInstance.sliceData = function (_data, _returnData, _thisType) {
				sliceData(_data, _returnData, _thisType);
			};
			/**
			 * 주식차트의 시리즈 가져오기
			 * @return {Object} 시리즈
			 */
			chartInstance.getSeries = function () {
				return series;
			};
			/**
			 * 주식차트의 시리즈 설정하기
			 * @param {Object} user_series 사용자 정의 시리즈
			 */
			chartInstance.setStockSeries = function(user_series) {
				_series = $.extend(true, _series, user_series);

			};
			/**
			 * 주식차트의 스타일 가져오기
			 * @return {Object} 스타일
			 */
			chartInstance.getStyles = function () {
				return styles;
			};
			/**
			 * 주식차트의 활성화중인 오버레이와 보조지표 종류
			 * @return {Object} 오버레이는 over1, over2 
			 *                  보조지표는 보조지표 명이 들어있다.
			 */
			chartInstance.getSelectSeries = function() {
				return {
					overlay: overlaySerieses,
					assist: assistSerieses
				};
			};
			/**
			 * 주식차트의 옵션 가져오기
			 * @return {Object} 옵션
			 */
			chartInstance.getOptions = function() {
				return _options;
			};
			/**
			 * 오버레이, 보조지표 중 원하는 것의 파라메터 값 return;
			 * @param  {String} name 형태이름: over1_param1..macd_param1..
			 * @return {Object}      파라메터 모음.
			 */
			chartInstance.getSelectSeriesParams = function(name) {
				if(name.indexOf('over') > -1) {
					
					return overlay[name];
				} else {
					return assist[name];
				}
			};
			/**
			 * 주식차트를 다시 그릴때 활성화된 녀석이 삭제되는 것을 방지하기 위해 사용
			 * @param  {Boolean} isRealTime 실시간일때 true
			 * @return -
			 */
			chartInstance.subGraphScript = function (isRealTime) {
				subGraphScript('overlay', isRealTime);
			};
			/**
			 * 주식차트의 메인 차트 형식의 시리즈를 강제로 변경
			 * @param  {String} name 차트 형식의 Key Name - candle, hloc, line
			 * @return -
			 */
			chartInstance.switchMainSeries = function (name) {

				
				$.each(series.main, function(key, value) {

					if(key === name) {
						value.visible = true;
					} else {
						value.visible = false;
					}
				});
			};
		}

		assistSerieses.push('volume');

		subGraphScript('overlay');

		var chartInstance = {};

		chartInstance.chart = chart;

		bindAPIs(chartInstance);

		return chartInstance;
	};
	

	var getChartData = function(chart, _event, _legend, _overlay, _assist, _overlaySerieses, _assistSerieses, _thisType){
		var data = chart.getData();
		if(_overlaySerieses.length > 0) {
			try{
				for(var i = _overlaySerieses.length; i--;){
					var key = _overlaySerieses[i];

					if(key == 'over1' || key == 'over2' || key == 'over6' || key == 'over7') continue;
						
					var thisSeriesData = data.main;
					var thisLegend = _legend.main[key];
					var thisLegendInfo = thisLegend.items.info;
					var text = '';
					var count = 0;

					var tSeries = thisLegend.legend.series;

					for(var d = 0; d < tSeries.length; d++){
						var tData = thisSeriesData['DATA-'+tSeries[d]].data;
						for(var k = tData.length; k--;){
							if($.trim(tData[k].xaxis) == '' || tData[k].yaxis == null || tData[k].yaxis == undefined) continue;

							var shape = tData[k].shape;

							if(shape.mx < _event.x && shape.mx + shape.mw > _event.x){
								text += ' ' + thisLegend.legend.info[count] + ': ' + Number(tData[k].yaxis).toFixed(thisLegend.legend.toFixed).format();

								break;
							}

						}
					}

					if(text == '') break;
					thisLegendInfo.attr({
						text: text
					});
				}
			} catch(e){
				// console.log(e.message)
			}
		}
		if(_assistSerieses.length > 0) {
			try{
				for(var i = _assistSerieses.length; i--;){
					var key = _assistSerieses[i];

					var thisSeriesData = data[key];

					var thisLegend = _legend.assist[key];
					var thisLegendInfo = thisLegend.items.info;
					var text = '';
					var count = 0;
					for(var d in thisSeriesData){
						var thisData = thisSeriesData[''+d].data;
						for(var k = thisData.length; k--;){
							if($.trim(thisData[k].xaxis) == '' || thisData[k].yaxis == null || thisData[k].yaxis == undefined) continue;

								var shape = thisData[k].shape;//, next = thisData[k + 1].shape;
								if(shape.mx < _event.x && shape.mx + shape.mw > _event.x){
									text += ' ' + thisLegend.legend.info[count] + ': ' + Number(thisData[k].yaxis).toFixed(thisLegend.legend.toFixed).format();

									break;
								}

						}
						count ++;
					}

					if(text == '') break;
					thisLegendInfo.attr({
						text: text
					});
				}
			} catch(e){
				// console.log(e.message)
			}
		}
	};

	/* LEGEND 만들기  */
	var initLegend = function(chart, _stockStyles, _legend, _overlay, _assist, _overlaySerieses, _assistSerieses, _thisType){

		var styles = chart.getStyles();
		var legendStyles = _stockStyles;
		var legendTextSizeHalf = Math.round(legendStyles.legend.text.size / 2);
		if(_overlaySerieses.length > 0) {
			var graph_left = styles.main.layout._graphleft;
			var graph_top  = styles.main.layout._graphtop;
			var legendY = graph_top + legendTextSizeHalf + legendStyles.legend.paddingTop;
			var itemLeft = graph_left + legendStyles.legend.paddingLeft;
			if(_thisType !== 'option')
				_legend.main = _overlay.makeLegend(chart, _overlaySerieses, styles, legendStyles)
			else
				_overlay.changeLegend(chart, _overlaySerieses, styles, legendStyles);
		}
		if(_assistSerieses.length > 0){
			var itemLeft = graph_left + legendStyles.legend.paddingLeft;
			if(_thisType !== 'option')
				_legend.assist = _assist.makeLegend(chart, _assistSerieses, styles, legendStyles);
			else
				_assist.changeLegend(chart, _assistSerieses, styles, legendStyles);
		}
	};
	/* 차트형식 */
	var reDrawChartType = function(_this, _series){
		var value = _this.val();
		
		var thisSeries = _series.main;
		var count = 0;
		for(var i in thisSeries){
			if(i === 'type' || i.indexOf('over') > -1) continue;
			if(i === value){
				thisSeries[i].visible = true;
			} else {
				thisSeries[i].visible = false;
			}
		}
		
		return _series;
	};
	var reDrawOverLay = function(_selector, _stockStyles, _data, _this, _styles, _series, _seriesObject, _serieses, _overlay, _isRealTime){

		var value = _this, checked = true;

		if(!_isRealTime){

			for(var i = 0; i < _serieses.length; i++){
				if(_serieses[i] === value) return;
			}
		}
		var candleSeries = _seriesObject.main.candle;
		var stockStyle = _stockStyles;
		var style = null, series = null;
		switch(value){
		case 'over1':

			style = { over1_series1: stockStyle.over1.series1, over1_series2: stockStyle.over1.series2, over1_series3: stockStyle.over1.series3, over1_series4: stockStyle.over1.series4 };
			series = {
				over1_series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '5일선'},
				over1_series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '20일선'},
				over1_series3: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '60일선'},
				over1_series4: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '120일선'}
			}

			_data = _overlay.parseOver1Data(_data, series);
			break;

		}
		if(!_isRealTime){
			_serieses.push(value);
		}
		_seriesObject.main = $.extend({}, _seriesObject.main, series);
		_styles.main.series = $.extend(true, {}, _styles.main.series, style);

		return {series: _seriesObject, styles: _styles, overSerieses: _serieses};
	};
	var reDrawAssist = function(_selector, _stockStyles, _data, _this, _styles, _series, _seriesObject, _serieses, _assist, _left){
		var value = _this.val(), checked = _this.prop('checked');

		if(checked){
			for(var i = 0; i < _serieses.length; i++){
				if(_serieses[i] === value) return;
			}
			var candleSeries = _seriesObject.main.candle;
			var stockStyle = _stockStyles;
			var style = {}, series = null;
			var canvaspaddingleft = _left + (stockStyle.core_sub.layout.paddingLeft || 10);

			switch(value){
			case 'volume':
				style = {
					volume: { series: { series1: stockStyle.volume.series1 }}
				}
				style.volume = $.extend(true, {}, style.volume, stockStyle.core_sub);
				style.volume.layout.paddingLeft = canvaspaddingleft;
				series = {
					volume: {
						type: 'sub', series1: {series: 'column', xaxis: _series.xaxis, yaxis: _series.volume, label: '거래량'}
					}
				}
				_assist.parseVolumeData();
				break;
			
			}
			_serieses.push(value);
			_seriesObject = $.extend({}, _seriesObject, series);
			_styles = $.extend({}, _styles, style);

		} else {

			for(var i = 0; i < _serieses.length; i++){
				if(_serieses[i] === value) {
					_serieses.splice(i, 1);
					break;
				}
			}

			$(_styles).removeProp(value);
			$(_seriesObject).removeProp(value);

			_assist.removeLegend(value);
		}

		return {series: _seriesObject, styles: _styles, assistSerieses: _serieses};
	};

	var initMakeSeries = function(_series){
		return {
			main: {
				type: 'main',
				candle: { series: 'candle', xaxis: _series.xaxis, open: _series.open, high: _series.high, low: _series.low, close: _series.close, label: '종가', type: 'MAIN' },
				hloc:   { series: 'hloc',   xaxis: _series.xaxis, open: _series.open, high: _series.high, low: _series.low, close: _series.close, label: '종가', type: 'MAIN', visible: false },
				line:   { series: 'line',   xaxis: _series.xaxis, yaxis: _series.close, high: _series.high, low: _series.low, label: '종가', type: 'MAIN', visible: false }
			},
			volume: {
				type: 'sub', series1: {series: 'column', xaxis: _series.xaxis, yaxis: _series.volume, label: '거래량'}
			}
		}
	};

	var initMakeStyles = function(_styles, _stockStyles, _accWidth){
		var style = _stockStyles;
		var styles = {};
		styles = {
			main: {
				animate: {use: false},
				series: {
					candle: style.candle,
					hloc:   style.hloc,
					line:   style.line
				}
			},
			volume: {
				series: {
					series1: style.volume.series1
				}
			}
		}
		styles.main 	= $.extend(true, {}, styles.main, style.core_main);
		styles.volume 	= $.extend(true, {}, styles.volume, style.core_sub);

		styles.main.layout.paddingLeft 		= _accWidth + (style.core_main.layout.paddingLeft || 10);
		styles.volume.layout.paddingLeft 	= _accWidth + (style.core_sub.layout.paddingLeft || 10);

		/*styles.main.yAxis = {}, styles.volume.yAxis = {};
		styles.main.yAxis.position = 'right', styles.volume.yAxis.position = 'right';*/
		return styles;
	};

		// ajax data Loading
	var loadData = function(_options, _callback){
		if(_options.data.data){
			var arr = _options.data.data;
			if(_options.data.sort == "reverse") {
				arr.reverse();
			}
			if(_callback.hasOwnProperty('removeElement')) {
				_callback.removeElement();

			}
			_callback.init(arr);
		} else {
			$.ajax({
				url: _options.data.url, async: false,
				dataType: _options.data.type || 'json', jsonp: "callback",
				success: function(_data){

					var arr = [];
					if(_options.data.type === "" || _options.data.type !== "text"){
						var bld_depth = _options.data.jsonDepth.split('.');
						arr = _data;
						for(var i = 0, len = bld_depth.length; i < len; i++){
							arr = arr[bld_depth[i]];
						}
					} else {
						var lineArr = _data.split('\n'), dataTitles = [], titleCheck = true;
						for ( var i = 0, len = lineArr.length; i < len; i++) {
							if (len <= 1) continue;

							var objArr = lineArr[i].split('|');
							if (lineArr[i].indexOf("companyname") > -1 || objArr.length <= 1) {

							} else {
								if (titleCheck) {
									for ( var j = objArr.length; j--;) { dataTitles.unshift(objArr[j].trim()); }
									titleCheck = false;
								} else {
									if (objArr.length <= 1) continue;
									var obj = {};
									$.each(objArr, function(_j, _item) { obj[dataTitles[_j]] = _item.trim(); });

									if (_options.data.sort == "reverse") { arr.unshift(obj); }
									else 								{ arr.push(obj); }
								}

							}
						}
					}
					if(arr.length <= 0 && _callback.hasOwnProperty('removeElement')) {
						_callback.removeElement();

					}
					_callback.init(arr);
				},
				error: function(_e) {
					if(_callback.hasOwnProperty('removeElement'))
						_callback.removeElement();
					_callback.init([]);
					//console.log(_e);
				}
			})
		}
	};

	var noData = function(callback) {
		// 데이터가 없을 떄 악세사리 삭제
	};

	if (!window.webponent){
		window.webponent = {};
	}
	window.webponent.ministockchart = self;
	var parseData = function(_series, _data){
		var json = [];
		for(var i = 0; i < _data.length; i++){
			var data = {};
			for(var s in _series){

				data[s] = (_data[i])[_series[s]];
			}
			json.push(data);
		}
		return json;
	};

	// Getting Rectangle Size
	var getRectangle = function(_x, _y, _w, _h, _sw){
		var g = {doc: document, win: window};
		var TYPE = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
		var rect = {};
		if(TYPE === 'SVG'){
			rect.x = _sw > 0 ? _x + 0.5 : _x;
			rect.y = _sw > 0 ? _y + 0.5 : _y;
		} else {
			rect.x = _sw > 0 ? _x : _x + 0.5;
			rect.y = _sw > 0 ? _y : _y + 0.5;
		}
		rect.width = _w;
		rect.height = _sw > 0 ? _h - 1 : _h;
		rect.widthhalf = _sw > 0 ? Math.round(_w / 2) + 0.5 : Math.round(_w / 2);

		return rect;
	};

	var getYAxisValue = function(value, fixed){
		return Number(value).toFixed(fixed).format();
	};
	var makeText = function(chart, x, y, value, _textStyle, _textColor, _align){
		var item = chart.text(x, y, value).attr({
			'text-anchor': _align || 'start',
			'font-family': _textStyle.family,
			'font-size': _textStyle.size,
			fill: _textColor || _textStyle.color
		});
		x += 5 + item.getBBox().width;
		return {item: item, left: x};
	}
	var makeRect = function(chart, x, y, size, color){
		var item = chart.rect(x, y, size, size).attr({
			fill: color, 'stroke-width': 0, 'stroke': ''
		});
		x += 3 + item.getBBox().width;
		return {item: item, left: x};
	}
	var makeDoubleRect = function(chart, x, y, size, color){
		var item = chart.rect(x, y, size, size/2).attr({
			fill: color.color1, 'stroke-width': 0, 'stroke': ''
		});
		item2 = chart.rect(x, y+size/2, size, size/2).attr({
			fill: color.color2, 'stroke-width': 0, 'stroke': ''
		});

		group = chart.set();
		group.push(item);
		group.push(item2);
		x += 3 + item.getBBox().width;
		return {item: group, left: x};
	}
	var makeButton = function(chart, x, y, _styles){
		var group = [];
		var left = Math.round(x - _styles.size) + 0.5;
		// var top = Math.round(y - _styles.size/2) + 0.5;

		var rp = getRectangle(x - _styles.size, y - _styles.size/2, _styles.size, _styles.size, _styles.line.width);

		var item = chart.rect(rp.x, rp.y, rp.width, rp.height).attr({
			fill: _styles.area.color,
			stroke: _styles.line.color, 'stroke-width': _styles.line.width,
			opacity: 0
		});

		return {item: item, left: left - 7};
	};
	var getFillStyle = function(_w, _fillstyle, _gradientDirection, _state){
		var fillcolor = '';
		if(typeof _fillstyle == 'object') {
			if(!_fillstyle.hasOwnProperty('src')){ // Gradient
				if(_gradientDirection === 'horizontal') fillcolor = '0-';
				else fillcolor = '90-';
				for(var j = 0; j < _fillstyle.length; j++){
					var color = _fillstyle[j];
					fillcolor += color[1] + ":" + color[0] + '-';
				}
				fillcolor += '100';
			} else { // Pattern
				if((_w > 4 && _state !== 'over') || _state === 'over')
					fillcolor = 'url('+_fillstyle.src+')';
				else
					fillcolor = _fillstyle.color;
			}
		} else {
			fillcolor = _fillstyle;
		}
		return fillcolor;
	};

	/*
		오버레이
	 */
	window.webponent.STOCKOVERLAYMINI = function(){
		var _this = this;

		this.legend = {};
		_this.legend.series = {};
		_this.legend.items = {};
		_this.legend.itemr = {};

		this.makeLegend = function(_chart, _serieses, _styles, _legendStyles){
			var group = {};

			var graph_left = _styles.main.layout._graphleft;
			var graph_top  = _styles.main.layout._graphtop;
			var legendTextSizeHalf = Math.round(_legendStyles.legend.text.size / 2);
			var legendY = _styles.main.layout._canvastop + graph_top + legendTextSizeHalf + _legendStyles.legend.paddingTop;
			var itemLeft = graph_left + _legendStyles.legend.paddingLeft;
			var itemRight  = _styles.main.layout._graphleft + _styles.main.layout._graphwidthpx - _legendStyles.legend.paddingRight;
			for(var i = 0; i < _serieses.length; i++){
				var key = _serieses[i];

				if(_this.legend.items[key] != undefined) _this.removeLegend(key);

				var isRight = false;
				if(_serieses.length == 1 && (key == 'over3' || key == 'over4' || key == 'over5')) isRight = true;

				var items = _this['makeLegend'+key](_chart, itemLeft, legendY, legendTextSizeHalf, _legendStyles, isRight, itemRight);

				group[key] = items;

				_this.legend.series[key] = items.legend;
				_this.legend.items[key] = items.items;

				itemLeft = items.left;

			}
			return group;

		};
		this.changeLegend = function(_chart, _serieses, _styles, _legendStyles){
			for(var i = 0; i < _serieses.length; i++){
				var key = _serieses[i];

				_this['changeLegend'+key]();
			}
		};

		this.removeLegend = function(_value){
			var l = _this.legend.items[_value];
			for(var i in l){
				l[i].remove();
			}
			$(_this.legend.series).removeProp(_value);
			$(_this.legend.items).removeProp(_value);
		};

		this.toFrontLegend = function(_value) {
			var l = _this.legend.items[_value];
			for(var i in l){
				l[i].toFront();
			}
		};

		/* 이동평균 S */
		this.over1_param1 = 5, this.over1_param2 = 20, this.over1_param3 = 60, this.over1_param4 = 120;
		this.parseOver1Data = function ( _originalData, _series ) {
			over1_Sma5(_originalData, _series.over1_series1);
			over1_Sma20(_originalData, _series.over1_series2);
			over1_Sma60(_originalData, _series.over1_series3);
			over1_Sma120(_originalData, _series.over1_series4);

			return _originalData;
		};
		var sma5_yaxis = "", _arrData = null;
		var over1_Sma5 = function (_data, _series){
			if(sma5_yaxis == "") sma5_yaxis = _series.yaxis;
			var price = sma5_yaxis;
			// _arrData = new Array(_this.over1_param1);
			_arrData = [];
			for(var i = 0; i < _this.over1_param1; i ++)
				_arrData.push('');
			var t = null;
			for(var i = 0, len = _data.length; i < len; i++){
				if(_data.xaxis == " ") continue;
				t = _data[i];
				t.sma5 = parseSMA(_arrData, i, _this.over1_param1, Number(t[price]));
			}
			_series.yaxis = "sma5";
			try{
				return _data;
			} finally {
				price = null, _arrData = null;
				i = null, len = null;
			}
		};
		var sma20_yaxis = "";
		var over1_Sma20 = function (_data, _series){
			if(sma20_yaxis == "") sma20_yaxis = _series.yaxis;
			var price = sma20_yaxis;
			// _arrData = new Array(_this.over1_param2);
			_arrData = [];
			for(var i = 0; i < _this.over1_param2; i ++)
				_arrData.push('');
			var t = null;
			for(var i = 0, len = _data.length; i < len; i++){
				if(_data.xaxis == " ") continue;
				t = _data[i];
				t.sma20 = parseSMA(_arrData, i, _this.over1_param2, Number(t[price]));
			}
			_series.yaxis = "sma20";
			try{
				return _data;
			} finally {
				price = null, _arrData = null;
				i = null, len = null;
			}
		};
		var sma60_yaxis = "";
		var over1_Sma60 = function (_data, _series){
			if(sma60_yaxis == "") sma60_yaxis = _series.yaxis;
			var price = sma60_yaxis;
			// _arrData = new Array(_this.over1_param3);
			_arrData = [];
			for(var i = 0; i < _this.over1_param3; i ++)
				_arrData.push('');
			var t = null;
			for(var i = 0, len = _data.length; i < len; i++){
				if(_data.xaxis == " ") continue;
				t = _data[i];
				t.sma60 = parseSMA(_arrData, i, _this.over1_param3, Number(t[price]));
			}
			_series.yaxis = "sma60";
			try{
				return _data;
			} finally {
				price = null, _arrData = null;
				i = null, len = null;
			}
		};

		var sma120_yaxis = "";
		var over1_Sma120 = function (_data, _series){
			if(sma120_yaxis == "") sma120_yaxis = _series.yaxis;
			var price = sma120_yaxis;
			// _arrData = new Array(_this.over1_param3);
			_arrData = [];
			for(var i = 0; i < _this.over1_param4; i ++)
				_arrData.push('');
			var t = null;
			for(var i = 0, len = _data.length; i < len; i++){
				if(_data.xaxis == " ") continue;
				t = _data[i];
				t.sma120 = parseSMA(_arrData, i, _this.over1_param4, Number(t[price]));
			}
			_series.yaxis = "sma120";
			try{
				return _data;
			} finally {
				price = null, _arrData = null;
				i = null, len = null;
			}
		};
		var parseSMA = function(_arr, _index, _param, _data) {
			_arr[_index % _param] = _data;
			var dClose = 0;
			if(_index >= _param - 1){
				for(var i = _param; i--;) dClose += _arr[i];
				dClose = dClose / _param;
				return dClose;
			} else {
				return null;
			}
		};
		var initLegendOver1 = function(_styles){
			return {
				title : '이동평균',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				color3: _styles.series3.line.normal.color,
				color4: _styles.series4.line.normal.color
			}
		};
		this.makeLegendover1 = function(chart, x, y, half, _styles){
			var item = null, group = {};
			var legend = initLegendOver1(_styles.over1);
			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, _this.over1_param1, legendStyles.text, legend.color1);
			group.param1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, _this.over1_param2, legendStyles.text, legend.color2);
			group.param2 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color3);
			group.rect3 = item.item;

			item = makeText(chart, item.left, y, _this.over1_param3, legendStyles.text, legend.color3);
			group.param3 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color4);
			group.rect4 = item.item;

			item = makeText(chart, item.left, y, _this.over1_param4, legendStyles.text, legend.color4);
			group.param4 = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		this.changeLegendover1 = function () {
			var itemsOver = _this.legend.items.over1;
			itemsOver.param1.attr({'text': _this.over1_param1});
			itemsOver.param2.attr({'text': _this.over1_param2});
			itemsOver.param3.attr({'text': _this.over1_param3});
			itemsOver.param4.attr({'text': _this.over1_param4});
			return _this.legend;
		};
		/* 이동평균 E */

	};
	/*
		보조지표
	 */
	window.webponent.STOCKASSISTMINI = function(_selector){

		var _this = this;

		this.legend = {};
		_this.legend.series = {};
		_this.legend.items = {};

		this.makeLegend = function(_chart, _serieses, _styles, _legendStyles){
			var group = {};
			var legendTextSizeHalf = Math.round(_legendStyles.legend.text.size / 2);
			for(var i = 0; i < _serieses.length; i++){
				var key = _serieses[i];

				if(_this.legend.items[key] != undefined) _this.removeLegend(key);

				var graph_left = _styles[key].layout._graphleft;
				var graph_top  = _styles[key].layout._graphtop;

				var legendY = _styles[key].layout._canvastop + graph_top + legendTextSizeHalf + _legendStyles.legend.paddingTop;
				var itemLeft = graph_left + _legendStyles.legend.paddingLeft;
				var itemRight  = graph_left + _styles[key].layout._graphwidthpx - _legendStyles.legend.paddingRight;
				var items = _this['makeLegend'+key](_chart, itemLeft, itemRight, legendY, legendTextSizeHalf, _legendStyles);

				group[key] = items;

				_this.legend.series[key] = items.legend;
				_this.legend.items[key] = items.items;
			}
			return group;
		};

		this.changeLegend = function(_chart, _serieses, _styles, _legendStyles){
			for(var i = 0; i < _serieses.length; i++){
				var key = _serieses[i];

				_this['changeLegend'+key]();
			}
		};
		this.removeLegend = function(_value){
			var l = _this.legend.items[_value];
			for(var i in l){
				l[i].remove();
			}
			$(_this.legend.series).removeProp(_value);
			$(_this.legend.items).removeProp(_value);
		};

		this.toFrontLegend = function(_value) {
			var l = _this.legend.items[_value];
			for(var i in l){
				l[i].toFront();
			}
		};

		/* 거래량 S */
		this.parseVolumeData = function(){ };

		var initLegendVolume = function(_styles){
			return {
				title : '거래량',
				color1: _styles.series1.area.normal.color,
				info: ['거래량'],
				toFixed: 0
			}
		};
		this.makeLegendvolume = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().volume['DATA-series1'].data;
			var item = null, group = {};
			var legend = initLegendVolume(_styles.volume);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, getFillStyle(legendStyles.rectSize, legend.color1, 'horizontal', 'none'));
			group.rect1 = item.item;

			// item = makeButton(chart, rx, y, legendStyles.button);
			// group.button = item.item;

			// item.item.click(function(){
			// 	$("input[value='volume']", _selector).trigger("click");
			// });

			item = makeText(chart, rx, y, legend.title + ": "+getYAxisValue(data[data.length - 1].yaxis, legend.toFixed), legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};

		this.changeLegendvolume = function () { };
		/* 거래량 E */

	};

	window.webponent.STOCKSLIDERMINI = function(_selector, _left, _height, _sliderHtml){
		var _this = this;

		var selector = _selector;
		var CHART_WIDTH = selector.width();
		var CONTAINER_LEFT = _left, CONTAINER_HEIGHT = _height, CONTAINER_WIDTH = CHART_WIDTH - CONTAINER_LEFT;
		var SLIDER_WIDTH = 0;
		var itemCount = 0;
		var downPos = {};

		this.leftSliderIndecator = 0, this.rightSliderIndecator = 0;

		this.sliderDownChk = false;

		this.slider = null, this.maximum = null;
		this.plusButton = null, this.defaultButton = null, this.minusButton = null;
		this.init = function(_data, _itemCount){
			selector.append(_sliderHtml);

			_this.maximum = _data.length;
			
			itemCount = _itemCount;
			
			if(_this.maximum < itemCount) {
			
				itemCount = _this.maximum;
			}

			_this.leftSliderIndecator = _this.maximum - itemCount;
			_this.rightSliderIndecator = _this.maximum;


			$('.sliderContainer', selector).css({
				width: CHART_WIDTH, 
				height: CONTAINER_HEIGHT+'px'
			});
			$('.sliderButton', selector).css({
				'height': CONTAINER_HEIGHT+'px'
			});
			SLIDER_WIDTH = CHART_WIDTH - CONTAINER_LEFT - $('.sliderButton', selector).width() - 10;

			var buttonWidth = SLIDER_WIDTH * (itemCount / _this.maximum);

			$('.sliderArea', selector).css({
				left: CONTAINER_LEFT+'px', 
				width: SLIDER_WIDTH, 
				height: CONTAINER_HEIGHT+'px'
			});

			_this.slider = $('.slider', selector);
			_this.slider.css({
				top: (CONTAINER_HEIGHT/2) - (_this.slider.height()/2), 
				left: (SLIDER_WIDTH - buttonWidth) +'px', 
				width: buttonWidth,
				cursor: 'pointer'
			});

			if(_data.length <= 0) {
				_this.slider.hide();
			} else {
				_this.slider.show();
			}

			var leftIndecator = 0, rightIndecator = 0;
			var sliderEvent = false;
			if(('createTouch' in document) || ('ontouchstart' in document)){
				var svg = selector.children().get(0);
				svg.addEventListener('touchstart', function(event){
					if(event.layerX < 0){ //Android
						downPos.x = event.touches[0].pageX || event.changedTouches[0].pageX;// + event.layerX;
					} else {
						downPos.x = event.layerX;
					}
					downPos.y = event.pageY;
					downPos.leftSliderIndecator = _this.leftSliderIndecator;
					_this.sliderDownChk = true;
				})

				svg.addEventListener('touchend', function(event){
					_this.sliderDownChk = false;
				}, false);

				$('.slider', selector).bind('touchstart', function(event){
					// if(event.layerX < 0){ //Android
						downPos.x = $(event.target).closest('.slider').position().left;//event.target.pageX;// || event.target.changedTouches[0].pageX;// + event.layerX;
					// } else {
					// 	downPos.x = event.target.layerX;
					// }
					downPos.y = $(event.target).closest('.slider').position().top;//event.pageY;
					downPos.leftSliderIndecator = _this.leftSliderIndecator;
					_this.sliderDownChk = true;
				}).bind('touchend', function(event){
					_this.sliderDownChk = false;
				}).swipe({
					swipeStatus: function(event, phase, direction, distance , duration , fingerCount){
						if(direction === 'up' || direction === 'down'){
							event.preventDefault();
							return;
						}

						if(_this.sliderDownChk){
							_this.touchMoveHandler(event, direction, distance, 'button');
						}
					}
				});
			} else {
				selector.delegate('.slider', 'mousedown', function(event){
					_this.sliderDownChk = true;
					if (typeof event.layerX !== 'undefined') { // Opera
						downPos.x = event.layerX, downPos.y = event.layerY;
				    } else if(typeof event.offsetX !== 'undefined') { // Firefox
				    	downPos.x = event.offsetX, downPos.y = event.offsetY;
				    } else {
				    	downPos.x = event.clientX - $(event.target).offset().left;
				    	downPos.y = event.clientY - $(event.target).offset().top;
					}
					downPos.left = Math.floor(Number(_this.slider.css('left').split('px')[0]));
					downPos.width = SLIDER_WIDTH * (itemCount / _this.maximum);
					downPos.parentWidth = Number($(this).width());
				}).delegate('.slider', 'mousemove', function(event){
					if(_this.sliderDownChk){
						event.preventDefault();
						sliderEvent = true;
						mouseMoveHandler(event, downPos, "button", _this.maximum);

					}
				}).delegate('.slider', 'mouseup', function(event){
					_this.sliderDownChk = false;

				}).delegate('.slider', 'mouseout', function(event){
					sliderEvent = false;

				}).mousemove(function(event){
					if(_this.sliderDownChk && _this.slider.css('display') != 'none' && !sliderEvent){

						mouseMoveHandler(event, downPos, "select", _this.maximum);
					}
				}).mouseup(function(event){
					_this.sliderDownChk = false;
				});
			}

			if(_this.maximum == itemCount) {
				_this.slider.hide();
			}


			createButton();
		};
		// this.touchMoveHandler = function (_event, downPos, _type, _itemMax, direction, distance) {
		this.touchMoveHandler = function (_event, direction, distance, _type) {
			if(downPos.x >= 0 && downPos.x <= SLIDER_WIDTH){
				var downX = downPos.x, move = null;
				move = Math.round(distance / 3);//Math.floor(downX - distance);
				// if(direction === 'right') move = move * -1;

				if(direction === 'right' && _type != 'button' || direction === 'left' && _type == 'button') move = move * -1;
				// if(_event.layerX < 0){ //Android
					// move = Math.floor(downX - _event.touches[0].pageX);
				// } else {
				// 	move = Math.floor(downX - _event.layerX)/2;
				// }
				_this.leftSliderIndecator = downPos.leftSliderIndecator + move;
				_this.rightSliderIndecator = _this.leftSliderIndecator + itemCount;
				if(_this.leftSliderIndecator < 0) {
					_this.leftSliderIndecator = 0, _this.rightSliderIndecator = _this.leftSliderIndecator + itemCount;
				}else if(_this.rightSliderIndecator > SLIDER_WIDTH || _this.leftSliderIndecator > (_this.maximum - itemCount)){
					_this.leftSliderIndecator = _this.maximum - itemCount;
					_this.rightSliderIndecator = _this.maximum;
				}
				_this.slider[0].style.left = SLIDER_WIDTH * (_this.leftSliderIndecator / _this.maximum)+'px';

			}
		};
		var mouseMoveHandler = function (_event, downPos, _type, _itemMax) {
			if(!_this.sliderDownChk) return;

			if(downPos.left >= 0 && downPos.left + downPos.width <= SLIDER_WIDTH){

				var left = downPos.left;
				var mouseX = null;
				if (typeof _event.layerX !== 'undefined') { // Opera
					if(_event.layerX < 0 && _event.touches.length > 0){ //Android
						mouseX = _event.touches[0].pageX + _event.layerX;
					} else {
						mouseX = _event.layerX;
					}
				} else if (typeof _event.offsetX !== 'undefined') {
					mouseX = _event.offsetX;
				} else {
					mouseX = _event.clientX - ($(_event.target).offset().left);
				}
				if(_type == "button"){ // Slider
					if(_event.target.nodeName == "SPAN" || $(_event.target).attr('class') == "slider"){
						if(downPos.x < mouseX) left = left + (mouseX - downPos.x);
						else if(downPos.x > mouseX) left = left - (downPos.x - mouseX);
					} else {
						left = mouseX - downPos.x;
					}
				}else{ // SliderBOX & SelectCanvas
					if($(_event.target).attr('class').indexOf('slider-') > -1) {
						left = SLIDER_WIDTH;
					} else {
						left = mouseX - downPos.x;
					}
				}
				if(left < 0 || mouseX < 0) {
					left = 0;
				}
				if(left + downPos.width > SLIDER_WIDTH || mouseX > SLIDER_WIDTH) {
					left = SLIDER_WIDTH - downPos.width;
				}

				_this.slider[0].style.left = left + 'px';
				_this.leftSliderIndecator = Math.round((left / SLIDER_WIDTH) * _itemMax);
				_this.rightSliderIndecator = Math.round(((left + downPos.width) / SLIDER_WIDTH) * _itemMax);

				downPos.left = left;
			}
		};

		var createButton = function(){
			_this.plusButton = $('.slider-plus', selector);
			_this.defaultButton = $('.slider-default', selector);
			_this.minusButton = $('.slider-minus', selector);
		}

		this.sliderUpdate = function(state, _data, _itemCount){
			itemCount = _itemCount;

			var buttonWidth = SLIDER_WIDTH * (itemCount / _this.maximum); // 새로구해진 넓이
			var sWidth = _this.slider.width(), sLeft = Number(_this.slider.css('left').split('px')[0]); // 기존 slider 넓이, x 축 위치
			var dWidth = sWidth - buttonWidth;
			if(state == 'plus'){
				_this.slider.css({'width': buttonWidth + 'px', 'left': sLeft + dWidth});
				_this.leftSliderIndecator = _this.rightSliderIndecator - itemCount;
				if(_this.leftSliderIndecator != 0 || _this.rightSliderIndecator != _this.maximum){
					_this.slider.css('display', '');
				}
			} else if(state == 'minus'){
				_this.leftSliderIndecator = _this.rightSliderIndecator - itemCount;
				if(_this.leftSliderIndecator < 0){
					var idx = _this.leftSliderIndecator;
					_this.leftSliderIndecator = 0;
					_this.rightSliderIndecator = _this.rightSliderIndecator + (idx * -1);
					_this.slider.css({'width': buttonWidth + 'px', 'left': 0});
				} else {
					_this.slider.css({'width': buttonWidth + 'px', 'left': sLeft + dWidth});
				}
				if(_this.leftSliderIndecator == 0 && _this.rightSliderIndecator >= _this.maximum){
					_this.slider.css('display', 'none');
					_this.rightSliderIndecator = _this.maximum;
				}
			} else {
				_this.leftSliderIndecator = _this.rightSliderIndecator - itemCount;
				if(_this.leftSliderIndecator < 0){
					var idx = _this.leftSliderIndecator;
					_this.leftSliderIndecator = 0;
					_this.rightSliderIndecator = _this.rightSliderIndecator + (idx * -1);
					_this.slider.css({'width': buttonWidth + 'px', 'left': 0});
				} else {
					_this.slider.css({'width': buttonWidth + 'px', 'left': sLeft + dWidth});
				}

				if(_this.leftSliderIndecator == 0 && _this.rightSliderIndecator == _this.maximum){
					_this.slider.css('display', 'none');
				} else {
					_this.slider.css('display', '');
				}
			}

		};

		this.sliderReInit = function(_data, _itemCount) {
			
			if(_data.length <= 0) {
				_this.slider.hide();
			} else {
				_this.slider.show();
			}
			_this.maximum = _data.length;
			_this.leftSliderIndecator = _this.maximum - _itemCount;
			_this.rightSliderIndecator = _this.maximum;
			var buttonWidth = SLIDER_WIDTH * (_itemCount / _this.maximum);

			_this.slider.css({
				left: (SLIDER_WIDTH - buttonWidth) +'px', 
				width: buttonWidth, 
			});
			_this.sliderUpdate('default', _data, _itemCount);
		};

		return _this;
	};

 })();
