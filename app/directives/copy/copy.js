/**
 * @file copy directive
 * @author zhangyou04
 */

// import angular from 'angular';
import clipboard from './clipboard';

class CopyDirective {
    constructor($timeout) {
        this.$timeout = $timeout;
        this.restrict = 'A';
    }

    link(scope, element, attrs) {
        element.on('click', evt => {
            clipboard.copy(scope.$eval(attrs.uiCopy))
                .then(
                    () => {
                        console.log('copy success');
                        scope.$emit('change', 'Copied', true, element);
                    },
                    err => {
                        console.log('copy error', err);
                        scope.$emit('change', 'Copy failed', true, element);
                    }
                );
        });
    }

    static getInstance($timeout) {
        CopyDirective.instance = new CopyDirective($timeout);
        return CopyDirective.instance;
    }
}

CopyDirective.getInstance.$inject = ['$timeout'];

module.exports = CopyDirective;
