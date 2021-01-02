module.exports = function(req, res, next){
	Image.findById(req.params.id)
}