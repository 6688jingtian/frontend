/**
 * @file autotextarea directive
 * @author zhangyou04@baidu.com
 */

class AutoTextarea {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.require = '?ngModel';
        this.template = require('./autotextarea.html');
    }

    link(scope, element, attrs, ngModelCtrl) {
        let textarea = element.find('textarea');
        let pre = element.find('pre');
        let getValue = () => {
            return ngModelCtrl ? ngModelCtrl.$viewValue : attrs.value;
        };
        let render = () => {
            let value = getValue();
            pre.html(value);
            textarea.val(value);
        };

        ngModelCtrl && (ngModelCtrl.$render = render);

        textarea.attr('placeholder', attrs.placeholder || '');
        textarea.on('input', (evt) => {
            ngModelCtrl.$setViewValue(textarea.val(), evt);
            render();
        });
        scope.style = {
            padding:  textarea.css('padding')
        };

    }

    static getInstance($compile, $timeout) {
        AutoTextarea.instance = new AutoTextarea($compile, $timeout);
        return AutoTextarea.instance;
    }
}

AutoTextarea.getInstance.$inject = [];

module.exports = AutoTextarea;
