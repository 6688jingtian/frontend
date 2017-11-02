/**
 * @file api config
 * @author zhangyou04@baidu.com
 */
module.exports = {
    USER: {
        getUser: {
            method: 'get',
            url: '/user/current'
        }
    },
    PUPPET: {
        getChart: {
            method: 'get',
            url: '/puppet/chart'
        },
        getSubChart: {
            method: 'get',
            url: '/puppet/chart/sub'
        },
        mtids: {
            method: 'get',
            url: '/puppet/mtid'
        }
    }
};
