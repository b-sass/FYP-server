import mysql from "mysql";

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'test',
    password : 'pass',
    database : 'test'
});

function getAllUsers() {
    let sql = "SELECT * FROM user"
    let users;
    connection.query(sql, (err, res, rows) => {
        return (res);
    })
}

async function getUser(ID) {
    connection.connect();

    

    connection.end();
}


export default getAllUsers;