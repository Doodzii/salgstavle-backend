import { Request, Response } from 'express';
import app from "../app";

app.get('/login', (req: Request, res: Response) => {
    res.send('Login page');
});