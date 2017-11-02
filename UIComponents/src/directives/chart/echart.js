/**
 * @file line chart directive
 * @author zhangyou04
 */
//import echarts from 'echarts';
import dateAdapter from './dateAdapter';

export default class EchartDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.scope = {
            option: '=',
            beforeDraw: '=',
            onClick: '=',
            context: '=',
            refreshId: '='
        };
        this.template = '<div style="height:500px;width: 100%;"></div>';
    }

    link(scope, element, attrs) {
        // scope.option = dateAdapter.generateChartData(scope.option);
        element.height(attrs.height || 500);
        scope.$watch('option', option => {
            if (option) {
                this.drawChart(option, element, scope);
            }
        });

        scope.$watch('option.refreshId', refreshId => {
            if (refreshId) {
                this.drawChart(scope.option, element, scope);
            }
        });

        scope.$watch('refreshId', refreshId => {
            if (refreshId) {
                this.drawChart(scope.option, element, scope);
            }
        });
    }

    drawChart(data, element, scope) {

        if (dateAdapter.checkChartDataEmpty(data)) {
            element.html([
                '<div class="empty-chart">',
                '   <h5>' + (data.title || data.name) + '</h5>',
                '   <p>暂无数据，如有查询条件请设置条件</p>',
                '</div>'
            ].join('')).height('auto');
            return this;
        }

        let option = angular.copy(data);
        option = dateAdapter.generateChartData(data);
        if (scope.beforeDraw) {
            scope.beforeDraw.call(scope.context || this, option, data);
        }
        let chart = echarts.init(element[0], {
            line: {
                smooth: true
            }
        });

        chart.setOption(option);
        if (scope.onClick) {
            chart.on('click', params => {
                if (scope.context) {
                    scope.onClick.call(scope.context || this, params, scope.option);
                }
                else {
                    scope.onClick(params, scope.option);
                }
            });
        }
    }
}
