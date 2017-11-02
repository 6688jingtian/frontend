/**
 * @file app bootstrap
 * @author zhangyou04@baidu.com
 */
import jquery from 'jquery';
import angular from 'angular';
import 'oclazyload';
import uirouter from 'angular-ui-router';
import directives from './directives';
import config from './app.config';
import shell from './features/shell';
import index from './features/index';
import framework from './features/framework';
import components from './features/components';
import templates from './features/templates';
import colorboard from './features/colorboard';
import basemodel from './services/BaseModel';
import servicesConfig from './servicesConfig';

window.$ = jquery;
let app = angular.module('app', [
    uirouter, 'oc.lazyLoad', directives, basemodel,
    shell, index, framework, components, templates, colorboard
]);

app.config(config)
    .value('SERVICESCONFIG', servicesConfig)
    .run(
        [
            '$http',
            '$rootScope',
            function ($http, $rootScope) {
                /**
                 * 全局popup提示显示影藏逻辑
                 * @type {Boolean}
                 */
                angular.extend($rootScope, {
                    showLoading: false,
                    contentStyle: {
                        minHeight: window.innerHeight - 60
                    }
                });

                $rootScope.$on('$stateChangeStart', function (evt, toState) {
                    $rootScope.isIndexView = toState.url === 'index';
                    $rootScope.isComponentsView = toState.url === 'components';
                });

                app.toggleLoading = function (isShow) {
                    $rootScope.showLoading = angular.isUndefined(isShow) ? !$rootScope.showLoading : isShow;
                };

                app.showPopup = (msg, noAuth, confirmCb) => {
                    alert(msg);

                    app.closePopup = function () {

                    };

                    app.showConfirm = function (msg, callback) {
                        app.showPopup(msg, false, callback);
                    };

                    app.forward = function (hash) {
                        location.hash = hash;
                    };

                    app.getUserInfo = function (key) {
                        return key ? $rootScope.userInfo[key] : $rootScope.userInfo;
                    };

                    app.toggleScrollable = isScrollable => {
                        $rootScope.isScrollable = angular.isUndefined(isScrollable)
                            ? !$rootScope.isScrollable : isScrollable;
                    };

                    // global error handle
                    window.onerror = function (errorMsg, filePath, line, col, errorObj) {
                        app.showPopup(errorMsg + '\n' + filePath + '\nline:' + line + ' col:' + col);
                    };

                    // 获取用户信息name & token
                    $.ajax({
                        method: 'get',
                        async: false,
                        url: servicesConfig.USER.getUser.url,
                        contentType: 'application/json',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }).then(function (data) {
                        switch (data.status) {
                            case 0:
                                app.userInfo = data.result;
                                $rootScope.userInfo = data.result;
                                break;
                            case 2: // ajax-redirected 302重定向
                                let uuap = data.result.uuap;
                                location.href = uuap.url + '?service='
                                    + location.protocol + '//' + location.host + '/login&appKey=' + uuap.appKey + '&hash=' + location.hash;
                                break;
                            case 3:
                                app.showPopup(data.message || '无权限', true);
                                break;
                            default:
                                app.showPopup(data.message || '未知错误');
                                break;
                        }
                    });
                }
            }
        ]
    );
