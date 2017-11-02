/**
 * @file templates routers
 * @author zhangyou04@baidu.com
 */
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider.state('shell.templates', {
        url: 'templates',
        params: {
            type: null
        },
        views: {
            'content@': {
                template: require('./templates.html'),
                controller: 'TemplatesController as ctrl',
                resolve: {
                    modules: [
                        '$q',
                        '$ocLazyLoad',
                        ($q, $ocLazyLoad) => $q(resolve => {
                            require.ensure([], () => {
                                let module = require('./templates.controller');
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
