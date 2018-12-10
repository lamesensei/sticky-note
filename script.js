(function() {
  var note = {
    board: document.getElementById('board'),
    create: function() {
      var note = document.createElement('div');
      var noteTitle = document.createElement('input');
      var noteContent = document.createElement('textarea');
      var closeButton = document.createElement('span');

      note.className = 'note';

      noteTitle.className = 'note-title';
      noteTitle.placeholder = 'Enter Title';

      noteContent.className = 'note-content';
      noteContent.placeholder = 'Enter Content';

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
    }
  };

  var init = function() {
    var createButton = document.getElementById('create-btn');
    createButton.addEventListener('click', note.create.bind(note));
  };

  init();
})();
