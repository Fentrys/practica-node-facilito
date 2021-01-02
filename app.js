var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
/*var session = require("express-session");*/
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session")
var methodOverride = require("method-override");

var pug =  require("pug");

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


app.use(cookieSession({
	name: "session",
	keys: ["llave-1", "llave-2"]
}));

app.get("/", function(req,res){
    res.render("index", {titulo:"Pagina de layout"})
});

app.get("/login", function(req, res){
    User.find(function(err, doc){
        
    })
    res.render("login")
});

app.use("/app", router_app);

app.post("/users", function(req, res){
    var user = new User({email: req.body.email, password: req.body.password, 
						password_confirmation: req.body.password_confirmation});
    user.save(function(err){
		if(err){
			console.log(String(err));
		}
        res.render("users",{email:req.body.email, titulo: "Usuarios"});
    });
    
});

app.listen(3000);