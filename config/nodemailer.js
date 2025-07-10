import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

export const accountEmail = "sarthaknegi296@gmail.com"

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
    }
});
