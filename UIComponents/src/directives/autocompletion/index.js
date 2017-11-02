/**
 * @file autocompletion directvie entry
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import './autocompletion.less';
import AutoCompletionDirective from './autocompletion';

export default angular.module('directives.autocompletion', [])
    .directive('autocompletion', AutoCompletionDirective.getInstance)
    .name;
