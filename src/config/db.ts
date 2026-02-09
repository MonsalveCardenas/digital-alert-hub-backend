import { Sequelize } from "sequelize"; // Importamos Sequelize, que es el ORM que permite interactuar con la base de datos.
import dotenv from "dotenv"; // Importamos dotenv para poder usar variables de entorno desde el archivo .env

dotenv.config(); // Cargamos las variables definidas en el archivo .env al entorno de ejecución (process.env)

// Creamos una instancia de Sequelize con la configuración de conexión.
// Sequelize necesita el nombre de la base de datos, el usuario, la contraseña y un objeto con las opciones.
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development", // Activa los logs de SQL solo si el entorno es de desarrollo (útil para depurar)
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Neon requiere esto
      },
    },
  }
);

export const connectDB = async (): Promise<void> => {
  //  Función para conectar la app con la base de datos
  try {
    // Verifica que la conexión sea válida (intenta autenticar con las credenciales)
    await sequelize.authenticate();
    console.log("Conexión a PostgreSQL establecida correctamente.");

    // Sincroniza los modelos con la base de datos
    // force: true en primera ejecución (borra y crea todo), luego cambiar a false
    await sequelize.sync({ force: process.env.FORCE_SYNC === "true", alter: false });
    console.log("Modelos sincronizados con la base de datos.");
  } catch (error) {
    console.error("Error al conectar con PostgreSQL:", error); // Cierra el proceso de Node.js con código 1 (error)
    process.exit(1);
  }
};
