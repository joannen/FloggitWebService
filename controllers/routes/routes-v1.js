var express = require('express');
var whiteboardModel = require('../models/whiteboard');
var postitModel = require('../models/postit');

var router = express.Router();

router.get('/whiteboards', function(req, res){
  res.json(whiteboardModel.getAll());
});

router.route('/whiteboards')
        .post(function(req, res){
          var newWhiteBoard = req.body;
          var id = whiteboardModel.addOrUpdate(newWhiteBoard);
          res.json({
            id: id
          });
        });

// get a postit (accessed at GET http://localhost:8080/api/v1/postits)
router.get('/whiteboards/:id', function(req, res) {
  console.log(req.params.id);
  res.json(whiteboardModel.getAllPostits(req.params.id));

});

// create a postit (accessed at POST http://localhost:8080/api/v1/postits)
router.route('/whiteboards/:id/postits')
  .post(function(req, res) {
    var newpostit = req.body;
    console.log(newpostit);
    var whiteboardId = req.params.id;
    // console.log('whiteboardId: ' + );
    var id = whiteboardModel.addOrUpdatePostit(whiteboardId, newpostit);
    res.json({
      id: id
    });
  });

// get the postit with id (accessed at PUT http://localhost:8080/api/v1/postits/:id)
router.route('/whiteboards/:whiteboardId/postits/:id')
  // .get(function(req, res) {
  //   var postitItem = postitModel.get(req.params.id);
  //   if (postitItem) {
  //     res.json(postitModel.get(req.params.id));
  //   } else {
  //     res.status(404);
  //     res.send();
  //   }
  // })
  .delete(function(req, res) {
    console.log('DELETING!!!!');
    whiteboardModel.deletePostit(req.params.whiteboardId, req.params.id);
    res.status(200);
    res.json({
      message: 'Successfully deleted'
    });
    // res.send();
  })
  // update the postit with id (accessed at PUT http://localhost:8080/api/v1/postits/:id)
  .put(function(req, res) {
    var updatePostit = req.body;
      var id = req.params.id;
      id = parseInt(id);
      if (postitModel.get(id)) {
        postitModel.delete(id);
        postitModel.addOrUpdate(id, updatePostit);
        res.status(200);
        res.send();
      } else {
        postitModel.addOrUpdate(id, updatePostit);
        res.status(201);
        res.json({
          id: id
        });
        res.send();
      }
  });

  module.exports = router;
