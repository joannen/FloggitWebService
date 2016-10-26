// var postitModel = require('../models/postit');
var whiteboardModel = require('../models/whiteboard');

module.exports = function(socket){

  //get all on connection
  // socket.emit('postit-update', postitModel.getAll());
  socket.emit('whiteboard-update', whiteboardModel.getAll());

  whiteboardModel.on('updated', function updateWhiteboards(whiteboards){
    socket.emit('whiteboard-update', whiteboards);
  });
  // postitModel.on('updated', function updatePostits(postIts){
  //   socket.emit('postit-update', postIts);
  // });

  // socket.on('disconnect', function() {
  //   postitModel.removeListener('updated', onChange);
  //  });
};
