const { Schema, model } = require('mongoose');

const DietSchema = new Schema(
  {
    mealType: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner", "Snacks"],
      maxlength: 50,
    },
    food: {
      type: String,
      required: true,
      maxlength: 50
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

const Diet = model("Diet", DietSchema);
module.exports = Diet;
