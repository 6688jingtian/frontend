/**
 * @file setFocus directive
 * @author zhangyou04
 */
angular.module('itp').directive('toggleFieldset', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).addClass('toggle-fieldset');
            $(element).find('> legend').on('click', function () {
                element.toggleClass('collapsed');
            });
        }
    };
});
