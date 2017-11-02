/**
 * @file checkbox directvie entry
 * @author zhangyou04@baidu.com
 */


import './checkbox.less';
import {
    CheckboxDirective, CheckboxButtonDirective, CheckboxGroupDirective
} from './checkbox';

export default angular.module('ui.checkbox', [])
    .directive('uiCheckbox', CheckboxDirective.getInstance)
    .directive('uiCheckboxButton', CheckboxButtonDirective.getInstance)
    .directive('uiCheckboxGroup', CheckboxGroupDirective.getInstance)
    .name;
