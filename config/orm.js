// Import MySQL connection.
let connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (deluxe burger => 'deluxe burger')
            if (typeof value === "string") {
                value = "'" + value + "'";
            }
            // e.g. {burger_name: 'deluxe burger'} => ["burger_name='deluxe burger'"]
            // e.g. {devour: true} => ["devour=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

let orm = {
    all: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, vals, cb) {
        // console.log("hit");
        // console.log("cols", cols);
        // console.log("vals", vals);
        // let queryString = "INSERT INTO " + table;

        // queryString += " (";
        // queryString += cols.toString();
        // queryString += ") ";
        // queryString += "VALUES (";
        // queryString += printQuestionMarks(vals.length);
        // queryString += ") ";

        let queryString = `INSERT INTO ${table} (burger_name) VALUES (?)`

        console.log(queryString);

        connection.query(queryString, [vals], function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });  
    },
    //change devoured from false to true here?
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: function (table, condition, cb) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
}


// Export the orm object for the model (burgers.js).
module.exports = orm;