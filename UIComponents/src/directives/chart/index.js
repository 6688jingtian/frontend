// import angular from 'angular';
import EchartDirective from './echart';
import TableChartDirective from './table';

export default angular.module('directives.echart', [])
    .directive('echart', () => new EchartDirective())
    .directive('tableChart', () => new TableChartDirective())
    .name;
