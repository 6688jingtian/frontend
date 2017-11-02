/**
 * @file color board entry
 * @author zhangyou04@baidu.com
 */
import angular from 'angular';
import routing from './colorboard.routes';

export default angular.module('app.colorboard', [])
    .config(routing)
    .name;
