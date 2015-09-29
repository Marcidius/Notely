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

        //Outputs all notes
        this.all = function() {
            //console.log(notes);
            return notes;
        };

        this.findById = function (noteId) {
            var note =  (
                $filter('filter')(notes, {id: parseInt(noteId)}, true)[0] || {}
            );

            return angular.copy(note);
        };

        this.replaceNote = function(note) {
          for(var i = 0; i < notes.length; i++) {
              if(notes[i].id === note.id)
              {
                  notes.splice(i, 1);
                  notes.unshift(note);
                  break;
              }
          }
        };


        this.createOrUpdateNote = function(note) {
            if (note.hasOwnProperty('id')) {
                this.updateNote(note);
            }
            else {
                this.createNote(note);
            }
        };

        this.createNote = function(note) {
            return $http.post(neverNoteBaseURL + '/notes', {
                    api_key: user.apiKey,
                    note: {
                        title: note.title,
                        body_html: note.body_html
                    }
                })
                .success(function(noteData) {
                    notes.unshift(noteData.note);
                    $state.go('notes.form', { noteId: noteData.note.id });
                })
        };

        this.updateNote = function(note) {
            var vm = this;
            return $http.put(neverNoteBaseURL + '/notes/' + note.id, {
                    api_key: user.apiKey,
                    note: {
                        title: note.title,
                        body_html: note.body_html
                    }
                })
                .success(function(noteData) {
                    vm.replaceNote(noteData.note);
                    console.log('Updated note ' + note.id);
                })
        };


    }
})();