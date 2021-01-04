var Imagen = require("../models/imagenes");


module.exports = function(req,res,next){	
	console.log(Imagen);
	Imagen.findById(req.params.id)
		.populate("creator")
		.exec(function(err, imagen){
		if(imagen != null && ower_check(imagen,req,res)){
			console.log("Encontre la imagen"+imagen.title);
	 		res.locals.imagen = imagen;			
			next();
		}else{
			res.redirect("/app");
		}
	})
}