/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login')
        .service('authTokenService', authTokenService);

    function authTokenService() {
        var authToken;

        this.set = function(token) {
            authToken = token;
        };

        this.get = function() {
            return authToken;
        }
    }
})();