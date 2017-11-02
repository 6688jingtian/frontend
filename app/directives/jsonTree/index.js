/**
 * @file jsoneview directive entry
 * @author shuyue@baidu.com
 */

import JsonTreeDirective from './jsonTree';

export default angular.module('directives.jsonTree', [])
    .directive('jsonTree', () => new JsonTreeDirective())
    .name;