const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD", () => {
    it('Trae todos los equipos', async()=>{
        const respuesta = await request(server).get("/equipos").send();
        expect(respuesta.status).toBe(200);
    })

    it('Inserta un jugador', async()=>{
        const jwt = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzExNjY3MjQ5fQ.T4az8ut7An_TFnIYbUbb3pcA0FIVmGSM-9vF5bkr7m0"
        const jugador = {
            id_equipo : "1",
            name : "Colocar el nombre del jugador",
            position : "1"
          }

        const respuesta = await request(server).post("/equipos/1/jugadores")
        .set("Authorization", jwt)
        .send(jugador);
        expect(respuesta.status).toBe(201);
    })

});

describe("Validar Login", () => {
    it('Datos LOGIN incorrectos', async()=>{

        const usuario = {username: "admin", password:'12345'};

        const respuesta = await request(server).post("/login").send(usuario);
        expect(respuesta.status).toBe(400);
    })
    it('Datos LOGIN correctos', async()=>{

        const usuario = {username: "admin", password:'1234'};

        const respuesta = await request(server).post("/login").send(usuario);
        console.log(respuesta.body)
        expect(respuesta.body).toBeInstanceOf(Object)
    })
});