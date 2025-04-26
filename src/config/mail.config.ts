import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
import { __dirname } from '../app.js';
import ejs from 'ejs';

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: "8b139e001@smtp-brevo.com",
        pass: "hZI2yUBk0zWdc6jT",
    },
} as SMTPTransport.Options);

export function sendEmail(receiver:String, id:String){
    ejs.renderFile(__dirname + "/views/email.ejs",{id},(err,data)=>{
        if(err){console.error(err);
        }else{

            transporter.sendMail({
                from: '"ts-email-validation" <seifusama@gmail.com>',
                to: receiver.toString(),
                subject: "Please confirm your email!!!",
                html: data,
            },(err,info)=>{
                if(err){console.error(err)}
            })
        }
    })
}