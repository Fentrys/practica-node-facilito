var express = require("express");
var Imagen = require("./models/imagenes");

var router = express.Router();

var image_finder_middleware = require("./middlewares/find_image");

router.get("/", (req, res) =>{
	/*Buscar el usuario*/
	res.render("app/home");
});

/*REST*/
/*CRUD*/

router.get("/imagenes/new", (req, res) =>{
	res.render("app/imagenes/new");
});

router.all("/imagenes/:id*",image_finder_middleware);

router.get("/imagenes/:id/edit", (req, res) =>{
	res.render("app/imagenes/edit");
});

router.route("/imagenes/:id")
	.get((req, res) => {
		res.render("app/imagenes/show");		
	})
	.put((req, res)=>{
		res.locals.imagen.title = req.body.title;
		res.locals.imagen.save(function(err){
			if(!err){
				res.render("app/imagenes/show");
			}else{
				res.render("app/imagenes/"+req.params.id+"/edit");
			}
		})		
	})
	.delete((req,res)=>{
		Imagen.findOneAndRemove({_id: req.params.id}, function(err){
			if(!err){
				res.redirect("/app/imagenes");
			}else{
				console.log(req.params.id);
				res.redirect("/app/imagenes/"+req.params.id)
			}
		})
	});

router.route("/imagenes")
	.get((req,res)=>{
		console.log(Imagen);
		Imagen.find({}, function(err, imagenes){
			res.render("app/imagenes/index",{imagenes:imagenes,titulo:"Mis imagenes"});
		});
	})
	.post((req,res)=>{
		var data = {
			title: req.body.title
		}
	
		var imagen = new Imagen(data);
	
		imagen.save(function(err){
			if(!err){
				res.redirect("/app/imagenes/"+imagen._id)
			}
			else{
				res.render(err);
			}
		})
	});

module.exports = router;