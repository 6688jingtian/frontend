/**
 * @file index routers
 * @author zhangyou04@baidu.com
 */
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider.state('shell.index', {
        url: 'index',
        views: {
            'content@': {
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
