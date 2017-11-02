/**
 * @file templates entry
 * @author zhangyou04@baidu.com
 */
import angular from 'angular';
import routing from './templates.routes';
import indexTemplate1 from './index_template1';

export default angular.module('app.templates', [indexTemplate1])
    .config(routing)
    .name;
