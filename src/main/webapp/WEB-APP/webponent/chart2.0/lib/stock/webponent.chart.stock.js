/*
 * http://www.cyber-i.com/
 * 최초 작성자 : dajinnim@cyber-i.com
 * 마지막 수정자 : dajinnim@cyber-i.com
 */
(function() {

	var self = {};
	// 종합차트 사이즈에 관한 초기 설정
	var stockDefaultStyle = {
		stockmenuwidth: 150,
		stocksliderheight: 30
	};
	// 종합차트 지표들의 기본 세팅값
	// 기본 세팅값들이 증권사별로 다를 때 이곳에서 변경
	// 지표가 추가될경우 하단에 추가.
	var stockInitParams = {
		"over1": 	[5, 20, 60, 120], 	// 이동평균
		"over2": 	[9, 26, 52],		// 일목균형
		"over3": 	[20],				// Bollinger Band
		"over4": 	[0.02],				// Parabollic SAR
		"over5": 	[20, 5],			// Envelop
		"over6": 	[5, 2, 10],			// 그물차트
		"over7": 	[10],				// 매물분석도
		"volume": 	[],
		"macd": 	[12, 26, 9],
		"slowstc": 	[5, 3, 3],
		"faststc": 	[5, 3],
		"rsi": 		[10, 5],
		"dmi": 		[14],
		"adx": 		[14, 14, 9],
		"obv": 		[],
		"sonar": 	[12, 26, 9],
		"cci": 		[9],
		"vr": 		[20],
		"trix": 	[5, 3],
		"pmao": 	[5, 20],
		"psychology": [10],
		"williams": [14, 3],
		"roc": 		[12],
		"chaikins": [3, 10]
	};
	/**
	 * 화면에서 초기화하면 제일 먼저 실행되는 Init 함수
	 * @param  {jQuery selector} 	_selector jQuery selector
	 * @param  {Object} _options  	사용자 정의 옵션
	 * @param  {Object} _styles   	사용자 정의 스타일
	 * @param  {Object} _series   	사용자 정의 시리즈
	 * @param  {Html} _sliderHtml   슬라이더 HTML : 없으면 내부 HTML로 사용됨.
	 * @return {chart}           	차트 객체
	 */
	self.init = function(_selector, _options, _styles, _series, _sliderHtml){

		var g = {doc: document, win: window};
		
		var TYPE = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");

		_options.use.stock = true;
		// 아코디언 메뉴 넓이
		var accWidth = stockDefaultStyle.stockmenuwidth;
		if(_options.stock.menuWidth != undefined) {
			accWidth = _options.stock.menuWidth;
		}
		// 슬라이더 높이
		var sliderHeight = stockDefaultStyle.stocksliderheight;
		if(_options.stock.sliderHeight != undefined) {
			sliderHeight = _options.stock.sliderHeight;
		}
		// 차트의 오버레이, 보조지표들의 기본세팅값이 회사별로 다르게 들어올경우
		// 외부에서 수정가능하도록 처리
		if(_options.stock.stockParams != undefined) {
			stockInitParams = $.extend(true, stockInitParams, _options.stock.stockParams);
		}

		// 기본 아이템 갯수 (한 슬라이더 안에 보여질 아이템 개수)
		var itemCount = _options.stock.itemCount || 80; 

		// 확대, 축소, 초기화 버튼 누를때마다 아이템 개수가 달라짐.
		var itemCountArray = [10,20,30,50,80,140,200,280,400,'*'];

		// 기본 아이템 개수 index
		var itemCountIndex = 4;

		// 종합차트용 초기 세팅 스타일 값
		var stockStyles = _styles.useStyles;

		_options.division = stockStyles.division;

		var series = initMakeSeries(_series);
		var styles = initMakeStyles(_styles, stockStyles, accWidth);

		var data = [], sliderData = [];

		// 데이터 호출,
		loadData(_options, {
			init: function(_data){
				if(_data.length < itemCount) {
					
					for(var i = 0, len = itemCountArray.length; i < len; i ++) {
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

		// 차트 초기화
		var chart = webponent.chart.init(_selector, _options, styles, series);

		// 차트 범례 OBJECT
		var stockLegend = {};

		// 범례 : 메인 초기화
		stockLegend.main = {};

		// 범례 : 서브 초기화
		stockLegend.assist = {};
		
		// 오버레이 모음
		var overlaySerieses = []; 
		
		// 보조지표 모음
		var assistSerieses = [];
		
		// 오버레이		
		var overlay = new webponent.STOCKOVERLAY();
		
		// 보조지표
		var assist = new webponent.STOCKASSIST(_selector);
		
		// 차트형식에서 'three', 'pnf' 인지 아닌지
 		var chartType = '';
		
		/**
		 * 왼쪽 메뉴(Accordion) 생성
		 * @param  {Chart} _chart   차트 객체
		 * @param  {Array} _data    데이터
		 * @param  {Object} _styles  스타일
		 * @param  {Object} _series  확장된 시리즈
		 * @param  {Object} __series 사용자 입력 시리즈
		 * @return -
		 */
		function createAccordion (_chart, _data, _styles, _series, __series){
			
			_selector.css('overflow', 'hidden');
			_selector.append(accordionHtml);

			$('fieldset', _selector).css('width', accWidth+'px');

			// 좌측 아코디언 메뉴 생성
			$.accordion('.accordionArea', {
				'parent'	: _selector, 
				'width'		: accWidth, 
				'height'	: _selector.height() - sliderHeight, 
				'speed'		: 200, 
				'mode'		: "wide"
			});

			// 좌측메뉴에 첫번째 메뉴 활성화
			$("div.title", _selector).eq(0).trigger('click');

			$('.stockchart-type', _selector)
				.find('input[type=radio]')
				.attr('name', 'charttype_'+_selector.attr('class'));
			/*
			[]_options : options list fieldset
			[]_select : select box
			[]_container : options이 복사되는 레이어
			 */
			var overlay_options 	= $('.stockchart-options-overlay', _selector);
			var overlay_layer 		= $('.stockchart-layer-overlay', _selector);
			var overlay_select 		= $('select[name=stockchart-select-overlay]', overlay_layer).css({width: '90%'});
			var overlay_container 	= $('.select-container-overlay', overlay_layer);

			var assist_options 		= $('.stockchart-options-assist', _selector);
			var assist_layer		= $('.stockchart-layer-assist', _selector);
			var assist_select 		= $('select[name=stockchart-select-assist]', assist_layer).css({width: '90%'});
			var assist_container 	= $('.select-container-assist', assist_layer);

			/**
			 * 아코디언 메뉴에서 설정 탭 영역 HTML을 메뉴HTML에 옮기기
			 * 활성화된 지표의 설정 HTML을 붙이기 앞서 기존 활성 지표 설정 HTML을 원래자리로 갖다놓음.
			 * @param  {String} _type 오버레이, 보조지표인지 구분값
			 * @return -
			 */
			function cloneOldContainer (_type){
				var selectBox, optionsBox, container;
				if(_type === 'overlay'){
					selectBox 		= overlay_select;
					optionsBox 		= overlay_options;
					containerBox 	= overlay_container;
				} else {
					selectBox 		= assist_select;
					optionsBox 		= assist_options;
					containerBox 	= assist_container;
				}
				var oldClass = containerBox.children().attr('class');
				optionsBox.find('fieldset.'+oldClass).html(containerBox.find('fieldset').children().clone());
			};

			/**
			 * 아코디언 메뉴에서 활성화된 지표에 따라 설정 탭 HTML이 변경
			 * @param  {Nodes} _this  클릭된 체크박스 셀렉터
			 * @param  {String} _type 오버레이, 보조지표인지 구분값
			 * @return -
			 */
			function settingContainer (_this, _type){
				var selectBox, optionsBox, container;
				if(_type === 'overlay'){
					selectBox 		= overlay_select;
					optionsBox 		= overlay_options;
					containerBox 	= overlay_container;
				} else {
					selectBox 		= assist_select;
					optionsBox 		= assist_options;
					containerBox 	= assist_container;
				}
				if(!_this.is(':checked')) {
					var value = _this.val();
					selectBox.find('option[value='+value+']').remove();
					optionsBox.find('fieldset.'+value).html(containerBox.find('fieldset').children().clone());

					var $option = optionsBox.find('fieldset.'+selectBox.eq(0).val());
					containerBox.html($option.clone());
					return;
				}
				cloneOldContainer(_type);

				var idx = $(".stockchart-"+_type+" li", _selector).index(_this.parents(".stockchart-"+_type+" ul li"));

				selectBox.children().attr('selected', false);
				selectBox.prepend("<option value="+_this.attr('value')+" selected='selected'>"+_this.attr('title')+"</option>");

				var $option = optionsBox.find('fieldset').eq(idx);
				containerBox.html($option.clone());

			};

			overlay_select.change(function(){
				cloneOldContainer('overlay');

				var $option = overlay_options.find('fieldset.'+$(this).val());
				overlay_container.html($option.clone());
			});
			assist_select.change(function(){
				cloneOldContainer('assist');

				var $option = assist_options.find('fieldset.'+$(this).val());
				assist_container.html($option.clone());
			});

			var elementGroup = null;
			var menuItems = $('.item', _selector);
			menuItems.each(function(idx){

				if(idx == 0){ // 차트형식

					$(this).on('click', 'input[type="radio"]', function(){

						if(overlay.over7_select) {
							chart.deleteSaleAnalysis(true);
						}
						chartType = $(this).val();
						if(chartType !== 'three' && chartType !== 'pnf'){
							_options.use.tip = true;
							_options.use.selectItem = true;
							if(elementGroup != null){
								var set = chart.set(elementGroup);
								set.remove();
								elementGroup = null;
							}
							chart.reDraw(sliderData, _styles, reDrawChartType($(this), series), false, true);
							maxMinLabel(reDrawChartType($(this), series));
							slider.slider.css('display', '');

							$('input', _selector).attr('disabled', false);
						} else {

							_options.use.tip = false;
							_options.use.selectItem = false;
							if(chartType === 'three'){
								if(elementGroup != null){
									var set = chart.set(elementGroup);
									set.remove();
									elementGroup = null;
								}
								elementGroup = initThreeLine(chart, _options, data, __series, stockStyles);
							} else if(chartType === 'pnf'){
								if(elementGroup != null){
									var set = chart.set(elementGroup);
									set.remove();
									elementGroup = null;
								}
								elementGroup = initPnF(chart, _options, data, __series, stockStyles);
							}

							slider.slider.css('display', 'none');

							$('input', _selector).attr('disabled', true);
							$('.stockchart-type', _selector).find('input[type=radio]').attr('disabled', false);

						}

					});
				} else { 
					// 오버레이, 보조지표
					$(this).on("click", "input[type='checkbox']", function(){
						var parent = $(this).closest('fieldset'), type = '';
						// 오버레이
						if(parent.attr('class').indexOf('over') > -1){
							type = 'overlay';
							var value = $(this).val();

							var returnData = reDrawOverLay(_selector, stockStyles, data, $(this), _styles, __series, _series, overlaySerieses, overlay);
							overlaySerieses = returnData.overSerieses;

							_styles = returnData.styles, _series = returnData.series;
							styles = $.extend(true, {}, styles, _styles), series = $.extend({}, series, _series);

							if(value === 'over2'){
								slider.maximum = data.length;
								if($(this).prop('checked')){
									itemCount += overlay.over2_param1 ;
									
									if(slider.rightSliderIndecator + overlay.over2_param1 > data.length - (overlay.over2_param1)) slider.rightSliderIndecator += overlay.over2_param1;
								} else {
									itemCount -= (overlay.over2_param1);
									if(slider.rightSliderIndecator > data.length) slider.rightSliderIndecator = slider.maximum;
								}
								slider.sliderUpdate('default', data, itemCount)
							} else if(value === 'over7'){
								if($(this).prop('checked')){

									overlay.over7_select = true;
									chart.saleAnalysis(overlay.over7_param1, __series, stockStyles.over7.series1);
								} else {
									overlay.over7_select = false;
									chart.deleteSaleAnalysis(false);
								}
							}
							sliceData(data, returnData);

							if(!$(this).prop('checked')){
								$(stockLegend.main).removeProp(value);
							}

							settingContainer($(this), type);
						} else {

							// 보조지표
							type = 'assist';
							var returnData = reDrawAssist(_selector, stockStyles, data, $(this), _styles, __series, _series, assistSerieses, assist, accWidth);
							assistSerieses = returnData.assistSerieses;

							_styles = returnData.styles, _series = returnData.series;

							styles = _styles, series = _series;

							sliceData(data, returnData);

							for(var k = assistSerieses.length; k--;){
								$(stockLegend.assist).removeProp(assistSerieses[k]);
							}

							settingContainer($(this), type);
						}
					});
				}
			}).on("click", "input[type='button']", function(){
				var button = $(this), 
					btnClass = button.attr('class').split(' ')[0], 
					parent = button.parent();

				if(btnClass === 'tab01' || btnClass === 'tab02'){
					var parentType = $(this).parent().attr('class').indexOf('overlay') > -1 ? 'overlay': 'assist';

					var layer = $('.stockchart-layer-'+parentType, _selector);
					
					if(btnClass === 'tab01') {
						layer.css('display', 'none');
					} else {
						layer.css({
							'display': 'block', 'width': accWidth, 'height': '100%' 
						});
					}

					button.siblings().removeClass('sel');
					button.addClass('sel');
				} else {
					var parentType = '';
					if(btnClass === 'stockchart-default'){ // 기본값 버튼
						parentType = $(this).parent().parent().attr('class').indexOf('overlay') > -1 ? 'overlay': 'assist';
					} else {
						parentType = $(this).closest('div').attr('class').indexOf('overlay') > -1 ? 'overlay': 'assist';
					}
					changeOptionsParam($(this), parentType, (parentType === 'overlay') ? overlay : assist, _data, __series, _series);
				}
			});
			assist_select.append("<option value='volume' selected='selected'>거래량</option>");
		};
		/**
		 * 오버레이 다시 그리기
		 * @param  {Node}  thisCheckbox 선택되어있는 체크박스
		 * @param  {Boolean} isLast       선택되어있는 체크박스들 중 마지막 호출이면
		 * @return -
		 */
		function overlaySetReDraw (thisCheckbox, isLast){
			var type = 'overlay';
			var value = thisCheckbox.val();
			
			var returnData = reDrawOverLay(_selector, stockStyles, data, thisCheckbox, styles, _series, series, overlaySerieses, overlay);
			_overlaySerieses = returnData.overSerieses;

			styles = $.extend(true, {}, styles, returnData.styles); 
			series = $.extend({}, series, returnData.series);

			if(value === 'over2'){
				slider.maximum = data.length;
				
				itemCount += overlay.over2_param1 ;
				
				if(slider.rightSliderIndecator + overlay.over2_param1 > data.length - (overlay.over2_param1)) {

					slider.rightSliderIndecator += overlay.over2_param1;
				}

				slider.sliderUpdate('default', data, itemCount)
			}
			if(isLast){

				sliceData(data, returnData);
			}

		};
		/**
		 * 보조지표 다시 그리기
		 * @param  {Node}  thisCheckbox 선택되어있는 체크박스
		 * @param  {Boolean} isLast       선택되어있는 체크박스들 중 마지막 호출이면
		 * @return -
		 */
		function assistSetReDraw (thisCheckbox, isLast) {
			var type = 'assist';
			var value = thisCheckbox.val();

			var returnData = reDrawAssist(_selector, stockStyles, data, thisCheckbox, styles, _series, series, assistSerieses, assist, accWidth);
			assistSerieses = returnData.assistSerieses;
			styles = $.extend(true, {}, styles, returnData.styles), series = $.extend({}, series, returnData.series);

			if(isLast){
				sliceData(data, returnData);

				for(var k = assistSerieses.length; k--;){
					$(stockLegend.assist).removeProp(assistSerieses[k]);
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
		/**
		 * 원본데이터는 300개이지만 실제 차트에 표현된 데이터의 개수는 초기 80개로 제한되어있다.
		 * 슬라이더 만큼 데이터를 잘라주는 함수
		 * 이곳에서 차트에 reDraw 를 호출하여 차트를 표현한다.
		 * @param  {Array} _data       원본 데이터
		 * @param  {Array} _returnData 오버레이나 보조지표가 적용된 데이터
		 * @param  {String} _thisType   슬라이더를 움직여서 호출되면 'slider' 가 들어온다.
		 * @return -
		 */
		function sliceData (_data, _returnData, _thisType){

			var tempData = _data.concat([]);

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
				chart.setStockOriginalData(_data);
			}

			chart.reDraw(sliderData, _returnData.styles, _returnData.series, true, chkReDraw, _thisType);

			if(maxCount > 0) {
				maxMinLabel(_returnData.series);
			}

			if(_thisType === 'slider') {

				overlay.toFrontLegend();
				assist.toFrontLegend();
				
				return;
			}

			if(maxCount <= 0) {

				return;
			}

			waitForFinalEvent(function(){
				// 종합차트 범례 초기화
				initLegend(chart, stockStyles, stockLegend, overlay, assist, overlaySerieses, assistSerieses, _thisType);

			}, 1, "legend making");
			chkReDraw = true;

		};
		// 메인영역상에 보이는 최대값/최소값 텍스트 Node
		var maxLabel = null, minLabel = null;
		// 메인영역상에 보이는 최대값/최소값 화살표 Node
		var maxArrow = null, minArrow = null;
		var imagesObject = {};
		/**
		 * 최고/최소 라벨 및 화살표이미지 값, 위치, 스타일 적용
		 * @param  {Object} _series 차트 시리즈
		 * @return -
		 */
		function maxMinLabel ( _series){
			
			var maxStyle = stockStyles.core_main.maxLabel;
			var minStyle = stockStyles.core_main.minLabel;
			/**
			 * 최고/최소 화살표 이미지 로딩이 완료되면 실행
			 * @return -
			 */
			function drawLabel (){
				var selectorWidth = (_selector.width() + accWidth) / 2;
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
				var maxDataShape = null, minDataShape = null;

				for(var i = 0; i < count; i ++){
					var maxPrice = Number(thisData[i].high || thisData[i].yaxis);
					var minPrice = Number(thisData[i].low || thisData[i].yaxis);
					if(maxPrice >= maxValue){
						maxValue = maxPrice;
						maxData = thisData[i];
						maxDataShape = maxData.shape;
					}
					if(minPrice <= minValue){
						minValue = minPrice;
						minData = thisData[i];
						minDataShape = minData.shape;
					}
				}

				if(maxLabel == null){
					maxArrow = chart.image(maxStyle.arrow, 0, 0, imagesObject.max.width, imagesObject.max.height);
					maxLabel = chart.text().attr({
						'text-anchor': 'start',
						'font-family': maxStyle.family,
						'font-size': maxStyle.size,
						'fill': maxStyle.color || '#000000'
					});
				}
				var maxBBox = maxLabel.getBBox();
				var maxX = maxDataShape.x, 
					maxWHalf = (thisSeries.key === 'candle') ? Math.round(maxDataShape.width / 2) : 0;
				var maxImageX = (maxX + maxWHalf) - imagesObject.max.widthHalf, 
					maxImageY = (thisSeries.key !== 'line') ? maxDataShape.high - maxStyle.size : maxDataShape.y - maxStyle.size;
				var maxTextX = maxX + maxWHalf, 
					maxTextY = (thisSeries.key !== 'line') ? maxDataShape.high - (maxStyle.size / 2) : maxDataShape.y - (maxStyle.size / 2);
				var maxAlign = 'start', 
					maxText = _options.format.yAxis == null ? maxData.high || maxData.yaxis :  eval(_options.format.yAxis)(maxData.high || maxData.yaxis);
				
				maxText = '최고 ' + maxText;
				
				if(maxX > selectorWidth){
					maxAlign = 'end';
					maxTextX = maxTextX - imagesObject.max.widthHalf;
				} else {
					maxAlign = 'start';
					maxTextX = maxTextX + imagesObject.max.widthHalf;
				}
				maxArrow.attr({
					'x': maxImageX, 'y': maxImageY, 'width': imagesObject.max.width, 'height': imagesObject.max.height
				});
				maxLabel.attr({
					'x': maxTextX, 'y': maxTextY, 'text': maxText, 'text-anchor': maxAlign
				});


				if(minLabel == null){
					minArrow = chart.image(minStyle.arrow, 0, 0, imagesObject.min.width, imagesObject.min.height);
					minLabel = chart.text().attr({
						'text-anchor': 'start',
						'font-family': minStyle.family,
						'font-size': minStyle.size,
						'fill': minStyle.color || '#000000'
					});
				}
				var minBBox = minLabel.getBBox();
				var minX = minDataShape.x, 
					minWHalf = (thisSeries.key === 'candle') ? Math.round(minDataShape.width / 2) : 0;
				var minImageX = (minX + minWHalf) - imagesObject.min.widthHalf, 
					minImageY = (thisSeries.key !== 'line') ? minDataShape.low : minDataShape.y;
				var minTextX = minX + minWHalf, 
					minTextY = (thisSeries.key !== 'line') ? minDataShape.low + (maxStyle.size / 2) : minDataShape.y + (maxStyle.size / 2);
				var minAlign = 'start', 
					minText = _options.format.yAxis == null ? minData.low || minData.yaxis :  eval(_options.format.yAxis)(minData.low || minData.yaxis);
				
				minText = '최저 ' + minText;
				
				if(minX > selectorWidth){
					minAlign = 'end';
					minTextX = minTextX - imagesObject.min.widthHalf;
				} else {
					minAlign = 'start';
					minTextX = minTextX + imagesObject.min.widthHalf;
				}
				minArrow.attr({
					'x': minImageX, 'y': minImageY, 'width': imagesObject.min.width, 'height': imagesObject.min.height
				});
				minLabel.attr({
					'x': minTextX, 'y': minTextY, 'text': minText, 'text-anchor': minAlign
				});

				maxArrow.toFront(), maxLabel.toFront();
				minArrow.toFront(), minLabel.toFront();
			}

			// 처음 초기화 시에만 실행됨.
			// 이미지를 사용할 경우 이미지를 다 불러오고 난 후에 실행되도록 처리
			if(maxLabel == null && minLabel == null){
				var images = [maxStyle.arrow, minStyle.arrow];

				var count = images.length;
				var thingToDoCompleted = function (item, img, i) {
					count--;
					var obj = {};
					obj.width = img.width;
					obj.height = img.height;
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
		/*
			종합차트 좌측 아코디언 메뉴 생성
			chart 		: svg 
			data 		: 데이터 
			styles 		: 스타일
			series 		: 만들어진 series, 
			_series 	: 사용자 입력 series
		 */
		createAccordion(chart, data, styles, series, _series);
		/*
			외부로부터 슬라이더 HTML이 들어오지 않으면 내부에 정의된 HTML을 사용한다.
			외부로부터 슬라이더 HTML이 들어온다는 것은 CSS까지 외부에 정의가 되어 있다는 것으로 간주함.
		 */
		if(!_sliderHtml) {
			_sliderHtml = ''
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
					+ '</div>'
				+ '</div>';
		}
		/*
			슬라이더 생성
		 */
		var slider = new window.webponent.STOCKSLIDER(_selector, accWidth, sliderHeight, _sliderHtml);
			slider.init(data, itemCount);

		var mouseDownCheck = false, sliderEventCheck = false;
		if(('createTouch' in g.doc) || ('ontouchstart' in g.doc)){
			var downPos = {};
			var svg = _selector.children().get(0);
			svg.addEventListener('touchstart', function(event){
				var val = $('.stockchart-type', _selector).find('radio:checekd').val();
				if(val === 'three' || val === 'pnf') return;

				mouseDownCheck = true;
			})
			$(svg).swipe({
				swipeStatus: function(event, phase, direction, distance , duration , fingerCount){
					var val = $('.stockchart-type', _selector).find('radio:checked').val();
					if(val === 'three' || val === 'pnf') return;
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
			}, false);

			$('.slider', _selector).bind('touchend', function(event){
				waitForFinalEvent(function(){
				  	sliceData(data, {styles: styles, series: series}, 'slider');     //...
				}, 0, "touchMove");
				mouseDownCheck = false;
			})

		} else {
			var downEvent = {};
			_selector.mousedown(function(event){
				mouseDownCheck = true;
				downEvent = event;
			}).mousemove(function(event){

				if(chartType === 'three' || chartType === 'pnf') return;

				if(!sliderEventCheck && mouseDownCheck && TYPE === 'SVG'){
					sliceData(data, {styles: styles, series: series}, 'slider');
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
				if(chartType === 'three' || chartType === 'pnf') return;
				mouseDownCheck = false;
				if(TYPE === 'VML') sliceData(data, {styles: styles, series: series}, 'slider');
			});

			_selector.find('.slider').on('mousedown', function(event) {
				mouseDownCheck = true;

			}).on('mousemove', function(event) {
				if(chartType === 'three' || chartType === 'pnf') return;

				if(!sliderEventCheck && mouseDownCheck && TYPE === 'SVG'){
					sliceData(data, {styles: styles, series: series}, 'slider');
				}
				
			}).on('mouseup', function(event) {
				if(chartType === 'three' || chartType === 'pnf') return;
				mouseDownCheck = false;

				if(TYPE === 'VML') sliceData(data, {styles: styles, series: series}, 'slider');
			})
		}
		/*
			차트 확대
		 */
		slider.plusButton.bind('click', function(){ // +
			plusButtonClick();
		});
		/*
			차트 축소
		 */
		slider.minusButton.bind('click', function(){ // -
			minusButtonClick();
		});
		/*
			차트 기본 크기
		 */
		slider.defaultButton.bind('click', function(){ // 초기화
			defaultButtonClick();
		});
		/**
		 * 슬라이더 우측 버튼 중 확대[ + ] 버튼
		 * 데이터의 차트 출력 개수를 줄이며 차트가 확대되어 보인다.
		 * @return -
		 */
		function plusButtonClick (){
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
		/**
		 * 슬라이더 우측 버튼 중 축소[ - ] 버튼
		 * 데이터의 차트 출력 개수를 늘이며 차트가 축소되어 보인다.
		 * @return -
		 */
		function minusButtonClick (){

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
		/**
		 * 슬라이더 우측 버튼 중 초기화 버튼
		 * 데이터의 차트 출력 개수를 기본 개수로 줄인다.
		 * @return -
		 */
		function defaultButtonClick (){
			
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
		/**
		 * createAccordion() 에서 생성한 왼쪽 메뉴에 설정 탭 내부의 [ + ][ - ][기본값] 클릭시 호출
		 * 보조지표를 추가하거나 삭제할때 아래의 switch 문에 초기 설정값을 지정해야 한다.
		 * @param  {Node} $this       	클릭된 버튼 Selector
		 * @param  {String} _type       오버레이와 보조지표 중 눌린 영역 명
		 * @param  {Object} _stockClass 오버레이와 보조지표 중 눌린 영역의 함수 모음 객체
		 * @param  {Array} _data    	데이터
		 * @param  {Object} __series 	사용자 입력 시리즈
		 * @param  {Object} _series  	확장된 시리즈
		 * @return -
		 */
		function changeOptionsParam ($this, _type, _stockClass, _data, __series, _series) {
			// Minus 버튼 클릭시
			if($this.attr('class') == "minus"){
				var next = $this.next();
				var value = next.attr('name').split('_')[0], num = 0;
				if(value != "over4") {
					num = Number(next.attr('value')) - 1;
				} else {
					num = Number(next.attr('value')) - 0.001;
					num = Number(num.toFixed(3));
				}
				if(next.attr('min') > num) {
					num = next.attr('min');
					return;
				}
				next.attr('value', num);
				_stockClass[next.attr('name')] = Number(next.attr('value'));

			// Plus 버튼 클릭시
			} else if($this.attr('class') == "plus") {
				var prev = $this.prev();
				var value = prev.attr('name').split('_')[0];
				var num = 0;
				if(value != "over4") {
					num = Number(prev.attr('value')) + 1;
				} else {
					num = Number(prev.attr('value')) + 0.001;
					num = Number(num.toFixed(3));
				}
				if(prev.attr('max') < num) {
					num = prev.attr('max');
					return;
				}
				prev.attr('value', num);

				_stockClass[prev.attr('name')] = Number(prev.attr('value'));

			// 기본값 버튼 클릭시
			// 기본으로 세팅된 설정값들이며,
			// 
			// 
			// ##### 지표 추가시에 해당 case를 추가해 주어야 한다. #####
			// stockInitParams 은 소스 상단에 위치해 있다.
			// 
			} else {
				var fieldset = $('.select-container-'+_type, _selector).find('fieldset');
				var value = fieldset.attr('class');
								
				var initParam = stockInitParams[value];
				
				var input = fieldset.find('input[type="text"]');
				$.each(input, function(index){
					$(this).attr('value', initParam[index]);

					if(_type == "overlay"){
					
						if(value != "over7") {
					
							_stockClass[$(this).attr('name')] = initParam[index];
						} else {
					
							_stockClass.over7_param1 = initParam[index];
						}
					} else{
					
						_stockClass[$(this).attr('name')] = initParam[index];
					}
				});
			}
			var data = null;
			// 
			// 
			// ##### 지표 추가시에 해당 case를 추가해 주어야 한다. #####
			// 
			// # 오버레이 함수명 규칙 parseOver[index]Data
			// - 'over' 여부로 오버레이인지 보조지표인지 체크하기 때문에 over + idx 로 구성해야함. 
			// - 매물분석도(over7)는 시리즈 생성이 아닌 그리기형식이므로 제외, 
			// 	 실제 코드는 webponent.chart.js 에서 관리한다.
			// - 오버레이는 가급적 추가, 삭제하지 않고 보조지표로 추가하길 권장한다.
			// 
			if(_type === 'overlay'){
				switch(value){
				case 'over1':
					data = _stockClass.parseOver1Data(_data, _series.main, __series);
					break;
				case 'over2':
					data = _stockClass.parseOver2Data(_data, _series.main, __series);
					break;
				case 'over3':
					data = _stockClass.parseOver3Data(_data, _series.main, __series);
					break;
				case 'over4':
					data = _stockClass.parseOver4Data(_data, _series.main, __series);
					break;
				case 'over5':
					data = _stockClass.parseOver5Data(_data, _series.main, __series);
					break;
				case 'over6':
					var style = {};
					data = _stockClass.parseOver6Data(_data, _series.main, __series, style, styles.main);
					styles.main.series = $.extend({}, styles.main.series, style);
					break;
				case 'over7':
					var legendStyles = stockStyles;
					overlay.changeLegend(chart, overlaySerieses, styles, legendStyles);
					chart.deleteSaleAnalysis(false);
					chart.saleAnalysis(overlay.over7_param1, __series, stockStyles.over7.series1);
					return;
					break;
				}
				if(value === 'over2'){
					slider.maximum = data.length;
					if(slider.rightSliderIndecator > slider.maximum) {
						slider.rightSliderIndecator = slider.maximum;
					}
				}

			// 
			// 
			// ##### 지표 추가시에 해당 case를 추가해 주어야 한다. #####
			// # 보조지표 함수명 규칙 parse[보조지표명]Data
			// - 'over' 포함 여부로 오버레이인지 보조지표인지 체크하기 때문에 보조지표에는 over를 쓰지 않는다.
			// 
			} else {

				switch(value){
				case 'volume':
					_stockClass.parseVolumeData();
				case 'macd':
					data = _stockClass.parseMacdData(_data, _series.macd, __series);
					break;
				case 'slowstc':
					data = _stockClass.parseSlowStcData(_data, _series.slowstc, __series);
					break;
				case 'faststc':
					data = _stockClass.parseFastStcData(_data, _series.faststc, __series);
					break;
				case 'rsi':
					data = _stockClass.parseRsiData(_data, _series.rsi, __series);
					break;
				case 'dmi':
					data = _stockClass.parseDmiData(_data, _series.dmi, __series);
					break;
				case 'adx':
					data = _stockClass.parseAdxData(_data, _series.adx, __series);
					break;
				case 'sonar':
					data = _stockClass.parseSonarData(_data, _series.sonar, __series);
					break;
				case 'cci':
					data = _stockClass.parseCciData(_data, _series.cci, __series);
					break;
				case 'vr':
					data = _stockClass.parseVrData(_data, _series.vr, __series);
					break;
				case 'trix':
					data = _stockClass.parseTrixData(_data, _series.trix, __series);
					break;
				case 'pmao':
					data = _stockClass.parsePmaoData(_data, _series.pmao, __series);
					break;
				case 'psychology':
					data = _stockClass.parsevPsychologyData(_data, _series.psychology, __series);
					break;
				case 'williams':
					data = _stockClass.parseWilliamsData(_data, _series.williams, __series);
					break;
				case 'roc':
					data = _stockClass.parseRocData(_data, _series.roc, __series);
					break;
				case 'chaikins':
					data = _stockClass.parseChaikinsData(_data, _series.chaikins, __series);
					break;
				}
			}

			sliceData(data, {styles: styles, series: series}, 'option');
		};
		/**
		 * API 연결
		 * @param  {Chart} chartInstance 차트 객체
		 * @return -
		 */
		function bindAPIs (chartInstance) {
			/**
			 * 주식차트의 재조회
			 * @param  {Object} user_option 사용자 정의 옵션
			 * @param  {Object} user_styles 사용자 정의 스타일
			 * @param  {Object} user_series 사용자 정의 시리즈
			 * @return -
			 */
			chartInstance.inquery = function (user_option, user_styles, user_series){

				_options = $.extend(true, _options, user_option);

				if(_options.data.hasOwnProperty('data') && _options.data.data != null)
					_options.data.data = user_option.data.data;
				data = [];

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

						chart.setStockOriginalData(data);

						if(data.length > 0) {

							slider.sliderReInit(data, itemCount);

							_options.data.url = null;
							_options.data.data = data;
						}
						
						chart.inquery(_options, {}, series);
						chartInstance.subGraphScript();
						
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

							$.each(series, function(key, value) {
								if(key != "main" && key != "volume") {
									assist.removeLegend(key);
									delete series[key];
								}
							});
							$.each(series.main, function(key, value) {
								if(key != "type" && key.indexOf('over') > -1) {

									overlay.removeLegend(key.split('_')[0]);
									delete series.main[key];
								}
							});

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
				
				var tempAssistSerieses = assistSerieses;
				assistSerieses = [];
				
				for(var i = 0; i < tempAssistSerieses.length; i++) {
					var thisCheckbox = $("input[value='" + tempAssistSerieses[i] + "']", _selector);
					if(i < tempAssistSerieses.length - 1) {

						assistSetReDraw(thisCheckbox);
					} else {
						assistSetReDraw(thisCheckbox, true);
					}
				}


				var tempOverlaySerieses = overlaySerieses;
				overlaySerieses = [];
				for(var i = 0; i < tempOverlaySerieses.length; i++) {
					var thisCheckbox = $("input[value='" + tempOverlaySerieses[i] + "']", _selector);
					if(i < tempOverlaySerieses.length - 1) {

						overlaySetReDraw(thisCheckbox);
					} else {
						overlaySetReDraw(thisCheckbox, true);
					}
				}
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
		};
		// 보조지표 거래량 활성화
		assistSerieses.push('volume');
		// 오버레이 이동평균 활성화
		$("input[value='over1']", _selector).trigger('click');

		var chartInstance = {};

		chartInstance.chart = chart;

		bindAPIs(chartInstance);

		return chartInstance;
	};
	/**
	 * 마우스무브하면 범례 우측으로 마우스가 위치한 아이템의 데이터가 출력된다.
	 * @param  {Chart} chart            차트 객체
	 * @param  {Event} _event           마우스 이벤트
	 * @param  {Object} _legend         범례 모음
	 * @param  {Object} _overlay        오버레이 함수 모음
	 * @param  {Object} _assist         보조지표 함수 모음
	 * @param  {Array} _overlaySerieses 활성화된 오버레이 모음
	 * @param  {Array} _assistSerieses  활성화된 보조지표 모음
	 * @return -
	 */
	function getChartData (chart, _event, _legend, _overlay, _assist, _overlaySerieses, _assistSerieses){
		
		var data = chart.getData();

		if(_overlaySerieses.length > 0) {
			try{
				for(var i = _overlaySerieses.length; i--;){
					var key = _overlaySerieses[i];

					if(key == 'over1' || key == 'over2' || key == 'over6' || key == 'over7') {
						continue;
					}
						
					var thisSeriesData = data.main;
					var thisLegend = _legend.main[key];
					var thisLegendInfo = thisLegend.items.info;
					var text = '';
					var count = 0;

					var tSeries = thisLegend.legend.series;

					for(var d = 0, len = tSeries.length; d < len; d++){

						var tData = thisSeriesData['DATA-'+tSeries[d]].data;
						
						for(var k = tData.length; k--;){

							if($.trim(tData[k].xaxis) == '' || tData[k].yaxis == null || tData[k].yaxis == undefined) {

								continue;
							}
							
							var shape = tData[k].shape;

							if(shape.mx < _event.x && shape.mx + shape.mw > _event.x){
								text += ' ' + thisLegend.legend.info[count] + ': ' + Number(tData[k].yaxis).toFixed(thisLegend.legend.toFixed).format();

								break;
							}
						}
					}

					if(text == '') {
						break;
					}

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

							if($.trim(thisData[k].xaxis) == '' || thisData[k].yaxis == null || thisData[k].yaxis == undefined) {
								continue;
							}
						
							var shape = thisData[k].shape;
							if(shape.mx < _event.x && shape.mx + shape.mw > _event.x){
								text += ' ' + thisLegend.legend.info[count] + ': ' + Number(thisData[k].yaxis).toFixed(thisLegend.legend.toFixed).format();

								break;
							}

						}
						count ++;
					}

					if(text == ''){
						break;
					}
					thisLegendInfo.attr({
						text: text
					});
				}
			} catch(e){
				// console.log(e.message)
			}
		}
	};
	/**
	 * 종합차트용 범례만들기
	 * @param  {Chart} chart            차트 객체
	 * @param  {Object} _stockStyles    종합차트용 초기 설정 스타일
	 * @param  {Object} _legend         범례 모음
	 * @param  {Object} _overlay        오버레이 함수 모음
	 * @param  {Object} _assist         보조지표 함수 모음
	 * @param  {Array} _overlaySerieses 활성화된 오버레이 모음
	 * @param  {Array} _assistSerieses  활성화된 보조지표 모음
	 * @param  {String} _thisType  		슬라이더에서 호출되면 'slider'가 입력됨.
	 * @return -
	 */
	function initLegend (chart, _stockStyles, _legend, _overlay, _assist, _overlaySerieses, _assistSerieses, _thisType){

		var styles = chart.getStyles();
		
		var legendStyles = _stockStyles.legend;
		var legendTextSizeHalf = Math.round(legendStyles.text.size / 2);
		
		var graph_left = styles.main.layout._graphleft;
		
		if(_overlaySerieses.length > 0) {
			var graph_top  = styles.main.layout._graphtop;
			var legendY = graph_top + legendTextSizeHalf + legendStyles.paddingTop;
			var itemLeft = graph_left + legendStyles.paddingLeft;
			if(_thisType !== 'option')
				_legend.main = _overlay.makeLegend(chart, _overlaySerieses, styles, _stockStyles)
			else
				_overlay.changeLegend(chart, _overlaySerieses, styles, _stockStyles);
		}
		
		if(_assistSerieses.length > 0){
			var itemLeft = graph_left + legendStyles.paddingLeft;
			if(_thisType !== 'option')
				_legend.assist = _assist.makeLegend(chart, _assistSerieses, styles, _stockStyles);
			else
				_assist.changeLegend(chart, _assistSerieses, styles, _stockStyles);
		}
	};
	/**
	 * 종합차트 메뉴 차트형식
	 * @param  {Selector} _this   클릭된 체크박스 Selector
	 * @param  {Object} _series 차트 시리즈
	 * @return {[type]}         [description]
	 */
	function reDrawChartType (_this, _series){
		var value = _this.val();
		
		var thisSeries = _series.main;
		
		for(var i in thisSeries){
			if(i === 'type' || i.indexOf('over') > -1) {
				continue;
			}

			if(i === value){
				thisSeries[i].visible = true;
			} else {
				thisSeries[i].visible = false;
			}
		}
		return _series;
	};
	/**
	 * 종합차트 메뉴 오버레이
	 * @param  {Selector} _selector     차트 DIV Selector
	 * @param  {Object} _stockStyles  	종합차트용 초기 설정 스타일
	 * @param  {Array} _data         	차트 데이터
	 * @param  {Selector} _this   		클릭된 체크박스 Selector
	 * @param  {Object} _styles  		스타일
	 * @param  {Object} _series       	사용자 입력 시리즈
	 * @param  {Object} _seriesObject 확장된 시리즈
	 * @param  {Object} _serieses     활성화된 오버레이 모음
	 * @param  {Object} _overlay      오버레이 함수 모음
	 * @return {Object}               	series: 확장된 시리즈
	 *         							styles: 확장된 스타일
	 *         							overSerieses: 활성화된 오버레이 시리즈
	 */
	function reDrawOverLay (_selector, _stockStyles, _data, _this, _styles, _series, _seriesObject, _serieses, _overlay){

		var value = _this.val(), checked = _this.prop('checked');

		if(checked){
			for(var i = 0, len = _serieses.length; i < len; i++){
				// 기존에 활성화되어있는 같은 오버레이가 있다면 리턴
				if(_serieses[i] === value) return;
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
				};
				_data = _overlay.parseOver1Data(_data, series);
				break;
			case 'over2':
				style = {
					over2_series1: stockStyle.over2.series1,
					over2_series2: stockStyle.over2.series2,
					over2_series6: stockStyle.over2.series6,
					over2_series3: stockStyle.over2.series3,
					over2_series4: stockStyle.over2.series4,
					over2_series5: stockStyle.over2.series5
				};
				series = {
					over2_series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '전환', visible: true},
					over2_series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '기준', visible: true},
					over2_series6: {series: 'area', xaxis: _series.xaxis, yaxis: _series.close, label: '선행1', form: 'updown_minaxis', minaxis: _series.close, visible: true},
					over2_series3: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '선행1', visible: true},
					over2_series4: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '선행2', visible: true},
					over2_series5: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '후행', visible: true}
				};
				_data = _overlay.parseOver2Data(_data, series, candleSeries);
				break;
			case 'over3':
				style = { over3_series4: stockStyle.over3.series4, over3_series1: stockStyle.over3.series1, over3_series2: stockStyle.over3.series2, over3_series3: stockStyle.over3.series3 };
				series = {
					over3_series4: {series: 'area', xaxis: _series.xaxis, yaxis: _series.close, minaxis: _series.close, label: 'U'},
					over3_series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'U'},
					over3_series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'L'},
					over3_series3: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'M'}
				};
				_data = _overlay.parseOver3Data(_data, series, candleSeries);
				break;
			case 'over4':
				style = { over4_series1: stockStyle.over4.series1 };
				series = {
					over4_series1: {series: 'plot', xaxis: _series.xaxis, yaxis: _series.close, label: 'Parabolic'}
				};
				_data = _overlay.parseOver4Data(_data, series, candleSeries);
				break;
			case 'over5':
				style = { over5_series4: stockStyle.over5.series4, over5_series1: stockStyle.over5.series1, over5_series2: stockStyle.over5.series2, over5_series3: stockStyle.over5.series3 };
				series = {
					over5_series4: {series: 'area', xaxis: _series.xaxis, yaxis: _series.close, minaxis: _series.close, label: 'U'},
					over5_series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'U'},
					over5_series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'L'},
					over5_series3: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'M'}
				};
				_data = _overlay.parseOver5Data(_data, series, candleSeries);
				break;
			case 'over6':
				style = { over6_series1: stockStyle.over6.series1, over6_series2: stockStyle.over6.series2 };
				series = {
					over6_series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '그물차트' },
					over6_series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '그물차트' }
				};
				_data = _overlay.parseOver6Data(_data, series, candleSeries, style, _styles.main);
				break;
			case 'over7':

				break;
			}
			_serieses.push(value);
			_seriesObject.main = $.extend({}, _seriesObject.main, series);
			_styles.main.series = $.extend(true, {}, _styles.main.series, style);

			if(_serieses.length > 2){
				var o = _serieses.shift();

				$('[name=stockchart-select-overlay] option:last', _selector).remove();
				if(o == 'over2'){
					_overlay.deleteOver2Data( _data );
					$("input[value='"+o+"']", _selector).prop('checked', false);
				} else if(o == 'over7'){
					_overlay.over7_select = false;
					$("input[value='over7']", _selector).trigger('click');
				} else {
					$("input[value='"+o+"']", _selector).prop('checked', false);
				}
				for(var i in _seriesObject['main']){
					if(i.indexOf(o) > - 1){
						$(_styles.main.series).removeProp(i);
						$(_seriesObject.main).removeProp(i);
					}
				}
				_overlay.removeLegend(o);
			}
		} else {
			if(value == 'over2'){
				_overlay.deleteOver2Data( _data );
			}
			for(var i = 0, len = _serieses.length; i < len; i++){
				if(_serieses[i] === value) {
					_serieses.splice(i, 1);
					break;
				}
			}
			for(var i in _seriesObject['main']){
				if(i.indexOf(value) > - 1){
					$(_styles.main.series).removeProp(i);
					$(_seriesObject.main).removeProp(i);
				}
			}
			_overlay.removeLegend(value);

		}

		return {series: _seriesObject, styles: _styles, overSerieses: _serieses};
	};
	/**
	 * 종합차트 메뉴 보조지표
	 * @param  {Selector} _selector     차트 DIV Selector
	 * @param  {Object} _stockStyles  	종합차트용 초기 설정 스타일
	 * @param  {Array} _data         	차트 데이터
	 * @param  {Selector} _this   		클릭된 체크박스 Selector
	 * @param  {Object} _styles  		스타일
	 * @param  {Object} _series       	사용자 입력 시리즈
	 * @param  {Object} _seriesObject 확장된 시리즈
	 * @param  {Object} _serieses     활성화된 보조지표 모음
	 * @param  {Object} _assist      	보조지표 함수 모음
	 * @param  {Number} _left      		보조지표 영역 시작 X포인트
	 * @return {Object}               	series: 확장된 시리즈
	 *         							styles: 확장된 스타일
	 *         							assistSerieses: 활성화된 보조지표 시리즈
	 */
	function reDrawAssist (_selector, _stockStyles, _data, _this, _styles, _series, _seriesObject, _serieses, _assist, _left){
		
		var value = _this.val(), checked = _this.prop('checked');

		if(checked){
			for(var i = 0, len = _serieses.length; i < len; i++){
				// 기존에 활성화되어있는 같은 보조지표가 있다면 리턴ㅋ
				if(_serieses[i] === value) return;
			}
			var candleSeries = _seriesObject.main.candle;
			var stockStyle = _stockStyles;
			var stockStyleCore_sub = stockStyle.core_sub;
			var style = {}, series = null;
			var canvaspaddingleft = _left + (stockStyleCore_sub.layout.paddingLeft || 10);

			switch(value){
			case 'volume':
				style = {
					volume: { series: { series1: stockStyle.volume.series1 }}
				}
				style.volume = $.extend(true, {}, style.volume, stockStyleCore_sub);
				style.volume.layout.paddingLeft = canvaspaddingleft;
				series = {
					volume: {
						type: 'sub', series1: {series: 'column', xaxis: _series.xaxis, yaxis: _series.volume, label: '거래량'}
					}
				}
				_assist.parseVolumeData();
				break;
			case 'macd':
				style = {
					macd: {
						series: {
							series1: stockStyle.macd.series1,
							series2: stockStyle.macd.series2,
							series3: stockStyle.macd.series3
						}
					}
				}

				style.macd = $.extend(true, {}, style.macd, stockStyleCore_sub);
				style.macd.layout.paddingLeft = canvaspaddingleft;
				series = {
					macd: {
						type: 'sub',
						series1: {series: 'column', xaxis: _series.xaxis, yaxis: _series.close, label: 'Osc', form: 'updown'},
						series2: {series: 'line',   xaxis: _series.xaxis, yaxis: _series.close, label: 'MACD'},
						series3: {series: 'line',   xaxis: _series.xaxis, yaxis: _series.close, label: 'Signal'}
					}
				};
				_data = _assist.parseMacdData(_data, series.macd, _series);
				break;
			case 'slowstc':
				style = {
					slowstc: {
						series: {
							series1: stockStyle.slowstc.series1,
							series2: stockStyle.slowstc.series2
						}
					}
				}

				style.slowstc = $.extend(true, {}, style.slowstc, stockStyleCore_sub);
				style.slowstc.layout.paddingLeft = canvaspaddingleft;
				series = {
					slowstc: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'Slow %K'},
						series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'Slow %D'}
					}
				};
				_data = _assist.parseSlowStcData(_data, series.slowstc, _series);
				break;
			case 'faststc':
				style = {
					faststc: {
						series: {
							series1: stockStyle.faststc.series1,
							series2: stockStyle.faststc.series2
						}
					}
				}

				style.faststc = $.extend(true, {}, style.faststc, stockStyleCore_sub);
				style.faststc.layout.paddingLeft = canvaspaddingleft;
				series = {
					faststc: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'Fast %K'},
						series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'Fast %D'}
					}
				};
				_data = _assist.parseFastStcData(_data, series.faststc, _series);
				break;
			case 'rsi':
				style = {
					rsi: {
						series: {
							series1: stockStyle.rsi.series1,
							series2: stockStyle.rsi.series2
						}
					}
				}

				style.rsi = $.extend(true, {}, style.rsi, stockStyleCore_sub);
				style.rsi.layout.paddingLeft = canvaspaddingleft;
				series = {
					rsi: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'RSI'},
						series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'RSI-Signal'}
					}
				};
				_data = _assist.parseRsiData(_data, series.rsi, _series);
				break;
			case 'dmi':
				style = {
					dmi: {
						series: {
							series1: stockStyle.dmi.series1,
							series2: stockStyle.dmi.series2
						}
					}
				}

				style.dmi = $.extend(true, {}, style.dmi, stockStyleCore_sub);
				style.dmi.layout.paddingLeft = canvaspaddingleft;
				series = {
					dmi: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'PDI'},
						series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'MDI'}
					}
				};
				_data = _assist.parseDmiData(_data, series.dmi, _series);
				break;
			case 'adx':
				style = {
					adx: {
						series: {
							series1: stockStyle.adx.series1,
							series2: stockStyle.adx.series2
						}
					}
				}

				style.adx = $.extend(true, {}, style.adx, stockStyleCore_sub);
				style.adx.layout.paddingLeft = canvaspaddingleft;
				series = {
					adx: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'ADX'},
						series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'MA'}
					}
				};
				_data = _assist.parseAdxData(_data, series.adx, _series);
				break;
			case 'obv':
				style = {
					obv: {
						series: {
							series1: stockStyle.obv.series1,
							series2: stockStyle.obv.series2
						}
					}
				}

				style.obv = $.extend(true, {}, style.obv, stockStyleCore_sub);
				style.obv.layout.paddingLeft = canvaspaddingleft;
				series = {
					obv: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'OBV'}
					}
				};
				_data = _assist.parseOBVData(_data, series.obv, _series);
				break;
			case 'sonar':
				style = {
					sonar: {
						series: {
							series1: stockStyle.sonar.series1,
							series2: stockStyle.sonar.series2
						}
					}
				}

				style.sonar = $.extend(true, {}, style.sonar, stockStyleCore_sub);
				style.sonar.layout.paddingLeft = canvaspaddingleft;
				series = {
					sonar: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'SONAR'},
						series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'MA'}
					}
				};
				_data = _assist.parseSonarData(_data, series.sonar, _series);
				break;
			case 'cci':
				style = {
					cci: {
						series: {
							series1: stockStyle.cci.series1,
							series2: stockStyle.cci.series2
						}
					}
				}

				style.cci = $.extend(true, {}, style.cci, stockStyleCore_sub);
				style.cci.layout.paddingLeft = canvaspaddingleft;
				series = {
					cci: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'CCI'}
					}
				};
				_data = _assist.parseCciData(_data, series.cci, _series);
				break;
			case 'vr':
				style = {
					vr: {
						series: {
							series1: stockStyle.vr.series1,
							series2: stockStyle.vr.series2
						}
					}
				}

				style.vr = $.extend(true, {}, style.vr, stockStyleCore_sub);
				style.vr.layout.paddingLeft = canvaspaddingleft;
				series = {
					vr: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'VR'}
					}
				};
				_data = _assist.parseVrData(_data, series.vr, _series);
				break;
			case 'trix':
				style = {
					trix: {
						series: {
							series1: stockStyle.trix.series1,
							series2: stockStyle.trix.series2
						}
					}
				}

				style.trix = $.extend(true, {}, style.trix, stockStyleCore_sub);
				style.trix.layout.paddingLeft = canvaspaddingleft;
				series = {
					trix: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'TRIX'},
						series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'TRMA'}
					}
				};
				_data = _assist.parseTrixData(_data, series.trix, _series);
				break;
			case 'pmao':
				style = {
					pmao: {
						series: {
							series1: stockStyle.pmao.series1
						}
					}
				}

				style.pmao = $.extend(true, {}, style.pmao, stockStyleCore_sub);
				style.pmao.layout.paddingLeft = canvaspaddingleft;
				series = {
					pmao: {
						type: 'sub',
						series1: {series: 'column', xaxis: _series.xaxis, yaxis: _series.close, label: 'PMAO', form: 'updown'}
					}
				};
				_data = _assist.parsePmaoData(_data, series.pmao, _series);
				break;
			case 'psychology':
				style = {
					psychology: {
						series: {
							series1: stockStyle.psychology.series1,
							series2: stockStyle.psychology.series2
						}
					}
				}

				style.psychology = $.extend(true, {}, style.psychology, stockStyleCore_sub);
				style.psychology.layout.paddingLeft = canvaspaddingleft;
				series = {
					psychology: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '투자심리선'}
					}
				};
				_data = _assist.parsevPsychologyData(_data, series.psychology, _series);
				break;
			case 'williams':
				style = {
					williams: {
						series: {
							series1: stockStyle.williams.series1,
							series2: stockStyle.williams.series2
						}
					}
				}

				style.williams = $.extend(true, {}, style.williams, stockStyleCore_sub);
				style.williams.layout.paddingLeft = canvaspaddingleft;
				series = {
					williams: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '%R'},
						series2: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: '%D'}
					}
				};
				_data = _assist.parseWilliamsData(_data, series.williams, _series);
				break;
			case 'roc':
				style = {
					roc: {
						series: {
							series1: stockStyle.roc.series1
						}
					}
				}

				style.roc = $.extend(true, {}, style.roc, stockStyleCore_sub);
				style.roc.layout.paddingLeft = canvaspaddingleft;
				series = {
					roc: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'ROC'}
					}
				};
				_data = _assist.parseRocData(_data, series.roc, _series);
				break;
			case 'chaikins':
				style = {
					chaikins: {
						series: {
							series1: stockStyle.chaikins.series1
						}
					}
				}

				style.chaikins = $.extend(true, {}, style.chaikins, stockStyleCore_sub);
				style.chaikins.layout.paddingLeft = canvaspaddingleft;
				series = {
					chaikins: {
						type: 'sub',
						series1: {series: 'line', xaxis: _series.xaxis, yaxis: _series.close, label: 'Chaikins Ocillator'}
					}
				};
				_data = _assist.parseChaikinsData(_data, series.chaikins, _series);
				break;



				
			}


			_serieses.push(value);
			_seriesObject = $.extend({}, _seriesObject, series);
			_styles = $.extend({}, _styles, style);

			if(_serieses.length > 4){
				var o = _serieses.shift();
				$("input[value='"+o+"']", _selector).prop('checked', false);
				$('[name=stockchart-select-assist] option:last', _selector).remove();

				$(_styles).removeProp(o);
				$(_seriesObject).removeProp(o);

				_assist.removeLegend(o);
			}
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
	/**
	 * 종합차트 초기 시리즈 
	 * @param  {Object} _series 시리즈
	 * @return {Object}         초기 시리즈
	 */
	function initMakeSeries (_series){
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
	/**
	 * 종합차트 초기 스타일
	 * @param  {Object} _styles      사용자 정의 스타일
	 * @param  {Object} _stockStyles 종합차트 초기 세팅 스타일
	 * @param  {Number} _accWidth    종합차트 메뉴 넓이
	 * @return {Object}              확장 스타일
	 */
	function initMakeStyles (_styles, _stockStyles, _accWidth){
		var style = _stockStyles;
		var styles = {};
		styles = {
			'main': {
				'animate': {'use': false},
				'series': {
					'candle': style.candle,
					'hloc':   style.hloc,
					'line':   style.line
				}
			},
			'volume': {
				'series': {
					'series1': style.volume.series1
				}
			}
		}
		styles.main 	= $.extend(true, {}, styles.main, style.core_main);
		styles.volume 	= $.extend(true, {}, styles.volume, style.core_sub);

		styles.main.layout.paddingLeft 		= _accWidth + (style.core_main.layout.paddingLeft || 10);
		styles.volume.layout.paddingLeft 	= _accWidth + (style.core_sub.layout.paddingLeft || 10);

		return styles;
	};
	/**
	 * 차트 초기화시에 데이터 관련 검사후 Ajax를 호출하거나 그대로 넘기는 함수
	 * @param  {Object} _options 옵션
	 * @param  {Function} _callback Ajax success 후, 데이터 검사 완료후 callback : callback.init()
	 * @return -
	 */
	function loadData (_options, _callback){
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
						if (_options.data.sort == "reverse") {
							arr = arr.reverse();
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
					if(_callback.hasOwnProperty('removeElement')) {
						_callback.removeElement();

					}
					_callback.init(arr);
				},
				error: function(_e) {
					console.log(_e);
				}
			})
		}
	};
	/**
	 * 삼선전환도, PnF에서 사용할 데이터 정제
	 * @param  {Object} _series 사용자 정의 시리즈
	 * @param  {Array} _data   데이터 원본
	 * @return {Array}         정제된 데이터
	 */
	function parseData (_series, _data){
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
	/**
	 * 삼선전환도 초기화
	 * @param  {Chart} chart       차트 객체
	 * @param  {Object} _options    옵션
	 * @param  {Array} _data       데이터
	 * @param  {Object} _series     사용자 정의 시리즈
	 * @param  {Object} stockStyles 종합차트용 초기 설정 스타일
	 * @return {Nodes}             삼선전환 초기화에 만들어진 SVG Nodes
	 */
	function initThreeLine (chart, _options, _data, _series, stockStyles){

		var maxClose = -999999999999999, minClose = 999999999999999;
		var arr = [], dataArr = [];
		var dOpen = dHigh = dLow = 0, tClose = 0, position = 0;
		var data = parseData(_series, _data);
		var styles = chart.getStyles().main;
		var series = {};

		var legendStyles = stockStyles.legend;
		var thisStyles = stockStyles.three;
		styles = $.extend(true, {}, styles, thisStyles);

		var stylesLayout = styles.layout;
		var stylesGraph = styles.graph;
		var stylesYAxis = styles.yAxis;
		var stylesXAxis = styles.xAxis;

		var CHART_WIDTH = stylesLayout._allwidth;
		var CHART_HEIGHT = stylesLayout._allheight;

		var GRAPH_WIDTH = stylesLayout._graphwidthpx;
		var GRAPH_HEIGHT = CHART_HEIGHT - stylesLayout.paddingTop - stylesLayout.paddingBottom - stylesXAxis.height - stylesXAxis.paddingTop;
		var GRAPH_LEFT = stylesLayout._graphleft;
		var GRAPH_TOP = stylesLayout._graphtop;
		
		var yLabelGap = stylesYAxis.width + stylesYAxis.paddingLeft + stylesYAxis.paddingRight + stylesLayout.paddingLeft + stylesLayout.paddingRight;

		var elementGroup = [];
		var init = function(){
			arr = data;
			var len = arr.length;
			var close;
			for(i = len; i--;){
				close = Number(arr[i].close) || arr[i].yaxis;
				if(maxClose < close) maxClose = close;
				if(minClose > close) minClose = close;
			}
			for(i = 0; i < len; i++){
				CalcThreeLine(i);
			}
			var half = (GRAPH_WIDTH / 2) - len;
			for(i = 0; i < half; i++){
				dataArr.push({"date": null});
			}
			series = {
				series: 'candle',
				xaxis: 'date',
				open: 'open',
				high: 'high',
				low: 'low',
				close: 'close'
			}

			/* X, Y Axis Value */
			var xAxis = [], yAxis = [];
			yAxis = chart.getStockYAxis(false, {'data': {'min': minClose, 'max': maxClose, 'data': dataArr}}, {'yAxis': {'baseAtZero': false}});

			var back = chart.rect(0, 0, GRAPH_WIDTH + yLabelGap, CHART_HEIGHT).attr({
				'fill': stylesLayout.color, 'stroke': '', 'stroke-width': 0
			});
			elementGroup.unshift(back);

			var rp = getRectangle(GRAPH_LEFT - 1, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT, stylesGraph.line.width)
			var graph = chart.rect(rp.x, rp.y, rp.width, rp.height).attr({
				'fill': stylesGraph.color, 
				'stroke': stylesGraph.line.color, 
				'stroke-width': stylesGraph.line.width, 
				'stroke-opacity': stylesGraph.line.opacity
			});
			elementGroup.unshift(graph);

			elementGroup.unshift(chart.drawStockYAxis('three', GRAPH_LEFT, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT, _options, styles, styles, yAxis, elementGroup));
			elementGroup.unshift(chart.drawStockXAxis('three', GRAPH_LEFT, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT, _options, styles, arr, elementGroup));

			var group = chart.drawStockSeries('three', GRAPH_LEFT, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT, _options, styles, {'type': 'main', 'three': series}, {'DATA-three':{min: minClose, max: maxClose, data: dataArr}}, yAxis);
			for(var i = group.length; i--;){

				elementGroup.unshift(group[i]);
			}

			var text = chart.text(GRAPH_LEFT + 4, GRAPH_TOP + 11, '삼선전환도').attr({
				'text-anchor': 'start',
				'font-family': legendStyles.text.family,
				'font-size': legendStyles.text.size,
				'fill': legendStyles.text.color || '#000000'
			});
			elementGroup.unshift(text);

			return elementGroup;
		};

		CalcThreeLine = function(index){
			var thisIndexArr = arr[index];
			dOpen = Number(thisIndexArr.open), tClose = Number(thisIndexArr.close);

			if(position == 0){ // 방향이 없을 때
				if(dOpen < tClose) { // 상승
					dataArr.push({ "xaxis": thisIndexArr.xaxis, "open":dOpen, "high":tClose, "low":dOpen, "close":tClose});
					position = 1;
				} else {
					dataArr.push({"xaxis":thisIndexArr.xaxis, "open":dOpen, "high":dOpen, "low":tClose, "close":tClose});
					position = 2;
				}
			} else { // 방향이 있을 때
				var dataArrCount = dataArr.length;
				if(position == 1) {	// 상승 추세일때
					var dPrevHigh = dataArr[dataArrCount - 1].high; // 고점
					if(tClose > dPrevHigh) { // 고점을 돌파한 경우
						dataArr.push({"xaxis":thisIndexArr.xaxis, "open":dPrevHigh, "high":tClose, "low":dPrevHigh, "close":tClose});
					} else {
						var dLowest = maxClose;
						if(dataArrCount >2) {
							for(var i = dataArrCount - 1; i >= dataArrCount - 3 ; i--){// 이전 3개 내의 최저점 구하기
								dLow = dataArr[i].low;
								if(dLowest > dLow)	{
									dLowest = dLow;
								}
							}
							if (dLowest > tClose) {// 최저점 돌파한 경우
								position = 2;
								dataArr.push({
									"xaxis":thisIndexArr.xaxis,
									"open":dataArr[dataArrCount - 1].open, 
									"high":dataArr[dataArrCount - 1].open,
									"low":tClose, "close":tClose
								});
							}
						}
					}
				}
				else { // 하락 추세일때
					var dPrevLow = dataArr[dataArrCount - 1].low; // 저점
					if(tClose < dPrevLow){	// 저점을 돌파한 경우
						dataArr.push({"xaxis":thisIndexArr.xaxis, "open":dPrevLow, "high":dPrevLow, "low":tClose, "close":tClose});
					} else {
						var dHighest = minClose;
						if(dataArrCount >2) {
							for(var j = dataArrCount - 1; j>=dataArrCount-3; j--){// 이전 3개 내의 최저점 구하기
								dHigh = dataArr[j].high;
								if(dHighest < dHigh) {
									dHighest = dHigh;
								}
							}

							if (dHighest < tClose){ // 최고점 돌파한 경우
								position = 1;
								dataArr.push({
									"xaxis":thisIndexArr.xaxis,
									"open":dataArr[dataArrCount - 1].open, 
									"high":tClose,
									"low":dataArr[dataArrCount - 1].open, 
									"close":tClose
								});
							}
						}
					}
				}
			}
		};
		return init();
	};
	/**
	 * PnF 초기화
	 * @param  {Chart} chart       차트 객체
	 * @param  {Object} _options    옵션
	 * @param  {Array} _data       데이터
	 * @param  {Object} _series     사용자 정의 시리즈
	 * @param  {Object} stockStyles 종합차트용 초기 설정 스타일
	 * @return {Nodes}             삼선전환 초기화에 만들어진 SVG Nodes
	 */
	function initPnF (chart, _options, _data, _series, stockStyles){
		var maxClose = -999999999999999, minClose = 999999999999999;
		var max = -999999999999999, min = 999999999999999;
		var arr = [], dataArr = [];
		var dOne = dOpen = dHigh = dLow = 0;
		var tClose = 0, position = 0;
		var data = parseData(_series, _data);
		var styles = chart.getStyles().main;
		var series = {};

		var legendStyles = stockStyles.legend;
		var thisStyles = stockStyles.pnf;
		styles = $.extend(true, {}, styles, thisStyles);

		var stylesLayout = styles.layout;
		var stylesYAxis = styles.yAxis;
		var stylesXAxis = styles.xAxis;

		var CHART_WIDTH = stylesLayout._allwidth;
		var CHART_HEIGHT = stylesLayout._allheight;
		
		var GRAPH_WIDTH = stylesLayout._graphwidthpx;
		var GRAPH_HEIGHT = CHART_HEIGHT - stylesLayout.paddingTop - stylesLayout.paddingBottom - stylesXAxis.height - stylesXAxis.paddingTop;
		var GRAPH_LEFT = stylesLayout._graphleft;
		var GRAPH_TOP = stylesLayout._graphtop;
		
		var yLabelGap = stylesYAxis.width + stylesYAxis.paddingLeft + stylesYAxis.paddingRight + stylesLayout.paddingLeft + stylesLayout.paddingRight;

		var elementGroup = [];
		var init = function(){
			arr = data;

			var len = arr.length;
			var close;
			for(i = len; i--;){
				close = Number(arr[i].close) || Number(arr[i].yaxis);
				if(maxClose < close) maxClose = close;
				if(minClose > close) minClose = close;
			}
			for(i = 0; i < len; i++){
				CalcPnF(i);
			}
			var half = (GRAPH_WIDTH / 8) - dataArr.length;
			for(i = 0; i < half; i++){
				dataArr.push({"date": null});
			}
			for(i = dataArr.length; i--;){
				if(dataArr[i].max > max) max = dataArr[i].max;
				if(dataArr[i].min < min) min = dataArr[i].min;

				if(dataArr[i].date != null){
					var thisData = dataArr[i];
					thisData.xaxis = thisData.date;
					thisData.yaxis = thisData.max;
					thisData.minaxis = thisData.min;
				}
			}

			series = {
				series: 'column',
				xaxis: 'date',
				yaxis: 'max',
				minaxis: 'min'
			}
			_options.timeSlice = {};
			_options.timeSlice.use = false;

			styles.series.pnf.itemRenderer = {};
			styles.series.pnf.itemRenderer.setRenderer = function(_canvas, _rectangle, _data, _thisStyles){
				var len = Math.round(((_rectangle.top + _rectangle.height) - _rectangle.top) / _data.nNum); 
				var hLen = Math.round(len / 2);

				var group = [];

				if(_data.nPosition == 1) {
					for(var i = 0; i < _data.nNum; i++){
						group.push( _canvas.circle(_rectangle.left + hLen, _rectangle.top+i*len + hLen, hLen) );
					}
					var g = _canvas.set(group).attr({
						'stroke': _thisStyles.line.up.color, 'stroke-opacity': _thisStyles.line.up.opacity, 'stroke-width': _thisStyles.line.down.width
					});
				} else {
					var path = '';
					for(var i = 0; i < _data.nNum; i++){
						path += 'M'+_rectangle.left+','+(_rectangle.top + i * len + hLen)+','+(_rectangle.left + _rectangle.width)+','+(_rectangle.top + (i+1) * len + hLen)+','+ ' M'+_rectangle.left+','+(_rectangle.top + (i+1) * len + hLen)+','+(_rectangle.left + _rectangle.width)+','+(_rectangle.top + i * len + hLen);
					}
					var g = _canvas.path(path);
					g.attr({
						'stroke': _thisStyles.line.down.color, 'stroke-opacity': _thisStyles.line.up.opacity, 'stroke-width': _thisStyles.line.down.width
					});
				}
				return g;
			};

			/* X, Y Axis Value */
			var xAxis = [], yAxis = [];
			yAxis = chart.getStockYAxis(false, {data: {min: min, max: max, data: dataArr}}, {yAxis: {baseAtZero: false}});

			var back = chart.rect(0, 0, GRAPH_WIDTH + yLabelGap, CHART_HEIGHT).attr({
				'fill': thisStyles.layout.color, 
				'stroke': '', 
				'stroke-width': 0
			});
			elementGroup.unshift(back);

			var rp = getRectangle(GRAPH_LEFT - 1, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT, thisStyles.graph.line.width)
			var graph = chart.rect(rp.x, rp.y, rp.width, rp.height).attr({
				'fill': thisStyles.graph.color, 
				'stroke': thisStyles.graph.line.color, 
				'stroke-width': thisStyles.graph.line.width, 
				'stroke-opacity': thisStyles.graph.line.opacity
			});
			elementGroup.unshift(graph);

			elementGroup.unshift(chart.drawStockYAxis('pnf', GRAPH_LEFT, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT, _options, styles, styles, yAxis, elementGroup));
			elementGroup.unshift(chart.drawStockXAxis('pnf', GRAPH_LEFT, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT, _options, styles, arr, elementGroup));

			var group = chart.drawStockSeries('pnf', GRAPH_LEFT, GRAPH_TOP, GRAPH_WIDTH, GRAPH_HEIGHT, _options, styles, {'type': 'main', 'pnf': series}, {'DATA-pnf':{min: minClose, max: maxClose, data: dataArr}}, yAxis);
			for(var i = group.length; i--;) {

				elementGroup.unshift(group[i]);
			}

			var text = chart.text(GRAPH_LEFT + 4, GRAPH_TOP + 11, 'P&F').attr({
				'text-anchor': 'start',
				'font-family': legendStyles.text.family,
				'font-size': legendStyles.text.size,
				'fill': legendStyles.text.color || '#000000'
			});
			elementGroup.unshift(text);

			return elementGroup;
		};
		var CalcPnF = function(index) {
			var tArr = arr[index], ldataArr = dataArr[dataArr.length - 1];
			dOpen = Number(arr[0].open), tClose = Number(tArr.close);

			if(index == 0){
				dOne = (maxClose - minClose) / 50;
				if(maxClose >= 100000) dOne = (dOne / 100 + 0.7) * 100;
				else if(maxClose >= 10000) dOne = (dOne / 10 + 0.7) * 10;
				else if(maxClose >= 1000) dOne = dOne + 0.7;
			}
			if(position == 0){
				var dGap = tClose - dOpen;
				if(Math.abs(dGap) > dOne){
					if(dGap > 0) {
						dataArr.push({date: tArr.xaxis,dMin:dOpen, dMax:tClose,
							max:((tClose-dOpen)/dOne), min:0,
							nPosition:1, nNum:((tClose-dOpen)/dOne)+1});
							position = 1;
					} else {
						dataArr.push({date: tArr.xaxis,dMin:tClose, dMax:dOpen,
							max:0, min:-((dOpen-tClose)/dOne),
							nPosition:2, nNum:((dOpen-tClose)/dOne)+1});
							position = 2;
					}
				}
			} else {
				var dHigh = ldataArr.dMax, dLow = ldataArr.dMin;
				if(position == 1) // 상승일때
				{
					if (tClose > dHigh){ // 계속 상승인 경우
						ldataArr.dMax = tClose;
						ldataArr.nNum = ((dHigh - dLow)/dOne)+1;
						ldataArr.max = ldataArr.min + ldataArr.nNum;
					} else if (tClose < dHigh - dOne * 3){	// 하락 추세 전환인 경우
						dataArr.push({date: tArr.xaxis, dMin: tClose,
						dMax:dLow + (dOne * (ldataArr.nNum- 1)),
						nPosition:2,
						max:ldataArr.max-1,
						min:ldataArr.max -1- ((((dLow + (dOne * (ldataArr.nNum- 1)))-tClose)/dOne)+1),
						nNum:(((dLow + (dOne * (ldataArr.nNum- 1)))-tClose)/dOne)+1});
						position = 2;
					}
				} else {// 하락일때
					if (tClose < dLow) {// 계속 하락인 경우
						ldataArr.dMin = tClose;
						ldataArr.nNum = ((dHigh - dLow)/dOne)+1;
						ldataArr.min = ldataArr.max - ldataArr.nNum;
					} else if (tClose > dLow + dOne * 3){	// 상승 추세 전환인 경우
						dataArr.push({date: tArr.xaxis,
						dMin: dHigh - (dOne * (ldataArr.nNum- 1)),
						dMax: tClose,
						nPosition:1,
						max:ldataArr.min+1+(((tClose-(dHigh - (dOne * (ldataArr.nNum- 1))))/dOne)+1),
						min:ldataArr.min+1,
						nNum:((tClose-(dHigh - (dOne * (ldataArr.nNum- 1))))/dOne)+1});
						position = 1;
					}
				}
			}
		};
		return init();
	};
	/**
	 * SVG, VML과 선 굵기에 따른 Rectangle 좌표
	 *
	 * @param  {Number} _x 		X좌표
	 * @param  {Number} _y 		Y좌표
	 * @param  {Number} _w 		넓이
	 * @param  {Number} _h 		높이
	 * @param  {Number} _sw 	선굵기
	 * @return {Object} 		Rectangle Object {x, y, width, height, widthhalf(넓이의 반)}
	 */
	function getRectangle (_x, _y, _w, _h, _sw){
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
	/**
	 * Y값 포맷팅 천단위 콤마
	 * @param  {String} value Y값
	 * @param  {Number} fixed 소수점 자리수
	 * @return {String}       포맷팅 텍스트
	 */
	function getYAxisValue (value, fixed){

		return Number(value).toFixed(fixed).format();
	};
	/**
	 * 종합차트 범례 중 텍스트 생성
	 * @param  {Chart} chart      차트객체
	 * @param  {Number} x          텍스트 X 위치
	 * @param  {Number} y          텍스트 Y 위치
	 * @param  {String} value      텍스트
	 * @param  {Object} _textStyle 텍스트 스타일
	 * @param  {String} _textColor 텍스트 컬러
	 * @param  {String} _align     텍스트 정렬
	 * @return {Object}            텍스트 SVG Node와 텍스트 노드와 넓이가 더해진 X 위치
	 */
	function makeText (chart, x, y, value, _textStyle, _textColor, _align){
		var item = chart.text(x, y, value).attr({
			'text-anchor': _align || 'start',
			'font-family': _textStyle.family,
			'font-size': _textStyle.size,
			'fill': _textColor || _textStyle.color
		});
		x += 5 + item.getBBox().width;
		return {item: item, left: x};
	};
	/**
	 * 종합차트 범례 중 사각형 node 생성
	 * @param  {Chart} chart  차트객체
	 * @param  {Number} x     사각형 X 위치
	 * @param  {Number} y     사각형 Y 위치
	 * @param  {Number} size  사각형 크기
	 * @param  {String} color 사각형 색상
	 * @return {Object}       사각형 SVG Node와 사각형 노드와 넓이가 더해진 X 위치
	 */
	function makeRect (chart, x, y, size, color){
		var item = chart.rect(x, y, size, size).attr({
			'fill': color, 
			'stroke-width': 0, 
			'stroke': ''
		});
		x += 3 + item.getBBox().width;
		return {item: item, left: x};
	};
	/**
	 * 종합차트 범례 중 분할 사각형 node 생성
	 * @param  {Chart} chart  차트객체
	 * @param  {Number} x     사각형 X 위치
	 * @param  {Number} y     사각형 Y 위치
	 * @param  {Number} size  사각형 크기
	 * @param  {String} color 사각형 색상
	 * @return {Object}       사각형 SVG Node와 사각형 노드와 넓이가 더해진 X 위치
	 */
	function makeDoubleRect (chart, x, y, size, color){
		var item = chart.rect(x, y, size, size/2).attr({
			'fill': color.color1, 'stroke-width': 0, 'stroke': ''
		});
		item2 = chart.rect(x, y+size/2, size, size/2).attr({
			'fill': color.color2, 'stroke-width': 0, 'stroke': ''
		});

		group = chart.set();
		group.push(item);
		group.push(item2);
		x += 3 + item.getBBox().width;
		return {item: group, left: x};
	};
	/**
	 * 종합차트 범례 중 보조지표 닫기 버튼 생성
	 * @param  {Chart} chart  	차트객체
	 * @param  {Number} x     	닫긷버튼 X 위치
	 * @param  {Number} y     	닫긷버튼 Y 위치
	 * @param  {Object} _styles 스타일
	 * @return {Object}         사각형 SVG Node와 사각형 노드와 자기 자신에서 -7한 X 위치
	 *                              -7을 하는 이유는 자기 자신 왼쪽으로 마우스무브 이벤트를 따라 
	 *                              아이템 데이터를 출력해주는 텍스트 노드가 append 되기 때문
	 */
	function makeButton (chart, x, y, _styles){
		var group = [];
		var stylesSize = _styles.size;

		var left = Math.round(x - stylesSize) + 0.5;

		var rp = getRectangle(x - stylesSize, y - stylesSize/2, stylesSize, stylesSize, _styles.line.width);

		var item = chart.rect(rp.x, rp.y, rp.width, rp.height).attr({
			'fill': _styles.area.color,
			'stroke': _styles.line.color, 
			'stroke-width': _styles.line.width
		});

		return {item: item, left: left - 7};
	};
	/**
	 * 면 색상에 대한 스타일 구분 
	 * 이미지, 그라디언트, 단색 여부에 따라 변환작업이 필요함.
	 * @param  {Number} _w                 아이템 넓이
	 * @param  {Object} _fillstyle       	적용될 스타일
	 * @param  {String} _gradientDirection 그라데이션 방향
	 * @param  {String} _state             마우스 오버된 상태인지 아닌지 'over' | undefined
	 * @return {String}                    변환된 색상값
	 */
	function getFillStyle (_w, _fillstyle, _gradientDirection, _state){
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

	if (!window.webponent){
	
		window.webponent = {};
	}
	
	window.webponent.stockchart = self;

	/**
	 * 종합차트 오버레이 함수 모음 
	 */
	window.webponent.STOCKOVERLAY = function(){
		var _this = this;

		// 활성화된 오버레이들의 범례 모음
		_this.legend = {};
		// 활성화된 오버레이들의 범례들 타이틀과 색상 저장
		_this.legend.series = {};
		// 활성화된 오버레이들의 범례로 만들어진 Node Group
		_this.legend.items = {};
		/**
		 * 오버레이 범례 초기화
		 * @param  {Chart} _chart        차트 객체
		 * @param  {Object} _serieses     오버레이로 생성된 시리즈 
		 * @param  {Object} _styles       차트 확장된 스타일
		 * @param  {Object} _legendStyles 차트 기본 설정된 스타일
		 * @return {Object}               오버레이에 관한 범례 정보 저장
		 */
		this.makeLegend = function(_chart, _serieses, _styles, _legendStyles){
			var group = {};

			var stylesMainLayout = _styles.main.layout;
			var stylesLegend = _legendStyles.legend;

			var graph_left = stylesMainLayout._graphleft;
			var graph_top  = stylesMainLayout._graphtop;
			
			var legendTextSizeHalf = Math.round(stylesLegend.text.size / 2);
			
			var legendY = stylesMainLayout._canvastop + graph_top + legendTextSizeHalf + stylesLegend.paddingTop;
			
			var itemLeft = graph_left + stylesLegend.paddingLeft;
			
			var itemRight  = stylesMainLayout._graphleft + stylesMainLayout._graphwidthpx - stylesLegend.paddingRight;

			for(var i = 0, len = _serieses.length; i < len; i++){
				var key = _serieses[i];

				if(_this.legend.items[key] != undefined) {

					_this.removeLegend(key);
				}

				// 오버레이의 시리즈가 하나만 활성화되어있고
				// 활성화된 오버레이가 BollingerBand, PrabollicSAR, Envelop인경우에만
				// 마우스 무브 이벤트시에 아이템 데이터 출력
				var isRight = false;
				if(_serieses.length === 1 && (key === 'over3' || key === 'over4' || key === 'over5')) {
					isRight = true;
				}

				var items = _this['makeLegend'+key](_chart, itemLeft, legendY, legendTextSizeHalf, _legendStyles, isRight, itemRight);

				group[key] = items;

				_this.legend.series[key] = items.legend;
				_this.legend.items[key] = items.items;

				itemLeft = items.left;

			}
			return group;

		};
		/**
		 * 오버레이 범례 설정값 변경시 호출
		 * @param  {Chart} _chart        차트 객체
		 * @param  {Object} _serieses     오버레이로 생성된 시리즈 
		 * @param  {Object} _styles       차트 확장된 스타일
		 * @param  {Object} _legendStyles 차트 기본 설정된 스타일
		 * @return -
		 */
		this.changeLegend = function(_chart, _serieses, _styles, _legendStyles){
			for(var i = 0; i < _serieses.length; i++){
				var key = _serieses[i];

				_this['changeLegend'+key]();
			}
		};
		/**
		 * 오버레이 범례 삭제
		 * @param  {String} _value 삭제되는 오버레이명
		 * @return -
		 */
		this.removeLegend = function(_value){
			var l = _this.legend.items[_value];
			for(var i in l){
				l[i].remove();
			}
			$(_this.legend.series).removeProp(_value);
			$(_this.legend.items).removeProp(_value);
		};
		/**
		 * 슬라이더가 움직이면 범례를 무조건 최상단으로 올림.
		 * @return -
		 */
		this.toFrontLegend = function() {
			$.each(_this.legend.items, function(key, value) {

				$.each(value, function(key2, value2) {
					value2.toFront();
				});
			});
		};

		/************************ 이동평균 S ************************/
		this.over1_param1 = stockInitParams.over1[0];
		this.over1_param2 = stockInitParams.over1[1];
		this.over1_param3 = stockInitParams.over1[2];
		this.over1_param4 = stockInitParams.over1[3];

		var _arrData = null;
		var sma5_yaxis = "";
		var sma20_yaxis = "";
		var sma60_yaxis = "";
		var sma120_yaxis = "";
		/**
		 * 이동평균 데이터 파싱
		 * @param  {Array} _originalData 원본데이터
		 * @param  {Object} _series       메인 시리즈
		 * @return {Array}               이동평균이 포함된 데이터
		 */
		this.parseOver1Data = function ( _originalData, _series ) {
			over1_Sma5(_originalData, _series.over1_series1);
			over1_Sma20(_originalData, _series.over1_series2);
			over1_Sma60(_originalData, _series.over1_series3);
			over1_Sma120(_originalData, _series.over1_series4);

			return _originalData;
		};
		/**
		 * 이동평균 5일선 
		 * @param  {Array} _data   	원본데이터
		 * @param  {Object} _series 5일선 시리즈
		 * @return {Array}          이동평균 5일선이 포함된 데이터
		 */
		function over1_Sma5 (_data, _series){
			
			if(sma5_yaxis == "") sma5_yaxis = _series.yaxis;

			var price = sma5_yaxis;
			
			_arrData = new Array(_this.over1_param1);
			
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
			
				i = null;
				len = null;
				price = null;
				_arrData = null;
			}
		};
		/**
		 * 이동평균 20일선 
		 * @param  {Array} _data   	원본데이터
		 * @param  {Object} _series 20일선 시리즈
		 * @return {Array}          이동평균 20일선이 포함된 데이터
		 */
		function over1_Sma20 (_data, _series){

			if(sma20_yaxis == "") sma20_yaxis = _series.yaxis;
			
			var price = sma20_yaxis;
			
			_arrData = new Array(_this.over1_param2);
			
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
			
				i = null;
				len = null;
				price = null;
				_arrData = null;
			}
		};
		/**
		 * 이동평균 60일선 
		 * @param  {Array} _data   	원본데이터
		 * @param  {Object} _series 60일선 시리즈
		 * @return {Array}          이동평균 60일선이 포함된 데이터
		 */
		function over1_Sma60 (_data, _series){
			if(sma60_yaxis == "") sma60_yaxis = _series.yaxis;
			var price = sma60_yaxis;
			_arrData = new Array(_this.over1_param3);
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
				i = null, len = null;
				price = null, _arrData = null;
			}
		};
		/**
		 * 이동평균 120일선 
		 * @param  {Array} _data   	원본데이터
		 * @param  {Object} _series 120일선 시리즈
		 * @return {Array}          이동평균 120일선이 포함된 데이터
		 */
		function over1_Sma120 (_data, _series){
			if(sma120_yaxis == "") 
				sma120_yaxis = _series.yaxis;
			
			var price = sma120_yaxis;
			
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
				i = null, len = null;
				price = null, _arrData = null;
			}
		};
		/**
		 * 이평값 구하기(SMA)
		 * @param  {Array} _arr   n일 이전부터 오늘까지 종가 저장
		 * @param  {Number} _index 현재 데이터 위치
		 * @param  {Number} _param 디폴트값
		 * @param  {Array} _data  _index 일자의 종가
		 * @return {Number}        이평값
		 */
		function parseSMA (_arr, _index, _param, _data) {
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
		/**
		 * 이동평균 범례 설정값 저장
		 * @param  {Object} _styles 이동평균 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendOver1 (_styles){
			return {
				title : '이동평균',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				color3: _styles.series3.line.normal.color,
				color4: _styles.series4.line.normal.color
			}
		};
		/**
		 * 이동평균 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
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
		/**
		 * 이동평균 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendover1 = function () {
			var itemsOver = _this.legend.items.over1;
			itemsOver.param1.attr({'text': _this.over1_param1});
			itemsOver.param2.attr({'text': _this.over1_param2});
			itemsOver.param3.attr({'text': _this.over1_param3});
			itemsOver.param4.attr({'text': _this.over1_param4});
			return _this.legend;
		};
		/************************ 이동평균 E ************************/
		/************************ 일목균형 S ************************/
		this.over2_param1 = stockInitParams.over2[1];
		this.over2_param2 = stockInitParams.over2[0];
		this.over2_param3 = stockInitParams.over2[2];
		var over2_bandS = 0, over2_bandC = 0, over2_bandB = 0, over2_bandF1 = 0, over2_bandF2 = 0;
		var over2_originalData = null, over2_originalDataCount = null;
		/**
		 * 일목균형 데이터 파싱
		 * over2_bandS  : 기준선
		 * over2_bandC  : 전환선
		 * over2_bandB  : 후행스팬
		 * over2_bandF1 : 선행스팬1
		 * over2_bandF2 : 선행스팬2
		 *
		 * over2_param1 : 기준, 후행, 선행 디폴트
		 * over2_param2 : 전환 디폴트
		 * over2_param3 : 선행 디폴트
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	일목균형이 포함된 데이터
		 */
		this.parseOver2Data = function ( _originalData, _series, _candleSeries ) {
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;

			over2_originalData = _originalData;
			var count = _originalData.length;
			if(over2_originalDataCount == null) {
				over2_originalDataCount = count;
			}
			for(var i = 0, len = over2_originalDataCount; i <= len; i++){
				var thisOriginalData = _originalData[i];
				if(i < over2_originalDataCount){
					over2_bandS  = over2_STDLine(i, _this.over2_param1, _candleSeries); // 기준
					over2_bandC  = over2_CVTLine(i, _this.over2_param2, _candleSeries); // 전환
					over2_bandB  = over2_BACKLine(i, _this.over2_param1, _candleSeries); // 후행
					over2_bandF1 = over2_FST1Line(i, _this.over2_param1, _this.over2_param2, _candleSeries); // 선행1
					over2_bandF2 = over2_FST2Line(i, _this.over2_param3, _this.over2_param1, _candleSeries); // 선행2

					if(i < count - _this.over2_param1) {
						if(i >= _this.over2_param1 - 1 && i < count - _this.over2_param1) {
							thisOriginalData.bandSTD = over2_bandS;
							thisOriginalData.bandCVT = over2_bandC;
							thisOriginalData.bandBACK = over2_bandB;
							thisOriginalData.bandFIR1 = over2_bandF1;
							thisOriginalData.bandFIR2 = over2_bandF2;
						} else {
							thisOriginalData.bandSTD = over2_bandS;
							thisOriginalData.bandCVT = over2_bandC;
							thisOriginalData.bandBACK = over2_bandB;
							thisOriginalData.bandFIR1 = null;
							thisOriginalData.bandFIR2 = null;
						}
					} else if(i >= count - _this.over2_param1 && i < _this.over2_param1) {
						thisOriginalData.bandSTD = over2_bandS;
						thisOriginalData.bandCVT = over2_bandC;
						thisOriginalData.bandBACK = null;
						thisOriginalData.bandFIR1 = null;
						thisOriginalData.bandFIR2 = null;
					} else {
						thisOriginalData.bandSTD = over2_bandS;
						thisOriginalData.bandCVT = over2_bandC;
						thisOriginalData.bandBACK = null;
						thisOriginalData.bandFIR1 = over2_bandF1;
						thisOriginalData.bandFIR2 = over2_bandF2;
					}
				} else if(i == over2_originalDataCount) {

					_originalData.splice(over2_originalDataCount, count - over2_originalDataCount);
					for(var j = 1; j < _this.over2_param1; j++) {
						if(over2_nFST1Array[j] == null || over2_nFST1Array[j] == '') {

						} else {
							var obj = {};
							obj[xaxis] = " ", obj.xaxis = " ";
							obj.bandFIR1 = over2_nFST1Array[j];
							obj.bandFIR2 = over2_nFST2Array[j];
							_originalData.push(obj);
						}
					}
				}
			}
			_series.over2_series1.yaxis = "bandCVT";
			_series.over2_series2.yaxis = "bandSTD";
			_series.over2_series6.yaxis = "bandFIR1";
			_series.over2_series6.minaxis = "bandFIR2";
			_series.over2_series3.yaxis = "bandFIR1";
			_series.over2_series4.yaxis = "bandFIR2";
			_series.over2_series5.yaxis = "bandBACK";
			return _originalData;
		};
		// 기준선
		var over2_nSTDLine_high = null, over2_nSTDLine_low = null;
		/**
		 * 일목균형 기준선값 구하기
		 * @param  {Number} _index        현재 데이터 위치
		 * @param  {Number} _paramDay     기준 디폴트 over2_param1
		 * @param  {Object} _candleSeries 사용자 정의 시리즈
		 * @return {Number}               현재 데이터 위치의 기준선값
		 */
		function over2_STDLine (_index, _paramDay, _candleSeries) {
			if(_index == 0){
				over2_nSTDLine_high = new Array(_paramDay);
				over2_nSTDLine_low = new Array(_paramDay);
			}
			if(_paramDay == 1) {
				return (Number((over2_originalData[_index])[_candleSeries.high]) + Number((over2_originalData[_index])[_candleSeries.low]))/2;
			} else {
				over2_nSTDLine_high[_index % _paramDay] = Number((over2_originalData[_index])[_candleSeries.high]);
				over2_nSTDLine_low[_index % _paramDay]  = Number((over2_originalData[_index])[_candleSeries.low]);

				var dHigher = over2_nSTDLine_high[0], dLower  = over2_nSTDLine_low[0];

				for(var i = over2_nSTDLine_high.length; i --;){
					if(dHigher <= over2_nSTDLine_high[i]) dHigher = over2_nSTDLine_high[i];
					if(dLower >= over2_nSTDLine_low[i]) dLower  = over2_nSTDLine_low[i];
				}
				return (dHigher+dLower)/2;
			}
		};
		// 전환선
		var over2_nCVTLine_high = null, over2_nCVTLine_low = null;
		/**
		 * 일목균형 전환선값 구하기
		 * @param  {Number} _index        현재 데이터 위치
		 * @param  {Number} _paramDay     전환 디폴트 over2_param2
		 * @param  {Object} _candleSeries 사용자 정의 시리즈
		 * @return {Number}               현재 데이터 위치의 전환선값
		 */
		function over2_CVTLine (index, paramDay, _candleSeries) {
			if (index == 0){
				over2_nCVTLine_high = new Array(paramDay);
				over2_nCVTLine_low = new Array(paramDay);
			}
			if(paramDay == 1){
				return (Number((over2_originalData[index])[_candleSeries.high]) + Number((over2_originalData[index])[_candleSeries.low]))/2;
			}else{
				over2_nCVTLine_high[index % paramDay] = Number((over2_originalData[index])[_candleSeries.high]);
				over2_nCVTLine_low[index % paramDay]  = Number((over2_originalData[index])[_candleSeries.low]);

				var dHigher = over2_nCVTLine_high[0];
				var dLower  = over2_nCVTLine_low[0];

				for(var i = over2_nCVTLine_high.length; i --;){
					if(dHigher <= over2_nCVTLine_high[i]) dHigher = over2_nCVTLine_high[i];
					if(dLower  >= over2_nCVTLine_low[i]) dLower  = over2_nCVTLine_low[i];
				}
				return (dHigher+dLower)/2;
			}
		};
		// 후행스팬
		/**
		 * 일목균형 후행스팬값 구하기
		 * @param  {Number} _index        현재 데이터 위치
		 * @param  {Number} _paramDay     후행 디폴트 over2_param1
		 * @param  {Object} _candleSeries 사용자 정의 시리즈
		 * @return {Number}               현재 데이터 위치의 후행스팬값
		 */
		function over2_BACKLine (index, paramDay, _candleSeries)	{
			if(index + paramDay -1 < over2_originalDataCount){
				return Number((over2_originalData[index + paramDay - 1])[_candleSeries.close]);
			}
			else{ return null; }
		};
		// 선행스팬1
		var over2_nFST1Array = null;
		var over2_nFSTSTD_high = null, over2_nFSTSTD_low = null;
		var over2_nFSTCVT_high = null, over2_nFSTCVT_low = null;
		/**
		 * 일목균형 선행스팬1값 구하기
		 * @param  {Number} _index        현재 데이터 위치
		 * @param  {Number} _paramDay1    선행 디폴트 over2_param1
		 * @param  {Number} _paramDay2    선행 디폴트 over2_param3
		 * @param  {Object} _candleSeries 사용자 정의 시리즈
		 * @return {Number}               현재 데이터 위치의 선행스팬1값
		 */
		function over2_FST1Line (index, paramDay1, paramDay2, _candleSeries)	{
			if(index == 0){
				over2_nFST1Array   = new Array(paramDay1);
				over2_nFSTSTD_high = new Array(paramDay1);
				over2_nFSTSTD_low  = new Array(paramDay1);
				over2_nFSTCVT_high = new Array(paramDay2);
				over2_nFSTCVT_low  = new Array(paramDay2);
			}
			if(paramDay1 == 1){
				var dParam1 = (((Number((over2_originalData[index])[_candleSeries.high]) + Number((over2_originalData[index])[_candleSeries.low]))/2) + ((Number((over2_originalData[index])[_candleSeries.high]) + Number((over2_originalData[index])[_candleSeries.low]))/2))/2;
				return dParam1;
			}else{
				over2_nFSTSTD_high[index % paramDay1] = Number((over2_originalData[index])[_candleSeries.high]);
				over2_nFSTSTD_low[index % paramDay1]  = Number((over2_originalData[index])[_candleSeries.low]);
				over2_nFSTCVT_high[index % paramDay2] = Number((over2_originalData[index])[_candleSeries.high]);
				over2_nFSTCVT_low[index % paramDay2]  = Number((over2_originalData[index])[_candleSeries.low]);

				var dHigher1 = over2_nFSTSTD_high[0], dLower1  = over2_nFSTSTD_low[0];
				var dHigher2 = over2_nFSTCVT_high[0], dLower2  = over2_nFSTCVT_low[0];

				for(var i = over2_nFSTSTD_high.length; i--;){
					if(dHigher1 < over2_nFSTSTD_high[i]) dHigher1 = over2_nFSTSTD_high[i];
					if(dLower1 > over2_nFSTSTD_low[i]) dLower1 = over2_nFSTSTD_low[i];

					if(dHigher2 < over2_nFSTCVT_high[i]) dHigher2 = over2_nFSTCVT_high[i];
					if(dLower2 > over2_nFSTCVT_low[i]) dLower2 = over2_nFSTCVT_low[i];
				}
				var dSTD = (dHigher1 + dLower1) / 2; // 기준선
				var dCVT = (dHigher2 + dLower2) / 2; // 전환선
				var dFST1 = (dSTD+dCVT)/2;

				if(over2_nFST1Array[paramDay1-2] == null){
					over2_nFST1Array[index] = dFST1;
					return null;
				}else if(over2_nFST1Array[paramDay1-1] == null){
					over2_nFST1Array[index] = dFST1;
					return over2_nFST1Array[0];
				}else{
					over2_nFST1Array.shift();
					over2_nFST1Array[paramDay1 - 1] = dFST1;
					return over2_nFST1Array[0];
				}
			}
		};
		// 선행스팬2
		var over2_nFST2Line_high = null, over2_nFST2Line_low = null;
		var over2_nFST2Array = null;
		/**
		 * 일목균형 선행스팬2값 구하기
		 * @param  {Number} _index        현재 데이터 위치
		 * @param  {Number} _paramDay1    선행 디폴트 over2_param1
		 * @param  {Number} _paramDay2    선행 디폴트 over2_param3
		 * @param  {Object} _candleSeries 사용자 정의 시리즈
		 * @return {Number}               현재 데이터 위치의 선행스팬2값
		 */
		function over2_FST2Line (index, paramDay1, paramDay2, _candleSeries){
			if (index == 0)	{
				over2_nFST2Line_high = new Array(paramDay1);
				over2_nFST2Line_low = new Array(paramDay1);
				over2_nFST2Array = new Array(paramDay2);
			}
			// 종가
			var dHigh = Number((over2_originalData[index])[_candleSeries.high]), dLow = Number((over2_originalData[index])[_candleSeries.low]);

			over2_nFST2Line_high[index % paramDay1] = dHigh;
			over2_nFST2Line_low[index % paramDay1] = dLow;
			var dHigher = over2_nFST2Line_high[0], dLower = over2_nFST2Line_low[0];

			for(var i = over2_nFST2Line_high.length; i--;){
				if(dHigher < over2_nFST2Line_high[i]) dHigher = over2_nFST2Line_high[i];
				if(dLower > over2_nFST2Line_low[i]) dLower = over2_nFST2Line_low[i];
			}
			var dFST2 = (dHigher+dLower)/2;

			if(paramDay2 == 1){
				return dFST2;
			}else{
				if(over2_nFST2Array[paramDay2-2] == null){
					over2_nFST2Array[index] = dFST2;
					return null;
				}else if(over2_nFST2Array[paramDay2-1] == null){
					over2_nFST2Array[index] = dFST2;
					return over2_nFST2Array[0];
				}else{
					over2_nFST2Array.shift();
					over2_nFST2Array[paramDay2 - 1] = dFST2;
					return over2_nFST2Array[0];
				}
			}
		};
		/**
		 * 일목균형은 기준 디폴트값만큼 데이터의 개수가 늘어나므로 비활성화되면 그만큼 빼주는 작업이 필요함.
		 * @param  {Array} _data 차트데이터
		 * @return -
		 */
		this.deleteOver2Data = function ( _data ) {
			_data.splice(_data.length - (_this.over2_param1 - 1), _this.over2_param1);
		};
		/**
		 * 일목균형 범례 설정값 저장
		 * @param  {Object} _styles 일목균형 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendOver2 (_styles){
			return {
				title : '일목균형',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				color3: _styles.series3.line.normal.color,
				color4: _styles.series4.line.normal.color,
				color5: _styles.series5.line.normal.color
			}
		};
		/**
		 * 일목균형 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendover2 = function(chart, x, y, half, _styles){
			var item = null, group = {};
			var legend = initLegendOver2(_styles.over2);
			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '전환', legendStyles.text, legend.color1);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, '기준', legendStyles.text, legend.color2);
			group.text2 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color3);
			group.rect3 = item.item;

			item = makeText(chart, item.left, y, '선행1', legendStyles.text, legend.color3);
			group.text3 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color4);
			group.rect4 = item.item;

			item = makeText(chart, item.left, y, '선행2', legendStyles.text, legend.color4);
			group.text4 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color5);
			group.rect5 = item.item;

			item = makeText(chart, item.left, y, '후행', legendStyles.text, legend.color5);
			group.text5 = item.item;

			item = makeText(chart, item.left, y, '('+_this.over2_param2+','+_this.over2_param1+','+_this.over2_param3+')', legendStyles.text, legend.color5);
			group.param1 = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * 일목균형 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendover2 = function () {
			var itemsOver = _this.legend.items.over2;
			itemsOver.param1.attr({'text': '('+_this.over2_param2+','+_this.over2_param1+','+_this.over2_param3+')'});
			return _this.legend;
		};
		/************************ 일목균형 E ************************/
		/************************ Bollinger Band S ************************/
		this.over3_param1 = stockInitParams.over3[0];
		this.over3_param2 = 2;
		var over3_bandT = 0, over3_bandM = 0, over3_bandB = 0;
		/**
		 * Bollinger Band 데이터 파싱
		 * over3_param1 : 기간 
		 * over3_param2 : 표준편차
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	Bollinger Band가 포함된 데이터
		 */
		this.parseOver3Data = function ( _originalData, _series, _candleSeries ) {
			var xAxisName = _candleSeries.xaxis, count = _originalData.length;
			var yAxisName = _candleSeries.close;
			for(var i = 0; i < count; i++) {
				var stdDeviation = over3_STDdeviation(i, _this.over3_param1, _originalData, yAxisName); // 표준편차
				var stdSMA = over3_SMA(i, _this.over3_param1, _originalData, yAxisName);

				over3_bandT = stdSMA + _this.over3_param2 * stdDeviation; //상향
				over3_bandM = stdSMA; // 중간
				over3_bandB = stdSMA - _this.over3_param2 * stdDeviation; //하향

				var thisOriginalData = _originalData[i];
				if(i >= _this.over3_param1 && thisOriginalData[xAxisName] != ' '){
					thisOriginalData.bandTOP = over3_bandT;
					thisOriginalData.bandMID = over3_bandM;
					thisOriginalData.bandBOT = over3_bandB;
				} else if(i < _this.over3_param1) {
					thisOriginalData.bandTOP = null;
					thisOriginalData.bandMID = null;
					thisOriginalData.bandBOT = null;
				}
			}
			_series.over3_series1.yaxis = "bandTOP";
			_series.over3_series2.yaxis = "bandBOT";
			_series.over3_series3.yaxis = "bandMID";
			_series.over3_series4.yaxis = "bandTOP";
			_series.over3_series4.minaxis = "bandBOT";

			return _originalData;
		};
		/**
		 * Bollinger Band 표준편차 구하기
		 * @param  {Number} index     현재 데이터 위치
		 * @param  {Number} paramDay  Bollinger Band 디폴트
		 * @param  {Array} _data      원본데이터
		 * @param  {String} yAxisName Y축으로 사용하는 데이터 Key값
		 * @return {Number}           표준편차
		 */
		function over3_STDdeviation ( index, paramDay, _data, yAxisName){
			var sma = 0;

			if(index >= paramDay -1){
				var SMA_TOTAL = over3_SMA(index, paramDay, _data, yAxisName); // 단기이동평균
				for (var i = 0; i < paramDay; i++) {// 단기이평
					sma += Math.pow(over3_nShortSMA[i] - SMA_TOTAL, 2);
				}
				var STD_TOTAL = Math.sqrt((sma/paramDay));
				return STD_TOTAL;
			}else{
				return 0;
			}
		};
		var over3_nShortSMA = null;
		/**
		 * Bollinger Band 이평값 구하기
		 * @param  {Number} index     현재 데이터 위치
		 * @param  {Number} paramDay  Bollinger Band 디폴트
		 * @param  {Array} _data      원본데이터
		 * @param  {String} yAxisName Y축으로 사용하는 데이터 Key값
		 * @return {Number}           이평값
		 */
		function over3_SMA (index, paramDay, _data, yAxisName) {
			if (index == 0)	{ over3_nShortSMA = new Array(paramDay); }
			// 종가
			var dClose = (_data[index])[yAxisName], dShortSMA = 0;
			over3_nShortSMA[index % paramDay] = Number(dClose);
			if(index >= paramDay-1) { // 장기이평
				for (var i = paramDay; i--;) // 단기이평
					dShortSMA += over3_nShortSMA[i];
				dShortSMA = dShortSMA / paramDay;
				return dShortSMA;
			}else{ return 0; }
		};
		/**
		 * Bollinger Band 범례 설정값 저장
		 * @param  {Object} _styles Bollinger Band 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendOver3 (_styles){
			return {
				title : 'Bollinger Band',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				color3: _styles.series3.line.normal.color,
				info: ['U', 'L', 'M'],
				series: ['over3_series1', 'over3_series2', 'over3_series3'],
				toFixed: 0
			}
		};
		/**
		 * Bollinger Band 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @param  {Object} _check 	true 이면 범례 우측으로 마우스무브 이벤트에 반응하는 텍스트가 생성이됨.
		 * @param  {Object} _rx 	_check가 true 이면 생기는 범례 ㅊ우측의 X 시작 위치
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendover3 = function(chart, x, y, half, _styles, _check, _rx){
			var data = chart.getData().main;

			var s1 = data['DATA-over3_series1'].data;
			var s2 = data['DATA-over3_series2'].data;
			var s3 = data['DATA-over3_series3'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendOver3(_styles.over3);
			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color3);
			group.rect3 = item.item;

			item = makeText(chart, item.left, y, '('+_this.over3_param1+')', legendStyles.text);
			group.param1 = item.item;
			if(_check){
				item = makeText(chart, _rx, y, 'U: '+getYAxisValue(s1[count].yaxis, legend.toFixed)+' L: '+getYAxisValue(s2[count].yaxis, legend.toFixed)+' M:' + getYAxisValue(s3[count].yaxis, legend.toFixed), legendStyles.text, undefined, 'end');
				group.info = item.item;
			}


			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * Bollinger Band 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendover3 = function () {
			var itemsOver = _this.legend.items.over3;
			itemsOver.param1.attr({'text': '('+_this.over3_param1+')'});
			return _this.legend;
		};
		/************************ Bollinger Band E ************************/
		/************************ Parabollic SAR S ************************/
		this.over4_param1 = stockInitParams.over4[0];
		this.over4_param2 = 0.2;
		var over4_dSARCheck = ""; // 추세
		var over4_EP = 0, over4_low = 0, over4_AF = 0; // 신고가 EP, 신저가 EP, 가속도
		/**
		 * Parabollic SAR 데이터 파싱
		 * over4_param1 : 증가값
		 * over4_param2 : 한계값
		 * 
		 * over4_dSARCheck : 추세
		 * over4_EP : 신고가 EP
		 * over4_low : 신저가 EP
		 * over4_AF : 가속도
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	Parabollic SAR가 포함된 데이터
		 */
		this.parseOver4Data = function ( _originalData, _series, _candleSeries ) {
			var open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;

			var count = _originalData.length;
			var dSAR = 0, pSAR = 0; //당일 SAR, 전일 SAR
			for(var i = 0; i < count; i++) {
				var tData = _originalData[i];

				if(i == 0){
					over4_AF = _this.over4_param1;
					dSAR = pSAR = Number(tData[close]);

					if(Number(tData[close]) > Number(_originalData[i + 1][close])){
						over4_dSARCheck = 'DOWN';
						over4_EP = Number(tData[high]);
					} else {
						over4_dSARCheck = 'UP';
						over4_EP = Number(tData[low]);
					}
				} else {

					if(over4_dSARCheck == 'UP'){
						if(Number(tData[low]) < pSAR) {
							over4_dSARCheck = 'DOWN';
							dSAR = pSAR = over4_EP;
							over4_EP = Number(tData[low]);
							over4_AF = _this.over4_param1;
						} else {
							dSAR = pSAR + over4_AF * (over4_EP - pSAR);
							if(over4_EP < Number(tData[high])){
								over4_EP = Number(tData[high]);
								over4_AF = Math.min(_this.over4_param2, over4_AF + _this.over4_param1);
							}
							pSAR = dSAR;
						}
					} else {
						if(Number(tData[high]) > pSAR) {
							over4_dSARCheck = 'UP';
							dSAR = pSAR = over4_EP;
							over4_EP = Number(tData[high]);
							over4_AF = _this.over4_param1;
						} else {
							dSAR = pSAR + over4_AF * (over4_EP - pSAR);
							if(over4_EP > Number(tData[low])){
								over4_EP = Number(tData[low]);
								over4_AF = Math.min(_this.over4_param2, over4_AF + _this.over4_param1);
							}
							pSAR = dSAR;
						}
					}
				}
				if(i < count && tData[high] != null) {
					tData.bandSAR = dSAR;
				} else {
					tData.bandSAR = null;
				}

			}
			_series.over4_series1.yaxis = "bandSAR";

			return _originalData;
		};
		/**
		 * Parabollic SAR 범례 설정값 저장
		 * @param  {Object} _styles Parabollic SAR 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendOver4 (_styles){
			return {
				title : 'Parabollic',
				color1: _styles.series1.tick.area.normal.color,
				info: ['Parabollic'],
				series: ['over4_series1'],
				toFixed: 0
			}
		};
		/**
		 * Parabollic SAR 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @param  {Object} _check 	true 이면 범례 우측으로 마우스무브 이벤트에 반응하는 텍스트가 생성이됨.
		 * @param  {Object} _rx 	_check가 true 이면 생기는 범례 ㅊ우측의 X 시작 위치
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendover4 = function(chart, x, y, half, _styles, _check, _rx){
			var data = chart.getData().main;

			var s1 = data['DATA-over4_series1'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendOver4(_styles.over4);
			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '('+_this.over4_param1+')', legendStyles.text);
			group.param1 = item.item;

			if(_check){
				item = makeText(chart, _rx, y, legend.info[0] + ': ' + getYAxisValue(s1[count].yaxis, legend.toFixed), legendStyles.text, undefined, 'end');
				group.info = item.item;
			}


			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * Parabollic SAR 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendover4 = function () {
			var itemsOver = _this.legend.items.over4;
			itemsOver.param1.attr({'text': '('+_this.over4_param1+')'});
			return _this.legend;
		};
		/************************ Parabollic SAR E ************************/
		/************************ Envelop S ************************/
		this.over5_param1 = stockInitParams.over5[0];
		this.over5_param2 = stockInitParams.over5[1];
		var over5_nShortSMA = [];
		/**
		 * Envelop 데이터 파싱
		 * over5_param1 : 이평
		 * over5_param2 : 비율
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	Envelop가 포함된 데이터
		 */
		this.parseOver5Data = function(_originalData, _series, _candleSeries){
			var open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;
			var count = _originalData.length;
			var bandT = 0, bandM = 0, bandB = 0;
			var stdSMA = 0, tData = null;
			for(var i = 0; i < count; i++) {
				tData = _originalData[i];
				stdSMA = over5_SMA(i, _this.over5_param1, tData, close);
				bandT = stdSMA + (_this.over5_param2/100) * stdSMA; //상향
				bandM = stdSMA; // 중간
				bandB = stdSMA - (_this.over5_param2/100) * stdSMA; //하향

				if(i >= _this.over5_param1 && tData[high] != null){
					tData.bandETOP = bandT;
					tData.bandEMID = bandM;
					tData.bandEBOT = bandB;
				} else {
					tData.bandETOP = null;
					tData.bandEMID = null;
					tData.bandEBOT = null;
				}
			}
			_series.over5_series1.yaxis = "bandETOP";
			_series.over5_series2.yaxis = "bandEBOT";
			_series.over5_series3.yaxis = "bandEMID";
			_series.over5_series4.yaxis = "bandETOP";
			_series.over5_series4.minaxis = "bandEBOT";

			return _originalData;
		};
		/**
		 * Envelop 이평값 구하기
		 * @param  {Number} index     현재 데이터 위치
		 * @param  {Number} paramDay  Envelop 디폴트 over5_param1
		 * @param  {Array} _data      원본데이터
		 * @param  {String} yAxisName Y축으로 사용하는 데이터 Key값
		 * @return {Number}           이평값
		 */
		function over5_SMA (index, paramDay, _data, yAxisName){
			if (index == 0) { over5_nShortSMA = new Array(paramDay); }

			// 종가
			var dClose = Number(_data[yAxisName]), dShortSMA=0;
			over5_nShortSMA[index % paramDay] = dClose;
			if(index >= paramDay-1) {// 장기이평
				for (var i = paramDay; i--;) // 단기이평
					dShortSMA += over5_nShortSMA[i];
				dShortSMA = dShortSMA / paramDay;
				return dShortSMA;
			}else{ return 0; }
		};
		/**
		 * Envelop 범례 설정값 저장
		 * @param  {Object} _styles Envelop 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendOver5 (_styles){
			return {
				title : 'Envelop',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				color3: _styles.series3.line.normal.color,
				info: ['U', 'L', 'M'],
				series: ['over5_series1', 'over5_series2', 'over5_series3'],
				toFixed: 0
			}
		};
		/**
		 * Envelop 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @param  {Object} _check 	true 이면 범례 우측으로 마우스무브 이벤트에 반응하는 텍스트가 생성이됨.
		 * @param  {Object} _rx 	_check가 true 이면 생기는 범례 ㅊ우측의 X 시작 위치
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendover5 = function(chart, x, y, half, _styles, _check, _rx){
			var data = chart.getData().main;

			var s1 = data['DATA-over5_series1'].data;
			var s2 = data['DATA-over5_series2'].data;
			var s3 = data['DATA-over5_series3'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendOver5(_styles.over5);
			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color3);
			group.rect3 = item.item;

			item = makeText(chart, item.left, y, '('+_this.over5_param1+','+_this.over5_param2+')', legendStyles.text);
			group.param1 = item.item;

			if(_check){
				var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed) + ' ' + legend.info[2] + ": "+getYAxisValue(s3[count].yaxis, legend.toFixed);
				item = makeText(chart, _rx, y, text, legendStyles.text, undefined, 'end');
				group.info = item.item;
			}


			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * Envelop 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendover5 = function () {
			var itemsOver = _this.legend.items.over5;
			itemsOver.param1.attr({'text': '('+_this.over5_param1+','+_this.over5_param2+')'});
			return _this.legend;
		};
		/************************ Envelop E ************************/
		/************************ 그물차트 S ************************/
		this.over6_param1 = stockInitParams.over6[0];
		this.over6_param2 = stockInitParams.over6[1];
		this.over6_param3 = stockInitParams.over6[2];
		var over6_nShortSMA_Arr = [], over6_nShortSMA = [];
		var over6_style1 = null, over6_style2 = null;
		/**
		 * 그물차트 데이터 파싱
		 * over6_param1 : 시작이평
		 * over6_param2 : 종가
		 * over6_param3 : 개수
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @param  {Object} _style 			빈 스타일 시리즈 이 변수는 완료후 메인 스타일을 확장시킨다.
		 * @param  {Object} _styles 		메인 스타일
		 * @return {Array}               	그물차트가 포함된 데이터
		 */
		this.parseOver6Data = function(_originalData, _series, _candleSeries, _style, _styles){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;
			var count = _originalData.length;
			var over6_param = 0, nShortSMA = 0;
			if(over6_style1 == null){
				over6_style1 = _style.over6_series1, over6_style2 = _style.over6_series2;
			} else {
				for(var i in _series){
					if(i.indexOf("over6") > -1){
						$(_series).removeProp(i);
						$(_styles.series).removeProp(i);
					}
				}
			}

			for(var i = 0; i < count; i++){
				var tData = _originalData[i];
				if(i < count && tData[high] != null){
					nShortSMA = 0;
					for(var j = 1; j <= _this.over6_param3;j++){
						if(j == 1){
							over6_param = _this.over6_param1;
							nShortSMA = over6_SMA(i, over6_param, j, tData, close); // 단기이동평균

							(tData)["bandMA"+j] = nShortSMA;
						}else{
							over6_param = over6_param + _this.over6_param2;
							nShortSMA = over6_SMA(i, over6_param, j, tData, close); // 단기이동평균

							(tData)["bandMA"+j] = nShortSMA;
						}
					}
				}
			}
			var obj = null;
			for(var i = _this.over6_param3; i >= 1; i--){
				obj = new Object();
				obj.series = "line";
				obj.xaxis = xaxis;
				obj.yaxis = "bandMA"+i;
				obj.label = "그물차트";
				_series["over6_series"+i] = obj;
				if(i == 1 || i == _this.over6_param3){
					_style["over6_series"+i] = over6_style1;
				}
				else { _style["over6_series"+i] = over6_style2; }
			}
			return _originalData;
		};
		/**
		 * 그물차트 이평값 구하기
		 * @param  {Number} index     현재 데이터 위치
		 * @param  {Number} paramDay  그물차트 디폴트 over6_param1
		 * @param  {Number} _count    over6_param3 값
		 * @param  {Array} _data      원본데이터
		 * @param  {String} yAxisName Y축으로 사용하는 데이터 Key값
		 * @return {Number}           이평값
		 */
		function over6_SMA (index, paramDay, _count, _data, yAxisName){
			var count = _count - 1;
			if (index == 0) {
				over6_nShortSMA = new Array(paramDay);
				over6_nShortSMA_Arr.push(over6_nShortSMA);
			}
			// 종가
			var dClose = Number(_data[yAxisName]), dShortSMA=0;
			over6_nShortSMA_Arr[count][index % paramDay] = dClose;
			if(index >= paramDay-1) {// 장기이평
				for (var i = paramDay; i--;) // 단기이평
					dShortSMA += over6_nShortSMA_Arr[count][i];
				dShortSMA = dShortSMA / paramDay;
				return dShortSMA;
			}else{
				for (i=0; i <= index; i++)
					dShortSMA += over6_nShortSMA_Arr[count][i];
				dShortSMA = dShortSMA / (index+1);
				return dShortSMA;
			}
		};
		/**
		 * 그물차트 범례 설정값 저장
		 * @param  {Object} _styles 그물차트 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendOver6 (_styles){
			return {
				title : '그물차트',
				color1: _styles.series1.line.normal.color,
				info: [],
				series: ['over6_series1'],
				toFixed: 0
			}
		};
		/**
		 * 그물차트 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @param  {Object} _check 	true 이면 범례 우측으로 마우스무브 이벤트에 반응하는 텍스트가 생성이됨.
		 * @param  {Object} _rx 	_check가 true 이면 생기는 범례 ㅊ우측의 X 시작 위치
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendover6 = function(chart, x, y, half, _styles, _check, _rx){
			var item = null, group = {};
			var legend = initLegendOver6(_styles.over6);
			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '('+_this.over6_param1+','+_this.over6_param2+','+_this.over6_param3+')', legendStyles.text);
			group.param1 = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * 그물차트 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendover6 = function () {
			var itemsOver = _this.legend.items.over6;
			itemsOver.param1.attr({'text': '('+_this.over6_param1+','+_this.over6_param2+','+_this.over6_param3+')'});
			return _this.legend;
		};
		/************************ 그물차트 E ************************/
		/************************ 매물분석도 S ************************/
		this.over7_param1 = stockInitParams.over7[0];
		this.over7_select = false;
		/**
		 * 매물분석도 범례 설정값 저장
		 * 매물분석도는 webponent.chart.js 에서 생성, 관리한다.
		 * over7_param1 : 개수
		 * @param  {Object} _styles 매물분석도 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendOver7 (_styles){
			return {
				title : '매물분석도',
				color1: _styles.series1.area.normal.color,
				info: [],
				series: ['over7_series1'],
				toFixed: 0
			}
		};
		/**
		 * 매물분석도 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @param  {Object} _check 	true 이면 범례 우측으로 마우스무브 이벤트에 반응하는 텍스트가 생성이됨.
		 * @param  {Object} _rx 	_check가 true 이면 생기는 범례 ㅊ우측의 X 시작 위치
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendover7 = function(chart, x, y, half, _styles, _check, _rx){
			var item = null, group = {};
			var legend = initLegendOver7(_styles.over7);
			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeText(chart, item.left, y, '('+_this.over7_param1+')', legendStyles.text);
			group.param1 = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * 매물분석도 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendover7 = function () {
			var itemsOver = _this.legend.items.over7;
			itemsOver.param1.attr({'text': '('+_this.over7_param1+')'});
			return _this.legend;
		};
		/************************ 매물분석도 E ************************/
	};
	/**
	 * 종합차트 보조지표 함수 모음
	 * @param {Selector} _selector 차트 div
	 */
	window.webponent.STOCKASSIST = function(_selector){

		var _this = this;

		// 활성화된 보조지표들의 범례 모음
		_this.legend = {};
		// 활성화된 보조지표들의 범례들 타이틀과 색상 저장
		_this.legend.series = {};
		// 활성화된 보조지표들의 범례로 만들어진 Node Group
		_this.legend.items = {};
		/**
		 * 보조지표 범례 초기화
		 * @param  {Chart} _chart        차트 객체
		 * @param  {Object} _serieses     보조지표로 생성된 시리즈 
		 * @param  {Object} _styles       차트 확장된 스타일
		 * @param  {Object} _legendStyles 차트 기본 설정된 스타일
		 * @return {Object}               보조지표에 관한 범례 정보 저장
		 */
		this.makeLegend = function(_chart, _serieses, _styles, _legendStyles){
			var group = {};

			var stylesLegend = _legendStyles.legend;
			
			var legendTextSizeHalf = Math.round(stylesLegend.text.size / 2);
			for(var i = 0, len = _serieses.length; i < len; i++){
				
				var key = _serieses[i];
				
				var stylesSubLayout = _styles[key].layout;

				if(_this.legend.items[key] != undefined) _this.removeLegend(key);

				var graph_left = stylesSubLayout._graphleft;
				var graph_top  = stylesSubLayout._graphtop;

				var legendY = stylesSubLayout._canvastop + graph_top + legendTextSizeHalf + stylesLegend.paddingTop;
				var itemLeft = graph_left + stylesLegend.paddingLeft;
				var itemRight  = graph_left + stylesSubLayout._graphwidthpx - stylesLegend.paddingRight;
				var items = _this['makeLegend'+key](_chart, itemLeft, itemRight, legendY, legendTextSizeHalf, _legendStyles);

				group[key] = items;

				_this.legend.series[key] = items.legend;
				_this.legend.items[key] = items.items;
			}
			return group;
		};
		/**
		 * 보조지표 범례 설정값 변경시 호출
		 * @param  {Chart} _chart        차트 객체
		 * @param  {Object} _serieses     보조지표로 생성된 시리즈 
		 * @param  {Object} _styles       차트 확장된 스타일
		 * @param  {Object} _legendStyles 차트 기본 설정된 스타일
		 * @return -
		 */
		this.changeLegend = function(_chart, _serieses, _styles, _legendStyles){
			for(var i = 0, len = _serieses.length; i < len; i++){
				var key = _serieses[i];

				_this['changeLegend'+key]();
			}
		};
		/**
		 * 보조지표 범례 삭제
		 * @param  {String} _value 삭제되는 보조지표명
		 * @return -
		 */
		this.removeLegend = function(_value){
			var l = _this.legend.items[_value];
			for(var i in l){
				l[i].remove();
			}
			$(_this.legend.series).removeProp(_value);
			$(_this.legend.items).removeProp(_value);
		};
		/**
		 * 슬라이더가 움직이면 범례를 무조건 최상단으로 올림.
		 * @return -
		 */
		this.toFrontLegend = function() {
			$.each(_this.legend.items, function(key, value) {

				$.each(value, function(key2, value2) {
					value2.toFront();
				});
			});
		};
		/************************ 거래량 S ************************/
		/**
		 * 거래량 데이터 파싱
		 * @return -
		 */
		this.parseVolumeData = function(){ };
		/**
		 * 거래량 범례 설정값 저장
		 * @param  {Object} _styles 거래량 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendVolume (_styles){
			return {
				title : '거래량',
				color1: _styles.series1.area.normal.color,
				info: ['거래량'],
				toFixed: 0
			}
		};
		/**
		 * 거래량 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendvolume = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().volume['DATA-series1'].data;
			var item = null, group = {};
			var legend = initLegendVolume(_styles.volume);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, getFillStyle(legendStyles.rectSize, legend.color1, 'horizontal', 'none'));
			group.rect1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='volume']", _selector).trigger("click");
			});

			item = makeText(chart, item.left, y, legend.title + ": "+getYAxisValue(data[data.length - 1].yaxis, legend.toFixed), legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * 거래량 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendvolume = function () { };
		/************************ 거래량 E ************************/
		/************************ MACD S ************************/
		this.macd_param1 = stockInitParams.macd[0];
		this.macd_param2 = stockInitParams.macd[1];
		this.macd_param3 = stockInitParams.macd[2];
		var dPrevShortEMA = 0, dPrevLongEMA = 0; // 단기, 장기 EMA
		/**
		 * MACD 데이터 파싱
		 * 
		 * macd_param1 : 단기이평
		 * macd_param2 : 장기이평
		 * macd_param3 : Signal
		 * 
		 * dPrevShortEMA : 단기 EMA
		 * dPrevLongEMA : 장기 EMA
		 * 
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	MACD이 포함된 데이터
		 */
		this.parseMacdData = function( _originalData, _series, _candleSeries){
			var xAxisName = _candleSeries.xaxis, count = _originalData.length;
			var yAxisName = _candleSeries.close;

			var MACD_DATAS = [];
			for(var i = 0; i < count; i++) {
				var data = _originalData[i];

				if(data[xAxisName] != ' ') {
					if(i == 0) {
						MACD_DATAS.push({
							dShort: Number(data[yAxisName]),
							dLong: Number(data[yAxisName]),
							dMacd: 0
						});
					} else {
						var dShort = subCalcEma(Number(data[yAxisName]), MACD_DATAS[i - 1].dShort, _this.macd_param1);
						var dLong  = subCalcEma(Number(data[yAxisName]), MACD_DATAS[i - 1].dLong, _this.macd_param2);
						var dMacd = dShort - dLong;

						var datas = {
							dShort: dShort,
							dLong: dLong,
							dMacd: dMacd
						};

						if(i >= _this.macd_param2 - 1) {
							data.MACD = dMacd;
							if(i == _this.macd_param2 - 1) {
								datas.MACD_SIGNAL = dMacd;
							} else {
								datas.MACD_SIGNAL = subCalcEma(dMacd, MACD_DATAS[i - 1].MACD_SIGNAL, _this.macd_param3);

								if(i >= (_this.macd_param2 - 1) + (_this.macd_param3 - 1)) {

									data.MACD_SIGNAL = datas.MACD_SIGNAL;
									data.MACD_OSC = dMacd - datas.MACD_SIGNAL;
								}
							}
						}

						MACD_DATAS.push(datas);
					}
				}
			}

			_series.series1.yaxis = "MACD_OSC";
			_series.series2.yaxis = "MACD";
			_series.series3.yaxis = "MACD_SIGNAL";

			return _originalData;
		};
		/**
		 * 이평값(EMA) 구하기
		 * @param  {Number} dClose   현재종가
		 * @param  {Number} dPrevEMA 이전일 EMA
		 * @param  {Number} nDate    n일 이평 디폴트
		 * @return {Number}           이평값
		 */
		function subCalcEma (dClose, dPrevEMA, nDate) {
			var EP = 2 / (nDate + 1);
			return (dClose * EP) + dPrevEMA * (1 - EP);
		};
		/**
		 * MACD 범례 설정값 저장
		 * @param  {Object} _styles MACD 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendMACD (_styles){
			return {
				title : 'MACD',
				color1: _styles.series1,
				color2: _styles.series2.line.normal.color,
				color3: _styles.series3.line.normal.color,
				info: ['MACD', 'Sign', 'Osc'],
				toFixed: 2
			}
		};
		/**
		 * MACD 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendmacd = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().macd;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var s3 = data['DATA-series3'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendMACD(_styles.macd);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color3);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeDoubleRect(chart, item.left, y - half, legendStyles.rectSize, {color1: getFillStyle(1, legend.color1.area.up.color, 'horizontal', 'none'), color2: getFillStyle(1, legend.color1.area.down.color, 'horizontal', 'none')});
			group.rect3 = item.item;

			item = makeText(chart, item.left, y, legend.info[2], legendStyles.text);
			group.text3 = item.item;

			item = makeText(chart, item.left, y, '('+_this.macd_param1+','+_this.macd_param2+','+_this.macd_param3+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='macd']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed) + ' ' + legend.info[2] + ": "+getYAxisValue(s3[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * MACD 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendmacd = function () {
			var itemsOver = _this.legend.items.macd;
			itemsOver.param1.attr({'text': '('+_this.macd_param1+','+_this.macd_param2+','+_this.macd_param3+')'});
			return _this.legend;
		};
		/************************ MACD E ************************/
		/************************ Slow STC S ************************/
		this.slowstc_param1 = stockInitParams.slowstc[0];
		this.slowstc_param2 = stockInitParams.slowstc[1];
		this.slowstc_param3 = stockInitParams.slowstc[2];
		/**
		 * Slow STC 데이터 파싱
		 * slowstc_param1 : 기간
		 * slowstc_param2 : Slow%K
		 * slowstc_param3 : Slow%D
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	Slow STC이 포함된 데이터
		 */
		this.parseSlowStcData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;
			var count = _originalData.length;

			var SLOWSTC_DATAS = [];

			// 고가, 저가, 종가, 최고가, 최저가,
			var dHigh = 0, dLow = 0, dClose = 0, dMax = 0, dMin = 99999999999999, dK = 0;
			for(var i = 0; i < count; i++) {

				dHigh = 0, dLow = 0, dClose = 0, dMax = 0, dMin = 99999999999999, dK = 0;

				var data = _originalData[i];

				if(i >= _this.slowstc_param1 - 1 && data[xaxis] != ' '){

					dClose = Number(data[close]); // 당일종가
					for(var j = i; j > i - _this.slowstc_param1; j--){
						dLow = Number((_originalData[j])[low]);
						dHigh = Number((_originalData[j])[high]);

						if(dMin > dLow) dMin = dLow;
						if(dMax < dHigh) dMax = dHigh;
					}
					//K
					if(dMax - dMin == 0){
						dK = 0;
					} else {
						dK = (dClose - dMin) / (dMax - dMin) * 100;
					}

					var dKPrevEMA = 0;
					if(i == _this.slowstc_param1 - 1) {
						dKPrevEMA = dK;
					} else {
						dKPrevEMA = _originalData[i - 1].SlowSTC_PERK;
					}

					// %K
					var dPerK = subCalcEma(dK, dKPrevEMA, _this.slowstc_param2);
					var dDPrevEMA = 0;
					if(i == _this.slowstc_param1 - 1) {
						dDPrevEMA = dPerK;
					} else {
						dDPrevEMA = _originalData[i - 1].SlowSTC_PERD;
					}
					// %D
					var dPerD = subCalcEma(dPerK, dDPrevEMA, _this.slowstc_param3);
					if(isNaN(dPerK)) {
						dPerK = 0;
					}
					if(isNaN(dPerD)) {
						dPerD = 0;
					}
					data.SlowSTC_ROC = dK, data.SlowSTC_PERK = dPerK, data.SlowSTC_PERD = dPerD;
				} else {
					data.SlowSTC_ROC = null, data.SlowSTC_PERK = null, data.SlowSTC_PERD = null;
				}
			}
			_series.series1.yaxis = "SlowSTC_PERK";
			_series.series2.yaxis = "SlowSTC_PERD";

			return _originalData;
		};
		/**
		 * Slow STC 범례 설정값 저장
		 * @param  {Object} _styles Slow STC 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendSlowSTC(_styles){
			return {
				title : 'Slow STC',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				info: ['Slow %K', 'Slow %D'],
				toFixed: 2
			}
		};
		/**
		 * Slow STC 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendslowstc = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().slowstc;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendSlowSTC(_styles.slowstc);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeText(chart, item.left, y, '('+_this.slowstc_param1+','+_this.slowstc_param2+','+_this.slowstc_param3+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='slowstc']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * Slow STC 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendslowstc = function () {
			var itemsOver = _this.legend.items.slowstc;
			itemsOver.param1.attr({'text': '('+_this.slowstc_param1+','+_this.slowstc_param2+','+_this.slowstc_param3+')'});
			return _this.legend;
		};
		/************************ Slow STC E ************************/
		/************************ Fast STC S ************************/
		this.faststc_param1 = stockInitParams.faststc[0];
		this.faststc_param2 = stockInitParams.faststc[1];
		/**
		 * Fast STC 데이터 파싱
		 * faststc_param1 : Fast%K
		 * faststc_param2 : Fast%D
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	Fast STC이 포함된 데이터
		 */
		this.parseFastStcData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;
			var count = _originalData.length;
			// 고가, 저가, 종가, 최고가, 최저가,
			var dHigh = 0, dLow = 0, dClose = 0, dMax = 0, dMin = 99999999999999, dPerK = 0;
			for(var i = 0; i < count; i++) {
				dHigh = 0, dLow = 0, dClose = 0, dMax = 0, dMin = 99999999999999, dPerK = 0;
				var data = _originalData[i];
				if(i >= _this.faststc_param1 - 1 && data[xaxis] != ' '){
					dClose = Number(data[close]); // 당일종가

					for(var j = i; j > i - _this.faststc_param1; j--){
						dLow = Number((_originalData[j])[low]), dHigh = Number((_originalData[j])[high]);

						if(dMin > dLow) dMin = dLow;
						if(dMax < dHigh) dMax = dHigh;
					}
					//K
					if(dMax - dMin == 0){ dPerK = 0; }
					else { dPerK = (dClose - dMin) / (dMax - dMin) * 100; }

					var dDPrevEMA = 0;
					if(i == _this.faststc_param1 - 1) dDPrevEMA = dPerK;
					else dDPrevEMA = _originalData[i - 1].FastSTC_PERD;
					// %D
					var dPerD = subCalcEma(dPerK, dDPrevEMA, _this.faststc_param2);
					data.FastSTC_PERK = dPerK, data.FastSTC_PERD = dPerD;
				} else {
					data.FastSTC_PERK = null, data.FastSTC_PERD = null;
				}
			}

			_series.series1.yaxis = "FastSTC_PERK";
			_series.series2.yaxis = "FastSTC_PERD";

			return _originalData;
		};
		/**
		 * Fast STC 범례 설정값 저장
		 * @param  {Object} _styles Fast STC 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendFastSTC (_styles){
			return {
				title : 'Fast STC',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				info: ['Fast %K', 'Fast %D'],
				toFixed: 2
			}
		};
		/**
		 * Fast STC 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendfaststc = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().faststc;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendFastSTC(_styles.faststc);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeText(chart, item.left, y, '('+_this.faststc_param1+','+_this.faststc_param2+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='faststc']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * Fast STC 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendfaststc = function () {
			var itemsOver = _this.legend.items.faststc;
			itemsOver.param1.attr({'text': '('+_this.faststc_param1+','+_this.faststc_param2+')'});
			return _this.legend;
		};
		/************************ Fast STC E ************************/
		/************************ RSI S ************************/
		this.rsi_param1 = stockInitParams.rsi[0];
		this.rsi_param2 = stockInitParams.rsi[1];
		/**
		 * RSI 데이터 파싱
		 * rsi_param1 : 기간
		 * rsi_param2 : Signal
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	RSI이 포함된 데이터
		 */
		this.parseRsiData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;
			var count = _originalData.length;
			// 상승폭 합계, 하락폭 합계
			var dUpSum = 0, dDownSum = 0;

			for(var i = 0; i < count; i++) {
				var data = _originalData[i];

				if(i >= _this.rsi_param1 && data[xaxis] != ' '){

					var dGainAvg, dLossAvg;
					var dRS, dRSI;
					var dSignal = 0;

					if(i == _this.rsi_param1) {

						for(var k = 1; k <= _this.rsi_param1; k++) {

							var dPrevClose = Number(_originalData[k - 1][close]); // 전일종가
							var dClose = Number(_originalData[k][close]); // 당일종가

							if(dPrevClose <= dClose)	// 상승폭
								dUpSum += dClose - dPrevClose;
							else 						// 하락폭
								dDownSum += dPrevClose - dClose;
						}
						dGainAvg = dUpSum / _this.rsi_param1;
						dLossAvg = dDownSum / _this.rsi_param1;

						dRS = dGainAvg / dLossAvg;
						dRSI = (dLossAvg == 0) ? 100 : 100 - (100 / (1 + dRS));
						dSignal = dRSI / _this.rsi_param2;
					} else {

						var change = Number(_originalData[i][close]) - Number(_originalData[i - 1][close]);
						var gain = change > 0 ? change : 0;
						var loss = change < 0 ? change * -1 : 0;
						dGainAvg = (_originalData[i - 1].rsi_gain * (_this.rsi_param1 - 1) + gain) / _this.rsi_param1;
						dLossAvg = (_originalData[i - 1].rsi_loss * (_this.rsi_param1 - 1) + loss) / _this.rsi_param1;

						dRS = dGainAvg / dLossAvg;
						dRSI = (dLossAvg == 0) ? 100 : 100 - (100 / (1 + dRS));

						if(i >= _this.rsi_param1 + _this.rsi_param2 - 1) {
							var rsiHap = 0;
							for(var j = 0; j < _this.rsi_param2; j++){
								if(j == 0){
									rsiHap += dRSI;
								} else {
									rsiHap += _originalData[i - j].RSI;
								}
							}
							dSignal = rsiHap / _this.rsi_param2;
						}
					}


					data.rsi_gain = dGainAvg;
					data.rsi_loss = dLossAvg;
					data.rsi_rs = dRS;
					data.RSI = dRSI;

					if(i >= _this.rsi_param1 + _this.rsi_param2 - 1) {
						data.RSI_SIGNAL = dSignal;
					}



				} else {
					data.RSI = null, data.RSI_SIGNAL = null;
				}

			}

			_series.series1.yaxis = "RSI";
			_series.series2.yaxis = "RSI_SIGNAL";

			return _originalData;
		};
		/**
		 * RSI 범례 설정값 저장
		 * @param  {Object} _styles RSI 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendRSI (_styles){
			return {
				title : 'RSI',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				info: ['RSI', 'RSI-Signal'],
				toFixed: 2
			}
		};
		/**
		 * RSI 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendrsi = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().rsi;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendRSI(_styles.rsi);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeText(chart, item.left, y, '('+_this.rsi_param1+','+_this.rsi_param2+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='rsi']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * RSI 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendrsi = function () {
			var itemsOver = _this.legend.items.rsi;
			itemsOver.param1.attr({'text': '('+_this.rsi_param1+','+_this.rsi_param2+')'});
			return _this.legend;
		};
		/************************ RSI E ************************/
		/************************ DMI S ************************/
		this.dmi_param1 = stockInitParams.dmi[0];
		var subDMI_nShortSMA1 = null, subDMI_nShortSMA2 = null, subDMI_nShortSMA3 = null;
		/**
		 * DMI 데이터 파싱
		 * dmi_param1 : 기간
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	DMI이 포함된 데이터
		 */
		this.parseDmiData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;
			var count = _originalData.length;

			var DMI_DATAS = [];
			for(var i = 0; i < count; i ++){
				var data = _originalData[i];
				if(data[xaxis] != ' ') {

					// 전일고가, 당일고가, 전일저가 , 당일저가, 전일종가, PDM, MDM,, TR
					var dPrevHigh, dHigh, dPrevLow, dLow, dPrevClose, dPDM, dMDM, dTR;
					if(i == 0) {

						dHigh = Number(data[high]);
						dLow = Number(data[low]);

						dPDM = 0;
						dMDM = 0;
						dTR = Math.max(dHigh - dLow, Math.abs(Number(data[close] - dHigh)), Math.abs(Number(data[close]) - dLow));

						DMI_DATAS.push({
							pdmn: 0, mdmn: 0, trn: dTR
						});
					} else {
						dHigh = Number(data[high]);
						dPrevHigh = Number((_originalData[i - 1])[high]);
						dLow = Number(data[low]);
						dPrevLow = Number((_originalData[i - 1])[low]);
						dPrevClose = Number((_originalData[i - 1])[close]);

						// PDM 계산
						if( dHigh-dPrevHigh>0 && dHigh-dPrevHigh > dPrevLow-dLow)
							dPDM = dHigh - dPrevHigh;
						else
							dPDM = 0;

						// MDM 계산
						if( dLow-dPrevLow<0 && dHigh-dPrevHigh < dPrevLow - dLow)
							dMDM = dPrevLow - dLow;
						else
							dMDM = 0;

						// TR 계산
						dTR = Math.max(dHigh-dLow, Math.abs(dPrevClose - dHigh), Math.abs(dPrevClose - dLow));


						var dPrevPDMn = DMI_DATAS[i - 1].pdmn;
						var dPrevMDMn = DMI_DATAS[i - 1].mdmn;

						if(i == 1){
							dPrevPDMn = dPDM;
							dPrevMDMn = dMDM;
						}

						// PDMn 계산
						var dPDMn = subCalcEma(dPDM, dPrevPDMn, _this.dmi_param1);

						// MDMn 계산
						var dMDMn = subCalcEma(dMDM, dPrevMDMn, _this.dmi_param1);

						// TRn 계산
						var dTRn = subCalcEma(dTR, DMI_DATAS[i - 1].trn, _this.dmi_param1);

						var dPDI = dPDMn / dTRn * 100;
						var dMDI = dMDMn / dTRn * 100;

						DMI_DATAS.push({
							pdmn: dPDMn,
							mdmn: dMDMn,
							trn: dTRn
						});

						if(i >= _this.dmi_param1) {
							data.DMI_PDI = dPDI;
							data.DMI_MDI = dMDI;
						}
					}
				}
			}

			_series.series1.yaxis = "DMI_PDI";
			_series.series2.yaxis = "DMI_MDI";

			return _originalData;
		};
		/**
		 * DMI 이평값(EMA) 구하기
		 * @param  {Number} index    현재 데이터 위치
		 * @param  {Number} dm       dm 값
		 * @param  {Number} paramDay 디폴트값 dmi_param1
		 * @param  {Number} gubun    1 : PDMn, 2 : MDMn, 3: TRn
		 * @return {Number}           이평값
		 */
		function subCalcEmaDMI (index, dm, paramDay, gubun){
			if(index == 0) {
				subDMI_nShortSMA1 = new Array(paramDay);
				subDMI_nShortSMA2 = new Array(paramDay);
				subDMI_nShortSMA3 = new Array(paramDay);
			}

			var dShortSMA = 0;
			if(gubun == 1) subDMI_nShortSMA1[index % paramDay] = dm;
			else if(gubun == 2) subDMI_nShortSMA2[index % paramDay] = dm;
			else if(gubun == 3) subDMI_nShortSMA3[index % paramDay] = dm;

			if(index >= paramDay - 1) {
				for(var i = paramDay; i--;){
					if(gubun == 1) dShortSMA += subDMI_nShortSMA1[i];
					else if(gubun == 2) dShortSMA += subDMI_nShortSMA2[i];
					else if(gubun == 3) dShortSMA += subDMI_nShortSMA3[i];
				}
				dShortSMA = dShortSMA / paramDay;
				return dShortSMA;
			} else {
				return 0;
			}
		};
		/**
		 * DMI 범례 설정값 저장
		 * @param  {Object} _styles DMI 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendDMI (_styles){
			return {
				title : 'DMI',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				info: ['PDI', 'MDI'],
				toFixed: 2
			}
		};
		/**
		 * DMI 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegenddmi = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().dmi;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendDMI(_styles.dmi);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeText(chart, item.left, y, '('+_this.dmi_param1+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='dmi']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * DMI 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegenddmi = function () {
			var itemsOver = _this.legend.items.dmi;
			itemsOver.param1.attr({'text': '('+_this.dmi_param1+')'});
			return _this.legend;
		};
		/************************ DMI E ************************/
		/************************ ADX S ************************/
		this.adx_param1 = stockInitParams.adx[0];
		this.adx_param2 = stockInitParams.adx[1];
		this.adx_param3 = stockInitParams.adx[2];
		var subADX_nShortSMA1 = null, subADX_nShortSMA2 = null, subADX_nShortSMA3 = null,
			subADX_nShortSMA4 = null, subADX_nShortSMA5 = null;
		/**
		 * ADX 데이터 파싱
		 * adx_param1 : DMI기간
		 * adx_param2 : ADX기간
		 * adx_param3 : ADX이평
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	ADX이 포함된 데이터
		 */
		this.parseAdxData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close;
			var count = _originalData.length;

			subADX_nShortSMA = [];

			var DMI_DATAS = [];
			for(var i = 0; i < count; i ++){
				var data = _originalData[i];
				if(data[xaxis] != ' ') {

					// 전일고가, 당일고가, 전일저가 , 당일저가, 전일종가, PDM, MDM,, TR
					var dPrevHigh, dHigh, dPrevLow, dLow, dPrevClose, dPDM, dMDM, dTR;
					if(i == 0) {

						dHigh = Number(data[high]);
						dLow = Number(data[low]);

						dPDM = 0;
						dMDM = 0;
						dTR = Math.max(dHigh - dLow, Math.abs(Number(data[close] - dHigh)), Math.abs(Number(data[close]) - dLow));

						DMI_DATAS.push({
							pdmn: 0, mdmn: 0, trn: dTR
						});
					} else {
						dHigh 		= Number(data[high]);
						dPrevHigh 	= Number((_originalData[i - 1])[high]);
						dLow 		= Number(data[low]);
						dPrevLow 	= Number((_originalData[i - 1])[low]);
						dPrevClose 	= Number((_originalData[i - 1])[close]);

						// PDM 계산
						if( dHigh-dPrevHigh>0 && dHigh-dPrevHigh > dPrevLow-dLow)
							dPDM = dHigh - dPrevHigh;
						else
							dPDM = 0;

						// MDM 계산
						if( dLow-dPrevLow<0 && dHigh-dPrevHigh < dPrevLow - dLow)
							dMDM = dPrevLow - dLow;
						else
							dMDM = 0;

						// TR 계산
						dTR = Math.max(dHigh-dLow, Math.abs(dPrevClose - dHigh), Math.abs(dPrevClose - dLow));


						var dPrevPDMn = DMI_DATAS[i - 1].pdmn;
						var dPrevMDMn = DMI_DATAS[i - 1].mdmn;

						if(i == 1){
							dPrevPDMn = dPDM;
							dPrevMDMn = dMDM;
						}

						// PDMn 계산
						var dPDMn = subCalcEma(dPDM, dPrevPDMn, _this.adx_param1);

						// MDMn 계산
						var dMDMn = subCalcEma(dMDM, dPrevMDMn, _this.adx_param1);

						// TRn 계산
						var dTRn = subCalcEma(dTR, DMI_DATAS[i - 1].trn, _this.adx_param1);

						var dPDI = dPDMn / dTRn * 100;
						var dMDI = dMDMn / dTRn * 100;

						var datas = {
							pdmn: dPDMn,
							mdmn: dMDMn,
							trn: dTRn,
							pdi: dPDI,
							mdi: dMDI
						};

						if(i >= _this.adx_param1) {
							var dDX = (Math.abs(dPDI - dMDI) / (dPDI + dMDI)) * 100;
							if(isNaN(dDX)) dDX = 0;

							var dADX;
							if(i == _this.adx_param1){
								dADX = subCalcEma(dDX, dDX, _this.adx_param2);
							} else {
								dADX = subCalcEma(dDX, DMI_DATAS[i - 1].adxn, _this.adx_param2);
							}
							if(isNaN(dADX)) dADX = 0;

							datas.adxn = dADX;
						}

						if(i >= _this.adx_param1 + (_this.adx_param2 - 1)){

							datas.adx = dADX;
							data.ADX = dADX;

							var dADXn = parseSMA(subADX_nShortSMA, i, _this.adx_param3, dADX);

							if(i >= _this.adx_param1 + (_this.adx_param2 - 1) + (_this.adx_param3 - 1)) {
								data.ADX_MA = dADXn;
							}
						}

						DMI_DATAS.push(datas);
					}
				}
			}

			_series.series1.yaxis = "ADX";
			_series.series2.yaxis = "ADX_MA";

			return _originalData;
		};
		/**
		 * ADX 이평값(EMA) 구하기
		 * @param  {Number} index    현재 데이터 위치
		 * @param  {Number} dm       dm 값
		 * @param  {Number} paramDay 디폴트값 adx_param1
		 * @param  {Number} gubun    1 : PDMn, 2 : MDMn, 3: TRn, 4 : ADX, 5 : ADXn
		 * @return {Number}           이평값
		 */
		function subCalcEmaADX(index, dm, paramDay, gubun){
			if(index == 0) {
				subADX_nShortSMA1 = new Array(paramDay);
				subADX_nShortSMA2 = new Array(paramDay);
				subADX_nShortSMA3 = new Array(paramDay);
				subADX_nShortSMA4 = new Array(paramDay);
				subADX_nShortSMA5 = new Array(paramDay);
			}

			var dShortSMA = 0;
			if(gubun == 1) subADX_nShortSMA1[index % paramDay] = dm;
			else if(gubun == 2) subADX_nShortSMA2[index % paramDay] = dm;
			else if(gubun == 3) subADX_nShortSMA3[index % paramDay] = dm;
			else if(gubun == 4) subADX_nShortSMA4[index % paramDay] = dm;
			else if(gubun == 5) subADX_nShortSMA5[index % paramDay] = dm;

			if(index >= paramDay - 1) {
				for(var i = paramDay; i--;){
					if(gubun == 1 && subADX_nShortSMA1[i] != undefined) {
						dShortSMA += Number(subADX_nShortSMA1[i]);
					}
					else if(gubun == 2 && subADX_nShortSMA2[i] != undefined) dShortSMA += Number(subADX_nShortSMA2[i]);
					else if(gubun == 3 && subADX_nShortSMA3[i] != undefined) dShortSMA += Number(subADX_nShortSMA3[i]);
					else if(gubun == 4 && subADX_nShortSMA4[i] != undefined) dShortSMA += Number(subADX_nShortSMA4[i]);
					else if(gubun == 5 && subADX_nShortSMA5[i] != undefined) dShortSMA += Number(subADX_nShortSMA5[i]);
				}
				
				dShortSMA = dShortSMA / paramDay;
				return dShortSMA;
			} else { return 0; }
		};
		/**
		 * ADX 범례 설정값 저장
		 * @param  {Object} _styles ADX 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendADX (_styles){
			return {
				title : 'ADX',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				info: ['ADX', 'MA'],
				toFixed: 2
			}
		};
		/**
		 * ADX 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendadx = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().adx;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendADX(_styles.adx);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeText(chart, item.left, y, '('+_this.adx_param1+','+_this.adx_param2+','+_this.adx_param3+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='adx']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * ADX 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendadx = function () {
			var itemsOver = _this.legend.items.adx;
			itemsOver.param1.attr({'text': '('+_this.adx_param1+','+_this.adx_param2+','+_this.adx_param3+')'});
			return _this.legend;
		};
		/************************ ADX E ************************/
		/************************ OBV S ************************/
		/**
		 * OBV 데이터 파싱
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	OBV이 포함된 데이터
		 */
		this.parseOBVData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;

			var count = _originalData.length;
			// OBV, 전일종가, 당일종가, 당일 거래량, 전일OBV
			var dOBV = 0, dPrevClose = 0, dClose = 0, dVolume = 0, dPrevOBV = 0;
			var data = null, prevData = null;
			for(var i = 0; i < count; i++) {
				data = _originalData[i];

				if(i == 0) { dOBV = 0; }
				else {
					prevData = _originalData[i - 1];
					dPrevClose = Number(prevData[close]);
					dClose = Number(data[close]);
					dVolume = parseFloat(data[volume]);
					dPrevOBV = prevData.OBV;

					if (dClose > dPrevClose) dOBV = dPrevOBV + dVolume;	// 당일 종가 > 전일 종가
					else if (dClose < dPrevClose) dOBV = dPrevOBV - dVolume; // 당일 종가 < 전일 종가
					else if (dClose == dPrevClose) dOBV = dPrevOBV;	// 당일 종가 = 전일 종가
				}
				if(data[xaxis] != ' ') { data.OBV = dOBV; }
				else data.OBV = null;
			}
			_series.series1.yaxis = "OBV";

			return _originalData;
		};
		/**
		 * OBV 범례 설정값 저장
		 * @param  {Object} _styles OBV 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendOBV (_styles){
			return {
				title : 'OBV',
				color1: _styles.series1.line.normal.color,
				info: ['OBV'],
				toFixed: 2
			}
		};
		/**
		 * OBV 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendobv = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().obv;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendOBV(_styles.obv);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='obv']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * OBV 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return -
		 */
		this.changeLegendobv = function () { };
		/************************ OBV E ************************/
		/************************ SONAR S ************************/
		this.sonar_param1 = stockInitParams.sonar[0];
		this.sonar_param2 = stockInitParams.sonar[1];
		this.sonar_param3 = stockInitParams.sonar[2];
		/**
		 * SONAR 데이터 파싱
		 * sonar_param1 : EMA기간
		 * sonar_param2 : 기간
		 * sonar_param3 : 이평
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	SONAR이 포함된 데이터
		 */
		this.parseSonarData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;
			// 상승폭 합계, 하락폭 합계
			var nEMA = null;
			for(var i = 0; i < count; i++) {
				var data = _originalData[i];
				if(i == 0)	nEMA = new Array(count - _this.sonar_param2); // n일전 EMA 값 저장
				// 전일EMA, 당일종가
				var dPrevEMA = 0, dClose = Number(data[close]);
				if(i == 0) dPrevEMA = dClose;
				else dPrevEMA = nEMA[(i - 1) % _this.sonar_param2];

				// 당일EMA
				var dEMA = subCalcEma(dClose, dPrevEMA, _this.sonar_param1);

				if(i >= _this.sonar_param2 && data[xaxis] != ' '){
					// SONAR 계산
					var dSONAR = dEMA - nEMA[i % _this.sonar_param2], dPrevSONAR = 0;
					if(i == _this.sonar_param2) dPrevSONAR = dSONAR;
					else dPrevSONAR = _originalData[i - 1].SONAR_SIGNAL;
					// Signal 계산
					var dSignal = subCalcEma(dSONAR, dPrevSONAR, _this.sonar_param3);
					data.SONAR = dSONAR, data.SONAR_SIGNAL = dSignal;

					nEMA[i % _this.sonar_param2] = dEMA;
				} else { nEMA[i % _this.sonar_param2] = dEMA; }
			}
			_series.series1.yaxis = "SONAR";
			_series.series2.yaxis = "SONAR_SIGNAL";

			return _originalData;
		};
		/**
		 * SONAR 범례 설정값 저장
		 * @param  {Object} _styles SONAR 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendSONAR (_styles){
			return {
				title : 'SONAR',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				info: ['SONAR', 'MA'],
				toFixed: 2
			}
		};
		/**
		 * SONAR 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendsonar = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().sonar;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendSONAR(_styles.sonar);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeText(chart, item.left, y, '('+_this.sonar_param1+','+_this.sonar_param2+','+_this.sonar_param3+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='sonar']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * SONAR 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendsonar = function () {
			var itemsOver = _this.legend.items.sonar;
			itemsOver.param1.attr({'text': '('+_this.sonar_param1+','+_this.sonar_param2+','+_this.sonar_param3+')'});
			return _this.legend;
		};
		/************************ SONAR E ************************/
		/************************ CCI S ************************/
		this.cci_param1 = stockInitParams.cci[0];
		/**
		 * CCI 데이터 파싱
		 * cci_param1 : 기간
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	CCI이 포함된 데이터
		 */
		this.parseCciData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;

			var m_pdSMA = null, m_pdYSMA = null;
			for(var i = 0; i < count; i++) {
				var data = _originalData[i];
				if(data[xaxis] != ' ') {

					if(i == 0){
						m_pdSMA = new Array(_this.cci_param1);
					}

					var dHigh = Number(data[high]);
					var dLow = Number(data[low]);
					var dClose = Number(data[close]);

					var dX = (dHigh + dLow + dClose) / 3;
					m_pdSMA[i % _this.cci_param1] = dX;

					var dY;
					if(i >= _this.cci_param1 - 1){
						var dSumY = 0;
						for(var j = 0; j< _this.cci_param1; j++) {
							dSumY += m_pdSMA[j];
						}
						dY = dSumY / _this.cci_param1; // 평균이동가격

						var d = 0;
						for(j = 0; j < _this.cci_param1; j++) {
							d = d + Math.abs(dY - m_pdSMA[j]);
						}
						d = d / _this.cci_param1;

						var cci = (dX - dY) / (0.015 * d);
						if(isNaN(cci)) {
							cci = 0;
						}

						data.CCI = cci;
					}
				}
			}

			_series.series1.yaxis = "CCI";

			return _originalData;
		};
		/**
		 * CCI 범례 설정값 저장
		 * @param  {Object} _styles CCI 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendCCI (_styles){
			return {
				title : 'CCI',
				color1: _styles.series1.line.normal.color,
				info: ['CCI'],
				toFixed: 2
			}
		};
		/**
		 * CCI 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendcci = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().cci;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendCCI(_styles.cci);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '('+_this.cci_param1+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='cci']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * CCI 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendcci = function () {
			var itemsOver = _this.legend.items.cci;
			itemsOver.param1.attr({'text': '('+_this.cci_param1+')'});
			return _this.legend;
		};
		/************************ CCI E ************************/
		/************************ VR S ************************/
		this.vr_param1 = stockInitParams.vr[0];
		/**
		 * VR 데이터 파싱
		 * vr_param1 : 기간
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	VR이 포함된 데이터
		 */
		this.parseVrData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;
			// 상승폭 합계, 하락폭 합계
			for(var i = 0; i < count; i++) {
				var data = _originalData[i];
				if (i >= _this.vr_param1 - 1 && data.date != ' ')
				{
					var nUpVolume = 0; // 주가 상승일 거래량
					var nEqualVolume = 0; // 주가 보합일 거래량
					var nDownVolume = 0; // 주가 하락일 거래량

					for (var j = i; j >= i - (_this.vr_param1 - 1); j--)
					{
						var thisData = _originalData[j];
						//시가, 종가, 거래량
						var dOpen = Number(thisData[open]), dClose = Number(thisData[close]), dVolume = parseFloat(thisData[volume]);
						if (dOpen < dClose) nUpVolume += dVolume;	//상승
						if (dOpen == dClose) nEqualVolume += dVolume; // 보합
						if (dOpen > dClose) nDownVolume += dVolume;// 하락
					}

					var dVR = (( nUpVolume + nEqualVolume * 0.5) / (nDownVolume + nEqualVolume * 0.5)) * 100;

					if((nDownVolume + nEqualVolume * 0.5) == 0)
						dVR = 0;

					data.VR = dVR;
				}
			}
			_series.series1.yaxis = "VR";
			return _originalData;
		};
		/**
		 * VR 범례 설정값 저장
		 * @param  {Object} _styles VR 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendVR (_styles){
			return {
				title : 'VR',
				color1: _styles.series1.line.normal.color,
				info: ['VR'],
				toFixed: 2
			}
		};
		/**
		 * VR 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendvr = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().vr;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendVR(_styles.vr);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '('+_this.vr_param1+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='vr']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * VR 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendvr = function () {
			var itemsOver = _this.legend.items.vr;
			itemsOver.param1.attr({'text': '('+_this.vr_param1+')'});
			return _this.legend;
		};
		/************************ VR E ************************/
		/************************ TRIX S ************************/
		this.trix_param1 = stockInitParams.trix[0];
		this.trix_param2 = stockInitParams.trix[1];
		/**
		 * TRIX 데이터 파싱
		 * trix_param1 : 단기이평
		 * trix_param2 : Signal
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	TRIX이 포함된 데이터
		 */
		this.parseTrixData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;

			var TRIX_DATAS = [];
			for(var i = 0; i < count; i ++) {
				var d = _originalData[i];
				if (d[xaxis] == ' ') {

				} else {
					if(i == 0){

						TRIX_DATAS.push({
							TRIX_EMA1: Number(d[close]),
							TRIX_EMA2: Number(d[close]),
							TRIX_EMA3: Number(d[close]),
							TRIX: 0
						});
					} else {

						var TRIX_EMA1 = subCalcEmaTRIX(Number(d[close]), TRIX_DATAS[i - 1].TRIX_EMA1, _this.trix_param1);
						var TRIX_EMA2 = subCalcEmaTRIX(TRIX_EMA1, TRIX_DATAS[i - 1].TRIX_EMA2, _this.trix_param1);
						var TRIX_EMA3 = subCalcEmaTRIX(TRIX_EMA2, TRIX_DATAS[i - 1].TRIX_EMA3, _this.trix_param1);

						var trix = ((TRIX_EMA3 - TRIX_DATAS[i - 1].TRIX_EMA3) / TRIX_DATAS[i - 1].TRIX_EMA3) * 100;

						TRIX_DATAS.push({
							TRIX_EMA1: TRIX_EMA1,
							TRIX_EMA2: TRIX_EMA2,
							TRIX_EMA3: TRIX_EMA3,
							TRIX: trix
						});

						d.TRIX = trix;

						if(i >= _this.trix_param2) {
							var signal = 0;
							var trixHap = 0;
							for(var j = 0; j < _this.trix_param2; j++) {
								trixHap += TRIX_DATAS[i - j].TRIX;
							}
							signal = trixHap / _this.trix_param2;

							d.TRIX_SIGNAL = signal;
						}
					}
				}
			}

			_series.series1.yaxis = "TRIX";
			_series.series2.yaxis = "TRIX_SIGNAL";

			return _originalData;
		};
		/**
		 * 이평값 구하기(SMA)
		 * @param  {Array} _arr   n일 이전부터 오늘까지 종가 저장
		 * @param  {Number} _index 현재 데이터 위치
		 * @param  {Number} _param 디폴트값
		 * @param  {Array} _data  _index 일자의 종가
		 * @return {Number}        이평값
		 */
		function parseSMA (_arr, _index, _param, _data) {
			_arr[_index % _param] = _data;
			var dClose = 0;
			if(_index >= _param - 1){
				for(var i = _param; i--;){
					if(_arr[i] != undefined) dClose += _arr[i];
				}
				dClose = dClose / _param;
				return dClose;
			} else { return null; }
		};
		/**
		 * TRIX 이평값(EMA) 구하기
		 * @param  {Number} dClose   현재종가
		 * @param  {Number} dPrevEMA 이전일 EMA
		 * @param  {Number} nDate    n일 이평 디폴트
		 * @return {Number}           이평값
		 */
		var subCalcEmaTRIX = function(dClose, dPrevEMA, nDate) {
			var EP = 2 / (nDate + 1);
			return (dClose * EP) + dPrevEMA * (1 - EP);
		};
		/**
		 * TRIX 범례 설정값 저장
		 * @param  {Object} _styles TRIX 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendTRIX (_styles){
			return {
				title : 'TRIX',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				info: ['TRIX', 'Signal'],
				toFixed: 2
			}
		};
		/**
		 * TRIX 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendtrix = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().trix;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendTRIX(_styles.trix);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeText(chart, item.left, y, '('+_this.trix_param1+','+_this.trix_param2+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='trix']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * TRIX 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendtrix = function () {
			var itemsOver = _this.legend.items.trix;
			itemsOver.param1.attr({'text': '('+_this.trix_param1+','+_this.trix_param2+')'});
			return _this.legend;
		};
		/************************ TRIX E ************************/
		/************************ PMAO S ************************/
		this.pmao_param1 = stockInitParams.pmao[0];
		this.pmao_param2 = stockInitParams.pmao[1];
		/**
		 * PMAO 데이터 파싱
		 * pmao_param1 : 단기이평
		 * pmao_param2 : 장기이평
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	PMAO이 포함된 데이터
		 */
		this.parsePmaoData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;

			var nShortSMA = new Array(_this.pmao_param1), nLongSMA = new Array(_this.pmao_param2);;
			var dClose = 0, dShortSMA = 0, dLongSMA = 0;
			for(var i = 0; i < count; i++) {
				var data = _originalData[i];
				dClose = Number(data[close]), dShortSMA = 0, dLongSMA = 0;
				nShortSMA[i % _this.pmao_param1] = dClose;
				nLongSMA[i % _this.pmao_param2] = dClose;

				if(i >= _this.pmao_param2 - 1 && data[xaxis] != ' '){
					for(var j = _this.pmao_param1; j--;){//단기이평
						dShortSMA += nShortSMA[j];
					}
					dShortSMA = dShortSMA / _this.pmao_param1;
					for(j = _this.pmao_param2; j--;){//장기이평
						dLongSMA += nLongSMA[j];
					}
					dLongSMA = dLongSMA / _this.pmao_param2;

					var dPMAO = (dShortSMA - dLongSMA) / dShortSMA * 100;
					data.PMAO = dPMAO;
				} else {
					data.PMAO = null;
				}
			}
			_series.series1.yaxis = "PMAO";
			return _originalData;
		};
		/**
		 * PMAO 범례 설정값 저장
		 * @param  {Object} _styles PMAO 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendPMAO (_styles){
			return {
				title : 'Price OSC',
				color1: _styles.series1,
				info: ['TRIX', 'TRMA'],
				toFixed: 2
			}
		};
		/**
		 * PMAO 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendpmao = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().pmao;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendPMAO(_styles.pmao);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeDoubleRect(chart, item.left, y - half, legendStyles.rectSize, {color1: getFillStyle(1, legend.color1.area.up.color, 'horizontal', 'none'), color2: getFillStyle(1, legend.color1.area.down.color, 'horizontal', 'none')});
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '('+_this.pmao_param1+','+_this.pmao_param2+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='pmao']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * PMAO 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendpmao = function () {
			var itemsOver = _this.legend.items.pmao;
			itemsOver.param1.attr({'text': '('+_this.pmao_param1+','+_this.pmao_param2+')'});
			return _this.legend;
		};
		/************************ PMAO E ************************/
		/************************ Psyhological S ************************/
		this.psychology_param1 = stockInitParams.psychology[0];
		/**
		 * Psyhological 투자심리 데이터 파싱
		 * psychology_param1 : 기간
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	Psyhological이 포함된 데이터
		 */
		this.parsevPsychologyData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;
			var nUpDay = 0, dPrevClose = 0, dClose = 0, dTuja = 0;
			for(var i = 0; i < count; i++) {
				var data = _originalData[i];
				if(i >= _this.psychology_param1 && data[xaxis] != " "){
					nUpDay = 0; // 상승일수

					for(var j = i; j > i - _this.psychology_param1; j--){
						dPrevClose = Number((_originalData[j - 1])[close]); //전일종가
						dClose = Number((_originalData[j])[close]); //당일종가

						if(dPrevClose < dClose) nUpDay++; // 전일 대비 상승일때
					}
					dTuja = nUpDay / _this.psychology_param1 * 100;
					data.Psyhological = dTuja;
				} else {
					data.Psyhological = null;
				}
			}
			_series.series1.yaxis = "Psyhological";
			return _originalData;
		};
		/**
		 * Psyhological 범례 설정값 저장
		 * @param  {Object} _styles Psyhological 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		var initLegendPsychology = function(_styles){
			return {
				title : '투자심리선',
				color1: _styles.series1.line.normal.color,
				info: ['투자심리선'],
				toFixed: 2
			}
		};
		/**
		 * Psyhological 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendpsychology = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().psychology;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendPsychology(_styles.psychology);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '('+_this.psychology_param1+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='psychology']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * Psyhological 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendpsychology = function () {
			var itemsOver = _this.legend.items.psychology;
			itemsOver.param1.attr({'text': '('+_this.psychology_param1+')'});
			return _this.legend;
		};
		/************************ Psyhological E ************************/
		/************************ Williams S ************************/
		this.williams_param1 = stockInitParams.williams[0];
		this.williams_param2 = stockInitParams.williams[1];
		/**
		 * Williams 데이터 파싱
		 * williams_param1 : %R
		 * williams_param2 : %D
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	Williams이 포함된 데이터
		 */
		this.parseWilliamsData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;
			var dHigh = 0, dLow = 0, dClose = 0, dMax = 0, dR = 0, dMin = 99999999999;
			for(var i = 0; i < count; i++) {
				var data = _originalData[i];
				dHigh = 0, dLow = 0, dClose = 0, dMax = 0, dR = 0, dMin = 99999999999;
				if(i >= _this.williams_param1 - 1 && data.date != " "){
					dClose = Number(data[close]);
					for(var j = i; j > i - _this.williams_param1; j--){
						dLow = Number((_originalData[j])[low]), dHigh = Number((_originalData[j])[low]);
						if(dMin > dLow) dMin = dLow;
						if(dMax < dHigh) dMax = dHigh;
					}
					if( dMax - dMin == 0) dR = 0;
					else dR = (dMax - dClose) / (dMax - dMin) * 100;

					var dDPrevEMA = 0;
					if(i == _this.williams_param1 - 1) dDPrevEMA = dR;
					else dDPrevEMA = _originalData[i - 1].WILLIAMS_PERD;

					var dPerD = subCalcEma(dR, dDPrevEMA, _this.williams_param2);
					data.WILLIAMS_PERR = dR;
					data.WILLIAMS_PERD = dPerD;
				} else {
					data.WILLIAMS_PERR = null;
					data.WILLIAMS_PERD = null;
				}
			}
			_series.series1.yaxis = "WILLIAMS_PERR";
			_series.series2.yaxis = "WILLIAMS_PERD";
			return _originalData;
		};
		/**
		 * Williams 범례 설정값 저장
		 * @param  {Object} _styles Williams 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendWilliams (_styles){
			return {
				title : 'Williams\' %R',
				color1: _styles.series1.line.normal.color,
				color2: _styles.series2.line.normal.color,
				info: ['%R', '%D'],
				toFixed: 2
			}
		};
		/**
		 * Williams 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendwilliams = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().williams;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var s2 = data['DATA-series2'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendWilliams(_styles.trix);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, legend.info[0], legendStyles.text);
			group.text1 = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color2);
			group.rect2 = item.item;

			item = makeText(chart, item.left, y, legend.info[1], legendStyles.text);
			group.text2 = item.item;

			item = makeText(chart, item.left, y, '('+_this.williams_param1+','+_this.williams_param2+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='williams']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed) + ' ' + legend.info[1] + ": "+getYAxisValue(s2[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * Williams 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendwilliams = function () {
			var itemsOver = _this.legend.items.williams;
			itemsOver.param1.attr({'text': '('+_this.williams_param1+','+_this.williams_param2+')'});
			return _this.legend;
		};
		/************************ Williams E ************************/
		/************************ ROC S ************************/
		this.roc_param1 = stockInitParams.roc[0];
		/**
		 * ROC 데이터 파싱
		 * roc_param1 : 기간
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	ROC이 포함된 데이터
		 */
		this.parseRocData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;
			var dClose = 0, dNPrevClose = 0, dRoc = 0;
			for(var i = 0; i < count; i++) {
				var data = _originalData[i];
				if(i >= _this.roc_param1 && data[xaxis] != " "){
					dClose = Number(data[close]); //당일종가
					dNPrevClose = Number((_originalData[i - _this.roc_param1])[close]); // n일전 종가
					dRoc = (dClose - dNPrevClose) / dNPrevClose * 100;
					data.ROC = dRoc;
				} else {
					data.ROC = null;
				}
			}
			_series.series1.yaxis = "ROC";
			return _originalData;
		};
		/**
		 * ROC 범례 설정값 저장
		 * @param  {Object} _styles ROC 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendROC(_styles){
			return {
				title : 'ROC',
				color1: _styles.series1.line.normal.color,
				info: ['ROC'],
				toFixed: 2
			}
		};
		/**
		 * ROC 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendroc = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().roc;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendROC(_styles.roc);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '('+_this.roc_param1+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='roc']", _selector).trigger("click");
			});

			var text = legend.info[0] + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * ROC 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendroc = function () {
			var itemsOver = _this.legend.items.roc;
			itemsOver.param1.attr({'text': '('+_this.roc_param1+')'});
			return _this.legend;
		};
		/************************ ROC E ************************/
		/************************ Chaikins Ocillator S ************************/
		this.chaikins_param1 = stockInitParams.chaikins[0];
		this.chaikins_param2 = stockInitParams.chaikins[1];
		/**
		 * Chaikins Ocillator 데이터 파싱 :: 유안타증권용 보조지표
		 * chaikins_param1 : %R
		 * chaikins_param2 : %D
		 * @param  {Array} _originalData 	원본데이터
		 * @param  {Object} _series       	메인 시리즈
		 * @param  {Object} _candleSeries 	사용자 정의 시리즈
		 * @return {Array}               	Chaikins Ocillator이 포함된 데이터
		 */
		this.parseChaikinsData = function( _originalData, _series, _candleSeries ){
			var xaxis = _candleSeries.xaxis, open = _candleSeries.open, high = _candleSeries.high, low = _candleSeries.low, close = _candleSeries.close, volume = _candleSeries.volume;
			var count = _originalData.length;

			var dataArr  = [];

			var chaikins_nShortSMA01 = []; // N일
			var chaikins_nShortSMA02 = []; // N'일

			var dClose = 0, dLow = 0, dHigh = 0, dVolume = 0;

			for(var i = 0; i < count; i++) {
				var thisData = _originalData[i];

				if(thisData[xaxis] != ' ') {

					dClose = parseFloat((thisData)[close]),
					dLow = parseFloat((thisData)[low]),
					dHigh = parseFloat((thisData)[high]),
					dVolume = parseFloat((thisData)[volume]);

					var dC;
					if(dHigh == dLow) {
						if(i == 0 || dClose == parseFloat(_originalData[i - 1].close)) {
							dC = 1;
						} else {
							dC = -1;
						}
					} else {
						dC = ((dClose - dLow) - (dHigh - dClose)) / (dHigh - dLow);
					}

					var dA = dC * dVolume;

					if(isNaN(dA)) {
						dA = 0;
					}

					chaikins_nShortSMA01[i] = dA;
					chaikins_nShortSMA02[i] = dA;

					var datas = {
						nDay: dA,
						nPerDay: dA
					};

					if(i > 0){
						var dShortSMA = 0;
						for(var j = 0; j < chaikins_nShortSMA01.length; j ++) {
							dShortSMA += chaikins_nShortSMA01[j];
						}

						dShortSMA = subCalcEma(dShortSMA, dataArr[i - 1].nDay, _this.chaikins_param1);

						datas.nDay = dShortSMA;

						dShortSMA = 0;

						for(var j = 0; j < chaikins_nShortSMA02.length; j ++) {
							dShortSMA += chaikins_nShortSMA02[j];
						}
						dShortSMA = subCalcEma(dShortSMA, dataArr[i - 1].nPerDay, _this.chaikins_param2);

						datas.nPerDay = dShortSMA;

						if(i >= _this.chaikins_param2 - 1) {

							datas.chaikins = datas.nDay - datas.nPerDay;
							thisData.chaikins = datas.nDay - datas.nPerDay;
						}

					}
					dataArr.push(datas);
				}

			}

			_series.series1.yaxis = "chaikins";
			return _originalData;
		};
		/**
		 * Chaikins Ocillator 범례 설정값 저장
		 * @param  {Object} _styles Chaikins Ocillator 시리즈의 스타일
		 * @return {Object}         범례 설정값
		 */
		function initLegendChaikins(_styles){
			
			return {
				title : 'Chaikins Ocillator',
				color1: _styles.series1.line.normal.color,
				info: ["Chaikins"],
				toFixed: 2
			}
		};
		/**
		 * Chaikins Ocillator 범례 만들기
		 * @param  {Chart} chart   	차트 객체
		 * @param  {Number} x       범례 X 시작 위치
		 * @param  {Number} y       범례 Y 시작 위치
		 * @param  {Number} half    폰트 사이즈 절반 범례 사각형이 텍스트 middle에 위치하기 위함.
		 * @param  {Object} _styles 스타일
		 * @return {Object}         items: 	범례의 사각형과 텍스트 모음
		 *         					left: 	범례 모음중 마지막 아이템의 x위치
		 *         					legend: 범례 설정값 
		 */
		this.makeLegendchaikins = function(chart, x, rx, y, half, _styles){
			var data = chart.getData().chaikins;//['DATA-series1'].data;
			var s1 = data['DATA-series1'].data;
			var count = s1.length - 1;

			var item = null, group = {};
			var legend = initLegendChaikins(_styles.chaikins);

			var legendStyles = _styles.legend;
			item = makeText(chart, x, y, legend.title, legendStyles.text);
			group.title = item.item;

			item = makeRect(chart, item.left, y - half, legendStyles.rectSize, legend.color1);
			group.rect1 = item.item;

			item = makeText(chart, item.left, y, '('+_this.chaikins_param1+','+_this.chaikins_param2+')', legendStyles.text);
			group.param1 = item.item;

			item = makeButton(chart, rx, y, legendStyles.button);
			group.button = item.item;

			item.item.click(function(){
				$("input[value='chaikins']", _selector).trigger("click");
			});

			var text = 'Chaikins' + ": "+getYAxisValue(s1[count].yaxis, legend.toFixed);
			item = makeText(chart, item.left, y, text, legendStyles.text, undefined, 'end');
			group.info = item.item;

			return {items: group, left: item.left, legend: legend};
		};
		/**
		 * Chaikins Ocillator 설정값 변경시 범례 텍스트도 같이 변경하기
		 * @return {Object} 범례
		 */
		this.changeLegendChaikins = function () {
			var itemsOver = _this.legend.items.chaikins;
			itemsOver.param1.attr({'text': '('+_this.chaikins_param1+','+_this.chaikins_param2+')'});
			return _this.legend;
		};
		/************************ Chaikins Ocillator E ************************/
		/************************ 보조지표 추가하는 위치↓↓↓↓↓↓↓↓↓↓ ************************/







		/************************ 보조지표 추가하는 위치↑↑↑↑↑↑↑↑↑↑ ************************/
	};
	/**
	 * 종합차트 슬라이더 함수 모음 
	 * @param {Selector} _selector 차트 div
	 * @param {Number} _left       슬라이더 X 시작 위치
	 * @param {Number} _height     슬라이더 높이
	 * @param {String} _sliderHtml 슬라이더 HTML
	 */
	window.webponent.STOCKSLIDER = function(_selector, _left, _height, _sliderHtml){
		
		var _this = this;

		var selector = _selector;
		// 셀렉터 넓이
		var CHART_WIDTH = selector.width();
		// 슬라이더 영역 시작 위치
		var CONTAINER_LEFT = _left;
		// 슬라이더 영역 높이
		var CONTAINER_HEIGHT = _height;
		// 슬라이더 영역 넓이
		var CONTAINER_WIDTH = CHART_WIDTH - CONTAINER_LEFT;
		// 슬라이더 자체의 넓이
		var SLIDER_WIDTH = 0;
		// 화면에서 보여질 아이템 개수
		var itemCount = 0;
		var downPos = {};
		// 데이터 총 갯수에서 보여줄 첫 위치와 마지막 위치
		this.leftSliderIndecator = 0;
		this.rightSliderIndecator = 0;
		// 슬라이더에 마우스 다운 여부
		this.sliderDownChk = false;
		// 데이터 개수
		this.maximum = null;
		// 슬라이더 객체
		this.slider = null;

		this.plusButton = null, this.defaultButton = null, this.minusButton = null;
		/**
		 * 슬라이더 초기화
		 * @param  {Array} _data      차트데이터
		 * @param  {Number} _itemCount 화면에 보여지는 아이템 개수
		 * @return -
		 */
		this.init = function(_data, _itemCount){

			selector.append(_sliderHtml);

			_this.maximum = _data.length;
			
			itemCount = _itemCount;
			
			if(_this.maximum < itemCount) {
			
				itemCount = _this.maximum;
			}
			
			_this.leftSliderIndecator = _this.maximum - itemCount;
			_this.rightSliderIndecator = _this.maximum;

			var sliderContainer = $('.sliderContainer', selector);
			sliderContainer.css({
				'width': CHART_WIDTH+'px', 
				'height': CONTAINER_HEIGHT+'px'
			});
			var sliderButton = $('.sliderButton', selector);
			sliderButton.css({
				'height': CONTAINER_HEIGHT+'px'
			});
			SLIDER_WIDTH = CHART_WIDTH - CONTAINER_LEFT - sliderButton.width() - 10;

			var buttonWidth = SLIDER_WIDTH * (itemCount / _this.maximum);

			$('.sliderArea', selector).css({
				'left': CONTAINER_LEFT+'px', 
				'width': SLIDER_WIDTH+'px', 
				'height': CONTAINER_HEIGHT+'px'});

			_this.slider = $('.slider', selector);
			_this.slider.css({
				'top': (CONTAINER_HEIGHT/2) - (_this.slider.height()/2), 
				'left': (SLIDER_WIDTH - buttonWidth), 
				'width': buttonWidth+'px', 
				'cursor': 'pointer'
			}).on('selectstart', false);

			var leftIndecator = 0, rightIndecator = 0;
			var sliderEvent = false;
			if(('createTouch' in document) || ('ontouchstart' in document)){
				var svg = selector.children().get(0);
				svg.addEventListener('touchstart', function(event){
					// Mobile Chrome 브라우저에서 event 객체에 변경이 있어 대응 로직 변경--S
					if(event.layerX < 0 || event.layerX == undefined){ //Android
						downPos.x = event.touches[0].pageX || event.changedTouches[0].pageX;// + event.layerX;
					} else {
						downPos.x = event.layerX;
					}
					if(event.layerY < 0 || event.layerY == undefined){ //Android
						downPos.y = event.touches[0].pageY || event.changedTouches[0].pageY;
					} else {
						downPos.y = event.pageY;
					}
					// Mobile Chrome 브라우저에서 event 객체에 변경이 있어 대응 로직 변경--E
					downPos.leftSliderIndecator = _this.leftSliderIndecator;

					_this.sliderDownChk = true;
				})

				svg.addEventListener('touchend', function(event){
					_this.sliderDownChk = false;
				}, false);

				$('.slider', selector).bind('touchstart', function(event){
					downPos.x = $(event.target).position().left;//event.target.pageX;// || event.target.changedTouches[0].pageX;// + event.layerX;
					downPos.y = $(event.target).offset().top;//event.pageY;
					downPos.leftSliderIndecator = _this.leftSliderIndecator;
					_this.sliderDownChk = true;
				}).bind('touchend', function(event){
					_this.sliderDownChk = false;
				}).swipe({
					swipeStatus: function(event, phase, direction, distance , duration , fingerCount){
						var val = $('.stockchart-type', selector).find('radio:checked').val();
						if(val === 'three' || val === 'pnf') return;
						if(direction === 'up' || direction === 'down'){
							event.preventDefault();
							return;
						}

						if(_this.sliderDownChk){

							_this.touchMoveHandler(event, direction, distance, 'button');
						}
					}
				})
			} else {
				selector.find('.slider').on('mousedown', function(event){
					
					_this.sliderDownChk = true;
					if (typeof event.layerX !== 'undefined') { // Opera
						downPos.x = event.layerX, downPos.y = event.layerY;
				    } else if(typeof event.offsetX !== 'undefined') { // Firefox
				    	downPos.x = event.offsetX, downPos.y = event.offsetY;
				    } else {
				    	downPos.x = event.clientX - $(event.target).offset().left;
				    	downPos.y = event.clientY - $(event.target).offset().top;
					}
					downPos.left = Math.floor(parseInt(_this.slider.css('left')));//Math.floor(Number(_this.slider.css('left').split('px')[0]));
					downPos.width = SLIDER_WIDTH * (itemCount / _this.maximum);
					downPos.parentWidth = Number($(this).width());
				}).on('mousemove', function(event){

					if(_this.sliderDownChk){
						event.preventDefault();
						sliderEvent = true;
						mouseMoveHandler(event, downPos, "button", _this.maximum);

					}
				}).on('mouseup', function(event){
					_this.sliderDownChk = false;

				}).on('mouseout', function(event){
					sliderEvent = false;

				})
				selector.mousemove(function(event){
					if(_this.sliderDownChk && _this.slider.css('display') == 'block' && !sliderEvent){
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
		/**
		 * 슬라이더 터치무브 이벤트 핸들러
		 * @param  {Event} _event    터치 이벤트 객체
		 * @param  {String} direction 터치 이동 방향
		 * @param  {Number} distance  터치 감도
		 * @param  {String} _type     터치된 영역이 버튼인지 아닌지 
		 * @return -
		 */
		this.touchMoveHandler = function (_event, direction, distance, _type) {
			
			if(downPos.x >= 0 && downPos.x <= SLIDER_WIDTH){
				var downX = downPos.x, move = null;
				move = Math.round(distance / 3);//Math.floor(downX - distance);

				if(direction === 'right' && _type != 'button' || direction === 'left' && _type == 'button') move = move * -1;

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
		/**
		 * 슬라이더 마우스무브 이벤트 핸들러
		 * @param  {Event} _event   마우스 이벤트 객체
		 * @param  {Object} downPos  마우스가 눌린 좌표
		 * @param  {String} _type    마우스가 눌린 영역이 버튼인지 아닌지
		 * @param  {Number} _itemMax 데이터 총 개수
		 * @return -
		 */
		function mouseMoveHandler (_event, downPos, _type, _itemMax) {
			
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
					var eventTarget =  $(_event.target);
					if(eventTarget.attr('class') && eventTarget.attr('class').indexOf('slider-') > -1) {
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
		/**
		 * 슬라이더 버튼 셀렉터로 변경
		 * @return -
		 */
		function createButton(){
			_this.plusButton = $('.slider-plus', selector);
			_this.defaultButton = $('.slider-default', selector);
			_this.minusButton = $('.slider-minus', selector);
		};
		/**
		 * 슬라이더 업데이트 
		 * - 확대, 축소, 초기화 버튼 클릭시 호출
		 * @param  {String} state      자신이 호출된 부분 명칭
		 * @param  {Array} _data      차트 데이터
		 * @param  {Number} _itemCount 화면에 보여지는 데이터 개수
		 * @return -
		 */
		this.sliderUpdate = function(state, _data, _itemCount){
			
			itemCount = _itemCount;

			var buttonWidth = SLIDER_WIDTH * (_itemCount / _this.maximum); // 새로구해진 넓이
			
			var sWidth = _this.slider.width(), sLeft = parseInt(_this.slider.css('left'));//Number(_this.slider.css('left').split('px')[0]); // 기존 slider 넓이, x 축 위치
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
		/**
		 * 슬라이더 재 초기화 
		 * - 데이터가 재조회되면 호출
		 * @param  {Array} _data      	차트 데이터
		 * @param  {Number} _itemCount 	화면에 보여지는 데이터 개수
		 * @return -
		 */
		this.sliderReInit = function(_data, _itemCount) {
			_this.maximum = _data.length;
			_this.leftSliderIndecator = _this.maximum - _itemCount;
			_this.rightSliderIndecator = _this.maximum;
			var buttonWidth = SLIDER_WIDTH * (_itemCount / _this.maximum);

			_this.sliderUpdate('default', _data, _itemCount);
		};

		return _this;
	};

	/**
	 * 종합차트 좌측 아코디언 메뉴 HTML
	 * @type {String}
	 */
	var accordionHtml = ''
	+ '<div class="accordionArea">'
		+ '<div class="item">'
			+ '<div class="title"><h4><a href="#" id="interestStock"><span>차트형식</span></a></h4></div>'
			+ '<div class="content">'
				+ '<div class="list">'
					+ '<fieldset class="stockchart-type"><legend>차트형식</legend>'
						+ '<ul>'
							+ '<li><label><input type="radio" value="candle" checked="checked" /> 캔들</label></li>'
							+ '<li><label><input type="radio" value="hloc" /> 바</label></li>'
							+ '<li><label><input type="radio" value="line" /> 라인</label></li>'
							+ '<li><label><input type="radio" value="three" /> 삼선전환</label></li>'
							+ '<li><label><input type="radio" value="pnf" /> P&amp;F</label></li>'
						+'</ul>'
					+ '</fieldset>'
				+ '</div>'
			+ '</div>'
		+ '</div>'
		+ '<div class="item overlay">'
			+ '<div class="title"><h4><a href="#" id="overlay"><span>오버레이</span></a></h4></div>'
			+ '<div class="content">'
				+ '<div class="list">'
					+ '<div class="tab overlay"><input type="button" class="tab01 sel" value="선택"/><input type="button" class="tab02" value="설정"/></div>'
					+ '<div class="wrapper">'
						+ '<fieldset class="stockchart-overlay"><legend>오버레이</legend>'
							+ '<ul>'
								+ '<li><label><input type="checkbox" value="over1" title="이동평균" />이동평균</label></li>'
								+ '<li><label><input type="checkbox" value="over2" title="일목균형" />일목균형</label></li>'
								+ '<li><label><input type="checkbox" value="over3" title="Bollinger Band" />Bollinger Band</label></li>'
								+ '<li><label><input type="checkbox" value="over4" title="Parabollic SAR" />Parabollic SAR</label></li>'
								+ '<li><label><input type="checkbox" value="over5" title="Envelop" />Envelop</label></li>'
								+ '<li><label><input type="checkbox" value="over6" title="그물차트" />그물차트</label></li>'
								+ '<li><label><input type="checkbox" value="over7" title="매물분석도" />매물분석도</label></li>'
							+'</ul>'
						+ '</fieldset>'
						+ '<div class="stockchart-layer-overlay">'
							+ '<select name="stockchart-select-overlay"></select>'
							+ '<div><input type="button" value="기본값" class="stockchart-default" /></div>'
							+ '<div class="select-container-overlay"></div>'
						+ '</div>'
						+ '<div class="stockchart-options-overlay">'
							+ '<fieldset class="over1"><legend>이동평균</legend>'
								+ '<dl>'
									+ '<dt>MA1</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over1_param1" value="5" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>MA2</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over1_param2" value="20" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>MA3</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over1_param3" value="60" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="over2"><legend>일목균형</legend>'
								+ '<dl>'
									+ '<dt>전환선</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over2_param2" value="9" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>기준,후,선</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over2_param1" value="26" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>선행스팬</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over2_param3" value="52" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="over3"><legend>Bollinger Band</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over3_param1" value="20" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="over4"><legend>Parabollic SAR</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over4_param1" value="0.02" max="0.5" min="0.01" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="over5"><legend>Envelop</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over5_param1" value="20" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>가감값</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over5_param2" value="5" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="over6"><legend>그물차트</legend>'
								+ '<dl>'
									+ '<dt>시작이평</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over6_param1" value="5" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>증가</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over6_param2" value="2" max="30" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>갯수</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over6_param3" value="10" max="30" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="over7"><legend>매물분석도</legend>'
								+ '<dl>'
									+ '<dt>갯수</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="over7_param1" value="10" max="30" min="5" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
						+'</div>'
					+'</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>'
		+ '<div class="item assist">'
			+ '<div class="title"><h4><a href="#" id="assistindex"><span>보조지표</span></a></h4></div>'
			+ '<div class="content">'
				+ '<div class="list">'
					+ '<div class="tab assist"><input type="button" class="tab01 sel" value="선택"/><input type="button" class="tab02" value="설정"/></div>'
					+ '<div class="wrapper">'
						+ '<fieldset class="stockchart-assist"><legend>보조지표</legend>'
							+ '<ul>'
								+ '<li><label><input type="checkbox" value="volume" title="거래량" checked="checked" /> 거래량</label></li>'
								+ '<li><label><input type="checkbox" value="macd" title="MACD" /> MACD</label></li>'
								+ '<li><label><input type="checkbox" value="slowstc" title="Slow STC" /> Slow STC</label></li>'
								+ '<li><label><input type="checkbox" value="faststc" title="Fast STC" /> Fast STC</label></li>'
								+ '<li><label><input type="checkbox" value="rsi" title="RSI" /> RSI</label></li>'
								+ '<li><label><input type="checkbox" value="dmi" title="DMI" /> DMI</label></li>'
								+ '<li><label><input type="checkbox" value="adx" title="ADX" /> ADX</label></li>'
								+ '<li><label><input type="checkbox" value="obv" title="OBV" /> OBV</label></li>'
								+ '<li><label><input type="checkbox" value="sonar" title="SONAR" /> SONAR</label></li>'
								+ '<li><label><input type="checkbox" value="cci" title="CCI" /> CCI</label></li>'
								+ '<li><label><input type="checkbox" value="vr" title="VR" /> VR</label></li>'
								+ '<li><label><input type="checkbox" value="trix" title="TRIX" /> TRIX</label></li>'
								+ '<li><label><input type="checkbox" value="pmao" title="PMAO" /> PMAO</label></li>'
								+ '<li><label><input type="checkbox" value="psychology" title="투자심리" /> 투자심리</label></li>'
								+ '<li><label><input type="checkbox" value="williams" title="Williams\' %R" /> Williams\' %R</label></li>'
								+ '<li><label><input type="checkbox" value="roc" title="ROC" /> ROC</label></li>'
								+ '<li><label><input type="checkbox" value="chaikins" title="Chaikins" /> Chaikins Oscillator</label></li>'
							+'</ul>'
						+ '</fieldset>'
						+ '<div class="stockchart-layer-assist">'
							+ '<select name="stockchart-select-assist"></select>'
							+ '<div><input type="button" value="기본값" class="stockchart-default" /></div>'
							+ '<div class="select-container-assist"></div>'
						+ '</div>'
						+ '<div class="stockchart-options-assist">'
							+ '<fieldset class="volume"><legend>거래량</legend></fieldset>'
							+ '<fieldset class="macd"><legend>MACD</legend>'
								+ '<dl>'
									+ '<dt>단기이평</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="macd_param1" value="12" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>장기이평</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="macd_param2" value="26" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>Signal</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="macd_param3" value="9" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="slowstc"><legend>Slow STC</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="slowstc_param1" value="5" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>Slow%K</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="slowstc_param2" value="3" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>Slow%D</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="slowstc_param3" value="3" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="faststc"><legend>Fast STC</legend>'
								+ '<dl>'
									+ '<dt>Fast%K</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="faststc_param1" value="5" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>Fast%D</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="faststc_param1" value="3" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="rsi"><legend>RSI</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="rsi_param1" value="10" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>Signal</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="rsi_param2" value="5" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="dmi"><legend>DMI</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="dmi_param1" value="14" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="adx"><legend>ADX</legend>'
								+ '<dl>'
									+ '<dt>DMI기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="adx_param1" value="14" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>ADX기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="adx_param2" value="14" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>ADX이평</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="adx_param2" value="9" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="obv"><legend>OBV</legend></fieldset>'
							+ '<fieldset class="sonar"><legend>SONAR</legend>'
								+ '<dl>'
									+ '<dt>EMA기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="sonar_param1" value="12" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="sonar_param2" value="26" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>이평</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="sonar_param2" value="9" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="cci"><legend>CCI</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="sonar_param1" value="9" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="vr"><legend>VR</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="vr_param1" value="20" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="trix"><legend>TRIX</legend>'
								+ '<dl>'
									+ '<dt>단기이평</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="trix_param1" value="5" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>Signal</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="trix_param2" value="3" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="pmao"><legend>PMAO</legend>'
								+ '<dl>'
									+ '<dt>단기이평</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="pmao_param1" value="5" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>장기이평</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="pmao_param2" value="20" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="psychology"><legend>투자심리</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="psychology_param1" value="10" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="williams"><legend>Williams\' %R</legend>'
								+ '<dl>'
									+ '<dt>%R</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="williams_param1" value="14" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>%D</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="williams_param2" value="3" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="roc"><legend>ROC</legend>'
								+ '<dl>'
									+ '<dt>기간</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="roc_param1" value="12" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
							+ '<fieldset class="chaikins"><legend>Chaikins Oscillator</legend>'
								+ '<dl>'
									+ '<dt>%R</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="chaikins_param1" value="3" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
									+ '<dt>%D</dt>'
									+ '<dd>'
										+ '<input type="button" value="-" class="minus" />'
										+ '<input type="text" name="chaikins_param2" value="10" max="150" min="1" />'
										+ '<input type="button" value="+" class="plus" />'
									+ '</dd>'
								+ '</dl>'
							+ '</fieldset>'
						+'</div>'
					+'</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>'
	+ '</div>';

 })();

(function($){

    $.accordion = function(selector, settings){

		// settings
    	var config = {
    		'parent'			:undefined,
    		'vertical_width'	:'100%',
    		'vertical_height'	:800,

    		'horizontal_width'	:'740',
    		'horizontal_height'	:'140',

    		'width'				:'800',
    		'height'			:'800',
    		'mode'				:'vertical',

    		'speed'				:0,

    		'onchange'			:undefined

        };

        if ( settings ){$.extend(config, settings);}

        var accordion={
        	config	   : config,
        	initialize : function(selector){
        		this.accordion  = $(selector, config.parent);
        		this.items      = $(".item",this.accordion);
        		this.title		= $(".title",this.accordion);
        		this.content	= $(".content",this.accordion);
        		this.director   = $("DIV.director",this.content);
        		this.list		= $(".list",this.accordion);
        		this.icon		= $(".icon",this.accordion);
        		this.lastContent= this.content.last();



        		this.forMinimize = $('<div style="display:none;width:100%;height:100%;background-color:#20222c;" />');
        		this.lastContent.append(this.forMinimize);

        		this.itemCount 	= this.items.size();

        		_this.items.each(function(i){
        			var target = $(this);
        			target.attr("data-li_index",1);
        			target.attr("data-li_count",$("UL LI",target).size());
        		});

        		this.accordionMarginLeft= 0;
        		this.accordionMarginTop= 0;


        		this.directorWidth  	= 0;
            	this.directorHeight 	= 0;

        		this.accordionWidth		= undefined;
        		this.accordionHeight	= undefined;

        		this.itemWidth			= undefined;
        		this.itemHeight			= undefined;

        		this.titleWidth 		= undefined;
        		this.titleHeight 		= undefined;

        		this.contentWidth 		= undefined;
        		this.contentHeight 		= undefined;

        		this.listWidth 			= undefined;
        		this.listHeight			= undefined;

        		this.opened				= _this.items.eq(0).attr("data-index","0").addClass("open");
        		this.minimizeOpened		= undefined;

        		this.progressing 		= false;
        		this.directorProcessing = false;

        		this.initLayout();

        		_this.content.each(function(i){
        			if(i!=0){
        				$(this).hide();
        			}
        		});

        		this.beforeMode 		= config.mode;

        		this.accordion.delegate("div.director","click",function(event){

        			if(_this.directorProcessing){ return ;}
        			_this.directorProcessing = true;

        			var director = $(this);
        			var item = director.closest("DIV.item");
        			var firstShowingLiIndex = Number(item.attr("data-li_index"));
        			var liCount = Number(item.attr("data-li_count"));


        			var targetUL = $("UL",item);
        			var li = $("li:eq(0)",targetUL);
        			var direction = undefined;

        			if(director.hasClass("prev")){
        				if(firstShowingLiIndex == 1){
        					_this.directorProcessing = false;
							return;
						}else{
							item.attr("data-li_index",firstShowingLiIndex-1);
						}

        				if(config.mode=="vertical"){
    						direction = "down";
    						targetUL.animate({left:0,top: "+="+(li.outerHeight(true))+"px", leaveTransforms:true },config.speed, function() {
    							_this.directorProcessing = false;
    						});
    					}else{
    						direction = "right";
    						targetUL.animate({left: "+="+(li.outerWidth(true))+"px",top:0, leaveTransforms:true },config.speed, function() {
    							_this.directorProcessing = false;
    						});
    					}

        			}else if( director.hasClass("next")){
        				if(firstShowingLiIndex == liCount){
        					_this.directorProcessing = false;
							return;
						}else{
							item.attr("data-li_index",firstShowingLiIndex+1);
						}

        				if(config.mode=="vertical"){
        					direction = "up";
    						targetUL.animate({left:0,top: "-="+(li.outerHeight(true))+"px", leaveTransforms:true },config.speed, function() {
    							_this.directorProcessing = false;
    						});
    					}else{
    						direction = "left";
    						targetUL.animate({left: "-="+(li.outerWidth(true))+"px",top:0, leaveTransforms:true },config.speed, function() {
    							_this.directorProcessing = false;
    						});
    					}


        			}
        		});

        		this.accordion.delegate("div.icon","click",function(event,data){
        			_this.minimizeOpened = $(this);
        			_this.progressing = false;
        			$("#personalResize").trigger("click");
        		});

        		this.accordion.delegate("div.title","click",function(event,data){
        			var item = $(this.parentNode);
        			if(!item.hasClass("open") && !_this.progressing){
        				_this.progressing = true;
        				var moveTarget = undefined;
        				var direction  = undefined;
        				if(item.prevAll(".open").size()>0){
        					if(config.mode=="vertical"){
        						direction = "up";
        					}else{
        						direction = "left";
        					}

        					moveTarget = item.prevUntil(".open").andSelf();
        				}else{
        					if(config.mode=="vertical"){
        						direction = "down";
        					}else{
        						direction = "right";
        					}

        					moveTarget = item.nextUntil(".open ~ DIV");
        				}

        				_this.opened.removeClass("open");
        				if(data!="minimize"){
        					item.addClass("open");
        				}

        				var dataIndex   = parseInt(item.attr("data-index"));
        				var titleWidth  = _this.titleWidth;
        				var titleHeight = _this.titleHeight;
        				var contentHeight = _this.contentHeight;
        				var contentWidth = _this.contentWidth;

        				var moveWrapper = $('<div class="moveWrapper" style="width:100%;height:100%;position:absolute;top:0;left:0;" />');
        				moveTarget.wrapAll(moveWrapper);
						moveWrapper = $(".moveWrapper",_this.accordion);

						$(".content",item).show();

						if(moveTarget.size()==0){
							_this.progressing = false;
						}

        				switch(direction){
        					case "left":
        						moveWrapper.animate({left: "-"+(contentWidth)+"px",top:0, leaveTransforms:true },config.speed, function() {
        							var prevTop = _this.opened.css("left");
            						prevTop = parseInt(prevTop)+_this.itemWidth;

            						$(".content",_this.opened).hide();
        							_this.opened = item;

        							moveTarget.unwrap();
        							moveTarget.each(function(i){
        								$(this).attr("style","left: "+(prevTop+(_this.itemWidth*(i)))+"px");
        							});

        							_this.progressing = false;
        						});

        						break;
        					case "right":
        						moveWrapper.animate({left: contentWidth+"px",top:0, leaveTransforms:true },config.speed, function() {
        							var nextTop = item.prev().css("left");
            						nextTop = nextTop === undefined ? "-"+ _this.itemWidth+"px":nextTop;
            						nextTop = parseInt(nextTop)+_this.itemWidth+contentWidth;

            						$(".content",_this.opened).hide();
            						_this.opened = item;

        							moveTarget.unwrap();
        							moveTarget.each(function(i){
        								$(this).attr("style","left: "+(nextTop+((i+1)*_this.itemWidth))+"px");
        							});

        							_this.progressing = false;
        						});

        						break;
        					case "up":

        						moveWrapper.animate({left:0,top: "-"+(contentHeight)+"px", leaveTransforms:true },config.speed, function() {
        							var prevTop = _this.opened.css("top");
            						prevTop = parseInt(prevTop)+titleHeight;

            						$(".content",_this.opened).hide();
        							_this.opened = item;

        							moveTarget.unwrap();
        							moveTarget.each(function(i){
        								$(this).attr("style","top: "+(prevTop+(titleHeight*(i)))+"px;width: "+config.width+"px");
        							});

        							_this.progressing = false;
        						});
        						break;
        					case "down":

        						moveWrapper.animate({left:0,top: contentHeight+"px", leaveTransforms:true },config.speed, function() {
        							var nextTop = item.prev().css("top");
            						nextTop = nextTop === undefined ? "-"+ titleHeight+"px":nextTop;
            						nextTop = parseInt(nextTop)+titleHeight+contentHeight;

            						$(".content",_this.opened).hide();
            						_this.opened = item;

        							moveTarget.unwrap();
        							moveTarget.each(function(i){
        								$(this).attr("style","top: "+(nextTop+((i+1)*_this.titleHeight))+"px;width: "+config.width+"px");
        							});

        							_this.progressing = false;
        						});
        						break;
        					default:
        						break;
        				}
        			}
        		});
        		return this;
        	},

        	reset : function(){
        		$("UL",_this.accordion).each(function(){
    				var ul = $(this);
    				ul.attr("style","");
    				var item = ul.closest("DIV.item").attr("data-li_index",1);
    			});
        	},

        	setListType : function(type){
        		if(type=="box"){
        			_this.accordion.addClass("box");
        		}else if(type=="list"){
        			_this.accordion.removeClass("box");
        		}

        		_this.reset();
        	},

        	initLayout : function(customSetting){
        		if ( customSetting ){$.extend(config, customSetting);}

        		_this.changeLayout(config.mode);

        		//모드가 변경되었다면 초기화 작업을 수행
        		if(this.beforeMode != config.mode){
        			this.beforeMode = config.mode;

        			if(config.onchange){
        				config.onchange();
        			}

        			if(this.director.css("display")!="none"){
            			this.directorWidth  	= this.director.outerWidth(true);
                		this.directorHeight 	= this.director.outerHeight(true);
            		}

            		try{
            			this.accordionMarginLeft = parseInt($("DIV.accordionArea").css("margin-left")) || 0;
            		}catch(e){
            			this.accordionMarginLeft = 0;
            		}
            		try{
            			this.accordionMarginTop = parseInt($("DIV.accordionArea").css("padding-top")) || 0;
            		}catch(e){
            			this.accordionMarginTop = 0;
            		}
        			_this.reset();

        			if(config.mode == "vertical"){
        				var targetUL = $("UL",this.list);
    					targetUL.width(config.width);
        			}else{
        				this.list.each(function(){
        					var targetUL = $("UL",$(this));
        					var li = $("li",targetUL);
        					targetUL.width((li.eq(0).outerWidth(true)*li.size()));
            			});
        			}
        		}

        		var openIndex = this.opened.attr("data-index");

        		if( config.mode == "vertical" ){
        			var title = _this.title.eq(0);
            		_this.titleWidth  = title.outerWidth(true);
            		_this.titleHeight = title.outerHeight(true);

        			_this.accordionWidth	= config.width- _this.accordionMarginLeft;
            		_this.accordionHeight	= config.height - _this.accordionMarginTop;

            		_this.contentWidth		= _this.accordionWidth;
            		_this.contentHeight		= _this.accordionHeight - ( _this.titleHeight * _this.itemCount );
            		_this.accordion.css({width:_this.accordionWidth, height:_this.accordionHeight});
            		_this.content.css({width:_this.contentWidth, height:_this.contentHeight -1});
            		_this.list.css({width:_this.contentWidth, height:_this.contentHeight-(_this.directorHeight*2)});

            		_this.items.each(function(i){
            			var contentHeight = 0;
            			if(i > openIndex){
            				contentHeight = openIndex == i ? 0 : _this.contentHeight;
            			}

        				$(this).attr("data-index",i).css({"top":((_this.titleHeight*i)+contentHeight)+"px",left:0, width: config.width});
            		});

        		}else if( config.mode == "horizontal" ){
        			var item = _this.items.eq(0);
            		_this.itemWidth  = item.outerWidth(true);
            		_this.itemHeight = item.outerHeight(true);


            		var fixWidth = 0;

            		config.parent.prevAll().each(function(){
            			fixWidth += $(this).outerWidth(true);
            		});
            		if($.browser.msie && $.browser.version=="7.0"){
            			fixWidth = 0;
            		}


        			_this.accordionWidth	= config.width-fixWidth;
            		_this.accordionHeight	= config.height;

        			_this.contentWidth		= _this.accordionWidth - ( _this.itemWidth * _this.itemCount );
            		_this.contentHeight		= _this.accordionHeight;

            		_this.accordion.css({width:_this.accordionWidth,height:_this.accordionHeight});
            		_this.content.css({width:_this.contentWidth,height:_this.contentHeight});
            		_this.list.css({width:_this.contentWidth - (_this.directorWidth*2),height:_this.contentHeight});

            		_this.items.each(function(i){
        				var contentWidth = 0;
        				if(i > openIndex){
        					contentWidth = openIndex == i ? 0 : _this.contentWidth;
            			}

        				$(this).attr("data-index",i).css({top:0,"left":(((_this.itemWidth)*i)+contentWidth)+"px"});
            		});
        		}
        	},

        	changeLayout : function(mode){
        		if( mode == "narrow" ){
        			_this.accordion.removeClass("verticalAccordion").addClass("horizontalAccordion");
        			config.mode = "horizontal";
    			}else{
    				_this.accordion.removeClass("horizontalAccordion").addClass("verticalAccordion");
    				config.mode = "vertical";
    			}
        	},

        	minimize : function(){
        		_this.minimizeOpened = $("DIV.item.open",_this.accordion);
        		_this.accordion.addClass("minimize");
        		_this.forMinimize.show();
        		var lastItem = _this.items.last();
        		$(".title",lastItem).trigger("click","minimize");
        		return lastItem;
        	},

        	maximize : function(){
        		_this.accordion.removeClass("minimize");
        		_this.forMinimize.hide();
        		var firstItem = _this.items.first();
        		$(".title",_this.minimizeOpened).trigger("click","maximize");
        		return firstItem;
        	}

        };

        var _this = accordion;

        var accordionObject = _this.initialize(selector);

        $("#"+_this.id).data("accordion",accordionObject);
        return accordionObject;
    };

    function log (obj,tag){
    	if(true){
    		if(!tag) {
    			tag = "";
    		}

    		var consoleLog = document.getElementById("consoleLog");
    		if(consoleLog == null){

    			if (typeof document.compatMode!='undefined'&&document.compatMode!='BackCompat') {
    				cot_t1_DOCtp="_top:expression(document.documentElement.scrollTop+document.documentElement.clientHeight-this.clientHeight);_left:expression(document.documentElement.scrollLeft + document.documentElement.clientWidth - offsetWidth);}";
    			}
    			else {
    				cot_t1_DOCtp="_top:expression(document.body.scrollTop+document.body.clientHeight-this.clientHeight);_left:expression(document.body.scrollLeft + document.body.clientWidth - offsetWidth);}";
    			}

    			var cot_tl_bodyCSS='* html {background:url(blank.gif) fixed;background-repeat: repeat;background-position: right bottom;}';
    			var cot_tl_fixedCSS='#consoleLog{';
    			cot_tl_fixedCSS+='right:0px;width:100%;bottom:0px;z-index:10000;position:fixed;_position:absolute;background-color: white;';
    			cot_tl_fixedCSS+=cot_t1_DOCtp ;

    			var styleTag = document.createElement("STYLE");
    			styleTag.setAttribute("type","text/css");
    			if(styleTag.styleSheet){ //IE
    				styleTag.styleSheet.cssText=cot_tl_fixedCSS;
    			}else{//OTHER
    				try{
    					styleTag.innerHTML=cot_tl_fixedCSS;
    				}catch(e){//Safari
    					styleTag.innerText=cot_tl_fixedCSS;
    				}
    			}
    			document.getElementsByTagName("HEAD")[0].appendChild(styleTag);

    			var console = "<div id='consoleLog'>" +
    					"<div id='consoleControlArea' > " +
    					"	<div style='float:left'> " +
    					"		Filter By Tag : <input type='text' id='consoleControlFilter' />" +
    					"	</div>" +
    					"	<div style='float:right'> " +
    					"		<input type='button' value='clear' onclick='document.getElementById(\"consoleLogArea\").innerHTML=\"\"' />" +
    					"   	<input type='button' value='show' onclick='document.getElementById(\"consoleLogArea\").style.display=\"block\"'  />" +
    					"   	<input type='button' value='hide' onclick='document.getElementById(\"consoleLogArea\").style.display=\"none\"'  />" +
    					"	</div>" +
    					"	<div style='clear:both'></div>" +
    					"</div>" +
    					"<div id='consoleLogArea' style='height:92px;overflow:auto;'></div>" +
    					"</div>";
    			$('body').append(console);
    		}

    		var filterLog = true;
    		var consoleControlFilterVal = document.getElementById("consoleControlFilter").value;
    		if(consoleControlFilterVal != "" && consoleControlFilterVal != tag){
    			filterLog = false;
    		}

    		if(filterLog){
    			var time = new Date().toLocaleTimeString();
    			if(typeof obj === 'object'){
    				for(var i in obj){
    					if(typeof obj[i] ==='object'){
    						for(var j in obj[i]){
    							$("#consoleLogArea").append(time +"<font color='red'>["+tag+"]</font> "+ i + "."  + j + " = " + obj[i][j]+"<br />");
    						}
    					}else{
    						$("#consoleLogArea").append(time+" <font color='red'>["+tag+"]</font> "+ i + " = " + obj[i]+"<br />");
    					}
    				}
    			}else{
    				$("#consoleLogArea").append(time+" <font color='red'>["+tag+"]</font> " + obj+"<br />");
    			}
    			var scrollTop = $("#consoleLogArea").scrollTop();
    			$("#consoleLogArea").scrollTop(scrollTop+1000);
    		}
    	}
    }

})(jQuery);