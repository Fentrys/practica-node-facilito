var Imagen = require("../models/imagenes");

module.exports = function(imagen, req, res){
    if(typeof imagen.creator == "undefined") return false;
    //True  tienes permisos
    //False no tiene permisos
    if(req.method == "GET" && req.path.indexOf("edit") < 0){
        return true;
    }

    if(imagen.creator._id.toString == req.locals.user._id){
        //Esta imagen yo la subi
        return true;
    }

    return false;
}