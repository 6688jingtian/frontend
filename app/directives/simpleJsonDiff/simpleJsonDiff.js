/**
 * @file SimpleJsonDiff directive
 * @author zhangyou04@baidu.com
 */

// import angular from 'angular';
import './simpleJsonDiff.less';

export default class SimpleJsonDiff {
    constructor() {
        this.replace = true;
        this.template = require('./simpleJsonDiff.html');
        this.scope = {
            expect: '=',
            actual: '='
        };
    }

    link(scope, element, attrs) {
        let that = this;
        angular.extend(scope, {
            expectJson: that.getPrettyJson(
                that.highlightJsonDiff(angular.copy(scope.expect), scope.actual, true)
            ),
            actualJson: that.getPrettyJson(
                that.highlightJsonDiff(angular.copy(scope.actual), scope.expect)
            ),
            expectCopyTip: '',
            actualCopyTip: '',
            getCopyText(obj) {
                try {
                    return JSON.stringify(obj, null, 4);
                }
                catch (e) {
                    return obj;
                }
            }
        });
    }

    jsonDiff(source, target, callback, parent, parentKey) {
        let that = this;
        let compareJson = function (source, target, key, callback) {
            if (source[key] instanceof Object
                && target[key] instanceof Object) {
                that.jsonDiff(source[key], target[key], callback, source, key);
            }
            else if (!(source[key] instanceof Object)
                && source[key] !== target[key]) {
                callback && callback(source, target, key);
            }
        };

        if (this.isObject(source) && this.isObject(target)) {
            if (this.isEmptyObject(source) && !this.isEmptyObject(target)
                && parent && parentKey) {
                return callback && callback(source, target, '', parent, parentKey);
            }
            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    compareJson(source, target, key, callback);
                }
            }
        }

        if (angular.isArray(source) && angular.isArray(target)) {
            if (!source.length && target.length
                && parent && parentKey) {
                return callback && callback(source, target, '', parent, parentKey);
            }
            for (let i = 0, sLen = source.length, tLen = target.length; i < sLen && tLen; i++) {
                compareJson(source, target, i, callback);
            }
        }

        if (!(source instanceof Object)
            && source !== target) {
            return callback && callback(source, target);
        }

        return source;
    }

    highlightJsonDiff(source, target, isGreen) {
        let tagName = !isGreen ? 'span' : 'b';
        return this.jsonDiff(source, target, function (source, target, key, parent, parentKey) {
            if (!(source instanceof Object) && !key) {
                return '<' + tagName + ' class="highlight-red">' + source + '</' + tagName + '>';
            }

            if (source instanceof Object && !key) {
                if (($.isEmptyObject(source) || !source.length)
                    && parent && parentKey) {
                    let colorKey = '<' + tagName + '>' + parentKey + '</' + tagName + '>';
                    parent[colorKey] = '<' + tagName + '>' + JSON.stringify(source) + '</' + tagName + '>';
                    delete parent[parentKey];
                    return parent[colorKey];
                }
                return '<' + tagName + ' class="highlight-red">' + source + '</' + tagName + '>';
            }

            // source[key] = '<' + tagName + ' class="highlight-red">' + source[key] + '</' + tagName + '>';
            source['<' + tagName + '>' + key + '</' + tagName + '>'] = '<' + tagName + ' class="highlight-red">'
                + source[key] + '</' + tagName + '>';
            delete source[key];
            return source;
        });
    }

    getPrettyJson(obj) {
        try {
            return JSON.stringify(obj, null, 4);
        }
        catch (e) {
            return obj;
        }
    }

    isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    isEmptyObject(obj) {
        for (let name in obj) {
            return false;
        }
        return true;
    }
}
