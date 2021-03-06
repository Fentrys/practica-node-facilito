var mongoose = require("mongoose");
var Schema = mongoose.Schema;


mongoose.connect("mongodb://localhost/fotos");

var img_schema = Schema({
	title: {type: String, require: true},
	creator: {type: Schema.Types.ObjectId, ref: "User"},
	extension: {type: String, required:true}
});

var Imagen =  mongoose.model("Imagen", img_schema);

module.exports = Imagen;