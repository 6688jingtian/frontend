/**
 * @file searchfield directvie entry
 * @author zhangyou04@baidu.com
 */

import './ratingIndicator.less';
// import angular from 'angular';

class RatingIndicator {
    constructor() {
        this.restrict = 'AE';
        this.replace = 'true';
        this.template = require('./ratingIndicator.html');
        this.scope = {
            star: '=?',
            max: '=',
            select: '='
        };
    }

    link(scope, element, attrs) {
        angular.extend(scope, {
            hoverIndex: - 1,
            items: new Array(scope.max || 5),
            selectStar(index) {
                scope.star = index + 1;
                // scope.hoverIndex = scope.star - 1;
                angular.element(element).find('input[type="hidden"]').val(scope.star);
                if (angular.isFunction(scope.select)) {
                    scope.select(scope.star);
                }
            },
            onStarMouseover(index) {
                scope.hoverIndex = index;
            },
            onStarMouseleave(index) {
                scope.hoverIndex = -1;
                // scope.hoverIndex = scope.star - 1;
            }
        });
    }

    static getInstance() {
        RatingIndicator.instance = new RatingIndicator();
        return RatingIndicator.instance;
    }
}

module.exports = RatingIndicator;
