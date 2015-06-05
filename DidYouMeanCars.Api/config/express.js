var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {
  app.use(logger('dev'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
}