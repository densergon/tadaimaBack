import { createPool } from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: "C0ntr4$3nia",
    database: 'tadaima',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
