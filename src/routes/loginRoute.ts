import { Request, Response } from 'express';
import App from "../App";

App.get('/login', (req: Request, res: Response) => {
    res.send('Login page');
});