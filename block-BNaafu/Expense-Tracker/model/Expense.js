var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var expenseSchema = new Schema(
  {
    category: { type: String, require: true },
    amount: { type: Number },
    Date: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

mongoose.exports = mongoose.model("Expense", expenseSchema);
