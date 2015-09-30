/**
 * Created by ryan.king on 9/30/2015.
 */
(function () {
    angular.module('notely')
        .directive('bdNotesList', bdNotesList);


//bdFocusOn[$inject] = [];
    function bdNotesList() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            //template: '<div>OH HAI THERE!</div>'
            templateUrl: '/directives/bd-notes-list.html',
            controller: notesListController
            //controllerAs: 'vm'
        };
    }


    notesListController['$inject'] = ['$scope', 'notesservice'];
    function notesListController($scope, notesservice) {
        $scope.notes = notesservice.all();
    }
})();