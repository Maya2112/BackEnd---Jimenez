import {ticketModel} from '../models/ticket.js';



export const createTicketService = async (amount, purchaser) => {

    let code = Math.floor(Math.random() * 9000000) + 1000000;
    let purchase_datetime = new Date();

    try{
        return await ticketModel.create({
            code,
            purchase_datetime,
            amount,
            purchaser
        });
    }catch (error){
        console.log(`createTicketService error: ${error}`);
        throw error;
    }
}


