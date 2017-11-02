/**
 * @file flex directive
 * @author zhangzengwei@baidu.com
 */
import './flex.less';

class FlexDirective {
    constructor($compile) {
        this.$compile = $compile;
        this.restrict = 'EA';
        this.transclude = true;
        this.scope = {
        };
        this.template = require('./flex.html');
    }

    link(scope, element, attrs) {
        scope.flexInfo = {
            flexAlign: (attrs.flexAlign === undefined
                || attrs.flexAlign === '')
                ? 'row'
                : attrs.flexAlign
        };
        scope.getStyleClass = (info) => {
            let styleClass = '';
            switch (info.flexAlign) {
                case 'row' : {
                    styleClass += 'flex-row';
                    break;
                }
                case 'row-center' : {
                    styleClass += 'flex-row-center';
                    break;
                }
                case 'row-around' : {
                    styleClass += 'flex-row-around';
                    break;
                }
                case 'row-center-center' : {
                    styleClass += 'flex-row-center-center';
                    break;
                }
                case 'row-around-center' : {
                    styleClass += 'flex-row-around-center';
                    break;
                }
                case 'row-wrap' : {
                    styleClass += 'flex-row-wrap';
                    break;
                }
                case 'column' : {
                    styleClass += 'flex-column';
                    break;
                }
                case 'column-center' : {
                    styleClass += 'flex-column-center';
                    break;
                }
                case 'column-center-center' : {
                    styleClass += 'flex-column-center-center';
                    break;
                }
            }
            
            return styleClass;
        };
    }
    static getInstance($compile) {
        FlexDirective.instance = new FlexDirective($compile);
        return FlexDirective.instance;
    }
}
FlexDirective.getInstance.$inject = ['$compile'];
module.exports = FlexDirective;
