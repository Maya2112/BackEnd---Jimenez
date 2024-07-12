import {request, response} from 'express';

export const auth = (req = request, res = response, next)=>{
    if(req.session)
        return next();

    res.redirect('/login');
};

export const admin = (req = request, res = response, next)=>{
    if(req.session?.user.rol === 'admin')
        return next();

    res.redirect('/login');
}