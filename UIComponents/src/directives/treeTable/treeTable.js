/**
 * @file treeTable directive
 * @author zhangyou04@baidu.com
 */

import './treeTable.less';

class TreeTable {
    constructor() {
        this.replace = true;
        this.scope = true;
        this.template = require('./treeTable.html');
    }

    link(scope, element, attrs) {
        scope.cols = [];
        scope.rows = [];
        let buildRowsWithLevel = (treeData, level) => {
            if (treeData) {
                treeData.level = level;
                scope.rows.push(treeData);
                level++;
                treeData.children = treeData.children || [];
                treeData.children.forEach(item => {
                    buildRowsWithLevel(item, level);
                });
            }
        };
        let walkThroughNodes = function (data, callback, childrenKey, parent) {
            let processNode = function (data) {
                if (data) {
                    // 如果callback 返回值为true则终止遍历
                    if (callback(data, parent)) {
                        return;
                    }
                    if (data[childrenKey]) {
                        data[childrenKey].forEach(function (node) {
                            walkThroughNodes(node, callback, childrenKey, data);
                        });
                    }
                }
            };
            childrenKey = childrenKey || 'children';
            if (angular.isArray(data)) {
                data.forEach(function (item) {
                    processNode(item, parent);
                });
            }
            else {
                processNode(data, parent);
            }
        };
        let watchAttrs = attrList => {
            attrList = attrList || [];
            attrList.forEach((attr, i) => {
                if (angular.isString(attr)) {
                    scope.$watch(
                        attrs[attr],
                        data => {
                            scope[attr] = data;
                        },
                        true
                    );
                }

                if (Object.prototype.toString.call(attr) === '[object Object]'
                    && attr.name) {
                    scope.$watch(
                        attrs[attr.name],
                        attr.callback || (data => {
                            scope[attr] = data;
                        }),
                        true
                    );
                }
            });
        };

        watchAttrs([
            'cols',
            {
                name: 'data',
                callback(data) {
                    scope.data = data || [];
                    scope.rows = [];
                    scope.data.forEach(treeData => {
                        buildRowsWithLevel(treeData, 1);
                    });
                }
            },
            {
                name: 'expandIndex',
                callback(index) {
                    scope.expandIndex = angular.isNumber(index) ? Math.max(index - 1, 0) : 0;
                }
            },
            'getIconClass'
        ]);

        angular.extend(scope, {
            toggle(node) {
                node.collapsed = !node.collapsed;
                walkThroughNodes(node.children, (item, parent) => {
                    if (node.collapsed) {
                        item.hide = node.collapsed;
                    }
                    else {
                        item.hide = parent.collapsed || parent.hide;
                    }
                }, 'children', node);
            },
            getExpandFieldStyle(row, col, index) {
                if (index === scope.expandIndex && row.level >= 2) {
                    return {
                        paddingLeft: 30 * (row.level - 1)
                    };
                }
                return null;
            },
            makeIconClass(row) {
                let iconClass = [];
                if (typeof scope.getIconClass === 'function') {
                    iconClass.push(scope.getIconClass(row));
                }
                if (typeof attrs.icon === 'string') {
                    iconClass.push(attrs.icon);
                }
                return iconClass.join(' ');
            }
        });
    }

    static getInstance() {
        TreeTable.instance = new TreeTable();
        return TreeTable.instance;
    }
}

module.exports = TreeTable;
