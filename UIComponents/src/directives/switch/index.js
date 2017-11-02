/**
 * @file switch directive entry
 * @author zhangyou04@baidu.com
 */

import Switch from './switch';

export default angular.module('ui.switch', [])
    .directive('uiSwitch', Switch.getInstance)
    .name;
