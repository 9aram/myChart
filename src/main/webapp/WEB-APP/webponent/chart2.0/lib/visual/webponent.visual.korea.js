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


		/* default styles */

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
					}
				},
				korea : {
		            position : {
		                x : 0,
		                y : 0
		            },
		            scale : 1,
		            line : {
		                color : '#fff',
		                width : 2
		            },
		            area : {
		                color : [
	                        '#fceb96', '#ffde59', '#ffc259', '#ff9632',
	                        '#fe753d', '#f45346', '#e63b3b'
	                    ]
		            },
		            hover : {
		                use : true,
		                area : {
		                    color : '#9d9c9c'
		                }
		            }
		        },
		        marker : {
		            use : false,
		            image : {
		                src: '../img/marker3.png'
		            },
		            width : 30,
		            height : 30
		        },
		        sea : {
		            west : {
		                position : {
		                    x : 75,
		                    y : 300
		                },
		                text : {
		                    value : 'West sea',
		                    family: 'Nanum Gothic',
		                    size: 15,
		                    color: '#666666',
		                    align: 'center',    /* left | center | right */
		                    style: 'normal',    /* normal | italic */
		                    weight: 'bold', /* normal | bold */
		                    opacity: 1
		                }
		            },
		            east : {
		               position : {
		                    x : 510,
		                    y : 300
		                },
		                text : {
		                    value : 'East sea',
		                    family: 'Nanum Gothic',
		                    size: 15,
		                    color: '#666666',
		                    align: 'center',    /* left | center | right */
		                    style: 'normal',    /* normal | italic */
		                    weight: 'bold', /* normal | bold */
		                    opacity: 1
		                }
		            },
		            south : {
		               position : {
		                    x : 280,
		                    y : 530
		                },
		                text : {
		                    value : 'South sea',
		                    family: 'Nanum Gothic',
		                    size: 15,
		                    color: '#666666',
		                    align: 'center',    /* left | center | right */
		                    style: 'normal',    /* normal | italic */
		                    weight: 'bold', /* normal | bold */
		                    opacity: 1
		                }
		            }
		        }
		    };

		    return defaultStyles;
		}

	    /* styles extend */

		function extendStyles (style) {

			var defaultStyles = getDefaultStyles();

			var styles = $.extend(true, defaultStyles, style);

			if(elementType === 'VML') {

				styles.sea.west.text.family = 'Dotum';
				styles.sea.east.text.family = 'Dotum';
				styles.sea.south.text.family = 'Dotum';
			}

			return styles;
		}

		function getDefaultOptions () {

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
				local : {
					step : null
				},
		        toolTip : {
		        	use : {
		        		marker : false,
		        		local : false
		        	},
		        	className : null,
		        	position : {
		        		x : 0,
		        		y : 0
		        	},
		        	func : null
		        },
		        timeSlice : {
		            use : false,
		            delay : 500,
		            slider : null,
		            play : null,
		            pause : null,
		            stop : null,
		            data : function (data) {

		            }
		        },
		        loadingBar : {
		            use : false,
		            select : null
		        },
		        resize : {
		        	use : false,
		        	loadingBar : {
		        		use : false
		        	}
		        }
			};

			return defaultOptions;
		}

		/* options extend */

		function extendOptions (option) {

			var defaultOptions = getDefaultOptions();

			var option = $.extend(true, defaultOptions, option);

			return option;
		}

		var elementType = getSvgType();

		/* get svg type */

		function getSvgType () {

			var g = {doc: document, win: window};

			var elementType = (g.win.SVGAngle || g.doc.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') ? 'SVG' : 'VML');

			return elementType;
		}

		var lineError = getLineError();

		function getLineError () {

			var lineError = 0;

			if ( elementType == 'SVG' ) {
				lineError = 0.5;
			}

			return lineError;
		}

		/* load data */

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
         * 데이터가 load 되지 않았을 경우
         * @param  {korea} korea 객체
         */
        function noData (korea, svgElement) {

            var x = korea.width() / 2;
            var y = korea.height() / 2;
            var text = svgElement.text(x, y, '데이터가 로드되지 않았습니다.');

            text.attr({
                'font-family': 'dotum',
                'font-size': 12,
                fill: '#000'
            });
        }


        /**
		 * 데이터에 ',' 가 있을 경우 제거한다.
		 * @param  {pie} pie 객체
		 */
		function removeComma (data, options) {

			var use = options.data.use;
			var dataLen = data.length;

			for (var i = 0; i < dataLen; i++) {

				var dataI = data[i];

				if (typeof dataI[use] == 'string') {

					dataI[use] = Number(dataI[use].split(',').join(''));

				} else {

					dataI[use] = Number(dataI[use]);
				}
			}

			return data;
		}


		/* time slice data set */

		function setTimeSlice (data, option) {

			var gubunDataArr = new Array();

			gubunDataArr[0] = new Array();

			var arrIndex = 0;
			var index = 0;
			var dataLength = data.length;
			var gubunDataArrLength = gubunDataArr.length;

			gubunDataArr[0][0] = data[0];

			for (var i = 1; i < dataLength; i ++ ){

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

			for ( var i = 0; i < gubunDataArrLength; i++ ) {

				gubunDataArr[i] = setData(gubunDataArr[i], option);

			}

			return gubunDataArr;
		}


		/* options.data.gubunOption 에 값을 설정하였을 경우 */

		function setGubunOption (data, options) {

			var dataGubun = [];
			var dataLength = data.length;

			for ( var i = 0; i < dataLength; i++ ) {

				if (data[i][options.data.gubun] == options.data.gubunOption ) {
					dataGubun.push(data[i]);
				}
			}


			return dataGubun;
		}



		/* get data total */

		function getDataTotal (data) {

			var dataTotal = 0;
			var dataLength = data.length;

			for ( var i = 0; i < dataLength; i++ ) {
				dataTotal += data[i].value;
			}

			for ( var i = 0; i < dataLength; i++ ) {
				data[i].dataTotal = dataTotal;
			}
		}

		function loadBlock (options) {

			var dataTotal = 0;
			var data = options.data.data;

			return data;
		}

		/* data type - json */

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

			if (options.data.use != undefined && options.data.use != null && options.data.use != "") {

				var arrLength = arr.length;

				for ( var i = 0; i < arrLength; i++) {
					dataTotal += Number(arr[i][options.data.use]);
				}
			}*/

			return arr;
		}

		/* data type - text */

		function loadText (data2, options) {

			var arr = [];
			var data = data2;
			var lineArr = data.split('\n');
			var dataTitles = [];
			var titleCheck = true;
			var dataTotal = 0;
			var lineArrLength = lineArr.length;

			for ( var i = 0; i < lineArrLength; i++) {
				if (lineArr.length <= 1){
					continue;
				}
				var objArr = lineArr[i].split('|');
				if (lineArr[i].indexOf("companyname") > -1 || objArr.length <= 1) {
				} else {
					if (titleCheck) {
						var objArrLength = objArr.length;
						for ( var j = objArrLength; j--;) {
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
							if (dataTitles[j] == options.data.use) {
								dataTotal += Number(item);
							}
						});
						arr.push(obj);
					}
				}
			}
			return arr;
		}

		/* data set */

		function setData (data, options) {

			var dataLength = data.length;

			for ( var i = 0; i < dataLength; i++ ) {

				if ( options.legend != undefined ) {

	 				data[i].legend = options.legend[i];
				}

				data[i].value = Number(data[i][options.data.use]);

			}

			return data;
		}

		var trim = function(str) {
			str = str.replace(/(^\s*)|(\s*$)/gi, "");
			return str;
		};

		// Number Format 1,000
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


		function appendDataElement ( options, data, kG, mG ) {

			var dLen = data.length;
			var kGLen = kG.length;
			var locOp = options.data.localOption;

			for ( var i = dLen; i--; ) {
				for ( var j = kGLen; j--; ) {
					if ( data[i][locOp] == kG[j].localName || data[i][locOp] == kG[j].localName2 ) {
						kG[j].data = data[i];
						if ( mG != undefined ) {
							mG[j].data = data[i];
						}
					}
				}
			}
		}

		function getMinData (koreaGroup, options) {

			var koreaGroupLen = koreaGroup.length;
			var use = options.data.use;
			var dataArray = [];

			for (var i = 0; i < koreaGroupLen; i++) {

				if (koreaGroup[i].data[options.data.use]) {

					dataArray.push(Number(koreaGroup[i].data[options.data.use]));
				}
			}

			var minData = Math.min.apply(Math, dataArray);

			return minData;
		}

		function getMaxData (koreaGroup, options) {

			var koreaGroupLen = koreaGroup.length;
			var use = options.data.use;
			var dataArray = [];

			for (var i = 0; i < koreaGroupLen; i++) {

				if (koreaGroup[i].data[options.data.use]) {

					dataArray.push(Number(koreaGroup[i].data[options.data.use]));
				}
			}

			var maxData = Math.max.apply(Math, dataArray);

			return maxData;
		}

		function basicStepOption ( koreaGroup, color, options ) {

			var minData = getMinData(koreaGroup, options);
			var maxData = getMaxData(koreaGroup, options);
			var dataArr = (maxData - minData) / (color.length - 1);
			var koreaGroupLength = koreaGroup.length;
			var colorArr = [];

			for (var i = 0; i < koreaGroupLength; i++) {

				if (koreaGroup[i].data[options.data.use]) {

					var dataDiv = Math.floor(koreaGroup[i].data[options.data.use] / dataArr);

					if (dataArr == 0) {

						dataDiv = color.length - 1;
					}

					colorArr[i] = color[dataDiv];
				}
			}

			return colorArr;
		}

		function useStepOption (koreaGroup, color, options) {

			var stepArr = options.local.step;
			var koreaGroupLen = koreaGroup.length;
			var stepLength = stepArr.length;
			var colorArr = [];
			var colorLength = color.length - 1;
			var use = options.data.use;

			for (var i = 0; i < koreaGroupLen; i++) {

				var koreaUseData = koreaGroup[i].data[use];

				for (var j = 0; j < stepLength - 1; j++) {

					var stepArrJ = Number(stepArr[j]);
					var stepArrJ1 = Number(stepArr[j + 1]);

					if (stepArrJ <= koreaUseData && koreaUseData < stepArrJ1) {

						colorArr[i] = color[j];
					}
				}
			}

			return colorArr;
		}


		function getMarkerGroup ( koreaGroup, svgElement, styles ) {

			/* marker group 지정 */

			var markerGroup = svgElement.set();

			var markerImage = styles.marker.image.src;
			var koreaGroupLength = koreaGroup.length;

			for ( var i = 0; i < koreaGroupLength; i++ ) {

				var img = svgElement.image(markerImage, 0, 0, 0, 0);

				img.localName = koreaGroup[i].localName;
				img.localName2 = koreaGroup[i].localName2;
				img.attr({
					width : styles.marker.width,
					height : styles.marker.height
				});
				koreaGroup[i].marker = img;
				markerGroup.push(img);
			}

			drawMarker(markerGroup, styles);

			return markerGroup;
		}

		function drawMarker ( markerGroup, styles ) {

			markerGroup[0].attr({ x : 215, y : 178 });
			markerGroup[1].attr({ x : 240, y : 205 });
			markerGroup[2].attr({ x : 191, y : 182 });
			markerGroup[3].attr({ x : 310, y : 170 });
			markerGroup[4].attr({ x : 205, y : 275 });
			markerGroup[5].attr({ x : 265, y : 250 });
			markerGroup[6].attr({ x : 308, y : 378 });
			markerGroup[7].attr({ x : 340, y : 290 });
			markerGroup[8].attr({ x : 228, y : 350 });
			markerGroup[9].attr({ x : 232, y : 405 });
			markerGroup[10].attr({ x : 200, y : 391 });
			markerGroup[11].attr({ x : 332, y : 330 });
			markerGroup[12].attr({ x : 378, y : 355 });
			markerGroup[13].attr({ x : 365, y : 387 });
			markerGroup[14].attr({ x : 243, y : 285 });
			markerGroup[15].attr({ x : 180, y : 548 });

		}

		/* draw SVG */

		function getSvg ( korea, styles ) {

			var svgElement = null;

			var svgWidth = Math.floor(korea.width()) - lineError;
			var svgHeight = Math.floor(korea.height()) - lineError;

			svgElement = Raphael(korea[0], svgWidth, svgHeight);

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
			});

	        return svgElement;
		}


		var koreaPath = {
			seoul : {
				path: 'M212.543,203.983l1.207-0.483l3.5,2.625l2.25-1.75l4.25-6.125l1.625,2.375L230,194.75l4.625,1l2,8.875l-0.75,2.875l4.5-1.5l0.75,2.75l-2.25,2.625l0.5,1.125c0,0-1.063,3.563-7.375,6.25l-1.75-2.75l-9.5,2.75l-2.625-4.625l-2,1l-1.5-1.375l0.125-3.125l-3.375-3.125L212.543,203.983z',
				localName : '서울',
				localName2 : '서울특별시'
			},
			gyeonggido : {
				path: 'M235.875,142.25L225,151.5v4.25l-7.25,5.5v4L211,172.5h-6.75v24.833l4.417,3.667L202,198.333v-8.458c0,0-4.75,1.125-8.625-0.375c0,0-0.875,11.125,4.5,13.875l4.625-2.875l8.125,4.25l3.125-1.25l3.5,2.625l2.25-1.75l4.25-6.125l1.625,2.375L230,194.75l4.625,1l2,8.875l-0.75,2.875l4.5-1.5l0.75,2.75l-2.25,2.625l0.5,1.125L232,218.75l-1.75-2.75l-9.5,2.75l-2.625-4.625l-2,1l-1.5-1.375l0.125-3.125l-3.375-3.125c0,0-3.25,2.625-2.375,5.625l3,2.625l-0.5,3l-2,3.5V225l-3.75,2.75h3.5l3.5,2.75l3.125-1.25l1.875,4.625l-3.375-2.125l-2.625,6.375l-2.625-2.375l-4.625-2.25l-2.125,1.75l2,2.875l2.375-1.25l-0.5,2.75l-3.375,2.5l3,0.75l-1,2.875l7.5-5l1.25,2.25l4.875-2l-0.5,3l-7.25,2.875l1.25,3.375l-2,2.75l3.125,1l2.75-2.75l-0.25,2.75l3.5-6.375l0.75,6.375h1.875l-0.375,2.75L214,257.5l7.625,6.5l3.5-1l0.375-3.875l4.25-1.5l1.5,1.75l-3.125,1.25l1.25,3.375l6.5-4.125l4.125,0.5l4.375,3.625l4.5,2.125l1.25-2.625l6.5-2.75v-3.375l5.25-2.25v-2l6.375-0.5l1.125,1.5c0,0-1.125-3.375,4.625-5.625v-5l3.75,1.625l4.563-5l1.688-6l0.25-8.5l2.875-8.75l-2.75-3.5l5.25-4.5c0,0-2.125-3.125-9.5-3.125L272.5,200l-3.25,2.625l-1.375-1.5l0.875-7.375h-2.625l1.875-4.625c0,0-2.625-1.25-1.125-4.875l5.5-5.75c0,0,0.875-1.625-0.875-5.375l-3.125-0.625l-0.5-3.375l-5.875-1.75l-2.625-8L252.25,160l-4.75-2.625l2.25-3.625l-1.25-1.625l-4.375,3.25c0,0-3.375,1.25-4.875-8.25h-2.625L235.875,142.25z',
				localName : '경기',
				localName2 : '경기도'
			},
			incheon : {
				path: 'M210.625,204.75l1.918-0.767l-0.959,2.892c0,0-2.959,3-2.584,6.25l3,2.625l-0.5,3l-2,3.5h-4.375L202.75,221l-0.875-3.25c0,0-3.375-2-2.875-2s1.625-2.634,1.625-2.634l1.875,1.509l1.75-1.509l-1.875-1.866v-4l-0.125-2.375l-3.301-0.688l3.551-3.688L210.625,204.75z',
				localName : '인천',
				localName2 : '인천광역시'
			},
			gangwondo : {
				path: 'M328.75,113.5l-4.125,3.25c0,0,4.125,10.5-6.75,17.75l-7.625,5l-4.25,2.125l-12.25-2l-4.375,2l-2.625-3.125l-14.25,1.25l-1.875-1.125l-6,3l-8-2.625l-6.375,2.625l-4-2.5l-5.5,2.5l-4.875,0.625l0.75,4.875h2.625c0,0,1.125,9,4.875,8.25l4.375-3.5l1.25,1.625l-2.25,3.625l4.75,2.625l7.125-0.625l2.625,8l5.875,1.75l0.5,3.375l3.125,0.625c0,0,1.375,2,0.875,5.375l-5.5,5.75c0,0-1.5,3.5,1.125,4.875l-1.875,4.625h2.625l-0.875,7.375l1.375,1.5L272.5,200l7.625,5.75c0,0,6.375-0.125,9.5,3.125l-5.5,4.5l2.75,3.5l-2.875,8.75l-0.25,8.5l-1.688,6l4.188,4.75l9.875-2.25v-5l4.875-2l3,4.75c0,0,4.5,1.75,7.25-2.75l2.125,1.375l3.125-2.875l5.375,3l4.75-1l-0.25,1.75l-4.375,3.875l1.625,2.75l4.875-2.625l4.875,4.5l4.875-0.875l6.25,3.75l5,1.375l8.25,2.5l3.125-4.75l5.25,3.25l2.375,0.125l2.375-4.5l10.25,2.25l2.5-2.25l6.375,5.125l3.375-0.25v-3.75l8.625-5.5v-9.125l-6.125-7.25c0,0-1.25-4.5-5.25-8.75l-0.375-3.125l-4.125-3.75l-0.5-5.75l-5.125-4.875l-0.375-4.625l-15.75-17.25l-16.375-24L328.75,113.5z',
				localName : '강원',
				localName2 : '강원도'
			},
			chungcheongnamdo : {
				path: 'M229.375,264l-4.75,2.125l-6.25,2v2.25l2.25,2.625v1.5l-2.25-0.875l-0.625,3.5l-1.75,2.75l-1.5-2.25l1.625-1.875l-1.625-3l0.75-4.375L214.5,264l-2.75,3.5l-1.375-1.375l2.375-3l-2.375-3.5l-3.75,3.75v-2.5l-1.5-2.5l-4.875,7l-0.875-5.875l-6.053-6.5h-2.447l2.447,4l3.053,1.875L196,261l-2.678-0.875l-2.447-3.5l-1.125,1l6.625,7.25l0.375,2.375l-1.625-0.813l-3.25-4.188l-2.125,8.625l-1.375,0.75l-1-4.25v-2.5l1.375-1.375l-0.75-2.75l-2.5,1.25l-1.125-1.5l2.125-1.5l-0.625-2.5h-3.125l-4,1.625c0,0,3.375,1.875,3,2s-2.25,0.375-2.25,0.375l2,2.375h2.625l0.25,4.25L181,268.5l2,1.5l-3,2l-2.125-1.75v2.375l3,4.125L176.75,275l-1.75,1.25l-1.125-2.5L175.5,272l-0.125-2.5l2.375-3.375l-2.125-5.625l-2.875,0.25l2.125,4.375l-1,3.625l-2.5,0.375l-1.125-1.5l0.75-2.25l-2.25,0.75l-1.75,1.75l1.375,2.125l-0.625,3.125l3.125,0.625L171,275.5l-3.25-0.25l1.125,2.375l-3.5-2.5l-2.5,3.25V283l1.5-0.625l0.25-3.375l3.375,0.375l2,3.625h-4.125l-0.75,2.375l3,1l2.75-1.875l1.875-2.25l1.25,2.375l-0.875,1.75l2.125,1.875v5.375l3.25-1.75L178.125,288l-1.875-2.5l1.875-2.5l1-3.25l2.375,3.5l-0.375,4.125l0.375,3l4.625-4.875v-3.25l2.375-2.625l1.625,2.25L189,283.25l1.375,2.625L192.25,286l-1.25,3.25l1.375,4.375h-3.5l-1,5.125H191l0.625,1.375l-2.75,3.375l2,4l4.25-4l4.25,0.75l-7.625,6l-0.75,1.875l1.625,1.5h3.5v2.125l-4.625,1.375l1.25,1.375l3.375,0.5l-1.375,4l-1.428,3.625L197,329l0.125,1.75L191,333.375l5.125,1.375l5,4.75l2,5l3.75,1.75l4.75-3.375l8-3.375l0.375-4.375l5.5-2.75l7.125,1.125l0.875,4.75l5,2.75l2.125-2.625l7,0.625l1.125-2.5l5-1.5l1.5,5.25l2.875,6l3.375-2v4.375l6.375-0.75l0.75-4.625c0,0,4.75,2.875,5.125,2.875s1.125-3.625,1.125-3.625l-0.63-4.025l-2.87-3.725l0.75-7l-4.5-2.875l-3.25,0.875l-3.625,3.625L257,325.5l-0.75-2.875l-1.75-0.25v4.25l-1.375,3.875l-2.375-3.625l-3.125-1.75l1-2.75c0,0-2.292,0.708-2.375-1.625s2.5-5.75,2.5-5.75l-1.125-6.125l1.75-0.625h2.875l3-5.75l-1.125-1.5l0.625-2.75l-4.375-4.125v-2.75l-2.75-1.875l3-6.375l4.25-3.875l2.625,1.375l2-1.625l-1.875-1.625l-0.25-2.625l-5-3l-3.5-5.625l-4.5-2.125L240,260.375l-4.125-0.5L229.375,264z',
				localName : '충남',
				localName2 : '충청남도'
			},
			chungcheongbukdo : {
				path: 'M349.75,252.625l-5.5,2.5l-3.5,3.125l-7.5,9l1.5,2.5l-1.5,4.5H330l-3.25,1.25l-6-7.5l-3,3v2.5l-5.5-1.25l-3.75,3.25l-1.75-2.125l-2.625,6.25l3.25,2.875l-1.375,1l-2.75-2l-2.433,1.25l-1.817-1.5l-3.125,3.125l-3.125,1.875l4.125,1.875l-0.25,3.75l-3.875-3.25l-5.25,5.25l1.125,1.875h3.5l1,3.375h1.75v2.5l-2.25,0.75l0.25,4.75L293,309.75l-0.75,1.875l1.5,2.375l-4.125,4.375l3.25,3.625l2-2.375l4.5,4.75l3.875-2.625l2.25,2.625l-1.125,2l2.25,1.75l-1.5,0.875l-2.375-1.5L300,330l0.817,2.25l-0.692,2.75l-1.75,6.375l-5.125,3.125l-2.875-1.625l-4.375,2.25l-7.5-3.625l-1.25,0.875l-5.875-7.625l0.75-7l-4.5-2.875l-3.25,0.875v-7l5.25-7.875L267,308l-1.125,1.5l-1.5-1.625l1.375-1.75l-3-2.5l-1.875,2.25l-2.75-0.125v-3l-1.375-1.5l-1.5,1.25l-1.125-1.5l0.625-2.75l-4.375-4.125v-2.75l-2.75-1.875l3-6.375l4.25-3.875l2.625,1.375l2-1.625l-1.875-1.625l-0.25-2.625l-5-3l-3.5-5.625l1.25-2.625l6.5-2.75v-3.375l5.25-2.25v-2l6.375-0.5l1.125,1.5c0,0-1.125-3.375,4.625-5.625v-5l3.75,1.625l4.563-5l4.188,4.75l9.875-2.25v-5l4.875-2l3,4.75c0,0,4.25,1.875,7.25-2.75l2.125,1.375l3.125-2.875l5.375,3l4.75-1l-0.25,1.75l-4.375,3.875l1.625,2.75l4.875-2.625l4.875,4.5l4.875-0.875l6.25,3.75L349.75,252.625z',
				localName : '충북',
				localName2 : '충청북도'
			},
			gyeongsangnamdo : {
				path: 'M293.25,355.125l-2.5,1.125v2.125l-5.25,2.375l-3,0.625l-1.25,3.25L277,367v5.125l-3.625,6l1.5,3l-2.25,1.375v1.625l-1.625,1.75l5.125,5.875l-1.25,2.375L277.5,396l-0.625,2.5L274,401l-0.375,4.75L271,407.875v1.5l2.75,3.5V419l5.375,4.625l0.5,2.375l6.625,7.625v2.5l-2.375,2.5h3.625l1,1.875l5.875-0.625L296.25,437v-3.125l1.5,0.875v1.75h4.5l1.125-1.375L302,433.75l0.125-2L304,432l2-4.375l1.375,1.875L306,432.625v5.75l-0.875,1.375L306,441.5l4.375,1.125l1.125,2.625h5.25v-3.125l1.625-1.375l3.375,1.375l1.375,2.375l3.125-4.625l1.375,1.625v2.375l-2,0.625v1.375l5.75,1v2.625l2.125,1l3.125-4.125l-0.875-1.625l-1.875,0.5l0.375-5.125l0.875-1L332.75,437l4.875-0.75l1.25-1.375L338,431l-5,1.25l-2.875,2.625l0.125-3.5l6.625-2.5l-0.5-2.25l5.75-0.625l3.125,1l0.625,3.125l2.75,0.75l1.125-1l-2.25-3.75l-1.625-1.25L345.75,422l-1.813-1.625l1.938-4.5l1.75,1.125l0.125,4.75l3.625,2.75l1-2.25L354,423.5v2.125l3.5,1.125l2.625-1.5l2.25,2.375l1.875-1.75V424l-2.625-1.125l-0.125-1.75l6.125-0.75v-2.625l1.5-2.25l3.25-0.125l4.875-1.875v-2.75l3.875-0.625l5.75-4.375v-2.938h3.75l1.625-2.688l-0.875-3.375L387.5,396l-3.5-4.875h-1.875l-0.75-1.375l-4.25-0.875l-2.375-2v-1.5l2.375-0.75V380.5l-2.875,0.375l-3-3.125l-3.625,1.25l-2.5,3.125l-3.75,2.5h-4L353.75,383h-8.25l-3.5-4l0.375-7.25l-2,3.75v3c0,0-2.876-0.5-4.5,0s-4.125,2.625-4.125,2.625h-2.25l-1.625-3l-3.625-0.875l-6.125,0.875l-4.125-1L313.5,376l3.625-2.125L316,369.25l-4.75-3.875V362.5l-2.625-0.75h-5.875l-1.933-1.75l-4.317-0.875v-2.875h-2.188L293.25,355.125z',
				localName : '경남',
				localName2 : '경상남도'
			},
			gyeongsangbukdo : {
				path: 'M293.25,344.5l2.125,6.5l-2.125,4.125l1.063,1.125h2.188v2.875l4.317,0.875l1.933,1.75h5.875l2.625,0.75v2.875l4.75,3.875l1.125,4.625L313.5,376l0.5,1.125l4.125,1l6.125-0.875l3.625,0.875l1.625,3h2.25v-3.375l-2.875-3.25l0.375-2.5l5.25,0.75v-2.375l-3-2.25l1.75-4.375l4.875-0.938l-0.625-2.063l-4.25-0.875l-2-1.25l3.25-6.75l3.625,0.125l-0.875,2.5l0.875,0.875l2.25-0.125l2-6.625h4l3.375-3l6.125-0.5l2.125,3.5l-0.5,4.25l1.5,1.875v3.375l-2.625,1.75l-1.875,4l-0.375,5l-5.25,3.625l-0.75-3l-3.375,0.5l-2.375,1.75L342,379l3.5,4h8.25l3.625,1.625h4l3.75-2.5l2.5-3.125l3.625-1.25l3,3.125l2.875-0.375l5-3.125v-4l5.5-2.875l5.375,0.875l3.125,2.5v3l2.125,0.875l4-2.125l3.25-0.125l2.75,1.75l2.5-0.625l2.25-5.875v-5.375l3.5-6.375l-1.125-5l4-6.75v-4l-1.75-3.75L413.5,343l-3.125,3.75c0,0-1.625,1.333-4.291-0.5s-1.459-4.625-1.459-4.625l3.125-3.125l-0.25-1.625l-1.875-1.625l-0.125-4.75l-1.625-0.75L405,325.5l-0.875-7.875l4.25-6.25l0.25-8l1-2.125l-2.25-5.5l-0.5-6l4-4.5l0.25-8.75l-3.875-9.125l-0.5-12.25l1.5-3.25l-0.75-1.625l-3-2.25l-0.375-2.75l-1.875-0.375l-8.625,5.5v3.75l-3.375,0.25l-6.375-5.125l-2.5,2.25l-10.25-2.25l-2.375,4.5l-2.375-0.125l-5.25-3.25l-3.125,4.75l-8.25-2.5l-5.5,2.5l-3.5,3.125l-7.5,9l1.5,2.5l-1.5,4.5H330l-3.25,1.25l-6-7.5l-3,3v2.5l-5.5-1.25l-3.75,3.25l-1.75-2.125l-2.625,6.25l3.25,2.875l-1.375,1l-2.75-2l-2.433,1.25l-1.817-1.5l-3.125,3.125l-3.125,1.875l4.125,1.875l-0.25,3.75l-3.875-3.25l-5.25,5.25l1.125,1.875h3.5l1,3.375h1.75v2.5l-2.25,0.75L293,309.75l-0.75,1.875l1.5,2.375l-4.125,4.375l3.25,3.625l2-2.375l4.5,4.75l3.875-2.625l2.25,2.625l-1.125,2l2.25,1.75l-1.5,0.875l-2.375-1.5L300,330l0.817,2.25l-2.442,9.125L293.25,344.5z',
				localName : '경북',
				localName2 : '경상북도'
			},
			jeollabukdo : {
				path: 'M219.625,339.5l-2.5,3.875l-5.375,1.75l-2.625,2.375h-5.375l-3.5,1.125v2.875l-1,4.375l3-0.75l2.375,1.375l4.813-0.5l4.813-1.875l1.125,1.75l-2.125,0.625l-0.125,2L206,359.125l-0.25,1.75l5.625,3.375l0.25,3.25l-2.75-1.875l-4.25,1.875l-0.25,2.625l-3-1.375l-5.125,4.5h-2.375l-2.375,4.625H189c0,0-0.834,2.458-0.875,3.25s2.625,3.5,2.625,3.5L200,383h3.875v3.5l1,1.125l-1,0.75l-3.125-2.625l-2.625,2.625l-7.625,0.75l-4.25,5.75l0.625,2.25l2.375,0.625l1.25,2.125v2.938l1.75,0.688l0.125,3.625l4.25,1L197,406.25l2.875-1.25l0.125,1.5l2.938-2l2.688-0.875L207.75,401l1.75-3.875l-1-1.75l2.375-1.875l2.75,0.25L214.5,392l3.125,0.875l3.25,3.875l0.625,3l4.125,0.25v-2.5l1.625-3.25H230l1.625,5.125l-1.5,1.125l2.625,2.313v1.938l-1.375,1.25l0.5,1.375l4.125,1.5l4.125-3L242,405.75v1.375h1.75l0.625-1.25l3.25,1.625l4.25,0.5l1.75-1.625l2.75,1.75l3.375-4.375l3-0.938l3.5,1.188l4.75,3.875l2.625-2.125L274,401l2.875-2.5l0.625-2.5l-2.625-1.875l1.25-2.375L271,385.875l1.625-1.75V382.5l2.25-1.375l-1.5-3l3.625-6V367l4.25-2.375l1.25-3.25l3-0.625l5.25-2.375v-2.125l2.5-1.125l2.125-4.125l-2.125-6.5l-2.875-1.625l-4.375,2.25l-7.5-3.625l-1.25,0.875l-3.005-3.9l0.63,4.025l-1.125,3.625l-5.125-2.875l-0.75,4.625l-6.375,0.75v-4.375l-3.375,2l-2.875-6l-1.5-5.25l-5,1.5l-1.125,2.5l-7-0.625L238.5,341l-5-2.75l-0.875-4.75l-7.125-1.125l-5.5,2.75L219.625,339.5z',
				localName : '전북',
				localName2 : '전라북도'
			},
			jeollanamdo : {
				path: 'M286.25,436.125v-2.5L279.625,426l-0.5-2.375L273.75,419v-6.125l-2.75-3.5v-1.5L266.25,404l-3.5-1.188l-3,0.938l-3.375,4.375l-2.75-1.75l-1.75,1.625l-4.25-0.5l-3.25-1.625l-0.625,1.25H242v-1.375l-1.875,0.125l-4.125,3l-4.125-1.5l-0.5-1.375l1.375-1.25v-1.938l-2.625-2.313l1.5-1.125L230,394.25h-2.75l-1.625,3.25v2.5l-4.125-0.25l-0.625-3l-3.25-3.875L214.5,392l-0.875,1.75l-2.75-0.25l-2.375,1.875l1,1.75L207.75,401l-2.125,2.625l-2.688,0.875l-2.938,2l-0.125-1.5L197,406.25l-0.375,1.875l-4.25-1l-0.125-3.625l-1.75-0.688v-2.938l-1.25-2.125l-2.375-0.625l-2.5,2.25v2.5l3.375,2.625l-2.25,0.75l-1.125-1.875L182,405.25l-0.875,3.625L182.25,410l-2.625,2.125l0.625,1.25h-3.75v1.875l2.25,0.75l1.125-0.625l1.625,2L180.625,419l4.375,7h2l0.125,3.75l-1.625,3.375h-2l-0.125-3.625l-3-0.5l-1.75-2.75L179.5,425l-0.125-3.25l-1.375,0.5l-0.875,2l-1.75-1.125l-2.625,0.25l-1.125,1.875l2.5,2.375l-0.375,3.25l2.875-0.125l-0.75-2.5h1.5l2.313,3.875l1.688,0.375L181,435h-2.125l-0.125,2.5h-3l0.25,2.125h1.75L178,442.5l2.875-1.375l0.375-3l1.875-1.5L186.25,438l-3,1.5v5c0,0,1.916,0.834,0.625,4.625l-3,3.5l0.625,1.625l8-2l1,0.75l-1.25,1.25l1.875,1l1.5-2.375v-3.5l1.625-1.25l-0.75-3.5l3.125-0.25v3.25l-0.75,3.5l5.75,0.125l-0.875,3h-3.875l-1.75-1.25l-2.625,2.25l0.5,2.375L189.75,457l-3.125,0.625l-3.5-2l-2.5,2.625l0.875,1.5l5.125-0.75l3.375,0.75l8.625,8.875h-4.375l-1.25-1.75l-1.75,1.75l-4-2.5l-0.625-2.375l-3.125-1l-1.875,3l3.25,1.875l1.75,2.375l2.625,1l-3,1.75l-1.75-1.625l-3-0.25l-1-3.375l-1.875-2l0.875-3.625L177.125,458l-2.375,0.125l-0.875,4.25l-0.125,5.5l3,0.375l0.25,2l-2.25,0.75l2.25,3.375l2.5-1.625l2.5,3l0.125,1.875l2.75-1.875l1.375,1.875l1.625-2.5l3.25,0.25l1.625-1.875l1,1.75l-2.125,2.375l2,1.25l-5,0.75l-1.25,2.625L189,485.5l3,1.75l-2.875,5.5l2.625,1l0.375,5l3.75-2.25l1.5,1.375l1.5-1l-0.75-2.25L199.75,493l0.375-3.5l3.875-2V485l2.875,0.75v-2.5l1.375,0.25l1.375-1.875l-1.5-3l2.5-0.625v-2.125l-1.25-1.25l2.125-2.5l1.75,1.75l-0.75,8.5l1.375,2.75L216.5,485l2.5,2.375v-3l4.375,0.125v-2.375v-2.25L225.5,479l1.125-1.875v-3.25l2.125-1.25l-0.625-3.125l3.25-0.375L233.5,466l3.625-1v-2l5,0.25l1.75-1.625v-3.5l1.75-1.75l2.25,3.5l2.5-0.125l2-1.5L253,462l-0.75,3.5l-2.5-0.125l-0.375-2.875L247,462.625L245.5,465l0.25,2.75l1.625,2.75l-1.625,2.5l-3.75,0.375l1.375-4.75l-1.25-1.25l-1.313,2.25L240,471.75l-3.25,2.75l0.375,3l2.875,1.25c0,0,4.125-3.625,4.125-3.125S245.25,479,245.25,479l2.125,0.125l1.875,2l1.875,4.375l1.875-0.375v-2.875l3.25-0.125l3-3.875v-2.5l-3.875,0.625l-2.75-3.25l3.75-2.25l2.875,1.75l5.625,0.625l1-1.75l-1.625-2.625l-2.75-0.25l-0.5-1.25l2.5-0.75l-7.375-4.75l0.25-2.5l1.375-2l-3.25-0.75l-0.25-1.5h3.125l1.625-2l-3.25-0.625l-1-2H260l4.25-1l-0.25-3.25l1.875-1.375l1.125,4.25v3.625l2.375,0.75l1.625,4.25l-2,3.125V466l4,1.75l1.25,1.875l1.125-0.625v-4.25l-1.625-2.625l2.5-3.125l3.25,1.75l3.5-1.125v-4.25l1.625-1.875v-4.25l-5.125,0.125l-2.375,2.875l-2.25-0.375l-3.875-6l-1.125-3l2.75-2.375l1.25,3.25l3,0.375l4.25-3.875l-0.25-4l3,2.375L286.25,436.125z M228.938,421.75v3.375l-5.938,3.75L221.625,427L220,428.25l-3,0.125l-2.875,1.75h-4.25V428c-1.543-4.666-7.25-2.375-7.25-2.375l-1-3.5l1.625-2L202.625,418l2-2.125h2.625v-1.5l2.625-2.375l1.25,2.625l2.25,0.875l4.5-2.25l3.75-1.25l2.625,2.375l1,3.625l2.25,0.25l2.625,1.875L228.938,421.75z',
				localName : '전남',
				localName2 : '전라남도'
			},
			gwangju : {
				path: 'M209.875,412l-2.625,2.375v1.5h-2.625l-2,2.125l0.625,2.125l-1.625,2l1,3.5c0,0,5.707-2.291,7.25,2.375v2.125h4.25l2.875-1.75l3-0.125l1.625-1.25l1.375,1.875l5.938-3.75v-3.375l1.188-1.625l-2.625-1.875l-2.25-0.25l-1-3.625L221.625,412l-3.75,1.25l-4.5,2.25l-2.25-0.875L209.875,412z',
				localName : '광주',
				localName2 : '광주광역시'
			},
			daegu : {
				path: 'M331.75,381.125c0,0,2.916-2.375,4.125-2.625s4.5,0,4.5,0v-3l2-3.75l2.375-1.75l3.375-0.5l0.75,3l5.25-3.625l0.375-5l1.875-4l2.625-1.75v-3.375l-1.5-1.875l0.5-4.25l-2.125-3.5l-6.125,0.5l-3.375,3h-4l-2,6.625l-2.25,0.125l-0.875-0.875l0.875-2.5l-3.625-0.125l-3.25,6.75l2,1.25l4.25,0.875l0.625,2.063l-4.875,0.938l-1.75,4.375l3,2.25v2.375l-5.25-0.75l-0.375,2.5l2.875,3.25V381.125z',
				localName : '대구',
				localName2 : '대구광역시'
			},
			ulsan : {
				path: 'M377.125,380.5v4.125l-2.375,0.75v1.5l2.375,2l4.25,0.875l0.75,1.375H384l3.5,4.875l3.875,0.75l0.875,3.375l4.25,1.125l1.375,3.5l2.25,1l2.875-1.625V402.5l-1.125-2.5l1.875-1.5l-1.5-1.875l0.25-1.875l2.25-0.75v-3.25l-1.625-1.5l0.125-1.875h1.5l1.75,3v2.75h2c0,0,0.916-2.125,1.875-4.625s0-3.875,0-3.875l0.5-3.5l-0.125-4.5l-2.5,0.625l-2.75-1.75l-3.25,0.125l-4,2.125l-2.125-0.875v-3l-3.125-2.5l-5.375-0.875l-5.5,2.875v4L377.125,380.5z',
				localName : '울산',
				localName2 : '울산광역시'
			},
			busan : {
				path: 'M364.25,425.875l3.375,1.125l1.25-2.5L370,427c0,0,1.749-2.5,2.75-3.75s2,0,2,0l-1,5.5l0.125,3.375l2.875-1.25V428.5l1.75,0.25l1.75-4.375l1.875,2l3.625-0.625v-1.125l-0.875-2.5l2.625-0.625l1.125,0.75l5-3.875l1.75-3.5L394.5,412.5l1.75-0.875v-3.375l3.625-0.75l0.25-1.75l-2.25-1l-1.375-3.5l-4.25-1.125l-1.625,2.688h-3.75v2.938l-5.75,4.375l-3.875,0.625v2.75l-4.875,1.875l-3.25,0.125l-1.5,2.25v2.625l-6.125,0.75l0.125,1.75L364.25,424V425.875z',
				localName : '부산',
				localName2 : '부산광역시'
			},
			daejeon : {
				path: 'M247.625,308.875L248.75,315c0,0-2.583,3.333-2.5,5.75s2.375,1.625,2.375,1.625l-1,2.75l3.125,1.75l2.375,3.625l1.375-3.875v-4.25l1.75,0.25L257,325.5l3.75,3.875l3.625-3.625v-7l5.25-7.875L267,308l-1.125,1.5l-1.5-1.625l1.375-1.75l-3-2.5l-1.875,2.25l-2.75-0.125v-3l-1.375-1.5l-1.5,1.25l-3,5.75h-2.875L247.625,308.875z',
				localName : '대전',
				localName2 : '대전광역시'
			},
			jeju : {
				path: 'M171.875,578.25l-3.25,1.875l-2,2.5l-1.625,2.75c0,0-0.741,2.948,2.125,5.875l1.875,2.625l2.875,0.875l1,1.75h1.75l2.375-3.25l4.5,0.125l2.25-1L188,592.5l0.75,1.125l3.75-0.25l5.625-1L204,589.5h2.75l5.125-3.125l3.25-0.125l6.875-8v-2.375l1.75-3.25v-1.875l-2-0.625l-1.25-3.25l-3.625-0.625L215,564.375h-6.125l-7.375,0.875l-4.625,1.625L191,567.5l-5,2.625l-4.875,0.25l-2.875,2.25l-1.875,0.5L173,575.25L171.875,578.25z',
				localName : '제주',
				localName2 : '제주도'
			}

		};

		/* draw local element */

		function drawLocalElement ( styles, svgElement ) {

			var koreaGroup = svgElement.set();

			for ( var key in koreaPath ) {
				var local = svgElement.path();
				local.attr({
					path : koreaPath[key].path,
					stroke : styles.korea.line.color,
					'stroke-width' : styles.korea.line.width
				});
				local.localName = koreaPath[key].localName;
				local.localName2 = koreaPath[key].localName2;

				koreaGroup.push(local);
			}

			return koreaGroup;
		}

		function getUniqueID () {

			return Math.random().toString(36).substr(2, 9);
		}

		/* resize event */

		function resizeSvg ( svgElement, korea, koreaGroup, markerGroup, seaGroup, styles, options ) {

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
			 * korea map 의 resize 이벤트
			 */
			if (korea.data('resizeEventName')) {

				$(window).off(korea.data('resizeEventName'));
			}

			var wrapperUniqueId = getUniqueID();

			korea.data('resizeEventName', 'resize.' + wrapperUniqueId);

			var beforeWrapperWidth = korea.width();

			$(window).on(korea.data('resizeEventName'), function (e) {

				var afterWrapperWidth = korea.width();

				if (beforeWrapperWidth !== afterWrapperWidth) {

					if (options.resize.use) {

						waitForFinalEvent(function() {

							var loadingBar = options.loadingBar.select;

							if (options.loadingBar.use && options.resize.loadingBar.use) {

								loadingBar.hide();
							}

							korea.children().remove();

							clearInterval(svgElement.timeSliceInterval);

							self.init(korea, styles, options);

						}, 500, "some unique string");
					}
				}
			});
		}


		function setColorFormat ( fillstyle ) {

			var color = null;
			var srcCheck = false;

			for ( var i = fillstyle.length; i--; ) {
				if ( fillstyle[i].hasOwnProperty('src') ) {
					srcCheck = true;
					break;
				}
			}
			if ( fillstyle.hasOwnProperty('src') || fillstyle[0].hasOwnProperty('src') || srcCheck == true ) {
				color = fillColorPattern(fillstyle);
			} else {
				color = fillstyle;
			}
			return color;
		}

		function setFillColor ( styles, options, koreaGroup, colorArr ) {

			var loadingBar = options.loadingBar.select;

			setTimeout(function(){
				for ( var i = koreaGroup.length; i--; ) {
					koreaGroup[i].attr({
						fill : colorArr[i]
					});
				}
				if ( options.loadingBar.use == true ) {
					loadingBar.hide();
				}

			}, 0);
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

		function drawSeaText ( styles, svgElement ) {

			var seaGroup = {};

			var sea = styles.sea;

			var westSea = svgElement.text(sea.west.position.x, sea.west.position.y, sea.west.text.value);

			setTextAttr(sea.west.text, westSea);

			var eastSea = svgElement.text(sea.east.position.x, sea.east.position.y, sea.east.text.value);

			setTextAttr(sea.east.text, eastSea);

			var southSea = svgElement.text(sea.south.position.x, sea.south.position.y, sea.south.text.value);

			setTextAttr(sea.south.text, southSea);

			seaGroup.westSea = westSea;
			seaGroup.eastSea = eastSea;
			seaGroup.southSea = southSea;

			return seaGroup;
		}

		function setTextAttr ( styles, textElement ) {

			textElement.attr({
				'font-family': styles.family,
				'font-size': styles.size,
				'font': styles.size + " '" + styles.family + "'",
				'fill': styles.color,
				'font-weight': styles.weight,
				'font-style': styles.style,
				opacity : styles.opacity
			});
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

		function mouseEvent ( korea, styles, options, koreaGroup, markerGroup, tip ) {

			var color = null;
			var hoverColor = setFillColorSrc(styles.korea.hover.area.color);

			koreaGroup.unhover();

			if ( markerGroup != undefined ) {
				markerGroup.unhover();
			}

			koreaGroup.hover ( function (e) {

				color = this.attr('fill');

				if ( options.toolTip.use.local ) {

					tip.show();
				}

				if ( styles.korea.hover.use ) {
					this.attr({
						fill : hoverColor
					});
				}

			}, function () {

				if ( options.toolTip.use.local ) {

					tip.hide();
				}

				if ( styles.korea.hover.use ) {

					this.attr({
						fill : color
					});
				}

			});


			koreaGroup.mousemove ( function (e) {

				moveToolTip( e, styles, options, this, tip, korea);

			}).mouseout( function(e){

				tip.hide();
			});

			if ( options.toolTip.use.marker && markerGroup != undefined ) {

				markerGroup.hover ( function (e) {

					tip.show();

					markerGroup.mousemove ( function (e) {

						moveToolTip( e, styles, options, this, tip, korea);
					});

				}, function () {

					tip.hide();

				});
			}

			return tip;
		}

		function moveToolTip ( e, styles, options, element, toolTip, korea ) {

			if ( toolTip != null ) {

				var mousePosition = getMousePosition(e, korea);

				if (options.toolTip.func != null) {

					eval(options.toolTip.func)(element.data, toolTip, options);

				} else {

					var data = element.data;

					var data1 = '<span>'
								+ data[options.data.localOption]
								+ " : "
								+ data[options.data.use]
								+'</span>';

					toolTip.html(data1);
				}

				var toolTipWidth = toolTip.width() / 2;
				var toolTipHeight = toolTip.height();

				var top = mousePosition.y - toolTipHeight + options.toolTip.position.y -30;
                var left = mousePosition.x - toolTipWidth + options.toolTip.position.x - 10;

				var wrapHeight = korea.height()-toolTipHeight;
                var wrapWidth = korea.width()-(toolTipWidth*2);

                if(top < 0 ){
                	top =  mousePosition.y + toolTipHeight- options.toolTip.position.y - 30;
                }else if(top > wrapHeight){
                    top = mousePosition.y - options.toolTip.position.y + (toolTipHeight/2)
				}
                if(left<0){
                	left = 0;
                }else if(left>wrapWidth){
					left = wrapWidth;
				}

				toolTip.css({
					top : top,
					left : left
				});
			}
		}

		/* mouse leave */

		function leavePath ( tip ) {

			tip.remove();
		}

		function appendToolTip ( korea, options, ElementGroup ) {

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


		function getMousePosition (e, wrapper) {

				var m = {};

				e = e || window.event;

				if (elementType === 'VML') {

					m.x = Math.round(e.x) + 0.5;
					m.y = Math.round(e.y) + 0.5;

				} else {

					var appName = navigator.appName.toLowerCase();
					var userAgent = navigator.userAgent.toLowerCase();

					if (userAgent.indexOf('firefox') > - 1) { // FireFox

						m.x = Math.round(e.layerX);
						m.y = Math.round(e.layerY);

					} else if (appName === 'opera') { // Opera

						var target = e.target || e.srcElement,
							rect = target.getBoundingClientRect(),
							parent = target.parentNode,
							parentRect = parent.getBoundingClientRect();

						m.x = e.offsetX + rect.left - parentRect.left;
						m.y = e.offsetY + rect.top - parentRect.top;

					} else { // etc

						// m.x = Math.round(e.offsetX);
						// m.y = Math.round(e.offsetY);

						m.x = e.pageX -  wrapper.offset().left;
						m.y = e.pageY -  wrapper.offset().top;
					}
				}

				return m;
			}


		function getGubunData (data, options, sliceData) {

			if (options.data.gubunOption == undefined) {

				var dataGubun = sliceData[sliceData.length-1];

			} else {

				var dataGubun = setGubunOption(data, options);

			}

			data = setData(dataGubun, options);

			dataTotal = getDataTotal(data);

			return data;
		}

		function setSliceData (data, options) {

			var gubunDataArr = new Array();

			gubunDataArr[0] = new Array();

			var arrIndex = 0;
			var index = 0;

			gubunDataArr[0][0] = data[0];

			for (var i = 1; i < data.length; i ++ ){

				if ( data[i][options.data.gubun] == data[i-1][options.data.gubun]  ) {

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

				gubunDataArr[i] = setData(gubunDataArr[i], options);

			}

			return gubunDataArr;
		}

		// DAY|MONTH Format (0000/00/00 | 0000/00)
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

		function getStartIndex ( timeSliceData, options ) {

			var index = 0;

			for ( var i = timeSliceData.length; i--; ) {
				if ( options.data.gubunOption == undefined ) {
					index = timeSliceData.length - 1;
				} else if ( timeSliceData[i][0][options.data.gubun] == options.data.gubunOption ) {
	                index = i;
	            }
	        }

	        return index;
		}

		function getColorArr ( styles, koreaGroup, options ) {

			var fillstyle = styles.korea.area.color;
			var color = setColorFormat(fillstyle);

			var colorArr = null;

			if ( options.local.step == undefined && options.local.step == null ) {

				colorArr = basicStepOption(koreaGroup, color, options);

			} else {

				colorArr = useStepOption(koreaGroup, color, options);

			}

			return colorArr;

		}


		function setTrans ( korea, koreaGroup, markerGroup, seaGroup, styles, options ) {

			var koreaW = korea.width();
			var koreaH = korea.height();

			var x = -20 + Number(styles.korea.position.x);
			var y = -100 + Number(styles.korea.position.y);

			var width = 540;
			var height = 510;

			var wRatio = 1;
			var hRatio = 1;

			if ( koreaW < width ) {
				wRatio = koreaW / width * styles.korea.scale;
			}

			if ( koreaH < height ) {
				hRatio = koreaH / height * styles.korea.scale;
			}

			var ratio = wRatio;

			if ( wRatio > hRatio ) {
				ratio = hRatio;
			}

			var tX = ((koreaW/2) - (width * ratio / 2) ) / ratio + x;
			var tY = ((koreaH/2) - (height * ratio / 2) ) / ratio + y;

			var trans = 's' + ratio + ',' + ratio + ',' + '0, 0' + 't' + tX + ',' + tY;

			koreaGroup.attr({
				transform : trans
			});

			if ( markerGroup != undefined ) {
				markerGroup.attr({
					transform : trans
				});
			}


			for ( var key in seaGroup ) {
				seaGroup[key].attr({
					transform : trans
				});
			}

		}


		function setTimeSliceToolTip ( tip, options, data, hoverLoc, group ) {

			for ( var i = data.length; i--; ) {

	        	if ( data[i][options.data.localOption] == hoverLoc ) {

	        		if ( options.toolTip.func != undefined && options.toolTip.func != null ) {

	        			eval(options.toolTip.func)(data[i], tip);

	        		} else {

	        			var data = element.data;

						var name = '<div class="tip_name">'+ data.locname + '</div>';
						var data1 = '<span>상장 회원수 : ' + data.listshrs +'</span><br />';
						var data2 = '<span>날짜 : ' + dayDataFormatDot(data.date) +'</span><br />';

						var tipElement = '<div class="tip_data">'+ data1 + data2 + '</div>';

		                tip.html(name + tipElement);
	        		}
	        		break;
	        	}
	        }

		}

		self.init = function (korea, style, option) {

			korea.css({
				'position' : "relative"
			});

			/* styles extend */

			var styles = extendStyles(style);

			/* extend options */

			var options = extendOptions(option);

			/* load data */

			var data = loadData(options);

			/* svg element 생성 */

			var svgElement = getSvg(korea, styles);

			svgElement.event = $({});

            if (data === 'error' || data.length <= 0) {

                noData(korea, svgElement);

            }else{

				/* 시, 도 element 생성 */
                 koreaGroup = drawLocalElement(styles, svgElement);

				/* append marker */
                if ( styles.marker.use ) {
                    var markerGroup = getMarkerGroup(koreaGroup, svgElement, styles);
                }

                var sliceData = setSliceData(data, options);

                if ( options.data.reverse ) {
                    sliceData.reverse();
                }

                var gubunData = getGubunData(data, options, sliceData);

                appendDataElement(options, gubunData, koreaGroup, markerGroup);

                var colorArr = getColorArr(styles, koreaGroup, options);

                setFillColor(styles, options, koreaGroup, colorArr);

				/* append sea text */

                var seaGroup = drawSeaText(styles, svgElement);


				/* resize event */

                resizeSvg(svgElement, korea, koreaGroup, markerGroup, seaGroup, styles, options);

                if(!styles.hasOwnProperty('complete')){
                    styles.isComplete = 'complete';
                }

                var tip = appendToolTip(korea, options, koreaGroup);

                tip.appendTo(korea);

                mouseEvent(korea, styles, options, koreaGroup, markerGroup, tip);

                setTrans(korea, koreaGroup, markerGroup, seaGroup, styles, options);

                setTimeout(function () {

                    svgElement.event.trigger('drawCompleted', [svgElement]);

                    korea.trigger('drawCompleted', [svgElement]);

                }, 200);

                var timeSliceData = sliceData;

                var startIndex = getStartIndex(timeSliceData, options);

                if ( options.timeSlice.use ) {
                    clearInterval(svgElement.timeSliceInterval);
                    options.timeSlice.play.unbind('click');
                    options.timeSlice.pause.unbind('click');
                    options.timeSlice.stop.unbind('click');

                    eval(options.timeSlice.data)(timeSliceData[startIndex]);

                    svgElement.playCheck = false;

                    options.timeSlice.slider.slider({
                        range: 'max',
                        min: 0,
                        max: timeSliceData.length-1,
                        value: startIndex,
                        slide: function( event, ui ) {
                            clearInterval(svgElement.timeSliceInterval);
                            startIndex = ui.value;
                            eval(options.timeSlice.data)(timeSliceData[startIndex]);
                            svgElement.timeSlice(timeSliceData[startIndex]);

                            svgElement.playCheck = false;
                        }
                    });

                    options.timeSlice.play.click(function (){

                        if ( !svgElement.playCheck ) {

                            if (timeSliceData.length -1 === startIndex) {

                                startIndex = 0;
                            }

                            svgElement.timeSliceInterval = setInterval ( function () {

                                svgElement.timeSlice(timeSliceData[startIndex]);
                                options.timeSlice.slider.slider({
                                    value: startIndex
                                });

                                eval(options.timeSlice.data)(timeSliceData[startIndex]);

                                if ( options.toolTip.use.local ) {
                                    setTimeSliceToolTip( tip, options, timeSliceData[startIndex], koreaHoverLoc, koreaGroup );
                                }
                                if ( options.toolTip.use.marker ) {
                                    setTimeSliceToolTip( tip, options, timeSliceData[startIndex], markerHoverLoc, markerGroup );
                                }

                                startIndex += 1;
                                if( startIndex > timeSliceData.length-1 ) {
                                    clearInterval(svgElement.timeSliceInterval);
                                    svgElement.playCheck = false;

                                    startIndex = timeSliceData.length-1;
                                }

                            }, options.timeSlice.delay);

                            svgElement.playCheck = true;
                        }
                    });

                    options.timeSlice.pause.click(function (){
                        clearInterval(svgElement.timeSliceInterval);
                        svgElement.playCheck = false;
                    });

                    options.timeSlice.stop.click(function (){

                        clearInterval(svgElement.timeSliceInterval);
                        startIndex = timeSliceData.length - 1;
                        options.timeSlice.slider.slider({
                            value: timeSliceData.length - 1
                        });

                        eval(options.timeSlice.data)(timeSliceData[timeSliceData.length - 1]);
                        svgElement.timeSlice(timeSliceData[timeSliceData.length - 1]);

                        svgElement.playCheck = false;
                    });

                }
                
                var markerHoverLoc = null;
                var koreaHoverLoc = null;
                if ( markerGroup != undefined ) {
                    markerGroup.hover(function () {
                        markerHoverLoc = this.localName;
                    });
                }
                koreaGroup.hover(function () {
                    koreaHoverLoc = this.localName;
                });
            }
            
            /* event 추가 */

			svgElement.getLocal = function () {

				return koreaGroup;
			};

			svgElement.drawMarker = function () {
				markerGroup = getMarkerGroup(koreaGroup, svgElement, styles)
			};

			svgElement.getMarker = function () {

				return markerGroup;
			};

			svgElement.drawSea = function () {
				seaGroup = drawSeaText(styles, svgElement);
			};

			svgElement.getSea = function () {

				return seaGroup;
			};

			svgElement.timeSlice = function ( timeSliceData ) {

				appendDataElement(options, timeSliceData, koreaGroup, markerGroup);

				colorArr = getColorArr(styles, koreaGroup, options);

				setFillColor(styles, options, koreaGroup, colorArr);

			};

			svgElement.getSliceData = function () {

				return timeSliceData;
			};

			svgElement.getStartIndex = function () {

				var index = 0;

				for ( var i = timeSliceData.length; i--; ) {
					if ( options.data.gubunOption == undefined ) {
						index = timeSliceData.length - 1;
					} else if ( timeSliceData[i][0][options.data.gubun] == options.data.gubunOption ) {
		                index = i;
		            }
		        }

		        return index;
			};

			svgElement.inquery = function( _options ) {

				clearInterval(svgElement.timeSliceInterval);

				options = $.extend(true, options, _options);

				korea.children().remove();
				options.timeSlice.play.unbind('click');
				options.timeSlice.pause.unbind('click');
				options.timeSlice.stop.unbind('click');
				options.timeSlice.slider.unbind('click');

				timeSliceAniCheck = false;

				self.init(korea, styles, options);

			};

			svgElement.resize = function () {

				var loadingBar = options.loadingBar.select;

				if ( options.loadingBar.use == true &&
						options.resize.loadingBar.use == true ) {

					loadingBar.hide();
				}

				korea.children().remove();

				clearInterval(svgElement.timeSliceInterval);

				self.init(korea, styles, options);
			};

            svgElement.reDraw = function(style, option, redraw) {
                if(style !== undefined){
                    styles = extendStyles(style);
                }
                if(option !== undefined){
                    options = extendOptions(option);
                    options.data.data = loadData(option);
                }
                if(redraw !== false){
                    korea.children().remove();
                    self.init(korea, styles, options);
                }
            };

			if (TRIAL_UI) {

				appendTrialUi(korea);
			}

			/**
				license object chart 에 추가(ver.150915 평다진)
			*/
			svgElement.license = licenseObject;

			/**
			 * wrapper(jQuery selector)에 저장(ver. 160318 평다진)
			 */
			korea[0].instance = svgElement;

	        return svgElement;
		};


		if (!window.webponent){
			window.webponent = {};
		}
		if (!window.webponent.visual) {
			window.webponent.visual = {};
		}

		window.webponent.visual.korea = self;

	 })();

})();



