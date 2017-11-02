/**
 * @file icon directive
 * @author zhangyou04@baidu.com
 */

require('./iconfont/iconfont');

class IconDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.transclude = true;
        this.template = require('./icon.html');
    }

    link(scope, element, attrs) {
        element.find('svg.icon use').attr('xlink:href', '#icon-' + attrs.type);
        attrs.$observe('type', type => {
            element.find('svg.icon use').attr('xlink:href', '#icon-' + attrs.type);
        });
    }

    static getInstance($compile, $timeout) {
        return new IconDirective($compile, $timeout);
    }
}

IconDirective.getInstance.$inject = [];

module.exports = IconDirective;
