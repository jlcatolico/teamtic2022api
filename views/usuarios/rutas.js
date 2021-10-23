import Express from "express";
import {
  listarUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  busquedaUsuario,
} from "../../controllers/usuarios/controler.js";

const rutasUsuario = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los usuarios");
  } else {
    res.json(result);
  }
};

rutasUsuario.route("/usuarios").get((req, res) => {
  listarUsuarios(genericCallback(res));
});

rutasUsuario.route("/usuarios/:id").get((req, res) => {
  busquedaUsuario(req.params.id, genericCallback(res));
});

rutasUsuario.route("/usuarios").post((req, res) => {
  crearUsuario(req.body, genericCallback(res));
});

rutasUsuario.route("/usuarios/:id").patch((req, res) => {
  editarUsuario(req.params.id, req.body, genericCallback(res));
});

rutasUsuario.route("/usuarios/:id").delete((req, res) => {
  eliminarUsuario(req.params.id, req.body, genericCallback(res));
});

export default rutasUsuario;
