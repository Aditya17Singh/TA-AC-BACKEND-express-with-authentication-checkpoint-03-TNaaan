var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var incomeSchema = new Schema(
  {
    source: { type: String, unique: true },
    amount: Number,
    Date: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

mongoose.exports = mongoose.model("Income", incomeSchema);
