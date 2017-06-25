const models = require('../models');

var test_user = 
{
    test_id: 2,
    test_name: "Hà Ngọc Huy",
    test_path: "./image/47.jpg",
}

var blogsController = {
	index: function(req, res){
        models.blogs.show_blog(function(err, result){
            if(err)
                res.send('Error');
		    res.render('blogs', {post: result});
        })
	},
    new_post: function(req, res){
        var cont = req.body.trthai;
        models.blogs.postnew_post(test_user, cont, function(err, result){
            if(err)
                res.send("Error");
            res.redirect('/blogs');
        })
    },
    show_post: function(req, res){
        models.blogs.show_post( test_user, req.params.id, function(err, result, result2){
            if(err)
                res.send("Error");
            res.render('post', {
                po: result.rows[0],
                show_post: result2,
                us: test_user,
                title: result.rows[0].yname
            });
        })
    },
    new_comment: function(req, res){
        var cmt = req.body.comment;
        models.blogs.postnew_comment(test_user, cmt, req.params.id, function(err, result){
            if(err)
                res.send("Error");
            res.send("insert thanh cong");
            //res.redirect('/blogs/postId:id');
        });
    }
};


module.exports = blogsController;