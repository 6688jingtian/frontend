/**
 * @file searchfield directvie entry
 * @author zhangyou04@baidu.com
 */

// import angular from 'angular';
import SearchField from './searchField';

export default angular.module('ui.searchField', [])
    .directive('uiSearchField', SearchField.getInstance)
    .name;
