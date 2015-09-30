/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login')
        .service('authTokenService', authTokenService);

    authTokenService['$inject'] = ['$window'];
    function authTokenService($window) {
        var authToken = $window.localStorage.getItem('authToken');;

        this.set = function(token) {
            authToken = token;
            $window.localStorage.setItem('authToken', authToken);
        };

        this.get = function() {
            return authToken;
        }
    }
})();