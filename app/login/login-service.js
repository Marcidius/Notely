/**
 * Created by ryan.king on 9/30/2015.
 */
(function() {
    angular.module('notely.login')
        .service('loginService', loginService);

    loginService['$inject'] = ['$http', 'constants']
    function loginService($http, constants) {
        this.login = function(user) {
            return $http.post(constants.apiBasePath + 'session', {
                //api_key: user.apiKey,
                user: {
                    username: user.username,
                    password: user.password
                }
            })
                .success(function (userData) {
                //notes.unshift(noteData.note);
                //$state.go('notes.form', {noteId: noteData.note.id});
                debugger;
                });



            /*return $http.post();
            console.log('Inside loginService.login');
            return {}*/
        }
    }
})();