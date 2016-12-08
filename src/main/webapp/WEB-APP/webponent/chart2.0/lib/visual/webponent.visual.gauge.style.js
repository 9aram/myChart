/*
 * 사이버이메지네이션
 * 최초 작성자 : joointhezoo@cyber-i.com
 * 마지막 수정자 : joointhezoo@cyber-i.com
 * 마지막 수정날짜 :  16.11.10
 */

(function() {

	var self = {};

	var defaultFont = 'Nanum Gothic';

	var BASIC = {
		/**
		 * 기본 레이아웃
		 * @position {Object} : Gauge chart 의 위치 이동 x,y
		 * @area {Object}     : 바탕색상, 테두리
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
		 *  OBJECT STYLES, VALUE
		 * @size {Object}	  : GAUGE CHART SIZE (WIDTH, HEIGHT)
		 */
		object : {
			width: 360,
			height: 240,
			radius : 128
		},

		/**
		 *  치수표시판의 위치 및 스타일 설정
		 * @x {Integer}     : COUNTER'S POSITION X
		 * @y {Integer}     : COUNTER'S POSITION Y
		 * @r {Integer}     : COUNTER'S RADIUS
		 * @color {Object}  : COUNTER BACKGROUND COLOR
		 * @border {Object} : COUNTER BORDER COLOR
		 * @text {Object}   : INSIDE COUNTER FONT STYLE {font-family, font-size, font-weight}
		 */
		counter : {
			x : 0 ,
			y : 0 ,
			width: 'auto',
			height: 'auto',
			radius : 2,
			color : '#fcfcfc',
			border : '#bdc2ca',
			text : {
				family : 'LCDMono',
				size : 1,
				weight : 800,
				color:'#484b4e'
			},
			angular : {
				border : 'none',
				color : 'none'
			},
			multi : {
				divider : true,
				dividerThick : 1,
				counterInterval: 3,
				counterBorder : '#acafb3',
				textSize : 1
			}
		},

		/**
		 *  AXIS STYLES
		 * @family {Object} : font-family
		 * @size {Object}   :  font-size
		 * @align {Object}  :  font-anchor ( leftside == end , rightside == start )
		 * @color {Object} : 	font-color
		 * @line {Object}   :   line-color
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
				color : "#797f85",
				angular : {
					color : '#848789',
					size : 12,
					weight:300
				}
			},
			blockLine : {
				color: "#a3aab1",
				length : 15
			},
			intervalLine : {
				color: "#c3c8cd",
				length: 7.5
			},
			angularBar : {
				start : 5,
				end_block : 22,
				end_interval : 12,
				color : '#8c949f'
			},
			dual : {
				angle :270,
				block: 22,
				interval : 1,
				text : 8,
				textSize : 10,
				maxAxis : 250,
				minAxis : 0
			}
		},


		cylinder : {
			border :'#c7cfd9',
			fill : {
				color : "100-#2bcdba-#6bdccf",
				opacity: 0.3,
				border : 'none'
			},
			current : {
				color : '#6bdccf'
			},
			prevDataLine : {
				color : '#c7cfd9'
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

		thermometer : {
			prevBackground: {
				color : "#fcfcfc",
				border : 'none'
			},
			prevBar : {
				size : 1,
				color : "#ff6360",
				opacity : 0.5
			},
			bottom : {
				color :  '#ff6360',
				border :  "#bcc7d4"
			},
			back : {
				color : "#fcfcfc",
				border : "#bcc7d4"
			},
			bar : {
				color : "100-#ff6360-#ff908e",
				border : 'none'
			}
		},
		angular : {
			angle : 270,
			center : {
				color:  '#8397a6',
				border :  '#8397a6'
			},
			base:{
				color: '#fcfcfc',
				border: '#6a6e72',
				borderThick: 10
			},
			normalArrow : {
				color : "#484b4e",
				border : 'none'
			},
			multiArrow : {
				color : "#484b4e",
				border : 'none'
			},
			dualArrow : {
				color : "#484b4e",
				border : 'none'
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
				},
				angular :{
					color:'#ff625f',
					length: -6
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
				},
				angular :{
					color:'#2bcdba',
					length: -6
				}
			},
			target : {
				color : '#8397a6'
			}
		}
	};

	var BLACK = {
		/**
		 * 기본 레이아웃
		 * @position {Object} : Gauge chart 의 위치 이동 x,y
		 * @area {Object}     : 바탕색상, 테두리
		 */
		layout : {
			position : {
				x : 0,
				y : 0
			},
			area : {
				color : '#324254',
				border :'#2b3744'
			}
		},

		/**
		 *  OBJECT STYLES, VALUE
		 * @size {Object}	  : GAUGE CHART SIZE (WIDTH, HEIGHT)
		 */
		object : {
			width: 360,
			height: 240,
			radius : 128
		},

		/**
		 *  COUNTER STYLES
		 * @color {Object}   : COUNTER BACKGROUND COLOR
		 * @border {Object} : COUNTER BORDER COLOR
		 * @text {Object}      : COUNTER NUMBER FONT STYLE {font-family, font-size, font-weight}
		 */
		counter : {
			x : 0 ,
			y : 0 ,
			width: 'auto',
			height: 'auto',
			radius : 2,
			color : '#5af176',
			border : '#48d462',
			text : {
				family : defaultFont,
				size : 1,
				weight : 800,
				color:'black'
			},
			angular : {
				border : 'none',
				color : '#5af176'
			},
			multi : {
				divider : true,
				dividerThick : 1,
				counterInterval: 3,
				counterBorder : '#acafb3',
				textSize : 1
			}
		},




		/**
		 *  AXIS STYLES
		 * @family {Object} : font-family
		 * @size {Object}   :  font-size
		 * @align {Object}  :  font-anchor ( leftside == end , rightside == start )
		 * @color {Object} : 	font-color
		 * @line {Object}   :   line-color
		 * @text {Object}   :   drawing axis number mark
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
				color : "#b2b8c0",
				angular : {
					color : '#fff',
					size : 13,
					weight:300
				}
			},
			blockLine : {
				color: "#556678",
				length : 15
			},
			intervalLine : {
				color: "#556678",
				length: 7.5
			},
			angularBar : {
				start : 2,
				end_block : 20,
				end_interval : 10,
				color : '#707d8c'
			},
			dual : {
				angle :270,
				block: 22,
				interval : 3,
				text : 5,
				textSize : 10,
				maxAxis : 250,
				minAxis : 0
			}
		},

		cylinder : {
			border : '#556678',
			fill : {
				color : '#09d695',
				opacity: 0.5,
				border : 'none'
			},
			current : {
				color : '#6bdccf'
			},
			prevDataLine : {
				color : '#c7cfd9'
			}
		},

		linear : {
			change : {
				color : "#c23b59",
				border : 'none',
				opacity : 0.8
			},
			base : {
				color : "#272e36",
				border : '#556678'
			},
			led:{
				dropColor : "#e02750" ,
				color : "#e02750",
				border : "none"
			},
			pointer : {
				color : "#fd4232",
				border :  "#fd4232",
				lineSize  :2,
				mark : {
					color: "#fd4232",
					border: "none"
				}

			}

		},

		thermometer : {
			prevBackground : {
				color : "#272e36",
				border : 'none'
			},
			prevBar : {
				size : 1,
				color : "#df95a6",
				opacity : 0.5
			},
			bottom : {
				color : "#c23b59",
				border :  "#556678"
			},
			back : {
				color : "#272e36",
				border : "#556678"
			},
			bar : {
				color : "#c23b59",
				border : 'none'
			}
		},
		angular : {
			angle : 270,
			center : {
				color:  '#5a6a7c',
				border :  '#5a6a7c'
			},
			base:{
				color: '#272e36',
				border: '#56677a',
				borderThick: 1.5
			},
			normalArrow : {
				color : "red",
				border : 'none'
			},
			multiArrow : {
				color : "#d97a09",
				border : 'none'
			},
			dualArrow : {
				color : "red",
				border : 'none'
			}
		},
		pointer : {
			max : {
				bar : {
					color : '#d83a5d',
					length :10
				},
				font : {
					size : 13,
					color :  '#bd2b5d',
					align: 'start',
					position : -18,
					family: defaultFont
				},
				angular :{
					color:'#bd2b5d',
					length: 0
				}
			},
			avg : {
				bar : {
					color : '#58bf3a',
					length :10
				},
				font : {
					size : 13,
					color :  '#52ac3e',
					align: 'start',
					position : -18,
					family: defaultFont
				},
				angular :{
					color:'#52ac3e',
					length: 0
				}
			},
			target : {
				color : '#0bb8f8'
			}
		}
	};

	var LIGHTGREY = {
		/**
		 * 기본 레이아웃
		 * @position {Object} : Gauge chart 의 위치 이동 x,y
		 * @area {Object}     : 바탕색상, 테두리
		 */
		layout : {
			position : {
				x : 0,
				y : 0
			},
			area : {
				color : '#dcdfe3',
				border :'#c1c6cc'
			}
		},

		/**
		 *  OBJECT STYLES, VALUE
		 * @size {Object}	  : GAUGE CHART SIZE (WIDTH, HEIGHT)
		 * @measure {Object} : GAUGE GRADUATION OPTIONS VALUE ( 치수, 간격 )
		 */
		object : {
			width: 360,
			height: 240,
			radius : 128
		},

		/**
		 *  COUNTER STYLES
		 * @use {Object}     : DRAWING COUNTER OR NOT
		 * @color {Object}   : COUNTER BACKGROUND COLOR
		 * @border {Object} : COUNTER BORDER COLOR
		 * @text {Object}      : COUNTER NUMBER FONT STYLE {font-family, font-size, font-weight}
		 */
		counter : {
			x : 0 ,
			y : 0 ,
			width: 'auto',
			height: 'auto',
			radius : 2,
			color :  '#eef1f6',
			border : '#bdc2ca',
			text : {
				family : 'LCDMono',
				size : 1,
				weight : 800,
				color:'#484b4e'
			},
			angular : {
				border : 'none',
				color : 'none'
			},
			multi : {
				divider : true,
				dividerThick : 1,
				counterInterval: 3,
				counterBorder : '#acafb3',
				textSize : 1
			}
		},

		/**
		 *  AXIS STYLES
		 * @family {Object} : font-family
		 * @size {Object}   :  font-size
		 * @align {Object}  :  font-anchor ( leftside == end , rightside == start )
		 * @color {Object} : 	font-color
		 * @line {Object}   :   line-color
		 * @text {Object}   :   drawing axis number mark
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
				color : "#797f85",
				angular : {
					color : '#848789',
					size : 12,
					weight:300
				}
			},
			blockLine : {
				color: "#a3aab1",
				length : 15
			},
			intervalLine : {
				color: "#c3c8cd",
				length: 7.5
			},
			angularBar : {
				start : 5,
				end_block : 22,
				end_interval : 12,
				color : '#8c949f'
			},
			dual : {
				angle :270,
				block: 22,
				interval : 3,
				text : 5,
				textSize : 10,
				maxAxis : 250,
				minAxis : 0
			}
		},


		cylinder : {
			border :'#c7cfd9',
			fill : {
				color : '#787b7e',
				opacity: 0.7,
				border : 'none'
			},
			current : {
				color : '#888b8f'
			},
			prevDataLine : {
				color : '#c7cfd9'
			}
		},




		linear : {
			change : {
				color : "#585858",
				border : 'none',
				opacity : 0.8
			},
			base : {
				color : "#eff2f6",
				border : '#bcc7d4'
			},
			led:{
				dropColor : "#484b4e" ,
				color : "#484b4e",
				border : "none"
			},
			pointer : {
				color : "none",
				border :  "#cf122d",
				lineSize  :2,
				mark : {
					color: "none",
					border: "none"
				}

			}

		},

		thermometer : {
			prevBackground : {
				color : "#eff2f6",
				border : 'none'
			},
			prevBar : {
				size : 1,
				color : "#616468",
				opacity : 0.5
			},
			bottom : {
				color : "#616468",
				border :  "#bcc7d4"
			},
			back : {
				color : "#eff2f6",
				border : "#bcc7d4"
			},
			bar : {
				color : "#616468",
				border : 'none'
			}
		},
		angular : {
			angle : 270,
			center : {
				color:  '#fff',
				border :  '#fff'
			},
			base:{
				color: '#eff2f6',
				border: '#6a6e72',
				borderThick: 10
			},
			normalArrow : {
				color : "#484b4e",
				border : 'none'
			},
			multiArrow : {
				color : "#484b4e",
				border : 'none'
			},
			dualArrow : {
				color : "#484b4e",
				border : 'none'
			}
		},
		pointer : {
			max : {
				bar : {
					color : '#f195ab',
					length :10
				},
				font : {
					size : 13,
					color :  '#75797d',
					align: 'start',
					position : -18,
					family: defaultFont
				},
				angular :{
					color:'#f195ab',
					length: -11
				}
			},
			avg : {
				bar : {
					color : '#5bc770',
					length :10
				},
				font : {
					size : 13,
					color :  '#75797d',
					align: 'start',
					position : -18,
					family: defaultFont
				},
				angular :{
					color: '#5bc770',
					length: -11
				}
			},
			target : {
				color : '#484b4e'
			}
		}
	};

	self.BASIC = BASIC;
	self.BLACK = BLACK;
	self.LIGHTGREY = LIGHTGREY;

	window.webponent.visual.styles = self;

})();

