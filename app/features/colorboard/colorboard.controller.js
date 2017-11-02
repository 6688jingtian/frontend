/**
 * @file datasearch controller
 * @author zhangyou04@baidu.com
 */

import './colorboard.less';
import angular from 'angular';
import palette from './palette';

// let app = angular.module('app');
class ColorboardController {
    constructor() {
        this.init();
    }

    init($filter) {
        angular.extend(
            this,
            {
                tree: {
                    selectedNodes: [2],
                    data: [
                        {
                            id: 1,
                            name: 'Label 1',
                            children: [
                                {
                                    id: 11,
                                    name: 'Label 11'
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: 'Label 2',
                            children: [
                                {
                                    id: 21,
                                    name: 'Label3'
                                },
                                {
                                    id: 22,
                                    name: 'Label4'
                                }
                            ]
                        }

                    ]
                },
                table: {
                    cols: [
                        {
                            key: 'id',
                            name: 'ID'
                        },
                        {
                            key: 'name',
                            name: 'Name'
                        },
                        {
                            key: 'state',
                            name: 'State'
                        },
                        {
                            key: 'operation',
                            name: 'Operation',
                            template: [
                                '<a>编辑</a>',
                                '<a>删除</a>'
                            ].join(' ')
                        }
                    ],
                    rows: [
                        {
                            id: 1,
                            name: 'Benard Zhang',
                            state: 'on'
                        },
                        {
                            id: 1,
                            name: 'Bruce Xu',
                            state: 'on'
                        },
                        {
                            id: 1,
                            name: 'Lannard Shi',
                            state: 'off'
                        }
                    ]
                },
                dropdown: {
                    data: [
                        {
                            id: 1,
                            name: 'level 1: 1',
                            children: [
                                {
                                    id: 11,
                                    name: 'level 2: 1',
                                    children: [
                                        {
                                            id: 111,
                                            name: 'level 3: 1',
                                            disabled: true
                                        },
                                        {
                                            id: 112,
                                            name: 'level 3: 2'
                                        }
                                    ]
                                },
                                {
                                    id: 12,
                                    name: 'level 2: 2'
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: 'level 1: 2',
                            children: [
                                {
                                    id: 21,
                                    name: 'level 2: 1',
                                    children: [
                                        {
                                            id: 211,
                                            name: 'level 3: 1'
                                        },
                                        {
                                            id: 212,
                                            name: 'level 3: 2'
                                        }
                                    ]
                                },
                                {
                                    id: 22,
                                    name: 'level 2: 2',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
                checkbox: {
                    checked: true
                },
                colors: [
                    {
                        name: 'red',
                        color: '#d84315',
                        style: {
                            backgroundColor: '#d84315'
                        },
                        variables: palette['#d84315']
                    },
                    {
                        name: 'deeporange',
                        color: '#ef6c00',
                        style: {
                            backgroundColor: '#ef6c00'
                        },
                        variables: palette['#ef6c00']
                    },
                    {
                        name: 'gold',
                        color: '#fdd835',
                        selected: true,
                        style: {
                            backgroundColor: '#fdd835'
                        },
                        variables: palette['#fdd835']
                    },
                    {
                        name: '#c0ca33',
                        color: '#c0ca33',
                        style: {
                            backgroundColor: '#c0ca33'
                        },
                        variables: palette['#c0ca33']
                    },
                    {
                        name: '#558b2f',
                        color: '#558b2f',
                        style: {
                            backgroundColor: '#558b2f'
                        },
                        variables: palette['#558b2f']
                    },
                    {
                        name: '#2e7d32',
                        color: '#2e7d32',
                        style: {
                            backgroundColor: '#2e7d32'
                        },
                        variables: palette['#2e7d32']
                    },
                    {
                        name: '#00897b',
                        color: '#00897b',
                        style: {
                            backgroundColor: '#00897b'
                        },
                        variables: palette['#00897b']
                    },
                    {
                        name: '#0091ea',
                        color: '#0091ea',
                        style: {
                            backgroundColor: '#0091ea'
                        },
                        variables: palette['#0091ea']
                    },
                    {
                        name: '#0277bd',
                        color: '#0277bd',
                        style: {
                            backgroundColor: '#0277bd'
                        },
                        variables: palette['#0277bd']
                    },
                    {
                        name: '#0561a0',
                        color: '#0561a0',
                        style: {
                            backgroundColor: '#0561a0'
                        },
                        variables: palette['#0561a0']
                    },
                    {
                        name: '#2f3e89',
                        color: '#2f3e89',
                        style: {
                            backgroundColor: '#2f3e89'
                        },
                        variables: palette['#2f3e89']
                    },
                    {
                        name: '#3a3a3a',
                        color: '#3a3a3a',
                        style: {
                            backgroundColor: '#3a3a3a'
                        },
                        variables: palette['#3a3a3a']
                    }
                ]
            }
        );
        this.selectedColor = this.colors[2];
        console.log('variables', this.selectedColor.variables);
    }

    onSelectColor(color) {
        console.log('onSelectColor', color);
        this.selectedColor = color;
    }

    getVariableStyle(variable, key) {
        return {
            backgroundColor: variable
        };
    }
}

ColorboardController.$inject = ['$filter', 'BaseModel'];

export default angular
    .module('colorboard.controller', [])
    .controller('ColorboardController', ColorboardController);
