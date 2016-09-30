var postIts = [];

//använda node-uuid?
function generateId() {
    return +(new Date());
}

module.exports.getAll = function() {
    //add validation to handle if list is empty
    return postIts;
};

module.exports.addOrUpdate = function(id, item) {
    var itemId;
    //add validation to see that postit is valid
    if (!item) {
        item = id;
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
            color: item.color
        }
    });
    return itemId;
};

module.exports.get = function(id) {

    //add validation if item !exists
    var itemToReturn = postIts.filter(function(item) {
        return item.id === id;
    });
    return itemToReturn;
};

module.exports.delete = function(id) {

    //add validation if item !exists
    var deletedItem = postIts.filter(function(item) {
        return item.id === id;
    });
    return deletedItem;
};
