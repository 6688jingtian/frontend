/**
 * @file templates controller
 * @author zhangzengwei@baidu.com
 */
import './templates.less';
import angular from 'angular';
import Utility from '../../services/utility';
import serviceConfig from '../../servicesConfig';
import validator from '../../services/validator';
import icon from '../../directives/icon';
import button from '../../directives/button';
import carousel from '../../directives/carousel';
import flex from './otherComponents/flexLayout';
import foldable from './otherComponents/foldableLayout';

let app = angular.module('app');
class TemplatesController {
    constructor($scope, $state, $stateParams, $filter, model) {
        this.$stateParams = $stateParams;
        this.model = model.setConfig(serviceConfig.DATASEARCH);
        this.init($scope, $filter);
    }
    init($scope, $filter) {
        // console.log(this.$stateParams);
        this.templateInfo = {
            // curType: this.$stateParams.type || null,
            flexLayout: {
                paramDesc: [
                    {
                        param: 'flex-align',
                        type: 'string',
                        note: '可选，排列对齐方式:row(水平排列), row-center(水平排列居中),'
                            + 'row-center-center(水平排列两方向居中), row-wrap(水平排列换行),'
                            + 'column(垂直排列), column-center(垂直排列居中),'
                            + 'column-center-center(垂直排列两方向居中)',
                        defaultValue: 'row'
                    }
                ]
            }
        };
    }
}

TemplatesController.$inject = ['$scope', '$state', '$stateParams', '$filter', 'BaseModel'];

export default angular
    .module('templates.controller', [icon, button, carousel, flex, foldable])
    .controller('TemplatesController', TemplatesController);
