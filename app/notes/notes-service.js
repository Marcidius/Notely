/**
 * Created by ryan.king on 9/28/2015.
 */
(function () {
    angular.module('notely.notes.service', [])
        .service('notesservice', notesservice);

    notesservice['$inject'] = ['$http', '$filter', '$state', 'constants'];
    function notesservice($http, $filter, $state, constants) {
        var notes = [];
        var user = {
            apiKey: '$2a$10$JXHjElOLYsAYst9zbwjpBON0Wf0ECAKsZSugAB93FwqUps9t6Ngq6'
        };

        service();

        function service() {

        }

        this.fetchNotes = function () {
            return $http.get(constants.apiBasePath + 'notes?api_key=' + user.apiKey)
                .success(function (notesData) {
                    notes = notesData;
                });
        };

        //Outputs all notes
        this.all = function () {
            //console.log(notes);
            return notes;
        };

        this.findById = function (noteId) {
            var note = (
            $filter('filter')(notes, {id: parseInt(noteId)}, true)[0] || {}
            );

            return angular.copy(note);
        };

        this.replaceNote = function (note) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === note.id) {
                    notes.splice(i, 1);
                    notes.unshift(note);
                    break;
                }
            }
        };

        this.removeNote = function (note) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === note.id) {
                    notes.splice(i, 1);

                    break;
                }
            }
        };


        this.createOrUpdateNote = function (note) {
            if (note.hasOwnProperty('id')) {
                return this.updateNote(note);
            }
            else {
                return this.createNote(note);
            }
        };

        this.createNote = function (note) {
            return $http.post(constants.apiBasePath + '/notes', {
                api_key: user.apiKey,
                note: {
                    title: note.title,
                    body_html: note.body_html
                }
            })
                .success(function (noteData) {
                    notes.unshift(noteData.note);
                    $state.go('notes.form', {noteId: noteData.note.id});
                })
        };

        this.updateNote = function (note) {
            var vm = this;
            return $http.put(constants.apiBasePath + '/notes/' + note.id, {
                api_key: user.apiKey,
                note: {
                    title: note.title,
                    body_html: note.body_html
                }
            })
                .success(function (noteData) {
                    vm.replaceNote(noteData.note);
                    console.log('Updated note ' + note.id);
                })
        };

        this.deleteNote = function (note) {
            var self = this;
            return $http.delete(constants.apiBasePath + 'notes/' + note.id + '?api_key=' + user.apiKey)
                .success(function (noteData) {
                    self.removeNote(note);
                    //notes.splice(notes.indexOf(note.id));
                })
        };


    }
})();