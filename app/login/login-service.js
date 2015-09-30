/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login')
        .service('loginService', loginService);

    loginService['$inject'] = ['$http', 'constants', 'authTokenService']
    function loginService($http, constants, authTokenService) {
        this.login = function(user) {
            return $http.post(constants.apiBasePath + 'session', {
                user: {
                    username: user.username,
                    password: user.password
                }
            })
                .success(function (userData) {
                    authTokenService.set(userData.auth_token);
                });
        }
    }
})();