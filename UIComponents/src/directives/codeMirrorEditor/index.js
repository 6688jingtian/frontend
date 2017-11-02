/**
 * @file editor directive entry
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import CodeMirrorEditor from './codeMirrorEditor';

export default angular.module('directives.cmEditor', [])
    .directive('cmEditor', CodeMirrorEditor.getInstance)
    .name;
