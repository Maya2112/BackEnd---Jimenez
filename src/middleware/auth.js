import {request, response} from 'express';

export const auth = (req = request, res = response)=>{
    if(req.session.user)
        return next();

    res.redirect('/login');
}