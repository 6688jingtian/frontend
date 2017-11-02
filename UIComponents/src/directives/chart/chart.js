/**
 * @file line chart directive
 * @author zhangyou04
 */
import echarts from 'echarts';

export default class ChartDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.scope = {
            option: '=',
            beforeDraw: '=',
            onClick: '=',
            context: '='
        };
        this.template = require('./chart.html');
    }
}
