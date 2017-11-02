/**
 * @file framework controller
 * @author zhangyou04@baidu.com
 */
import './framework.less';
import angular from 'angular';
import servicesConfig from '../../servicesConfig';

class FrameworkController {
    constructor($scope, $q, model) {
        this.model = model.setConfig(servicesConfig.REPORT);
        this.$q = $q;
        this.style = {
            height: (window.innerHeight - 60) + 'px'
        };
        this.init();
    }

    init() {
        this.date = new Date();
        this.time = '10:29';
        this.dateStr = '2016-12-09';
        this.menus = [
            {
                id: 1,
                name: 'Commponents',
                showSub: true,
                items: [
                    {
                        id: 11,
                        name: 'Button'
                    },
                    {
                        id: 12,
                        name: 'Input'
                    }
                ]
            }
        ];
        // this.$q.all([
        //     this.model.getRiskData({type: 'home'})
        //         .then(data => {
        //             console.log(data);
        //             return data;
        //         }),
        //     this.model.getRiskData({type: 'expose'})
        //         .then(data => {
        //             console.log(data);
        //             return data;
        //         })
        //     ]
        // ).then((data) => {
        //     console.log('all', data);
        // });
    }

    toggleSubmenus(menu) {
        menu.showSub = !menu.showSub;
    }

    selectMenu(menu) {
        this.currentMenu = menu;
    }
}

FrameworkController.$inject = ['$scope', '$q', 'BaseModel'];

export default angular
    .module('framework.controller', [])
    .controller('FrameworkController', FrameworkController);

