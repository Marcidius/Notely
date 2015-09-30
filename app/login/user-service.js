/**
 * Created by ryan.king on 9/30/2015.
 */
(function () {
    angular.module('notely.login')
        .service('userService', userService);

    userService['$inject'] = ['$window'];
    function userService($window) {
        var user = JSON.parse($window.localStorage.getItem('user'));

        this.set = function(userData) {
            user = userData;
            $window.localStorage.setItem('user', JSON.stringify(user));
        };

        this.get = function() {
            return user || {};
        };

        this.clear = function() {
            user = undefined;
            $window.localStorage.removeItem('user');
        };
    }
})();