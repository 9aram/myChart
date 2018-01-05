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
					paddingLeft : 10,
					paddingRight : 10,
					paddingTop : 10,
					paddingBottom : 10
				},
				animate : {
			    	use : true,
					delay : 50,
			    	type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut */
			    	speed : 200				     	
			    },
			    label : {
			    	position : {
			    		x : 3,
			    		y : 3
			    	},
			    	area : {
			    		color : '#fff',
			    		opacity: 0,
			    		paddingTop : 3,
			    		paddingBottom : 3,
			    		paddingLeft : 3,
			    		paddingRight : 3
			    	},
			    	line : {
			    		color : '#dad9d8',
			    		width : 1,
			    		opacity : 1
			    	},
			    	text: {
			            family: 'Nanum Gothic', 
			            size: 13, 
			            color: '#000', 
			            style: 'normal', 	/* normal | italic */
			            weight: 'bold',	/* normal | bold */
			            opacity: 1,
			            vmlFont: false // true로 변경시 VML 환경에서는 Dotum으로 고정
			        }
			    },
				group : {
					line : {
			    		width : 3,
			    		color : '#f8f8f8',
			    		opacity : 1
					},
					hover : {
						use : false,
						color : '#000',
						opacity : 0.3
					}
				},
				item : {
					line : {
						width : 2,
						color : '#f8f8f8'
					},
					area : {
						color : [
			                '#ff625f', '#f69493', '#ffd3d3', '#ffffff',
							'#bee1f0', '#61b8e1', '#0093d8'
						],
						opacity : 1					
					},
					hover : {
						line : {
							color: '#3a464f', 
			          		width: 4,
			          		opacity : 1
						},
						area : {
							opacity: 0,
			            	color : '#fff'
						}
					}
				},
				enterGroup : {
					use : false,
					animate : {
						use : false,
						speed : 300,
						type : 'linear' /* linear|>|<|<>|bounce|elastic|backln|backOut */
					},
					interFace : {
						animate : {
							use : false,
							speed : 300,
							type : 'linear' /* linear|>|<|<>|bounce|elastic|backln|backOut */
						},
						group : {
							width : 220,
							line : {
				        		width : 1,
				        		color : '#fff'
							},
							area : {
								color : '#666666',
								opacity : 1
							},
							hover : {
								line : {
									color: '#fff', 
				              		width: 1,
				              		opacity : 1
								},
								area : {
									opacity: 1,
					            	color : 'ff0000'
								}
							}
						},
						button : {
							width : 30,
							height : 30,
							back : {
								src : '../img/treemap_backBtn.png' 		
							},
							toggle : {						
								open : {
									src : '../img/treemap_upBtn.png'
								},
								close : {
									src : '../img/treemap_downBtn.png'	
								}
							}
						},
						base : {
							paddingTop : 0,					
				            line : {
				        		width : 3,
				        		color : '#000'
							},
							area : {
								color : '#fff',
								opacity : 1
							}
						},
						text : {
							family: 'dotum', 
			                size: 13, 
			                color: '#000', 
			                align: 'right',		/* left | center | right */
			                style: 'normal', 	/* normal | italic */
			                weight: 'normal',	/* normal | bold */
			                opacity: 1
						}
					}
				}	
			};

			return defaultStyles;
		}

		function getDefaultOptions () {

			var defaultOptions = {
				data : {
					data : null,
					url: '',
					type: 'json',
					jsonDepth: 'output.result',
					use : '',
					flag : '',
					group : '',
					groupName : '',
					item : ''
				},
				mousemove : function (data) {

		        },
		        loadingBar : {
		        	use : false,
		        	select : ''
		        },
		        resize : {
		        	use : false
		        }
			};

			return defaultOptions;
		}

		/* get svg type */

		var elementType = getElementType();

		function getElementType () {

			var g = {doc: document, win: window};

			var elementType = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");

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

		// Number Format 1,000
		priceDataFormat = function(txt) {
			if(txt==0) return 0;

		    var reg = /(^[+-]?\d+)(\d{3})/;
		    var n = (txt + '');

		    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

		    return n;
		};

		/* styles extend */

		function extendStyles (style) {

			var defaultStyles = getDefaultStyles();

			var styles = $.extend(true, defaultStyles, style);

			if(elementType === 'VML' && styles.label.text.vmlFont) {

				styles.label.text.family = 'Dotum';
				styles.enterGroup.interFace.text.family = 'Dotum';
			}

			return styles;
		}

		/* options extend */

		function extendOptions (option) {

			var defaultOptions = getDefaultOptions();

			var option = $.extend(true, defaultOptions, option);

			return option;
		}

		/* load data */

		function loadData (options) {

			var data = [];
			
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
         * @param  {treemap} pie 객체
         */
        function noData (treemap, svgElement) {

            var x = treemap.width() / 2;
            var y = treemap.height() / 2;
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

		function loadBlock (options) {
			
			var data = options.data.data;
		
			return data;
		}

		/* data type - json */

		function loadJson (data2, options) {

			// var arr = data2["output"]["block_chart"];
			
			var bld_depth = options.data.jsonDepth.split('.');
			var outPut = bld_depth[0];
			var result = bld_depth[1];
			var arr = data2[outPut][result];

			return arr;
		}

		/* data type - text */

		function loadText (data2, options) {

			var arr = [];
			var data = data2;
			var lineArr = data.split('\n');
			var dataTitles = [];
			var titleCheck = true;

			var lineArrlength = lineArr.length;

			for ( var i = 0; i < lineArrlength; i++) {
				if (lineArr.length <= 1){
					continue;
				}
				
				var objArr = lineArr[i].split('|');
				var objArrlength = objArr.length;
				
				if (lineArr[i].indexOf("companyname") > -1 || objArr.length <= 1) {
				
				} else {
					if (titleCheck) {
						for ( var j = objArrlength; j--;) {
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
						});
						arr.push(obj);
					}
				}
			}

			return arr;
		}

		var trim = function(str) {
			str = str.replace(/(^\s*)|(\s*$)/gi, "");
			return str;
		};

		function parseDatasJson ( data, options ) {

			var total = 0;
			var dataLen = data.length;
			var dataArr = [];
			var cnt = 0;
			var dG = options.data.group;
			var dN = options.data.groupName;
			var dI = options.data.item;
			var dU = options.data.use;
			var groupArr = [];

			dataArr[0] = {};
			dataArr[0].data = [];
			dataArr[0].name = data[0][dN];
			dataArr[0].group = data[0][dG];
			groupArr.push(data[0][dG]);

			for ( var i = 0; i < dataLen; i++ ) {
				var dataI = data[i];

				dataI.name = dataI[dI];

				var groupIdx = $.inArray(data[i][dG],groupArr);
				if(groupIdx > -1){
					dataArr[groupIdx].data.push(dataI);
				}else{
					cnt++;
					dataArr[cnt] = {};
					dataArr[cnt].data = [];
					dataArr[cnt].data.push(dataI);
					dataArr[cnt].name = dataI[dN];
					dataArr[cnt].group = dataI[dG];
					groupArr.push(data[i][dG]);
				}
			}

			/* 각 업종별 종목의 total 값을 구함 */

			var dataLen = dataArr.length;

			for ( var i = 0; i < dataLen; i++ ) {

				var dataArrDataLength = dataArr[i].data.length;

				for ( var j = 0; j < dataArrDataLength; j++ ) {
					total += Number(dataArr[i].data[j][dU]);
				}		
				dataArr[i].total = total;
				total = 0;
			}		

			return dataArr;
		};

		function parseDatasText ( data, options ) {
		
			var total = 0;		
			var dataArr = [];
			var dataLength = data.length;				
			var group = 0;
			var k = -1;
			var startIdx = 0;
			var stopIdx = 0;
			var total = 0;

			/* data type 이 text 형식 일때 */			

			for ( i = 0; i < dataLength; i ++ ) {
				var dataI = data[i];
				var group = dataI[options.data.group];	

				if ( i == 0 ) {
					var itemGroup = dataI[options.data.group]; 
				}
				
				if ( dataI[options.data.group] == "" ) { 				
						group = "null";
				}

				/* data type 이 text 형식일 경우 종목으로 분류 */
				
				if ( itemGroup == group ) {
					
					total += Number(dataI[options.data.use]);					
					stopIdx = i+1;
					
					if ( i == dataLength - 1 ) {
						dataArr.push({
							"code": data[startIdx].code, 
							"group": itemGroup, 
							"total": total, 
							"name": data[startIdx][options.data.groupName], 
							"flag": data[startIdx].flag, 
							"data": []
						});

						var dataArrLength = dataArr.length - 1;
						var subDataArr = dataArr[dataArrLength].data;

						for ( j = startIdx; j < stopIdx; j++ ) {
							var obj = {};
							var dataI = data[j];
							for ( k in dataI ) {								
								obj[k] = dataI[k];
							}
							subDataArr.push(obj);
						}
					}
				} else {

					/*data type 이 text 형식일 경우 업종으로 분류*/				
					dataArr.push({
						"code": data[startIdx].code, 
						"group": itemGroup, 
						"total": total, 
						"name": data[startIdx][options.data.groupName], 
						"flag": data[startIdx].flag, 
						"data": []
					});

					var dataArrLength = dataArr.length - 1;
					var subDataArr = dataArr[dataArrLength].data;
				
					for ( j = startIdx; j < stopIdx; j++ ) {						
						var obj = {};
						for ( k in data[j] ) {
							obj[k] = data[j][k];
						}			
						obj["groupname"] = dataI[options.data.groupName];					
						subDataArr.push(obj);
					}
					startIdx = i;
					stopIdx = i;					
					itemGroup = (dataI[options.data.group] == "") ? "null" : dataI[options.data.group];					
					total = 0;					
					i --;
				}
			}
			
			return dataArr;
		};

		/* 각 업종의 total 값을 기준으로 내림차순 */

		function sortTotal ( data ) {
			
			var dataArr = [];
			var check = true;
			var dataLen = data.length;

			for ( var i = 0; i < dataLen; i++ ){
				var dataI = data[i];
				if(i == 0){
					dataArr.push(dataI);
				} else {
					for ( var j = 0; j < dataArr.length; j++ ) {
						if(dataI.total > dataArr[j].total){
							dataArr.splice(j, 0, dataI);
							check = false;
							break;
						} else {
							check = true;
						}
					}
					if(check){
						dataArr.push(dataI);
					}
				}		
			}
			return dataArr;
		}
		
		/* 해당 업종 내에서 각 종목별 options.data.use 값을 기준으로 sort */
		
		function sortUse ( options, data ) {

			var dataLen = data.length;

			for ( var i = 0; i < dataLen; i++ ){
				data[i].data.sort(sort);
			}	

			function sort ( a, b ) {

				if ( Number(a[options.data.use]) == Number(b[options.data.use]) ) { 
					return 0;
				} 		
				
				return Number(a[options.data.use]) < Number(b[options.data.use])? 1 : -1;
			}

			return data;		
		}	

		function setLowerCase( arr ) {
			for ( var i in arr ) {				
				lowerCase(i, arr[i], arr);
			}		
		}

		function lowerCase ( name, value, arr ) {
			name = name.toLowerCase();
			arr[name] = value;		
		}

		/* 그룹 data total 구하기 */

		function getTotalData ( data ) { 
			
			var t = 0;
			var dataLen = data.length;

			for ( var i = dataLen; i--; ) {
				t += data[i].total;
			}

			return t;
		}

		function getItemValue (data, svgArea, total, use) {

			var area = svgArea;
			var dataArr = [];
			var dataLen = data.length;		

			for ( var i = dataLen; i--; ) {	
				var gDataArr = setCSVal(data[i], use, svgArea, total);			
				dataArr.unshift(gDataArr);		
			}	
			return dataArr;
		}

		function setCSVal ( data, use, svgArea, total) {

			var obj = {};
			var itemArea = 0;

			for( var i in data ) {
				obj[i] = data[i];	
			}

			itemArea = svgArea * (Number(obj[use]) / total);

			obj.price = obj[use];
			obj.itemarea = itemArea;
			obj.data = [];

			return obj;
		}

		/* get max ratio */

		function getMaxRatio (itemArr, itemWidth, itemHeight, maxLine) {

			var w = 0;
			var h = 0;
			var maxRatio = 0;
			var itemarea = itemArr.itemarea;

			if(maxLine == "w") {
				w = itemarea / itemHeight; 
				h = itemarea / w; 
			} else {
				h = itemarea / itemWidth; 
				w = itemarea / h; 
			}

			maxRatio = Math.max(w/h, h/w); 

			return maxRatio;
		}
		
		/* 해당 아이템의 속성 값 계산 */

		function getAttr (itemWidth, itemHeight, itemArr) {		

			var itemArrLength = itemArr.length;

			for( var i = 0; i < itemArrLength; i++){

				var thisItem = itemArr[i];
				var maxLine = getMaxLine ( itemWidth, itemHeight );
				var maxRatio = getMaxRatio(thisItem, itemWidth, itemHeight, maxLine);
				var plusItemWidth = thisItem.itemarea;
				var mh = 999999999999999999;	
				var mr = -999999999999999999;
				var mw = 0;
				var oh = 9999999999999999;
				var objWidth = 0;
				var objHeight = 0;

				for ( var j = i + 1; j < itemArrLength; j ++) {

					plusItemWidth += itemArr[j].itemarea;
					if ( maxLine == "w" ) {
						mw = plusItemWidth / itemHeight;
					} else {
						mw = plusItemWidth / itemWidth;
					}
					for ( var k = i; k < j + 1; k++ ) {
						mh = (itemArr[k].itemarea / mw > mh) ? mh : itemArr[k].itemarea / mw;
						mr = (mw / mh < mh / mw) ? mh / mw : mw / mh;
					}
					if ( maxRatio > mr ) {
						maxRatio = mr;
					} else {						
						plusItemWidth -= itemArr[j].itemarea;
						if ( maxLine == "w") {	
							objWidth = plusItemWidth / itemHeight;	
							for(k = i; k < j; k++) {
								var item = itemArr[k];
								objHeight = (item.itemarea / objWidth > oh) ?  oh : item.itemarea / objWidth;
								item.width = objWidth;
								item.height = objHeight;
								item.idx = k;
								item.way = maxLine;
							}
							itemWidth = itemWidth - objWidth;	
						} else {
							objHeight = plusItemWidth / itemWidth;	
							for(k = i; k < j; k++) {	
								var item = itemArr[k];
								objWidth = (item.itemarea / objHeight > oh) ?  oh : item.itemarea / objHeight;
								item.width = objWidth;
								item.height = objHeight;
								item.idx = k;
								item.way = maxLine;
							}
							itemHeight = itemHeight - objHeight;
						}
						i = j - 1;
						break;
					}
				}

				/* 마지막 그룹의 아이템 attr */

				if( i + 1 == itemArr.length){
					var lastItem = itemArr[itemArr.length-1];			
					objWidth = (lastItem.itemarea / itemHeight > oh) ?  oh : lastItem.itemarea / itemHeight;
					objHeight = (lastItem.itemarea / itemWidth > oh) ?  oh : lastItem.itemarea / itemWidth;
					if(maxLine == "w"){
						lastItem.width = thisItem.itemarea / itemHeight;
						lastItem.height = objHeight;
					} else {
						lastItem.width = objWidth;
						lastItem.height = thisItem.itemarea / itemWidth;	
					}
					lastItem.idx = i;
					lastItem.way = maxLine;				
				}
			}		
			return itemArr;
		};

		/* width 와 height 값 중 높은 값 */

		function getMaxLine ( w, h ) {
			if(w >= h){
				return "w";
			} else {
				return "h";
			}
		};

		/* get random color */

		function getRandomColor() {

		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.round(Math.random() * 15)];
		    }

		    return color;
		}

		/* get max */

		function getMax (width, height) {

			if(width >= height){
				return width;
			} else {
				return height;
			}
		}

		/* 해당 아이템의 x 축, y 축 좌표 값 계산 */

		function getGroupPosition ( itemAttrObj, depth, x, y, areaWidth, areaHeight ) {

			var stackY = 0;
			var stackX = 0;
			var itemArrObjLength = itemAttrObj.length;

			for ( var i = 0; i < itemArrObjLength; i++ ) {

				var item = itemAttrObj[i], prev = itemAttrObj[i-1];
				if ( i == 0 ) {
					if ( depth == "1" ) {					
						item.x = 0;
						item.y = 0;
					} else {
						item.x = x;
						item.y = y;
					}	
					point = item;	
				} else {
					if ( item.way == "w" ) {
						item.x = point.x;
						item.y = prev.y + prev.height;
					} else {
						item.x = prev.x + prev.width;
						item.y = point.y;
					}
					if ( prev.way != item.way ) {				
						point = item;
						stackY = 0;
						stackX = 0;	
					} else {					
						if ( item.way == "w") {					
							
							stackY += prev.height;

							if ( stackY + point.y - y >= areaHeight - 0.001) {
								item.x = point.x + point.width;
								item.y = point.y;
								point = item;
								stackY = 0;						
							} 

						} else {

							stackX += prev.width;

							if ( stackX + point.x - x >= areaWidth - 0.01) {
								item.x = point.x;
								item.y = point.y + point.height;
								point = item;
								stackX = 0;						
							}
						}
					}
				}
			}
			return itemAttrObj;
		}
			

		/* append text box */

		function appendTextContainer ( svgElement, data ) {

			var textContainerGroup = svgElement.set();
			var dataLength = data.length;

			for ( var i = 0; i < dataLength; i++ ) {		
				
				var textContainer = svgElement.rect();
				
				textContainerGroup.push(textContainer);
			}
			return textContainerGroup;
		}

		/* append text */

		function appendTextElement ( svgElement, data ) {

			var textGroup = svgElement.set();
			var dataLength = data.length;

			for ( var i = 0; i < dataLength; i++ ) {		
				
				var textElement = svgElement.text( 0, 0, data[i].name);

				textElement.data = data[i];		

				textGroup.push(textElement);
			}
			return textGroup;
		}



		function getStepDataArr ( data, styles, options ) {

			var datArr = [];	
			var maxData = getMaxData(data, options.data.flag);
			var maxDataLen = Number(maxData);
			var dataLen = data.length;
			var dF = options.data.flag;

			for ( var i = maxDataLen; i--; ) {
				datArr[i] = [];
			}			
			
			for ( var i = dataLen; i--; ) {

				var dataI = data[i];
				var flag = dataI[dF] - 1;			

				datArr[flag].push(dataI);
				
			}

			return datArr;

		}

		function getPath ( thisStepData ) {

			var path = "";	
			var stepDataLength = thisStepData.length - 1;	

			for ( var j = stepDataLength; j >= 0; j-- ) {

				var thisStepDataItem = thisStepData[j];

				var x = thisStepDataItem.x;
				var y = thisStepDataItem.y;
				var xw = x + thisStepDataItem.width;
				var yh = y + thisStepDataItem.height;
				
				path += "M" + x + "," + y + "," + xw + "," + y + "," + xw + "," + yh + "," + x + "," + yh + "," + x + "," + y;
			}

			return path;
		}

		function drawStepElement ( svgElement, stepDataArr, options, styles ) {
			
			var elementGroup = svgElement.set();
			var itemstrokewidth = styles.item.line.width;
			var itemstrokecolor = styles.item.line.color;

			if ( elementType == 'SVG' && styles.animate.use == true ) {

				for ( var i = 0; i < stepDataArr.length; i++ ) {
					
					path = getPath(stepDataArr[i]);
					
					var elementPath = svgElement.path().attr({
						path : path,
						stroke : itemstrokecolor,
						'stroke-width' : itemstrokewidth,
						opacity: 0,
						transform:'s0.3, 0.3'
					});

					elementPath.flag = i;
					elementGroup.push(elementPath);					
				}

			} else {
				
				for ( var i = 0; i < stepDataArr.length; i++ ) {
					
					path = getPath(stepDataArr[i]);
					
					var elementPath = svgElement.path().attr({
						path : path,
						stroke : itemstrokecolor,
						'stroke-width' : itemstrokewidth	
					});	

					elementPath.flag = i;	
					elementGroup.push(elementPath);					
				}	
			}
			return elementGroup;
		}

		function getDelay ( animate ) {
			
			var delay = animate.speed;

			if ( animate.use != true ) {
				delay = 1;
			}

			return delay;
		}

		function setStepElementAttr (svgElement, subElement, stepDataArr, styles, options ) {

			var i = 0;

			var delay = styles.animate.delay;

			if ( styles.animate.use != true ) {
				delay = 5;
			}

			var imageLoadCheck = setInterval( function () {		

				var flag = null;
				if ( stepDataArr[i][0] != undefined ) {				
					flag = stepDataArr[i][0][options.data.flag];
				}
				
				if ( elementType == 'SVG' && styles.animate.use == true ) {

					subElement[i].attr({
						fill : styles.item.area.color[flag-1]
					})
					subElement[i].animate({
						transform:'s1,1',
						opacity:1,
						'stroke-width' : styles.item.line.width
					}, styles.animate.speed, styles.animate.type)
				} else {
					subElement[i].attr({
						fill : styles.item.area.color[flag-1]
					})
				}

				i += 1;
				
				if ( i > subElement.length - 1 ) {

					clearInterval(imageLoadCheck);

					setTimeout( function () {

						options.drawLoadComplete = true;

						svgElement.event.trigger('drawCompleted', [svgElement]);

					}, styles.animate.speed, 100);
				}
			}, delay);

			return subElement;
		}
		var TOUCHDEVICE = false;
		if(('createTouch' in document) || ('ontouchstart' in document)){
			TOUCHDEVICE = true;
		}
		function getMousePosition (e, treemap){

			var m = {};
			e = e || window.event;
		    var TYPE = elementType;
		    if(TYPE === 'VML'){
		    	if ( e.pageX != undefined ) {
			    	var offset = $(treemap).offset();
					m.x = e.pageX-offset.left;
					m.y = e.pageY-offset.top;
		    	} else {
					m.x = Math.round(e.x) + 0.5, m.y = Math.round(e.y) + 0.5;
		    	}
			} else {
			    var appName = navigator.appName.toLowerCase();
			    var userAgent = navigator.userAgent.toLowerCase();
			    if(TOUCHDEVICE){
			    	m.x = Math.round(e.offsetX), m.y = Math.round(e.offsetY);
			    } else {
		    		if(userAgent.indexOf('firefox') > -1 ){ // FireFox
		    			if(e.originalEvent != undefined){
		    				m.x = e.originalEvent.layerX;
		    				m.y = e.originalEvent.layerY;

		    			} else {
		    				m.x = Math.round(e.layerX);
		    				m.y = Math.round(e.layerY);					
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
				
		    }
			return m;
		};


		// function getMousePosition ( e, treemap ) {		

		// 	var position = {};

		// 	position.x = 0;
		// 	position.y = 0;
			 
		// 	if (!e) {
		// 		var e = window.event;
		// 	} 		
		// 	if ( e.pageX || e.pageY )  {			
		// 		position.x = e.pageX - treemap[0].offsetLeft;
		// 		position.y = e.pageY - treemap[0].offsetTop;		
		// 	} else if (e.clientX || e.clientY)  {
		// 		position.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - treemap[0].offsetLeft;
		// 		position.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - treemap[0].offsetTop;
		// 	}
		// 	return position;
		// }

		function getMinData (data, options) {

			var minData = data[0][options];
			var dataLength = data.length - 1;

			for ( var i = dataLength; i >= 0; i-- ) {

				if ( Number(minData) > Number(data[i][options]) ) {

					minData = data[i][options];
				}
			}

			return minData;
		}

		function getMaxData (data, options) {
		
			var maxData = data[0][options];
			var dataLength = data.length - 1;

			for ( var i = dataLength; i >= 0; i-- ) {

				if ( Number(maxData) < Number(data[i][options]) ) {

					maxData = data[i][options];
					
				}
			}

			return maxData;
		}

		function useStepOption ( data, options ) {
		
			var stepArr = options.step;
			var dataLength = data.length;
			var stepArrLength = stepArr.length;			

			for ( var i = 0 ; i < dataLength; i++ ) {

				var thisData = data[i];
				var elementData = thisData[options.data.use];

				for ( var k = 0; k < stepArrLength; k++ ) {

					if ( k == 0 ) {

						if ( elementData < stepArr[k] ) {
							thisData.step = k;							
						}

					} else {						
						if ( stepArr[k-1] <= elementData && elementData < stepArr[k] ) {
							thisData.step = k;						

							break;

						} else if ( stepArr[stepArr.length-1] < elementData ) {
							thisData.step = k;							

							break;
						}
					}
				}			
			}	

			return data;			
		}		

		function basicStepOption ( data, options, styles ) {

			var minData = getMinData(data, options.data.use);

			var maxData = getMaxData(data, options.data.use);
		
			var dataArr = ( maxData - minData ) / ( styles.item.area.color.length - 1 );
			var dataLength = data.length;

			for ( var i = 0; i < dataLength; i++ ) {

				var dataDiv = Math.floor(data[i][options.data.use] / dataArr);
				var itemfillcolors = styles.item.area.color[dataDiv];

				data[i].step = dataDiv;
			}

			return data;
		}

		function setDataObj ( data ) {
			
			var setData = [];
			var dataLen = data.length;

			for ( var i = dataLen; i--; ) {
				
				var dataI = data[i];
				var dataILength = dataI.data.length;
				
				for ( var j = dataILength; j--; ) {
					
					setData.push(dataI.data[j]);

				}
			}

			return setData;
		}

		function getImage (styles, options) {
			var images = [];

			for(var i in styles){

				if ( styles[i].hasOwnProperty('src') ){
					
					var obj = {};
					obj.key = i;
					obj.src = styles[i].src;
					images.push(obj);
				
				} else if ( typeof styles[i] == "object" ) {
					for (var j in styles[i]) {
						if ( styles[i][j].hasOwnProperty('src') ){
							var obj = {};
							obj.key = i;
							obj.src = styles[i][j].src;
							images.push(obj);
						}
					}
				}
			}

			if ( images[0] == undefined ) {
				 options.imageLoadComplete = true;
			}

			return images;
		}

		function loadImages (images, styles, options) {

			var imgArr = [];
			var count = images.length;

			if ( images.length > 0 ) {

				var thingToDoCompleted = function (img, styles, options) {

					count--;

					if (0 == count) {
						imageLoadComplete(imgArr, styles, options);
					}
				};
				loader(images, thingToDoCompleted, styles, options, imgArr);
			}
		}

		function loader (images, thingToDoCompleted, styles, options, imgArr) {

			var imagesLength = images.length - 1;
			
			if(!images) return;

			if("undefined" === images.length) {
				images = [images];
			}
			for ( var i = imagesLength; i >= 0; i-- ) {
				loadImage(images, i, thingToDoCompleted, styles, options, imgArr);
			}
		}

		function loadImage (images, i, thingToDoCompleted, styles, options, imgArr) {
			
			var img = new Image();

			img.onload = function(e){
				img.onload = img.onerror = null;
				img.key = images[i].key;
				imgArr.push(img);
				thingToDoCompleted(img, styles, options);
			};
			img.onerror = function(e){
				log(e.message);
			};
			img.src = images[i].src;
		}

		function imageLoadComplete (imgArr, styles, options) {

			options.imageLoadComplete = true;

			if ( imgArr.length == 1 ) {
				styles[imgArr[0].key].src = imgArr[0].src;
			} 
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

		function setFillColor (styles, options) {

			var color = null;
			var fillstyle = styles.item.area.color;

			if ( fillstyle.hasOwnProperty('src') || fillstyle[0].hasOwnProperty('src')) {
				color = fillColorPattern(fillstyle);		
			} else {
				color = fillstyle;		
			}
			styles.item.area.color = color;
			options.imageDrawCheck = true;

			return color;
		}

		function drawHoverBox ( svgElement, styles ) {

			var hoverBox = svgElement.rect();

			hoverBox.attr({
				stroke : styles.item.hover.line.color,
				'stroke-width' : styles.item.hover.line.width,
				'stroke-opacity' : styles.item.hover.line.opacity,
				fill : styles.item.hover.area.color,
				'fill-opacity' : styles.item.hover.area.opacity
			});

			return hoverBox;
		}

		/* hover box mouse event */

		function mouseEvent ( svgElement, subElement, treemap, stepDataArr, groupData, styles, textGroup, options, groupHoverSet ) {

			var hoverBox = drawHoverBox(svgElement, styles);
			var subElementLength = subElement.length - 1;	

			subElement.mousemove(function (e) {

				var _this = this;
				var TYPE = elementType;
		    	if(TYPE === 'VML'){

					setHoverBox(_this, e, treemap, hoverBox, stepDataArr, options);
				} else {
					setTimeout(function () {

						setHoverBox(_this, e, treemap, hoverBox, stepDataArr, options);

					}, 0);
				}
			});

			if ( styles.enterGroup.use ) {

				var x = styles.layout.paddingLeft;
				var x2 = treemap.width() - styles.layout.paddingRight;
				var y = styles.layout.paddingTop;
				var y2 = treemap.height() - styles.layout.paddingBottom;

				treemap.off('mousedown').on('mousedown', function(e) {	

					var mp = getMousePosition(e, treemap);								

					if ( mp.x > x && mp.x < x2 && mp.y > y && mp.y < y2 ) {

						hoverBox.attr({
							width: 0,
							height: 0
						});

						getSelectedData(e, svgElement, groupData, mp);

						enterGroup(styles, options, treemap, svgElement, e, groupData, subElement,  stepDataArr, textGroup, hoverBox, groupHoverSet);				
					}
				});
			}
		}

		function getSelectedData (e, svgElement, data, position) {

			for (var i = 0 ; i < data.length; i++) {

				var x = data[i].x, y = data[i].y;
				var xw = x + data[i].width, yh = y + data[i].height;

				if ( x < position.x && position.x <= xw && y < position.y && position.y <= yh ) {

					if (data[i].data.length > 0) {

						getSelectedData(e, svgElement, data[i].data, position);

					} else {

						var selectedData = data[i];

						svgElement.event.trigger('selectedItem', [selectedData, position, 'enter']);
					}
				}
			}
		}

		function drawEnlargeGroupBack ( treemap, svgElement, styles ) {
			
			var enlargeGroupBack = svgElement.rect();
			
			enlargeGroupBack.attr({
				x : 0,
				y : 0,
				width : treemap.width(),
				height : treemap.height(),
				fill : styles.group.line.color,
				opacity : 0,
				'stroke-width' : 0
			});

			return enlargeGroupBack;
		}


		function enterGroup ( styles, options, treemap, svgElement, e, groupData, subElement,  stepDataArr, textGroup, hoverBox, groupHoverSet ) {

			var mousePosition = getMousePosition(e, treemap);		
			var groupDataLength = groupData.length;
			
			var enlargeGroupBack = drawEnlargeGroupBack(treemap, svgElement, styles);		
			var enlargeGroup = svgElement.set();
			var subTextGroup = svgElement.set();

			var toggleCheck = false;
			var interFace = appendInterFace(styles, options, treemap, svgElement, groupData, subElement);
			
			if ( styles.enterGroup.interFace.animate.use && elementType == 'SVG' ) {
				setInterFaceAni(styles, options, treemap, svgElement, interFace, toggleCheck);	
			} else {
				setInterFace(styles, options, treemap, svgElement, interFace, toggleCheck);	
			}

			var groupInterface = interFace.itemGroup;
			var toggleBtn = interFace.toggleBtn;
			var backElement = interFace.backBtn;

			for ( var i = groupDataLength; i--; ) {

				var x = groupData[i].x, y = groupData[i].y;
				var xw = x + groupData[i].width, yh = y + groupData[i].height;

				if ( x < mousePosition.x && mousePosition.x <= xw && y < mousePosition.y && mousePosition.y <= yh ) {

					interFace.groupText.attr({
						text : groupData[i].name
					});

					if ( elementType == 'SVG' && styles.enterGroup.animate.use == true ) {

						transeformElement(styles, options, treemap, svgElement, groupData[i], subElement, hoverBox, subTextGroup, interFace);						
						
						textGroup.attr({
							opacity : 0
						});

						if ( styles.group.hover.use ) {

							groupHoverSet.attr({
								opacity : 0
							});
						}

					} else {

						drawEnlargeGroup(styles, options, treemap, svgElement, groupData[i], hoverBox, enlargeGroup, enlargeGroupBack, subTextGroup, interFace);
					}
				}
			}
			
			backBtnClick(styles, options, treemap, svgElement, groupData, stepDataArr, enlargeGroup, enlargeGroupBack, subElement, textGroup, hoverBox, subTextGroup, backElement, groupInterface, groupHoverSet);

			matchGroup(styles, options, treemap, svgElement, groupData, subElement, hoverBox, enlargeGroup, enlargeGroupBack, subTextGroup, groupInterface, backElement, interFace);

			hoverInterface(svgElement, interFace, groupData, styles);
		}

		function matchGroup ( styles, options, treemap, svgElement, groupData, subElement, hoverBox, enlargeGroup, enlargeGroupBack, subTextGroup, groupInterface, backElement, interFace ) {

			treemap.unbind('click');

			var groupInterfaceLength = groupInterface.length;
			var groupNum = 0;

			groupInterface.mousedown(function (e) {	

				e.preventDefault();
				e.stopPropagation();

				var match = 0;

				if ( groupNum != this.groupNum ) {
					
					groupNum = this.groupNum;

					for ( var j = 0; j < groupData.length; j++ ) {

						if (groupNum == groupData[j].group) {
							match = j;
						}
					}

					interFace.groupText.attr({
						text : groupData[match].name
					});

					if ( elementType == 'SVG' && styles.enterGroup.animate.use == true ) {					

						transeformElement(styles, options, treemap, svgElement, groupData[match], subElement, hoverBox, subTextGroup, interFace);				
											
					} else {
						
						enlargeGroup = drawEnlargeGroup(styles, options, treemap, svgElement, groupData[match], hoverBox, enlargeGroup, enlargeGroupBack, subTextGroup, interFace);
					}
				}
			});

			return enlargeGroup;
		}

		function hoverInterface ( svgElement, interFace, groupData, styles ) {

			var groupDataLength = groupData.length; 

			interFace.itemGroup.unhover();

			var _this = null;

			interFace.itemGroup.hover(function () {			

				if (_this !== null) {

					setAreaAttr(_this, styles.enterGroup.interFace.group);
				}

				_this = this;

				beforeFill = _this.attr("fill");

				var groupNum = _this.groupNum;

				setTimeout(function () {

					for ( var i = groupDataLength; i--; ) {

						if ( groupData[i].group == groupNum ) {

							interFace.groupText.attr({
								opacity : 1,
								text : groupData[i].name		
							}, 0);

							interFace.groupText.toFront();

							break;
						}
					}

					setAreaAttr(_this, styles.enterGroup.interFace.group.hover);

				}, 0);

			});
		}

		function appendInterFace (styles, options, treemap, svgElement, groupData, subElement) {

			var interFace = svgElement.set();
			interFace.background = svgElement.rect();
			interFace.backBtn = svgElement.image(styles.enterGroup.interFace.button.back.src);
			interFace.toggleBtn = svgElement.image(styles.enterGroup.interFace.button.toggle.open.src);
			interFace.itemGroup = drawInterfaceItemGroup(styles, treemap, svgElement, groupData, subElement);
			interFace.groupText = svgElement.text();

			var treemapW = treemap.width();
			var treemapH = treemap.height();
			
			var right = 10;

			var interFaceWidth = styles.enterGroup.interFace.group.width;
			var sWidthRatio = interFaceWidth / treemapW;
			
			var interFaceBtnW = styles.enterGroup.interFace.button.width;
			var interFaceBtnH = styles.enterGroup.interFace.button.height;
			
			var backgoundW = interFaceBtnW * 2 + 8;
			var backgoundH = interFaceBtnH + 3;

			setTextAttr(styles.enterGroup.interFace.text, interFace.groupText); 
			
			var tY = treemapH - (treemapH * sWidthRatio) - 10;

			interFace.background.attr({
				x : Math.floor(treemapW - backgoundW - right - 2) + lineError,
				y : Math.floor(treemapH - backgoundH - 12) + lineError,
				width : backgoundW,
				height : backgoundH,
				fill : styles.enterGroup.interFace.base.area.color,
				'fill-opacity' : styles.enterGroup.interFace.base.area.opacity,
				stroke : styles.enterGroup.interFace.base.line.color,
				'stroke-width' : styles.enterGroup.interFace.base.line.width,
				'stroke-opacity' : styles.enterGroup.interFace.base.line.opacity
			});

			interFace.groupText.attr({
				text : '',
				x : treemapW - 10,
				y : treemapH,
				'font-size' : 0
			});

			interFace.toggleBtn.attr({
				x : treemapW - styles.enterGroup.interFace.button.width - right - 6,
				y : treemapH - backgoundH - 10,
				width : interFaceBtnW,
				height : interFaceBtnH	
			});

			interFace.backBtn.attr({
				x : treemapW - (styles.enterGroup.interFace.button.width * 2) - right - 6,
				y : treemapH - backgoundH - 10,
				width : interFaceBtnW,
				height : interFaceBtnH	
			});

			svgElement.interFace = interFace;

			interFace.background.unmousedown().mousedown(function (e) {

				e.preventDefault();
				e.stopPropagation();
			});

			interFace.backBtn.unmousedown().mousedown(function (e) {

				e.preventDefault();
				e.stopPropagation();
			});

			interFace.toggleBtn.unmousedown().mousedown(function (e) {

				e.preventDefault();
				e.stopPropagation();
			});

			interFace.groupText.unmousedown().mousedown(function (e) {

				e.preventDefault();
				e.stopPropagation();
			});

			return interFace;
		}

		function setInterFaceAni (styles, options, treemap, svgElement, interFace, toggleCheck) {
			
			setInterFaceToFront(interFace);

			var treemapW = treemap.width();
			var treemapH = treemap.height();
			
			var right = 10;

			var interFaceWidth = styles.enterGroup.interFace.group.width;
			var sWidthRatio = interFaceWidth / treemapW;
			var interFaceHeight = treemapH * sWidthRatio;
			
			var interFaceBtnW = styles.enterGroup.interFace.button.width;
			var interFaceBtnH = styles.enterGroup.interFace.button.height;

			var backgoundW = interFaceBtnW * 2 + 8;
			var backgoundH = interFaceBtnH + 3;

			var basePdTop = styles.enterGroup.interFace.base.paddingTop;
			var backgoundHeigth = treemapH * sWidthRatio + 30 + basePdTop;		

			var aniSpeed = styles.enterGroup.interFace.animate.speed;
			var aniType = styles.enterGroup.interFace.animate.type;

			var itemGroupW = 0;
			var itemGroupH = 0;

			interFace.toggleBtn.mousedown( function (e) {

				e.preventDefault();
				e.stopPropagation();

				if ( toggleCheck == false ) {
					
					var tX = treemap.width() - interFaceWidth - 10;
					var tY = treemapH - (treemapH * sWidthRatio) - 5 - 10;
					var trans = 't' + tX + ',' + tY + ',' + 's' + sWidthRatio + ',' + sWidthRatio + ',' + 0 + ',' + 0;
				
					interFace.itemGroup.animate({	
						transform : trans,
						opacity: 1	
					}, aniSpeed, aniType);

					interFace.background.animate({
						x : tX - 1,
						y : treemapH - backgoundHeigth - 10,
						width : interFaceWidth + 2,
						height : backgoundHeigth
					}, aniSpeed, aniType);
					
					interFace.groupText.animate({
						x : tX + 8,
						y : tY - interFaceBtnH + 10 + 10 - (basePdTop / 2),
						opacity : 1,
						'font-size' : styles.enterGroup.interFace.text.size
					}, aniSpeed, aniType);
					
					interFace.toggleBtn.animate({
						y : tY - interFaceBtnH + 6 - (basePdTop / 2)
					}, aniSpeed, aniType);
					
					interFace.backBtn.animate({
						y : tY - interFaceBtnH + 6 - (basePdTop / 2)
					}, aniSpeed, aniType);
								
					setTimeout( function () {
						interFace.toggleBtn.attr({
							src : styles.enterGroup.interFace.button.toggle.close.src
						});
					}, aniSpeed);

					interFace.itemGroup.click();

					toggleCheck = true;
					
				} else {
					
					var trans = 't' + (treemapW - 10 - 20) + ',' + (treemapH - 5 - 10) + ',' + 's' + 0.01 + ',' + 0.01 + ',' + 0 + ',' + 0;

					interFace.itemGroup.animate({					
						transform : trans,
						opacity: 0	
					}, aniSpeed, aniType)

					interFace.background.animate({
						x : Math.floor(treemapW - backgoundW - right - 2) + lineError,
						y : Math.floor(treemapH - backgoundH - 12) + lineError,
						width : backgoundW,
						height : backgoundH
					}, aniSpeed, aniType)	

					interFace.groupText.animate({
						x : treemapW - 20,
						y : treemapH,
						opacity : 0,
						'font-size' : 0
					}, aniSpeed, aniType)	

					interFace.toggleBtn.animate({
						y : treemapH - backgoundH - 10
					}, aniSpeed, aniType)
					
					interFace.backBtn.animate({
						y : treemapH - backgoundH - 10
					}, aniSpeed, aniType)

					setTimeout( function () {
						interFace.toggleBtn.attr({
							src : styles.enterGroup.interFace.button.toggle.open.src
						})
					}, aniSpeed)

					toggleCheck = false;				
				}						

				setInterFaceToFront(interFace);
			})	

			interFace.backBtn.mousedown( function () {

				interFace.itemGroup.animate({
					width : 0,
					height : 0				
				}, aniSpeed, aniType)

				interFace.background.animate({
					opacity : 0
				}, aniSpeed, aniType)

				interFace.toggleBtn.animate({
					opacity : 0
				}, aniSpeed, aniType)

				interFace.backBtn.animate({
					opacity : 0
				}, aniSpeed, aniType)

				interFace.groupText.animate({
					opacity : 0
				}, aniSpeed, aniType)

				setTimeout( function () {
					interFace.background.remove();
					interFace.toggleBtn.remove();
					interFace.backBtn.remove();
					interFace.groupText.remove();
					interFace.itemGroup.remove();
				}, aniSpeed + 10 )
				
				toggleCheck = false;	

			})	
		}

		function setInterFace (styles, options, treemap, svgElement, interFace, toggleCheck) {
			
			setInterFaceToFront(interFace);

			var treemapW = treemap.width();
			var treemapH = treemap.height();
			
			var right = 10;

			var interFaceWidth = styles.enterGroup.interFace.group.width;
			var sWidthRatio = interFaceWidth / treemapW;
			var interFaceHeight = treemapH * sWidthRatio;
			
			var interFaceBtnW = styles.enterGroup.interFace.button.width;
			var interFaceBtnH = styles.enterGroup.interFace.button.height;

			var backgoundW = interFaceBtnW * 2 + 8;
			var backgoundH = interFaceBtnH + 3;

			var basePdTop = styles.enterGroup.interFace.base.paddingTop;
			var backgoundHeigth = treemapH * sWidthRatio + 30 + basePdTop;

			var aniSpeed = styles.enterGroup.interFace.animate.speed;
			var aniType = styles.enterGroup.interFace.animate.type;

			var itemGroupW = 0;
			var itemGroupH = 0;

			interFace.toggleBtn.mousedown( function () {
				if ( toggleCheck == false ) {
					
					var tX = treemap.width() - interFaceWidth - 10;
					var tY = treemapH - (treemapH * sWidthRatio) - 5 - 10;
					var trans = 't' + tX + ',' + tY + ',' + 's' + sWidthRatio + ',' + sWidthRatio + ',' + 0 + ',' + 0;
				
					interFace.itemGroup.attr({	
						transform : trans,
						opacity: 1	
					});

					interFace.background.attr({
						x : tX - 1,
						y : treemapH - backgoundHeigth - 10,
						width : interFaceWidth + 2,
						height : backgoundHeigth
					});
					
					interFace.groupText.attr({
						x : tX + 8,
						y : tY - interFaceBtnH + 10 + 10 - (basePdTop / 2),
						opacity : 1,
						'font-size' : styles.enterGroup.interFace.text.size
					});
					
					interFace.toggleBtn.attr({
						y : tY - interFaceBtnH + 6 - (basePdTop / 2)
					});
					
					interFace.backBtn.attr({
						y : tY - interFaceBtnH + 6 - (basePdTop / 2)
					});
								
					setTimeout( function () {
						interFace.toggleBtn.attr({
							src : styles.enterGroup.interFace.button.toggle.close.src
						})
					}, aniSpeed)

					interFace.itemGroup.click();

					toggleCheck = true;
					
				} else {
					
					var trans = 't' + (treemapW - 10 - 20) + ',' + (treemapH - 5 - 10) + ',' + 's' + 0.01 + ',' + 0.01 + ',' + 0 + ',' + 0;

					interFace.itemGroup.attr({					
						transform : trans,
						opacity: 0	
					})

					interFace.background.attr({
						x : Math.floor(treemapW - backgoundW - right - 2) + lineError,
						y : Math.floor(treemapH - backgoundH - 12) + lineError,
						width : backgoundW,
						height : backgoundH
					})	

					interFace.groupText.attr({
						x : treemapW - 20,
						y : treemapH,
						opacity : 0,
						'font-size' : 0
					})	

					interFace.toggleBtn.attr({
						y : treemapH - backgoundH - 10
					})
					
					interFace.backBtn.attr({
						y : treemapH - backgoundH - 10
					})

					setTimeout( function () {
						interFace.toggleBtn.attr({
							src : styles.enterGroup.interFace.button.toggle.open.src
						})
					}, 10)

					toggleCheck = false;				
				}						

				setInterFaceToFront(interFace);
			})	

			interFace.backBtn.mousedown( function () {

				interFace.itemGroup.attr({
					width : 0,
					height : 0				
				})

				interFace.background.attr({
					opacity : 0
				})

				interFace.toggleBtn.attr({
					opacity : 0
				})

				interFace.backBtn.attr({
					opacity : 0
				})

				interFace.groupText.attr({
					opacity : 0
				})

				setTimeout( function () {
					interFace.background.remove();
					interFace.toggleBtn.remove();
					interFace.backBtn.remove();
					interFace.groupText.remove();
					interFace.itemGroup.remove();
				}, 10 )
				
				toggleCheck = false;	

			})	
		}

		function drawInterfaceItemGroup ( styles, treemap, svgElement, groupData, subElement ) {
			
			var groupInterface = svgElement.set();
			var groupDataLength = groupData.length;
			var sWidthRatio = styles.enterGroup.interFace.group.width / treemap.width();
			var tX = treemap.width() - 10 - 10;
			var tY = treemap.height() - 5 - 10;

			for ( var i = groupDataLength; i--; ) {
				var groupDataI = groupData[i];
				var groupElement = svgElement.rect();

				groupElement.attr({
					x : groupDataI.x,
					y : groupDataI.y,
					width : groupDataI.width,
					height : groupDataI.height				
				})
				groupElement.groupNum = groupDataI.group;
				groupInterface.push(groupElement);
			}
			var trans = 't' + tX + ',' + tY + ',' + 's' + 0.01 + ',' + 0.01 + ',' + 0 + ',' + 0;

			setAreaAttr(groupInterface, styles.enterGroup.interFace.group);
			
			groupInterface.attr({
				transform : trans,
				opacity: 0
			})

			return groupInterface;		
		}

		function setSubTextGroup ( treemap, groupData, options, styles ) {

			var textArr = [];
			var layout = styles.layout;
			var setW = (treemap.width() - layout.paddingLeft - layout.paddingRight)  / (groupData.width - Number(styles.group.line.width));
			var setH = (treemap.height() - layout.paddingTop - layout.paddingBottom) / (groupData.height - Number(styles.group.line.width));
			var groupDataLength = groupData.data.length;
		
			var lineRatioW = styles.item.line.width * setW;
			var lineRatioH = styles.item.line.width * setH;

			for ( var i = groupDataLength; i--; ) {
				
				var dataI = groupData.data[i];

				textArr[i] = {};

				var itemX = (dataI.x - groupData.x) * setW + layout.paddingLeft;
				var itemY = (dataI.y - groupData.y) * setH + layout.paddingTop;
				var itemW = dataI.width * setW;
				var itemH = dataI.height * setH;	

				if ( elementType == 'SVG' && styles.enterGroup.animate.use == true ) {
					textArr[i].name = dataI.name;
					textArr[i].x = itemX + lineRatioW / 2;
					textArr[i].y = itemY + lineRatioH / 2;
					textArr[i].width = itemW - lineRatioW;
					textArr[i].height = itemH - lineRatioH;
				} else {
					textArr[i].name = dataI.name;
					textArr[i].x = itemX;
					textArr[i].y = itemY;
					textArr[i].width = itemW;
					textArr[i].height = itemH;
				}

				
			}

			return textArr;
		}


		function enlargeGroupHover (svgElement, styles, treemap, groupData, options, hoverBox ) {

			treemap.unbind('mousemove');

			var setWidth = (treemap.width() - styles.layout.paddingLeft - styles.layout.paddingRight)  / (groupData.width - Number(styles.group.line.width));
			var setHeight = (treemap.height() - styles.layout.paddingTop - styles.layout.paddingBottom) / (groupData.height - Number(styles.group.line.width));
			var groupDataLength = groupData.data.length;
			var paddingLeft = styles.layout.paddingLeft;
			var paddingTop = styles.layout.paddingTop;

			var lineRatioW = styles.item.line.width * setWidth;
			var lineRatioH = styles.item.line.width * setHeight;

			var selectedData = null;

			treemap.mousemove ( function (e) {

				var mousePosition = getMousePosition(e, treemap);	

				for ( var i = groupDataLength; i--; ) {
					var dataI = groupData.data[i];
					var itemX = (dataI.x - groupData.x) * setWidth + paddingLeft;
					var itemY = (dataI.y - groupData.y) * setHeight + paddingTop;
					var itemWidth = dataI.width * setWidth;
					var itemHeight = dataI.height * setHeight;
					var itemXW = itemX + itemWidth;
					var itemYH = itemY + itemHeight;

					if ( itemX < mousePosition.x && mousePosition.x <= itemXW && itemY < mousePosition.y && mousePosition.y <= itemYH ) {
						if(!TOUCHDEVICE){
							/*
								아이패드 9버전-사파리에서 아래의 구문에러남..
								패드에서는 hover node가 필요없으므로 걸러냄(2016.04.28 평다진)
							 */
							if ( elementType == 'SVG' && styles.enterGroup.animate.use == true ) {

								if ( itemWidth - lineRatioW > 0 && itemHeight - lineRatioH > 0 ) {
									hoverBox.attr({
										x : itemX + (lineRatioW / 2),
										y : itemY + (lineRatioH / 2),
										width : itemWidth - lineRatioW,
										height : itemHeight - lineRatioH,
										opacity : 1
									});
								}
							} else {
								hoverBox.attr({
									x : itemX,
									y : itemY,
									width : itemWidth,
									height : itemHeight,
									opacity : 1
								});
							}
							eval(options.mousemove)(dataI);
						}
						
						selectedData = dataI;
					}
				}
			});

			treemap.off('mousedown').on('mousedown', function (e) {

				var mousePosition = getMousePosition(e, treemap);

				svgElement.event.trigger('selectedItem', [selectedData, mousePosition, 'item']);
			});

			hoverBox.toFront();

			return hoverBox;
		}

		function backBtnClick ( styles, options, treemap, svgElement, groupData, stepDataArr, enlargeGroup, enlargeGroupBack, subElement, textGroup, hoverBox, subTextGroup, backElement, groupInterface, groupHoverSet ) {
			
			var backCheck = false;

			backElement.mousedown(function (e) {

				e.preventDefault();
				e.stopPropagation();

				treemap.unbind('click');
				treemap.unbind('mousemove');
				enlargeGroup.remove();	
				enlargeGroupBack.remove();
				hoverBox.remove();	
				subTextGroup.remove();

				if (elementType == 'SVG' && styles.enterGroup.animate.use == true) {				
				
					subElement.animate({
						transform : 's1,1'
					}, styles.enterGroup.animate.speed);

					setTimeout( function () {

						if ( styles.group.hover.use ) {

							groupHoverSet.attr({
								opacity : styles.group.hover.opacity
							});
						}

						mouseEvent(svgElement, subElement, treemap, stepDataArr, groupData, styles, textGroup, options, groupHoverSet);

						setTextGroupAttr(textGroup, styles);

					}, styles.enterGroup.animate.speed + 10);

				} else {

					setTimeout( function () {

						mouseEvent(svgElement, subElement, treemap, stepDataArr, groupData, styles, textGroup, options, groupHoverSet);

					}, 10);
				}	
			});

			return backElement;
		}

		function setTextGroupAttr ( textGroup, styles ) {

			var textGroupLength = textGroup.length;

			for ( var i = textGroupLength; i--; ) {

				if ( textGroup[i].type == 'rect' ) {
					textGroup[i].attr({
						opacity : styles.label.area.opacity
					})
				} else {
					textGroup[i].attr({
						opacity : styles.label.text.opacity
					})
				}
			}
		}

		function drawEnlargeGroup ( styles, options, treemap, svgElement, groupData, hoverBox, enlargeGroup, enlargeGroupBack, subTextGroup, interFace ) {

			enlargeGroup.remove();

			var groupDataLength = groupData.data.length;
			var containerstrokewidth = Number(styles.group.line.width);
						
			var scaleW = (treemap.width() - styles.layout.paddingLeft - styles.layout.paddingRight)  / (groupData.width - containerstrokewidth);
			var scaleH = (treemap.height() - styles.layout.paddingTop - styles.layout.paddingBottom) / (groupData.height - containerstrokewidth);
		
			enlargeGroupBack.attr({
				opacity : 1
			})	

			for ( var i = groupDataLength; i--; ) {
				
				var groupDataI = groupData.data[i];
				var flag = groupDataI[options.data.flag] - 1;				

				if ( isNaN(groupDataI.x) || isNaN(groupDataI.y) || isNaN(groupDataI.width) || isNaN(groupDataI.height) ) {
				
				} else {
					
					var subElement = svgElement.rect();

					subElement.attr({
						x : ((groupDataI.x - groupData.x) * scaleW) + styles.layout.paddingLeft,
						y : ((groupDataI.y - groupData.y) * scaleH) + styles.layout.paddingTop,
						width : groupDataI.width * scaleW,
						height : groupDataI.height * scaleH,			
						fill : styles.item.area.color[flag]
					})

					enlargeGroup.push(subElement);
				}		
				
			}

			enlargeGroup.attr({
				stroke: styles.item.line.color,
				'stroke-width' : styles.item.line.width
			})

			subTextGroup.remove();

			var textArr = setSubTextGroup(treemap, groupData, options, styles);

			subTextGroup = appendTextGroup(svgElement, treemap, subTextGroup, textArr, styles);
			
	 		var enlargeHover = enlargeGroupHover(svgElement, styles, treemap, groupData, options, hoverBox);

			setInterFaceToFront(interFace);

	 		return enlargeGroup;
		}

		function transeformElement ( styles, options, treemap, svgElement, groupData, subElement, hoverBox, subTextGroup, interFace ) {

			var containerstrokewidth = Number(styles.group.line.width);
			var layout = styles.layout;
			var enterGroupAni = styles.enterGroup.animate;

			treemap.unbind('mousemove');
			subTextGroup.remove();

			setTimeout( function () {
				subTextGroup.remove();
				var textArr = setSubTextGroup(treemap, groupData, options, styles);			
				subTextGroup = appendTextGroup(svgElement, treemap, subTextGroup, textArr, styles);
				var enlargeHover = enlargeGroupHover(svgElement, styles, treemap, groupData, options, hoverBox);
				setInterFaceToFront(interFace);
			}, enterGroupAni.speed + 10)		
			
			var setWidth = (treemap.width() - layout.paddingLeft - layout.paddingRight) / (groupData.width - containerstrokewidth);
			var setHeight = (treemap.height() - layout.paddingTop - layout.paddingBottom )/ (groupData.height - containerstrokewidth);		
			var setX = (-groupData.x)  + (layout.paddingLeft / setWidth);
			var setY = (-groupData.y)  + (layout.paddingTop / setHeight);
			
			var trans = 's' + setWidth + ',' + setHeight + ',' + 0 + ',' + 0 + ',' + 't' + setX + ',' + setY;		

			hoverBox.attr({
				opacity:0
			})

			treemap.unbind('click');
			subElement.animate({
				transform : trans,
				'stroke-width' : styles.item.line.width
			}, enterGroupAni.speed, enterGroupAni.type)	
			
		}

		function setInterFaceToFront ( interFace ) {

			interFace.background.toFront();
			interFace.itemGroup.toFront();
			interFace.groupText.toFront();
			interFace.backBtn.toFront();
			interFace.toggleBtn.toFront();
		}

		/* set hover box */

		function setHoverBox ( element, e, treemap, hoverBox, stepDataArr, options ) {
			
			var mp = getMousePosition(e, treemap);	

			var step = stepDataArr[element.flag];
			var stepLength = 0;
			var len = step.length;
			
			if ( step != undefined ) {
				stepLength = step.length;			
			}

			for ( var i = stepLength; i --; ) {

				var stepI = step[i];
				var x = stepI.x;
				var y = stepI.y;

				if ( x < mp.x && mp.x <= (x + stepI.width) && y < mp.y && mp.y <= (y + stepI.height) ) {
					hoverBox.attr({
						x : x,
						y : y,
						width : stepI.width,
						height : stepI.height
					});

					eval(options.mousemove)(stepI);

					break;
				}
			}
		}


		/* set text attr */

		function setTextAttr ( styles, element ) {
			
			element.attr({
				'font-family': styles.family,
				'font-size': styles.size,
				'font': styles.size + " '" + styles.family + "'",
				'fill': styles.color, 
				'text-anchor': 'start',
				'font-weight': styles.weight,
				'font-style': styles.style,
				opacity : styles.opacity
			})
		}

		function setTextLength ( styles, data, rectW, text ) {
			
			var groupW = data.width;
			var name = data.name;
			var nameLen = name.length;
			var areaStyles = styles.label.area;
			var gLineW = Number(styles.group.line.width);
			var areaPdLR = areaStyles.paddingLeft + areaStyles.paddingRight;
			var labelPsX = styles.label.position.x;

			for ( var i = nameLen; i--; ) {   
				
				name = name.substr(0, name.length - 1);
				text.attr({
	   				text : name
	   			})
				rectW = text.getBBox().width + areaPdLR;
				if ( rectW + labelPsX + gLineW < groupW ) {					
	   				break;
	   			}
			}
			name = name.substr(0, name.length - 1);
			if ( name.length <= 1 ) {
				name = '';
			} else {
				name = name + '..';
			}
			text.attr({
				text : name
			})

			return name;
		}

		function setAreaAttr ( item, styles ) {

			var fillColor = styles.area.color;

			if ( fillColor.hasOwnProperty('src') ) {
				fillColor = fillColorPattern(fillColor);
			}

			item.attr({
				fill : fillColor,
				opacity : styles.area.opacity,
				stroke : styles.line.color,
				'stroke-opacity' : styles.line.opacity,
				'stroke-width' : styles.line.width
			})
		}

		function appendTextGroup ( svg, treemap, textGroup, data, styles ) {		

			var label = styles.label;
			var height = label.text.size + label.area.paddingTop + label.area.paddingBottom;
			var textfontsize = label.text.size; 
			var area = label.area;
			var areaPs = label.position;
			var dataLen = data.length;
			var areaPsX = area.paddingLeft + areaPs.x;
			var areaPsY = area.paddingTop + (textfontsize / 2) + areaPs.y;
			var areaPdLR = area.paddingLeft + area.paddingRight;
			var areaPdTB = area.paddingTop + area.paddingBottom;
			var gLineW = Number(styles.group.line.width);

			if ( data[0].group == undefined ) {
				gLineW = styles.item.line.width;
			}
			for ( var i = dataLen; i --; ) {

				var rect = svg.rect();
				var text = svg.text();
				var dataI = data[i];
				var name = dataI.name;
				
				setTextAttr(label.text, text);

				if ( dataI.width > 0 && dataI.height > 0 ) {
				
					text.attr({
						text : name,
						x : dataI.x + areaPsX,
						y : dataI.y + areaPsY
					})
					var rectW = text.getBBox().width + areaPdLR;
					var rectH = text.getBBox().height + areaPdTB;

					if (  dataI.height - gLineW < rectH + areaPs.y ) {				
						name = '';	
					} else if ( rectW + areaPs.x + gLineW > dataI.width ){
						name = setTextLength(styles, dataI, rectW, text);
					}

					rectW = text.getBBox().width + areaPdLR;				

					rect.attr({
						x : dataI.x + areaPs.x,
						y : dataI.y + areaPs.y,
						width : rectW,
						height : text.getBBox().height + areaPdTB
					})

					setAreaAttr(rect, label);
			
					if ( name == '' || name == undefined || name == null ) {
						rect.remove();
						text.remove();
					} else {
						textGroup.push(text);
						textGroup.push(rect);	
					}
				} else {
					rect.remove();
					text.remove();
				}
			}

			return textGroup;
		}

		/* get data */

		function getData (options) {

			var data = loadData(options);

			if ( options.data.type == "json" ) {

				data = parseDatasJson(data, options); 

			} else if ( options.data.type == "text" ) {

				data = parseDatasText(data, options);

			}

			data = sortUse(options,data);
			
			data = sortTotal(data);

			return data;
		}

		/* draw SVG */

		function getSvg (treemap, styles) {

			var svgElement = Raphael(treemap[0], treemap.width(), treemap.height());

			var width = Math.floor(treemap.width()) - lineError;
			var height = Math.floor(treemap.height()) - lineError;

			svgElement.canvas.setAttribute('preserveAspectRatio', 'none');
			svgElement.canvas.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

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

		function setFillColorSrc (color) {
				
			var fillstyle = color;

			if ( fillstyle.hasOwnProperty('src')/* || fillstyle[0].hasOwnProperty('src')*/) {
				color = fillColorPattern(fillstyle);		
			} else {
				color = fillstyle;		
			}
			
			return color;		
		}

		/* 해당 아이템의 width, height, idx, way 값 설정 */

		function setDataAttr ( treemap, data, total, styles, options ) {	

			var gLineW = Number(styles.group.line.width);
			var layout = styles.layout;
			var svgW = treemap.width() - layout.paddingLeft - layout.paddingRight + gLineW;
			var svgH = treemap.height() - layout.paddingTop - layout.paddingBottom + gLineW;
			var svgArea = svgW * svgH;	
			var dataLen = data.length;		
			var gVal = getItemValue(data, svgArea, total, "total");	
			var use = options.data.use;

			gVal = getAttr(svgW, svgH, gVal);
			gVal = getGroupPosition( gVal, "1", 0, 0, svgW, svgH );

			for ( var i = dataLen; i--; ) {

				var gValI = gVal[i];
				var gW = gValI.width - gLineW;
				var gH = gValI.height - gLineW;	
				var groupArea = gW * gH;
				
				gValI.x = gValI.x + layout.paddingLeft;
				gValI.y = gValI.y + layout.paddingTop;
			
				var total = gValI.total;
				var subDataArr = getItemValue(data[i].data, groupArea, total, use);

				subDataArr = getAttr(gW, gH, subDataArr);			
				subDataArr = getGroupPosition( subDataArr, "2", gValI.x, gValI.y, gW, gH );
				gValI.data = subDataArr;
			}

			return gVal;
		}		

		function getUniqueID () {

			return Math.random().toString(36).substr(2, 9);
		};

		function reSize (treemap, options, styles, loading_bar, svgElement) {

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
			 * treemap 의 resize 이벤트
			 */
			if (treemap.data('resizeEventName')) {

				$(window).off(treemap.data('resizeEventName'));
			}

			var wrapperUniqueId = getUniqueID();

			treemap.data('resizeEventName', 'resize.' + wrapperUniqueId);

			var beforeWrapperWidth = treemap.width();

			$(window).on(treemap.data('resizeEventName'), function (e) {

				var afterWrapperWidth = treemap.width();

				if (beforeWrapperWidth !== afterWrapperWidth) {

					if (options.resize.use) {

						if ( options.loadingBar.use ) {

							loading_bar.show();
						}

						waitForFinalEvent(function() {

							options.useTimeSlice = false;

							treemap.children().remove();

							self.init(treemap, styles, options, loading_bar);

						}, 500, "some unique string");
					}
				}
			});
		}


		function drawBaseTreeMap ( treemap, svgElement, styles ) {
			
			var baseElement = svgElement.rect();

			baseElement.attr({
				x : styles.layout.paddingLeft - 0.5,
				y : styles.layout.paddingTop - 0.5,
				width : treemap.width() - styles.layout.paddingLeft - styles.layout.paddingRight + 1,
				height : treemap.height() - styles.layout.paddingTop - styles.layout.paddingBottom + 1,
				fill : styles.group.line.color,
				stroke : styles.group.line.color,
				opacity : styles.group.line.opacity
			})

			return baseElement;
		}

		function drawGroupHover ( styles, groupData, svgElement ) {
				
			var groupHoverSet = svgElement.set();

			for ( var i = 0; i < groupData.length; i++ ) {
				var groupHoverItem = svgElement.rect();
				groupHoverItem.attr({
					x : groupData[i].x - Number(styles.group.line.width) / 2,
					y : groupData[i].y - Number(styles.group.line.width) / 2,
					width : groupData[i].width,
					height : groupData[i].height,
					fill : '#000',
					opacity : styles.group.hover.opacity,
					stroke : styles.group.line.color,
					'stroke-width' : Number(styles.group.line.width),
					'stroke-opacity' : 1
				})
				groupHoverSet.push(groupHoverItem);
			}
			
			groupHoverSet.hover(function () {
				for ( var i = groupData.length; i--; ) {				
					groupHoverSet[i].attr({
						width : groupData[i].width,
						height : groupData[i].height
					})
				}
				this.attr({
					width : 0,
					height : 0
				})
			})

			return groupHoverSet;
		}

		self.init = function ( treemap, style, option ) {

			treemap.css({
				'position' : "relative"
			})	

			/* extend styles */

			var styles = extendStyles(style);

			// url에 hash - #exportPDF를 붙이면 애니메이션이 동작하지 않는다.
			if (window.location.hash && window.location.hash.slice(1) === "skipAnimation") {

				styles.animate.use = false;
			}

			/* extend options */
			
			var options = extendOptions(option);  

			/* image load */

			var images = getImage(styles, options);

			loadImages(images, styles, options);

			/* SVG 엘리먼트 생성 */

            var svgElement = getSvg(treemap, styles);

            svgElement.event = $({});

            svgElement.event.on('drawCompleted', function () {

                treemap.trigger('drawCompleted');
            });

            var data = loadData(options);

			/* data가 없으면 noData 처리, svgElement 반환 */
            if(options.data.data == null || options.data.data === 'undefined'){

                noData(treemap, svgElement);

                return svgElement;
            }

			/* load data */

            var data = getData(options);

			/* get dataTotal */

            var totalPrice = getTotalData(data);

			/* set data */

            var groupData = setDataAttr( treemap, data, totalPrice, styles, options);

            data = setDataObj(groupData);



            svgElement.event.on('selectedItem', function (e, data, position, mode) {

                treemap.trigger('selectedItem', [data, position, mode]);
            });

            /* draw tree map base */

			var base = drawBaseTreeMap(treemap, svgElement, styles);

			/* flag 단계 별 data 분류 */

			var stepDataArr = getStepDataArr(data, styles, options);

			/* flag 단계 별 draw path */

			var subElement = drawStepElement(svgElement, stepDataArr, options, styles);

			/* image loading 후 동작 */

			var loading_bar = options.loadingBar.select;

			var imageLoadCheck = setInterval( function () {

				if ( options.imageLoadComplete ) {

					clearInterval(imageLoadCheck);

					var fillColor = setFillColor (styles, options);				

					subElement = setStepElementAttr(svgElement, subElement, stepDataArr, styles, options);	

					if ( elementType == 'SVG' && styles.animate.use == true ) {

						if ( options.loadingBar.use ) {
							loading_bar.hide();
						}

					}	
				}
			}, 20);

			/* tree map 이 그려진 후 동작 ( hide loading bar ) */

			if ( styles.animate.use == false || elementType != 'SVG' ) {

				var drawCheck = setInterval( function () {

					if ( options.drawLoadComplete ) {
						
						if ( options.loadingBar.use ) {
							loading_bar.hide();
						}

						clearInterval(drawCheck);
					}
				}, 300);
			}

			var delay = styles.animate.delay * stepDataArr.length + styles.animate.speed + 100;

			if ( !styles.animate.use ) {
				// delay = styles.animate.delay * stepDataArr.length;
				delay = 0;
			}		

			if ( styles.group.hover.use ) {
				var groupHoverSet = drawGroupHover(styles, groupData, svgElement);
			}

			setTimeout ( function () {

				var textGroup = svgElement.set();
				textGroup = appendTextGroup(svgElement, treemap, textGroup, groupData, styles);		
				mouseEvent(svgElement, subElement, treemap, stepDataArr, groupData, styles, textGroup, options, groupHoverSet);
			
			}, delay)

			/* resize 이벤트 적용 */

			reSize(treemap, options, style, loading_bar, svgElement);

			
			if(!styles.hasOwnProperty('complete')){
				styles.isComplete = 'complete';
			}

			svgElement.drawBase = function () {
	        	base = drawBaseTreeMap(treemap, svgElement, styles);
	        }

			svgElement.getBase = function () {		
				return base;
			}

			svgElement.getItemGroup = function () {		
				return subElement;
			}

			svgElement.resize = function () {

				options.useTimeSlice = false;
					
				treemap.children().remove();
				
				self.init(treemap, styles, options, loading_bar);
			}

            svgElement.reDraw = function(style, option, redraw) {
                if(style !== undefined ){
                    styles = extendStyles(style);
                }
                if(option !== undefined ){
                    options = extendOptions(option);
                    options.data.data = loadData(option);
                }
                if(redraw !== false){
                    treemap.children().remove();
                    self.init(treemap, styles, options, loading_bar);
                }
            }

            if (TRIAL_UI) {

				appendTrialUi(treemap);
			}

			/**
				license object chart 에 추가(ver.150915 평다진)
			*/
			svgElement.license = licenseObject;

			/**
			 * wrapper(jQuery selector)에 저장(ver. 160318 평다진)
			 */
			treemap[0].instance = svgElement;

			return svgElement;
		}

		

		if (!window.webponent){
			window.webponent = {};
		}
		if (!window.webponent.visual) {
			window.webponent.visual = {};
		}

		window.webponent.visual.treemap = self;

	 })();
			


})();

