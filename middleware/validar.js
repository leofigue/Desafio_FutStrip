const { secretKey } = require("../utils");
const jwt = require("jsonwebtoken")

const validaLogin = async(req, res, next)=> {
    const { username, password } = req.body;

    // Verificar si algún campo no está definido o no tiene datos.
    if (!username || !password) {
        console.log("Los datos están incompletos, no puede continuar.")
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    // Valida que los valores ingresados sean correctos.
    
    if(username!="admin" || password!="1234"){
        console.log("Los datos ingresados no son correctos")
        return res.status(400).json({ message: 'Los datos ingresados no son correctos' });
    }

    console.log("Puede continuar con el acceso al sistema.");
    next();
};

const validarToken = (req, res, next) =>{
    // Obtener el token de las cabeceras de la solicitud
    const Authorization = req.header("Authorization");
    // Verificar si el token existe
    if (!Authorization) {
        // Si el token no existe, enviar una respuesta de error
        console.log("El Token no esta incluido en el header.");
        return res.status(401).json({ message: 'El Token no esta incluido en el header.' });
    }
    try {
        const token = Authorization.split("Bearer ")[1];
        // Verificar y decodificar el token utilizando la clave secreta
        console.log("token: " + token)
        console.log("secretKey: " + secretKey)
        const datosToken = jwt.verify(token, secretKey);

        console.log(datosToken)

        // Guardar los datos del token en la solicitud para usarlos en las rutas
        req.datosToken = datosToken;

        // Pasar al siguiente middleware o a la ruta
        console.log('Token proporcionado y validado, puede continuar con el usuario: ' + datosToken.username);

        next();
    } catch (error) {
        // Si el token no es válido, enviar una respuesta de error
        console.log("El Token no es válido.");
        res.status(401).json({ mensaje: 'El Token no es válido.' });
    }
}

module.exports = {  validaLogin, validarToken };