/**
 * @file drownlist directive entry
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import {DropdownDirective, MenuListDirective} from './dropdown';

export default angular.module('directives.dropdown', [])
    .directive('dropdown', () => new DropdownDirective())
    .directive('menuList', MenuListDirective.getInstance)
    .name;
