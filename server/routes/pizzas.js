const express = require("express");
const pizzaController = require('../controllers/pizza');
const path = require('path');
const router = express.Router();
const multer = require('multer');

//Set Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, 'pizza-'+file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//Configuracion del storage 
const upload = multer({ storage })


router.get('/', pizzaController.getallPizzas);

router.post('/newpizza', upload.single('image'), pizzaController.save);

router.get('/:id', pizzaController.getPizza);

router.put('/:id', upload.single('image'), pizzaController.update);

router.delete('/:id', pizzaController.delete);

module.exports = router;
