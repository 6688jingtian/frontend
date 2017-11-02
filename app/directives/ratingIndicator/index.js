/**
 * @file ratingIndicator directvie entry
 * @author zhangyou04@baidu.com
 */

// import angular from 'angular';
import RatingIndicator from './ratingIndicator';

export default angular.module('directives.ratingIndicator', [])
    .directive('ratingIndicator', RatingIndicator.getInstance)
    .name;
