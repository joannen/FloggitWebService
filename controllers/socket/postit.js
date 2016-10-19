var postitModel = require('../models/postit');

module.exports = function(socket){

  //get all on connection
  socket.emit('postit-update', postitModel.getAll());

  postitModel.on('updated', function updatePostits(postIts){
    socket.emit('postit-update', postIts);
  });

  // socket.on('disconnect', function() {
  //   postitModel.removeListener('updated', onChange);
  //  });
};
