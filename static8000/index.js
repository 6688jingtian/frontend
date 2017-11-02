/**
 * @file Angular custom directives Demo
 * @author zhangyou04@baidu.com
 */
angular.module(
    'test',
    [
        'directives.dndTree'
    ]
).controller(
    'index',
    [
        '$scope', '$location',
        function ($scope, $location) {
            window.GLOBALSCOPE = $scope;
            d3.json(
                'tree.json',
                function (json) {
                    $scope.$apply(
                        function () {
                            $scope.currentComponent = {
                                data: json,
                                height: Math.max(window.innerHeight, 1000),
                                width: Math.max(window.innerWidth, 800),
                                getTooltip: function (node) {
                                    if (node.hovor) {
                                        var link = '';
                                        if (node.hovor.link) {
                                            link += '<a href="' + node.hovor.link + '" target="_black">查看详情</a>';
                                        }
                                        var tooltip = [
                                            'Topic: ' + node.hovor.topicName + '<br>',
                                            node.hovor.content ? '说明: ' + node.hovor.content : '',
                                            link ? '<br>' + link : ''
                                        ].join('');

                                        return tooltip;
                                    }
                                    return node.name;
                                }
                            };
                        }
                    );
                }
            );
        }
    ]
);
