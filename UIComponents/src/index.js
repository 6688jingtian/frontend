/**
 * @file Angular custom directives Demo
 * @author zhangyou04@baidu.com
 */

import './index.less';
import directives from './directives';

angular.module('test', [directives]).controller(
    'index',
    [
        '$scope', '$timeout', '$http', '$location',
        function ($scope, $timeout, $http, $location) {
            window.GLOBALSCOPE = $scope;
            $scope.getDisplayId = function (col, row) {
                return 'id-' + row[col.key];
            };
            $scope.getParamDesc = function (col, row) {
                return angular.isObject(row[col.key]) ? JSON.stringify(row[col.key], null, 4) : row[col.key];
            };
            var componentsData = {
                dropdown: [
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
                ],
                autocompletion: [
                    'bernard',
                    'bruce',
                    'alvy',
                    'alex',
                    'patrick',
                    'hello',
                    'petty',
                    'zhangyou',
                    'bernard zhang'
                ],
                mindmap: {
                    id: 1,
                    name: 'mindmap',
                    description: '性能场景看板',
                    children: [
                        {
                            id: 1,
                            name: 'name1',
                            children: [
                                {
                                    id: 11,
                                    name: 'xxx2'
                                },
                                {
                                    id: 11,
                                    name: 'xxx2"'
                                },
                                {
                                    id: 11,
                                    name: 'xxx2'
                                }
                            ]
                        }
                    ]
                },
                simpleJsonDiff: {
                    expect: {
                        id: 1,
                        name: 'zhangyou',
                        info: {
                            height: '170cm',
                            weight: 54
                        },
                        skills: [
                            {
                                id: 1,
                                languge: 'C/C++'
                            },
                            {
                                id: 2,
                                languge: 'Java'
                            },
                            {
                                id: 3,
                                languge: '...'
                            }
                        ],
                        status: 'single'
                    },
                    actual: {
                        id: 2,
                        name: 'bernard zhang',
                        info: {
                            height: '170cm',
                            weight: 61
                        },
                        skills: [
                            {
                                id: 1,
                                languge: 'JavaScript'
                            },
                            {
                                id: 2,
                                languge: 'HTML/CSS'
                            },
                            {
                                id: 3,
                                languge: 'Java'
                            }
                        ],
                        other: 'other info'
                    }
                },
                treeview: [
                    {
                        id: 1,
                        name: 'node1',
                        children: [
                            {
                                id: 11,
                                name: 'node11',
                                children: [
                                    {
                                        id: 111,
                                        name: 'node111'
                                    },
                                    {
                                        id: 112,
                                        name: 'node112'
                                    }
                                ]
                            },
                            {
                                id: 12,
                                name: 'node12',
                                children: [
                                    {
                                        id: 121,
                                        name: 'node121'
                                    },
                                    {
                                        id: 122,
                                        name: 'node122'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: 'node2',
                        children: [
                            {
                                id: 21,
                                name: 'node21',
                                children: [
                                    {
                                        id: 211,
                                        name: 'node211'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                table: {
                    height: 500,
                    tableLayoutFixed: true,
                    fixedHeader: true,
                    withBorder: true,
                    colResizable: true,
                    size: 'small',
                    sizes: [
                        'small',
                        'middle',
                        'large'
                    ],
                    cols: [
                        {
                            key: 'col1',
                            name: 'id',
                            template: '<span>{{getDisplayId(col, row)}}</span>'
                        },
                        {
                            key: 'col2',
                            name: 'Column2',
                            template: '<input ng-model="row[col.key]" />'
                        },
                        {
                            key: 'col3',
                            name: 'Column3',
                            template: '<input set-focus="false" key="col3" ng-model="row[col.key]">'
                        },
                        {
                            key: 'col4',
                            name: 'Column4'
                        }
                    ],
                    rows: [
                        {
                            col1: 1,
                            col2: 'Hello world',
                            col3: 'Hello3',
                            col4: 'Hello3',
                            getDisplayId: $scope.getDisplayId
                        },
                        {
                            col1: 2,
                            col2: 'Hey man',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 3,
                            col2: 'What\'s wrong man?',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 4,
                            col2: 'Hello wepback',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 5,
                            col2: 'Hello kitty',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 6,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 7,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 8,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 9,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 10,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 11,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 12,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 13,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 14,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 15,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 16,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 17,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 18,
                            col2: 'Hello2',
                            col3: 'Hello3',
                            col4: 'Hello3'
                        },
                        {
                            col1: 19,
                            col2: 'Hello2',
                            col3: 'Hello3'
                        },
                        {
                            col1: 20,
                            col2: 'Hello2',
                            col3: 'Hello3'
                        },
                        {
                            col1: 21,
                            col2: 'Hello2',
                            col3: 'Hello3'
                        },
                        {
                            col1: 22,
                            col2: 'Hello2',
                            col3: 'Hello3'
                        },
                        {
                            col1: 23,
                            col2: 'Hello2',
                            col3: 'Hello3'
                        }
                    ]
                },
                directedGraph: [
                    {
                        // height: window.innerHeight - 40,
                        id: 1,
                        name: '有向图',
                        nodes: [
                            {
                                "id": 17,
                                "name": "rgc",
                                "deps": []
                            },
                            {
                                "id": 14,
                                "name": "gps"
                            },
                            {
                                "id": 4,
                                "name": "server"
                            },
                            {
                                "id": 13,
                                "name": "tag_redis"
                            },
                            {
                                "id": 8,
                                "name": "lbs"
                            },
                            {
                                "id": 3,
                                "name": "cpa",
                                "deps": []
                            },
                            {
                                "id": 7,
                                "name": "server",
                                "deps": []
                            },
                            {
                                "id": 15,
                                "name": "sa",
                                "deps": []
                            },
                            {
                                "id": 20,
                                "name": "erised",
                                "deps": []
                            },
                            {
                                "id": 11,
                                "name": "bs",
                                "deps": []
                            },
                            {
                                "id": 12,
                                "name": "ui",
                                "deps": []
                            },
                            {
                                "id": 16,
                                "name": "ubmc"
                            },
                            {
                                "id": 1,
                                "name": "bfp4app",
                                "deps": [
                                    {
                                        "id": 8
                                    },
                                    {
                                        "id": 4
                                    },
                                    {
                                        "id": 14
                                    },
                                    {
                                        "id": 17
                                    },
                                    {
                                        "id": 2
                                    }
                                ]
                            },
                            {
                                "id": 9,
                                "name": "mdsp_ctr"
                            },
                            {
                                "id": 18,
                                "name": "ui"
                            },
                            {
                                "id": 10,
                                "name": "wall",
                                "deps": []
                            },
                            {
                                "id": 2,
                                "name": "as",
                                "deps": [
                                    {
                                        "id": 1
                                    },
                                    {
                                        "id": 3
                                    },
                                    {
                                        "id": 4
                                    },
                                    {
                                        "id": 5
                                    },
                                    {
                                        "id": 9
                                    },
                                    {
                                        "id": 10
                                    },
                                    {
                                        "id": 13
                                    },
                                    {
                                        "id": 16
                                    },
                                    {
                                        "id": 19
                                    },
                                    {
                                        "id": 11
                                    },
                                    {
                                        "id": 7
                                    },
                                    {
                                        "id": 20
                                    }
                                ]
                            },
                            {
                                "id": 6,
                                "name": "as",
                                "deps": []
                            },
                            {
                                "id": 21,
                                "name": "as",
                                "deps": []
                            },
                            {
                                "id": 5,
                                "name": "render",
                                "deps": []
                            },
                            {
                                "id": 19,
                                "name": "mdsp_cvr",
                                "deps": []
                            }
                        ]
                    },
                    {
                        // height: window.innerHeight - 40,
                        "id": 2,
                        "name": "网盟拓扑图",
                        "description": "",
                        "nodes": [
                            {
                                "id": 12,
                                "name": "ui(lu)",
                                "color": "#00bfa5",
                                "deps": []
                            },
                            {
                                "id": 3,
                                "name": "bfp4app(ssp)",
                                "color": "#2ecc71",
                                "deps": []
                            },
                            {
                                "id": 16,
                                "name": "mdsp_cvr(ps)",
                                "color": "#3498db",
                                "deps": []
                            },
                            {
                                "id": 10,
                                "name": "wall(mdsp)",
                                "color": "#9b59b6",
                                "deps": []
                            },
                            {
                                "id": 13,
                                "name": "tag_redis(mdsp)",
                                "color": "#9b59b6",
                                "deps": []
                            },
                            {
                                "id": 4,
                                "name": "cpa(mdsp)",
                                "color": "#9b59b6",
                                "deps": []
                            },
                            {
                                "id": 2,
                                "name": "as(mdsp)",
                                "color": "#9b59b6",
                                "deps": [
                                    {
                                        "id": 4
                                    },
                                    {
                                        "id": 13
                                    },
                                    {
                                        "id": 5
                                    },
                                    {
                                        "id": 14
                                    },
                                    {
                                        "id": 9
                                    },
                                    {
                                        "id": 11
                                    },
                                    {
                                        "id": 6
                                    },
                                    {
                                        "id": 16
                                    },
                                    {
                                        "id": 3
                                    },
                                    {
                                        "id": 10
                                    },
                                    {
                                        "id": 8
                                    }
                                ]
                            },
                            {
                                "id": 17,
                                "name": "as(lu)",
                                "color": "#00bfa5",
                                "deps": []
                            },
                            {
                                "id": 8,
                                "name": "server(dmp)",
                                "color": "#f39c12",
                                "deps": []
                            },
                            {
                                "id": 11,
                                "name": "bs(mdsp)",
                                "color": "#9b59b6",
                                "deps": []
                            },
                            {
                                "id": 7,
                                "name": "as(nova)",
                                "color": "#c0392b",
                                "deps": []
                            },
                            {
                                "id": 6,
                                "name": "render(mdsp)",
                                "color": "#9b59b6",
                                "deps": []
                            },
                            {
                                "id": 1,
                                "name": "sa(ssp)",
                                "color": "#2ecc71",
                                "deps": []
                            },
                            {
                                "id": 15,
                                "name": "ui(nova)",
                                "color": "#c0392b",
                                "deps": []
                            },
                            {
                                "id": 5,
                                "name": "server(adx)",
                                "color": "#ffdc35",
                                "deps": []
                            },
                            {
                                "id": 14,
                                "name": "ubmc(ubmc)",
                                "color": "#105036",
                                "deps": []
                            },
                            {
                                "id": 9,
                                "name": "mdsp_ctr(ps)",
                                "color": "#3498db",
                                "deps": []
                            }
                        ]
                    }
                ],
                d3LayoutTree: {
                    "name": "UB技术地图",
                    "children": [
                        {
                            "name": "数据测试",
                            "children": [
                                {
                                    "name": "赵雅琼",
                                    "hovor": {
                                        "topicName": "大数据测试平台",
                                        "content": "大数据线下正确性测试和线上监控定位的平台，包含拓扑分析，全面提供大数据线下和线上测试能力。",
                                        "link": "http://10.95.40.17:8011/info"
                                    }
                                },{
                                    "name": "李思",
                                    "hovor": {
                                        "topicName": "大数据系统级计算验证",
                                        "content": "支持多维度数据源定制、资源动态调度、结果分布式校验和debug问题排查等，自动化解决商业数据产品计算层复杂算法、模型的正确性校验和排查问题",
                                        "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=290003104"
                                    }
                                }
                            ]
                        },
                        {
                            "name": "问题定位",
                            "children": [
                                {
                                    "name": "指标体系建设",
                                    "children": [
                                        {
                                            "name": "赵雅琼",
                                            "hovor": {
                                                "topicName": "流量磨损",
                                                "content": "流量磨损：对网盟流量磨损进行分析，可以用于排查、监控等",
                                                "link": ""
                                            }
                                        },{
                                            "name": "杨丹",
                                            "hovor": {
                                                "topicName": "SLA监控",
                                                "content": "SLA监控专题，对系统稳定性进行监控和预警",
                                                "link": "http://usi.baidu.com/usi3.0#/monitor/slasearchdis"
                                            }
                                        }
                                    ]
                                },{
                                    "name": "平台构建",
                                    "children": [
                                        {
                                            "name": "杨丹",
                                            "hovor": {
                                                "topicName": "USI",
                                                "content": "网盟监控平台",
                                                "link": "http://usi.baidu.com/usi3.0"
                                            }
                                        },{
                                            "name": "张鹏飞",
                                            "hovor": {
                                                "topicName": "【原生广告】监控与排查",
                                                "content": "http://naotu.baidu.com/file/1028669461720d4b58ab6475769a8fa9?token=1596192527a979be",
                                                "link": "http://nadebug.baidu.com"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "系统监控",
                            "children": [
                                {
                                    "name": "指标体系建设",
                                    "children": [
                                        {
                                            "name": "赵雅琼",
                                            "hovor": {
                                                "topicName": "流量磨损",
                                                "content": "流量磨损：对网盟流量磨损进行分析，可以用于排查、监控等",
                                                "link": ""
                                            }
                                        },
                                        {
                                            "name": "胡陈豪",
                                            "hovor": {
                                                "topicName": "流量分析",
                                                "content": "流量监控：建立流量磨损、合理性监控，提高流量利用率和效果",
                                                "link": ""
                                            }
                                        },{
                                            "name": "王琴、俞莉花",
                                            "hovor": {
                                                "topicName": "Java Trace多维度性能分析",
                                                "content": "对线上系统海量数据实时监控，分析。基于数据进行模型建立，性能痛点模型直观呈现。",
                                                "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=42746967"
                                            }
                                        }
                                    ]
                                }, {
                                    "name": "监控平台建设",
                                    "children": [
                                        {
                                            "name": "杨丹",
                                            "hovor": {
                                                "topicName": "USI",
                                                "content": "网盟监控平台",
                                                "link": "http://usi.baidu.com/usi3.0"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "问题定位",
                            "children": [
                                {
                                    "name": "指标体系建设",
                                    "children": [
                                        {
                                            "name": "赵雅琼",
                                            "hovor": {
                                                "topicName": "流量磨损",
                                                "content": "流量磨损：对网盟流量磨损进行分析，可以用于排查、监控等",
                                                "link": ""
                                            }
                                        }
                                    ]
                                },{
                                    "name": "平台构建",
                                    "children": [
                                        {
                                            "name": "翁寒一",
                                            "hovor": {
                                                "topicName": "具有录入功能的排查系统",
                                                "content": "设计具有录入功能的排查系统，实现排查树的自增长；命令行交互，计划向hi服务号靠拢， 做到自主排查 -> 自动排查 良性循环",
                                                "link": ""
                                            }
                                        }
                                    ]
                                },{
                                    "name": "客户&系统问题定位",
                                    "children": [
                                        {
                                            "name": "遆菲菲",
                                            "hovor": {
                                                "topicName": "网盟排查平台",
                                                "content": "平台提供通用的数据分析（数据库查询、大数据分析等）、系统DEBUG、排查结果组织展示等能力，开发者通过页面配置排查需求，调用平台基础排查能力开发API组织业务逻辑便可快速实现排查方案的落地；对于用户可以通过WEB或者API方式提交排查任务及查看结果",
                                                "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=35953392"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "评测",
                            "children": [
                                {
                                    "name": "策略分析",
                                    "children": [
                                        {
                                            "name": "邓凯仁",
                                            "hovor": {
                                                "topicName": "丘比特项目",
                                                "content": "对网盟客户投放进行分析，通过受众联系媒体和广告主，挖掘不合理投放，优化投放效果",
                                                "link": "http://cupid.baidu.com:8080/cupidplat/tasks/index"
                                            }
                                        },{
                                            "name": "董瑛",
                                            "hovor": {
                                                "topicName": "【原生广告】变现效果评测",
                                                "content": "",
                                                "link": ""
                                            }
                                        }
                                    ]
                                },
                                {
                                    "name": "app破解",
                                    "children": [
                                        {
                                            "name": "赵雅琼",
                                            "hovor": {
                                                "topicName": "先知",
                                                "content": "先知：APP流量大盘分析，提供流量线索",
                                                "link": "http://seer.baidu.com/"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "name": "竞品对比",
                                    "children": [
                                        {
                                            "name": "赵雅琼",
                                            "hovor": {
                                                "topicName": "先知",
                                                "content": "先知：APP流量大盘分析，提供流量线索",
                                                "link": "http://seer.baidu.com/"
                                            }
                                        }
                                    ]
                                },
                                {
                                    "name": "流量分析",
                                    "children": [
                                        {
                                            "name": "赵雅琼",
                                            "hovor": {
                                                "topicName": "先知",
                                                "content": "先知：APP流量大盘分析，提供流量线索",
                                                "link": "http://seer.baidu.com/"
                                            }
                                        },
                                        {
                                            "name": "李思",
                                            "hovor": {
                                                "topicName": "媒体优化专家",
                                                "content": "通过圈定相似代码位，对媒体广告位样式设置、页面布局、页面内容等进行策略优化，集成到union、ssp等媒体端",
                                                "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=270472958"
                                            }
                                        },
                                        {
                                            "name": "李雅玉",
                                            "hovor": {
                                                "topicName": "内容联盟评测",
                                                "content": "内容联盟评测体系构建",
                                                "link": ""
                                            }
                                        }
                                    ]
                                },
                                {
                                    "name": "平台构建",
                                    "children": [
                                        {
                                            "name": "戴优丽",
                                            "hovor": {
                                                "topicName": "SAT（定制化物料质量平台）",
                                                "content": "线下服务及物料准入，线上动态物料监控，线上服务监控",
                                                "link": "http://agroup.baidu.com/sat/file/view/18713"
                                            }
                                        },{
                                            "name": "李雅玉",
                                            "hovor": {
                                                "topicName": "内容联盟评测",
                                                "content": "内容联盟评测体系构建",
                                                "link": ""
                                            }

                                        }
                                    ]
                                },
                                {
                                    "name": "体验分析",
                                    "children": [
                                        {
                                            "name": "戴优丽",
                                            "hovor": {
                                                "topicName": "SAT（定制化物料质量平台）",
                                                "content": "线下服务及物料准入，线上动态物料监控，线上服务监控",
                                                "link": "http://agroup.baidu.com/sat/file/view/18713"
                                            }
                                        },
                                        {
                                            "name": "黄焱",
                                            "hovor": {
                                                "topicName": "创意分析服务平台",
                                                "content": "对线上创意质量分析，分析创意内容和点击后行为，挖掘得到非法和不合规创意，推动闭环落地和广告主，挖掘不合理投放，优化投放效果",
                                                "link": "http://iap.baidu.com:8826/"
                                            }
                                        }, {
                                            "name": "李雅玉",
                                            "hovor": {
                                                "topicName": "内容联盟评测",
                                                "content": "内容联盟评测体系构建",
                                                "link": ""
                                            }
                                        }, {
                                            "name": "王鸣云",
                                            "hovor": {
                                                "topicName": "adq",
                                                "content": "http://agroup.baidu.com/mad/naotu/view/233948",
                                                "link": "http://adq.baidu.com"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "移动端测试",
                            "children": [
                                {
                                    "name": "胡陈豪",
                                    "hovor": {
                                        "topicName": "SDK自动化测试",
                                        "content": "SDK自动化测试，覆盖功能测试、性能测试和系统级测试，提供广告样式校验、日志校验等能力",
                                        "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=213528968"
                                    }
                                },{
                                    "name": "吕宁",
                                    "hovor": {
                                        "topicName": "【原生广告】投放端测试服务",
                                        "content": "",
                                        "link": "http://agroup.baidu.com/mad/naotu/view/235999"
                                    }
                                },{
                                    "name": "手机资源管理",
                                    "children": [
                                        {
                                            "name": "陈鲁",
                                            "hovor": {
                                                "topicName": "RMTC",
                                                "content": "手机设备管理，构建基于手机设备的移动测试云平台",
                                                "link": "http://rmtc.baidu.com"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "前端测试",
                            "children": [
                                {
                                    "name": "模版测试",
                                    "children": [
                                        {
                                            "name": "陈丽",
                                            "hovor": {
                                                "topicName": "广告样式自动化校验及监控",
                                                "content": "自动化校验广告返回内容正确性和样式展现正确性，可应用于线下网盟全量模板自动化回归测试，也可以应用于线上对top媒体的广告展现进行如“广告展现白板”、“展现遮挡”等问题监控",
                                                "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=295929042"
                                            }
                                        }
                                    ]
                                } ,{
                                    "name": "移动SDK测试",
                                    "children": [
                                        {
                                            "name": "胡陈豪",
                                            "hovor": {
                                                "topicName": "SDK自动化测试",
                                                "content": "SDK自动化测试，覆盖功能测试、性能测试和系统级测试，提供广告样式校验、日志校验等能力",
                                                "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=213528968"
                                            }
                                        }
                                    ]
                                },{
                                    "name": "JS测试",
                                    "children": [
                                        {
                                            "name": "翁寒一",

                                            "hovor": {
                                                "topicName": "J基于组件化的物料样式自动化测试",
                                                "content": "相对于原有仅定制化样式粒度的手工测试,组件化的样式测试将测试集下降到组件粒度, 底层借助mvp实现自动化的测试目标。",
                                                "link": ""
                                            }
                                        }
                                    ]
                                },{
                                    "name": "平台构建",
                                    "children": [
                                        {
                                            "name": "马亚明",

                                            "hovor": {
                                                "topicName": "MVP平台",
                                                "content": "前端测试云平台，基于移动／pc浏览器提供前端测试的基础能力，支撑功能测试、兼容性测试、样式测试、大规模召回测试等",
                                                "link": "http://mvp.baidu.com"
                                            }
                                        },{
                                            "name": "吕宁",

                                            "hovor": {
                                                "topicName": "【原生广告】投放端测试服务",
                                                "content": "",
                                                "link": "http://agroup.baidu.com/mad/naotu/view/235999"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },{
                            "name": "性能测试",
                            "children": [
                                {
                                    "name": "性能分析",
                                    "children": [
                                        {
                                            "name": "王琴、俞莉花",
                                            "hovor": {
                                                "topicName": "Java Trace多维度性能分析",
                                                "content": "基于数据进行模型建立，性能痛点模型直观呈现。深入分析定位，定位粒度最小的方法函数，亦可实现对上下游模块间的问题定位。",
                                                "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=42746967"
                                            }
                                        },{
                                            "name": "孙四海",
                                            "hovor": {
                                                "topicName": "检索系统线上性能分析",
                                                "content": "线上性能数据刻画，针对工程指标如：分广告位/分机房/分机器/分子流水，结合检索时间time、失败率fail、检索&召回pv等输出报表和趋势图，作为线上风险体检",
                                                "link": ""
                                            }
                                        }
                                    ]
                                }
                            ]
                        },{
                            "name": "接口测试",
                            "children": [
                                {
                                    "name": "测试覆盖度提升",
                                    "children": [
                                        {
                                            "name": "翁寒一",
                                            "hovor": {
                                                "topicName": "接口自动化的效率改进",
                                                "content": "推进rd-测试驱动开发, 深入rd原有ut测试框架, 为接口自动化提供半自动更新依据。",
                                                "link": "http://wiki.baidu.com/pages/viewpage.action?pageId=42746967"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },{
                            "name": "系统级测试",
                            "children": [
                                {
                                    "name": "容器管理方案",
                                    "children": [
                                        {
                                            "name": "杨金峰",
                                            "hovor": {
                                                "topicName": "EMC",
                                                "content": "Docker容器化构建解决方案",
                                                "link": "http://emc.baidu.com"
                                            }
                                        }
                                    ]
                                }, {
                                    "name": "环境构建",
                                    "children": [
                                        {
                                            "name": "尹兴林",
                                            "hovor": {
                                                "topicName": "BTS(网盟基础测试服务平台)",
                                                "content": "根据网盟检索端产品线测试特点，以平台化、接口化的思维模式设计了BTS基础测试服务平台，抽象出环境、driver cluster、流量仿真、stub cluster、计算5种基础服务组件， 平台通过对外开放强大的基础服务组件 + App开发者框架 + 衍生精品测试服务App的服务生态来支持网盟检索端各个产品线各种场景自动化测试",
                                                "link": "http://bts.baidu.com"
                                            }
                                        }
                                    ]
                                },{
                                    "name": "系统任务调度",
                                    "children": [
                                        {
                                            "name": "尹兴林",
                                            "hovor": {
                                                "topicName": "BTS(网盟基础测试服务平台)",
                                                "content": "根据网盟检索端产品线测试特点，以平台化、接口化的思维模式设计了BTS基础测试服务平台，抽象出环境、driver cluster、流量仿真、stub cluster、计算5种基础服务组件， 平台通过对外开放强大的基础服务组件 + App开发者框架 + 衍生精品测试服务App的服务生态来支持网盟检索端各个产品线各种场景自动化测试",
                                                "link": "http://bts.baidu.com"
                                            }
                                        }
                                    ]
                                }, {
                                    "name": "资源管理",
                                    "children": [
                                        {
                                            "name": "郝丹",
                                            "hovor": {
                                                "topicName": "XSTP",
                                                "content": "系统级测试平台，解决环境构建、数据构建、任务调度等核心问题",
                                                "link": "http://xstp.baidu.com"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },{
                            "name": "大数据",
                            "children": [
                                {
                                    "name": "大数据平台",
                                    "children": [
                                        {
                                            "name": "朱加伟、王胜、孙晨蛟",
                                            "hovor": {
                                                "topicName": "接口自动化的效率改进",
                                                "content": "针对大数据的全流程(获取、计算、存储、可视化)提供通用&定制解决方案",
                                                "link": "http://haichuan.baidu.com"
                                            }
                                        }
                                    ]
                                },{
                                    "name": "数据分析和挖掘",
                                    "children": [
                                        {
                                            "name": "朱加伟、王胜、孙晨蛟",
                                            "hovor": {
                                                "topicName": "海川平台",
                                                "content": "支撑构建定制&通用数据场景，包括但不限：系统性能分析、灰度、大数据测试&监控、风险挖掘、评测等",
                                                "link": "http://haichuan.baidu.com"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },{
                            "name": "持续集成",
                            "children": [
                                {
                                    "name": "平台建设",
                                    "children": [
                                        {
                                            "name": "张翔",
                                            "hovor": {
                                                "topicName": "CIBC&titan",
                                                "content": "CI相关平台",
                                                "link": "http://cibc.baidu.com"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            };
            var apiTableCols = [
                {
                    key: 'param',
                    name: '参数'
                },
                {
                    key: 'type',
                    name: '类型'
                },
                {
                    key: 'details',
                    name: '说明',
                    template: '<pre>{{getParamDesc(col, row)}}</pre>'
                },
                {
                    key: 'default',
                    name: '默认值',
                    template: '<pre>{{getParamDesc(col, row)}}</pre>'
                }
            ];
            componentsData.d3DndTree = componentsData.d3LayoutTree;
            componentsData.treeTable = {
                cols: [
                    {
                        key: 'id',
                        name: 'id',
                        template: '<span>{{getDisplayId(col, row)}}</span>'
                    },
                    {
                        key: 'name',
                        name: 'name',
                        expandOn: true,
                        formatter: function (col, row) {
                            return 'Hello, ' + row[col.key];
                        }
                    },
                    {
                        key: 'description',
                        name: 'description',
                        keywords: componentsData.autocompletion,
                        template: '<input autocompletion keywords="col.keywords" ng-model="row[col.key]">'
                    },
                    {
                        key: 'tel',
                        name: 'tel'
                    },
                    {
                        key: 'dropdown',
                        name: 'Dropdown',
                        dropdownList: componentsData.dropdown,
                        template: '<dropdown data="col.dropdownList"></dropdown>'
                    },
                    {
                        key: 'rating',
                        name: 'RatingIndicator',
                        template: '<rating-indicator star="row[col.key]"></rating-indicator>'
                    }
                ],
                rows: [
                    {
                        id: 1,
                        name: 'zhangyou04',
                        description: 'Developer first then FE',
                        tel: '12345678979',
                        rating: 4,
                        children: [
                            {
                                id: 11,
                                name: 'zhangyou04',
                                description: 'Developer first then FE',
                                tel: '12345678979',
                                rating: 4,
                                children: [
                                    {
                                        id: 111,
                                        name: 'zhangyou04',
                                        description: 'Developer first then FE',
                                        tel: '12345678979',
                                        rating: 4,
                                        children: [
                                            {
                                                id: 1111,
                                                name: 'zhangyou04',
                                                description: 'Developer first then FE',
                                                tel: '12345678979',
                                                rating: 4,
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: 'zhangyou04',
                        description: 'Developer first then FE',
                        tel: '12345678979',
                        rating: 4,
                        children: [
                            {
                                id: 22,
                                name: 'zhangyou04',
                                description: 'Developer first then FE',
                                tel: '12345678979',
                                rating: 4,
                                children: [
                                    {
                                        id: 2222,
                                        name: 'zhangyou04',
                                        description: 'Developer first then FE',
                                        tel: '12345678979',
                                        rating: 4,
                                        children: [
                                            {
                                                id: 2222,
                                                name: 'zhangyou04',
                                                description: 'Developer first then FE',
                                                tel: '12345678979',
                                                rating: 4,
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            angular.extend($scope, {
                components: [
                    {
                        id: 'UIComponents',
                        name: 'UIComponents',
                        data: {
                            downloadItems: []
                        },
                        children: [
                            {
                                id: 'dialog',
                                name: 'Dialog',
                                subName: '对话框',
                                description: '',
                                data: {
                                    title: 'Dialog',
                                    visible: false,
                                    okText: '保存'
                                },
                                api: {
                                    params: [
                                        {
                                            param: 'option',
                                            type: 'Object',
                                            details: {
                                                title: '标题',
                                                visible: '对话框是否可见',
                                                okText: '确定按钮文字',
                                                cancelText: '取消按钮文字'
                                            },
                                            default: {
                                                title: '友情提示',
                                                visible: false,
                                                okText: '确定',
                                                cancelText: '取消'
                                            }
                                        },
                                        {
                                            param: 'onCancel',
                                            type: 'Function',
                                            details: '关闭对话框回调函数',
                                            default: ''
                                        },
                                        {
                                            param: 'onOk',
                                            type: 'Function',
                                            details: '点击确定按钮回调函数',
                                            default: ''
                                        },
                                        {
                                            param: 'onBeforeClose',
                                            type: 'Function',
                                            details: '关闭对话框前回调函数',
                                            default: ''
                                        },
                                        {
                                            param: 'onAfterClose',
                                            type: 'Function',
                                            details: '关闭对话框后回调函数',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'switch',
                                name: 'Switch',
                                subName: '开关按钮',
                                description: '',
                                data: {
                                    on: true
                                },
                                api: {
                                    params: [
                                        {
                                            param: 'on',
                                            type: 'boolean',
                                            details: '开关状态',
                                            default: 'false'
                                        },
                                        {
                                            param: 'onText',
                                            type: 'String',
                                            details: '打开状态显示文字',
                                            default: 'on'
                                        },
                                        {
                                            param: 'offText',
                                            type: 'String',
                                            details: '关闭状态显示文字',
                                            default: 'off'
                                        },
                                        {
                                            param: 'onChange',
                                            type: 'String',
                                            details: '开关状态变化时会触发onChange表达式,类似angular的ng-change指令用法',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'button',
                                name: 'Button',
                                subName: '按钮',
                                description: '',
                                data: {
                                    size: 'default',
                                    sizes: ['small', 'default', 'large']
                                },
                                api: {
                                    params: [
                                        {
                                            param: 'size',
                                            type: 'String',
                                            details: '设置按钮的大小, small, default, large',
                                            default: 'default'
                                        },
                                        {
                                            param: 'ngDisabled',
                                            type: 'boolean',
                                            details: '是否禁用按钮',
                                            default: 'false'
                                        },
                                        {
                                            param: 'loading',
                                            type: 'boolean',
                                            details: '设置按钮loading状态',
                                            default: 'false'
                                        },
                                        {
                                            param: 'class',
                                            type: 'String',
                                            details: '按钮样式class, 目前可设置的样式：ui-primary',
                                            default: 'default'
                                        }
                                    ]
                                }
                             },
                            {
                                id: 'radioButton',
                                name: 'Radio',
                                subName: '单选框',
                                description: '',
                                data: {
                                    langue: 'JavaScript',
                                    name: 'Bernard',
                                    radio: false
                                },
                                api: [
                                    {
                                        name: 'Radio',
                                        params: [
                                            {
                                                param: 'value',
                                                type: 'String',
                                                details: '选中单选框时值, 不设置该参数则选中时绑定值为true',
                                                default: 'true'
                                            },
                                            {
                                                param: 'ngModel',
                                                type: 'expresion',
                                                details: 'AngularJS 表达式，绑定单选框的值',
                                                default: ''
                                            }
                                        ]
                                    },
                                    {
                                        name: 'RadioGroup',
                                        params: [
                                            {
                                                param: 'ngModel',
                                                type: 'String',
                                                details: 'AngularJS 表达式，绑定选中的单选框值',
                                                default: ''
                                            },
                                            {
                                                param: 'ngChange',
                                                type: 'String',
                                                details: 'AngularJS 表达式，单选框组值变化时触发',
                                                default: ''
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'checkbox',
                                name: 'Checkbox',
                                subName: '复选框',
                                description: '',
                                data: {
                                    checkbox: false,
                                    selectedItems: ['Iphone'],
                                    selectedObjs: [],
                                    selectedLetter: ['b'],
                                    objs: [
                                        {
                                            key: 1,
                                            name: 'Hello'
                                        },
                                        {
                                            key: 2,
                                            name: 'world'
                                        }
                                    ]
                                },
                                api: [
                                    {
                                        name: 'Checkbox',
                                        params: [
                                            {
                                                param: 'ngModel',
                                                type: 'expression',
                                                details: 'AngularJS 表达式，绑定复选框的值',
                                                default: ''
                                            },
                                            {
                                                param: 'value',
                                                type: 'String',
                                                details: '选中复选框时值, 不设置该参数则选中时绑定值为true',
                                                default: 'true'
                                            },
                                            {
                                                param: 'ngValue',
                                                type: 'expression',
                                                details: 'AngularJS 表达式, 选中复选框时值, 不设置该参数则选中时绑定值为true',
                                                default: ''
                                            },
                                            {
                                                param: 'ngChange',
                                                type: 'expression',
                                                details: 'AngularJS 表达式，复选框选中状态改变时被执行',
                                                default: ''
                                            }
                                        ]
                                    },
                                    {
                                        name: 'CheckboxGroup',
                                        params: [
                                            {
                                                param: 'ngModel',
                                                type: 'String',
                                                details: 'AngularJS 表达式，绑定选中的复选框值',
                                                default: ''
                                            },
                                            {
                                                param: 'ngChange',
                                                type: 'String',
                                                details: 'AngularJS 表达式，复选框组值变化时触发',
                                                default: ''
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'icon',
                                name: 'Icon',
                                subName: '图标',
                                description: '',
                                data: {
                                    icons: [
                                        "stepforward",
                                        "stepbackward",
                                        "forward",
                                        "banckward",
                                        "caretright",
                                        "caretleft",
                                        "caretdown",
                                        "caretup",
                                        "rightcircle",
                                        "leftcircle",
                                        "upcircle",
                                        "downcircle",
                                        "rightcircleo",
                                        "leftcircleo",
                                        "upcircleo",
                                        "downcircleo",
                                        "verticleleft",
                                        "verticleright",
                                        "rollback",
                                        "retweet",
                                        "shrink",
                                        "arrowsalt",
                                        "doubleright",
                                        "doubleleft",
                                        "arrowdown",
                                        "arrowup",
                                        "arrowright",
                                        "arrowleft",
                                        "down",
                                        "up",
                                        "right",
                                        "left",
                                        "minussquareo",
                                        "minuscircle",
                                        "minuscircleo",
                                        "minus",
                                        "pluscircleo",
                                        "pluscircle",
                                        "plus",
                                        "infocirlce",
                                        "infocirlceo",
                                        "info",
                                        "exclamation",
                                        "exclamationcircle",
                                        "exclamationcircleo",
                                        "closecircle",
                                        "closecircleo",
                                        "checkcircle",
                                        "checkcircleo",
                                        "check",
                                        "close",
                                        "customerservice",
                                        "creditcard",
                                        "codesquareo",
                                        "book",
                                        "barschart",
                                        "bars",
                                        "question",
                                        "questioncircle",
                                        "questioncircleo",
                                        "pause",
                                        "pausecircle",
                                        "pausecircleo",
                                        "clockcircle",
                                        "clockcircleo",
                                        "swap",
                                        "swapleft",
                                        "swapright",
                                        "plussquareo",
                                        "frown",
                                        "menufold",
                                        "mail",
                                        "link",
                                        "areachart",
                                        "linechart",
                                        "home",
                                        "laptop",
                                        "star",
                                        "staro",
                                        "filter",
                                        "exception",
                                        "meho",
                                        "meh",
                                        "shoppingcart",
                                        "save",
                                        "user",
                                        "videocamera",
                                        "totop",
                                        "team",
                                        "solution",
                                        "sharealt",
                                        "setting",
                                        "picture",
                                        "phone",
                                        "paperclip",
                                        "notification",
                                        "menuunfold",
                                        "inbox",
                                        "lock",
                                        "qrcode",
                                        "tags",
                                        "tagso",
                                        "cloudo",
                                        "cloud",
                                        "cloudupload",
                                        "clouddownload",
                                        "clouddownloado",
                                        "clouduploado",
                                        "enviroment",
                                        "enviromento",
                                        "eye",
                                        "eyeo",
                                        "camera",
                                        "camerao",
                                        "windows",
                                        "export2",
                                        "export",
                                        "edit",
                                        "circledowno",
                                        "circledown",
                                        "appstoreo",
                                        "appstore",
                                        "scan",
                                        "hdd",
                                        "ie",
                                        "delete",
                                        "enter",
                                        "pushpino",
                                        "pushpin",
                                        "heart",
                                        "hearto",
                                        "smile-circle",
                                        "smileo",
                                        "frowno",
                                        "calculator",
                                        "chrome",
                                        "github",
                                        "iconfontdesktop",
                                        "caretcircleoup",
                                        "upload",
                                        "download",
                                        "piechart",
                                        "lock1",
                                        "unlock",
                                        "windowso",
                                        "dotchart",
                                        "barchart",
                                        "codesquare",
                                        "plussquare",
                                        "minussquare",
                                        "closesquare",
                                        "closesquareo",
                                        "checksquare",
                                        "checksquareo",
                                        "fastbackward",
                                        "fastforward",
                                        "upsquare",
                                        "downsquare",
                                        "leftsquare",
                                        "rightsquare",
                                        "rightsquareo",
                                        "leftsquareo",
                                        "down-square-o",
                                        "up-square-o",
                                        "play",
                                        "playcircleo",
                                        "tag",
                                        "tago",
                                        "addfile",
                                        "folder1",
                                        "file1",
                                        "switcher",
                                        "addfolder",
                                        "folderopen",
                                        "search1",
                                        "ellipsis1",
                                        "calendar",
                                        "filetext1",
                                        "copy1",
                                        "jpgfile1",
                                        "pdffile1",
                                        "exclefile1",
                                        "pptfile1",
                                        "unknowfile1",
                                        "wordfile1",
                                        "dingding",
                                        "dingding-o",
                                        "mobile1",
                                        "tablet1",
                                        "bells",
                                        "disconnect",
                                        "database",
                                        "barcode",
                                        "hourglass",
                                        "key",
                                        "flag",
                                        "layout",
                                        "printer",
                                        "USB",
                                        "skin",
                                        "tool",
                                        "car",
                                        "addusergroup",
                                        "carryout",
                                        "deleteuser",
                                        "deleteusergroup",
                                        "man",
                                        "isv",
                                        "gift",
                                        "idcard",
                                        "medicinebox",
                                        "redenvelopes",
                                        "rest",
                                        "Safety",
                                        "wallet",
                                        "woman",
                                        "adduser",
                                        "bank",
                                        "Trophy",
                                        "Contacts",
                                        "loading1",
                                        "loading2",
                                        "like2",
                                        "dislike2",
                                        "like1",
                                        "dislike1",
                                        "bulb1",
                                        "rocket1",
                                        "select1",
                                        "apple1",
                                        "apple-o",
                                        "android1",
                                        "android",
                                        "aliwangwang-o1",
                                        "aliwangwang",
                                        "pay-circle1",
                                        "pay-circle-o1",
                                        "poweroff",
                                        "trademark",
                                        "find",
                                        "copyright",
                                        "sound",
                                        "earth",
                                        "wifi",
                                        "sync",
                                        "login",
                                        "logout",
                                        "reload1",
                                        "message1",
                                        "shake"
                                    ]
                                },
                                api: {
                                    params: [
                                        {
                                            param: 'type',
                                            type: 'String',
                                            details: 'icon类型，支持的icon类型见图标列表',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'carousel',
                                name: 'Carousel',
                                subName: '走马灯',
                                description: '',
                                data: {
                                    animate: 'slide',
                                    items: [1, 2, 3, 4, 5]
                                },
                                api: {
                                    params: [
                                        {
                                            param: 'animate',
                                            type: 'String',
                                            details: '轮播动画类型，目前支持slide, zoom',
                                            default: 'slide'
                                        },
                                        {
                                            param: 'time',
                                            type: 'number',
                                            details: '轮播动画间隔时间（单位是秒）',
                                            default: '3'
                                        },
                                        {
                                            param: 'start',
                                            type: 'int',
                                            details: '初始显示索引（从1开始）',
                                            default: '1'
                                        },
                                        {
                                            param: 'static',
                                            type: 'boolean',
                                            details: '设置为true则静止自动轮播,手动点击轮播',
                                            default: 'false'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'autocompletion',
                                name: 'AutoCompletion',
                                subName: '自动完成',
                                description: '',
                                data: componentsData.autocompletion,
                                api: {
                                    params: [
                                        {
                                            param: 'keywords',
                                            type: 'Array',
                                            details: '自动提示列表example: [\'a\', \'b\', \'c\']',
                                            default: '[]'
                                        },
                                        {
                                            param: 'mode',
                                            type: 'String',
                                            details: '选中提示选项后文本写回输入框模式：replace、insert',
                                            default: 'replace'
                                        },
                                        {
                                            param: 'extraKeys',
                                            type: 'String',
                                            details: [
                                                '触发自动提示按键,支持单按键及复合按键(该配置只在insert模式下有效)',
                                                '单键如: $, #, a, b, c, 1, 2 ...;',
                                                '复合按键如：Ctrl+Space、Ctrl+/、Ctrl+B、Shift+/、Shift+Space、Shift+B ...'
                                            ].join('\n'),
                                            default: 'Ctrl+Space'
                                        },
                                        {
                                            param: 'onSelect',
                                            type: 'Function',
                                            details: '选中提示项回调函数，参数为选中的文本',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'searchField',
                                name: 'SearchField',
                                subName: '搜索输入框',
                                description: '',
                                data: {
                                    value: '',
                                    search: function (val) {
                                        console.log($scope.getComponentById('searchField').data);
                                        alert('search val is: ' + val);
                                    }
                                },
                                api: {
                                    params: [
                                        {
                                            param: 'value',
                                            type: 'expression',
                                            details: 'angularjs表达式，绑定输入框显示的值',
                                            default: ''
                                        },
                                        {
                                            param: 'placeholder',
                                            type: 'String',
                                            details: '同input的placeholder一致',
                                            default: ''
                                        },
                                        {
                                              param: 'search',
                                              type: 'Function',
                                              details: '确认搜索触发的回调函数',
                                              default: ''
                                        },
                                        {
                                            param: 'onClear',
                                            type: 'Function',
                                            details: '清除输入值时触发的回调函数',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'autotextarea',
                                name: 'AutoTextarea',
                                subName: '自动高度文本域',
                                description: '',
                                data: 'AutoTextarea',
                                api: {
                                    params: [
                                        {
                                            param: 'ngModel',
                                            type: 'expression',
                                            details: 'AngularJS 表达式，绑定输入框显示的值',
                                            default: ''
                                        },
                                        {
                                            param: 'placeholder',
                                            type: 'String',
                                            details: '同textarea的placeholder',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'dropdown',
                                name: 'Dropdown',
                                subName: '下拉菜单',
                                description: '',
                                data: componentsData.dropdown,
                                api: {
                                    params: [
                                        {
                                            param: 'data',
                                            type: 'Array',
                                            details: '下拉数据，数据结构见示例数据',
                                            default: ''
                                        },
                                        {
                                            param: 'onChange',
                                            type: 'Function',
                                            details: '选中值变化时触发该回调函数',
                                            default: ''
                                        },
                                        {
                                            param: 'key',
                                            type: 'String',
                                            details: '选项数据中唯一标识符对应的key',
                                            default: 'id'
                                        },
                                        {
                                            param: 'name',
                                            type: 'String',
                                            details: '选项数据中显示文本对应的key',
                                            default: 'name'
                                        },
                                        {
                                            param: 'childrenKey',
                                            type: 'String',
                                            details: '子菜单数据对应的key',
                                            default: 'children'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'ratingIndicator',
                                name: 'RatingIndicator',
                                subName: '评星',
                                description: '',
                                data: [
                                    {
                                        star: 4,
                                        max: 5,
                                        select: function (star) {
                                            console.log($scope.getComponentById('ratingIndicator').data);
                                            alert(star);
                                        }
                                    },
                                    {
                                        star: 3,
                                        max: 6
                                    }
                                ],
                                api: {
                                    params: [
                                        {
                                            param: 'star',
                                            type: 'int',
                                            details: '选中的星数',
                                            default: '0'
                                        },
                                        {
                                            param: 'max',
                                            type: 'int',
                                            details: '最大星数',
                                            default: '5'
                                        },
                                        {
                                            param: 'select',
                                            type: 'Function',
                                            details: '选中星时触发该回调函数',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'tooltip',
                                name: 'RichTooltip',
                                subName: '气泡提示',
                                description: '提示气泡,可展示简单文字及复杂UI控件。',
                                data: [
                                    'Test tooltip',
                                    '<h3 style="color: red;">Simple HTML</h3>',
                                    '<mindmap data="currentComponent.mindmap"></mindmap>',
                                    '<tree-table cols="currentComponent.treeTable.cols" data="currentComponent.treeTable.rows"></tree-table>'
                                ],
                                mindmap: componentsData.mindmap,
                                treeTable: componentsData.treeTable,
                                api: {
                                    params: [
                                        {
                                            param: 'tooltip',
                                            type: 'String',
                                            details: 'tooltip显示的内容，支持文本、html、自定义控件',
                                            default: ''
                                        },
                                        {
                                            param: 'placement',
                                            type: 'String',
                                            details: [
                                                'tooltip显示的位置，可选项共12种：',
                                                'bottom、bottomLeft、bottomRight; top、topRight、topLeft;',
                                                'left、leftTop、leftBottom; right、rightTop、rightBottom'
                                            ].join('\n'),
                                            default: 'bottom'
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'resizableLayout',
                                name: 'ResizableLayout',
                                subName: '可调整尺寸布局',
                                description: '',
                                data: {},
                                api: {
                                    params: [
                                        {
                                            param: 'direction',
                                            type: 'String',
                                            details: '布局方向，水平或竖直布局, vertical, horizontal',
                                            default: 'vertical'
                                        },
                                        {
                                            param: 'resizable',
                                            type: 'boolean',
                                            details: '是否可以自动调整尺寸',
                                            default: 'true'
                                        },
                                        {
                                            param: 'height',
                                            type: 'number',
                                            details: '布局高度，默认单位px，也可以设置百分比,默认自适应',
                                            default: ''
                                        },
                                        {
                                            param: 'width',
                                            type: 'number',
                                            details: '布局宽度，默认单位px，也可以设置百分比，默认自适应',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'accordion',
                                name: 'Accordion',
                                subName: '折叠板',
                                description: '',
                                data: {},
                                api: [
                                    {
                                        name: 'accordion',
                                        params: [
                                            {
                                                param: 'activeIndex',
                                                type: 'number',
                                                details: '默认展开项索引',
                                                default: '1'
                                            }
                                        ]
                                    },
                                    {
                                        name: 'accordionItem',
                                        params: [
                                            {
                                                param: 'title',
                                                type: 'String',
                                                details: '头部显示文本',
                                                default: ''
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'tabset',
                                name: 'Tabset',
                                subName: '标签页',
                                description: '',
                                data: {},
                                api: {
                                    name: 'tab',
                                    params: [
                                        {
                                            param: 'head',
                                            type: 'String',
                                            details: '头部显示文本',
                                            default: ''
                                        },
                                        {
                                            param: 'active',
                                            type: 'boolean',
                                            details: '标记该tab是否被选中',
                                            default: ''
                                        },
                                        {
                                            param: 'select',
                                            type: 'expression',
                                            details: 'angularjs 表达式，选中该tab时会被执行',
                                            default: ''
                                        },
                                        {
                                            param: 'deselect',
                                            type: 'expression',
                                            details: 'angularjs 表达式，取消选中该tab时会被执行',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'mindmap',
                                name: 'Mindmap',
                                subName: '思维导图',
                                description: '',
                                data: componentsData.mindmap,
                                api: {
                                    params: [
                                        {
                                            param: 'data',
                                            type: 'expression',
                                            details: 'angularjs 表达式，控件数据，数据结构参照示例',
                                            default: ''
                                        },
                                        {
                                            param: 'multiple',
                                            type: 'boolean',
                                            details: '是否允许多选',
                                            default: 'false'
                                        },
                                        {
                                            param: 'expandLevel',
                                            type: 'int',
                                            details: '默认展开层级',
                                            default: ''
                                        },
                                        {
                                            param: 'onToggleExpand',
                                            type: 'Function',
                                            details: '选中',
                                            default: ''
                                        },
                                        {
                                            param: 'onSelect',
                                            type: 'Function',
                                            details: '选中',
                                            default: ''
                                        },
                                        {
                                            param: 'context',
                                            type: 'Object',
                                            details: '指定回调函数执行的上下文（this）',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'tree',
                                name: 'Tree',
                                subName: '树',
                                description: '',
                                events: {
                                    onDrop: function (evt, targetNode, parentNode, dragNode) {
                                        console.log('onDrop', arguments);
                                    }
                                },
                                data: componentsData.treeview,
                                api: {
                                    params: [
                                        {
                                            param: 'data',
                                            type: 'Array',
                                            details: '控件数据，结构见示例',
                                            default: ''
                                        },
                                        {
                                            param: 'selectedNodes',
                                            type: 'Array',
                                            details: '选中的节点数据，里面的元素支持节点id或者节点对象',
                                            default: '[]'
                                        },
                                        {
                                            param: 'collapsed',
                                            type: 'boolean',
                                            details: '默认所有节点是否折叠',
                                            default: 'false'
                                        },
                                        {
                                            param: 'showLine',
                                            type: 'boolean',
                                            details: '是否显示节点间相连接的竖线',
                                            default: 'false'
                                        },
                                        {
                                            param: 'draggable',
                                            type: 'boolean',
                                            details: '是否可拖拽',
                                            default: 'false'
                                        },
                                        {
                                            param: 'editable',
                                            type: 'boolean',
                                            details: '是否可编辑',
                                            default: 'false'
                                        },
                                        {
                                            param: 'multiple',
                                            type: 'boolean',
                                            details: '是否多选模式',
                                            default: 'false'
                                        },
                                        {
                                            param: 'key',
                                            type: 'String',
                                            details: '节点唯一标识符的key',
                                            default: 'id'
                                        },
                                        {
                                            param: 'name',
                                            type: 'String',
                                            details: '节点唯一显示文本字段的key',
                                            default: 'name'
                                        },
                                        {
                                            param: 'children',
                                            type: 'String',
                                            details: '节点子节点数据的key',
                                            default: 'children'
                                        },
                                        {
                                            param: 'getIconClass',
                                            type: 'Function',
                                            details: '定制节点前的图标，返回class name，依据class name定制图标',
                                            default: ''
                                        },
                                        {
                                            param: 'getToggleIconClass',
                                            type: 'Function',
                                            details: '定制节点展开或收起的图标，返回class name，依据class name定制图标',
                                            default: ''
                                        },
                                        {
                                            param: 'getNodeText',
                                            type: 'Function',
                                            details: '定制节点显示的文本，返回的string作为节点文本显示',
                                            default: ''
                                        },
                                        {
                                            param: 'onToggleExpand',
                                            type: 'expression',
                                            details: 'angularjs 表达式，取消选中该tab时会被执行',
                                            default: ''
                                        },
                                        {
                                            param: 'onSelect',
                                            type: 'Function',
                                            details: '点击节点会触发该函数执行',
                                            default: ''
                                        },
                                        {
                                            param: 'onEdit',
                                            type: 'Function',
                                            details: '编辑节点完成后触发该函数执行',
                                            default: ''
                                        },
                                        {
                                            param: 'onDelete',
                                            type: 'Function',
                                            details: '点击删除节点会触发该函数执行',
                                            default: ''
                                        },
                                        {
                                            param: 'onDragStart',
                                            type: 'Function',
                                            details: '开始拖拽节点会触发该函数执行',
                                            default: ''
                                        },
                                        {
                                            param: 'onBeforeDrop',
                                            type: 'Function',
                                            details: 'drop前会触发该函数执行',
                                            default: ''
                                        },
                                        {
                                            param: 'onDrop',
                                            type: 'Function',
                                            details: 'drop后触发该函数执行',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'pagination',
                                name: 'Pagination',
                                subName: '分页',
                                description: '',
                                data: {
                                    total: 888,
                                    pageSize: 10,
                                    currentPage: 1
                                },
                                api: {
                                    params: [
                                        {
                                            param: 'info',
                                            type: 'Object',
                                            details: {
                                                total: '总记录数',
                                                pageSize: '每页记录数',
                                                currentPage: '当前页码'
                                            },
                                            default: ''
                                        },
                                        {
                                            param: 'maxPageCount',
                                            type: 'int',
                                            details: '页码选项最大个数',
                                            default: 10
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'table',
                                name: 'Table',
                                subName: '表格',
                                description: '',
                                data: componentsData.table,
                                api: {
                                    params: [
                                        {
                                            param: 'cols',
                                            type: 'Array',
                                            details: '表格列数据，结构用法参照示例',
                                            default: []
                                        },
                                        {
                                            param: 'rows',
                                            type: 'Array',
                                            details: '表格行数据，结构用法参照示例',
                                            default: []
                                        },
                                        {
                                            param: 'height',
                                            type: 'number|string',
                                            details: '表格高度，主要配合fixHeader(固定表头)来使用, 默认单位px或设置百分比%',
                                            default: ''
                                        },
                                        {
                                            param: 'tableLayoutFixed',
                                            type: 'boolean',
                                            details: '等价html tableLayout属性, 自动表格布局、固定表格布局',
                                            default: 'false'
                                        },
                                        {
                                            param: 'fixedHeader',
                                            type: 'boolean',
                                            details: '表格头部是否固定',
                                            default: 'true'
                                        },
                                        {
                                            param: 'withBorder',
                                            type: 'boolean',
                                            details: '表格是否带边框',
                                            default: 'true'
                                        },
                                        {
                                            param: 'colResizable',
                                            type: 'boolean',
                                            details: '可拖拽改变column宽度',
                                            default: 'true'
                                        },
                                        {
                                            param: 'size',
                                            type: 'String',
                                            details: 'table行高，三个可选值samll, middle, large',
                                            default: 'middle'
                                        },
                                        {
                                            param: 'selectRow',
                                            type: 'Function',
                                            details: '选中行回调函数',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'treeTable',
                                name: 'TreeTable',
                                subName: '树形表格',
                                description: '',
                                data: componentsData.treeTable,
                                api: {
                                    params: [
                                        {
                                            param: 'cols',
                                            type: 'Array',
                                            details: '表格列数据，结构用法参照示例',
                                            default: []
                                        },
                                        {
                                            param: 'data',
                                            type: 'Array',
                                            details: '表格行数据，结构用法参照示例',
                                            default: []
                                        },
                                        {
                                            param: 'expandIndex',
                                            type: 'int',
                                            details: '展开列索引值',
                                            default: 1
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'setFocus',
                                name: 'AutoFocus',
                                subName: '自动聚焦',
                                description: '输入框自动聚焦',
                                data: true,
                                api: {
                                    params: [
                                        {
                                            param: 'setFocus',
                                            type: 'boolean',
                                            details: '是否自动聚焦',
                                            default: false
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'compile',
                                name: 'Compile',
                                subName: '编译指令',
                                description: '待补充。。。',
                                data: {
                                    template: [
                                        '<mindmap data="currentComponent.data.mindmap"></mindmap>'
                                    ].join(''),
                                    mindmap: componentsData.mindmap
                                },
                                api: {
                                    params: [
                                        {
                                            param: 'compile',
                                            type: 'String',
                                            details: '编译模版字符串',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'copy',
                                name: 'Copy',
                                subName: '复制',
                                description: '待补充。。。',
                                data: JSON.stringify(componentsData.mindmap, null, 4),
                                api: {
                                    params: [
                                        {
                                            param: 'uiCopy',
                                            type: 'expression',
                                            details: 'angularjs 表达式，需要复制的数据',
                                            default: ''
                                        },
                                        {
                                            param: 'tooltip',
                                            type: 'String',
                                            details: '加了该属性后，复制成功会有tooltip提示',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'simpleJsonDiff',
                                name: 'SimpleJsonDiff',
                                subName: 'JSON数据对比',
                                description: '',
                                data: componentsData.simpleJsonDiff,
                                api: {
                                    params: [
                                        {
                                            param: 'expect',
                                            type: 'JSON',
                                            details: '期望值',
                                            default: ''
                                        },
                                        {
                                            param: 'actual',
                                            type: 'JSON',
                                            details: '实际值',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'directedGraph',
                                name: 'DirectedGraph',
                                subName: '有向图',
                                description: '',
                                data: componentsData.directedGraph,
                                api: {
                                    params: [
                                        {
                                            param: 'option',
                                            type: 'Object',
                                            details: '有向图数据，结构参见示例',
                                            default: ''
                                        },
                                        {
                                            param: 'height',
                                            type: 'number',
                                            details: '图形高度，默认单位px，也可设置%',
                                            default: ''
                                        }
                                    ]
                                }
                            },
                            {
                                id: 'd3',
                                name: 'd3-demo',
                                children: [
                                    //{
                                    //    id: 'd3LayoutTree',
                                    //    name: 'd3LayoutTree',
                                    //    data: componentsData.d3LayoutTree,
                                    //    height: Math.max(window.innerHeight, 1000),
                                    //    width: Math.max(800, window.innerWidth - 200),
                                    //    getTooltip: function (node) {
                                    //        return [
                                    //            '<span>name: ' + node.name + '</span><br>',
                                    //            '<span>children: ' + (node.children || node._children || []).length + '</span>',
                                    //        ].join('');
                                    //    }
                                    //},
                                    {
                                        id: 'd3DndTree',
                                        name: 'd3DndTree',
                                        subName: 'd3树形图',
                                        description: '待补充。。。',
                                        data: componentsData.d3DndTree,
                                        height: Math.max(window.innerHeight, 1000),
                                        width: Math.max(800, window.innerWidth - 200),
                                        getTooltip: function (node) {
                                            return [
                                                '<span>name: ' + node.name + '</span><br>',
                                                '<span>children: ' + (node.children || node._children || []).length + '</span>',
                                            ].join('');
                                        },
                                        api: {
                                            params: [
                                                {
                                                    param: 'data',
                                                    type: 'Object',
                                                    details: '树形控件数据，结构参见示例',
                                                    default: ''
                                                },
                                                {
                                                    param: 'height',
                                                    type: 'number',
                                                    details: '树形控件高度，默认单位px，也可以设置%',
                                                    default: ''
                                                },
                                                {
                                                    param: 'width',
                                                    type: 'number',
                                                    details: '树形控件宽度，默认单位px，也可以设置%',
                                                    default: ''
                                                },
                                                {
                                                    param: 'getTooltip',
                                                    type: 'Function',
                                                    details: '树形控件节点hover显示的tooltip, 返回值作为hover显示内容',
                                                    default: ''
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                componentTpls: {
                    uiComponents: require('./templates/uiComponents.html'),
                    setFocus: require('./templates/setFocus.html'),
                    compile: require('./templates/compile.html'),
                    copy: require('./templates/copy.html'),
                    searchField: require('./templates/searchField.html'),
                    ratingIndicator: require('./templates/ratingIndicator.html'),
                    tooltip: require('./templates/tooltip.html'),
                    dropdown: require('./templates/dropdown.html'),
                    autocompletion: require('./templates/autocompletion.html'),
                    accordion: require('./templates/accordion.html'),
                    tabset: require('./templates/tabset.html'),
                    mindmap: require('./templates/mindmap.html'),
                    simpleJsonDiff: require('./templates/simpleJsonDiff.html'),
                    resizableLayout: require('./templates/resizableLayout.html'),
                    tree: require('./templates/tree.html'),
                    pagination: require('./templates/pagination.html'),
                    table: require('./templates/table.html'),
                    treeTable: require('./templates/treeTable.html'),
                    directedGraph: require('./templates/directedGraph.html'),
                    autotextarea: require('./templates/autotextarea.html'),
                    carousel: require('./templates/carousel.html'),
                    dialog: require('./templates/dialog.html'),
                    button: require('./templates/button.html'),
                    icon: require('./templates/icon.html'),
                    switch: require('./templates/switch.html'),
                    radioButton: require('./templates/radioButton.html'),
                    checkbox: require('./templates/checkbox.html'),
                    d3LayoutTree: require('./templates/d3/d3LayoutTree.html'),
                    d3DndTree: require('./templates/d3/d3DndTree.html')
                },
                apiTableCols: apiTableCols
            });

            $scope.componentTpls.components = (() => {
                let html = [];
                for (let tpl in $scope.componentTpls) {
                    html.push('<div><h3> ' + tpl + '</h3><div>' + $scope.componentTpls[tpl] + '</div></div>');
                }

                return html.join('');
            })();

            angular.extend($scope, {
                isCurrentComponent(componentId) {
                    return $scope.currentComponent.id === componentId;
                },
                showSourceCode(currentComponent) {
                    currentComponent.isShowSourceCode = !currentComponent.isShowSourceCode;
                },
                getComponentById(componentId) {
                    var findCompoent = function (id, components) {
                        let component;
                        components = components || [];
                        for (var i = 0, length = components.length; i < length; i++) {
                            if (components[i].id === componentId) {
                                return components[i];
                            }
                            else {
                                component = findCompoent(id, components[i].children || []);
                            }
                            if (component) {
                                return component;
                            }
                        }

                        // return null;
                    };

                    return findCompoent(componentId, $scope.components);
                },
                getComponentData(componentId, isCopy) {
                    var component = $scope.getComponentById(componentId);
                    return isCopy ? angular.copy(component.data) : component.data;
                },
                getLeafComponents(components) {
                    "use strict";
                    var leafComponents = [];
                    walkThroughNodes(components, function (data, parent) {
                        if (!data.children || !data.children.length) {
                            leafComponents.push(data);
                        }
                    });
                    $scope.leafComponents = leafComponents;
                    return leafComponents;
                },
                getPrettyJson(data) {
                    try {
                        return JSON.stringify(data, null, 4);
                    }
                    catch (e) {
                        return data;
                    }
                },
                downloadFiles(files, postfix) {
                    var link = document.createElement('a');
                    var fileName = '';
                    files.forEach(function (item) {
                        //fileName = item + (postfix || '') + '.js';
                        //link.setAttribute('href', 'directives/' + fileName);
                        link.setAttribute('download', fileName);
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                    });
                    document.body.removeChild(link);

                },
                buildComponents(components, isCompress, callback) {
                    "use strict";
                    debugger;
                    $http({
                        method: 'get',
                        url: [location.protocol, '//', location.host, '/webpack'].join(''),
                        params: {
                            components: components.join(','),
                            compress: isCompress
                        }
                    }).then(function (response) {
                        console.log(response);
                        saveAs(
                            new Blob(
                                [response.data],
                                {type: 'application/javascript; charset=UTF-8'}
                            ),
                            'components.' + (isCompress ? 'min' : '') + '.js'
                        );
                        if (response.data && response.data.files) {
                            callback && callback(response.data.files);
                        }
                    });
                },
                toggleCheckAll(isCheck, currentComponent) {
                    //console.log('toggleCheckAll', isCheck, currentComponent);
                    currentComponent.data.downloadItems = isCheck ? $scope.leafComponents.map(item => {
                        return item.id;
                    }) : [];
                },
                downloadItemsChange(downloadItems) {
                    var isCheckAll = downloadItems.length === $scope.leafComponents.length;
                    var indeterminate = !!(!isCheckAll && downloadItems.length);
                    $scope.currentComponent.data.checkAll = isCheckAll;
                    $scope.currentComponent.data.indeterminate = indeterminate;
                    console.log($scope.currentComponent.data.indeterminate);
                },
                //downloadAll(currentComponet, postfix) {
                //    if (currentComponet && currentComponet.children) {
                //        var links = currentComponet.children.forEach(function (item) {
                //            return item.id;
                //        });
                //        $scope.downloadFiles(links, postfix);
                //    }
                //},
                downloadSelected(currentComponet, postfix) {
                    var links = currentComponet.data.downloadItems || [];
                    //if (currentComponet.data) {
                    //    for (var componentId in currentComponet.data.downloadItems) {
                    //        if (currentComponet.data[componentId]) {
                    //            links.push(componentId);
                    //        }
                    //    }
                    //}

                    if (links.length) {
                        $scope.buildComponents(
                            links,
                            postfix === '.min',
                            files => {
                                $scope.downloadFiles(files);
                            }
                        );
                        //$scope.downloadFiles(links, postfix);
                    }
                    else {
                        alert('请选择要下载的组件');
                    }
                },
                onApply() {
                    try {
                        // var component = JSON.parse($('pre[contenteditable]#applyData').text());
                        // console.log($('pre[contenteditable]#applyData')[0].innerText);
                        // $scope.currentComponent = component;

                        $scope.currentComponent.data = JSON.parse($scope.editor.value);
                        var componentId = $scope.currentComponent.id;
                        $scope.componentTpls[componentId] = $scope.copyComponentTpls[componentId];
                    }
                    catch (e) {
                        console.warn(e);
                        alert('数据格式非法json,请更正');
                    }
                }
            });

            $scope.copyComponentTpls = angular.copy($scope.componentTpls);
            // events handles
            angular.extend($scope, {
                selectCommponentItem(component, evt) {
                    if ($scope.currentComponent !== component) {
                        $scope.currentComponent = component;
                        $scope.currentComponent.isSelected = true;
                        $scope.editor = {
                            value: $scope.getPrettyJson(component.data, null, 4)
                        };
                        $scope.editorOption = {
                            mode: 'application/json',
                            gutters: ['CodeMirror-lint-markers', 'CodeMirror-foldgutter'],
                            lint: true,
                            hint: null,
                            hintOptions: null,
                            foldGutter: {
                                rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
                            }
                        };
                        $scope.htmlEditor = {
                            value: $scope.copyComponentTpls[component.id]
                        };
                        $scope.htmlEditorOption = {
                            gutters: ['CodeMirror-lint-markers', 'CodeMirror-foldgutter'],
                            foldGutter: {
                                rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
                            }
                        };

                        // refresh editors
                        $scope.needRefreshEditor = true;
                        $location.url(component.id);
                    }
                },
                tabsActive: {
                    data: false,
                    html: true
                },
                selectTab(tabName) {
                    angular.forEach($scope.tabsActive, (val, key) => {
                        $scope.tabsActive[key] = key === tabName;
                    });
                    //$scope.tabsActive[tabName] = true;
                    //if (/*$scope.needRefreshEditor && */$scope.tabsActive[tabName]) {
                    //    $scope.tabsActive[tabName] = false;
                    //    $timeout(function () {
                    //        $scope.tabsActive[tabName] = true;
                    //        $scope.needRefreshEditor = false;
                    //    }, 50);
                    //}
                    //else {
                    //    $scope.tabsActive[tabName] = true;
                    //}
                    $scope.currentTab = tabName;
                }
            });
            var walkThroughNodes = function (data, callback, childrenKey, parent) {
                var that = this;
                var processNode = function (data) {
                    if (data) {
                        // 如果callback 返回值为true则终止遍历
                        if (callback(data, parent)) {
                            return;
                        }
                        if (data[childrenKey]) {
                            data[childrenKey].forEach(function (node) {
                                walkThroughNodes(node, callback, childrenKey, data);
                            });
                        }
                    }
                };
                childrenKey = childrenKey || 'children';
                if (angular.isArray(data)) {
                    data.forEach(function (item) {
                        processNode(item, parent)
                    });
                }
                else {
                    processNode(data, parent);
                }
            };
            var getSelectedComponent = function (componentId) {
                let selectedComponent = $scope.components[0];
                if (componentId) {
                    walkThroughNodes(
                        $scope.components,
                        function (data) {
                            if (data.id === componentId) {
                                selectedComponent = data;
                                return true;
                            }
                        }
                    )
                }
                return selectedComponent;
            };

            // $scope.selectCommponentItem($scope.components[0].children[0]);
            let selectedComponent = getSelectedComponent(
                $location.url().replace(/^\//, '')
            );
            $scope.selectCommponentItem(selectedComponent);
        }
    ]
);
