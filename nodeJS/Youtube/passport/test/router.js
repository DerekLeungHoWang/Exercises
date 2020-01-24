//router.js
const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login'); // or redirect to '/signup'
    }


    router.get('/secret',  isLoggedIn, (req, res) => {
        res.send('Here you go, a secret');
    });

    router.get('/login', (req, res) => {
        res.sendFile(__dirname + '/html/login.html');
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/error'
    }));

    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/html/index.html');
    });


//FOR SIGNUP PAGE
    router.get('/signup', (req, res) => {
        res.sendFile(__dirname + '/html/signup.html');
    });
    
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/error'
    }));

//FACEBOOK login
router.get("/auth/facebook", passport.authenticate('facebook', {scope: ["email", "user_gender","user_link" ]}));

router.get("/auth/facebook/callback", passport.authenticate('facebook',{

    successRedirect: "/secret",

    failureRedirect: "/login"

}));
    return router;
};