/**
 * @file button directvie entry
 * @author zhangyou04@baidu.com
 */

import './button.less';
import ButtonDirective from './button';

export default angular.module('ui.button', [])
    .directive('uiButton', ButtonDirective.getInstance)
    .name;
