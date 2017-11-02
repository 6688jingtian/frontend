/**
 * @file tabset directive
 * @author zhangyou04@baidu.com
 */

import './tabset.less';

class TabsetController {
    constructor(scope) {
        this.tabs = scope.tabs = [];
    }

    addTab(tab) {
        this.tabs.push(tab);
        console.log('addTab', tab.active);
        if (this.tabs.length === 1 && !this.tabs[0].active) {
            this.tabs[0].active = true;
        }
        else if (tab.active) {
            this.select(tab);
        } else {
            tab.active = false;
        }
    }

    select(tab) {
        if (!tab.disabled) {
            this.tabs.forEach(item => {
                if (item.active && item !== tab) {
                    item.active = false;
                    item.onDeselect && item.onDeselect();
                }
            });
            tab.active = true;
            tab.onSelect && tab.onSelect();
        }
    }
}

TabsetController.$inject = ['$scope'];

class Tabset {
    constructor() {
        this.replace = true;
        this.transclude = true;
        this.scope = true;
        this.template = require('./tabset.html');
        this.controller = TabsetController;
    }

    link(scope, element, attrs) {

    }

    static getInstance() {
        Tabset.instance = new Tabset();
        return Tabset.instance;
    }
}

class Tab {
    constructor() {
        this.replace = true;
        this.transclude = true;
        this.require = '^tabset';
        this.template = require('./tab.html');
        this.scope = {
            head: '@',
            active: '=?',
            onSelect: '&select',
            onDeselect: '&deselect'
        };
        this.controller = () => true;
    }

    link(scope, element, attrs, tabsetCtrl, transclude) {
        tabsetCtrl.addTab(scope);
        scope.$transcludeFn = transclude;
        scope.select = () => {
            console.log('select ...');
            if (!scope.disabled) {
                scope.active = true;
            }
        };
        scope.$watch('active', active => {
            console.log('active change', active);
            if (active) {
                tabsetCtrl.select(scope);
            }
        });
    }

    static getInstance() {
        Tab.instance = new Tab();
        return Tab.instance;
    }
}

class TabHead {
    constructor() {
        this.require = '?^tab';
    }
    link(scope, element) {
        scope.$watch('headElement', head => {
            if (head) {
                element.html('');
                element.append(head);
            }
        });
    }

    static getInstance() {
        TabHead.instance = new TabHead();
        return TabHead.instance;
    }
}

class TabContent {
    constructor() {
        this.replace = true;
        this.require = '^tabset';
    }

    link(scope, element, attrs) {
        let tab = scope.$eval(attrs.tabContent);

        tab.$transcludeFn(scope.$parent, domNodes => {
            angular.forEach(
                domNodes || [],
                node => {
                    if (node.tagName
                        && (node.hasAttribute('tab-head') || node.tagName.toLowerCase() === 'tab-head')) {
                        tab.headElement = node;
                    }
                    else {
                        element.append(node);
                    }
                }
            );
        });
    }

    static getInstance() {
        TabContent.instance = new TabContent();
        return TabContent.instance;
    }
}

exports.Tabset = Tabset;
exports.Tab = Tab;
exports.TabHead = TabHead;
exports.TabContent = TabContent;
