const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price."],
    maxLength: [8, "Price cannot exceed 8 figure"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Please Select Category for this product."],
  },
  stock: {
    type: Number,
    maxLength: [5, "Stock cannot exceed 5 figure"],
    default:1
  },
  numOfReview:{
    type:Number,
    default:0
  },
  reviews:[{
    user:{
        // type: mongoose.Schema.ObjectId,
        // ref: 'User',
        // required: true,
        type:String,
        required:true
        },
        rating:{
            type: Number,
            required: true,
        },
        comment:{
            type: String,
            required: true,
            }
  }],
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports =mongoose.model("Product",productSchema)
