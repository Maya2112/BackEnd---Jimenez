import mongoose from 'mongoose';


export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.URI_ECOMMERCE_MONGODB, {dbName:process.env.DB_NAME});
        console.log('Base de datos connected');
    }catch (error){
        console.log(`Error al intentar conectar con la base de datos ${error}`);
        process.exit(1);
    }
}