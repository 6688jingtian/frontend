/**
 * @file templates routers
 * @author zhangyou04@baidu.com
 */
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider.state('shell.colorboard', {
        url: 'colorboard',
        views: {
            'content@': {
                template: require('./colorboard.html'),
                controller: 'ColorboardController as ctrl',
                resolve: {
                    modules: [
                        '$q',
                        '$ocLazyLoad',
                        ($q, $ocLazyLoad) => $q(resolve => {
                            require.ensure([], () => {
                                let module = require('./colorboard.controller');
                                $ocLazyLoad.load({name: module.name || module.default.name});
                                resolve(module);
                            }, 'templates.bundle');
                        })
                    ]
                }
            }
        }
    });
}
