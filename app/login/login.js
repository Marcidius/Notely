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

    LoginController['$inject'] = ['$scope', '$state'];
    function LoginController($scope, $state) {
        $scope.user = {

        };
        $scope.login = function() {
            console.log('LOGGING IN');
            //loginservice.login($scope.user);
            $state.go('notes.form');
        }
    }

})();