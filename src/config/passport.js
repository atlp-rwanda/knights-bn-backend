import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';

dotenv.config();


passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((user, done) => done(null, user));


const getUser = (accessToken, refreshToken, profile, done) => {
  done(null, profile);
};

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, getUser));

passport.use(new FacebookStrategy({
  clientID: process.env.FCBK_CLIENT_ID,
  clientSecret: process.env.FCBK_CLIENT_SECRET,
  profileFields: ['email', 'name', 'gender'],
  callbackURL: process.env.FCBK_CALLBACK_URL,
  enableProof: true,
}, getUser));

export default passport;
