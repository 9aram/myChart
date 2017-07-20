/*
 * 사이버이메지네이션
 * 최초 작성자 : joointhezoo@cyber-i.com
 * 마지막 수정자 : joointhezoo@cyber-i.com
 * 마지막 수정날짜 :  16.11.10
 */
(function() {

    var productName = 'webPonent CHART 2.0';
    var productId = 'WC2';

    if (typeof WEBPONENT_CHART_LICENSE_KEY === 'undefined') {

        $.ajax({
            url : '/webponent.licenseKey.js',
            dataType : 'script',
            async : false
        });

        if (typeof WEBPONENT_CHART_LICENSE_KEY === 'undefined'|| WEBPONENT_CHART_LICENSE_KEY === '') {

            alert(productName + '의 라이센트키를 입력해주세요.');
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
            uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ? String
                .fromCharCode(65 + key.indexOf(chr) % 26)
                : chr;
        }
        return uncoded;
    }

    function appendTrialUi(wrapper) {

        var wrapper = $(wrapper);

        var trialUiWrapper = $('<div class="WEBPONENT-TRIAL-UI">');

        trialUiWrapper
            .css({
                'position' : 'absolute',
                'top' : '0',
                'left' : '0',
                'width' : '100%',
                'height' : '100%',
                'background-image' : "url('data:image/png;base64,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')",
                'background-repeat' : 'no-repeat',
                'background-position' : 'center center',
                'z-index' : '1',
                'opacity' : '0.3'
            });

        var img = $('<img src="http://www.webponent.com/img/webponent.png"/>');

        trialUiWrapper.append(img);

        wrapper.prepend(trialUiWrapper);

        wrapper.on('mouseenter', function() {

            trialUiWrapper.stop(true, true);
            trialUiWrapper.hide();
        });

        wrapper.on('mouseleave', function() {

            trialUiWrapper.stop(true, true);
            trialUiWrapper.fadeIn();
        });

        wrapper.data('check-trial-ui', setInterval(function() {

            if (wrapper.find('.WEBPONENT-TRIAL-UI').length === 0) {

                clearInterval(wrapper.data('check-trial-ui'));
                appendTrialUi(wrapper[0]);
            }
        }, 5000));
    }

    function makeLicenseObject(text) {

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

            alert(productName + ' ' + licenseObject.licenseType+ '버전의 라이센스 유효기간이 지났습니다.');
            return;
        }

    } else if (licenseObject.licenseType === 'DEVELOP') {

        if (new Date() > new Date(licenseObject.expireDate * 1)) {

            TRIAL_UI = true;
        }
        /**
         * licenseType ED시리즈 조건 추가(ver.150915 평다진)
         */
    } else if (licenseObject.licenseType === 'OFFICIAL'|| licenseObject.licenseType === "ED001"|| licenseObject.licenseType === "ED002"|| licenseObject.licenseType === "ED003") {

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

        var elementType = getElementType();
        var defaultFont = 'Nanum Gothic';

        /**
         * 기본으로 설정되어 있는 스타일 반환
         *
         * @return {defaultStyles} default styles
         */
        function getDefaultStyles() {

            defaultFont = 'Nanum Gothic';
            var defaultStyles = {
                /**
                 * 기본 레이아웃
                 * @position {Object} : POSITION INSIDE THE SVG
                 * @area {Object}     : GAUGE CHART LAYOUT'S BACKGROUND, BORDER COLOR
                 */
                layout : {
                    position : {
                        x : 0,
                        y : 0
                    },
                    area : {
                        color : '#f8f8f8',
                        border :'#c1c6cc'
                    }
                },

                /**
                 * OBJECT STYLES, VALUE
                 * @width  {Integer} : GAUGE CHART OBJECT'S WIDTH
                 * @height {Integer} : GAUGE CHART OBJECT'S  HEIGHT
                 */
                object : {
                    width : 360,
                    height : 240
                },
                /**
                 *  COUNTER STYLES
                 * @color {Object}   : COUNTER BACKGROUND COLOR
                 * @border {Object} : COUNTER BORDER COLOR
                 * @text {Object}      : COUNTER NUMBER FONT STYLE {font-family, font-size, font-weight}
                 */
                counter : {
                    x: 0 ,
                    y: 0 ,
                    width: "auto",
                    height: "auto",
                    color : '#fcfcfc',
                    border : '#bdc2ca',
                    text : {
                        family : 'LCDMono',
                        size : 1,
                        weight : 800,
                        color:'#484b4e'
                    }
                },
                /**
                 *  AXIS STYLES
                 * @family {Object} : font-family
                 * @size {Object}   :  font-size
                 * @weight {Object}   :  font-weight
                 * @align {Object}  :  font-anchor ( leftside == end , rightside == start )
                 * @color {Object} : 	font-color
                 */
                axis : {
                    block : 10 ,
                    interval : 4 ,
                    text : {
                        num : 5,
                        family: defaultFont,
                        size: 12,
                        weight: "bold",
                        align: "end",
                        color : "#797f85"
                    },
                    blockLine : {
                        color: "#a3aab1",
                        length : 15
                    },
                    intervalLine : {
                        color: "#c3c8cd",
                        length: 7.5
                    }
                },

                linear : {
                    change : {
                        color : "100-#ff6360-#ff908e",
                        border : 'none',
                        opacity : 0.1
                    },
                    base : {
                        color : "#fcfcfc",
                        border : '#bcc7d4'
                    },
                    led:{
                        dropColor : "#ff908e" ,
                        color : "100-#ff6360-#ff908e",
                        border : "none"
                    },
                    pointer : {
                        color : "#ff625f",
                        border :  "#ff625f",
                        lineSize  :2,
                        mark : {
                            color: "#ff625f",
                            border: "none"
                        }
                    }
                },
                pointer : {
                    max : {
                        bar : {
                            color : '#ff625f',
                            length :10
                        },
                        font : {
                            size : 13,
                            color :  '#ff625f',
                            align: 'start',
                            position : -18,
                            family: defaultFont
                        }
                    },
                    avg : {
                        bar : {
                            color : '#2bcdba',
                            length :10
                        },
                        font : {
                            size : 13,
                            color :  '#2bcdba',
                            align: 'start',
                            position : -18,
                            family: defaultFont
                        }
                    },
                    target : {
                        color : '#8397a6'
                    }
                }
            };
            return defaultStyles;
        }
        /**
         * 기본으로 설정되어 있는 옵션 반환 data 부분에 해당하는 key들은 고정이며 추가되는 부분은 자유롭게 설정한다.
         *
         * @return {defaultOptions} default options
         */
        function getDefaultOptions() {

            var defaultOptions = {
                /*  DATA SETTINGS - 데이터 설정  */
                data : {
                    data : null ,
                    url : null ,			// Ajax를 통해서 데이터를 가져오고자 할경우
                    type : null ,			// json, text 형태 설정
                    reverse : false , 		// 데이터 흐름이 반대로 들어올경우
                    jsonDepth : 'output.result' ,	// json에 depth
                    format :  null,
                    use : null			// 표현하고자 하는 데이터 key값
                },

                /*  USING OPTION - 옵션 사용 유무 */
                use :{
                    axis : true ,			// 눈금
                    axisText : true ,		// 치수
                    counter : true ,		// 치수표시판
                    max :true ,			    // 최대값 표시
                    avg : true ,			// 평균값 표시
                    target : false ,		// 타겟값 표시
                    toolTip : true ,		// 마우스오버 툴팁
                    animate : true ,		// 움직이는 효과
                    resize : false ,		// 게이지 사이즈 조절
                    responsive: true ,		// 반응형 유무
                    direct : 'col'			// 가로세로 유무 (default - col 세로)
                },

                /*  TOOLTIP SETTING IN DETAIL- 툴팁 세부 설정  */
                toolTip : {
                    className : null ,
                    position : {
                        x : 0 ,
                        y : 0
                    },
                    func : null
                },

                /*  축의 MAX, MIN  VALUE SETTINGS - 최댓값, 최소값 설정 (DEFAULT - auto ) */
                minmax : {
                    min : 'auto' ,
                    max : 'auto'
                },

                /* 데이터의 max값, 평균값,  타겟표시값 설정 (DEFAULT - auto ) */
                pointer : {
                    max : 'auto' ,
                    avg : 'auto' ,
                    target : 0
                }
            };

            return defaultOptions;

        }

        /**
         * GAUGE 의 세팅 정보를 담고 있다.
         * @type {Object}
         */
        function cloneSettingSize(gauge, type) {

            var width = gauge.svg.width,
                height = gauge.svg.height,
                styles =  gauge.styles,
                use = gauge.options.use;
            var
                objWidth = width * 0.1,
                objHeight = height * 0.6,
                centerX = (width / 2) + styles.layout.position.x,
                standard = (width > height) ? height : width;

            if (use.direct === 'row') {
                objWidth = height * 0.6;
                objHeight =  width * 0.1;
                centerX = (width / 2) + styles.layout.position.x;
            }

            /**
             * 사용자가 CHART의 크기를 변경
             */
            if (use.resize) {
                objWidth = standard * (styles.object.width / 400);
                objHeight = standard * (styles.object.height / 448);
            }

            var gapX = (objWidth / 2),
                startX = (centerX - gapX),
                startY = (height -objHeight)/2  + styles.layout.position.y,
                endX = (startX + objWidth);
            var settingSize = {
                objWidth : Math.round(objWidth),
                objHeight : Math.round(objHeight),
                centerX : Math.round(centerX),
                gapX : Math.round(gapX),
                startX : Math.round(startX),
                endX : Math.round(endX),
                startY : Math.round(startY),
                endY : startY + objHeight,
                centerY :startY + (objHeight / 2)
            };
            return settingSize;

        }

        function cloneSettingModel(gauge) {

            var settingModel = {
                /**
                 * 데이터와 관련된 정보를 나타낸다.
                 */
                data : [],
                wrapper : {
                    width : null
                }
            };
            return settingModel;
        }

        /**
         * defaultStyles 와 GAUGE 스타일을 extend 시켜준다.
         * @param  {Object} style [GAUGE 스타일]
         * @return {Object}       [extend 되어진 스타일]
         */
        function extendStyles(style) {

            var defaultStyles = getDefaultStyles();

            var styles = $.extend(true, defaultStyles, style);

            if (elementType === 'VML') {
                styles.axis.family = "Dotum";
                styles.counter.text.family = "Dotum";
            }

            return styles;
        }

        /**
         * defaultOptions 와 GAUGE 옵션을 extend 시켜준다.
         * @param  {Object} option [GAUGE 옵션]
         * @return {Object}        [extend 되어진 옵션]
         */
        function extendOptions(option) {

            var defaultOptions = getDefaultOptions();
            var options = $.extend(true, defaultOptions, option);

            if (elementType === 'VML') {
                options.use.animate =  false;
            }
            return options;
        }

        /**
         * 브라우져 환경에 따라 SVG 인지 VML 인지 구분해준다.
         *
         * @return {String} ['SVG' or 'VML']
         */
        function getElementType() {

            var g = {
                doc : document,
                win : window
            };
            var elementType = (g.win.SVGAngle
            || g.doc.implementation
                .hasFeature(
                    "http://www.w3.org/TR/SVG11/feature#BasicStructure",
                    "1.1") ? "SVG" : "VML");

            return elementType;
        }
        /**
         * AJAX 를 이용하여 데이터를 읽어온다.
         *
         * @param {Object}
         *            options [GAUGE 옵션]
         * @return {Array} [파싱된 데이터 반환]
         */
        function loadData(options) {

            var data = [];

            if (options.data.data) {
                data = options.data.data;
            } else {
                $.ajax({
                    url : options.data.url,
                    async : false,
                    dataType : options.data.type,
                    success : function(resp) {

                        if (options.data.type === "json") {

                            data = loadJson(resp, options);

                        } else if (options.data.type === "text") {

                            data = loadText(resp, options);
                        }
                    },
                    error : function(e, a, b) {
                        console.log(e, a, b);
                    }
                });
            }

            return data;
        }

        /**
         * 데이터가 json 형식일 경우 options.data.jsonDepth 에 따라 해당 데이터를 반환한다.
         *
         * @param {Array}
         *            data [AJAX 에 의해 호출되어진 데이터]
         * @param {Object}
         *            options [PIE 옵션]
         * @return {Array} [PIE 데이터]
         */
        function loadJson(data, options) {

            var bld_depth = options.data.jsonDepth.split('.');
            var outPut = bld_depth[0];
            var result = bld_depth[1];

            var arr = data;

            for (var i = 0; i < bld_depth.length; i++) {

                arr = arr[bld_depth[i]];
            }

            return arr;
        }

        /**
         * 데이터가 text 형식일 경우 '|' ,'\n' 을 기준으로 데이터를 파싱한다.
         *
         * @param {String}
         *            data [AJAX 에 의해 호출되어진 데이터]
         * @param {Object}
         *            options [PIE 옵션]
         * @return {Array} [PIE 데이터]
         */
        function loadText(data2, options) {

            var arr = [];
            var data = data2;
            var lineArr = data.split('\n');
            var dataTitles = [];
            var titleCheck = true;

            for (var i = 0; i < lineArr.length; i++) {

                if (lineArr.length <= 1) {

                    continue;
                }

                var objArr = lineArr[i].split('|');

                if (titleCheck) {

                    for (var j = objArr.length; j--;) {

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

            return arr;
        }

        function drawSvg(gauge) {

            var svgWidth = Math.floor(gauge.wrapper.width());
            var svgHeight = Math.floor(gauge.wrapper.height());

            gauge.svg = Raphael(gauge.wrapper[0], '100%', svgHeight);

            gauge.svg.canvas.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }

        function drawLayout(gauge) {
            var paper = gauge.svg,
                styles = gauge.styles.layout,
                width = paper.width,
                height =  paper.height;

            if (elementType === "VML") {
                paper.canvas.style.background = styles.area.color;
            }

            gauge.redrawItem.background = paper.rect(0,0, '100%','100%' );
            gauge.redrawItem.background.attr({"fill": styles.area.color, "stroke":styles.area.border});

        }

        function getPixel(endPoint, data, allData, interval, measureNum) {
            var res =  Math.round(endPoint - (data / (allData / measureNum)) * interval);
            return  (isNaN(res)===true) ? endPoint :  res;
        }


        function setInputData(gauge){
            var putData = gauge.options.data;
            var setData = gauge.settings.data;
            var use = putData.use;
            var dataLen = putData.data.length;
            for (var i = 0; i < dataLen; i ++ ){
                if( use == null || use == undefined){
                    for( x in putData.data[i]){
                        setData[i] = parseInt(putData.data[i][x]);
                    }

                }else{
                    setData[i] = parseInt(putData.data[i][use]);
                }
            }

            if ( gauge.options.data.reverse ) {

                setData.reverse();
            }

        }


        /**
         * gauge 의 데이터 중 최대값,최소값,평균값 을 구한다.
         * @param {gauge} gauge 객체
         */
        function setComputedData(gauge){
            var opt = gauge.options;
            var datas = gauge.settings.data;
            var dataLen = datas.length;
            var maxVal =0,  sum=0 , minVal=0;
            var findMin = [];
            for(var  i = 0 ; i < dataLen ; i++){
                var inputData = datas[i];
                inputData = findFloat(inputData);
                if(maxVal<inputData){
                    maxVal = inputData;
                }
                if(minVal>inputData){
                    minVal = inputData;
                }

                sum = sum + inputData;
                findMin.push(minVal);
            }
            if(opt.pointer.max==="auto"){
                opt.pointer.max = findFloat(maxVal);

            }
            if(opt.pointer.avg==="auto"){
                opt.pointer.avg = findFloat(sum / dataLen);
            }

            if(opt.minmax.min==="auto"){
                opt.minmax.min = findFloat(Math.min.apply(null, findMin));
            }
        }

        /**
         * 소수점 자리 대상인지를 확인
         * @param {num} :  검사 대상
         */
        function findFloat(num) {
            if(num === undefined){
                return false;
            }
            var stringNum = num.toString();
            var idx = stringNum.indexOf('.');
            if (idx !== -1) {
                num = (idx >= (stringNum.length - 3)) ? num : dropNumber(num,-2);
            }
            return num;
        }

        /**
         * 소수점 둘쨋자리 이상의 숫자를 반올림
         * @param {num} :  검사 대상
         * @param {idx} :  소수점 자릿수  (둘쨋자리) = -2
         */
        function dropNumber(num, idx) {
            num = parseFloat(num);
            var minus = '';
            if (num < 0) {
                minus = '-';
            }
            num = Math.abs(num);
            num = (parseInt((num + 0.5 * Math.pow(10, idx)) * 100)) / 100;
            var s = minus + num.toString();

            return parseFloat(s);
        }

        /**
         * GAUGE COUNTER BOX
         * @param {gauge} gauge 객체
         * @param {type} gauge type
         */
        function drawCounter(gauge, type) {
            var pos = gauge.sizes;
            var counter = gauge.styles.counter;
            var paper = gauge.svg;
            var isAnimated = gauge.options.use.animate;

            var dataSet = gauge.settings.data;
            var currentVal = dataSet[dataSet.length-1];
            var prevData = ((dataSet.length-2) > 0 ) ? dataSet[dataSet.length-2] : 0;

            var rectW = (typeof counter.width == "number")? counter.width:  (paper.width * 0.1),
                rectH = (typeof counter.height == "number")?  rectW / 2 + ( counter.height - (rectW / 2) ) :  rectW / 2 ,
                rectX = (pos.endX + rectH * 0.6)+ counter.x ,
                rectY = (pos.endY - rectH)+ counter.y ,
                textSize = rectW * 0.4 * counter.text.size,
                txtX = rectX + (rectW / 2)  ,
                txtY = rectY + (rectH / 2)  ;

            var counterBox = paper.rect(rectX, rectY, rectW, rectH, counter.radius);
            counterBox.attr({
                "fill" : counter.color,
                "stroke" : counter.border
            });
            var counter_text = paper.text(txtX, txtY, currentVal)
                .attr({
                    "font-family" : counter.text.family,
                    "font-size" : textSize,
                    "font-weight" : counter.text.weight,
                    "text-align" : 'center',
                    "fill" : counter.text.color
                });


            gauge.redrawItem.push(counterBox,counter_text);

            if(isAnimated && type !== 'led'){
                animNum(currentVal,prevData,counter_text,gauge);
            }else{
                if (gauge.options.data.format !== null) {
                    currentVal = formatting(currentVal, gauge.options.data.format);
                }
                counter_text.attr({text:currentVal});
            }
        }

        /** GAUEGE function: animNum
         * 값 변경 애니메이션    [ COUNTER 내의 숫자 움직임 ]
         * (inputData.attr("text")) 의 값을 변경
         * @[param] :  (비교값1, 비교값2, 대상, GAUGE);
         */
        function animNum(currentVal,prevData,inputData,gauge){
            inputData.attr({'text' : prevData});

            var difference  = Math.floor( Math.abs(currentVal-prevData));
            var counter = 0, inputText ="", inputNum=0;

            if(currentVal !==prevData ){
                var gapNum = setInterval(function() {

                    if(currentVal < prevData) {
                        inputNum = parseInt((inputData.attr("text")))-1;
                    } else {
                        inputNum = parseInt((inputData.attr("text")))+1;
                    }

                    inputText = (gauge.options.data.format !== null) ? formatting(inputNum,gauge.options.data.format) : inputNum;
                    inputData.attr({ text: inputText } );

                    counter = counter + 1;

                    if(inputNum===currentVal || counter === difference){
                        clearTimeout(gapNum);
                    }
                }, 1000/difference);
            }
        }

        /**
         * 눈금의 최대범위와 최소범위 값을 설정
         * @param {gauge} gauge 객체
         * 타겟값, 데이터값보다 최대값이 작거나 최소값이 크면 자동 설정
         */
        function adjustMinMax(gauge) {

            var range = gauge.options.minmax;
            var pointer = gauge.options.pointer;
            var target =parseInt(pointer.target);
            var axis= gauge.styles.axis;
            var linesCount = countLine(axis);

            /* 최소값 */
            var arr = [range.min, pointer.max, pointer.avg];
            if(gauge.options.use.target){
                arr.push(target );
            }
            range.min = Math.min.apply( null ,arr);

            if (range.min < 0) {
                range.min = (range.min % 10 === 0) ? range.min : range.min- (10 + (range.min % 10));
            } else {
                range.min = (range.min % 10 === 0) ? range.min : range.min- (range.min % 10);
            }


            if (range.max === "auto" || typeof range.max !== "number") {
                if (pointer.max === 0 && target === 0){
                    range.max = 10;
                }
                else if (pointer.max < 100 && target < 100) {
                    range.max = 100;
                } else {
                    range.max =  (target > pointer.max) ? target : (pointer.max);
                    if (range.max % linesCount !== 0) {
                        range.max = range.max + (linesCount - (range.max % linesCount));
                    }
                }
            } else if (range.max < pointer.max) {
                range.max = pointer.max;
            }

            var dataSet = gauge.settings.data;
            var inputData = dataSet[dataSet.length-1];
            if (inputData > range.max){
                range.max =  (10  - (inputData % 10 )) + inputData;
            }

        }

        /**
         * CHART 의 눈금 표시
         * ( col(가로) || row(세로) )
         */
        function drawAxis(gauge, type) {

            var pos = gauge.sizes;
            var axis = gauge.styles.axis;
            var paper = gauge.svg;

            var linesCount = countLine(axis);

            var blockLine = paper.set();
            var intervalLine = paper.set();
            var interval = pos.objHeight / linesCount;

            var i = 0, lineY = 0, lineX = 0;

            if ( gauge.options.use.direct === "col" ) {

                for (i = 0; i < linesCount + 1; i++) {

                    lineY = pos.startY + i * interval - 0.5;
                    lineX = Math.round(pos.startX) - 0.5;

                    if (i % axis.interval === 0) {
                        blockLine.push(paper.path("M" + lineX + "," + lineY + "L" + (lineX - axis.blockLine.length) + "," + lineY));
                    } else {
                        intervalLine.push(paper.path("M" + lineX + "," + lineY + "L" + (lineX - axis.intervalLine.length) + "," + lineY));
                    }

                }
            } else {
                interval = pos.objWidth / linesCount; // 한칸당 수 범위
                for (i = 0; i < linesCount + 1; i++) {
                    lineY = Math.round(pos.startY) - 0.5;
                    lineX = Math.round(pos.startX + i * interval) - 0.5;
                    if (i % axis.interval === 0) {
                        blockLine.push(paper.path("M" + lineX + "," + lineY+ "L" + lineX + ","+ (lineY - axis.blockLine.length)));
                    } else {
                        intervalLine.push(paper.path("M" + lineX + "," + lineY+ "L" + lineX + ","+ (lineY - axis.intervalLine.length)));
                    }
                }
            }
            blockLine.attr({ "stroke" : axis.blockLine.color });
            intervalLine.attr({"stroke" : axis.intervalLine.color });

            gauge.redrawItem.push(blockLine, intervalLine);
        }

        function countLine(x){
            return  ( x.block * x.interval == 0) ? x.block : x.block * x.interval;
        }

        /**
         * CHART 의 치수 표시
         * ( col(가로) || row(세로) )
         */
        function drawTextAxis(gauge, type) {

            var pos = gauge.sizes;
            var paper = gauge.svg;
            var axis = gauge.styles.axis;
            var text = axis.text;

            var maxAxis = gauge.options.minmax.max;
            var minAxis = gauge.options.minmax.min;
            var range = maxAxis - minAxis;

            var text_lines = paper.set();

            var direct = gauge.options.use.direct;

            var i = 0;
            if (direct === "col") {
                for ( i ; i < text.num ; i++) {
                    var textVal =Math.ceil((range/(text.num-1))*i);
                    if (textVal % 5 !== 0) {
                        textVal = textVal + (5 - (textVal % 5));
                    }
                    var lineY = Math.round(pos.endY - (pos.objHeight / range * textVal)) - 0.5;

                    textVal = textVal + minAxis;

                    if (gauge.options.data.format !== null) {
                        textVal = formatting(textVal, gauge.options.data.format);
                    }

                    text_lines.push(paper.text((pos.startX - (axis.blockLine.length * 1.35)), lineY,textVal));

                }
            } else {

                for (i ; i < text.num ; i++) {
                    var textVal =Math.ceil((range/(text.num-1))*i);
                    if (textVal % 5 !== 0) {
                        textVal = textVal + (5 - (textVal % 5));
                    }
                    var lineX = Math.round(pos.startX+ ((pos.objWidth / (range)) * textVal)) - 0.5;

                    textVal = textVal + minAxis;

                    if (gauge.options.data.format !== null) {
                        textVal = formatting(textVal, gauge.options.data.format);
                    }

                    text_lines.push(paper.text(lineX,(pos.startY - (axis.blockLine.length * 1.7)), textVal));
                }
            }

            text_lines.attr({
                'font-size' : text.size,
                'fill' : text.color,
                "text-anchor" : text.align,
                "font-family" : text.family,
                "font-weight" : text.weight
            });

            gauge.redrawItem.push(text_lines);
        }

        /**
         * GAUEGE CHART 의 TARGET 표시
         * @param(type) : GAUGE CHART TYPE
         * @param(targetVal) : TARGET VALUE
         */
        function drawTarget(gauge, type) {
            var paper = gauge.svg;
            var pos = gauge.sizes;
            var pointer = gauge.styles.pointer.target;
            var direct = gauge.options.use.direct;

            var minAxis = gauge.options.minmax.min;
            var maxAxis = gauge.options.minmax.max - minAxis;
            var targetVal =   gauge.options.pointer.target - minAxis;

            var linesCount = countLine(gauge.styles.axis);

            var interval, targetCmd, targetPath = "";

            if (direct === 'col') { // 세로면
                interval = pos.objHeight / linesCount; // 한칸당 수 범위
                targetPath = getPixel(pos.endY, targetVal, maxAxis, linesCount,interval);
                targetPath = Math.round(targetPath) - 0.5;
                targetCmd = make2Line((pos.endX + 1), (targetPath),
                    (pos.endX + 14), (targetPath - 4), (pos.endX + 14),
                    (targetPath + 4));

            } else { // 가로면
                interval = pos.objWidth / linesCount; // 한칸당 수 범위
                targetPath = pos.endX- getPixel(pos.objWidth, targetVal, maxAxis, linesCount,interval);
                targetPath = Math.round(targetPath) - 0.5;
                targetCmd = make2Line((targetPath), (pos.endY + 1),
                    (targetPath - 4), (pos.endY + 14), (targetPath + 4),
                    (pos.endY + 14));
            }

            var target = paper.path(targetCmd)
                .attr({
                    "fill" : pointer.color,
                    "stroke" : 'none'
                });

            gauge.tipItems.targetPointer = target;
            gauge.redrawItem.push(target);
        }

        /**
         * 최대값 또는 평균값
         * @param(type) : GAUGE CHART TYPE
         * @param(targetVal) : TARGET VALUE
         * targetVal =( max || avg )
         */
        function drawPointer(gauge, type, pointerType) {
            var paper = gauge.svg,
                pos = gauge.sizes,
                styles = gauge.styles;
            var linesCount = countLine(styles.axis);
            var direct = gauge.options.use.direct;

            var maxAxis = gauge.options.minmax.max;
            var minAxis = gauge.options.minmax.min;
            var range = maxAxis-minAxis;
            var pointer = gauge.options.pointer;

            var interval= "", pointerCmd= "",  pointerFlag= "",   labels= "",   pointerPath = "", value = null;

            if(pointerType === 'max'){
                value =  pointer.max - minAxis;
                styles = styles.pointer.max;
            }
            else if (pointerType === 'avg') {
                value =  pointer.avg - minAxis;
                styles = styles.pointer.avg;
            }


            if (direct === 'col') {
                interval = pos.objHeight / linesCount;
                pointerPath = Math.round( getPixel(pos.endY, value, range, linesCount, interval) ) - 0.5;
                labels = (paper.text((pos.endX + 15), pointerPath, pointerType));

                if (type === 'led') { // 꺽은 표시

                    pointerFlag = paper.circle((pos.endX - 1), pointerPath, 2)
                        .attr({
                            fill : styles.bar.color,
                            stroke : 'none'
                        });
                    pointerCmd = make2Line(pos.endX, pointerPath, (pos.endX + 7),(pointerPath - 7), (pos.endX + 7 + styles.bar.length),	(pointerPath - 7));
                    labels.translate(styles.bar.length - 3, -7);

                } else { // 일반적 길이
                    pointerCmd = makeLine(pos.startX, pointerPath,(pos.endX +  styles.bar.length), pointerPath);
                }

            } else { // 가로면

                interval = pos.objWidth / linesCount; // 한칸당 수 범위
                pointerPath = Math.round( pos.endX- getPixel(pos.objWidth, value, range, linesCount,interval) ) - 0.5;
                labels = (paper.text(pointerPath - 8, (pos.endY + 13), pointerType));

                if (type === 'led') { // 꺽은 표시

                    pointerFlag = paper.circle(pointerPath, (pos.endY - 1), 2)
                        .attr({
                            fill : styles.bar.color,
                            stroke : 'none'
                        });
                    pointerCmd = make2Line(pointerPath, (pos.endY), (pointerPath + 5),(pos.endY + 8), (pointerPath + 5),(pos.endY + 8 + styles.bar.length));
                    labels.translate(5, styles.bar.length);

                } else { // 일반적 길이
                    pointerCmd = makeLine(pointerPath, pos.startY, pointerPath, (pos.endY + styles.bar.length));
                }
            }

            if (pointerType === 'max' && pointer.avg == value && gauge.options.use.avg) {
                labels.translate(23, 0);
            }

            labels.attr({
                'font-size' : styles.font.size,
                'fill' : styles.font.color,
                "text-anchor" : styles.font.align,
                "font-family" : styles.font.family
            });

            var pointer = paper.path(pointerCmd)
                .attr({ "stroke" : styles.bar.color });

            if (type !== 'led') {
                pointer.attr({
                    "stroke-dasharray" : "- "
                });
            }

            if( pointerType === 'max'){
                gauge.tipItems.max = paper.set();
                gauge.tipItems.max.push(labels, pointer,pointerFlag);
            }
            else if(pointerType ==='avg'){
                gauge.tipItems.avg = paper.set();
                gauge.tipItems.avg.push(labels, pointer,pointerFlag);
            }

            gauge.redrawItem.push(pointer,labels,pointerFlag);

        }

        function makeLine(sX, sY, eX, eY) {
            return "M" + sX + "," + sY + "L" + eX + "," + eY;
        }

        function make2Line(sX, sY, cX, cY, eX, eY) {
            return "M" + sX + "," + sY + "L" + cX + "," + cY + "L" + eX + "," + eY;
        }

        /**
         * LINEAR TYPE_GAUGE CHART
         */
        function solidLinear(gauge){
            var pos = gauge.sizes;
            var linear = gauge.styles.linear;
            var paper = gauge.svg;
            var isAnimated = gauge.options.use.animate;
            var rectX = pos.startX,
                rectY = pos.startY,
                rectW = pos.objWidth,
                rectH = pos.objHeight,
                prevHeight = 0,
                curHeight = 0;

            var minAxis =  gauge.options.minmax.min;
            var range = gauge.options.minmax.max - minAxis ;

            var dataSet = gauge.settings.data;
            var curVal = dataSet[dataSet.length-1] - minAxis;
            var prevVal = ((dataSet.length-2) > 0 ) ? dataSet[dataSet.length-2]- minAxis : 0;

            var linesCount = countLine(gauge.styles.axis);
            var direct = gauge.options.use.direct;
            var prevGauge = null,   changedGauge = null, interval = 0;

            /* 세로 모양 */
            if (direct === "col") {

                interval = pos.objHeight / linesCount;

                prevHeight = getPixel(pos.endY, prevVal, range, linesCount,interval);
                curHeight = getPixel(pos.endY, curVal, range, linesCount,interval);

                rectH = rectH - (prevHeight - rectY);
                rectH = rectH < 0  ? 0 :  rectH ;
                rectY = (isAnimated) ? prevHeight : curHeight;
                rectW = rectW - 1.0;
                var  chagneH  = pos.objHeight - (curHeight - pos.startY)-1;
                if(isAnimated){
                    prevGauge = paper.rect(rectX, rectY, rectW,rectH); // 잔상 리니어
                    changedGauge = paper.rect(rectX, rectY, rectW,rectH); // 변하는 리니어
                    changedGauge.animate({
                        y : curHeight,
                        height : chagneH
                    }, 1000);
                }else{
                    prevGauge = paper.rect(rectX, curHeight, rectW,chagneH);// 잔상 리니어
                    changedGauge = paper.rect(rectX, curHeight, rectW,chagneH);
                }

            } else {

                /* 가로 모양 */

                interval = pos.objWidth / linesCount;

                prevHeight = getPixel(pos.endX, prevVal, range, linesCount,interval);
                curHeight = getPixel(pos.endX, curVal, range, linesCount,interval);

                rectW = (isAnimated) ? (pos.endX - prevHeight): (pos.endX - curHeight);

                if(isAnimated){
                    prevGauge = paper.rect(rectX, rectY, rectW,rectH); // 잔상 리니어
                    changedGauge = paper.rect(rectX, rectY, rectW,rectH)
                        .animate({	width : (pos.endX - curHeight)	}, 1000);

                }else{
                    prevGauge = paper.rect(rectX, curHeight, rectW,(pos.objHeight - (curHeight - pos.startY)));// 잔상 리니어
                    changedGauge = paper.rect(rectX, rectY, rectW,rectH);
                }
            }
            prevGauge.attr({
                fill : linear.change.color,
                stroke : linear.change.border,
                opacity : linear.change.opacity
            });
            gauge.tipItems.base = changedGauge;
            gauge.tipItems.prev = prevGauge;

            changedGauge.attr({
                fill : linear.change.color,
                stroke : linear.change.border
            });


            gauge.redrawItem.push(changedGauge,prevGauge);
        }

        function ledLinear(gauge){
            var pos = gauge.sizes,
                linear = gauge.styles.linear,
                paper = gauge.svg;
            var isAnimated = gauge.options.use.animate;

            var rectX = pos.startX-0.5,
                rectY = pos.startY,
                rectW = pos.objWidth,
                rectH = pos.objHeight;

            var minAxis =  gauge.options.minmax.min;
            var maxAxis = gauge.options.minmax.max- minAxis ;

            var dataSet = gauge.settings.data;
            var curVal = dataSet[dataSet.length-1] - minAxis;
            var prevVal = ((dataSet.length-2) > 0 ) ? dataSet[dataSet.length-2]- minAxis : 0;

            var linesCount = countLine(gauge.styles.axis);

            var i = 0, interval = 0, lineX = 0, lineY = 0,
                dropGauge = null,
                changedGauge = null;

            var Axis = paper.set();

            var direct = gauge.options.use.direct;

            var block = gauge.styles.axis.block;
            if (direct === "col") { // 가로
                interval = pos.objHeight / linesCount;
                var  prevHeight = getPixel(pos.endY, prevVal, maxAxis, linesCount,interval),
                    curHeight = getPixel(pos.endY, curVal, maxAxis, linesCount,interval);

                rectH = rectH - (prevHeight - rectY),
                    rectY = (isAnimated) ? prevHeight : curHeight;

                changedGauge = paper.rect(rectX, curHeight,rectW,(pos.objHeight - (curHeight - pos.startY))); // 변하는
                dropGauge = paper.path(
                    "M" + (rectX ) + ","+ (pos.startY)  +
                    "L"+ (pos.startX + pos.objWidth - 0.5) + ","+ (pos.startY)
                );
                lineX = Math.round(pos.startX) - 0.5;
                for (i = 0; i < block+1; i++) {
                    lineY = (pos.startY + (pos.objHeight/ block * i)) - 0.5;
                    Axis.push(paper.path(
                        "M" + lineX + "," + lineY +
                        "L"+ (lineX + pos.objWidth ) + "," + lineY)
                    );
                }
                if (isAnimated) {
                    dropGauge.animate({
                        "transform" : "t0,"+ (pos.objHeight - (pos.endY - curHeight))
                    }, 1000, 'bounce');
                }

            } else { // 세로버전
                interval = pos.objWidth / linesCount;
                curHeight = getPixel(pos.endX, curVal, maxAxis, linesCount,interval);

                changedGauge = paper.rect(rectX, rectY,(pos.endX - curHeight), rectH); // 변하는 리니어
                dropGauge = paper.path("M" + pos.endX + "," + (pos.startY)+ "L" + (pos.endX) + "," + (pos.endY));

                for (i = 0; i < block + 1; i++) {
                    lineY = Math.round(pos.startY) - 0.5;
                    lineX = (pos.startX + (pos.objWidth / block * i)) - 0.5;
                    Axis.push(paper.path("M" + lineX + "," + lineY + "L"+ lineX + "," + (lineY + pos.objHeight + 0.5)));
                }
                if (isAnimated) {
                    dropGauge.animate({
                        "transform" : "t" + (pos.startX - curHeight - 0.5)+ ",0"
                    }, 1000, 'bounce');
                }
            }

            dropGauge.attr({
                'stroke-width' : pos.objHeight / 100,
                stroke : linear.led.dropColor
            });
            changedGauge.attr({
                fill : linear.led.color,
                stroke : linear.led.border
            });
            Axis.attr({
                'stroke-width' : gauge.styles.axis.interval,
                'stroke' : gauge.styles.layout.area.color
            });

            var baseItem = paper.set().push(changedGauge);
            gauge.tipItems.base = baseItem;
            gauge.redrawItem.push(dropGauge,changedGauge,Axis);

        }

        function pointerLinear(gauge){

            var pos = gauge.sizes;

            var linear = gauge.styles.linear;
            var paper = gauge.svg;
            var isAnimated = gauge.options.use.animate;

            var minAxis =  gauge.options.minmax.min;
            var maxAxis = gauge.options.minmax.max- minAxis ;

            var dataSet = gauge.settings.data;
            var curVal = dataSet[dataSet.length-1] - minAxis;
            var prevVal = ((dataSet.length-2) > 0 ) ? dataSet[dataSet.length-2]- minAxis : 0;

            var rectX = pos.startX-0.5,
                rectY = pos.startY,
                rectW = pos.objWidth,
                rectH = pos.objHeight;
            var linesCount = countLine(gauge.styles.axis);

            var direct = gauge.options.use.direct;

            var changedGauge = null, interval = 0, endPoint = 0, gaugeMark = "", prevHeight = 0, curHeight = 0;

            if (direct === "col") {
                interval = pos.objHeight / linesCount;
                endPoint = pos.endY,
                    prevHeight = getPixel(endPoint, prevVal, maxAxis, linesCount,interval),
                    curHeight = getPixel(endPoint, curVal, maxAxis, linesCount,interval);

                var changedY = (isAnimated) ? prevHeight : curHeight;

                changedGauge = paper.path("M" + rectX + "," + changedY+ "L" + (rectX + rectW) + "," + changedY); // 잔상
                gaugeMark = paper.path(
                    "M" + (rectX - 2) + ","+ changedY +
                    "L" + (rectX - 17) + ","+ (changedY + 6) +
                    "L" + (rectX - 17) + "," + (changedY - 6) +
                    "L" + (rectX - 2) + ","+ changedY);

                if (isAnimated) {
                    changedGauge.animate({
                        "transform" : "t0," + (curHeight - changedY)
                    }, 1000);
                    gaugeMark.animate({
                        "transform" : "t0," + (curHeight - changedY)
                    }, 1000);
                }

            } else {
                interval = pos.objWidth / linesCount,
                    endPoint = pos.endX,
                    prevHeight = getPixel(endPoint, prevVal, maxAxis, linesCount,interval),
                    curHeight = getPixel(endPoint, curVal, maxAxis, linesCount,interval);

                var changedW = (isAnimated) ? (pos.endX - prevHeight) : (pos.endX - curHeight),
                    changedX = rectX +changedW;

                changedGauge = paper.path(
                    "M" + changedX + ","+ rectY +
                    "L" + changedX + ","+ (rectY + rectH)); // 잔상 리니어
                gaugeMark = paper.path(
                    "M" + changedX + ","+ (pos.startY - 2) +
                    "L"  + (changedX + 6) + "," + (pos.startY - 17) +
                    "L"+ (changedX - 6) + ","+ (pos.startY - 17) +
                    "L"+ changedX + ","+ (pos.startY - 2));

                if (isAnimated) {
                    changedGauge.animate({
                        "transform" : "t"+ ((pos.endX - changedW) - curHeight)+ ",0"
                    }, 1000);
                    gaugeMark.animate({
                        "transform" : "t"+ ((pos.endX - changedW) - curHeight)+ ",0"
                    }, 1000);
                }
            }

            changedGauge.attr({
                fill : linear.pointer.color,
                stroke : linear.pointer.border,
                'stroke-width' : linear.pointer.lineSize
            });
            gaugeMark.attr({
                fill : linear.pointer.mark.color,
                stroke : linear.pointer.mark.border
            });

        }

        function drawLinear(gauge, type) {

            var pos = gauge.sizes;

            var linear = gauge.styles.linear;
            var paper = gauge.svg;

            var rectX = pos.startX-0.5;
            var rectY = pos.startY-0.5;
            var rectW = pos.objWidth;
            var rectH = pos.objHeight;

            var baseRect = paper.rect(rectX , rectY, rectW, rectH)
            baseRect.attr({
                fill : linear.base.color,
                stroke : linear.base.border
            });

            gauge.tipItems.base = baseRect;
            gauge.redrawItem.push(baseRect);

            if (type === 'led') {
                baseRect.attr({
                    stroke : "none"
                });
            }

            switch(gauge.type){
                case "pointer" :
                    pointerLinear(gauge);
                    break;
                case "led" :
                    ledLinear(gauge);
                    break;
                case "solid" :
                    solidLinear(gauge);
                    break;
                default :
                    break;
            }

        }

        function getMousePosition(e) {
            var m = {};
            var target, rect, parent, parentRect;
            e = e || window.event;
            if (elementType === 'VML') {
                target = e.target || e.srcElement, rect = target
                    .getBoundingClientRect(), parent = target.parentNode,
                    parentRect = parent.getBoundingClientRect();
                m.x = e.offsetX + rect.left - parentRect.left;
                m.y = e.offsetY + rect.top - parentRect.top;
            } else {
                var appName = navigator.appName.toLowerCase();
                var userAgent = navigator.userAgent.toLowerCase();
                if (userAgent.indexOf('firefox') > -1) { // FireFox
                    m.x = Math.round(e.layerX);
                    m.y = Math.round(e.layerY);
                } else if (appName === 'opera') { // Opera
                    target = e.target || e.srcElement, rect = target
                        .getBoundingClientRect(),
                        parent = target.parentNode, parentRect = parent
                        .getBoundingClientRect();
                    m.x = e.offsetX + rect.left - parentRect.left;
                    m.y = e.offsetY + rect.top - parentRect.top;
                } else { // etc
                    m.x = Math.round(e.offsetX);
                    m.y = Math.round(e.offsetY);
                }
            }
            return m;
        }

        /**
         * mouse move event
         */
        function mouseMoveFunc(e, _this, gauge, x) {
            var options = gauge.options;
            var toolTip = gauge.tipItems.toolTip;
            var pointerVal = gauge.options.pointer;
            var mousePosition = getMousePosition(e);
            var data = gauge.settings.data;

            if (options.toolTip.func !== null) {

                eval(options.toolTip.func)(gauge, data, toolTip);

            } else {
                var tip = "";
                switch (x) {
                    case "all" :
                        tip +=  '<span>' + "- data :  "+dropNumber(data[data.length-1],-2) +'</span><br />';
                        tip +=  '<span>' + "- Max :  "+pointerVal.max +'</span><br />';
                        tip +=  '<span>' + "- Average :  "+pointerVal.avg  +'</span><br />';
                        break;
                    case "draw" :
                        tip +=  '<span>' + " current data : "+dropNumber(data[data.length-1],-2) +'</span><br />';
                        break;
                    case "targetPointer" :
                        tip +=   '<span>' + "target :  "+pointerVal.target +'</span><br />';
                        break;
                    case "prev" :
                        tip +=   '<span>' + "previous data :  "+data[data.length-2] +'</span><br />';
                        break;
                    case "max" :
                        tip +=   '<span>' + " Max :  "+pointerVal.max+'</span><br />';
                        break;
                    case "avg" :
                        tip +=   '<span>' + " Average :  "+pointerVal.avg +'</span><br />';
                        break;
                    default :
                        tip += x;
                }
                var tipElement = '<div class="tip_data">' + tip + '</div>';
                toolTip.html(tipElement);
            }

            var toolTipWidth = toolTip.width() / 2;
            var toolTipHeight = toolTip.height();

            toolTip.css({
                top : mousePosition.y - toolTipHeight+ options.toolTip.position.y -30,
                left : mousePosition.x - toolTipWidth+ options.toolTip.position.x
            });

            gauge.redrawItem.push(toolTip);

        }

        /**
         * gauge 에 이벤트 발생시
         * @param  {gauge} gauge 객체
         */
        function itemsEvents(gauge) {

            var styles = gauge.styles;
            var options = gauge.options;

            if (!options.use.toolTip) {
                return;
            }

            /* 현재데이터영역 */
            gauge.tipItems.base.mousemove(function(e) {

                gauge.tipItems.toolTip.show();
                mouseMoveFunc(e, this, gauge, "draw");

            }).mouseout(function(e) {

                gauge.tipItems.toolTip.hide();

            });

            /* 최대값 */
            if (options.use.max && options.toolTip.func ==null) {
                gauge.tipItems.max.mousemove(function (e) {

                    gauge.tipItems.toolTip.show();
                    mouseMoveFunc(e, this, gauge, "max");

                }).mouseout(function (e) {

                    gauge.tipItems.toolTip.hide();

                });
            }

            /* 평균값 */
            if (options.use.avg && options.toolTip.func ==null) {
                gauge.tipItems.avg.mousemove(function (e) {

                    gauge.tipItems.toolTip.show();
                    mouseMoveFunc(e, this, gauge, "avg");

                }).mouseout(function (e) {

                    gauge.tipItems.toolTip.hide();

                });
            }

            /* 타겟값 */
            if (options.use.target && options.toolTip.func ==null) {
                gauge.tipItems.targetPointer.mousemove(function(e) {

                    gauge.tipItems.toolTip.show();
                    mouseMoveFunc(e, this, gauge, "targetPointer");

                }).mouseout(function(e) {

                    gauge.tipItems.toolTip.hide();

                });
            }

            /* 이전데이터영역 */
            if (gauge.type === undefined || gauge.type === "solid") {
                if (options.use.animate) {
                    gauge.tipItems.prev.mousemove(function(e) {

                        gauge.tipItems.toolTip.show();
                        mouseMoveFunc(e, this, gauge, "prev");

                    }).mouseout(function(e) {

                        gauge.tipItems.toolTip.hide();

                    });
                }
            }
        }

        /**
         * 툴팁 사용 시 element 를 생성 한다.
         * @param  {pie} pie 객체
         */
        function appendToolTip(gauge) {
            var options = gauge.options;
            gauge.tipItems.toolTip = $('<div>');

            if (options.toolTip.className === null) {

                gauge.tipItems.toolTip.css({
                    "background" : "#171717",
                    "color" : "#fff",
                    "padding" : "5px 10px",
                    "font-size" : " 12px",
                    "font-family" : "NanumGothic"
                });

            } else {

                gauge.tipItems.toolTip.attr('class', options.toolTip.className);
            }

            gauge.tipItems.toolTip.css({
                'position' : "absolute",
                'white-space' : 'nowrap',
                'z-index' : 100000
            });

            gauge.tipItems.toolTip.hide();

            gauge.wrapper.append(gauge.tipItems.toolTip);

        }

        /**
         * 데이터 형식 변환
         * @param  {num} 데이터 값
         * @param  {formatType} 형식 종류
         */
        function formatting(num, formatType) {
            var res = null;
            switch (formatType) {
                case "prime":
                    res = dropNumber(num);
                    break;
                case "percent":
                    res = num + "%";
                    break;

                case "temperature":
                    res = num + "º";
                    break;
                default:
                    res = num;

            }
            return res;
        }

        function noData(gauge) {

            var x = gauge.wrapper.width() / 2,
                y = gauge.wrapper.height() / 2,
                text = gauge.svg.text(x, y, '데이터가 로드되지 않았습니다.');

            text.attr({
                'font-family' : 'dotum',
                'font-size' : 12,
                fill : '#000'
            });
        }
        function drawItem(gauge, type) {

            var use = gauge.options.use;

            if (type !== "led") {
                if(use.axis){
                    drawAxis(gauge,type);
                }
                if(use.axisText){
                    drawTextAxis(gauge,type);
                }
            }
            drawLinear(gauge, type);

            if(use.target){
                drawTarget(gauge, type);
            }
            if(use.max){
                drawPointer(gauge,type,"max");
            }
            if(use.avg){
                drawPointer(gauge,type, "avg");
            }
            if(use.counter){
                drawCounter(gauge,type);
            }

            if (use.toolTip) {
                appendToolTip(gauge);
            }

        }

        function reDrawGauge(gauge, type) {
            gauge.redrawItem.remove();
            $(".tip_data").parent().remove();
            gauge.redrawItem = gauge.svg.set();
            setWrapper(gauge);
            gauge.settings = cloneSettingModel(gauge);

            drawLayout(gauge);
            if (gauge.options.data.data === 'error' || gauge.options.data.data.length <= 0) {
                noData(gauge);

            } else {
                setInputData(gauge);
                setComputedData(gauge);
                adjustMinMax(gauge);

                gauge.sizes = cloneSettingSize(gauge, type);
                drawItem(gauge, type);
                itemsEvents(gauge);
            }
        }

        /**
         * GAUGE 을 렌더링 하기 위한 전반적인 부분을 세팅한다.
         * @param  {Gauge} gauge 객체
         * @param  {Node} wrapper gauge 가 append 되는 DIV
         * @param  {Object} styles pie 스타일
         * @param  {Object} options pie 옵션
         * @param  {String} GAUGE CHART의 TYPE
         */
        function setup(gauge, wrapper, styles, options, type) {

            gauge.wrapper = wrapper;

            gauge.wrapper.css({
                'position' : "relative"
            });

            gauge.styles = extendStyles(styles);

            gauge.options = extendOptions(options);

            gauge.options.data.data = loadData(gauge.options);

            gauge.tipItems = {};

            drawSvg(gauge);

            setWrapper(gauge);

            gauge.redrawItem = gauge.svg.set();

            gauge.settings = cloneSettingModel(gauge);

            drawLayout(gauge);
            if (gauge.options.data.data === 'error'
                || gauge.options.data.data.length <= 0) {
                noData(gauge);

            } else {

                setInputData(gauge);
                setComputedData(gauge);
                adjustMinMax(gauge);
                gauge.sizes = cloneSettingSize(gauge, type);
                drawItem(gauge, type);
                itemsEvents(gauge);

            }
        }

        /**
         * GAUEGE 에 이벤트를 붙여준다.
         *
         * @param {GAUEGE}
         *            gauge 객체
         */
        function bindEvents(wrapper, gauge) {
            /**
             * gauge 를 redraw 할 때 발생하는 이벤트
             */
            gauge.event.on('reDraw', function(e, gauge) {
            });

            /**
             * gauge 의 resize 이벤트
             */
            if (wrapper.data('resizeEventName')) {

                $(window).off(wrapper.data('resizeEventName'));
            }
            var wrapperUniqueId = getUniqueID();

            wrapper.data('resizeEventName', 'resize.' + wrapperUniqueId);

            $(window).on(
                wrapper.data('resizeEventName'),
                function(e) {

                    var afterWrapperWidth = gauge.settings.wrapper.width;
                    var beforeWrapperWidth = gauge.wrapper.width();
                    var afterWrapperHeight = gauge.settings.wrapper.height;
                    var beforeWrapperHeight = gauge.wrapper.height();

                    if (afterWrapperWidth !== beforeWrapperWidth|| afterWrapperHeight !== beforeWrapperHeight) {
                        if (gauge.options.use.responsive) {
                            gauge.resize();
                        }
                        gauge.svg.width = gauge.wrapper.width();
                        gauge.svg.height = gauge.wrapper.height();
                    }
                });
        }

        function setWrapper(gauge) {

            gauge.svg.width = gauge.wrapper.width();
            gauge.svg.height = gauge.wrapper.height();

        }

        function getUniqueID() {

            return Math.random().toString(36).substr(2, 9);

        }

        /**
         * GAUEGE 에 API 를 추가한다.
         * @param  {GAUEGE} gauge 객체
         */
        function addApis(gauge, type) {
            gauge.on = function(eventName, callback) {

                gauge.event.on(eventName, callback);
            };

            /**
             *   GAUEGE CHART 를 다시 그릴 경우 사용
             *   설정 값에 따른 셋팅
             *   BEFORE REDRAW  SETTING USER OPTIONS
             */
            gauge.reDraw = function(styles, options) {

                gauge.styles = extendStyles(styles);
                gauge.options = extendOptions(options);
                gauge.options.data.data = loadData(gauge.options);

                reDrawGauge(gauge,type);

                gauge.event.trigger('reDraw', [ gauge ]);
            };

            /**
             * resize
             */
            gauge.resize = function() {
                reDrawGauge(gauge, type);
            };

            gauge.mouseMoveFunc = function(e,x,gauge,type){
                mouseMoveFunc(e, x, gauge, type);
            }
        }

        /**
         * LINEAR 초기화 함수
         *
         * @param {Node}
         *            wrapper gauge 가 append 되는 DIV
         * @param {Object}
         *            styles gauge 스타일
         * @param {Object}
         *            options gauge 옵션
         * @return {gauge} gauge 객체
         */
        self.init = function(wrapper, styles, options, type) {
            var gauge = {};

            gauge.event = $({});

            bindEvents(wrapper, gauge);

            if (type.substring(0, 6) === "linear") {
                var flag = type.lastIndexOf("_");
                type = type.substring(flag + 1);
                gauge.type = type;
            }

            setup(gauge, wrapper, styles, options, type);

            addApis(gauge, type);

            // 트라이얼 워터마크 생성
            if (TRIAL_UI) {

                appendTrialUi(wrapper);
            }

            /**
             * license object chart 에 추가(ver.150915 평다진)
             */
            gauge.license = licenseObject;
            /**
             * wrapper(jQuery selector)에 저장(ver. 160318 평다진)
             */
            wrapper[0].instance = gauge;

            return gauge;
        };

        if (!window.webponent) {
            window.webponent = {};
        }
        if (!window.webponent.visual) {
            window.webponent.visual = {};
        }
        window.webponent.visual.linear = self;

    })();

})();
