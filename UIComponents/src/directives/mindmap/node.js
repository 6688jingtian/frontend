/**
 * @file mindmap node directive
 * @author zhangyou04@baidu.com
 */
// import angular from 'angular';

class Node {
    constructor() {
        this.replace = true;
        this.restrict = 'AE';
        this.template = require('./node.html');
        //console.log(this.template);
    }

    link() {
        //console.log('mindmap node link');
    }
}

export default angular.module('directives.mindnode', [])
    .directive('mindNode', () => new Node())
    .name;
