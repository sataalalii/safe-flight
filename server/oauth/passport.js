const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//importing env vars
require('dotenv').config()

const id = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;
/* printss values for tests
console.log(id);
console.log(secret);
*/

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({

	clientID: id,
	clientSecret: secret,
	callbackURL:"http://localhost:3000/auth/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));
