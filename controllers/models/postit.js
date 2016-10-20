var postIts = [];
var events = require('events');
var eventEmitter = new events.EventEmitter();


//använda node-uuid?
function generateId() {
  return +(new Date());
}
function update() {
  console.log('UPDATED', postIts);
  eventEmitter.emit('updated', postIts);
}
module.exports.getAll = function() {
    //add validation to handle if list is empty
    return postIts.sort(function(one, two) {
        if (one.id > two.id) {
          return -1;
        }

        if (one.id < two.id) {
          return 1;
        }

        return 0;
      });

};

module.exports.addOrUpdate = function (id, item) {
  var itemId;
  var timeCreated;
  //add validation to see that postit is valid
  if (!item) {
    timeCreated = new Date();
    item = id;
    item.timeCreated = timeCreated.toLocaleString();
    itemId = generateId();
  } else {
    itemId = id;

  }
  postIts.push({
    id: itemId,
    postIt: {
      title: item.title,
      text: item.text,
      timeCreated: item.timeCreated,
      color: item.color,
      notes: item.notes
    }
  });
  update();
  return itemId;
};

module.exports.get = function (id) {
  id = parseInt(id);
  //add validation if item !exists
  var itemToReturn = postIts.filter(function (item) {
    return item.id === id;
  });
  return itemToReturn;
};
//delete-method was not deleting
module.exports.delete = function (id) {

  id = parseInt(id);
  //add validation if item !exists
  var deletedItem = postIts.filter(function (item) {
    return item.id === id;
  });
  postIts = postIts.filter(function (item) {
    return item.id !== id;
  });

  update();
  return deletedItem;
};

module.exports.on = function(name, func){
  eventEmitter.on(name, func);
};

module.exports.removeListener= function(name, func){
  eventEmitter.removeListener(name, func);
};
