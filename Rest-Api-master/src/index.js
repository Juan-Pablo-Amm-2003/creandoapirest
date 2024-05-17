const app = require('./app.js');
const config = require('./config');

const dbPath = config.sqlite.dbPath;

// Conexión a la base de datos SQLite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err.message);
    } else {
        console.log("Conexión a la base de datos SQLite establecida");
    }
});

// Pasar la base de datos a la aplicación
app.set('db', db);

// Iniciar el servidor
app.listen(config.app.port, () => {
    console.log("Servidor escuchando en el puerto", config.app.port);
});
