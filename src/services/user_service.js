import {userModel} from '../models/user.js'

export const getUserById = async (id) =>{

    try{
        return await userModel.findById(id);
    }catch (error){
        console.log('getUserById error:', error);
        throw error;
    }
};

export const getUserEmail = async (email) =>{

    try{
        return await userModel.findOne({email});
    }catch (error){
        console.log('getUserEmail error:', error);
        throw error;
    }
};

export const registerUser = async (user) =>{

    try{
        return await userModel.create({...user});
    }catch (error){
        console.log('registerUser error:', error);
        throw error;
    }
};