import { errorDictionary } from './errorDictionary.js'

export class CustomError{
    static createError(
        name="Error", 
        cause, 
        message, 
        code=errorDictionary.INTERNAL_SERVER_ERROR){

        const error=new Error(message, {cause:cause})
        error.name=name
        error.code=code

        throw error
    }
}