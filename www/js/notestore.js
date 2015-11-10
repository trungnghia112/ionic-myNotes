angular.module('MyNotes.notestore', [])
    .factory('NoteStore', function () {
        var notes = angular.fromJson(window.localStorage['notes'] || '[]');

        function store_lc() {
            window.localStorage['notes'] = angular.toJson(notes);
        }

        return {
            list: function () {
                return notes;
            },
            get: function (noteId) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === noteId) {
                        return notes[i];
                    }
                }
                return undefined;
            },
            add: function (note) {
                notes.push(note);
                store_lc();
            },
            update: function (note) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === note.id) {
                        notes[i] = note;
                        store_lc();
                        return;
                    }
                }
            }
        }
    });