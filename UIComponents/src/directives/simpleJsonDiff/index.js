/**
 * @file jsonDiff directive entry
 * @author zhangyou04@baidu.com
 */

// import angular from 'angular';
import SimpleJsonDiff from './simpleJsonDiff';
// import CompileDirective from '../compile';
// import CopyDirective from './copy/copy';
// import TooltipDirective from './tooltip';

export default angular.module('directives.simpleJsonDiff', [])
    .directive('simpleJsonDiff', () => new SimpleJsonDiff())
    .name;
