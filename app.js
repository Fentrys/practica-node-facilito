var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session")
var methodOverride = require("method-override");
var formidable = require("express-formidable");
var pug =  require("pug");
var RedisStore = require("connect-redis")(session);


var app = express();

app.set("view engine","pug");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*app.use(methodOverride("_method"));*/

app.use(methodOverride('_method'));

/*app*/
/*//*/
/*
Usando session
app.use(session({
	secret: "15wwe4f8ew1we8w1vw81v",
	resave: false,
	saveUninitialized:false
}));
*/
/*
Utilizando cookies para la seccion
app.use(cookieSession({
	name: "session",
	keys: ["llave-1", "llave-2"]
}));
*/

var sessionMiddleware = session({
	store: new RedisStore({}),
	secret:"super ultra secret word"
});

app.use(sessionMiddleware);

app.use(formidable({keepExtensions: true, uploadDir:"images"}));

app.get("/", function(req,res){
    res.render("index", {titulo:"Pagina de layout"})
});

app.get("/signup",function(req,res){
	User.find(function(err,doc){
		res.render("signup")
	})
})

app.get("/login", function(req, res){    
    res.render("login");
});

app.use("/app", router_app);

app.post("/users", function(req, res){
    var user = new User({
						email: req.body.email, 
						password: req.body.password, 
						password_confirmation: req.body.password_confirmation,
						username: req.body.username
					});
    user.save().then(function(us){
		res.send("Guardamos el usuario exitosamente");
	},function(err){
		console.log(String(err));
		res.send("Hubo un error al guardar el usuario");
	})    
});

app.post("/sesssions", function(req,res){
	User.findOne({email:req.body.email,password:req.body.password}, function(err,user){
		console.log(user);
		console.log(err);
		req.session.user_id = user._id;
		res.redirect("/app");
	})
})

app.use("/app", session_middleware);

app.listen(3000);