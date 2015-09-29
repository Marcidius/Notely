/**
 * Created by ryan.king on 9/29/2015.
 */
(function() {
    angular.module('notely')
        .directive('bdFocusOn', bdFocusOn);

    //bdFocusOn[$inject] = [];
    function bdFocusOn() {
        return {
            link: link
        };

        function link(scope, element, attr) {
            debugger;
            scope.$on(attr.bdFocusOn, function(e) {
                debugger;
                elem[0].focus();
            });
        }
    }


})();