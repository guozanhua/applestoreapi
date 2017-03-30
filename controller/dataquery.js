var mysql     = require('mysql')
var pool      = mysql.createPool({
    connectionLimit : 100, //important
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'gplay',
    debug           : false
})

var getConnection = function (callback) {
    pool.getConnection(function (err, connection) {
        // if(err) throw err
        // pass the error to the cb instead of throwing it
        if(err) {
            return callback(err)
        }
        callback(null, connection)
    })
}

var setQuery = function (query, callback){
    // Do something ...
    getConnection(function (err, con) {
        if(err) {
            con.release()
            
            // return callback(err)
        }
        console.log('connected as id ' + con.threadId)
        con.query(query,function(err,rows){
            con.release()
            if(err){
                return callback(err)
                // console.log(rows)
            }
            callback(err,rows)
        })
    })
}

// module.exports.getRental = function (callback){
//     // Do something ...
//     setQuery('select * from rental limit 5', function(err,rows){
//         callback(err,rows)
//     })
// }