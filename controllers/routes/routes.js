'use strict';

var express = require('express');
var router = express.Router();

//GET /postits
//Route for returning all postits
router.get('/', function(req, res) {
    res.json({
        response: 'You sent me a GET request'
    });
});

//POST /postits
//Route fore create postits
router.post('/', function(req, res) {
    res.json({
        response: 'You sent me a POST request',
        body: req.body
    });
});

//GET /postits/:id
//Route for geting a specific postit
router.get('/:id', function(req, res) {
    res.json({
        response: 'You sent me a GET request for ID ' + req.params.id
    });
});

//DELETE /postits/:id
//DELETE a specific postit
router.delete('/:id', function(req, res) {
    res.json({
        response: 'You sent me a DELETE request for ID ',
        postitId: req.params.id,
    });
});


//POST /postits/:id/info
//Route fore create postits note
router.post('/:id/info', function(req, res) {
    res.json({
        response: 'You sent me a POST request to /info',
        postitId: req.params.id,
        body: req.body
    });
});

//PUT /postits/:id/info
//Edit a specific postit note
router.put('/:id/info', function(req, res) {
    res.json({
        response: 'You sent me a PUT request to /info',
        postitId: req.params.id,
        body: req.body
    });
});

//DELETE /postits/:id/info
//DELETE a specific postit note
router.delete('/:id/info', function(req, res) {
    res.json({
        response: 'You sent me a DELETE request to /info',
        postitId: req.params.id,
    });
});


module.exports = router;
