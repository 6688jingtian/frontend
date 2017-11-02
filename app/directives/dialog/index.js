/**
 * @file dialog directive entry
 * @author zhangyou04@baidu.com
 *
 * scope: {
 *     option: {
 *         title: string,
 *         visible: boolean,
 *         okText: string,
 *         cancelText: string,
 *         actions: [
 *              {
 *                  name: string,
 *                  onClick: Function
 *              }
 *         ]
 *     },
 *     onOk: Function,
 *     onCancel: Function,
 *     onBeforeClose: Function,
 *     onAfterClose: Function
 * }
 */

// import angular from 'angular';
import DialogDirective from './dialog';

export default angular.module('ui.dialog', [])
    .directive('uiDialog', DialogDirective.getInstance)
    .name;
