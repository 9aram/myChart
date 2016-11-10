(function() {

	var self = {};

	var defaultFont = 'Nanum Gothic';
	// 레이아웃 스타일
	var layoutStyles = {
		main: {
			basic: {
				paddingTop: 20, paddingBottom: 0, paddingLeft: 0, paddingRight:20, color: '#f8f8f8', 
				line: {color: '#eaeaea', width: 1}
			},
			black: {
				paddingTop: 20, paddingBottom: 0, paddingLeft: 0, paddingRight:20, color: '#374553',
				line: {color: '#eaeaea', width: 1}
			},
			accessibility : {
				paddingTop: 20, paddingBottom: 0, paddingLeft: 0, paddingRight:20, color: '#fff',
				line: {color: '#eaeaea', width: 1}
			}
		}, 
		sub: {
			basic: {
				paddingTop: 0, color: '#f8f8f8', paddingLeft: 0, paddingRight:20,
				line: {color: '#eaeaea', width: 1}
			},
			black: {
				paddingTop: 0, color: '#f8f8f8', paddingLeft: 0, paddingRight:20,
				line: {color: '#eaeaea', width: 1}
			},
			accessibility : {
				paddingTop: 0, color: '#f8f8f8', paddingLeft: 0, paddingRight:20,
				line: {color: '#eaeaea', width: 1}
			}
		},
		sub2: {
			
		}
	};
	// 그래프영역 스타일
	var graphStyles = {
		main: {
			basic: {
				color: '#f8f8f8',
				line: { top: {color: '#cccccc'}, left: {width: 0}, right: {width: 0}, bottom: {color: '#cccccc'} }
			},
			black: {
				color: '#374553',
				line: { top: {color: '#506376'}, left: {width: 0}, right: {width: 0}, bottom: {color: '#506376'} }
			},
			accessibility : {
				color: '#374553',
				line: { top: {color: '#d2d2d2'}, left: {width: 0}, right: {width: 0}, bottom: {color: '#d2d2d2'} }
			}
		},
		sub: {
			basic: {
				color: '#f8f8f8',
				line: { top: {color: '#cccccc'}, left: {width: 0}, right: {width: 0}, bottom: {color: '#cccccc'} }
			},
			black: {
				color: '#374553',
				line: { top: {color: '#506376'}, left: {width: 0}, right: {width: 0}, bottom: {color: '#506376'} }
			},
			accessibility : {
				color: '#374553',
				line: { top: {color: '#d2d2d2'}, left: {width: 0}, right: {width: 0}, bottom: {color: '#d2d2d2'} }
			}
		}
	};
	// 십자선 스타일
	var crossLine = {color: '#465866'};
	// X축 스타일
	var xaxisStyles = {
		main: {
			basic: {
				paddingTop: 13, height: 30,
				text: {family: defaultFont, size: 10, color: '#666'},
				line: {color: '#e3e3e3', width: 1}
			},
			black: {
				paddingTop: 13, height: 30,
				text: {family: defaultFont, size: 10, color: '#b0becc'},
				line: {color: '#506376', width: 1}
			},
			accessibility: {
				paddingTop: 13, height: 30,
				text: {family: defaultFont, size: 10, color: '#506376'},
				line: {color: '#e3e3e3', width: 1}
			}
		},
		sub: {
			basic: {
				paddingTop: 0, height: 0,
				text: {family: defaultFont, size: 0, color: '#666'},
				line: {color: '#e3e3e3', width: 1}
			},
			black: {
				paddingTop: 0, height: 0,
				text: {family: defaultFont, size: 0, color: '#b0becc'},
				line: {color: '#506376', width: 1}
			},
			accessibility: {
				paddingTop: 0, height: 0,
				text: {family: defaultFont, size: 0, color: '#506376'},
				line: {color: '#e3e3e3', width: 1}
			}
		}
	};
	// Y축 스타일
	var yaxisStyles = {
		basic: {
			paddingLeft:0, width:50,
			line: {color: '#e3e3e3', width: 1, opacity: 1},
			text: {family: defaultFont, size: 10, color: '#666', align: 'right'}
		},
		black: {
			paddingLeft:0, width:50,
			line: {color: '#506376', width: 1, opacity: 1},
			text: {family: defaultFont, size: 10, color: '#b0becc', align: 'right'}
		},
		accessibility: {
			paddingLeft:0, width:50,
			line: {color: '#e3e3e3', width: 1, opacity: 1},
			text: {family: defaultFont, size: 10, color: '#506376', align: 'right'}
		}
	};

	var BASIC = {
		main: {
			layout: layoutStyles.main.basic,
			graph:  graphStyles.main.basic,
			crossLine: crossLine,
			xAxis: xaxisStyles.main.basic,
			yAxis: yaxisStyles.basic,
			tip: { className: 'tip' },


            series: {

            	base: {
            		area: {
						normal: {
							opacity: 0.4,
							over: { opacity: 0.4}
						}
					},
					line: {
						normal: {
							width: 3,
							over: { width: 3}
						}
					},
					text: {
						use: false, color: '#666666', family: defaultFont, size: 11,
						format: 'priceDataFormat'
					},
					tick: {
						style: null, size: 5, overSize: 1.5
					}
                },

                s0: {
					area: {
						items: [
						{
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: [[0, '#018b8d'], [100, '#33a2a4']] }
						},
						{
							color: [ [0, '#ff625f'], [100, '#ff918f'] ],
							over: { color: [[0, '#ca2b28'], [100, '#d55552']] }
						},
						{
							color: [ [0, '#feb402'], [100, '#fecb4e'] ],
							over: { color: [[0, '#f28301'], [100, '#f59c33']] }
						},
						{
							color: [ [0, '#0193d8'], [100, '#4db4e4'] ],
							over: { color: [[0, '#0260a9'], [100, '#337fb9']] }
						},
						{
							color: [ [0, '#8671e1'], [100, '#ab9bea'] ],
							over: { color: [[0, '#5744a3'], [100, '#7869b5']] }
						},
                      	{
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: [[0, '#018b8d'], [100, '#33a2a4']] }
						},
						{
							color: [ [0, '#ff625f'], [100, '#ff918f'] ],
							over: { color: [[0, '#ca2b28'], [100, '#d55552']] }
						},
						{
							color: [ [0, '#feb402'], [100, '#fecb4e'] ],
							over: { color: [[0, '#f28301'], [100, '#f59c33']] }
						},
						{
							color: [ [0, '#0193d8'], [100, '#4db4e4'] ],
							over: { color: [[0, '#0260a9'], [100, '#337fb9']] }
						},
						{
							color: [ [0, '#8671e1'], [100, '#ab9bea'] ],
							over: { color: [[0, '#5744a3'], [100, '#7869b5']] }
						}
					]
						
					},
					line: {
						normal: {
							width:0,
							over: { width:0}
						}
					}
				},



                s1: {
					area: {
						normal: {
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: {src: '../../chart/img/over.png', color: '#4e6679'} }
						}

					},
					line: {
						normal: {
							color: '#2bcdba', 
							over: { color: '#2bcdba'}
						}
					}, 
					tick : {
						style: 'dot',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								color: '#2bcdba', 
								over: { color: '#2bcdba'}
							}
						}
					}
				},
				
				s2: {
					area: {
						normal: {
							color: [ [0, '#ff625f'], [100, '#ff918f'] ],
							over: { color: {src: '../../chart/img/over.png', color: '#4e6679'} }
						}
					},
					line: {
						normal: {
							color: '#8670e1',
							over: {color: '#8670e1'}
						}
					}, 
					tick : {
						style: 'square',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								color: '#8670e1', 
								over: { color: '#8670e1'}
							}
						}
					}
				},

				s3: {
					area: {
						normal: {
							color: [ [0, '#feb401'], [100, '#fecb4e'] ],
							over: { color: {src: '../../chart/img/over.png', color: '#4e6679'} }
						}
					},
					line: {
						normal: {
							color: '#feb401',
							over: {color: '#feb401'}
						}
					}
				},
				s4: {
					area: {
						normal: {
							color: [ [0, '#0093d8'], [100, '#4db4e4'] ],
							over: { color: {src: '../../chart/img/over.png', color: '#4e6679'} }
						}
					},
					line: {
						normal: {
							color: '#0093d8',
							over: {color: '#0093d8'}
						}
					}
				},
				s5: {
					area: {
						normal: {
							color: [ [0, '#745cd4'], [100, '#9e8de1'] ],
							over: { color: {src: '../../chart/img/over.png', color: '#4e6679'} }
						}
					},
					line: {
						normal: {
							color: '#9e8de1',
							over: {color: '#9e8de1'}
						}
					}
				},

				line: {
                	
                    line: {
						normal: {
                            width: 3, opacity: 0.5,
							over: { width: 3, opacity: 1}
						}
					}
                },

                bar: {
                	area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: [ [0, '#4db4e4'], [100, '#0093d8'] ],
							over: { color: [ [0, '#337fb9'], [100, '#0260a9'] ] }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: false
					}
                },


                column: {
                	area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: [ [0, '#4db4e4'], [100, '#0093d8'] ],
							over: { color: [ [0, '#337fb9'], [100, '#0260a9'] ] }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: false
					}
                },

                candle: {
                	
                    area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: [ [0, '#4db4e4'], [100, '#0093d8'] ],
							over: { color: [ [0, '#337fb9'], [100, '#0260a9'] ] }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: false,
						style: null
					}
                },


                area: {

                    area: {
						normal: {
							color: '#2bcdba', opacity: 0.4,
							over: {
								color: '#2bcdba', opacity: 0.4
							}
						},

						up: {
							color: '#e01f1b', opacity: 0.3,
							over: {
								color: '#e01f1b', opacity: 0.3
							}
						},
						down: {
							color: '#5fbaf3', opacity: 0.4,
							over: {
								color: '#5fbaf3', opacity: 0.4
							}
						}


					},
					line: {
						up: {
							color: '#e01f1b', width: 3,
							over: {
								color: '#ca2a27', width: 3
							}
						},
						down: {
							color: '#0093d8', width: 3,
							over: {
								color: '#005fa8', width: 3
							}
						},
						base: {
							color: '#465866', width: 2
						},

						normal: {
							width: 3,
							over: { width: 3 }
						}
					}
                },

				hloc: {

					line: {
						up: {
							color: '#e01f1b', width: 3,
							over: {
								color: '#ca2a27', width: 3
							}
						},
						down: {
							color: '#0093d8', width: 3,
							over: {
								color: '#005fa8', width: 3
							}
						},
						base: {
							color: '#465866', width: 2
						}
					},
					accessibility: {
                        use: false,
                        style: null
                    }
                }

            }
        },
        sub: {
			layout: layoutStyles.sub.basic,
			graph: graphStyles.sub.basic,
			xAxis: xaxisStyles.sub.basic,
			yAxis: yaxisStyles.basic,
			series: {
				s1: {
					area: {
						normal: {
							color: [ [0, '#feb401'], [100, '#fecb4e'] ],
							over: { color: [ [0, '#f28402'], [100, '#f59c33'] ] }
						}
					},
					line: {
						normal: {
							width: 3,
							over: { width: 3 }
						}
					},
					gradient: {
						direction: 'vertical'
					}, 
					tick : {
						style: 'star',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								
							}
						}
					}
				}
			}
		},
		sub2: {
			layout: layoutStyles.sub.basic,
			graph: graphStyles.sub.basic,
			xAxis: xaxisStyles.sub.basic,
			yAxis: yaxisStyles.basic,

			series: {
				s1: {
					line: {
						normal: {
							color: '#0093d8', width: 3,
							over: { color: '#0093d8', width: 3 }
						}
					},
					tick: {
						style: 'triangle',
						size: 5,
						overSize: 1.5,
						area: {
							normal: { color: '#fff', over: { color: '#fff' } }
						},
						line: {
							normal: { color: '#0093d8', width: 3, over: { color: '#465866', width: 3 }}
						}
					}
				}
			}
		}
    };

    var WHITE = {
		main: {
			layout: {
				paddingTop: 20, paddingBottom: 0, paddingLeft: 0, paddingRight:20,color: '#FFF',
				line: {color: '#eaeaea', width: 1}
			},
			graph: {
				color: '#374553',
				line: {
					top: {color: '#d2d2d2'},
					left: {width: 0},
					right: {width: 0},
					bottom: {color: '#d2d2d2'}

				}
			},
			crossLine: {
				color: '#465866'
			},
			xAxis: {
				paddingTop: 13, height: 30,
				text: {family: defaultFont, size: 10, color: '#506376'},
				line: {color: '#e3e3e3', width: 1}
			},
			yAxis: {
				paddingLeft:0, width:50,
				line: {color: '#e3e3e3', width: 1, opacity: 1},
				text: {family: defaultFont, size: 10, color: '#506376', align: 'right'}
			},
			tip: {
				className: 'tip'
			},


            series: {

            	base: {
            		area: {
						normal: {
							opacity: 0.4,
							over: { opacity: 0.4}
						}
					},
					line: {
						normal: {
							width: 3,
							over: { width: 3}
						}
					},
					text: {
						use: false, color: '#666666', family: defaultFont, size: 12,
						format: 'priceDataFormat'
					},
					tick: {
						style: null, size: 5, overSize: 1.5
					}
                },

                s0: {
					area: {
						items: [
						{
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: [[0, '#018b8d'], [100, '#33a2a4']] }
						},
						{
							color: [ [0, '#ff625f'], [100, '#ff918f'] ],
							over: { color: [[0, '#ca2b28'], [100, '#d55552']] }
						},
						{
							color: [ [0, '#feb402'], [100, '#fecb4e'] ],
							over: { color: [[0, '#f28301'], [100, '#f59c33']] }
						},
						{
							color: [ [0, '#0193d8'], [100, '#4db4e4'] ],
							over: { color: [[0, '#0260a9'], [100, '#337fb9']] }
						},
						{
							color: [ [0, '#8671e1'], [100, '#ab9bea'] ],
							over: { color: [[0, '#5744a3'], [100, '#7869b5']] }
						},
						{
							color: [ [0, '#BD4932'], [100, '#C26451'] ],
							over: { color: [[0, '#0260a9'], [100, '#337fb9']] }
						}
					]
						
					},
					line: {
						normal: {
							width:0,
							over: { width:0}
						}
					}
				},



                s1: {
					area: {
						normal: {
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: '#2bcdba'}
						}

					},
					line: {
						normal: {
							color: '#2bcdba', 
							over: { color: '#2bcdba'}
						}
					}
				},
				
				s2: {
					area: {
						normal: {
							color: '#8670e1',
							over: { color: '#8670e1' }
						}
					},
					line: {
						normal: {
							color: '#8670e1',
							over: {color: '#8670e1'}
						}
					}
				},

				s3: {
					area: {
						normal: {
							color: '#feb401',
							over: { color: '#feb401' }
						}
					},
					line: {
						normal: {
							color: '#feb401',
							over: {color: '#feb401'}
						}
					}
				},
				s4: {
					area: {
						normal: {
							color: '#0093d8',
							over: { color: '#0093d8' }
						}
					},
					line: {
						normal: {
							color: '#0093d8',
							over: {color: '#0093d8'}
						}
					}
				},

				line: {
                	
                    line: {
						normal: {
                            width: 3, opacity: 0.5,
							over: { width: 3, opacity: 1}
						}
					}
                },

                bar: {
                	
                    line: {
						normal: {
                            width: 0, opacity: 0.5,
							over: { width: 0, opacity: 1}
						}
					}
                },


                column: {
                	area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: [ [0, '#4db4e4'], [100, '#0093d8'] ],
							over: { color: [ [0, '#337fb9'], [100, '#0260a9'] ] }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: false
					}
                },


                area: {

                    area: {
						normal: {
							opacity: 0.4,
							over: { opacity: 0.4 }
						}

					},
					line: {
						up: {
							color: '#e01f1b', width: 3,
							over: {
								color: '#ca2a27', width: 3
							}
						},
						down: {
							color: '#0093d8', width: 3,
							over: {
								color: '#005fa8', width: 3
							}
						},
						base: {
							color: '#465866', width: 2
						},

						normal: {
							width: 3,
							over: { width: 3 }
						}
					}
                }

            }
        }
    };

	var BLACK = {
		main: {
			layout: layoutStyles.main.black,
			graph:  graphStyles.main.black,
			crossLine: crossLine,
			xAxis: xaxisStyles.main.black,
			yAxis: yaxisStyles.black,
			tip: { className: 'tip' },


            series: {

            	base: {
            		area: {
						normal: {
							opacity: 0.4,
							over: { opacity: 0.4}
						}
					},
					line: {
						normal: {
							width: 3,
							over: { width: 3}
						}
					},
					text: {
						use: false, color: '#cccccd', family: defaultFont, size: 11,
						format: 'priceDataFormat'
					},
					tick: {
						style: null, size: 5, overSize: 1.5
					}
                },

                s0: {
					area: {
						items: [
						{
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: [[0, '#018b8d'], [100, '#33a2a4']] }
						},
						{
							color: [ [0, '#ff625f'], [100, '#ff918f'] ],
							over: { color: [[0, '#ca2b28'], [100, '#d55552']] }
						},
						{
							color: [ [0, '#feb402'], [100, '#fecb4e'] ],
							over: { color: [[0, '#f28301'], [100, '#f59c33']] }
						},
						{
							color: [ [0, '#0193d8'], [100, '#4db4e4'] ],
							over: { color: [[0, '#0260a9'], [100, '#337fb9']] }
						},
						{
							color: [ [0, '#8671e1'], [100, '#ab9bea'] ],
							over: { color: [[0, '#5744a3'], [100, '#7869b5']] }
						},
                      	{
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: [[0, '#018b8d'], [100, '#33a2a4']] }
						},
						{
							color: [ [0, '#ff625f'], [100, '#ff918f'] ],
							over: { color: [[0, '#ca2b28'], [100, '#d55552']] }
						},
						{
							color: [ [0, '#feb402'], [100, '#fecb4e'] ],
							over: { color: [[0, '#f28301'], [100, '#f59c33']] }
						},
						{
							color: [ [0, '#0193d8'], [100, '#4db4e4'] ],
							over: { color: [[0, '#0260a9'], [100, '#337fb9']] }
						},
						{
							color: [ [0, '#8671e1'], [100, '#ab9bea'] ],
							over: { color: [[0, '#5744a3'], [100, '#7869b5']] }
						}
					]
						
					},
					line: {
						normal: {
							width:0,
							over: { width:0}
						}
					}
				},



                s1: {
					area: {
						normal: {
							color: '#d49345',
							over: { color: '#2bcdba'}
						}

					},
					line: {
						normal: {
							color: '#b88e53', 
							over: { color: '#b88e53'}
						}
					}, 
					tick : {
						style: 'dot',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								color: '#2bcdba', 
								over: { color: '#2bcdba'}
							}
						}
					}
				},
				
				s2: {
					area: {
						normal: {
							color: '#8670e1',
							over: { color: '#8670e1' }
						}
					},
					line: {
						normal: {
							color: '#8670e1',
							over: {color: '#8670e1'}
						}
					}, 
					tick : {
						style: 'square',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								color: '#8670e1', 
								over: { color: '#8670e1'}
							}
						}
					}
				},

				s3: {
					area: {
						normal: {
							color: '#feb401',
							over: { color: '#feb401' }
						}
					},
					line: {
						normal: {
							color: '#feb401',
							over: {color: '#feb401'}
						}
					}
				},
				s4: {
					area: {
						normal: {
							color: '#0093d8',
							over: { color: '#0093d8' }
						}
					},
					line: {
						normal: {
							color: '#0093d8',
							over: {color: '#0093d8'}
						}
					}
				},

				line: {
                	
                    line: {
						normal: {
                            width: 3, opacity: 0.5,
							over: { width: 3, opacity: 1}
						}
					}
                },

                bar: {
                	
                    line: {
						normal: {
                            width: 0, opacity: 0.5,
							over: { width: 0, opacity: 1}
						}
					}
                },

                bar: {
                	area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: [ [0, '#4db4e4'], [100, '#0093d8'] ],
							over: { color: [ [0, '#337fb9'], [100, '#0260a9'] ] }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: false
					}

                },


                column: {
                	area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: [ [0, '#4db4e4'], [100, '#0093d8'] ],
							over: { color: [ [0, '#337fb9'], [100, '#0260a9'] ] }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: false
					}

                },

                candle: {
                	
                    area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: [ [0, '#4db4e4'], [100, '#0093d8'] ],
							over: { color: [ [0, '#337fb9'], [100, '#0260a9'] ] }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: false,
						style: null
					}
                },


                area: {

                    area: {
						normal: {
							opacity: 0.4,
							over: { opacity: 0.4 }
						}

					},
					line: {
						up: {
							color: '#e01f1b', width: 3,
							over: {
								color: '#ca2a27', width: 3
							}
						},
						down: {
							color: '#0093d8', width: 3,
							over: {
								color: '#005fa8', width: 3
							}
						},
						base: {
							color: '#465866', width: 2
						},

						normal: {
							width: 3,
							over: { width: 3 }
						}
					}
                },

				hloc: {

					line: {
						up: {
							color: '#e01f1b', width: 3,
							over: {
								color: '#ca2a27', width: 3
							}
						},
						down: {
							color: '#0093d8', width: 3,
							over: {
								color: '#005fa8', width: 3
							}
						},
						base: {
							color: '#465866', width: 2
						}
					},
					accessibility: {
                        use: false,
                        style: null
                    }
                }

            }
        },
        sub: {
			layout: layoutStyles.sub.black,
			graph: graphStyles.sub.black,
			xAxis: xaxisStyles.sub.black,
			yAxis: yaxisStyles.black,
			tip: {
				className: 'tip'
			},
			series: {
				s1: {
					area: {
						normal: {
							color: [ [0, '#feb401'], [100, '#fecb4e'] ],
							over: { color: [ [0, '#f28402'], [100, '#f59c33'] ] }
						}
					},
					line: {
						normal: {
							width: 3,
							over: { width: 3 }
						}
					},
					gradient: {
						direction: 'vertical'
					}, 
					tick : {
						style: 'star',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								
							}
						}
					}
				}
			}
		},
		sub2: {
			layout: layoutStyles.sub.black,
			graph: graphStyles.sub.black,
			xAxis: xaxisStyles.sub.black,
			yAxis: yaxisStyles.black,
			series: {
				s1: {
					line: {
						normal: {
							color: '#0093d8', width: 3,
							over: { color: '#0093d8', width: 3 }
						}
					},
					tick: {
						style: 'triangle',
						size: 5,
						overSize: 1.5,
						area: {
							normal: { color: '#fff', over: { color: '#fff' } }
						},
						line: {
							normal: { color: '#0093d8', width: 3, over: { color: '#465866', width: 3 }}
						}
					}
				}
			}
		}
    };

    var ACCESSIBILITY = {
		main: {
			layout: 	layoutStyles.main.accessibility,
			graph:  	graphStyles.main.accessibility,
			crossLine: 	crossLine,
			xAxis: 		xaxisStyles.main.accessibility,
			yAxis: 		yaxisStyles.accessibility,
			tip: 		{ className: 'tip' },


            series: {

            	base: {
            		area: {
						normal: {
							opacity: 1,
							over: { opacity: 1}
						}
					},
					line: {
						normal: {
							width: 3,
							over: { width: 3}
						}
					},
					text: {
						use: false, color: '#666666', family: defaultFont, size: 12,
						format: 'priceDataFormat'
					},
					tick: {
						style: null, size: 5, overSize: 1.5
					}
                },

                s0: {
					area: {
						items: [
						{
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: [[0, '#018b8d'], [100, '#33a2a4']] }
						},
						{
							color: [ [0, '#ff625f'], [100, '#ff918f'] ],
							over: { color: [[0, '#ca2b28'], [100, '#d55552']] }
						},
						{
							color: [ [0, '#feb402'], [100, '#fecb4e'] ],
							over: { color: [[0, '#f28301'], [100, '#f59c33']] }
						},
						{
							color: [ [0, '#0193d8'], [100, '#4db4e4'] ],
							over: { color: [[0, '#0260a9'], [100, '#337fb9']] }
						},
						{
							color: [ [0, '#8671e1'], [100, '#ab9bea'] ],
							over: { color: [[0, '#5744a3'], [100, '#7869b5']] }
						},
                      	{
							color: [ [0, '#2bcdba'], [100, '#6bdccf'] ],
							over: { color: [[0, '#018b8d'], [100, '#33a2a4']] }
						},
						{
							color: [ [0, '#ff625f'], [100, '#ff918f'] ],
							over: { color: [[0, '#ca2b28'], [100, '#d55552']] }
						},
						{
							color: [ [0, '#feb402'], [100, '#fecb4e'] ],
							over: { color: [[0, '#f28301'], [100, '#f59c33']] }
						},
						{
							color: [ [0, '#0193d8'], [100, '#4db4e4'] ],
							over: { color: [[0, '#0260a9'], [100, '#337fb9']] }
						},
						{
							color: [ [0, '#8671e1'], [100, '#ab9bea'] ],
							over: { color: [[0, '#5744a3'], [100, '#7869b5']] }
						}
					]
						
					},
					line: {
						normal: {
							width:0,
							over: { width:0}
						}
					}
				},



                s1: {
					area: {
						normal: {
							color: {src: '../../chart/img/pattern01.png', color: '#2bcdba'},
							over: { color: '#008b8d'}
						}

					},
					line: {
						normal: {
							color: '#2bcdba', 
							over: { color: '#2bcdba'}
						}
					}, 
					tick : {
						style: 'dot',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								color: '#2bcdba', 
								over: { color: '#2bcdba'}
							}
						}
					}
				},
				
				s2: {
					area: {
						normal: {
							color: {src: '../../chart/img/pattern02.png', color: '#ff625f'},
							over: { color: '#ca2a27' }
						}
					},
					line: {
						normal: {
							color: '#8670e1',
							over: {color: '#8670e1'}
						}
					}, 
					tick : {
						style: 'square',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								color: '#8670e1', 
								over: { color: '#8670e1'}
							}
						}
					}
				},

				s3: {
					area: {
						normal: {
							color: {src: '../../chart/img/pattern03.png', color: '#feb401'},
							over: { color: '#f28300' }
						}
					},
					line: {
						normal: {
							color: '#feb401',
							over: {color: '#feb401'}
						}
					}
				},
				s4: {
					area: {
						normal: {
							color: {src: '../../chart/img/pattern04.png', color: '#0093d8'},
							over: { color: '#005fa8' }
						}
					},
					line: {
						normal: {
							color: '#0093d8',
							over: {color: '#0093d8'}
						}
					}
				},
				s5: {
					area: {
						normal: {
							color: {src: '../../chart/img/pattern05.png', color: '#5643a2'},
							over: { color: '#5643a2' }
						}
					},
					line: {
						normal: {
							color: '#0093d8',
							over: {color: '#5643a2'}
						}
					}
				},

				line: {
                	
                    line: {
						normal: {
                            width: 3, opacity: 0.5,
							over: { width: 3, opacity: 1}
						}
					}
                },

                bar: {
                	
                    area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: { src: '../../chart/img/down.png', color: '#0093d8' },
							over: { color: {src: '../../chart/img/down_over.png', color: '#005fa8'} }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: true,
						style: 'triangle'
					}
                },


                column: {
                	area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: { src: '../../chart/img/down.png', color: '#0093d8' },
							over: { color: '#005fa8' }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: true,
						style: 'triangle'
					}
                },

                candle: {
                	
                    area: {
						normal: {
							over: { color: {src: '../../chart/img/over.png'} }
						},
						up: {
							color: [ [0, '#fe5855'], [100, '#fe8a88'] ],
							over: { color: [ [0, '#ca2c29'], [100, '#d55552'] ] }
						},
						down: {
							color: { src: '../../chart/img/down.png', color: '#0093d8' },
							over: { color: {src: '../../chart/img/down_over.png', color: '#005fa8'} }
						},
						flat: {
							color: [ [0, '#6a8091'], [100, '#8899a7'] ],
							over: { color: [ [0, '#4f677a'], [100, '#718594'] ] }
						}

						
					},
                    line: {
						normal: {
                            width: 1, opacity: 0.5,
							over: { width: 2, opacity: 1}
						}
					},
					gradient: {
						direction: 'vertical'
					},
					accessibility: {
						use: true,
						style: 'normal'
					}
                },


                area: {

                    area: {
						normal: {
							opacity: 0.4,
							over: { opacity: 0.4 }
						}

					},
					line: {
						up: {
							color: '#e01f1b', width: 3,
							over: {
								color: '#ca2a27', width: 3
							}
						},
						down: {
							color: '#0093d8', width: 3,
							over: {
								color: '#005fa8', width: 3
							}
						},
						base: {
							color: '#465866', width: 2
						},

						normal: {
							width: 3,
							over: { width: 3 }
						}
					}
                },

				hloc: {

					line: {
						up: {
							color: '#e01f1b', width: 3,
							over: {
								color: '#ca2a27', width: 3
							}
						},
						down: {
							color: '#0093d8', width: 3,
							over: {
								color: '#005fa8', width: 3
							}
						},
						base: {
							color: '#465866', width: 2
						}
					},
					accessibility: {
                        use: true,
                        style: 'normal'
                    }
                }

            }
        },
        sub: {
        	layout: layoutStyles.sub.accessibility,
			graph: graphStyles.sub.accessibility,
			xAxis: xaxisStyles.sub.accessibility,
			yAxis: yaxisStyles.accessibility,
			tip: {
				className: 'tip'
			},
			series: {
				s1: {
					area: {
						normal: {
							color: [ [0, '#feb401'], [100, '#fecb4e'] ],
							over: { color: [ [0, '#f28402'], [100, '#f59c33'] ] }
						}
					},
					line: {
						normal: {
							width: 3,
							over: { width: 3 }
						}
					},
					gradient: {
						direction: 'vertical'
					}, 
					tick : {
						style: 'star',
						area: {
							normal: {
								color: '#fff',
								over: { color: '#4e6679' }
							}

						},
						line: {
							normal: {
								
							}
						}
					}
				}
			}
		},
		sub2: {
			layout: layoutStyles.sub.accessibility,
			graph: graphStyles.sub.accessibility,
			xAxis: xaxisStyles.sub.accessibility,
			yAxis: yaxisStyles.accessibility,

			series: {
				s1: {
					line: {
						normal: {
							color: '#0093d8', width: 3,
							over: { color: '#0093d8', width: 3 }
						}
					},
					tick: {
						style: 'triangle',
						size: 5,
						overSize: 1.5,
						area: {
							normal: { color: '#fff', over: { color: '#fff' } }
						},
						line: {
							normal: { color: '#0093d8', width: 3, over: { color: '#465866', width: 3 }}
						}
					}
				}
			}
		}
    };

    var MULTI = {
    	LEFT: yaxisStyles,
    	RIGHT: {
    		basic: {
    			position: 'right',
    			paddingRight:0, width:50,
    			line: {color: '#e3e3e3', width: 1, opacity: 1},
    			text: {family: defaultFont, size: 10, color: '#666', align: 'left'}
    		},
    		black: {
    			position: 'right',
    			paddingRight:0, width:50,
    			line: {color: '#506376', width: 1, opacity: 1},
    			text: {family: defaultFont, size: 10, color: '#b0becc', align: 'left'}
    		},
    		accessibility: {
    			position: 'right',
    			paddingRight:0, width:50,
    			line: {color: '#e3e3e3', width: 1, opacity: 1},
    			text: {family: defaultFont, size: 10, color: '#506376', align: 'left'}
    		}
    	}
    };


    self.BASIC = BASIC;
    self.WHITE = WHITE;
    self.BLACK = BLACK;
    self.ACCESSIBILITY = ACCESSIBILITY;

    self.MULTIYAXIS = function(userStyles, userSeries, theme){

    	if(!theme) return;

    	theme = theme.toLowerCase();


    	var isFirst = true, firstYAxisId = '';
    	$.each(userSeries, function(key, value) {

    		firstYAxisId = '';

    		$.each(value, function(sKey, sValue) {
	
	    		if(sKey === 'type') return true;
    	
	    		if(sValue.yaxisid === undefined || firstYAxisId === '' || firstYAxisId !== sValue.yaxisid) {

	    			if(isFirst) {
	    				userStyles[key].series[sKey].yAxis = $.extend(true, {}, MULTI.LEFT[theme]);
	    				
	    				firstYAxisId = sKey;
	    				isFirst = false;
	    			} else {
	    				userStyles[key].series[sKey].yAxis = $.extend(true, {}, MULTI.RIGHT[theme]);

	    				firstYAxisId = sKey;
	    				return false;
	    			}
	    		}

    			
    		});

    		isFirst = true;
    		
    	});

    	return userStyles;
    };
	
	window.webponent.chart.styles = self;

})();
