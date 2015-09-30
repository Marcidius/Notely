/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login')
        .service('loginService', loginService);

    loginService['$inject'] = ['$http', 'constants', 'authTokenService', 'userService', '$state'];
    function loginService($http, constants, authTokenService, userService, $state) {
        this.login = function(user) {
            return $http.post(constants.apiBasePath + 'session', {
                user: {
                    username: user.username,
                    password: user.password
                }
            })
                .success(function (userData) {
                    userService.set(userData.user);
                    authTokenService.set(userData.auth_token);
                });
        };

        this.logout = function() {
            authTokenService.clear();
            userService.clear();
            $state.go('login');
        };
    }
})();