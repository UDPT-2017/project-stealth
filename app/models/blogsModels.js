const pool= require('../../config/database');

module.exports = {
	show_blog: function(callback){
		pool.query('SELECT * FROM post, users WHERE users.id = post.poster ORDER BY post.time DESC', function(err, result) {
            callback(err,result);
		});
	},
	postnew_post: function(test_user, cont, callback){
		pool.query("INSERT INTO post (fell, content, image_path, views, poster, time) VALUES (null, '"+cont+"',null,0,2,now())", function(err, result){
		callback(err, result);
		});
	},
	show_post: function(test_user, id, callback){
		pool.query("SELECT * FROM post, users WHERE users.id = post.poster AND post.idp='"+id+"'", function(err, result) {
			pool.query("SELECT * FROM post, comments, users WHERE comments.post_id = post.idp AND comments.commentator = users.id AND post.idp='"+id+"' ORDER BY comments.time_cmt ASC", function(err, result2){
            	callback(err,result,result2);
			});
		});
	},
	postnew_comment: function(test_user, cmt, id, callback){
		pool.query("INSERT INTO comments (commentator, comment, post_id, time_cmt) VALUES ('"+test_user.test_id+"','"+cmt+"','"+id+"', now())", function(err, result) {
            callback(err,result);
		});
	}
};