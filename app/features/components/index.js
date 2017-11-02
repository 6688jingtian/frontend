/**
 * @file components entry
 * @author zhangyou04@baidu.com
 */
import angular from 'angular';
import routing from './components.routes';

export default angular.module('app.components', [])
    .config(routing)
    .name;
