/**
 * @file button directvie entry
 * @author zhangyou04@baidu.com
 */


import './icon.less';
import IconDirective from './icon';

export default angular.module('ui.icon', [])
    .directive('uiIcon', IconDirective.getInstance)
    .name;
