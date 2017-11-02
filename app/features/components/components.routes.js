/**
 * @file components routers
 * @author zhangyou04@baidu.com
 */
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider.state('shell.components', {
        url: 'components',
        views: {
            'content@': {
                template: require('./components.html'),
                controller: 'ComponentsController as ctrl',
                resolve: {
                    modules: [
                        '$q',
                        '$ocLazyLoad',
                        ($q, $ocLazyLoad) => $q(resolve => {
                            require.ensure([], () => {
                                let module = require('./components.controller');
                                $ocLazyLoad.load({name: module.name || module.default.name});
                                resolve(module);
                            }, 'dashboard.bundle');
                        })
                    ]
                }
            }
        }
    });
}
