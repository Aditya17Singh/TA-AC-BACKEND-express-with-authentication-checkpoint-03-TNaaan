var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var User = require("../model/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      var email = profile._json.email;
      var githubUser = {
        email: email,
        providers: [profile.provider],
        github: {
          name: profile.displayName,
          username: profile.username,
          image: profile.photos[0].value,
        },
      };
      User.findOne({ email: email }, (err, user) => {
        console.log(err, user);
        if (err) return cb(err, false);
        if (!user) {
          User.create(githubUser, (err, addeduser) => {
            if (err) return cb(err, false);
            cb(null, addeduser);
          });
        } else {
          cb(null, user);
        }
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (token, tokenSecret, profile, done) {
      console.log(profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, "name email username", function (err, user) {
    done(err, user);
  });
});