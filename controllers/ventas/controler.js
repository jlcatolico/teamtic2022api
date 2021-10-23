import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const listarVentas = async (callback) => {
  const conexion = getDB();
  await conexion.collection("ventas").find({}).limit(50).toArray(callback);
};

const busquedaVenta = async (id, callback) => {
  const conexion = getDB();
  await conexion
    .collection("ventas")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const crearVenta = async (datosVenta, callback) => {
  if (
    Object.keys(datosVenta).includes("id_venta") &&
    Object.keys(datosVenta).includes("nombre") &&
    Object.keys(datosVenta).includes("apellido") &&
    Object.keys(datosVenta).includes("correo") &&
    Object.keys(datosVenta).includes("estado") &&
    Object.keys(datosVenta).includes("rol")
  ) {
    console.log("Campos ok");
    const conexion = getDB();
    await conexion.collection("ventas").insertOne(datosVenta, callback);
    console.log("Campos Insertados");
  } else {
    return "error campos";
    console.log("Error en campos");
  }
};

const editarVenta = async (id, datosVenta, callback) => {
  console.log(datosVenta);
  const filtroVenta = { _id: new ObjectId(id) };
  delete datosVenta.id;
  const operacion = {
    $set: datosVenta,
  };
  const conexion = getDB();
  await conexion
    .collection("ventas")
    .findOneAndUpdate(
      filtroVenta,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarVenta = async (id, datosVenta, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const conexion = getDB();
  conexion.collection("ventas").deleteOne(filtroVenta, callback);
};

export { listarVentas, busquedaVenta, crearVenta, editarVenta, eliminarVenta };
