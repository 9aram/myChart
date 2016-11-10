var tRadarGroups = {};

/**
 * 한 영역에 모든 series의 데이터를 가져올 필요가 없어서,
 * 첫번째 시리즈의 key값을 리턴시키고 종료.
 * @param  {object} objSeries 한 영역의 모든 series
 * @return {string}           첫번째 시리즈의 key값
 */
function getFirstSeries (objSeries) {
	var firstSeries = '';
	$.each(objSeries, function(key, value) {

		if(firstSeries == '' && key != 'type' && value.visible != false) {
			firstSeries = key;
			return false;
		}
	});

	return firstSeries;
}
/**
 * tRadar - Trend
 * @param  {Chart} paper chart 객체
 * @param  {Object} obj 영역별 정보를 갖고 있다.
 * @return null
 */
var drawtRadar = function(paper, obj) {

	var firstSeries = getFirstSeries(paper.getSeries()[obj.key]);

	var optionsTradar = obj.options.tRadar;
	var stylesGraph = obj.styles.graph;
	
	if(!tRadarGroups.hasOwnProperty(obj.key)) {
		tRadarGroups[obj.key] = {
			trend: null,
			trend0123: null,
			ls: null
		};
	}
	if(tRadarGroups[obj.key].trend != null) {
		tRadarGroups[obj.key].trend.remove();
	}
	
	tRadarGroups[obj.key].trend = paper.set();

	var originalData = paper.getOriginalData();
	var trendArrays = [];
	var thisFirstData = obj.data['DATA-' + firstSeries];

	var sliceData = originalData;//.slice(options.leftIndecator, options.rightIndecator);

	var firstData = sliceData[0];

	var trendArray = [];

	var trend = firstData.trend;
	if(trend == '2'){
		trendArray.push(0);
	}
	
	for(var i = 0, len = sliceData.length; i < len; i ++){

		if(sliceData[i].xaxis == " ") continue;

		var tTrend = sliceData[i].trend;

		if(trend !=	tTrend){
			// 햇빛으로 변경될때 이전까지가 안개구간이므로 -1 해줌.
			if(tTrend == '2'){
				trendArray.push(i);
			} else {
				trendArray.push(i - 1);
				trendArrays.push(trendArray);
				trendArray = [];
			}
			trend = tTrend;
		}
		if(i == len - 1 && tTrend == '2' && trend == '2'){
			trendArray.push(i);
			trendArrays.push(trendArray);
		}
	}

	var count = thisFirstData.data.length;

	var xGap = (obj.width - stylesGraph.paddingLeft - stylesGraph.paddingRight) / count, xGapHalf = xGap / 2;
	var startX = obj.x + stylesGraph.paddingLeft;
	
	var fp = {
		x: Math.round((xGap * 0) + xGapHalf)  + startX
	};
	var sp = {
		x: Math.round((xGap * 1) + xGapHalf)  + startX
	};
	
	var gap = sp.x - fp.x;

	var y = obj.y;
	// if(TYPE === 'VML') y = y - 1;
	
	for(var i = 0, len = trendArrays.length; i < len; i ++){
		
		var fData = thisFirstData.data[trendArrays[i][0]];
		var sData = thisFirstData.data[trendArrays[i][1]];

		var fPoint = {
			x: Math.round((xGap * trendArrays[i][0]) + xGapHalf)  + startX
		};
		var sPoint = {
			x: Math.round((xGap * trendArrays[i][1]) + xGapHalf)  + startX
		};
		
		var item = paper.rect(fPoint.x - gap / 2, y, sPoint.x - fPoint.x + gap, obj.height).attr({
			'fill': optionsTradar.trendStyles.color,
			'fill-opacity': optionsTradar.trendStyles.opacity,
			'stroke-width': 0
		});
		tRadarGroups[obj.key].trend.push(item);
	}
};
var drawtRadar0123 = function(paper, obj) {
	var firstSeries = getFirstSeries(paper.getSeries()[obj.key]);

	var optionsTradar = obj.options.tRadar;
	var stylesGraph = obj.styles.graph;

	if(!tRadarGroups.hasOwnProperty(obj.key)) {
		tRadarGroups[obj.key] = {
			trend: null,
			trend0123: null,
			ls: null
		};
	}
	if(tRadarGroups[obj.key].trend0123 != null) {
		tRadarGroups[obj.key].trend0123.remove();
	}
	
	tRadarGroups[obj.key].trend0123 = paper.set();

	var originalData = paper.getOriginalData();
	var trendArrays = [];
	var thisFirstData = obj.data['DATA-' + firstSeries];

	var sliceData = originalData;//.slice(options.leftIndecator, options.rightIndecator);

	var firstData = sliceData[0];

	var tech = firstData.tech;
	var tech_f = firstData.tech_f;
	
	for(var i = 0, len = sliceData.length; i < len; i ++){

		if(sliceData[i].xaxis == " ") continue;
		
		var tTech = sliceData[i].tech;
		var tTech_f = sliceData[i].tech_f;
		
		if((tech == tTech && tech_f == tTech_f) || tTech_f == "3"){
			// tech와 tech_f가 비교대상과 같으면 pass
			// tTech_f가 3이면 pass
			if(tTech_f == "3"){
				tech_f = tTech_f;
			}
		} else {
			trendArrays.push({index: i, data: sliceData[i]});
			tech = tTech;
			tech_f = tTech_f;
		}
	}

	var yAxis = thisFirstData.yAxis;
	if(obj.options.use.multiYAxis) {
		
		yAxis = obj.yaxis[firstSeries].data;
	}

	var yAxisMax = yAxis[yAxis.length - 1],
		yAxisMin = yAxis[0],
		yAxisGap = yAxisMax - yAxisMin;
	var count = thisFirstData.data.length;

	var startY = obj.styles.layout.paddingTop + stylesGraph.paddingTop;

	var graphtop = obj.y + stylesGraph.paddingTop, 
		graphheight = obj.height - stylesGraph.paddingTop - stylesGraph.paddingBottom;

	var xGap = (obj.width - stylesGraph.paddingLeft - stylesGraph.paddingRight) / count, 
		xGapHalf = xGap / 2;
	var startX = obj.x + stylesGraph.paddingLeft;
	
	for(var i = 0, len = trendArrays.length; i < len; i ++){
		var fData = trendArrays[i].data;
		
		var yData = 0;
		var color = "#000000";

		if(fData.tech_f == "2" || fData.tech == "3"){ // 상승
			yData = Number(String(fData[optionsTradar.low]).replaceAll(',', ''));
			color = optionsTradar.trend0123Styles.upColor;
		} else if(fData.tech_f == "5" || fData.tech == "0") { //하락
			yData = Number(String(fData[optionsTradar.high]).replaceAll(',', ''));
			color = optionsTradar.trend0123Styles.downColor;
		} else { // 보합인데 실제로는 그리지 않음.
			yData = Number(String(fData[optionsTradar.close]).replaceAll(',', ''));
			color = "#000000";
		}
		
		var fPoint = {
			x: Math.round((xGap * trendArrays[i].index) +xGap)  + startX, 
			y: Math.round(graphheight * ((yAxisMax - yData ) / yAxisGap)) + graphtop
		};
		
		var y = 0;
		var text = '';
		if(fData.tech_f == "5" || fData.tech == "0") { //하락
			y = fPoint.y - 20;
			text = fData.tech + '\n↓';
		} else {
			y = fPoint.y + 19;
			text = '↑\n' + fData.tech;
		}
		
		var item = paper.text(Math.round(fPoint.x -xGapHalf), Math.round(y), text).attr({
			'fill': color,
			'text-anchor': 'middle',
			'font-family': 'Dotum', 'font-size': '11'
		});
		tRadarGroups[obj.key].trend0123.push(item);
		
	}
};
var drawtRadarLS = function(paper, obj) {

	var firstSeries = getFirstSeries(paper.getSeries()[obj.key]);

	var optionsTradar = obj.options.tRadar;
	var stylesGraph = obj.styles.graph;

	if(!tRadarGroups.hasOwnProperty(obj.key)) {
		tRadarGroups[obj.key] = {
			trend: null,
			trend0123: null,
			ls: null
		};
	}
	if(tRadarGroups[obj.key].ls != null) {
		tRadarGroups[obj.key].ls.remove();
	}
	
	tRadarGroups[obj.key].ls = paper.set();

	var originalData = paper.getStockOriginalData();

	var trendArrays = [];
	var thisFirstData = obj.data['DATA-' + firstSeries];

	var sliceData = paper.getOriginalData();

	var tech = "";
	var techIndex = 0;
	
	var i = 0;
	var len = sliceData.length;
	var tTech = "";
	
	for(i = 0; i < len; i ++){
		tTech = sliceData[i].long_short;
		
		if(tTech == "0" || tTech == "3" || sliceData[i].date == ''){
			// tech와 tech_f가 비교대상과 같으면 pass
			// tTech_f가 3이면 pass

		} else {
			trendArrays.push({
				index: i,
				data: sliceData[i]
			});
			tech = tTech;
		}
	}
	
	var yAxis = thisFirstData.yAxis;

	var yAxisMax = yAxis[yAxis.length - 1],
		yAxisMin = yAxis[0],
		yAxisGap = yAxisMax - yAxisMin;
	var count = thisFirstData.data.length;

	var startY = obj.styles.layout.paddingTop + stylesGraph.paddingTop;
	var graphtop = obj.y + stylesGraph.paddingTop, 
		graphheight = obj.height - stylesGraph.paddingTop - stylesGraph.paddingBottom;

	var xGap = (obj.width - stylesGraph.paddingLeft - stylesGraph.paddingRight) / count, 
		xGapHalf = xGap / 2;
	var startX = obj.x + stylesGraph.paddingLeft;
	
	for(var i = 0, len = trendArrays.length; i < len; i ++){
		var fData = trendArrays[i].data;
		
		var yData = 0;
		var color = "#000000";
		if(fData.long_short == "2"){ // 상승
			yData = Number(String(fData[optionsTradar.low]).replaceAll(',', ''));
			color = optionsTradar.lsStyles.upColor;
		} else if(fData.long_short == "1") { //하락
			yData = Number(String(fData[optionsTradar.high]).replaceAll(',', ''));
			color = optionsTradar.lsStyles.downColor;
		} else { // 보합인데 실제로는 그리지 않음.
			yData = Number(String(fData[optionsTradar.close]).replaceAll(',', ''));
			color = "#000000";
		}

		var fPoint = {
			x: Math.round((xGap * trendArrays[i].index) + xGap)  + startX, 
			y: Math.round(graphheight * ((yAxisMax - yData ) / yAxisGap)) + graphtop
		};

		var y = 0;
		var text = '';

		if(!fData.long_short) continue;

		if(fData.long_short == "1") { //하락
			y = fPoint.y - 20;
			text = 'S\n↓';
		} else {
			y = fPoint.y + 15;
			text = '↑\nL';
		}

		var item = paper.text(fPoint.x - xGapHalf, y, text).attr({
			'fill': color,
			'text-anchor': 'middle',
			'font-family': 'Dotum', 'font-size': '11'
		});
		tRadarGroups[obj.key].ls.push(item);
		
		
	}
};
var removetRadar = function(obj) {
	if(!tRadarGroups.hasOwnProperty(obj.key)) {
		return;
	}
	if(tRadarGroups[obj.key].trend != null) {
		tRadarGroups[obj.key].trend.remove();
	}
	if(tRadarGroups[obj.key].trend0123 != null) {
		tRadarGroups[obj.key].trend0123.remove();
	}
	if(tRadarGroups[obj.key].ls != null) {
		tRadarGroups[obj.key].ls.remove();
	}
};

function beforeDrawSeriesInGraph ( e, charts, seriesObject) {

	removetRadar(seriesObject);

	if(seriesObject.options.tRadar.type != "0"){
						
		if(seriesObject.options.tRadar.type !== '3' && seriesObject.options.tRadar.type !== '0') {
			drawtRadar(charts, seriesObject);
			if(seriesObject.options.tRadar.type === '2' && seriesObject.key === 'main') {
				drawtRadar0123(charts, seriesObject);
			}
		} else if(seriesObject.options.tRadar.type === '3' && seriesObject.key === 'main') {
			
			drawtRadarLS(charts, seriesObject);
		}
	}
}