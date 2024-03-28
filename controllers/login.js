const { secretKey } = require("../utils");
const jwt = require("jsonwebtoken")

const validaUsuario =   (req, res)=> {
    try {
        const { username } = req.body
        const token = jwt.sign( {username} , secretKey);
        console.log("Token generado para usuario: ",username);
        res.status(200).send(token);    
    } catch ({ code, message }) {
        console.log(message);
        res.status(code || 500).json({message});
    }
};

module.exports={validaUsuario}