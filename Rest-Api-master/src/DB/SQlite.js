const sqlite3 = require('sqlite3').verbose();
const config = require('../config');

const dbPath = config.sqlite.dbPath; // Ruta al archivo de la base de datos SQLite

let db;

function connectSQLite() {
    db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error("Error de conexión a la base de datos:", err.message);
            setTimeout(connectSQLite, 2000); // Intenta reconectar después de 2 segundos
        } else {
            console.log("Conexión a la base de datos SQLite establecida");
        }
    });

    db.on('error', err => {
        console.error('Error de base de datos:', err.message);
        if (err.code === "SQLITE_ERROR") {
            connectSQLite(); // Reintentar conexión si hay un error SQLite
        } else {
            throw err;
        }
    });
}

connectSQLite();

function todos(tabla, callback) {
    db.all(`SELECT * FROM ${tabla}`, (error, resultados) => {
        if (error) {
            console.error("Error al obtener todos los registros:", error.message);
            return callback(error, null);
        }
        return callback(null, resultados);
    });
}

function uno(tabla, id, callback) {
    db.get(`SELECT * FROM ${tabla} WHERE id = ?`, [id], (error, resultado) => {
        if (error) {
            console.error("Error al obtener el registro:", error.message);
            return callback(error, null);
        }
        return callback(null, resultado);
    });
}

function agregar(tabla, data, callback) {
    const keys = Object.keys(data);
    const values = keys.map(key => data[key]);
    const placeholders = keys.map(() => '?').join(',');

    db.run(`INSERT INTO ${tabla} (${keys.join(',')}) VALUES (${placeholders})`, values, function(error) {
        if (error) {
            console.error("Error al agregar el registro:", error.message);
            return callback(error, null);
        }
        return callback(null, this.lastID);
    });
}

function eliminar(tabla, id, callback) {
    db.run(`DELETE FROM ${tabla} WHERE id = ?`, [id], function(error) {
        if (error) {
            console.error("Error al eliminar el registro:", error.message);
            return callback(error, null);
        }
        return callback(null, this.changes);
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
};
