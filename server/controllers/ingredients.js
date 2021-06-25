const IngredientsModal = require('../models/Ingredients');
const path = require('path')
const fs = require('fs');

const controller = {

    getAllIngredients:(req, res) => {

        IngredientsModal.find((err, Ingredients) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error returning the Ingredients'
                });
            }
    
            if (!Ingredients || Ingredients.length == 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No Ingredients to show'
                });
            }
    
            return res.status(200).send({
                status: 'success',
                Ingredients
            });
        });
    },
    getImage:(req, res) => {
        const path_file = './uploads/' + req.params.id;

        fs.access(path_file, (err) => {
            if (!err) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });

    },
    save: (req, res) => {
        const params = req.body;
        const image = req.file; 
      
        try {
            var name = params.name.trim()
            var price = parseFloat(params.price)
            var fileUrl = image.filename;
            var type = params.type.trim();
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Missing data to send',
            });
        }
    
       
        if (name && price && fileUrl && type) {
            const Ingredient = new IngredientsModal();
    
            Ingredient.name = params.name;
            Ingredient.price = params.price;
            Ingredient.ingredients = params.ingredients;
            Ingredient.image = fileUrl
            Ingredient.type = type
    
    
            Ingredient.save((err, Ingredient) => {
                if (err || !Ingredient) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'The Ingredient was not saved'
                    });
                }
                   
                return res.status(200).send({
                    status: 'success',
                    Ingredient: Ingredient
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'The data is not valid'
            });
        }
    },

  
    getIngredient: (req, res) => {
        const IngredientId = req.params.id;
    
        if (!IngredientId || IngredientId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'Ingredient not exist'
            });
        }
    
        IngredientsModal.find({ _id: IngredientId }).sort('name')
            exec((err, Ingredient) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error returning Ingredient'
                    });
                }
    
                if (!Ingredient || Ingredient.length == 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'There is no Ingrediento with this ID'
                    });
                }
    
                return res.status(200).send({
                    status: 'success',
                    Ingredient
                });
            });
    },

    update: (req, res) => {
        const IngredientId = req.params.id;
        const params = req.body;
    
        try {
            var name = params.name.trim()
            var price = parseFloat(params.price)
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Missing data to send'
            });
        }
    
        params.options ? params.options = JSON.parse(params.options) : params.options = null;
    
        //Find and update
        if (name && price ) {
            IngredientsModal.findOneAndUpdate({ _id: IngredientId }, params, { new: true }, (err, IngredientUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error updating Ingredient'
                    });
                }
    
                if (!IngredientUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'There is no Ingredient'
                    });
                }
    
                //retornar respuesta
                return res.status(200).send({
                    status: 'success',
                    Ingredient: IngredientUpdate
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    },

    delete: (req, res) => {
        const IngredientId = req.params.id;
    
        if (!IngredientId || IngredientId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'Ingredient not exist'
            });
        }
        IngredientsModal.findByIdAndDelete({ _id: IngredientId }, (err, IngredientRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Failed to delete the Ingredient'
                });
            }
    
            if (!IngredientRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'There is no Ingredient to remove'
                });
            }
    
            //Validate if the Ingredient had an associated image
            if (IngredientRemoved.image) {
                fs.unlink('./uploads/' + IngredientRemoved.image, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
            }
    
            return res.status(200).send({
                status: 'success',
                Ingredient: IngredientRemoved
            });
        });
    },

}

module.exports = controller;
