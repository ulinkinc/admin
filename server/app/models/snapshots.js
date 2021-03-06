/*********************************************************************************
 * Copyright (C) 2013 uLink, Inc. All Rights Reserved.
 *
 * Created On: 3/27/13
 * Description:
 ********************************************************************************/
var env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    response = require('../../response'),
    mysql = require('mysql');

// make the connection to the mysql db
var db = mysql.createConnection(config.mysql_db_url);

/**
 * This is function will find all the snapshots based on the
 * passed in parameters
 * @param req
 * @param res
 */
exports.findAll = function(req, res) {
    db.query('select _id id, category, caption, userId user_id, schoolId school_id, imageURL image_url, created from snapshots', function(err, snaps) {
        if ( err ) {
            console.log('{snapshots#findAll} - Error: ' + err);
            if(!res) {
                req.io.respond( {error : "There was an issue with your request." } , response.SYSTEM_ERROR.code);
            } else {
                res.send({error : "There was an issue with your request." }, response.SYSTEM_ERROR.code);
            }
        }
        else if(!snaps ) {
            if(!res) {
                req.io.respond( {snaps : {} } , response.SUCCESS.code);
            } else {
                res.send({snaps : {}  }, response.SUCCESS.code);
            }
        }
        else {
            if(!res) {
                req.io.respond( {snaps : snaps } , response.SUCCESS.code);
            } else {
                res.send({snaps : snaps }, response.SUCCESS.code);
            }
        }
    });
};
