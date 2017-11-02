module.exports = {
    types: ['line', 'graph', 'table', 'funnel', 'pie', 'bar', 'gauge', 'radar', 'mindmap', 'text'],
    getChartTypeName(typeNum) {
        return angular.isNumber(typeNum) ? typeNum : this.types[typeNum - 1];
    },
    generateChartData(chart) {
        if (!chart) {
            console.warn('chart data shoun\'t be null');
            return null;
        }
        let types = this.types;
        let type = types[+chart.type - 1];
        let option = {
            title: {
                text: chart.title || chart.name,
                subtext: chart.subTitle || '',
                x: 'center',
                textStyle: {
                    fontFamily: 'ff-tisa-web-pro-1, ff-tisa-web-pro-2, Lucida Grande,'
                        + 'Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Hiragino Sans GB W3,'
                        + 'Microsoft YaHei UI,Microsoft YaHei, WenQuanYi Micro Hei, sans-serif'
                },
                subtextStyle: {
                    color: '#ae5da1'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            calculable: true,
            grid: {
                left: 40,
                right: 80,
                containLabel: true
            }
        };
        let axisLine = {
            show: true,
            onZero: true,
            lineStyle: {
                width: 1,
                color: '#333',
                type: 'solid'
            }
        };
        let tooltip = {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,.5)',
            textStyle: {
                color: '#fff',
                fontSize: 14,
                lineHeight: 30
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    color: '#666',
                    width: 2
                }
            }
        };
        let getXName = function (chart) {
            return chart.data && chart.data.xname || (chart.xname || '');
        };
        let getYName = function (chart) {
            return chart.yname || '';
        };
        let nameTextStyle = {
            color: '#ae5da1'
        };
        let xAxis = [{
            name: getXName(chart), // chart.xname || chart.data.xname,
            nameTextStyle: nameTextStyle,
            type: 'category',
            data: chart.xAxis || [],
            axisLabel: {
                formatter: '{value}' + (chart.xUnit ? chart.xUnit : '')
            },
            axisLine: axisLine,
            boundaryGap: ['20%', '20%']
        }];
        chart.yAxis = chart.yAxis || [{
            name: getYName(chart),
            unit: chart.unit || chart.yUnit || ''
        }];
        let yAxis = chart.yAxis.map(item => {
            return {
                name: item.name,
                type: 'value',
                min: 0,
                // nameTextStyle: nameTextStyle,
                scale: true,
                axisLabel: {
                    formatter: '{value} ' + (item.unit || item.yUnit || '')
                },
                axisLine: $.extend(true, axisLine, {lineStyle: {width: 1}})
            };
        });
        // let start;
        let total;
        let chartType = types.indexOf(chart.type);

        chartType = chartType === -1 ? +chart.type : (chartType + 1);
        type = types[chartType - 1];
        switch (chartType) {
            case 1: // line
                $.extend(option, {
                    dataZoom: [{
                        type: 'slider',
                        show: true,
                        xAxisIndex: 0,
                        start: 0,
                        end: 100
                    }],
                    tooltip: tooltip,
                    legend: {
                        x: 'center',
                        y: '35',
                        data: (chart.series || []).map(function (item, i) {
                            return item.name || i;
                        })
                    },
                    xAxis: xAxis,
                    yAxis: yAxis,
                    series: this.generateSeries(chart && chart.series, type, chart)
                });

                // start = parseInt((15 / option.series[0].data.length) * 100);

                // start = option.series[0].data.length < 15 ? 0 : Math.min(100, 100 - start);
                // option.dataZoom[0].start = start;

                // lengend大于5个则可能换行 需调整图标的Y轴坐标
                if (option.legend && option.legend.data
                    && option.legend.data.length > 7) {
                    // option.grid = {
                    //     x: 40,
                    //     y: 60 + (Math.ceil(option.legend.data.length / 7) - 1) * 30
                    // };
                }
                this.generateColorsForChart(option, 1);
                break;
            case 5: // pie
                $.extend(option, {
                    title: {
                        x: 'center',
                        padding: 0,
                        text: chart.title || chart.name,
                        subtext: chart.subTitle || '',
                        subtextStyle: {
                            color: '#ae5da1'
                        }
                    },
                    legend: {
                        itemGap: chart.series.length > 5 ? 10 : 30,
                        orient: chart.series.length > 5 ? 'vertical' : 'horizontal',
                        selectedMode: false,
                        x: chart.series.length > 5 ? 'right' : 'center',
                        y: 'bottom',
                        data: (chart.series || []).map(item => item.name)
                    },
                    calculable: false,
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c} ({d}%)'
                    },
                    series: [{
                        name: '',
                        type: type,
                        radius: '52%',
                        center: ['50%', '50%'],
                        data: chart.series || []
                    }]
                });
                this.generateColorsForChart(option, 3);
                break;
            case 6: // 柱状图
                $.extend(option, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    legend: {
                        y: 'bottom',
                        data: (chart.series || []).map(function (item, i) {
                            return item.name || i;
                        })
                    },
                    series: this.generateSeries(chart && chart.series, type, chart)
                });

                total = option.series.length * option.series[0].data.length;
                if (total > 30) {
                    option.dataZoom = {
                        show: true,
                        start: 0,
                        // end: (30 / total) * 100,
                        end: 100,
                        // width: '',
                        // height: 20,
                        // backgroundColor: '#e6e6e6',
                        // dataBackgroundColor: '#e6e6e6',
                        // fillerColor: '#f8f8f8',
                        // handleColor: '#ae5da1'
                        // handleSize: 40
                    };

                    option.legend.y = option.title && option.title.subtext ? '45' : '30';
                    // option.legend.x = 'right';
                    // option.legend.orient = 'vertical';
                }

                this.generateColorsForChart(option, 4);
                break;
            case 5: // 漏斗图
                $.extend(option, {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: (chart.data || []).map(item => item.name)
                    },
                    series: [{
                        name: chart.title,
                        type: type,
                        data: chart.data || []
                    }]
                });
                break;
            case 8: // 雷达图
                $.extend(option, {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'top',
                        data: (chart.series || []).map(item => item.name)
                    },
                    radar: [{
                        center: ['50%', '55%'],
                        indicator: chart.polar.map(item => {
                            return {text: item, max: chart.max};
                        })
                    }],
                    series: chart.series.map(item => {
                        return {
                            type: type,
                            tooltip: {
                                trigger: 'item'
                            },
                            data: [
                                {
                                    name: item.name,
                                    value: item.values
                                }
                            ]
                        };
                    })
                });
                break;
            case 7: // 仪表盘
                $.extend(option, {
                    series: [{
                        name: chart.title,
                        type: type,
                        data: [chart.data]
                    }]
                });
                break;
            case 8: // 横向柱状图
                $.extend(option, {
                    tooltip: tooltip,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    legend: {
                        y: 'bottom',
                        data: ((chart.data && chart.data.series) || []).map(function (item, i) {
                            return item.name || i;
                        })
                    },
                    series: this.generateSeries(chart && chart.data && chart.data.series, type, chart)
                });

                this.generateColorsForChart(option, 8);
                break;
        }

        // if (option.grid) {
        //     option.grid.containLabel = true;
        // }

        return option;
    },
    generateColorsForChart(chart, type) {
        // let colors = ['#ffdb4b', '#ffa3e0', '#52e8df', '#ff9f32', '#c366eb', '#852758', '#ef4836', '#a8ccfd'/*, '#d2aeae'*/].reverse();
        let colors = [];
        switch (type) {
            // case 6: // radar
            case 3: // pie
                chart.series[0].data.forEach(function (item, i) {
                    if (colors[i]) {
                        item.itemStyle = item.itemStyle || {};
                        $.extend(item.itemStyle, {
                            normal: {
                                color: colors[i]
                            }
                        });
                    }
                });
                break;
            case 1: // line
            case 4: // bar
            case 8: // horizontal bar
                chart.series.forEach(function (item, i) {
                    if (colors[i]) {
                        item.itemStyle = item.itemStyle || {};
                        $.extend(item.itemStyle, {
                            normal: {
                                color: colors[i]
                            }
                        });
                    }
                });
                break;
        }

        return chart;
    },
    generateSeries(series, type, chart) {
        return (series || []).map(
            (item, i) => $.extend(item, {
                name: item.name || i,
                type: item.type ? this.getChartTypeName(item.type) : type,
                data: this.valsToNumber(item.values || []).map((value, i) => {
                    if (item.labels && item.labels[i]) {
                        return {
                            value: value,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: (label => label).bind(this, item.labels[i])
                                }
                            }
                        };
                    }
                    return value;
                }),
                pic: item.pic || []
            })
        );
    },
    valsToNumber(vals) {
        return (vals || []).map(val => {
            return val == null ? 0 : (val === '-' ? val : parseFloat(val, 10));
        });
    },
    checkChartDataEmpty(chart) {
        let isEmpty = false;
        if (!chart || !chart.type) {
            return true;
        }

        switch (+chart.type) {
            case 4: // table
            case 3: // json obj
            case 5: // pie
            case 7: //
                isEmpty = !chart;
                break;
            case 8: // radar
                isEmpty = !(chart.polar && chart.polar.length);
                break;
            case 1: // line
            case 6: // bar
                isEmpty = !(chart && chart.series && chart.series[0]
                    && chart.series[0].values && chart.series[0].values.length > 0);
                break;
        }
        return isEmpty;
    }
};
