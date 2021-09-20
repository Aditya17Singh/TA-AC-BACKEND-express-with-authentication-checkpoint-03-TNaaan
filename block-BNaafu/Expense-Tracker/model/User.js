var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema(
  {
    email: { type: String, unique: true },
    local: {
      password: { type: String, require: true, unique: true },
      age: { type: Number },
      phone: { type: Number },
      country: { type: String },
    },
    github: {
      name: String,
      username: String,
      image: String,
    },
    google: {
      name: String,
      image: String,
    },
    providers: [String],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

module.exports = mongoose.model("User", userSchema);
