//CONTROLLER
var Album = require('../models/Album');
	
var AlbumController = {
	ImagesMostview: function(req, res){
		var minimumViews = 10;
		var result1 = [{}], result2=[{}];
		Album.getAll(function(err, result){
			if(!err){
				result1=result;
				console.log("THIS IS LIST ALBUM");
				console.log(result1);
				console.log("/THIS IS LIST ALBUM");
				Album.ImagesMostView(minimumViews, function(err, result){
			if(!err){
				result2 = result;
				console.log("THIS IS LIST IMGS");
				console.log(result2);
				console.log("/THIS IS LIST IMGS");
				res.render('pages/mostview', {list:result1, listImg:result2	});
			}
		});
			}
		});

	} ,
	list: function(req,res){
		Album.getAll(function(err, result){
			if(!err){
				// console.log(JSON.stringify(result));
				console.log(result);
				res.render('pages/homeAlbum',{list:result})
			}
		});

	} ,
	imageBeLongTo: function( req, res){
		var result1 = [{}], result2=[{}];
		Album.getAll(function(err, result){
			if(!err){
				result1=result;
				Album.getImageBeLongTo(req.params.id, function(err, result){
			if(!err){
				result2 = result;
				res.render('pages/album', {list:result1, listImg:result2	});
			}
		});
			}
		});
		
	} ,
	viewDetailPic: function(req, res){
		var id=req.params.id;
		Album.viewDetailPic(id, function(err, result){
			if(!err){
				console.log("XEM CHI TIẾT");
				console.log(result);
				Album.updateView(id,function(err,result){
					if(!err){
						console.log("UPDATED VIEWS");
					}
				});
				res.render('pages/detail', {imgKQ : result});

			}
		});

	}
}


module.exports =AlbumController;	