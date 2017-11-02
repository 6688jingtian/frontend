/**
 * @file framework routers
 * @author zhangyou04@baidu.com
 */
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider.state('shell.framework', {
        url: 'framework',
        views: {
            'content@': {
                template: require('./framework.html'),
                controller: 'FrameworkController as ctrl',
                resolve: {
                    modules: [
                        '$q',
                        '$ocLazyLoad',
                        ($q, $ocLazyLoad) => $q(resolve => {
                            require.ensure([], () => {
                                let module = require('./framework.controller');
                                $ocLazyLoad.load({name: module.name || module.default.name});
                                resolve(module);
                            }, 'framework.bundle');
                        })
                    ]
                }
            }
        }
    });
}
