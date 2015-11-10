// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('MyNotes', ['ionic','MyNotes.notestore']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('list', {
        url: '/list',
        templateUrl: '/templates/list.html'
    });

    $stateProvider.state('add', {
        url: '/add',
        templateUrl: '/templates/edit.html',
        controller: 'addCtrl'
    });

    $stateProvider.state('edit', {
        url: '/edit/:noteId',
        templateUrl: '/templates/edit.html',
        controller: 'editCtrl'
    });
    $urlRouterProvider.otherwise('/list');
});

app.controller('listCtrl', function ($scope, NoteStore) {
    $scope.notes = NoteStore.list();
});

app.controller('addCtrl', function ($scope, $state, NoteStore) {

    $scope.note = {
        id: new Date().getTime().toString(),
        title: "",
        description: ""
    };

    $scope.save = function () {
        NoteStore.add($scope.note);
        $state.go('list');
    };

});

app.controller('editCtrl', function ($scope, $state, NoteStore) {

    $scope.note = angular.copy(NoteStore.get($state.params.noteId));
    $scope.save = function () {
        NoteStore.update($scope.note);
        $state.go('list');
    };

});

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
