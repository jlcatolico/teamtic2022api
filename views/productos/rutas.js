import Express from "express";
import {
  listarProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
  busquedaProducto,
} from "../../controllers/productos/controler.js";
import { getDB } from "../../db/db.js";

const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los productos");
  } else {
    res.json(result);
  }
};

rutasProducto.route("/productos").get((req, res) => {
  listarProductos(genericCallback(res));
});

rutasProducto.route("/productos/:id").get((req, res) => {
  busquedaProducto(req.params.id, genericCallback(res));
});

rutasProducto.route("/productos").post((req, res) => {
  console.log("creando producto: ");
  crearProducto(req.body, genericCallback(res));
});

rutasProducto.route("/productos/:id").patch((req, res) => {
  editarProducto(req.params.id, req.body, genericCallback(res));
});

rutasProducto.route("/productos/:id").delete((req, res) => {
  eliminarProducto(req.params.id, req.body, genericCallback(res));
});

export default rutasProducto;
