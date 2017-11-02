/**
 * @file autotextarea directvie entry
 * @author zhangyou04@baidu.com
 */

import './autotextarea.less';
import AutoTextareaDirective from './autotextarea';

export default angular.module('directives.autotextarea', [])
    .directive('autotextarea', AutoTextareaDirective.getInstance)
    .name;
