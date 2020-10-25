let mongoose = require("mongoose");
let Schema = mongoose.Schema;
// a model template

let modelSchema = new Schema({
  property: { type: String },
  propertyOne: { type: Number, required: true },
  propertyTwo: { type: Date, default: Date.now },
});

modelSchema.statics.isModelPropertyAvailable = async function (val) {
  return (await this.findOne({ property: new RegExp(val, "i") }))
    ? true
    : false;
};

let model = mongoose.model("Models", modelSchema);

module.exports = model;
