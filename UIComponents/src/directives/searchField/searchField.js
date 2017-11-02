/**
 * @file searchfield directvie entry
 * @author zhangyou04@baidu.com
 */

import './searchField.less';

class SearchField {
    constructor($timeout) {
        this.restrict = 'AE';
        this.replace = 'true';
        this.template = require('./searchField.html');
        this.scope = {
            value: '=?',
            placeholder: '@',
            search: '=',
            onClear: '='
        };
        this.$timeout = $timeout;
    }

    link(scope, element, attrs) {
        let doSearch = val => {
            if (scope.search && scope.search instanceof Function) {
                scope.search(val);
            }
        };
        let $timeout = this.$timeout;
        angular.extend(scope, {
            onInputKeyup(evt) {
                if (evt.key === 'Enter') {
                    doSearch(scope.value);
                }
            },
            onInputFocus() {
                scope.showClear = !!scope.value;
            },
            onInputBlur() {
                $timeout(() => {
                    scope.showClear = false;
                }, 200);
            },
            onClearInput() {
                scope.value = '';
                scope.showClear = false;
                angular.isFunction(scope.onClear) && scope.onClear(scope.value);
            },
            onSearch() {
                doSearch(scope.value);
            }
        });
    }

    static getInstance($timeout) {
        SearchField.instance = new SearchField($timeout);
        return SearchField.instance;
    }
}

SearchField.getInstance.$inject = ['$timeout'];

module.exports = SearchField;
