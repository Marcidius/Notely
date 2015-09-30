/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login')
        .factory('authInterceptor', authInterceptor);

        authInterceptor['$inject'] = ['authTokenService', 'constants'];
        function authInterceptor(authTokenService, constants) {
           return {
               request: function(config) {
                   //config.headers = config.headers || {};

                   var token = authTokenService.get();
                   if(token && config.url.indexOf(constants.apiBasePath) > -1) {
                       // persist the token
                       // make logout work
                       // redirect to login whenever you're logged out
                       // redirect to notes whenever you're logged in
                       // usability
                       // SET sessionstorage.token = token

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