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
		
		/* defaultStyles */
		
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
					paddingTop : 43,
	    			paddingBottom : 24,
	    			paddingLeft : 20,
	    			paddingRight : 30
				},
				graph : {
					paddingTop: 20,
		            paddingBottom: 0,
		            paddingLeft: 20,
		            paddingRight: 20,
					area : {
	    				color: '#f8f8f8',
	    				opacity: 1
		            },
		            line: {
		                top: { 
		                	color: '#ccc9c9', 
		                	width: 1, 
		                	opacity: 1 
		                },
		                left: { 
		                	color: '#ccc9c9', 
		                	width: 1, 
		                	opacity: 1 
		                },
		                right: { 
		                	color: '#ccc9c9', 
		                	width: 1, 
		                	opacity: 1 
		                },
		                bottom: { 
		                	color: '#ccc9c9', 
		                	width: 1, 
		                	opacity: 1 
		                }
		            }		            
				},
				yAxis: {
		            width: 44, 
		            position: 'left',
		            paddingLeft: 0, 
		            paddingRight: 11,
		            line: {
		                color: '#cccccc', 
		                width: 1, 
		                opacity: 1,
		                number : 6,
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
		                color: '#666666', 
		                align: 'right',		/* left | center | right */
		                style: 'normal', 	/* normal | italic */
		                weight: 'bold',	/* normal | bold */
		                opacity: 1
		            },
		            tick: {
		            	use : false,
		                length: 5, 
		                color: '#807f7f',
		                width: 1, 
		                opacity: 1,
		                position: 'out'	/* out|in */
		            }
		        },
		        xAxis: {
		            height: 10, 
		            paddingTop: 15, 
		            line: { 
		            	color: '#e3e3e3', 
		            	width: 1, 
		            	opacity: 1,
		            	number : 5,
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
		                color: '#666666', 
		                align: 'center',	/* left | center | right */
		                style: 'normal',	/* normal | italic */
		                weight: 'bold',	/* normal | bold */
		                opacity: 1
		            }
		        },
		        trendLine : {
		        	use : true,
		        	color : '#556673',
		        	width : 1,
		        	opacity : 1,
		        	animate : {
		        		use : true,
		        		color : '#ca873f'
		        	}
		        },
		        series : {
		    		line: {
		                color: '#fff', 
		                width: 0
		            },
		            area : {
		            	type : 'normal',	/* normal | upDown */
		            	color : [
							'#ff625f', '#ff852c', '#ffbb16', '#d6de1d', '#2bcdba',
							'#34b8ef', '#5e93f4', '#838bf0', '#cc8af2', '#ff8bcd'
		                ],		            	
		            	opacity: 1,
		            	size : {
		            		max : 25,
			            	min : 1
		            	}
		            },
		            hover : {
		            	use : true,
	            		area : {
	            			color : '#18918d'            			
	            		},
	        			line : {
	        				color : '#fff',
	        				width : 0
	        			}
	            	}
		        },
		        animate : {
		        	use : true,
		        	type : 'bounce', /* linear|>|<|<>|bounce|elastic|backln|backOut */
		        	speed : 600				     	
		        },
		        drag : {
		        	use : false,
		        	down : {
		        		animate : {
		        			use : false,
		        			type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut */
		        			opacity : 0.5,
		        			speed : 100
		        		}
		        	},
		        	up :{
		        		animate : {
		        			use : false,
		        			type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut */
		        			speed : 200
		        		}
		        	}
		        },
		        enlarge : {
		        	use : false,
		    		animate : {
		    			use : false,
		    			type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut */
		        		speed : 400	
		        	}
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
				plot : {
					select : ''
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
		        		x : 0,
		        		y : 0
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

		/* styles extend */

		function extendStyles (style) {

			var defaultStyles = getDefaultStyles();
			var styles = $.extend(true, defaultStyles, style);

			if(elementType === 'VML') {

				styles.xAxis.text.family = 'Dotum';
				styles.yAxis.text.family = 'Dotum';
			}

			return styles;
		}

		/* options extend */

		function extendOptions (option) {

			var defaultOptions = getDeaultOptions();
			var options = $.extend(true, defaultOptions, option);

			return options;
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
		 * 데이터에 ',' 가 있을 경우 제거한다.
		 * @param  {pie} pie 객체
		 */
		function removeComma (data, options) {

			var plot = options.plot.select;
			var xAxis = options.xAxis.select;
			var yAxis = options.yAxis.select;

			var dataLen = data.length;

			for (var i = 0; i < dataLen; i++) {

				var dataI = data[i];

				if (typeof dataI[plot] == 'string') {

					dataI[plot] = Number(dataI[plot].split(',').join(''));

				}

				if (typeof dataI[xAxis] == 'string') {

					dataI[xAxis] = Number(dataI[xAxis].split(',').join(''));

				}

				if (typeof dataI[yAxis] == 'string') {

					dataI[yAxis] = Number(dataI[yAxis].split(',').join(''));

				}
			}

			return data;
		}



		function basicData (data, options, sliceData) {

			// var sliceData = setTimeSlice(data, options);

			if (options.data.gubunOption == undefined && options.data.gubunOption == null ) {

				var dataGubun = sliceData[sliceData.length-1];

			} else {

				var dataGubun = setGubunOption(data, options);

			}

			data = setData(dataGubun, options);

		//	dataTotal = getDataTotal(data);

			return data;
		}

		/* time slice data set */

		function setTimeSlice (data, options) {

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


		/* options.gubunOption 에 값을 설정하였을 경우 */

		function setGubunOption (data, options) {

			var dataGubun = [];

			for ( var i = 0; i < data.length; i++ ) {

				if (data[i][options.data.gubun] == options.data.gubunOption ) {
					dataGubun.push(data[i]);
				}
			}

			return dataGubun;
		}



		/* get data total */

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
			var d = options.data.data;
			var arr = d;		

			for ( var i = 0; i < arr.length; i++) {
				dataTotal += Number(arr[i][options.plot.select]);
			}
			
			data = arr;
			

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

				for ( var i = 0; i < arr.length; i++) {
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
							if (dataTitles[j] == options.use) {
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

			for ( var i = 0; i < data.length; i++ ) {

				if ( options.legend != undefined ) {

	 				data[i].legend = options.legend[i];
				}

			//	data[i].value = Number(data[i][options.use]);

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

		/* draw SVG */

		function drawSvg (scatterPlot, styles) {
			
			var svgElement = null;

			var svgWidth = Math.floor(scatterPlot.width()) - lineError;
			var svgHeight = Math.floor(scatterPlot.height()) - lineError;

			svgElement = Raphael(scatterPlot[0], svgWidth, svgHeight);

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
			});

	        return svgElement;
		}

		function setFillColor (styles, options) {

			var color = null;

			if ( styles.series.area.type == 'normal' ) {
				
				var fillstyle = styles.series.area.color;

				styles.series.area.setColor = [];


				for ( var i = fillstyle.length; i--; ) {

					if ( fillstyle[i].hasOwnProperty('src') ) {

						styles.series.area.setColor[i] = fillColorPattern(fillstyle[i]);

					} else {
						
						if ( typeof styles.series.area.color[i] == 'object' ) {

							styles.series.area.setColor[i] =  getGradient(styles.series.area.color[i], styles.series.area.color);

						} else { 

							styles.series.area.setColor[i] = fillstyle[i];

						}
					}  				
				}

			} else if ( styles.series.area.type == 'upDown' ) {

				var upColor = null;
				var downColor = null;
				var upFillstyle = styles.series.area.up.color;

				if ( upFillstyle.hasOwnProperty('src') ) {
					upColor = fillColorPattern(upFillstyle);
				} else {
					if ( typeof upFillstyle == 'object' ) {
						upColor = getGradient(upFillstyle, styles.series.area.up);
					} else {
						upColor = upFillstyle;	
					}
				}

				styles.series.area.up.setColor = upColor;			

				var downFillstyle = styles.series.area.down.color;

				if ( downFillstyle.hasOwnProperty('src') ) {
					downColor = fillColorPattern(downFillstyle);		
				} else {
					if ( typeof downFillstyle == 'object' ) {
						downColor = getGradient(downFillstyle, styles.series.area.down);
					} else {
						downColor = downFillstyle;		
					}
				}

				styles.series.area.down.setColor = downColor;

			}
			
		}

		function getGradient ( color, styles ) {

			var fillcolor = null;

			if ( styles.gradient != undefined ) {
				if ( styles.gradient.direction === 'horizontal' ) {
					fillcolor = '0-';	
				} else if ( styles.gradient.direction === 'vertical' ) {
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

		function setDrag ( styles, options, plotGroup ) {

			plotGroup.undrag();

			var x = 0;
			var y = 0;

			var start = function () {			

				this.toFront();
				x = this.attr("cx");
				y = this.attr("cy");
	            this.ox = this.attr("cx");
	            this.oy = this.attr("cy");

	            if ( styles.drag.down.animate.use ) {

	            	plotGroup.animate({
						opacity : styles.drag.down.animate.opacity
					}, styles.drag.down.animate.speed);

					this.animate({            
		            	opacity : 1
		            }, styles.drag.down.animate.speed);

	            } else {

	            	plotGroup.attr({
						opacity : styles.drag.down.animate.opacity
					});

					this.attr({            
		            	opacity : 1
		            });
	            }      
	        };

	        var move = function (dx, dy) {

	            this.attr({
	            	cx: this.ox + dx, 
	            	cy: this.oy + dy
	            });
	        };

	        var up = function () {

	        	if ( styles.drag.up.animate.use ) {

		            this.animate({
		            	cx: x, 
		            	cy: y,
		            	opacity : 1
		            }, styles.drag.up.animate.speed, styles.drag.up.animate.type);

		             plotGroup.animate({
						opacity : 1
					}, styles.drag.up.animate.speed);

		         } else {

	 	            this.attr({
	 	            	cx: x, 
	 	            	cy: y,
	 	            	opacity : 1
	 	            });

					plotGroup.attr({
	 					opacity : 1
	 				});
		         }

				toFrontPlot(plotGroup);
	        };

	        plotGroup.drag(move, start, up);
		}

		function drawXaxisText ( styles, options, data, svgElement, xAxisGroup, graphAttr ) {
		
			var maxX = getMax(data, options.xAxis.select);
			
			maxX = Math.floor(maxX);

			var ciphers = getCiphers(maxX);		
			var maxXLength = String(maxX).length - ciphers;
			var square = Math.pow(10, maxXLength);
			var newMaxX = Math.ceil(maxX / square) * square;

			newMaxX = setMaxAxis(styles.xAxis.line.number, newMaxX, maxX);

			var textGroup = svgElement.set();
			
			var y = graphAttr.baseY2 + styles.xAxis.paddingTop;
			var xAxisGroupLength = xAxisGroup.length;
			var xaxisLineNum = styles.xAxis.line.number - 1;

			var textArr = [];

			for ( var i = xAxisGroupLength; i--; ) {	
				
				var x = xAxisGroup[i].pointX;	
				var text = 0 + (i * newMaxX / xaxisLineNum);

				if (isNaN(text)) {

					text = 0;
				}

				if ( options.xAxis.format != undefined && options.xAxis.format != null ) {

					text = eval(options.xAxis.format)(text);
				}

				var xaxisText = svgElement.text(x, y, text);

				textGroup.push(xaxisText); 
			}


			setTextAttr(textGroup, styles.xAxis.text);
			
			return textGroup;
		}

		function setMaxAxis ( lineNum, data, maxData ) {

			var ciphers = getCiphers(maxData);
			var step = data / (lineNum - 1);		
			var indexOfStep = String(step).indexOf('.');

			if ( indexOfStep != (-1)) {

				var toStep = Math.ceil(step);
				var toStepLength = String(toStep).length - ciphers;
				var toStepSquare = Math.pow(10, toStepLength);

				data = Math.ceil(toStep / toStepSquare) * toStepSquare * (lineNum - 1);
			}

			return data;
		}


		function drawYaxisText ( styles, options, data, svgElement, yAxisGroup, graphAttr ) {

			var maxY = getMax(data, options.yAxis.select);

			maxY = Math.floor(maxY);

			var ciphers = getCiphers(maxY);		
			var maxYLength = String(maxY).length - ciphers;
			var square = Math.pow(10, maxYLength);
			var newMaxY = Math.ceil(maxY / square) * square;

			newMaxY = setMaxAxis(styles.yAxis.line.number, newMaxY, maxY);

			var textGroup = svgElement.set();

			var x = Number(styles.layout.paddingLeft) + styles.yAxis.paddingLeft;
			if ( styles.yAxis.text.align == 'right' ) {
				x = x + styles.yAxis.width;
			} else if ( styles.yAxis.text.align == 'center' ) {
				x = x + styles.yAxis.width / 2;
			}

			if ( styles.yAxis.position == 'right' ) {
				x = x + graphAttr.baseWidth + styles.yAxis.paddingLeft;
			}

			var yAxisGroupLength = yAxisGroup.length;
			var yaxisLineNum = styles.yAxis.line.number - 1;

			for ( var i = yAxisGroupLength; i--; ) {
				var y = yAxisGroup[i].pointY;
				var text = 0 + ( i * newMaxY / yaxisLineNum);
				
				if ( options.yAxis.format != undefined && options.yAxis.format != null ) {
					text = eval(options.yAxis.format)(text);
				}

				var yaxisText = svgElement.text(x, y, text);

				textGroup.push(yaxisText);
			}

			setTextAttr(textGroup, styles.yAxis.text);

			return textGroup;
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

		function getAlign ( textAlign ) {

			var align = 'middle';
			
			if (textAlign == 'right') {

				align = 'end';

			} else if (textAlign == 'left') {

				align = 'start';

			}

			return align;
		}


		/**
		 * x 축과 y 축의 최대값을 기준으로 보기 좋은 값으로 변환 후
		 * 각각의 축에 들어갈 수치를 리턴한다.
		 * @param  {Number} max 해당 축의 최대 값
		 * @param  {Number} min 해당 축의 최소 값
		 * @return {Array}     축에 들어갈 수치들의 배열
		 */
		function getAxisTextArray (max, min, graphBoxWidth, fontSize) {

			if (max == 0 && min == 0) {

				max = 100;	
			}

			if (max == min) {

				max = max + 1;
				min = min - 1;
			}

			var maxPowerOfTen = Math.floor(Math.log(Math.abs(max)) / Math.LN10);
			var minPowerOfTen = Math.floor(Math.log(Math.abs(min)) / Math.LN10);
			var powerOfTen = Math.floor(Math.log(Math.abs(max - min)) / Math.LN10);
			var userInterval = Math.pow(10, powerOfTen);

			if (Math.abs(max - min) / userInterval < 4) {

				powerOfTen --;

				userInterval = userInterval * 2 / 10;
			}

			var topBound = 0;
			var lowerBound = 0;

			if (Math.round(max / userInterval) * userInterval == max) {

				topBound = max;

			} else {

				topBound = (Math.floor(max / userInterval) + 1) * userInterval;
			}

			if (max - min < 5 && max >= 0 && min >= 0) {

				if (String(topBound).indexOf('.') <= -1 
							&& String(lowerBound).indexOf('.') <= -1) {

					userInterval = 1;
				}
			}

			var decimal = Math.abs(userInterval) - Math.floor(Math.abs(userInterval));
			var precision = decimal == 0 ? 1 : -Math.floor(Math.log(decimal) / Math.LN10);
			var roundBase = Math.pow(10, precision);

			var textArray = [];

			for (var i = lowerBound; i <= topBound; i += userInterval) {
				
				var roundedValue = Math.round(i * roundBase) / roundBase;

				textArray.push(roundedValue);
			}
			
			var textWidth = String(topBound).length * fontSize * 1.2;
			var textCount = Math.floor(graphBoxWidth / textWidth);		
			var viewTextArray = [];

			if (textCount <= 2) {

				viewTextArray.push(textArray[0], topBound);

			} else {

				var textGap = Math.ceil(textArray.length / textCount);

				for (var i = 0; i < textArray.length; i += textGap) {

					viewTextArray.push(textArray[i]);
				}

				if (topBound != viewTextArray[viewTextArray.length - 1]) {

					var lastData = viewTextArray[viewTextArray.length - 1];
					var newMaxData = lastData + viewTextArray[1] - viewTextArray[0];

					viewTextArray.push(newMaxData);
				}
			}

			return viewTextArray;
		};


		function drawXaxisLine ( styles, options, data, svgElement, graphAttr ) {
		
			var plotAreaX = graphAttr.chartAreaX;
			var plotAreaWidth = graphAttr.chartAreaWidth;
			
			styles.xAxis.line.number = Math.floor(plotAreaWidth / 50);

			var surroundPlotX = graphAttr.baseX;
			var surroundPlotY = graphAttr.baseY;
			var surroundPlotWidth = graphAttr.baseWidth;
			var surroundPlotHeight = graphAttr.baseHeight;

			var lineY = surroundPlotY + surroundPlotHeight;
			var maxLineOutXLeft = data[0].maxLineOutXLeft;
			var maxLineOutXRight = data[0].maxLineOutXRight;
			if ( maxLineOutXLeft == undefined ) {
				maxLineOutXLeft = 0;
			}
			if ( maxLineOutXRight == undefined ) {
				maxLineOutXRight = 0;
			}
			var zeroLineX =  plotAreaX + maxLineOutXLeft;
			var maxLineX = plotAreaX + plotAreaWidth - maxLineOutXRight;		
			var maxX = getMax(data, options.xAxis.select);
			
			maxX = Math.floor(maxX);

			var ciphers = getCiphers(maxX);		
			var maxXLength = String(maxX).length - ciphers;
			var square = Math.pow(10, maxXLength);
			var newMaxX = Math.ceil(maxX / square) * square;

			newMaxX = setMaxAxis(styles.xAxis.line.number, newMaxX, maxX);

			var grad = (zeroLineX - maxLineX) / maxX;
			var newWidth = grad * newMaxX;
			var newMaxLineX = zeroLineX - newWidth;
			var intervalX = newWidth / (styles.xAxis.line.number - 1);
			var newMaxLineX = zeroLineX;
			var xAxisGroup = svgElement.set();
			var xaxisLineNumLength = styles.xAxis.line.number;

			for ( var i = xaxisLineNumLength; i--; ) {
				var newMaxLine = svgElement.path();	
				var newMaxLinePath = 'M' + (Math.floor(newMaxLineX) + lineError)+ ',' + surroundPlotY + 'L' + (Math.floor(newMaxLineX) + lineError) + ',' + lineY  + 'Z';		
				
				newMaxLine.attr({				
					path : newMaxLinePath,
					stroke : styles.xAxis.line.color,
					'stroke-width' : styles.xAxis.line.width,
					opacity : styles.xAxis.line.opacity
				})			
				if ( newMaxLineX > surroundPlotX + surroundPlotWidth ) {
					newMaxLine.attr({
						'stroke-width' : 0
					})
					break;
				}

				if ( Math.abs(newMaxLineX - surroundPlotX) < 1.1 ) {
					newMaxLine.attr({
						'stroke-width' : 0
					})
				}

				newMaxLine.pointX = newMaxLineX;
				xAxisGroup.push(newMaxLine);
				newMaxLineX -= intervalX;
			}	
			return xAxisGroup;
		}

		function getCiphers ( maxY ) {

			var ciphers = 1;

			if (maxY != undefined) {
				
				if ( String(maxY).length > 4 ) {

					ciphers = 2;
				}
			}

			return ciphers;
		}


		function drawYaxisLine ( styles, options, data, svgElement, graphAttr ) {

			var plotAreaY = graphAttr.chartAreaY;
			var plotAreaHeight = graphAttr.chartAreaHeight;		

			var surroundPlotX = graphAttr.baseX;
			var surroundPlotY = graphAttr.baseY;
			var surroundPlotWidth = graphAttr.baseWidth;
			var surroundPlotHeight = graphAttr.baseHeight;

			var lineX = surroundPlotX + surroundPlotWidth;
			var maxLineOutYBottom = data[0].maxLineOutYBottom;
			var maxLineOutYTop = data[0].maxLineOutYTop;
			if ( maxLineOutYBottom == undefined ) {
				maxLineOutYBottom = 0;
			}
			if ( maxLineOutYTop == undefined ) {
				maxLineOutYTop = 0;
			}
			var zeroLineY = plotAreaY + plotAreaHeight - maxLineOutYBottom;
			var maxLineY = plotAreaY + maxLineOutYTop;
			var maxYItem = getMaxItem(data, options.yAxis.select);
			var maxY = getMax(data, options.yAxis.select);

			maxY = Math.floor(maxY);

			/* y 축의 최대값을 보기 좋은 값으로 변환한 line y */
			
			var ciphers = getCiphers(maxY);	
			var maxYLength = String(maxY).length - ciphers;

			var square = Math.pow(10, maxYLength);
			var newMaxY = Math.ceil(maxY / square) * square;

			newMaxY = setMaxAxis(styles.yAxis.line.number, newMaxY, maxY);
			var grad = (zeroLineY - maxLineY) / maxY;				
			var newHeight = grad * newMaxY;
			var newMaxLineY = zeroLineY - newHeight;
			var intervalY = newHeight / (styles.yAxis.line.number - 1);
			var newMaxLineY = zeroLineY;
			var yAxisGroup = svgElement.set();
			var yaxisLineNumLength = styles.yAxis.line.number;
			for ( var i = yaxisLineNumLength; i--; ) {
				
				var newMaxLine = svgElement.path();
				
				newMaxLineY = Math.floor(newMaxLineY) + lineError;
				
				var newMaxLinePath = 'M' + surroundPlotX + ',' + newMaxLineY + 'L' + lineX + ',' + newMaxLineY  + 'Z';
				newMaxLine.attr({				
					path : newMaxLinePath,
					stroke : styles.yAxis.line.color,
					'stroke-width' : styles.yAxis.line.width,
					opacity : styles.yAxis.line.opacity
				})
				if ( newMaxLineY < surroundPlotY ) {
					newMaxLine.attr({
						'stroke-width' : 0
					})
					break;
				}			
				newMaxLine.pointY = newMaxLineY;
				yAxisGroup.push(newMaxLine);
				newMaxLineY -= intervalY;
			}
			return yAxisGroup;
		}

		function drawSurroundPlot ( styles, options, svgElement, graphAttr ) {

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
				'stroke-width' : Number(styles.graph.line.top.width)
			})

			var surroundBottomLine = svgElement.path();
			var bottomPath = 'M' + graphAttr.baseX + ',' + graphAttr.baseY2 + 'L' + graphAttr.baseX2 + ',' + graphAttr.baseY2 + 'Z';
			surroundBottomLine.attr({
				path : bottomPath,
				stroke : styles.graph.line.bottom.color,
				'stroke-width' : Number(styles.graph.line.bottom.width)
			})
			var surroundLeftLine = svgElement.path();
			var leftPath = 'M' + graphAttr.baseX + ',' + graphAttr.baseY + 'L' + graphAttr.baseX + ',' + graphAttr.baseY2 + 'Z';
			surroundLeftLine.attr({
				path : leftPath,
				stroke : styles.graph.line.left.color,
				'stroke-width' : Number(styles.graph.line.left.width)
			})
			var surroundRightLine = svgElement.path();
			var rightPath = 'M' + graphAttr.baseX2 + ',' + graphAttr.baseY + 'L' + graphAttr.baseX2 + ',' + graphAttr.baseY2 + 'Z';
			surroundRightLine.attr({
				path : rightPath,
				stroke : styles.graph.line.right.color,
				'stroke-width' : Number(styles.graph.line.right.width)
			})

			surroundGroup.push(surroundTopLine);
			surroundGroup.push(surroundBottomLine);
			surroundGroup.push(surroundLeftLine);
			surroundGroup.push(surroundRightLine);

			return surroundGroup;
		}

		function drawPlotArea ( styles, options, svgElement, graphAttr ) {

			var plotArea = svgElement.rect();

			plotArea.attr({
				x : graphAttr.chartAreaX,
				y : graphAttr.chartAreaY,
				width : graphAttr.chartAreaWidth,
				height : graphAttr.chartAreaHeight,
				fill : styles.graph.area.color,
				stroke : '',
				opacity: styles.graph.area.opacity
			});

			return plotArea;
		}

		function drawPlot ( styles, options, data, svgElement, graphAttr ) {

			var plotGroup = svgElement.set();
			var dataLength = data.length;

			for ( var i = 0; i < dataLength; i++ ) {		
				var dataI = data[i];
				
				dataI.x = Math.floor(dataI.x + graphAttr.chartAreaX);
				dataI.y = Math.floor(dataI.y + graphAttr.chartAreaY);

				dataI.r = dataI.plotSize;
				var circle = svgElement.circle(dataI.x, dataI.y, 0);


				circle.itemNum = i;

				if ( styles.series.area.type == 'normal' ) {				
					if ( styles.series.area.color[i] == undefined ) {
						styles.series.area.setColor[i] = 'gray';
					}			

					circle.attr({
						fill : styles.series.area.setColor[i],
						opacity : styles.series.area.opacity
					})

				} else if ( styles.series.area.type == 'upDown' ) {
					var upDownColor = styles.series.area.up.setColor;
					var upDownOpacity = styles.series.area.up.opacity;
					var upDown = 'up';
					if ( Number(dataI[options.yAxis.select]) < Number(dataI[options.xAxis.select]) ) {				
						upDownColor = styles.series.area.down.setColor
						upDownOpacity = styles.series.area.down.opacity
						upDown = 'down';
					}
					circle.upDown = upDown;
					circle.attr({
						fill : upDownColor,
						opacity : upDownOpacity
					})				
				}

				var circleStroke = styles.series.line.color;

				if ( styles.series.line.width == 0 ) {
					circleStroke = '';
				}
				circle.attr({
					stroke : circleStroke,
					'stroke-width' : styles.series.line.width
				})
				if ( styles.animate.use == true && elementType == 'SVG' ) {
					circle.animate({
						r : dataI.r
					}, styles.animate.speed, styles.animate.type)	
				} else {
					circle.attr({
						r : dataI.r
					})
				}
				circle.data = dataI;
				plotGroup.push(circle);
			}

			setTimeout(function () {

				svgElement.event.trigger('drawCompleted', [svgElement]);

			}, styles.animate.speed + 100);

			return plotGroup;
		}

		function sortByKey(array, key) {
		   
		    return array.sort ( function ( a, b ) {
		        
		        var x = a[key]; var y = b[key];
		      
		        return ( (x < y) ? -1 : ((x > y) ? 1 : 0) );
		    });
		}

		/* get random color */

		function getRandomColor() {

		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';

		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.round(Math.random() * 15)];
		    }

		    return color;
		}

		function setPlotPosition ( options, data, graphAttr ) {

			var maxX = getMax(data, options.xAxis.select);
			var maxY = getMax(data, options.yAxis.select);
			var minX = getMax(data, options.xAxis.select);
			var minY = getMin(data, options.yAxis.select);
			var	width = graphAttr.chartAreaWidth;
			var	height = graphAttr.chartAreaHeight;

			var yBottomLineOutData = 0;
			var yTopLineOutData = 0;
			var xLeftLineOutData = 0;
			var xRightLineOutData = 0;
			var maxLineOutYBottom = 0;
		 	var maxLineOutYTop = 0;
		 	var maxLineOutXLeft = 0;
		 	var maxLineOutXRight = 0;
			var dataLength = data.length;

			for ( var i = dataLength; i--; ) {	
				var dataI = data[i];
				var plotSize = dataI.plotSize;
				var itemX = width / maxX * Number(dataI[options.xAxis.select]);
				var itemY = height - (height / maxY * Number(dataI[options.yAxis.select]));
				dataI.x = itemX;			
				dataI.y = itemY;
				/* y bottom */
				if ( dataI.y + plotSize > height ) {
					if ( maxLineOutYBottom < (dataI.y + plotSize) - height ) {
						maxLineOutYBottom = (dataI.y + plotSize) - height;
						yBottomLineOutData = dataI;
					}
				}
				/* y top */
				if ( dataI.y < plotSize ) {
					if ( maxLineOutYTop < plotSize - dataI.y ) {
						maxLineOutYTop = plotSize - dataI.y;
						yTopLineOutData = dataI;
					}				
				}			
				/* x right */
				if ( dataI.x + plotSize > width ) {
					if ( maxLineOutXRight < (dataI.x + plotSize) - width ) {
						maxLineOutXRight = (dataI.x + plotSize) - width;
						xRightLineOutData = dataI;
					}
				}
				/* x left */
				if ( dataI.x < plotSize ) {
					if ( maxLineOutXLeft > dataI.x - plotSize )	{
						maxLineOutXLeft = dataI.x - plotSize;
						xLeftLineOutData = dataI;					
					}
				}
			}

			maxLineOutXLeft = maxLineOutXLeft * (-1);
			var yBottomLineOutDataY = yBottomLineOutData.y;
			var yTopLineOutDataY = yTopLineOutData.y;
			var xRightLineOutDataX = xRightLineOutData.x;
			var xLeftLineOutDataX = xLeftLineOutData.x;

			var dataLength = data.length;
			for ( var i = dataLength; i--; ) {
				var dataI = data[i];
				if ( maxLineOutYBottom != 0 ) {
					var setY =  maxLineOutYBottom / (yBottomLineOutDataY / maxLineOutYBottom) * (dataI.y /  maxLineOutYBottom);				
					dataI.y = dataI.y - setY;
					dataI.maxLineOutYBottom = maxLineOutYBottom;
				}
			}
			for ( var i = dataLength; i--; ) {
				var dataI = data[i];
				var plotSize = dataI.plotSize;
				var setY = (height / maxLineOutYTop) - ((dataI.y + plotSize) / maxLineOutYTop);				
				var getMaxY = (height / maxLineOutYTop) - ((yTopLineOutDataY + plotSize) / maxLineOutYTop);			
				dataI.y = dataI.y + setY * maxLineOutYTop / getMaxY;
				dataI.maxLineOutYTop = maxLineOutYTop;
			}
			for ( var i = dataLength; i--; ) {
				var dataI = data[i];
				if ( maxLineOutXRight != 0 ) {
					var setX =  maxLineOutXRight / (xRightLineOutDataX / maxLineOutXRight) * (dataI.x /  maxLineOutXRight);
					dataI.x = dataI.x - setX;
					dataI.maxLineOutXRight = maxLineOutXRight;
				}
			}
			for ( var i = dataLength; i--; ) {
				var dataI = data[i];
				var plotSize = dataI.plotSize;			
				var setX = (width / maxLineOutXLeft) - ((dataI.x + plotSize) / maxLineOutXLeft);				
				var getMaxX = (width / maxLineOutXLeft) - ((xLeftLineOutDataX + plotSize) / maxLineOutXLeft);
				
				if ( xLeftLineOutData != 0 ) {
					dataI.x = dataI.x + setX * maxLineOutXLeft / getMaxX;
					dataI.maxLineOutXLeft = maxLineOutXLeft;
					
				}

			}


			return data;
		}

		function getMaxLineOut ( data ) {
			
			var max = data[0];
			var dataLength = data.length;

			for ( var i = dataLength; i--; ) {
			
				if ( max < Number(data[i]) ) {
			
					max = Number(data[i]);
				}

			}
			
			return max;
		}

		function getMax ( data, item ) {
			
			var max = data[0][item];
			var dataLength = data.length;

			for ( var i = dataLength; i--; ) {
			
				if ( max < Number(data[i][item]) ) {
			
					max = Number(data[i][item]);
				}

			}
			
			return max;
		}

		function getMaxItem ( data, item ) {
			
			var dataLength = data.length;
			var max = data[0][item];
			var maxItem = data[0];

			for ( var i = dataLength; i--; ) {
			
				if ( max < Number(data[i][item]) ) {
			
					max = Number(data[i][item]);
					maxItem = data[i];			
				}

			}
			
			return maxItem;
		}

		function getMin ( data, item ) {
			
			var min = data[0][item];
			var dataLength = data.length - 1;

			for ( var i = dataLength; i >= 0; i-- ) {
			
				if ( min > Number(data[i][item]) ) {
			
					min = Number(data[i][item]);
				}

			}
			
			return min;
		}

		function getTotal ( data, item ) {

			var total = 0;
			var dataLength = data.length;

			for ( var i = dataLength; i--; ) {
				total += Number(data[i][item]);

			}

			return total;
		}

		function getPixel ( percent, scatterPlot ) {

			var pixel = 0;

			var scatterPlotW = scatterPlot.width();
			var scatterPlotH = scatterPlot.height();

			var min = scatterPlotW;

			if ( scatterPlotW > scatterPlotH ) {

				min = scatterPlotH;

			}

			pixel = min / 100 * percent * 2;

			return pixel;
		}

        /**
         * 데이터가 load 되지 않았을 경우
         * @param  {scatterPlot} pie 객체
         */
        function noData (scatterPlot, svgElement) {

            var x = scatterPlot.width() / 2;
            var y = scatterPlot.height() / 2;
            var text = svgElement.text(x, y, '데이터가 로드되지 않았습니다.');

            text.attr({
                'font-family': 'dotum',
                'font-size': 12,
                fill: '#000'
            });
        }

        function setPlotSize ( styles, options, data, scatterPlot ) {

			var plotSizeMax = getPixel(styles.series.area.size.max, scatterPlot);
			var plotSizeMin = getPixel(styles.series.area.size.min, scatterPlot);

			var plotDataTotal = getTotal(data, options.plot.select);
			var dataLength = data.length;

			for ( var i = dataLength; i--; ) {
			
				var plotSize = plotSizeMin + ((plotSizeMax - plotSizeMin) / plotDataTotal * data[i][options.plot.select]);
				
				data[i].plotSize = plotSize;

			}
			
		}

		var getMousePosition = function(e, scatterPlot){

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

					m.x = e.pageX -  scatterPlot.offset().left;
					m.y = e.pageY -  scatterPlot.offset().top;
				}
			}

			return m;
		};

		function setFillColorSrc (color) {
				
			var fillstyle = color;

			if ( fillstyle.hasOwnProperty('src')/* || fillstyle[0].hasOwnProperty('src')*/) {
				color = fillColorPattern(fillstyle);		
			} else {
				color = fillstyle;		
			}
			
			return color;		
		}

		function drawToolTip ( styles, options, svgElement, plotGroup, scatterPlot, tip ) {
			
			var hoverColor = null;

			plotGroup.unhover();
			plotGroup.unmousemove();

			if ( styles.series.hover.use ) {

				if ( styles.series.area.type == 'normal' ) {
					hoverColor = setFillColorSrc(styles.series.hover.area.color);				
				} else {
					hoverColor = setFillColorSrc(styles.series.hover.area.up.color);
				}

				if ( elementType == 'SVG' ) {

				} else {

					var clonePlot = svgElement.circle();

					clonePlot.attr({
						stroke : styles.series.hover.line.color,
						'stroke-width' : styles.series.hover.line.width
					});
				}
			}

			plotGroup.hover(function(){	

				if ( options.toolTip.use ) {

					tip.show();
				}

				if ( styles.series.hover.use ) {

					if ( styles.series.area.type == 'upDown' ) {
						if ( this.upDown == 'down' ) { 
							hoverColor = setFillColorSrc(styles.series.hover.area.down.color);
						} else {
							hoverColor = setFillColorSrc(styles.series.hover.area.up.color);
						}
					}

					if ( elementType == 'SVG' ) {
						this.attr({
							fill : hoverColor
						});
					} else {

						if ( typeof hoverColor == 'object' ) {
							cloneColor = hoverColor[0];
						} else {
							cloneColor = hoverColor;
						}

						clonePlot.attr({
							cx : this.attr('cx'),
							cy : this.attr('cy'),
							r : this.attr('r'),
							fill : cloneColor
						});

						clonePlot.data = this.data;

						clonePlot.hover(function () {
						
						}, function () {
							clonePlot.attr({
								cx : 0,
								cy : 0,
								r : 0
							});
							if ( options.toolTip.use ) {
								tip.hide();
							}
						});
					}
				}

			}, function(){	

				if ( elementType == 'SVG' && options.toolTip.use == true ) {
					tip.hide();				
				}

				if ( styles.series.hover.use ) {
					if ( elementType == 'SVG' ) {
						if ( styles.series.area.type == 'upDown' ) {

							if ( this.upDown == 'down' ) {
								this.attr({
									fill : styles.series.area.down.setColor
								});
							} else {
								this.attr({
									fill : styles.series.area.up.setColor
								});
							}
						
						} else {
							this.attr({
								fill : styles.series.area.setColor[this.itemNum]
							});
						}
					}
				}
			});	

			var oPY = options.toolTip.position.y;
			var oPX = options.toolTip.position.x;
			var oTF = options.toolTip.func;

			if ( options.toolTip.use ) {
				
				plotGroup.mousemove ( function (e) {
					
					var mousePosition = getMousePosition(e, scatterPlot);
					
					if ( oTF != undefined && oTF != null ) {
						
						eval(oTF)(this.data, tip, options);

					} else {

						var data = this.data;

						var data1 = '<span>산포도 : ' + data[options.plot.select] +'</span><br />';
						var data2 = '<span>X 축 : ' + data[options.xAxis.select] +'</span><br />';
						var data3 = '<span>Y 축 : ' + data[options.yAxis.select] +'</span><br />';
						
						var tipElement = '<div class="tip_data">'+ data1 + data2 + data3 + '</div>';

		                tip.html(tipElement); 
					}

					var toolTipWidth = tip.width() / 2;
					var toolTipHeight = tip.height();

					tip.css({
						top : mousePosition.y - toolTipHeight + options.toolTip.position.y - 30,
						left : mousePosition.x - toolTipWidth + options.toolTip.position.x - 10
					});
				});

				if ( clonePlot != undefined ) {
					
					clonePlot.mousemove( function (e) {
						
						var mousePosition = getMousePosition(e, scatterPlot);

						if ( oTF != undefined && oTF != null ) {
							
							eval(oTF)(this.data, tip);
						
						} else {

							var data = this.data;

							var data1 = '<span>산포도 : ' + data[options.plot.select] +'</span><br />';
							var data2 = '<span>X 축 : ' + data[options.xAxis.select] +'</span><br />';
							var data3 = '<span>Y 축 : ' + data[options.yAxis.select] +'</span><br />';
							
							var tipElement = '<div class="tip_data">'+ data1 + data2 + data3 + '</div>';

			                tip.html(tipElement);
						}

						var toolTipWidth = tip.width() / 2;
						var toolTipHeight = tip.height();

						tip.css({
							top : mousePosition.y - toolTipHeight + options.toolTip.position.y - 30,
							left : mousePosition.x - toolTipWidth + options.toolTip.position.x - 10
						});
					});
				}
			}
			
			return tip;
		}

		function mouseEvent ( styles, options, svgElement, plotGroup, group, yAxisGroup, xAxisGroup, graphAttr, scatterPlot, tip, yAxisUnderLine, xAxisUnderLine, trendLine ) {

			plotGroup.unhover();

			/* tool tip */

			var tip = drawToolTip(styles, options, svgElement, plotGroup, scatterPlot, tip);

			if ( elementType == 'SVG' ) {

				/* mouse click 시 chart 확대 */

				if ( styles.enlarge.use == true && styles.drag.use == false ) {

					mouseClickEvent(styles, options, svgElement, plotGroup, group, yAxisGroup, xAxisGroup, graphAttr, yAxisUnderLine, xAxisUnderLine, trendLine);
				}

				/* 해당 item 에 drag 이벤트 부여 */
				if ( styles.drag.use == true && styles.enlarge.use == false ) {

					if (('createTouch' in document) || ('ontouchstart' in document)){
						
						console.log("모바일에서는 드래그 기능을 지원하지 않습니다.");

					} else {

						setDrag(styles, options, plotGroup);
					}
				}
			}
		}

		function drawYaxisTick ( styles, svgElement, yAxisGroup, graphAttr ) {

			var yTipGroup = svgElement.set();
			var yAxisGroupLength = yAxisGroup.length;
			var moveX = graphAttr.baseX;
			var lineX = moveX - styles.yAxis.tick.length;
			
			if ( styles.yAxis.tick.position == 'in' ) {
				lineX = moveX + styles.yAxis.tick.length;
			}

			if ( styles.yAxis.position == 'right' ) {
				moveX = graphAttr.baseX + graphAttr.baseWidth;
				if ( styles.yAxis.tick.position == 'in' ) {
					lineX = moveX - styles.yAxis.tick.length;
				} else if (styles.yAxis.tick.position == 'out' ) {
					lineX = moveX + styles.yAxis.tick.length;
				}
			}

			for ( var i = yAxisGroupLength; i--; ) {
				var tipElement = svgElement.path();
				lineY = yAxisGroup[i].pointY;
				var path = 'M' + moveX + ',' + lineY + 'L' + lineX + ',' + lineY + 'Z';
				tipElement.attr({
					path : path,
					stroke : styles.yAxis.tick.color,
					'stroke-width' : styles.yAxis.tick.width,
					opacity : styles.yAxis.tick.opacity
				})
				yTipGroup.push(tipElement);
			}		

			return yTipGroup;
		}


		function getUniqueID () {

			return Math.random().toString(36).substr(2, 9);
		};

		function reSize ( styles, options, scatterPlot, svgElement ) {

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
			 * scatter plot 의 resize 이벤트
			 */
			if (scatterPlot.data('resizeEventName')) {

				$(window).off(scatterPlot.data('resizeEventName'));
			}

			var wrapperUniqueId = getUniqueID();

			scatterPlot.data('resizeEventName', 'resize.' + wrapperUniqueId);

			var beforeWrapperWidth = scatterPlot.width();

			$(window).on(scatterPlot.data('resizeEventName'), function (e) {

				var afterWrapperWidth = scatterPlot.width();

				if (beforeWrapperWidth !== afterWrapperWidth) {

					if (options.resize.use) {

						waitForFinalEvent(function() {

							svgElement.timeSlicePlayCheck = false;

							scatterPlot.children().remove();

							clearInterval(svgElement.timeSliceInterval);

							self.init(scatterPlot, styles, options);

						}, 500, "some unique string");
					}
				}
			});
		}

		function mouseClickEvent ( styles, options, svgElement, plotGroup, group, yAxisGroup, xAxisGroup, graphAttr, yAxisUnderLine, xAxisUnderLine, trendLine ) {

			plotGroup.unclick();

			var clickCheck = true;
			var surroundPlotWidth = graphAttr.baseWidth;
			var surroundPlotHeight = graphAttr.baseHeight;		
			var centerX = (graphAttr.baseX + surroundPlotWidth) / 2;
			var centerY = (graphAttr.baseY + surroundPlotHeight) / 2;
			var min = surroundPlotWidth; 
			var rate = 0; 

			if ( min > surroundPlotHeight ) {
				min = surroundPlotHeight;
			}
			
			plotGroup.click( function () {
				if ( clickCheck ) {			
					if ( elementType == 'SVG' && options.timeSlice.use == true ) {
						options.timeSlice.play.attr({disabled: true});
						options.timeSlice.pause.attr({disabled: true});
						options.timeSlice.stop.attr({disabled: true});
					}
					var cx = this.attr('cx');
					var cy = this.attr('cy');				
					rate = (min - 40) / this.attr('r') / 2;
					var x = (cx - centerX ) / rate;
					var y = ((cy - centerY ) / rate);
					var trans = 's' + rate + ',' + rate + ',' + (cx + x) + ',' + (cy + y);				
					this.toFront();
					if ( styles.enlarge.animate.use ) {
						group.animate({
							transform : trans
						}, styles.enlarge.animate.speed, styles.enlarge.animate.type, function (){
							if ( styles.trendLine.use ) {
								trendLine.attr({
									'stroke-width' : styles.trendLine.width * rate
								});
							}
						});
					} else {
						group.attr({
							transform : trans
						});
						trendLine.attr({
							'stroke-width' : styles.trendLine.width * rate
						});
					}
					clickCheck = false;		
				} else {	
					if ( elementType == 'SVG' && options.timeSlice.use == true ) {
						options.timeSlice.play.attr({disabled: false});
						options.timeSlice.pause.attr({disabled: false});
						options.timeSlice.stop.attr({disabled: false});
					}
					var trans = 's' + 1 + ',' + 1 + ',' + 0 + ',' + 0;
					if ( styles.enlarge.animate.use ) {
						group.animate({
							transform : trans
						}, styles.enlarge.animate.speed, styles.enlarge.animate.type, function () {
							yAxisGroup.attr({
								'stroke-width' : styles.yAxis.line.width,
								'stroke' : styles.yAxis.line.color
							});
							xAxisGroup.attr({
								'stroke-width' : styles.xAxis.line.width,
								'stroke' : styles.xAxis.line.color
							});
							if ( Math.abs(xAxisGroup[0].attr('path')[0][1] - graphAttr.baseX) < 1.1 ) {
								xAxisGroup[0].attr({
									'stroke-width' : 0
								});
							}
							if ( styles.yAxis.line.underLine.use ) {
								yAxisUnderLine.attr({
									'stroke-width' : styles.yAxis.line.underLine.width,
									'stroke' : styles.yAxis.line.underLine.color
								});
							} 
							if ( styles.xAxis.line.underLine.use ) {
								xAxisUnderLine.attr({
									'stroke-width' : styles.xAxis.line.underLine.width,
									'stroke' : styles.xAxis.line.underLine.color
								});
							}
							if ( styles.trendLine.use ) {
								trendLine.attr({
									'stroke-width' : styles.trendLine.width
								});
							}
						})
					} else {
						group.attr({
							transform : trans
						});
						yAxisGroup.attr({
							'stroke-width' : styles.yAxis.line.width,
							'stroke' : styles.yAxis.line.color
						});
						xAxisGroup.attr({
							'stroke-width' : styles.xAxis.line.width,
							'stroke' : styles.yAxis.line.color
						});
						if ( Math.abs(xAxisGroup[0].attr('path')[0][1] - graphAttr.baseX) < 1.1 ) {
							xAxisGroup[0].attr({
								'stroke-width' : 0
							});
						}	
						if ( styles.yAxis.line.underLine.use ) {
							yAxisUnderLine.attr({
								'stroke-width' : styles.yAxis.line.underLine.width,
								'stroke' : styles.yAxis.line.underLine.color
							});
						} 
						if ( styles.xAxis.line.underLine.use ) {
							xAxisUnderLine.attr({
								'stroke-width' : styles.xAxis.line.underLine.width,
								'stroke' : styles.xAxis.line.underLine.color
							});
						}
						if ( styles.trendLine.use ) {
							trendLine.attr({
								'stroke-width' : styles.trendLine.width
							});
						}
					}
					toFrontPlot(plotGroup);
					clickCheck = true;
				}
			});
		}

		function getgraphAttr ( styles, scatterPlot ) {

			var graph = {};

			graph.baseX = Number(styles.layout.paddingLeft) + styles.yAxis.width + styles.yAxis.paddingRight + styles.yAxis.paddingLeft - lineError;
			graph.baseY = Number(styles.layout.paddingTop) - lineError;
			graph.baseWidth = scatterPlot.width() - graph.baseX - Number(styles.layout.paddingRight) - lineError;
			graph.baseHeight = scatterPlot.height() - graph.baseY - Number(styles.layout.paddingBottom) - styles.xAxis.paddingTop - styles.xAxis.height - lineError;
			graph.baseX2 = graph.baseX + graph.baseWidth;
			graph.baseY2 = graph.baseY + graph.baseHeight;

			graph.chartAreaX = graph.baseX + Number(styles.graph.paddingLeft) + lineError;
			graph.chartAreaY = graph.baseY + Number(styles.graph.paddingTop) + lineError;
			graph.chartAreaWidth = graph.baseWidth - Number(styles.graph.paddingLeft) - Number(styles.graph.paddingRight) - lineError * 2;
			graph.chartAreaHeight = graph.baseHeight - Number(styles.graph.paddingTop) - Number(styles.graph.paddingBottom) - lineError * 2;
			graph.chartAreaX2 = graph.chartAreaX + graph.chartAreaWidth;
			graph.chartAreaY2 = graph.chartAreaY + graph.chartAreaHeight;

			if ( styles.yAxis.position == 'right' ) {

				graph.baseX = Number(styles.layout.paddingLeft) - lineError;
				graph.baseY = Number(styles.layout.paddingTop) - lineError;
				graph.baseWidth = scatterPlot.width() - graph.baseX - Number(styles.layout.paddingRight) - lineError - styles.yAxis.width - styles.yAxis.paddingRight - styles.yAxis.paddingLeft ;
				graph.baseHeight = scatterPlot.height() - graph.baseY - Number(styles.layout.paddingBottom) - styles.xAxis.paddingTop - styles.xAxis.height - lineError;
				graph.baseX2 = graph.baseX + graph.baseWidth;
				graph.baseY2 = graph.baseY + graph.baseHeight;

				graph.chartAreaX = graph.baseX + Number(styles.graph.paddingLeft) + lineError;
				graph.chartAreaY = graph.baseY + Number(styles.graph.paddingTop) + lineError;
				graph.chartAreaWidth = graph.baseWidth - Number(styles.graph.paddingLeft) - Number(styles.graph.paddingRight) - lineError * 2;
				graph.chartAreaHeight = graph.baseHeight - Number(styles.graph.paddingTop) - Number(styles.graph.paddingBottom) - lineError * 2;
				graph.chartAreaX2 = graph.chartAreaX + graph.chartAreaWidth;
				graph.chartAreaY2 = graph.chartAreaY + graph.chartAreaHeight;
			}

			return graph;
		}

		function toFrontPlot ( plotGroup ) {

			var plotGroupLen = plotGroup.length;
			var sizeArr = [];
			
			for ( var i = plotGroupLen; i--; ) {
				sizeArr.push(plotGroup[i].data.plotSize);
			}
			
			sizeArr = sizeArr.sort();

			for ( var i = plotGroupLen; i--; ) {
				
				for ( var j = plotGroupLen; j--; ) {
					
					if ( sizeArr[i] == plotGroup[j].data.plotSize ) { 

						plotGroup[j].toFront();

					}
				}
			}

		}

		function getStartIndex ( timeSliceData, options ) {

			var index = 0;

			for ( var i = timeSliceData.length; i--; ) {
				if ( options.data.gubunOption == undefined && options.data.gubunOption == null) {
					index = timeSliceData.length - 1;
				} else if ( timeSliceData[i][0][options.data.gubun] == options.data.gubunOption ) {
	                index = i;
	            }
	        }

	        return index;
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

		function setAbsData ( data, options ) {

			var dataLength = data.length;

			for ( var i = dataLength; i--; ) {
				data[i][options.plot.select] = Math.abs(data[i][options.plot.select]);
			}

			return data;
		}

		function disabledSlider ( clickCheck, options, plotGroup, styles ) {

			plotGroup.click(function () {

				if ( styles.enlarge.use == true && styles.drag.use == true ) {
					if ( clickCheck == false ) {
						if ( elementType == 'SVG' && options.timeSlice.use == true ) {
							options.timeSlice.slider.slider( 'option', { disabled: true } );
						}
						clickCheck = true;			
					} else {
						if ( elementType == 'SVG' && options.timeSlice.use == true ) {
							options.timeSlice.slider.slider( 'option', { disabled: false } );
						}
						clickCheck = false;
					}
				}			
			})

			return clickCheck;
		}

		function setPathTrendLine ( data, graphAttr, trendLine, options ) {

			var path = getTrendLinePath( graphAttr, data );

			if ( options.timeSlice.animate.use == true && elementType == 'SVG' ) {
				trendLine.animate({
					path : path
				},options.timeSlice.animate.speed, options.timeSlice.animate.type)
			} else {
				trendLine.attr({
					path : path
				})
			}

			return trendLine;
		}

		function getTrendLinePath ( graphAttr, data ) {

			var sigmaX2 = 0;
			var sigmaXY = 0;
			var sigmaX = 0;
			var sigmaY = 0;
			var datalen = data.length;
			for ( var i = datalen; i --; ) {
				var dataI = data[i];
				sigmaX2 += (dataI.x * dataI.x);
				sigmaXY += (dataI.x * dataI.y);
				sigmaX += dataI.x;
				sigmaY += dataI.y;
			}
			var sxx = sigmaX2 - (sigmaX * sigmaX / datalen);
			var sxy = sigmaXY - (sigmaX * sigmaY / datalen);
			var _x = sigmaX / datalen;
			var _y = sigmaY / datalen;
			var B1 = sxy / sxx;
			var B0 = _y - (B1*_x);

			var zeroY = Math.floor(B0 + ( B1 * graphAttr.chartAreaX )) + lineError;
			var lastY = Math.floor(B0 + ( B1 * graphAttr.chartAreaX2 )) + lineError;
			var path = 'M' + graphAttr.chartAreaX + ',' + zeroY + 'L' + graphAttr.chartAreaX2 + ',' + lastY + 'Z';	

			return path;
		}

		function appendTrendLine ( svgElement, styles, graphAttr, data ) {

			var path = getTrendLinePath( graphAttr, data );
			
			var trendLine = svgElement.path();

			trendLine.attr({
				path : path,
				stroke : styles.trendLine.color,
				'stroke-width' : styles.trendLine.width,
				opacity : styles.trendLine.opacity
			})

			if ( styles.trendLine.animate.use == true && elementType == 'SVG') {
				var speed = styles.animate.speed / 2 - 100 / 2;
				setTimeout(function(){
					trendLine.animate({
						stroke : styles.trendLine.animate.color
					}, speed, function () {
						trendLine.animate({
							stroke : styles.trendLine.color
						}, speed)
					})
				},100)
			}
			
			return trendLine;
		}

		function getJsonValues ( obj, key ) {

		    var objects = [];
		    
		    for (var i in obj) {
		    
		        if ( !obj.hasOwnProperty(i) ) continue;
		    
		        if ( typeof obj[i] == 'object' ) {
		    		
		            objects = objects.concat(getJsonValues(obj[i], key));
		    
		        } else if ( i == key ) {

		            objects.push(obj[i]);

		            var url = 'url('+obj[i]+')';

		            obj = url;

		        }
		    }

		    return objects;
		}

		function appendTip ( scatterPlot, options ) {

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
			})

			tip.hide();

			return tip;
		}


		self.init = function (scatterPlot, style, option) {

			scatterPlot.css({
				'position' : "relative"
			})	

			/* styles extend */

			var styles = extendStyles(style);

			// url에 hash - #exportPDF를 붙이면 애니메이션이 동작하지 않는다.
			if (window.location.hash && window.location.hash.slice(1) === "skipAnimation") {

				styles.animate.use = false;
			}

			// var srcArr = getJsonValues(styles, 'color');

			/* graph 기본 attr 구하기 */

			var graphAttr = getgraphAttr(styles, scatterPlot);

			/* option extend */

			var options = extendOptions(option);

			/* data extend */

			var data = loadData(options);

			/* svg element 생성 */

			var svgElement = drawSvg(scatterPlot, styles);

			svgElement.event = $({});

			svgElement.event.on('drawCompleted', function () {

				scatterPlot.trigger('drawCompleted');
			});

			/* data가 없으면 noData처리한 svgElement 반환 */
            if(options.data.data == null || options.data.data === 'undefined'){

                noData(scatterPlot, svgElement);

                return svgElement;
            }

			/* options 의 plot 값이 음수일 경우 절대값으로 변환 */

            data = setAbsData(data, options);

            /* options.gubunOption 별로 분리한 data */

			var sliceData = setTimeSlice(data, options);	

			if ( options.data.reverse ) {
				sliceData.reverse();
			}

			/* options 의 gubun 에 해당하는 data */

			var gubunData = basicData(data, options, sliceData);	

			/* graph 가 그려지는 전체 영역 */

			var surroundPlot = drawSurroundPlot(styles, options, svgElement, graphAttr);

			/* plot 이 그려지는 영역 */

			var plotArea = drawPlotArea(styles, options, svgElement, graphAttr);

			/* plot 의 size 설정 */

			setPlotSize(styles, options, gubunData, scatterPlot);

			/* plot 의 x, y, 축 위치 설정 */

			var setData = setPlotPosition(options, gubunData, graphAttr);

			/* y 축 line 그리기 */

			var yAxisLine = drawYaxisLine(styles, options, setData, svgElement, graphAttr);

			/* y 축 under line 그리기 */

			if ( styles.yAxis.line.underLine.use ) {

				var yAxisUnderLine = drawYaxisUnderLine(styles, yAxisLine, graphAttr);
			}

			/* y 축 text 그리기 */

			var yAxisTextGroup = drawYaxisText(styles, options, setData, svgElement, yAxisLine, graphAttr);

			/* x 축 line 그리기 */

			var xAxisLine = drawXaxisLine(styles, options, setData, svgElement, graphAttr);

			/* x 축 under line 그리기 */

			if ( styles.xAxis.line.underLine.use ) {

				var xAxisUnderLine = drawXaxisUnderLine(styles, xAxisLine, yAxisLine);
			}

			/* x 축 text 그리기 */

			var xAxisTextGroup = drawXaxisText(styles, options, setData, svgElement, xAxisLine, graphAttr);

			/* y 축 tick 그리기 */

			if ( styles.yAxis.tick.use ) {

				var yAxisTick = drawYaxisTick(styles, svgElement, yAxisLine, graphAttr);
			}

			/* styles 의 fill color 에 image 가 있을 경우 url 형식으로 변환 */

			setFillColor(styles, options);

			/* draw plot */

			var plotGroup = drawPlot(styles, options, gubunData, svgElement, graphAttr);

			/* 회기분석에 따른 회기선 그리기 */

			if ( styles.trendLine.use ) {
				
				var trendLine = appendTrendLine(svgElement, styles, graphAttr, gubunData);
				trendLine = setPathTrendLine(setData, graphAttr, trendLine, options);	

			}

			/* plot size 에 따라 크기 순으로 plot 의 z-index 값 변경 */
			
			plotGroup.toFront();
			toFrontPlot(plotGroup);


			/* chart element 그룹화 */

			var group = svgElement.set();
			group.push(surroundPlot, plotArea, plotGroup);
			group.push(yAxisLine, xAxisLine, yAxisTextGroup)
			group.push(xAxisTextGroup, yAxisTick);
			group.push(yAxisUnderLine, xAxisUnderLine);	
			group.push(trendLine);

			/* mouse event */

			var tip = appendTip(scatterPlot, options);

			tip.appendTo(scatterPlot);

			mouseEvent(styles, options, svgElement, plotGroup, group, yAxisLine, xAxisLine, graphAttr, scatterPlot, tip, yAxisUnderLine, xAxisUnderLine, trendLine);

			svgElement.timeSliceInterval = null;
			svgElement.timeSlicePlayCheck = false;
			
			/* resize event */

			reSize(styles, options, scatterPlot, svgElement);


			if(!styles.hasOwnProperty('complete')){
				styles.isComplete = 'complete';
			}

			svgElement.drawYAxisLine = function () {
	        	yAxisLine = drawYaxisLine(styles, options, setData, svgElement, graphAttr);
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
	        	yAxisTextGroup = drawYaxisText(styles, options, setData, svgElement, yAxisLine, graphAttr);
	        }

			svgElement.getYAxisText = function () {		
				return yAxisTextGroup;
			}

			svgElement.drawXAxisLine = function () {
	        	xAxisLine = drawXaxisLine(styles, options, setData, svgElement, graphAttr);
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

			svgElement.drawXAxisText = function () {
	        	xAxisTextGroup = drawXaxisText(styles, options, setData, svgElement, xAxisLine, graphAttr);
	        }

			svgElement.getXAxisText = function () {		
				return xAxisTextGroup;
			}

			svgElement.drawYAxisTick = function () {
	        	yAxisTick = drawYaxisTick(styles, svgElement, yAxisLine, graphAttr);
	        }

			svgElement.getYAxisTick = function () {		
				return yAxisTick;
			}
			
			svgElement.getPlot = function () {		
				return plotGroup;
			}

			var startIndex = getStartIndex(sliceData, options);

			svgElement.getStartIndex = function () {

				return startIndex;		
			}

			svgElement.getTrendLine = function () {

				return trendLine;		
			}		

			svgElement.timeSlice = function ( index ) {
				eval(options.timeSlice.data)(sliceData[index]);

	            setPlotSize(styles, options, sliceData[index], scatterPlot);
				setData = setPlotPosition(options, sliceData[index], graphAttr);

				yAxisLine.remove();
				yAxisTextGroup.remove();			
				xAxisLine.remove();
				xAxisTextGroup.remove();

				svgElement.drawYAxisLine();
				svgElement.drawYAxisText();
				svgElement.drawXAxisLine();
				svgElement.drawXAxisText();

				if ( styles.yAxis.tick.use ) {
					yAxisTick.remove();
					svgElement.drawYAxisTick();
				}
				if ( styles.yAxis.line.underLine.use ) {
					yAxisUnderLine.remove();
					svgElement.drawYAxisUnderLine();
				}
				if ( styles.xAxis.line.underLine.use ) {
					xAxisUnderLine.remove();
					svgElement.drawXAxisUnderLine();
				}
				for ( var i = setData.length; i--; ) {
					var dataI = setData[i];
					dataI.x = Math.floor(dataI.x + graphAttr.chartAreaX);
					dataI.y = Math.floor(dataI.y + graphAttr.chartAreaY);
					if ( options.timeSlice.animate.use == true && elementType == 'SVG' ) {
						plotGroup[i].animate({
							cx : dataI.x,
							cy : dataI.y,
							r : dataI.plotSize
						},options.timeSlice.animate.speed, options.timeSlice.animate.type)
					} else {
						plotGroup[i].attr({
							cx : dataI.x,
							cy : dataI.y,
							r : dataI.plotSize
						})
					}
					if ( styles.series.area.type == 'upDown' ) {
						var upDownColor = styles.series.area.up.color;
						var upDownOpacity = styles.series.area.up.opacity;
						if ( Number(dataI[options.yAxis.select]) < Number(dataI[options.xAxis.select]) ) {			
							upDownColor = styles.series.area.down.color;
							upDownOpacity = styles.series.area.down.opacity;
						}			
						plotGroup[i].attr({
							fill : upDownColor,
							opacity : upDownOpacity
						})	
					}
					plotGroup[i].data = dataI;
				}

				if ( styles.trendLine.use ) {
					trendLine = setPathTrendLine(setData, graphAttr, trendLine, options);
					trendLine.toFront();	
				}
				
				plotGroup.toFront();

				toFrontPlot(plotGroup);

				group = svgElement.set();
				group.push(surroundPlot, plotArea, plotGroup);
				group.push(yAxisLine, xAxisLine, yAxisTextGroup)
				group.push(xAxisTextGroup, yAxisTick);
				group.push(yAxisUnderLine, xAxisUnderLine);
				group.push(trendLine);

				mouseEvent(styles, options, svgElement, plotGroup, group, yAxisLine, xAxisLine, graphAttr, scatterPlot, tip, yAxisUnderLine, xAxisUnderLine, trendLine);

			}

			var clickCheck = false;

			disabledSlider(clickCheck, options, plotGroup, styles);

			if( options.timeSlice.use ){
				
				clearInterval(svgElement.timeSliceInterval);
				options.timeSlice.play.unbind('click');
				options.timeSlice.pause.unbind('click');
				options.timeSlice.stop.unbind('click');
				
				eval(options.timeSlice.data)(sliceData[startIndex]);
				var slideStartIndex = 0;
				
				options.timeSlice.slider.slider({
		            range: 'max',
		            min: 0,
		            max: sliceData.length-1,
		            value: startIndex,
		            slide: function( event, ui ) {
		            	clearInterval(svgElement.timeSliceInterval);
		                startIndex = ui.value;
		                svgElement.timeSlice(startIndex);
		                slideStartIndex = ui.value;

		                disabledSlider(clickCheck, options, plotGroup, styles);

		                svgElement.timeSlicePlayCheck = false;
		            }
		        });

		        options.timeSlice.play.click(function (){

					if(!svgElement.timeSlicePlayCheck){

						if (sliceData.length -1 === startIndex) {

							startIndex = 0;
						}

					    svgElement.timeSliceInterval = setInterval ( function () {	
			        
					        svgElement.timeSlice(startIndex);				        
					        options.timeSlice.slider.slider({
					            value: startIndex
					        });

					        plotGroup.unclick();
					        plotGroup.undrag();

					        startIndex += 1;
					        if( startIndex > sliceData.length-1 ) {
					            clearInterval(svgElement.timeSliceInterval);
		            			svgElement.timeSlicePlayCheck = false;

					            startIndex = sliceData.length-1;
					        }
					    }, options.timeSlice.delay);
					    svgElement.timeSlicePlayCheck = true;
					}
				})

		        options.timeSlice.pause.click(function (){

		            clearInterval(svgElement.timeSliceInterval);
		            mouseEvent(styles, options, svgElement, plotGroup, group, yAxisLine, xAxisLine, graphAttr, scatterPlot, tip, yAxisUnderLine, xAxisUnderLine, trendLine);
		            disabledSlider(clickCheck, options, plotGroup, styles);
		            svgElement.timeSlicePlayCheck = false;

		        })

		        options.timeSlice.stop.click(function (){

		            clearInterval(svgElement.timeSliceInterval);
		            options.timeSlice.slider.slider({
			            value: sliceData.length-1
			        });
		            svgElement.timeSlice(sliceData.length-1);
		            startIndex = sliceData.length-1;
		            disabledSlider(clickCheck, options, plotGroup, styles);
		            svgElement.timeSlicePlayCheck = false;

		        })
			}

			svgElement.inquery = function( _options ) {
				
				clearInterval(svgElement.timeSliceInterval);
	            svgElement.timeSlicePlayCheck = false;
				
				options = $.extend(true, options, _options);

				scatterPlot.children().remove();
				options.timeSlice.play.unbind('click');
				options.timeSlice.pause.unbind('click');
				options.timeSlice.stop.unbind('click');
				options.timeSlice.slider.unbind('click');

				self.init(scatterPlot, styles, options);

			};

			svgElement.resize = function () {

				scatterPlot.children().remove();

				clearInterval(svgElement.timeSliceInterval);

				self.init(scatterPlot, styles, options);
			}

            svgElement.reDraw = function(style, option, redraw) {
                if(style !== undefined ){
                    styles = extendStyles(style);
                }
                if(option !== undefined){
                    options = extendOptions(option);
                    options.data.data = loadData(option);
                }
                if(redraw !== false){
                    scatterPlot.children().remove();
                    self.init(scatterPlot, styles, options);
                }
            }


			if (TRIAL_UI) {

				appendTrialUi(scatterPlot);
			}

			/**
				license object chart 에 추가(ver.150915 평다진)
			*/
			svgElement.license = licenseObject;

			/**
			 * wrapper(jQuery selector)에 저장(ver. 160318 평다진)
			 */
			scatterPlot[0].instance = svgElement;

	 		return svgElement;
		};

		if (!window.webponent){
			window.webponent = {};
		}
		if (!window.webponent.visual) {
			window.webponent.visual = {};
		}

		window.webponent.visual.scatterPlot = self;

	 })();

})();


