import { Request, Response } from 'express';

import App from "../App";

import { asyncQuery } from '../database/Database';
import { matchPassword } from '../utils/PasswordUtils';
import { generateSessionToken, getStoredSessionToken } from '../utils/UserUtils';


App.post('/login', async (req: Request, res: Response) => {
    
    const { username, password } = req.body;

    //Missing fields
    if (!username || !password) {
        return res.status(400).json({error: "Missing required fields"});
    }

    //Check if the username exists
    const results = await asyncQuery("SELECT * FROM `users` u WHERE u.username = ?", [username]);
    if (results.length <= 0) {
        return res.status(202).json({error: "Brugernavn eller adgangskode er forkert."});
    }

    //Check if the password is matching
    const result = results[0];
    const hashedPassword: string = result.password;
    const matching = await matchPassword(password, hashedPassword);
    if (!matching) {
        return res.status(202).json({error: "Brugernavn eller adgangskode er forkert."});
    }

    //Get or create a valid session token
    let sessionToken = await getStoredSessionToken(result.id);
    if (!sessionToken) {
        sessionToken = await generateSessionToken(result.id);
    }
        
    res.status(200).json({success: "Du er nu logget ind", session: sessionToken});
});