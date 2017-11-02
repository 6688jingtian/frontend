/**
 * @file d3 layout tree  entry
 * @author zhangyou04@baidu.com
 */
//import angular from 'angular';
import LayoutTreeDirective from './layoutTree';

export default angular.module('directives.layoutTree', [])
    .directive('d3LayoutTree', () => new LayoutTreeDirective())
    .name;
