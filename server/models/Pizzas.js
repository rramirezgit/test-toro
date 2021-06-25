

const mongoose = require("mongoose");
const { Schema } = mongoose;

const PizzasSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Please a name"]
  },
  price: {
    type: Number,
    require: [true, "Please a price"],
  },
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: "ingredients"
}],
image: String,
}, {
  timestamps: true 
});


module.exports = mongoose.model('pizzas', PizzasSchema);
