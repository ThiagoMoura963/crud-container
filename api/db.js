import mysql from "mysql";

//conexão com o banco de dados
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dev123",
    database: "dbContainer"
});