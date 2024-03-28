const { getPlayers, addPlayer } = require('../db/consultas')

const obtenerJugadores = async (req, res) => {
    const { teamID } = req.params
    const jugadores = await getPlayers(teamID)
    res.json(jugadores)
}

const registrarJugador = async (req, res) => {
    try {
        const { teamID } = req.params
        const jugador = req.body
        await addPlayer({ jugador, teamID })
        res.status(201).json({ message: "Jugador agregado con éxito" })    
    } catch ({ code, message }) {
        res.status(code || 500).json({message});
    }
    
}


module.exports = { obtenerJugadores, registrarJugador }