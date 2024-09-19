import mysql2 from "mysql2";

const conn = mysql2.createConnection({
    host: '172.17.0.1',
    port: 3306,
    user: 'root',
    database: 'appian-quizz',
    decimalNumbers: true
});

export default conn;