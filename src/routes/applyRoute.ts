import { Request, Response } from 'express';
import App from "../App";

App.post('/apply', (req: Request, res: Response) => {
    const email = req.body.email;
    const provider = req.body.provider;
    const team = req.body.team;
    
    if (!email || !provider || !team) {
        res.status(400).json({ error: "Missing required fields" })
        return;
    }

    console.log("Debug: "+req.body.email);

    res.status(200).json({});
});