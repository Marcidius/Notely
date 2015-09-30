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
                controller: LoginController,
                resolve: {
                    loggedOut: function ($q, $state, $timeout, CurrentUser) {
                        var deferred = $q.defer();
                        $timeout(function () {
                            if (CurrentUser.get().id) {
                                $state.go('notes.form');
                                deferred.reject();
                            }
                            else {
                                deferred.resolve();
                            }
                        });
                        return deferred.promise;
                    }
                }
            });
    }

    LoginController['$inject'] = ['$scope', '$state', 'loginService'];
    function LoginController($scope, $state, loginService) {
        $scope.user = {};
        $scope.login = function() {
            loginService.login($scope.user)
                .success(function() {
                    $state.go('notes.form');
                })

        }
    }

})();