/**
 * Created by ryan.king on 9/30/2015.
 */
(function () {
    angular.module('notely')
        .directive('bdUserLinks', bdUserLinks);


//bdFocusOn[$inject] = [];
    function bdUserLinks() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            template: '\
                <div class="user-links"> \
                  <div ng-show="vm.user().id"> \
                    Signed in as {{ vm.user().name }} \
                    | \
                    <a ng-click="vm.logout()">Logout</a> \
                  </div> \
                </div>',
            controller: userLinksController,
            controllerAs: 'vm'
        };
    }

    userLinksController['$inject'] = ['$state', 'loginService', 'userService'];
    function userLinksController($state, loginService, userService) {
        this.really = 'Yes, really.';
        this.user = function() {
            return userService.get() ;
        };

        this.logout = function() {
            loginService.logout();
            $state.go('login');
        };
    }

    //function link(scope, elem, attr) {}
})();