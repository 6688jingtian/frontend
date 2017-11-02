/**
 * @file components controller
 * @author zhangyou04@baidu.com
 */
import './components.less';
import angular from 'angular';

class ComponentsController {
    constructor($scope, $sce) {
        this.style = {
            height: window.innerHeight - 66
        };
        if (new RegExp(location.host, 'i').test('qaep.baidu.com')) {
            this.componentsUrl = '/components';
        }
        else if (new RegExp(location.host, 'i').test('qaep.baidu.com:8580')) {
            this.componentsUrl = '/dist';
        }
        else {
            setTimeout(() => {
                $('iframe').attr('src', location.protocol + '//' + location.hostname + ':8888/dist');
            }, 50);
            //this.componentsUrl = location.protocol + '//' + location.hostname + ':8888/dist'
        }
    }
}

ComponentsController.$inject = ['$scope', '$sce'];

export default angular
    .module('components.controller', [])
    .controller('ComponentsController', ComponentsController);

