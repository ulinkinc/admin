/*********************************************************************************
 * Copyright (C) 2013 uLink, Inc. All Rights Reserved.
 *
 * Created On: 3/25/13
 * Description:  This file will contain all of the routes for the models
 ********************************************************************************/
module.exports = function (app) {
    // event routes
    var user = require('../app/models/users'),
        event = require('../app/models/events'),
        snap = require('../app/models/snapshots'),
        suggestion = require('../app/models/suggestions'),
        flag = require('../app/models/flags');

    // event routes
    app.get('/api/events/:id', event.findById);
    app.get('/api/events', event.findAll);
    app.post('/api/events', event.createEvent);
    app.put('/api/events/:id', event.updateEvent);
    app.delete('/api/events/:id', event.deleteEvent);

    // socket event routes
    app.io.route('events', {
        find: function(req) {
            event.findAll(req);
        },
        findById: function(req) {
            event.findById
        },
        create: function(req) {
            event.createEvent
        },
        update: function(req) {
            event.updateEvent;
        },
        remove: function(req) {
            event.deleteEvent
        }
    });

    // users routes
    app.get('/api/users', user.findAll);
    app.get('/api/users/:id', user.findById);

    // socket users routes
    app.io.route('users', {
        find: function(req) {
            user.findAll(req);
        },
        create: function(req) {
        },
        update: function(req) {
        },
        remove: function(req) {
        }
    });

    // snapshots routes
    app.get('/api/snaps', snap.findAll);

    // socket snaps routes
    app.io.route('snaps', {
        find: function(req) {
            snap.findAll(req);
        },
        create: function(req) {
        },
        remove: function(req) {
        }
    });

    // suggestions routes
    app.get('/api/suggestions', suggestion.findAll);

    // socket suggestion routes
    app.io.route('suggestions', {
        find: function(req) {
            suggestion.findAll(req);
        }
    });

    // flag routes
    app.get('/api/flags', flag.findAll);

    // socket flag routes
    app.io.route('flags', {
        find: function(req) {
            flag.findAll(req);
        }
    });

    // TODO: add authenticate stuff to certain routes
    // app.param('userId', users.user) NOT Sure what this does
    //app.all('/api/*', requireAuthentication);
}