// app/routes.js
module.exports = function(app, passport, pool, controllers) {


	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', isLogged, function(req, res) {
		res.render('./pages/login', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/messages/inbox-messages', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('./pages/signup', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/messages/inbox-messages', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});


	// FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
	app.get('/auth/facebook/callback',
	  	passport.authenticate('facebook', {
	  	successRedirect: '/messages/inbox-messages',
	    failureRedirect: '/login'
	}));



	app.get('/', controllers.home.index);

	app.get('/about', controllers.about.index);


	app.get('/friends/remove-friend/friend-id=:id', isLoggedIn, controllers.friends.remove);
	app.get('/friends/add-friend/friend-id=:id', isLoggedIn, controllers.friends.add);

	app.get('/users', isLoggedIn, controllers.users.index);


	app.get('/messages', isLoggedIn, controllers.messages.index);

	app.get('/messages/read-messages/messages-id=:id', isLoggedIn, controllers.messages.read);

	app.get('/messages/inbox-messages', isLoggedIn, controllers.messages.inbox);

	app.get('/messages/new-messages', isLoggedIn, controllers.messages.new);
	app.post('/messages/new-messages', isLoggedIn, controllers.messages.postNew);

	app.get('/messages/sent-messages', isLoggedIn, controllers.messages.sent);

	app.get('/messages/friends', isLoggedIn, controllers.messages.friend);

	app.get('/blogs', controllers.blogs.index);
	app.post('/blogs', controllers.blogs.new_post);
	
	app.get('/blogs/postId:id', controllers.blogs.show_post);
	app.post('/blogs/postId:id', controllers.blogs.new_comment);

	app.get('/album', controllers.album.list);
	app.get('/album/:id',controllers.album.imageBeLongTo);
	app.get('/album/image/:id', controllers.album.viewDetailPic);
	app.get('/mostview', controllers.album.ImagesMostview);
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('page/error');
	});

	
}; // end export


function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	// "/" => trang chủ
	res.redirect('/login');
}
//
function isLogged(req, res, next) {

	// if user is authenticated in the session, carry on
	if (!req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
