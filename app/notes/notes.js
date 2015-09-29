/**
 * Created by ryan.king on 9/28/2015.
 */
(function() {
    angular.module('notely.notes', [
        'ui.router',
        'notely.notes.service'
    ])
        .controller('NotesController', NotesController)
        .controller('NotesFormController', NotesFormController)
        .config(notesConfig);

    notesConfig['$inject'] = ['$stateProvider'];
    function notesConfig($stateProvider) {
        $stateProvider

            .state('notes', {
                url: '/notes',
                abstract: true,
                templateUrl: '/notes/notes.html',
                controller: NotesController
            })

            .state('notes.form', {
                url: '/{noteId}',
                templateUrl: '/notes/notes-form.html',
                controller: NotesFormController
            });

    }

    NotesController['$inject'] = ['$scope', '$state', 'notesservice'];
    function NotesController($scope, $state, notesservice) {
        notesservice.fetchNotes(function(notes) {
            $scope.notes = notes;
        });
        ///  THIS MIGHT BE KEY TO LOADING DATA FIRST IN THE PROBLEM WITH CAPPS
        //$state.go('notes.form');

    }



    NotesFormController['$inject'] = ['$scope', '$state', 'notesservice'];
    function NotesFormController($scope, $state, notesservice) {
        $scope.note = notesservice.findById($state.params.noteId);
        $scope.buttonText = function() {
            if($scope.note.id) {
                return 'Update';
            }
            else {
                return 'Create';
            }
        };

        $scope.createNew = function() {
          notesservice.createNew();  
        };

        $scope.createOrUpdateNote = function() {
            notesservice.createOrUpdateNote($scope.note)
                .success(function(noteData) {
                    $scope.note = noteData.note;
                });
        };

        /*

        $scope.saveNote = function() {
            notesservice.saveNote($scope.note);

        };

        $scope.updateNote = function() {
            notesservice.savenote($scope.note);
        }*/


        ///  THIS MIGHT BE KEY TO LOADING DATA FIRST IN THE PROBLEM WITH CAPPS
        //$state.go('notes.form');

    }


})();
