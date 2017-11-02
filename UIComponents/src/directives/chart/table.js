/**
 * @file table chart directive
 * @author zhangyou04
 */
export default class TableChartDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.scope = {
            data: '='
        };
        this.template = require('./table.html');
    }

    link(scope) {

    }
}
