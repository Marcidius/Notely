/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login', [])
        .config(LoginConfig)
        .controller(LoginController);

    LoginConfig['$inject'] = ['$stateProvider'];
    function LoginConfig($stateProvider) {
        $stateProvider

            .state('login', {
                url: '/login',
                //abstract: true,
                templateUrl: '/login/login.html',
                controller: LoginController
                /*resolve: {
                    notePromise: function (notesservice) {
                        return notesservice.fetchNotes();
                    }*/

                }
            );
    }

    LoginController['$inject'] = ['$scope'];
    function LoginController($scope) {
        $scope.user = {
            username: {},
            password: {}
        };
        /*$scope.login = function() {
            loginservice.login($scope.user);
        }*/
    }

})();