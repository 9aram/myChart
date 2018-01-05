(function () {

	var productName = 'webPonent CHART 2.0';
	var productId = 'WC2';

	if (typeof WEBPONENT_CHART_LICENSE_KEY === 'undefined') {

		$.ajax({
			url : '/webponent.licenseKey.js',
			dataType : 'script',
			async : false
		});

		if (typeof WEBPONENT_CHART_LICENSE_KEY === 'undefined' || WEBPONENT_CHART_LICENSE_KEY === '') {

			alert(productName + '의 라이센스키를 입력해주세요.');
			return;
		}
	}

	var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";

	function decodeStr(coded) {
	    coded = decodeURIComponent(coded);
	    var uncoded = "";
	    var chr;
	    for (var i = coded.length - 1; i >= 0; i--) {
	        chr = coded.charAt(i);
	        uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
	            String.fromCharCode(65 + key.indexOf(chr) % 26) :
	            chr;
	    }
	    return uncoded;
	}

	function appendTrialUi (wrapper) {

		var wrapper = $(wrapper);

		var trialUiWrapper = $('<div class="WEBPONENT-TRIAL-UI">');

		trialUiWrapper.css({
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'width': '100%',
			'height': '100%',
			'background-image': "url('data:image/png;base64,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')",
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'z-index': '1',
			'opacity': '0.3'
		});

		var img = $('<img src="http://www.webponent.com/img/webponent.png"/>');

		trialUiWrapper.append(img);

		wrapper.prepend(trialUiWrapper);

		wrapper.on('mouseenter', function () {

			trialUiWrapper.stop(true, true);
			trialUiWrapper.hide();
		});

		wrapper.on('mouseleave', function () {

			trialUiWrapper.stop(true, true);
			trialUiWrapper.fadeIn();
		});

		wrapper.data('check-trial-ui', setInterval(function () {

			if (wrapper.find('.WEBPONENT-TRIAL-UI').length === 0) {

				clearInterval(wrapper.data('check-trial-ui'));
				appendTrialUi(wrapper[0]);
			}
		}, 5000));
	}

	function makeLicenseObject (text) {

		var obj = {};

		var splitedArray = text.split(';');

		obj.product = splitedArray[0];
		obj.customer = splitedArray[2];
		obj.licenseType = splitedArray[3];
		obj.domains = splitedArray[5];
		obj.expireDate = splitedArray[6];

		return obj;
	}

	var TRIAL_UI = false;

	var decodedLicenseKey = decodeStr(WEBPONENT_CHART_LICENSE_KEY);

	var licenseObject = makeLicenseObject(decodedLicenseKey);

	if (licenseObject.licenseType === 'TRIAL') {

		TRIAL_UI = true;

		if (new Date() > new Date(licenseObject.expireDate * 1)) {

			alert(productName + ' ' + licenseObject.licenseType + '버전의 라이센스 유효기간이 지났습니다.');
			return;
		}

	} else if (licenseObject.licenseType === 'DEVELOP') {

		if (new Date() > new Date(licenseObject.expireDate * 1)) {

			TRIAL_UI = true;
		}
	/**
		licenseType ED시리즈 조건 추가(ver.150915 평다진)
	*/
	} else if (licenseObject.licenseType === 'OFFICIAL' || licenseObject.licenseType === "ED001" || licenseObject.licenseType === "ED002" || licenseObject.licenseType === "ED003") {

		var domain = window.location.host.toUpperCase();

		TRIAL_UI = true;

		var splitedDomain = licenseObject.domains.split(',');

		for (var i = 0; i < splitedDomain.length; i++) {

			var regesteredSite = splitedDomain[i];

			if (domain.indexOf(regesteredSite) > -1) {

				TRIAL_UI = false;
			}
		}
	} else if (licenseObject.product !== productId) {

		TRIAL_UI = true;

	} else {

		alert('유효하지 않은 ' + productName + ' 라이센스입니다.');
		TRIAL_UI = true;
	}


	(function() {


		var self = {};


		function getDefaultStyles () {
			var defaultStyles = {
				layout : {
					area : {
						color : '#f8f8f8',
						opacity : 1
					},
					line : {
						color : '#eaeaea',
						width : 1
					},
					paddingTop : 30,
					paddingBottom : 20,
					paddingLeft : 20,
					paddingRight : 30
				},
				graph : {
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 10,
					paddingRight: 10,
					area : {
		    			color: '#f8f8f8',
		    			opacity : 1
		            },
		            line: {
		                top: {
		                	color: '#cccccc',
		                	width: 1,
		                	opacity: 1
		                },
		                left: {
		                	color: '#cccccc',
		                	width: 1,
		                	opacity: 1
		                },
		                right: {
		                	color: '#cccccc',
		                	width: 1,
		                	opacity: 1
		                },
		                bottom: {
		                	color: '#cccccc',
		                	width: 1,
		                	opacity: 1
		                }
		            }
				},
				yAxis: {
					width: 30,
					position: 'left',
					paddingLeft: 10,
					paddingRight: 20,
					baseZero : true,
					line: {
						color: '#cccccc',
						width: 1,
						opacity: 1,
						underLine : {
		                	use : false,
		                	color: '#3e4150',
			                width: 1,
			                opacity: 1
		                }
					},
					text: {
						family: 'Nanum Gothic',
		                size: 12,
		                color: '#737373',
		                align: 'right',		/* left | center | right */
		                style: 'normal', 	/* normal | italic */
		                weight: 'bold',	/* normal | bold */
		                opacity: 1
					},
					tick: {
						use : false,
						length: 8,
						color: '#202228',
						width: 1,
						opacity: 1,
						position: 'out'	/* out|in */
					}
				},
				xAxis: {
					height: 10,
					paddingTop: 25,
					betweenLabels: false,
					line: {
						use :true,
						color: '#e3e3e3',
						width: 1,
						opacity: 1,
						underLine : {
		                	use : false,
		                	color: '#3e4150',
			                width: 1,
			                opacity: 1
		                }
					},
					text: {
						family: 'Nanum Gothic',
		                size: 12,
		                color: '#737373',
		                align: 'center',	/* left | center | right */
		                style: 'normal',	/* normal | italic */
		                weight: 'bold',		/* normal | bold */
		                opacity: 1
					},
					gap : 30
				},
				series : {
					s1 : {
						use : true,
						way : 'up',
						line: {
							color: '#f26744',
							width: 0,
							opacity: 1
						},
						area : {
							color : '#fcb3b1',
							opacity: 1
						},
						animate : {
							use : true,
							type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut */
							speed : 400
						}
					},
					s2 : {
						use : true,
						way : 'up',
						line: {
							color: '#e42f02',
							width: 0,
							opacity: 1
						},
						area : {
							color : '#ff6d6a',
							opacity: 1
						},
						animate : {
							use : true,
							type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut */
							speed : 400
						}
					},
					s3 : {
						use : true,
						way : 'down',
						line: {
							color: '#485fff',
							width: 0,
							opacity: 1
						},
						area : {
							color : '#a2d6ee',
							opacity: 1
						},
						animate : {
							use : true,
							type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut */
							speed : 400
						}
					},
					s4 : {
						use : true,
						way : 'down',
						line: {
							color: '#6095ff',
							width: 0,
							opacity: 1
						},
						area : {
							color : '#1c9edc',
							opacity: 1
						},
						animate : {
							use : true,
							type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut */
							speed : 400
						}
					}
				},
				verticalLine : {
					use : true,
					type : '',	/* - | . | -. | -.. | .  | -  | -- | - . | --. | --.. */
					color : '#465866',
					width : 1,
					opacity : 1
				},
				horizonLine : {
					use : false,
					type : '',	/* - | . | -. | -.. | .  | -  | -- | - . | --. | --.. */
					color : '#465866',
					width : 1,
					opacity : 1
				}
			};

			return defaultStyles;
		}

		function getDeaultOptions () {
			var defaultOptions = {
		        data : {
					data : null,
					url: '',
					type: 'json',
					reverse: false,
					jsonDepth: 'output.result',
					gubun : '',
					gubunOption : null
				},
				xAxis : {
					select : '',
					format : null
				},
				yAxis : {
					select : '',
					format : null
				},
		        toolTip : {
		        	use : true,
		        	className : null,
		        	position : {
		        		x : -90,
		        		y : -90
		        	},
		        	func : null
		        },
		        timeSlice : {
		            use : false,
		            delay : 500,
		            animate : {
		                use : false,
		                type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut|none */
		                speed : 200
		            },
		            slider : null,
		            play : null,
		            pause : null,
		            stop : null,
		            data : function (data) {

		            }
		        },
		        resize : {
		        	use : false
		        }
			}

			return defaultOptions;
		}

		var elementType = getElementType();

		var lineError = getLineError();

		function getLineError () {

			var lineError = 0;

			if ( elementType == 'SVG' ) {
				lineError = 0.5;
			}

			return lineError;
		}

		function getElementType () {

			var g = {doc: document, win: window};

			var elementType = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");

			return elementType;
		}

		var max = 0;
		var min = 99999999999999999999999;

		function extendStyles (style) {

			var defaultStyles = getDefaultStyles();

			var styles = $.extend(true, defaultStyles, style);

			if(elementType === 'VML') {

				styles.xAxis.text.family = 'Dotum';
				styles.yAxis.text.family = 'Dotum';

			}

			return styles;
		}

		function extendOptions (option) {

			var defaultOptions = getDeaultOptions();
			var option = $.extend(true, defaultOptions, option);

			return option;
		}

		function loadData (options) {

			var data = [];
			var dataTotal = 0;

			if (options.data.data) {
				var data = loadBlock(options);
			} else {
				$.ajax({
					url : options.data.url,
					async : false,
					dataType : options.data.type,
					jsonp:"callback",
					success : function(data2) {
						if (options.data.type == "json"||options.data.type == "jsonp") {
							var arr = loadJson(data2, options);
						} else {
							var arr = loadText(data2, options);
						}
						data = arr;
					},
					error : function(e) {
						console.log(e)
					}
				});
			}

			data = removeComma(data, options);

			return data;
		}

		/**
		 * 데이터에 ',' 가 있을 경우 제거한다.
		 * @param  {pie} pie 객체
		 */
		function removeComma (data, options) {

			var dataLen = data.length;

			for (var i = 0; i < dataLen; i++) {

				var dataI = data[i];

				$.each(options.yAxis.select, function (key) {


					var dataSelect = options.yAxis.select[key];

					if (typeof dataI[dataSelect] == 'string') {

						dataI[dataSelect] =
								Number(dataI[dataSelect].split(',').join(''));

					}
				});
			}

			return data;
		}


		function basicData (data, options) {

			var sliceData = setTimeSlice(data, options);

			if (options.gubunOption == undefined) {

				var dataGubun = sliceData[sliceData.length-1];

			} else {

				var dataGubun = setGubunOption(data, options);

			}

			data = setData(dataGubun, options);

			return data;
		}

		function setTimeSlice (data, option) {

			var gubunDataArr = new Array();

			gubunDataArr[0] = new Array();

			var arrIndex = 0;
			var index = 0;

			gubunDataArr[0][0] = data[0];

			for (var i = 1; i < data.length; i ++ ){

				if ( data[i][option.gubun] == data[i-1][option.gubun]  ) {

					index += 1;

					gubunDataArr[arrIndex][index] = data[i];

				} else {

					arrIndex += 1;
					index = 0;

					gubunDataArr[arrIndex] = new Array();

					gubunDataArr[arrIndex][index] = data[i];
				}
			}

			for ( var i = 0; i < gubunDataArr.length; i++ ) {

				gubunDataArr[i] = setData(gubunDataArr[i], option);

			}

			return gubunDataArr;
		}

		function setGubunOption (data, dataParam) {

			var dataGubun = [];

			for ( var i = 0; i < data.length; i++ ) {

				if (data[i][dataParam.gubun] == dataParam.gubunOption ) {
					dataGubun.push(data[i]);
				}
			}

			return dataGubun;
		}

		function getDataTotal (data) {

			var dataTotal = 0;

			for (var i = 0; i < data.length; i++) {
				dataTotal += data[i].value;
			}

			for (var i = 0; i < data.length; i++) {
				data[i].dataTotal = dataTotal;
			}
		}

		function loadBlock (options) {

			var dataTotal = 0;
			var data = options.data.data;

			return data;
		}

		function loadJson (data, options) {

			var bld_depth = options.data.jsonDepth.split('.');
			var outPut = bld_depth[0];
			var result = bld_depth[1];

			var arr = data;

			for (var i = 0; i < bld_depth.length; i++) {

				arr = arr[bld_depth[i]];
			}

			/*var arr = data2[outPut][result];

			var dataTotal = 0;

			if (options.use != undefined && options.use != null && options.use != "") {

				for ( var i = 0; i < arr.length; i++) {
					dataTotal += Number(arr[i][options.use]);
				}
			}*/

			return arr;
		}

		function loadText (data2, dataParam) {

			var arr = [];
			var data = data2;
			var lineArr = data.split('\n');
			var dataTitles = [];
			var titleCheck = true;
			var dataTotal = 0;

			for ( var i = 0; i < lineArr.length; i++) {
				if (lineArr.length <= 1){
					continue;
				}
				var objArr = lineArr[i].split('|');
				if (lineArr[i].indexOf("companyname") > -1 || objArr.length <= 1) {
				} else {
					if (titleCheck) {
						for ( var j = objArr.length; j--;) {
							dataTitles.unshift(trim(objArr[j]));
						}
						titleCheck = false;
					} else {
						var obj = {};
						if (objArr.length <= 1) {
							continue;
						}
						$.each(objArr, function(j, item) {
							obj[dataTitles[j]] = trim(item);
							if (dataTitles[j] == dataParam.use) {
								dataTotal += Number(item);
							}
						});
						arr.push(obj);
					}
				}
			}
			return arr;
		}

		function setData (data, options) {

			for ( var i = 0; i < data.length; i++ ) {

				if ( options.legend != undefined ) {

	 				data[i].legend = options.legend[i];
				}

			}

			return data;
		}

		var trim = function(str) {
			str = str.replace(/(^\s*)|(\s*$)/gi, "");
			return str;
		};


		priceDataFormat = function(txt) {
			if(txt==0) return 0;

		    var reg = /(^[+-]?\d+)(\d{3})/;
		    var n = (txt + '');

		    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

		    return n;
		};

		// DAY|MONTH Format (0000.00.00 | 0000.00)
		dayDataFormatDot = function( str ){
			var length = String(str).length;
			var data = str = String(str);
			if(length > 6) {
				data = str.substr(0, 4);
				data += ".";
				data += str.substr(4, 2);
				data += ".";
				data += str.substr(6, 2);
			} else if (length > 4) {
				data = str.substr(0, 4);
				data += ".";
				data += str.substr(4, 2);
			} else {
				data = str.substr(0, 2);
				data += ".";
				data += str.substr(2, 2);
			}

			return data;
		};

		function parseMaxMinData ( tempData, styles, options ) {

			var vmax = -99999999999999999;
			var vmin = 99999999999999999;
			var yaxisKeyLen = objectKeyLength;

			for( var i = 0; i < tempData.length; i++) {

				for ( var key in options.yAxis.select ) {
					var yaxisKey = options.yAxis.select[key];
					var _data = tempData[i][yaxisKey];

					vmin = getMin(vmin, _data);
					vmax = getMax(vmax, _data);

				}
			}

			max = getMax(max, vmax);
			min = getMin(min, vmin);

			return tempData;
		};


		function getMax ( val1, val2 ) {
			if(Number(val1) > Number(val2)){
				return Number(val1);
			} else {
				return Number(val2);
			}
		};


		function getMin ( val1, val2 ) {
			if(Number(val1) < Number(val2)){
				return Number(val1);
			} else {
				return Number(val2);
			}
		};


		dayDataFormat = function( str ){
			var length = String(str).length;
			var data = str = String(str);
			if(length > 6) {
				data = str.substr(0, 4);
				data += "/";
				data += str.substr(4, 2);
				data += "/";
				data += str.substr(6, 2);
			} else if (length > 4) {
				data = str.substr(0, 4);
				data += "/";
				data += str.substr(4, 2);
			} else {
				data = str.substr(0, 2);
				data += "/";
				data += str.substr(2, 2);
			}

			return data;
		};


		function setXAxis ( styles, options, data, graphAttr ) {

			var horizonAreaWidth = graphAttr.chartAreaWidth;
			var dataLength = data.length;
			var xGap = horizonAreaWidth / dataLength;
			var xLabelSkip = 0;
			var dataValue = String(data[data.length-1][options.xAxis.select]);

			var textWidth = ((dataValue.length - 4) * styles.xAxis.text.size) + styles.xAxis.gap;

			for(i = 0; i < horizonAreaWidth; i += xGap) {
				if(i < textWidth){
					xLabelSkip += 1;
				} else {
					break;
				}
			}
			return xLabelSkip;
		};


		function setYAxis ( styles, options, data, max, min, graphAttr ) {

			var computed = adjustMinMax(styles, max, min, styles, options);
			var computedInterval = computed.computedInterval;
			var computedMinimum = computed.computedMinimum;
			var computedMaximum = computed.computedMaximum;

			var yLabelPos = Number(options.paddingtop) + Number(options.xlabelpaddingtop) + Number(options.xlabelgap);
			var mmHValue = 0;
			var useAccess = false;
			var yAxis = [];

			if ( useAccess ) {
				mmHValue = Math.round((60 / (graphAttr.chartAreaHeight - yLabelPos)) * (max - min));
			}
			var labelTop = computedMaximum + mmHValue;

			var decimal = Math.abs(computedInterval) - Math.floor(Math.abs(computedInterval));
			var precision = decimal == 0 ? 1 : -Math.floor(Math.log(decimal) / Math.LN10);

			decimal = Math.abs(computedMinimum) - Math.floor(Math.abs(computedMinimum));
			precision = Math.max(precision, decimal == 0 ? 1: -Math.floor(Math.lof(decimal) / Math.LN10));

			var roundBase = Math.pow(10, precision);

			var roundedValue;
			for( var i = computedMinimum; i <= labelTop + computedInterval; i += computedInterval) {
				roundedValue = Math.round(i * roundBase) / roundBase;
				yAxis.push(roundedValue);
			}

			return yAxis;
		};

		function adjustMinMax ( styles, maxValue, minValue, options ) {

			if(maxValue == 0 && minValue == 0){
				maxValue = 100;
			}

			var powerOfTen = Math.floor(Math.log(Math.abs(maxValue - minValue)) / Math.LN10);

			var y_userInterval = Math.pow(10, powerOfTen);
			if(Math.abs(maxValue - minValue) / y_userInterval < 4) {
				powerOfTen--;
				y_userInterval = y_userInterval *2/5;
			}

			var y_topBound = Math.round(maxValue / y_userInterval) * y_userInterval ? maxValue : (Math.floor(maxValue / y_userInterval) + 1) * y_userInterval;

			var y_lowerBound;
			if(minValue < 0 || options.baseatzero == false){
				y_lowerBound = Math.floor(minValue / y_userInterval) * y_userInterval;

				if(maxValue < 0 && styles.yaxis.baseZero)
					y_topBound = 0;
			} else {
				y_lowerBound = 0;
			}

			var computed = {};
			computed.computedInterval = y_userInterval;
			computed.computedMinimum = y_lowerBound;
			computed.computedMaximum = y_topBound;

			return computed;
		};

		function drawSvg (horizon, styles) {

	  		var svgElement = null;

			var svgWidth = Math.floor(horizon.width()) - lineError;
			var svgHeight = Math.floor(horizon.height()) - lineError;

			svgElement = Raphael(horizon[0], svgWidth, svgHeight);

			svgElement.canvas.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

			var width = svgWidth;
			var height = svgHeight;

			if (elementType === "VML") {

				width = width - (styles.layout.line.width / 2) - 1.5;
				height = height - (styles.layout.line.width / 2) - 1.5;
			}

			var rect = svgElement.rect(0, 0, width, height);

			var layoutFillColor = setFillColorSrc(styles.layout.area.color);

			rect.attr({
				fill : layoutFillColor,
				opacity : styles.layout.area.opacity,
				stroke : styles.layout.line.color,
				'stroke-width' : styles.layout.line.width
			})

	        return svgElement;

		}

		function setDataFormat ( data, options ) {

			var dataLength = data.length;

			for ( var i = dataLength; i--; ) {

				data[i][options.xAxis.select] = dayDataFormat(data[i][options.xAxis.select])
			}

			return data;
		}

		// function drawSurroundHorizon ( styles, options, svgElement, graphAttr ) {

		// 	var surroundHorizonArea = svgElement.rect();

		// 	surroundHorizonArea.attr({
		// 		x : graphAttr.baseX,
		// 		y : graphAttr.baseY,
		// 		width : graphAttr.baseWidth,
		// 		height : graphAttr.baseHeight,
		// 		fill : styles.graph.color,
		// 		stroke : styles.graph.line.color,
		// 		'stroke-width' : styles.graph.line.width,
		// 		'stroke-opacity' : styles.graph.line.opacity
		// 	})


		// 	return surroundHorizonArea;
		// }

		function drawSurroundHorizon ( styles, options, svgElement, graphAttr ) {

			var surroundGroup = svgElement.set();

			var surroundPlotArea = svgElement.rect();

			surroundPlotArea.attr({
				x : graphAttr.baseX,
				y : graphAttr.baseY,
				width : graphAttr.baseWidth,
				height : graphAttr.baseHeight,
				fill : styles.graph.area.color,
				stroke : styles.graph.line.color,
				'stroke-width' : 0,
				opacity: styles.graph.area.opacity
			})

			surroundGroup.push(surroundPlotArea);

			var surroundTopLine = svgElement.path();
			var topPath = 'M' + graphAttr.baseX + ',' + graphAttr.baseY + 'L' + graphAttr.baseX2 + ',' + graphAttr.baseY + 'Z';
			surroundTopLine.attr({
				path : topPath,
				stroke : styles.graph.line.top.color,
				'stroke-width' : styles.graph.line.top.width
			})
			var surroundBottomLine = svgElement.path();
			var bottomPath = 'M' + graphAttr.baseX + ',' + graphAttr.baseY2 + 'L' + graphAttr.baseX2 + ',' + graphAttr.baseY2 + 'Z';
			surroundBottomLine.attr({
				path : bottomPath,
				stroke : styles.graph.line.bottom.color,
				'stroke-width' : styles.graph.line.bottom.width
			})
			var surroundLeftLine = svgElement.path();
			var leftPath = 'M' + graphAttr.baseX + ',' + graphAttr.baseY + 'L' + graphAttr.baseX + ',' + graphAttr.baseY2 + 'Z';
			surroundLeftLine.attr({
				path : leftPath,
				stroke : styles.graph.line.left.color,
				'stroke-width' : styles.graph.line.left.width
			})
			var surroundRightLine = svgElement.path();
			var rightPath = 'M' + graphAttr.baseX2 + ',' + graphAttr.baseY + 'L' + graphAttr.baseX2 + ',' + graphAttr.baseY2 + 'Z';
			surroundRightLine.attr({
				path : rightPath,
				stroke : styles.graph.line.right.color,
				'stroke-width' : styles.graph.line.right.width
			})

			surroundGroup.push(surroundTopLine);
			surroundGroup.push(surroundBottomLine);
			surroundGroup.push(surroundLeftLine);
			surroundGroup.push(surroundRightLine);

			return surroundGroup;
		}

		function drawHorizonArea ( styles, options, svgElement, graphAttr ) {

			var horizon = svgElement.rect();

			horizon.attr({
				x : graphAttr.chartAreaX,
				y : graphAttr.chartAreaY,
				width : graphAttr.chartAreaWidth,
				height : graphAttr.chartAreaHeight,
				fill : styles.graph.area.color,
				stroke : '',
				opacity: styles.graph.area.opacity
			})

			return horizon;
		}


		function drawXaxisText ( styles, options, data, svgElement, xAxisGroup, graphAttr ) {

			var xAxis = setXAxis(styles, options, data, graphAttr);
			var xAxisArr = getXAxisArr(options, data, xAxis);

			var xGap = graphAttr.chartAreaWidth / (data.length-1) * xAxis;

			var x = graphAttr.chartAreaX;
			var y = graphAttr.baseY2 + styles.xAxis.paddingTop;

			var xAxisTextGroup = svgElement.set();

			var xAxisGroupLength = xAxisArr.length;

			for ( var i = 0; i < xAxisGroupLength; i++ ) {

				var xAxisTextElement = svgElement.text();

				var text = xAxisArr[i];

				if ( options.xAxis.format != undefined && options.xAxis.format != null ) {
					text = eval(options.xAxis.format)(text);
				}

				xAxisTextElement.attr({
					x : x,
					y : y,
					text : text
				})
				xAxisTextGroup.push(xAxisTextElement);

				x += xGap;
			}

			setTextAttr(xAxisTextGroup, styles.xAxis.text);

			return xAxisTextGroup;
		}

		function getAlign ( textAlign ) {

			var align = 'middle';

			if ( textAlign == 'right' ) {
				align = 'end';
			} else if ( textAlign == 'left' ) {
				align = 'start';
			}

			return align;
		}

		function drawXaxisLine ( styles, options, data, svgElement, graphAttr ) {

			var xAxis = setXAxis(styles, options, data, graphAttr);
			var xAxisArr = getXAxisArr(options, data, xAxis);
			var x = graphAttr.chartAreaX;
			var xGap = graphAttr.chartAreaWidth / (data.length-1) * xAxis;
			var xAxisGroup = svgElement.set();
			var xAxisArrLength = xAxisArr.length;
			for ( var i = xAxisArrLength; i--; ) {
				var xAxisElement = svgElement.path();
				var xLinePath = 'M' + (Math.floor(x) + lineError) + ',' + graphAttr.baseY + 'L' + (Math.floor(x) + lineError) + ',' + graphAttr.baseY2  + 'Z';
				xAxisElement.attr({
					path : xLinePath,
					stroke : styles.xAxis.line.color,
					'stroke-width' : styles.xAxis.line.width,
					opacity : styles.xAxis.line.opacity
				})
				xAxisElement.pointX = (Math.floor(x) + lineError);
				xAxisGroup.push(xAxisElement);
				x += xGap;
			}
			return xAxisGroup;
		}


		function drawYaxisLine ( styles, options, data, svgElement, graphAttr ) {

			var yAxisArr = setYAxis(styles, options, data, max, min, graphAttr);
			var yAxisLength = (yAxisArr.length - 1) * 2;
			var y = graphAttr.chartAreaY2;
			var yInterval = graphAttr.chartAreaHeight / yAxisLength;
			var yLineGroup = svgElement.set();

			for ( var i = yAxisLength - 1; i--; ) {

				y -= yInterval;

				var yAxisElement = svgElement.path();
				var yLinePath = 'M' + graphAttr.baseX + ',' + (Math.floor(y) + lineError) + 'L' + graphAttr.baseX2 + ',' + (Math.floor(y) + lineError) + 'Z';

				yAxisElement.attr({
					path : yLinePath,
					stroke : styles.yAxis.line.color,
					'stroke-width' : styles.yAxis.line.width,
					opacity : styles.yAxis.line.opacity
				})
				yAxisElement.pointY = (Math.floor(y) + lineError);
				yLineGroup.push(yAxisElement)
			}
			return yLineGroup;
		}

		function drawYaxisText ( styles, options, data, svgElement, graphAttr ) {

			var yAxisArr = setYAxis(styles, options, data, max, min, graphAttr);
			var zeroY = graphAttr.chartAreaY + (graphAttr.chartAreaHeight / 2);
			var intervalY = (graphAttr.chartAreaHeight / 2) / (yAxisArr.length - 1);
			var upY = zeroY;
			var downY = zeroY;

			var x = styles.layout.paddingLeft + styles.yAxis.paddingLeft;
			if ( styles.yAxis.text.align == 'right' ) {
				x = x + styles.yAxis.width;
			} else if ( styles.yAxis.text.align == 'center' ) {
				x = x + styles.yAxis.width / 2;
			}

			var yAxisTextGroup = svgElement.set();
			var yAxisArrLength = yAxisArr.length - 1;

			for ( var i = 1; i < yAxisArrLength; i++ ) {
				var yAxisUpTextElement = svgElement.text();
				upY -= intervalY;

				var text = yAxisArr[i];

				if ( options.yAxis.format != undefined && options.yAxis.format != null ) {
					text = eval(options.yAxis.format)(text);
				}

				yAxisUpTextElement.attr({
					x : x,
					y : upY,
					text : text
				})
				yAxisTextGroup.push(yAxisUpTextElement);

			}

			for ( var i = 1; i < yAxisArrLength; i++ ) {
				var yAxisDownTextElement = svgElement.text();
				downY += intervalY;

				var text = yAxisArr[i];

				if ( options.yAxis.format != undefined && options.yAxis.format != null ) {
					text = eval(options.yAxis.format)(text);
				}

				yAxisDownTextElement.attr({
					x : x,
					y : downY,
					text : text
				})
				yAxisTextGroup.push(yAxisDownTextElement);
			}

			if ( styles.yAxis.baseZero ) {
				var zeroTextElement = svgElement.text();
				var zeroText = '0';
				if ( options.yAxis.format != undefined && options.yAxis.format != null ) {
					zeroText = String(eval(options.yAxis.format)(zeroText));
				}

				zeroTextElement.attr({
					x : x,
					y : zeroY,
					text : zeroText
				})
				yAxisTextGroup.push(zeroTextElement);
			}

			setTextAttr(yAxisTextGroup, styles.yAxis.text);

			return yAxisTextGroup;
		}


		function setTextAttr ( itemGroup, styles ) {

			var textAlign = getAlign(styles.align);

			itemGroup.attr({
				'font-family': styles.family,
				'font-size': styles.size,
				'font': styles.size + " '" + styles.family + "'",
				'fill': styles.color,
				'text-anchor': textAlign,
				'font-weight': styles.weight,
				'font-style': styles.style,
				opacity : styles.opacity
			})
		}

		function getXAxisArr ( options, data, xAxis ) {

			var xAxisArr = [];
			var dataLength = data.length;
			for ( var i = 0; i < dataLength; i++ ) {

				if ( i % xAxis == 0 ) {

					xAxisArr.push(data[i][options.xAxis.select])

				}
			}

			return xAxisArr;
		}


		function drawYaxisTick ( styles, svgElement, yAxisGroup, graphAttr ) {

			var yTipGroup = svgElement.set();
			var yAxisGroupLength = yAxisGroup.length;
			var moveX = graphAttr.baseX;
			var lineX = moveX - styles.yAxis.tick.length;

			if ( styles.yAxis.tick.position == 'in' ) {
				lineX = moveX + styles.yAxis.tick.length;
			}

			for ( var i = yAxisGroupLength; i--; ) {
				var tipElement = svgElement.path();
				lineY = yAxisGroup[i].pointY;
				var path = 'M' + moveX + ',' + lineY + 'L' + lineX + ',' + lineY  + 'Z';
				tipElement.attr({
					path : path,
					stroke : styles.yAxis.tick.color,
					'stroke-width' : styles.yAxis.tick.width,
					opacity : styles.yAxis.tick.opacity
				})
				yTipGroup.push(tipElement);
			}

			if ( styles.yAxis.baseZero == false ) {
				var zeroIndex = Math.ceil(yAxisGroupLength / 2) - 1;
				yTipGroup[zeroIndex].attr({
					opacity : 0
				})
			}

			return yTipGroup;
		}


		function getDataArr ( styles, options, data ) {

			var dataArr = [];

			var yaxisKeyLen = objectKeyLength;

		    for ( var i = yaxisKeyLen; i--; ) {
		    	dataArr[i] = [];
		    }

			var dataLength = data.length;

			var j = 0;

			for( var i = 0; i < dataLength; i++) {

				for ( var key in options.yAxis.select ) {

					var yaxisKey = options.yAxis.select[key];

					dataArr[j].push(data[i][yaxisKey]);

					j++;

					if ( j == yaxisKeyLen ) {
						j = 0;
					}

				}

			}

			return dataArr;
		}

		function getPath ( styles, options, data, svgElement, yAxisGroup, graphAttr ) {

			/* data 를 아이템 별로 구분 */
			var dataArr = getDataArr(styles, options, data);
			var startX = graphAttr.chartAreaX;
			var xInterval = graphAttr.chartAreaWidth / (data.length - 1);
			var zeroY = graphAttr.chartAreaY + (graphAttr.chartAreaHeight / 2);
			var yAxisArr = setYAxis(styles, options, data, max, min, graphAttr);
			var lastY = yAxisArr[yAxisArr.length - 1];
			var dataArrLength = dataArr.length;

			var pathGroup = [];

			for ( var i = 0; i < dataArrLength; i++ ) {
				pathGroup[i] = {};
				var x = startX;
				var path = '';
				var pathZeroY = '';
				var dataArrI = dataArr[i];
				var series = styles.series['s'+(i+1)];

				if ( series.use ) {
					for ( var j = 0; j < dataArrI.length; j++ ) {
						if ( series.way == 'up' || series.way == 'UP' ) {
							var y = zeroY - ((graphAttr.chartAreaHeight / 2) / lastY * dataArrI[j]);
						} else if ( series.way == 'down' || series.way == 'DOWN' ) {
							var y = zeroY + ((graphAttr.chartAreaHeight / 2) / lastY * dataArrI[j]);
						}
						if ( j != '0') {
							path += 'L' + x + ',' + y;
							pathZeroY += 'L' + x + ',' + zeroY;
						} else {
							path += 'M' + x + ',' + y;
							pathZeroY += 'M' + x + ',' + zeroY;
						}
						x += xInterval;
					}
					var areaPath = path +
								'L' + (x - xInterval) + ',' + zeroY +
								'L' + startX + ',' + zeroY;
					var areaPathZeroY = pathZeroY +
										'L' + (x - xInterval) + ',' + zeroY +
										'L' + startX + ',' + zeroY;

					pathGroup[i].areaPath = areaPath;
					pathGroup[i].areaPathZeroY = areaPathZeroY;
					pathGroup[i].linePath = path;
					pathGroup[i].linePathZeroY = pathZeroY;

				}
			}

			return pathGroup;
		}

		function getGradient ( color, direction ) {

			var fillcolor = null;

			if ( direction != undefined ) {
				if ( direction == 'horizontal' ) {
					fillcolor = '0-';
				} else if ( direction == 'vertical' ) {
					fillcolor = '90-';
				} else {
					fillcolor = 'r(0.5,0.5)';
				}
			} else {
				fillcolor = 'r(0.5,0.5)';
			}

			for( var j = 0, len = color.length; j < len; j++ ){

				var colorVal = color[j];
				fillcolor += colorVal[1] + ":" + colorVal[0] + '-';

			}

			fillcolor += '100';

			return fillcolor;
		}

		function setFillColorSrc (color) {

			var fillstyle = color;

			if ( fillstyle.hasOwnProperty('src')/* || fillstyle[0].hasOwnProperty('src')*/) {
				color = fillColorPattern(fillstyle);
			} else {
				color = fillstyle;
			}

			return color;
		}


		function setFillColor (series, options) {

			var color = null;
			var fillstyle = series.area.color;

			if ( fillstyle.hasOwnProperty('src') ) {
				color = fillColorPattern(fillstyle);
			} else {
				if ( typeof fillstyle == 'object' && series.area.gradient != undefined ) {
					color = getGradient(fillstyle, series.area.gradient.direction);
				} else {
					color = fillstyle;
				}

			}

			series.area.color = color;

			return color;
		}

		/* fill color 가 image (pattern) 일 경우 */

		function fillColorPattern (fillstyle) {

			var fillcolor = [];
			var fillstyleLength = fillstyle.length;

			if ( fillstyle.length == undefined ) {

				fillcolor.push(fillstyle.src);
			}

			for ( var i = 0; i < fillstyleLength; i++ ) {

				fillcolor.push(fillstyle[i].src);
			}

			var colorArr = [];

			for (var i = 0; i < fillcolor.length; i++) {

				var img = new Image();

				img.src = fillcolor[i];

				colorArr.push('url(' + img.src + ')');
			}

			return colorArr;
		}

		function drawTimeSliceItem ( styles, options, timeSliceData, yAxisGroup, graphAttr, timeSliceGroup, startIndex, svgElement ) {

			var dataLength = timeSliceData.length - 1;

			var xAxis = setXAxis(styles, options, timeSliceData, graphAttr);
			var coverElement = timeSliceGroup.coverGroup.cover;
			var coverYaxisGroup = timeSliceGroup.coverGroup.coverYAxisLine;
			var coverXaxisGroup = timeSliceGroup.coverGroup.coverXAxisLine;

			if ( styles.yAxis.line.underLine.use ) {
				var coverYaxisUnderGroup = timeSliceGroup.coverGroup.coverYAxisUnderLine;
			}
			if ( styles.xAxis.line.underLine.use ) {
				var coverXaxisUnderGroup = timeSliceGroup.coverGroup.coverXAxisUnderLine;
			}

			var coverX = coverElement[0].attr('x');
			var coverX2 = graphAttr.baseX2;

			var coverWidth = coverElement[0].attr('width');

			var xInterval = coverWidth / (dataLength - timeSliceGroup.aniCount);
			var coverYaxisGroupLength = coverYaxisGroup.length;
			var aniSpeed = options.timeSlice.animate.speed;

			if ( options.timeSlice.delay < aniSpeed + 20 ) {
				aniSpeed = options.timeSlice.delay - 20;
			}

			timeSliceGroup.animation = setInterval(function(){

				coverX += xInterval;
				coverWidth -= xInterval;

				if ( coverWidth < 0 ) {
					coverWidth = 0;
				}

				if ( elementType == 'SVG' && options.timeSlice.animate.use == true ) {

					coverElement[0].animate({
						x : coverX,
						width : coverWidth
					}, aniSpeed, options.timeSlice.animate.type)

					for ( var i = coverYaxisGroupLength; i--; ) {
						var path = 'M' + coverX + ',' + yAxisGroup[i].pointY + 'L' + coverX2 + ',' + yAxisGroup[i].pointY + 'Z';
						var underPath = 'M' + coverX + ',' + (yAxisGroup[i].pointY + 1) + 'L' + coverX2 + ',' + (yAxisGroup[i].pointY + 1) + 'Z';
						coverYaxisGroup[i].animate({
							path : path
						}, aniSpeed, options.timeSlice.animate.type)
						if ( styles.yAxis.line.underLine.use ) {
							coverYaxisUnderGroup[i].animate({
								path : underPath
							}, aniSpeed, options.timeSlice.animate.type)
						}
					}
				} else {

					coverElement[0].attr({
						x : coverX,
						width : coverWidth
					})

					for ( var i = coverYaxisGroupLength; i--; ) {
						var path = 'M' + coverX + ',' + yAxisGroup[i].pointY + 'L' + coverX2 + ',' + yAxisGroup[i].pointY + 'Z';
						var underPath = 'M' + coverX + ',' + (yAxisGroup[i].pointY + 1) + 'L' + coverX2 + ',' + (yAxisGroup[i].pointY + 1) + 'Z';
						coverYaxisGroup[i].attr({
							path : path
						})
						if ( styles.yAxis.line.underLine.use ) {
							coverYaxisUnderGroup[i].attr({
								path : underPath
							})
						}
					}
				}

				if ( timeSliceGroup.aniCount % xAxis == 0 ) {
					var step = timeSliceGroup.aniCount / xAxis;
					if ( styles.xAxis.line.use ) {
						coverXaxisGroup[step].remove();
						if ( styles.xAxis.line.underLine.use) {
							coverXaxisUnderGroup[step].remove();
						}
					}
				}

				options.timeSlice.slider.slider({
		            values: [ startIndex, startIndex + timeSliceGroup.aniCount + 1]
		        });

		        eval(options.timeSlice.data)(timeSliceData[0], timeSliceData[1 + timeSliceGroup.aniCount]);

				timeSliceGroup.aniCount += 1;
				if ( timeSliceGroup.aniCount == dataLength) {

					svgElement.endTimeSlice("disabled");

					setTimeout(function () {
						timeSliceGroup.coverGroup.cover.remove();
						if ( styles.xAxis.line.use ) {
							timeSliceGroup.coverGroup.coverXAxisLine.remove();
						}
						timeSliceGroup.coverGroup.coverYAxisLine.remove();
						if ( styles.yAxis.line.underLine.use ) {
							timeSliceGroup.coverGroup.coverYAxisUnderLine.remove();
						}
						if ( styles.xAxis.line.underLine.use ) {
							timeSliceGroup.coverGroup.coverXAxisUnderLine.remove();
						}
						timeSliceGroup.coverGroup = null;
						timeSliceGroup.playCheck = false;

					}, options.timeSlice.delay)
				}
			}, options.timeSlice.delay);

			return timeSliceGroup;
		}

		function getgraphAttr ( styles, horizon ) {

			var graph = {};

			graph.baseX = styles.layout.paddingLeft + styles.yAxis.width + styles.yAxis.paddingRight + styles.yAxis.paddingLeft - lineError;
			graph.baseY = styles.layout.paddingTop - lineError;
			graph.baseWidth = horizon.width() - graph.baseX - styles.layout.paddingRight - lineError;
			graph.baseHeight = horizon.height() - graph.baseY - styles.layout.paddingBottom - styles.xAxis.paddingTop - styles.xAxis.height - lineError;
			graph.baseX2 = graph.baseX + graph.baseWidth;
			graph.baseY2 = graph.baseY + graph.baseHeight;

			graph.chartAreaX = graph.baseX + styles.graph.paddingLeft - lineError;
			graph.chartAreaY = graph.baseY + styles.graph.paddingTop - lineError;
			graph.chartAreaWidth = graph.baseWidth - styles.graph.paddingLeft - styles.graph.paddingRight - lineError;
			graph.chartAreaHeight = graph.baseHeight - styles.graph.paddingTop - styles.graph.paddingBottom - lineError;
			graph.chartAreaX2 = graph.chartAreaX + graph.chartAreaWidth;
			graph.chartAreaY2 = graph.chartAreaY + graph.chartAreaHeight;

			return graph;
		}


		function drawCover ( styles, surroundHorizon, yAxisLine, xAxisLine, graphAttr, yAxisUnderLine, xAxisUnderLine ) {
			var coverGroup = {};
			var coverX = graphAttr.chartAreaX;
			var coverY = graphAttr.baseY + 1;
			var coverWidth = graphAttr.baseWidth - styles.graph.paddingLeft - styles.graph.paddingRight - 1;
			var coverHeight = graphAttr.baseHeight - 2;

			coverGroup.cover = surroundHorizon.clone();
			if ( styles.yAxis.line.underLine.use ) {
				coverGroup.coverYAxisUnderLine = yAxisUnderLine.clone();
			}
			if ( styles.xAxis.line.underLine.use ) {
				coverGroup.coverXAxisUnderLine = xAxisUnderLine.clone();
			}
			coverGroup.coverYAxisLine = yAxisLine.clone();

			if ( styles.xAxis.line.use ) {
				coverGroup.coverXAxisLine = xAxisLine.clone();
			}

			if ( elementType !== 'SVG' ) {

				coverX = coverX - 2;
				coverWidth = coverWidth + 3;
			}

			coverGroup.cover.attr({
				x : coverX,
				y : coverY,
				width : coverWidth + 1,
				height : coverHeight,
				stroke : ''
			})

			return coverGroup;
		}


		function drawItem ( styles, options, data, svgElement, pathGroup ) {

			var itemGroup = [];

			for ( var i = 0; i < pathGroup.length; i++ ) {

				itemGroup[i] = {};

				var series = styles.series['s'+(i+1)];

				if (series.use) {

					var areaItem = svgElement.path();
					var strokePathElement = svgElement.path();

					setFillColor(series, options);

					areaItem.attr({
						path : pathGroup[i].areaPathZeroY,
						'stroke-width' : 0,
						fill : series.area.color,
						opacity : series.area.opacity
					})

					if ( elementType != 'SVG' ) {
						areaItem.attr({
							'fill-opacity' : 1
						})
					}

					strokePathElement.attr({
						path : pathGroup[i].linePathZeroY,
						stroke : series.line.color,
						'stroke-width' : series.line.width,
						opacity : series.line.opacity
					})

					if ( series.animate.use == true && elementType == 'SVG' ) {
						areaItem.animate({
							path : pathGroup[i].areaPath
						}, series.animate.speed, series.animate.type);
						strokePathElement.animate({
							path : pathGroup[i].linePath
						}, series.animate.speed, series.animate.type);
					} else {
						areaItem.attr({
							path : pathGroup[i].areaPath
						})
						strokePathElement.attr({
							path : pathGroup[i].linePath
						})
					}

					itemGroup[i].area = areaItem;
					itemGroup[i].line = strokePathElement;
				}
			}

			setTimeout(function () {

				svgElement.event.trigger('drawCompleted', [svgElement]);

			}, series.animate.speed + 100);

			return itemGroup;
		}

		function setItemGroupPath ( pathGroup, itemGroup ) {

			for ( var i = 0; i < itemGroup.length; i++ ) {
				itemGroup[i].area.attr({
					path : pathGroup[i].areaPath
				});
				itemGroup[i].line.attr({
					path : pathGroup[i].linePath
				});

				itemGroup[i].area.toFront();
				itemGroup[i].line.toFront();
			}
		}

		function getTimeSliceData ( first, end, data ) {

			var timeSliceData = [];

			for ( var i = first; i <= end; i++ ) {
				timeSliceData.push(data[i]);
			}

			return timeSliceData;
		}

		function getMousePosition (e, _this){
			var m = {};
			e = e || window.event;
		    var TYPE = elementType;
		    if(TYPE === 'VML'){
		    	var offset = $(_this).offset();
				m.x = e.pageX-offset.left;
				m.y = e.pageY-offset.top;
			} else {
			    var appName = navigator.appName.toLowerCase();
			    var userAgent = navigator.userAgent.toLowerCase();
				if(userAgent.indexOf('firefox') > -1 ){ // FireFox
					if(e.layoutX != undefined){
						m.x = Math.round(e.layerX);
						m.y = Math.round(e.layerY);
					} else {
						m.x = e.originalEvent.layerX;
						m.y = e.originalEvent.layerY;
					}
				} else if(appName === 'opera'){ // Opera
			    	var target = e.target || e.srcElement,
			    		rect = target.getBoundingClientRect(),
			    		parent = target.parentNode,
			    		parentRect = parent.getBoundingClientRect()

			    	m.x = e.offsetX + rect.left - parentRect.left, m.y = e.offsetY + rect.top - parentRect.top;
			    } else { // ETc
					m.x = Math.round(e.offsetX), m.y = Math.round(e.offsetY);
			    }
		    }
			return m;
		};

		// function getMousePosition ( e, horizon ) {

		// 	var position = {};

		// 	position.x = 0;
		// 	position.y = 0;

		// 	if (!e) {
		// 		var e = window.event;
		// 	}
		// 	if ( e.pageX || e.pageY )  {
		// 		position.x = e.pageX - horizon[0].offsetLeft;
		// 		position.y = e.pageY - horizon[0].offsetTop;
		// 	} else if (e.clientX || e.clientY)  {
		// 		position.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - horizon[0].offsetLeft;
		// 		position.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - horizon[0].offsetTop;
		// 	}
		// 	return position;

		// }

		function appendTip ( styles, options ) {

			var tip = $('<div>');

			if (options.toolTip.className == null) {

				tip.css({
					"background": "#465866",
					"color": "#fff",
					"padding": "5px 10px",
					"border": "1px solid #fff",
					"border-radius": "2px"
				});

			} else {

				tip.attr('class', options.toolTip.className);
			}

			tip.css({
				'position' : "absolute",
				'white-space': 'nowrap',
				'z-index': 100000
			});

			tip.hide();

			return tip;
		}

		function drawVerticalLine ( svgElement, styles ) {

			var line = svgElement.path();

			line.attr({
				stroke : styles.color,
				'stroke-dasharray': styles.type,
				'stroke-width': styles.width,
				'stroke-opacity': styles.opacity
			})

			return line;
		}

		function mouseEvent ( svgElement, styles, options, horizon, graphAttr, timeSliceData, itemGroup, tip ) {

			var baseY = graphAttr.baseY;
			var baseY2 = graphAttr.baseY2;
			var baseX = graphAttr.baseX;
			var baseX2 = graphAttr.baseX2;
			var chartAreaX = graphAttr.chartAreaX;
			var chartAreaX2 = graphAttr.chartAreaX2;
			var chartAreaWidth = graphAttr.chartAreaWidth;
			var tipOffsetY = options.toolTip.position.y;
			var tipOffsetX = options.toolTip.position.x;
			var tipPaddingX = parseInt(tip.css('padding-left' ), 10) + parseInt(tip.css('padding-right'), 10);
			var tipPaddingY = parseInt(tip.css('padding-top' ), 10) + parseInt(tip.css('padding-bottom'), 10);
			var tipWidth = tip.width() + tipPaddingX;
			var verticalOpacity = styles.verticalLine.opacity;
			var horizonOpacity = styles.horizonLine.opacity;
			if ( styles.verticalLine.use ) {
				var verticalLine = drawVerticalLine(svgElement, styles.verticalLine);
			}
			if ( styles.horizonLine.use ) {
				var horizonLine = drawVerticalLine(svgElement, styles.horizonLine);
			}

			horizon.mousemove(function (e) {

				// var evt = window.event || e;

				var mousePosition = getMousePosition(e, this);

				var left = mousePosition.x;
				var top = mousePosition.y;
				var tipX = left + tipOffsetX;
				var tipY = top + tipOffsetY;
				var verticalX = left - lineError;
				var verticalY = top - lineError;

				timeSliceData = svgElement.getTimeSliceData();

				if ( mousePosition.x > chartAreaX && mousePosition.x < chartAreaX2 && mousePosition.y > baseY && mousePosition.y < baseY2) {

					var xInterval = chartAreaWidth / (timeSliceData.length - 1 );
					var mouseX = mousePosition.x - chartAreaX;
					var index = Math.round(mouseX / xInterval);

					tipWidth = tip.width() + tipPaddingX;

					if ( tipX + tipWidth > baseX2 ) {
						tipX = baseX2 - tipWidth;
					}
					if ( tipY + tip.height() + tipPaddingY > baseY2 ) {
						tipY = baseY2 - tip.height() - tipPaddingY;
					}

					if ( options.toolTip.use ) {

						if (options.toolTip.func != null) {

							eval(options.toolTip.func)(timeSliceData[index], tip, options);

						} else {

							var data = timeSliceData[index];

							var date = '<div class="tip_date">'+ dayDataFormatDot(data[options.xAxis.select]) + '</div>';

							var yAxisSeriesData = "";

							var seriesCount = 1;

							for (var key in styles.series) {

								if (styles.series[key].use) {

									var seriesOption = options.yAxis.select[key];
									var seriesData = '<span>시리즈' + seriesCount + ' : ' + data[seriesOption] +'</span><br />';

									yAxisSeriesData = yAxisSeriesData + seriesData;
								}

								seriesCount ++;
							}

	                        var tipElement = '<div class="tip_data">'+ yAxisSeriesData + '</div>';

	                        tip.html(date + tipElement);
						}

						tip.css({
							left : tipX,
							top : tipY
						});

						tip.show();
					}

					if ( styles.verticalLine.use ) {
						verticalLine.attr({
							path : 'M' + verticalX + ',' + baseY + 'L' + verticalX + ',' + baseY2 + 'Z',
							opacity : verticalOpacity
						})
						verticalLine.toFront();
					}

					if ( styles.horizonLine.use ) {
						horizonLine.attr({
							path : 'M' + baseX + ',' + verticalY + 'L' + baseX2 + ',' + verticalY + 'Z',
							opacity : horizonOpacity
						})
						horizonLine.toFront();
					}

				} else {

					if ( options.toolTip.use ) {
						tip.hide();
					}
					if ( styles.verticalLine.use ) {
						verticalLine.attr({
							opacity : 0
						})
					}
					if ( styles.horizonLine.use ) {
						horizonLine.attr({
							opacity : 0
						})
					}
				}
			})

			return tip;

		}

		function drawYaxisUnderLine ( styles, yAxisLine, graphAttr ) {

	        var cloneYAxisGroup = yAxisLine.clone();

	        cloneYAxisGroup.attr({
	    		stroke: styles.yAxis.line.underLine.color,
	    		'stroke-width': styles.yAxis.line.underLine.width,
	    		'stroke-opacity': styles.yAxis.line.underLine.opacity
	    	})
	        for ( var i = yAxisLine.length; i--; ) {

	        	var path = cloneYAxisGroup[i].attr('path');

	        	if ( elementType == 'SVG' ) {
	        		path[0][2] = path[0][2] + 1;
	        		path[1][2] = path[1][2] + 1;
	        	} else {
	        		var path1 = new Array();
	        		var path1 = path.split(',');

	        		path1[1] = Number(path1[1]) + 1;
	        		path1[3] = Number(path1[3]) + 1;
	        		path = path1;
	        	}
	        	cloneYAxisGroup[i].attr({
	        		path : path
	        	})
	        }
	    	if ( cloneYAxisGroup[0].attr('path')[0][2] >= graphAttr.baseY2) {
		    	cloneYAxisGroup[0].attr({
		    		'stroke-width' : 0
		    	})
	    	}
	        yAxisLine.toFront();

	        return cloneYAxisGroup;
		}

		function drawXaxisUnderLine ( styles, xAxisLine, yAxisLine ) {

	        var cloneXAxisGroup = xAxisLine.clone();

	        cloneXAxisGroup.attr({
	    		stroke: styles.xAxis.line.underLine.color,
	    		'stroke-width': styles.xAxis.line.underLine.width,
	    		'stroke-opacity': styles.xAxis.line.underLine.opacity
	    	})

	    	for ( var i = xAxisLine.length; i--; ) {

	        	var path = cloneXAxisGroup[i].attr('path');

	        	if ( elementType == 'SVG' ) {
	        		path[0][1] = path[0][1] + 1;
	        		path[1][1] = path[1][1] + 1;
	        	} else {
	        		var path1 = new Array();
	        		var path1 = path.split(',');
	        		var num = Number(path1[0].substring( 1 )) + 1;

	        		path1[0] = 'M' + num;
	        		path1[2] = Number(path1[2]) + 1;

	        		path = path1;
	        	}
	        	cloneXAxisGroup[i].attr({
	        		path : path
	        	})
	        }
	    	if ( xAxisLine[0].attr('stroke-width') == 0 ) {
	    		cloneXAxisGroup[0].attr({
	    			'stroke-width' : 0
	    		})
	    	}
	        xAxisLine.toFront();
	        yAxisLine.toFront();

	        return cloneXAxisGroup;
		}

		function getMaxData ( data, options ) {

			var max = 0;

			var yaxisKeyLen = objectKeyLength;

			for ( var i = data.length; i--; ) {

				for ( var key in options.yAxis.select ) {

					var yaxisKey = options.yAxis.select[key];

					var _data = Number(data[i][yaxisKey]);

					if ( max < _data ) {
						max = _data;
					}

				}
			}

			return max;
		}

		function getMinData ( data, options ) {

			var min = 0;

			// var min = Number(data[0][options.yAxis.select.s1]);

			// var yaxisKeyLen = Object.keys(options.yAxis.select).length;

			// for ( var i = data.length; i--; ) {

			// 	for ( var key in options.yAxis.select ) {

			// 		var yaxisKey = options.yAxis.select[key];

			// 		var _data = Number(data[i][yaxisKey]);

			// 		if ( min > _data ) {
			// 			min = _data;
			// 		}

			// 	}
			// }

			return min;
		}

		var objectKeyLength = 0;

		function getObjectKeyLength ( _object ) {

			if ( elementType == 'SVG' ) {

				objectKeyLength = Object.keys(_object).length;

			} else {

				var i = 0;

				for ( var key in _object ) {
					i++;
				}

				objectKeyLength = i;
			}

			return objectKeyLength;
		}

		function sortData ( data, options ) {

			if ( options.data.reverse ) {

				data = data.reverse();

			}

			return data;
		}

		function getUniqueID () {

			return Math.random().toString(36).substr(2, 9);
		};

		function reSize ( styles, options, horizon, svgElement ) {

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

			/**
			 * horizon chart 의 resize 이벤트
			 */
			if (horizon.data('resizeEventName')) {

				$(window).off(horizon.data('resizeEventName'));
			}

			var wrapperUniqueId = getUniqueID();

			horizon.data('resizeEventName', 'resize.' + wrapperUniqueId);

			var beforeWrapperWidth = horizon.width();

			$(window).on(horizon.data('resizeEventName'), function (e) {

				var afterWrapperWidth = horizon.width();

				if (beforeWrapperWidth !== afterWrapperWidth) {

					if (options.resize.use) {

						waitForFinalEvent(function() {

							horizon.children().remove();

							svgElement.endTimeSlice("disabled");

							self.init(horizon, styles, options);

						}, 500, "some unique string");
					}
				}
			});
		}


		function noData (svgElement, horizon) {

			var x = horizon.width() / 2;
			var y = horizon.height() / 2;

			var text = svgElement.text(x,y,'데이터가 로드되지 않았습니다.');

			text.attr({
				'font-family': 'dotum',
				'font-size': 12,
				fill: '#000'
			});

		};

		self.init = function (horizon, style, option) {

			horizon.css({
				'position' : "relative"
			})

			/* styles extend */

			var styles = extendStyles(style);

			// url에 hash - #exportPDF를 붙이면 애니메이션이 동작하지 않는다.
			if (window.location.hash && window.location.hash.slice(1) === "skipAnimation") {

				$.each(styles.series, function (key, value) {

					value.animate.use = false;
				});
			}

			var graphAttr = getgraphAttr(styles, horizon);

			/* option extend */

			var options = extendOptions(option);

			getObjectKeyLength(options.yAxis.select);

			/* svg element 생성 */

			var svgElement = drawSvg(horizon, styles);

			svgElement.event = $({});

			svgElement.event.on('drawCompleted', function () {

				horizon.trigger('drawCompleted');
			});

			/* data extend */

			var data = loadData(options);

			 if ( data === 'error' || data.length <= 0) {
			 	noData(svgElement, horizon);

			 }else{
                 data = sortData(data, options);

                 // data = parseMaxMinData(data, styles, options);

                 max = getMaxData(data, options);
                 min = getMinData(data, options);

                 // data = setDataFormat(data, options);

                 var surroundHorizon = drawSurroundHorizon(styles, options, svgElement, graphAttr);

				 /* horizon 이 그려지는 영역 */
                 var horizonArea = drawHorizonArea(styles, options, svgElement, graphAttr);

				 /* y 축 그리기 */
                 var yAxisLine = drawYaxisLine(styles, options, data, svgElement, graphAttr);

				 /* y 축 under line 그리기 */
                 if ( styles.yAxis.line.underLine.use ) {

                     var yAxisUnderLine = drawYaxisUnderLine(styles, yAxisLine, graphAttr);

                 }

				 /* y 축 tip 그리기 */
                 if ( styles.yAxis.tick.use ) {
                     var yAxisTick = drawYaxisTick(styles, svgElement, yAxisLine, graphAttr);
                 }

				 /* y 축 text 그리기 */
                 var yAxisTextGroup = drawYaxisText(styles, options, data, svgElement, graphAttr);

				 /* x 축 그리기 */
                 var xAxisLine = null;

                 if ( styles.xAxis.line.use ) {
                     xAxisLine = drawXaxisLine(styles, options, data, svgElement, graphAttr);
                 }

				 /* x 축 under line 그리기 */
                 if ( styles.xAxis.line.underLine.use ) {

                     var xAxisUnderLine = drawXaxisUnderLine(styles, xAxisLine, yAxisLine);

                 }

				 /* x 축 text 그리기 */
                 var xAxisTextGroup = drawXaxisText(styles, options, data, svgElement, xAxisLine, graphAttr);

                 var pathGroup = getPath(styles, options, data, svgElement, yAxisLine, graphAttr);

                 var itemGroup = drawItem(styles, options, data, svgElement, pathGroup);

				 /* resize event */
                 reSize(styles, options, horizon, svgElement);

                 var timeSliceData = data;

                 var tip = appendTip(styles, options);

                 tip.appendTo(horizon);

                 mouseEvent(svgElement, styles, options, horizon, graphAttr, timeSliceData, itemGroup, tip);

                 if(!styles.hasOwnProperty('complete')){
                     styles.isComplete = 'complete';
                 }



			 }

            svgElement.getTimeSliceData = function () {
                return timeSliceData;
            }

            svgElement.drawYAxisLine = function () {
                yAxisLine = drawYaxisLine(styles, options, data, svgElement, graphAttr);
            }

            svgElement.getYAxisLine = function () {
                return yAxisLine;
            }

            svgElement.drawYAxisUnderLine = function () {
                yAxisUnderLine = drawYaxisUnderLine(styles, yAxisLine, graphAttr);
            }

            svgElement.getYAxisUnderLine = function () {
                return yAxisUnderLine;
            }

            svgElement.drawYAxisText = function () {
                yAxisTextGroup = drawYaxisText(styles, options, data, svgElement, graphAttr);
            }

            svgElement.getYAxisText = function () {
                return yAxisTextGroup;
            }

            svgElement.drawYAxisTick = function () {
                yAxisTick = drawYaxisTick(styles, svgElement, yAxisLine, graphAttr);
            }

            svgElement.getYAxisTick = function () {
                return yAxisTick;
            }

            svgElement.drawXAxisLine = function (data) {
                xAxisLine = drawXaxisLine(styles, options, data, svgElement, graphAttr);
            }

            svgElement.getXAxisLine = function () {
                return xAxisLine;
            }

            svgElement.drawXAxisUnderLine = function () {
                xAxisUnderLine = drawXaxisUnderLine(styles, xAxisLine, yAxisLine);
            }

            svgElement.getXAxisUnderLine = function () {
                return xAxisUnderLine;
            }

            svgElement.drawXAxisText = function (data) {
                xAxisTextGroup = drawXaxisText(styles, options, data, svgElement, xAxisLine, graphAttr);
            }

            svgElement.getXAxisText = function () {
                return xAxisTextGroup;
            }

            svgElement.getPathGroup = function ( data ) {
                pathGroup = getPath(styles, options, data, svgElement, yAxisLine, graphAttr);
            }

            svgElement.drawItem = function (data) {
                itemGroup = drawItem(styles, options, data, svgElement, pathGroup);
            }

            svgElement.getItem = function () {
                return itemGroup;
            }

            svgElement.setItemGroup = function (pathGroup) {
                setItemGroupPath(pathGroup, itemGroup);
            }

            svgElement.timeSliceGroup = {};

            svgElement.timeSliceGroup.aniCount = 0;
            svgElement.timeSliceGroup.coverGroup = null;
            svgElement.timeSliceGroup.playCheck = false;

            svgElement.startTimeSlice = function (timeSliceData, startIndex) {

                if ( svgElement.timeSliceGroup.coverGroup == null ) {

                    svgElement.timeSliceGroup.aniCount = 0;

                    svgElement.timeSliceGroup.coverGroup = drawCover(styles, surroundHorizon, yAxisLine, xAxisLine, graphAttr, yAxisUnderLine, xAxisUnderLine);

                }

                svgElement.timeSliceGroup = drawTimeSliceItem(styles, options, timeSliceData, yAxisLine, graphAttr, svgElement.timeSliceGroup, startIndex, svgElement);

            }

            svgElement.endTimeSlice = function (disabled) {

                if (disabled === "disabled") {

                    if (options.timeSlice.use) {

                        options.timeSlice.slider.slider('option', {disabled: false});
                    }
                }

                clearInterval(svgElement.timeSliceGroup.animation);
            }

            svgElement.timeSlice = function ( timeSliceData ) {

                if ( styles.xAxis.line.use ) {
                    xAxisLine.remove();
                }

                if ( styles.xAxis.line.underLine.use ) {
                    xAxisUnderLine.remove();
                }
                xAxisTextGroup.remove();

                if ( styles.xAxis.line.use ) {
                    svgElement.drawXAxisLine(timeSliceData);
                }

                if ( styles.xAxis.line.underLine.use ) {
                    svgElement.drawXAxisUnderLine(timeSliceData);
                }
                svgElement.drawXAxisText(timeSliceData);
                svgElement.getPathGroup(timeSliceData);
                svgElement.setItemGroup(pathGroup);


                svgElement.endTimeSlice();
            }

			svgElement.inquery = function( _options ) {

				svgElement.endTimeSlice("disabled");

				setTimeout(function () {

					options = $.extend(true, options, _options);

					horizon.children().remove();
					options.timeSlice.play.unbind('click');
					options.timeSlice.pause.unbind('click');
					options.timeSlice.stop.unbind('click');
					options.timeSlice.slider.unbind('click');

					self.init(horizon, styles, options);

				},100);

			};

			svgElement.resize = function () {

				horizon.children().remove();

				svgElement.endTimeSlice("disabled");

				self.init(horizon, styles, options);
			}

            svgElement.reDraw = function(style, option, redraw) {
                if(style !== undefined ){
                    styles = extendStyles(style);
                }
                if(option !== undefined ){
                    options = extendOptions(option);
                    options.data.data = loadData(options);
                }
                if(redraw !== false){
                    horizon.children().remove();
                    self.init($(horizon), styles, options);
                }
            }

			if (TRIAL_UI) {

				appendTrialUi(horizon);
			}

			/**
				license object chart 에 추가(ver.150915 평다진)
			*/
			svgElement.license = licenseObject;

			/**
			 * wrapper(jQuery selector)에 저장(ver. 160318 평다진)
			 */
			horizon[0].instance = svgElement;

			return svgElement;
		};

		if (!window.webponent){
			window.webponent = {};
		}
		if (!window.webponent.visual) {
			window.webponent.visual = {};
		}

		window.webponent.visual.horizon = self;

	 })();


})();


