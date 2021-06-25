const pizzasModal = require('../models/Pizzas');
const path = require('path')
const fs = require('fs');


const controller = {

    getallPizzas: (req, res) => {

        pizzasModal.find().
        populate('ingredients').
        exec((err, pizzas) =>  {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error returning the pizzas'
                });
            }

            if (!pizzas || pizzas.length == 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No pizzas to show'
                });
            }

            return res.status(200).send({
                status: 'success',
                pizzas
            });
        });
    },
    save: (req, res) => {
        const params = req.body;
        const image = req.file; 

        try {
            var name = params.name.trim()
            var price = parseFloat(params.price)
            var fileUrl = image.filename;
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Missing data to send',
            });
        }

        params.ingredients ? params.ingredients = params.ingredients : params.ingredients = null;
        if (name && price && fileUrl) {
            const pizza = new pizzasModal();

            pizza.name = name;
            pizza.price = price;
            pizza.ingredients = params.ingredients;
            pizza.image = fileUrl


            pizza.save((err, pizza) => {
                if (err || !pizza) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'The pizza was not saved'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    pizza: pizza
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'The data is not valid'
            });
        }
    },


    getPizza: (req, res) => {
        const pizzaId = req.params.id;

        if (!pizzaId || pizzaId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'Pizza not exist'
            });
        }

        //Populando datos con la Collections Ingredients
        pizzasModal.find({ _id: pizzaId }).
            populate('ingredients').
            exec((err, pizza) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error returning pizza'
                    });
                }

                if (!pizza || pizza.length == 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'There is no pizzao with this ID'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    pizza
                });
            });
    },

    update: (req, res) => {
        const pizzaId = req.params.id;
        const params = req.body;
        const image = req.file; 


        try {
            var name = params.name.trim()
            var price = parseFloat(params.price)
            var fileUrl = image.filename;
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Missing data to send'
            });
        }

        params.ingredients ? params.ingredients = params.ingredients : params.ingredients = null;

        //Find and update
        if (name && price && fileUrl) {
            pizzasModal.findOneAndUpdate({ _id: pizzaId }, params, { new: true }, (err, pizzaUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error updating pizza'
                    });
                }

                if (!pizzaUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'There is no pizza'
                    });
                }

                //retornar respuesta
                return res.status(200).send({
                    status: 'success',
                    pizza: pizzaUpdate
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
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
    delete: (req, res) => {
        const pizzaId = req.params.id;

        if (!pizzaId || pizzaId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'Pizza not exist'
            });
        }
        pizzasModal.findByIdAndDelete({ _id: pizzaId }, (err, pizzaRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Failed to delete the pizza'
                });
            }

            if (!pizzaRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'There is no pizza to remove'
                });
            }

            //Validate if the pizza had an associated image
            if (pizzaRemoved.image) {
                fs.unlink('./uploads/' + pizzaRemoved.image, (err) => {
                    if (err) {
                        console.log(err)                       
                    }
                });
            }

            return res.status(200).send({
                status: 'success',
                pizza: pizzaRemoved
            });
        });
    },

}

module.exports = controller;
