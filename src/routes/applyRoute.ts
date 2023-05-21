import { Request, Response } from 'express';
import app from "../app";

app.get('/apply', (req: Request, res: Response) => {
    res.send('Apply page');
});