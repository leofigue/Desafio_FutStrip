const express = require('express');
const app = express();

app.listen(3000, console.log("SERVER ON"));
app.use(express.json())

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')
const { validaUsuario } = require('./controllers/login')

const { validaLogin, validarToken } = require("./middleware/validar.js");

app.post("/login",validaLogin,validaUsuario)

app.get("/equipos", obtenerEquipos)
app.post("/equipos", validarToken, agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", validarToken, registrarJugador)

module.exports = app
