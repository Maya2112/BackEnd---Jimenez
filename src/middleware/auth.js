import {request, response} from 'express';

export const auth = (req = request, res = response)=>{
    if(req.session?.user)
        return next();

    res.redirect('/login');
};

export const admin = (req = request, res = response)=>{
    if(req.session?.rol === 'admin')
        return next();

    res.redirect('/login');
}