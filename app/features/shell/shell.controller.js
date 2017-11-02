/**
 * @file shell controller
 * @author zhangyou04@baidu.com
 */
import './shell.less';

class ShellController {
    constructor($scope, $state) {
        this.headerItems = [
            {
                id: 'index',
                name: '首页'
            },
            {
                id: 'framework',
                name: '前端脚手架'
            },
            {
                id: 'components',
                name: 'UI组件库'
            },
            {
                id: 'templates',
                name: 'UI设计模版',
                children: [
                    {
                        children: [
                            {
                                id: 'index_template1',
                                name: '首页模板1'
                            }
                        ]
                    },
                    {
                        children: [
                            // {
                            //     id: 'foldable_layout',
                            //     name: '可折叠宽高布局'
                            // }
                        ]
                    }
                ]
            },
            {
                id: 'colorboard',
                name: '配色方案'
            }
        ];
        //this.contentStyle = {
        //    minHeight: window.innerHeight - 60
        //};
        this.isIndexView = true;
        this.$state = $state;
        this.isActive = function (item) {
            let isIncluded = $state.includes('shell.' + item.id);
            if (item.id === 'scenes') {
                isIncluded = isIncluded || $state.is('shell.report')
                    || $state.is('shell.risk') || $state.is('shell.perfermance');
            }
            return isIncluded;
        };
        $scope.$on('$stateChangeStart', function () {
            // console.log('stateChangeStart');
        });
        this.templatesSubItemSwitch = function (subItem) {
            $state.go('shell.templates', ({type: subItem.id}));
        };
    }
}

ShellController.$inject = ['$scope', '$state'];

module.exports = ShellController;
