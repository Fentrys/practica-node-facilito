var mongoose = require("mongoose");
var Schema = mongoose.Schema;


mongoose.connect("mongodb://localhost/fotos");

var img_schema = Schema({
	title: {type: String, require: true}
});

var Imagen =  mongoose.model("Imagen", img_schema);

module.exports = Imagen;