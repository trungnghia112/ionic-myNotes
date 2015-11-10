// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);


var notes = [];
function getNote(noteId) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === noteId) {
            return notes[i];
        }
    }
    return undefined;
};

function updateNote(note) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === note.id) {
            notes[i] = note;
            return;
        }
    }
};

function addNote(note) {
    notes.push(note);
};

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

app.controller('listCtrl', function ($scope) {
    $scope.notes = notes;
});

app.controller('addCtrl', function ($scope, $state) {

    $scope.note = {
        id: new Date().getTime().toString(),
        title:"",
        description:""
    };

    $scope.save = function () {
        addNote($scope.note);
        $state.go('list');
    };

});

app.controller('editCtrl', function ($scope, $state) {

    $scope.note = angular.copy(getNote($state.params.noteId));
    $scope.save = function () {
        updateNote($scope.note);
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
