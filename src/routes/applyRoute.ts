import { Request, Response } from 'express';
import crypto from "crypto";
import * as EmailValidator from 'email-validator';

import {connection, asyncQuery } from "../database/Database";
import {sendMail} from "../mail/MailService";
import verifyMail from '../mail/templates/VerifyMail';
import App from "../App";

App.post('/apply', async (req: Request, res: Response) => {
    
    const {email, provider, team } = req.body;

    //Missing fields
    if (!email || !provider || !team) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    //Email is invalid
    if (!EmailValidator.validate(email)) {
        return res.status(202).json({ error: "Du har angivet en ugyldig email", clear: false });
    }

    //Check if the email is already registered
    const results = await asyncQuery("SELECT * FROM `applications` a WHERE a.email = ? AND (a.verify_timestamp >= ? OR a.verified = 'TRUE')", [email, Date.now()]);
    if (results.length > 0) {
        return res.status(202).json({ error: "Du har allerede sendt en ansøgning!", clear: false});
    }
    
    //Delete all rows with defined email
    await asyncQuery("DELETE FROM `applications` WHERE email = ?", [email]);

    //Insert application into the database
    const verifyCode = `${generateVerifyCode(45)}`
    connection.query("INSERT INTO `applications` (`email`, `provider`, `team`, `verify_code`, `verify_timestamp`) VALUES (?, ?, ?, ?, ?)", 
        [email, provider, team, verifyCode, Date.now() + 900_000])
    
    //Send the user an email
    sendMail({
        to: email,
        subject: "Verificer din email adresse",
        html: verifyMail(verifyCode)
    });

    //Send success to frontend
    res.status(200).json({ success: "Din ansøgning er blevet sendt!", clear: true });
});



function generateVerifyCode(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    let bytesNeeded = Math.ceil((length * 6) / 8); // Number of bytes needed
    while (code.length < length) {
        const randomBytes = crypto.randomBytes(bytesNeeded);
        const randomIndexes = new Uint8Array(randomBytes);
        for (let i = 0; i < randomIndexes.length; i++) {
            const index = randomIndexes[i] % characters.length;
            if (code.length < length) {
                code += characters.charAt(index);
            }
        }
    }
    return code;
}