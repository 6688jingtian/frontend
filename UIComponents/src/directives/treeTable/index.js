/**
 * @file treetable directive entry
 * @author zhangyou04@baidu.com
 */

// import angular from 'angular';
import TreeTable from './treeTable';

export default angular.module('directives.treeTable', [])
    .directive('treeTable', TreeTable.getInstance)
    .name;
