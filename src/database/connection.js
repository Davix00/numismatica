import sql from "mssql";
import { config } from "dotenv";
config();

const dbSettings = {
  user: process.env.USER || '',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || '',
  server: "localhost",
  options: {
    encrypt: true, // para desarrollo local true
    trustServerCertificate: true, // cambiarlo a false para produccion
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export const getConnection = async() => {
  try {
    const pool = await sql.connect(dbSettings);
    console.log("Conectado a la base de datos");
    return pool;
  }catch(err){
    console.error("Error en la base de datos", err);
  }
}

export { sql };