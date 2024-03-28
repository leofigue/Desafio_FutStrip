const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "futscript",
  allowExitOnIdle: true,
});

const getTeams = async () => {
  const { rows } = await pool.query(
    `SELECT id, name FROM equipos ORDER BY NAME;`
  );
  return rows;
};

const getPlayers = async (teamID) => {
  let consulta = "SELECT j.name, p.name posicion ";
  consulta += " FROM jugadores j";
  consulta += " INNER JOIN posiciones p ON p.id = j.position";
  consulta += ` WHERE j.id_equipo = ${teamID}`;

  const { rows } = await pool.query(consulta);
  return rows;
};

const addTeam = async (name) => {
try {
    const {rowCount} = await pool.query(
        "SELECT name FROM equipos WHERE name = $1",
        [name]
      );
    
      if (rowCount > 0) {
        throw { code: 400, message: "El equipo ingresado ya está registrado en el sistema." };
      } else {
        const consulta = {
          text: "INSERT INTO equipos VALUES (DEFAULT,$1)",
          values: [name],
        };
    
        const { rows } = await pool.query(consulta);
    
        console.log(rows);
        return rows;
      }  
} catch ({ code, message }) {
    throw { code, message };
}
  
};

const addPlayer = async ({ jugador, teamID }) => {
  const { name, position } = jugador;

  const {rowCount} = await pool.query(
    "SELECT name FROM jugadores WHERE name = $1",
    [name]
  );

  try {

    if (rowCount == 0){
        const consulta = {
            text: "INSERT INTO jugadores VALUES (DEFAULT,$1,$2,$3)",
            values: [teamID, name, position],
          };
        
          // console.log(consulta)
          const { rowCount } = await pool.query(consulta);
        
          console.log(rowCount);
          return rowCount;
      }
      else{
        throw { code: 400, message: "El jugador ingresado ya está registrado en el equipo." };
      }
    
  } catch ({ code, message }) {
    throw { code, message };
}

  
  
};

module.exports = { getTeams, addTeam, getPlayers, addPlayer };
