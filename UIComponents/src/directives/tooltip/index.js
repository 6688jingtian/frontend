/**
 * @file tooltip directive entry
 * @author zhangyou04@baidu.com
 */

// import angular from 'angular';
import Tooltip from './tooltip';

export default angular.module('directives.tooltip', [])
    .directive('tooltip', Tooltip.getInstance)
    .name;
