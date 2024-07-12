import {Schema, model} from 'mongoose';

const collectionName = 'Ticket';

const ticketSchema = new Schema ({
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: {type: String},
    purcharser: {type:Schema.Types.ObjectId, ref:'User'},
});

ticketSchema.pre('find', function(){
    this.populate('user');
});

export const ticketModel = model (collectionName, ticketSchema);
