/**
 * @file dialog directive
 * @author zhangyou04@baidu.com
 */

import './dialog.less';

class DialogController {
    constructor($scope) {
        this.$scope = $scope;
    }

    onOk(evt) {
        angular.isFunction(this.$scope.onOk) && this.$scope.onOk(evt);
        this.close();
    }

    onCancel(evt) {
        angular.isFunction(this.$scope.onCancel) && this.$scope.onCancel(evt);
        this.close();
    }

    close() {
        angular.isFunction(this.$scope.onBeforeClose) && this.$scope.onBeforeClose(evt);
        this.$scope.option.visible = false;
        angular.isFunction(this.$scope.onAfterClose) && this.$scope.onAfterClose(evt);
    }
}

DialogController.$inject = ['$scope'];


class DialogDirective {
    constructor() {
        this.restrict = 'AE';
        this.transclude = true;
        this.replace = true;
        this.scope = {
            option: '=',
            onCancel: '=',
            onOk: '=',
            onBeforeClose: '=',
            onAfterClose: '='
        };
        this.template = require('./dialog.html');
        this.controller = DialogController;
    }

    link(scope, element, attrs, ctrl) {
        angular.extend(scope, {
            okHandle: ctrl.onOk.bind(ctrl),
            cancelHandle:  ctrl.onCancel.bind(ctrl)
        });
    }

    static getInstance() {
        DialogDirective.instance = new DialogDirective();
        return DialogDirective.instance;
    }
}

DialogDirective.getInstance.$inject = [];

module.exports = DialogDirective;
