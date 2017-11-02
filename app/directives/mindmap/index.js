/**
 * @file mindmap directive
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';
import MindmapDierective from './mindmap';
import MindNode from './node';

export default angular.module('directves.mindmap', [MindNode])
    .directive('mindmap', () => new MindmapDierective())
    .name;
