/**
 * @file radio directvie entry
 * @author zhangyou04@baidu.com
 */

import './radioButton.less';
import {
    RadioDirective, RadioButtonDirective, RadioGroupDirective
} from './radioButton';

export default angular.module('ui.radio', [])
    .directive('uiRadioGroup', RadioGroupDirective.getInstance)
    .directive('uiRadio', RadioDirective.getInstance)
    .directive('uiRadioButton', RadioButtonDirective.getInstance)
    .name;
