import { Request, Response } from 'express';
import App from "../App";
import { asyncQuery } from "../database/Database";

App.post('/verify', async (req: Request, res: Response) => {
    
    const { code } = req.body;

    //Missing fields
    if (!code) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    //Validate code
    const results = await asyncQuery("SELECT * FROM `applications` a WHERE a.verify_code = ? && a.verified = ?", [code, "FALSE"]);
    if (results.length <= 0) {
        return res.status(202).json({ error: "Enten er linket ugyldigt eller udløbet." });
    }

    //Mark email as verified in the database
    const result = results[0];
    await asyncQuery("UPDATE `applications` SET `verified` = ? WHERE `id` = ? ", ["TRUE", result.id])

    //Send success to frontend
    res.status(200).json({ success: "Din email er nu blevet verificeret!" });
});