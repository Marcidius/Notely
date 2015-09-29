/**
 * Created by ryan.king on 9/28/2015.
 */
(function () {
    angular.module('notely.notes.service', [])
        .service('notesservice', notesservice);

    notesservice['$inject'] = ['$http', '$filter'];
    function notesservice($http, $filter) {
        var notes = [];
        var neverNoteBaseURL = 'https://nevernote-1150.herokuapp.com/api/v1/';
        var user = {
            apiKey: '$2a$10$JXHjElOLYsAYst9zbwjpBON0Wf0ECAKsZSugAB93FwqUps9t6Ngq6'
        };

        service();

        function service() {

        }

        this.fetchNotes = function (callback) {
            $http.get(neverNoteBaseURL + 'notes?api_key=' + user.apiKey)
                .success(function(notesData) {
                    notes = notesData;
                    //debugger;
                    if (callback) {
                        callback(notes);
                        //return notes;
                    }
                });
        };

        this.all = function() {
            console.log(notes);
        };

        this.findById = function (noteId) {
            return (
                $filter('filter')(notes, {id: parseInt(noteId)}, true)[0] || {}
            );
            //debugger;
        }
    }
})();