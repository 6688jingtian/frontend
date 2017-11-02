/**
 * @file table directive entry
 * @author zhangyou04@baidu.com
 */
//import angular from 'angular';
import TableDirective from './table';
import CellDirective from './cell';

export default angular.module('directives.table', [CellDirective])
    .directive('uiTable', TableDirective.getInstance)
    .name;
