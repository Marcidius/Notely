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
        notesservice.fetchNotes(function(notes) {
            //console.log($state.params.noteId);
            $scope.note = notesservice.findById($state.params.noteId);
            console.log($scope.note.title);

        });
        ///  THIS MIGHT BE KEY TO LOADING DATA FIRST IN THE PROBLEM WITH CAPPS
        //$state.go('notes.form');

    }


})();
