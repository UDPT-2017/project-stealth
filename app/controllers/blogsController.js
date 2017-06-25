const models = require('../models');
var blogsController = {
	index: function(req, res){
        models.blogs.show_blog(function(err, result){
            if(err)
                res.send('Error');
		    res.render('blogs', {
                post: result,
                title: 'Blogs'
            });
        })
	},
    new_post: function(req, res){
        var cont = req.body.trthai;

        models.blogs.postnew_post(req.user.user_id, cont, function(err, result){
            if(err)
                res.send("Error");
            res.redirect('/blogs');
        })
    },
    show_post: function(req, res){
        models.blogs.show_post( req.user.user_id, req.params.id, function(err, result, result2){
            if(err)
                res.send("Error");
            models.blogs.update_view(req.params.id, function(err, v_result){
                if(err)
                    res.send("Error");
                res.render('post', {
                    po: result.rows[0],
                    show_post: result2,
                    us: req.user,
                    title: result.rows[0].content
                })
            });
        })
    },
    new_comment: function(req, res){
        var cmt = req.body.comment;
        models.blogs.postnew_comment(req.user.user_id, cmt, req.params.id, function(err, result){
            if(err)
                res.send("Error");
            res.redirect('/blogs/postId:id');
        });
    },
};

module.exports = blogsController;