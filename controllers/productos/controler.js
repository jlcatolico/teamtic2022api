import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const listarProductos = async (callback) => {
  const conexion = getDB();
  await conexion.collection("productos").find({}).limit(50).toArray(callback);
};

const busquedaProducto = async (id, callback) => {
  const conexion = getDB();
  await conexion
    .collection("productos")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const crearProducto = async (datosProducto, callback) => {
  if (
    Object.keys(datosProducto).includes("id_producto") &&
    Object.keys(datosProducto).includes("descripcion") &&
    Object.keys(datosProducto).includes("precio_unitario") &&
    Object.keys(datosProducto).includes("estado")
  ) {
    console.log("Campos ok");
    const conexion = getDB();
    await conexion.collection("productos").insertOne(datosProducto, callback);
    console.log("Campos Insertados");
  } else {
    return "error campos";
    console.log("Error en campos");
  }
};

const editarProducto = async (id, datosProducto, callback) => {
  console.log(datosProducto);
  const filtroProducto = { _id: new ObjectId(id) };
  delete datosProducto.id;
  const operacion = {
    $set: datosProducto,
  };
  const conexion = getDB();
  await conexion
    .collection("productos")
    .findOneAndUpdate(
      filtroProducto,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarProducto = async (id, datosProducto, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const conexion = getDB();
  conexion.collection("productos").deleteOne(filtroProducto, callback);
};

export {
  listarProductos,
  busquedaProducto,
  crearProducto,
  editarProducto,
  eliminarProducto,
};
