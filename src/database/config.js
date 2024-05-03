import mongoose from 'mongoose';

export const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb+srv://MayaJimenez:Olivia1997@cluster0.dkh7hbg.mongodb.net/');
        console.log('Base de datos connected');
    }catch (error){
        console.log(`Error al intentar conectar con la base de datos ${error}`);
        process.exit(1);
    }
}