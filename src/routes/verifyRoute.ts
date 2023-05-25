import { Request, Response } from 'express';
import App from "../App";
import { connection, asyncQuery } from "../database/Database";

App.post('/verify', async (req: Request, res: Response) => {
    const code = req.body.code;
    console.log("debug!");

    //Missing fields
    if (!code) {
        res.status(400).json({ error: "Missing required fields" })
        return;
    }

    //Validate code
    let results = await asyncQuery("SELECT * FROM `applications` a WHERE a.verify_code = ? && a.verified = ?", [code, "FALSE"]);
    if (results.length <= 0) {
        res.status(202).json({ error: "Enten er linket ugyldigt eller udløbet." })
        return;
    }

    let result = results[0];
    
    await asyncQuery("UPDATE `applications` SET `verified` = ? WHERE `id` = ? ", ["TRUE", result.id])

    res.status(200).json({ success: "Din email er nu blevet verificeret!" });

    console.log("Result: "+JSON.stringify(result));
});