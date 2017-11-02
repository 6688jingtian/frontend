/**
 * @file autotextarea directive
 * @author zhangyou04@baidu.com
 */

class ButtonDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.scope = true;
        this.template = require('./button.html');
    }

    link(scope, element, attrs) {
        element.addClass('ui-button');
        element.addClass(attrs.size || 'default');

        if (element[0].hasAttribute('selected')) {
            element.toggleClass('selected', attrs.selected === 'true');
            element.on('click', element.toggleClass.bind(element, 'selected'));
        }

        attrs.$observe('size', size => {
            scope.size = size;
        }, true);
        attrs.$observe('loading', loading => {
            scope.loading = loading;
        }, true);
    }

    static getInstance($compile, $timeout) {
        return new ButtonDirective($compile, $timeout);
    }
}

ButtonDirective.getInstance.$inject = [];

module.exports = ButtonDirective;
