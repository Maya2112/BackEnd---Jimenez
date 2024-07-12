import { errorDictionary } from "../utils/errorDictionary.js";

export const errorHandler=(error, req, res, next)=>{

    console.log(`${error.cause?error.cause:error.message}`)

    switch (error.code) {
        case errorDictionary.AUTHENTICATION || errorDictionary.AUTHORIZATION:
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Invalid credentials`})

        case errorDictionary.INVALID_ARGUMENTS:
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`${error.message}`})
        
        case errorDictionary.NOT_FOUND:
            return res.status(404).json({ error: `${error.message}` });
    
        default:
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error - contacte al administrador`})
    }
}