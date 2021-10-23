//import express tradicional
//const express = require('express');

//import express modulo
import Express from "express";
import dotenv from "dotenv";
import { conectarDB } from "./db/db.js";
import rutasProducto from "./views/productos/rutas.js";
import rutasVenta from "./views/ventas/rutas.js";
import Cors from "cors";
import rutasUsuario from "./views/usuarios/rutas.js";

dotenv.config({ path: "./.env" });

const app = Express();
app.use(Cors());
app.use(Express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};

conectarDB(main);
