/**
 * Created by ryan.king on 9/29/2015.
 */
angular.module('notely')
    .directive('bdFocusOn', bdFocusOn);

//bdFocusOn[$inject] = [];
function bdFocusOn() {
    return {
        restrict: 'A',
        link: link
    };

    function link(scope, elem, attr) {
        //scope.$on(attr.bdFocusOn, function (e) {
        //debugger;
        elem.ready(function () {
            elem[0].focus();
        });
        //});
    }
}