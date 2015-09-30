/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login')
        .factory('authInterceptor', authInterceptor);

        authInterceptor['$inject'] = ['authTokenService'];
        function authInterceptor(authTokenService) {
           return {
               request: function(config) {
                   //config.headers = config.headers || {};

                   var token = authTokenService.get();
                   if(token) {
                       config.headers['Authorization'] = token;
                   }
                   return config;
               }

           };
        }

    angular.module('notely')
        .config(function($httpProvider) {
            return $httpProvider.interceptors.push('authInterceptor');
        });
})();