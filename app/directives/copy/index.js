/**
 * @file copy directive entry
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import CopyDirective from './copy';

export default angular.module('ui.copy', [])
    .directive('uiCopy', CopyDirective.getInstance)
    .name;
