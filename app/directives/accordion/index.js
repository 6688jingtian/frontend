/**
 * @file accordion directive entry
 * @author zhangyou04@baidu.com
 */

// import angular from 'angualr';
import {
    Accordion,
    AccordionItem
} from './accordion';

export default angular.module('directives.accordion', [])
    .directive('accordion', Accordion.getInstance)
    .directive('accordionItem', AccordionItem.getInstance)
    .name;
