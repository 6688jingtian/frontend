/**
 * @file framework entry
 * @author zhangyou04@baidu.com
 */
import angular from 'angular';
import routing from './framework.routes';

export default angular.module('app.framework', [])
    .config(routing)
    .name;
