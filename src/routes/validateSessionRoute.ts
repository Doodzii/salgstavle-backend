import { Request, Response } from 'express';
import App from "../App";
import { getSessionTokenData } from '../utils/UserUtils';

App.post('/getsession', async (req: Request, res: Response) => {
    
    const { token } = req.body;

    //Missing fields
    if (!token) {
        return res.status(202).json({ error: "Invalid session token" });
    }

    //Invalid session token
    let tokenData = await getSessionTokenData(token);
    if (!tokenData) {
        return res.status(202).json({ error: "Invalid session token" });
    } 

    //Success. Send to frontend
    res.status(200).json({ success: "Din email er nu blevet verificeret!", userdata: tokenData });
});