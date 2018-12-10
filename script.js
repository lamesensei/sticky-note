(function() {
  var note = {
    board: document.getElementById('board'),
    create: function(title, content) {
      var note = document.createElement('div');
      var noteTitle = document.createElement('input');
      var noteContent = document.createElement('textarea');
      var closeButton = document.createElement('span');

      note.className = 'note';

      noteTitle.className = 'note-title';
      noteTitle.placeholder = 'Enter Title';
      if (typeof title !== 'object') noteTitle.value = title;

      noteContent.className = 'note-content';
      noteContent.placeholder = 'Enter Content';
      if (content) noteContent.value = content;

      closeButton.className = 'close-btn';
      closeButton.textContent = 'X';
      closeButton.addEventListener('click', this.close.bind(this));

      note.appendChild(noteTitle);
      note.appendChild(closeButton);
      note.appendChild(noteContent);

      this.board.appendChild(note);
      noteTitle.focus();
    },
    close: function(event) {
      this.board.removeChild(event.target.parentNode);
      this.save();
    },
    save: function() {
      var notes = this.board.childNodes;
      var buffer = [];
      Array.prototype.forEach.call(notes, function(note) {
        var currentNote = {
          title: note.childNodes[0].value,
          content: note.childNodes[2].value
        };
        buffer.push(currentNote);
      });
      localStorage.setItem('notes', JSON.stringify(buffer));
    },
    load: function() {
      var itself = this;
      if (localStorage.notes) {
        var saveData = JSON.parse(localStorage.notes);
        saveData.forEach(function(item) {
          itself.create(item.title, item.content);
        });
      }
    },
    clear: function() {
      while (this.board.lastChild) {
        this.board.removeChild(this.board.lastChild);
      }
      localStorage.clear();
    },
    instruct: function() {
      if (!localStorage.notes) {
        var instructions = {
          title: 'Instructions',
          content:
            'Press create to make a new note.\n\nSave to save all your notes.\n\nClear to clear all notes from display and memory.\n\nTo filter your notes, just use the search bar in the title.'
        };
        localStorage.setItem('notes', JSON.stringify([instructions]));
      }
    }
  };

  var searchNotes = function(event) {
    var input = event.target.value.toLowerCase();
    var notes = note.board.childNodes;
    Array.prototype.forEach.call(notes, function(note) {
      note.firstChild.value.toLowerCase().indexOf(input) !== -1
        ? (note.style.display = 'inline-block')
        : (note.style.display = 'none');
    });
  };

  var init = function() {
    var createButton = document.getElementById('create-btn');
    createButton.addEventListener('click', note.create.bind(note));

    var saveButton = document.getElementById('save-btn');
    saveButton.addEventListener('click', note.save.bind(note));

    var clearButton = document.getElementById('clear-btn');
    clearButton.addEventListener('click', note.clear.bind(note));

    var search = document.getElementById('search');
    search.addEventListener('input', searchNotes);

    note.instruct();
    note.load();
  };

  init();
})();
