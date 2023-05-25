import { Request, Response } from 'express';
import * as EmailValidator from 'email-validator';


import {connection, asyncQuery } from "../Database";
import {sendMail} from "../mail/MailService";
import verifyMail from '../mail/templates/VerifyMail';
import App from "../App";
import { TSError } from 'ts-node';

App.post('/apply', async (req: Request, res: Response) => {
    const email = req.body.email;
    const provider = req.body.provider;
    const team = req.body.team;
    
    if (!email || !provider || !team) {
        res.status(400).json({ error: "Missing required fields" })
        return;
    }
    
    if (!EmailValidator.validate(email)) {
        res.status(202).json({ error: "Du har angivet en ugyldig email", clear: false })
        return;
    }

    //Check if the email is already registered
    let results = await asyncQuery("SELECT * FROM `applications` a WHERE a.email = ?", [email]);
    
    if (results.length > 0) {
        res.status(202).json({ error: "Du har allerede sendt en ansøgning!", clear: false})
        return;
    }

    let verifyCode = `${generateVerifyCode()}`

    //Insert application into the database
    connection.query("INSERT INTO `applications` (`email`, `provider`, `team`, `verify_code`) VALUES (?, ?, ?, ?)", [email, provider, team, verifyCode])
 
    sendMail({
        to: email,
        subject: "Verificer din email adresse",
        html: verifyMail(verifyCode)
    });

    res.status(200).json({ success: "Din ansøgning er blevet sendt!", clear: true });
});

function generateVerifyCode() {
    const min = 1000000;
    const max = 9999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }