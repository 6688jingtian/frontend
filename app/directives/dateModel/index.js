/**
 * @file date model entry
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import DateModelDirective from './dateModel';

export default angular.module('directives.dateModel', [])
    .directive('dateModel', DateModelDirective.getInstance)
    .name;
