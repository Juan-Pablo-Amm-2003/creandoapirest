const sqlite3 = require('sqlite3').verbose();
const config = require('../../config');  

const TABLA = 'usuarios';


const dbPath = config.sqlite.dbPath;
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err.message);
    } else {
        console.log("Conexión a la base de datos SQLite establecida");
    }
});


function todos(callback) {
    db.all(`SELECT * FROM ${TABLA}`, (error, resultados) => {
        if (error) {
            console.error("Error al obtener todos los registros:", error.message);
            return callback(error, null);
        }
        return callback(null, resultados);
    });
}

module.exports = {
    todos,
};
