/**
 * @file copy directive
 * @author zhangyou04
 */
angular.module('itp').directive('onScroll', function () {
    return {
        restrict: 'AE',
        scope: {
            onScroll: '='
        },
        link: function (scope, element, attrs) {
            $(element).on('scroll', function (evt) {
                scope.onScroll && scope.onScroll(evt, attrs.scrollParams);
            });
        }
    };
});
