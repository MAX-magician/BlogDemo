const mysqls = require("../db/mysql");

function query(sql, callback) {
    mysqls.getConnection((err, connection) => {
        connection.query(sql, (err, result) => {
            callback(err, result);
            connection.release();
        })
    });
}

exports.query = query;
