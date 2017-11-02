/**
 * @file directed graph entry
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import DirectedGraphDierective from './directedGraph';

export default angular.module('directives.directedGraph', [])
    .directive('directedGraph', () => new DirectedGraphDierective())
    .name;
