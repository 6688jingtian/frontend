/**
 * @file  flex layout
 * @author zhangzengwei@baidu.com
 */
import angular from 'angular';
import FlexDirective from './flex';

export default angular.module('directives.flex', [])
    .directive('flex', FlexDirective.getInstance)
    .name;