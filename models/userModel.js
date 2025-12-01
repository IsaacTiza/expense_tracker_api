const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Needed for the hashing logic

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true, // Strategic: Ensures no two users share an email
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address", // Strategic: Basic email format validation
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8, // Strategic: Enforces a minimum password length
    select: false, // Strategic: Prevents password hash from being returned by default queries
  },
  
}, {
    timestamps: true, // Strategic: Automatically manage createdAt and updatedAt fields
});

// --- Mongoose Middleware: Security Feature ---
// This middleware runs *before* the user is saved to the database.

// 1. Password Hashing Hook
UserSchema.pre("save", async function (next) {
  // Only hash the password if it is new or has been modified
  if (!this.isModified("password")) {
    return
  }

  // Strategy: Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 2. Add an instance method for matching passwords (optional but recommended)
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // Strategy: Compare plaintext password with the stored hash
  // Note: this.password requires 'select: true' or a specific query to be available
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
