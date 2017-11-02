/**
 * @file jsoneditor directive
 * @author shuyue@baidu.com
 */
import angular from 'angular';
import './jsonTree.less';

export default class JsonTreeDirective {
    constructor() {
        this.restrict = 'AE';
        this.replace = true;
        this.scope = {
            nodes: '='
        };
        this.template = require('./jsonTree.html');
    }

    link(scope, element, attrs) {
        angular.extend(scope, {
            isArray(value) {
                return value && typeof value === 'object' && value.constructor === Array;
            },
            typeofReal(value) {
                return  this.isArray(value) ? 'array' : typeof value;
            },      
            toggle(value) {
                value.collapsed = value.collapsed ? 0 : 1;
                return value.collapsed;
            }
        });
    }
}
