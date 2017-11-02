/**
 * @file app config
 * @author zhangyou04@baidu.com
 */
import 'angular';

config.$inject = ['$urlRouterProvider', '$locationProvider',];

export default function config($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    // $urlRouterProvider.otherwise('/index');
    $urlRouterProvider.otherwise(($injector, $location) => {
        return '/index';
    });
}
