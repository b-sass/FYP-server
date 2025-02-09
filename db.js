import mysql from "mysql";

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'test',
    password : 'pass',
    database : 'test'
});

function getAssignments() {}

function getSessions() {}

function getUsers() {}


export default connection;