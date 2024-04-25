const UserModel = require('../models/User')
const bcrypt = require('bcrypt');
exports.findOne = async (req, res) => {
    try {
        console.log(req.body.email)
        console.log(req.body.password)
        const login = await UserModel.findOne({email: req.body.email});
                  
                if (!login) {
                    return res.status(400).json({
                      ok: false,
                      err: {
                          message: "Usuario o contraseña incorrectos"
                      }
                   })
                }
                 // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
                 console.log(login.password);
                if (!bcrypt.compareSync(req.body.password ,login.password)){
                    return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Usuario o contraseña incorrectos"
                    }
                    });               
                }
                res.send({
                    message:"Login successfully!!",
                    user:login
                });
               // res.status(200).json(login);
 } 
    catch(error) {
        res.status(404).json({ messageCatch: error.message});
    }
};