import { createPool } from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: "M6ZNw29M9zoCPd",
    database: 'tadaima',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
