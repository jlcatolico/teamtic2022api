import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const conectarDB = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error en la conexion a la base de datos");
    }
    conexion = db.db("gestorventas");
    console.log("Conexion a BD existosa");
    return callback();
  });
};

const getDB = () => {
  return conexion;
};

export { conectarDB, getDB };
