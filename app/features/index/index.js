/**
 * @file index entry
 * @author zhangyou04@baidu.com
 */
import angular from 'angular';
import routing from './index.routes';

export default angular.module('app.index', [])
    .config(routing)
    .name;
