var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var incomeSchema = new Schema(
  {
    source: { type: String },
    amount: Number,
    Date: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    buget: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
