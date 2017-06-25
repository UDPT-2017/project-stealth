//MODEL
var pool = require('../../config/dbconfig');

var album = {
	getAll: function(callback){
		pool.query('SELECT al.album_id, al.AlBum_Title, count(*) \
			FROM Album al, Album_Image al_img \
			WHERE al.album_id = al_img.album_id \
			GROUP BY al.album_id ', function(err, result){
			if (err){
				callback(err, null);
			}
			else
				callback(null, result.rows);
		});
		} ,
	getImageBeLongTo : function(album_id,callback){
		// console.log(album_id);
		// var queryStr = 'SELECT * FROM ALBUM al,ALBUM_IMAGE al_img WHERE al.Album_ID = '+ album_id;
	    //console.log(queryStr);
		pool.query('SELECT * FROM ALBUM al, ALBUM_IMAGE al_img\
			WHERE al.Album_ID = ($1)\
			AND al.Album_ID = al_img.Album_ID'
			,[album_id],
			function(err, result){
				if(err){
					callback(err,null);
				}
				else{
					callback(null, result.rows);
				}
			});
	} ,

	updateView: function(image_id,callback){
		pool.query('UPDATE Album_Image SET view = view + 1 where image_id = ($1)', [image_id ],function(err, result){
			if(err){
				callback(err, null);
			}
			else{
				callback(null, result);
			}
		});
	} ,
	viewDetailPic: function(image_id, callback){
		pool.query('SELECT * FROM ALBUM_IMAGE WHERE Image_Id = ($1)', [image_id],function(err,result){
			if(err){
				callback(err,null);
			}
			else{
				callback(null, result.rows[0])
			}
		});

	} ,
	ImagesMostView: function(MinimumViews, callback){
		pool.query('SELECT * FROM ALBUM_IMAGE WHERE view >= ($1)',[MinimumViews],function(err,result){
			if(err){
				callback(err, null);
			}
			else{
				callback(null, result.rows);
			}
		});
	} 
}

module.exports = album;
