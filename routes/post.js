const express = require('express');
const router = express.Router();
const PostSchema = require("../models/Post");

//registrar post
router.post('/', async (req, res) => {

    console.log(req.body); //se utiliza para ver la informacion que llego en la peticion
    
    const post = new PostSchema({
        user: req.body.user,
        password: req.body.password
    });

    try{
        const savedPost = await post.save(); //se guarda la informacion en la base de datos

        res.json(savedPost);
        
    }catch(error)
    {
        res.status(500).json({ message: error.message });
    }

});

//buscar post por id
router.get('/:postId', async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.postId);

        if (post) {
            res.json(post);
        } else {
            // Si no se encuentra el usuario
            res.status(404).json({ message: 'No se encontro el registro' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//buscar por nombre de usuario y contraseña
router.get('/:postUser/:postPass', async (req, res) => {
    try {
        const { postUser, postPass } = req.params;

        const post = await PostSchema.findOne({ user: postUser, password: postPass });

        if (post) {
            // Si se encuentra el usuario con esas credenciales
            res.json({ message: 'Autenticación satisfactoria', user: post });
        } else {
            // Si no se encuentra el usuario
            res.status(404).json({ message: 'Usuario o contraseña incorrectos' });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//eliminar un post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await PostSchema.remove({_id: req.params.postId});

        res.json(removedPost);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//actualizar un post
router.patch('/:postId', async (req, res) => { //patch para actualizar
    try {
        const updatedPost = await PostSchema.updateOne(//actualiza de uno en uno
            {
                _id: req.params.postId
            },
            {
                $set: {user: req.body.user}
            }

        );

        res.json(updatedPost);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; //devuelve como modulo lo que se le asigna a route