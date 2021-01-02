var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Conexion
mongoose.connect("mongodb://localhost/fotos");

var posibles_valores = ["M","F"];

var email_match = [/^\W+([\.-]?\W+)*@\W+([\.-]?\W+)*(\.\W{2,3})+$/,"Coloca un email vâlido"];

var user_schema = new Schema({
	name: String,
	last_name: String,
	username: {type:String, require:true, maxlength:[50, "Username muy grande"]},
	password: {type:String,
			  minlength: [8,"El password es muy corto"],
			  validate:{
				  validator: function(p){
					  this.password_confirmation == p;
				  },
				  message: "Las contraseñas no son iguales"
			  }
			},
	age: {type: Number, min: [5,"La edad no puede ser menor que 5"], max: [100, "La edad no puede ser mayor que 100"]},
	email: {type:String, required: "El correo es obligatorio", match: email_match},
	date_of_birth: Date,
	sex: {type:String, enum: {values: posibles_valores, message: "Opción no válida"}}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});


user_schema.virtual("full_name").get(function(){
	return this.name + this.last_name;
}).set

var User = mongoose.model("User", user_schema);

module.exports.User = User;