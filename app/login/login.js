/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login', [])
        .config(loginConfig)
        .controller(LoginController);

    loginConfig['$inject'] = ['$stateProvider'];
    function loginConfig($stateProvider) {
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

    LoginController['$inject'] = ['$scope', '$state', 'loginService'];
    function LoginController($scope, $state, loginService) {
        $scope.user = {};

        $scope.login = function() {
            console.log('LOGGING IN');
            loginService.login($scope.user)
                .success(function() {
                    $state.go('notes.form');
                })

        }
    }

})();