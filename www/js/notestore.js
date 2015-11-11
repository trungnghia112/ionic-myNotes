angular.module('MyNotes.notestore', [])
    .factory('NoteStore', function () {
        var notes = angular.fromJson(window.localStorage['notes'] || '[]');

        function storeToLocal() {
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
                storeToLocal();
            },
            update: function (note) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === note.id) {
                        notes[i] = note;
                        storeToLocal();
                        return;
                    }
                }
            },
            remove: function (noteId) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === noteId) {
                        notes.splice(i, 1);
                        storeToLocal();
                        return;
                    }
                }
            },
            moveItem: function (note, fromIndex, toIndex) {
                //Move the item in the array
                notes.splice(fromIndex, 1);
                notes.splice(toIndex, 0, note);
                storeToLocal();
            }
        }
    });