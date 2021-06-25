

const mongoose = require("mongoose");
const { Schema } = mongoose;

const IngredientsSchema = new Schema({

  name: {
    type: String,
    trim: true,
    require: [true, "Please a name"]
  },
  price: {
    type: Number,
    require: [true, "Please a price"],
  },
  image: String,
}, {
  timestamps: true 
});


module.exports = mongoose.model('ingredients', IngredientsSchema);
