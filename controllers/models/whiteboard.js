var whiteboards = [];
var events = require('events');
var eventEmitter = new events.EventEmitter();

function generateId() {
  return +(new Date());
}

function update() {
  eventEmitter;
  eventEmitter.emit('updated', whiteboards);
}

module.exports.getAll = function() {
    return whiteboards;
};

module.exports.addOrUpdate = function (id, whiteboard){
  var whiteboardId;
  if(!whiteboard){
    whiteboard = id;
    whiteboardId = generateId();
  }else{
    whiteboardId = id;
  }
  whiteboards.push({
    id:whiteboardId,
    whiteboard:{
      name: whiteboard.name,
      postIts: whiteboard.postIts
    }
  });

  update();
  return whiteboardId;
};

module.exports.get = function (id) {
  id = parseInt(id);
  var itemToReturn = whiteboards.filter(function (item) {
    return item.id === id;
  });
  return itemToReturn;
};

module.exports.delete = function (id) {
  id = parseInt(id);
  var deletedItem = whiteboards.filter(function (item) {
    return item.id === id;
  });
  whiteboards = whiteboards.filter(function (item) {
    return item.id !== id;
  });
  update();
  return deletedItem;
};

module.exports.getAllPostits = function(whiteboardId) {
    whiteboardId = parseInt(whiteboardId);
    var index = whiteboards.findIndex(function(item){
      return item.id === whiteboardId;
    });
    console.log('POSTITS TO GET:' +whiteboards[index].whiteboard.postIts);
    return whiteboards[index].whiteboard.postIts;
};

module.exports.addOrUpdatePostit = function (whiteboardId, id, item) {
  var itemId;
  var timeCreated;
  whiteboardId = parseInt(whiteboardId);

  var index = whiteboards.findIndex(function(item){
    return item.id === whiteboardId;
  });
  console.log('WHITBOARD ID: ' + whiteboardId);
  if (!item) {
    timeCreated = new Date();
    item = id;
    item.timeCreated = timeCreated.toLocaleString();
    itemId = generateId();
  } else {
    itemId = id;
  }
  // item.whiteboard = whiteboardId;
  whiteboards[index].whiteboard.postIts.push({
    id: itemId,
    postIt: {
      title: item.title,
      text: item.text,
      timeCreated: item.timeCreated,
      color: item.color,
      notes: item.notes,
      whiteboard: item.whiteboard
    }
  });
  update();
  return itemId;
};

module.exports.deletePostit = function (whiteboardId, id) {
  whiteboardId = parseInt(whiteboardId);
  id = parseInt(id);
  var index = whiteboards.findIndex(function(item){
    return item.id === whiteboardId;
  });
  var deletedItem = whiteboards[index].whiteboard.postIts.filter(function (item) {
    return item.id === id;
  })[0];
  whiteboards[index].whiteboard.postIts = whiteboards[index].whiteboard.postIts.filter(function (item) {
    return item.id !== id;
  });
  update();
  console.log('DELETED ITEM' + deletedItem.id);
  return deletedItem;
};

module.exports.on = function(name, func){
  eventEmitter.on(name, func);
};

module.exports.removeListener= function(name, func){
  eventEmitter.removeListener(name, func);
};
