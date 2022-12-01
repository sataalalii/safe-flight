const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	/* delete from here???
	clientID:"1027544850577-u7rs1ja2dm37dq4mpngrafi34mc9604h.apps.googleusercontent.com", // Your Credentials here.
	clientSecret:"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", // Your Credentials here.
	*/
	callbackURL:"http://localhost:3000/auth/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));
