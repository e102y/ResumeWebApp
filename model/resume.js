var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM resume_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(resume_id, callback) {
    var query = 'SELECT * FROM resumeGet WHERE resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'CALL resume_New (?, ?, ?, ?, ?, ?, ?);';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.user_account_id,params.resume_name,params.skill_id,params.date_shared_year + '-' + params.date_shared_month + '-' + params.date_shared_day, params.company_id, params.school_id, params.was_hired];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });

};


    exports.delete = function(resume_id, callback) {
        var query = 'DELETE FROM resume_ WHERE resume_id = ?';
        var queryData = [resume_id];

        connection.query(query, queryData, function (err, result) {
            callback(err, result);
        });
    };



        exports.edit = function(params, callback) {
            var query = 'CALL resume_setinfo (?, ?, ?, ?, ?, ?, ?, ?);';

            // the question marks in the sql query above will be replaced by the values of the
            // the data in queryData
            var queryData = [params.user_account_id,params.resume_name,params.skill_id,params.date_shared_year + '-' + params.date_shared_month + '-' + params.date_shared_day,params.company_id, params.school_id, params.resume_id, params.was_hired];


            connection.query(query, queryData, function(err, result) {
                callback(err, result);
            });
        };

    


