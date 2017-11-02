/**
 * @file d3 dnd tree  entry
 * @author zhangyou04@baidu.com
 */
//import angular from 'angular';
import DndTreeDirective from './dndTree';

export default angular.module('directives.dndTree', [])
    .directive('d3DndTree', () => new DndTreeDirective())
    .name;
