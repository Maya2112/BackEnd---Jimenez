import {fileURLToPath} from 'url';
import {dirname} from 'path';
import mailer from 'nodemailer';

const {nodemailer}= mailer;




const __filename= fileURLToPath(import.meta.url);
const __dirname= dirname(__filename);

export default __dirname;

const transporter=mailer.createTransport(
    {
        service:"gmail", 
        port:"587",
        auth:{
            user:"mayajimenez.dev@gmail.com",
            pass: "tzbdixlbtqnltphx"
        }
    }
);

export const enviarMail=async(to, subject, message)=>{
    return transporter.sendMail(
        {
            from: "Empresa Maya mayajimenez.dev@gmail.com",
            to, 
            subject,
            html: message
        }
    )
}


