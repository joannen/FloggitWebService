var postitModel = require('../models/postit');

module.exports = function(socket){
  function onChange(postIts){
    socket.emit('postit-update', postIts);
  }

  onChange(postitModel.getAll());

  postitModel.on('updated', onChange);

  socket.on('disconnect', function() {
    postitModel.removeListener('updated', onChange);
   });
};
