import {Schema, model} from 'mongoose';

const collectionName = 'User';

const userSchema = new Schema ({
    name: {type: String, required: [true, 'Ingresa tu nombre, por favor']},
    lastName: {type: String, required: [true, 'Ingresa tu apellido, por favor']},
    email: {type: String, required: [true, 'El correo es obligatorio'], unique: true},
    password: {type: String, required: [true, 'Debes crear una contraseña']},
    rol: {type: String, default: 'user', enum:['user', 'admin']},
    status: {type: Boolean, default: true},
    creationDate: {type: Date, default: Date.now}
});

export const userModel = model (collectionName, userSchema);