/**
 * @file datemodel directive
 * @author zhangyou04@baidu.com
 */

class DateModelDirective {
    constructor($parse) {
        this.$parse = $parse;
    }

    link(scope, element, attrs, ctrl) {
        let key = attrs.dateModel;
        let getter = this.$parse(key);
        let setter = getter.assign;

        element.on('change', evt => {
            scope.$apply(() => {
                setter(scope, evt.currentTarget.value);
                if (scope[attrs.onChange]) {
                    scope[attrs.onChange].call(scope, evt.currentTarget.value);
                }
            });
        });
    }

    static getInstance($parse) {
        DateModelDirective.instance = new DateModelDirective($parse);
        return DateModelDirective.instance;
    }
}

DateModelDirective.getInstance.$inject = ['$parse'];

module.exports = DateModelDirective;
