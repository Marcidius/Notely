/**
 * Created by ryan.king on 9/28/2015.
 */
(function () {
    angular.module('notely.notes.service', [])
        .service('notesservice', notesService);

    notesService['$inject'] = ['$http'];
    function notesService($http) {
        var notes = [];
        var neverNoteBaseURL = 'https://nevernote-1150.herokuapp.com/api/v1/';
        var user = {
            apiKey: '$2a$10$JXHjElOLYsAYst9zbwjpBON0Wf0ECAKsZSugAB93FwqUps9t6Ngq6'
        };

        service();

        function service() {

        }

        this.fetchNotes = function (callback) {
            var notes = [];
            $http.get(neverNoteBaseURL + 'notes?api_key=' + user.apiKey)
                .success(function(notesData) {
                    notes = notesData;
                    debugger;
                    if (callback) {
                        callback(notes);
                        //return notes;
                    }
                });
        }
    }
})();