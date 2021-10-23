import Express from "express";
import {
  listarVentas,
  crearVenta,
  editarVenta,
  eliminarVenta,
  busquedaVenta,
} from "../../controllers/ventas/controler.js";

const rutasVenta = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los ventas");
  } else {
    res.json(result);
  }
};

rutasVenta.route("/ventas").get((req, res) => {
  listarVentas(genericCallback(res));
});

rutasVenta.route("/ventas/:id").get((req, res) => {
  busquedaVenta(req.params.id, genericCallback(res));
});

rutasVenta.route("/ventas").post((req, res) => {
  crearVenta(req.body, genericCallback(res));
});

rutasVenta.route("/ventas/:id").patch((req, res) => {
  editarVenta(req.params.id, req.body, genericCallback(res));
});

rutasVenta.route("/ventas/:id").delete((req, res) => {
  eliminarVenta(req.params.id, req.body, genericCallback(res));
});

export default rutasVenta;