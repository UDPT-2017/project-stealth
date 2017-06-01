module.exports = {

    'facebookAuth' : {
        'clientID'      : '730093200484614', // your App ID
        'clientSecret'  : '9748b8320e64ab900ac6e51eca80b82c', // your App Secret
		'callbackURL'       : 'http://localhost:8888/auth/facebook/callback'
        //'callbackURL'   : 'https://lab02-1412558-1412657.herokuapp.com/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'HGbiX8Z3OUz9lrNFcmdA1TFJL',
        'consumerSecret'    : 'TlwZ9jLQDpqkSQXuF0SCfDsmQsdNLg5BKopkapQxGTtCTQZNbi',
        'callbackURL'       : 'http://127.0.0.1:8888/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '679985158017-nd8oue4tdgmjjq4g7cld6r4r7g1luae0.apps.googleusercontent.com',
        'clientSecret'  : 'wBXqXXN2RZLDJMI1oUn5cPNW',
        'callbackURL'   : 'http://localhost:8888/auth/google/callback'
    }

};