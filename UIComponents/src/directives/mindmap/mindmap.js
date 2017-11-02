/**
 * @file Mindmap directive
 * @author zhangyou
 */
import './mindmap.less';

export default class MindmapDirective {
    constructor() {
        this.restrict = 'E';
        this.replace = true;
        this.scope = {
            data: '=data',
            onToggleExpand: '&',
            onSelect: '=',
            context: '=',
            expandLevel: '='
        };
        this.template = require('./mindmap.html');
    }

    link(scope, element, attrs) {
        let isMultiple = !!attrs.multiple;
        let expandLevel = scope.expandLevel;

        // 相关属性参数初始化
        scope.animation = !!attrs.animation;
        scope.id = attrs.key || 'id';
        scope.name = attrs.name || 'name';
        scope.children = attrs.children || 'children';

        scope.selectedNodes = isMultiple ? [] : null;

        scope.isExpand = (collapsed, level) => {
            if (typeof collapsed === 'undefined' && typeof expandLevel !== 'undefined') {
                return level < +expandLevel;
            }

            return !collapsed;
        };

        // events
        angular.extend(
            scope,
            {
                toggle(node, level) {
                    node.collapsed = scope.isExpand(node.collapsed, level);

                    let toggleHandle = scope.onToggleExpand && scope.onToggleExpand();
                    toggleHandle && toggleHandle(node);
                },
                select(node) {
                    if (isMultiple) {
                        node.selected = !node.selected;
                        if (node.selected) {
                            scope.selectedNodes.push(node);
                        }
                        else {
                            scope.selectedNodes.splice(scope.selectedNodes.indexOf(node), 1);
                        }
                    }
                    else {
                        if (!node.selected) {
                            node.selected = true;
                            if (scope.selectedNode) {
                                scope.selectedNode.selected = false;
                            }
                            scope.selectedNode = node;
                        }
                    }
                    scope.onSelect && scope.onSelect.call(scope.context || this, node, scope.data);
                }
            }
        );
    }
}
