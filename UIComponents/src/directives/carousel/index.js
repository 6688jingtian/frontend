
import {
    CarouselDirective,
    CarouselItemDirective
} from './carousel';

export default angular.module('ui.carousel', [])
    .directive('uiCarousel', CarouselDirective.getInstance)
    .directive('uiCarouselItem', CarouselItemDirective.getInstance)
    .name;
