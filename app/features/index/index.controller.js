/**
 * @file index controller
 * @author zhangyou04@baidu.com
 */
import './index.less';
import angular from 'angular';
import utility from '../../services/utility';

class IndexController {
    constructor($scope, $state) {
        this.name = 'IndexController';
        this.style = {
            height: '600px'
        };
        this.$state = $state;
        let $document = $(document);
        let $header = $document.find('body header.header');
        let $sections = document.querySelectorAll('.index-view > section:not(:first-child)');
        let scrollHandle = function (e) {
            $header.toggleClass('header-top', $document.scrollTop() < 50);
            $sections.forEach(el => {
                let isDomInViewport = utility.isDomInViewport(el, true);
                $(el).find('> div:nth-child(1)').toggleClass('animated slideInLeft active', isDomInViewport);
                $(el).find('> div:nth-child(2)').toggleClass('animated slideInRight active', isDomInViewport);
            });
        };

        this.init();

        $document.on('scroll', scrollHandle);

        $scope.$on('pagechange', function (evt, preView, currentView) {
            if (preView === '/index') {
                $document.on('scroll', scrollHandle);
            }
        });
    }

    init() {
        this.slides = [
            {
                title: '前端脚手架',
                description: '基于Angular + ES6 构建的单页应用骨架',
                hash: 'shell.framework',
                active: true
            },
            {
                title: 'UI组件库',
                description: '丰富的可复用UI组件支持, 使用简单扩展方便',
                hash: 'shell.components',
            },
            {
                title: 'UI设计模板',
                description: '常见页面布局UI设计模版',
                hash: 'shell.templates',
            }
        ];
    }

    selectSlide(slide) {
        this.$state.go(slide.hash);
    }
}

IndexController.$inject = ['$scope', '$state'];

export default angular
    .module('index.controller', [])
    .controller('IndexController', IndexController);

