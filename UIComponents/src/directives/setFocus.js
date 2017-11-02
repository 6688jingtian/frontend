/**
 * @file focus directive entry
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';

class SetFocusDirective {
    constructor($timeout) {
        this.$timeout = $timeout;
        this.scope = {
            setFocus: '='
        };
    }
    link(scope, element, attrs) {
        scope.$watch('setFocus', () => {
            if (scope.setFocus) {
                this.$timeout(() => {
                    element[0].focus();
                }, 25);
            }
        });
        element.on('blur', () => {
            if (scope.$root.$$phase !== '$digest') {
                scope.$apply(scope.setFocus = false);
            }
        });
    }

    static getInstance($timeout) {
        SetFocusDirective.instance = new SetFocusDirective($timeout);
        return SetFocusDirective.instance;
    }
}

SetFocusDirective.getInstance.$inject = ['$timeout'];

export default angular.module('directives.focus', [])
    .directive('setFocus', SetFocusDirective.getInstance)
    .name;
