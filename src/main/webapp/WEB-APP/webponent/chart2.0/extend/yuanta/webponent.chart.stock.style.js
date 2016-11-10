if(!CHARTIMAGECONTEXT) {
	CHARTIMAGECONTEXT = '../../'
}
var webPonent = {};
webPonent.opacity = 0.7;
webPonent.overOpacity = 1;

webPonent.STOCKSTYLE = {
		division: [0, [100], [70, 30], [50, 25, 25], [40, 20, 20, 20], [40, 15, 15, 15, 15]],
		core_main: {
			layout: {
				paddingTop: 10,
				color: '#f6f6f6', line: { width: 0 }
			},
			graph: {
				color: '#fff',
				opacity: 1,
				line: {
					top: {color: '#b8b8b8'},
					left: {color: '#b8b8b8', width: 1},
					right: {color: '#b8b8b8', width: 1},
					bottom: {color: '#b8b8b8'}
				}
			},
			xAxis: {
				gap: 13, height: 20,
				line: {
					color: '#e6e6e6'
				},
				text: {
					color: '#666', size: 11
				}
			},
			yAxis: {
				position: 'right',
				line: {
					color: '#e6e6e6'
				},
				text: {
					color: '#666', size: 11, align: 'left'
				}
			},
			maxLabel: {
				use: true, color: '#d11f1f', opacity: 1, family: 'dotum', size: 11, arrow: '' + CHARTIMAGECONTEXT + 'lib/stock/img/arrow_max.png'
			},
			minLabel: {
				use: true, color: '#0046a6', opacity: 1, family: 'dotum', size: 11, arrow: '' + CHARTIMAGECONTEXT + 'lib/stock/img/arrow_min.png'
			},
			crossLine: {
				color: '#000000'
			},
			tip: {
				className: 'WEBPONENT-STOCK-TIP',
				xAxisclassName: 'WEBPONENT-AXIS-TIP',
				yAxisclassName: 'WEBPONENT-AXIS-TIP'
			}
		},
		core_sub: {
			layout: {
				paddingTop: 0, paddingBottom: 0
			},
			graph: {
				color: '#fff',
				opacity: 1,
				line: {
					top: {color: '#b8b8b8'},
					left: {color: '#b8b8b8', width: 1},
					right: {color: '#b8b8b8', width: 1},
					bottom: {color: '#b8b8b8'}
				}
			},
			yAxis: {
				position: 'right',
				line: {
					color: '#e6e6e6'
				},
				text: {
					color: '#666', size: 11, align: 'left'
				}
			},
			xAxis: 	{
				height: 0, paddingTop: 0, gap: 13,
				line: {
					color: '#e6e6e6'
				},
				text: { size: 0 }
			}
		},
		legend: {
			paddingTop: 5, paddingLeft: 5, paddingRight: 5,
			rectSize: 11,
			text: {
				color: '#666666', family: 'dotumche', size: 11
			},
			button: {
				size: 14,
				area: {
					color: 'url(' + CHARTIMAGECONTEXT + 'lib/stock/img/bt_close.png)'
				},
				line: {
					color: '#ddd', width: 0
				}
			}
		},
		candle: {
			area: {
				up :{
					color: '#e4654d', opacity: webPonent.opacity,
					over: {
						color: '#e4654d', opacity: webPonent.overOpacity
					}
				},
				down: {
					color: '#9ad4ff', opacity: webPonent.opacity,
					over: {
						color: '#9ad4ff', opacity: webPonent.overOpacity
					}
				}
			},
			line: {
				up: {
					color: '#e0310f', opacity: webPonent.opacity, over: {color: '#e0310f', opacity: webPonent.overOpacity}
				},
				down: {
					color: '#77c4ff', opacity: webPonent.opacity, over: {color: '#77c4ff', opacity: webPonent.overOpacity}
				},
				flat: {
					color: '#b8b8b8', opacity: webPonent.opacity, over: {color: '#b8b8b8', opacity: webPonent.overOpacity}
				}
			},
			accessibility: {use : true}
		},
		hloc: {
			line: {
				up: {
					color: '#dc8077', over: {color: '#c42c1c', width: 2}
				},
				down: {
					color: '#9cc6e9', over: {color: '#5aa0da', width: 2}
				},
				flat: {
					color: '#b6b6b6', over: {color: '#333333', width: 2}
				}
			},
			accessibility: {use : true}
		},
		line: {
			line: { normal: { color: '#ff0000', width: 2, over: {width: 2} } },
			accessibility: {use : true}
		},
		three: {
			layout: {
				color: '#f9f9f9'
			},
			graph: {
				color: '#fff',
				line: {color: '#dddddd', width: 1, opacity: 1}
			},
			xAxis: {
				height: 0, paddingTop: 0,
				text: {
					size: 0
				}
			},
			series: {
				three: {
					area: {
						up: {},
						down: {}
					},
					line: {
						up: {},
						down: {}
					}
				}
			}
		},
		pnf: {
			layout: {
				color: '#f9f9f9'
			},
			graph: {
				color: '#fff',
				line: {color: '#dddddd', width: 1, opacity: 1}
			},
			xAxis: {
				height: 0, paddingTop: 0,
				text: {
					size: 0
				}
			},
			series: {
				pnf: {
					line: { up: {color: 'red', width: 1} , down: {color: 'blue', width: 1}}
				}
			}
		},
		over1:{
			series1: { line: { normal: {color: '#ff6f44', width: 1, opacity: webPonent.opacity, over: {color: '#ff6f44', width: 1, opacity: webPonent.overOpacity}} } },
			series2: { line: { normal: {color: '#2784d5', width: 1, opacity: webPonent.opacity, over: {color: '#2784d5', width: 1, opacity: webPonent.overOpacity}} } },
			series3: { line: { normal: {color: '#679762', width: 1, opacity: webPonent.opacity, over: {color: '#679762', width: 1, opacity: webPonent.overOpacity}} } },
			series4: { line: { normal: {color: '#fdc781', width: 1, opacity: webPonent.opacity, over: {color: '#fdc781', width: 1, opacity: webPonent.overOpacity}} } }
		},
		over2:{
			series1: { line: { normal: {color: '#15c6da', width: 1, over: {color: '#15c6da', width: 2}} } }, //전환
			series2: { line: { normal: {color: '#333333', width: 1, over: {color: '#333333', width: 2}} } }, //기준
			series6: {
				line: {
					up: {width: 0},
					down: {width: 0},
					base: {width: 0}
				},
				area: {
					up: {
						opacity: 0.4
					},
					down: {
						opacity: 0.4
					}
				}
			},
			series3: { line: { normal: {color: '#ec3e7a', width: 1, over: {color: '#ec3e7a', width: 2}} } }, //선행1
			series4: { line: { normal: {color: '#ff663a', width: 1, over: {color: '#ff663a', width: 2}} } }, //선행2
			series5: { line: { normal: {color: '#82899b', width: 1, over: {color: '#82899b', width: 2}} } }  //후행
		},
		over3:{
			series4: { area: { normal: {color: '#f1f1f1', opacity: 0.6, over: {color: '#f1f1f1', opacity: 0}}}, line: { normal: {width: 0} } },
			series1: { line: { normal: {color: '#f26d7d', width: 1, over: {color: '#f26d7d', width: 2}} } },
			series2: { line: { normal: {color: '#7ca900', width: 1, over: {color: '#7ca900', width: 2}} } },
			series3: { line: { normal: {color: '#30c0c8', width: 1, over: {color: '#30c0c8', width: 2}} } }
		},
		over4:{
			series1: {
				tick: {
					size: 2,
					area: { normal: { color: '#b22af2', over: { color: 'red'} } },
					line: { normal: { width: 0, over: {width: 0} } }
				}
			}
		},
		over5:{
			series4: { area: { normal: {color: '#ffe7f0', opacity: 0.5, over: {color: '#ffe7f0', opacity: 0}} }, line: { normal: {width: 0} } },
			series1: { line: { normal: {color: '#f25a29', width: 1, over: {color: '#f25a29', width: 2}} } },
			series2: { line: { normal: {color: '#e7a516', width: 1, over: {color: '#e7a516', width: 2}} } },
			series3: { line: { normal: {color: '#d74bb9', width: 1, over: {color: '#d74bb9', width: 2}} } }
		},
		over6:{
			series1: { line: { normal: {color: '#b3b3b3', width: 1, opacity: 0.7, over: {color: '#b3b3b3', opacity: 1, width: 2}} } },
			series2: { line: { normal: {color: '#b3b3b3', width: 1, opacity: 0.3, over: {color: '#b3b3b3', opacity: 1, width: 2}} } }
		},
		over7:{
			series1: {
				area: {
					normal: { color: '#7ca859', opacity: 0.2 }
				},
				line: {
					normal: { color: '#7ca859', width: 0.5}
				},
				text: {
					family: 'dotum', color: '#555555', size: 11
				}
			}
		},
		volume:{
			series1: {
				area: { normal: { color: '#73b86b', opacity: webPonent.opacity, over: { color: '#73b86b', opacity: webPonent.overOpacity } } },
				line: { normal: { color: '#679762', opacity: webPonent.opacity, width: 1, over: {color: '#679762', opacity: webPonent.overOpacity, width: 1} } }
			}
		},
		macd:{
			series1: {
				area: { up: { color: '#ffa800', over: { color: '#c86d45' } }, down: { color: '#7bb9d3', over: { color: '#429bc0' } } },
				line: { up: { width: 0, over: { width: 0 } }, down: { width: 0, over: { width: 0 } } }
			},
			series2: { line: { normal: { color: '#525252', width: 1, over: { color: '#525252', width: 2 } } } },
			series3: { line: { normal: { color: '#ff7575', width: 1, over: { color: '#ff7575', width: 2 } } } }
		},
		slowstc:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } },
			series2: { line: { normal: { color: '#ff7575', width: 1, opacity: webPonent.opacity, over: { color: '#ff7575', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		faststc:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } },
			series2: { line: { normal: { color: '#ff7575', width: 1, opacity: webPonent.opacity, over: { color: '#ff7575', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		rsi:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } },
			series2: { line: { normal: { color: '#ff7575', width: 1, opacity: webPonent.opacity, over: { color: '#ff7575', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		dmi:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } },
			series2: { line: { normal: { color: '#ff7575', width: 1, opacity: webPonent.opacity, over: { color: '#ff7575', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		adx:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } },
			series2: { line: { normal: { color: '#ff7575', width: 1, opacity: webPonent.opacity, over: { color: '#ff7575', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		obv:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		sonar:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } },
			series2: { line: { normal: { color: '#ff7575', width: 1, opacity: webPonent.opacity, over: { color: '#ff7575', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		cci:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		vr:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		trix:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } },
			series2: { line: { normal: { color: '#ff7575', width: 1, opacity: webPonent.opacity, over: { color: '#ff7575', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		pmao:{
			series1: {
				area: {
					up: 	{ color: '#ffa800', over: { color: '#c86d45' }},
					down: 	{ color: '#7bb9d3', over: { color: '#429bc0' }}
				},
				line: {
					up: 	{ width: 0, over: { width: 0 }},
					down: 	{ width: 0, over: { width: 0 }}
				}
			}
		},
		psychology:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		williams:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } },
			series2: { line: { normal: { color: '#ff7575', width: 1, opacity: webPonent.opacity, over: { color: '#ff7575', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		roc:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } }
		},
		chaikins:{
			series1: { line: { normal: { color: '#525252', width: 1, opacity: webPonent.opacity, over: { color: '#525252', opacity: webPonent.overOpacity, width: 1 } } } }
		}
};