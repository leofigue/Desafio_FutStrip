const { getTeams, addTeam } = require('../db/consultas')

const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await getTeams()
        res.status(200).json(equipos)    
    } catch ({ code, message }) {
        res.status(code || 500).json({message});
    }
    
}

const agregarEquipo = async (req, res) => {
    try {
        const { name } = req.body
        await addTeam(name)
        res.status(200).send({ message: "Equipo agregado con éxito" })
        
    } catch ({ code, message }) {
        res.status(code || 500).json({message});
    }
    
}

module.exports = { obtenerEquipos, agregarEquipo }