(function() {
  var note = {
    create: function() {
      var note = document.createElement('div');
      var noteTitle = document.createElement('input');
      var noteContent = document.createElement('textarea');
      var closeButton = document.createElement('span');
      var board = document.getElementById('board');

      note.className = 'note';

      noteTitle.className = 'note-title';
      noteTitle.placeholder = 'Enter Title';

      noteContent.className = 'note-content';
      noteContent.placeholder = 'Enter Content';

      closeButton.className = 'close-btn';
      closeButton.textContent = 'X';

      note.appendChild(noteTitle);
      note.appendChild(closeButton);
      note.appendChild(noteContent);

      board.appendChild(note);
      noteTitle.focus();
    }
  };

  var init = function() {
    var createButton = document.getElementById('create-btn');
    createButton.addEventListener('click', note.create);
  };

  init();
})();
