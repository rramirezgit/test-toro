const express = require("express");
const ingredientController = require('../controllers/ingredients');
const router = express.Router();
const multer = require('multer');

//Set Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, 'ingredient-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//Configuracion del storage 
const upload = multer({ storage })


router.get('/', ingredientController.getAllIngredients);

router.post('/newingredient', upload.single('image'), ingredientController.save);

router.get('/:id', ingredientController.getIngredient);

router.put('/:id', upload.single('image'), ingredientController.update);

router.delete('/:id', ingredientController.delete);

module.exports = router;
