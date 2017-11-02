/**
 * @file tabset directive entry
 * @author zhangyou04@baidu.com
 */

// import angular from 'angular';
import {
    Tabset,
    Tab,
    TabHead,
    TabContent
} from './tabset';

export default angular.module('directives.tabset', [])
    .directive('tabset', Tabset.getInstance)
    .directive('tab', Tab.getInstance)
    .directive('tabHead', TabHead.getInstance)
    .directive('tabContent', TabContent.getInstance)
    .name;
