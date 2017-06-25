const pool= require('../../config/database');

module.exports = {
	show_blog: function(callback){
		pool.query('SELECT * FROM post, "Users" WHERE "Users".user_id = post.poster ORDER BY post.time DESC', function(err, result) {
            callback(err,result);
		});
	},
	postnew_post: function(id_user, cont, callback){
		pool.query("INSERT INTO post (content, image_path, views, poster, time) VALUES ('"+cont+"',null,0,'"+id_user+"',now())", function(err, result){
		callback(err, result);
		});
	},
	show_post: function(id_user, id, callback){
		pool.query('SELECT * FROM post, "Users" WHERE "Users".user_id = post.poster AND post.idp=$1',[id], function(err, result) {
			pool.query('SELECT * FROM post, comments, "Users" WHERE comments.post_id = post.idp AND comments.commentator = "Users".user_id AND post.idp = $1 ORDER BY comments.time_cmt ASC',[id], function(err, result2){
            	callback(err,result,result2);
			});
		});
	},
	postnew_comment: function(id_user, cmt, id, callback){
		pool.query("INSERT INTO comments (commentator, comment, post_id, time_cmt) VALUES ('"+id_user+"','"+cmt+"','"+id+"', now())", function(err, result) {
            callback(err,result);
		});
	},
	update_view: function(id, callback){
		pool.query("UPDATE post SET views = views + 1 WHERE idp = '"+id+"'", function(err, v_result){
			callback(err, v_result);
		});
	},
};