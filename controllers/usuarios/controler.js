import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const listarUsuarios = async (callback) => {
  const conexion = getDB();
  await conexion.collection("usuarios").find({}).limit(50).toArray(callback);
};

const busquedaUsuario = async (id, callback) => {
  const conexion = getDB();
  await conexion
    .collection("usuarios")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  if (
    Object.keys(datosUsuario).includes("identificacion") &&
    Object.keys(datosUsuario).includes("nombre") &&
    Object.keys(datosUsuario).includes("apellido") &&
    Object.keys(datosUsuario).includes("correo") &&
    Object.keys(datosUsuario).includes("estado") &&
    Object.keys(datosUsuario).includes("rol")
  ) {
    console.log("Campos ok");
    const conexion = getDB();
    await conexion.collection("usuarios").insertOne(datosUsuario, callback);
    console.log("Campos Insertados");
  } else {
    return "error campos";
    console.log("Error en campos");
  }
};

const editarUsuario = async (id, datosUsuario, callback) => {
  console.log(datosUsuario);
  const filtroUsuario = { _id: new ObjectId(id) };
  delete datosUsuario.id;
  const operacion = {
    $set: datosUsuario,
  };
  const conexion = getDB();
  await conexion
    .collection("usuarios")
    .findOneAndUpdate(
      filtroUsuario,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarUsuario = async (id, datosUsuario, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const conexion = getDB();
  conexion.collection("usuarios").deleteOne(filtroUsuario, callback);
};

export {
  listarUsuarios,
  busquedaUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
};
