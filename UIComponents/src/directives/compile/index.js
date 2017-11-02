/**
 * @file compile directive entry
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import CompileDirective from './compile';

export default angular.module('directives.compile', [])
    .directive('compile', CompileDirective.getInstance)
    .name;
