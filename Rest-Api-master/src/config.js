require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const config = {
    app: {
        port: process.env.PORT || 4000,
    },
    sqlite: {
        dbPath: process.env.DB_PATH || 'C:/prueba/usuarios.db', // Ruta al archivo de la base de datos SQLite
    }
};

module.exports = config;
