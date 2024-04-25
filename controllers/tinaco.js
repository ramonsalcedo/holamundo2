const TinacoModel = require('../models/tinaco')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.idUsuario && !req.body.idTinaco && !req.body.name) {
        
        res.status(400).send({ message: "Content can not be empty!" });
    }    
    const tinaco = new TinacoModel({
        idUsuario: req.body.idUsuario,
        idTinaco: req.body.idTinaco,
        name: req.body.name
       
    });
    
    await tinaco.save().then(data => {
        res.send({
            message:"tinaco created successfully!!",
            tinaco:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const tinaco = await TinacoModel.find();
        res.status(200).json(tinaco);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const tinaco = await TinacoModel.find({idUsuario: req.params.id});
        res.status(200).json(tinaco);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
exports.findOnelocal = async (req, res) => {
    const local  = req;
    
    try {       
        const user = await TinacoModel.findById(local);
       // console.log(user);
       res = user;
       //console.log(res);
       return res;       
    } catch(error) {
       res = ("mamaona");
       console.log("estoy aqui",error);
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }    
    const id = req.params.id;    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({message: `User not found.` });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
//Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndRemove(id).then(data => {
        if (!data) {
          res.status(404).send({message: `User not found.` });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({message: err.message });
    });
};
