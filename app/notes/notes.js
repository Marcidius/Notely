/**
 * Created by ryan.king on 9/28/2015.
 */
(function () {
    angular.module('notely.notes', [
        'textAngular',
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
                controller: NotesController,
                resolve: {
                    notesLoaded: function($q, $state, $timeout, notesservice, userService) {
                        var deferred = $q.defer();
                        $timeout(function() {
                            if (userService.get().id) {
                                notesservice.fetchNotes().success(function() {
                                    deferred.resolve();
                                })
                                    .error(function() {
                                        deferred.reject();
                                        $state.go('login');
                                    });
                            }
                            else {
                                deferred.reject();
                                $state.go('login');
                            }
                        });
                        return deferred.promise;
                    }
                }
            })

            .state('notes.form', {
                url: '/{noteId}',
                templateUrl: '/notes/notes-form.html',
                controller: NotesFormController,
                controllerAs: 'vm'
            });

    }

    NotesController['$inject'] = ['$scope', '$state', 'notesservice'];
    function NotesController($scope, $state, notesservice) {
        // this calls the .all function in the service which is verified to be
        // PRE-POPULATED DUE TO THE RESOLVE happening on the state.
        $scope.notes = notesservice.all();

    }


    NotesFormController['$inject'] = ['$scope', '$state', 'notesservice'];
    function NotesFormController($scope, $state, notesservice) {
        $scope.note = notesservice.findById($state.params.noteId);

        $scope.buttonText = function () {
            if ($scope.note.id) {
                return 'Update';
            }
            return 'Create';
        };

        $scope.createNew = function () {
            notesservice.createNew();
        };

        $scope.createOrUpdateNote = function () {
            notesservice.createOrUpdateNote($scope.note)
                .success(function (noteData) {
                    $scope.note = noteData.note;
                });
        };

        $scope.deleteNote = function () {
            notesservice.deleteNote($scope.note)
                .success(function (noteData) {
                    $state.go('notes.form', {noteId: undefined});
                })

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
