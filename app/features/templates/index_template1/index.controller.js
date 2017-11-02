/**
 * @file templates controller
 * @author zhangzengwei@baidu.com
 */
import './index.less';
import angular from 'angular';
import Utility from '../../../services/utility';
import serviceConfig from '../../../servicesConfig';
// import validator from '../../services/validator';

class IndexController {
    constructor($scope, $state, $stateParams, model) {
        this.$stateParams = $stateParams;
        this.model = model.setConfig(serviceConfig.DATASEARCH);
        this.init();
    }
    init() {
        this.indexInfo = {};
    }
    immediateUse(pm) {
        console.log('立即使用:' + pm);
    }
}

IndexController.$inject = ['$scope', '$state', '$stateParams', 'BaseModel'];

export default angular
    .module('index.controller', [])
    .controller('IndexController', IndexController);
