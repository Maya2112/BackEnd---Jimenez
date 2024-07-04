import passport from 'passport';
import 'dotenv/config';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { getUserById, getUserEmail, registerUser } from '../services/user_service.js';
import { isValidPassword, createHash } from '../utils/bcryptPassword.js';
import { createCartService } from '../services/cart_service.js';

const localStrategy = local.Strategy;

export const initializaPassport = () =>{
    passport.use('register', new localStrategy({passReqToCallback:true, usernameField:'email'}, 
    
    async (req, username, password, done) => { 

        try{
            const {confirmPassword} = req.body;

            if (password !== confirmPassword){
                console.log('No coinciden las contrasenas');
                return done (null, false);
            }
            const user = await getUserEmail(username);

            if (user){
                console.log('El usuario ya existe');
                return done(null, false);
            }

            req.body.password = createHash(password);

            const newCart = await createCartService();

            if(!newCart) return res.status(500).json({msg:'No se pudo crear el carrito'});

            req.body.cart= newCart._id;

            const newUser = await registerUser({...req.body});

            if (newUser)
                return done(null, newUser);

            return done(null, false);

        } catch (error){
            done(error);
        }
    }));
    
    passport.use('login', new localStrategy({usernameField:'email'}, 
    
    async (username, password, done) => { 
        try {
            const user = await getUserEmail(username);
            
            if (!user){
                console.log('El usuario no existe');
                return done(null, false);
            }

            if (!isValidPassword(password, user.password)){
                console.log('las contrasenas no coinciden');
                return done(null, false);
            }

            return done(null, user);


        } catch(error){
            done(error);
        }
    }));

    passport.serializeUser( (user, done) =>{
        done(null, user._id);
    });

    passport.deserializeUser( async (id, done) =>{

        const user = await getUserById(id);
        done(null, user);
    });

    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, 
        async(accesToken, refreshToken, profile, done) =>{
            try{
                const email = profile._json.email;
                const user = await getUserEmail(email);

                if(user)
                    return done(null, user);

                const newUser ={
                    name: profile._json.name,
                    email,
                    password: '.$',
                    gitHub: true
                };

                const result = await registerUser({...newUser});
                return done(null, result);
            
            }catch(error){
                done(error);
            }
    }));
}