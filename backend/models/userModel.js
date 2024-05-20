const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLength: [40, "Name cannot exceed 40 character"],
    minLength: [4, "Name should be of more than 4 character"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [8, "Password should be of more than 8 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    return next();
  }
  console.log("Plain password:", this.password); // Log the plain password
  this.password = await bcrypt.hash(this.password,10)
  console.log("Hashed password:", this.password); // Log the hashed password
  next()
})

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    console.log("Provided password:", password); // Log the provided password
    console.log("Hashed password:", this.password); // Log the hashed password stored in the database
    console.log("Password comparison result:", isMatch); // Log the result of password comparison
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error); // Log any errors that occur during password comparison
    return false; // Return false in case of an error
  }
};




//JWT TOKEN

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};



// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User",userSchema)