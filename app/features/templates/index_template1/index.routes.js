/**
 * @file index routers
 * @author zhangzengwei@baidu.com
 */
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider.state('shell.templates.index_template1', {
        url: '/index_template1',
        params: {},
        views: {
            'templates': {
                template: require('./index.html'),
                controller: 'IndexController as ctrl',
                resolve: {
                    modules: [
                        '$q',
                        '$ocLazyLoad',
                        ($q, $ocLazyLoad) => $q(resolve => {
                            require.ensure([], () => {
                                let module = require('./index.controller');
                                $ocLazyLoad.load({name: module.name || module.default.name});
                                resolve(module);
                            }, 'index.bundle');
                        })
                    ]
                }
            }
        }
    });
}
