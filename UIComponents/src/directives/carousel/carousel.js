/**
 * @file carousel directive
 * @author zhangyou04@baidu.com
 */

import './carousel.less';

class CarouselController {
    constructor($scope, $element, $attrs, $interval, $timeout) {
        //console.log('CarouselController', $scope.$id, this);
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.$scope.slides = this.$scope.slides  || [];
    }

    startAnimate(delaySeconds, defaultIndex) {
        let slideIndex = defaultIndex || 0;
        let slides = this.$scope.slides;

        this.$scope.preAcitiveIndex = -1;
        this.$scope.activeIndex = slideIndex;
        this.$scope._timmer = this.$interval(() => {
            slideIndex = (slideIndex + 1) % slides.length;
            this.$scope.preActiveIndex = this.$scope.activeIndex;
            this.$scope.activeIndex = slideIndex;
            this.switchByIndex(slideIndex, slides);
        }, delaySeconds * 1000);
        return this;
    }

    isPlaying() {
        return !!this.$scope._timmer;
    }

    restartAnimate(seconds, index) {
        seconds = seconds || 5;
        index = index || 0;
        this.stopAnimation();
        this.startAnimate(seconds, index);
    }

    stopAnimation() {
        this.$interval.cancel(this.$scope._timmer);
        this.$scope._timmer = undefined;
    }

    switchByIndex(index, slides) {
        slides = slides || this.$scope.slides;

        let slideIndex = index;
        let preSlide = this.$element.find('.item.active');
        //let preSlide = slides.eq(this.$scope.preActiveIndex);
        let animationNames = this.getAnimationNames(this.$attrs.animate);
        let currentSlide = $(slides[slideIndex]);
        let animateIn = animationNames.in;
        let animateOut = animationNames.out;
        let animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        let addAnimationInEvent = (currentSlide) => {
            this.$scope.activeIndex = index;
            currentSlide.addClass(animateIn + ' animated active in');
            currentSlide.off(animationEndEvent).on(animationEndEvent, evt => {
                $(evt.currentTarget).removeClass(animateIn + ' animated in');
                this.$scope.isInAnimation = false;
                if (this.$scope.pendingAnimations
                    && this.$scope.pendingAnimations.length) {
                    //console.log('invoke queue animation', this.$scope.pendingAnimations);
                    this.switchByIndex(this.$scope.pendingAnimations.shift(), slides);
                    //console.log('after invoke queue animation', this.$scope.pendingAnimations);
                }
            });
        };
        let isInOutAtSameTime = /slide/.test(animateIn);
        //this.$scope.activeIndex = index;
        this.$scope.isInAnimation = true;
        preSlide.addClass(animateOut + ' animated');
        preSlide.off(animationEndEvent).on(
            animationEndEvent,
            evt => {
                $(evt.currentTarget).removeClass(animateOut + ' animated active');
                !isInOutAtSameTime && addAnimationInEvent(currentSlide);
            }
        );
        isInOutAtSameTime && addAnimationInEvent(currentSlide);
    }

    getAnimationNames(animation) {
        let animationNames = {
            in: 'slideInRight',
            out: 'slideOutLeft'
        };
        switch (animation) {
            case 'zoom':
                animationNames = {
                    in: 'zoomIn',
                    out: 'zoomOut'
                };
                break;
            case 'slide':
                break;
        }
        return animationNames;
    }

    addItem(item, element) {
        element.addClass('item');
        this.$scope.slides.push(element);
        //console.log('addItem', this.$scope.slides.length);
        //this.$scope.slides = this.slides;
        console.log(this.$scope.activeIndex);
        if (this.$scope.slides.length === 1) {
            element.addClass('active');
        }
        //if (!this.isPlaying()) {
        //    console.log('start in add');
        //    this.startAnimate(3, 0);
        //}
    }
}

CarouselController.$inject = ['$scope', '$element', '$attrs', '$interval', '$timeout'];

class CarouselDirective {
    constructor($interval, $timeout) {
        console.log('CarouselDirective');
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.replace = true;
        this.scope = true;
        this.transclude = true;
        this.template = require('./carousel.html');
        this.controller = CarouselController;
    }

    link(scope, element, attrs, ctrl) {
        console.log('CarouselDirective link');
        let animationTime = +attrs.time || 3;
        let start = +attrs.start || 1;
        let isStatic = attrs.static === 'true';
        scope.isStatic = isStatic;
        scope.slides = element.find('div[ng-transclude] > *').addClass('item');
        //ctrl.slides = scope.slides;
        console.log('scope.slides', scope.slides.length);
        scope.onChange = index => {
            scope.slides = scope.slides && scope.slides.length ? scope.slides : element.find('div[ng-transclude] > *');
            index = index % scope.slides.length;
            index = index < 0 ? index + scope.slides.length : index;
            if (index !== scope.activeIndex) {
                if (!scope.isInAnimation) {
                    ctrl.switchByIndex(index);
                    if (!isStatic) {
                        ctrl.restartAnimate(animationTime, index);
                    }
                }
                //else { // add to queue
                //    scope.pendingAnimations = scope.pendingAnimations || [];
                //    scope.pendingAnimations.push(index);
                //}
            }
        };

        scope.activeIndex = Math.max(start - 1, 0);
        if (!isStatic && scope.slides.length) {
            ctrl.startAnimate(animationTime, scope.activeIndex);
        }
    }

    static getInstance($interval, $timeout) {
        CarouselDirective.instance = new CarouselDirective($interval, $timeout);
        return CarouselDirective.instance;
    }
}

CarouselDirective.getInstance.$inject = ['$interval', '$timeout'];

class CarouselItemDirective {
    constructor($timeout) {
        this.restrict = 'EA';
        //this.priority = 1001;
        this.require = '^uiCarousel';
        this.$timeout = $timeout;
    }

    link(scope, element, attrs, carouselCtrl) {
        carouselCtrl.addItem(scope, element);
        console.log('add item');
    }

    static getInstance($timeout) {
        return new CarouselItemDirective($timeout);
    }
}

CarouselItemDirective.getInstance.$inject = ['$timeout'];

exports.CarouselDirective = CarouselDirective;
exports.CarouselItemDirective = CarouselItemDirective;
