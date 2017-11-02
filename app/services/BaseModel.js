/**
 * @file BaseModel
 * @author zhangyou04@baidu.com
 */
import angular from 'angular';

class BaseModel {
    constructor($http, $q, config) {
        this.$http = $http;
        this.$q = $q;
        this.config = config || {};
        this.initMethodsByConfig(this.config);
        this.app = angular.module('app');
    }

    excute(config, callback, errorCallback, oCtx) {
        let that = this;
        let defer = this.$q.defer();

        that.app.toggleLoading(true && config.showLoading !== false);
        this.$http(config).success(function (response) {
            response.info = that.getInfoWithString(response.info);

            switch (response.status) {
                case 0: // sucess
                    callback && callback.call(oCtx, response.data || response.result, response);
                    defer.resolve(response.data || response.result);
                    break;
                case 2: // 302 redirect
                    // that.app.showConfirm(
                    //     response.message || '登录态过期，点击确定，去uuap登录',
                    //     () => {
                    //         location.href = (response.result && response.result.uuap || 'http://itebeta.baidu.com:8100') + '?service=' + location.href;
                    //     }
                    // );
                    location.href = (response.result && response.result.uuap || 'http://itebeta.baidu.com:8100') + '?service=' + location.href;
                    break;
                case 3: // no auth
                    that.app.showPopup(response.message || '无权限', true);
                    defer.reject(response.message || '无权限');
                    break;
                default: // other error
                    that.app.showPopup(response.message || '未知错误');
                    defer.reject(response.message || '未知错误');
                    break;
            }
            that.app.toggleLoading(false);
        }).error(function (data, status) {
            that.errorHandle(that.getErrorMsg(data, status), status);
            that.app.toggleLoading(false);
            defer.reject(that.getErrorMsg(data, status));
        });
        return defer.promise;
    }

    errorHandle(data, status, headers, config) {
        this.app.showPopup(this.getErrorMsg(data, status, headers, config));
        this.app.toggleLoading(false);
    }

    getErrorMsg(data, status, headers, config) {
        let errorMsg = 'status: ' + status + '\n';

        errorMsg += angular.isObject(data) ? JSON.stringify(data, null, 4) : data;

        return errorMsg;
    }

    getInfoWithString(info) {
        let msg = '';

        if (angular.isObject(info)) {
            for (let key in info) {
                msg += info[key] + ';';
            }
            msg = msg.substring(0, msg.length - 1);
        }
        else {
            msg = info;
        }

        return msg;
    }

    buildUrl(url, params) {
        let hasParamReg = /{.*}/i;

        // url += (url.indexOf('?') > -1 ? '&' : '?') + 'username={username}&token={token}';
        // angular.extend(params, app.userInfo);

        if (hasParamReg.test(url)) {
            for (let key in params) {
                let reg = new RegExp('{' + key + '}', 'i');
                if (hasParamReg.test(url) && reg.test(url)) {
                    url = url.replace(reg, params[key]);
                    delete params[key];
                }
            }
        }

        return url;
    }

    initMethodsByConfig(config) {
        let that = this;
        let value = '';

        for (let key in config) {
            value = config[key];

            if (angular.isObject(value)) {
                this[key] = (function (value) {
                    return function (params, callback, errorCallback, oCtx) {
                        params = params || {};
                        let showLoading = params.showLoading;
                        delete params.showLoading;
                        params = angular.copy(params);

                        return that.excute({
                            showLoading: showLoading,
                            method: (value.method || 'get'),
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            url: this.buildUrl(value.url, params),
                            data: params,
                            params: /get/i.test(value.method) ? params : ''
                        }, callback, errorCallback, oCtx);
                    };
                })(value);
            }
        }
    }

    ajax(config, callback, errorCallback, oCtx) {
        config.headers = {
            'X-Requested-With': 'XMLHttpRequest'
        };
        this.excute(config, callback, errorCallback, oCtx);
    }

    clone(config) {
        return new BaseModel(this.$http, this.$q, config);
    }

    setConfig(config) {
        this.initMethodsByConfig(config);
        return this;
    }
}

BaseModel.$inject = ['$http', '$q'];

export default angular.module('app.basemodel', [])
    .service('BaseModel', BaseModel)
    .name;
